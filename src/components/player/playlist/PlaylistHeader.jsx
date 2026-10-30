import React from "react";
import { FolderOpen, Search } from "lucide-react";

/**
 * PlaylistHeader Component
 * Direct course modules section header with overall progress bar,
 * Expand All / Collapse All controls, and fast module/lesson search.
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
    <div className="border-b border-slate-100 dark:border-slate-800 pb-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FolderOpen
            size={16}
            className="text-blue-600 dark:text-indigo-400"
          />
          <h3 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Course Modules ({modulesCount})
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-[11px]">
          <button
            type="button"
            onClick={onExpandAll}
            className="font-bold text-blue-600 dark:text-indigo-400 hover:underline cursor-pointer"
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

      {/* Overall Course Progress */}
      {totalItemsCount > 0 && (
        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <span>Overall Progress</span>
            <span className="text-blue-600 dark:text-cyan-400 tabular-nums">
              {completedCount} / {totalItemsCount} Activities ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Playlist search */}
      <div className="relative pt-0.5">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search modules or lessons..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    </div>
  );
};
