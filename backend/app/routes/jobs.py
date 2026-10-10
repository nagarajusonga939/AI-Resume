from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..models.database import get_db, Resume
from ..schemas.resume_schema import JobMatchRequest, JobMatchResponse
from ..services.skill_extractor import extract_skills
from ..services.job_matcher import match_job_description

router = APIRouter(prefix="/api/jobs", tags=["Jobs"])


@router.post(
    "/match",
    response_model=JobMatchResponse,
    summary="Match Resume to Target Job",
    description="Compare a specific resume against a job description to extract matching and missing skills."
)
async def match_resume_to_job(
    request: JobMatchRequest,
    db: Session = Depends(get_db)
):
    if not request.job_description or not request.job_description.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="job_description must not be empty."
        )

    db_resume = None
    if request.resume_id:
        db_resume = db.query(Resume).filter(Resume.id == request.resume_id).first()
    elif request.filename:
        db_resume = db.query(Resume).filter(Resume.stored_filename == request.filename).first()

    if not db_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Resume identifier not found."
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
