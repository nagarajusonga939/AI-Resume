import os
import uuid
import datetime
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..models.database import get_db, Resume, AnalysisResult
from ..schemas.resume_schema import UploadResponse, AnalyzeRequest, AnalyzeResponse, ErrorResponse
from ..services.pdf_parser import extract_text_from_pdf
from ..services.docx_parser import extract_text_from_docx
from ..services.resume_parser import parse_resume_text
from ..services.skill_extractor import extract_skills
from ..services.ats_scorer import calculate_ats_score
from ..services.job_matcher import match_job_description
from ..services.recommendation_engine import generate_recommendations

router = APIRouter(prefix="/api/resume", tags=["Resume"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "uploads")))
os.makedirs(UPLOAD_DIR, exist_ok=True)
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 10 * 1024 * 1024))  # 10 MB


@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload Resume (PDF or DOCX)",
    description="Accepts a PDF or DOCX resume, validates extension and file size (<10MB), saves file, and extracts text."
)
async def upload_resume(
    file: UploadFile = File(..., description="Resume file in PDF or DOCX format"),
    db: Session = Depends(get_db)
):
    # 1. Validate file extension
    original_filename = file.filename or "resume.pdf"
    ext = os.path.splitext(original_filename)[1].lower()
    if ext not in [".pdf", ".docx", ".doc"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type. Please upload a PDF or DOCX resume."
        )

    # 2. Read and validate file size
    contents = await file.read()
    file_size = len(contents)
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds the 10 MB limit. Please upload a smaller file."
        )

    if file_size == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty."
        )

    # 3. Generate unique stored filename
    unique_suffix = uuid.uuid4().hex[:8]
    stored_filename = f"resume_{unique_suffix}{ext}"
    stored_path = os.path.join(UPLOAD_DIR, stored_filename)

    with open(stored_path, "wb") as f:
        f.write(contents)

    # 4. Extract text immediately to verify file integrity
    extracted_text = ""
    try:
        if ext == ".pdf":
            extracted_text = extract_text_from_pdf(stored_path)
        else:
            extracted_text = extract_text_from_docx(stored_path)
    except Exception as e:
        # If extraction fails, remove file and return error
        if os.path.exists(stored_path):
            os.remove(stored_path)
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Could not extract text from document: {str(e)}"
        )

    # 5. Persist resume record in database
    db_resume = Resume(
        original_filename=original_filename,
        stored_filename=stored_filename,
        file_type=file.content_type or ext,
        file_size=file_size,
        upload_date=datetime.datetime.utcnow(),
        extracted_text=extracted_text
    )
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)

    return UploadResponse(
        success=True,
        filename=stored_filename,
        resume_id=db_resume.id,
        message="Resume uploaded successfully",
        file_size=file_size
    )


@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
    summary="Complete Resume Analysis",
    description="Performs complete ATS analysis, skill extraction, and optional job description matching."
)
async def analyze_resume(
    request: AnalyzeRequest,
    db: Session = Depends(get_db)
):
    # 1. Resolve Resume from DB or Filename
    db_resume = None
    if request.resume_id:
        db_resume = db.query(Resume).filter(Resume.id == request.resume_id).first()
    elif request.filename:
        db_resume = db.query(Resume).filter(Resume.stored_filename == request.filename).first()

    if not db_resume:
        # Check if the file exists directly on disk
        if request.filename:
            file_path = os.path.join(UPLOAD_DIR, request.filename)
            if not os.path.exists(file_path):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Resume file '{request.filename}' not found."
                )
            # Re-extract text
            ext = os.path.splitext(request.filename)[1].lower()
            text = extract_text_from_pdf(file_path) if ext == ".pdf" else extract_text_from_docx(file_path)
            db_resume = Resume(
                original_filename=request.filename,
                stored_filename=request.filename,
                file_type=ext,
                extracted_text=text
            )
            db.add(db_resume)
            db.commit()
            db.refresh(db_resume)
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Either 'filename' or 'resume_id' must be provided for analysis."
            )

    extracted_text = db_resume.extracted_text or ""
    if not extracted_text:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The resume contains no readable text."
        )

    # 2. Parse resume entities
    parsed_resume = parse_resume_text(extracted_text)

    # 3. Extract skills
    skills = extract_skills(extracted_text)
    parsed_resume["skills"] = skills

    # 4. Calculate ATS score
    ats_data = calculate_ats_score(parsed_resume, extracted_text)

    # 5. Match with Job Description (if provided)
    job_match_data = match_job_description(
        resume_text=extracted_text,
        resume_skills=skills,
        job_description=request.job_description or ""
    )

    # 6. Generate Recommendations
    rec_data = generate_recommendations(
        parsed_data=parsed_resume,
        ats_score_data=ats_data,
        job_match_data=job_match_data
    )

    # 7. Store analysis results in database
    analysis_record = AnalysisResult(
        resume_id=db_resume.id,
        ats_score=ats_data["ats_score"],
        job_match=job_match_data["match_percentage"],
        parsed_data=parsed_resume,
        skills=skills,
        missing_skills=job_match_data["missing_skills"],
        matching_skills=job_match_data["matching_skills"],
        breakdown=ats_data["breakdown"],
        strengths=rec_data["strengths"],
        improvements=rec_data["improvements"],
        recommendations=rec_data["recommendations"],
        created_at=datetime.datetime.utcnow()
    )
    db.add(analysis_record)
    db.commit()

    return AnalyzeResponse(
        success=True,
        resume_id=db_resume.id,
        filename=db_resume.stored_filename,
        resume=parsed_resume,
        ats_score=ats_data["ats_score"],
        breakdown=ats_data["breakdown"],
        skills=skills,
        missing_skills=job_match_data["missing_skills"],
        matching_skills=job_match_data["matching_skills"],
        job_match=job_match_data["match_percentage"],
        strengths=rec_data["strengths"],
        improvements=rec_data["improvements"],
        recommendations=rec_data["recommendations"]
    )


@router.get(
    "/list",
    summary="List all uploaded resumes"
)
def list_resumes(db: Session = Depends(get_db)):
    resumes = db.query(Resume).order_by(Resume.upload_date.desc()).all()
    return [
        {
            "id": r.id,
            "original_filename": r.original_filename,
            "stored_filename": r.stored_filename,
            "upload_date": r.upload_date.isoformat() if r.upload_date else None,
            "file_size": r.file_size
        }
        for r in resumes
    ]


@router.get(
    "/{resume_id}",
    summary="Get resume details by ID"
)
def get_resume(resume_id: int, db: Session = Depends(get_db)):
    r = db.query(Resume).filter(Resume.id == resume_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {
        "id": r.id,
        "original_filename": r.original_filename,
        "stored_filename": r.stored_filename,
        "upload_date": r.upload_date.isoformat() if r.upload_date else None,
        "file_size": r.file_size,
        "extracted_text_preview": (r.extracted_text[:400] + "...") if r.extracted_text else ""
    }
