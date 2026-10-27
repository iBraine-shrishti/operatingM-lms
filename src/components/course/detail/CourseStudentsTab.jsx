import React from "react";

/**
 * CourseStudentsTab Component (Admin Only)
 * Displays list of enrolled learners with their current progress and status.
 */
export const CourseStudentsTab = ({ students = [] }) => {
  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-white text-base">
        Enrolled Learners & Performance
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {students.map((s) => (
          <div
            key={s.id}
            className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={s.avatar}
                alt={s.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {s.name}
                </h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  {s.email}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold tabular-nums text-[#3b49df] dark:text-blue-400 block">
                {s.overallProgress}%
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseStudentsTab;
