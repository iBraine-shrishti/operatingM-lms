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
  onResetFilters,
  onCardClick,
  onOutlineClick,
  onResumeClick,
  onEditClick,
}) => {
  if (courses.length === 0) {
    return (
      <EnrolledCoursesEmptyState
        hasNoEnrollments={hasNoEnrollments}
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
