import React from "react";
import { Flame, Sparkles, TrendingUp, ImageIcon, Link2, Plus } from "lucide-react";

export const ForumSortBar = ({
  activeSort = "hot",
  onSortChange,
  currentUser,
  onCreatePostClick,
  onImagePostClick,
}) => {
  return (
    <div className="space-y-3">
      {/* 1. Reddit-style "Create Post" input card */}
      <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 p-2.5 sm:p-3 shadow-2xs flex items-center space-x-2.5">
        <img
          src={
            currentUser?.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          }
          alt={currentUser?.name || "Student"}
          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
        />

        <div
          onClick={onCreatePostClick}
          className="flex-1 bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-400 dark:text-slate-500 cursor-pointer transition-colors"
        >
          Create Post or Ask a Question...
        </div>

        <button
          type="button"
          onClick={onImagePostClick || onCreatePostClick}
          className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Upload image / screenshot"
        >
          <ImageIcon size={18} />
        </button>
      </div>

      {/* 2. Reddit Sort Bar: Hot • New • Top */}
      <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 px-3 py-2 shadow-2xs flex items-center space-x-1.5 sm:space-x-2 text-xs">
        {[
          { key: "hot", label: "Hot", icon: Flame },
          { key: "new", label: "New", icon: Sparkles },
          { key: "top", label: "Top", icon: TrendingUp },
        ].map((s) => {
          const Icon = s.icon;
          const isActive = activeSort === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onSortChange && onSortChange(s.key)}
              className={`px-3 py-1.5 rounded-full font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Icon size={14} className={isActive ? "fill-current" : ""} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
