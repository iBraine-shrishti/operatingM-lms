import React from "react";
import { Play, HelpCircle, FileText, CheckCircle2 } from "lucide-react";
import { formatTime } from "../../../utils/playerUtils";

/**
 * LessonPlaylistItem Component
 * Single lesson, quiz, or assignment row in the playlist stream.
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
      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
        isActive
          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
          : "bg-white dark:bg-[#0b1329] border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start space-x-2.5 min-w-0">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
              isActive
                ? "bg-white/20 text-white"
                : isQuiz
                  ? "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300"
                  : isAss
                    ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            {isActive ? (
              <Play size={11} className="fill-current translate-x-0.5" />
            ) : isQuiz ? (
              <HelpCircle size={13} />
            ) : isAss ? (
              <FileText size={13} />
            ) : (
              <span>
                {secIndex}.{uIdx + 1}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <h5
                className={`text-xs font-bold leading-snug truncate ${
                  isActive ? "text-white" : "text-slate-800 dark:text-slate-200"
                }`}
              >
                {unit.title}
              </h5>
              {isQuiz && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 shrink-0">
                  Test
                </span>
              )}
              {isAss && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
                  Assignment
                </span>
              )}
            </div>
            <div
              className={`flex items-center space-x-1.5 mt-0.5 text-[10px] ${
                isActive ? "text-blue-100" : "text-slate-400"
              }`}
            >
              <span>{unit.duration}</span>
              {isQuiz && unit.totalQuestions && (
                <>
                  <span>•</span>
                  <span>{unit.totalQuestions} Questions</span>
                </>
              )}
              {hasResume && !unit.isCompleted && !isQuiz && !isAss && (
                <>
                  <span>•</span>
                  <span
                    className={
                      isActive
                        ? "text-cyan-200 font-semibold"
                        : "text-blue-500 font-semibold"
                    }
                  >
                    Resume at {formatTime(savedSecs)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 pt-0.5">
          {unit.isCompleted ? (
            <CheckCircle2
              size={16}
              className={isActive ? "text-white" : "text-emerald-500"}
            />
          ) : isQuiz ? (
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:underline">
              Start →
            </span>
          ) : isAss ? (
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline">
              Open →
            </span>
          ) : (
            <Play
              size={13}
              className={
                isActive
                  ? "text-white fill-white animate-pulse"
                  : "text-slate-300 dark:text-slate-600"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
