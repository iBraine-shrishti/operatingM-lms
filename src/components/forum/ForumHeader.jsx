import React from "react";
import { Search, Plus, X, Globe, Sparkles } from "lucide-react";

export const ForumHeader = ({
  searchQuery = "",
  onSearchChange,
  onCreatePostClick,
  selectedCommunity = "all",
}) => {
  const communityDisplay =
    selectedCommunity === "all" ? "r/all" : `r/${selectedCommunity}`;

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Community Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3b49df] to-purple-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
            r/
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Operating Media Forums
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/80">
                {communityDisplay}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reddit-style discussion boards for student questions, case studies, and campaign troubleshooting.
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

      {/* Reddit-style Search Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder={`Search ${communityDisplay}, topics, keywords, or authors...`}
          className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df] focus:bg-white dark:focus:bg-[#0b1329] transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange && onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
