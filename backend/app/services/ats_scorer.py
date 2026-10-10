import re
from typing import Dict, Any


def calculate_ats_score(parsed_data: Dict[str, Any], raw_text: str) -> Dict[str, Any]:
    """
    Calculate an ATS score from 0 to 100 based on standard industry criteria.
    
    Factors:
    - Contact Information (Max 10 pts)
    - Skills Volume & Relevance (Max 20 pts)
    - Education Completeness (Max 15 pts)
    - Experience & Impact (Max 20 pts)
    - Projects Portfolio (Max 10 pts)
    - Industry Keywords & Quantifiable Metrics (Max 10 pts)
    - Formatting & Optimal Word Count (Max 15 pts)
    
    Returns:
        Dict[str, Any]: { "ats_score": int, "breakdown": dict }
    """
    breakdown = {
        "contact_information": 0,
        "skills": 0,
        "education": 0,
        "experience": 0,
        "projects": 0,
        "keywords": 0,
        "formatting": 0
    }

    # 1. Contact Information (Max 10)
    contact_score = 0
    if parsed_data.get("name") and parsed_data.get("name") != "Candidate":
        contact_score += 3
    if parsed_data.get("email"):
        contact_score += 4
    if parsed_data.get("phone"):
        contact_score += 3
    breakdown["contact_information"] = contact_score

    # 2. Skills (Max 20)
    skills = parsed_data.get("skills", [])
    skill_count = len(skills)
    if skill_count >= 10:
        breakdown["skills"] = 20
    elif skill_count >= 7:
        breakdown["skills"] = 16
    elif skill_count >= 4:
        breakdown["skills"] = 12
    elif skill_count >= 1:
        breakdown["skills"] = 8
    else:
        breakdown["skills"] = 2

    # 3. Education (Max 15)
    education = parsed_data.get("education", [])
    if len(education) >= 1:
        # Check if degree and period or grade are detected
        first_edu = education[0]
        if first_edu.get("period") or first_edu.get("grade"):
            breakdown["education"] = 15
        else:
            breakdown["education"] = 12
    else:
        # Check if word 'education' or 'university' is in raw text
        if re.search(r'\b(bachelor|master|degree|university|college|b\.tech)\b', raw_text, re.IGNORECASE):
            breakdown["education"] = 10
        else:
            breakdown["education"] = 3

    # 4. Experience (Max 20)
    experience = parsed_data.get("experience", [])
    if len(experience) >= 2:
        breakdown["experience"] = 20
    elif len(experience) == 1:
        highlights = experience[0].get("highlights", [])
        breakdown["experience"] = 17 if len(highlights) >= 2 else 14
    else:
        if re.search(r'\b(experience|internship|developer|engineer|analyst)\b', raw_text, re.IGNORECASE):
            breakdown["experience"] = 10
        else:
            breakdown["experience"] = 5

    # 5. Projects (Max 10)
    projects = parsed_data.get("projects", [])
    if len(projects) >= 2:
        breakdown["projects"] = 10
    elif len(projects) == 1:
        breakdown["projects"] = 7
    else:
        if re.search(r'\b(project|capstone|application|system)\b', raw_text, re.IGNORECASE):
            breakdown["projects"] = 5
        else:
            breakdown["projects"] = 2

    # 6. Keywords & Quantifiable Achievements (Max 10)
    keyword_score = 0
    # Check for quantified metrics: %, numbers, metrics, ms, latency, users
    has_metrics = bool(re.search(r'(\d+%\b|\$\d+|\b\d+\s*(?:users|clients|queries|ms|sec|x)\b)', raw_text, re.IGNORECASE))
    if has_metrics:
        keyword_score += 5
    else:
        keyword_score += 2

    # Check for strong action verbs
    action_verbs = ['architected', 'spearheaded', 'engineered', 'developed', 'optimized', 'reduced', 'implemented', 'scaled', 'designed']
    action_verb_count = sum(1 for verb in action_verbs if re.search(rf'\b{verb}\b', raw_text, re.IGNORECASE))
    if action_verb_count >= 3:
        keyword_score += 5
    elif action_verb_count >= 1:
        keyword_score += 3
    else:
        keyword_score += 1
    breakdown["keywords"] = min(keyword_score, 10)

    # 7. Formatting & Length (Max 15)
    word_count = len(raw_text.split())
    if 300 <= word_count <= 900:
        # Ideal 1-page length
        breakdown["formatting"] = 15
    elif 200 <= word_count <= 1400:
        # Acceptable 1-2 page length
        breakdown["formatting"] = 12
    else:
        breakdown["formatting"] = 7

    total_ats_score = sum(breakdown.values())
    # Clamp between 0 and 100
    total_ats_score = max(0, min(100, total_ats_score))

    return {
        "ats_score": total_ats_score,
        "breakdown": breakdown
    }
