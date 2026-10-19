import React from "react";
import { AlertTriangle, LogOut, X } from "lucide-react";

/**
 * Reusable modal confirming whether candidate wants to exit the live examination.
 */
export const ExamExitModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-rose-300 dark:border-rose-700/60 rounded-2xl p-6 sm:p-7 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 dark:bg-rose-500/20 border border-rose-300 dark:border-rose-500 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
          <LogOut size={28} />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
          Exit Examination Hall?
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
          Are you sure you want to leave the examination? If you exit now,
          your current progress will not be certified. This action will cancel your ongoing test session.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer"
          >
            Stay in Exam
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm tracking-wide shadow-md transition-all cursor-pointer ring-2 ring-rose-300/40"
          >
            Confirm Exit Hall
          </button>
        </div>
      </div>
    </div>
  );
};
