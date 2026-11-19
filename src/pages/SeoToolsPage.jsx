import React from "react";
import { useSearchParams } from "react-router-dom";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { CaseConverterTool } from "../components/seo-tools/CaseConverterTool";
import { ImageToPdfTool } from "../components/seo-tools/ImageToPdfTool";
import { MetaLengthCheckerTool } from "../components/seo-tools/MetaLengthCheckerTool";
import {
  Wrench,
  Type,
  FileText,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const SeoToolsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeToolId = searchParams.get("tool");

  const tools = [
    {
      id: "case-converter",
      title: "Case Converter Tool",
      shortName: "Case Converter",
      badge: "Text Utility",
      description:
        "Transform text case, remove duplicate lines, sort alphabetically, and extract emails & URLs with one click.",
      iconBg: "bg-amber-500/10 text-[#f58220] border-amber-500/20",
      accentBg: "bg-[#f58220]",
      icon: Type,
      features: ["Uppercase / Lowercase / Title Case", "Remove Duplicates & Blank Lines", "Extract Valid Emails & URLs"],
      component: <CaseConverterTool />,
    },
    {
      id: "image-to-pdf",
      title: "Image to PDF Converter",
      shortName: "Image to PDF",
      badge: "Document Tool",
      description:
        "Convert multiple JPG, PNG, and WEBP images into an organized, presentation-ready multi-page PDF document.",
      iconBg: "bg-rose-500/10 text-rose-600 border-rose-500/20",
      accentBg: "bg-rose-600",
      icon: FileText,
      features: ["A4 & Letter Page Sizes", "Portrait & Landscape Modes", "100% In-Browser Private Conversion"],
      component: <ImageToPdfTool />,
    },
    {
      id: "meta-length-checker",
      title: "Meta Title & Description Length Checker",
      shortName: "Meta Checker",
      badge: "SEO Validator",
      description:
        "Check character counts of meta titles and descriptions against Google search display limits with live SERP preview.",
      iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      accentBg: "bg-emerald-600",
      icon: Search,
      features: ["Live Google SERP Snippet Preview", "Optimal Character Warnings", "Instant HTML Meta Tag Export"],
      component: <MetaLengthCheckerTool />,
    },
  ];

  const activeTool = tools.find((t) => t.id === activeToolId);

  const handleOpenTool = (toolId) => {
    setSearchParams({ tool: toolId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToTools = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. TOP HEADER */}
      {!activeTool ? (
        /* Full Header when on Catalog Hub */
        <StudentPageHeader
          icon={Wrench}
          category="DIGITAL MARKETING SUITE"
          badgeText="3 Tools Available"
          title="SEO & Utility Tools"
          description="Professional utilities built for Operating Media digital marketing students. Format text cases, convert images to presentation-ready PDFs, and test Google search snippets in real time."
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
      ) : (
        /* Slim, Compact Header Bar when inside an Active Tool (Brings tool immediately above the fold) */
        <div className="flex items-center justify-between bg-white dark:bg-[#0b1329] px-4 py-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2.5 text-xs">
            <button
              type="button"
              onClick={handleBackToTools}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#003873] hover:text-white text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft size={13} />
              <span>All Tools</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 sm:text-sm">
              {activeTool.title}
            </span>
          </div>

          {/* Quick tool switcher pills */}
          <div className="flex items-center gap-1.5">
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
              {tools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleOpenTool(t.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    t.id === activeTool.id
                      ? "bg-white dark:bg-[#0b1329] text-[#003873] dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t.shortName}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#f58220] text-[11px] font-bold border border-amber-200/60 dark:border-amber-800/40">
              <Sparkles size={11} />
              <span>{activeTool.badge}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN CONTENT AREA */}
      {activeTool ? (
        /* Active Tool Editor Screen positioned immediately above the fold */
        <div className="w-full animate-in fade-in-50 duration-150">
          {activeTool.component}
        </div>
      ) : (
        /* Cards Catalog Grid (iLovePDF Style Cards) */
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select an SEO Utility
            </h2>
            <span className="text-xs text-slate-400">
              Click any tool card to launch
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleOpenTool(tool.id)}
                  className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-[#f58220] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${tool.iconBg}`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#f58220] transition-colors flex items-center gap-1.5">
                        <span>{tool.title}</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                      {tool.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                          <span className="w-1 h-1 rounded-full bg-[#f58220]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#003873] dark:text-sky-400 group-hover:text-[#f58220] transition-colors">
                    <span>Open Tool</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeoToolsPage;
