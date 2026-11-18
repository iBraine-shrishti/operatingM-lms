import React from "react";
import { PlaylistHeader } from "./PlaylistHeader";
import { ModuleAccordionItem } from "./ModuleAccordionItem";

/**
 * LessonPlaylist Component
 * Clean, intuitive course video playlist sidebar modeled after modern video learning platforms.
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
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
      {/* Course Content Header */}
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

      {/* Accordion Module List */}
      <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
        {filteredSections.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            <p>No lectures matching your search</p>
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
