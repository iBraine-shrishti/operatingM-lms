import React from "react";
import { ArrowLeft, Edit, Layers, Play, Lock } from "lucide-react";

/**
 * CourseDetailHeader Component
 * Displays:
 * 1. Top navigation bar with Back button, Title, Subtitle, and Admin Edit button
 * 2. Course Hero card with Thumbnail, Category & Tag badges, Title, Total Modules chip, Total Videos chip, and Action CTA button
 */
export const CourseDetailHeader = ({
  course = {},
  sections = [],
  units = [],
  totalVideosCount = 0,
  completedActivitiesCount = 0,
  hasCourseAccess = true,
  isExpired = false,
  isAdmin = false,
  onBack,
  onEditCourse,
  onStartLearning,
}) => {
  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVIGATION BAR                                            */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-white dark:bg-[#0b1329] px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            title="Back to Courses"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                Course Details
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal max-w-xl line-clamp-1">
              View curriculum, watch video lessons, and track your learning progress.
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center space-x-2 shrink-0 self-start md:self-auto">
            <button
              onClick={onEditCourse}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
              title="Edit course in Course Builder"
            >
              <Edit size={13} />
              <span>Edit Course</span>
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COURSE HEADER & COURSE CREDENTIALS GRID                       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
        {/* Left: Course Hero Card (lg:col-span-2) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 mb-4">
            {/* Course Thumbnail Image */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs bg-slate-100 dark:bg-slate-800">
              <img
                src={
                  course.image ||
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&auto=format&fit=crop&q=80"
                }
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Metadata */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
                <span className="inline-block bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200/80 dark:border-blue-800/60">
                  {course.category}
                </span>
                {course.tag && (
                  <span className="inline-block bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-purple-200/80 dark:border-purple-800/60">
                    {course.tag}
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {course.title}
              </h1>
            </div>
          </div>

          {/* Stats Chips & Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t border-slate-100 dark:border-slate-800 mt-auto">
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5">
              {/* Chip 1: Total Modules */}
              <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-blue-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2 sm:p-2.5 flex items-center space-x-2.5 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#3b49df] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <Layers size={15} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                    Total Modules
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {String(sections.length).padStart(2, "0")} Modules
                  </span>
                </div>
              </div>

              {/* Chip 2: Total Videos */}
              <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2 sm:p-2.5 flex items-center space-x-2.5 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <Play size={15} className="fill-current translate-x-0.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                    Total Videos
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {totalVideosCount} Videos
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button: Enrolled vs Restricted */}
            {hasCourseAccess ? (
              <button
                onClick={onStartLearning}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
              >
                <Play size={14} className="fill-white" />
                <span>
                  {completedActivitiesCount > 0
                    ? "Continue Learning"
                    : "Start Learning"}
                </span>
              </button>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center space-x-2 cursor-not-allowed select-none"
                title={
                  isExpired
                    ? "Course validity has expired (0 days left)"
                    : "Course access managed in Operating Media CRM"
                }
              >
                <Lock size={14} />
                <span>
                  {isExpired
                    ? "Validity Expired (0 Days Left)"
                    : "Access Restricted in CRM"}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Course Credentials Card (lg:col-span-1) - SHIFTED UPWARDS */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Course Credentials
            </h3>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-800/60">
              Official
            </span>
          </div>

          <div className="space-y-2 text-xs py-2 flex-1 flex flex-col justify-around">
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Duration
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {course.duration || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Curriculum Modules
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {sections.length} Modules
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Total Units / Lessons
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {(units && units.length) || 10} Items
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Enrolled
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {course.studentsCount || 0} Students
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Certificate
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-right text-[11px] sm:text-xs">
                Official Operating Media Credential
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
