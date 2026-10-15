import React from "react";
import { History, FileText, Zap, Download, BookOpen, Calendar } from "lucide-react";

/**
 * ProfileCourseHistorySection: Displays the course enrollment timeline and quick action buttons.
 *
 * @param {Object} props
 * @param {Object} props.studentData - Normalized student data
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onOpenReceipt - Handler to download/open fee receipt
 * @param {Function} props.onNavigateCourse - Handler to navigate to course curriculum
 * @param {Function} props.onNavigateSchedule - Handler to navigate to schedule timetable
 */
export const ProfileCourseHistorySection = ({
  studentData,
  activeTab,
  onOpenReceipt,
  onNavigateCourse,
  onNavigateSchedule,
}) => {
  return (
    <div
      id="section-course-history"
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 scroll-mt-20"
    >
      {/* LEFT (~60%): Course Change History Timeline */}
      <div
        className={`lg:col-span-7 bg-white dark:bg-[#0b1329] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-500 ${
          activeTab === "history"
            ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
            : "border border-slate-200/80 dark:border-slate-800"
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <History size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Course Change History
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {activeTab === "history" && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800 animate-in fade-in duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                <span>Active Section</span>
              </span>
            )}
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-800">
              {(studentData.courseHistory || []).length} Logged{" "}
              {(studentData.courseHistory || []).length === 1
                ? "Event"
                : "Events"}
            </span>
          </div>
        </div>

        {/* Timeline entries */}
        <div className="relative pl-6 space-y-4">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-blue-100 dark:bg-slate-800" />
          {(studentData.courseHistory || []).map((ev, idx) => (
            <div
              key={ev.id || idx}
              className="relative flex items-start space-x-3 text-xs"
            >
              <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950" />
              <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 pt-0.5 min-w-[75px]">
                {ev.date}
              </span>
              <div className="flex items-start space-x-2.5 bg-slate-50/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex-1">
                <FileText
                  size={16}
                  className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                />
                <div>
                  <strong className="text-slate-900 dark:text-white font-bold block">
                    {ev.title}
                  </strong>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    {ev.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT (~40%): Quick Actions */}
      <div
        className={`lg:col-span-5 bg-white dark:bg-[#0b1329] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-500 ${
          activeTab === "history"
            ? "border-2 border-blue-500/80 dark:border-blue-500/80 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
            : "border border-slate-200/80 dark:border-slate-800"
        }`}
      >
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Zap size={18} className="text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            Quick Actions
          </h3>
        </div>

        {/* 3 Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Action 1: Download Fee Receipt */}
          <button
            type="button"
            onClick={() => onOpenReceipt && onOpenReceipt()}
            className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center text-center space-y-2 shadow-xs transition-all cursor-pointer active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Download size={16} className="text-white" />
            </div>
            <span className="text-[11px] font-bold leading-tight">
              Download Fee Receipt
            </span>
          </button>

          {/* Action 2: View Course Curriculum */}
          <button
            type="button"
            onClick={() => onNavigateCourse && onNavigateCourse()}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs transition-all cursor-pointer active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950 text-blue-600 dark:text-blue-400">
              <BookOpen size={16} />
            </div>
            <span className="text-[11px] font-bold leading-tight">
              Course Outline
            </span>
          </button>

          {/* Action 3: View Classroom Schedule */}
          <button
            type="button"
            onClick={() => onNavigateSchedule && onNavigateSchedule()}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs transition-all cursor-pointer active:scale-95 group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Calendar size={16} />
            </div>
            <span className="text-[11px] font-bold leading-tight">
              Class Schedule
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
