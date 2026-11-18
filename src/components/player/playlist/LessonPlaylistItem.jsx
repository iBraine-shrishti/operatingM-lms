import React from "react";
import { Play, HelpCircle, FileText, CheckCircle2, Clock } from "lucide-react";
import { formatTime } from "../../../utils/playerUtils";

/**
 * LessonPlaylistItem Component
 * Sleek, intuitive video lecture playlist card.
 * Designed so users immediately understand it is a video player playlist:
 * - Clear Play action button
 * - Video duration & lecture metadata
 * - High-visibility "Now Playing" active state with live equalizer
 * - Distinct styling for Quizzes and Practical Assignments
 */
export const LessonPlaylistItem = ({
  unit,
  secIndex,
  uIdx,
  currentLessonId,
  currentCourseId,
  onSelectUnit,
  onNavigateQuiz,
  onNavigateAssignment,
}) => {
  const isAss = unit.type === "assignment";
  const isQuiz =
    unit.type === "quiz" ||
    unit.title?.toLowerCase().includes("quiz") ||
    unit.title?.toLowerCase().includes("test");
  const isActive = unit.id === currentLessonId && !isAss && !isQuiz;
  const isCompleted = Boolean(unit.isCompleted);

  const savedProgress = localStorage.getItem(
    `om_video_progress_${currentCourseId}_${unit.id}`,
  );
  const savedSecs = savedProgress ? parseFloat(savedProgress) : 0;
  const hasResume = savedSecs > 5;

  const handleClick = () => {
    if (isQuiz) {
      onNavigateQuiz?.(unit.quizId || unit.id);
    } else if (isAss) {
      onNavigateAssignment?.(unit.assignmentId || unit.id);
    } else {
      onSelectUnit?.(unit);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
        isActive
          ? "bg-blue-50/90 dark:bg-blue-950/40 border-2 border-blue-500 dark:border-blue-500 shadow-xs ring-1 ring-blue-500/20"
          : isCompleted
            ? "bg-white dark:bg-[#0b1329] border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700/60 text-slate-800 dark:text-slate-200"
            : "bg-white dark:bg-[#0b1329] border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Playable Video Icon + Metadata */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {/* Play/Status Icon Badge */}
          <div className="shrink-0">
            {isActive ? (
              // Active Playing Indicator: Perfect Circular Blue Badge with Centered White Play Triangle
              <div
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm ring-2 ring-blue-400/40"
                title="Currently playing lecture"
              >
                <Play size={13} className="fill-white translate-x-[0.5px]" />
              </div>
            ) : isCompleted ? (
              // Watched Checkmark (Turns into circular Play on hover for rewatching)
              <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-2xs">
                <CheckCircle2 size={16} className="group-hover:hidden" />
                <Play size={12} className="hidden group-hover:block fill-current translate-x-[0.5px]" />
              </div>
            ) : isQuiz ? (
              <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 flex items-center justify-center shadow-2xs">
                <HelpCircle size={15} />
              </div>
            ) : isAss ? (
              <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center shadow-2xs">
                <FileText size={15} />
              </div>
            ) : (
              // Standard Playable Circular Video Icon with Centered Triangle
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-2xs">
                <Play size={12} className="fill-current translate-x-[0.5px]" />
              </div>
            )}
          </div>

          {/* Title and Duration Line */}
          <div className="min-w-0 flex-1">
            <h5
              className={`text-xs font-bold leading-snug truncate ${
                isActive
                  ? "text-blue-900 dark:text-blue-200"
                  : "text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400"
              }`}
            >
              {unit.title}
            </h5>

            <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              {isActive ? (
                <span className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-cyan-400">
                  <span className="flex items-end gap-[2px] h-3.5 pb-0.5">
                    <span className="w-[3px] bg-blue-600 dark:bg-cyan-400 rounded-full animate-eq-1" />
                    <span className="w-[3px] bg-blue-600 dark:bg-cyan-400 rounded-full animate-eq-2" />
                    <span className="w-[3px] bg-blue-600 dark:bg-cyan-400 rounded-full animate-eq-3" />
                    <span className="w-[3px] bg-blue-600 dark:bg-cyan-400 rounded-full animate-eq-4" />
                  </span>
                  <span>Now Playing • {unit.duration || "Video"}</span>
                </span>
              ) : isQuiz ? (
                <span>Quiz • {unit.totalQuestions || 5} Questions</span>
              ) : isAss ? (
                <span>Assignment Project</span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <span>Video • {unit.duration || "20:00"}</span>
                </span>
              )}

              {hasResume && !isCompleted && !isQuiz && !isAss && !isActive && (
                <>
                  <span>•</span>
                  <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                    Resume at {formatTime(savedSecs)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Status Badge */}
        <div className="shrink-0">
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-extrabold bg-blue-600 text-white uppercase tracking-wider shadow-xs">
              <span className="flex items-end gap-[2px] h-3 pb-0.5">
                <span className="w-[2px] bg-white rounded-full animate-eq-1" />
                <span className="w-[2px] bg-white rounded-full animate-eq-2" />
                <span className="w-[2px] bg-white rounded-full animate-eq-3" />
                <span className="w-[2px] bg-white rounded-full animate-eq-4" />
              </span>
              <span>Playing</span>
            </span>
          ) : isCompleted ? (
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span className="hidden sm:inline">Watched</span>
            </span>
          ) : isQuiz ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              Start →
            </span>
          ) : isAss ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              Open →
            </span>
          ) : (
            <span className="w-5 h-5 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
              <Play size={12} className="fill-current translate-x-[0.5px]" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
