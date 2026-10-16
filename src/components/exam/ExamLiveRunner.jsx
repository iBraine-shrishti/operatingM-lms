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
  FileText,
  AlertTriangle,
} from "lucide-react";

/**
 * ExamLiveRunner: The proctored live exam execution runner.
 * Features fixed-dimension questions viewport, zero sizing changes on question switches,
 * timer countdown, question palette, review flagging, and safety submission flow.
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
      {/* 1. TOP LIVE EXAM NAVIGATION BAR */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200/90 dark:border-slate-800/90 px-4 py-2.5 sm:px-6 flex items-center justify-between shrink-0 shadow-xs dark:shadow-none">
        {/* Left Status & Mobile Palette Opener */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Assessment in Progress
            </span>
          </div>

          {/* Verified Candidate Profile Chip */}
          <div className="hidden md:flex items-center gap-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-xl">
            <div className="w-8 h-9 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-800 p-0.5">
              <img
                src={candidateAvatar}
                alt={candidateName}
                className="w-full h-full object-cover object-center rounded"
              />
            </div>
            <div className="text-xs font-mono leading-tight">
              <span className="font-bold text-slate-900 dark:text-white block truncate max-w-[120px]">
                {candidateName}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block">
                ID: {rollNumber}
              </span>
            </div>
          </div>

          {/* Mobile Palette Opener Button */}
          <button
            type="button"
            onClick={() => setShowMobilePalette(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
          >
            <Grid size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Questions ({answeredCount}/{totalQuestions})</span>
          </button>
        </div>

        {/* Countdown Timer, Warnings, Exit Hall & Submit Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border font-mono font-bold text-xs sm:text-base tracking-wider ${
              timeRemaining < 300
                ? "bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 animate-pulse"
                : timeRemaining < 900
                  ? "bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-400"
                  : "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            }`}
          >
            <Clock size={16} />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Warnings Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                securityStrikes === 0
                  ? "bg-emerald-500"
                  : securityStrikes < maxWarnings
                    ? "bg-amber-500"
                    : "bg-rose-500"
              }`}
            />
            <span className="text-slate-700 dark:text-slate-300 font-bold">
              Warnings: {securityStrikes}/{maxWarnings}
            </span>
          </div>

          {/* Single Highlighted Exit Hall Button */}
          <button
            type="button"
            onClick={onExitHall}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xs flex items-center gap-1.5 border border-rose-600 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ring-2 ring-rose-300/40 dark:ring-rose-900/40"
            title="Exit Examination Hall"
          >
            <LogOut size={14} />
            <span>Exit Hall</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xs transition-all cursor-pointer"
          >
            Submit Paper
          </button>
        </div>
      </div>

      {/* 2. MAIN RUNNER BODY (Fixed containers to prevent jitter) */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left: Question Box & Option Selection */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#070b14] p-3 sm:p-5 lg:p-6">
          <div className="flex-1 min-h-0 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-xs overflow-hidden">
            {/* Header: Domain, Question Number, Review Flag */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                  {currentQ?.sectionName || track.shortTitle}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  +2.00 Marks • No Negative Marking
                </span>
                <button
                  type="button"
                  onClick={() => onToggleReview(currentQ.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isCurrentMarked
                      ? "bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750"
                  }`}
                >
                  <HelpCircle size={13} />
                  <span>{isCurrentMarked ? "Marked for Review" : "Mark Review"}</span>
                </button>
              </div>
            </div>

            {/* Middle: Scrollable Question Text & Options */}
            <div className="flex-1 overflow-y-auto py-4 sm:py-5 space-y-5 pr-1">
              <div className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.text}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const isSelected = currentSelectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectOption(currentQ.id, opt.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? "bg-blue-50/80 dark:bg-blue-950/50 border-blue-500 dark:border-blue-400 text-slate-950 dark:text-white shadow-xs ring-1 ring-blue-400/40"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-xl font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => onGoToQuestion(currentQuestionIndex - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentSelectedOption && (
                  <button
                    type="button"
                    onClick={() => onClearAnswer(currentQ.id)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Clear Response
                  </button>
                )}

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => onGoToQuestion(currentQuestionIndex + 1)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    Finish Examination
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Question Palette (Desktop view) */}
        <div className="hidden lg:flex w-80 shrink-0 border-l border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-950 p-5 flex-col justify-between overflow-hidden">
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="pb-3.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold block">
                QUESTION PALETTE
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                {track.shortTitle}
              </h4>
            </div>

            {/* Status Breakdown Pills */}
            <div className="grid grid-cols-3 gap-2 py-3.5 text-center text-xs font-mono border-b border-slate-100 dark:border-slate-800">
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
              <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-black text-slate-700 dark:text-slate-300 block text-base">
                  {unattemptedCount}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                  Left
                </span>
              </div>
            </div>

            {/* Question Buttons Matrix */}
            <div className="flex-1 overflow-y-auto py-3.5 pr-1">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = Boolean(selectedAnswers[q.id]);
                  const isMarked = Boolean(markedForReview[q.id]);

                  let btnStyle =
                    "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800";
                  if (isMarked) {
                    btnStyle =
                      "bg-purple-600 text-white border-purple-600 shadow-xs";
                  } else if (isAnswered) {
                    btnStyle =
                      "bg-emerald-600 text-white border-emerald-600 shadow-xs";
                  }

                  if (isCurrent) {
                    btnStyle += " ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950 font-black";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onGoToQuestion(idx)}
                      className={`h-9 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${btnStyle}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Submit Shortcut */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Submit Paper ({answeredCount}/{totalQuestions})
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
                  if (isMarked) {
                    btnStyle = "bg-purple-600 text-white border-purple-600";
                  } else if (isAnswered) {
                    btnStyle = "bg-emerald-600 text-white border-emerald-600";
                  }

                  if (isCurrent) {
                    btnStyle += " ring-2 ring-blue-500 font-bold";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onGoToQuestion(idx);
                        setShowMobilePalette(false);
                      }}
                      className={`h-9 rounded-xl text-xs font-mono font-bold transition-all border ${btnStyle}`}
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
