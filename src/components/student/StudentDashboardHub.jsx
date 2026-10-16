import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { studentDashboardService } from "../../services/studentDashboardService";
import {
  StudentWelcomeBanner,
  StudentQuickActions,
  StudentStatCards,
  ContinueLearningCard,
  NotificationsDeadlinesHub,
  PendingAssignmentsModal,
  PaymentDueModal,
} from "./dashboard";

/**
 * Main Student Dashboard Hub
 * Modular, component-based dashboard orchestrator fetching data via studentDashboardService
 */
export const StudentDashboardHub = ({
  currentUser = {},
  crmProfile = {},
  crmAttendance = {},
  crmBatch = {},
  crmCertificates = [],
  courses = [],
  quizzes = [],
  assignments = [],
  achievements = [],
  assignedCourseIds = [],
  studentCoursesAccess = [],
  enrolledCoursesCount,
  onUpdateCurrentUser,
}) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Modal & reminder UI state
  const [isAssignmentsModalOpen, setIsAssignmentsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedReminderDays, setSelectedReminderDays] = useState(3);
  const [isRemindDropdownOpen, setIsRemindDropdownOpen] = useState(false);
  const [reminderSnoozedInfo, setReminderSnoozedInfo] = useState(() =>
    studentDashboardService.getStoredReminderSnooze()
  );

  // Dashboard data dynamically initialized and fetched via studentDashboardService
  const [dashboardData, setDashboardData] = useState(() =>
    studentDashboardService.fetchStudentDashboardDataSync({
      reminderSnoozedInfo: studentDashboardService.getStoredReminderSnooze(),
      currentUser,
      crmProfile,
      crmAttendance,
      crmBatch,
      courses,
      quizzes,
      assignments,
      assignedCourseIds,
      studentCoursesAccess,
      enrolledCoursesCount,
    })
  );

  // Fetch / update dashboard data on mount or when props / profile / snooze change
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await studentDashboardService.fetchStudentDashboardData({
          reminderSnoozedInfo,
          currentUser,
          crmProfile,
          crmAttendance,
          crmBatch,
          courses,
          quizzes,
          assignments,
          assignedCourseIds,
          studentCoursesAccess,
          enrolledCoursesCount,
        });
        if (isMounted) {
          setDashboardData(data);
          if (data.reminderSnoozedInfo) {
            setReminderSnoozedInfo(data.reminderSnoozedInfo);
          }
        }
      } catch (err) {
        console.error("Failed to fetch student dashboard data:", err);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [
    reminderSnoozedInfo,
    crmProfile?.id,
    crmProfile?.balanceDue,
    crmProfile?.totalPaid,
    crmProfile?.totalFees,
    crmProfile?.course,
    currentUser?.id,
    currentUser?.overallProgress,
    crmBatch?.currentTopic,
    courses.length,
    quizzes.length,
    assignments.length,
    assignedCourseIds?.join(","),
    enrolledCoursesCount,
  ]);

  // Handler for scheduling payment reminder snooze
  const handleSetReminder = (days, dateStr) => {
    const snoozeData = { days, date: dateStr };
    studentDashboardService.saveReminderSnooze(snoozeData);
    setReminderSnoozedInfo(snoozeData);

    if (showToast) {
      showToast(
        `Payment reminder scheduled for ${days} days from now (${dateStr}).`,
        "success",
        "Reminder Scheduled"
      );
    }

    setIsPaymentModalOpen(false);
    setIsRemindDropdownOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between gap-3.5 lg:gap-4 xl:gap-4.5 2xl:gap-5 w-full min-h-0 lg:min-h-[calc(100vh-6rem)]">
      {/* ============================================================== */}
      {/* 1. TOP ROW: WELCOME BANNER (LEFT) & QUICK ACTIONS (RIGHT)      */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-4 xl:gap-4 2xl:gap-5 items-stretch">
        <StudentWelcomeBanner
          currentUser={currentUser}
          crmProfile={crmProfile}
        />
        <StudentQuickActions
          actions={dashboardData.quickActions}
        />
      </div>

      {/* ============================================================== */}
      {/* 2. STAT CARDS: 2x2 on mobile/tablet, 4 in a row on desktop     */}
      {/* ============================================================== */}
      <StudentStatCards
        stats={dashboardData.stats}
      />

      {/* ============================================================== */}
      {/* 2.5 PROCTORED EXAMINATION TERMINAL CALLOUT BANNER              */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-50/90 via-white to-rose-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-rose-950/70 border border-rose-200 dark:border-rose-500/40 p-3 sm:p-3.5 xl:p-4 text-slate-900 dark:text-white shadow-xs dark:shadow-[0_4px_24px_rgba(244,63,94,0.12)]">
        {/* Subtle grid pattern / security overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px] opacity-10 dark:opacity-15 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-100 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-2xs dark:shadow-[0_0_15px_rgba(244,63,94,0.35)]">
              <ShieldAlert size={22} className="animate-pulse text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-400 animate-ping inline-block" />
                  PROCTORED EXAM TERMINAL
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-semibold">
                  CODE: OMC-2026-EXAM
                </span>
                <span className="hidden sm:inline-block text-[11px] text-slate-600 dark:text-slate-400">
                  • 60 Questions • 45 Mins • Negative Marking (-0.67)
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight mt-0.5 flex items-center gap-2">
                Digital Marketing Mid-Term Board Examination
                <span className="text-xs font-semibold px-2 py-0.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 rounded">
                  Window Open
                </span>
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end shrink-0">
            <div className="text-right hidden xl:block">
              <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Candidate Pass</span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                {crmProfile?.admissionNo || "OMC-0266"} • Borivali Center
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/exam")}
              className="w-full md:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-xs sm:text-sm tracking-wide shadow-md dark:shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-lg dark:hover:shadow-[0_0_28px_rgba(244,63,94,0.6)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Enter Exam Hall</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TWO-COLUMN MAIN WORKSPACE                                   */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-4 xl:gap-4 2xl:gap-5 items-stretch lg:flex-1 min-h-0">
        {/* LEFT COLUMN: Continue Learning (~58% on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <ContinueLearningCard
            data={dashboardData.continueLearning}
          />
        </div>

        {/* RIGHT COLUMN: Notifications & Deadlines Hub (~42% on desktop) */}
        <div className="lg:col-span-5 flex flex-col">
          <NotificationsDeadlinesHub
            notifications={dashboardData.notifications}
            summaryText={dashboardData.notificationsSummary?.fullText}
            onOpenAssignmentsModal={() => setIsAssignmentsModalOpen(true)}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: PENDING & OVERDUE ASSIGNMENTS                         */}
      {/* ============================================================== */}
      <PendingAssignmentsModal
        isOpen={isAssignmentsModalOpen}
        onClose={() => setIsAssignmentsModalOpen(false)}
        assignments={dashboardData.pendingAssignments}
      />

      {/* ============================================================== */}
      {/* MODAL 2: PAYMENT DUE (7 DAYS NOTICE & SNOOZE)                 */}
      {/* ============================================================== */}
      <PaymentDueModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        currentUser={currentUser}
        crmProfile={crmProfile}
        paymentInfo={dashboardData.paymentInfo}
        reminderOptions={dashboardData.reminderOptions}
        selectedReminderDays={selectedReminderDays}
        onSelectReminderDays={setSelectedReminderDays}
        isRemindDropdownOpen={isRemindDropdownOpen}
        onToggleRemindDropdown={() => setIsRemindDropdownOpen((prev) => !prev)}
        onSetReminder={handleSetReminder}
      />
    </div>
  );
};

export default StudentDashboardHub;
