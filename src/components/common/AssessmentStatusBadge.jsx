import React from "react";
import { Clock, CheckCircle2, Award, AlertCircle, RotateCcw } from "lucide-react";

/**
 * Standardized status badge for assignments and quizzes
 * Ensures consistent colors, typography, and dark mode styling
 */
export const AssessmentStatusBadge = ({
  status,
  score = null,
  maxScore = 100,
  className = "",
}) => {
  const normalized = (status || "pending").toLowerCase();

  if (normalized === "graded") {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/90 dark:border-emerald-800/60 shadow-2xs ${className}`}
      >
        <Award size={13} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>GRADED</span>
        {typeof score === "number" && (
          <span className="font-extrabold ml-0.5">• {score} pts</span>
        )}
      </span>
    );
  }

  if (normalized === "passed") {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/90 dark:border-emerald-800/60 shadow-2xs ${className}`}
      >
        <CheckCircle2 size={13} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>PASSED</span>
        {typeof score === "number" && (
          <span className="font-extrabold ml-0.5">• {score}%</span>
        )}
      </span>
    );
  }

  if (normalized === "submitted") {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200/90 dark:border-purple-800/60 shadow-2xs ${className}`}
      >
        <CheckCircle2 size={13} className="shrink-0 text-purple-600 dark:text-purple-400" />
        <span>SUBMITTED</span>
      </span>
    );
  }

  if (normalized === "failed" || normalized === "retake") {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/90 dark:border-rose-800/60 shadow-2xs ${className}`}
      >
        <RotateCcw size={13} className="shrink-0 text-rose-500" />
        <span>RETAKE REQUIRED</span>
      </span>
    );
  }

  // Default: Pending / Available
  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/90 dark:border-rose-800/60 shadow-2xs ${className}`}
    >
      <Clock size={13} className="shrink-0 text-rose-500" />
      <span>PENDING</span>
    </span>
  );
};

export default AssessmentStatusBadge;
