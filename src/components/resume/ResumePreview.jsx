import React from "react";
import { ModernExecutiveTemplate } from "./templates/ModernExecutiveTemplate";
import { MinimalistPerformanceTemplate } from "./templates/MinimalistPerformanceTemplate";
import { CreativeMarketerTemplate } from "./templates/CreativeMarketerTemplate";
import { ClassicATSTemplate } from "./templates/ClassicATSTemplate";
import { DualArchCreativeTemplate } from "./templates/DualArchCreativeTemplate";

export const ResumePreview = ({ data, templateId, theme, onChange }) => {
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

  const renderTemplate = () => {
    const props = {
      data,
      theme,
      onUpdateHeading: handleUpdateHeading,
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
