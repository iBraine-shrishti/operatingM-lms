import React from "react";
import {
  ArrowLeft,
  SkipBack,
  SkipForward,
  CheckCircle2,
  Maximize2,
  Minimize2,
} from "lucide-react";

/**
 * LessonTopBar Component
 * Renders the top navigation and action control bar for the lesson player,
 * including course navigation, module tracking, prev/next buttons,
 * completion toggle, playback speed cycler, and theater mode switcher.
 */
export const LessonTopBar = ({
  currentCourse,
  currentLesson,
  activeLessonIdx,
  totalLessons,
  playbackSpeed = 1,
  theaterMode = false,
  onBackToCourse,
  onPreviousLesson,
  onNextLesson,
  onToggleCompleted,
  onCycleSpeed,
  onToggleTheater,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1329] p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={onBackToCourse}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          title="Back to Course Details"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="min-w-0">
          <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider block truncate">
            {currentLesson?.moduleName || "Curriculum Track"}
          </span>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
            {currentLesson?.title}
          </h2>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center space-x-2 shrink-0 justify-end">
        {/* Previous Lesson */}
        <button
          disabled={activeLessonIdx <= 0}
          onClick={onPreviousLesson}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Previous Lesson"
        >
          <SkipBack size={17} />
        </button>

        {/* Next Lesson */}
        <button
          disabled={activeLessonIdx >= totalLessons - 1}
          onClick={onNextLesson}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Next Lesson"
        >
          <SkipForward size={17} />
        </button>

        {/* Mark Complete Button */}
        <button
          onClick={onToggleCompleted}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
            currentLesson?.isCompleted
              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <CheckCircle2
            size={14}
            className={
              currentLesson?.isCompleted
                ? "text-emerald-600"
                : "text-slate-400"
            }
          />
          <span>
            {currentLesson?.isCompleted ? "Completed" : "Mark as Done"}
          </span>
        </button>

        {/* Speed Selector */}
        <button
          onClick={onCycleSpeed}
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
          title="Playback Speed"
        >
          {playbackSpeed}x
        </button>

        {/* Theater Mode Toggle */}
        <button
          onClick={onToggleTheater}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer hidden md:flex"
          title={theaterMode ? "Exit Theater Mode" : "Theater Mode"}
        >
          {theaterMode ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>
      </div>
    </div>
  );
};
