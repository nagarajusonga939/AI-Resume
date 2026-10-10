import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Cpu, 
  Target, 
  ShieldCheck, 
  FileSearch, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  BrainCircuit, 
  Workflow, 
  Zap, 
  Terminal, 
  GraduationCap 
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Project Documentation & Research</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-text">
          About <span className="gradient-text">ResumeAI</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto">
          An advanced machine learning & NLP system engineered to decode applicant tracking algorithms and level the hiring playing field.
        </p>
      </div>

      {/* SECTION 1: WHAT IS RESUMEAI? */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-premium relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Overview</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-text">
              What is ResumeAI?
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              <strong>ResumeAI</strong> is a commercial-grade, AI-driven SaaS platform engineered specifically to help job seekers, students, and engineers understand how enterprise hiring platforms evaluate their qualifications.
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              Developed as a CSE Capstone Major Project, ResumeAI blends computational linguistics, entity recognition, and document structure validation into an intuitive, accessible dashboard that scores ATS compatibility in seconds.
            </p>
            
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Deterministic ATS Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Taxonomy of 500+ Tech Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Contextual Job Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Privacy Focused</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>Project Specification</span>
            </div>
            <div className="space-y-2 text-xs text-brand-muted">
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="font-medium text-slate-700">Domain</span>
                <span className="text-brand-text font-semibold">Natural Language Processing (NLP) & Information Retrieval</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="font-medium text-slate-700">Client Framework</span>
                <span className="text-brand-text font-semibold">React 19 + Vite + Tailwind CSS</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="font-medium text-slate-700">Analytics</span>
                <span className="text-brand-text font-semibold">Chart.js Engine + Heuristics Model</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-medium text-slate-700">Architecture</span>
                <span className="text-brand-text font-semibold">Decoupled Microservice Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW AI ANALYZES RESUMES */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-premium space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Core Engineering</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-text">
            How AI Analyzes Resumes
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            The multi-stage natural language pipeline behind our resume evaluation engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl gradient-bg text-white font-bold flex items-center justify-center">
              1
            </div>
            <h4 className="font-display font-bold text-sm text-brand-text">
              Document Parsing & Layout Extraction
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Raw bytes from PDF/DOCX are converted into structured document trees, isolating headers, body text, tables, and contact coordinates.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white font-bold flex items-center justify-center">
              2
            </div>
            <h4 className="font-display font-bold text-sm text-brand-text">
              Named Entity Recognition (NER)
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Linguistic entity models detect technical skills, academic degrees, company names, job titles, certifications, and dates.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">
              3
            </div>
            <h4 className="font-display font-bold text-sm text-brand-text">
              Vector & Semantic Embeddings
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Experience bullet points are cross-compared with target job descriptions using cosine similarity to quantify alignment.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">
              4
            </div>
            <h4 className="font-display font-bold text-sm text-brand-text">
              Heuristic ATS Scoring
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Rules derived from Taleo, Greenhouse, and Workday evaluate section completeness, metric quantification, and keyword frequency.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: WHY ATS OPTIMIZATION MATTERS */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-premium space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600">The Problem</span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-text">
          Why ATS Optimization Matters
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
            <span className="font-display text-3xl font-extrabold text-rose-600">75%+</span>
            <h4 className="font-bold text-sm text-rose-950">Resumes Discarded Automatically</h4>
            <p className="text-xs text-rose-900/80 leading-relaxed">
              Most applications are filtered out by automated keyword filters before a human hiring manager ever reads them.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
            <span className="font-display text-3xl font-extrabold text-amber-600">6 Seconds</span>
            <h4 className="font-bold text-sm text-amber-950">Average Recruiter Scan</h4>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Even resumes that survive ATS bots receive only seconds of human glance time. Structured hierarchy and clear metrics are non-negotiable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
            <span className="font-display text-3xl font-extrabold text-brand-primary">3.2x</span>
            <h4 className="font-bold text-sm text-indigo-950">Higher Interview Rate</h4>
            <p className="text-xs text-indigo-900/80 leading-relaxed">
              Candidates who optimize their resumes for both ATS keywords and quantifiable accomplishments experience over 3x higher callback rates.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            Ready to test your resume with our diagnostic algorithm?
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-xs shadow-md shadow-brand-primary/20 hover:opacity-95"
          >
            <span>Run Free Resume Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
