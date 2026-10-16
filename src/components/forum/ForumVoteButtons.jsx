import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

/**
 * Reddit-style Thumbs Up / Thumbs Down reaction component.
 * Supports both vertical (left post gutter) and horizontal (comments/mobile) layouts.
 */
export const ForumVoteButtons = ({
  score = 0,
  userReaction = null, // "up" | "down" | null
  onVote,
  layout = "vertical", // "vertical" | "horizontal"
  size = "md",
}) => {
  const isUp = userReaction === "up";
  const isDown = userReaction === "down";

  const handleUp = (e) => {
    e.stopPropagation();
    onVote && onVote("up");
  };

  const handleDown = (e) => {
    e.stopPropagation();
    onVote && onVote("down");
  };

  const iconSize = size === "sm" ? 13 : 15;

  if (layout === "horizontal") {
    return (
      <div className="inline-flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-full px-2 py-0.5 border border-slate-200/60 dark:border-slate-700/60 select-none">
        <button
          type="button"
          onClick={handleUp}
          title="Thumbs Up"
          className={`p-1 rounded-full transition-all cursor-pointer active:scale-90 ${
            isUp
              ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80"
              : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <ThumbsUp
            size={iconSize}
            className={isUp ? "fill-blue-600 dark:fill-blue-400" : ""}
          />
        </button>

        <span
          className={`text-[11px] sm:text-xs font-bold tabular-nums px-1 ${
            isUp
              ? "text-blue-600 dark:text-blue-400"
              : isDown
                ? "text-rose-600 dark:text-rose-400"
                : "text-slate-700 dark:text-slate-300"
          }`}
        >
          {score > 0 ? `+${score}` : score}
        </span>

        <button
          type="button"
          onClick={handleDown}
          title="Thumbs Down"
          className={`p-1 rounded-full transition-all cursor-pointer active:scale-90 ${
            isDown
              ? "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80"
              : "text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <ThumbsDown
            size={iconSize}
            className={isDown ? "fill-rose-600 dark:fill-rose-400" : ""}
          />
        </button>
      </div>
    );
  }

  // Vertical layout for Reddit Post Card left gutter
  return (
    <div className="w-10 sm:w-11 bg-slate-50/70 dark:bg-slate-900/50 rounded-l-xl flex flex-col items-center justify-start pt-3 pb-2 space-y-1 select-none border-r border-slate-100 dark:border-slate-800/80 shrink-0">
      <button
        type="button"
        onClick={handleUp}
        title="Thumbs Up"
        className={`p-1.5 rounded-md transition-all cursor-pointer active:scale-90 ${
          isUp
            ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80"
            : "text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/80 dark:hover:bg-slate-800"
        }`}
      >
        <ThumbsUp
          size={iconSize}
          className={isUp ? "fill-blue-600 dark:fill-blue-400" : ""}
        />
      </button>

      <span
        className={`text-[11px] sm:text-xs font-bold tabular-nums ${
          isUp
            ? "text-blue-600 dark:text-blue-400"
            : isDown
              ? "text-rose-600 dark:text-rose-400"
              : "text-slate-700 dark:text-slate-300"
        }`}
      >
        {score > 0 ? `+${score}` : score}
      </span>

      <button
        type="button"
        onClick={handleDown}
        title="Thumbs Down"
        className={`p-1.5 rounded-md transition-all cursor-pointer active:scale-90 ${
          isDown
            ? "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80"
            : "text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200/80 dark:hover:bg-slate-800"
        }`}
      >
        <ThumbsDown
          size={iconSize}
          className={isDown ? "fill-rose-600 dark:fill-rose-400" : ""}
        />
      </button>
    </div>
  );
};
