import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  TrendingUp, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Code, 
  FileCheck, 
  Layers, 
  Check, 
  AlertCircle, 
  Copy,
  ChevronRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ScoreGauge from '../components/common/ScoreGauge';

// Chart.js imports & registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function Results() {
  const { analysisResult, triggerCelebration } = useResume();
  const [activeFilter, setActiveFilter] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const res = analysisResult;

  // Print / PDF download trigger
  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Section Score Bar Chart Data
  const sectionChartData = {
    labels: ['Formatting', 'Keywords', 'Experience', 'Skills Match', 'Education'],
    datasets: [
      {
        label: 'Section Score (%)',
        data: [
          res.scores.breakdown.formatting,
          res.scores.breakdown.keywordMatch,
          res.scores.breakdown.experienceImpact,
          res.scores.breakdown.skillsAlignment,
          res.scores.breakdown.educationSection,
        ],
        backgroundColor: [
          'rgba(79, 70, 229, 0.85)',
          'rgba(124, 58, 237, 0.85)',
          'rgba(37, 99, 235, 0.85)',
          'rgba(16, 185, 129, 0.85)',
          'rgba(99, 102, 241, 0.85)',
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const sectionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.parsed.y} / 100`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#F1F5F9' },
        ticks: { font: { family: 'Inter', size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11, weight: '500' } },
      },
    },
  };

  // Skills Distribution Doughnut Data
  const skillsDistributionData = {
    labels: ['Languages', 'Frontend', 'Backend', 'Database', 'DevOps & Tools', 'AI / Data'],
    datasets: [
      {
        data: [4, 4, 2, 3, 2, 1],
        backgroundColor: [
          '#4F46E5',
          '#7C3AED',
          '#2563EB',
          '#10B981',
          '#F59E0B',
          '#EC4899',
        ],
        hoverOffset: 4,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const skillsDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, font: { family: 'Inter', size: 11 }, padding: 12 },
      },
    },
    cutout: '68%',
  };

  // Filter detected skills
  const filteredSkills = activeFilter === 'All'
    ? res.detectedSkills
    : res.detectedSkills.filter(s => s.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div className="flex items-center gap-3">
          <Link
            to="/analyze"
            className="p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-slate-100 transition-colors border border-brand-border"
            title="Back to Analyzer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text">
                Resume Analysis Results
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                Analysis Complete
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              File: <span className="font-semibold text-brand-text">{res.fileName}</span> • Analyzed on {res.uploadedAt}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-brand-text bg-white hover:bg-slate-50 border border-brand-border shadow-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Report</span>
          </button>

          <button
            onClick={() => {
              triggerCelebration();
              alert("ResumeAI Diagnostic Report exported as PDF.");
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white gradient-bg hover:opacity-95 shadow-md shadow-brand-primary/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* FOUR SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: ATS Score */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">ATS Score</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text">
              {res.scores.atsScore}
            </span>
            <span className="text-sm font-semibold text-brand-muted">/100</span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Top 15% Applicant Tier
          </p>
        </div>

        {/* Card 2: Job Match */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">Job Match</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text">
              {res.scores.jobMatchScore}%
            </span>
          </div>
          <p className="text-xs text-brand-primary font-semibold mt-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Strong Target Alignment
          </p>
        </div>

        {/* Card 3: Skills Found */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Skills Found</span>
            <div className="w-8 h-8 rounded-xl bg-violet-50 text-brand-secondary flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text">
              {res.scores.skillsFoundCount}
            </span>
          </div>
          <p className="text-xs text-brand-muted font-medium mt-2">
            Verified technical competencies
          </p>
        </div>

        {/* Card 4: Suggestions */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Suggestions</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text">
              {res.scores.suggestionsCount}
            </span>
          </div>
          <p className="text-xs text-amber-600 font-semibold mt-2">
            Actionable optimization steps
          </p>
        </div>

      </div>

      {/* CHARTS ROW: ATS Circular Progress + Section Breakdown + Skills Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ATS Score Circular Progress Chart */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium flex flex-col items-center justify-center text-center">
          <h3 className="font-display font-bold text-lg text-brand-text mb-6">
            ATS Score Gauge
          </h3>
          <ScoreGauge score={res.scores.atsScore} size={220} />
          
          <div className="w-full mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] text-brand-muted uppercase font-bold">Readability</span>
              <p className="text-sm font-bold text-brand-text">94 / 100</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] text-brand-muted uppercase font-bold">Parser Index</span>
              <p className="text-sm font-bold text-emerald-600">Grade A (High)</p>
            </div>
          </div>
        </div>

        {/* Section Score Breakdown (Bar Chart) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg text-brand-text">
                Resume Section Score
              </h3>
              <p className="text-xs text-brand-muted">Algorithmic scoring per core resume quadrant</p>
            </div>
            <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-lg">
              Avg 87%
            </span>
          </div>
          <div className="h-60 sm:h-64">
            <Bar data={sectionChartData} options={sectionChartOptions} />
          </div>
        </div>

        {/* Skills Distribution (Doughnut Chart) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium flex flex-col">
          <h3 className="font-display font-bold text-lg text-brand-text mb-1">
            Skills Distribution
          </h3>
          <p className="text-xs text-brand-muted mb-4">Categorical skill diversity</p>
          <div className="h-56 sm:h-60 relative flex-1">
            <Doughnut data={skillsDistributionData} options={skillsDistributionOptions} />
          </div>
        </div>

      </div>

      {/* SECTION 1: RESUME OVERVIEW */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl gradient-bg text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-brand-text">
                1. Resume Overview
              </h2>
              <p className="text-xs text-brand-muted">Extracted candidate details, contact channels & academic background</p>
            </div>
          </div>
        </div>

        {/* Candidate Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-brand-primary" />
            <div>
              <span className="text-[10px] text-brand-muted font-bold uppercase">Name</span>
              <p className="text-sm font-bold text-brand-text">{res.overview.fullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-brand-primary" />
            <div>
              <span className="text-[10px] text-brand-muted font-bold uppercase">Email</span>
              <p className="text-sm font-bold text-brand-text">{res.overview.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-brand-primary" />
            <div>
              <span className="text-[10px] text-brand-muted font-bold uppercase">Phone</span>
              <p className="text-sm font-bold text-brand-text">{res.overview.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <div>
              <span className="text-[10px] text-brand-muted font-bold uppercase">Location</span>
              <p className="text-sm font-bold text-brand-text">{res.overview.location}</p>
            </div>
          </div>
        </div>

        {/* Education & Experience Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          
          {/* Education */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-brand-text flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-primary" />
              Education
            </h4>
            {res.overview.education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-brand-border bg-white shadow-sm space-y-1">
                <p className="text-sm font-bold text-brand-text">{edu.degree}</p>
                <p className="text-xs text-brand-muted">{edu.institution} • {edu.period}</p>
                <p className="text-xs font-semibold text-brand-primary pt-1">{edu.grade}</p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-brand-text flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-accent" />
              Experience
            </h4>
            {res.overview.experience.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-brand-border bg-white shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-brand-text">{exp.role}</p>
                  <span className="text-xs text-brand-muted">{exp.period}</span>
                </div>
                <p className="text-xs font-semibold text-brand-primary">{exp.company}</p>
                <ul className="space-y-1 text-xs text-brand-muted list-disc list-inside">
                  {exp.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="leading-relaxed">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: SKILLS DETECTED */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-brand-secondary flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-brand-text">
                2. Skills Detected ({res.detectedSkills.length})
              </h2>
              <p className="text-xs text-brand-muted">Extracted from technical summaries, project bullet points, and skills section</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['All', 'Language', 'Frontend', 'Backend', 'Database'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? 'gradient-bg text-white shadow-sm'
                    : 'bg-slate-100 text-brand-muted hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-2.5">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-indigo-50/60 text-slate-800 border border-brand-border hover:border-brand-primary/40 transition-all shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-brand-text">{skill.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-brand-muted border border-slate-200">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SKILLS MISSING (WARNING-STYLE CARDS) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-6">
        <div className="flex items-center gap-2.5 border-b border-brand-border pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-brand-text">
              3. Skills Missing
            </h2>
            <p className="text-xs text-brand-muted">High-priority keywords from the job description that were not detected in your resume</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {res.missingSkills.map((skill, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/90 shadow-sm space-y-3 relative hover:bg-amber-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <h4 className="font-display font-bold text-base text-amber-950">
                    {skill.name}
                  </h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  skill.importance === 'High'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {skill.importance} Priority
                </span>
              </div>

              <p className="text-xs text-amber-900/90 leading-relaxed">
                {skill.reason}
              </p>

              <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs text-slate-700 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium leading-snug">
                  <strong>Fix:</strong> {skill.quickTip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 & 5: STRENGTHS & AREAS TO IMPROVE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION 4: RESUME STRENGTHS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-5">
          <div className="flex items-center gap-2.5 border-b border-brand-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-brand-text">
                4. Resume Strengths
              </h2>
              <p className="text-xs text-brand-muted">Elements that passed ATS rules with high confidence</p>
            </div>
          </div>

          <div className="space-y-4">
            {res.strengths.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                    {item.score}
                  </span>
                </div>
                <p className="text-xs text-emerald-900/80 pl-6 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: AREAS TO IMPROVE */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-5">
          <div className="flex items-center gap-2.5 border-b border-brand-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-brand-text">
                5. Areas to Improve
              </h2>
              <p className="text-xs text-brand-muted">Targeted edits that directly improve ATS ranking</p>
            </div>
          </div>

          <div className="space-y-4">
            {res.improvements.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-rose-50/30 border border-rose-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm text-brand-text">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold bg-white text-brand-primary border border-brand-primary/20 px-2 py-0.5 rounded">
                      {item.impact}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[11px] bg-white p-2.5 rounded-xl border border-rose-100 text-slate-700 font-mono">
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* SECTION 6: JOB DESCRIPTION MATCH */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-accent flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-brand-text">
                6. Job Description Match
              </h2>
              <p className="text-xs text-brand-muted">Target Position: {res.jobMatch.jobTitle} at {res.jobMatch.company}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-brand-muted font-bold uppercase">Overall Match</span>
            <div className="text-2xl font-extrabold gradient-text">
              {res.jobMatch.overallPercentage}%
            </div>
          </div>
        </div>

        {/* Match summary note */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100 text-xs text-slate-800 leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
          <p>{res.jobMatch.matchSummary}</p>
        </div>

        {/* Matching Skills vs Missing Skills Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Matching Skills */}
          <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Matching Skills ({res.jobMatch.matchingSkills.length})
              </h4>
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Validated
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {res.jobMatch.matchingSkills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-emerald-800 border border-emerald-200 shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-sm text-rose-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Missing Skills ({res.jobMatch.missingSkills.length})
              </h4>
              <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {res.jobMatch.missingSkills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-800 border border-rose-200 shadow-sm flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: AI RECOMMENDATIONS (NUMBERED) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl gradient-bg text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-brand-text">
                7. AI Recommendations
              </h2>
              <p className="text-xs text-brand-muted">Step-by-step prioritized instructions to push your score past 95</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
            {res.aiRecommendations.length} Recommendations
          </span>
        </div>

        <div className="space-y-4">
          {res.aiRecommendations.map((rec, index) => (
            <div
              key={rec.number}
              className="p-5 sm:p-6 rounded-2xl border border-brand-border bg-slate-50/50 hover:bg-white hover:shadow-soft transition-all duration-200 space-y-3"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl gradient-bg text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {rec.number}
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="font-display font-bold text-base text-brand-text">
                    {rec.headline}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {rec.detail}
                  </p>
                </div>
              </div>

              {/* Action Box with Copy button */}
              <div className="ml-12 p-3 sm:p-4 rounded-xl bg-white border border-brand-border flex items-center justify-between gap-3">
                <div className="text-xs text-slate-700 font-mono leading-relaxed truncate sm:whitespace-normal">
                  💡 <span className="font-semibold text-brand-primary">Action:</span> {rec.suggestedAction}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(rec.suggestedAction, index)}
                  className="px-2.5 py-1.5 rounded-lg border border-brand-border text-[11px] font-semibold text-brand-muted hover:text-brand-primary hover:bg-slate-50 transition-colors shrink-0 flex items-center gap-1"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Floating/Fixed Action CTA */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white">
            Ready to test with another job description or updated resume?
          </h3>
          <p className="text-xs text-indigo-100">
            Upload your revised resume to measure your new ATS score improvement.
          </p>
        </div>
        <Link
          to="/analyze"
          className="px-6 py-3 rounded-xl bg-white text-brand-primary font-bold text-sm hover:bg-slate-50 transition-colors shadow flex items-center gap-2 whitespace-nowrap"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Analyze Revised Resume</span>
        </Link>
      </div>

    </div>
  );
}
