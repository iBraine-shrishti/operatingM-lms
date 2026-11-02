import React from "react";
import { ModernExecutiveTemplate } from "./templates/ModernExecutiveTemplate";
import { MinimalistPerformanceTemplate } from "./templates/MinimalistPerformanceTemplate";
import { CreativeMarketerTemplate } from "./templates/CreativeMarketerTemplate";
import { ClassicATSTemplate } from "./templates/ClassicATSTemplate";

export const ResumePreview = ({ data, templateId, theme }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case "minimalist-tech":
        return <MinimalistPerformanceTemplate data={data} theme={theme} />;
      case "creative-marketer":
        return <CreativeMarketerTemplate data={data} theme={theme} />;
      case "classic-ats":
        return <ClassicATSTemplate data={data} theme={theme} />;
      case "modern-executive":
      default:
        return <ModernExecutiveTemplate data={data} theme={theme} />;
    }
  };

  return (
    <div className="w-full flex justify-center py-2 print:p-0 print:m-0">
      <div
        id="resume-print-document"
        className="w-full max-w-[820px] bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden transition-all print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
