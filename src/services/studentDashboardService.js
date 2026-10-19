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
import { lmsService } from "./lmsService";

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
      assignedCourseIds = [],
      studentCoursesAccess = [],
      enrolledCoursesCount,
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
      assignedCourseIds,
      studentCoursesAccess,
      enrolledCoursesCount,
    });

    const reminderOptions = studentDashboardService.getReminderOptions();
    const quickActions = studentDashboardService.getQuickActions();
    const paymentInfo = studentDashboardService.getPaymentInfo(crmProfile, currentUser);

    const stats = studentDashboardService.getStudentStats({
      currentUser,
      crmProfile,
      crmAttendance,
      assignedCourseIds,
      studentCoursesAccess,
      enrolledCoursesCount,
      coursesCount: enrolledCoursesCount || (assignedCourseIds && assignedCourseIds.length > 0 ? assignedCourseIds.length : (courses.length > 0 ? courses.length : undefined)),
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
      dueDate: "Live Quiz Available • 15 Questions",
      daysLeft: 1,
      badgeText: "Active Quiz",
      severity: "quiz", // BLUE
      link: "/my-quizzes",
      btnText: "Start Quiz",
    };

    // Item 5: Exam (8 Certification Tracks Available)
    const itemExam = {
      id: "notif-exam",
      type: "exam",
      title: "Official Skills Certification Exams",
      course: "8 Certification Tracks Open • Instant Results",
      dueDate: "Proctored Exam Hall Open • Take Exams Online",
      badgeText: "Take Exams",
      severity: "exam", // GREEN
      link: "/exam",
      btnText: "Take Exams",
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
    const assignedCourseIds =
      Array.isArray(params.assignedCourseIds) && params.assignedCourseIds.length > 0
        ? params.assignedCourseIds
        : currentUser.assignedCourseIds || ["course-1", "course-8"];

    // Find active course among assigned courses
    let activeCourseId = assignedCourseIds[0] || "course-1";
    try {
      const storedLast = localStorage.getItem("om_lms_last_active_course");
      if (storedLast && assignedCourseIds.includes(storedLast)) {
        activeCourseId = storedLast;
      } else {
        // Find course in progress
        for (const cId of assignedCourseIds) {
          const m = lmsService.getRealCourseMetrics(cId);
          if (m.completedActivities > 0 && m.completedActivities < m.totalActivities) {
            activeCourseId = cId;
            break;
          }
        }
      }
    } catch (e) {}

    const course = lmsService.getCourseById(activeCourseId) || {
      id: activeCourseId,
      title: "Social Media Marketing",
    };
    const metrics = lmsService.getRealCourseMetrics(activeCourseId);
    const units = lmsService.getUnitsByCourse(activeCourseId);

    const nextUnit = units.find((u) => !u.isCompleted) || units[0];
    const nextUnitIdx = units.indexOf(nextUnit);
    const subsequentUnit =
      nextUnitIdx >= 0 && nextUnitIdx + 1 < units.length
        ? units[nextUnitIdx + 1]
        : null;

    const moduleNames = [
      ...new Set(units.map((u) => u.moduleName).filter(Boolean)),
    ];
    const currentModName =
      nextUnit?.moduleName || moduleNames[0] || "Core Module";
    const currentModIdx = moduleNames.indexOf(currentModName);
    const modNumber = currentModIdx >= 0 ? currentModIdx + 1 : 1;
    const totalModules = Math.max(moduleNames.length, 1);
    const remainingModules = Math.max(0, totalModules - modNumber);
    const lessonPositionNumber = nextUnitIdx >= 0 ? nextUnitIdx + 1 : 1;

    const parseSeconds = (dur) => {
      if (!dur) return 1335;
      const parts = dur.toString().split(":").map(Number);
      if (parts.length === 2) return parts[0] * 60 + (parts[1] || 0);
      if (parts.length === 3)
        return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
      return 1335;
    };

    let totalSec = 0;
    let watchedSec = 0;
    units.forEach((u) => {
      const s = parseSeconds(u.duration);
      totalSec += s;
      if (u.isCompleted) watchedSec += s;
    });

    const nextUnitSec = nextUnit ? parseSeconds(nextUnit.duration) : 1335;
    const watchedMinutes = Math.round(watchedSec / 60);
    const totalMinutes = Math.max(watchedMinutes + 1, Math.round(totalSec / 60));
    const remainingMinutes = Math.max(0, totalMinutes - watchedMinutes);
    const currentMinutes = Math.min(
      remainingMinutes,
      Math.round(nextUnitSec / 60),
    );
    const laterRemainingMinutes = Math.max(
      0,
      remainingMinutes - currentMinutes,
    );

    const progressPercent = metrics.progress;
    const totalCircumference = 276.46; // 2 * Math.PI * 44

    const totalDonut =
      watchedMinutes + currentMinutes + laterRemainingMinutes || 1;
    const completedPct = Math.round((watchedMinutes / totalDonut) * 100);
    const currentPct = Math.max(5, Math.round((currentMinutes / totalDonut) * 100));
    const remainingPct = Math.max(0, 100 - completedPct - currentPct);

    const dash1 = (completedPct / 100) * totalCircumference;
    const dash2 = (currentPct / 100) * totalCircumference;
    const dash3 = (remainingPct / 100) * totalCircumference;

    const segments = [
      {
        label: "Completed",
        minutes: `${watchedMinutes}m (${completedPct}%)`,
        color: "#2563eb",
        strokeDasharray: `${dash1.toFixed(1)} ${totalCircumference}`,
        strokeDashoffset: "0",
      },
      {
        label: "Current",
        minutes: `${currentMinutes}m (${currentPct}%)`,
        color: "#06b6d4",
        strokeDasharray: `${dash2.toFixed(1)} ${totalCircumference}`,
        strokeDashoffset: `-${dash1.toFixed(1)}`,
      },
      {
        label: "Remaining",
        minutes: `${remainingMinutes}m (${remainingPct}%)`,
        color: "text-slate-300 dark:text-slate-700",
        strokeDasharray: `${dash3.toFixed(1)} ${totalCircumference}`,
        strokeDashoffset: `-${(dash1 + dash2).toFixed(1)}`,
      },
    ];

    return {
      courseId: activeCourseId,
      courseTitle: course.title,
      thumbnail: course.thumbnail,
      moduleNumber: `MODULE ${modNumber} OF ${totalModules}`,
      moduleBadge: course.title,
      lessonTitle: nextUnit ? nextUnit.title : course.title,
      progressPercent,
      overallStatus: progressPercent >= 75 ? "Ahead of Schedule" : "On Track",
      timeStats: {
        watchedMinutes,
        remainingMinutes,
        alertText:
          remainingMinutes > 0
            ? `Just ${remainingMinutes}m remain! Goal on track`
            : "Course fully completed!",
      },
      segments,
      comparativeMetrics: [
        {
          title: "Status",
          main: `${progressPercent}% Done`,
          sub: `${100 - progressPercent}% Left`,
          colorClass: "text-[#2563eb] dark:text-blue-400",
        },
        {
          title: "Position",
          main: `Module ${modNumber}`,
          sub: `Lesson ${lessonPositionNumber}`,
          colorClass: "text-[#0c1e3d] dark:text-cyan-400",
        },
        {
          title: "Remaining",
          main: `${remainingModules} ${remainingModules === 1 ? "Module" : "Modules"}`,
          sub: `${Math.max(0, units.length - lessonPositionNumber)} lessons left`,
          colorClass: "text-purple-600 dark:text-purple-400",
        },
      ],
      nextLesson: {
        label: "Next Lesson",
        title: subsequentUnit
          ? subsequentUnit.title
          : "Assessment & Certification",
      },
      resumeLink: `/lesson-player?courseId=${activeCourseId}&unitId=${nextUnit ? nextUnit.id : ""}`,
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
    const assignedCourseIds =
      Array.isArray(options.assignedCourseIds) && options.assignedCourseIds.length > 0
        ? options.assignedCourseIds
        : currentUser.assignedCourseIds || ["course-1", "course-8"];

    const enrolledCoursesCount =
      options.enrolledCoursesCount ?? assignedCourseIds.length;

    let totalActivities = 0;
    let completedActivities = 0;

    assignedCourseIds.forEach((courseId) => {
      const metrics = lmsService.getRealCourseMetrics(courseId);
      totalActivities += metrics.totalActivities || metrics.totalLessons || 0;
      completedActivities +=
        metrics.completedActivities || metrics.completedLessons || 0;
    });

    const progress =
      totalActivities > 0
        ? Math.round((completedActivities / totalActivities) * 100)
        : currentUser.overallProgress ?? 0;

    const allQuizzes = lmsService.getQuizzes();
    const studentQuizzes = allQuizzes.filter(
      (q) => q.studentScore !== undefined && q.studentScore !== null,
    );
    const avgQuizScore =
      studentQuizzes.length > 0
        ? Math.round(
            (studentQuizzes.reduce(
              (acc, q) => acc + Number(q.studentScore),
              0,
            ) /
              studentQuizzes.length) *
              10,
          ) / 10
        : 88.5;

    const allAssignments = lmsService.getAssignments();
    const pendingAssignmentsCount = allAssignments.filter(
      (a) =>
        assignedCourseIds.includes(a.courseId) &&
        a.status !== "graded" &&
        a.status !== "submitted",
    ).length;
    const pendingQuizzesCount = allQuizzes.filter(
      (q) =>
        assignedCourseIds.includes(q.courseId) &&
        q.studentStatus !== "passed",
    ).length;
    const pendingTasksCount = pendingAssignmentsCount + pendingQuizzesCount || 2;

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
        value: enrolledCoursesCount,
        subtitle: "Enrolled Courses",
        color: "teal",
        link: "/enrolled-courses",
        iconName: "BookOpen",
      },
      {
        id: "stat-quiz",
        title: "QUIZ SCORE",
        value: `${avgQuizScore}%`,
        subtitle: "Average Score",
        color: "purple",
        link: "/my-quizzes",
        iconName: "Trophy",
      },
      {
        id: "stat-tasks",
        title: "PENDING TASKS",
        value: pendingTasksCount,
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
