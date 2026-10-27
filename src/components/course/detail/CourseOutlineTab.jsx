import React from "react";
import { Award } from "lucide-react";
import { CourseSectionItem } from "./CourseSectionItem";

/**
 * CourseOutlineTab Component
 * Renders the Modules & Lessons tab:
 * 1. Course Progress Milestone Card with progress bar & count
 * 2. Header with Expand all / Collapse all controls
 * 3. Mapped list of CourseSectionItem accordions
 */
export const CourseOutlineTab = ({
  sections = [],
  expandedSections = {},
  activeMenuIdx = null,
  isAdmin = false,
  courseId,
  completedActivitiesCount = 0,
  totalActivitiesCount = 0,
  progressPercent = 0,
  onToggleSection,
  onExpandAll,
  onCollapseAll,
  onSetActiveMenuIdx,
  onNavigate,
  onToggleCompletion,
  onShowAiModal,
  onShowToast,
}) => {
  return (
    <div className="space-y-6">
      {/* Progress Summary Banner: Clean Distinct Milestone Card */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-[#0b1329] border border-blue-200/80 dark:border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#3b49df] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Award size={20} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Course Progress:{" "}
              <span className="text-[#3b49df] dark:text-blue-400">
                {completedActivitiesCount}
              </span>{" "}
              of {totalActivitiesCount} activities completed
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Complete all modules to unlock your official Operating Media
              certificate.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-56 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
            <span>Completion Status</span>
            <span className="text-[#3b49df] dark:text-blue-400 font-black tabular-nums">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3b49df] to-[#5068f2] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module List Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Modules & Lessons ({sections.length} Modules)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any module header to expand its lessons and activities.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={onExpandAll}
            className="font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Expand all
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            type="button"
            onClick={onCollapseAll}
            className="font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Module List matching course-outline.png */}
      <div className="space-y-4">
        {sections.map((section, sIdx) => (
          <CourseSectionItem
            key={section.name + sIdx}
            section={section}
            sIdx={sIdx}
            isExpanded={Boolean(expandedSections[sIdx])}
            activeMenuIdx={activeMenuIdx}
            isAdmin={isAdmin}
            courseId={courseId}
            onToggle={() => onToggleSection(sIdx)}
            onSetActiveMenuIdx={onSetActiveMenuIdx}
            onNavigate={onNavigate}
            onToggleCompletion={onToggleCompletion}
            onShowAiModal={onShowAiModal}
            onShowToast={onShowToast}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseOutlineTab;
