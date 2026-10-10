import urllib.request
import json
import os
import pymupdf

# 1. Test Health
req = urllib.request.urlopen("http://127.0.0.1:8000/api/health")
health_data = json.loads(req.read().decode())
print("1. Health Endpoint:", health_data)
assert health_data["status"] == "success"

# 2. Test PDF upload via requests or httpx
import requests

sample_resume = """John Doe
john.doe@example.com | +1 555-0199 | San Francisco, CA

EDUCATION
B.Tech in Computer Science, State University, 2024

SKILLS
Python, Java, React, SQL, Git, Docker

EXPERIENCE
Software Engineer Intern - Acme Labs (2024)
- Developed REST APIs in Python handling 500K queries
- Built frontend components using React

PROJECTS
Task Manager App: Full stack app with Python and React
"""

doc = pymupdf.open()
page = doc.new_page()
page.insert_textbox(pymupdf.Rect(50, 50, 500, 700), sample_resume)
pdf_bytes = doc.tobytes()
doc.close()

files = {'file': ('john_doe_resume.pdf', pdf_bytes, 'application/pdf')}
upload_resp = requests.post("http://127.0.0.1:8000/api/resume/upload", files=files)
print("2. Upload Response:", upload_resp.status_code, upload_resp.json())
assert upload_resp.status_code == 201
upload_json = upload_resp.json()

# 3. Test Analyze
analyze_payload = {
    "filename": upload_json["filename"],
    "job_description": "We need a Software Engineer with Python, React, SQL, and AWS."
}
analyze_resp = requests.post("http://127.0.0.1:8000/api/resume/analyze", json=analyze_payload)
print("3. Analyze Response:", analyze_resp.status_code)
analysis_json = analyze_resp.json()
print("   ATS Score:", analysis_json.get("ats_score"))
print("   Skills:", analysis_json.get("skills"))
print("   Job Match:", analysis_json.get("job_match"))
print("   Matching Skills:", analysis_json.get("matching_skills"))
print("   Missing Skills:", analysis_json.get("missing_skills"))
assert analyze_resp.status_code == 200

# 4. Test Job Match endpoint
match_payload = {
    "resume_id": upload_json["resume_id"],
    "job_description": "Requirements: Python, React, AWS, Docker"
}
match_resp = requests.post("http://127.0.0.1:8000/api/analysis/job-match", json=match_payload)
print("4. Job Match Response:", match_resp.status_code, match_resp.json())
assert match_resp.status_code == 200

print("\nALL HTTP ENDPOINTS VERIFIED AND WORKING OVER NETWORK!")
