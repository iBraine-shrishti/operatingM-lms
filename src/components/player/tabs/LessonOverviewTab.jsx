import React from "react";
import { MessagesSquare, ExternalLink } from "lucide-react";

/**
 * LessonOverviewTab Component
 * Displays the current lesson's title, module, detailed description,
 * key learning objectives checklist, and community forum shortcut card.
 */
export const LessonOverviewTab = ({
  currentLesson,
  currentCourse,
  onNavigateForums,
}) => {
  return (
    <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
      <div>
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
          {currentLesson?.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {currentLesson?.moduleName} • Course: {currentCourse?.title}
        </p>
      </div>

      <p className="leading-relaxed text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
        {currentLesson?.description ||
          "In this lecture we cover essential strategies and practical execution steps with step-by-step screen recording and instructor commentary."}
      </p>

      {/* Forum Action Banner */}
      <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessagesSquare
            size={16}
            className="text-blue-600 dark:text-cyan-400"
          />
          <span className="font-semibold text-blue-900 dark:text-blue-300">
            Have questions about this lesson?
          </span>
        </div>
        <button
          onClick={onNavigateForums}
          className="font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <span>Open Community Forums</span>
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
};
