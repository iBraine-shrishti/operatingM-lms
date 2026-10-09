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
  iconBg,
  className = ''
}) => {
  // If explicitly neutral variant (e.g. For plain reports)
  if (variant === 'neutral') {
    return (
      <div className={`bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">{title}</span>
          {Icon && (
            <div className={`w-9 h-9 ${iconBg || 'bg-slate-100 dark:bg-slate-800'} ${iconColor || 'text-slate-700 dark:text-slate-300'} rounded-lg flex items-center justify-center shrink-0 border border-slate-200/70 dark:border-slate-700`}>
              <Icon size={16} />
            </div>
          )}
        </div>

        <div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums truncate">{value}</div>
          {change && (
            <div className="flex items-center space-x-2 mt-2">
              <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                {isPositive ? (
                  <TrendingUp size={12} className="mr-1 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown size={12} className="mr-1 text-red-500 dark:text-red-400" />
                )}
                {change}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">vs last period</span>
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
    <div className={`${scheme.bg} p-2.5 sm:p-3 xl:p-4 rounded-xl shadow-xs transition-all duration-200 flex items-center space-x-2 sm:space-x-2.5 xl:space-x-3 group ${className}`}>
      {/* Left Icon: White circular badge */}
      {Icon && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
          <Icon className={`${iconColor || scheme.iconText} w-4 h-4 sm:w-[17px] sm:h-[17px]`} />
        </div>
      )}

      {/* Right Content */}
      <div className="flex-1 min-w-0">
        <span className="text-[9px] sm:text-[9.5px] xl:text-[10.5px] font-bold text-white/90 uppercase tracking-wide block leading-tight">
          {title}
        </span>
        <div className="text-base sm:text-lg xl:text-[22px] font-extrabold text-white leading-tight tracking-tight my-0.5 tabular-nums">
          {value}
        </div>

        {/* Horizontal White Progress Track */}
        <div className="w-full h-1 sm:h-1.5 bg-white/30 rounded-full mt-1 sm:mt-1.5 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${Math.min(Math.max(progress, 5), 100)}%` }}
          />
        </div>

        {/* Subtitle / Increase Metric */}
        {displaySubtitle && (
          <p className="text-[9px] sm:text-[9.5px] xl:text-[10.5px] font-medium text-white/90 mt-0.5 sm:mt-1 truncate">
            {displaySubtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
