import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Award, ArrowRight, Play, CheckCircle2, 
  GraduationCap, Clock, Sparkles, Calendar, CheckSquare, 
  ChevronRight, MapPin, Zap, FileText, Check, Trophy
} from 'lucide-react';
import dashboardHeaderBg from '../../assets/header-bg/dashboard-header.png';
import dashboardHatImg from '../../assets/header-bg/dashboard-hat.png';
import continueLearningLaptopImg from '../../assets/continue-learning-laptop.png';

export const StudentDashboardHub = ({
  currentUser = {},
  crmProfile = {},
  crmAttendance = {},
  crmBatch = {},
  crmCertificates = [],
  courses = [],
  quizzes = [],
  achievements = [],
  onUpdateCurrentUser
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* ============================================================== */}
      {/* 1. HERO WELCOME BANNER (MATCHING DASHBOARD.png)                */}
      {/* ============================================================== */}
      <div 
        className="relative bg-cover bg-center border border-blue-100/70 rounded-2xl sm:rounded-3xl 2xl:rounded-[32px] p-4 sm:p-5 md:p-5 lg:p-7 2xl:p-9 3xl:p-10 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 lg:gap-6 2xl:gap-8 overflow-hidden"
        style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
      >
        {/* Left: Avatar + Details */}
        <div className="relative z-10 flex items-center space-x-3 sm:space-x-4 md:space-x-3.5 lg:space-x-5 2xl:space-x-7 min-w-0 flex-1">
          {/* User Avatar Image - Scalable from mobile up to wide 1875px */}
          <div className="relative shrink-0">
            <div className="w-15 h-15 sm:w-18 sm:h-18 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-26 xl:h-26 2xl:w-32 2xl:h-32 3xl:w-36 3xl:h-36 rounded-full overflow-hidden border-3 2xl:border-4 3xl:border-[5px] border-white shadow-md 2xl:shadow-xl ring-2 2xl:ring-4 ring-blue-100/90 bg-slate-100 transition-all">
              <img
                src={currentUser.avatar || '/student_photo_265.jpg'}
                alt={currentUser.name || 'Hiteshpuri Goswami'}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-0.5 md:space-y-1 2xl:space-y-2">
            <span className="text-[10px] sm:text-[11px] lg:text-xs 3xl:text-sm font-bold uppercase tracking-widest text-slate-500/90 block">
              WELCOME BACK,
            </span>
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-3xl 2xl:text-4xl 3xl:text-[42px] font-black text-[#0c1e3d] tracking-tight leading-tight flex items-center gap-1 lg:gap-1.5 2xl:gap-2.5">
              <span className="truncate">{currentUser.name || 'Hiteshpuri Goswami'}!</span>
              <span className="text-lg lg:text-2xl 2xl:text-3xl 3xl:text-4xl">👋</span>
            </h1>
            <p className="text-xs lg:text-sm 2xl:text-base 3xl:text-lg text-slate-600 font-medium 2xl:font-semibold truncate">
              {crmProfile.course || 'Diploma in Digital Marketing'}
            </p>

            {/* 2 White Pills: Student ID & Center */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-2.5 2xl:gap-3.5 pt-0.5 md:pt-1 2xl:pt-2">
              <div className="bg-white/95 border border-slate-200/80 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 2xl:px-4.5 2xl:py-1.5 3xl:px-5 3xl:py-2 text-[10px] sm:text-xs 2xl:text-sm 3xl:text-base text-slate-700 font-medium flex items-center space-x-1 sm:space-x-1.5 2xl:space-x-2 shadow-2xs whitespace-nowrap">
                <Calendar size={12} className="text-[#2563eb] lg:w-3.5 lg:h-3.5 2xl:w-4 2xl:h-4" />
                <span>ID: <strong className="text-slate-900 font-bold">{crmProfile.admissionNo || 'OMC-0266'}</strong></span>
              </div>
              <div className="bg-white/95 border border-slate-200/80 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 2xl:px-4.5 2xl:py-1.5 3xl:px-5 3xl:py-2 text-[10px] sm:text-xs 2xl:text-sm 3xl:text-base text-slate-700 font-medium flex items-center space-x-1 sm:space-x-1.5 2xl:space-x-2 shadow-2xs whitespace-nowrap">
                <MapPin size={12} className="text-[#2563eb] lg:w-3.5 lg:h-3.5 2xl:w-4 2xl:h-4" />
                <span><strong className="text-slate-900 font-bold">{crmProfile.branch || 'Borivali Center'}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Soft Glass Promo Box with 3D Books & Cap */}
        {/* HIDDEN ON MOBILE (< 768px) to preserve screen space as requested */}
        {/* Fully size-responsive from tablet (md) up to wide 1875px (3xl) */}
        <div className="hidden md:flex relative z-10 bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl 2xl:rounded-3xl p-2.5 md:p-3 lg:p-4.5 2xl:p-6 3xl:p-7 items-center justify-between shadow-xs md:w-[220px] lg:w-[340px] xl:w-[380px] 2xl:w-[450px] 3xl:w-[500px] shrink-0">
          <div className="space-y-0.5 md:space-y-1 2xl:space-y-1.5 md:max-w-[115px] lg:max-w-[180px] 2xl:max-w-[240px] 3xl:max-w-[270px]">
            <div className="flex items-center space-x-1 text-[#2563eb]">
              <Sparkles size={13} className="lg:w-3.5 lg:h-3.5 2xl:w-4.5 2xl:h-4.5" />
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

      {/* ============================================================== */}
      {/* 2. FOUR CLEAN WHITE STAT CARDS (MATCHING DASHBOARD.png)        */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 2xl:gap-5 3xl:gap-6">
        {/* Card 1: OVERALL PROGRESS */}
        <div className="bg-gradient-to-br from-white to-[#f5f9ff] rounded-2xl 2xl:rounded-3xl border border-[#dbeafe] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(37,99,235,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
          <div className="flex items-center space-x-3.5 2xl:space-x-4">
            <div className="w-12 h-12 2xl:w-13 2xl:h-13 3xl:w-14 3xl:h-14 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
              <div className="relative w-8 h-8 2xl:w-9 2xl:h-9 flex items-center justify-center">
                <svg className="w-8 h-8 2xl:w-9 2xl:h-9 -rotate-90" viewBox="0 0 36 36">
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
            onClick={() => navigate('/enrolled-courses')}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#eff6ff] hover:bg-blue-100 text-[#3b82f6] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Details"
          >
            <ChevronRight size={13} className="2xl:w-4 2xl:h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Card 2: COURSES */}
        <div className="bg-gradient-to-br from-white to-[#f2faf7] rounded-2xl 2xl:rounded-3xl border border-[#ccfbf1] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(13,148,136,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
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
            onClick={() => navigate('/enrolled-courses')}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#e6fbf4] hover:bg-teal-100 text-[#0d9488] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Courses"
          >
            <ChevronRight size={13} className="2xl:w-4 2xl:h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Card 3: QUIZ SCORE */}
        <div className="bg-gradient-to-br from-white to-[#faf8ff] rounded-2xl 2xl:rounded-3xl border border-[#ede9fe] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(124,58,237,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
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
            onClick={() => navigate('/my-quizzes')}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#f5f3ff] hover:bg-purple-100 text-[#7c3aed] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Quizzes"
          >
            <ChevronRight size={13} className="2xl:w-4 2xl:h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Card 4: UPCOMING */}
        <div className="bg-gradient-to-br from-white to-[#fff8f3] rounded-2xl 2xl:rounded-3xl border border-[#fed7aa] p-4 sm:p-5 2xl:p-5.5 3xl:p-6 shadow-[0_2px_12px_rgba(234,88,12,0.03)] hover:shadow-xs transition-shadow flex items-start justify-between">
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
            onClick={() => navigate('/schedule')}
            className="w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 3xl:w-8.5 3xl:h-8.5 rounded-full bg-[#fff7ed] hover:bg-orange-100 text-[#ea580c] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-start mt-0.5 ml-2"
            title="View Schedule"
          >
            <ChevronRight size={13} className="2xl:w-4 2xl:h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TWO-COLUMN MAIN WORKSPACE (MATCHING DASHBOARD.png)          */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* ----------------------------------------------------------- */}
        {/* LEFT COLUMN: ~58% (lg:col-span-7)                           */}
        {/* ----------------------------------------------------------- */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* L1: Continue Learning Card (matching DASHBOARD-CONTIUE-LEARNING.png & DASHBOARD.png) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3 sm:space-y-3.5">
            {/* Header INSIDE card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50/80 text-[#2563eb] flex items-center justify-center shrink-0">
                  <Play size={13} strokeWidth={2.5} className="text-[#2563eb] ml-0.5" fill="none" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Continue Learning
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/enrolled-courses')}
                className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-blue-700 flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <span>View All Courses</span>
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Inner Bordered Lesson Container */}
            <div className="border border-slate-100 rounded-2xl p-4 sm:p-5 bg-white space-y-5 sm:space-y-6">
              {/* Top part: Thumbnail on left, Information Section with Bar on right */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                <img
                  src={continueLearningLaptopImg}
                  alt="Lesson Dashboard Preview"
                  className="w-full sm:w-[126px] md:w-[134px] h-36 sm:h-[124px] md:h-[130px] rounded-xl object-cover border border-slate-100/90 shadow-2xs shrink-0 self-stretch sm:self-auto"
                />

                {/* Information Section containing Title, SEO tag, and the Progress Bar with generous spacing */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#2563eb] block">
                      MODULE 2 OF 4
                    </span>
                    <h4 
                      onClick={() => navigate('/lesson-player?courseId=course-8')}
                      className="text-sm sm:text-base font-extrabold text-[#0c1e3d] leading-snug hover:text-blue-600 transition-colors cursor-pointer mt-1"
                    >
                      Lesson 2.2: Schema Markup & Structured Data Implementation
                    </h4>
                    <div className="pt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[11px] font-medium text-slate-600">
                        SEO • Technical Optimization
                      </span>
                    </div>
                  </div>

                  {/* Progress Line with 65% label - inside information section with big distance below SEO pill */}
                  <div className="flex items-center space-x-3 pt-5 sm:pt-6">
                    <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2563eb] rounded-full w-[65%]" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 tabular-nums shrink-0">
                      65%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Row: Donut Gauge + Next Lesson Box + Resume Button (3 elements in row) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-3.5 pt-0.5">
                {/* Element 1: 65% Donut */}
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs sm:text-sm font-black text-slate-900 leading-none">65%</span>
                      <span className="text-[8.5px] font-medium text-slate-400 mt-0.5">Complete</span>
                    </div>
                  </div>
                </div>

                {/* Element 2: Next Lesson Box */}
                <div
                  onClick={() => navigate('/lesson-player?courseId=course-8')}
                  className="bg-[#f8fafd] hover:bg-[#f0f6ff] border border-slate-100 rounded-xl px-3.5 py-2.5 flex items-center justify-between space-x-2.5 text-xs font-medium text-slate-700 cursor-pointer transition-colors flex-1 min-w-0"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
                      <Calendar size={14} />
                    </div>
                    <div className="min-w-0 truncate">
                      <span className="text-[10px] text-slate-400 font-medium block leading-tight">Next Lesson</span>
                      <strong className="text-xs font-bold text-slate-900 block truncate">Structured Data Types</strong>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <ChevronRight size={12} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Element 3: Resume Lesson Button */}
                <button
                  type="button"
                  onClick={() => navigate('/lesson-player?courseId=course-8')}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center space-x-1.5 text-xs shrink-0 cursor-pointer active:scale-95"
                >
                  <Play size={11} className="fill-white text-white" />
                  <span>Resume Lesson</span>
                  <ArrowRight size={13} className="text-white" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* L2: Quick Actions (matching DASHBOARD.png) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center space-x-2">
              <Zap size={16} className="text-[#2563eb] fill-[#2563eb]" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Quick Actions
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Action 1: Browse Courses */}
              <div
                onClick={() => navigate('/courses')}
                className="bg-[#fcfdfe] hover:bg-[#f8fafd] border border-slate-100 hover:border-blue-200 rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BookOpen size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      Browse Courses
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      Explore new courses
                    </p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563eb] flex items-center justify-center transition-colors shrink-0 ml-1">
                  <ArrowRight size={11} />
                </div>
              </div>

              {/* Action 2: My Quizzes */}
              <div
                onClick={() => navigate('/my-quizzes')}
                className="bg-[#fcfdfe] hover:bg-[#f8fafd] border border-slate-100 hover:border-purple-200 rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <CheckSquare size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                      My Quizzes
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      Test your knowledge
                    </p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 flex items-center justify-center transition-colors shrink-0 ml-1">
                  <ArrowRight size={11} />
                </div>
              </div>

              {/* Action 3: Assignments */}
              <div
                onClick={() => navigate('/my-assignments')}
                className="bg-[#fcfdfe] hover:bg-[#f8fafd] border border-slate-100 hover:border-emerald-200 rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                      Assignments
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      Submit & track
                    </p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 flex items-center justify-center transition-colors shrink-0 ml-1">
                  <ArrowRight size={11} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* RIGHT COLUMN: ~42% (lg:col-span-5)                          */}
        {/* ----------------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          {/* R1: Today / Upcoming (matching DASHBOARD.png) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-[#0c1e3d]" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Today / Upcoming
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/schedule')}
                className="text-xs font-semibold text-[#2563eb] hover:text-blue-700 flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <span>View All</span>
                <ArrowRight size={12} strokeWidth={2.5} />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Item 1: Digital Marketing Career Aptitude Quiz */}
              <div
                onClick={() => navigate('/my-quizzes')}
                className="p-2.5 sm:p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-[#fcfdfe] hover:bg-[#f8fafd] transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {/* Purple Left Border Date Badge */}
                  <div className="bg-purple-50 text-purple-700 border-l-4 border-purple-500 rounded-xl py-1.5 px-2.5 text-center shrink-0 min-w-[46px]">
                    <span className="text-sm font-black leading-none block">22</span>
                    <span className="text-[9.5px] font-bold uppercase block mt-0.5">Apr</span>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-medium block leading-tight">
                      09:00 AM – 10:00 AM
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs group-hover:text-purple-700 transition-colors truncate mt-0.5">
                      Digital Marketing Career Aptitude Quiz
                    </h5>
                    <span className="text-[10.5px] text-slate-500 font-medium">
                      Quiz • 20 mins
                    </span>
                  </div>
                </div>

                <div className="w-5 h-5 rounded-full bg-blue-50/70 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <ChevronRight size={12} strokeWidth={2.5} />
                </div>
              </div>

              {/* Item 2: SEO Fundamentals & Keyword Strategy Assessment */}
              <div
                onClick={() => navigate('/my-quizzes')}
                className="p-2.5 sm:p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-[#fcfdfe] hover:bg-[#f8fafd] transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {/* Teal/Emerald Left Border Date Badge */}
                  <div className="bg-teal-50 text-teal-700 border-l-4 border-teal-500 rounded-xl py-1.5 px-2.5 text-center shrink-0 min-w-[46px]">
                    <span className="text-sm font-black leading-none block">22</span>
                    <span className="text-[9.5px] font-bold uppercase block mt-0.5">Apr</span>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-medium block leading-tight">
                      03:00 PM – 04:00 PM
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs group-hover:text-teal-700 transition-colors truncate mt-0.5">
                      SEO Fundamentals & Keyword Strategy Assessment
                    </h5>
                    <span className="text-[10.5px] text-slate-500 font-medium">
                      Test • 25 mins
                    </span>
                  </div>
                </div>

                <div className="w-5 h-5 rounded-full bg-blue-50/70 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <ChevronRight size={12} strokeWidth={2.5} />
                </div>
              </div>

              {/* Item 3: Live Doubt Clearing Session */}
              <div
                onClick={() => navigate('/schedule')}
                className="p-2.5 sm:p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-[#fcfdfe] hover:bg-[#f8fafd] transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {/* Blue Left Border Date Badge */}
                  <div className="bg-blue-50 text-blue-700 border-l-4 border-blue-500 rounded-xl py-1.5 px-2.5 text-center shrink-0 min-w-[46px]">
                    <span className="text-sm font-black leading-none block">24</span>
                    <span className="text-[9.5px] font-bold uppercase block mt-0.5">Apr</span>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-medium block leading-tight">
                      11:00 AM – 12:00 PM
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs group-hover:text-[#2563eb] transition-colors truncate mt-0.5">
                      Live Doubt Clearing Session
                    </h5>
                    <span className="text-[10.5px] text-slate-500 font-medium">
                      Live Session • 1 hr
                    </span>
                  </div>
                </div>

                <div className="w-5 h-5 rounded-full bg-blue-50/70 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <ChevronRight size={12} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          {/* R2: Milestone / Achievement Banner (Mountain with flag illustration) */}
          <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-indigo-50/50 rounded-2xl sm:rounded-3xl border border-sky-100/90 p-5 sm:p-6 shadow-2xs relative overflow-hidden flex items-center justify-between">
            <div className="space-y-1 z-10 max-w-[210px]">
              <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                You're on the right path!
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Every lesson brings you closer to your goals. Keep going!
              </p>
              <div className="pt-1">
                <span className="text-blue-600 font-black text-2xl inline-block">
                  ⤴
                </span>
              </div>
            </div>

            {/* Mountain Peak Artwork with Summit Flag */}
            <div className="relative w-28 h-24 shrink-0 flex items-end justify-center pointer-events-none">
              <svg viewBox="0 0 120 100" className="w-full h-full">
                {/* Background Mountains */}
                <polygon points="10,100 45,35 75,100" fill="#93c5fd" opacity="0.6" />
                <polygon points="50,100 85,25 115,100" fill="#60a5fa" opacity="0.7" />
                {/* Foreground High Peak */}
                <polygon points="30,100 70,18 105,100" fill="#2563eb" />
                {/* Snow Cap on Highest Peak */}
                <polygon points="63,33 70,18 77,33 73,30 67,34" fill="#ffffff" />
                {/* Flagpole & Flag */}
                <line x1="70" y1="18" x2="70" y2="4" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
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
