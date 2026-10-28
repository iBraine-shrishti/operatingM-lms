import { ModalPortal } from "../../common/ModalPortal";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  FileText,
  BrainCircuit,
  Clock,
  ArrowRight,
  X,
  Calendar,
  Award,
  TrendingUp,
  Check,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

/**
 * FirstLoginGlanceModal (Daily Student Overview Modal)
 * Dynamic executive overview presented once per day on student's first login
 * Displays:
 * 1. Pending Assignments (live dynamic batch assignments, real due dates)
 * 2. Pending Quizzes & Assessments (live dynamic quizzes for enrolled courses)
 * 3. Fees Notice (Conditional: prominent alert if dues pending, clean verified badge if cleared)
 * 4. Executive KPI bar & student identity info
 * 5. Daily briefing indicator
 */
export const FirstLoginGlanceModal = ({
  isOpen = false,
  onClose,
  currentUser = {},
  crmProfile = {},
  paymentInfo = {},
  pendingAssignments = [],
  quizzes = [],
  onOpenPaymentModal,
  onDismissForever,
}) => {
  const navigate = useNavigate();

  // Dynamic student identity from CRM / Auth Context
  const studentName =
    currentUser?.name ||
    crmProfile?.studentName ||
    crmProfile?.name ||
    currentUser?.fullName ||
    "Student";
  const studentCourse =
    crmProfile?.course ||
    currentUser?.course ||
    "Digital Marketing";
  const admissionId =
    crmProfile?.admissionNo ||
    currentUser?.admissionNo ||
    currentUser?.crmAdmissionId ||
    currentUser?.id ||
    "OMC-0000";
  const centerBranch =
    crmProfile?.branch ||
    currentUser?.branch ||
    "Center";
  const progressPercent =
    currentUser?.overallProgress ?? crmProfile?.progress ?? 0;

  // Dynamic assignments resolution (100% live - no fake static fallbacks)
  const assignmentsList = useMemo(() => {
    if (Array.isArray(pendingAssignments)) {
      return pendingAssignments;
    }
    return [];
  }, [pendingAssignments]);

  const overdueAssignments = useMemo(
    () =>
      assignmentsList.filter(
        (a) =>
          a.isOverdue ||
          a.status === "overdue" ||
          (a.daysLeft !== undefined && a.daysLeft < 0)
      ),
    [assignmentsList]
  );

  // Dynamic pending quizzes resolution (100% live - no fake static fallbacks)
  const pendingQuizzesList = useMemo(() => {
    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      return [];
    }

    return quizzes.filter((q) => {
      const isPassed = q.studentStatus === "passed" || q.isCompleted;
      const isPending =
        !q.studentStatus ||
        q.studentStatus === "pending" ||
        q.studentStatus === "active" ||
        q.studentStatus === "not_started" ||
        q.studentStatus === "failed";
      const isActive = q.status === "active" || !q.status;
      return isActive && !isPassed;
    });
  }, [quizzes]);

  // Fees status resolution
  const isFeesCleared =
    paymentInfo?.isCleared ||
    (crmProfile?.balanceDue !== undefined && crmProfile.balanceDue <= 0) ||
    crmProfile?.paymentStatus === "Fully Cleared";

  const installmentAmount =
    paymentInfo?.installmentAmount && paymentInfo.installmentAmount !== "₹0"
      ? paymentInfo.installmentAmount
      : crmProfile?.balanceDue
      ? `₹${Number(crmProfile.balanceDue).toLocaleString("en-IN")}`
      : "₹0";

  const dueDateText =
    paymentInfo?.dueDateText ||
    crmProfile?.nextDueDate ||
    "Upcoming Due Date";

  const termText =
    paymentInfo?.termText ||
    (crmProfile?.balanceDue
      ? `Tuition Fee Installment • Balance: ₹${Number(crmProfile.balanceDue).toLocaleString("en-IN")}`
      : "Tuition Fee Installment");

  const daysRemainingText =
    paymentInfo?.daysRemainingText ||
    (crmProfile?.nextDueDate ? `Due by ${crmProfile.nextDueDate}` : "Payment Due");

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  if (!isOpen) return null;

  const handleClose = () => {
    if (onDismissForever) {
      onDismissForever();
    } else if (onClose) {
      onClose();
    }
  };

  const handleGoToAssignments = () => {
    handleClose();
    navigate("/my-assignments");
  };

  const handleTakeAssignment = (id) => {
    handleClose();
    if (id) {
      navigate(`/take-assignment/${id}`);
    } else {
      navigate("/my-assignments");
    }
  };

  const handleGoToQuizzes = () => {
    handleClose();
    navigate("/my-quizzes");
  };

  const handleTakeQuiz = (id) => {
    handleClose();
    if (id) {
      navigate(`/take-quiz/${id}`);
    } else {
      navigate("/my-quizzes");
    }
  };

  const handleOpenFeesAction = () => {
    handleClose();
    if (onOpenPaymentModal) {
      onOpenPaymentModal();
    } else {
      navigate("/attendance-fees");
    }
  };

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800/90 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* ========================================================== */}
        {/* MODAL HEADER: BRANDED WELCOME & STUDENT IDENTITY           */}
        {/* ========================================================== */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-700 text-white shrink-0 overflow-hidden">
          {/* Subtle background glow circles */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute right-32 -bottom-10 w-36 h-36 rounded-full bg-cyan-400/15 blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] sm:text-xs font-bold text-white tracking-wide border border-white/25">
                <Sparkles size={12} className="text-amber-300 animate-pulse" />
                <span>Daily Student Overview • {todayFormatted}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-xs truncate">
                Welcome, {studentName}!
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm font-medium">
                {studentCourse}
              </p>

              {/* Identity Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/20 text-[11px] sm:text-xs font-semibold text-white/95 border border-white/15">
                  <Calendar size={11} className="text-blue-200" />
                  ID: <strong className="font-bold">{admissionId}</strong>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/20 text-[11px] sm:text-xs font-semibold text-white/95 border border-white/15">
                  <ShieldCheck size={11} className="text-emerald-300" />
                  {centerBranch}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 hover:text-white transition-all cursor-pointer shrink-0 border border-white/15"
              aria-label="Close Overview Glance"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* MODAL BODY (SCROLLABLE SINGLE-GLANCE SECTIONS)             */}
        {/* ========================================================== */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-5 bg-slate-50/50 dark:bg-[#070d1e]/50">
          {/* 1. TOP KPI GLANCE STRIP (4 METRICS) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* KPI 1: Pending Tasks */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Assignments
                </span>
                <FileText size={15} className="text-rose-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {assignmentsList.length}
                </span>
                <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                  {overdueAssignments.length > 0
                    ? `${overdueAssignments.length} Overdue`
                    : assignmentsList.length > 0
                    ? "Pending"
                    : "All Done ✓"}
                </span>
              </div>
            </div>

            {/* KPI 2: Pending Quizzes */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Quizzes
                </span>
                <BrainCircuit size={15} className="text-blue-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {pendingQuizzesList.length}
                </span>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  {pendingQuizzesList.length > 0 ? "Available" : "Completed ✓"}
                </span>
              </div>
            </div>

            {/* KPI 3: Fee Status */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Fee Status
                </span>
                <CreditCard
                  size={15}
                  className={isFeesCleared ? "text-emerald-500" : "text-amber-500"}
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-base sm:text-lg font-black truncate ${
                    isFeesCleared
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {isFeesCleared ? "Cleared ✓" : installmentAmount}
                </span>
              </div>
            </div>

            {/* KPI 4: Academic Progress */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Progress
                </span>
                <TrendingUp size={15} className="text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {progressPercent}%
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {progressPercent >= 75 ? "Excellent" : progressPercent > 0 ? "In Progress" : "Not Started"}
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* 2. CONDITIONAL FEES NOTICE                                 */}
          {/* ========================================================== */}
          {!isFeesCleared ? (
            <div className="rounded-2xl p-4 sm:p-4.5 bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/40 dark:from-amber-950/40 dark:via-[#1c180e] dark:to-amber-900/30 border border-amber-300/80 dark:border-amber-600/40 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 dark:bg-amber-500/25 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center shrink-0 shadow-2xs">
                    <CreditCard size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        Tuition Fee Notice: Installment Due
                      </h4>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-2xs">
                        Action Required
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {termText} •{" "}
                      <strong className="text-slate-900 dark:text-amber-200 font-bold">
                        {installmentAmount}
                      </strong>
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 font-semibold pt-0.5">
                      <Clock size={12} />
                      <span>{daysRemainingText}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOpenFeesAction}
                  className="self-start sm:self-center px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Pay / View Notice</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-3.5 sm:p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Tuition Fees Fully Cleared
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Your account has no outstanding fees. Official fee receipts are verified.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 shrink-0">
                Verified
              </span>
            </div>
          )}

          {/* ========================================================== */}
          {/* 3. PENDING ASSIGNMENTS LIST                                */}
          {/* ========================================================== */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <FileText size={15} />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                  Pending Assignments
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700/50">
                  {assignmentsList.length} Tasks
                </span>
              </div>
              <button
                onClick={handleGoToAssignments}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {assignmentsList.length === 0 ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-center space-y-1.5 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={18} />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white text-xs sm:text-sm">
                  All Caught Up! No Pending Assignments
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  You have no pending assignments due for your current batch.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {assignmentsList.slice(0, 4).map((assign) => (
                  <div
                    key={assign.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800/90 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between gap-2.5 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                          {assign.batchName || assign.course || "Assigned Batch"}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                            assign.isOverdue || assign.status === "overdue"
                              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300"
                              : assign.isUrgent
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300"
                          }`}
                        >
                          {assign.badgeText || assign.dueDate || "Pending"}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {assign.title}
                      </h4>
                      {assign.instructions && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {assign.instructions}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/60">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <Clock size={12} />
                        <span>{assign.dueDate || "No Due Date"}</span>
                      </div>
                      <button
                        onClick={() => handleTakeAssignment(assign.id)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Submit</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* 4. PENDING QUIZZES & ASSESSMENTS LIST                       */}
          {/* ========================================================== */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BrainCircuit size={15} />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                  Pending Quizzes & Assessments
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                  {pendingQuizzesList.length} Quizzes
                </span>
              </div>
              <button
                onClick={handleGoToQuizzes}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {pendingQuizzesList.length === 0 ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-center space-y-1.5 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={18} />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white text-xs sm:text-sm">
                  No Pending Quizzes
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  You are up to date on all quizzes and assessments for your enrolled courses.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pendingQuizzesList.slice(0, 4).map((quiz) => (
                  <div
                    key={quiz.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800/90 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between gap-2.5 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                          {quiz.courseTitle || quiz.category || "Assessment"}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 shrink-0">
                          {quiz.passScorePercentage || 70}% Pass Req.
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {quiz.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {quiz.totalQuestions || quiz.questions?.length || 20} Questions •{" "}
                        {quiz.durationMinutes || 20} Mins
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/60">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {quiz.studentStatus === "failed"
                          ? "Retake Available"
                          : "Not Attempted"}
                      </span>
                      <button
                        onClick={() => handleTakeQuiz(quiz.id)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Start Quiz</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================== */}
        {/* MODAL FOOTER: DAILY OVERVIEW BADGE & PRIMARY ACTION        */}
        {/* ========================================================== */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#0b1329] border-t border-slate-200 dark:border-slate-800 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 select-none">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Daily Overview • Automatically appears on first login each day</span>
          </div>

          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Go to Dashboard Workspace</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
    </ModalPortal>
  );
};

export default FirstLoginGlanceModal;
