import React from "react";
import { Award } from "lucide-react";

/**
 * AchievementsEmptyState Component
 * Visual presentation when no credentials or badges match search filters.
 */
export const AchievementsEmptyState = ({ searchQuery = "", onClear }) => {
  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 text-center space-y-2">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-500/30 mb-1">
        <Award size={22} />
      </div>
      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
        No credentials or badges found matching "{searchQuery}"
      </p>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};
