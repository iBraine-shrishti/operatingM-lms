import React, { useState } from "react";
import { Search, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const MetaLengthCheckerTool = () => {
  const { showToast } = useToast();
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const titleLength = metaTitle.length;
  const descriptionLength = metaDescription.length;

  const handleCheckLengths = () => {
    setShowStatus(true);
    if (!metaTitle && !metaDescription) {
      showToast?.("Please enter a title or description", "info");
      return;
    }
    showToast?.("Lengths checked successfully!", "success");
  };

  const handleReset = () => {
    setMetaTitle("");
    setMetaDescription("");
    setShowStatus(false);
    showToast?.("Cleared fields", "info");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#0b1329] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
      {/* Title */}
      <div className="text-center space-y-0.5">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-800 dark:text-slate-100">
          Meta Title & Description Length Checker
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Verify title & description character lengths against Google's search result display limits
        </p>
      </div>

      {/* Meta Title Input */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs px-0.5">
          <label className="font-semibold text-slate-700 dark:text-slate-300">
            Meta Title:
          </label>
          <span className="text-[11px] font-mono text-slate-400">
            {titleLength} chars (Recommended: 50–60)
          </span>
        </div>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => {
            setMetaTitle(e.target.value);
            setShowStatus(true);
          }}
          placeholder="Enter your meta title..."
          className="w-full px-3 py-2 sm:py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-[#f58220] transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Meta Description Textarea */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs px-0.5">
          <label className="font-semibold text-slate-700 dark:text-slate-300">
            Meta Description:
          </label>
          <span className="text-[11px] font-mono text-slate-400">
            {descriptionLength} chars (Recommended: 140–160)
          </span>
        </div>
        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => {
            setMetaDescription(e.target.value);
            setShowStatus(true);
          }}
          placeholder="Enter your meta description..."
          className="w-full px-3 py-2 sm:py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-[#f58220] transition-all placeholder:text-slate-400 leading-relaxed"
        />
      </div>

      {/* Length Counters (Exact match from screenshot) */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span>Title Length: {titleLength}</span>
          {showStatus && titleLength > 0 && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                titleLength >= 50 && titleLength <= 60
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : titleLength < 50
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
              }`}
            >
              {titleLength >= 50 && titleLength <= 60
                ? "Optimal (50–60)"
                : titleLength < 50
                ? "Too Short (<50)"
                : "Truncated on Google (>60)"}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-1">
          <span>Description Length: {descriptionLength}</span>
          {showStatus && descriptionLength > 0 && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                descriptionLength >= 140 && descriptionLength <= 160
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : descriptionLength < 140
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
              }`}
            >
              {descriptionLength >= 140 && descriptionLength <= 160
                ? "Optimal (140–160)"
                : descriptionLength < 140
                ? "Too Short (<140)"
                : "Truncated on Google (>160)"}
            </span>
          )}
        </div>
      </div>

      {/* Buttons (Matching screenshot) */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleCheckLengths}
          className="py-2.5 px-6 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer"
        >
          Check Lengths
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="py-2.5 px-6 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default MetaLengthCheckerTool;
