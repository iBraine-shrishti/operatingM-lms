import React from "react";
import { Play, BookOpen, CheckCircle2 } from "lucide-react";

/**
 * CourseActivityRow Component
 * Renders an individual lesson/activity row within a section accordion:
 * - Activity type icon (Play for video, BookOpen for reading)
 * - Title and badge
 * - Duration & Walkthrough label
 * - Completion toggle button
 */
export const CourseActivityRow = ({
  item = {},
  courseId,
  onNavigate,
  onToggleCompletion,
}) => {
  const isReading = item.type === "reading";

  return (
    <div
      onClick={() => {
        onNavigate(`/lesson-player?courseId=${courseId}&unitId=${item.id}`);
      }}
      className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
    >
      <div className="flex items-center space-x-3.5 truncate">
        {/* Type icon */}
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
            isReading
              ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400"
              : "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/60 text-[#3b49df] dark:text-blue-400"
          }`}
        >
          {isReading ? (
            <BookOpen size={15} />
          ) : (
            <Play size={14} className="fill-current translate-x-0.5" />
          )}
        </div>

        <div className="truncate">
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#3b49df] dark:group-hover:text-blue-400 transition-colors truncate">
              {item.title}
            </span>
            {isReading && (
              <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-full shrink-0">
                Reading Material
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
            {item.duration || "15:00"} • Practical walkthrough
          </span>
        </div>
      </div>

      {/* Completion toggle checkmark circle */}
      <div className="flex items-center space-x-3 shrink-0">
        <button
          type="button"
          onClick={(e) => onToggleCompletion(item.id, e)}
          className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={
            item.isCompleted ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {item.isCompleted ? (
            <CheckCircle2
              size={20}
              className="text-emerald-600 dark:text-emerald-400 fill-emerald-50 dark:fill-emerald-950/60"
            />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-[#3b49df] dark:group-hover:border-blue-400 transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseActivityRow;
