import React from "react";
import { ModernExecutiveTemplate } from "./templates/ModernExecutiveTemplate";
import { MinimalistPerformanceTemplate } from "./templates/MinimalistPerformanceTemplate";
import { CreativeMarketerTemplate } from "./templates/CreativeMarketerTemplate";
import { ClassicATSTemplate } from "./templates/ClassicATSTemplate";
import { DualArchCreativeTemplate } from "./templates/DualArchCreativeTemplate";
import { FileText, Files } from "lucide-react";

export const ResumePreview = ({ data, templateId, theme, onChange }) => {
  // Page mode resolution: explicit user setting "1" or "2", or auto-detect based on content length
  const explicitMode = data.pageMode;
  const isHeavyContent =
    (data.experiences?.length || 0) + (data.projects?.length || 0) > 3 ||
    (data.summary?.length || 0) > 350 ||
    (data.education?.length || 0) > 2;

  const totalPages =
    explicitMode === "2"
      ? 2
      : explicitMode === "1"
      ? 1
      : isHeavyContent
      ? 2
      : 1;

  const handleSetPageMode = (mode) => {
    if (onChange) {
      onChange({
        ...data,
        pageMode: mode,
      });
    }
  };

  const handleUpdateHeading = (key, val) => {
    if (onChange) {
      onChange({
        ...data,
        sectionHeadings: {
          ...(data.sectionHeadings || {}),
          [key]: val,
        },
      });
    }
  };

  const handleUpdateProjectField = (projId, field, val) => {
    if (onChange) {
      onChange({
        ...data,
        projects: (data.projects || []).map((p) =>
          p.id === projId ? { ...p, [field]: val } : p
        ),
      });
    }
  };

  const renderTemplateSheet = (pageNumber, total) => {
    const props = {
      data,
      theme,
      onUpdateHeading: handleUpdateHeading,
      onUpdateProject: handleUpdateProjectField,
      page: pageNumber,
      totalPages: total,
    };

    switch (templateId) {
      case "dual-arch-creative":
        return <DualArchCreativeTemplate {...props} />;
      case "minimalist-tech":
        return <MinimalistPerformanceTemplate {...props} />;
      case "creative-marketer":
        return <CreativeMarketerTemplate {...props} />;
      case "classic-ats":
        return <ClassicATSTemplate {...props} />;
      case "modern-executive":
      default:
        return <ModernExecutiveTemplate {...props} />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-2 print:p-0 print:m-0">
      {/* TOOLBAR: A4 PAGE MODE TOGGLE (1-PAGE / 2-PAGES) */}
      <div className="resume-hide-on-print w-full max-w-[820px] mb-3 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Files size={15} className="text-[#003873] dark:text-sky-400" />
          <span>A4 Document Pages:</span>
          <span className="text-[11px] font-semibold text-slate-500">
            {totalPages === 1 ? "1 Page Sheet" : "2 Separate Page Sheets"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => handleSetPageMode("1")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              totalPages === 1
                ? "bg-[#003873] text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            <FileText size={12} />
            <span>1 Page (Compact)</span>
          </button>
          <button
            type="button"
            onClick={() => handleSetPageMode("2")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              totalPages === 2
                ? "bg-[#003873] text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
          >
            <Files size={12} />
            <span>2 Pages (Detailed)</span>
          </button>
        </div>
      </div>

      {/* A4 DOCUMENT ROOT CONTAINER */}
      <div id="resume-print-document" className="w-full flex flex-col items-center print:block print:w-full print:m-0 print:p-0">
        {/* PAGE 1 SHEET */}
        <div
          className={`resume-page-sheet w-full max-w-[820px] min-h-[1120px] bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden transition-all flex flex-col justify-between print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full ${
            totalPages === 1 ? "resume-page-sheet-last" : ""
          }`}
        >
          {renderTemplateSheet(1, totalPages)}
        </div>

        {/* IF 2 PAGES: WORKSPACE GAP BETWEEN ACTUAL PAGES (HIDDEN ON PRINT) + PAGE 2 SHEET */}
        {totalPages === 2 && (
          <>
            <div className="resume-page-separator resume-hide-on-print w-full max-w-[820px] my-6 flex items-center justify-center gap-3">
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 border-t border-dashed border-slate-400 dark:border-slate-600" />
              <span className="px-3.5 py-1 rounded-full bg-slate-800 text-white dark:bg-slate-700 text-[11px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                <span>Page 2 of 2</span>
              </span>
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 border-t border-dashed border-slate-400 dark:border-slate-600" />
            </div>

            <div className="resume-page-sheet resume-page-sheet-last w-full max-w-[820px] min-h-[1120px] bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden transition-all flex flex-col justify-between print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full">
              {renderTemplateSheet(2, totalPages)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
