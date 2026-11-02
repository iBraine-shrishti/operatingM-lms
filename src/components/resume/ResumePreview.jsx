import React, { useRef, useState, useEffect } from "react";
import { ModernExecutiveTemplate } from "./templates/ModernExecutiveTemplate";
import { MinimalistPerformanceTemplate } from "./templates/MinimalistPerformanceTemplate";
import { CreativeMarketerTemplate } from "./templates/CreativeMarketerTemplate";
import { ClassicATSTemplate } from "./templates/ClassicATSTemplate";
import { DualArchCreativeTemplate } from "./templates/DualArchCreativeTemplate";

export const ResumePreview = ({ data, templateId, theme, onChange }) => {
  const docRef = useRef(null);
  const [docHeight, setDocHeight] = useState(1100);

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
  const pageCount = Math.max(1, Math.ceil(docHeight / A4_PAGE_HEIGHT));

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
    <div className="w-full flex flex-col items-center py-2 print:p-0 print:m-0">
      {/* MULTI-PAGE STATUS BANNER */}
      {pageCount > 1 && (
        <div className="resume-hide-on-print w-full max-w-[820px] mb-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-center justify-between">
          <span className="font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Multi-Page A4 Document ({pageCount} Pages)
          </span>
          <span className="text-[10px] text-amber-700 dark:text-amber-400">
            Dashed red guide shows print page break boundary
          </span>
        </div>
      )}

      {/* A4 DOCUMENT CONTAINER */}
      <div
        id="resume-print-document"
        ref={docRef}
        className="w-full max-w-[820px] bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden transition-all relative print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full print:overflow-visible"
      >
        {renderTemplate()}

        {/* VISUAL PAGE BREAK CUTOFF LINES (ONLY VISIBLE ON SCREEN IF MULTI-PAGE) */}
        {pageCount > 1 &&
          Array.from({ length: pageCount - 1 }).map((_, pIdx) => (
            <div
              key={pIdx}
              style={{ top: `${(pIdx + 1) * A4_PAGE_HEIGHT}px` }}
              className="resume-page-break-guide absolute left-0 right-0 z-30 pointer-events-none flex items-center px-2 -translate-y-1/2"
            >
              <div className="h-[2px] bg-red-400/90 border-b-2 border-dashed border-red-500 w-full" />
              <span className="shrink-0 mx-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                ✂ A4 Page {pIdx + 1} End • Page {pIdx + 2} Starts Here
              </span>
              <div className="h-[2px] bg-red-400/90 border-b-2 border-dashed border-red-500 w-full" />
            </div>
          ))}
      </div>
    </div>
  );
};
