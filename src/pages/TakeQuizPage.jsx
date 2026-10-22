import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { lmsService, CRM_BACKEND_API } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import {
  ArrowLeft,
  Clock,
  Check,
  CheckCircle2,
  AlertCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Award,
  CheckSquare,
  BookOpen,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  X,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { CourseBadge } from "../components/common/CourseBadge";
import { IMPORTED_LMS_QUIZZES } from "../data/importedLmsQuizzes";

const DEFAULT_QUIZ_QUESTIONS = IMPORTED_LMS_QUIZZES[0]?.questions || [];

export const TakeQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const quizzes = useMemo(() => lmsService.getQuizzes(), []);
  const [liveQuiz, setLiveQuiz] = useState(null);

  // Load quiz details & questions from live API
  useEffect(() => {
    if (!id) return;
    const baseApi = CRM_BACKEND_API || "https://crm.dmsoi.org/api";
    fetch(`${baseApi}/lms/quizzes/${id}/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && data.quiz) {
          setLiveQuiz(data.quiz);
        }
      })
      .catch(() => {});
  }, [id]);

  const quiz = useMemo(() => {
    if (liveQuiz) return liveQuiz;
    if (id) {
      return quizzes.find((q) => String(q.id) === String(id) || String(q.numericId) === String(id)) || quizzes[0];
    }
    return quizzes.find((q) => q.studentStatus === "pending") || quizzes[0];
  }, [id, quizzes, liveQuiz]);

  // Questions for this quiz (fallback to DEFAULT_QUIZ_QUESTIONS)
  const questions = useMemo(() => {
    if (quiz?.questions && Array.isArray(quiz.questions) && quiz.questions.length > 0) {
      return quiz.questions;
    }
    return DEFAULT_QUIZ_QUESTIONS;
  }, [quiz]);

  const perQuestionTimerSeconds = quiz?.perQuestionTimerSeconds || 60;
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(perQuestionTimerSeconds);
  const [timeRemaining, setTimeRemaining] = useState(() => (quiz?.durationMinutes || 20) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [showReviewAnswers, setShowReviewAnswers] = useState(false);

  // Overall examination timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const overallTimer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(overallTimer);
          handleSubmitExam(true); // Auto submit on total exam timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(overallTimer);
  }, [isSubmitted]);

  // Per-question 60s countdown timer (resets whenever current question changes)
  useEffect(() => {
    if (isSubmitted) return;

    // Reset question timer to 60s whenever question index changes
    setQuestionSecondsLeft(perQuestionTimerSeconds);

    const questionTimer = setInterval(() => {
      setQuestionSecondsLeft((prev) => {
        if (prev <= 1) {
          // 60 seconds expired for this question
          if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx((curr) => curr + 1);
            showToast(
              `60s time limit reached for Question ${currentQuestionIdx + 1}. Auto-advancing.`,
              "warning",
              "Time's Up",
            );
            return perQuestionTimerSeconds;
          } else {
            // Last question timeout: auto-submit examination
            clearInterval(questionTimer);
            handleSubmitExam(true);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(questionTimer);
  }, [currentQuestionIdx, isSubmitted, questions.length, perQuestionTimerSeconds]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const currentQ = questions[currentQuestionIdx] || questions[0];

  const handleSelectOption = (optionId) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionId,
    }));
  };

  const handleClearSelection = () => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestionIdx];
      return copy;
    });
  };

  const handleToggleFlag = () => {
    if (isSubmitted) return;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIdx]: !prev[currentQuestionIdx],
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  // Final submission evaluation
  const handleSubmitExam = (isAutoTimeout = false) => {
    setShowSubmitConfirm(false);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      const studentChoiceId = selectedAnswers[idx];
      const correctOpt = q.options?.find((opt) => opt.isCorrect);
      if (studentChoiceId && correctOpt && studentChoiceId === correctOpt.id) {
        correctCount += 1;
      }
    });

    const calculatedPercentage = Math.round((correctCount / questions.length) * 100);
    const passThreshold = quiz?.passScorePercentage || 80;
    const isPassed = calculatedPercentage >= passThreshold;

    const finalResult = {
      scorePercentage: calculatedPercentage,
      isPassed,
      correctCount,
      totalCount: questions.length,
      wrongCount: answeredCount - correctCount,
      unansweredCount,
      timeSpentSeconds: (quiz?.durationMinutes || 20) * 60 - timeRemaining,
    };

    setExamResult(finalResult);
    setIsSubmitted(true);

    const timeSpentStr = `${Math.max(1, Math.round(((quiz?.durationMinutes || 20) * 60 - timeRemaining) / 60))} mins`;

    // Save to lmsService
    lmsService.submitQuizAttempt(quiz.numericId || quiz.id, calculatedPercentage, {
      scorePercentage: calculatedPercentage,
      isPassed,
      correctCount,
      totalCount: questions.length,
      wrongCount: questions.length - correctCount,
      unansweredCount,
      selectedAnswers,
      timeSpent: timeSpentStr,
    });

    // Also persist directly to dedicated cache key
    try {
      const attemptsCache = JSON.parse(localStorage.getItem("om_lms_quiz_attempts_cache") || "{}");
      const attemptData = {
        status: isPassed ? "passed" : "failed",
        score: calculatedPercentage,
        completedDate: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
        timeSpent: timeSpentStr,
        isPassed,
      };
      if (quiz.id) attemptsCache[String(quiz.id)] = attemptData;
      if (quiz.numericId) attemptsCache[String(quiz.numericId)] = attemptData;
      localStorage.setItem("om_lms_quiz_attempts_cache", JSON.stringify(attemptsCache));
    } catch (e) {}

    // POST to live CRM backend
    try {
      const studentUser = JSON.parse(localStorage.getItem("om_lms_student_user") || "{}");
      const cachedProfile = JSON.parse(localStorage.getItem("om_lms_crm_cached_profile") || "{}");
      const studentId = studentUser.id || studentUser.student_id || cachedProfile.id || cachedProfile.crmAdmissionId || "";
      const studentName = studentUser.name || studentUser.full_name || cachedProfile.name || "Student";
      const baseApi = CRM_BACKEND_API || "https://crm.dmsoi.org/api";
      const targetId = quiz.numericId || quiz.id;

      fetch(`${baseApi}/lms/student/quizzes/${targetId}/submit/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          student_name: studentName,
          answers: selectedAnswers,
          score: calculatedPercentage,
          percentage: calculatedPercentage,
          time_spent_seconds: (quiz?.durationMinutes || 20) * 60 - timeRemaining,
        }),
      }).catch((err) => console.warn("Backend quiz attempt submission error:", err));
    } catch (e) {
      console.warn("Quiz submission network trigger error:", e);
    }

    if (isAutoTimeout) {
      showToast("Time expired! Your examination was automatically submitted.", "warning", "Time's Up");
    } else if (isPassed) {
      showToast(`Congratulations! You passed with ${calculatedPercentage}%!`, "success", "Exam Passed");
    } else {
      showToast(`Examination completed. You scored ${calculatedPercentage}%.`, "info", "Exam Completed");
    }
  };

  // -------------------------------------------------------------
  // RESULTS SUMMARY SCREEN
  // -------------------------------------------------------------
  if (isSubmitted && examResult) {
    return (
      <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <Link
            to="/my-quizzes"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-[#0b1329] px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs"
          >
            <ArrowLeft size={15} />
            <span>Back to My Quizzes</span>
          </Link>
          <CourseBadge courseId={quiz.courseId} courseTitle={quiz.courseTitle} size="md" />
        </div>

        {/* Hero Score Card */}
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 text-center shadow-xs space-y-6">
          <div className="relative inline-flex items-center justify-center mx-auto">
            <div
              className={`w-24 h-24 rounded-3xl flex items-center justify-center font-black text-4xl shadow-xl border-4 ${
                examResult.isPassed
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/80"
                  : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/80"
              }`}
            >
              {examResult.scorePercentage}%
            </div>
            <div
              className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                examResult.isPassed ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
              }`}
            >
              {examResult.isPassed ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            </div>
          </div>

          <div className="space-y-1.5 max-w-2xl mx-auto">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                examResult.isPassed
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                  : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
              }`}
            >
              {examResult.isPassed ? "Passed • Certification Verified" : "Benchmark Not Met • Retake Allowed"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {quiz.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Required Passing Benchmark: {quiz.passScorePercentage}% • Completed in{" "}
              {Math.max(1, Math.round(examResult.timeSpentSeconds / 60))} minutes
            </p>
          </div>

          {/* Key Stat Strips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Correct</span>
              <strong className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {examResult.correctCount} / {examResult.totalCount}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Incorrect</span>
              <strong className="text-lg font-black text-rose-600 dark:text-rose-400">
                {examResult.wrongCount}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Skipped</span>
              <strong className="text-lg font-black text-slate-600 dark:text-slate-300">
                {examResult.unansweredCount}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Benchmark</span>
              <strong className="text-lg font-black text-blue-600 dark:text-blue-400">
                {quiz.passScorePercentage}%
              </strong>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowReviewAnswers(!showReviewAnswers)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              {showReviewAnswers ? "Hide Answer Explanations" : "Review All Answers & Explanations"}
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setFlaggedQuestions({});
                setQuestionSecondsLeft(perQuestionTimerSeconds);
                setTimeRemaining((quiz?.durationMinutes || 20) * 60);
                setCurrentQuestionIdx(0);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Retake Examination</span>
            </button>
            <Link
              to="/my-quizzes"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              Return to My Quizzes
            </Link>
          </div>
        </div>

        {/* Detailed Question Review List */}
        {showReviewAnswers && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Complete Question Breakdown
            </h3>
            {questions.map((q, qIdx) => {
              const studentChoiceId = selectedAnswers[qIdx];
              const correctOpt = q.options?.find((opt) => opt.isCorrect);
              const isCorrect = studentChoiceId && correctOpt && studentChoiceId === correctOpt.id;

              return (
                <div
                  key={q.id || qIdx}
                  className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      Question {qIdx + 1} of {questions.length}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300"
                      }`}
                    >
                      {isCorrect ? "Correct (+1)" : "Incorrect"}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {q.title}
                  </h4>

                  <div className="space-y-1.5 pt-1">
                    {q.options?.map((opt, optIdx) => {
                      const isChosen = studentChoiceId === opt.id;
                      const isOptionCorrect = opt.isCorrect;
                      const letter = String.fromCharCode(65 + optIdx);

                      let optClass = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60";
                      if (isOptionCorrect) {
                        optClass = "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isChosen && !isOptionCorrect) {
                        optClass = "border-rose-500 bg-rose-50/70 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold";
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="w-5 h-5 rounded-md bg-white dark:bg-slate-800 border flex items-center justify-center font-bold text-[11px] uppercase shrink-0">
                              {letter}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isOptionCorrect && (
                            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">
                              Correct Answer
                            </span>
                          )}
                          {isChosen && !isOptionCorrect && (
                            <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase">
                              Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300">
                      <strong className="block text-[11px] font-bold uppercase tracking-wider mb-0.5">
                        Explanation:
                      </strong>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE EXAMINATION RUNNER
  // -------------------------------------------------------------
  const isTotalTimeCritical = timeRemaining < 300; // < 5 mins

  return (
    <div className="w-full space-y-5 pb-16 select-none animate-in fade-in duration-200">
      {/* Top Bar: Breadcrumb + Course + Timers + Submit CTA */}
      <div className="w-full bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Exit Quiz"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <CourseBadge courseId={quiz.courseId} courseTitle={quiz.courseTitle} size="sm" />
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-bold">
                Pass Mark: {quiz.passScorePercentage}%
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight mt-0.5">
              {quiz.title}
            </h1>
          </div>
        </div>

        {/* Live Question Timer (60s per QS) & Total Exam Timer & Finish Button */}
        <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
          {/* Prominent 60s Per-Question Countdown Pill */}
          <div
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border font-mono font-bold text-xs sm:text-sm shadow-2xs transition-all ${
              questionSecondsLeft <= 10
                ? "bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800 animate-pulse ring-2 ring-rose-500/20"
                : questionSecondsLeft <= 20
                ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                : "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
            }`}
            title="Active 60s per-question timer. Question auto-advances at 0s."
          >
            <Clock size={16} className={questionSecondsLeft <= 10 ? "text-rose-600 animate-spin" : ""} />
            <span>{String(questionSecondsLeft).padStart(2, "0")}s</span>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-500 hidden sm:inline">
              / QS
            </span>
          </div>

          {/* Overall Quiz Timer */}
          <div
            className={`hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl border font-mono text-xs shadow-2xs ${
              isTotalTimeCritical
                ? "bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800"
                : "bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800"
            }`}
            title="Total examination duration timer"
          >
            <span className="text-slate-400">Total:</span>
            <span className="font-bold">{formatTimer(timeRemaining)}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md cursor-pointer transition-all active:scale-95"
          >
            Finish & Submit
          </button>
        </div>
      </div>

      {/* Main Grid: Question Card & Question Palette Sidebar */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Current Question */}
        <div className="w-full lg:col-span-8 min-w-0 bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 md:p-8 shadow-xs flex flex-col justify-between min-h-[580px]">
          <div className="space-y-5 w-full">
            {/* Question Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 w-full">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-black text-xs">
                  Question {currentQuestionIdx + 1} of {questions.length}
                </span>
                <span className="text-xs font-semibold text-slate-400">1.0 Mark</span>
              </div>

              <button
                onClick={handleToggleFlag}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  flaggedQuestions[currentQuestionIdx]
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-300"
                    : "text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                }`}
              >
                <Flag size={13} className={flaggedQuestions[currentQuestionIdx] ? "fill-purple-600" : ""} />
                <span>{flaggedQuestions[currentQuestionIdx] ? "Flagged for Review" : "Flag Question"}</span>
              </button>
            </div>

            {/* Dedicated 60-Second Question Progress Bar */}
            <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 w-full">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center space-x-1.5 text-slate-700 dark:text-slate-200">
                  <Clock
                    size={14}
                    className={
                      questionSecondsLeft <= 10
                        ? "text-rose-600 animate-pulse"
                        : questionSecondsLeft <= 20
                        ? "text-amber-500"
                        : "text-emerald-600"
                    }
                  />
                  <span>
                    Question Timer:{" "}
                    <strong
                      className={
                        questionSecondsLeft <= 10
                          ? "text-rose-600 dark:text-rose-400 font-black animate-pulse"
                          : questionSecondsLeft <= 20
                          ? "text-amber-600 dark:text-amber-400 font-bold"
                          : "text-emerald-600 dark:text-emerald-400 font-bold"
                      }
                    >
                      {questionSecondsLeft}s remaining
                    </strong>{" "}
                    (60s limit)
                  </span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Auto-advances at 0s
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                    questionSecondsLeft <= 10
                      ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                      : questionSecondsLeft <= 20
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${Math.max(0, Math.min(100, (questionSecondsLeft / perQuestionTimerSeconds) * 100))}%`,
                  }}
                />
              </div>
              {questionSecondsLeft <= 10 && (
                <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1 animate-pulse pt-0.5">
                  <AlertCircle size={12} />
                  <span>Urgent: Less than 10 seconds remaining! Select your answer now.</span>
                </div>
              )}
            </div>

            {/* Question Title with min-height */}
            <div className="pt-1 min-h-[56px] flex items-center w-full">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed break-words w-full">
                {currentQ.title}
              </h3>
            </div>

            {/* Options (Clean Single Badge Cards - No 2 Holes) */}
            <div className="space-y-3 pt-2 w-full">
              {currentQ.options?.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === opt.id;
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full min-h-[58px] p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-xs ring-2 ring-blue-500/20"
                        : "border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-850"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 pr-2 flex-1 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs uppercase shrink-0 transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:border-blue-400 group-hover:text-blue-600"
                        }`}
                      >
                        {letter}
                      </span>
                      <span
                        className={`text-xs sm:text-sm leading-relaxed break-words ${
                          isSelected ? "text-blue-950 dark:text-blue-100 font-bold" : "text-slate-800 dark:text-slate-200 font-medium"
                        }`}
                      >
                        {opt.text}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 ml-3 text-white shadow-xs">
                        <Check size={13} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions: Clear, Previous, Next (Anchored firmly at bottom) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 w-full">
            <button
              onClick={handleClearSelection}
              disabled={!selectedAnswers[currentQuestionIdx]}
              className="text-xs font-semibold text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Clear Choice
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1 cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>Previous</span>
              </button>

              {currentQuestionIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
                >
                  <span>Next Question</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 size={14} />
                  <span>Review & Submit</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <div className="w-full lg:col-span-4 min-w-0 bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-5 lg:sticky lg:top-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 w-full">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Question Palette
            </h4>
            <span className="text-xs text-slate-500 font-bold">
              {answeredCount} / {questions.length} Answered
            </span>
          </div>

          {/* Number Grid */}
          <div className="grid grid-cols-5 gap-2 w-full">
            {questions.map((_, idx) => {
              const isCurrent = currentQuestionIdx === idx;
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isFlagged = flaggedQuestions[idx];

              let tileClass = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";
              if (isCurrent) {
                tileClass = "bg-blue-600 text-white ring-2 ring-blue-500/40 shadow-xs";
              } else if (isAnswered) {
                tileClass = "bg-emerald-500 text-white shadow-2xs";
              } else if (isFlagged) {
                tileClass = "bg-purple-500 text-white";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`w-full h-9 rounded-xl font-bold text-xs transition-all relative flex items-center justify-center cursor-pointer ${tileClass}`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && !isCurrent && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Palette Legend */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 w-full">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-500" />
                <span>Answered</span>
              </span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">{answeredCount}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-purple-500" />
                <span>Flagged for Review</span>
              </span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">
                {Object.values(flaggedQuestions).filter(Boolean).length}
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700" />
                <span>Unattempted</span>
              </span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">{unansweredCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Quiz Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200/80 dark:border-rose-800/60 shrink-0">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                    Exit Quiz Assessment?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Are you sure you want to exit the quiz? Unsaved answers will be lost.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Quiz:</span>
                <strong className="text-slate-900 dark:text-white font-bold max-w-[200px] truncate text-right">
                  {quiz.title}
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Questions Answered:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {answeredCount} of {questions.length}
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Time Remaining:</span>
                <strong className="text-slate-900 dark:text-white font-bold font-mono">
                  {formatTimer(timeRemaining)}
                </strong>
              </div>
              <div className="pt-2 border-t border-rose-200/70 dark:border-rose-900/50 flex items-start space-x-2 text-[11.5px] text-rose-900 dark:text-rose-300 leading-relaxed font-medium">
                <AlertCircle size={14} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>
                  Exiting now will cancel this attempt. Any answers you have chosen will not be submitted or saved.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Keep Taking Quiz
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  navigate("/my-quizzes");
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <LogOut size={14} />
                <span>Exit Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  Ready to Submit Quiz?
                </h3>
                <p className="text-xs text-slate-500">Review your completion status</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Questions:</span>
                <strong className="text-slate-900 dark:text-white">{questions.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Answered:</span>
                <strong className="text-emerald-600 font-bold">{answeredCount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unanswered:</span>
                <strong className="text-rose-600 font-bold">{unansweredCount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Remaining:</span>
                <strong className="text-slate-900 dark:text-white">{formatTimer(timeRemaining)}</strong>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Note: You still have {unansweredCount} unanswered questions.
              </p>
            )}

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Keep Testing
              </button>
              <button
                onClick={() => handleSubmitExam(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer active:scale-95"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeQuizPage;
