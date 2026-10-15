import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import dashboardHeaderBg from "../../../assets/header-bg/dashboard-header.png";
import dashboardHeaderDarkBg from "../../../assets/header-bg/dashboard-header-dark.png";
import profilePic from "../../../assets/profile-pic.png";
import sahilProfilePic from "../../../assets/sahil-profile.png";
import sahilCleanAvatar from "../../../assets/sahil-clean-avatar.png";

/**
 * Reusable Welcome Banner for Student Dashboard matching DASHBOARD.png
 */
export const StudentWelcomeBanner = ({
  currentUser = {},
  crmProfile = {},
  onNavigate,
}) => {
  const navigate = useNavigate();

  // Preload both light and dark header images for instant zero-latency theme switching
  useEffect(() => {
    const img1 = new Image();
    img1.src = dashboardHeaderBg;
    const img2 = new Image();
    img2.src = dashboardHeaderDarkBg;
  }, []);

  const studentName = currentUser?.name || crmProfile?.studentName || "Sahil Hasolkar";
  const studentCourse = crmProfile?.course || currentUser?.course || "Masters in Digital Marketing";
  const admissionId = crmProfile?.admissionNo || currentUser?.admissionNo || "OMC-0375";
  const centerBranch = crmProfile?.branch || currentUser?.branch || "Borivali Center";
  const isDefaultSahil = !currentUser?.avatar || currentUser?.avatar === sahilProfilePic;
  const avatarSrc = currentUser?.avatar || sahilProfilePic || profilePic;

  return (
    <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 relative bg-cover bg-center dashboard-hero-banner border border-blue-100/70 dark:border-blue-500/30 shadow-2xs hover:shadow-xs p-5 sm:p-6 lg:p-6 xl:p-7 flex items-center justify-between overflow-hidden rounded-3xl transition-all duration-200 min-h-[175px] sm:min-h-[187px]">
      {/* Left Column: Greeting, Student Name, Specialization & Identity Pills */}
      <div className="relative z-10 flex-1 min-w-0 pr-3 sm:pr-4 space-y-0.5 sm:space-y-1">
        <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm md:text-[15px] tracking-normal">
          Welcome Back,
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[34px] font-black text-[#0f172a] dark:text-white tracking-tight leading-none py-0.5">
          <span className="truncate block">{studentName}!</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm md:text-[15px] truncate">
          {studentCourse}
        </p>

        {/* 2 White Badges / Pills: Student ID & Center */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2.5 sm:pt-3">
          <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs border border-white/80 dark:border-slate-700/60 shadow-2xs rounded-full px-3.5 py-1.5 flex items-center space-x-1.5 text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200">
            <Calendar
              size={14}
              className="text-[#3b82f6] dark:text-blue-400 stroke-[2.2] shrink-0"
            />
            <span>
              ID:{" "}
              <strong className="font-bold text-slate-900 dark:text-white">
                {admissionId}
              </strong>
            </span>
          </div>

          <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs border border-white/80 dark:border-slate-700/60 shadow-2xs rounded-full px-3.5 py-1.5 flex items-center space-x-1.5 text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200">
            <MapPin
              size={14}
              className="text-[#3b82f6] dark:text-blue-400 stroke-[2.2] shrink-0"
            />
            <span>
              <strong className="font-bold text-slate-900 dark:text-white">
                {centerBranch}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Circular Student Avatar with Green Online Status Dot */}
      <div className="relative z-10 shrink-0 self-center">
        {isDefaultSahil ? (
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
            <img
              src={sahilCleanAvatar}
              alt={studentName}
              className="w-full h-full object-contain drop-shadow-xs"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full ring-4 ring-white/95 dark:ring-slate-800 shadow-md overflow-hidden bg-white dark:bg-slate-800">
              <img
                src={avatarSrc}
                alt={studentName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Status Indicator Dot (Green with white ring matching DASHBOARD.png) */}
            <span
              className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#10b981] ring-2 sm:ring-3 ring-white dark:ring-slate-900 shadow-xs z-20 pointer-events-none"
              title="Active Student"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentWelcomeBanner;
