import React from "react";
import { Sparkles, X } from "lucide-react";

/**
 * AiSyllabusModal Component
 * AI Activity / Tutor Assistant Modal for drafting video outlines,
 * practice assignments, and quizzes.
 */
export const AiSyllabusModal = ({
  isOpen = false,
  aiPrompt = "",
  aiGenerating = false,
  onClose,
  onPromptChange,
  onGenerate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
            <Sparkles size={18} />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Curriculum Assistant
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          Prompt our AI curriculum engine to draft video outlines, practice
          assignments, or interactive quizzes:
        </p>

        {/* Prompt Input */}
        <textarea
          rows={4}
          value={aiPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="e.g. Generate 5 multiple-choice questions on Instagram Reels organic reach algorithm..."
          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-purple-600"
        />

        {/* Modal Action Buttons */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onGenerate}
            disabled={aiGenerating}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-60"
          >
            <Sparkles size={14} />
            <span>{aiGenerating ? "Generating..." : "Generate Activity"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSyllabusModal;
