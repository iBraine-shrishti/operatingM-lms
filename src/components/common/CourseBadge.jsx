import React from "react";
import { getCourseTheme } from "../../config/courseThemesConfig";

/**
 * Reusable CourseBadge component
 * Renders a consistent, theme-colored pill with course icon and title
 */
export const CourseBadge = ({
  courseId,
  courseTitle = "",
  category = "",
  size = "sm",
  showIcon = true,
  className = "",
}) => {
  const theme = getCourseTheme(courseId, courseTitle, category);
  const Icon = theme.icon;

  const sizeClasses =
    size === "md"
      ? "text-xs px-3 py-1 space-x-1.5"
      : "text-[11px] px-2.5 py-0.5 space-x-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border ${theme.pillStyle} ${sizeClasses} ${className}`}
      title={courseTitle || theme.name}
    >
      {showIcon && <Icon size={size === "md" ? 14 : 12} className="shrink-0" />}
      <span className="truncate max-w-[190px]">{theme.short || theme.name}</span>
    </span>
  );
};

export default CourseBadge;
