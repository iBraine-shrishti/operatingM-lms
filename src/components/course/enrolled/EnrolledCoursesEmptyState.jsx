import React from "react";
import { BookOpen, Lock, Clock, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * EnrolledCoursesEmptyState Component
 * Displays empty state message when student has no active enrollments,
 * when course validity has expired (0 days left), or when search/filter criteria match 0 courses.
 */
export const EnrolledCoursesEmptyState = ({
  hasNoEnrollments = false,
  isExpired = false,
  courseEnd = "",
  daysLeft = 0,
  onResetFilters,
}) => {
  const navigate = useNavigate();

  if (isExpired) {
    return (
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xs text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-xs">
          <Lock size={32} />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Course Access Period Concluded
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Your course access period has concluded with <strong>0 days remaining</strong>. In accordance with Operating Media LMS policy, video lectures, course outlines, and enrolled learning modules are locked.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200/90 dark:border-rose-800/60">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span>0 Days Remaining • Course Validity Expired{courseEnd ? ` (${courseEnd})` : ""}</span>
        </div>

        <div className="max-w-md mx-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-800 dark:hover:bg-white transition cursor-pointer"
          >
            <Clock size={14} />
            <span>View Profile Timeline</span>
          </button>
          <button
            onClick={() => navigate("/profile?tab=attendance")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition cursor-pointer"
          >
            <UserCheck size={14} />
            <span>Contact Coordinator</span>
          </button>
        </div>
      </div>
    );
  }

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
