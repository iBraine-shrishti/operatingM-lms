import React from "react";
import {
  Clock,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  LayoutGrid,
  MapPin,
  Bookmark,
  History,
} from "lucide-react";
import dashboardHat from "../../assets/header-bg/dashboard-hat.png";
import premPassportPhotoImg from "../../assets/Prem_Photo_Passport.png";

/**
 * ProfileHeader: Displays the top student profile banner, countdown,
 * metadata pills strip, and sticky tab navigation.
 *
 * @param {Object} props
 * @param {Object} props.studentData - Normalized student data object
 * @param {string} props.activeTab - Currently active tab ('overview' | 'attendance' | 'history')
 * @param {Function} props.onTabChange - Handler when a tab is clicked
 */
export const ProfileHeader = ({ studentData, activeTab, onTabChange }) => {
  return (
    <div className="space-y-4">
      {/* 1. TOP HEADER BANNER CARD */}
      <div className="relative rounded-3xl border border-blue-100 dark:border-slate-800 bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-blue-50/20 dark:from-slate-900/90 dark:via-blue-950/30 dark:to-slate-900/90 p-5 sm:p-7 shadow-xs overflow-hidden transition-all">
        {/* Decorative blur shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Avatar & Identity Details */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
            {/* Avatar Container with Green Active Dot */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-md bg-white dark:bg-slate-800 p-0.5">
                <img
                  src={studentData.avatar || premPassportPhotoImg}
                  alt={studentData.name}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
              {/* Online Green Indicator Dot on Top Right */}
              <span
                className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-xs ring-1 ring-emerald-400"
                title="Active Student"
              />
            </div>

            {/* Student Name & Badges */}
            <div className="min-w-0 space-y-1 sm:space-y-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                Welcome back,
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {studentData.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {studentData.course} • ID: {studentData.numericId}
              </p>

              {/* Status Badge Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Student</span>
                </span>

                <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <ShieldCheck size={13} className="text-blue-600 dark:text-blue-400" />
                  <span>CRM Verified</span>
                </span>

                {/* FEES PENDING BADGE */}
                {studentData.balanceDue > 0 && (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 animate-pulse">
                    <AlertTriangle size={12} className="text-rose-600 dark:text-rose-400" />
                    <span>Fees Pending: ₹{studentData.balanceDue.toLocaleString()} Due</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Countdown Card + 3D Graduation Cap Graphic */}
          <div className="flex items-center space-x-4 shrink-0">
            {/* Days Left Card */}
            <div className="bg-white/95 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 rounded-2xl px-5 py-3.5 shadow-xs flex items-center space-x-3.5 relative min-w-[210px]">
              <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div className="pr-5">
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {studentData.daysLeft}{" "}
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Days Left
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Course ends on {studentData.courseEnd}
                </div>
              </div>
              <Calendar
                size={14}
                className="absolute top-3 right-3 text-blue-500 dark:text-blue-400 opacity-80"
              />
            </div>

            {/* 3D Graduation Cap Graphic */}
            <div className="hidden md:block select-none">
              <img
                src={dashboardHat}
                alt="Learning Cap"
                className="w-24 sm:w-32 h-auto drop-shadow-md select-none transform hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>

        {/* Stretched Course Progress Bar - Aligning with Active Student on Desktop, Responsive Full-Width on Mobile */}
        <div className="relative z-10 mt-4 sm:mt-5 w-full lg:pl-[116px]">
          <div className="w-full h-2 sm:h-2.5 bg-blue-100/90 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${studentData.progressPercentage || 65}%` }}
              title={`${studentData.progressPercentage || 65}% Course Completed`}
            />
          </div>
        </div>

        {/* Bottom Metadata Pills Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-blue-100/80 dark:border-slate-800/80">
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <BookOpen size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                Course
              </span>
              <strong className="text-slate-900 dark:text-white font-bold truncate block">
                {studentData.course}
              </strong>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <LayoutGrid size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                Student ID
              </span>
              <strong className="text-slate-900 dark:text-white font-bold block">
                {studentData.studentId}
              </strong>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <MapPin size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                Center
              </span>
              <strong className="text-slate-900 dark:text-white font-bold block">
                {studentData.center}
              </strong>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <Bookmark size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                Batch
              </span>
              <strong className="text-slate-900 dark:text-white font-bold block">
                {studentData.batch}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto sticky top-0 bg-slate-50/90 dark:bg-[#070d1e]/90 backdrop-blur-md z-20 pt-2 -mt-2">
        <button
          type="button"
          onClick={() => onTabChange("overview")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "overview"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <BookOpen size={14} />
          <span>Student Overview</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("attendance")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "attendance"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <Calendar size={14} />
          <span>Attendance & Fees</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("history")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "history"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <History size={14} />
          <span>Course History</span>
        </button>
      </div>
    </div>
  );
};
