import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = 'text-slate-700',
  iconBg = 'bg-slate-100'
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 border border-slate-200/70`}>
          <Icon size={18} />
        </div>
      </div>

      <div>
        <div className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight tabular-nums">{value}</div>
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
};
