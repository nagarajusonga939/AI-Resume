import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..models.database import get_db, Resume, AnalysisResult
from ..schemas.resume_schema import (
    AnalyzeRequest, 
    AnalyzeResponse, 
    JobMatchRequest, 
    JobMatchResponse
)
from ..services.resume_parser import parse_resume_text
from ..services.skill_extractor import extract_skills
from ..services.ats_scorer import calculate_ats_score
from ..services.job_matcher import match_job_description
from ..services.recommendation_engine import generate_recommendations

router = APIRouter(prefix="/api/analysis", tags=["Analysis"])


@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
    summary="Analyze Resume",
    description="Analyze an existing uploaded resume against ATS criteria and optional job description."
)
async def perform_analysis(
    request: AnalyzeRequest,
    db: Session = Depends(get_db)
):
    # Lookup resume
    db_resume = None
    if request.resume_id:
        db_resume = db.query(Resume).filter(Resume.id == request.resume_id).first()
    elif request.filename:
        db_resume = db.query(Resume).filter(Resume.stored_filename == request.filename).first()

    if not db_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found. Please upload a resume first or provide a valid ID/filename."
        )

    text = db_resume.extracted_text or ""
    if not text:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The resume document has no extractable text."
        )

    parsed_resume = parse_resume_text(text)
    skills = extract_skills(text)
    parsed_resume["skills"] = skills

    ats_data = calculate_ats_score(parsed_resume, text)
    job_match_data = match_job_description(
        resume_text=text,
        resume_skills=skills,
        job_description=request.job_description or ""
    )

    rec_data = generate_recommendations(
        parsed_data=parsed_resume,
        ats_score_data=ats_data,
        job_match_data=job_match_data
    )

    # Save result
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


@router.post(
    "/job-match",
    response_model=JobMatchResponse,
    summary="Compare Resume with Job Description",
    description="Calculate match percentage, matching skills, and missing skills for an uploaded resume."
)
async def job_match(
    request: JobMatchRequest,
    db: Session = Depends(get_db)
):
    if not request.job_description or not request.job_description.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A non-empty 'job_description' string is required for matching."
        )

    db_resume = None
    if request.resume_id:
        db_resume = db.query(Resume).filter(Resume.id == request.resume_id).first()
    elif request.filename:
        db_resume = db.query(Resume).filter(Resume.stored_filename == request.filename).first()

    if not db_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found. Please provide a valid resume_id or filename."
        )

    text = db_resume.extracted_text or ""
    resume_skills = extract_skills(text)

    match_result = match_job_description(
        resume_text=text,
        resume_skills=resume_skills,
        job_description=request.job_description
    )

    return JobMatchResponse(
        success=True,
        match_percentage=match_result["match_percentage"],
        matching_skills=match_result["matching_skills"],
        missing_skills=match_result["missing_skills"],
        match_summary=match_result["match_summary"]
    )
