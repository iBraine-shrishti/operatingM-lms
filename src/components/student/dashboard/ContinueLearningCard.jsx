import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  ArrowRight,
  Sparkles,
  Calendar,
  ChevronRight,
} from "lucide-react";
import continueLearningLaptopImg from "../../../assets/continue-learning-laptop.png";

/**
 * Reusable Continue Learning Section Component
 */
export const ContinueLearningCard = ({ data = {}, onNavigate }) => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const moduleNumber = data.moduleNumber || "MODULE 2 OF 4";
  const moduleBadge = data.moduleBadge || "SEO Technical";
  const lessonTitle =
    data.lessonTitle ||
    "Lesson 2.2: Schema Markup & Structured Data Implementation";
  const progressPercent = data.progressPercent || 65;
  const resumeLink = data.resumeLink || "/lesson-player?courseId=course-8";

  return (
    <div className="w-full h-full bg-white dark:bg-[#0b1329]/95 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:dark:border-slate-700/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-3.5 sm:p-4 lg:p-4 xl:p-4.5 2xl:p-6 space-y-2.5 xl:space-y-3 2xl:space-y-3.5 flex flex-col justify-between transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 2xl:w-9 2xl:h-9 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-500/30 shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.25)]">
            <Play
              size={13}
              className="fill-[#2563eb] dark:fill-blue-400 ml-0.5"
            />
          </div>
          <h3 className="text-sm sm:text-base 2xl:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Continue Learning
          </h3>
        </div>
        <button
          type="button"
          onClick={() => handleNav("/enrolled-courses")}
          className="text-xs 2xl:text-[13px] font-semibold text-[#2563eb] dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-all group"
        >
          <span>View All Courses</span>
          <ArrowRight
            size={12}
            strokeWidth={2.5}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>

      {/* Main Grid: Left Column (Image + Ring Chart) sits beside Right Column */}
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr] gap-3 xl:gap-4 2xl:gap-5 items-stretch flex-1 min-h-0">
        {/* LEFT COLUMN: Thumbnail + Segmented Circle Graph */}
        <div className="flex flex-col items-center sm:items-stretch gap-3 shrink-0 w-full sm:w-52 lg:w-48 xl:w-56 2xl:w-[240px] h-full justify-between">
          {/* Thumbnail */}
          <div className="w-full rounded-xl p-0.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:dark:border-blue-500/40 shadow-2xs dark:shadow-none hover:dark:shadow-[0_0_15px_rgba(37,99,235,0.2)] shrink-0 flex items-center justify-center overflow-hidden h-24 sm:h-28 xl:h-28 2xl:h-32 group transition-all duration-200">
            <img
              src={continueLearningLaptopImg}
              alt="Lesson Preview"
              className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Segmented Ring Chart */}
          <div className="bg-[#f8fafd] dark:bg-[#0f172a]/95 border border-slate-100/90 dark:border-slate-800/90 hover:dark:border-slate-700 p-3 sm:p-3.5 2xl:p-4 flex flex-col items-center justify-center w-full shrink-0 rounded-2xl flex-1 transition-all duration-200">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 2xl:w-40 2xl:h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                <circle
                  cx="55"
                  cy="55"
                  r="44"
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="9"
                  stroke="currentColor"
                  fill="none"
                />
                <circle
                  cx="55"
                  cy="55"
                  r="44"
                  className="text-[#2563eb] dark:text-blue-500"
                  strokeWidth="9"
                  strokeDasharray="124.2 276.46"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                />
                <circle
                  cx="55"
                  cy="55"
                  r="44"
                  className="text-[#06b6d4] dark:text-cyan-400"
                  strokeWidth="9"
                  strokeDasharray="27.5 276.46"
                  strokeDashoffset="-138.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                />
                <circle
                  cx="55"
                  cy="55"
                  r="44"
                  className="text-slate-300 dark:text-slate-700"
                  strokeWidth="9"
                  strokeDasharray="82.8 276.46"
                  strokeDashoffset="-179.7"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] 2xl:text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                  Progress
                </span>
                <span className="text-2xl sm:text-[26px] 2xl:text-[28px] font-black text-[#0c1e3d] dark:text-white leading-none mt-1">
                  {progressPercent}%
                </span>
                <span className="text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-100/80 dark:border-emerald-500/30 px-2 py-0.5 rounded-full mt-1 leading-none">
                  On Track
                </span>
              </div>
            </div>

            <div className="w-full mt-2.5 pt-2.5 2xl:mt-3 2xl:pt-3 border-t border-slate-200/70 dark:border-slate-800 space-y-1.5 text-[10.5px] 2xl:text-[11px] font-medium text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb] dark:bg-blue-500" />
                  Completed
                </span>
                <strong className="text-slate-900 dark:text-blue-300 font-bold">
                  150m (50%)
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4] dark:bg-cyan-400" />
                  Current
                </span>
                <strong className="text-slate-900 dark:text-cyan-300 font-bold">
                  45m (15%)
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                  Remaining
                </span>
                <strong className="text-slate-900 dark:text-slate-300 font-bold">
                  105m (35%)
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Info + Progress Bar + Metrics + Controls */}
        <div className="flex flex-col justify-between h-full gap-2.5 sm:gap-3 2xl:gap-3.5 min-w-0 flex-1">
          <div className="space-y-1 2xl:space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] xl:text-[10.5px] 2xl:text-xs font-extrabold tracking-wider text-slate-400 dark:text-cyan-400 uppercase">
                {moduleNumber}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-[10px] 2xl:text-[11px] font-medium text-slate-600 dark:text-slate-200">
                {moduleBadge}
              </span>
            </div>
            <h4
              onClick={() => handleNav(resumeLink)}
              className="text-sm sm:text-base 2xl:text-lg font-extrabold text-[#0c1e3d] dark:text-white leading-snug hover:text-[#2563eb] dark:hover:text-cyan-300 transition-colors cursor-pointer truncate"
              title={lessonTitle}
            >
              {lessonTitle}
            </h4>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-3.5 2xl:gap-4">
            <div className="flex-1 h-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-inner rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563eb] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 tabular-nums shrink-0">
              {progressPercent}%
            </span>
          </div>

          {/* Comparative Learning Analytics Panel */}
          <div className="bg-[#f8fafd] dark:bg-[#0f172a]/95 border border-slate-100 dark:border-slate-800/90 p-2.5 sm:p-3 2xl:p-3.5 rounded-xl space-y-2 2xl:space-y-2.5">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800/80 pb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-5 h-5 2xl:w-6 2xl:h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-[#2563eb] dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Sparkles
                    size={11}
                    className="fill-[#2563eb] dark:fill-blue-400"
                  />
                </div>
                <p className="text-[11px] 2xl:text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  Just{" "}
                  <strong className="text-[#2563eb] dark:text-cyan-400">
                    105m
                  </strong>{" "}
                  remain! Goal on track
                </p>
              </div>
              <span className="text-[10px] 2xl:text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200/60 dark:border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                195m watched
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 2xl:gap-2.5">
              <div className="bg-white dark:bg-slate-900/90 p-2 2xl:p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg shadow-2xs space-y-0.5 min-w-0">
                <span className="text-[9px] 2xl:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Status
                </span>
                <strong className="text-xs sm:text-sm 2xl:text-base font-black text-[#2563eb] dark:text-blue-400 block leading-tight">
                  65% Done
                </strong>
                <p className="text-[9.5px] 2xl:text-[11px] text-slate-500 dark:text-slate-300 truncate">
                  35% Left
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900/90 p-2 2xl:p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg shadow-2xs space-y-0.5 min-w-0">
                <span className="text-[9px] 2xl:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Position
                </span>
                <strong className="text-xs sm:text-sm 2xl:text-base font-black text-[#0c1e3d] dark:text-cyan-400 block leading-tight">
                  Module 2
                </strong>
                <p className="text-[9.5px] 2xl:text-[11px] text-slate-500 dark:text-slate-300 truncate">
                  Lesson 2.2
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900/90 p-2 2xl:p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg shadow-2xs space-y-0.5 min-w-0">
                <span className="text-[9px] 2xl:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Remaining
                </span>
                <strong className="text-xs sm:text-sm 2xl:text-base font-black text-purple-600 dark:text-purple-400 block leading-tight">
                  2 Modules
                </strong>
                <p className="text-[9.5px] 2xl:text-[11px] text-slate-500 dark:text-slate-300 truncate">
                  Mod 3 & 4
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center gap-2.5 2xl:gap-3">
            <div
              onClick={() => handleNav(resumeLink)}
              className="flex-1 min-w-0 bg-white dark:bg-slate-900/90 hover:bg-slate-50/40 dark:hover:bg-slate-850 border border-slate-100/80 dark:border-slate-800 hover:dark:border-blue-500/40 rounded-xl px-3 py-2 2xl:px-4 2xl:py-3 flex items-center justify-between gap-2 cursor-pointer transition-all duration-200 shadow-2xs group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6.5 h-6.5 2xl:w-8 2xl:h-8 rounded-lg bg-blue-50 dark:bg-blue-500/15 border border-blue-100/60 dark:border-blue-500/30 text-[#2563eb] dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Calendar size={13} className="2xl:w-4 2xl:h-4" />
                </div>
                <div className="min-w-0 truncate">
                  <span className="text-[9.5px] 2xl:text-xs text-slate-400 font-medium block leading-tight">
                    Next Lesson
                  </span>
                  <span className="text-xs 2xl:text-[13.5px] font-bold text-slate-800 dark:text-white block truncate">
                    {data.nextLesson?.title || "Structured Data Types"}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={13}
                strokeWidth={2.5}
                className="text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 2xl:w-4 2xl:h-4"
              />
            </div>

            <button
              type="button"
              onClick={() => handleNav(resumeLink)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 py-2.5 2xl:px-6 2xl:py-3.5 rounded-xl transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 text-xs 2xl:text-sm shrink-0 cursor-pointer whitespace-nowrap"
            >
              <Play size={12} className="fill-white 2xl:w-3.5 2xl:h-3.5" />
              <span>Resume Lesson</span>
              <ArrowRight
                size={13}
                strokeWidth={2.5}
                className="2xl:w-4 2xl:h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningCard;
