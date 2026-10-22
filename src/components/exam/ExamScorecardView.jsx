import React from "react";
import {
  CheckCircle2,
  XCircle,
  Download,
  RotateCcw,
  ArrowLeft,
  Award,
} from "lucide-react";

/**
 * ExamScorecardView:
 * Restores the exact institutional styling, centered header result card,
 * 4 big numerical metric boxes, topic performance progress bars, and verification metadata.
 * Uses max-w-5xl mx-auto space-y-6 with natural scrolling.
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
    <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
      <div className="max-w-5xl w-full mx-auto space-y-6 pb-12 sm:pb-16">
        {/* Header Result Card */}
        <div
          className={`rounded-3xl p-7 sm:p-9 border text-center relative overflow-hidden shadow-xs ${
            examResult.passed
              ? "bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 dark:from-emerald-950/60 dark:to-slate-950 border-emerald-300 dark:border-emerald-500/40"
              : "bg-gradient-to-b from-amber-50/60 via-white to-amber-50/20 dark:from-amber-950/30 dark:to-slate-950 border-amber-200 dark:border-amber-700/50"
          }`}
        >
          <div
            className={`w-20 h-20 mx-auto rounded-full border-2 flex items-center justify-center mb-4 ${
              examResult.passed
                ? "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-400 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400"
                : "bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400"
            }`}
          >
            {examResult.passed ? <Award size={44} /> : <XCircle size={44} />}
          </div>

          <span
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-widest inline-block mb-2.5 ${
              examResult.passed
                ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40"
                : "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40"
            }`}
          >
            {examResult.passed
              ? "OFFICIAL RESULT: PASSED • DIPLOMA CERTIFIED"
              : `ASSESSMENT COMPLETED • PASSING MARK: ${track.passingScorePercent || 85.0}%`}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 dark:text-white">
            {examResult.passed
              ? `Congratulations, ${candidateName}! You Cleared the Examination`
              : `Assessment Completed - Passing Threshold ${track.passingScorePercent || 85.0}%`}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto leading-relaxed">
            {examResult.passed
              ? `You have successfully demonstrated mastery across ${track.title} competencies and qualified for your official Certificate.`
              : `The passing threshold for this certification is ${track.passingScorePercent || 85.0}%. You can review the course modules and retake the evaluation.`}
          </p>

          {/* Numerical Score */}
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
              <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">
                Final Score
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">
                {examResult.finalScore}{" "}
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                  / {examResult.maxScore}
                </span>
              </span>
            </div>
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
              <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">
                Percentage
              </span>
              <span
                className={`text-2xl sm:text-3xl font-black block ${
                  examResult.passed
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-amber-700 dark:text-amber-400"
                }`}
              >
                {examResult.percentage}%
              </span>
            </div>
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
              <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">
                Correct
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 block">
                {examResult.totalCorrect}{" "}
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                  / {track.questionsCount}
                </span>
              </span>
            </div>
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
              <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">
                Negative Marking
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 block">
                None
              </span>
            </div>
          </div>
        </div>

        {/* Transcript Details */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs dark:shadow-none">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs sm:text-sm font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">
              TOPIC PERFORMANCE BREAKDOWN
            </span>
            <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-semibold">
              REF: {examResult.certificateId}
            </span>
          </div>

          <div className="space-y-4">
            {examResult.domainScores && Object.keys(examResult.domainScores).length > 0 ? (
              Object.entries(examResult.domainScores).map(([secKey, secData]) => {
                const pct = Math.round((secData.correct / secData.total) * 100);
                return (
                  <div key={secKey} className="space-y-1.5">
                    <div className="flex justify-between text-sm sm:text-base font-mono">
                      <span className="text-slate-800 dark:text-slate-200 font-bold">
                        {secData.name}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 font-bold">
                        {secData.correct} / {secData.total} ({pct}%)
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
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

        {/* Verification Metadata Box */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm sm:text-base font-mono text-slate-600 dark:text-slate-400 space-y-2">
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
            <span className="text-slate-900 dark:text-white font-bold truncate max-w-[240px]">
              {track.title}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Evaluated At:</span>
            <span className="text-slate-900 dark:text-white">{examResult.submissionTimestamp}</span>
          </div>
          <div className="flex justify-between">
            <span>Proctor Audit:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
              VALIDATED • {securityStrikes} / {maxWarnings} WARNINGS RECORDED
            </span>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <Download size={16} />
            <span>Print / Save Transcript</span>
          </button>

          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            {onBackToCatalog && (
              <button
                type="button"
                onClick={onBackToCatalog}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm sm:text-base border border-slate-200 dark:border-transparent transition-colors cursor-pointer"
              >
                All Exams
              </button>
            )}

            <button
              type="button"
              onClick={onRetakeExam}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm sm:text-base border border-slate-200 dark:border-transparent transition-colors cursor-pointer"
            >
              Retake Diagnostic
            </button>

            <button
              type="button"
              onClick={onReturnDashboard}
              className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
