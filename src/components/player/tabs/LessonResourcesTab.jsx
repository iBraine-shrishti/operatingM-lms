import React from "react";
import { FileText, Download, ExternalLink } from "lucide-react";

/**
 * LessonResourcesTab Component
 * Downloadable lesson cheatsheets and official documentation links.
 */
export const LessonResourcesTab = ({
  currentLesson,
  onDownloadResource,
}) => {
  return (
    <div className="space-y-3">
      <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100/70 transition-colors">
        <div className="flex items-center space-x-3 text-xs font-bold text-slate-800 dark:text-slate-200">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
            <FileText size={16} />
          </div>
          <div>
            <span className="block">
              {currentLesson?.title}_CheatSheet.pdf
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              2.4 MB • PDF Reference Guide
            </span>
          </div>
        </div>
        <button
          onClick={onDownloadResource}
          className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <Download size={14} />
          <span>Download</span>
        </button>
      </div>

      <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100/70 transition-colors">
        <div className="flex items-center space-x-3 text-xs font-bold text-slate-800 dark:text-slate-200">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
            <ExternalLink size={16} />
          </div>
          <div>
            <span className="block">
              Official Documentation & Tool Guidelines
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              Web Resource Link
            </span>
          </div>
        </div>
        <a
          href="https://developers.google.com/search/docs"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <span>View Docs</span>
        </a>
      </div>
    </div>
  );
};
