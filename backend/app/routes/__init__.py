from .resume import router as resume_router
from .analysis import router as analysis_router
from .jobs import router as jobs_router

__all__ = ["resume_router", "analysis_router", "jobs_router"]
