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
  ChevronRight,
  Sparkles,
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
        "Transform text case, remove duplicate lines, sort alphabetically, and extract emails & URLs.",
      iconBg: "bg-gradient-to-br from-amber-500 to-[#f58220]",
      icon: Type,
      component: <CaseConverterTool />,
    },
    {
      id: "image-to-pdf",
      title: "Image to PDF Converter",
      shortName: "Image to PDF",
      badge: "Document Tool",
      description:
        "Convert multiple JPG, PNG, and WEBP images into an organized multi-page PDF document.",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
      icon: FileText,
      component: <ImageToPdfTool />,
    },
    {
      id: "meta-length-checker",
      title: "Meta Title & Description Length Checker",
      shortName: "Meta Checker",
      badge: "SEO Validator",
      description:
        "Check character counts of meta titles and descriptions to ensure optimal search engine display.",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      icon: Search,
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
    <div className="w-full px-3 sm:px-6 py-3 sm:py-4 space-y-4">
      {/* 1. TOP HEADER */}
      {!activeTool ? (
        /* Full Header when on Catalog Hub */
        <StudentPageHeader
          icon={Wrench}
          category="DIGITAL MARKETING SUITE"
          badgeText="3 Tools Available"
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
      ) : (
        /* Slim, Compact Header Bar when inside an Active Tool (Brings tool immediately above the fold) */
        <div className="flex items-center justify-between bg-white dark:bg-[#0b1329] px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleBackToTools}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#003873] hover:text-white text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft size={13} />
              <span>Back to All Tools</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 hidden sm:inline">
              {activeTool.title}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#f58220] text-[11px] font-bold border border-amber-200/60 dark:border-amber-800/40">
            <Sparkles size={11} />
            <span>{activeTool.badge}</span>
          </div>
        </div>
      )}

      {/* 2. MAIN CONTENT AREA */}
      {activeTool ? (
        /* Active Tool Editor Screen positioned immediately above the fold */
        <div className="w-full pt-1 animate-in fade-in-50 duration-200">
          {activeTool.component}
        </div>
      ) : (
        /* Cards Catalog Grid (Image 0 layout) */
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select an SEO Tool
            </h2>
            <span className="text-[11px] text-slate-400">
              Click any card to launch the tool
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleOpenTool(tool.id)}
                  className="bg-white dark:bg-[#0b1329] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-[#f58220] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Top row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl ${tool.iconBg} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                      >
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tool.badge}
                      </span>
                    </div>

                    {/* Tool Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#f58220] transition-colors leading-snug mb-1.5">
                      {tool.title}
                    </h3>

                    {/* Tool Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Open Tool Action Link */}
                  <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#f58220]">
                    <span>Launch Tool</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
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
