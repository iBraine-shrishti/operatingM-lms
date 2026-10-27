import React from "react";
import { Info } from "lucide-react";

/**
 * CourseOverviewTab Component
 * Displays:
 * 1. Course Information highlighted callout
 * 2. About this Specialization description card
 * 3. Course Credentials right sidebar card (Duration, Modules, Units, Enrolled Students, Certificate)
 */
export const CourseOverviewTab = ({
  course = {},
  courseInformationText = "",
  courseDescriptionText = "",
  sections = [],
  units = [],
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      {/* LEFT COLUMN: Main overview & course description */}
      <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
        {/* 1. STARTING BRACKET TEXT CALLOUT (Course Information) */}
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/20 border border-blue-200/80 dark:border-blue-800/60 rounded-xl p-3.5 sm:p-4 shadow-2xs relative overflow-hidden">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Info size={16} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Course Information
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {courseInformationText}
              </p>
            </div>
          </div>
        </div>

        {/* 2. OVERVIEW GREETING & DETAILS */}
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">
              About this Specialization
            </h3>
            {course.overview?.greeting && (
              <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {course.overview.greeting}
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {courseDescriptionText}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: COURSE CREDENTIALS */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
            Course Credentials
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Duration
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {course.duration || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Curriculum Modules
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {sections.length} Modules
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Total Units / Lessons
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {units.length} Items
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Enrolled
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {course.studentsCount || 0} Students
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Certificate
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Official Operating Media Credential
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewTab;
