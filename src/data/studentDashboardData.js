/**
 * Student Dashboard Mock Data and Configuration Constants
 * Centralized data source for the Student Dashboard Hub
 */

export const REMINDER_OPTIONS = [
  {
    days: 2,
    label: "2 Days",
    date: "Oct 9, 2026",
    desc: "Short snooze (Alerts on Oct 9 • 5 days before due)",
  },
  {
    days: 3,
    label: "3 Days",
    date: "Oct 10, 2026",
    desc: "Recommended (Alerts on Oct 10 • 4 days before due)",
  },
  {
    days: 4,
    label: "4 Days",
    date: "Oct 11, 2026",
    desc: "Medium snooze (Alerts on Oct 11 • 3 days before due)",
  },
  {
    days: 5,
    label: "5 Days",
    date: "Oct 12, 2026",
    desc: "Latest snooze (Alerts on Oct 12 • 2 days before due)",
  },
];

export const INITIAL_PENDING_ASSIGNMENTS = [
  {
    id: "a-adv-5",
    title: "Online Reputation Management (ORM) Assignment",
    course: "Advanced Topics • Brand Security",
    dueDate: "Due Yesterday • Oct 6, 2026",
    status: "overdue",
    daysLeft: -1,
    badgeText: "Overdue (Due Date Gone)",
    instructions:
      "Create an ORM crisis management manual and response matrix for negative customer feedback.",
    isOverdue: true,
  },
  {
    id: "a-adv-2",
    title: "Influencer Marketing Assignment-1",
    course: "Advanced Topics • Influencer Track",
    dueDate: "In 2 days • Oct 9, 2026 (11:59 PM)",
    status: "pending",
    daysLeft: 2,
    badgeText: "2 Days Left",
    instructions:
      "Curate a 10-tier influencer list across beauty and tech niches with outreach templates.",
    isUrgent: true,
  },
  {
    id: "a-adv-4",
    title: "Mobile Marketing Assignment",
    course: "Advanced Topics • Mobile Growth",
    dueDate: "In 5 days • Oct 12, 2026 (11:59 PM)",
    status: "pending",
    daysLeft: 5,
    badgeText: "5 Days Left",
    instructions:
      "Conduct Google Play & Apple App Store metadata audit and draft 5 push notification copies.",
    isYellow: true,
  },
  {
    id: "a-adv-6",
    title: "Viral Marketing Assignment-1",
    course: "Advanced Topics • Viral Growth",
    dueDate: "In 7 days • Oct 14, 2026 (11:59 PM)",
    status: "pending",
    daysLeft: 7,
    badgeText: "7 Days Left",
    instructions:
      "Design a meme marketing campaign pack consisting of 5 topical memes for social channels.",
    isYellowNotice: true,
  },
  {
    id: "a-adv-7",
    title: "Viral Marketing Assignment-2",
    course: "Advanced Topics • Social Media",
    dueDate: "In 9 days • Oct 16, 2026 (11:59 PM)",
    status: "pending",
    daysLeft: 9,
    badgeText: "9 Days Left",
    instructions:
      "Engineer a referral viral loop mechanism with tier unlocking and share incentive triggers.",
  },
  {
    id: "a-adv-8",
    title: "Content Marketing Assignment-1",
    course: "Advanced Topics • Content Marketing",
    dueDate: "In 14 days • Oct 21, 2026 (11:59 PM)",
    status: "pending",
    daysLeft: 14,
    badgeText: "14 Days Left",
    instructions:
      "Develop a 90-day pillar content framework with lead magnet gate and distribution schedule.",
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-today",
    type: "assignment_today",
    title: "Affiliate Marketing Assignment",
    course: "Advanced Topics • Module 4",
    dueDate: "Today • 11:59 PM",
    daysLeft: 0,
    badgeText: "Due Today",
    severity: "critical", // RED
    link: "/my-assignments?id=a-adv-1",
    btnText: "Submit Work",
  },
  {
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
  },
  {
    id: "notif-payment",
    type: "payment",
    title: "Course Fee Installment Due",
    course: "Term 3 Tuition Fee • ₹12,500",
    dueDate: "Due in 7 days • Oct 14, 2026",
    daysLeft: 7,
    badgeText: "Due in 7 Days",
    severity: "payment", // YELLOW / AMBER
    actionType: "open_payment_modal",
    btnText: "Pay Online",
  },
  {
    id: "notif-quiz",
    type: "quiz",
    title: "New Quiz: SEO Technical Audit & Schema Assessment",
    course: "Search Engine Optimization (SEO)",
    dueDate: "In 5 days • Oct 12, 2026 (11:59 PM)",
    daysLeft: 5,
    badgeText: "5 Days Left",
    severity: "quiz", // BLUE
    link: "/my-quizzes",
    btnText: "Start Quiz",
  },
  {
    id: "notif-exam",
    type: "exam",
    title: "Digital Marketing Mid-Term Certification Exam",
    course: "Diploma Track • Final Assessment",
    dueDate: "In 4 days • Oct 11, 2026 (10:00 AM)",
    daysLeft: 4,
    badgeText: "Exam in 4 Days",
    severity: "exam", // GREEN
    link: "/my-quizzes",
    btnText: "Exam Details",
  },
];

export const CONTINUE_LEARNING_DATA = {
  courseId: "course-8",
  moduleNumber: "MODULE 2 OF 4",
  moduleBadge: "SEO Technical",
  lessonTitle: "Lesson 2.2: Schema Markup & Structured Data Implementation",
  progressPercent: 65,
  overallStatus: "On Track",
  timeStats: {
    watchedMinutes: 195,
    remainingMinutes: 105,
    alertText: "Just 105m remain! Goal on track",
  },
  segments: [
    { label: "Completed", minutes: "150m (50%)", color: "#2563eb", strokeDasharray: "124.2 276.46", strokeDashoffset: "0" },
    { label: "Current", minutes: "45m (15%)", color: "#06b6d4", strokeDasharray: "27.5 276.46", strokeDashoffset: "-138.2" },
    { label: "Remaining", minutes: "105m (35%)", color: "text-slate-300 dark:text-slate-700", strokeDasharray: "82.8 276.46", strokeDashoffset: "-179.7" },
  ],
  comparativeMetrics: [
    {
      title: "Status",
      main: "65% Done",
      sub: "35% Left",
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
    title: "Structured Data Types",
  },
  resumeLink: "/lesson-player?courseId=course-8",
};

export const STUDENT_STATS_SUMMARY = [
  {
    id: "stat-progress",
    title: "OVERALL PROGRESS",
    value: "65%",
    subtitle: "Keep going! Great work!",
    progressPercent: 65,
    color: "blue",
    link: "/enrolled-courses",
    showCircularProgress: true,
  },
  {
    id: "stat-courses",
    title: "COURSES",
    value: 4,
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

export const QUICK_ACTIONS_DATA = [
  {
    id: "action-courses",
    title: "Enrolled Courses",
    subtitle: "Resume tracks",
    link: "/enrolled-courses",
    color: "blue",
    iconName: "GraduationCap",
  },
  {
    id: "action-quizzes",
    title: "My Quizzes",
    subtitle: "Test knowledge",
    link: "/my-quizzes",
    color: "purple",
    iconName: "CheckSquare",
  },
  {
    id: "action-assignments",
    title: "Assignments",
    subtitle: "Submit & track",
    link: "/my-assignments",
    color: "emerald",
    iconName: "FileText",
  },
];

export const PAYMENT_MODAL_INFO = {
  installmentAmount: "₹12,500",
  termText: "Term 3 Tuition Fee • 3 of 4 Installments",
  dueDateText: "October 14, 2026",
  daysRemainingText: "7 Days Remaining • Due Oct 14, 2026",
};

export const NOTIFICATIONS_SUMMARY_TEXT = {
  overdue: "1 Overdue",
  dueToday: "1 Due Today",
  feeNotice: "1 Fee Notice",
  fullText: "1 Overdue • 1 Due Today • 1 Fee Notice",
};
