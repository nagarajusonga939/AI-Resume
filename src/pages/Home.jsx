import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileSearch, 
  Cpu, 
  Target, 
  UploadCloud, 
  Award, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Check, 
  AlertCircle,
  FileText,
  Star,
  ChevronRight
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export default function Home() {
  const navigate = useNavigate();
  const { loadSampleResume } = useResume();

  const handleTryDemo = () => {
    loadSampleResume();
    navigate('/results');
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Subtle background glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 -z-10 pointer-events-none">
          <div className="absolute -top-12 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-grid-pattern opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />
                <span>AI-Powered Resume Analysis</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="hidden sm:inline text-brand-muted text-xs font-normal">Next-Gen ATS Parser</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text tracking-tight leading-[1.15]">
                Build a Resume That{' '}
                <span className="gradient-text relative inline-block">
                  Gets Noticed
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-primary/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg lg:text-xl text-brand-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Analyze your resume with AI, improve your ATS score, discover missing skills, and match your resume with your dream job.
              </p>

              {/* Buttons & Trust line */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/analyze"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-base font-semibold text-white gradient-bg hover:opacity-95 shadow-xl shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all duration-300 group"
                >
                  <span>Analyze My Resume</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-brand-text bg-white hover:bg-slate-50 border border-brand-border shadow-soft transition-all duration-200"
                >
                  <span>See How It Works</span>
                </a>

                {/* Instant Sample Demo Button */}
                <button
                  onClick={handleTryDemo}
                  className="text-xs font-semibold text-brand-primary hover:text-brand-secondary underline underline-offset-4 py-2 px-1 transition-colors"
                >
                  ⚡ Preview Sample Results
                </button>
              </div>

              {/* Quick trust proofs */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-brand-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Free instant score</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Supports PDF & DOCX</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Job Description Match</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual / Mock SaaS Dashboard Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card UI Mockup */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-premium border border-brand-border relative z-10 transition-transform duration-300 hover:shadow-card-hover">
                  
                  {/* Top Mock Window Header */}
                  <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      <span className="text-xs font-semibold text-slate-400 ml-2">resume_analysis_v2.ai</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ATS Scan Ready
                    </span>
                  </div>

                  {/* Candidate mini-profile preview */}
                  <div className="flex items-center justify-between mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        AM
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-text">Alex Morgan</h4>
                        <p className="text-xs text-brand-muted">Senior Full Stack Developer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-brand-muted uppercase">Format</span>
                      <p className="text-xs font-bold text-brand-primary">PDF • 1.4 MB</p>
                    </div>
                  </div>

                  {/* Circular Score & Core Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-gradient-to-br from-indigo-50/70 to-violet-50/70 p-4 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center text-center">
                      <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider mb-1">ATS Score</span>
                      <div className="text-3xl font-extrabold text-brand-text">
                        82<span className="text-xs font-bold text-brand-muted">/100</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Top 15% Tier
                      </span>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 p-4 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center">
                      <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider mb-1">Job Match</span>
                      <div className="text-3xl font-extrabold text-brand-text">
                        87<span className="text-xs font-bold text-brand-muted">%</span>
                      </div>
                      <span className="text-[10px] font-semibold text-brand-primary mt-1">
                        TechNova Role
                      </span>
                    </div>
                  </div>

                  {/* Detected Skills Preview */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-brand-text">Key Skills Detected</span>
                      <span className="text-brand-primary">18 Found</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'React', 'JavaScript', 'Node.js', 'SQL', 'Git'].map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                      <span className="px-2 py-1 rounded-lg text-[11px] font-semibold text-brand-primary bg-brand-primary/10">
                        +12 more
                      </span>
                    </div>
                  </div>

                  {/* AI Quick Insight Alert */}
                  <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      <strong className="font-semibold">Missing Cloud Keyword:</strong> Adding <em>AWS</em> and <em>Docker</em> will increase your match score to 94%.
                    </p>
                  </div>

                </div>

                {/* Floating Decorative Glass Pill 1: Top Right */}
                <div className="hidden sm:flex absolute -top-4 -right-6 glass-panel rounded-2xl p-3 shadow-lg border border-brand-border items-center gap-3 z-20 animate-float">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-text">Interview Ready</p>
                    <p className="text-[10px] text-brand-muted">Greenhouse & Workday Pass</p>
                  </div>
                </div>

                {/* Floating Decorative Glass Pill 2: Bottom Left */}
                <div className="hidden sm:flex absolute -bottom-5 -left-6 glass-panel rounded-2xl p-3 shadow-lg border border-brand-border items-center gap-3 z-20 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-text">AI Semantic Engine</p>
                    <p className="text-[10px] text-brand-muted">TF-IDF + Vector Match</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE CORE FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Features Built for Candidates</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text">
            Engineered to Beat Modern Applicant Tracking Systems
          </h2>
          <p className="text-sm sm:text-base text-brand-muted">
            Over 75% of resumes are filtered out before reaching hiring managers. ResumeAI gives you the exact competitive edge needed to land the interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1: ATS Score */}
          <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-text mb-3">
              1. ATS Score
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-6">
              Check how well your resume performs with Applicant Tracking Systems. Evaluate parsing compatibility, formatting, typography, and section headers.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Simulates Taleo, Greenhouse & Workday</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Format & layout readability checks</span>
              </div>
            </div>
          </div>

          {/* Feature 2: AI Skill Analysis */}
          <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-brand-secondary mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-text mb-3">
              2. AI Skill Analysis
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-6">
              Automatically identify your technical and professional skills. Categorize languages, frameworks, cloud tooling, databases, and core proficiencies.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Detects 500+ technical skill taxonomies</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Highlights implicit vs explicit competencies</span>
              </div>
            </div>
          </div>

          {/* Feature 3: Job Match */}
          <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-text mb-3">
              3. Job Match
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-6">
              Compare your resume against a job description and find missing skills. Get a percentage match and actionable suggestions to bridge the gap.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Keyword frequency & semantic gap detection</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Tailored bullet point rewrite suggestions</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-brand-border shadow-premium">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Simple 3-Step Process</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text">
              How ResumeAI Works
            </h2>
            <p className="text-sm sm:text-base text-brand-muted">
              Turn your resume into an interview-generating document in under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 01 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-soft transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl gradient-bg text-white font-display font-bold text-lg flex items-center justify-center mb-5 shadow-md shadow-brand-primary/20">
                01
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-100/70 text-brand-primary flex items-center justify-center mb-4">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-text mb-2">
                Upload Resume
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Upload your resume in PDF or DOCX format. Optionally paste a job description you are targeting.
              </p>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-soft transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brand-secondary to-brand-accent text-white font-display font-bold text-lg flex items-center justify-center mb-5 shadow-md shadow-brand-secondary/20">
                02
              </div>
              <div className="w-12 h-12 rounded-full bg-violet-100/70 text-brand-secondary flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-text mb-2">
                AI Analyzes Resume
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Our semantic NLP engine parses entities, measures keyword density, and checks layout against ATS algorithms.
              </p>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-soft transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brand-accent to-emerald-500 text-white font-display font-bold text-lg flex items-center justify-center mb-5 shadow-md shadow-brand-accent/20">
                03
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-emerald-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-text mb-2">
                Get Personalized Results
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Receive an ATS score, identify missing skills, compare job description alignment, and export a clear action plan.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary group"
            >
              <span>Start Analyzing Now</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            {/* Stat 1 */}
            <div className="pt-4 md:pt-0 space-y-2">
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">
                95%
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white">
                Analysis Accuracy
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
                Evaluated against real candidate hiring rounds and recruiter screening pipelines.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="pt-4 md:pt-0 space-y-2">
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                10K+
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white">
                Resumes Analyzed
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
                Engineers, analysts, and project managers trusting ResumeAI for tech applications.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="pt-4 md:pt-0 space-y-2">
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                500+
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white">
                Skills Detected
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
                Comprehensive dictionary across cloud, frontend, backend, AI/ML, and DevOps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-brand-border p-8 sm:p-16 text-center shadow-premium">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Ahead of the Competition</span>
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text">
              Ready to improve your resume?
            </h2>

            <p className="text-sm sm:text-base text-brand-muted">
              Stop guessing why your applications aren't getting replies. Upload your resume now and get deep ATS diagnostic feedback in seconds.
            </p>

            <div className="pt-2">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white gradient-bg hover:opacity-95 shadow-xl shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all duration-300 group"
              >
                <span>Analyze My Resume</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
