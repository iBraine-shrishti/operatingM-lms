import {
  REMINDER_OPTIONS,
  INITIAL_PENDING_ASSIGNMENTS,
  INITIAL_NOTIFICATIONS,
  CONTINUE_LEARNING_DATA,
  STUDENT_STATS_SUMMARY,
  QUICK_ACTIONS_DATA,
  PAYMENT_MODAL_INFO,
  NOTIFICATIONS_SUMMARY_TEXT,
} from "../data/studentDashboardData";

const STORAGE_PREFIX = "om_lms_student_dashboard_";

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (err) {
    console.error("Storage save error:", err);
  }
};

/**
 * Service to fetch and manage student dashboard data dynamically
 */
export const studentDashboardService = {
  /**
   * Build complete dynamic dashboard data
   */
  buildDashboardData: (options = {}) => {
    const {
      reminderSnoozedInfo = null,
      currentUser = {},
      crmProfile = {},
      crmAttendance = {},
      crmBatch = {},
      courses = [],
      quizzes = [],
      assignments = [],
    } = options;

    const storedSnooze =
      reminderSnoozedInfo || studentDashboardService.getStoredReminderSnooze();

    const notifications = studentDashboardService.getNotifications({
      reminderSnoozedInfo: storedSnooze,
      crmProfile,
      currentUser,
      crmBatch,
      quizzes,
      assignments,
    });

    const pendingAssignments = studentDashboardService.getPendingAssignments(
      assignments,
      crmProfile
    );

    const continueLearning = studentDashboardService.getContinueLearningData({
      currentUser,
      crmProfile,
      crmBatch,
      courses,
    });

    const reminderOptions = studentDashboardService.getReminderOptions();
    const quickActions = studentDashboardService.getQuickActions();
    const paymentInfo = studentDashboardService.getPaymentInfo(crmProfile, currentUser);

    const stats = studentDashboardService.getStudentStats({
      currentUser,
      crmProfile,
      crmAttendance,
      coursesCount: courses.length > 0 ? courses.length : undefined,
      quizzesCount: quizzes.length > 0 ? quizzes.length : undefined,
      assignments,
      quizzes,
    });

    const isFeesCleared =
      (crmProfile?.balanceDue !== undefined && crmProfile.balanceDue <= 0) ||
      crmProfile?.paymentStatus === "Fully Cleared";

    const notificationsSummary = {
      overdue: "1 Overdue",
      dueToday: "1 Due Today",
      feeNotice: isFeesCleared ? "Fees Cleared" : "1 Fee Notice",
      fullText: isFeesCleared
        ? "1 Overdue • 1 Due Today • Fees Cleared"
        : "1 Overdue • 1 Due Today • 1 Fee Notice",
    };

    return {
      notifications,
      pendingAssignments,
      continueLearning,
      reminderOptions,
      quickActions,
      paymentInfo,
      stats,
      reminderSnoozedInfo: storedSnooze,
      notificationsSummary,
    };
  },

  /**
   * Synchronous dashboard data builder for instant first render
   */
  fetchStudentDashboardDataSync: (options = {}) => {
    return studentDashboardService.buildDashboardData(options);
  },

  /**
   * Async fetch all dashboard data
   */
  fetchStudentDashboardData: async (options = {}) => {
    return studentDashboardService.buildDashboardData(options);
  },

  /**
   * Get notifications, dynamically formatted with real student dues and snooze
   */
  getNotifications: (params = {}) => {
    let reminderSnoozedInfo = null;
    let crmProfile = {};
    let currentUser = {};
    let crmBatch = {};
    let quizzes = [];

    if (params && typeof params === "object") {
      if (params.crmProfile || params.currentUser || params.reminderSnoozedInfo !== undefined) {
        reminderSnoozedInfo = params.reminderSnoozedInfo || null;
        crmProfile = params.crmProfile || {};
        currentUser = params.currentUser || {};
        crmBatch = params.crmBatch || {};
        quizzes = params.quizzes || [];
      } else if (params.days && params.date) {
        reminderSnoozedInfo = params;
      }
    }

    const isFeesCleared =
      (crmProfile?.balanceDue !== undefined && crmProfile.balanceDue <= 0) ||
      crmProfile?.paymentStatus === "Fully Cleared";
    const totalPaid = crmProfile?.totalPaid ?? crmProfile?.totalFees ?? 45000;
    const balanceDue = crmProfile?.balanceDue ?? 0;
    const nextDueAmount = crmProfile?.nextDueAmount || balanceDue || 12500;
    const courseTitle =
      crmProfile?.course || currentUser?.course || "Diploma in Digital Marketing";

    // Item 1: Assignment today
    const itemToday = {
      id: "notif-today",
      type: "assignment_today",
      title: "Affiliate Marketing Assignment",
      course: `${courseTitle} • Module 4`,
      dueDate: "Today • 11:59 PM",
      daysLeft: 0,
      badgeText: "Due Today",
      severity: "critical", // RED
      link: "/my-assignments?id=a-adv-1",
      btnText: "Submit Work",
    };

    // Item 2: Pending assignments group
    const itemAssignmentsGroup = {
      id: "notif-assignments-group",
      type: "assignments_group",
      title: "Assignments (6)",
      course: "1 Overdue (Due Date Gone) • 5 Pending Submissions",
      dueDate: "Review 6 Pending Tasks",
      badgeText: "1 Overdue + 5 Pending",
      badgeCount: "6 Tasks",
      severity: "pending_group", // PURPLE
      actionType: "open_assignments_modal",
      btnText: "View List (6)",
    };

    // Item 3: Fee installment or cleared notice
    let itemPayment;
    if (isFeesCleared) {
      itemPayment = {
        id: "notif-payment",
        type: "payment",
        title: "Course Fees Cleared",
        course: `₹${Number(totalPaid).toLocaleString("en-IN")} Paid • No Pending Dues`,
        dueDate: "Account in Good Standing",
        daysLeft: 0,
        badgeText: "Fees Paid",
        severity: "payment_cleared", // Emerald green styling
        actionType: "open_payment_modal",
        btnText: "View Receipts",
      };
    } else if (reminderSnoozedInfo) {
      itemPayment = {
        id: "notif-payment",
        type: "payment",
        title: "Course Fee Installment Due",
        course: `Installment Due • ₹${Number(nextDueAmount).toLocaleString("en-IN")}`,
        dueDate: `Snoozed (${reminderSnoozedInfo.days}d) • Remind on ${reminderSnoozedInfo.date}`,
        daysLeft: reminderSnoozedInfo.days,
        badgeText: `Remind in ${reminderSnoozedInfo.days}d`,
        severity: "payment", // Amber styling
        actionType: "open_payment_modal",
        btnText: "Pay / Change",
      };
    } else {
      const dueDateStr = crmProfile?.nextDueDate
        ? `Due on ${crmProfile.nextDueDate}`
        : "Due in 7 days • Oct 14, 2026";
      itemPayment = {
        id: "notif-payment",
        type: "payment",
        title: "Course Fee Installment Due",
        course: `Next Installment • ₹${Number(nextDueAmount).toLocaleString("en-IN")}`,
        dueDate: dueDateStr,
        daysLeft: 7,
        badgeText: "Due in 7 Days",
        severity: "payment", // Amber styling
        actionType: "open_payment_modal",
        btnText: "Pay Online",
      };
    }

    // Item 4: Quiz
    const itemQuiz = {
      id: "notif-quiz",
      type: "quiz",
      title: "New Quiz: SEO Technical Audit & Schema Assessment",
      course: courseTitle.includes("Diploma")
        ? "Diploma in Digital Marketing"
        : "Search Engine Optimization (SEO)",
      dueDate: "In 5 days • Oct 12, 2026 (11:59 PM)",
      daysLeft: 5,
      badgeText: "5 Days Left",
      severity: "quiz", // BLUE
      link: "/my-quizzes",
      btnText: "Start Quiz",
    };

    // Item 5: Exam
    const itemExam = {
      id: "notif-exam",
      type: "exam",
      title: "Digital Marketing Mid-Term Certification Exam",
      course: `${courseTitle} • Final Assessment`,
      dueDate: "In 4 days • Oct 11, 2026 (10:00 AM)",
      daysLeft: 4,
      badgeText: "Exam in 4 Days",
      severity: "exam", // GREEN
      link: "/my-quizzes",
      btnText: "Exam Details",
    };

    return [itemToday, itemAssignmentsGroup, itemPayment, itemQuiz, itemExam];
  },

  /**
   * Get pending and overdue assignments
   */
  getPendingAssignments: (assignments = [], crmProfile = {}) => {
    if (assignments && assignments.length > 0) {
      const pendingList = assignments.filter(
        (a) => a.status === "pending" || a.status === "overdue"
      );
      if (pendingList.length > 0) {
        return pendingList.slice(0, 6).map((a, idx) => ({
          id: a.id || `a-${idx}`,
          title: a.title,
          course: a.courseName || a.course || crmProfile.course || "Digital Marketing",
          dueDate:
            a.dueDate ||
            (idx === 0 ? "Due Yesterday • Oct 6, 2026" : `In ${idx * 2 + 1} days`),
          status: idx === 0 ? "overdue" : "pending",
          daysLeft: idx === 0 ? -1 : idx * 2 + 1,
          badgeText:
            idx === 0
              ? "Overdue (Due Date Gone)"
              : `${idx * 2 + 1} Days Left`,
          instructions:
            a.instructions ||
            a.description ||
            "Complete assignment practical exercises and upload solution files.",
          isOverdue: idx === 0,
          isUrgent: idx === 1,
          isYellow: idx === 2,
        }));
      }
    }
    return [...INITIAL_PENDING_ASSIGNMENTS];
  },

  /**
   * Get active continue learning course state dynamically bound to student course
   */
  getContinueLearningData: (params = {}) => {
    const currentUser = params.currentUser || {};
    const crmProfile = params.crmProfile || {};
    const crmBatch = params.crmBatch || {};

    const courseName =
      crmProfile.course || currentUser.course || "Diploma in Digital Marketing";
    const currentTopic =
      crmBatch.currentTopic ||
      "Google Ads (PPC) Strategy & Campaign Architecture";
    const progressPercent = currentUser.overallProgress ?? 65;

    // Realistic time calculation
    const totalMinutes = 300;
    const watchedMinutes = Math.round(totalMinutes * (progressPercent / 100));
    const remainingMinutes = Math.max(0, totalMinutes - watchedMinutes);
    const completedMinutes = Math.round(watchedMinutes * 0.77);
    const currentMinutes = watchedMinutes - completedMinutes;

    const completedPct = Math.round((completedMinutes / totalMinutes) * 100);
    const currentPct = Math.round((currentMinutes / totalMinutes) * 100);
    const remainingPct = 100 - completedPct - currentPct;

    const moduleBadge = courseName.includes("Diploma")
      ? "Diploma Track"
      : courseName.includes("Masters")
        ? "Masters Track"
        : "SEO Technical";

    const nextLessonTitle =
      crmBatch.upcomingSchedule?.[1]?.topic ||
      "Display & YouTube Video Advertising";

    return {
      courseId: crmBatch.batchCode || "course-8",
      moduleNumber: "MODULE 2 OF 4",
      moduleBadge: moduleBadge,
      lessonTitle:
        currentTopic ||
        "Lesson 2.2: Schema Markup & Structured Data Implementation",
      progressPercent,
      overallStatus: "On Track",
      timeStats: {
        watchedMinutes,
        remainingMinutes,
        alertText: `Just ${remainingMinutes}m remain! Goal on track`,
      },
      segments: [
        {
          label: "Completed",
          minutes: `${completedMinutes}m (${completedPct}%)`,
          color: "#2563eb",
          strokeDasharray: "124.2 276.46",
          strokeDashoffset: "0",
        },
        {
          label: "Current",
          minutes: `${currentMinutes}m (${currentPct}%)`,
          color: "#06b6d4",
          strokeDasharray: "27.5 276.46",
          strokeDashoffset: "-138.2",
        },
        {
          label: "Remaining",
          minutes: `${remainingMinutes}m (${remainingPct}%)`,
          color: "text-slate-300 dark:text-slate-700",
          strokeDasharray: "82.8 276.46",
          strokeDashoffset: "-179.7",
        },
      ],
      comparativeMetrics: [
        {
          title: "Status",
          main: `${progressPercent}% Done`,
          sub: `${100 - progressPercent}% Left`,
          colorClass: "text-[#2563eb] dark:text-blue-400",
        },
        {
          title: "Position",
          main: "Module 2",
          sub: "Lesson 2.2",
          colorClass: "text-[#0c1e3d] dark:text-cyan-400",
        },
        {
          title: "Remaining",
          main: "2 Modules",
          sub: "Mod 3 & 4",
          colorClass: "text-purple-600 dark:text-purple-400",
        },
      ],
      nextLesson: {
        label: "Next Lesson",
        title: nextLessonTitle,
      },
      resumeLink: "/enrolled-courses",
    };
  },

  /**
   * Get reminder snooze duration options
   */
  getReminderOptions: () => {
    return [...REMINDER_OPTIONS];
  },

  /**
   * Get quick action buttons
   */
  getQuickActions: () => {
    return [...QUICK_ACTIONS_DATA];
  },

  /**
   * Get payment modal info dynamically bound to student fee status
   */
  getPaymentInfo: (crmProfile = {}, currentUser = {}) => {
    const isFeesCleared =
      (crmProfile?.balanceDue !== undefined && crmProfile.balanceDue <= 0) ||
      crmProfile?.paymentStatus === "Fully Cleared";
    const totalFees = crmProfile?.totalFees || 45000;
    const totalPaid = crmProfile?.totalPaid ?? totalFees;
    const balanceDue = crmProfile?.balanceDue ?? 0;
    const nextDueAmount = crmProfile?.nextDueAmount || balanceDue || 12500;

    if (isFeesCleared) {
      return {
        installmentAmount: "₹0",
        termText: `All Installments Paid • ₹${Number(totalPaid).toLocaleString("en-IN")} of ₹${Number(totalFees).toLocaleString("en-IN")}`,
        dueDateText: "No Pending Dues",
        daysRemainingText: "Account Fully Paid & Verified",
        isCleared: true,
      };
    }

    return {
      installmentAmount: `₹${Number(nextDueAmount).toLocaleString("en-IN")}`,
      termText: `Pending Balance • ₹${Number(totalPaid).toLocaleString("en-IN")} Paid of ₹${Number(totalFees).toLocaleString("en-IN")}`,
      dueDateText: crmProfile.nextDueDate || "October 14, 2026",
      daysRemainingText: crmProfile.nextDueDate
        ? `Due on ${crmProfile.nextDueDate}`
        : "7 Days Remaining • Due Oct 14, 2026",
      isCleared: false,
    };
  },

  /**
   * Get student statistics summary with dynamic binds
   */
  getStudentStats: (options = {}) => {
    const currentUser = options.currentUser || {};
    const crmProfile = options.crmProfile || {};
    const coursesCount =
      options.coursesCount ?? (currentUser.enrolledCoursesCount || 7);
    const progress =
      currentUser.overallProgress ??
      (crmProfile.attendancePercentage
        ? Math.round(crmProfile.attendancePercentage)
        : 65);

    return [
      {
        id: "stat-progress",
        title: "OVERALL PROGRESS",
        value: `${progress}%`,
        subtitle:
          progress >= 75
            ? "Excellent Progress! Great work!"
            : "Keep going! Great work!",
        progressPercent: progress,
        color: "blue",
        link: "/enrolled-courses",
        showCircularProgress: true,
      },
      {
        id: "stat-courses",
        title: "COURSES",
        value: coursesCount,
        subtitle: "Enrolled Courses",
        color: "teal",
        link: "/enrolled-courses",
        iconName: "BookOpen",
      },
      {
        id: "stat-quiz",
        title: "QUIZ SCORE",
        value: "88.5%",
        subtitle: "Average Score",
        color: "purple",
        link: "/my-quizzes",
        iconName: "Trophy",
      },
      {
        id: "stat-tasks",
        title: "PENDING TASKS",
        value: 7,
        subtitle: "Assignments & Exams",
        color: "amber",
        link: "/my-assignments",
        iconName: "Bell",
      },
    ];
  },

  /**
   * Save snooze state
   */
  saveReminderSnooze: (snoozeInfo) => {
    setStored("payment_reminder_snooze", snoozeInfo);
    return snoozeInfo;
  },

  /**
   * Get stored snooze state
   */
  getStoredReminderSnooze: () => {
    return getStored("payment_reminder_snooze", null);
  },

  /**
   * Clear snooze state
   */
  clearReminderSnooze: () => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}payment_reminder_snooze`);
    } catch (err) {
      console.error("Storage remove error:", err);
    }
  },
};

export default studentDashboardService;
