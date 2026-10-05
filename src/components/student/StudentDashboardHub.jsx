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
import dashboardHatImg from "../../assets/header-bg/dashboard-hat.png";
import continueLearningLaptopImg from "../../assets/continue-learning-laptop.png";

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
      {/* 1. HERO WELCOME BANNER            */}
      <div
        className="relative bg-cover bg-center border border-blue-100/70 p-4 sm:p-5 md:p-5 lg:p-7 2xl:p-9 3xl:p-10 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 lg:gap-6 2xl:gap-8 overflow-hidden"
        style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
      >
        {/* Left: Avatar + Details */}
        <div className="relative z-10 flex items-center space-x-3 sm:space-x-4 md:space-x-3.5 lg:space-x-5 2xl:space-x-7 min-w-0 flex-1">
          {/* User Avatar Image - Keeps its rounded-full shape */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44 3xl:w-48 3xl:h-48 rounded-full border-3 2xl:border-4 3xl:border-[5px] border-white shadow-md 2xl:shadow-xl ring-2 2xl:ring-4 ring-blue-100/90 p-1 sm:p-1.5 lg:p-2 transition-all">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                <img
                  src={currentUser.avatar || "/student_photo_265.jpg"}
                  alt={currentUser.name || "Hiteshpuri Goswami"}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-0.5 md:space-y-1 2xl:space-y-2">
            <span className="text-[10px] sm:text-[11px] lg:text-xs 3xl:text-sm font-bold uppercase tracking-widest text-slate-500/90 block">
              WELCOME BACK,
            </span>
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-3xl 2xl:text-4xl 3xl:text-[42px] font-black text-[#0c1e3d] tracking-tight leading-tight flex items-center gap-1 lg:gap-1.5 2xl:gap-2.5">
              <span className="truncate">
                {currentUser.name || "Hiteshpuri Goswami"}!
              </span>
            </h1>
            <p className="text-xs lg:text-sm 2xl:text-base 3xl:text-lg text-slate-600 font-medium 2xl:font-semibold truncate">
              {crmProfile.course || "Diploma in Digital Marketing"}
            </p>

            {/* 2 White Pills: Student ID & Center */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-2.5 2xl:gap-3.5 pt-0.5 md:pt-1 2xl:pt-2">
              <div className="bg-white/95 border border-slate-200/80 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 2xl:px-4.5 2xl:py-1.5 3xl:px-5 3xl:py-2 text-[10px] sm:text-xs 2xl:text-sm 3xl:text-base text-slate-700 font-medium flex items-center space-x-1 sm:space-x-1.5 2xl:space-x-2 shadow-2xs whitespace-nowrap">
                <Calendar
                  size={12}
                  className="text-[#2563eb] lg:w-3.5 lg:h-3.5 2xl:w-4 2xl:h-4"
                />
                <span>
                  ID:{" "}
                  <strong className="text-slate-900 font-bold">
                    {crmProfile.admissionNo || "OMC-0266"}
                  </strong>
                </span>
              </div>
              <div className="bg-white/95 border border-slate-200/80 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 2xl:px-4.5 2xl:py-1.5 3xl:px-5 3xl:py-2 text-[10px] sm:text-xs 2xl:text-sm 3xl:text-base text-slate-700 font-medium flex items-center space-x-1 sm:space-x-1.5 2xl:space-x-2 shadow-2xs whitespace-nowrap">
                <MapPin
                  size={12}
                  className="text-[#2563eb] lg:w-3.5 lg:h-3.5 2xl:w-4 2xl:h-4"
                />
                <span>
                  <strong className="text-slate-900 font-bold">
                    {crmProfile.branch || "Borivali Center"}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Soft Glass Promo Box with 3D Books & Cap */}
        <div className="hidden md:flex relative z-10 bg-white/75 backdrop-blur-md border border-white/80 rounded 2xl:rounded-3xl p-2.5 md:p-3 lg:p-4.5 2xl:p-6 3xl:p-7 items-center justify-between shadow-xs md:w-[220px] lg:w-[340px] xl:w-[380px] 2xl:w-[450px] 3xl:w-[500px] shrink-0">
          <div className="space-y-0.5 md:space-y-1 2xl:space-y-1.5 md:max-w-[115px] lg:max-w-[180px] 2xl:max-w-[240px] 3xl:max-w-[270px]">
            <div className="flex items-center space-x-1 text-[#2563eb]">
              <Sparkles
                size={13}
                className="lg:w-3.5 lg:h-3.5 2xl:w-4.5 2xl:h-4.5"
              />
            </div>
            <p className="text-[11px] md:text-[11px] lg:text-sm 2xl:text-base 3xl:text-lg font-bold 2xl:font-extrabold text-[#1e3a8a] leading-tight md:leading-snug tracking-tight">
              Small steps today, big achievements tomorrow!
            </p>
          </div>

          {/* 3D Stack of books with graduation cap image */}
          <div className="relative md:w-16 md:h-14 lg:w-26 lg:h-22 xl:w-28 xl:h-24 2xl:w-36 2xl:h-30 3xl:w-44 3xl:h-36 flex items-center justify-center shrink-0">
            <img
              src={dashboardHatImg}
              alt="Graduation Cap and Books"
              className="w-full h-full object-contain drop-shadow-md 2xl:drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 2xl:gap-5 3xl:gap-6">
        {/* Card 1: OVERALL PROGRESS */}
        <div className="bg-gradient-to-br from-white to-[#f5f9ff] border border-[#dbeafe] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(37,99,235,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
          <div className="flex items-center space-x-3.5 2xl:space-x-4">
            <div className="w-12 h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
              <div className="relative w-8 h-8 2xl:w-9 2xl:h-9 flex items-center justify-center">
                <svg
                  className="w-8 h-8 2xl:w-9 2xl:h-9 -rotate-90"
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

            <div>
              <span className="text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#3b82f6] block">
                OVERALL PROGRESS
              </span>
              <h3 className="text-2xl sm:text-[28px] 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-1 leading-none tracking-tight">
                65%
              </h3>
              <p className="text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-1">
                Keep going! You're doing great!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/enrolled-courses")}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#eff6ff] hover:bg-blue-100 text-[#3b82f6] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
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
        <div className="bg-gradient-to-br from-white to-[#f2faf7] border border-[#ccfbf1] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(13,148,136,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
          <div className="flex items-center space-x-3.5 2xl:space-x-4">
            <div className="w-12 h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#e6fbf4] text-[#0d9488] flex items-center justify-center shrink-0">
              <BookOpen size={21} className="2xl:w-6 2xl:h-6" strokeWidth={2} />
            </div>

            <div>
              <span className="text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#0d9488] block">
                COURSES
              </span>
              <h3 className="text-2xl sm:text-[28px] 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-1 leading-none tracking-tight">
                4
              </h3>
              <p className="text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-1">
                Enrolled Courses
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/enrolled-courses")}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#e6fbf4] hover:bg-teal-100 text-[#0d9488] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
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
        <div className="bg-gradient-to-br from-white to-[#faf8ff] border border-[#ede9fe] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(124,58,237,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
          <div className="flex items-center space-x-3.5 2xl:space-x-4">
            <div className="w-12 h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#f5f3ff] text-[#7c3aed] flex items-center justify-center shrink-0">
              <Trophy size={21} className="2xl:w-6 2xl:h-6" strokeWidth={2} />
            </div>

            <div>
              <span className="text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#7c3aed] block">
                QUIZ SCORE
              </span>
              <h3 className="text-2xl sm:text-[28px] 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-1 leading-none tracking-tight">
                88.5%
              </h3>
              <p className="text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-1">
                Average Score
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/my-quizzes")}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#f5f3ff] hover:bg-purple-100 text-[#7c3aed] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
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
        <div className="bg-gradient-to-br from-white to-[#fff8f3] border border-[#fed7aa] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(234,88,12,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
          <div className="flex items-center space-x-3.5 2xl:space-x-4">
            <div className="w-12 h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0">
              <Calendar size={21} className="2xl:w-6 2xl:h-6" strokeWidth={2} />
            </div>

            <div>
              <span className="text-[11px] 2xl:text-xs 3xl:text-[13px] font-bold uppercase tracking-wider text-[#ea580c] block">
                UPCOMING
              </span>
              <h3 className="text-2xl sm:text-[28px] 2xl:text-[32px] 3xl:text-[36px] font-extrabold text-[#010f58] mt-1 leading-none tracking-tight">
                2
              </h3>
              <p className="text-[11.5px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-1">
                Today & Tomorrow
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/schedule")}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#fff7ed] hover:bg-orange-100 text-[#ea580c] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
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

            {/* Main Grid: Left Column (Image + Donut), Right Column (Details + Progress + Next Lesson + Button) */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 lg:gap-8 items-start">
              {/* LEFT COLUMN: Thumbnail + Donut Gauge */}
              <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 sm:gap-6 shrink-0">
                {/* Thumbnail with raised white card shadow */}
                <div className="rounded-2xl p-1 bg-white border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] shrink-0">
                  <img
                    src={continueLearningLaptopImg}
                    alt="Lesson Preview"
                    className="w-36 h-28 sm:w-44 sm:h-32 rounded-xl object-cover"
                  />
                </div>

                {/* 65% Donut Chart */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-blue-50"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#2563eb]"
                      strokeDasharray="65, 100"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-none">
                      65%
                    </span>
                    <span className="text-[9px] font-medium text-slate-400 mt-0.5">
                      Complete
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Info + Progress Bar + Bottom Controls */}
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

          {/* L2: Quick Actions (matching DASHBOARD.png) */}
          <div className="w-full bg-white border border-slate-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 lg:p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-0.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 shadow-xs">
                <Zap size={15} className="fill-[#2563eb]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Quick Actions
              </h3>
            </div>

            {/* Actions Grid: 1 col on mobile, 3 cols on tablet/desktop, bounded max width for 1875px */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 2xl:gap-5 w-full">
              {/* Action 1: Browse Courses */}
              <div
                onClick={() => navigate("/courses")}
                className="bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-blue-200/80 rounded p-3.5 sm:p-4 2xl:p-5 transition-all duration-200 shadow-[0_3px_14px_rgba(0,0,0,0.03)] hover:shadow-md cursor-pointer group flex items-center justify-between gap-3 min-w-0"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 rounded-xl bg-blue-50/80 text-[#2563eb] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <BookOpen size={18} className="2xl:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm 2xl:text-base text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      Browse Courses
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate mt-0.5">
                      Explore new courses
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563eb] group-hover:border-blue-100 flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={12} strokeWidth={2.5} />
                </div>
              </div>

              {/* Action 2: My Quizzes */}
              <div
                onClick={() => navigate("/my-quizzes")}
                className="bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-purple-200/80 rounded p-3.5 sm:p-4 2xl:p-5 transition-all duration-200 shadow-[0_3px_14px_rgba(0,0,0,0.03)] hover:shadow-md cursor-pointer group flex items-center justify-between gap-3 min-w-0"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 rounded-xl bg-purple-50/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <CheckSquare size={18} className="2xl:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm 2xl:text-base text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                      My Quizzes
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate mt-0.5">
                      Test your knowledge
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-100 flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={12} strokeWidth={2.5} />
                </div>
              </div>

              {/* Action 3: Assignments */}
              <div
                onClick={() => navigate("/my-assignments")}
                className="bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-emerald-200/80 rounded p-3.5 sm:p-4 2xl:p-5 transition-all duration-200 shadow-[0_3px_14px_rgba(0,0,0,0.03)] hover:shadow-md cursor-pointer group flex items-center justify-between gap-3 min-w-0 sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 rounded-xl bg-emerald-50/80 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <FileText size={18} className="2xl:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm 2xl:text-base text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                      Assignments
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate mt-0.5">
                      Submit & track
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 flex items-center justify-center transition-all shrink-0">
                  <ArrowRight size={12} strokeWidth={2.5} />
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
                className="p-3 sm:p-3.5 2xl:p-4 rounded border border-slate-100/80 bg-white hover:border-purple-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.08)] transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  {/* Purple Left Border Date Badge */}
                  <div className="bg-purple-50/70 text-purple-700 border-l-4 border-purple-500 rounded-xl py-2 px-3 text-center shrink-0 min-w-[50px] shadow-xs">
                    <span className="text-sm sm:text-base font-black leading-none block">
                      22
                    </span>
                    <span className="text-[9.5px] font-bold uppercase block mt-1 tracking-wide">
                      Apr
                    </span>
                  </div>

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
                </div>

                <div className="w-6 h-6 rounded-full bg-white border border-slate-100 shadow-xs text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-100 flex items-center justify-center shrink-0 transition-colors">
                  <ChevronRight size={13} strokeWidth={2.5} />
                </div>
              </div>

              {/* Item 2: SEO Assessment */}
              <div
                onClick={() => navigate("/my-quizzes")}
                className="p-3 sm:p-3.5 2xl:p-4 rounded border border-slate-100/80 bg-white hover:border-teal-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.08)] transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  {/* Teal Left Border Date Badge */}
                  <div className="bg-teal-50/70 text-teal-700 border-l-4 border-teal-500 rounded-xl py-2 px-3 text-center shrink-0 min-w-[50px] shadow-xs">
                    <span className="text-sm sm:text-base font-black leading-none block">
                      22
                    </span>
                    <span className="text-[9.5px] font-bold uppercase block mt-1 tracking-wide">
                      Apr
                    </span>
                  </div>

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
                </div>

                <div className="w-6 h-6 rounded-full bg-white border border-slate-100 shadow-xs text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-100 flex items-center justify-center shrink-0 transition-colors">
                  <ChevronRight size={13} strokeWidth={2.5} />
                </div>
              </div>

              {/* Item 3: Live Doubt Clearing */}
              <div
                onClick={() => navigate("/schedule")}
                className="p-3 sm:p-3.5 2xl:p-4 rounded border border-slate-100/80 bg-white hover:border-blue-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.08)] transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  {/* Blue Left Border Date Badge */}
                  <div className="bg-blue-50/70 text-[#2563eb] border-l-4 border-[#2563eb] rounded-xl py-2 px-3 text-center shrink-0 min-w-[50px] shadow-xs">
                    <span className="text-sm sm:text-base font-black leading-none block">
                      24
                    </span>
                    <span className="text-[9.5px] font-bold uppercase block mt-1 tracking-wide">
                      Apr
                    </span>
                  </div>

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
                </div>

                <div className="w-6 h-6 rounded-full bg-white border border-slate-100 shadow-xs text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563eb] group-hover:border-blue-100 flex items-center justify-center shrink-0 transition-colors">
                  <ChevronRight size={13} strokeWidth={2.5} />
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
