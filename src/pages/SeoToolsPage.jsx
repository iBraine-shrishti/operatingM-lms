import React, { useState } from "react";
import { CaseConverterTool } from "../components/seo-tools/CaseConverterTool";
import { ImageToPdfTool } from "../components/seo-tools/ImageToPdfTool";
import { MetaLengthCheckerTool } from "../components/seo-tools/MetaLengthCheckerTool";
import { Type, FileText, Search, ArrowRight } from "lucide-react";

export const SeoToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState("case"); // "case" | "image-pdf" | "meta"

  const tools = [
    {
      id: "case",
      title: "Case Converter Tool",
      description: "Convert text case, remove duplicate lines, sort alphabetically, and extract emails & URLs.",
      iconBg: "bg-[#f58220]",
      icon: Type,
    },
    {
      id: "image-pdf",
      title: "Image to PDF Converter",
      description: "Convert multiple JPG, PNG, and WEBP images into an organized multi-page PDF document.",
      iconBg: "bg-[#e53e3e]",
      icon: FileText,
    },
    {
      id: "meta",
      title: "Meta Title & Description Length Checker",
      description: "Check character counts of meta titles and descriptions to ensure optimal search engine display.",
      iconBg: "bg-[#38a169]",
      icon: Search,
    },
  ];

  return (
    <div className="w-full px-3 sm:px-6 py-4 sm:py-6 space-y-6">
      {/* 1. Tool Cards Selection Grid (Matching iLovePDF style cards without side margins) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const isSelected = selectedTool === tool.id;
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`bg-white dark:bg-[#0b1329] p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between group ${
                isSelected
                  ? "border-[#f58220] shadow-md ring-2 ring-[#f58220]/20 dark:ring-[#f58220]/30"
                  : "border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-[#f58220]/60 hover:shadow-sm"
              }`}
            >
              <div>
                {/* Icon Box */}
                <div
                  className={`w-11 h-11 rounded-xl ${tool.iconBg} text-white flex items-center justify-center shadow-2xs mb-4`}
                >
                  <Icon size={20} />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#f58220] transition-colors leading-snug mb-2">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Bottom active indicator */}
              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                <span
                  className={
                    isSelected
                      ? "text-[#f58220]"
                      : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  }
                >
                  {isSelected ? "Active Tool" : "Open Tool"}
                </span>
                <ArrowRight
                  size={14}
                  className={`transition-transform duration-200 ${
                    isSelected
                      ? "text-[#f58220] translate-x-1"
                      : "text-slate-400 group-hover:translate-x-1 group-hover:text-[#f58220]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Active Tool Section */}
      <div className="w-full pt-2">
        {selectedTool === "case" && <CaseConverterTool />}
        {selectedTool === "image-pdf" && <ImageToPdfTool />}
        {selectedTool === "meta" && <MetaLengthCheckerTool />}
      </div>
    </div>
  );
};
export default SeoToolsPage;
