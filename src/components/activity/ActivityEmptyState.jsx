import React from "react";
import { Activity } from "lucide-react";

/**
 * ActivityEmptyState Component
 * Visual illustration and reset action when no milestone logs match search/filter.
 */
export const ActivityEmptyState = ({ onReset }) => {
  return (
    <div className="bg-white dark:bg-[#0b1329]/95 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center shadow-xs space-y-3">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-500/30">
        <Activity size={26} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Activity Logs Found</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        No events match your current search query or filter selection.
      </p>
      {onReset && (
        <div className="pt-2">
          <button
            onClick={onReset}
            className="px-5 py-2.5 bg-[#2563eb] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Reset Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};
