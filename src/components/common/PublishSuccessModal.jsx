import React from "react";
import {
  CheckCircle2,
  Plus,
  ArrowRight,
  Sparkles,
  X,
  BookOpen,
  HelpCircle,
  FileText,
} from "lucide-react";

/**
 * Reusable modal shown after publishing or updating a Course, Quiz, or Assignment on Step 4
 */
export const PublishSuccessModal = ({
  isOpen,
  onClose,
  type = "Course", // 'Course' | 'Quiz' | 'Assignment'
  isEdit = false,
  itemTitle = "",
  courseTitle = "",
  metadata = [],
  onCreateNew,
  onGoToPage,
  pageName = "Manage Page",
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type.toLowerCase()) {
      case "quiz":
        return HelpCircle;
      case "assignment":
        return FileText;
      case "course":
      default:
        return BookOpen;
    }
  };

  const TypeIcon = getIcon();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-md w-full border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Header Decorative Banner */}
        <div className="relative p-6 text-center bg-gradient-to-b from-blue-50/70 dark:from-blue-950/40 via-transparent to-transparent border-b border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X size={18} />
          </button>

          {/* Celebration Success Badge */}
          <div className="relative inline-flex items-center justify-center mx-auto mb-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <CheckCircle2 size={32} />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles size={13} />
            </div>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isEdit ? "Updated Successfully" : "Published & Live"}</span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {type} {isEdit ? "Updated" : "Created"} Successfully!
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            {isEdit
              ? `Your updates to "${itemTitle}" are now saved and active.`
              : `Your new ${type.toLowerCase()} is published and ready for enrolled students.`}
          </p>
        </div>

        {/* Content Summary Card */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-start space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#2563eb] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <TypeIcon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {type} Title
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug truncate">
                  {itemTitle}
                </h4>
                {courseTitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                    Course: {courseTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Metadata Pills */}
            {metadata && metadata.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px]">
                {metadata.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 font-semibold shadow-2xs"
                  >
                    {item.icon && <item.icon size={11} className="text-slate-400" />}
                    <span>{item.label}:</span>
                    <strong className="text-slate-900 dark:text-white">{item.value}</strong>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons: Create New & Go to Respective Page */}
          <div className="space-y-2 pt-2">
            {/* Primary Action: Go to Respective Page */}
            <button
              type="button"
              onClick={onGoToPage}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
            >
              <span>Go to {pageName}</span>
              <ArrowRight size={15} />
            </button>

            {/* Secondary Action: Create New */}
            <button
              type="button"
              onClick={onCreateNew}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-98"
            >
              <Plus size={15} />
              <span>Create New {type}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishSuccessModal;
