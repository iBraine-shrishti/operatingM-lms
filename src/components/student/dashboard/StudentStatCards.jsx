import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Bell } from "lucide-react";
import { StudentStatCard } from "./StudentStatCard";

const ICON_MAP = {
  BookOpen,
  Trophy,
  Bell,
};

/**
 * Reusable 4-card Grid for Student Overview Metrics
 */
export const StudentStatCards = ({ stats = [], onNavigate }) => {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    if (onNavigate) {
      onNavigate(link);
    } else {
      navigate(link);
    }
  };

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-3.5 xl:gap-4 2xl:gap-5">
      {stats.map((item) => {
        const IconComp = item.iconName ? ICON_MAP[item.iconName] : null;

        return (
          <StudentStatCard
            key={item.id || item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            color={item.color}
            showCircularProgress={Boolean(item.showCircularProgress)}
            progressPercent={item.progressPercent || 65}
            icon={IconComp}
            onClick={() => handleCardClick(item.link || "/enrolled-courses")}
          />
        );
      })}
    </div>
  );
};

export default StudentStatCards;
