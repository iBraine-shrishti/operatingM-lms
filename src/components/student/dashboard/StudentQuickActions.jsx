import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, GraduationCap, CheckSquare, FileText, ArrowRight } from "lucide-react";

const DEFAULT_ACTIONS = [
  {
    id: "action-courses",
    title: "Enrolled Courses",
    subtitle: "Resume tracks",
    link: "/enrolled-courses",
    color: "blue",
    icon: GraduationCap,
  },
  {
    id: "action-quizzes",
    title: "My Quizzes",
    subtitle: "Test knowledge",
    link: "/my-quizzes",
    color: "purple",
    icon: CheckSquare,
  },
  {
    id: "action-assignments",
    title: "Assignments",
    subtitle: "Submit & track",
    link: "/my-assignments",
    color: "emerald",
    icon: FileText,
  },
];

const COLOR_STYLES = {
  blue: {
    card: "bg-blue-50/60 hover:bg-blue-100/60 dark:bg-gradient-to-br dark:from-blue-950/60 dark:via-slate-900 dark:to-blue-900/20 dark:hover:from-blue-900/60 dark:hover:to-blue-800/30 border-blue-200/90 hover:border-blue-300 dark:border-blue-500/30 dark:hover:border-blue-400/80 dark:hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)]",
    iconBox: "bg-blue-100 dark:bg-blue-500/20 dark:border-blue-500/40 text-[#2563eb] dark:text-blue-300 group-hover:bg-[#2563eb] dark:group-hover:bg-blue-500 group-hover:text-white dark:shadow-[0_0_12px_rgba(59,130,246,0.3)]",
    arrowBox: "bg-blue-100/80 dark:bg-blue-900/60 border-blue-200 dark:border-blue-600/60 text-[#2563eb] dark:text-blue-300 group-hover:bg-[#2563eb] dark:group-hover:bg-blue-500 group-hover:text-white group-hover:border-[#2563eb] dark:group-hover:border-blue-400",
    title: "text-blue-700 dark:text-blue-100 group-hover:text-blue-800 dark:group-hover:text-white",
    subtitle: "text-blue-600/75 dark:text-blue-300/80 group-hover:dark:text-blue-200",
  },
  purple: {
    card: "bg-purple-50/60 hover:bg-purple-100/60 dark:bg-gradient-to-br dark:from-purple-950/60 dark:via-slate-900 dark:to-purple-900/20 dark:hover:from-purple-900/60 dark:hover:to-purple-800/30 border-purple-200/90 hover:border-purple-300 dark:border-purple-500/30 dark:hover:border-purple-400/80 dark:hover:shadow-[0_4px_20px_rgba(168,85,247,0.3)]",
    iconBox: "bg-purple-100 dark:bg-purple-500/20 dark:border-purple-500/40 text-purple-600 dark:text-purple-300 group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:text-white dark:shadow-[0_0_12px_rgba(168,85,247,0.3)]",
    arrowBox: "bg-purple-100/80 dark:bg-purple-900/60 border-purple-200 dark:border-purple-600/60 text-purple-600 dark:text-purple-300 group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-600 dark:group-hover:border-purple-400",
    title: "text-purple-700 dark:text-purple-100 group-hover:text-purple-800 dark:group-hover:text-white",
    subtitle: "text-purple-600/75 dark:text-purple-300/80 group-hover:dark:text-purple-200",
  },
  emerald: {
    card: "bg-emerald-50/60 hover:bg-emerald-100/60 dark:bg-gradient-to-br dark:from-emerald-950/60 dark:via-slate-900 dark:to-emerald-900/20 dark:hover:from-emerald-900/60 dark:hover:to-emerald-800/30 border-emerald-200/90 hover:border-emerald-300 dark:border-emerald-500/30 dark:hover:border-emerald-400/80 dark:hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]",
    iconBox: "bg-emerald-100 dark:bg-emerald-500/20 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-300 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white dark:shadow-[0_0_12px_rgba(16,185,129,0.3)]",
    arrowBox: "bg-emerald-100/80 dark:bg-emerald-900/60 border-emerald-200 dark:border-emerald-600/60 text-emerald-600 dark:text-emerald-300 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-600 dark:group-hover:border-emerald-400",
    title: "text-emerald-700 dark:text-emerald-100 group-hover:text-emerald-800 dark:group-hover:text-white",
    subtitle: "text-emerald-600/75 dark:text-emerald-300/80 group-hover:dark:text-emerald-200",
  },
};

/**
 * Reusable Quick Actions Container for Student Dashboard (Desktop view)
 */
export const StudentQuickActions = ({
  actions = DEFAULT_ACTIONS,
  onNavigate,
}) => {
  const navigate = useNavigate();

  const handleAction = (item) => {
    if (onNavigate) {
      onNavigate(item.link);
    } else {
      navigate(item.link);
    }
  };

  return (
    <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 2xl:col-span-5 bg-white dark:bg-[#0f172a]/95 border border-slate-100/90 dark:border-slate-800 hover:dark:border-slate-700 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-3.5 sm:p-4 lg:p-4 xl:p-4.5 2xl:p-6 flex-col justify-between space-y-2 rounded-2xl transition-all duration-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-0.5">
        <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 2xl:w-8.5 2xl:h-8.5 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 border border-blue-100 dark:border-blue-500/30 flex items-center justify-center shrink-0 shadow-xs dark:shadow-[0_0_12px_rgba(59,130,246,0.25)]">
          <Zap size={14} className="fill-[#2563eb] dark:fill-blue-400 2xl:w-4 2xl:h-4" />
        </div>
        <h3 className="text-sm sm:text-base 2xl:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Quick Actions
        </h3>
      </div>

      {/* Actions: 3 distinct styled responsive items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 xl:gap-2.5 2xl:gap-3.5 w-full flex-1">
        {actions.map((act) => {
          const colorKey = act.color || "blue";
          const styles = COLOR_STYLES[colorKey] || COLOR_STYLES.blue;
          const IconComp = act.icon || GraduationCap;

          return (
            <div
              key={act.id}
              onClick={() => handleAction(act)}
              className={`${styles.card} border rounded-xl p-2.5 xl:p-3 2xl:p-4 transition-all duration-200 shadow-2xs hover:shadow-xs dark:shadow-none hover:-translate-y-1 cursor-pointer group flex flex-col justify-between gap-2 min-w-0`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-7 h-7 2xl:w-9 2xl:h-9 rounded-lg border border-transparent flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-200 shadow-2xs ${styles.iconBox}`}
                >
                  <IconComp size={15} className="2xl:w-4.5 2xl:h-4.5" />
                </div>
                <div
                  className={`w-5 h-5 2xl:w-6 2xl:h-6 rounded-full border group-hover:translate-x-0.5 flex items-center justify-center transition-all duration-200 shrink-0 ${styles.arrowBox}`}
                >
                  <ArrowRight size={11} strokeWidth={2.5} className="2xl:w-3 2xl:h-3" />
                </div>
              </div>
              <div className="min-w-0">
                <h4
                  className={`font-bold text-xs 2xl:text-sm transition-colors truncate ${styles.title}`}
                >
                  {act.title}
                </h4>
                <p
                  className={`text-[10.5px] 2xl:text-xs font-medium truncate mt-0.5 transition-colors ${styles.subtitle}`}
                >
                  {act.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentQuickActions;
