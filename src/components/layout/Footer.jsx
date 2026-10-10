import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Sparkles, 
  Mail, 
  ShieldCheck, 
  Cpu, 
  Award, 
  ArrowRight 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border mt-auto">
      {/* Top Banner / Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-brand-border/60">
        <div className="bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5 rounded-2xl p-6 sm:p-8 border border-brand-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display font-bold text-lg sm:text-xl text-brand-text flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              Stay updated with AI ATS Algorithm Updates
            </h3>
            <p className="text-sm text-brand-muted max-w-md">
              Receive periodic recruiter keyword trends, resume scoring insights, and hiring benchmarks.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/40 flex-1"
            />
            <button
              onClick={() => alert("Thank you for subscribing to ResumeAI updates!")}
              className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-95 shadow-md shadow-brand-primary/20 flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-brand-primary/20">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-brand-text">
                Resume<span className="gradient-text font-black">AI</span>
              </span>
            </Link>
            <p className="text-sm text-brand-muted max-w-sm leading-relaxed">
              Empowering engineers and professionals to bypass ATS screening bots and secure interviews with predictive AI parsing, semantic skill matching, and tailored recommendations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-primary hover:border-brand-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-primary hover:border-brand-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter / X" className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-primary hover:border-brand-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="mailto:support@resumeai.demo" className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-primary hover:border-brand-primary transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link to="/analyze" className="hover:text-brand-primary transition-colors">Analyze Resume</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-primary transition-colors">User Dashboard</Link></li>
              <li><Link to="/results" className="hover:text-brand-primary transition-colors">Latest Results</Link></li>
              <li><a href="/#how-it-works" className="hover:text-brand-primary transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">ATS Score Analysis</span></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">AI Skill Extraction</span></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">Job Description Match</span></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">Missing Keywords Matrix</span></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">Section Scoring</span></li>
            </ul>
          </div>

          {/* Legal & Project */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wider">Project & Legal</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About ResumeAI</Link></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">Security & Ethics</span></li>
              <li><span className="hover:text-brand-primary cursor-pointer transition-colors">B.Tech CSE Capstone</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & tech details */}
        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ResumeAI SaaS. All rights reserved.</span>
            <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-brand-primary font-medium">B.Tech CSE Major Project</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Client-Side Safe
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Cpu className="w-3.5 h-3.5 text-brand-primary" />
              NLP + Semantic Parser
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
