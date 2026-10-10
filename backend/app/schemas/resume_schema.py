from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = "success"
    message: str = "AI Resume Analyzer backend is running"


class UploadResponse(BaseModel):
    success: bool = True
    filename: str
    resume_id: Optional[int] = None
    message: str = "Resume uploaded successfully"
    file_size: Optional[int] = None


class EducationItem(BaseModel):
    degree: str
    institution: Optional[str] = None
    period: Optional[str] = None
    grade: Optional[str] = None


class ExperienceItem(BaseModel):
    role: str
    company: Optional[str] = None
    period: Optional[str] = None
    highlights: List[str] = []


class ProjectItem(BaseModel):
    title: str
    description: Optional[str] = None
    technologies: List[str] = []


class ResumeOverview(BaseModel):
    name: Optional[str] = "Candidate"
    email: Optional[str] = None
    phone: Optional[str] = None
    education: List[EducationItem] = []
    experience: List[ExperienceItem] = []
    projects: List[ProjectItem] = []
    certifications: List[str] = []


class ATSBreakdown(BaseModel):
    contact_information: int = 0
    skills: int = 0
    education: int = 0
    experience: int = 0
    projects: int = 0
    keywords: int = 0
    formatting: Optional[int] = 0


class AnalyzeRequest(BaseModel):
    filename: Optional[str] = Field(None, description="Uploaded file name inside backend/uploads/")
    resume_id: Optional[int] = Field(None, description="Database ID of the previously uploaded resume")
    job_description: Optional[str] = Field(None, description="Optional target job description text")


class JobMatchRequest(BaseModel):
    resume_id: Optional[int] = Field(None, description="Database ID of the resume")
    filename: Optional[str] = Field(None, description="Stored filename if resume_id is omitted")
    job_description: str = Field(..., description="Target job description to match against")


class JobMatchResponse(BaseModel):
    success: bool = True
    match_percentage: int
    matching_skills: List[str] = []
    missing_skills: List[str] = []
    match_summary: Optional[str] = None


class AnalyzeResponse(BaseModel):
    success: bool = True
    resume_id: Optional[int] = None
    filename: Optional[str] = None
    resume: ResumeOverview
    ats_score: int
    breakdown: Optional[Dict[str, int]] = None
    skills: List[str] = []
    missing_skills: List[str] = []
    matching_skills: List[str] = []
    job_match: int = 0
    strengths: List[str] = []
    improvements: List[str] = []
    recommendations: List[str] = []


class ErrorResponse(BaseModel):
    success: bool = False
    error: str
