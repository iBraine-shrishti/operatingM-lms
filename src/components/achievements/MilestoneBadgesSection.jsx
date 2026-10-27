import React, { useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { MilestoneBadgeCard } from "./MilestoneBadgeCard";

/**
 * Curriculum Milestone Badges Section
 * Exact layout matching milestone.png:
 * Section Header: Purple star icon, "Curriculum Milestone Badges (5)" + subtitle + "View All →"
 * Carousel row flanked by < and > circular buttons
 * 5 MilestoneBadgeCard items
 * Bottom connected 5-node timeline progress track
 */
export const MilestoneBadgesSection = ({
  milestones = [],
  onViewAll,
}) => {
  const [offset, setOffset] = useState(0);

  if (!milestones || milestones.length === 0) return null;

  const handlePrev = () => {
    setOffset((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setOffset((prev) => Math.min(Math.max(0, milestones.length - 5), prev + 1));
  };

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4">
      {/* Header Matching UI Reference */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 leading-tight">
              <span>Curriculum Milestone Badges</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                ({milestones.length})
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Complete milestones and earn badges for your progress
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <span>→</span>
        </button>
      </div>

      {/* Carousel Row with Left & Right Arrows */}
      <div className="relative flex items-center gap-2 sm:gap-3">
        {/* Left Carousel Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={offset === 0}
          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous Milestones"
        >
          <ChevronLeft size={16} />
        </button>

        {/* 5 Milestone Cards Row */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {milestones.slice(offset, offset + 5).map((ach) => (
            <MilestoneBadgeCard key={ach.id} milestone={ach} />
          ))}
        </div>

        {/* Right Carousel Arrow */}
        <button
          type="button"
          onClick={handleNext}
          disabled={offset >= milestones.length - 5}
          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next Milestones"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* ========================================================== */}
      {/* BOTTOM CONNECTED MILESTONE TIMELINE TRACK (FROM milestone.png) */}
      {/* ========================================================== */}
      <div className="hidden lg:flex items-center px-10 sm:px-14 pt-2">
        {/* Node 1: Green */}
        <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-emerald-500 shrink-0 shadow-2xs" />
        {/* Line 1 -> 2: Green to Blue */}
        <div className="h-1 flex-1 bg-gradient-to-r from-emerald-500 to-blue-500" />

        {/* Node 2: Blue */}
        <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-blue-500 shrink-0 shadow-2xs" />
        {/* Line 2 -> 3: Blue to Purple */}
        <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-purple-500" />

        {/* Node 3: Purple */}
        <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-purple-500 shrink-0 shadow-2xs" />
        {/* Line 3 -> 4: Purple to Orange */}
        <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-orange-500" />

        {/* Node 4: Orange */}
        <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-orange-500 shrink-0 shadow-2xs" />
        {/* Line 4 -> 5: Orange to Slate */}
        <div className="h-1 flex-1 bg-gradient-to-r from-orange-500 to-slate-300 dark:to-slate-700" />

        {/* Node 5: Slate */}
        <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-slate-300 dark:border-slate-600 shrink-0" />
      </div>
    </div>
  );
};

export default MilestoneBadgesSection;
