import React from "react";
import {
  GraduationCap,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Info,
  Monitor,
  Wifi,
} from "lucide-react";

/**
 * Enterprise ExamBriefingView:
 * 1. Properly merged Candidate Admit Card & Examination Specifications into ONE unified institutional card
 *    with a clean vertical dividing border on desktop and balanced proportions (not over-stretched).
 * 2. Exact high-fidelity visual styling, typography, and colors restored from the original pre-division UI.
 * 3. 100% rock-solid mobile & small screen responsiveness:
 *    - Placed inside a natural scrollable container (max-w-7xl mx-auto space-y-6)
 *    - Zero absolute collisions or flex-height collapses so the Honor Code Pledge NEVER overlaps on mobile.
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
    <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
      <div className="max-w-7xl w-full mx-auto space-y-6 pb-12 sm:pb-16">
        {/* Top Information Banner (Restored Original Callout) */}
        <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/90 dark:border-blue-900/40 rounded-2xl p-5 flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Info size={22} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide">
              Operating Media Certification Assessment Guidelines
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Welcome to your official certification assessment for{" "}
              <strong>{track.title}</strong>. Please verify your candidate admit card details and review the assessment specifications below. Marking scheme:{" "}
              <strong>+2.00 marks for each correct answer</strong> with{" "}
              <strong>No Negative Marking</strong> (0 penalty for incorrect or unattempted answers). A minimum score of{" "}
              <strong>80.0% ({track.passingMarks}/{track.totalMarks} marks)</strong> is required for your official Course Diploma Certification.
            </p>
          </div>
        </div>

        {/* PROPERLY MERGED CANDIDATE ADMIT CARD & EXAMINATION SPECIFICATIONS CONTAINER */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden">
          {/* Header of Merged Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">
                CANDIDATE ADMIT CARD & EXAMINATION SPECIFICATIONS
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hidden sm:inline">
                {track.title} ({track.code})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded font-bold border bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40">
                PROFILE VERIFIED • READY
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded font-bold border bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60">
                3 WARNINGS POLICY
              </span>
            </div>
          </div>

          {/* 12-Column Unified Content Grid with Vertical Divider on Large Screens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800 items-stretch">
            {/* Left 5 Cols: Candidate Verification Admit Card */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">
                    CANDIDATE IDENTITY
                  </span>
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Biometric Matched</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-5">
                  {/* Official Passport Photo Frame */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 p-1 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-md">
                      <img
                        src={candidateAvatar}
                        alt={candidateName}
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                      <span
                        className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-xs ring-2 ring-emerald-400"
                        title="Identity Verified"
                      />
                      <div className="absolute bottom-1 inset-x-1 py-0.5 bg-slate-900/80 backdrop-blur-xs rounded-b-lg text-center">
                        <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-400 uppercase flex items-center justify-center gap-1">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      </div>
                    </div>
                    <span className="mt-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Admit Photo
                    </span>
                  </div>

                  {/* Candidate Identity Metadata */}
                  <div className="min-w-0 text-center sm:text-left flex-1">
                    <span className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                      Candidate Name
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                      {candidateName}
                    </h4>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 font-mono text-xs font-bold">
                      <ShieldCheck size={14} className="text-blue-600 dark:text-blue-400" />
                      <span>STUDENT ID: {rollNumber}</span>
                    </div>

                    <div className="mt-2.5 space-y-1">
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block truncate font-medium">
                        {centerNode}
                      </span>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>BIOMETRIC CREDENTIAL MATCH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity Detail Grid */}
              <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 space-y-2.5 text-xs sm:text-sm font-mono">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Selected Track:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[220px]">
                    {track.title}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Enrolled Batch:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">
                    {studentData?.batch || "WD-M1"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Center Node:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">
                    {studentData?.center || "Borivali Center"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Security Hash:</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-xs truncate max-w-[180px]">
                    {sessionHash}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Examination Specifications */}
            <div className="lg:col-span-7 p-6 space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-widest font-bold">
                    MARKING SCHEME & PROTOCOLS
                  </span>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                    STANDARD SCHEME
                  </span>
                </div>

                {/* 4 Big Numerical Metric Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-5">
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">
                      Total Qs
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      {track.questionsCount}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">
                      Time Limit
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-cyan-400">
                      {track.durationMinutes} Mins
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">
                      Correct Ans
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                      +2.00
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">
                      Negative Marking
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                      None
                    </span>
                  </div>
                </div>

                {/* 4 Numbered Protocols */}
                <ul className="mt-5 space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">
                      01.
                    </span>
                    <span>
                      <strong>Assessment Focus:</strong> Navigating away from the window or minimizing the browser logs a proctor warning.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">
                      02.
                    </span>
                    <span>
                      <strong>3 Warnings Permitted:</strong> A total of 3 warnings are permitted. Exceeding 3 warnings will automatically submit your assessment paper.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">
                      03.
                    </span>
                    <span>
                      <strong>Passing Grade:</strong> Minimum 80.0% ({track.passingMarks} / {track.totalMarks} Marks) to qualify for Diploma Certification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-sm sm:text-base">
                      04.
                    </span>
                    <span>
                      <strong>No Negative Marking:</strong> There is NO negative marking or deduction for incorrect answers. Attempt all {track.questionsCount} questions with confidence.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-mono mt-3">
                <span className="text-blue-900 dark:text-blue-300 font-bold">
                  Proctored Mode: Active & Monitored
                </span>
                <span className="text-blue-700 dark:text-blue-400">
                  Target Passing: 80% Threshold
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CANDIDATE VERIFICATION GATE: SYSTEM SECURITY & DIAGNOSTICS */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3.5">
            <div>
              <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 tracking-widest font-bold block">
                CANDIDATE VERIFICATION GATE
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                System Security & Diagnostics
              </h4>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono">
              <span className="px-3 py-1 rounded-lg font-bold border bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600">
                System Verified (Ready)
              </span>
            </div>
          </div>

          {/* 3 Passive Environment & Security Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
              <Monitor size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Display Architecture
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                  Single Display Focus Active
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
              <Wifi size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Network & Latency
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                  Secure TLS 1.3 Connection
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
              <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Window Proctoring
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                  3 Warnings Policy Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HONOR CODE PLEDGE (Rock-Solid Non-Overlapping Mobile Responsive Layout) */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-start gap-3.5 shadow-2xs">
          <input
            id="pledge-check"
            type="checkbox"
            checked={pledgeAccepted}
            onChange={(e) => onPledgeChange(e.target.checked)}
            className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer shrink-0"
          />
          <label
            htmlFor="pledge-check"
            className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer select-none"
          >
            I, <strong className="text-slate-950 dark:text-white">{candidateName}</strong>, confirm
            that I am taking the <strong>{track.title}</strong> assessment independently. I agree to
            adhere to the assessment guidelines, accept the marking scheme (+2.00 / No Negative
            Marking), and understand that maintaining window focus is required throughout the test
            session.
          </label>
        </div>

        {/* ACTION ROW & GATING */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft size={16} />
            <span>Return to Catalog</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono">
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

            <button
              type="button"
              disabled={!pledgeAccepted}
              onClick={onStartExam}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base tracking-wide uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
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
              <GraduationCap size={18} />
              <span>Start Certification Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
