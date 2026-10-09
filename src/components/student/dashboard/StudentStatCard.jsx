import React from "react";
import { ChevronRight } from "lucide-react";

const STAT_THEMES = {
  blue: {
    card: "bg-gradient-to-br from-blue-50/95 via-[#edf5ff] to-[#dbeafe]/70 dark:from-blue-950/50 dark:via-slate-900/95 dark:to-blue-900/30 border-blue-200/90 dark:border-blue-500/30 hover:border-blue-300 dark:hover:border-blue-400/80 shadow-[0_2px_14px_rgba(37,99,235,0.06)] dark:shadow-none hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(37,99,235,0.25)]",
    iconBox: "bg-blue-100 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 border-blue-200/80 dark:border-blue-500/40 dark:shadow-[0_0_15px_rgba(37,99,235,0.3)]",
    title: "text-[#2563eb] dark:text-blue-400",
    value: "text-[#0c1e3d] dark:text-white",
    subtitle: "text-blue-900/70 dark:text-blue-200/80",
    button: "bg-blue-100/90 dark:bg-blue-500/20 group-hover:bg-[#2563eb] dark:group-hover:bg-blue-500 text-[#2563eb] dark:text-blue-300 group-hover:text-white border-blue-200 dark:border-blue-500/40 group-hover:dark:border-blue-400",
    meterTrack: "text-blue-200/80 dark:text-slate-800",
    meterFill: "text-[#2563eb] dark:text-blue-400",
    meterDot: "bg-[#2563eb] dark:bg-blue-400",
  },
  teal: {
    card: "bg-gradient-to-br from-teal-50/95 via-[#e9faf5] to-[#ccfbf1]/70 dark:from-teal-950/50 dark:via-slate-900/95 dark:to-teal-900/30 border-teal-200/90 dark:border-teal-500/30 hover:border-teal-300 dark:hover:border-teal-400/80 shadow-[0_2px_14px_rgba(13,148,136,0.06)] dark:shadow-none hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(20,184,166,0.25)]",
    iconBox: "bg-teal-100 dark:bg-teal-500/15 text-[#0d9488] dark:text-teal-400 border-teal-200/80 dark:border-teal-500/40 dark:shadow-[0_0_15px_rgba(20,184,166,0.3)]",
    title: "text-[#0d9488] dark:text-teal-400",
    value: "text-[#042f2e] dark:text-white",
    subtitle: "text-teal-900/70 dark:text-teal-200/80",
    button: "bg-teal-100/90 dark:bg-teal-500/20 group-hover:bg-[#0d9488] dark:group-hover:bg-teal-500 text-[#0d9488] dark:text-teal-300 group-hover:text-white border-teal-200 dark:border-teal-500/40 group-hover:dark:border-teal-400",
  },
  purple: {
    card: "bg-gradient-to-br from-purple-50/95 via-[#f5efff] to-[#ede9fe]/70 dark:from-purple-950/50 dark:via-slate-900/95 dark:to-purple-900/30 border-purple-200/90 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400/80 shadow-[0_2px_14px_rgba(124,58,237,0.06)] dark:shadow-none hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(168,85,247,0.25)]",
    iconBox: "bg-purple-100 dark:bg-purple-500/15 text-[#7c3aed] dark:text-purple-400 border-purple-200/80 dark:border-purple-500/40 dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    title: "text-[#7c3aed] dark:text-purple-400",
    value: "text-[#2e1065] dark:text-white",
    subtitle: "text-purple-900/70 dark:text-purple-200/80",
    button: "bg-purple-100/90 dark:bg-purple-500/20 group-hover:bg-[#7c3aed] dark:group-hover:bg-purple-500 text-[#7c3aed] dark:text-purple-300 group-hover:text-white border-purple-200 dark:border-purple-500/40 group-hover:dark:border-purple-400",
  },
  amber: {
    card: "bg-gradient-to-br from-amber-50/95 via-[#fff3e6] to-[#fed7aa]/70 dark:from-amber-950/50 dark:via-slate-900/95 dark:to-amber-900/30 border-amber-200/90 dark:border-amber-500/30 hover:border-amber-300 dark:hover:border-amber-400/80 shadow-[0_2px_14px_rgba(234,88,12,0.06)] dark:shadow-none hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(245,158,11,0.25)]",
    iconBox: "bg-amber-100 dark:bg-amber-500/15 text-[#ea580c] dark:text-amber-400 border-amber-200/80 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    title: "text-[#ea580c] dark:text-amber-400",
    value: "text-[#431407] dark:text-white",
    subtitle: "text-amber-900/70 dark:text-amber-200/80",
    button: "bg-amber-100/90 dark:bg-amber-500/20 group-hover:bg-[#ea580c] dark:group-hover:bg-amber-500 text-[#ea580c] dark:text-amber-300 group-hover:text-white border-amber-200 dark:border-amber-500/40 group-hover:dark:border-amber-400",
  },
};

/**
 * Reusable Individual Student Dashboard Stat Card
 */
export const StudentStatCard = ({
  title,
  value,
  subtitle,
  color = "blue",
  icon: IconComponent,
  showCircularProgress = false,
  progressPercent = 65,
  onClick,
}) => {
  const theme = STAT_THEMES[color] || STAT_THEMES.blue;

  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl p-3 sm:p-3.5 lg:p-3.5 xl:p-4 2xl:p-5 hover:-translate-y-1 transition-all duration-200 flex items-center justify-between min-w-0 cursor-pointer group ${theme.card}`}
    >
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 2xl:space-x-4 min-w-0">
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full border shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-200 ${theme.iconBox}`}
        >
          {showCircularProgress ? (
            <div className="relative w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 2xl:w-9 2xl:h-9 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className={theme.meterTrack}
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={theme.meterFill}
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div
                className={`w-1.5 h-1.5 2xl:w-2 2xl:h-2 rotate-45 rounded-[0.5px] absolute ${theme.meterDot}`}
              />
            </div>
          ) : IconComponent ? (
            <>
              <IconComponent size={18} className="sm:hidden" strokeWidth={2.2} />
              <IconComponent
                size={20}
                className="hidden sm:block 2xl:w-6 2xl:h-6"
                strokeWidth={2.2}
              />
            </>
          ) : null}
        </div>

        <div className="min-w-0">
          <span
            className={`text-[9.5px] sm:text-[10.5px] 2xl:text-xs font-extrabold uppercase tracking-wider block leading-tight ${theme.title}`}
          >
            {title}
          </span>
          <h3
            className={`text-xl sm:text-2xl 2xl:text-[30px] font-black mt-0.5 leading-none tracking-tight ${theme.value}`}
          >
            {value}
          </h3>
          <p
            className={`text-[10.5px] sm:text-[11.5px] 2xl:text-[13px] font-semibold mt-0.5 truncate ${theme.subtitle}`}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
        className={`hidden md:flex w-6.5 h-6.5 2xl:w-7.5 2xl:h-7.5 rounded-full border items-center justify-center transition-all cursor-pointer shrink-0 self-center ml-2 shadow-2xs group-hover:scale-105 ${theme.button}`}
        title={`View ${title}`}
      >
        <ChevronRight size={13} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default StudentStatCard;
