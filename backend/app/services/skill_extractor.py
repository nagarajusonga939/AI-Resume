import re
from typing import List, Dict, Set


# Standard categorized skills dictionary
SKILL_TAXONOMY: Dict[str, List[str]] = {
    "Programming": [
        "Python", "Java", "C++", "C#", "C", "JavaScript", "TypeScript", 
        "Go", "Golang", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "R", "Scala"
    ],
    "Web": [
        "HTML", "HTML5", "CSS", "CSS3", "React", "React.js", "Node.js", "Node",
        "Express", "Express.js", "Angular", "Vue", "Vue.js", "Next.js", 
        "Django", "Flask", "FastAPI", "Spring Boot", "Tailwind CSS", "Bootstrap",
        "Redux", "GraphQL", "REST APIs", "RESTful APIs"
    ],
    "Database": [
        "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", 
        "Oracle", "Cassandra", "DynamoDB", "Firebase", "Elasticsearch"
    ],
    "Cloud": [
        "AWS", "Amazon Web Services", "Azure", "Microsoft Azure", 
        "Google Cloud", "GCP", "Cloud Computing", "Serverless", "Lambda", "EC2", "S3"
    ],
    "Tools": [
        "Git", "GitHub", "GitLab", "Docker", "Kubernetes", "CI/CD", 
        "Jenkins", "Linux", "Jira", "Terraform", "Postman", "Webpack", "Vite"
    ],
    "AI/ML": [
        "Machine Learning", "Deep Learning", "NLP", "Natural Language Processing",
        "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", 
        "Pandas", "NumPy", "Data Science", "Computer Vision", "LLMs", "Generative AI"
    ],
    "Soft Skills": [
        "Leadership", "Agile", "Scrum", "Communication", "Problem Solving",
        "Teamwork", "Critical Thinking", "Project Management"
    ]
}


def build_skill_pattern(skill: str) -> re.Pattern:
    """Build a regex pattern with appropriate word boundaries and escaping."""
    escaped = re.escape(skill)
    # For special cases like C++, C#, .NET
    if skill in ["C++", "C#", "C"]:
        return re.compile(rf'(?<!\w){escaped}(?!\w)', re.IGNORECASE)
    return re.compile(rf'\b{escaped}\b', re.IGNORECASE)


# Precompile regex patterns for performance
SKILL_PATTERNS = {
    category: [(skill, build_skill_pattern(skill)) for skill in skills]
    for category, skills in SKILL_TAXONOMY.items()
}


def extract_skills(text: str) -> List[str]:
    """
    Extract technical and professional skills found in the text.
    
    Args:
        text (str): Resume or job description text.
        
    Returns:
        List[str]: Unique list of matched skills in their canonical casing.
    """
    if not text:
        return []

    detected_skills: Set[str] = set()

    for category, skill_list in SKILL_PATTERNS.items():
        for canonical_name, pattern in skill_list:
            if pattern.search(text):
                # Standardize aliases (e.g. Node -> Node.js, React.js -> React)
                alias_map = {
                    "Node": "Node.js",
                    "React.js": "React",
                    "Vue.js": "Vue",
                    "Express.js": "Express",
                    "Golang": "Go",
                    "HTML5": "HTML",
                    "CSS3": "CSS",
                    "Amazon Web Services": "AWS",
                    "Microsoft Azure": "Azure",
                    "Google Cloud": "Google Cloud",
                    "RESTful APIs": "REST APIs"
                }
                standard_name = alias_map.get(canonical_name, canonical_name)
                detected_skills.add(standard_name)

    # Sort naturally for clean, deterministic output
    return sorted(list(detected_skills))


def extract_skills_by_category(text: str) -> Dict[str, List[str]]:
    """Group extracted skills by category."""
    all_skills = set(extract_skills(text))
    categorized: Dict[str, List[str]] = {}

    for category, skills in SKILL_TAXONOMY.items():
        matched = [s for s in skills if s in all_skills]
        if matched:
            categorized[category] = matched

    return categorized
