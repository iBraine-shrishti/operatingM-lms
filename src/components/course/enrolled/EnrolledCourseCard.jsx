import React from "react";
import { BookOpen, Check, Edit, Play, RotateCcw } from "lucide-react";

/**
 * EnrolledCourseCard Component
 * Displays an individual enrolled course with live video metrics,
 * completion progress bar, duration/lesson counts, and outline/continue action buttons.
 */
export const EnrolledCourseCard = ({
  course = {},
  metrics = {},
  isAdmin = false,
  onCardClick,
  onOutlineClick,
  onResumeClick,
  onEditClick,
}) => {
  const isCompleted = metrics.isCompleted;
  const progressPercent = metrics.progress || 0;
  const completedActivities =
    metrics.completedActivities ?? metrics.completedLessons ?? 0;
  const totalActivities =
    metrics.totalActivities ?? metrics.totalLessons ?? 0;

  return (
    <div
      onClick={onCardClick}
      className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] hover:border-blue-300 dark:hover:border-blue-500/60 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      <div>
        {/* Banner / Thumbnail Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-850">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Progress Badge overlay */}
          <span
            className={`absolute top-2.5 right-2.5 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs flex items-center space-x-1 ${
              isCompleted ? "bg-emerald-600/90" : "bg-slate-900/85"
            }`}
          >
            {isCompleted ? (
              <>
                <RotateCcw size={11} strokeWidth={2.5} />
                <span>100% • Rewatch</span>
              </>
            ) : (
              <span>{progressPercent}% Done</span>
            )}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Category & Status Row */}
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] dark:text-blue-400 truncate">
              {course.category}
            </span>
            {isCompleted ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/40 text-xs font-bold shadow-2xs">
                <Check size={12} strokeWidth={2.5} />
                <span>Completed</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-300 border border-blue-200/70 dark:border-blue-500/40 text-xs font-bold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] dark:bg-blue-400 animate-pulse" />
                <span>In Progress</span>
              </span>
            )}
          </div>

          {/* Header & Title */}
          <div className="flex items-start justify-between gap-1.5 mb-1.5">
            <h3
              className="font-bold text-slate-900 dark:text-white text-base xl:text-lg leading-snug group-hover:text-[#2563eb] dark:group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[2.5rem]"
              title={course.title}
            >
              {course.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3 font-medium">
            {course.description}
          </p>

          {/* Real Progress Bar Component */}
          <div className="space-y-1.5 mb-3 bg-slate-50/80 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
              <span>
                {completedActivities} of {totalActivities} Activities
              </span>
              <span
                className={`font-bold ${
                  isCompleted
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-[#2563eb] dark:text-blue-400"
                }`}
              >
                {isCompleted ? "100% Completed" : `${progressPercent}%`}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted ? "bg-emerald-500" : "bg-[#2563eb]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Real Metadata Row: Duration | Lessons calculated from actual video units */}
          <div className="grid grid-cols-2 gap-1.5 text-center text-xs text-slate-600 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 mb-1">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 tracking-wider">
                Duration
              </span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums text-xs sm:text-sm truncate">
                {metrics.duration || "N/A"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 tracking-wider">
                Lessons
              </span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums text-xs sm:text-sm">
                {metrics.totalLessons || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Buttons (Outline & Continue/Rewatch) */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center gap-2">
        {isAdmin && (
          <button
            type="button"
            onClick={onEditClick}
            className="py-2 sm:py-2.5 px-3 rounded-xl border border-amber-300/80 dark:border-amber-700/80 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 font-bold text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-[0.98]"
            title="Edit Course in Course Builder"
          >
            <Edit size={13} />
            <span>Edit</span>
          </button>
        )}
        <button
          type="button"
          onClick={onOutlineClick}
          className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-[0.98]"
        >
          <BookOpen size={13} />
          <span>Outline</span>
        </button>
        <button
          type="button"
          onClick={onResumeClick}
          className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-white font-bold text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.98] ${
            isCompleted
              ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
              : "bg-[#2563eb] hover:bg-blue-600 shadow-blue-500/20"
          }`}
          title={
            isCompleted ? "Rewatch course lessons" : "Resume course lessons"
          }
        >
          {isCompleted ? (
            <>
              <RotateCcw size={13} strokeWidth={2.5} />
              <span>Rewatch</span>
            </>
          ) : (
            <>
              <Play size={13} className="fill-white" />
              <span>Continue</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
