import React from "react";
import { StudentPageHeader } from "../student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../../config/studentHeadersConfig";

/**
 * AchievementsHeader Component
 * Standardized StudentPageHeader configured for the achievements page with live metric counters.
 */
export const AchievementsHeader = ({
  liveExamCount = 0,
  liveMilestoneCount = 0,
}) => {
  return (
    <StudentPageHeader
      {...STUDENT_HEADERS_CONFIG.achievements}
      metrics={[
        {
          value: liveExamCount,
          label: "Exam Certificates",
          dotColor: "bg-blue-600",
        },
        {
          value: liveMilestoneCount,
          label: "Milestone Badges",
          dotColor: "bg-amber-500",
        },
        {
          value: "100%",
          label: "Verified Credentials",
          dotColor: "bg-purple-500",
        },
      ]}
    />
  );
};
