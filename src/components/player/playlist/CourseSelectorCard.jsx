import React from "react";
import { GraduationCap, ChevronDown } from "lucide-react";
import { lmsService } from "../../../services/lmsService";

/**
 * CourseSelectorCard Component
 * Displays the current course status badge, progress bar,
 * and expandable dropdown switcher to seamlessly switch enrolled courses.
 */
export const CourseSelectorCard = ({
  currentCourse,
  courses = [],
  isCourseDropdownOpen,
  setIsCourseDropdownOpen,
  courseDropdownRef,
  onSelectCourse,
  allPlayerItemsCount = 0,
  sectionsCount = 0,
  completedCount = 0,
  progressPercent = 0,
}) => {
  return (
    <div className="relative" ref={courseDropdownRef}>
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900 text-slate-900 dark:text-white shadow-xs border border-blue-200/80 dark:border-blue-600/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-500/25 dark:text-blue-200 border border-blue-200/90 dark:border-blue-400/40 shadow-2xs">
            <GraduationCap
              size={13}
              className="text-blue-600 dark:text-blue-300"
            />
            <span>Enrolled Course</span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-blue-300/80">
            Click below to switch
          </span>
        </div>

        {/* Master Course Display & Switcher Trigger */}
        <button
          type="button"
          onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/15 border border-slate-200/80 dark:border-white/15 transition-all text-left cursor-pointer group shadow-2xs dark:shadow-inner"
        >
          <div className="flex items-center space-x-3 min-w-0">
            {currentCourse?.thumbnail ? (
              <img
                src={currentCourse.thumbnail}
                alt={currentCourse.title}
                className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/20 shrink-0 shadow-2xs"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shrink-0">
                {currentCourse?.title?.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                {currentCourse?.title}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-blue-200 font-medium truncate mt-0.5">
                {currentCourse?.category || "Certification"} •{" "}
                {allPlayerItemsCount} Lessons & Activities •{" "}
                {sectionsCount} Modules
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 shrink-0 ml-2">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 hidden sm:inline">
              Switch
            </span>
            <ChevronDown
              size={16}
              className={`text-blue-600 dark:text-blue-300 transition-transform duration-200 ${
                isCourseDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Master Course Progress */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 dark:text-blue-200">
            <span>Overall Course Progress</span>
            <span className="text-blue-600 dark:text-cyan-300 tabular-nums">
              {completedCount} / {allPlayerItemsCount} Activities ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200/80 dark:bg-black/40 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ACTUAL COURSES DROPDOWN POPOVER */}
      {isCourseDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-[#0b1329] rounded-2xl shadow-2xl border-2 border-blue-500/50 p-2 space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2">
          <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <GraduationCap size={13} className="text-blue-600" />
              <span>Select an Actual Course</span>
            </span>
            <span className="text-[10px] text-slate-400">
              {courses.length} Courses
            </span>
          </div>
          {courses.map((c) => {
            const isSelected = c.id === currentCourse?.id;
            const cUnits = lmsService.getUnitsByCourse(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectCourse(c)}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/60 border border-blue-500/50 text-blue-900 dark:text-blue-100 shadow-2xs"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  {c.thumbnail ? (
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {c.title?.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">
                      {c.title}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {cUnits.length} video lessons • {c.category}
                    </p>
                  </div>
                </div>
                {isSelected ? (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-600 text-white shrink-0 ml-1">
                    Current
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                    Switch →
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
