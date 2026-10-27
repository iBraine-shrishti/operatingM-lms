import React from "react";
import { Play } from "lucide-react";
import { StudentPageHeader } from "../../student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../../../config/studentHeadersConfig";

/**
 * EnrolledCoursesHeader Component
 * Standardized student header banner with live CRM enrollment metrics:
 * - Enrolled Courses count
 * - In Progress count
 * - Completed count
 * - Average Progress percentage
 * - Resume Active Lesson primary action button
 */
export const EnrolledCoursesHeader = ({
  totalCount = 0,
  inProgressCount = 0,
  completedCount = 0,
  avgProgress = 0,
  onResumeActiveLesson,
}) => {
  return (
    <StudentPageHeader
      {...STUDENT_HEADERS_CONFIG.enrolledCourses}
      metrics={[
        {
          value: totalCount,
          label: "Enrolled Courses",
          dotColor: "bg-blue-600",
        },
        {
          value: inProgressCount,
          label: "In Progress",
          dotColor: "bg-rose-500",
        },
        {
          value: completedCount,
          label: "Completed",
          dotColor: "bg-emerald-500",
        },
        {
          value: `${avgProgress}%`,
          label: "Avg. Progress",
          dotColor: "bg-purple-500",
        },
      ]}
      action={
        <button
          onClick={onResumeActiveLesson}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
        >
          <Play size={16} className="fill-white 2xl:w-4.5 2xl:h-4.5" />
          <span>Resume Active Lesson</span>
        </button>
      }
    />
  );
};

export default EnrolledCoursesHeader;
