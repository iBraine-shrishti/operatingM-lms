import React from "react";
import { AlertTriangle, Lock } from "lucide-react";

/**
 * Reusable modal displaying window focus / security violation warning strikes.
 */
export const ExamWarningModal = ({ strikeAlert, maxWarnings = 3, onAcknowledge }) => {
  if (!strikeAlert) return null;

  const isDisqualified = strikeAlert.strikeNumber >= maxWarnings;

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-amber-300 dark:border-amber-700/60 rounded-2xl p-6 sm:p-7 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
          <AlertTriangle size={30} />
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700 tracking-wider inline-block mb-2">
          Assessment Warning #{strikeAlert.strikeNumber} of {maxWarnings}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
          Exam Window Focus Alert
        </h3>
        <p className="text-amber-700 dark:text-amber-400 font-mono text-xs mt-1 font-semibold">
          Notice: {strikeAlert.reason}
        </p>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
          Switching browser tabs, minimizing the test window, or engaging
          secondary applications during the live examination is strictly logged.
        </p>

        {isDisqualified ? (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold flex items-center justify-center gap-2">
            <Lock size={15} />
            <span>WARNING LIMIT REACHED • AUTO-SUBMITTING SESSION...</span>
          </div>
        ) : (
          <div className="mt-5">
            <button
              type="button"
              onClick={onAcknowledge}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              I Understand — Return to Assessment ({strikeAlert.remaining} Warnings Left)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
