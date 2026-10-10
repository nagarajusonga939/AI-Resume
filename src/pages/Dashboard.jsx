import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileSearch, 
  History, 
  Target, 
  User, 
  Settings, 
  TrendingUp, 
  FileText, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Eye, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Search, 
  Filter, 
  ChevronRight,
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { history, setHistory, currentUser, setAnalysisResult, triggerCelebration } = useResume();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Compute stats
  const totalAnalyzed = history.length;
  const latestAtsScore = history[0]?.atsScore || 82;
  const avgScore = history.length > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.atsScore, 0) / history.length) 
    : 0;
  const bestJobMatch = history.length > 0 
    ? Math.max(...history.map(h => h.jobMatch)) 
    : 87;

  // Filter history
  const filteredHistory = history.filter(item => 
    item.resumeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.targetRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteItem = (id, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this resume analysis?")) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleViewItem = (item) => {
    navigate('/results');
  };

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyze Resume', icon: FileSearch, link: '/analyze' },
    { id: 'history', label: 'Previous Analyses', icon: History },
    { id: 'matches', label: 'Job Matches', icon: Target },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-brand-bg flex">
      
      {/* SIDEBAR (Desktop + Mobile responsive) */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-brand-border transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-1/0 md:translate-x-0 hidden md:block'
      }`}>
        <div className="h-full flex flex-col justify-between p-5">
          
          <div className="space-y-6">
            {/* User Mini Profile */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-primary/20"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-brand-text truncate">
                  {currentUser?.name || 'Alex Morgan'}
                </p>
                <span className="text-[11px] text-brand-muted truncate block">
                  {currentUser?.role || 'Full Stack Engineer'}
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1.5">
              {sidebarLinks.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                
                return item.link ? (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-brand-muted hover:text-brand-text hover:bg-slate-50 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-brand-primary" />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                      isSelected
                        ? 'gradient-bg text-white shadow-md shadow-brand-primary/20 font-semibold'
                        : 'text-brand-muted hover:text-brand-text hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick upload promo card in sidebar */}
          <div className="p-4 rounded-2xl gradient-bg-subtle border border-brand-primary/20 text-center space-y-2">
            <Sparkles className="w-5 h-5 text-brand-primary mx-auto" />
            <h5 className="font-display font-bold text-xs text-brand-text">
              Need higher ATS score?
            </h5>
            <p className="text-[11px] text-brand-muted">
              Get targeted bullet suggestions for Taleo & Workday.
            </p>
            <Link
              to="/analyze"
              className="inline-block w-full py-2 px-3 rounded-lg gradient-bg text-white text-xs font-semibold shadow-sm hover:opacity-95"
            >
              Analyze New Resume
            </Link>
          </div>

        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 overflow-y-auto">
        
        {/* Mobile toggle button */}
        <div className="md:hidden flex items-center justify-between pb-3 border-b border-brand-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-brand-text bg-white px-3 py-1.5 rounded-xl border border-brand-border shadow-sm"
          >
            <Menu className="w-4 h-4" />
            <span>Dashboard Menu</span>
          </button>
          <span className="text-xs font-semibold text-brand-primary">ResumeAI Portal</span>
        </div>

        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Applicant Portal</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Alex'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Track your ATS optimization progress, target job matches, and resume versions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white gradient-bg hover:opacity-95 shadow-lg shadow-brand-primary/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Resume</span>
            </Link>
          </div>
        </div>

        {/* FOUR KPI SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Latest ATS Score */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Latest ATS Score</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold text-brand-text">
                {latestAtsScore}
              </span>
              <span className="text-xs font-semibold text-brand-muted">/100</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Passes 85% of job filters
            </p>
          </div>

          {/* Card 2: Average Score */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Average Score</span>
              <div className="w-8 h-8 rounded-xl bg-violet-50 text-brand-secondary flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold text-brand-text">
                {avgScore}
              </span>
              <span className="text-xs font-semibold text-brand-muted">/100</span>
            </div>
            <p className="text-[11px] text-brand-muted font-medium mt-2">
              Across all uploaded versions
            </p>
          </div>

          {/* Card 3: Resumes Analyzed */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">Resumes Analyzed</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold text-brand-text">
                {totalAnalyzed}
              </span>
            </div>
            <p className="text-[11px] text-brand-primary font-semibold mt-2">
              Available in history
            </p>
          </div>

          {/* Card 4: Best Job Match */}
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-soft hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Best Job Match</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold text-brand-text">
                {bestJobMatch}%
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-2">
              High recruiter callback probability
            </p>
          </div>

        </div>

        {/* RECENT ANALYSES TABLE SECTION */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-premium overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-lg text-brand-text">
                Recent Resume Analyses
              </h2>
              <p className="text-xs text-brand-muted">
                Audit trail of previous scans and targeted job description matches
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resumes or roles..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-brand-muted uppercase font-bold text-[11px] tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3.5 px-6">Resume Name</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">ATS Score</th>
                  <th className="py-3.5 px-6">Job Match</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-brand-muted">
                      No analyses match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleViewItem(item)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Resume Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-brand-text group-hover:text-brand-primary transition-colors text-sm block">
                              {item.resumeName}
                            </span>
                            <span className="text-[11px] text-brand-muted">
                              Target: {item.targetRole} • {item.fileSize}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-brand-muted font-medium">
                        {item.date}
                      </td>

                      {/* ATS Score */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            item.atsScore >= 85
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.atsScore >= 75
                              ? 'bg-indigo-50 text-brand-primary border border-brand-primary/20'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {item.atsScore}/100
                          </span>
                        </div>
                      </td>

                      {/* Job Match */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="gradient-bg h-2"
                              style={{ width: `${item.jobMatch}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-brand-text">{item.jobMatch}%</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleViewItem(item)}
                            className="p-1.5 rounded-lg text-brand-primary hover:bg-brand-primary/10 transition-colors"
                            title="View Full Report"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              triggerCelebration();
                              alert(`Downloading report for ${item.resumeName}`);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteItem(item.id, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-slate-50 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
            <span>Showing {filteredHistory.length} of {history.length} records</span>
            <Link to="/analyze" className="font-semibold text-brand-primary hover:underline flex items-center gap-1">
              <span>Run another analysis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </main>

    </div>
  );
}
