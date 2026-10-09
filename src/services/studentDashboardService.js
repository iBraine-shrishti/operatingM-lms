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
 * Service to fetch and manage student dashboard data
 */
export const studentDashboardService = {
  /**
   * Fetch all dashboard data, simulating realistic data retrieval
   */
  fetchStudentDashboardData: async (options = {}) => {
    const { reminderSnoozedInfo = null, courses = [], quizzes = [] } = options;

    const storedSnooze =
      reminderSnoozedInfo || getStored("payment_reminder_snooze", null);
    const notifications = studentDashboardService.getNotifications(storedSnooze);
    const pendingAssignments = studentDashboardService.getPendingAssignments();
    const continueLearning = studentDashboardService.getContinueLearningData();
    const reminderOptions = studentDashboardService.getReminderOptions();
    const quickActions = studentDashboardService.getQuickActions();
    const paymentInfo = studentDashboardService.getPaymentInfo();
    const stats = studentDashboardService.getStudentStats({
      coursesCount: courses.length > 0 ? courses.length : undefined,
      quizzesCount: quizzes.length > 0 ? quizzes.length : undefined,
    });

    return {
      notifications,
      pendingAssignments,
      continueLearning,
      reminderOptions,
      quickActions,
      paymentInfo,
      stats,
      reminderSnoozedInfo: storedSnooze,
      notificationsSummary: NOTIFICATIONS_SUMMARY_TEXT,
    };
  },

  /**
   * Get notifications, dynamically formatted with reminder snooze if active
   */
  getNotifications: (reminderSnoozedInfo = null) => {
    return INITIAL_NOTIFICATIONS.map((item) => {
      if (item.type === "payment" && reminderSnoozedInfo) {
        return {
          ...item,
          dueDate: `Snoozed (${reminderSnoozedInfo.days}d) • Remind on ${reminderSnoozedInfo.date}`,
          badgeText: `Remind in ${reminderSnoozedInfo.days}d`,
          btnText: "Pay / Change",
        };
      }
      return item;
    });
  },

  /**
   * Get pending and overdue assignments
   */
  getPendingAssignments: () => {
    return [...INITIAL_PENDING_ASSIGNMENTS];
  },

  /**
   * Get active continue learning course state
   */
  getContinueLearningData: () => {
    return { ...CONTINUE_LEARNING_DATA };
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
   * Get payment modal info
   */
  getPaymentInfo: () => {
    return { ...PAYMENT_MODAL_INFO };
  },

  /**
   * Get student statistics summary with optional overrides
   */
  getStudentStats: (overrides = {}) => {
    return STUDENT_STATS_SUMMARY.map((stat) => {
      if (stat.id === "stat-courses" && overrides.coursesCount !== undefined) {
        return { ...stat, value: overrides.coursesCount };
      }
      return stat;
    });
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
