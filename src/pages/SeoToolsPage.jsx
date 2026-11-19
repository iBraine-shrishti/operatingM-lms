import React, { useState } from "react";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { CaseConverterTool } from "../components/seo-tools/CaseConverterTool";
import { ImageToPdfTool } from "../components/seo-tools/ImageToPdfTool";
import { MetaLengthCheckerTool } from "../components/seo-tools/MetaLengthCheckerTool";
import {
  Wrench,
  Type,
  FileDown,
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

export const SeoToolsPage = () => {
  const [activeTab, setActiveTab] = useState("meta"); // "case" | "image-pdf" | "meta"

  const tools = [
    {
      id: "meta",
      name: "Meta Title & Description",
      shortDesc: "Google SERP Preview & Length Checker",
      icon: Search,
      color: "text-blue-600 dark:text-sky-400",
      badge: "Popular",
    },
    {
      id: "case",
      name: "Case Converter Tool",
      shortDesc: "Uppercase, Lowercase, Title Case & Slugs",
      icon: Type,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "image-pdf",
      name: "Image to PDF Converter",
      shortDesc: "Convert JPG/PNG to Multi-page PDF",
      icon: FileDown,
      color: "text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
      {/* 1. HERO HEADER */}
      <StudentPageHeader
        icon={Wrench}
        category="DIGITAL MARKETING SUITE"
        badgeText="3 Tools Active"
        title="SEO & Utility Tools"
        description="Professional production utilities built for Operating Media digital marketing students. Format text cases, convert images to presentation-ready PDFs, and test Google search snippets in real time."
        metrics={[
          {
            value: "3 Tools",
            label: "Productivity",
            dotColor: "bg-blue-600",
          },
          {
            value: "100% Private",
            label: "Client-Side Processing",
            dotColor: "bg-emerald-500",
          },
          {
            value: "Live Google SERP",
            label: "Real-time Snippet",
            dotColor: "bg-purple-600",
          },
        ]}
      />

      {/* 2. SUB-TABS SELECTOR */}
      <div className="bg-white dark:bg-[#0b1329] p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {tools.map((tool) => {
            const isSelected = activeTab === tool.id;
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTab(tool.id)}
                className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer relative flex items-center gap-3 ${
                  isSelected
                    ? "bg-[#003873] text-white border-[#003873] shadow-xs"
                    : "bg-slate-50/70 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:border-[#003873]/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs border border-slate-200/60 dark:border-slate-700"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-extrabold truncate">
                      {tool.name}
                    </span>
                    {tool.badge && !isSelected && (
                      <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isSelected
                        ? "text-sky-200"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {tool.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE TOOL RENDER */}
      <div className="transition-all duration-200">
        {activeTab === "case" && <CaseConverterTool />}
        {activeTab === "image-pdf" && <ImageToPdfTool />}
        {activeTab === "meta" && <MetaLengthCheckerTool />}
      </div>
    </div>
  );
};
export default SeoToolsPage;
