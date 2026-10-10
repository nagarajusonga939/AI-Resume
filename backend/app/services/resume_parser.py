import re
from typing import Dict, Any, List, Optional
from .skill_extractor import extract_skills

# Optional spaCy loader for enhanced NER
nlp = None
try:
    import spacy
    try:
        nlp = spacy.load("en_core_web_sm")
    except Exception:
        # If model is not downloaded yet, fallback to blank or heuristic
        try:
            nlp = spacy.blank("en")
        except Exception:
            nlp = None
except Exception:
    nlp = None


EMAIL_REGEX = re.compile(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+')
PHONE_REGEX = re.compile(r'(?:(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})|(?:\+?\d{1,3}[-.\s]?)?\b[6-9]\d{9}\b')
DEGREE_KEYWORDS = [
    r'b\.?tech\b', r'b\.?e\b', r'bachelor(?:\'s)?\b', r'b\.?s\.?\b', r'b\.?sc\b',
    r'm\.?tech\b', r'master(?:\'s)?\b', r'm\.?s\.?\b', r'm\.?sc\b', r'm\.?b\.?a\b',
    r'ph\.?d\b', r'diploma\b', r'associate(?:\'s)?\b'
]
SECTION_HEADERS = {
    "education": [r'\beducation\b', r'\bacademic(?:s)?\b', r'\bqualifications\b', r'\beducational background\b'],
    "experience": [r'\bexperience\b', r'\bwork experience\b', r'\bemployment\b', r'\bprofessional experience\b', r'\binternship(?:s)?\b', r'\bwork history\b'],
    "projects": [r'\bproject(?:s)?\b', r'\bacademic project(?:s)?\b', r'\bpersonal project(?:s)?\b', r'\btechnical project(?:s)?\b'],
    "skills": [r'\bskill(?:s)?\b', r'\btechnical skill(?:s)?\b', r'\btechnologies\b', r'\bcore competencies\b', r'\btools\b'],
    "certifications": [r'\bcertification(?:s)?\b', r'\bcertificates\b', r'\blicenses\b', r'\bcourses\b']
}


def extract_email(text: str) -> Optional[str]:
    """Find the first matching valid email address in text."""
    match = EMAIL_REGEX.search(text)
    return match.group(0) if match else None


def extract_phone(text: str) -> Optional[str]:
    """Find the first matching valid telephone number in text."""
    match = PHONE_REGEX.search(text)
    return match.group(0).strip() if match else None


def extract_name(text: str) -> str:
    """
    Extract the candidate's name using NER or heuristic top-line analysis.
    """
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if not lines:
        return "Candidate"

    # Try spaCy NER on the first 300 characters
    if nlp is not None and hasattr(nlp, "pipe_names") and "ner" in nlp.pipe_names:
        header_sample = "\n".join(lines[:4])
        doc = nlp(header_sample)
        for ent in doc.ents:
            if ent.label_ == "PERSON" and len(ent.text.split()) >= 2:
                # Sanity check: must not contain email or common header words
                name = ent.text.strip()
                if not re.search(r'(@|resume|curriculum|cv|developer|engineer)', name, re.IGNORECASE):
                    return name

    # Heuristic top-line extraction
    for line in lines[:5]:
        # Discard lines with email, website, phone or 'resume'
        if any(term in line.lower() for term in ['resume', 'curriculum', 'cv', '@', 'http', 'github', 'linkedin', 'phone']):
            continue
        # Name is usually 2 to 4 capitalized words without digits
        words = line.split()
        if 2 <= len(words) <= 4 and not re.search(r'\d', line) and len(line) < 40:
            # Check capitalization
            if all(w[0].isupper() or w.lower() in ['de', 'von', 'van'] for w in words if w):
                return line.strip()

    # Fallback to the first non-empty line
    first_line = lines[0]
    return first_line[:40] if len(first_line) > 40 else first_line


def segment_resume_sections(text: str) -> Dict[str, str]:
    """
    Segment the text into standard resume sections by matching common header patterns.
    """
    lines = text.split('\n')
    sections: Dict[str, List[str]] = {
        "header": [],
        "education": [],
        "experience": [],
        "projects": [],
        "skills": [],
        "certifications": [],
        "other": []
    }

    current_section = "header"

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        # Check if this line looks like a section header (short line, uppercase or title case)
        detected_header = None
        if len(stripped.split()) <= 4 and len(stripped) <= 45:
            for sec_key, patterns in SECTION_HEADERS.items():
                for pat in patterns:
                    if re.search(pat, stripped, re.IGNORECASE):
                        detected_header = sec_key
                        break
                if detected_header:
                    break

        if detected_header:
            current_section = detected_header
            continue

        sections[current_section].append(stripped)

    return {k: "\n".join(v) for k, v in sections.items()}


def extract_education(section_text: str, full_text: str) -> List[Dict[str, Any]]:
    """Extract education history from education section or full text."""
    target_text = section_text if len(section_text.strip()) > 30 else full_text
    lines = [l.strip() for l in target_text.split('\n') if l.strip()]

    education_records = []
    
    # Degree patterns
    for line in lines:
        for deg_pat in DEGREE_KEYWORDS:
            if re.search(deg_pat, line, re.IGNORECASE):
                # Extract graduation year if present
                year_match = re.search(r'\b(19\d{2}|20\d{2})(?:\s*[-–—]\s*(?:19\d{2}|20\d{2}|present|current))?\b', line, re.IGNORECASE)
                period = year_match.group(0) if year_match else None
                
                # Extract GPA / CGPA / Grade
                grade_match = re.search(r'(?:cgpa|gpa|percentage|score|grade)[:\s]*([0-9.]+(?:\s*/\s*[0-9.]+)?%?)', line, re.IGNORECASE)
                grade = grade_match.group(0) if grade_match else None

                degree_name = line
                # Truncate if excessively long
                if len(degree_name) > 120:
                    degree_name = degree_name[:120] + "..."

                education_records.append({
                    "degree": degree_name,
                    "institution": "University / Institute",
                    "period": period,
                    "grade": grade
                })
                break

    # If no specific regex hit, return a clean fallback if education section has content
    if not education_records and section_text:
        first_edu_lines = [l for l in section_text.split('\n') if l.strip()][:2]
        if first_edu_lines:
            education_records.append({
                "degree": first_edu_lines[0],
                "institution": first_edu_lines[1] if len(first_edu_lines) > 1 else None,
                "period": None,
                "grade": None
            })

    return education_records


def extract_experience(section_text: str) -> List[Dict[str, Any]]:
    """Extract experience entries and bullet points."""
    if not section_text:
        return []

    lines = [l.strip() for l in section_text.split('\n') if l.strip()]
    experience_list = []
    
    current_entry = None

    for line in lines:
        # Check if line looks like a job role or company (often contains dates or keywords like engineer, intern, developer)
        has_role_kw = any(kw in line.lower() for kw in ['engineer', 'developer', 'intern', 'analyst', 'manager', 'lead', 'architect', 'trainee', 'associate', 'consultant'])
        has_dates = bool(re.search(r'\b(20\d{2}|19\d{2})\b', line))

        is_bullet = line.startswith(('-', '•', '*', '–', '—')) or line[0].isdigit() and line[1] in ('.', ')')

        if (has_role_kw or has_dates) and not is_bullet:
            if current_entry:
                experience_list.append(current_entry)
            
            current_entry = {
                "role": line,
                "company": None,
                "period": None,
                "highlights": []
            }
        else:
            if current_entry:
                clean_bullet = re.sub(r'^[-•*–—\d.)\s]+', '', line).strip()
                if clean_bullet:
                    current_entry["highlights"].append(clean_bullet)
            elif not experience_list:
                # If no role header found yet, treat first few lines as initial entry
                current_entry = {
                    "role": line,
                    "company": None,
                    "period": None,
                    "highlights": []
                }

    if current_entry:
        experience_list.append(current_entry)

    return experience_list[:5]


def extract_projects(section_text: str) -> List[Dict[str, Any]]:
    """Extract projects from project section."""
    if not section_text:
        return []

    lines = [l.strip() for l in section_text.split('\n') if l.strip()]
    projects = []
    
    current_proj = None

    for line in lines:
        is_bullet = line.startswith(('-', '•', '*', '–', '—')) or (line[0].isdigit() and len(line) > 1 and line[1] in ('.', ')'))
        
        if not is_bullet and len(line) < 80:
            if current_proj:
                projects.append(current_proj)
            current_proj = {
                "title": line,
                "description": "",
                "technologies": extract_skills(line)
            }
        elif current_proj:
            bullet = re.sub(r'^[-•*–—\d.)\s]+', '', line).strip()
            if bullet:
                current_proj["description"] += (" " + bullet if current_proj["description"] else bullet)
                current_proj["technologies"] = list(set(current_proj["technologies"] + extract_skills(bullet)))

    if current_proj:
        projects.append(current_proj)

    return projects[:6]


def parse_resume_text(text: str) -> Dict[str, Any]:
    """
    Complete parser function that orchestrates parsing of contact details,
    skills, education, experience, projects, and certifications.
    """
    if not text:
        return {
            "name": "Candidate",
            "email": None,
            "phone": None,
            "skills": [],
            "education": [],
            "experience": [],
            "projects": [],
            "certifications": []
        }

    sections = segment_resume_sections(text)
    
    name = extract_name(text)
    email = extract_email(text)
    phone = extract_phone(text)
    skills = extract_skills(text)
    education = extract_education(sections.get("education", ""), text)
    experience = extract_experience(sections.get("experience", ""))
    projects = extract_projects(sections.get("projects", ""))

    # Certifications detection
    cert_text = sections.get("certifications", "")
    certifications = []
    if cert_text:
        certifications = [re.sub(r'^[-•*–—\s]+', '', l).strip() for l in cert_text.split('\n') if l.strip()]
    else:
        # Fallback keyword scan
        for line in text.split('\n'):
            if any(term in line.lower() for term in ['certified', 'certification', 'coursera', 'aws certified', 'udemy']):
                certifications.append(line.strip())

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "education": education,
        "experience": experience,
        "projects": projects,
        "certifications": certifications[:6]
    }
