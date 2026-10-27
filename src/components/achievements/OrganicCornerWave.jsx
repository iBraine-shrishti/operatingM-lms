import React from "react";

/**
 * Organic decorative wave in the bottom-right corner of cards
 * Matches the curved background aesthetic in course-comp-achieve.png and milestone.png
 */
export const OrganicCornerWave = ({ color = "blue" }) => {
  const waveColors = {
    blue: { fill1: "#bfdbfe", fill2: "#93c5fd" },
    green: { fill1: "#a7f3d0", fill2: "#6ee7b7" },
    purple: { fill1: "#ddd6fe", fill2: "#c4b5fd" },
    orange: { fill1: "#fed7aa", fill2: "#fdba74" },
    cyan: { fill1: "#a5f3fc", fill2: "#67e8f9" },
    slate: { fill1: "#cbd5e1", fill2: "#94a3b8" },
  };

  const c = waveColors[color] || waveColors.blue;

  return (
    <svg
      className="absolute bottom-0 right-0 w-32 h-22 sm:w-36 sm:h-24 pointer-events-none overflow-hidden select-none z-0"
      viewBox="0 0 140 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 90 C 50 45, 95 65, 140 15 L 140 90 Z"
        fill={c.fill1}
        className="opacity-45 dark:opacity-15"
      />
      <path
        d="M0 90 C 45 60, 85 75, 140 38 L 140 90 Z"
        fill={c.fill2}
        className="opacity-35 dark:opacity-12"
      />
    </svg>
  );
};

export default OrganicCornerWave;
