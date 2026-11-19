import React, { useState } from "react";
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
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#0b1329] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center text-slate-800 dark:text-slate-100">
        Meta Title & Description Length Checker
      </h2>

      {/* Meta Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Meta Title:
        </label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => {
            setMetaTitle(e.target.value);
            setShowStatus(true);
          }}
          placeholder="Enter your meta title..."
          className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-[#f58220] transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Meta Description:
        </label>
        <textarea
          rows={5}
          value={metaDescription}
          onChange={(e) => {
            setMetaDescription(e.target.value);
            setShowStatus(true);
          }}
          placeholder="Enter your meta description..."
          className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-[#f58220] transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Length Counters matching screenshot */}
      <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 pt-1">
        <div className="flex items-center gap-2">
          <span>Title Length: {titleLength}</span>
          {showStatus && titleLength > 0 && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                titleLength >= 50 && titleLength <= 60
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : titleLength < 50
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
              }`}
            >
              {titleLength >= 50 && titleLength <= 60
                ? "Optimal (50-60 chars)"
                : titleLength < 50
                ? "Too Short (<50 chars)"
                : "May be truncated on Google (>60 chars)"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span>Description Length: {descriptionLength}</span>
          {showStatus && descriptionLength > 0 && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                descriptionLength >= 140 && descriptionLength <= 160
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : descriptionLength < 140
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
              }`}
            >
              {descriptionLength >= 140 && descriptionLength <= 160
                ? "Optimal (140-160 chars)"
                : descriptionLength < 140
                ? "Too Short (<140 chars)"
                : "May be truncated on Google (>160 chars)"}
            </span>
          )}
        </div>
      </div>

      {/* Buttons matching Screenshot */}
      <div className="flex items-center justify-center gap-3 pt-3">
        <button
          type="button"
          onClick={handleCheckLengths}
          className="py-2.5 px-6 rounded-lg bg-[#f58220] hover:bg-[#e07113] text-white text-sm font-semibold transition-all shadow-2xs cursor-pointer"
        >
          Check Lengths
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="py-2.5 px-6 rounded-lg bg-[#f58220] hover:bg-[#e07113] text-white text-sm font-semibold transition-all shadow-2xs cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default MetaLengthCheckerTool;
