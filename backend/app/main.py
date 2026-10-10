import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from dotenv import load_dotenv

from .models.database import init_db
from .schemas.resume_schema import HealthResponse, ErrorResponse
from .routes.resume import router as resume_router
from .routes.analysis import router as analysis_router
from .routes.jobs import router as jobs_router

# Load environment configuration
load_dotenv()

APP_NAME = os.getenv("APP_NAME", "AI Resume Analyzer")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploads")))
os.makedirs(UPLOAD_DIR, exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle hook: run on startup and shutdown."""
    # Initialize SQLite database schema
    init_db()
    yield


app = FastAPI(
    title=APP_NAME,
    description="Production-ready FastAPI backend for AI Resume Analyzer, providing ATS scoring, NLP skill extraction, and job matching.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# Global Exception Handlers for clean, consistent error responses
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail
        }
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    error_messages = [f"{err['loc'][-1]}: {err['msg']}" for err in exc.errors()]
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": f"Validation error: {'; '.join(error_messages)}"
        }
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": f"Internal server error: {str(exc)}"
        }
    )


# Health Check Endpoint
@app.get(
    "/api/health",
    response_model=HealthResponse,
    tags=["System"],
    summary="Backend Health Check",
    description="Check whether the FastAPI backend server is alive and operational."
)
async def health_check():
    return {
        "status": "success",
        "message": "AI Resume Analyzer backend is running"
    }


# Include Routers
app.include_router(resume_router)
app.include_router(analysis_router)
app.include_router(jobs_router)


if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
