import React from "react";
import { Clock, User } from "lucide-react";
import { getActivityTheme } from "../../utils/activityTheme";

/**
 * ActivityAdminFeed Component
 * Renders the tabular / card audit trail format when viewed by an administrator.
 */
export const ActivityAdminFeed = ({
  activities = [],
  currentStudentName = "Student",
  currentStudentAvatar = null,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1329]/95 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-6 2xl:p-7 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] space-y-3 sm:space-y-3.5 2xl:space-y-4 transition-colors duration-200">
      {activities.map((act) => {
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
          <div
            key={act.id}
            className="p-4 sm:p-5 2xl:p-5.5 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-500/60 bg-white dark:bg-slate-900/90 hover:bg-blue-50/30 dark:hover:bg-slate-850 transition-all duration-200 shadow-2xs hover:shadow-md dark:hover:shadow-[0_6px_25px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-default"
          >
            {/* User Avatar + Details */}
            <div className="flex items-start sm:items-center space-x-3.5 sm:space-x-4 min-w-0 flex-1">
              {/* Avatar with relative pulse indicator */}
              <div className="relative shrink-0">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }
                    }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-300 dark:group-hover:ring-blue-500/70 transition-all"
                  />
                ) : null}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-300 dark:group-hover:ring-blue-500/70 transition-all items-center justify-center ${
                    displayAvatar ? "hidden" : "flex"
                  }`}
                >
                  {initials ? initials : <User size={18} />}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 2xl:w-4 2xl:h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-2xs ${theme.dotColor}`}
                  title={theme.label}
                />
              </div>

              {/* Text details: Student Name, Action, Target */}
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base 2xl:text-lg">
                    {displayName}
                  </span>
                  <span className="text-xs sm:text-sm 2xl:text-base text-slate-600 dark:text-slate-300 font-medium">
                    {act.action}
                  </span>
                  <span className="font-extrabold text-blue-700 dark:text-cyan-400 group-hover:text-blue-800 dark:group-hover:text-cyan-300 text-sm sm:text-base 2xl:text-lg break-words transition-colors">
                    {act.target}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs 2xl:text-sm text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                  <span className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 font-semibold">
                    <Clock size={13} className="text-slate-400 dark:text-slate-500" />
                    <span>{act.timeAgo}</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Live CRM Sync
                  </span>
                </div>
              </div>
            </div>

            {/* Right Badge & Type Icon */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
              <span
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl border text-xs sm:text-sm 2xl:text-[13.5px] font-bold shadow-2xs transition-all duration-200 group-hover:scale-105 ${theme.badgeBg}`}
              >
                <TypeIcon size={14} className="shrink-0 2xl:w-4 2xl:h-4" />
                <span>{theme.label}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
