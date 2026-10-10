/**
 * ResumeAI API Service Client
 * Configured to connect seamlessly to the FastAPI backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Check backend health status
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Backend health check error:', error.message);
    return { status: 'offline', message: error.message };
  }
}

/**
 * Upload resume (PDF or DOCX) to backend
 * @param {File} file - File object from input or dropzone
 * @returns {Promise<{success: boolean, filename: string, resume_id?: number}>}
 */
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/resume/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Upload failed');
  }

  return data;
}

/**
 * Run full analysis on uploaded resume
 * @param {Object} params
 * @param {string} [params.filename] - Stored filename on server
 * @param {number} [params.resume_id] - Database ID of resume
 * @param {string} [params.job_description] - Optional job description text
 */
export async function analyzeResume({ filename, resume_id, job_description }) {
  const response = await fetch(`${API_BASE_URL}/api/resume/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename,
      resume_id,
      job_description: job_description || '',
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Analysis failed');
  }

  return data;
}

/**
 * Match resume against a job description
 * @param {Object} params
 * @param {number} [params.resume_id]
 * @param {string} [params.filename]
 * @param {string} params.job_description
 */
export async function matchJob({ resume_id, filename, job_description }) {
  const response = await fetch(`${API_BASE_URL}/api/analysis/job-match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resume_id,
      filename,
      job_description,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Job matching failed');
  }

  return data;
}

/**
 * Fetch list of all analyzed resumes
 */
export async function listResumes() {
  const response = await fetch(`${API_BASE_URL}/api/resume/list`);
  if (!response.ok) {
    throw new Error(`Failed to list resumes: ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetch a specific resume by ID
 * @param {number} resumeId
 */
export async function getResume(resumeId) {
  const response = await fetch(`${API_BASE_URL}/api/resume/${resumeId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch resume: ${response.status}`);
  }
  return await response.json();
}

export default {
  API_BASE_URL,
  checkHealth,
  uploadResume,
  analyzeResume,
  matchJob,
  listResumes,
  getResume,
};
