import React from "react";
import { Search } from "lucide-react";

/**
 * Filter Tabs & Search Bar for Credentials
 * Allows switching between All, Exam Certificates, and Milestone Badges,
 * and performing real-time search queries.
 */
export const AchievementsFilterBar = ({
  activeFilter = "all",
  onSelectFilter,
  searchQuery = "",
  onSearchChange,
  totalExams = 0,
  totalMilestones = 0,
}) => {
  const totalCredentials = totalExams + totalMilestones;

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-2 sm:p-2.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Filter Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "all"
              ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
              : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          All Credentials ({totalCredentials})
        </button>
        <button
          type="button"
          onClick={() => onSelectFilter("exams")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "exams"
              ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
              : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Exam Certificates ({totalExams})
        </button>
        <button
          type="button"
          onClick={() => onSelectFilter("milestones")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "milestones"
              ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
              : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Milestone Badges ({totalMilestones})
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search certificates & milestones..."
          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-blue-500 shadow-2xs"
        />
      </div>
    </div>
  );
};

export default AchievementsFilterBar;
