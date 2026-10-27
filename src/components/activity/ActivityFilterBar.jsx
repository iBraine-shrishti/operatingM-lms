import React from "react";
import { Search, X } from "lucide-react";

/**
 * ActivityFilterBar Component
 * Search input, sort dropdown, and category pill buttons with count indicators.
 */
export const ActivityFilterBar = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedFilter,
  setSelectedFilter,
  counts = {},
  filteredCount = 0,
  totalCount = 0,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1329]/95 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 2xl:p-6 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] space-y-4 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your milestones, courses, exams, or actions..."
            className="w-full pl-10 pr-10 py-2.5 2xl:py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 text-sm 2xl:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium focus:bg-white dark:focus:bg-slate-850 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 2xl:py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer focus:bg-white dark:focus:bg-slate-850 transition-colors"
          >
            <option value="newest" className="dark:bg-slate-900">Newest First</option>
            <option value="oldest" className="dark:bg-slate-900">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2 2xl:gap-2.5">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                : "bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800"
            }`}
          >
            All Activities ({counts.all || 0})
          </button>
          {counts.quiz > 0 && (
            <button
              onClick={() => setSelectedFilter("quiz")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "quiz"
                  ? "bg-purple-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200/60 dark:border-purple-500/30"
              }`}
            >
              Quizzes ({counts.quiz})
            </button>
          )}
          {counts.assignment > 0 && (
            <button
              onClick={() => setSelectedFilter("assignment")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "assignment"
                  ? "bg-sky-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(14,165,233,0.4)]"
                  : "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/40 border border-sky-200/60 dark:border-sky-500/30"
              }`}
            >
              Submissions ({counts.assignment})
            </button>
          )}
          {counts.completion > 0 && (
            <button
              onClick={() => setSelectedFilter("completion")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "completion"
                  ? "bg-indigo-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                  : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200/60 dark:border-indigo-500/30"
              }`}
            >
              Course Progress ({counts.completion})
            </button>
          )}
          {counts.lecture > 0 && (
            <button
              onClick={() => setSelectedFilter("lecture")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "lecture"
                  ? "bg-teal-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(13,148,136,0.4)]"
                  : "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/40 border border-teal-200/60 dark:border-teal-500/30"
              }`}
            >
              Lectures ({counts.lecture})
            </button>
          )}
          {counts.enrollment > 0 && (
            <button
              onClick={() => setSelectedFilter("enrollment")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "enrollment"
                  ? "bg-blue-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200/60 dark:border-blue-500/30"
              }`}
            >
              Enrollments ({counts.enrollment})
            </button>
          )}
          {counts.discussion > 0 && (
            <button
              onClick={() => setSelectedFilter("discussion")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "discussion"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200/60 dark:border-amber-500/30"
              }`}
            >
              Forums ({counts.discussion})
            </button>
          )}
        </div>

        <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
          Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredCount}</strong> of {totalCount} logs
        </div>
      </div>
    </div>
  );
};
