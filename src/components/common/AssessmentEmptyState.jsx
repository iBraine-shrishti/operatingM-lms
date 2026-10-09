import React from "react";
import { CheckSquare, RotateCcw } from "lucide-react";

/**
 * Reusable empty state component for student assessment lists and tables
 */
export const AssessmentEmptyState = ({
  icon: Icon = CheckSquare,
  title = "No assessments found",
  description = "No items matched your search criteria. Try adjusting your filters.",
  hasActiveFilters = false,
  onResetFilters,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 text-center shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#2563eb] dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center mx-auto mb-3 shadow-2xs">
        <Icon size={26} />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {(hasActiveFilters || actionLabel) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {hasActiveFilters && onResetFilters && (
            <button
              onClick={onResetFilters}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <RotateCcw size={13} />
              <span>Reset Search Filters</span>
            </button>
          )}

          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentEmptyState;
