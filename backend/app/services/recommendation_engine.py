from typing import Dict, Any, List


def generate_recommendations(
    parsed_data: Dict[str, Any], 
    ats_score_data: Dict[str, Any], 
    job_match_data: Dict[str, Any]
) -> Dict[str, List[str]]:
    """
    Generate personalized resume improvement suggestions, categorized into
    strengths, areas to improve, and actionable recommendations.
    
    Returns:
        Dict[str, List[str]]: {
            "strengths": List[str],
            "improvements": List[str],
            "recommendations": List[str]
        }
    """
    strengths: List[str] = []
    improvements: List[str] = []
    recommendations: List[str] = []

    skills = parsed_data.get("skills", [])
    education = parsed_data.get("education", [])
    experience = parsed_data.get("experience", [])
    projects = parsed_data.get("projects", [])
    missing_skills = job_match_data.get("missing_skills", [])
    breakdown = ats_score_data.get("breakdown", {})

    # Strengths identification
    if len(skills) >= 8:
        strengths.append(f"Strong technical skill coverage with {len(skills)} recognized technologies.")
    elif len(skills) >= 4:
        strengths.append("Foundational technical skills are explicitly listed.")

    if parsed_data.get("email") and parsed_data.get("phone"):
        strengths.append("Complete and clear contact information detected in header.")

    if len(education) >= 1:
        strengths.append("Education and academic background are clearly structured.")

    if len(experience) >= 1:
        strengths.append("Relevant professional experience or internship history is documented.")

    if len(projects) >= 2:
        strengths.append(f"Demonstrated practical execution with {len(projects)} technical projects.")

    if breakdown.get("keywords", 0) >= 7:
        strengths.append("Effective use of quantifiable metrics and active engineering verbs.")

    if not strengths:
        strengths.append("Resume contains core fundamental sections suitable for ATS extraction.")

    # Areas to improve identification
    if breakdown.get("keywords", 0) < 7:
        improvements.append("Add measurable achievements (e.g. 'reduced latency by 25%', 'handled 50K queries').")

    if not experience:
        improvements.append("Include internship, freelance, or research experience to demonstrate team contribution.")

    if len(projects) < 2:
        improvements.append("Expand technical projects section with links to GitHub repositories or live demos.")

    if not parsed_data.get("certifications"):
        improvements.append("Add recognized certifications (e.g. AWS, Azure, Google Cloud, HackerRank).")

    improvements.append("Include a concise 2-3 line professional summary targeting your primary role.")

    # Actionable AI recommendations
    if missing_skills:
        top_missing = ", ".join(missing_skills[:3])
        recommendations.append(f"Incorporate high-priority missing skills: {top_missing} if experienced.")

    recommendations.append("Ensure your bullet points start with strong action verbs (Architected, Engineered, Optimized).")
    recommendations.append("Optimize section headers to standard naming: 'Technical Skills', 'Experience', 'Education'.")
    recommendations.append("Maintain a strict 1-page format for 0-3 years of experience to improve recruiter scan time.")
    recommendations.append("Align keywords in your project bullets with the exact phrasing in the job description.")

    return {
        "strengths": strengths[:4],
        "improvements": improvements[:4],
        "recommendations": recommendations[:5]
    }
