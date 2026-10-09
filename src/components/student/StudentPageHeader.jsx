import React from "react";

/**
 * Reusable Page Header for all Student pages
 * Standardized to match the exact styling, typography, spacing,
 * and dark mode color palette of the Student Forum & Discussions header.
 */
export const StudentPageHeader = ({
  icon: Icon,
  category,
  badgeText,
  title,
  description,
  metrics = [],
  action,
  children,
  className = "",
  isAdmin = false,
}) => {
  return (
    <div
      className={
        isAdmin
          ? `bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all ${className}`
          : `relative dashboard-hero-banner rounded-2xl border border-blue-100/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all overflow-hidden ${className}`
      }
    >
      <div className="space-y-2 relative z-10 min-w-0 flex-1">
        {/* Eyebrow: Icon + Category + Active Status Pill */}
        <div className="flex flex-wrap items-center gap-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
          {Icon && <Icon size={17} className="shrink-0" />}
          {category && <span>{category}</span>}
          {badgeText && (
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{badgeText}</span>
            </span>
          )}
        </div>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {title}
        </h1>

        {/* Page Description */}
        {description && (
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
            {description}
          </p>
        )}

        {/* Quick Metrics Pills Bar */}
        {metrics && metrics.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    metric.dotColor || "bg-blue-600"
                  } inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]`}
                />
                <span className="font-black text-slate-900 dark:text-white">
                  {metric.value}
                </span>
                <span className="font-semibold">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>

      {/* Right-aligned Action / Controls */}
      {action && (
        <div className="w-full sm:w-auto shrink-0 relative z-10">
          {action}
        </div>
      )}
    </div>
  );
};

export default StudentPageHeader;
