import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuth, authMode, openAuth, handleLogin } = useResume();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleLogin({
        name: authMode === 'signup' ? (name || 'New User') : (name || 'Alex Morgan'),
        email: email || 'user@example.com',
        role: 'Full Stack Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top decorative gradient bar */}
        <div className="h-2 gradient-bg w-full"></div>

        {/* Close Button */}
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-1.5 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ResumeAI Account</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-brand-text">
              {authMode === 'signup' ? 'Create Free Account' : 'Welcome Back'}
            </h3>
            <p className="text-sm text-brand-muted">
              {authMode === 'signup'
                ? 'Get started with AI-driven ATS resume optimization'
                : 'Sign in to access your previous analyses and job matches'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-95 shadow-md shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{authMode === 'signup' ? 'Create Account' : 'Sign In to ResumeAI'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-6 text-center text-xs text-brand-muted pt-4 border-t border-brand-border/60">
            {authMode === 'signup' ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="text-brand-primary font-semibold hover:underline"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuth('signup')}
                  className="text-brand-primary font-semibold hover:underline"
                >
                  Sign up free
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
