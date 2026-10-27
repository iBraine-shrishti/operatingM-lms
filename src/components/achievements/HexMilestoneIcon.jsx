import React from "react";
import { Laptop, BarChart3, Lightbulb, Target } from "lucide-react";

/**
 * 3D Faceted Hexagonal Gemstone Icon for Milestone Badges
 * Matches the exact 3D gemstone aesthetic in milestone.png
 */
export const HexMilestoneIcon = ({ type, color = "green" }) => {
  const colorMap = {
    green: {
      from: "#10b981",
      to: "#047857",
      glow: "rgba(16, 185, 129, 0.45)",
      stroke: "#6ee7b7",
    },
    blue: {
      from: "#2563eb",
      to: "#1d4ed8",
      glow: "rgba(37, 99, 235, 0.45)",
      stroke: "#93c5fd",
    },
    purple: {
      from: "#a855f7",
      to: "#6d28d9",
      glow: "rgba(168, 85, 247, 0.45)",
      stroke: "#d8b4fe",
    },
    orange: {
      from: "#f97316",
      to: "#c2410c",
      glow: "rgba(249, 115, 22, 0.45)",
      stroke: "#fdba74",
    },
    slate: {
      from: "#475569",
      to: "#1e293b",
      glow: "rgba(71, 85, 105, 0.2)",
      stroke: "#94a3b8",
    },
  };

  const c = colorMap[color] || colorMap.green;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center w-11 h-12"
      style={{
        filter: `drop-shadow(0 4px 10px ${c.glow})`,
      }}
    >
      <svg
        width="44"
        height="48"
        viewBox="0 0 44 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:scale-105 duration-200"
      >
        <defs>
          <linearGradient
            id={`hex-grad-${color}-${type}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={c.from} />
            <stop offset="100%" stopColor={c.to} />
          </linearGradient>
        </defs>
        {/* Main Hexagon Body */}
        <polygon
          points="22,2 41,12 41,36 22,46 3,36 3,12"
          fill={`url(#hex-grad-${color}-${type})`}
          stroke={c.stroke}
          strokeWidth="1.2"
        />
        {/* 3D Facet Bevels */}
        <polygon points="22,2 41,12 22,24" fill="rgba(255, 255, 255, 0.28)" />
        <polygon points="3,12 22,2 22,24" fill="rgba(255, 255, 255, 0.16)" />
        <polygon points="3,12 3,36 22,24" fill="rgba(0, 0, 0, 0.15)" />
        <polygon points="41,12 41,36 22,24" fill="rgba(0, 0, 0, 0.08)" />
        <polygon points="3,36 22,46 22,24" fill="rgba(0, 0, 0, 0.25)" />
        <polygon points="41,36 22,46 22,24" fill="rgba(0, 0, 0, 0.18)" />
      </svg>
      {/* Centered White Icon */}
      <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none drop-shadow-xs">
        {type === "laptop" && <Laptop size={17} strokeWidth={2.4} />}
        {type === "wordpress" && (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312L5.04 11.896A10.024 10.024 0 0 1 12 4c2.18 0 4.195.698 5.84 1.884L12 2zm8.172 4.414A9.97 9.97 0 0 1 22 12c0 2.296-.775 4.41-2.08 6.104l-2.906-8.412 1.158-3.278zM12 22a9.96 9.96 0 0 1-5.188-1.455l3.52-10.22 2.68 7.785 1.488-4.062 1.774 4.883A9.93 9.93 0 0 1 12 22zm-3.08-11.64 2.124 6.168-2.124-6.168z" />
          </svg>
        )}
        {type === "chart" && <BarChart3 size={17} strokeWidth={2.4} />}
        {type === "bulb" && <Lightbulb size={17} strokeWidth={2.4} />}
        {type === "target" && <Target size={17} strokeWidth={2.4} />}
      </div>
    </div>
  );
};

export default HexMilestoneIcon;
