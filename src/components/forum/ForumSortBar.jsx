import React from "react";
import { TOPIC_CATEGORIES } from "./ForumSidebar";

export const ForumSortBar = ({
  selectedCommunity = "all",
  onSelectCommunity,
}) => {
  return (
    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
      {TOPIC_CATEGORIES.map((topic) => {
        const isSelected = selectedCommunity === topic.id;
        return (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelectCommunity && onSelectCommunity(topic.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? "bg-[#3b49df] text-white shadow-xs font-bold"
                : "bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
            }`}
          >
            {topic.label}
          </button>
        );
      })}
    </div>
  );
};
