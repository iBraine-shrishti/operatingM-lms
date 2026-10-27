import React from "react";
import { BookOpen } from "lucide-react";

/**
 * EnrolledCoursesEmptyState Component
 * Displays empty state message when student has no active enrollments
 * or when search/filter criteria match 0 courses.
 */
export const EnrolledCoursesEmptyState = ({
  hasNoEnrollments = false,
  onResetFilters,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center shadow-xs space-y-3">
      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-500/30">
        <BookOpen size={22} />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white text-base">
        No Enrolled Courses Found
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        {hasNoEnrollments
          ? "You do not have active course enrollments assigned in Operating Media CRM. Please contact administration to assign your curriculum modules."
          : "No courses match your selected filter criteria. Try choosing another category or clearing your search."}
      </p>
      <div className="pt-2">
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default EnrolledCoursesEmptyState;
