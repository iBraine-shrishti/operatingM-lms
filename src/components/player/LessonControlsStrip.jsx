import React from "react";
import { Clock, Bookmark, CheckCircle2 } from "lucide-react";
import { formatTime } from "../../utils/playerUtils";

/**
 * LessonControlsStrip Component
 * The bottom utility bar under the video player.
 * Shows elapsed/total duration, autoplay toggle, bookmark timestamp action, and completion status.
 */
export const LessonControlsStrip = ({
  currentTime = 0,
  duration = 0,
  autoPlayNext = true,
  onToggleAutoPlay,
  onBookmarkNote,
  isCompleted = false,
  onToggleCompleted,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
      <div className="flex items-center space-x-3">
        <span className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300 font-mono font-medium">
          <Clock size={14} className="text-cyan-500" />
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </span>
        <span className="text-slate-300 dark:text-slate-700">•</span>

        {/* Modern iOS-Style Toggle for Autoplay Next Lesson */}
        <label className="flex items-center space-x-2 cursor-pointer select-none">
          <div
            onClick={onToggleAutoPlay}
            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${
              autoPlayNext
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 justify-end"
                : "bg-slate-300 dark:bg-slate-700 justify-start"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Autoplay Next Lesson
          </span>
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onBookmarkNote}
          className="px-3.5 py-1.5 rounded-xl font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200/60 dark:border-blue-800/60 transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
          title="Add Note at Current Timestamp"
        >
          <Bookmark size={13} className="text-blue-500 dark:text-cyan-400" />
          <span>Bookmark Note [{formatTime(currentTime)}]</span>
        </button>

        <button
          onClick={onToggleCompleted}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
            isCompleted
              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <CheckCircle2
            size={14}
            className={isCompleted ? "text-emerald-500" : "text-slate-400"}
          />
          <span>{isCompleted ? "Completed" : "Mark as Done"}</span>
        </button>
      </div>
    </div>
  );
};
