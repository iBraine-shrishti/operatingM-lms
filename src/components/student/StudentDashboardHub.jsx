import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Award,
  ArrowRight,
  Play,
  CheckCircle2,
  GraduationCap,
  Clock,
  Sparkles,
  Calendar,
  CheckSquare,
  ChevronRight,
  MapPin,
  Zap,
  FileText,
  Check,
  Trophy,
  Bell,
  AlertTriangle,
  AlertCircle,
  Flame,
  CreditCard,
  Wallet,
  X,
  ExternalLink,
  BookCheck,
  ChevronDown,
} from "lucide-react";
import dashboardHeaderBg from "../../assets/header-bg/dashboard-header.png";
// import dashboardHatImg from "../../assets/header-bg/dashboard-hat.png";
import continueLearningLaptopImg from "../../assets/continue-learning-laptop.png";
import profilePic from "../../assets/profile-pic.png";
import { PhotoVideoLibraryHub } from "./PhotoVideoLibraryHub";
import { useToast } from "../../context/ToastContext";

export const StudentDashboardHub = ({
  currentUser = {},
  crmProfile = {},
  crmAttendance = {},
  crmBatch = {},
  crmCertificates = [],
  courses = [],
  quizzes = [],
  achievements = [],
  onUpdateCurrentUser,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isAssignmentsModalOpen, setIsAssignmentsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedReminderDays, setSelectedReminderDays] = useState(3);
  const [isRemindDropdownOpen, setIsRemindDropdownOpen] = useState(false);
  const [reminderSnoozedInfo, setReminderSnoozedInfo] = useState(null);

  const REMINDER_OPTIONS = [
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

  const handleSetReminder = (days, dateStr) => {
    setReminderSnoozedInfo({ days, date: dateStr });
    if (showToast) {
      showToast(
        `Payment reminder scheduled for ${days} days from now (${dateStr}).`,
        "success",
        "Reminder Scheduled",
      );
    }
    setIsPaymentModalOpen(false);
    setIsRemindDropdownOpen(false);
  };

  // The 6 Pending & Overdue Assignments (1 Overdue where due date gone + 5 Pending)
  const PENDING_ASSIGNMENTS_MODAL_LIST = [
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

  // Listed Notifications Array:
  const NOTIFICATIONS_LIST = [
    // 1. Assignment Due Today (Separate, Urgent - RED)
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
    // 2. Pending & Overdue Assignments (6) -> PURPLE (previous exams color)
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
    // 3. Payment Due (7 Days Before) -> YELLOW / AMBER
    {
      id: "notif-payment",
      type: "payment",
      title: "Course Fee Installment Due",
      course: "Term 3 Tuition Fee • ₹12,500",
      dueDate: reminderSnoozedInfo
        ? `Snoozed (${reminderSnoozedInfo.days}d) • Remind on ${reminderSnoozedInfo.date}`
        : "Due in 7 days • Oct 14, 2026",
      daysLeft: 7,
      badgeText: reminderSnoozedInfo
        ? `Remind in ${reminderSnoozedInfo.days}d`
        : "Due in 7 Days",
      severity: "payment", // YELLOW / AMBER
      actionType: "open_payment_modal",
      btnText: reminderSnoozedInfo ? "Pay / Change" : "Pay Online",
    },
    // 4. New Quiz -> BLUE
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
    // 5. Certification Exam -> GREEN
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

  return (
    <div className="space-y-6">
      {/* ============================================================== */}
      {/* 1. TOP ROW: WELCOME BANNER (LEFT) & QUICK ACTIONS (RIGHT)      */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* 1A. HERO WELCOME BANNER (with BG Image container) */}
        <div
          className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 relative bg-cover bg-center border border-blue-100/70 p-4 sm:p-5 md:p-5 lg:p-6 2xl:p-7 shadow-2xs flex items-center overflow-hidden"
          style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
        >
          {/* Avatar + Details + Mobile/Tablet Quick Actions */}
          <div className="relative z-10 flex items-center justify-between min-w-0 flex-1 gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-4 lg:space-x-5 2xl:space-x-6 min-w-0">
              {/* User Avatar Image - Scalable from mobile up to wide 1875px */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-26 md:h-26 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 rounded-full border-3 2xl:border-4 border-white shadow-md ring-2 ring-blue-100/90 p-1 sm:p-1.5 transition-all">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <img
                      src={profilePic}
                      alt={currentUser.name || "Hiteshpuri Goswami"}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <div className="min-w-0 space-y-0.5 md:space-y-1 2xl:space-y-1.5">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-blue-900 block">
                  WELCOME BACK,
                </span>
                <h1 className="text-base sm:text-xl md:text-2xl lg:text-[26px] 2xl:text-3xl font-black text-[#0c1e3d] tracking-tight leading-tight flex items-center gap-1.5">
                  <span className="truncate">
                    {currentUser.name || "Hiteshpuri Goswami"}!
                  </span>
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-slate-900 font-bold truncate">
                  {crmProfile.course || "Diploma in Digital Marketing"}
                </p>

                {/* 2 White Pills: Student ID & Center */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 md:pt-1">
                  <div className="bg-white/95 border border-slate-200/80 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[9.5px] sm:text-xs text-slate-700 font-medium flex items-center space-x-1 sm:space-x-1.5 shadow-2xs whitespace-nowrap">
                    <Calendar size={12} className="text-[#2563eb]" />
                    <span>
                      ID:{" "}
                      <strong className="text-slate-900 font-bold">
                        {crmProfile.admissionNo || "OMC-0266"}
                      </strong>
                    </span>
                  </div>
                  <div className="bg-white/95 border border-slate-200/80 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[9.5px] sm:text-xs text-slate-700 font-medium flex items-center space-x-1 sm:space-x-1.5 shadow-2xs whitespace-nowrap">
                    <MapPin size={12} className="text-[#2563eb]" />
                    <span>
                      <strong className="text-slate-900 font-bold">
                        {crmProfile.branch || "Borivali Center"}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions (Vertical Rounded Icon Buttons on screens <= 1023px) */}
            <div className="flex lg:hidden flex-col items-center gap-1.5 sm:gap-2 shrink-0 bg-white/90 backdrop-blur-xs p-1.5 sm:p-2 rounded-2xl border border-blue-100/80 shadow-xs">
              <button
                type="button"
                onClick={() => navigate("/enrolled-courses")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 text-[#2563eb] border border-blue-200 shadow-2xs flex items-center justify-center transition-all hover:bg-blue-100 hover:scale-105 active:scale-95 cursor-pointer"
                title="Enrolled Courses"
              >
                <GraduationCap size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-quizzes")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs flex items-center justify-center transition-all hover:bg-purple-100 hover:scale-105 active:scale-95 cursor-pointer"
                title="My Quizzes"
              >
                <CheckSquare size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-assignments")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs flex items-center justify-center transition-all hover:bg-emerald-100 hover:scale-105 active:scale-95 cursor-pointer"
                title="Assignments"
              >
                <FileText size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 1B. QUICK ACTIONS (OUTSIDE THE BG CONTAINER - Desktop lg: only, hidden below 1024px) */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 2xl:col-span-5 bg-white border border-slate-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex-col justify-between space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-0.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 shadow-xs">
              <Zap size={15} className="fill-[#2563eb]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Quick Actions
            </h3>
          </div>

          {/* Actions: 3 distinct styled responsive items matching actual UI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full flex-1">
            {/* Action 1: Enrolled Courses */}
            <div
              onClick={() => navigate("/enrolled-courses")}
              className="bg-blue-50/60 hover:bg-blue-100/60 border border-blue-200/90 hover:border-blue-300 rounded-xl p-3 transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between gap-2 min-w-0"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <GraduationCap size={16} />
                </div>
                <div className="w-5 h-5 rounded-full bg-blue-100/80 border border-blue-200 text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb] flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={11} strokeWidth={2.5} />
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs 2xl:text-sm text-blue-700 group-hover:text-blue-800 transition-colors truncate">
                  Enrolled Courses
                </h4>
                <p className="text-[10.5px] text-blue-600/75 font-medium truncate mt-0.5">
                  Resume active tracks
                </p>
              </div>
            </div>

            {/* Action 2: My Quizzes */}
            <div
              onClick={() => navigate("/my-quizzes")}
              className="bg-purple-50/60 hover:bg-purple-100/60 border border-purple-200/90 hover:border-purple-300 rounded-xl p-3 transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between gap-2 min-w-0"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <CheckSquare size={16} />
                </div>
                <div className="w-5 h-5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-600 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={11} strokeWidth={2.5} />
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs 2xl:text-sm text-purple-700 group-hover:text-purple-800 transition-colors truncate">
                  My Quizzes
                </h4>
                <p className="text-[10.5px] text-purple-600/75 font-medium truncate mt-0.5">
                  Test your knowledge
                </p>
              </div>
            </div>

            {/* Action 3: Assignments */}
            <div
              onClick={() => navigate("/my-assignments")}
              className="bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-200/90 hover:border-emerald-300 rounded-xl p-3 transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between gap-2 min-w-0"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <FileText size={16} />
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={11} strokeWidth={2.5} />
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs 2xl:text-sm text-emerald-700 group-hover:text-emerald-800 transition-colors truncate">
                  Assignments
                </h4>
                <p className="text-[10.5px] text-emerald-600/75 font-medium truncate mt-0.5">
                  Submit & track
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STAT CARDS: 2x2 THROUGHOUT on mobile & tablet, 4 in a row on xl: */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 2xl:gap-5 3xl:gap-6">
        {/* Card 1: OVERALL PROGRESS (Blue) */}
        <div
          onClick={() => navigate("/enrolled-courses")}
          className="bg-gradient-to-br from-blue-50/95 via-[#edf5ff] to-[#dbeafe]/70 border border-blue-200/90 hover:border-blue-300 rounded-2xl p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_14px_rgba(37,99,235,0.06)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-blue-100 text-[#2563eb] border border-blue-200/80 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <div className="relative w-6.5 h-6.5 sm:w-8 sm:h-8 2xl:w-9 2xl:h-9 flex items-center justify-center">
                <svg
                  className="w-6.5 h-6.5 sm:w-8 sm:h-8 2xl:w-9 2xl:h-9 -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-blue-200/80"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#2563eb]"
                    strokeDasharray="65, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rotate-45 rounded-[0.5px] bg-[#2563eb] absolute" />
              </div>
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-extrabold uppercase tracking-wider text-[#2563eb] block leading-tight">
                OVERALL PROGRESS
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-black text-[#0c1e3d] mt-0.5 sm:mt-1 leading-none tracking-tight">
                65%
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-blue-900/70 font-semibold mt-0.5 sm:mt-1 truncate">
                Keep going! You're doing great!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/enrolled-courses");
            }}
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-blue-100/90 group-hover:bg-[#2563eb] text-[#2563eb] group-hover:text-white border border-blue-200 items-center justify-center transition-all cursor-pointer shrink-0 self-start mt-0.5 ml-2 shadow-2xs"
            title="View Details"
          >
            <ChevronRight
              size={13}
              className="2xl:w-4 2xl:h-4"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Card 2: COURSES (Teal/Emerald) */}
        <div
          onClick={() => navigate("/enrolled-courses")}
          className="bg-gradient-to-br from-teal-50/95 via-[#e9faf5] to-[#ccfbf1]/70 border border-teal-200/90 hover:border-teal-300 rounded-2xl p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_14px_rgba(13,148,136,0.06)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-teal-100 text-[#0d9488] border border-teal-200/80 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen size={18} className="sm:hidden" strokeWidth={2} />
              <BookOpen
                size={21}
                className="hidden sm:block 2xl:w-6 2xl:h-6"
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-extrabold uppercase tracking-wider text-[#0d9488] block leading-tight">
                COURSES
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-black text-[#042f2e] mt-0.5 sm:mt-1 leading-none tracking-tight">
                4
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-teal-900/70 font-semibold mt-0.5 sm:mt-1 truncate">
                Enrolled Courses
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/enrolled-courses");
            }}
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-teal-100/90 group-hover:bg-[#0d9488] text-[#0d9488] group-hover:text-white border border-teal-200 items-center justify-center transition-all cursor-pointer shrink-0 self-start mt-0.5 ml-2 shadow-2xs"
            title="View Courses"
          >
            <ChevronRight
              size={13}
              className="2xl:w-4 2xl:h-4"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Card 3: QUIZ SCORE (Purple) */}
        <div
          onClick={() => navigate("/my-quizzes")}
          className="bg-gradient-to-br from-purple-50/95 via-[#f5efff] to-[#ede9fe]/70 border border-purple-200/90 hover:border-purple-300 rounded-2xl p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_14px_rgba(124,58,237,0.06)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-purple-100 text-[#7c3aed] border border-purple-200/80 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Trophy size={18} className="sm:hidden" strokeWidth={2} />
              <Trophy
                size={21}
                className="hidden sm:block 2xl:w-6 2xl:h-6"
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-extrabold uppercase tracking-wider text-[#7c3aed] block leading-tight">
                QUIZ SCORE
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-black text-[#2e1065] mt-0.5 sm:mt-1 leading-none tracking-tight">
                88.5%
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-purple-900/70 font-semibold mt-0.5 sm:mt-1 truncate">
                Average Score
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/my-quizzes");
            }}
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-purple-100/90 group-hover:bg-[#7c3aed] text-[#7c3aed] group-hover:text-white border border-purple-200 items-center justify-center transition-all cursor-pointer shrink-0 self-start mt-0.5 ml-2 shadow-2xs"
            title="View Quizzes"
          >
            <ChevronRight
              size={13}
              className="2xl:w-4 2xl:h-4"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Card 4: PENDING TASKS (Amber / Orange) */}
        <div
          onClick={() => navigate("/my-assignments")}
          className="bg-gradient-to-br from-amber-50/95 via-[#fff3e6] to-[#fed7aa]/70 border border-amber-200/90 hover:border-amber-300 rounded-2xl p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_14px_rgba(234,88,12,0.06)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-amber-100 text-[#ea580c] border border-amber-200/80 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Bell size={18} className="sm:hidden" strokeWidth={2.2} />
              <Bell
                size={21}
                className="hidden sm:block 2xl:w-6 2xl:h-6"
                strokeWidth={2.2}
              />
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-extrabold uppercase tracking-wider text-[#ea580c] block leading-tight">
                PENDING TASKS
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-black text-[#431407] mt-0.5 sm:mt-1 leading-none tracking-tight">
                7
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-amber-900/70 font-semibold mt-0.5 sm:mt-1 truncate">
                Assignments & Exams
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/my-assignments");
            }}
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-amber-100/90 group-hover:bg-[#ea580c] text-[#ea580c] group-hover:text-white border border-amber-200 items-center justify-center transition-all cursor-pointer shrink-0 self-start mt-0.5 ml-2 shadow-2xs"
            title="View Deadlines & Assignments"
          >
            <ChevronRight
              size={13}
              className="2xl:w-4 2xl:h-4"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      {/* 2B. PHOTO & VIDEO LIBRARY (MATCHING PHOTO-LIB.png) */}
      {/* <PhotoVideoLibraryHub /> */}

      {/* 3. TWO-COLUMN MAIN WORKSPACE          */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* LEFT COLUMN: ~58% (lg:col-span-7)                           */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Outer White Card Container with Soft Elevation */}
          <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-5 sm:p-6 lg:p-7 space-y-6">
            {/* Header: Pure White elements with soft drop shadow */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-white text-[#2563eb] flex items-center justify-center shrink-0 border border-slate-100 shadow-[0_2px_10px_rgba(37,99,235,0.08)]">
                  <Play size={15} className="fill-[#2563eb] ml-0.5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Continue Learning
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate("/enrolled-courses")}
                className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>View All Courses</span>
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Main Grid: On wide 2xl: screens Left Column (Image + Ring Chart) sits beside Right Column. On laptops/tablets/mobile (<2xl, e.g. 1024-1440px and below), Thumbnail and Ring Chart sit side-by-side on sm:, and analytics/controls span full width below */}
            <div className="grid grid-cols-1 2xl:grid-cols-[auto_1fr] gap-6 2xl:gap-8 items-start">
              {/* LEFT COLUMN: Thumbnail + Detailed Segmented Circle Graph (styled like lms.png) */}
              <div className="flex flex-col sm:flex-row 2xl:flex-col items-center sm:items-stretch gap-4 shrink-0 w-full 2xl:w-auto">
                {/* Thumbnail with raised white card shadow */}
                <div className="w-full sm:w-1/2 2xl:w-auto rounded-2xl p-1 bg-white border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] shrink-0 flex items-center justify-center overflow-hidden min-h-[160px] sm:min-h-[220px] 2xl:min-h-0">
                  <img
                    src={continueLearningLaptopImg}
                    alt="Lesson Preview"
                    className="w-full h-44 sm:h-full 2xl:w-44 2xl:h-32 rounded-xl object-cover"
                  />
                </div>

                {/* Segmented Ring Chart (styled like lms.png) with Center Analytics & Legend */}
                <div className="bg-[#f8fafd] border border-slate-100/90 p-4 flex flex-col items-center justify-center w-full sm:w-1/2 2xl:w-[225px] shrink-0 rounded-2xl">
                  {/* Circular Ring Chart */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 2xl:w-40 2xl:h-40 flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 110 110"
                    >
                      {/* Track Background */}
                      <circle
                        cx="55"
                        cy="55"
                        r="44"
                        className="text-slate-100"
                        strokeWidth="9"
                        stroke="currentColor"
                        fill="none"
                      />
                      {/* Segment 1: Completed Modules (50% of course) */}
                      <circle
                        cx="55"
                        cy="55"
                        r="44"
                        className="text-[#2563eb]"
                        strokeWidth="9"
                        strokeDasharray="124.2 276.46"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                      />
                      {/* Segment 2: Current In-Progress (15% of course) -> 50% + 15% = 65% Completed */}
                      <circle
                        cx="55"
                        cy="55"
                        r="44"
                        className="text-[#06b6d4]"
                        strokeWidth="9"
                        strokeDasharray="27.5 276.46"
                        strokeDashoffset="-138.2"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                      />
                      {/* Segment 3: Remaining Modules (35% of course) */}
                      <circle
                        cx="55"
                        cy="55"
                        r="44"
                        className="text-slate-300"
                        strokeWidth="9"
                        strokeDasharray="82.8 276.46"
                        strokeDashoffset="-179.7"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                      />
                    </svg>

                    {/* Center Ring Info (matching lms.png layout) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                        Progress
                      </span>
                      <span className="text-2xl sm:text-[26px] 2xl:text-[28px] font-black text-[#0c1e3d] leading-none mt-1">
                        65%
                      </span>
                      <span className="text-[9.5px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100/80 px-2 py-0.5 rounded-full mt-1 leading-none">
                        On Track
                      </span>
                    </div>
                  </div>

                  {/* Legend items styled like lms.png */}
                  <div className="w-full mt-3 pt-3 border-t border-slate-200/70 space-y-1.5 text-[11px] font-medium text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                        Completed
                      </span>
                      <strong className="text-slate-900 font-bold">
                        150m (50%)
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                        Current Module
                      </span>
                      <strong className="text-slate-900 font-bold">
                        45m (15%)
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        Remaining
                      </span>
                      <strong className="text-slate-900 font-bold">
                        105m (35%)
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Info + Progress Bar + Comparative Learning Analytics + Controls */}
              <div className="flex flex-col justify-between h-full gap-5 sm:gap-6 min-w-0">
                {/* Title & SEO Pill Tags */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
                    MODULE 2 OF 4
                  </span>
                  <h4
                    onClick={() => navigate("/lesson-player?courseId=course-8")}
                    className="text-base sm:text-lg lg:text-xl font-extrabold text-[#0c1e3d] leading-snug hover:text-[#2563eb] transition-colors cursor-pointer"
                  >
                    Lesson 2.2: Schema Markup & Structured Data Implementation
                  </h4>

                  {/* White Badge Pills with subtle shadow */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-xs font-medium text-slate-600">
                      <span>SEO</span>
                      <span className="text-slate-300">•</span>
                      <span>Technical Optimization</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar (Width restricted on wide screens, white track with inset shadow) */}
                <div className="w-full flex items-center gap-4">
                  <div className="flex-1 max-w-2xl h-2.5 bg-white border border-slate-100 shadow-inner rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563eb] rounded-full w-[65%] transition-all duration-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 tabular-nums shrink-0">
                    65%
                  </span>
                </div>

                {/* Comparative Learning Analytics Panel */}
                <div className="bg-[#f8fafd] border border-slate-100 p-3.5 sm:p-4 space-y-3">
                  {/* Goal Encouragement Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0">
                        <Sparkles size={13} className="fill-[#2563eb]" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        Just{" "}
                        <strong className="text-[#2563eb]">105 mins</strong>{" "}
                        remain! Completed{" "}
                        <strong className="text-[#2563eb]">65%</strong> to
                        achieve your goal
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full self-start sm:self-auto whitespace-nowrap">
                      Yay, 195 mins watched!
                    </span>
                  </div>

                  {/* 3-Column Comparative Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Metric 1: 65% Completed vs 35% Remaining */}
                    <div className="bg-white p-2.5 sm:p-3 border border-slate-100 shadow-2xs space-y-1 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Completion Status
                      </span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                        <strong className="text-sm sm:text-base font-black text-[#2563eb]">
                          65%
                        </strong>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Done
                        </span>
                        <span className="text-[10px] text-slate-300 mx-0.5">
                          •
                        </span>
                        <span className="text-[11px] text-slate-600 font-bold whitespace-nowrap">
                          35% Left
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 font-medium">
                        195m of 300m watched
                      </p>
                    </div>

                    {/* Metric 2: Current on 2nd Module, Lesson 2.2 */}
                    <div className="bg-white p-2.5 sm:p-3 border border-slate-100 shadow-2xs space-y-1 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Current Position
                      </span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                        <strong className="text-sm sm:text-base font-black text-[#0c1e3d]">
                          Module 2
                        </strong>
                        <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap">
                          • Lesson 2.2
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 font-medium">
                        Schema Markup & Data
                      </p>
                    </div>

                    {/* Metric 3: 2 Modules Remain */}
                    <div className="bg-white p-2.5 sm:p-3 border border-slate-100 shadow-2xs space-y-1 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Modules Remaining
                      </span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                        <strong className="text-sm sm:text-base font-black text-purple-600">
                          2 Modules
                        </strong>
                        <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap">
                          remain
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 font-medium">
                        Modules 3 & 4 (Advanced)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Controls Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  {/* Next Lesson Box: All White with clean card shadow */}
                  <div
                    onClick={() => navigate("/lesson-player?courseId=course-8")}
                    className="flex-1 min-w-0 bg-white hover:bg-slate-50/40 border border-slate-100/80 rounded-xl px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(37,99,235,0.08)] text-[#2563eb] flex items-center justify-center shrink-0">
                        <Calendar size={15} />
                      </div>
                      <div className="min-w-0 truncate">
                        <span className="text-[11px] text-slate-400 font-medium block leading-tight">
                          Next Lesson
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 block truncate">
                          Structured Data Types
                        </span>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-100 shadow-xs text-blue-600 flex items-center justify-center shrink-0">
                      <ChevronRight size={13} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Resume Lesson Button */}
                  <button
                    type="button"
                    onClick={() => navigate("/lesson-player?courseId=course-8")}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-6 py-3.5 rounded transition-all shadow-[0_4px_18px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.45)] flex items-center justify-center gap-2.5 text-xs sm:text-sm shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    <Play size={13} className="fill-white" />
                    <span>Resume Lesson</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* RIGHT COLUMN: ~42% (lg:col-span-5)                          */}
        {/* ----------------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          {/* ========================================================= */}
          {/* R1: NOTIFICATIONS & DEADLINES HUB                         */}
          {/* (Matches Continue Learning container elevation & style)   */}
          {/* ========================================================= */}
          <div className="w-full bg-white border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-5 sm:p-6 lg:p-7 space-y-5">
            {/* Header: Pure White elements with soft drop shadow like Continue Learning */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* 1. Icon is BLUE in pure white raised box matching Continue Learning */}
                <div className="w-9 h-9 rounded bg-white text-[#2563eb] flex items-center justify-center shrink-0 border border-slate-100 shadow-[0_2px_10px_rgba(37,99,235,0.08)] relative">
                  <Bell size={16} className="text-[#2563eb]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#2563eb] rounded-full ring-2 ring-white animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      Notifications & Deadlines
                    </h3>
                    {/* 2. 6 action items is NOT rounded-full, but rounded like Resume Lesson btn */}
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-bold bg-blue-50 text-[#2563eb] border border-blue-200/80 shrink-0">
                      6 Action Items
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Submission deadlines, pending tasks & payment schedules
                  </p>
                </div>
              </div>
            </div>

            {/* Listed Notifications - Compact Height, White Card Body, Colored Side Section & Solid Badges */}
            <div className="space-y-2">
              {NOTIFICATIONS_LIST.map((item) => {
                const handleClick = () => {
                  if (item.actionType === "open_assignments_modal") {
                    setIsAssignmentsModalOpen(true);
                  } else if (item.actionType === "open_payment_modal") {
                    setIsPaymentModalOpen(true);
                  } else if (item.link) {
                    navigate(item.link);
                  }
                };

                // Styling logic:
                // 3. For all list: outer card background is strictly WHITE, border is subtle slate neutral
                // 4. Exam is GREEN
                // 5. Due Today is RED, other pendings (Assignments 6) is PURPLE (previous exams color)
                // 6. Quizzes is BLUE
                // Payment is AMBER/YELLOW
                let stripBg = "bg-red-50 text-red-600 border-red-500";
                let badgeBg = "bg-red-600 text-white";
                let clockColor = "text-red-500";
                let btnHover =
                  "group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600";
                let stripIcon = (
                  <Flame size={15} className="text-red-600 animate-pulse" />
                );
                let stripText = "TODAY";

                if (item.severity === "pending_group") {
                  // Purple (previous exam color) for other pendings
                  stripBg = "bg-purple-50 text-purple-700 border-purple-500";
                  badgeBg = "bg-purple-600 text-white";
                  clockColor = "text-purple-500";
                  btnHover =
                    "group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600";
                  stripIcon = (
                    <AlertTriangle size={15} className="text-purple-600" />
                  );
                  stripText = "6 TASKS";
                } else if (item.severity === "payment") {
                  // Amber / Yellow for payment due
                  stripBg = "bg-amber-50 text-amber-800 border-amber-500";
                  badgeBg = "bg-amber-500 text-white";
                  clockColor = "text-amber-500";
                  btnHover =
                    "group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500";
                  stripIcon = (
                    <CreditCard size={15} className="text-amber-700" />
                  );
                  stripText = "7d LEFT";
                } else if (item.severity === "quiz") {
                  // Blue for quiz
                  stripBg = "bg-blue-50 text-blue-600 border-blue-500";
                  badgeBg = "bg-blue-600 text-white";
                  clockColor = "text-blue-500";
                  btnHover =
                    "group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600";
                  stripIcon = <BookCheck size={15} className="text-blue-600" />;
                  stripText = "5d LEFT";
                } else if (item.severity === "exam") {
                  // Green for exam
                  stripBg = "bg-emerald-50 text-emerald-700 border-emerald-500";
                  badgeBg = "bg-emerald-600 text-white";
                  clockColor = "text-emerald-500";
                  btnHover =
                    "group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600";
                  stripIcon = <Award size={15} className="text-emerald-600" />;
                  stripText = "EXAM";
                }

                return (
                  <div
                    key={item.id}
                    onClick={handleClick}
                    className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl overflow-hidden flex items-stretch cursor-pointer group shadow-2xs hover:shadow-xs transition-all duration-150"
                  >
                    {/* Left Full-Height Strip: Colored side section */}
                    <div
                      className={`self-stretch flex flex-col items-center justify-center px-2 sm:px-2.5 text-center shrink-0 min-w-[50px] sm:min-w-[56px] border-l-4 ${stripBg}`}
                    >
                      {stripIcon}
                      <span className="text-[9px] font-black uppercase tracking-tight leading-none mt-0.5">
                        {stripText}
                      </span>
                    </div>

                    {/* Content Section: White background, normal dark text, compact height */}
                    <div className="flex-1 min-w-0 py-2 sm:py-2.5 px-3 flex items-center justify-between gap-2.5">
                      <div className="min-w-0 space-y-0.5">
                        {/* Badges line: Solid color bg with white text */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-bold leading-none shadow-2xs ${badgeBg}`}
                          >
                            {item.badgeText}
                          </span>
                          <span className="text-[10.5px] text-slate-500 font-medium truncate">
                            {item.course}
                          </span>
                        </div>

                        {/* Title: Clean dark text */}
                        <h5 className="font-bold text-xs sm:text-[13px] text-slate-900 group-hover:text-blue-600 transition-colors truncate leading-tight">
                          {item.title}
                        </h5>

                        {/* Due date line: Compact */}
                        <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 font-medium pt-0.5">
                          <Clock size={11} className={clockColor} />
                          <span>{item.dueDate}</span>
                        </div>
                      </div>

                      {/* Right Action Button */}
                      <div className="shrink-0 flex items-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold border border-slate-200/90 bg-slate-50 text-slate-700 shadow-2xs transition-all ${btnHover}`}
                        >
                          <span>{item.btnText}</span>
                          {item.actionType ? (
                            <ExternalLink size={11} />
                          ) : (
                            <ChevronRight size={12} strokeWidth={2.5} />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Summary Bar */}
            <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600">
              <AlertTriangle size={14} className="text-amber-500 shrink-0" />
              <span className="font-semibold text-slate-700">
                <strong className="text-slate-900">1 Overdue</strong> • 1 Due
                Today • 1 Fee Notice
              </span>
            </div>
          </div>

          {/* R2: Milestone Banner */}
          <div className="bg-gradient-to-r from-sky-50/80 via-blue-50/60 to-indigo-50/50 border border-sky-100/80 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden flex items-center justify-between gap-4">
            <div className="space-y-1.5 z-10 max-w-[240px] 2xl:max-w-[280px]">
              <h4 className="text-sm sm:text-base 2xl:text-lg font-black text-slate-900 leading-snug">
                You're on the right path!
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Every lesson brings you closer to your goals. Keep going!
              </p>
              <div className="pt-0.5">
                <span className="text-blue-600 font-black text-2xl inline-block -rotate-12">
                  ⤴
                </span>
              </div>
            </div>

            {/* Mountain Peak Artwork */}
            <div className="relative w-28 h-24 sm:w-32 sm:h-28 shrink-0 flex items-end justify-center pointer-events-none">
              <svg
                viewBox="0 0 120 100"
                className="w-full h-full drop-shadow-xs"
              >
                <polygon
                  points="10,100 45,35 75,100"
                  fill="#93c5fd"
                  opacity="0.6"
                />
                <polygon
                  points="50,100 85,25 115,100"
                  fill="#60a5fa"
                  opacity="0.7"
                />
                <polygon points="30,100 70,18 105,100" fill="#2563eb" />
                <polygon
                  points="63,33 70,18 77,33 73,30 67,34"
                  fill="#ffffff"
                />
                <line
                  x1="70"
                  y1="18"
                  x2="70"
                  y2="4"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <polygon points="70,4 85,9 70,14" fill="#1d4ed8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* POPUP MODAL 1: PENDING & OVERDUE ASSIGNMENTS (6)              */}
      {/* ------------------------------------------------------------- */}
      {isAssignmentsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    Assignments (6)
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                      1 Overdue • 5 Pending
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Click any assignment below to directly open its submission
                    form
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAssignmentsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Overdue Warning Alert Strip */}
            <div className="bg-red-50 border-b border-red-100 px-4 py-2.5 flex items-center justify-between text-xs text-red-800">
              <div className="flex items-center gap-2">
                <Flame
                  size={14}
                  className="text-red-600 shrink-0 animate-pulse"
                />
                <span className="font-semibold">
                  <strong>Due date gone for 1 assignment!</strong> Submit
                  immediately to prevent grade penalty.
                </span>
              </div>
            </div>

            {/* Modal Body: List of 6 Pending & Overdue Assignments */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
              {PENDING_ASSIGNMENTS_MODAL_LIST.map((assign) => {
                const isOverdue =
                  assign.status === "overdue" || assign.daysLeft < 0;
                const isUrgent = assign.daysLeft > 0 && assign.daysLeft <= 2;
                const isYellow = assign.daysLeft > 2 && assign.daysLeft <= 7;

                return (
                  <div
                    key={assign.id}
                    onClick={() => {
                      setIsAssignmentsModalOpen(false);
                      navigate(`/my-assignments?id=${assign.id}`);
                    }}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer group flex items-start justify-between gap-3 shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${
                      isOverdue
                        ? "border-red-300 bg-red-50/40 hover:bg-red-50/80"
                        : isUrgent
                          ? "border-rose-200 bg-rose-50/30 hover:bg-rose-50/70"
                          : isYellow
                            ? "border-amber-200 bg-amber-50/30 hover:bg-amber-50/70"
                            : "border-slate-200 bg-white hover:bg-blue-50/30 hover:border-blue-300"
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                            isOverdue
                              ? "bg-red-100 text-red-800 border-red-300"
                              : isUrgent
                                ? "bg-rose-100 text-rose-800 border-rose-200"
                                : isYellow
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {assign.badgeText}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium truncate">
                          {assign.course}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                        {assign.title}
                      </h4>

                      <p className="text-[11.5px] text-slate-500 line-clamp-1">
                        {assign.instructions}
                      </p>

                      <div className="flex items-center gap-2 text-[11px] font-semibold pt-0.5">
                        <Clock
                          size={12}
                          className={
                            isOverdue
                              ? "text-red-600"
                              : isUrgent
                                ? "text-rose-600"
                                : isYellow
                                  ? "text-amber-600"
                                  : "text-slate-400"
                          }
                        />
                        <span
                          className={
                            isOverdue
                              ? "text-red-700 font-bold"
                              : isUrgent
                                ? "text-rose-700 font-bold"
                                : isYellow
                                  ? "text-amber-700 font-bold"
                                  : "text-slate-600"
                          }
                        >
                          {assign.dueDate}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center self-center">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 shadow-2xs transition-all ${
                          isOverdue
                            ? "bg-red-600 text-white border-red-600 group-hover:bg-red-700"
                            : isUrgent
                              ? "bg-rose-600 text-white border-rose-600 group-hover:bg-rose-700"
                              : "bg-white text-blue-700 border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                        }`}
                      >
                        Submit <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAssignmentsModalOpen(false);
                  navigate("/my-assignments");
                }}
                className="text-xs font-bold text-[#2563eb] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Go to Full Assignments Hub</span>
                <ArrowRight size={12} />
              </button>
              <button
                type="button"
                onClick={() => setIsAssignmentsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* POPUP MODAL 2: PAYMENT DUE (7 DAYS NOTICE)                    */}
      {/* ------------------------------------------------------------- */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-amber-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg">
                    Fee Installment Due
                  </h3>
                  <p className="text-xs text-amber-800 font-semibold">
                    7 Days Remaining • Due Oct 14, 2026
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              {/* Amount Highlight Card */}
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white border border-amber-200 rounded-xl p-4 text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                  Outstanding Installment
                </span>
                <div className="text-3xl font-black text-slate-900">
                  ₹12,500
                </div>
                <span className="inline-block text-[10.5px] font-bold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Term 3 Tuition Fee • 3 of 4 Installments
                </span>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-1.5 bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">
                    Student Name:
                  </span>
                  <strong className="text-slate-900 font-bold">
                    {currentUser.name || "Hiteshpuri Goswami"}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">
                    Admission ID:
                  </span>
                  <strong className="text-slate-900 font-bold">
                    {crmProfile.admissionNo || "OMC-0266"}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Course:</span>
                  <span className="text-slate-800 font-semibold">
                    {crmProfile.course || "Diploma in Digital Marketing"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">
                    Payment Due Date:
                  </span>
                  <strong className="text-red-700 font-bold">
                    October 14, 2026
                  </strong>
                </div>
              </div>

              {/* Remind Me Later Options (2 to 5 Days) */}
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock size={13} className="text-amber-700" />
                    <span>Remind Me Later Options:</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                    2 to 5 Days
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {REMINDER_OPTIONS.map((opt) => {
                    const isSelected = selectedReminderDays === opt.days;
                    return (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => setSelectedReminderDays(opt.days)}
                        className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          isSelected
                            ? "bg-amber-500 border-amber-600 text-slate-950 font-black shadow-xs ring-2 ring-amber-300"
                            : "bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50 font-bold"
                        }`}
                      >
                        <span className="text-xs leading-none">
                          {opt.days} Days
                        </span>
                        <span
                          className={`text-[9.5px] leading-tight ${
                            isSelected
                              ? "text-slate-950 font-extrabold"
                              : "text-slate-400 font-medium"
                          }`}
                        >
                          {opt.date.split(",")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[10.5px] text-amber-800 font-medium leading-tight text-center pt-0.5">
                  {
                    REMINDER_OPTIONS.find(
                      (o) => o.days === selectedReminderDays,
                    )?.desc
                  }
                </p>
              </div>

              {/* Advisory note */}
              <p className="text-[11px] text-slate-500 leading-relaxed bg-blue-50/60 border border-blue-100 rounded-lg p-2 text-center">
                Payment can be made online via UPI/Netbanking or directly at the{" "}
                <strong>{crmProfile.branch || "Borivali Center"}</strong>{" "}
                accounts desk.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 relative">
              {/* Remind Me Later Split / Dropdown Button */}
              <div className="relative">
                <div className="inline-flex rounded-xl shadow-2xs border border-slate-300 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      const cur =
                        REMINDER_OPTIONS.find(
                          (o) => o.days === selectedReminderDays,
                        ) || REMINDER_OPTIONS[1];
                      handleSetReminder(cur.days, cur.date);
                    }}
                    className="px-3 sm:px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    title={`Snooze for ${selectedReminderDays} days`}
                  >
                    <Clock size={13} className="text-amber-600" />
                    <span>Remind in {selectedReminderDays}d</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRemindDropdownOpen((prev) => !prev)}
                    className="px-2 py-2 border-l border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Choose reminder days (2-5 days)"
                  >
                    <ChevronDown size={13} />
                  </button>
                </div>

                {/* Popover Dropdown for 2-5 Days */}
                {isRemindDropdownOpen && (
                  <div className="absolute left-0 bottom-full mb-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                      Choose Snooze Duration
                    </div>
                    {REMINDER_OPTIONS.map((opt) => (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => handleSetReminder(opt.days, opt.date)}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-amber-50 transition-colors cursor-pointer ${
                          selectedReminderDays === opt.days
                            ? "bg-amber-50/80 font-black text-amber-900"
                            : "text-slate-700 font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>
                            In {opt.days} Days ({opt.date.split(",")[0]})
                          </span>
                        </div>
                        {selectedReminderDays === opt.days && (
                          <Check size={13} className="text-amber-700" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                onClick={() => {
                  alert(
                    "Redirecting to Razorpay / UPI Secure Payment Gateway (Demo)...",
                  );
                  setIsPaymentModalOpen(false);
                }}
                className="px-4 sm:px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <CreditCard size={14} />
                <span>Pay ₹12,500 Online</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboardHub;
