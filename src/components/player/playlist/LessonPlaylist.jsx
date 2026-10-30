import React from "react";
import { PlaylistHeader } from "./PlaylistHeader";
import { ModuleAccordionItem } from "./ModuleAccordionItem";

/**
 * LessonPlaylist Component
 * Right column container directly rendering the Course Modules section,
 * overall progress indicator, Expand/Collapse controls, playlist search bar,
 * and collapsible module accordions.
 */
export const LessonPlaylist = ({
  currentCourse,
  allPlayerItemsCount = 0,
  sections = [],
  filteredSections = [],
  completedCount = 0,
  progressPercent = 0,
  expandedSections = {},
  onToggleSection,
  onExpandAll,
  onCollapseAll,
  playlistSearch = "",
  onSearchChange,
  currentLessonId,
  onSelectUnit,
  onNavigateQuiz,
  onNavigateAssignment,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* LEVEL 1: COURSE MODULES SECTION HEADER & SEARCH */}
      <PlaylistHeader
        modulesCount={sections.length}
        totalItemsCount={allPlayerItemsCount}
        completedCount={completedCount}
        progressPercent={progressPercent}
        onExpandAll={onExpandAll}
        onCollapseAll={onCollapseAll}
        searchQuery={playlistSearch}
        onSearchChange={onSearchChange}
      />

      {/* LEVEL 2: MODULES ACCORDION LIST */}
      <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredSections.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 space-y-1">
            <p className="font-semibold">No matching modules found</p>
            <p className="text-[11px]">Try adjusting your search query</p>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <ModuleAccordionItem
              key={sec.name}
              sec={sec}
              isExpanded={expandedSections[sec.name] !== false}
              onToggle={onToggleSection}
              currentLessonId={currentLessonId}
              currentCourseId={currentCourse?.id}
              onSelectUnit={onSelectUnit}
              onNavigateQuiz={onNavigateQuiz}
              onNavigateAssignment={onNavigateAssignment}
            />
          ))
        )}
      </div>
    </div>
  );
};
