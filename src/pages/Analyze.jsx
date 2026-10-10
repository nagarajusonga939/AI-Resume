import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  X, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  FileCheck, 
  RefreshCw,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { sampleResumeData, sampleJobDescription } from '../data/mockData';

export default function Analyze() {
  const navigate = useNavigate();
  const { 
    currentFile, 
    setCurrentFile, 
    jobDescription, 
    setJobDescription, 
    runAnalysis, 
    isAnalyzing, 
    analysisProgress, 
    currentStageText, 
    removeFile,
    loadSampleResume 
  } = useResume();

  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // File validator
  const validateAndSetFile = (file) => {
    setErrorMessage('');
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('File size exceeds the 10 MB limit. Please choose a smaller file.');
      return false;
    }

    // Check extension
    const allowedExtensions = ['.pdf', '.docx', '.doc'];
    const fileName = file.name.toLowerCase();
    const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidExtension) {
      setErrorMessage('Unsupported format. Please upload a PDF or DOCX resume.');
      return false;
    }

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
          setCurrentFile({
            fileObj: file,
            name: file.name,
            size: sizeInMB,
            type: file.type || 'application/pdf',
            isSample: false
          });
          return 100;
        }
        return prev + 25;
      });
    }, 150);

    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    if (!currentFile) {
      setErrorMessage('Please select or upload a resume file first.');
      return;
    }

    await runAnalysis(currentFile, jobDescription);
    navigate('/results');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Resume Diagnostics Engine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text">
          Analyze Your Resume
        </h1>
        <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto">
          Upload your resume and let AI identify strengths, weaknesses and opportunities.
        </p>
      </div>

      {/* Main Grid: Upload on left, Job Description on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload Resume Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium relative">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-brand-text flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-primary" />
                Resume Document
              </h2>
              {/* Quick sample loader button */}
              <button
                type="button"
                onClick={loadSampleResume}
                className="text-xs font-semibold text-brand-primary hover:text-brand-secondary bg-brand-primary/10 hover:bg-brand-primary/15 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Use Sample Resume
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Upload Zone or Selected File View */}
            {!currentFile ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                  dragActive
                    ? 'border-brand-primary bg-brand-primary/5 scale-[1.01]'
                    : 'border-slate-300 hover:border-brand-primary/60 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-primary mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-brand-text mb-1">
                  Drag & drop your resume here
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted mb-4">
                  or <span className="text-brand-primary font-semibold hover:underline">browse files</span> from your computer
                </p>

                <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-100 text-[11px] text-brand-muted font-medium">
                  <span>PDF and DOCX supported</span>
                  <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                  <span>Maximum file size: 10 MB</span>
                </div>
              </div>
            ) : (
              /* Selected File Card */
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/30 border border-brand-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl gradient-bg text-white flex items-center justify-center shrink-0 shadow-sm">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-brand-text truncate">
                          {currentFile.name}
                        </p>
                        {currentFile.isSample && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-brand-primary border border-indigo-200">
                            Demo Sample
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-brand-muted mt-0.5">
                        <span className="uppercase font-semibold text-[11px]">
                          {currentFile.type.includes('pdf') ? 'PDF Document' : 'DOCX Word'}
                        </span>
                        <span>•</span>
                        <span>{currentFile.size}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                    title="Remove file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isUploading && (
                  <div className="space-y-1.5 animate-in fade-in">
                    <div className="flex justify-between text-xs text-brand-muted font-medium">
                      <span>Uploading file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="gradient-bg h-2 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Primary Analyze Button */}
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="w-full py-4 rounded-2xl text-base font-semibold text-white gradient-bg hover:opacity-95 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Analyze Resume with AI</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            )}

            {/* Quick helper tip */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-brand-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your files are processed securely in memory and never shared with third parties.</span>
            </div>

          </div>
        </div>

        {/* Right Column: Optional Job Description Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-lg text-brand-text flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-accent" />
                Paste Job Description
              </h2>
              <span className="text-[11px] font-semibold text-brand-muted bg-slate-100 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>

            <p className="text-xs text-brand-muted mb-4 leading-relaxed">
              Paste the target job description to measure keyword overlap, calculate precise job match score, and uncover specific missing skills.
            </p>

            <div className="relative">
              <textarea
                rows={9}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job requirements, responsibilities, and qualifications here..."
                className="w-full p-4 rounded-2xl border border-brand-border bg-slate-50/60 text-xs sm:text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:bg-white transition-all font-mono leading-relaxed resize-none"
              ></textarea>

              {/* Sample job loader quick button */}
              <div className="flex items-center justify-between mt-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setJobDescription(sampleJobDescription)}
                  className="text-brand-primary font-semibold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Load TechNova Full Stack Job
                </button>
                <span className="text-brand-muted">
                  {jobDescription ? `${jobDescription.length} characters` : 'Optional'}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={isAnalyzing || !currentFile}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-brand-text bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Analyze Match</span>
                <ArrowRight className="w-4 h-4 text-brand-primary" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ANALYSIS LOADING OVERLAY / STATE */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-brand-border text-center space-y-6 relative overflow-hidden">
            
            {/* Animated scanning bar on top */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 overflow-hidden">
              <div 
                className="gradient-bg h-full transition-all duration-300 ease-out"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>

            {/* Glowing Icon */}
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-2xl gradient-bg opacity-30 blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-2xl gradient-bg text-white flex items-center justify-center shadow-lg">
                <Sparkles className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold gradient-bg-subtle text-brand-primary border border-brand-primary/20">
                AI Pipeline Processing • {analysisProgress}%
              </span>
              <h3 className="font-display font-bold text-2xl text-brand-text">
                Analyzing Your Resume...
              </h3>
              <p className="text-sm text-brand-muted h-10 flex items-center justify-center font-medium">
                {currentStageText}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="gradient-bg h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>

            <p className="text-xs text-brand-muted italic">
              Evaluating against 500+ ATS heuristics, keyword matrices, and recruiter benchmarks.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
