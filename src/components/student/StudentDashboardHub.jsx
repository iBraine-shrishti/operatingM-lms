import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
