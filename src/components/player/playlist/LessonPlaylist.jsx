import React from "react";
import { CourseSelectorCard } from "./CourseSelectorCard";
import { PlaylistHeader } from "./PlaylistHeader";
import { ModuleAccordionItem } from "./ModuleAccordionItem";

/**
 * LessonPlaylist Component
 * Right column container rendering the master course selector card,
 * module progress counters, playlist search bar, and module accordions.
 */
export const LessonPlaylist = ({
  currentCourse,
  courses = [],
  isCourseDropdownOpen,
  setIsCourseDropdownOpen,
  courseDropdownRef,
  onSelectCourse,
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
      {/* LEVEL 1: ACTUAL MASTER COURSE CARD & SELECTOR DROPDOWN */}
      <CourseSelectorCard
        currentCourse={currentCourse}
        courses={courses}
        isCourseDropdownOpen={isCourseDropdownOpen}
        setIsCourseDropdownOpen={setIsCourseDropdownOpen}
        courseDropdownRef={courseDropdownRef}
        onSelectCourse={onSelectCourse}
        allPlayerItemsCount={allPlayerItemsCount}
        sectionsCount={sections.length}
        completedCount={completedCount}
        progressPercent={progressPercent}
      />

      {/* LEVEL 2: COURSE MODULES SECTION HEADER & SEARCH */}
      <PlaylistHeader
        modulesCount={sections.length}
        onExpandAll={onExpandAll}
        onCollapseAll={onCollapseAll}
        searchQuery={playlistSearch}
        onSearchChange={onSearchChange}
      />

      {/* LEVEL 2: MODULES ACCORDION LIST */}
      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
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
