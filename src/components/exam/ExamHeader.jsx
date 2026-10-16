import React from "react";
import { GraduationCap, LogOut, ArrowLeft } from "lucide-react";

/**
 * Institutional top header for the exam experience.
 */
export const ExamHeader = ({
  rollNumber = "OMC-0375",
  activeTrack = null,
  examStage = "CATALOG",
  onExitHall,
  onBackToCatalog,
}) => {
  return (
    <header className="bg-white/95 dark:bg-slate-950/90 border-b border-slate-200/90 dark:border-slate-800/90 px-4 py-2.5 sm:px-6 flex items-center justify-between shrink-0 z-40 backdrop-blur-md shadow-xs dark:shadow-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
          <GraduationCap size={20} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold truncate">
              OMC ASSESSMENT PORTAL
            </span>
            <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-mono bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 rounded font-semibold">
              OFFICIAL CERTIFICATION
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 truncate">
            <span className="truncate">
              {activeTrack ? activeTrack.title : "Operating Media Certification Assessment"}
            </span>
            <span className="text-slate-400 dark:text-slate-500 hidden sm:inline text-xs font-normal">
              • {activeTrack ? activeTrack.code : "Final Evaluation"}
            </span>
          </h2>
        </div>
      </div>

      {/* Right Status & Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span className="text-emerald-800 dark:text-slate-300 font-semibold">
            SESSION ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            STUDENT ID: {rollNumber}
          </span>

          {/* Back to Catalog if in Briefing or Scorecard */}
          {(examStage === "BRIEFING" || examStage === "SCORECARD") && onBackToCatalog && (
            <button
              type="button"
              onClick={onBackToCatalog}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Browse other exams"
            >
              <ArrowLeft size={13} />
              <span>All Exams</span>
            </button>
          )}

          {/* Exit Hall: Hidden during LIVE_EXAM because Live Exam Runner has its own prominent button */}
          {examStage !== "LIVE_EXAM" && onExitHall && (
            <button
              type="button"
              onClick={onExitHall}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow flex items-center gap-2 border border-rose-600 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ring-2 ring-rose-300/40 dark:ring-rose-900/40"
              title="Exit Examination Hall"
            >
              <LogOut size={15} />
              <span>Exit Hall</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
