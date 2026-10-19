import React from "react";
import { Search, Plus, X, MessagesSquare } from "lucide-react";
import { getTopicLabel } from "./ForumSidebar";

export const ForumHeader = ({
  searchQuery = "",
  onSearchChange,
  onCreatePostClick,
  selectedCommunity = "all",
}) => {
  const currentTopicLabel = getTopicLabel(selectedCommunity);

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Forum Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3b49df] to-purple-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <MessagesSquare size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Operating Media Forums
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/80">
                {currentTopicLabel}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive discussion boards for student questions, case studies, and campaign troubleshooting.
            </p>
          </div>
        </div>

        {/* Create Post Action Button */}
        <button
          type="button"
          onClick={onCreatePostClick}
          className="bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98 shrink-0"
        >
          <Plus size={16} />
          <span>Create Post</span>
        </button>
      </div>

      {/* Search Input - Permanent Highlighted Border & Enhanced Hover Effect */}
      <div className="relative group">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3b49df] dark:text-blue-400 group-hover:scale-110 transition-transform duration-200 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder={`Search ${selectedCommunity === "all" ? "discussions" : currentTopicLabel}, topics, keywords, or authors...`}
          className="w-full pl-10 pr-9 py-2.5 bg-blue-50/25 dark:bg-blue-950/25 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 focus:bg-white dark:focus:bg-[#0b1329] border-2 border-[#3b49df] dark:border-blue-500 hover:border-[#2f3ab2] dark:hover:border-blue-400 focus:border-[#2f3ab2] dark:focus:border-blue-300 ring-2 ring-blue-500/15 dark:ring-blue-500/20 hover:ring-4 hover:ring-blue-500/25 dark:hover:ring-blue-400/30 focus:ring-4 focus:ring-blue-500/35 dark:focus:ring-blue-400/40 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 shadow-xs hover:shadow-md focus:shadow-md focus:outline-hidden transition-all duration-200"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange && onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
