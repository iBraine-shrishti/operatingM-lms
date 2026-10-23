import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Bell, BarChart2 } from "lucide-react";
import { StudentStatCard } from "./StudentStatCard";

const ICON_MAP = {
  BookOpen,
  Trophy,
  Bell,
};

/**
 * Reusable 4-card Grid for Student Overview Metrics
 */
export const StudentStatCards = ({ stats = [], onNavigate }) => {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    if (onNavigate) {
      onNavigate(link);
    } else {
      navigate(link);
    }
  };

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full bg-white dark:bg-[#0f172a]/95 border border-slate-100/90 dark:border-slate-800 hover:dark:border-slate-700 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-2.5 sm:p-3.5 lg:p-3.5 xl:p-4 2xl:p-5 flex-col justify-between space-y-2 rounded-2xl transition-all duration-200 h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8.5 2xl:h-8.5 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 border border-blue-100 dark:border-blue-500/30 flex items-center justify-center shrink-0 shadow-xs dark:shadow-[0_0_12px_rgba(59,130,246,0.25)]">
            <BarChart2
              size={13}
              className="text-[#2563eb] dark:text-blue-400 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4"
            />
          </div>
          <h3 className="text-xs sm:text-sm 2xl:text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Overview Stats
          </h3>
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750 px-2 py-0.5 rounded-md">
          {stats.length} Metrics
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 xl:gap-2.5 2xl:gap-3 w-full flex-1">
        {stats.map((item) => {
          const IconComp = item.iconName ? ICON_MAP[item.iconName] : null;

          return (
            <StudentStatCard
              key={item.id || item.title}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              color={item.color}
              showCircularProgress={Boolean(item.showCircularProgress)}
              progressPercent={item.progressPercent || 65}
              icon={IconComp}
              onClick={() => handleCardClick(item.link || "/enrolled-courses")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StudentStatCards;
