import React, { useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  LogOut,
  Grid,
  X,
  Check,
  GraduationCap,
} from "lucide-react";

/**
 * ExamLiveRunner: The proctored live exam execution runner.
 * 1. Single unified institutional top header (eliminates double-stacked headers).
 * 2. Prominent, comfortable font sizes for questions (text-xl/text-2xl) and options (text-base/text-lg).
 * 3. Square aspect-ratio question numbers grid with ZERO ring bleed or overlapping.
 * 4. Pinned bottom actions and responsive mobile palette drawer.
 */
export const ExamLiveRunner = ({
  track,
  questions,
  currentQuestionIndex,
  onGoToQuestion,
  selectedAnswers,
  onSelectOption,
  markedForReview,
  onToggleReview,
  onClearAnswer,
  timeRemaining,
  formatTime,
  securityStrikes,
  maxWarnings = 3,
  candidateName,
  rollNumber,
  candidateAvatar,
  onExitHall,
  onSubmitPaper,
}) => {
  const [showMobilePalette, setShowMobilePalette] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestionIndex] || questions[0];

  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const unattemptedCount = totalQuestions - answeredCount;

  const isCurrentMarked = Boolean(markedForReview[currentQ?.id]);
  const currentSelectedOption = selectedAnswers[currentQ?.id];

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
      {/* 1. TOP LIVE EXAM INSTITUTIONAL NAVIGATION BAR (Unified Header with Zero Overflow) */}
      <header className="bg-white/95 dark:bg-slate-950/90 border-b border-slate-200/90 dark:border-slate-800/90 px-3 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between shrink-0 z-40 backdrop-blur-md shadow-xs dark:shadow-none w-full max-w-full overflow-hidden gap-2">
        {/* Left: Brand Icon, Assessment Title & Track Code */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <GraduationCap size={18} className="sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold whitespace-nowrap">
                OMC ASSESSMENT
              </span>
              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 rounded font-semibold whitespace-nowrap shrink-0">
                LIVE
              </span>
            </div>
            <h2 className="text-xs sm:text-sm lg:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1 truncate">
              <span className="truncate">{track.title}</span>
              <span className="text-slate-400 dark:text-slate-500 hidden xl:inline text-xs font-normal shrink-0">
                • {track.code}
              </span>
            </h2>
          </div>
        </div>

        {/* Center: Candidate Identity Chip (Shown on 2xl screens to avoid crowding 1366px-1559px laptops) */}
        <div className="hidden 2xl:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-xl shrink-0">
          <div className="w-7 h-8 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-800 p-0.5">
            <img
              src={candidateAvatar}
              alt={candidateName}
              className="w-full h-full object-cover object-center rounded"
            />
          </div>
          <div className="text-xs font-mono leading-tight">
            <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[130px]">
              {candidateName}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">
              ID: {rollNumber}
            </span>
          </div>
        </div>

        {/* Right: Controls & Actions (Carefully sized to NEVER overflow across any viewport) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile Palette Opener Button */}
          <button
            type="button"
            onClick={() => setShowMobilePalette(true)}
            className="lg:hidden flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] sm:text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors shrink-0 whitespace-nowrap"
            title="Open Question Palette"
          >
            <Grid size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="hidden xs:inline">Qs </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {answeredCount}/{totalQuestions}
            </span>
          </button>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border font-mono font-bold text-xs sm:text-sm tracking-wider shrink-0 whitespace-nowrap ${
              timeRemaining < 300
                ? "bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 animate-pulse"
                : timeRemaining < 900
                  ? "bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-400"
                  : "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            }`}
          >
            <Clock size={13} className="shrink-0" />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Warnings Indicator (Responsive: hidden on mobile if 0 strikes to save space) */}
          <div
            className={`${
              securityStrikes === 0 ? "hidden md:flex" : "flex"
            } items-center gap-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono shrink-0 whitespace-nowrap`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                securityStrikes === 0
                  ? "bg-emerald-500"
                  : securityStrikes < maxWarnings
                    ? "bg-amber-500"
                    : "bg-rose-500"
              }`}
            />
            <span className="text-slate-700 dark:text-slate-300 font-bold">
              <span className="hidden sm:inline">Warnings: </span>
              {securityStrikes}/{maxWarnings}
            </span>
          </div>

          {/* Exit Hall Button */}
          <button
            type="button"
            onClick={onExitHall}
            className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] sm:text-xs tracking-wide shadow-xs flex items-center gap-1 border border-rose-600 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 whitespace-nowrap"
            title="Exit Examination Hall"
          >
            <LogOut size={13} className="shrink-0" />
            <span className="hidden sm:inline">Exit Hall</span>
            <span className="sm:hidden">Exit</span>
          </button>

          {/* Submit Paper Button (Desktop & Tablet only; mobile submits via Finish in bottom bar or Palette) */}
          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="hidden sm:flex px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-xs hover:shadow transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer items-center gap-1 shrink-0 whitespace-nowrap"
            title="Submit Assessment Paper"
          >
            <CheckCircle2 size={13} className="shrink-0" />
            <span>Submit Paper</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN RUNNER BODY (Fixed dimensions to prevent viewport jitter) */}
      <div className="flex-1 min-h-0 p-2 sm:p-4 lg:p-5 flex gap-3 sm:gap-4 overflow-hidden">
        {/* Left: Question Box & Option Selection */}
        <div className="flex-1 min-w-0 h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-xs overflow-hidden">
          {/* Question Header */}
          <div className="shrink-0 px-3.5 py-2.5 sm:px-6 sm:py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs sm:text-sm border border-blue-200 dark:border-blue-800 whitespace-nowrap">
                <span className="hidden sm:inline">Question </span>
                <span className="sm:hidden">Q</span>
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[220px]">
                {currentQ?.sectionName || track.shortTitle}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden xs:inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                {currentQ?.difficulty || "Advanced"}
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[11px] sm:text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">
                <span className="hidden sm:inline">+2.00 Marks • No Negative Marking</span>
                <span className="sm:hidden">+2.00 / 0</span>
              </span>
            </div>
          </div>

          {/* Scrollable Question Content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7 space-y-6 custom-scrollbar">
            {/* Question Text with Prominent, Crisp Font Size */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 dark:text-white leading-relaxed tracking-tight">
              {currentQ.text}
            </h3>

            {/* Multiple Choice Options in Clean, High-Contrast Cards */}
            <div className="space-y-3.5 pt-2 max-w-4xl">
              {currentQ.options.map((opt) => {
                const isSelected = currentSelectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => onSelectOption(currentQ.id, opt.id)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                      isSelected
                        ? "bg-blue-50/90 dark:bg-blue-950/50 border-blue-600 text-slate-950 dark:text-white shadow-xs ring-2 ring-blue-500/20"
                        : "bg-slate-50/60 hover:bg-slate-100/80 dark:bg-slate-900/60 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-slate-800 dark:text-slate-200 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {/* Option Letter Badge */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center font-mono font-black text-sm sm:text-base shrink-0 transition-colors ${
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                            : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:border-blue-400 group-hover:text-blue-600"
                        }`}
                      >
                        {opt.id}
                      </div>

                      {/* Option Text with Crisp, Legible Font Size */}
                      <span
                        className={`text-base sm:text-lg leading-relaxed pt-0.5 ${
                          isSelected
                            ? "font-bold text-blue-950 dark:text-white"
                            : "font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white"
                        }`}
                      >
                        {opt.text}
                      </span>
                    </div>

                    {/* Radio Checkmark Circle */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 dark:border-slate-700 bg-transparent group-hover:border-slate-400"
                      }`}
                    >
                      {isSelected && <Check size={14} className="stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fixed Bottom Action Controls (Responsive with zero overflow) */}
          <div className="shrink-0 px-3 py-2 sm:px-6 sm:py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-3 bg-slate-50/70 dark:bg-slate-950/40">
            {/* Left Controls: Review & Clear */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => onToggleReview(currentQ.id)}
                className={`px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isCurrentMarked
                    ? "bg-purple-100 dark:bg-purple-950/60 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-300 shadow-xs"
                    : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
                title={isCurrentMarked ? "Marked for Review" : "Mark question for review"}
              >
                <HelpCircle size={15} className="shrink-0 text-purple-600 dark:text-purple-400" />
                <span className="hidden sm:inline">{isCurrentMarked ? "Marked for Review" : "Mark for Review"}</span>
                <span className="sm:hidden">{isCurrentMarked ? "Marked" : "Review"}</span>
              </button>

              {currentSelectedOption && (
                <button
                  type="button"
                  onClick={() => onClearAnswer(currentQ.id)}
                  className="px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-300 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800 cursor-pointer transition-colors whitespace-nowrap"
                  title="Clear Answer Selection"
                >
                  <span className="hidden sm:inline">Clear Selection</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              )}
            </div>

            {/* Right Controls: Previous, Save & Next / Finish */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => onGoToQuestion(currentQuestionIndex - 1)}
                className={`px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  currentQuestionIndex === 0
                    ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                }`}
                title="Previous Question"
              >
                <ChevronLeft size={16} className="shrink-0" />
                <span className="hidden xs:inline">Prev</span>
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => onGoToQuestion(currentQuestionIndex + 1)}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1 cursor-pointer bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-xs hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Save & Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight size={16} className="shrink-0" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white shadow-md hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap"
                >
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span className="hidden sm:inline">Finish Examination</span>
                  <span className="sm:hidden">Finish</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Question Palette (Desktop view) */}
        <div className="hidden lg:flex w-80 xl:w-88 shrink-0 h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          {/* Palette Header with Title and Legend */}
          <div className="shrink-0 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold block">
                  QUESTION PALETTE
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate max-w-[200px]">
                  {track.shortTitle}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                {totalQuestions} Qs
              </span>
            </div>

            {/* Status Breakdown Pills */}
            <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs font-mono">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="font-black text-emerald-700 dark:text-emerald-400 block text-base">
                  {answeredCount}
                </span>
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase">
                  Answered
                </span>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/40 p-2 rounded-xl border border-purple-200 dark:border-purple-800">
                <span className="font-black text-purple-700 dark:text-purple-400 block text-base">
                  {reviewCount}
                </span>
                <span className="text-[10px] text-purple-800 dark:text-purple-300 font-semibold uppercase">
                  Review
                </span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-black text-slate-700 dark:text-slate-300 block text-base">
                  {unattemptedCount}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Left
                </span>
              </div>
            </div>
          </div>

          {/* Question Buttons Matrix (Clean Square Aspect Ratio, ZERO OVERLAPPING) */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3.5 custom-scrollbar">
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = Boolean(selectedAnswers[q.id]);
                const isMarked = Boolean(markedForReview[q.id]);

                let btnStyle =
                  "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";

                if (isCurrent) {
                  btnStyle =
                    "bg-blue-600 border-2 border-blue-600 text-white font-black shadow-md shadow-blue-500/20 scale-105 z-10";
                } else if (isAnswered && isMarked) {
                  btnStyle =
                    "bg-indigo-600 border-2 border-indigo-600 text-white font-bold shadow-xs";
                } else if (isMarked) {
                  btnStyle =
                    "bg-purple-600 border-2 border-purple-600 text-white font-bold shadow-xs";
                } else if (isAnswered) {
                  btnStyle =
                    "bg-emerald-600 border-2 border-emerald-600 text-white font-bold shadow-xs";
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => onGoToQuestion(idx)}
                    className={`aspect-square w-full rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center cursor-pointer relative ${btnStyle}`}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Assessment Progress & Submit Action */}
          <div className="shrink-0 p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 space-y-2.5">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Completion</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {answeredCount}/{totalQuestions} ({Math.round((answeredCount / totalQuestions) * 100)}%)
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={15} />
              <span>Submit Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE PALETTE DRAWER */}
      {showMobilePalette && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-white dark:bg-slate-950 h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono uppercase font-bold text-slate-400">
                  QUESTIONS PALETTE
                </span>
                <button
                  type="button"
                  onClick={() => setShowMobilePalette(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 text-center text-xs font-mono">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block">
                    {answeredCount}
                  </span>
                  <span className="text-[9px] uppercase">Done</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/40 p-1.5 rounded-lg border border-purple-200 dark:border-purple-800">
                  <span className="font-bold text-purple-700 dark:text-purple-400 block">
                    {reviewCount}
                  </span>
                  <span className="text-[9px] uppercase">Review</span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">
                    {unattemptedCount}
                  </span>
                  <span className="text-[9px] uppercase">Left</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 max-h-[60vh] overflow-y-auto py-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = Boolean(selectedAnswers[q.id]);
                  const isMarked = Boolean(markedForReview[q.id]);

                  let btnStyle =
                    "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800";
                  if (isCurrent) {
                    btnStyle = "bg-blue-600 border-2 border-blue-600 text-white font-bold";
                  } else if (isAnswered) {
                    btnStyle = "bg-emerald-600 text-white border-emerald-600";
                  } else if (isMarked) {
                    btnStyle = "bg-purple-600 text-white border-purple-600";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onGoToQuestion(idx);
                        setShowMobilePalette(false);
                      }}
                      className={`aspect-square rounded-xl text-xs font-mono font-bold transition-all border ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowMobilePalette(false);
                setShowSubmitModal(true);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              Submit Paper
            </button>
          </div>
        </div>
      )}

      {/* 4. SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3.5 border border-emerald-300 dark:border-emerald-700">
              <CheckCircle2 size={24} />
            </div>

            <h3 className="text-xl font-bold text-slate-950 dark:text-white">
              Submit Examination Paper?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              You are evaluating <strong>{track.title}</strong>. Review your summary below before final score generation:
            </p>

            <div className="grid grid-cols-3 gap-2.5 my-5 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-lg font-black text-emerald-700 dark:text-emerald-400 block">
                  {answeredCount}
                </span>
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase">
                  Answered
                </span>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <span className="text-lg font-black text-purple-700 dark:text-purple-400 block">
                  {reviewCount}
                </span>
                <span className="text-[10px] text-purple-800 dark:text-purple-300 font-semibold uppercase">
                  Review
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-lg font-black text-slate-700 dark:text-slate-300 block">
                  {unattemptedCount}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Unattempted
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Back to Questions
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmitPaper(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
