import React from "react";
import {
  CheckCircle2,
  XCircle,
  Download,
  RotateCcw,
  ArrowLeft,
  Award,
  ShieldCheck,
  FileText,
  Calendar,
  User,
  Hash,
} from "lucide-react";

/**
 * Enterprise ExamScorecardView:
 * Utilizes the full horizontal screen canvas with a 2-column dashboard layout,
 * presenting results, score metrics, topic competency breakdown, and verification audit
 * cleanly without unnecessary vertical scrolling or centralized narrowing.
 */
export const ExamScorecardView = ({
  track,
  examResult,
  candidateName,
  rollNumber,
  securityStrikes,
  maxWarnings = 3,
  onRetakeExam,
  onBackToCatalog,
  onReturnDashboard,
}) => {
  if (!examResult) return null;

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-[1650px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 space-y-5">
      {/* 1. FULL-WIDTH OUTCOME & SCORE MATRIX BANNER */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Outcome Status & Candidate Congratulation */}
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
              examResult.passed
                ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20"
                : "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20"
            }`}
          >
            {examResult.passed ? (
              <CheckCircle2 size={32} />
            ) : (
              <XCircle size={32} />
            )}
          </div>

          <div className="space-y-1">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider inline-block border ${
                examResult.passed
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                  : "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700"
              }`}
            >
              {examResult.passed
                ? "OFFICIAL CERTIFICATION CONFERRED"
                : "ASSESSMENT ATTEMPT COMPLETED"}
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              {examResult.passed
                ? `Congratulations, ${candidateName}!`
                : "Assessment Performance Overview"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
              Track: <strong className="text-slate-700 dark:text-slate-300">{track.title}</strong> • Code: {track.code}
            </p>
          </div>
        </div>

        {/* Right: Numerical Score Matrix (Horizontal full-width strip) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 text-left">
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-3 sm:p-3.5 rounded-xl shadow-2xs">
            <span className="text-[10.5px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold block mb-0.5">
              Final Score
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white block">
              {examResult.finalScore}{" "}
              <span className="text-xs font-mono text-slate-400 font-normal">
                / {examResult.maxScore}
              </span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Passing: {track.passingMarks} M</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-3 sm:p-3.5 rounded-xl shadow-2xs">
            <span className="text-[10.5px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold block mb-0.5">
              Percentage
            </span>
            <span
              className={`text-xl sm:text-2xl font-black block ${
                examResult.passed
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {examResult.percentage}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Req: 80.0%</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-3 sm:p-3.5 rounded-xl shadow-2xs">
            <span className="text-[10.5px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold block mb-0.5">
              Correct MCQs
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 block">
              {examResult.totalCorrect}{" "}
              <span className="text-xs font-mono text-slate-400 font-normal">
                / {track.questionsCount}
              </span>
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">+2.00 marks each</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-3 sm:p-3.5 rounded-xl shadow-2xs">
            <span className="text-[10.5px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold block mb-0.5">
              Penalty
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 block">
              None
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">0.00 Deduction</span>
          </div>
        </div>
      </div>

      {/* 2. LOWER DASHBOARD SECTION: Split 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* LEFT COLUMN: Candidate Verification Audit & Action Buttons (5 cols on lg, 4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between gap-4">
          {/* Official Audit Box */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
                OFFICIAL RECORD AUDIT
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                VERIFIED TRANSCRIPT
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Candidate:</span>
                <span className="text-slate-900 dark:text-white font-bold">{candidateName}</span>
              </div>
              <div className="flex justify-between">
                <span>Student ID:</span>
                <span className="text-slate-900 dark:text-white font-bold">{rollNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Evaluated Track:</span>
                <span className="text-slate-900 dark:text-white font-bold truncate max-w-[190px]">{track.shortTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Credential ID:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{examResult.certificateId}</span>
              </div>
              <div className="flex justify-between">
                <span>Evaluated At:</span>
                <span className="text-slate-900 dark:text-white">{examResult.submissionTimestamp}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Proctor Audit:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  VALIDATED • {securityStrikes}/{maxWarnings} WARNINGS
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Panel */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Download size={14} />
              <span>Print / Save Official Transcript</span>
            </button>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={onRetakeExam}
                className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Retake</span>
              </button>

              <button
                type="button"
                onClick={onBackToCatalog}
                className="py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Award size={12} />
                <span>All Exams</span>
              </button>

              <button
                type="button"
                onClick={onReturnDashboard}
                className="py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <ArrowLeft size={12} />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Topic Competency Breakdown (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">
                TOPIC PERFORMANCE BREAKDOWN
              </span>
              <span className="text-xs font-mono text-slate-400">
                REF: {examResult.certificateId}
              </span>
            </div>

            {/* Competency Bars in a responsive grid */}
            <div className="mt-3.5 space-y-3">
              {examResult.domainScores && Object.keys(examResult.domainScores).length > 0 ? (
                Object.entries(examResult.domainScores).map(([secKey, secData]) => {
                  const pct = Math.round((secData.correct / secData.total) * 100);
                  return (
                    <div key={secKey} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-800 dark:text-slate-200 font-bold truncate">
                          {secData.name}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 font-bold shrink-0">
                          {secData.correct} / {secData.total} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            pct >= 80
                              ? "bg-emerald-500"
                              : pct >= 60
                                ? "bg-amber-500"
                                : "bg-blue-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 text-center text-xs text-slate-500 font-mono">
                  No domain breakdown available for this attempt.
                </div>
              )}
            </div>
          </div>

          {/* Institutional Stamp Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Operating Media Examination Council</span>
            <span>Accredited Certification Transcript</span>
          </div>
        </div>
      </div>
    </div>
  );
};
