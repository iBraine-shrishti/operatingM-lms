import React from "react";
import { Search, X } from "lucide-react";

/**
 * EnrolledCoursesFilterBar Component
 * Provides interactive search, category filtering, sorting, and status tab controls:
 * - Real-time search by course title, category, or description
 * - Category filter dropdown
 * - Sort by recently active, progress, or popularity
 * - Status pills (All, In Progress, Completed)
 * - Result count indicator and quick reset action
 */
export const EnrolledCoursesFilterBar = ({
  searchQuery = "",
  onSearchChange,
  onClearSearch,
  selectedCategory = "all",
  onCategoryChange,
  categories = [],
  sortBy = "recent",
  onSortChange,
  activeTab = "all",
  onTabChange,
  totalCount = 0,
  inProgressCount = 0,
  completedCount = 0,
  filteredCount = 0,
  onResetFilters,
}) => {
  const isFiltered =
    selectedCategory !== "all" ||
    activeTab !== "all" ||
    searchQuery.trim() !== "";

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-4">
      {/* Top Control Row: Search + Category Filter + Sort */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Live Search Input */}
        <div className="relative md:col-span-6 lg:col-span-6">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search enrolled courses by title, category, or skills..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-3 lg:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="all">All Course Categories ({totalCount})</option>
            {categories
              .filter((c) => c.id !== "all")
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-3 lg:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="recent">Sort: Recently Active</option>
            <option value="progress">Sort: Highest Progress</option>
            <option value="popular">Sort: Most Popular</option>
          </select>
        </div>
      </div>

      {/* Filter Pills Bar: Status Pills on left + Category Chips / Reset Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            STATUS:
          </span>
          <button
            onClick={() => onTabChange("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => onTabChange("in-progress")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "in-progress"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => onTabChange("completed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "completed"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Showing{" "}
            <strong className="text-slate-800 dark:text-white">
              {filteredCount}
            </strong>{" "}
            of {totalCount} courses
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs font-bold text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCoursesFilterBar;
