import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  progress = 75,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  color = 'blue',
  variant = 'colored', // 'colored' (matching dashborad cards.png) | 'neutral'
  iconColor,
  iconBg
}) => {
  // If explicitly neutral variant (e.g. For plain reports)
  if (variant === 'neutral') {
    return (
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
          {Icon && (
            <div className={`w-10 h-10 rounded-xl ${iconBg || 'bg-slate-100'} ${iconColor || 'text-slate-700'} flex items-center justify-center shrink-0 border border-slate-200/70`}>
              <Icon size={18} />
            </div>
          )}
        </div>

        <div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</div>
          {change && (
            <div className="flex items-center space-x-2 mt-2">
              <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                {isPositive ? (
                  <TrendingUp size={12} className="mr-1 text-slate-800" />
                ) : (
                  <TrendingDown size={12} className="mr-1 text-slate-500" />
                )}
                {change}
              </span>
              <span className="text-xs text-slate-400 font-normal">vs last period</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Color mapping matching dashborad cards.png
  const colorMap = {
    blue: {
      bg: 'bg-gradient-to-r from-[#5068f2] to-[#5d76f8]',
      iconText: 'text-slate-600'
    },
    orange: {
      bg: 'bg-gradient-to-r from-[#fca119] to-[#fdb631]',
      iconText: 'text-slate-600'
    },
    amber: {
      bg: 'bg-gradient-to-r from-[#fca119] to-[#fdb631]',
      iconText: 'text-slate-600'
    },
    purple: {
      bg: 'bg-gradient-to-r from-[#6b3ec6] to-[#7d4ee2]',
      iconText: 'text-slate-600'
    },
    red: {
      bg: 'bg-gradient-to-r from-[#f03030] to-[#ff4d4d]',
      iconText: 'text-slate-600'
    },
    emerald: {
      bg: 'bg-gradient-to-r from-[#0d9488] to-[#14b8a6]',
      iconText: 'text-slate-600'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;
  const displaySubtitle = subtitle || (change ? `${change} vs last period` : null);

  return (
    <div className={`${scheme.bg} p-5 sm:p-5.5 rounded-xl shadow-xs transition-all duration-200 flex items-center space-x-4 group`}>
      {/* Left Icon: White circular badge */}
      {Icon && (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
          <Icon size={22} className={iconColor || scheme.iconText} />
        </div>
      )}

      {/* Right Content */}
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider block truncate">
          {title}
        </span>
        <div className="text-2xl sm:text-[28px] font-extrabold text-white leading-tight tracking-tight my-0.5 tabular-nums">
          {value}
        </div>

        {/* Horizontal White Progress Track */}
        <div className="w-full h-1.5 bg-white/30 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${Math.min(Math.max(progress, 5), 100)}%` }}
          />
        </div>

        {/* Subtitle / Increase Metric */}
        {displaySubtitle && (
          <p className="text-[10px] sm:text-[11px] font-medium text-white/90 mt-1 truncate">
            {displaySubtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
