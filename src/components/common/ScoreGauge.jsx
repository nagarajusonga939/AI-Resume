import React from 'react';

export default function ScoreGauge({ 
  score = 82, 
  maxScore = 100, 
  size = 200, 
  strokeWidth = 14, 
  title = "ATS Score", 
  subtitle = "High ATS Compatibility",
  showSubtext = true
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score / maxScore, 0), 1);
  const strokeDashoffset = circumference - progress * circumference;

  const getColor = (val) => {
    if (val >= 85) return { stroke: '#10B981', gradientId: 'grad-emerald', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (val >= 70) return { stroke: '#4F46E5', gradientId: 'grad-indigo', text: 'text-brand-primary', bg: 'bg-brand-primary/10', border: 'border-brand-primary/20' };
    if (val >= 50) return { stroke: '#F59E0B', gradientId: 'grad-amber', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { stroke: '#EF4444', gradientId: 'grad-red', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const status = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 origin-center drop-shadow-sm"
        >
          <defs>
            <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Foreground progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${status.gradientId})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className="text-xs uppercase tracking-wider text-brand-muted font-bold -mb-1">
            {title}
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display font-extrabold text-4xl sm:text-5xl text-brand-text tracking-tight">
              {score}
            </span>
            <span className="text-sm font-semibold text-brand-muted">/{maxScore}</span>
          </div>
          <span className={`mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${status.bg} ${status.text} border ${status.border}`}>
            {score >= 80 ? 'ATS Optimized' : score >= 65 ? 'Competitive' : 'Action Needed'}
          </span>
        </div>
      </div>

      {showSubtext && (
        <p className="mt-3 text-xs text-brand-muted text-center max-w-[200px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
