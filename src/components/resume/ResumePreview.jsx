import React, { useRef, useState, useEffect } from "react";
import { ModernExecutiveTemplate } from "./templates/ModernExecutiveTemplate";
import { MinimalistPerformanceTemplate } from "./templates/MinimalistPerformanceTemplate";
import { CreativeMarketerTemplate } from "./templates/CreativeMarketerTemplate";
import { ClassicATSTemplate } from "./templates/ClassicATSTemplate";
import { DualArchCreativeTemplate } from "./templates/DualArchCreativeTemplate";
import { FileText, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export const ResumePreview = ({ data, templateId, theme, onChange }) => {
  const docRef = useRef(null);
  const [docHeight, setDocHeight] = useState(1120);

  // Measure rendered document height to provide live A4 pagination feedback
  useEffect(() => {
    if (!docRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setDocHeight(entry.contentRect.height);
        }
      }
    });
    observer.observe(docRef.current);
    return () => observer.disconnect();
  }, [data, templateId]);

  // Intelligent content metric analysis for strict A4 pagination
  const isContentExceedingA4 = () => {
    const summaryLen = (data?.summary || "").length;
    const expCount = (data?.experiences || []).length;
    const expBullets = (data?.experiences || []).reduce(
      (acc, e) => acc + (e.bullets?.length || 0),
      0
    );
    const projCount = (data?.projects || []).length;
    const projBullets = (data?.projects || []).reduce(
      (acc, p) => acc + (p.bullets?.length || 0),
      0
    );
    const eduCount = (data?.education || []).length;
    const certCount = (data?.certifications || []).length;
    const totalBullets = expBullets + projBullets;
    const totalItems = expCount + projCount + eduCount + certCount;

    if (summaryLen > 550) return true;
    if (expCount >= 4) return true;
    if (totalBullets > 14) return true;
    if (totalItems >= 10) return true;
    return false;
  };

  const explicitMode = data?.pageMode;
  const isMultiPage =
    explicitMode === "2" ||
    (explicitMode !== "1" && (isContentExceedingA4() || docHeight > 1220));
  const totalPages = isMultiPage ? 2 : 1;

  // Single-page indication: ONLY when user explicitly selects "1 Page" and content exceeds standard A4
  const isExplicitOnePage = explicitMode === "1";
  const showRedBreakLine =
    isExplicitOnePage && (docHeight > 1130 || isContentExceedingA4());

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
    <div className="resume-preview-wrapper w-full flex flex-col items-center py-2 print:p-0 print:m-0 print:min-h-0 print:h-auto print:block">
      {/* TOOLBAR: A4 PAGINATION STATUS & SMART CONTROLS */}
      <div className="resume-hide-on-print print:hidden w-full max-w-[820px] mb-3 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <FileText size={15} className="text-[#003873] dark:text-sky-400 shrink-0" />
          <span>A4 Document Size:</span>
          {isExplicitOnePage && showRedBreakLine ? (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold flex items-center gap-1 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              <AlertCircle size={12} className="text-rose-600 dark:text-rose-400" />
              <span>Content Exceeds 1 Page (See Red Line)</span>
            </span>
          ) : (
            <span
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold flex items-center gap-1 ${
                totalPages === 1
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
              }`}
            >
              {totalPages === 1 ? (
                <>
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Fits Single A4 Page</span>
                </>
              ) : (
                <>
                  <AlertCircle size={12} className="text-blue-600 dark:text-blue-400" />
                  <span>2 Separate A4 Pages (Auto-Formatted)</span>
                </>
              )}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => handleSetPageMode("auto")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              !explicitMode || explicitMode === "auto"
                ? "bg-[#003873] text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
            title="Automatically format as 1 or 2 pages based on content"
          >
            <Sparkles size={11} />
            <span>Auto</span>
          </button>
          <button
            type="button"
            onClick={() => handleSetPageMode("1")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              explicitMode === "1"
                ? "bg-[#003873] text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
            title="Force single-page compact format"
          >
            <FileText size={11} />
            <span>1 Page</span>
          </button>
          <button
            type="button"
            onClick={() => handleSetPageMode("2")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              explicitMode === "2"
                ? "bg-[#003873] text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            }`}
            title="Format across 2 complete pages with footers on each"
          >
            <span>2 Pages</span>
          </button>
        </div>
      </div>

      {/* A4 DOCUMENT ROOT CONTAINER */}
      <div
        id="resume-print-document"
        ref={docRef}
        className="w-full flex flex-col items-center print:block print:w-full print:m-0 print:p-0"
      >
        {/* PAGE 1 SHEET */}
        <div
          className={`resume-page-sheet w-full max-w-[820px] min-h-[1120px] bg-white rounded-2xl shadow-md border border-slate-200/90 relative ${
            isExplicitOnePage ? "overflow-visible" : "overflow-hidden"
          } transition-all flex flex-col justify-between print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full ${
            totalPages === 1 ? "resume-page-sheet-last" : ""
          }`}
        >
          {renderTemplateSheet(1, totalPages)}

          {/* RED BREAK LINE: ONLY for explicit 1-Page mode when info exceeds A4 */}
          {showRedBreakLine && (
            <div
              style={{ top: "1120px" }}
              className="resume-page-break-guide resume-hide-on-print print:hidden absolute left-0 right-0 z-30 pointer-events-none flex items-center px-4 -translate-y-1/2 select-none"
            >
              <div className="h-0 border-t-2 border-dashed border-[#e11d48] flex-1" />
              <span className="mx-2 px-3.5 py-1 rounded-full bg-[#e11d48] text-white text-[10.5px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <span>✂ A4 PAGE 1 END • PAGE 2 STARTS HERE</span>
              </span>
              <div className="h-0 border-t-2 border-dashed border-[#e11d48] flex-1" />
            </div>
          )}
        </div>

        {/* IF 2 PAGES: WORKSPACE SEPARATOR ON SCREEN + PAGE 2 SHEET */}
        {totalPages === 2 && (
          <>
            <div className="resume-page-separator resume-hide-on-print print:hidden w-full max-w-[820px] my-6 flex items-center justify-center gap-3">
              <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 border-t border-dashed border-slate-400 dark:border-slate-600" />
              <span className="px-3.5 py-1 rounded-full bg-[#003873] text-white text-[11px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                <span>A4 Page 2 of 2</span>
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
