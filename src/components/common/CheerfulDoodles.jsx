import React from 'react';

/**
 * Cheerful hand-drawn SVG doodle stickers matching our-courses.png
 */

export const DoodleStar = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Shadow / 3D layer */}
    <path
      d="M32 4L39.5 22.5L59 24.5L44 38L48.5 57.5L32 47.5L15.5 57.5L20 38L5 24.5L24.5 22.5L32 4Z"
      fill="#FDBA74"
      stroke="#7C2D12"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M29 7L35.5 23.5L53 25.5L39.5 37.5L43.5 55L29 46L14.5 55L18.5 37.5L5 25.5L22.5 23.5L29 7Z"
      fill="#FED7AA"
      stroke="#9A3412"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleHeart = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Playful tilted heart matching our-courses.png */}
    <path
      d="M32 54C32 54 10 40 10 22C10 13 17 8 24 9C29 10 32 14 32 14C32 14 35 10 40 9C47 8 54 13 54 22C54 40 32 54 32 54Z"
      fill="#FDA4AF"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner highlight */}
    <path
      d="M17 19C16 16 19 13 22 13"
      stroke="#FFF1F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const DoodleCloud = ({ className = "w-12 h-10" }) => (
  <svg viewBox="0 0 74 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bubbly cloud matching our-courses.png */}
    <path
      d="M18 42C12 42 7 37 7 31C7 25.5 11 21 16.5 20.5C17.5 13 23.5 7 31 7C37.5 7 43 11.5 45 17.5C47.5 16 50.5 15.5 53.5 16.5C59 18.5 63 24 63 30C66 31 68 34 68 37.5C68 41.5 64.5 45 60.5 45C58 45 20 45 18 42Z"
      fill="#E0F2FE"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cloud wavy details */}
    <path d="M22 36C25 34 29 35 31 36" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M42 34C45 32 49 33 52 35" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const DoodleBurst = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Comic burst / sparkle sticker matching our-courses.png bottom right */}
    <path
      d="M32 4L37 20L54 13L45 28L61 36L44 42L49 59L34 49L26 62L22 46L5 50L13 36L2 25L18 24L16 6L28 17L32 4Z"
      fill="#FEF08A"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M30 14L34 24L44 19L38 29L48 34L37 38L40 48L31 42L25 50L23 40L12 42L17 33L10 26L20 25L19 14L27 21L30 14Z"
      fill="#FDE047"
    />
  </svg>
);

export const CheerfulBadge = ({ label, color = "teal", icon: Icon }) => {
  const colorMap = {
    teal: "bg-teal-50 text-teal-800 border-teal-200/80",
    amber: "bg-amber-50 text-amber-800 border-amber-200/80",
    sky: "bg-sky-50 text-sky-800 border-sky-200/80",
    purple: "bg-purple-50 text-purple-800 border-purple-200/80",
    rose: "bg-rose-50 text-rose-800 border-rose-200/80",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200/80"
  };

  return (
    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[color] || colorMap.teal}`}>
      {Icon && <Icon size={12} className="shrink-0" />}
      <span>{label}</span>
    </span>
  );
};
