import React from "react";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { EXAM_TRACKS } from "./examTracksConfig";
import { ExamTrackCard } from "./ExamTrackCard";
import { StudentPageHeader } from "../student/StudentPageHeader";

/**
 * Card-Based Exam Catalog Page.
 * Styled consistently with other student pages (Enrolled Courses, Quizzes, Assignments),
 * featuring StudentPageHeader and a singular, uniform exam cards grid.
 */
export const ExamCourseSelector = ({ onSelectTrack }) => {
  return (
    <div className="space-y-6">
      {/* Standardized Student Page Header matching other pages */}
      <StudentPageHeader
        icon={Award}
        category="Operating Media Skillshop Certifications"
        badgeText="8 Tracks Open"
        title="Official Skills Certification Exams"
        description="Choose from 8 specialized industry certification tracks. Select any track to begin your proctored assessment with zero negative marking and earn verified credentials."
        metrics={[
          {
            label: "Certification Tracks",
            value: "8 Tracks",
            icon: Award,
            color: "text-blue-600 dark:text-cyan-400",
          },
          {
            label: "Marking Policy",
            value: "Zero Penalty",
            icon: ShieldCheck,
            color: "text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Passing Score",
            value: "80% Threshold",
            icon: CheckCircle2,
            color: "text-purple-600 dark:text-purple-400",
          },
        ]}
      />

      {/* Singular, Unified Card Grid for all 8 Exam Tracks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {EXAM_TRACKS.map((track) => (
          <ExamTrackCard
            key={track.id}
            track={track}
            onSelectTrack={onSelectTrack}
          />
        ))}
      </div>
    </div>
  );
};

export default ExamCourseSelector;
