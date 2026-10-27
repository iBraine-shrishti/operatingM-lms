import React from "react";
import { ActivityTimelineNode } from "./ActivityTimelineNode";

/**
 * ActivityTimelineFeed Component
 * Renders the continuous vertical timeline stream connecting milestone nodes.
 */
export const ActivityTimelineFeed = ({
  activities = [],
  currentStudentName,
  currentStudentAvatar,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 2xl:p-7 shadow-xs">
      <div className="relative">
        {/* Continuous Timeline Line perfectly centered through every circle node */}
        <div
          className="absolute top-5 bottom-5 left-4.5 sm:left-5 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 dark:via-blue-600 to-slate-200 dark:to-slate-800 pointer-events-none"
          aria-hidden="true"
        />

        <div className="space-y-3 sm:space-y-3.5">
          {activities.map((act) => (
            <ActivityTimelineNode
              key={act.id}
              act={act}
              currentStudentName={currentStudentName}
              currentStudentAvatar={currentStudentAvatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
