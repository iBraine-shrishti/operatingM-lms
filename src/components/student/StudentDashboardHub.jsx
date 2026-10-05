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
} from "lucide-react";
import dashboardHeaderBg from "../../assets/header-bg/dashboard-header.png";
// import dashboardHatImg from "../../assets/header-bg/dashboard-hat.png";
import continueLearningLaptopImg from "../../assets/continue-learning-laptop.png";
import profilePic from "../../assets/profile-pic.png";
import { PhotoVideoLibraryHub } from "./PhotoVideoLibraryHub";

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
                      src={currentUser.avatar || profilePic}
                      alt={currentUser.name || "Hiteshpuri Goswami"}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <div className="min-w-0 space-y-0.5 md:space-y-1 2xl:space-y-1.5">
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-widest text-slate-500/90 block">
                  WELCOME BACK,
                </span>
                <h1 className="text-base sm:text-xl md:text-2xl lg:text-[26px] 2xl:text-3xl font-black text-[#0c1e3d] tracking-tight leading-tight flex items-center gap-1.5">
                  <span className="truncate">
                    {currentUser.name || "Hiteshpuri Goswami"}!
                  </span>
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-sm 2xl:text-base text-slate-600 font-medium truncate">
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
            <div className="flex lg:hidden flex-col items-center gap-1.5 sm:gap-2 shrink-0 bg-white/85 backdrop-blur-xs p-1.5 sm:p-2 rounded-2xl border border-blue-100/80 shadow-xs">
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-blue-50 text-[#2563eb] border border-blue-100 shadow-2xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Browse Courses"
              >
                <BookOpen size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-quizzes")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-purple-50 text-purple-600 border border-purple-100 shadow-2xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="My Quizzes"
              >
                <CheckSquare size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-assignments")}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
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

          {/* Actions: 3 clean responsive items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full flex-1">
            {/* Action 1: Browse Courses */}
            <div
              onClick={() => navigate("/courses")}
              className="bg-[#f8fafd] hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200/80 rounded-xl p-3 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between gap-2 min-w-0"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#2563eb] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen size={16} />
                </div>
                <div className="w-5 h-5 rounded-full bg-white border border-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563eb] flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={11} strokeWidth={2.5} />
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs 2xl:text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  Browse Courses
                </h4>
                <p className="text-[10.5px] text-slate-400 font-medium truncate mt-0.5">
                  Explore new courses
                </p>
              </div>
            </div>

            {/* Action 2: My Quizzes */}
            <div
              onClick={() => navigate("/my-quizzes")}
              className="bg-[#f8fafd] hover:bg-purple-50/50 border border-slate-100 hover:border-purple-200/80 rounded-xl p-3 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between gap-2 min-w-0"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CheckSquare size={16} />
                </div>
                <div className="w-5 h-5 rounded-full bg-white border border-slate-100 text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={11} strokeWidth={2.5} />
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs 2xl:text-sm text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                  My Quizzes
                </h4>
                <p className="text-[10.5px] text-slate-400 font-medium truncate mt-0.5">
                  Test your knowledge
                </p>
              </div>
            </div>

            {/* Action 3: Assignments */}
            <div
              onClick={() => navigate("/my-assignments")}
              className="bg-[#f8fafd] hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200/80 rounded-xl p-3 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between gap-2 min-w-0"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText size={16} />
                </div>
                <div className="w-5 h-5 rounded-full bg-white border border-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={11} strokeWidth={2.5} />
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs 2xl:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                  Assignments
                </h4>
                <p className="text-[10.5px] text-slate-400 font-medium truncate mt-0.5">
                  Submit & track
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STAT CARDS: 2x2 THROUGHOUT on mobile & tablet, 4 in a row on xl: */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 2xl:gap-5 3xl:gap-6">
        {/* Card 1: OVERALL PROGRESS */}
        <div
          onClick={() => navigate("/enrolled-courses")}
          className="bg-gradient-to-br from-white to-[#f5f9ff] border border-[#dbeafe] p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(37,99,235,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
              <div className="relative w-6.5 h-6.5 sm:w-8 sm:h-8 2xl:w-9 2xl:h-9 flex items-center justify-center">
                <svg
                  className="w-6.5 h-6.5 sm:w-8 sm:h-8 2xl:w-9 2xl:h-9 -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-blue-100"
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
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#3b82f6] block leading-tight">
                OVERALL PROGRESS
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-0.5 sm:mt-1 leading-none tracking-tight">
                65%
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-0.5 sm:mt-1 truncate">
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
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#eff6ff] hover:bg-blue-100 text-[#3b82f6] items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Details"
          >
            <ChevronRight
              size={13}
              className="2xl:w-4 2xl:h-4"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Card 2: COURSES */}
        <div
          onClick={() => navigate("/enrolled-courses")}
          className="bg-gradient-to-br from-white to-[#f2faf7] border border-[#ccfbf1] p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(13,148,136,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#e6fbf4] text-[#0d9488] flex items-center justify-center shrink-0">
              <BookOpen size={18} className="sm:hidden" strokeWidth={2} />
              <BookOpen
                size={21}
                className="hidden sm:block 2xl:w-6 2xl:h-6"
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#0d9488] block leading-tight">
                COURSES
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-0.5 sm:mt-1 leading-none tracking-tight">
                4
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-0.5 sm:mt-1 truncate">
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
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#e6fbf4] hover:bg-teal-100 text-[#0d9488] items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Courses"
          >
            <ChevronRight
              size={13}
              className="2xl:w-4 2xl:h-4"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Card 3: QUIZ SCORE */}
        <div
          onClick={() => navigate("/my-quizzes")}
          className="bg-gradient-to-br from-white to-[#faf8ff] border border-[#ede9fe] p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(124,58,237,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#f5f3ff] text-[#7c3aed] flex items-center justify-center shrink-0">
              <Trophy size={18} className="sm:hidden" strokeWidth={2} />
              <Trophy
                size={21}
                className="hidden sm:block 2xl:w-6 2xl:h-6"
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#7c3aed] block leading-tight">
                QUIZ SCORE
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-0.5 sm:mt-1 leading-none tracking-tight">
                88.5%
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-0.5 sm:mt-1 truncate">
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
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#f5f3ff] hover:bg-purple-100 text-[#7c3aed] items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Quizzes"
          >
            <ChevronRight
              size={13}
              className="2xl:w-4 2xl:h-4"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Card 4: UPCOMING */}
        <div
          onClick={() => navigate("/schedule")}
          className="bg-gradient-to-br from-white to-[#fff8f3] border border-[#fed7aa] p-3 sm:p-4 lg:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(234,88,12,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between min-w-0 cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0">
              <Calendar size={18} className="sm:hidden" strokeWidth={2} />
              <Calendar
                size={21}
                className="hidden sm:block 2xl:w-6 2xl:h-6"
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#ea580c] block leading-tight">
                UPCOMING
              </span>
              <h3 className="text-xl sm:text-2xl 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-0.5 sm:mt-1 leading-none tracking-tight">
                2
              </h3>
              <p className="text-[10px] sm:text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-0.5 sm:mt-1 truncate">
                Today & Tomorrow
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/schedule");
            }}
            className="hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#fff7ed] hover:bg-orange-100 text-[#ea580c] items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Schedule"
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
      <PhotoVideoLibraryHub />

      {/* 3. TWO-COLUMN MAIN WORKSPACE          */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* LEFT COLUMN: ~58% (lg:col-span-7)                           */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Outer White Card Container with Soft Elevation */}
          <div className="w-full bg-white border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-5 sm:p-6 lg:p-7 space-y-6">
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
        <div className="lg:col-span-5 space-y-5 sm:space-y-6 w-full max-w-full 2xl:max-w-xl 3xl:max-w-2xl">
          {/* R1: Today / Upcoming Card */}
          <div className="bg-white border border-slate-100/90 shadow-[0_6px_25px_rgba(0,0,0,0.03)] p-4 sm:p-5 2xl:p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[#0c1e3d] flex items-center justify-center shrink-0">
                  <Calendar size={15} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Today / Upcoming
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate("/schedule")}
                className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View All</span>
                <ArrowRight size={12} strokeWidth={2.5} />
              </button>
            </div>

            {/* Schedule Items List */}
            <div className="space-y-3">
              {/* Item 1: Quiz */}
              <div
                onClick={() => navigate("/my-quizzes")}
                className="overflow-hidden border border-slate-100/80 bg-white hover:border-purple-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.08)] transition-all duration-200 flex items-stretch cursor-pointer group"
              >
                {/* Purple Left Full Height Date Badge */}
                <div className="self-stretch flex flex-col items-center justify-center bg-purple-50/70 text-purple-700 border-l-4 border-purple-500 px-3.5 sm:px-4 text-center shrink-0 min-w-[56px] sm:min-w-[62px]">
                  <span className="text-base sm:text-lg font-black leading-none block">
                    22
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-bold uppercase block mt-1 tracking-wide">
                    Apr
                  </span>
                </div>

                {/* Content: Spans + Arrow */}
                <div className="flex-1 min-w-0 p-3 sm:p-3.5 2xl:p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block leading-tight">
                      09:00 AM – 10:00 AM
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-purple-700 transition-colors truncate">
                      Digital Marketing Career Aptitude Quiz
                    </h5>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Quiz • 20 mins
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-white border border-slate-100 shadow-xs text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-100 flex items-center justify-center shrink-0 transition-colors">
                    <ChevronRight size={13} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Item 2: SEO Assessment */}
              <div
                onClick={() => navigate("/my-quizzes")}
                className="overflow-hidden border border-slate-100/80 bg-white hover:border-teal-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.08)] transition-all duration-200 flex items-stretch cursor-pointer group"
              >
                {/* Teal Left Full Height Date Badge */}
                <div className="self-stretch flex flex-col items-center justify-center bg-teal-50/70 text-teal-700 border-l-4 border-teal-500 px-3.5 sm:px-4 text-center shrink-0 min-w-[56px] sm:min-w-[62px]">
                  <span className="text-base sm:text-lg font-black leading-none block">
                    22
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-bold uppercase block mt-1 tracking-wide">
                    Apr
                  </span>
                </div>

                {/* Content: Spans + Arrow */}
                <div className="flex-1 min-w-0 p-3 sm:p-3.5 2xl:p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block leading-tight">
                      03:00 PM – 04:00 PM
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-teal-700 transition-colors truncate">
                      SEO Fundamentals & Keyword Strategy Assessment
                    </h5>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Test • 25 mins
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-white border border-slate-100 shadow-xs text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-100 flex items-center justify-center shrink-0 transition-colors">
                    <ChevronRight size={13} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Item 3: Live Doubt Clearing */}
              <div
                onClick={() => navigate("/schedule")}
                className="overflow-hidden border border-slate-100/80 bg-white hover:border-blue-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.08)] transition-all duration-200 flex items-stretch cursor-pointer group"
              >
                {/* Blue Left Full Height Date Badge */}
                <div className="self-stretch flex flex-col items-center justify-center bg-blue-50/70 text-[#2563eb] border-l-4 border-[#2563eb] px-3.5 sm:px-4 text-center shrink-0 min-w-[56px] sm:min-w-[62px]">
                  <span className="text-base sm:text-lg font-black leading-none block">
                    24
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-bold uppercase block mt-1 tracking-wide">
                    Apr
                  </span>
                </div>

                {/* Content: Spans + Arrow */}
                <div className="flex-1 min-w-0 p-3 sm:p-3.5 2xl:p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block leading-tight">
                      11:00 AM – 12:00 PM
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#2563eb] transition-colors truncate">
                      Live Doubt Clearing Session
                    </h5>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Live Session • 1 hr
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-white border border-slate-100 shadow-xs text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563eb] group-hover:border-blue-100 flex items-center justify-center shrink-0 transition-colors">
                    <ChevronRight size={13} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default StudentDashboardHub;
