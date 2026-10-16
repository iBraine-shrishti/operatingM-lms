import React from "react";
import { History, FileText } from "lucide-react";

/**
 * ProfileCourseHistorySection: Displays the course enrollment timeline.
 *
 * @param {Object} props
 * @param {Object} props.studentData - Normalized student data
 * @param {string} props.activeTab - Currently active tab
 */
export const ProfileCourseHistorySection = ({
  studentData,
  activeTab,
}) => {
  return (
    <div
      id="section-course-history"
      className="w-full scroll-mt-20"
    >
      {/* Course Change History Timeline Card */}
      <div
        className={`w-full bg-white dark:bg-[#0b1329] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-500 ${
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
    </div>
  );
};
