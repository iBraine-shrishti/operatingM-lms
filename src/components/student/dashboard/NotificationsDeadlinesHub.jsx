import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Clock,
  ExternalLink,
  ChevronRight,
  Flame,
  AlertTriangle,
  CreditCard,
  BookCheck,
  Award,
} from "lucide-react";

const SEVERITY_CONFIGS = {
  critical: {
    itemBorderHover: "hover:border-rose-400 dark:hover:border-rose-500/80",
    itemShadowHover:
      "hover:shadow-[0_6px_20px_rgba(244,63,94,0.18)] dark:hover:shadow-[0_6px_20px_rgba(244,63,94,0.3)]",
    stripBg:
      "bg-rose-50 text-rose-600 border-rose-500 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-500",
    badgeBg: "bg-rose-600 text-white shadow-[0_0_8px_rgba(244,63,94,0.3)]",
    clockColor: "text-rose-500 dark:text-rose-400",
    btnStyle:
      "bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-[0_2px_8px_rgba(244,63,94,0.3)] dark:shadow-[0_0_12px_rgba(244,63,94,0.4)] group-hover:brightness-110 group-hover:border-rose-500",
    stripText: "TODAY",
    titleHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    icon: Flame,
    iconClass: "text-rose-600 dark:text-rose-400 animate-pulse group-hover:scale-125",
  },
  pending_group: {
    itemBorderHover: "hover:border-purple-400 dark:hover:border-purple-500/80",
    itemShadowHover:
      "hover:shadow-[0_6px_20px_rgba(168,85,247,0.18)] dark:hover:shadow-[0_6px_20px_rgba(168,85,247,0.3)]",
    stripBg:
      "bg-purple-50 text-purple-700 border-purple-500 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-500",
    badgeBg: "bg-purple-600 text-white shadow-[0_0_8px_rgba(168,85,247,0.3)]",
    clockColor: "text-purple-500 dark:text-purple-400",
    btnStyle:
      "bg-purple-600 hover:bg-purple-700 text-white border-purple-600 shadow-[0_2px_8px_rgba(168,85,247,0.3)] dark:shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:brightness-110 group-hover:border-purple-500",
    stripText: "6 TASKS",
    titleHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    icon: AlertTriangle,
    iconClass: "text-purple-600 dark:text-purple-400 group-hover:scale-125",
  },
  payment: {
    itemBorderHover: "hover:border-amber-400 dark:hover:border-amber-500/80",
    itemShadowHover:
      "hover:shadow-[0_6px_20px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_6px_20px_rgba(245,158,11,0.3)]",
    stripBg:
      "bg-amber-50 text-amber-800 border-amber-500 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-500",
    badgeBg:
      "bg-amber-500 text-slate-950 font-black shadow-[0_0_8px_rgba(245,158,11,0.3)]",
    clockColor: "text-amber-500 dark:text-amber-400",
    btnStyle:
      "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black border-amber-500 shadow-[0_2px_8px_rgba(245,158,11,0.3)] dark:shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:brightness-110 group-hover:border-amber-400",
    stripText: "7d LEFT",
    titleHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    icon: CreditCard,
    iconClass: "text-amber-700 dark:text-amber-300 group-hover:scale-125",
  },
  quiz: {
    itemBorderHover: "hover:border-blue-400 dark:hover:border-blue-500/80",
    itemShadowHover:
      "hover:shadow-[0_6px_20px_rgba(37,99,235,0.18)] dark:hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)]",
    stripBg:
      "bg-blue-50 text-blue-600 border-blue-500 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-500",
    badgeBg: "bg-blue-600 text-white shadow-[0_0_8px_rgba(37,99,235,0.3)]",
    clockColor: "text-blue-500 dark:text-blue-400",
    btnStyle:
      "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.3)] dark:shadow-[0_0_12px_rgba(37,99,235,0.4)] group-hover:brightness-110 group-hover:border-blue-500",
    stripText: "5d LEFT",
    titleHover: "group-hover:text-blue-600 dark:group-hover:text-cyan-400",
    icon: BookCheck,
    iconClass: "text-blue-600 dark:text-blue-400 group-hover:scale-125",
  },
  exam: {
    itemBorderHover: "hover:border-emerald-400 dark:hover:border-emerald-500/80",
    itemShadowHover:
      "hover:shadow-[0_6px_20px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)]",
    stripBg:
      "bg-emerald-50 text-emerald-700 border-emerald-500 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-500",
    badgeBg:
      "bg-emerald-600 text-white shadow-[0_0_8px_rgba(16,185,129,0.3)]",
    clockColor: "text-emerald-500 dark:text-emerald-400",
    btnStyle:
      "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.3)] dark:shadow-[0_0_12px_rgba(16,185,129,0.4)] group-hover:brightness-110 group-hover:border-emerald-500",
    stripText: "EXAM",
    titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    icon: Award,
    iconClass: "text-emerald-600 dark:text-emerald-400 group-hover:scale-125",
  },
};

/**
 * Reusable Notifications & Deadlines Hub Component
 */
export const NotificationsDeadlinesHub = ({
  notifications = [],
  summaryText = "1 Overdue • 1 Due Today • 1 Fee Notice",
  onOpenAssignmentsModal,
  onOpenPaymentModal,
  onNavigate,
}) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.actionType === "open_assignments_modal") {
      if (onOpenAssignmentsModal) onOpenAssignmentsModal();
    } else if (item.actionType === "open_payment_modal") {
      if (onOpenPaymentModal) onOpenPaymentModal();
    } else if (item.link) {
      if (onNavigate) {
        onNavigate(item.link);
      } else {
        navigate(item.link);
      }
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-[#0b1329]/95 border border-slate-100 dark:border-slate-800/80 hover:border-blue-400/40 dark:hover:border-blue-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_45px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_12px_45px_rgba(37,99,235,0.18)] p-3.5 sm:p-4 lg:p-4 xl:p-4.5 2xl:p-6 space-y-2.5 xl:space-y-3 2xl:space-y-3.5 rounded-2xl flex flex-col justify-between transition-all duration-200 group/hub">
      {/* Header */}
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 2xl:w-9.5 2xl:h-9.5 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-500/30 shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.25)] relative group/bell cursor-pointer hover:scale-110 transition-all duration-200">
            <Bell size={14} className="text-[#2563eb] dark:text-blue-400 2xl:w-4.5 2xl:h-4.5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#2563eb] dark:bg-cyan-400 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm sm:text-base 2xl:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover/hub:text-blue-600 dark:group-hover/hub:text-cyan-300 transition-colors">
                Notifications & Deadlines
              </h3>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] 2xl:text-[11px] font-bold bg-blue-50 dark:bg-blue-500/20 text-[#2563eb] dark:text-cyan-300 border border-blue-200/80 dark:border-blue-500/40 shadow-xs shrink-0 cursor-default">
                {notifications.length} Items
              </span>
            </div>
            <p className="text-[10px] xl:text-[10.5px] 2xl:text-xs text-slate-500 dark:text-slate-300 font-medium truncate">
              Submission deadlines, pending tasks & payment schedules
            </p>
          </div>
        </div>
      </div>

      {/* Listed Notifications */}
      <div className="flex-1 flex flex-col justify-between gap-1.5 xl:gap-2 2xl:gap-3 my-0.5 2xl:my-1">
        {notifications.map((item) => {
          const cfg = SEVERITY_CONFIGS[item.severity] || SEVERITY_CONFIGS.critical;
          const StripIcon = cfg.icon;

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/90 ${cfg.itemBorderHover} ${cfg.itemShadowHover} hover:bg-slate-50/70 dark:hover:bg-slate-850 hover:-translate-y-0.5 rounded-xl overflow-hidden flex items-stretch cursor-pointer group shadow-2xs transition-all duration-200 2xl:min-h-[58px]`}
            >
              {/* Left Full-Height Strip */}
              <div
                className={`self-stretch flex flex-col items-center justify-center px-1.5 sm:px-2 2xl:px-3 text-center shrink-0 min-w-[44px] sm:min-w-[48px] 2xl:min-w-[56px] border-l-3 ${cfg.stripBg} group-hover:brightness-110 transition-all`}
              >
                <StripIcon
                  size={13}
                  className={`transition-transform duration-200 2xl:w-4 2xl:h-4 ${cfg.iconClass}`}
                />
                <span className="text-[8.5px] 2xl:text-[10px] font-black uppercase tracking-tight leading-none mt-0.5">
                  {cfg.stripText}
                </span>
              </div>

              {/* Content Section */}
              <div className="flex-1 min-w-0 py-1.5 2xl:py-2.5 px-2.5 2xl:px-4 flex items-center justify-between gap-2">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`inline-flex items-center px-1.5 2xl:px-2 py-0.5 rounded text-[9px] 2xl:text-[10.5px] font-bold leading-none shadow-2xs ${cfg.badgeBg}`}
                    >
                      {item.badgeText}
                    </span>
                    <span className="text-[10px] 2xl:text-xs text-slate-500 dark:text-slate-300 font-semibold truncate">
                      {item.course}
                    </span>
                  </div>

                  <h5
                    className={`font-bold text-xs 2xl:text-sm text-slate-900 dark:text-white ${cfg.titleHover} transition-colors truncate leading-tight`}
                  >
                    {item.title}
                  </h5>

                  <div className="flex items-center gap-1 text-[10px] 2xl:text-xs text-slate-500 dark:text-slate-300 font-medium">
                    <Clock size={10} className={`${cfg.clockColor} 2xl:w-3 2xl:h-3`} />
                    <span>{item.dueDate}</span>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 flex items-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 2xl:px-4 py-1 2xl:py-2 rounded-lg text-[10.5px] 2xl:text-xs font-bold border transition-all duration-200 group-hover:scale-105 ${cfg.btnStyle}`}
                  >
                    <span>{item.btnText}</span>
                    {item.actionType ? (
                      <ExternalLink size={10} className="2xl:w-3 2xl:h-3" />
                    ) : (
                      <ChevronRight
                        size={11}
                        strokeWidth={2.5}
                        className="2xl:w-3 2xl:h-3"
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="pt-2 2xl:pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] 2xl:text-xs text-slate-600 dark:text-slate-300 cursor-default">
        <AlertTriangle
          size={13}
          className="text-amber-500 shrink-0 animate-pulse 2xl:w-4 2xl:h-4"
        />
        <span className="font-semibold">
          <strong className="text-slate-900 dark:text-white font-black">
            1 Overdue
          </strong>{" "}
          • 1 Due Today • 1 Fee Notice
        </span>
      </div>
    </div>
  );
};

export default NotificationsDeadlinesHub;
