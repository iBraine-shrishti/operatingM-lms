import React from "react";
import { FolderOpen, Search } from "lucide-react";

/**
 * PlaylistHeader Component
 * Modules section header with Expand All / Collapse All controls and playlist search.
 */
export const PlaylistHeader = ({
  modulesCount = 0,
  onExpandAll,
  onCollapseAll,
  searchQuery = "",
  onSearchChange,
}) => {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 pb-3 space-y-2">
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
          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden"
        />
      </div>
    </div>
  );
};
