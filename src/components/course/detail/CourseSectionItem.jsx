import React from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Settings,
  Play,
  Plus,
  Upload,
  Download,
  Sparkles,
} from "lucide-react";
import { CourseActivityRow } from "./CourseActivityRow";

/**
 * CourseSectionItem Component
 * Represents a single module/section accordion item in the course outline:
 * - Collapsible module header with number prefix and chevron
 * - Admin dropdown menu (Edit, Preview, Add, Upload, AI)
 * - Mapped lesson/activity rows using CourseActivityRow
 * - Admin quick action buttons (Add, Upload, Import, AI)
 */
export const CourseSectionItem = ({
  section = {},
  sIdx = 0,
  isExpanded = false,
  activeMenuIdx = null,
  isAdmin = false,
  courseId,
  onToggle,
  onSetActiveMenuIdx,
  onNavigate,
  onToggleCompletion,
  onShowAiModal,
  onShowToast,
}) => {
  const isMenuOpen = activeMenuIdx === sIdx;

  return (
    <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden transition-all">
      {/* Module Header Bar matching course-outline.png */}
      <div
        onClick={onToggle}
        className="p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/40 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800"
      >
        <div className="flex items-center space-x-3.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
          >
            {isExpanded ? (
              <ChevronUp
                size={20}
                className="text-[#3b49df] dark:text-blue-400"
              />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>

          <div className="flex items-center space-x-2.5">
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
              {String(sIdx + 1).padStart(2, "0")} {section.name}
            </span>
          </div>
        </div>

        {/* Right side: 3-dot dropdown menu (Admin Only) */}
        {isAdmin && (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onSetActiveMenuIdx(isMenuOpen ? null : sIdx)}
              className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Edit section options"
            >
              <MoreVertical size={18} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#0b1329] rounded-xl shadow-xl border border-slate-200/90 dark:border-slate-800 py-2 z-30 animate-in fade-in">
                <button
                  onClick={() => {
                    onSetActiveMenuIdx(null);
                    onShowToast(`Editing section: ${section.name}`, "info");
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                >
                  <Settings
                    size={14}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <span>Edit Section</span>
                </button>
                <button
                  onClick={() => {
                    onSetActiveMenuIdx(null);
                    onNavigate(`/lesson-player?courseId=${courseId}`);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                >
                  <Play
                    size={14}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <span>Preview Section</span>
                </button>
                <button
                  onClick={() => {
                    onSetActiveMenuIdx(null);
                    onShowToast("Add activity dialog opened", "info");
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                >
                  <Plus
                    size={14}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <span>Add Activity</span>
                </button>
                <button
                  onClick={() => {
                    onSetActiveMenuIdx(null);
                    onShowToast("Upload module content started", "info");
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                >
                  <Upload
                    size={14}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <span>Upload Material</span>
                </button>
                <button
                  onClick={() => {
                    onSetActiveMenuIdx(null);
                    onShowAiModal();
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 flex items-center space-x-2.5 border-t border-slate-100 dark:border-slate-800"
                >
                  <Sparkles
                    size={14}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <span>Ai Assistant</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expanded Section Content */}
      {isExpanded && (
        <div className="p-4 sm:p-5">
          {/* Module Lessons List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0b1329] shadow-2xs">
            {section.items &&
              section.items.map((item) => (
                <CourseActivityRow
                  key={item.id}
                  item={item}
                  courseId={courseId}
                  onNavigate={onNavigate}
                  onToggleCompletion={onToggleCompletion}
                />
              ))}
          </div>

          {/* Action buttons row (Admin Only) */}
          {isAdmin && (
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onShowToast(
                    `Activity creation opened for: ${section.name}`,
                    "info",
                  );
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-[#3b49df] dark:hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Plus size={14} />
                <span>Add activity</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast("Upload module content started", "info")}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Upload
                  size={14}
                  className="text-slate-500 dark:text-slate-400"
                />
                <span>Upload activity</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  onShowToast("Importing shared curriculum library", "info")
                }
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Download
                  size={14}
                  className="text-slate-500 dark:text-slate-400"
                />
                <span>Import activity</span>
              </button>
              <button
                type="button"
                onClick={onShowAiModal}
                className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs ml-auto cursor-pointer"
              >
                <Sparkles
                  size={14}
                  className="text-purple-600 dark:text-purple-400"
                />
                <span>Create activity with AI</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSectionItem;
