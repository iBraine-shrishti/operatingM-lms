import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, GraduationCap, CheckSquare, FileText } from "lucide-react";
import dashboardHeaderBg from "../../../assets/header-bg/dashboard-header.png";
import dashboardHeaderDarkBg from "../../../assets/header-bg/dashboard-header-dark.png";
import profilePic from "../../../assets/profile-pic.png";

/**
 * Reusable Welcome Banner for Student Dashboard
 */
export const StudentWelcomeBanner = ({
  currentUser = {},
  crmProfile = {},
  onNavigate,
}) => {
  const navigate = useNavigate();
  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  // Preload both light and dark header images for instant zero-latency theme switching
  useEffect(() => {
    const img1 = new Image();
    img1.src = dashboardHeaderBg;
    const img2 = new Image();
    img2.src = dashboardHeaderDarkBg;
  }, []);

  const studentName = currentUser.name || "Hiteshpuri Goswami";
  const studentCourse = crmProfile.course || "Diploma in Digital Marketing";
  const admissionId = crmProfile.admissionNo || "OMC-0266";
  const centerBranch = crmProfile.branch || "Borivali Center";
  const avatarSrc = currentUser.avatar || profilePic;

  return (
    <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 relative bg-cover bg-center dashboard-hero-banner border border-blue-100/70 dark:border-blue-500/30 shadow-2xs hover:shadow-md dark:shadow-[0_4px_30px_rgba(2,6,23,0.7)] hover:border-blue-300 dark:hover:border-blue-400/60 dark:hover:shadow-[0_8px_36px_rgba(37,99,235,0.2)] p-3.5 sm:p-4 lg:p-4 xl:p-4.5 2xl:p-6 flex items-center overflow-hidden rounded-2xl transition-all duration-200">
      {/* Avatar + Details + Mobile/Tablet Quick Actions */}
      <div className="relative z-10 flex items-center justify-between min-w-0 flex-1 gap-3">
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-4 xl:space-x-4.5 2xl:space-x-5 min-w-0">
          {/* User Avatar Image */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-22 xl:h-22 2xl:w-28 2xl:h-28 rounded-full border-2 2xl:border-3 border-white dark:border-slate-800 shadow-md ring-2 ring-blue-100/90 dark:ring-blue-500/50 hover:dark:ring-blue-400 dark:shadow-[0_0_18px_rgba(37,99,235,0.35)] p-0.5 sm:p-1 transition-all duration-200">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={avatarSrc}
                  alt={studentName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-0.5 xl:space-y-1">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-blue-900 dark:text-cyan-400 block drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
              WELCOME BACK,
            </span>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-[#0c1e3d] dark:text-white tracking-tight leading-tight flex items-center gap-1.5 drop-shadow-md">
              <span className="truncate">{studentName}!</span>
            </h1>
            <p className="text-xs sm:text-xs lg:text-sm 2xl:text-base text-slate-900 dark:text-blue-100 font-bold truncate">
              {studentCourse}
            </p>

            {/* 2 Pills: Student ID & Center */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <div className="bg-white/95 dark:bg-slate-900/85 dark:backdrop-blur-md border border-slate-200/80 dark:border-blue-500/35 hover:dark:border-blue-400/70 hover:dark:bg-slate-850/90 rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] xl:text-[11.5px] 2xl:text-xs text-slate-700 dark:text-blue-100 font-medium flex items-center space-x-1 shadow-2xs hover:shadow-xs transition-all duration-150 whitespace-nowrap cursor-default">
                <Calendar
                  size={12}
                  className="text-[#2563eb] dark:text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]"
                />
                <span>
                  ID:{" "}
                  <strong className="text-slate-900 dark:text-white font-black">
                    {admissionId}
                  </strong>
                </span>
              </div>
              <div className="bg-white/95 dark:bg-slate-900/85 dark:backdrop-blur-md border border-slate-200/80 dark:border-blue-500/35 hover:dark:border-blue-400/70 hover:dark:bg-slate-850/90 rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] xl:text-[11.5px] 2xl:text-xs text-slate-700 dark:text-blue-100 font-medium flex items-center space-x-1 shadow-2xs hover:shadow-xs transition-all duration-150 whitespace-nowrap cursor-default">
                <MapPin
                  size={12}
                  className="text-[#2563eb] dark:text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]"
                />
                <span>
                  <strong className="text-slate-900 dark:text-white font-black">
                    {centerBranch}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions (Vertical Rounded Icon Buttons on screens <= 1023px) */}
        <div className="flex lg:hidden flex-col items-center gap-1 sm:gap-1.5 shrink-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-xl border border-blue-100/80 dark:border-blue-500/30 shadow-xs">
          <button
            type="button"
            onClick={() => handleNav("/enrolled-courses")}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 dark:bg-blue-500/20 text-[#2563eb] dark:text-blue-300 border border-blue-200 dark:border-blue-500/40 shadow-2xs flex items-center justify-center transition-all hover:bg-blue-100 dark:hover:bg-blue-500 dark:hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            title="Enrolled Courses"
          >
            <GraduationCap size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleNav("/my-quizzes")}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40 shadow-2xs flex items-center justify-center transition-all hover:bg-purple-100 dark:hover:bg-purple-500 dark:hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            title="My Quizzes"
          >
            <CheckSquare size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleNav("/my-assignments")}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 shadow-2xs flex items-center justify-center transition-all hover:bg-emerald-100 dark:hover:bg-emerald-500 dark:hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            title="Assignments"
          >
            <FileText size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentWelcomeBanner;
