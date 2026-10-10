# AI Resume Analyzer — FastAPI Backend

A production-ready, modular Python FastAPI backend for **ResumeAI**, an AI-powered resume analysis and ATS score optimization system.

---

## 1. Project Overview

The **AI Resume Analyzer Backend** parses resumes in PDF and DOCX formats, extracts named entities (candidate name, email, phone, education, experience, projects, skills), calculates transparent Applicant Tracking System (ATS) scores, compares qualifications against target job descriptions, and generates personalized recommendations to improve candidate hiring outcomes.

---

## 2. Backend Architecture

The backend follows a clean, decoupled service-oriented architecture:

```
backend/
├── app/
│   ├── main.py                     # FastAPI application, CORS, lifecycle & error handlers
│   ├── models/
│   │   └── database.py             # SQLAlchemy models (User, Resume, AnalysisResult) & SQLite engine
│   ├── routes/
│   │   ├── resume.py               # Endpoints for uploading, analyzing & retrieving resumes
│   │   ├── analysis.py             # Endpoints for standalone analysis & job matching
│   │   └── jobs.py                 # Dedicated job description matching routes
│   ├── schemas/
│   │   └── resume_schema.py        # Pydantic v2 validation models for requests & responses
│   └── services/
│       ├── pdf_parser.py           # PyMuPDF text & page structure extractor
│       ├── docx_parser.py          # python-docx paragraph & table extractor
│       ├── resume_parser.py        # Regex & NLP entity extraction (Contact, Education, Work)
│       ├── skill_extractor.py      # 500+ skill taxonomy dictionary with regex boundary matching
│       ├── ats_scorer.py           # Multi-factor ATS scoring algorithm (0 to 100)
│       ├── job_matcher.py          # Keyword frequency & semantic gap detection
│       └── recommendation_engine.py# Actionable rewrite & improvement suggestions generator
├── uploads/                        # Local storage for uploaded PDF & DOCX resumes
├── requirements.txt                # Python dependencies
├── .env                            # Application environment configuration
├── .gitignore                      # Git exclusion rules
└── README.md                       # Comprehensive documentation
```

---

## 3. Installation & Virtual Environment Setup

### Prerequisites
- Python 3.11+
- pip (Python package installer)

### Step 1: Open a terminal in the `backend/` directory
```bash
cd backend
```

### Step 2: Create a Python virtual environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

---

## 4. Dependency Installation

Install all required packages from `requirements.txt`:

```bash
pip install -r requirements.txt
```

---

## 5. Running the Server

Start the development server with hot-reload enabled using Uvicorn:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Once running:
- **Base URL:** `http://127.0.0.1:8000`
- **Interactive Swagger Documentation:** `http://127.0.0.1:8000/docs`
- **ReDoc Documentation:** `http://127.0.0.1:8000/redoc`

---

## 6. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/resume/upload` | Upload PDF or DOCX file (Max 10 MB) |
| `POST` | `/api/resume/analyze` | Run ATS score, skill extraction & JD comparison |
| `GET` | `/api/resume/list` | List all uploaded resumes |
| `GET` | `/api/resume/{resume_id}` | Retrieve details of a specific resume |
| `POST` | `/api/analysis/analyze` | Standalone analysis route |
| `POST` | `/api/analysis/job-match` | Compare resume against job description |
| `POST` | `/api/jobs/match` | Match resume to job description |

---

## 7. Frontend Connection

The backend is configured with CORS to permit requests from:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React)

### Connecting your React frontend:
1. Ensure your React project root contains a `.env` file with:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```
2. Use the provided client module in `src/services/api.js`:
   ```javascript
   import { uploadResume, analyzeResume, checkHealth } from './services/api';

   // 1. Health check
   const health = await checkHealth();

   // 2. Upload file
   const uploadRes = await uploadResume(file);

   // 3. Analyze resume
   const analysis = await analyzeResume({
     filename: uploadRes.filename,
     job_description: "Target job requirements..."
   });
   ```

---

## 8. Example API Requests & Responses

### 1. Health Check
**Request:**
```http
GET /api/health HTTP/1.1
Host: 127.0.0.1:8000
```

**Response:**
```json
{
  "status": "success",
  "message": "AI Resume Analyzer backend is running"
}
```

---

### 2. Upload Resume
**Request:**
```http
POST /api/resume/upload HTTP/1.1
Host: 127.0.0.1:8000
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="Alex_Morgan_Resume.pdf"
Content-Type: application/pdf

[Binary PDF Data]
------WebKitFormBoundary--
```

**Response:**
```json
{
  "success": true,
  "filename": "resume_a3b89f21.pdf",
  "resume_id": 1,
  "message": "Resume uploaded successfully",
  "file_size": 1420512
}
```

---

### 3. Complete Resume Analysis
**Request:**
```http
POST /api/resume/analyze HTTP/1.1
Host: 127.0.0.1:8000
Content-Type: application/json

{
  "filename": "resume_a3b89f21.pdf",
  "job_description": "We are seeking a Full Stack Software Engineer skilled in Python, React, SQL, Docker, and AWS."
}
```

**Response:**
```json
{
  "success": true,
  "resume_id": 1,
  "filename": "resume_a3b89f21.pdf",
  "resume": {
    "name": "Alex Morgan",
    "email": "alex.morgan@email.com",
    "phone": "+1 (555) 234-5678",
    "education": [
      {
        "degree": "B.Tech in Computer Science and Engineering",
        "institution": "National Institute of Technology",
        "period": "2020 — 2024",
        "grade": "CGPA: 8.9 / 10.0"
      }
    ],
    "experience": [
      {
        "role": "Software Development Engineer Intern",
        "company": "Veloce Cloud Solutions",
        "period": "Jan 2024 — Jun 2024",
        "highlights": [
          "Developed high-throughput REST APIs in Node.js and Python handling 1.2M daily queries.",
          "Implemented Redis caching reducing average p95 response latency by 38%."
        ]
      }
    ],
    "projects": [],
    "certifications": []
  },
  "ats_score": 82,
  "breakdown": {
    "contact_information": 10,
    "skills": 20,
    "education": 15,
    "experience": 20,
    "projects": 2,
    "keywords": 7,
    "formatting": 15
  },
  "skills": [
    "Git",
    "HTML",
    "JavaScript",
    "Node.js",
    "Python",
    "React",
    "Redis",
    "SQL"
  ],
  "missing_skills": [
    "AWS",
    "Docker"
  ],
  "matching_skills": [
    "Python",
    "React",
    "SQL"
  ],
  "job_match": 87,
  "strengths": [
    "Strong technical skill coverage with 8 recognized technologies.",
    "Complete and clear contact information detected in header.",
    "Education and academic background are clearly structured.",
    "Effective use of quantifiable metrics and active engineering verbs."
  ],
  "improvements": [
    "Expand technical projects section with links to GitHub repositories or live demos.",
    "Add recognized certifications (e.g. AWS, Azure, Google Cloud, HackerRank).",
    "Include a concise 2-3 line professional summary targeting your primary role."
  ],
  "recommendations": [
    "Incorporate high-priority missing skills: AWS, Docker if experienced.",
    "Ensure your bullet points start with strong action verbs (Architected, Engineered, Optimized).",
    "Optimize section headers to standard naming: 'Technical Skills', 'Experience', 'Education'."
  ]
}
```

---

## 9. Future LLM / AI API Integration

The backend is built with clear interfaces in `app/services/`:
- `resume_parser.py`
- `recommendation_engine.py`

When ready to integrate OpenAI, Google Gemini, Anthropic, or an open-weights LLM, simply wrap the function calls in those service files with an API client without modifying routes or data schemas.
