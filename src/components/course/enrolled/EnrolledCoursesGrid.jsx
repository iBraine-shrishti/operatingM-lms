import React from "react";
import { EnrolledCourseCard } from "./EnrolledCourseCard";
import { EnrolledCoursesEmptyState } from "./EnrolledCoursesEmptyState";

/**
 * EnrolledCoursesGrid Component
 * Renders the grid of EnrolledCourseCards or the EnrolledCoursesEmptyState
 * if no courses match the active filters.
 */
export const EnrolledCoursesGrid = ({
  courses = [],
  courseMetricsMap = {},
  isAdmin = false,
  hasNoEnrollments = false,
  isExpired = false,
  courseEnd = "",
  daysLeft = 0,
  isLoading = false,
  onResetFilters,
  onCardClick,
  onOutlineClick,
  onResumeClick,
  onEditClick,
}) => {
  // If CRM profile or permissions are still loading, show animated skeleton placeholders
  // NEVER show "No Enrolled Courses Found" empty state while asynchronous network requests are loading!
  if (isLoading && !isExpired) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-4"
          >
            <div className="w-full h-36 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0 || isExpired) {
    return (
      <EnrolledCoursesEmptyState
        hasNoEnrollments={hasNoEnrollments}
        isExpired={isExpired}
        courseEnd={courseEnd}
        daysLeft={daysLeft}
        onResetFilters={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {courses.map((course) => {
        const metrics = courseMetricsMap[course.id] || {
          progress: 0,
          isCompleted: false,
          duration: "N/A",
          totalLessons: 0,
          completedActivities: 0,
          totalActivities: 0,
        };

        return (
          <EnrolledCourseCard
            key={course.id}
            course={course}
            metrics={metrics}
            isAdmin={isAdmin}
            onCardClick={() => onCardClick(course.id)}
            onOutlineClick={(e) => {
              e.stopPropagation();
              onOutlineClick(course.id);
            }}
            onResumeClick={(e) => {
              e.stopPropagation();
              onResumeClick(course.id);
            }}
            onEditClick={(e) => {
              e.stopPropagation();
              onEditClick(course.id);
            }}
          />
        );
      })}
    </div>
  );
};

export default EnrolledCoursesGrid;
