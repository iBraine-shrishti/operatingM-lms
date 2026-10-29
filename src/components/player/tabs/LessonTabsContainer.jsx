import React from "react";
import { LessonOverviewTab } from "./LessonOverviewTab";
import { LessonNotesTab } from "./LessonNotesTab";
import { LessonResourcesTab } from "./LessonResourcesTab";
import { LessonDiscussionTab } from "./LessonDiscussionTab";

/**
 * LessonTabsContainer Component
 * Tabbed interactive container for Overview, Notes, Resources, and Discussion.
 */
export const LessonTabsContainer = ({
  activeTab = "overview",
  setActiveTab,
  userNotes = [],
  currentCourse,
  currentLesson,
  noteContent,
  setNoteContent,
  currentTime = 0,
  onInsertTimestamp,
  onSaveNote,
  onDownloadResource,
  onNavigateForums,
}) => {
  const courseNotesCount = userNotes.filter(
    (n) => n.courseId === currentCourse?.id
  ).length;

  const tabs = [
    { key: "overview", label: "Lesson Overview" },
    { key: "notes", label: `Personal Notes (${courseNotesCount})` },
    { key: "resources", label: "Resources & Cheat Sheet" },
    { key: "discussion", label: "Student Q&A & Forums" },
  ];

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Tab navigation */}
      <div className="border-b border-slate-100 dark:border-slate-800 flex space-x-6 pb-2 text-xs font-bold overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600 dark:text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <LessonOverviewTab
          currentLesson={currentLesson}
          currentCourse={currentCourse}
        />
      )}

      {activeTab === "notes" && (
        <LessonNotesTab
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          userNotes={userNotes}
          currentCourse={currentCourse}
          currentLesson={currentLesson}
          currentTime={currentTime}
          onInsertTimestamp={onInsertTimestamp}
          onSaveNote={onSaveNote}
        />
      )}

      {activeTab === "resources" && (
        <LessonResourcesTab
          currentLesson={currentLesson}
          onDownloadResource={onDownloadResource}
        />
      )}

      {activeTab === "discussion" && (
        <LessonDiscussionTab onNavigateForums={onNavigateForums} />
      )}
    </div>
  );
};
