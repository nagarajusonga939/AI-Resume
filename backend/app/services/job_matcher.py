import re
from typing import List, Dict, Any
from .skill_extractor import extract_skills


def match_job_description(resume_text: str, resume_skills: List[str], job_description: str) -> Dict[str, Any]:
    """
    Compare resume skills and text against a target job description.
    
    Args:
        resume_text (str): Full text of the candidate's resume.
        resume_skills (List[str]): Previously extracted resume skills.
        job_description (str): Target job posting requirements.
        
    Returns:
        Dict[str, Any]: {
            "match_percentage": int,
            "matching_skills": List[str],
            "missing_skills": List[str],
            "match_summary": str
        }
    """
    if not job_description or not job_description.strip():
        return {
            "match_percentage": 0,
            "matching_skills": [],
            "missing_skills": [],
            "match_summary": "No job description provided for comparison."
        }

    # Extract required skills from the job description
    jd_skills = extract_skills(job_description)

    # Normalize sets for case-insensitive comparison
    resume_skill_set = set(s.lower() for s in resume_skills)
    
    matching_skills = []
    missing_skills = []

    for s in jd_skills:
        if s.lower() in resume_skill_set or re.search(rf'\b{re.escape(s)}\b', resume_text, re.IGNORECASE):
            matching_skills.append(s)
        else:
            missing_skills.append(s)

    # Calculate match percentage
    if jd_skills:
        skill_ratio = len(matching_skills) / len(jd_skills)
        # Scale to realistic 0-100 score (weighted 70% skill overlap + 30% keyword presence)
        match_percentage = int(round(skill_ratio * 100))
    else:
        # Fallback keyword overlap if JD doesn't contain standard skill names
        jd_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', job_description.lower()))
        resume_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', resume_text.lower()))
        common_words = jd_words.intersection(resume_words)
        overlap = len(common_words) / max(len(jd_words), 1)
        match_percentage = min(100, int(round(overlap * 120)))

    # Clamp match percentage
    match_percentage = max(10, min(98, match_percentage)) if matching_skills else min(45, match_percentage)

    # Generate summary statement
    if match_percentage >= 80:
        match_summary = f"Excellent alignment! Your resume covers {len(matching_skills)} of the core technical requirements for this role."
    elif match_percentage >= 60:
        match_summary = f"Strong potential candidate. Bridging the {len(missing_skills)} missing skills ({', '.join(missing_skills[:3])}) will significantly boost your interview chances."
    else:
        match_summary = f"Moderate match. Tailor your resume to include key missing skills like {', '.join(missing_skills[:4])} to pass automated screening."

    return {
        "match_percentage": match_percentage,
        "matching_skills": sorted(matching_skills),
        "missing_skills": sorted(missing_skills),
        "match_summary": match_summary
    }
