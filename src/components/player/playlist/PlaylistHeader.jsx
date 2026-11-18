import React from "react";
import { Tv, Search, CheckCircle2, ChevronRight, Play } from "lucide-react";

/**
 * PlaylistHeader Component
 * Premium video streaming playlist header showing course track,
 * video lesson counts, overall watch progress, and search.
 */
export const PlaylistHeader = ({
  modulesCount = 0,
  totalItemsCount = 0,
  completedCount = 0,
  progressPercent = 0,
  onExpandAll,
  onCollapseAll,
  searchQuery = "",
  onSearchChange,
}) => {
  return (
    <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3.5 space-y-3">
      {/* Top Title & Expand/Collapse */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-center shadow-xs">
            <Tv size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Video Lectures
              </h3>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border border-blue-200/80 dark:border-blue-800/60">
                {modulesCount} Modules
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Curriculum video playlist & tracks
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          <button
            type="button"
            onClick={onExpandAll}
            className="font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
          >
            Expand all
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            type="button"
            onClick={onCollapseAll}
            className="font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Watch Progress Card */}
      {totalItemsCount > 0 && (
        <div className="space-y-1.5 bg-slate-50/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Watch Progress</span>
            </span>
            <span className="font-extrabold text-blue-600 dark:text-cyan-400 tabular-nums">
              {completedCount} / {totalItemsCount} Lessons ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Search Input */}
      {onSearchChange && (
        <div className="relative pt-0.5">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search video lectures..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      )}
    </div>
  );
};
