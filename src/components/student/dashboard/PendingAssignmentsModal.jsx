import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, X, Flame, Clock, ArrowRight } from "lucide-react";

/**
 * Reusable Pending & Overdue Assignments Modal Dialog
 */
export const PendingAssignmentsModal = ({
  isOpen = false,
  onClose,
  assignments = [],
  onSelectAssignment,
  onViewAll,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelect = (assign) => {
    if (onSelectAssignment) {
      onSelectAssignment(assign);
    } else {
      if (onClose) onClose();
      navigate(`/my-assignments?id=${assign.id}`);
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      if (onClose) onClose();
      navigate("/my-assignments");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800/90 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0f172a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 shadow-2xs dark:shadow-[0_0_12px_rgba(244,63,94,0.25)] flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                Assignments ({assignments.length})
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 shadow-2xs">
                  1 Overdue • 5 Pending
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                Click any assignment below to directly open its submission form
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Overdue Warning Alert Strip */}
        <div className="bg-rose-50 dark:bg-rose-950/70 border-b border-rose-100 dark:border-rose-900/60 px-4 py-2.5 flex items-center justify-between text-xs text-rose-800 dark:text-rose-200">
          <div className="flex items-center gap-2">
            <Flame
              size={14}
              className="text-rose-600 dark:text-rose-400 shrink-0 animate-pulse"
            />
            <span className="font-semibold">
              <strong>Due date gone for 1 assignment!</strong> Submit
              immediately to prevent grade penalty.
            </span>
          </div>
        </div>

        {/* Modal Body: List of Pending & Overdue Assignments */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {assignments.map((assign) => {
            const isOverdue = assign.status === "overdue" || assign.daysLeft < 0;
            const isUrgent = assign.daysLeft > 0 && assign.daysLeft <= 2;
            const isYellow = assign.daysLeft > 2 && assign.daysLeft <= 7;

            return (
              <div
                key={assign.id}
                onClick={() => handleSelect(assign)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer group flex items-start justify-between gap-3 shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${
                  isOverdue
                    ? "border-rose-300 dark:border-rose-500/50 bg-rose-50/40 dark:bg-rose-950/40 hover:bg-rose-50/80 dark:hover:bg-rose-900/40"
                    : isUrgent
                      ? "border-rose-200 dark:border-rose-600/40 bg-rose-50/30 dark:bg-rose-950/30 hover:bg-rose-50/70 dark:hover:bg-rose-900/30"
                      : isYellow
                        ? "border-amber-200 dark:border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/30 hover:bg-amber-50/70 dark:hover:bg-amber-900/30"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-blue-50/30 dark:hover:bg-slate-850 hover:border-blue-300 dark:hover:border-blue-500/40"
                }`}
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                        isOverdue
                          ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                          : isUrgent
                            ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                            : isYellow
                              ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {assign.badgeText}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-300 font-semibold truncate">
                      {assign.course}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors">
                    {assign.title}
                  </h4>

                  <p className="text-[11.5px] text-slate-500 dark:text-slate-300 line-clamp-1 font-medium">
                    {assign.instructions}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] font-semibold pt-0.5">
                    <Clock
                      size={12}
                      className={
                        isOverdue
                          ? "text-rose-600 dark:text-rose-400"
                          : isUrgent
                            ? "text-rose-600 dark:text-rose-400"
                            : isYellow
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-slate-400"
                      }
                    />
                    <span
                      className={
                        isOverdue
                          ? "text-rose-700 dark:text-rose-400 font-bold"
                          : isUrgent
                            ? "text-rose-700 dark:text-rose-400 font-bold"
                            : isYellow
                              ? "text-amber-700 dark:text-amber-400 font-bold"
                              : "text-slate-600 dark:text-slate-400"
                      }
                    >
                      {assign.dueDate}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center self-center">
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 shadow-2xs transition-all ${
                      isOverdue
                        ? "bg-rose-600 text-white border-rose-600 group-hover:bg-rose-700 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                        : isUrgent
                          ? "bg-rose-600 text-white border-rose-600 group-hover:bg-rose-700 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                          : "bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-300 border-slate-200 dark:border-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                    }`}
                  >
                    Submit <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleViewAll}
            className="text-xs font-bold text-[#2563eb] dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Go to Full Assignments Hub</span>
            <ArrowRight size={12} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingAssignmentsModal;
