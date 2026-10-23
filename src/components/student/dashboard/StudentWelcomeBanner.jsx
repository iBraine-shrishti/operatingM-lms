import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, User } from "lucide-react";
import dashboardHeaderBg from "../../../assets/header-bg/dashboard-header.png";
import dashboardHeaderDarkBg from "../../../assets/header-bg/dashboard-header-dark.png";

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

  const studentName = currentUser?.name || crmProfile?.studentName || crmProfile?.name || "Sahil Hasolkar";
  const studentCourse = crmProfile?.course || currentUser?.course || "Masters in Digital Marketing";
  const admissionId = crmProfile?.admissionNo || currentUser?.admissionNo || "OMC-0375";
  const centerBranch = crmProfile?.branch || currentUser?.branch || "Borivali Center";

  // Prioritize live backend photo from CRM API before any fallback asset
  const backendPhoto = crmProfile?.photo || crmProfile?.avatar || currentUser?.photo;
  const avatarSrc = backendPhoto || currentUser?.avatar || null;
  const headerBgFromBackend = crmProfile?.headerBg || currentUser?.headerBg;

  return (
    <div
      className={`w-full relative bg-cover bg-center dashboard-hero-banner border border-blue-100/70 dark:border-blue-500/30 shadow-2xs hover:shadow-xs p-3.5 sm:p-5 lg:p-6 xl:p-7 flex items-center justify-between overflow-hidden rounded-3xl transition-all duration-200 min-h-[150px] sm:min-h-[180px] gap-2.5 sm:gap-4`}
      style={headerBgFromBackend ? { backgroundImage: `url(${headerBgFromBackend})` } : undefined}
    >
      {/* Left Column: Greeting, Student Name, Specialization & Identity Pills */}
      <div className="relative z-10 flex-1 min-w-0 pr-0 sm:pr-4 space-y-0.5 sm:space-y-1">
        <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm md:text-[15px] tracking-normal">
          Welcome Back,
        </p>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[34px] font-black text-[#0f172a] dark:text-white tracking-tight leading-tight py-0.5">
          <span className="truncate block">{studentName}!</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm md:text-[15px] truncate">
          {studentCourse}
        </p>

        {/* 2 White Badges / Pills: Student ID & Center */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2.5 pt-1.5 sm:pt-3">
          <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs border border-white/80 dark:border-slate-700/60 shadow-2xs rounded-full px-2 sm:px-3.5 py-0.5 sm:py-1.5 flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs md:text-[13px] font-semibold text-slate-700 dark:text-slate-200">
            <Calendar
              size={12}
              className="text-[#3b82f6] dark:text-blue-400 stroke-[2.2] shrink-0"
            />
            <span>
              ID:{" "}
              <strong className="font-bold text-slate-900 dark:text-white">
                {admissionId}
              </strong>
            </span>
          </div>

          <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs border border-white/80 dark:border-slate-700/60 shadow-2xs rounded-full px-2 sm:px-3.5 py-0.5 sm:py-1.5 flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs md:text-[13px] font-semibold text-slate-700 dark:text-slate-200">
            <MapPin
              size={12}
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

      {/* Right Column: Square Student Photo with Green Online Status Dot */}
      <div className="relative z-10 shrink-0 self-center">
        <div className="relative group">
          {/* Square Photo Container with Very Thin 1px Border and Flush Inner Fit */}
          <div className="relative aspect-square w-[72px] h-[72px] sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/80 dark:border-slate-700/80 shadow-md hover:shadow-xl bg-slate-100 dark:bg-slate-800 p-0 overflow-hidden transition-all duration-300 flex items-center justify-center">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={studentName}
                loading="eager"
                decoding="sync"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }
                }}
                className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl md:rounded-3xl transition-transform duration-300 group-hover:scale-105"
              />
            ) : null}
            <div
              className={`w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xl sm:text-2xl md:text-3xl flex items-center justify-center ${
                avatarSrc ? 'hidden' : 'flex'
              }`}
            >
              {studentName
                ? studentName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : <User size={36} />}
            </div>
          </div>

          {/* Status Indicator Dot (Green with thin white border) */}
          <span
            className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 2xl:w-4.5 2xl:h-4.5 rounded-full bg-[#10b981] ring-1.5 sm:ring-2 ring-white dark:ring-slate-900 shadow-xs z-20 pointer-events-none"
            title="Active Student"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentWelcomeBanner;
