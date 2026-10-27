import React from "react";
import { BookOpen, Layers, CheckSquare, BookMarked, UserCheck } from "lucide-react";

/**
 * CourseDetailTabs Component
 * Sticky tab navigation bar for switching between:
 * - Overview
 * - Modules & Lessons (Outline)
 * - Quizzes & Assignments (Assessments)
 * - Notes
 * - Enrolled Students (Admin only)
 */
export const CourseDetailTabs = ({
  activeTab = "overview",
  onTabChange,
  courseQuizzesCount = 0,
  courseAssignmentsCount = 0,
  studentsCount = 0,
  isAdmin = false,
}) => {
  const totalAssessmentsCount = courseQuizzesCount + courseAssignmentsCount;

  const tabs = [
    { key: "overview", label: "Overview", icon: BookOpen },
    { key: "outline", label: "Modules & Lessons", icon: Layers },
    ...(totalAssessmentsCount > 0
      ? [
          {
            key: "assessments",
            label: `Assessments (${totalAssessmentsCount})`,
            icon: CheckSquare,
          },
        ]
      : [
          {
            key: "assessments",
            label: "Assessments",
            icon: CheckSquare,
          },
        ]),
    { key: "notes", label: "Notes", icon: BookMarked },
    ...(isAdmin
      ? [
          {
            key: "students",
            label: `Enrolled Students (${studentsCount})`,
            icon: UserCheck,
          },
        ]
      : []),
  ];

  return (
    <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-md rounded-xl border border-slate-200/80 dark:border-slate-800 p-1 shadow-2xs flex space-x-1 sm:space-x-1.5 overflow-x-auto custom-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
              isActive
                ? "bg-[#3b49df] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Icon
              size={13}
              className={
                isActive ? "text-white" : "text-slate-400 dark:text-slate-500"
              }
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CourseDetailTabs;
