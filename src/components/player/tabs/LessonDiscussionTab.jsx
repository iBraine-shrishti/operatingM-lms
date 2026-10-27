import React from "react";

/**
 * LessonDiscussionTab Component
 * Lesson Q&A preview, instructor pinned guidance, and forum deep-linking.
 */
export const LessonDiscussionTab = ({ onNavigateForums }) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-3">
        <h4 className="font-bold text-slate-900 dark:text-white">
          Questions & Discussion for this Lesson
        </h4>
        <div className="space-y-2">
          <div className="p-3 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Rahul Shende (Lead Faculty)
              </span>
              <span>Pinned Answer</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Remember to always verify the crawl budget directives in
              robots.txt before deploying large e-commerce catalogs.
            </p>
          </div>
        </div>
        <button
          onClick={onNavigateForums}
          className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Join Discussion on Forums
        </button>
      </div>
    </div>
  );
};
