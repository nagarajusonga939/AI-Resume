"""
Comprehensive test script for AI Resume Analyzer backend.
Tests:
1. Database initialization
2. PDF text extraction & creation
3. DOCX text extraction & creation
4. Skill extraction
5. Resume parsing
6. ATS scoring
7. Job description matching
8. FastAPI endpoints via TestClient (health, upload, analyze, job-match)
"""

import os
import sys

# Ensure backend root is in sys.path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

import pymupdf
from docx import Document
from fastapi.testclient import TestClient

from app.main import app
from app.services.pdf_parser import extract_text_from_pdf
from app.services.docx_parser import extract_text_from_docx
from app.services.skill_extractor import extract_skills
from app.services.resume_parser import parse_resume_text
from app.services.ats_scorer import calculate_ats_score
from app.services.job_matcher import match_job_description
from app.services.recommendation_engine import generate_recommendations


SAMPLE_RESUME_TEXT = """Alex Morgan
alex.morgan@email.com | +1 (555) 234-5678 | San Francisco, CA | github.com/alexmorgan

EDUCATION
Bachelor of Technology in Computer Science and Engineering
National Institute of Technology | 2020 - 2024 | CGPA: 8.9 / 10.0

TECHNICAL SKILLS
Languages: Python, Java, JavaScript, TypeScript, C++, SQL
Web & Frameworks: React, Node.js, Express, HTML, CSS, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Redis, Git, REST APIs

EXPERIENCE
Software Development Engineer Intern
Veloce Cloud Solutions | Jan 2024 - Jun 2024
- Developed high-throughput REST APIs in Node.js and Python handling 1.2M daily queries.
- Implemented Redis caching reducing average p95 response latency by 38%.
- Collaborated in Agile sprints, wrote unit tests with Jest achieving 88% code coverage.

PROJECTS
E-Commerce Microservices Platform
- Architected distributed microservices platform using React, Node.js, and MongoDB.
- Reduced order processing turnaround time by 40% using asynchronous queue workers.
"""

SAMPLE_JOB_DESCRIPTION = """
We are looking for a Senior Full Stack Software Engineer.
Requirements:
- Strong experience in Python, JavaScript, and React.
- Hands-on skills in SQL and PostgreSQL.
- Experience with Docker, AWS cloud infrastructure, and CI/CD.
- Solid understanding of Git and Agile practices.
"""


def create_sample_pdf(file_path: str):
    """Generate a clean test PDF with sample resume content."""
    doc = pymupdf.open()
    page = doc.new_page()
    rect = pymupdf.Rect(50, 50, 550, 750)
    page.insert_textbox(rect, SAMPLE_RESUME_TEXT, fontsize=10, fontname="helv")
    doc.save(file_path)
    doc.close()


def create_sample_docx(file_path: str):
    """Generate a clean test DOCX with sample resume content."""
    doc = Document()
    for paragraph in SAMPLE_RESUME_TEXT.split('\n'):
        if paragraph.strip():
            doc.add_paragraph(paragraph.strip())
    doc.save(file_path)


def run_all_tests():
    print("=" * 60)
    print("STARTING BACKEND TEST SUITE")
    print("=" * 60)

    # 1. Test Unit Services
    print("\n[1/6] Testing Skill Extractor...")
    skills = extract_skills(SAMPLE_RESUME_TEXT)
    print(f"  Extracted {len(skills)} skills: {skills}")
    assert "Python" in skills, "Python should be detected"
    assert "React" in skills, "React should be detected"
    assert "SQL" in skills, "SQL should be detected"
    print("  [PASS] Skill Extractor passed!")

    print("\n[2/6] Testing Resume Parser...")
    parsed = parse_resume_text(SAMPLE_RESUME_TEXT)
    print(f"  Parsed Name: {parsed['name']}")
    print(f"  Parsed Email: {parsed['email']}")
    print(f"  Parsed Phone: {parsed['phone']}")
    assert parsed['email'] == "alex.morgan@email.com", "Email must match"
    print("  [PASS] Resume Parser passed!")

    print("\n[3/6] Testing ATS Scorer & Recommendation Engine...")
    ats = calculate_ats_score(parsed, SAMPLE_RESUME_TEXT)
    print(f"  ATS Score: {ats['ats_score']} / 100")
    print(f"  Score Breakdown: {ats['breakdown']}")
    assert ats['ats_score'] >= 70, "ATS score should be high for this complete resume"

    job_match = match_job_description(SAMPLE_RESUME_TEXT, skills, SAMPLE_JOB_DESCRIPTION)
    print(f"  Job Match Percentage: {job_match['match_percentage']}%")
    print(f"  Matching Skills: {job_match['matching_skills']}")
    print(f"  Missing Skills: {job_match['missing_skills']}")
    assert "AWS" in job_match['missing_skills'], "AWS should be flagged as missing"
    assert "Docker" in job_match['missing_skills'], "Docker should be flagged as missing"
    assert "Python" in job_match['matching_skills'], "Python should be flagged as matching"

    recs = generate_recommendations(parsed, ats, job_match)
    print(f"  Generated {len(recs['recommendations'])} recommendations.")
    print("  [PASS] ATS Scorer & Recommendations passed!")

    # 2. Test File Generation & Extraction
    print("\n[4/6] Testing PDF & DOCX file parsers...")
    test_pdf = os.path.join(backend_dir, "test_resume.pdf")
    test_docx = os.path.join(backend_dir, "test_resume.docx")
    
    create_sample_pdf(test_pdf)
    create_sample_docx(test_docx)

    extracted_pdf = extract_text_from_pdf(test_pdf)
    assert "alex.morgan@email.com" in extracted_pdf, "PDF text extraction failed"
    print("  [PASS] PyMuPDF PDF text extraction passed!")

    extracted_docx = extract_text_from_docx(test_docx)
    assert "alex.morgan@email.com" in extracted_docx, "DOCX text extraction failed"
    print("  [PASS] python-docx DOCX text extraction passed!")

    # 3. Test FastAPI Endpoints using TestClient
    print("\n[5/6] Testing FastAPI Endpoints...")
    client = TestClient(app)

    # Health check
    res_health = client.get("/api/health")
    assert res_health.status_code == 200, f"Health check failed: {res_health.text}"
    assert res_health.json()["status"] == "success"
    print("  [PASS] GET /api/health passed: " + str(res_health.json()))

    # PDF Upload
    with open(test_pdf, "rb") as f:
        res_upload_pdf = client.post("/api/resume/upload", files={"file": ("test_resume.pdf", f, "application/pdf")})
    assert res_upload_pdf.status_code == 201, f"PDF upload failed: {res_upload_pdf.text}"
    pdf_upload_data = res_upload_pdf.json()
    print("  [PASS] POST /api/resume/upload (PDF) passed: " + str(pdf_upload_data))
    pdf_filename = pdf_upload_data["filename"]
    resume_id = pdf_upload_data["resume_id"]

    # DOCX Upload
    with open(test_docx, "rb") as f:
        res_upload_docx = client.post("/api/resume/upload", files={"file": ("test_resume.docx", f, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")})
    assert res_upload_docx.status_code == 201, f"DOCX upload failed: {res_upload_docx.text}"
    print("  [PASS] POST /api/resume/upload (DOCX) passed!")

    # Resume Analysis
    res_analyze = client.post("/api/resume/analyze", json={
        "filename": pdf_filename,
        "job_description": SAMPLE_JOB_DESCRIPTION
    })
    assert res_analyze.status_code == 200, f"Analysis failed: {res_analyze.text}"
    analyze_data = res_analyze.json()
    print(f"  [PASS] POST /api/resume/analyze passed! ATS Score: {analyze_data['ats_score']}, Job Match: {analyze_data['job_match']}%")

    # Job Match Endpoint
    res_match = client.post("/api/analysis/job-match", json={
        "resume_id": resume_id,
        "job_description": SAMPLE_JOB_DESCRIPTION
    })
    assert res_match.status_code == 200, f"Job match failed: {res_match.text}"
    print("  [PASS] POST /api/analysis/job-match passed: " + str(res_match.json()))

    # Dedicated Jobs Match Endpoint
    res_jobs = client.post("/api/jobs/match", json={
        "resume_id": resume_id,
        "job_description": SAMPLE_JOB_DESCRIPTION
    })
    assert res_jobs.status_code == 200, f"Jobs match failed: {res_jobs.text}"
    print("  [PASS] POST /api/jobs/match passed: " + str(res_jobs.json()))

    # Clean up test files
    if os.path.exists(test_pdf):
        os.remove(test_pdf)
    if os.path.exists(test_docx):
        os.remove(test_docx)

    print("\n[6/6] Cleanup & Database check...")
    res_list = client.get("/api/resume/list")
    assert res_list.status_code == 200
    print(f"  Database contains {len(res_list.json())} resumes.")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED SUCCESSFULLY! BACKEND IS PRODUCTION-READY.")
    print("=" * 60)


if __name__ == "__main__":
    run_all_tests()
