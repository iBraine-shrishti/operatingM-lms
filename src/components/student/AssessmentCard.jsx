import React from "react";
import {
  Calendar,
  Clock,
  Award,
  HelpCircle,
  FileText,
  Play,
  RotateCcw,
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { CourseBadge } from "../common/CourseBadge";
import { AssessmentStatusBadge } from "../common/AssessmentStatusBadge";
import { getCourseTheme, getDaysLeftText } from "../../config/courseThemesConfig";
import { QUIZ_ENHANCED_DESCRIPTIONS } from "../../data/assessmentDataConfig";

/**
 * Reusable AssessmentCard component
 * Handles both Assignments and Quizzes in an elegant, modern card view
 */
export const AssessmentCard = ({
  type = "assignment", // 'assignment' | 'quiz'
  data,
  onAction,
  onSecondaryAction,
  onTertiaryAction,
  className = "",
}) => {
  if (!data) return null;

  const isQuiz = type === "quiz";
  const theme = getCourseTheme(data.courseId, data.courseTitle, data.category);

  // -------------------------------------------------------------
  // QUIZ CARD VARIANT
  // -------------------------------------------------------------
  if (isQuiz) {
    const isPassed = data.studentStatus === "passed";
    const desc = QUIZ_ENHANCED_DESCRIPTIONS[data.id] || data.description;

    return (
      <div
        className={`bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-blue-500/60 rounded-2xl shadow-xs hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all duration-200 flex flex-col justify-between overflow-hidden group ${className}`}
      >
        {/* Top Accent Gradient Bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${theme.topGradient}`} />

        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3.5">
            {/* Top Row: Course Theme Pill + Status Badge */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <CourseBadge
                courseId={data.courseId}
                courseTitle={data.courseTitle}
                category={data.category}
                size="md"
              />

              <AssessmentStatusBadge
                status={data.studentStatus}
                score={data.studentScore}
              />
            </div>

            {/* Quiz Title */}
            <h3
              onClick={() => (isPassed ? onSecondaryAction?.(data) : onAction?.(data))}
              className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors leading-snug cursor-pointer"
            >
              {data.title}
            </h3>

            {/* Quiz Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-3">
              {desc}
            </p>
          </div>

          {/* Specifications Strip */}
          <div className="bg-slate-50/90 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 grid grid-cols-3 gap-2 text-center mt-3">
            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/70 border border-slate-100/90 dark:border-slate-700/60 shadow-2xs">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] mb-0.5 font-bold">
                <HelpCircle size={12} className="text-blue-500" />
                <span>Questions</span>
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                {data.totalQuestions}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/70 border border-slate-100/90 dark:border-slate-700/60 shadow-2xs">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] mb-0.5 font-bold">
                <Clock size={12} className="text-amber-500" />
                <span>Duration</span>
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                {data.durationMinutes}m
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/70 border border-slate-100/90 dark:border-slate-700/60 shadow-2xs">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] mb-0.5 font-bold">
                <Award size={12} className="text-emerald-500" />
                <span>Pass Req.</span>
              </div>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
                {data.passScorePercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-4 sm:px-6 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          {isPassed ? (
            <>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                <span>Completed on {data.completedDate || "Recently"}</span>
                {data.timeSpent && <span className="hidden sm:inline"> • {data.timeSpent}</span>}
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                {onSecondaryAction && (
                  <button
                    type="button"
                    onClick={() => onSecondaryAction(data)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1"
                  >
                    <Eye size={12} />
                    <span>Review</span>
                  </button>
                )}
                {onTertiaryAction && (
                  <button
                    type="button"
                    onClick={() => onTertiaryAction(data)}
                    className="px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                  >
                    <RotateCcw size={12} />
                    <span>Retake</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                <Calendar size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">{data.deadline || "Available Anytime"}</span>
              </div>
              <button
                type="button"
                onClick={() => onAction?.(data)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shrink-0"
              >
                <Play size={12} className="fill-white" />
                <span>Start Test</span>
                <ArrowRight size={13} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ASSIGNMENT CARD VARIANT
  // -------------------------------------------------------------
  const isGraded = data.status === "graded";
  const isSubmitted = data.status === "submitted";
  const isPending = data.status === "pending" || !data.status;

  return (
    <div
      className={`bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-blue-500/60 rounded-2xl shadow-xs hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all duration-200 flex flex-col justify-between overflow-hidden group ${className}`}
    >
      {/* Top Accent Gradient Bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.topGradient}`} />

      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Top Row: Course Theme Pill + Status Badge */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CourseBadge
              courseId={data.courseId}
              courseTitle={data.courseTitle}
              size="md"
            />

            <AssessmentStatusBadge status={data.status} score={data.score} />
          </div>

          {/* Title */}
          <h3
            onClick={() => (isGraded ? onSecondaryAction?.(data) : onAction?.(data))}
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors leading-snug cursor-pointer"
          >
            {data.title}
          </h3>

          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium pt-0.5">
            <div className="flex items-center space-x-1.5">
              <Calendar size={13} className="text-slate-400" />
              <span>
                Due: <strong className="text-slate-800 dark:text-slate-200">{data.dueDate}</strong>
              </span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center space-x-1.5">
              <FileCheck2 size={13} className="text-slate-400" />
              <span>
                Max: <strong className="text-slate-800 dark:text-slate-200">{data.maxScore || 100} pts</strong>
              </span>
            </div>
          </div>

          {/* Brief / Instructions */}
          <div className="bg-slate-50/90 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {data.instructions}
          </div>

          {/* Graded Feedback Snippet */}
          {isGraded && data.feedback && (
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-300 font-bold text-[11px]">
                <span className="flex items-center space-x-1.5">
                  <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Feedback Snippet</span>
                </span>
                <span className="font-extrabold">{data.score} / 100</span>
              </div>
              <p className="text-emerald-950 dark:text-emerald-200 italic line-clamp-2">
                "{data.feedback}"
              </p>
            </div>
          )}

          {/* Submitted Under Review Snippet */}
          {isSubmitted && (
            <div className="bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-purple-900 dark:text-purple-300 font-bold text-[11px]">
                <CheckCircle2 size={13} className="text-purple-600 dark:text-purple-400" />
                <span>Submitted {data.submittedAt ? `on ${data.submittedAt}` : ""}</span>
              </div>
              <p className="text-purple-950 dark:text-purple-200 text-[11px]">
                Under instructor review. Grades will be posted upon grading.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 sm:px-6 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {getDaysLeftText(data.dueDate)}
        </div>

        <div className="flex items-center space-x-2">
          {isGraded ? (
            <button
              onClick={() => onSecondaryAction?.(data)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1.5"
            >
              <Eye size={13} />
              <span>Feedback</span>
            </button>
          ) : (
            <button
              onClick={() => onAction?.(data)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
            >
              <FileText size={13} />
              <span>{isSubmitted ? "Re-submit" : "Submit Work"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;
