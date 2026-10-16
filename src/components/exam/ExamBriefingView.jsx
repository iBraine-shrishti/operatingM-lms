import React from "react";
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  GraduationCap,
  Award,
  BookOpen,
  Lock,
  Eye,
  AlertTriangle,
} from "lucide-react";

/**
 * Enterprise ExamBriefingView:
 * Utilizes the full horizontal screen canvas with side-by-side 2-column layout and 2x2 rules matrix.
 * Strictly unscrollable on tablet, laptop, and desktop screens (>= md), while responsive
 * with smooth vertical scrolling on small mobile screens.
 */
export const ExamBriefingView = ({
  track,
  candidateName,
  rollNumber,
  candidateAvatar,
  centerNode,
  sessionHash,
  studentData,
  pledgeAccepted,
  onPledgeChange,
  onStartExam,
  onBackToCatalog,
}) => {
  return (
    <div className="flex-1 w-full max-w-[1650px] mx-auto h-full max-h-full flex flex-col justify-between overflow-y-auto md:overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 gap-3">
      {/* 1. TOP HEADER BAR: Full-Width Track & Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs shrink-0 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft size={14} />
            <span>Catalog</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span
            className={`px-2 py-0.5 rounded-md text-[10.5px] font-mono font-bold uppercase tracking-wider shrink-0 ${track.badgeColor}`}
          >
            {track.badgeText}
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight truncate">
            {track.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          <span className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg font-bold">
            Code: <strong>{track.code}</strong>
          </span>
          <span className="text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-lg font-bold">
            80% Qualifying Pass
          </span>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN FULL-WIDTH GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 min-h-0 items-stretch">
        {/* LEFT COLUMN: Candidate Verification Admit Card (5 cols on md, 4 cols on xl) */}
        <div className="md:col-span-5 xl:col-span-4 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs gap-2.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">
              CANDIDATE ADMIT CARD
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold border bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40">
              PROFILE VERIFIED • READY
            </span>
          </div>

          {/* Photo + Identity Details */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* 3:4 Passport Photo Frame */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-20 h-26 sm:w-22 sm:h-28 md:w-24 md:h-30 p-1 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-xs">
                <img
                  src={candidateAvatar}
                  alt={candidateName}
                  className="w-full h-full object-cover object-center rounded-lg"
                />
                <span
                  className="absolute top-1.5 right-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-xs ring-2 ring-emerald-400"
                  title="Identity Verified"
                />
                <div className="absolute bottom-1 inset-x-1 py-0.5 bg-slate-900/80 backdrop-blur-xs rounded-b-lg text-center">
                  <span className="text-[8.5px] font-mono font-bold tracking-wider text-emerald-400 uppercase flex items-center justify-center gap-1">
                    <CheckCircle2 size={9} /> Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Candidate Metadata */}
            <div className="min-w-0 flex-1 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Candidate Name
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight truncate">
                {candidateName}
              </h4>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 font-mono text-[11px] font-bold">
                <ShieldCheck size={13} className="text-blue-600 dark:text-blue-400" />
                <span>STUDENT ID: {rollNumber}</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium pt-0.5">
                {centerNode}
              </div>
              <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>BIOMETRIC CREDENTIAL MATCH</span>
              </div>
            </div>
          </div>

          {/* Compact 2x2 Details Grid */}
          <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2.5 grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <span className="text-slate-400 dark:text-slate-500 text-[10.5px] block">Selected Track:</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold truncate block">
                {track.shortTitle}
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 text-[10.5px] block">Enrolled Batch:</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData?.batch || "WD-M1"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 text-[10.5px] block">Center Node:</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData?.center || "Borivali Center"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 text-[10.5px] block">Security Hash:</span>
              <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] truncate block">
                {sessionHash}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Exam Specs & Institutional Rules (7 cols on md, 8 cols on xl) */}
        <div className="md:col-span-7 xl:col-span-8 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs gap-2.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">
              EXAMINATION SPECIFICATION
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              CODE: <strong>{track.code}</strong>
            </span>
          </div>

          {/* 4 Metric Cards (Full row layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2 sm:p-2.5 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 block">
                Questions
              </span>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {track.questionsCount} <span className="text-xs font-normal text-slate-500">MCQs</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                {track.shortTitle}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2 sm:p-2.5 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 block">
                Duration
              </span>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {track.durationMinutes} <span className="text-xs font-normal text-slate-500">Mins</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Auto-submit timer
              </span>
            </div>

            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 rounded-xl p-2 sm:p-2.5 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 block font-semibold">
                Marking
              </span>
              <div className="text-base sm:text-lg font-black text-emerald-800 dark:text-emerald-300 leading-tight">
                +2.00 <span className="text-xs font-normal text-emerald-700 dark:text-emerald-400">marks</span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-bold truncate">
                ✓ No Negative Marking
              </span>
            </div>

            <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/50 rounded-xl p-2 sm:p-2.5 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase text-blue-700 dark:text-blue-400 block font-semibold">
                Pass Mark
              </span>
              <div className="text-base sm:text-lg font-black text-blue-800 dark:text-blue-300 leading-tight">
                80% <span className="text-xs font-normal text-blue-700 dark:text-blue-400">({track.passingMarks}/{track.totalMarks}M)</span>
              </div>
              <span className="text-[10px] text-blue-700 dark:text-blue-400 block truncate">
                Official Credential
              </span>
            </div>
          </div>

          {/* Institutional Rules (2x2 Matrix uses horizontal space and halves vertical height) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <Lock size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>
                <strong>1. Fullscreen Lockdown:</strong> Fullscreen mode is engaged upon start. Exiting fullscreen logs an automated focus alert.
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <Eye size={14} className="text-amber-500 mt-0.5 shrink-0" />
              <span>
                <strong>2. Window Focus Safeguard:</strong> Max <strong className="text-amber-700 dark:text-amber-400">3 warnings</strong> permitted for tab switching or minimizing before automatic paper submission.
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <BookOpen size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>
                <strong>3. Question Palette:</strong> Free bidirectional navigation across all questions. Mark questions for review and return at any time.
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <span>
                <strong>4. Zero Negative Marking:</strong> Exactly +2.00 marks for each correct response with zero penalty deductions for mistakes.
              </span>
            </div>
          </div>

          {/* Proctored Safeguard Banner */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Proctored Examination Mode
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
              Active Security Safeguards Enabled (3 Warnings Policy)
            </span>
          </div>
        </div>
      </div>

      {/* 3. HONOR CODE PLEDGE (Full-width bar) */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 px-3.5 py-2 sm:py-2.5 rounded-xl flex items-center gap-3 shrink-0 shadow-2xs">
        <input
          id="pledge-check"
          type="checkbox"
          checked={pledgeAccepted}
          onChange={(e) => onPledgeChange(e.target.checked)}
          className="w-4 h-4 sm:w-5 sm:h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer shrink-0"
        />
        <label
          htmlFor="pledge-check"
          className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug cursor-pointer select-none"
        >
          I, <strong className="text-slate-950 dark:text-white">{candidateName}</strong>,
          confirm that I am taking the <strong>{track.title}</strong> independently.
          I agree to adhere to the assessment guidelines, accept the marking scheme (+2.00 / No Negative Marking),
          and understand that maintaining window focus is required throughout the test session.
        </label>
      </div>

      {/* 4. BOTTOM ACTION & STATUS STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 shrink-0 pb-1">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md border font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700">
            System: ✓ Ready
          </span>
          <span
            className={`px-2.5 py-1 rounded-md border font-semibold ${
              pledgeAccepted
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700"
            }`}
          >
            Pledge: {pledgeAccepted ? "✓ Accepted" : "Required"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Choose Different Track</span>
          </button>

          <button
            type="button"
            disabled={!pledgeAccepted}
            onClick={onStartExam}
            className={`px-6 py-2 sm:px-8 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
              pledgeAccepted
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:scale-[1.01] active:scale-[0.99]"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
            title={
              !pledgeAccepted
                ? "Accept the Honor Code Pledge above to unlock"
                : "Start Certification Assessment"
            }
          >
            <GraduationCap size={16} />
            <span>Begin Examination</span>
          </button>
        </div>
      </div>
    </div>
  );
};
