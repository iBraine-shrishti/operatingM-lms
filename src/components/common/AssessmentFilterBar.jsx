import React from "react";
import { Search, X, ChevronDown, LayoutGrid, List } from "lucide-react";

/**
 * Reusable AssessmentFilterBar component
 * Standardizes search, course, category, sorting, status pills, and view modes
 * across both Assignments and Quizzes.
 */
export const AssessmentFilterBar = ({
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Search assessments...",
  courses = [],
  selectedCourse = "all",
  onCourseChange,
  categories = [],
  selectedCategory = "all",
  onCategoryChange,
  sortOptions = [],
  sortBy = "",
  onSortChange,
  statusOptions = [],
  selectedStatus = "all",
  onStatusChange,
  viewMode,
  onViewModeChange,
  totalShowing = 0,
  totalCount = 0,
  itemLabel = "items",
  hasActiveFilters = false,
  onResetFilters,
}) => {
  const getActivePillClasses = (color) => {
    switch (color) {
      case "rose":
        return "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]";
      case "purple":
        return "bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]";
      case "emerald":
        return "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]";
      case "amber":
        return "bg-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.4)]";
      case "blue":
      default:
        return "bg-[#2563eb] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]";
    }
  };

  const getInactivePillClasses = (color) => {
    switch (color) {
      case "rose":
        return "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/60";
      case "purple":
        return "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200/80 dark:border-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-900/60";
      case "emerald":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60";
      case "amber":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/50 hover:bg-amber-100 dark:hover:bg-amber-900/60";
      case "blue":
      default:
        return "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";
    }
  };

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Controls Row: Search + Course + Category + Sort + View Mode */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Live Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-11 pr-9 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer transition-colors"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter by Course Select */}
        <div className="relative min-w-[210px]">
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] dark:focus:border-blue-500 cursor-pointer pr-10"
          >
            <option value="all">All Enrolled Courses ({totalCount})</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
        </div>

        {/* Filter by Category Select (if categories provided) */}
        {categories && categories.length > 0 && (
          <div className="relative min-w-[190px]">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] dark:focus:border-blue-500 cursor-pointer pr-10"
            >
              {categories.map((cat) => (
                <option key={cat.id || cat} value={cat.id || cat}>
                  {cat.label || cat}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
          </div>
        )}

        {/* Sort By Dropdown */}
        {sortOptions && sortOptions.length > 0 && (
          <div className="relative min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] dark:focus:border-blue-500 cursor-pointer pr-10"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
          </div>
        )}

        {/* View Mode Toggle (Table / Grid) if viewMode is configured */}
        {viewMode && onViewModeChange && (
          <div className="flex items-center bg-slate-50 dark:bg-[#0f172a] p-1 border border-slate-200 dark:border-slate-800 rounded-xl shrink-0 self-end lg:self-center">
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              title="Table View"
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-800 text-[#2563eb] dark:text-blue-400 shadow-xs font-bold"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              title="Grid Cards View"
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-800 text-[#2563eb] dark:text-blue-400 shadow-xs font-bold"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Second Row: Status Filter Pills + Results Counter / Reset Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1.5 sm:pb-0 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2 shrink-0">
            STATUS:
          </span>
          {statusOptions.map((opt) => {
            const isActive = selectedStatus === opt.id;
            const hasDot = opt.id !== "all" || opt.dotColor;

            return (
              <button
                key={opt.id}
                onClick={() => onStatusChange(opt.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? getActivePillClasses(opt.color)
                    : getInactivePillClasses(opt.color)
                }`}
              >
                {hasDot && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-white" : opt.dotColor || "bg-blue-500"
                    }`}
                  />
                )}
                <span>
                  {opt.label} ({opt.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter and Reset Filters Action */}
        <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto shrink-0 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            Showing{" "}
            <strong className="text-slate-700 dark:text-slate-300 font-semibold">
              {totalShowing}
            </strong>{" "}
            of {totalCount} {itemLabel}
          </span>

          {hasActiveFilters && onResetFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline flex items-center space-x-1 cursor-pointer shrink-0 transition-colors"
            >
              <X size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentFilterBar;
