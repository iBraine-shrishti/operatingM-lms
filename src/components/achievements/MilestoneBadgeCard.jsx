import React from "react";
import { Calendar, Lock, Sparkles } from "lucide-react";
import { HexMilestoneIcon } from "./HexMilestoneIcon";
import { OrganicCornerWave } from "./OrganicCornerWave";

/**
 * Single Milestone Badge Card
 * Exact layout matching milestone.png:
 * Top row: 3D Hexagon Gemstone Icon on Left, Status Pill on Right
 * Middle: Bold Title + 2-line Description
 * Bottom: Calendar icon + Date (or Lock icon + Target Milestone)
 * Background: Organic corner wave + subtle theme border
 */
export const MilestoneBadgeCard = ({ milestone }) => {
  if (!milestone) return null;

  return (
    <div
      className={`rounded-2xl p-4 sm:p-4.5 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between min-h-[178px] group relative overflow-hidden bg-white dark:bg-[#0b1329] ${
        milestone.cardBorderColor || "border-slate-200/80 dark:border-slate-800/60 hover:border-blue-300"
      }`}
    >
      {/* Organic Corner Wave */}
      <OrganicCornerWave color={milestone.waveColor || "blue"} />

      {/* Top Row: 3D Hexagon Gem Icon on Left, Status Pill on Right */}
      <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
        <HexMilestoneIcon type={milestone.iconType} color={milestone.color} />

        {/* Pill Badge */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shrink-0 inline-flex items-center gap-1 ${
            milestone.badgeClass || "bg-slate-100 text-slate-700"
          }`}
        >
          {milestone.status === "COMPLETED" && <span>COMPLETED</span>}
          {milestone.status === "IN PROGRESS" && <span>IN PROGRESS</span>}
          {milestone.status === "EARNED" && (
            <>
              <Sparkles size={10} className="shrink-0" />
              <span>EARNED</span>
            </>
          )}
          {milestone.status === "LOCKED" && (
            <>
              <Lock size={9} className="shrink-0" />
              <span>LOCKED</span>
            </>
          )}
        </span>
      </div>

      {/* Middle: Title & 1-line Description */}
      <div className="space-y-1 relative z-10">
        <h3 className="font-black text-slate-900 dark:text-white text-xs sm:text-[13.5px] leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {milestone.title}
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
          {milestone.description}
        </p>
      </div>

      {/* Bottom: Date or Target Milestone with Calendar/Lock Icon */}
      <div className="pt-2 mt-1 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
          {milestone.status === "LOCKED" ? (
            <>
              <Lock size={12} className="text-slate-400 shrink-0" />
              <span>Target Milestone</span>
            </>
          ) : (
            <>
              <Calendar
                size={12}
                className={
                  milestone.color === "green"
                    ? "text-emerald-500"
                    : milestone.color === "blue"
                    ? "text-blue-500"
                    : milestone.color === "purple"
                    ? "text-purple-500"
                    : "text-orange-500"
                }
              />
              <span>{milestone.date}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilestoneBadgeCard;
