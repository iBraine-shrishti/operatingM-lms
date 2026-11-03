import React, { useRef, useState, useEffect } from "react";
import { ModernExecutiveTemplate } from "./templates/ModernExecutiveTemplate";
import { MinimalistPerformanceTemplate } from "./templates/MinimalistPerformanceTemplate";
import { CreativeMarketerTemplate } from "./templates/CreativeMarketerTemplate";
import { ClassicATSTemplate } from "./templates/ClassicATSTemplate";
import { DualArchCreativeTemplate } from "./templates/DualArchCreativeTemplate";
import { FileText, CheckCircle2, AlertCircle } from "lucide-react";

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

  // Standard A4 aspect ratio height at max-w-[820px] width (820px * 1.414 = ~1160px)
  const A4_PAGE_HEIGHT = 1140;
  const isMultiPage = docHeight > 1160;

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

  const renderTemplate = () => {
    const props = {
      data,
      theme,
      onUpdateHeading: handleUpdateHeading,
      onUpdateProject: handleUpdateProjectField,
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
      {/* LIVE A4 DOCUMENT SIZE INDICATOR (ZERO ARTIFICIAL TOGGLES, ZERO CROPPING) */}
      <div className="resume-hide-on-print print:hidden w-full max-w-[820px] mb-3 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <FileText size={15} className="text-[#003873] dark:text-sky-400 shrink-0" />
          <span>A4 Document Size:</span>
          <span
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold flex items-center gap-1 ${
              !isMultiPage
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
            }`}
          >
            {!isMultiPage ? (
              <>
                <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                <span>Fits Single A4 Page</span>
              </>
            ) : (
              <>
                <AlertCircle size={12} className="text-blue-600 dark:text-blue-400" />
                <span>2 Pages A4 (Auto Flow)</span>
              </>
            )}
          </span>
        </div>

        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
          {!isMultiPage
            ? "Will print on 1 clean page • No page break"
            : "Breaks cleanly onto Page 2 strictly after A4 size • Zero cropped text"}
        </span>
      </div>

      {/* A4 DOCUMENT ROOT CONTAINER (NO FIXED HEIGHT, NO OVERFLOW-HIDDEN) */}
      <div
        id="resume-print-document"
        ref={docRef}
        className="w-full max-w-[820px] min-h-[1120px] bg-white rounded-2xl shadow-md border border-slate-200/90 relative overflow-visible transition-all flex flex-col justify-between print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full print:m-0 print:p-0"
      >
        {renderTemplate()}

        {/* VISUAL A4 PAGE BREAK GUIDE (SCREEN ONLY - HIDDEN ON PRINT) */}
        {isMultiPage && (
          <div
            style={{ top: `${A4_PAGE_HEIGHT}px` }}
            className="resume-page-break-guide resume-hide-on-print print:hidden absolute left-0 right-0 z-20 pointer-events-none flex items-center px-4 -translate-y-1/2 select-none"
          >
            <div className="h-px bg-rose-400 border-t-2 border-dashed border-rose-500 flex-1" />
            <span className="mx-2 px-3 py-1 rounded-full bg-rose-600 text-white text-[10.5px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <span>✂ A4 Page 1 End • Page 2 Starts Here</span>
            </span>
            <div className="h-px bg-rose-400 border-t-2 border-dashed border-rose-500 flex-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
