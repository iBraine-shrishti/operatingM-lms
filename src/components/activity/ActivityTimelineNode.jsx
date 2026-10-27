import React from "react";
import { Clock, User } from "lucide-react";
import { getActivityTheme } from "../../utils/activityTheme";

/**
 * ActivityTimelineNode Component
 * Renders an individual event card in the student timeline with its connecting
 * marker node, timestamp, themed category badge, avatar/initials, and event summary.
 */
export const ActivityTimelineNode = ({
  act,
  currentStudentName = "Student",
  currentStudentAvatar = null,
}) => {
  const theme = getActivityTheme(act.type);
  const TypeIcon = theme.icon;

  const displayName = act.user?.name || currentStudentName;
  const displayAvatar = act.user?.avatar || currentStudentAvatar;
  const initials = displayName
    ? displayName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="relative flex items-start gap-3 sm:gap-4 group">
      {/* Timeline Node Marker on the continuous line */}
      <div className="w-9 sm:w-10 shrink-0 flex items-center justify-center pt-1 relative z-10">
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white dark:border-[#0b1329] shadow-xs flex items-center justify-center ${theme.iconBg} ring-2 ring-slate-100 dark:ring-slate-800 group-hover:scale-105 group-hover:ring-blue-300 dark:group-hover:ring-blue-500/70 transition-all duration-200 bg-white dark:bg-[#0b1329]`}
        >
          <TypeIcon size={15} />
        </div>
      </div>

      {/* Timeline Event Card - Minimized Spacing & Compact Layout */}
      <div className="flex-1 min-w-0 bg-slate-50/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-850 border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-500/60 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 2xl:p-4 shadow-2xs hover:shadow-md transition-all duration-200">
        {/* Top Row: Time & Category Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800/60 text-xs">
          <span className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 font-semibold">
            <Clock size={12} className="text-slate-400 dark:text-slate-500" />
            <span>{act.timeAgo}</span>
          </span>

          <span
            className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border text-xs font-bold ${theme.badgeBg}`}
          >
            <TypeIcon size={12} />
            <span>{theme.label}</span>
          </span>
        </div>

        {/* Middle Row: User Details, Action, and Target */}
        <div className="flex items-center space-x-3 pt-2">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt=""
              aria-hidden="true"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }
              }}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
            />
          ) : null}
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-[10px] sm:text-xs ring-1 ring-slate-200 dark:ring-slate-700 shrink-0 items-center justify-center ${
              displayAvatar ? "hidden" : "flex"
            }`}
          >
            {initials ? initials : <User size={15} />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
              <span className="font-extrabold text-slate-900 dark:text-white">
                {displayName}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/60">
                Student
              </span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {act.action}
              </span>
              <span className="font-extrabold text-blue-600 dark:text-cyan-400 break-words">
                {act.target}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
