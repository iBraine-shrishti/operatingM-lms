import React from "react";
import { Folder, FolderOpen, CheckCircle2, ChevronDown } from "lucide-react";
import { LessonPlaylistItem } from "./LessonPlaylistItem";

/**
 * ModuleAccordionItem Component
 * Collapsible module category card containing its nested lesson and assessment nodes.
 */
export const ModuleAccordionItem = ({
  sec,
  isExpanded = true,
  onToggle,
  currentLessonId,
  currentCourseId,
  onSelectUnit,
  onNavigateQuiz,
  onNavigateAssignment,
}) => {
  const containsActive = sec.items?.some((u) => u.id === currentLessonId);

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        containsActive
          ? "border-blue-400 dark:border-indigo-600 bg-blue-50/20 dark:bg-indigo-950/20 shadow-xs"
          : "border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0b1329]"
      }`}
    >
      {/* MODULE ACCORDION HEADER */}
      <button
        type="button"
        onClick={() => onToggle?.(sec.name)}
        className={`w-full p-3 sm:p-3.5 flex items-center justify-between transition-colors text-left cursor-pointer ${
          sec.isCompleted
            ? "bg-emerald-50/60 dark:bg-emerald-950/30 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/50"
            : containsActive
              ? "bg-blue-100/70 dark:bg-indigo-950/50 hover:bg-blue-100 dark:hover:bg-indigo-950/70"
              : "bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-800"
        }`}
      >
        <div className="flex items-center space-x-3 min-w-0 pr-2">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              sec.isCompleted
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                : containsActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            {sec.isCompleted ? (
              <CheckCircle2 size={16} />
            ) : isExpanded ? (
              <FolderOpen size={16} />
            ) : (
              <Folder size={16} />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-blue-100 dark:bg-indigo-950/80 text-blue-700 dark:text-indigo-300">
                Module {sec.index}
              </span>
              {containsActive && (
                <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-sm uppercase tracking-wide">
                  Active Lesson
                </span>
              )}
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
              {sec.name}
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 tabular-nums">
            {sec.completedCount}/{sec.totalCount}
          </span>
          <ChevronDown
            size={15}
            className={`text-slate-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* LEVEL 3: INDENTED VIDEO LESSONS LIST */}
      {isExpanded && (
        <div className="p-2.5 space-y-1.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="ml-2 pl-3 border-l-2 border-blue-200 dark:border-indigo-900/60 space-y-1.5">
            {sec.items?.map((unit, uIdx) => (
              <LessonPlaylistItem
                key={unit.id}
                unit={unit}
                secIndex={sec.index}
                uIdx={uIdx}
                currentLessonId={currentLessonId}
                currentCourseId={currentCourseId}
                onSelectUnit={onSelectUnit}
                onNavigateQuiz={onNavigateQuiz}
                onNavigateAssignment={onNavigateAssignment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
