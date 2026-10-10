import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  BarChart2, 
  HelpCircle, 
  Info, 
  Menu, 
  X, 
  ArrowRight,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, openAuth, handleLogout } = useResume();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze Resume', path: '/analyze' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) return false;
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.replace('/', '');
      if (location.pathname !== '/') {
        navigate(path);
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-brand-primary/20 group-hover:scale-105 transition-transform duration-300">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl sm:text-2xl text-brand-text tracking-tight">
                  Resume<span className="gradient-text font-black">AI</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                  SaaS
                </span>
              </div>
              <span className="text-[10px] text-brand-muted hidden sm:inline -mt-1 font-medium tracking-wide">
                ATS Optimizer & Insights
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return link.path.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }
                  }}
                  className="px-3.5 py-2 text-sm font-medium text-brand-muted hover:text-brand-text rounded-lg hover:bg-slate-100 transition-all duration-200"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-brand-primary bg-brand-primary/10 font-semibold'
                      : 'text-brand-muted hover:text-brand-text hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-slate-100 border border-brand-border transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-primary/20"
                  />
                  <span className="text-sm font-medium text-brand-text max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-brand-muted" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-premium border border-brand-border py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-brand-border">
                      <p className="text-xs text-brand-muted font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-brand-text truncate">{currentUser.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-text hover:bg-slate-50 transition-colors"
                    >
                      <BarChart2 className="w-4 h-4 text-brand-primary" />
                      Dashboard
                    </Link>
                    <Link
                      to="/analyze"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-text hover:bg-slate-50 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-brand-secondary" />
                      Analyze Resume
                    </Link>
                    <div className="border-t border-brand-border my-1"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white gradient-bg hover:opacity-95 rounded-xl shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-200"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Quick Analyze Button */}
            <Link
              to="/analyze"
              className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Try Analyzer</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-brand-primary bg-brand-primary/10 font-semibold'
                  : 'text-brand-text hover:bg-slate-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-brand-border space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-brand-text">{currentUser.name}</p>
                    <p className="text-xs text-brand-muted">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    openAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-center text-sm font-semibold border border-brand-border rounded-xl hover:bg-slate-50 text-brand-text"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-center text-sm font-semibold text-white gradient-bg rounded-xl shadow"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
