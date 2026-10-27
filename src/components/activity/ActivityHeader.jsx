import React from "react";
import { Activity, RefreshCw } from "lucide-react";
import { StudentPageHeader } from "../student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../../config/studentHeadersConfig";

/**
 * ActivityHeader Component
 * Renders either the Admin Audit Trail header banner or the StudentPageHeader
 * with live metric badges and a manual activity refresh button.
 */
export const ActivityHeader = ({
  isAdmin,
  totalEvents = 0,
  counts = {},
  isLoading = false,
  onRefresh,
}) => {
  if (isAdmin) {
    return (
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-2 relative z-10 min-w-0">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Activity size={17} />
            <span>Audit Trail & Activity Log</span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Live</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            System Activity Audit Log
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
            Real-time tracking of student enrollments, exam submissions, certifications, and live classroom interactions.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{totalEvents}</span>
              <span className="font-semibold">Logged Events</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{counts.enrollment || 0}</span>
              <span className="font-semibold">Enrollments</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{(counts.completion || 0) + (counts.quiz || 0)}</span>
              <span className="font-semibold">Progress & Quizzes</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">100%</span>
              <span className="font-semibold">Synchronized</span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto shrink-0 relative z-10">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap disabled:opacity-60"
          >
            <RefreshCw size={16} className={`2xl:w-4.5 2xl:h-4.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>{isLoading ? "Refreshing..." : "Refresh Activity"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <StudentPageHeader
      {...STUDENT_HEADERS_CONFIG.activity}
      metrics={[
        { value: totalEvents, label: "Total Milestones", dotColor: "bg-blue-600" },
        { value: counts.quiz || 0, label: "Quizzes Passed", dotColor: "bg-purple-500" },
        { value: counts.assignment || 0, label: "Submissions", dotColor: "bg-rose-500" },
      ]}
      action={
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap disabled:opacity-60"
        >
          <RefreshCw size={16} className={`2xl:w-4.5 2xl:h-4.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "Refreshing..." : "Refresh Activity"}</span>
        </button>
      }
    />
  );
};
