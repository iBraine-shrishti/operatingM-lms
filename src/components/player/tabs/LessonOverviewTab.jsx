import React from "react";

/**
 * LessonOverviewTab Component
 * Displays the current lesson's title, module, and detailed description.
 */
export const LessonOverviewTab = ({
  currentLesson,
  currentCourse,
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
    </div>
  );
};
