import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  FileDown,
  Printer,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
  Loader2,
  Award,
  ShieldCheck,
  Globe,
  Layers,
  ArrowRight,
} from "lucide-react";
import { MODULES_CATALOG } from "./portfolioData";
import mockupLaptopImg from "../../assets/mockup-laptop.jpg";
import mockupCreativesImg from "../../assets/mockup-creatives.jpg";

/**
 * PortfolioPdfExporter:
 * Component-based 16:9 Presentation PDF generator for the complete portfolio.
 * 
 * - Renders each page at full desktop website width (1440px) regardless of LMS split-view width.
 * - Page 1: Student Profile, Hero, Credentials, Verification Badges, Metrics & Certifications.
 * - Pages 2..N: Exactly each VISIBLE module (reduced dynamically if student hides modules).
 * - Exports into standard 16:9 widescreen PPT slide format (297mm x 167.06mm).
 * - Automatically downloads the PDF and opens it in a new tab.
 */
export const PortfolioPdfExporter = ({
  portfolioData,
  theme,
  moduleVisibility = {},
  moduleOrder = [],
  isOpen,
  onClose,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentSlideTitle, setCurrentSlideTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const student = portfolioData?.student || {};
  const modules = portfolioData?.modules || {};

  // Ordered visible modules list
  const activeModuleOrder = (moduleOrder && moduleOrder.length > 0)
    ? moduleOrder
    : MODULES_CATALOG.map((m) => m.id);

  const visibleModules = activeModuleOrder.filter((modId) => {
    return moduleVisibility[modId] !== false;
  });

  // Total slides = 1 (Profile) + Visible modules count
  const totalSlides = 1 + visibleModules.length;

  useEffect(() => {
    if (isOpen) {
      startExport();
    } else {
      // Reset state when modal is closed
      setIsGenerating(false);
      setIsCompleted(false);
      setProgressPercent(0);
      setCurrentSlideIndex(0);
      setErrorMessage("");
    }
  }, [isOpen]);

  const startExport = async () => {
    setIsGenerating(true);
    setIsCompleted(false);
    setProgressPercent(5);
    setCurrentSlideIndex(1);
    setCurrentSlideTitle("Student Profile & Executive Credentials");
    setErrorMessage("");

    try {
      // Wait a moment for DOM elements to render in the offscreen container
      await new Promise((resolve) => setTimeout(resolve, 800));

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [297, 167.0625], // Exact 16:9 PowerPoint widescreen ratio
        compress: true,
      });

      // 1. Capture Slide 1: Profile & Hero
      const profileSlideEl = document.getElementById("pdf-slide-profile");
      if (profileSlideEl) {
        const canvas = await html2canvas(profileSlideEl, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#f8fafc",
          logging: false,
          windowWidth: 1440,
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        pdf.addImage(imgData, "JPEG", 0, 0, 297, 167.0625, undefined, "FAST");
      }

      // 2. Capture Each Visible Module Slide
      for (let i = 0; i < visibleModules.length; i++) {
        const modId = visibleModules[i];
        const catalogMod = MODULES_CATALOG.find((m) => m.id === modId);
        const modTitle = catalogMod ? catalogMod.title : modId;
        const slideNum = i + 2;

        setCurrentSlideIndex(slideNum);
        setCurrentSlideTitle(`Module ${String(i + 1).padStart(2, "0")} · ${modTitle}`);
        setProgressPercent(Math.round(((i + 1) / totalSlides) * 100));

        // Yield to browser UI thread
        await new Promise((resolve) => setTimeout(resolve, 250));

        const modSlideEl = document.getElementById(`pdf-slide-mod-${modId}`);
        if (modSlideEl) {
          const canvas = await html2canvas(modSlideEl, {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#f8fafc",
            logging: false,
            windowWidth: 1440,
          });
          const imgData = canvas.toDataURL("image/jpeg", 0.92);
          pdf.addPage([297, 167.0625], "landscape");
          pdf.addImage(imgData, "JPEG", 0, 0, 297, 167.0625, undefined, "FAST");
        }
      }

      setProgressPercent(100);
      setCurrentSlideTitle("Finalizing & Compiling Presentation PDF...");

      const safeStudentName = (student.name || "Student").replace(/\s+/g, "_");
      const fileName = `${safeStudentName}_Digital_Marketing_Portfolio_Deck.pdf`;
      setPdfFileName(fileName);

      // Generate blob for new tab opening & direct download
      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);

      // Trigger direct download
      pdf.save(fileName);

      // Also open in a new tab as requested
      try {
        window.open(blobUrl, "_blank");
      } catch (e) {
        console.warn("New tab blocked by popup blocker, download triggered directly.");
      }

      setIsGenerating(false);
      setIsCompleted(true);
    } catch (err) {
      console.error("PDF Export error:", err);
      setIsGenerating(false);
      setErrorMessage(err.message || "Failed to generate PDF. Please try again.");
    }
  };

  const handleDownloadAgain = () => {
    if (pdfBlobUrl) {
      const link = document.createElement("a");
      link.href = pdfBlobUrl;
      link.download = pdfFileName || "Portfolio_Presentation.pdf";
      link.click();
    }
  };

  const handleOpenNewTab = () => {
    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, "_blank");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 1. VISIBLE MODAL OVERLAY */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Top Brand Banner */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-xs"
                style={{ backgroundColor: theme?.primary || "#2563eb" }}
              >
                <FileDown size={18} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  16:9 Presentation PDF Exporter
                </h3>
                <p className="text-xs text-slate-500">
                  Full-Width Website Desktop Capture · Slide Deck
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* GENERATING PROGRESS STATE */}
          {isGenerating && (
            <div className="space-y-6 py-2">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-1">
                  <Loader2 size={28} className="animate-spin text-blue-600" />
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Rendering Slide {currentSlideIndex} of {totalSlides}
                </div>
                <div className="text-xs font-medium text-slate-600 truncate max-w-xs mx-auto">
                  {currentSlideTitle}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-500">
                  <span>Capturing Slides...</span>
                  <span className="text-blue-600">{progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 shadow-xs"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>PPT Widescreen Optimization</span>
                </div>
                <p>
                  Captured at native 1440px desktop width. Each slide represents 1 executive slide (Profile + {visibleModules.length} Active Modules).
                </p>
              </div>
            </div>
          )}

          {/* COMPLETED STATE */}
          {isCompleted && (
            <div className="space-y-6 py-2 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mb-1">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg">
                  Portfolio Presentation PDF Ready!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Successfully generated <strong className="text-slate-900">{totalSlides} Presentation Slides</strong> (Profile + {visibleModules.length} selected modules) in high-resolution 16:9 format.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Output Format:</span>
                  <span className="font-bold text-slate-800">16:9 Widescreen (297x167mm)</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Total Slides:</span>
                  <span className="font-bold text-slate-800">{totalSlides} Slides</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>File Name:</span>
                  <span className="font-bold text-blue-600 truncate max-w-[200px]">{pdfFileName}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadAgain}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileDown size={15} />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenNewTab}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ExternalLink size={15} />
                  <span>Open in New Tab</span>
                </button>
              </div>
            </div>
          )}

          {/* ERROR STATE */}
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 space-y-3">
              <div className="font-bold">Error Generating PDF:</div>
              <p>{errorMessage}</p>
              <button
                type="button"
                onClick={startExport}
                className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs cursor-pointer hover:bg-rose-700"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. ISOLATED FULL-WIDTH DESKTOP STAGING AREA (1440px Fixed Width for html2canvas) */}
      <div
        id="pdf-hidden-staging-container"
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
          width: "1440px",
          zIndex: -9999,
          background: "#ffffff",
          visibility: "visible",
          overflow: "visible",
        }}
      >
        {/* SLIDE 1: STUDENT PROFILE & EXECUTIVE HERO (1440px x 810px) */}
        <div
          id="pdf-slide-profile"
          className="w-[1440px] h-[810px] bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden"
          style={{ width: "1440px", height: "810px", boxSizing: "border-box" }}
        >
          {/* Slide Top Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-xs"
                style={{ backgroundColor: theme?.primary || "#2563eb" }}
              >
                OM
              </div>
              <div>
                <span className="font-extrabold text-sm uppercase tracking-wider text-white">
                  Operating Media Academy
                </span>
                <span className="text-slate-500 text-xs ml-2">· Verified Capstone Portfolio</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
              <span className="bg-slate-800 px-3 py-1 rounded-full text-amber-400 font-bold border border-slate-700">
                SLIDE 1 OF {totalSlides}
              </span>
              <span>EXECUTIVE PRESENTATION DECK</span>
            </div>
          </div>

          {/* Profile Main Content */}
          <div className="grid grid-cols-12 gap-10 items-center my-auto">
            {/* Left: Avatar & Identity */}
            <div className="col-span-5 flex flex-col items-center text-center space-y-4 p-8 bg-slate-950/70 rounded-3xl border border-slate-800/90 shadow-xl">
              <div className="relative w-36 h-36 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl">
                <img
                  src={student.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
                  alt={student.name || "Student"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  {student.name || "Aarav Sharma"}
                </h1>
                <div className="text-xs font-bold text-amber-400 mt-1 uppercase tracking-wide">
                  {student.headline || "Full-Stack Digital Marketing Strategist & Performance Growth Architect"}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/60">
                <ShieldCheck size={14} />
                <span>Verified Academy Graduate · Capstone Certified</span>
              </div>

              <div className="w-full pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-medium text-left">
                <div>📧 {student.email || "aarav@example.com"}</div>
                <div>📱 {student.phone || "+91 98200 12345"}</div>
                <div>📍 {student.location || "Mumbai, India"}</div>
                <div>🌐 {student.website || "portfolio.operatingmedia.com"}</div>
              </div>
            </div>

            {/* Right: Bio, Metrics & Core Certifications */}
            <div className="col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  Executive Professional Summary
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {student.bio ||
                    "Certified digital marketing specialist with end-to-end expertise spanning WordPress CMS deployment, paid Meta & Google Ads performance architecture, high-retention short-form video creative editing, e-commerce conversion rate optimization, and AI marketing workflows."}
                </p>
              </div>

              {/* 4 Core Metric Callouts */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xl font-black text-white">4.12x</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Blended ROAS</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xl font-black text-emerald-400">$135k</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Managed Spend</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xl font-black text-amber-400">+1,660%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Organic Reach</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-xl font-black text-blue-400">13</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Core Disciplines</div>
                </div>
              </div>

              {/* Verified Credentials Pills */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" />
                  <span>Verified Capstone Certifications & Tools</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-blue-900/40 text-blue-300 border border-blue-800/60 font-medium">
                    Google Ads Certified
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-purple-900/40 text-purple-300 border border-purple-800/60 font-medium">
                    Meta Certified Media Buyer
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-900/40 text-emerald-300 border border-emerald-800/60 font-medium">
                    Shopify Partner & Liquid
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-900/40 text-amber-300 border border-amber-800/60 font-medium">
                    Triple Whale & GA4 Server CAPI
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-rose-900/40 text-rose-300 border border-rose-800/60 font-medium">
                    Gemini AI API Prompt Engineer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-500 font-mono">
            <span>Student Candidate: {student.name || "Aarav Sharma"}</span>
            <span>Operating Media Digital Marketing Academy · Executive Master Program</span>
            <span>Page 1 of {totalSlides}</span>
          </div>
        </div>

        {/* SLIDES 2..N: EACH VISIBLE MODULE AS A 16:9 PRESENTATION SLIDE (1440px x 810px) */}
        {visibleModules.map((modId, index) => {
          const catalogMod = MODULES_CATALOG.find((m) => m.id === modId);
          const slideNumber = index + 2;
          const modTitle = catalogMod ? catalogMod.title : modId;
          const modNumber = catalogMod ? catalogMod.number : String(index + 1).padStart(2, "0");

          return (
            <div
              key={modId}
              id={`pdf-slide-mod-${modId}`}
              className="w-[1440px] h-[810px] bg-slate-50 text-slate-900 p-10 flex flex-col justify-between border-b border-slate-300 relative overflow-hidden"
              style={{ width: "1440px", height: "810px", boxSizing: "border-box" }}
            >
              {/* Slide Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    MODULE {modNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {student.name || "Aarav Sharma"} · Executive Deliverable
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
                  <span className="font-bold text-slate-900 bg-slate-200 px-3 py-1 rounded-full">
                    SLIDE {slideNumber} OF {totalSlides}
                  </span>
                </div>
              </div>

              {/* Slide Module Title & Subtitle */}
              <div className="space-y-1 my-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {catalogMod?.title || modTitle}
                </h2>
                <p className="text-xs text-slate-600 max-w-4xl line-clamp-2">
                  {catalogMod?.description || "Capstone project execution demonstrating practical mastery, real-world campaign architecture, and verified performance benchmarks."}
                </p>
              </div>

              {/* Module Content Area (Rendered specifically for 16:9 Widescreen Presentation) */}
              <div className="flex-1 overflow-hidden my-auto py-2">
                {/* MODULE 01: WORDPRESS */}
                {modId === "wordpress" && (
                  <div className="grid grid-cols-2 gap-6 h-full items-stretch">
                    {(Array.isArray(modules.wordpress) ? modules.wordpress.slice(0, 2) : []).map((proj, pIdx) => (
                      <div key={pIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="text-[10px] font-mono text-blue-600 font-bold uppercase">{proj.category || "Full-Stack E-Commerce"}</div>
                          <h3 className="text-lg font-bold text-slate-900 mt-1">{proj.title}</h3>
                          <p className="text-xs text-slate-600 mt-2 line-clamp-3">{proj.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
                          <div className="p-2.5 bg-slate-50 rounded-xl">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Speed Benchmark</span>
                            <span className="font-mono font-bold text-emerald-600 text-sm">{proj.metricScore || "0.85s FCP · 98/100 Mobile"}</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded-xl">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Stack</span>
                            <span className="font-mono font-bold text-slate-700 text-sm">{proj.techStack || "Elementor Pro · Woo · CAPI"}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(proj.tags || ["WordPress 6.4", "WooCommerce", "Redis Cache"]).map((t, ti) => (
                            <span key={ti} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-700">{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODULE 02: CANVA */}
                {modId === "canva" && (
                  <div className="grid grid-cols-3 gap-6 h-full items-stretch">
                    {(modules.canva?.designs || []).slice(0, 3).map((des, dIdx) => (
                      <div key={dIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                        <div className="h-44 bg-slate-100 overflow-hidden">
                          <img src={des.imageUrl || mockupCreativesImg} alt={des.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 space-y-2">
                          <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">{des.category || "Social Carousel"}</span>
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-2">{des.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2">{des.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODULE 03: SOCIAL ORGANIC SMO */}
                {modId === "socialOrganic" && (
                  <div className="grid grid-cols-2 gap-6 h-full items-stretch">
                    {(Array.isArray(modules.socialOrganic) ? modules.socialOrganic.slice(0, 2) : []).map((prof, prIdx) => (
                      <div key={prIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <span className="text-xs font-mono font-bold text-blue-600 uppercase">{prof.platform}</span>
                            <h3 className="text-base font-bold text-slate-900">{prof.handle}</h3>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs font-mono">{prof.growthRate || "+210% Growth"}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-3">{prof.bioCopywriting || prof.strategy}</p>
                        <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                          <span className="text-[10px] font-bold uppercase text-slate-500 block">Pillars</span>
                          <div className="font-medium text-slate-800">{prof.contentPillars || "40% Educational Reels · 30% Proof · 30% Lifestyle"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODULE 04: META ADS */}
                {modId === "socialMarketing" && (
                  <div className="grid grid-cols-3 gap-6 h-full items-stretch">
                    {(modules.socialMarketing?.campaigns || []).slice(0, 3).map((camp, cIdx) => (
                      <div key={cIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold text-purple-600 uppercase">{camp.stage || "TOF Prospecting"}</span>
                          <span className="font-mono font-bold text-emerald-600 text-sm">{camp.roas || "4.2x ROAS"}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{camp.name}</h4>
                        <div className="text-[11px] text-slate-600 line-clamp-2">{camp.targeting}</div>
                        <div className="p-2.5 bg-slate-50 rounded-xl text-[10px] font-mono text-slate-700">
                          Budget: {camp.budget || "$2,400/mo"} · CTR: {camp.ctr || "3.85%"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODULE 05: GOOGLE ADS */}
                {modId === "googleAds" && (
                  <div className="grid grid-cols-3 gap-6 h-full items-stretch">
                    {(modules.googleAds?.campaigns || []).slice(0, 3).map((gCamp, gcIdx) => (
                      <div key={gcIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">{gCamp.type || "Search Exact"}</span>
                          <span className="font-mono font-bold text-emerald-600 text-sm">{gCamp.convRate || "6.8% CVR"}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{gCamp.name}</h4>
                        <div className="text-[11px] text-slate-600 line-clamp-2">{gCamp.strategy}</div>
                        <div className="p-2.5 bg-slate-50 rounded-xl text-[10px] font-mono text-slate-700">
                          Quality Score: {gCamp.qualityScore || "9/10"} · CPC: {gCamp.cpc || "$1.12"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODULE 06: SEO & LOCAL GBP */}
                {modId === "seo" && (
                  <div className="grid grid-cols-2 gap-6 h-full items-stretch">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                      <h4 className="font-bold text-sm text-slate-900 mb-2">Technical Screaming Frog Audit Matrix</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-2 rounded bg-slate-50"><span>Crawl Health Score:</span><span className="font-bold text-emerald-600">96/100</span></div>
                        <div className="flex justify-between p-2 rounded bg-slate-50"><span>Canonical Errors:</span><span className="font-bold text-slate-800">0 Issues</span></div>
                        <div className="flex justify-between p-2 rounded bg-slate-50"><span>Core Web Vitals Pass:</span><span className="font-bold text-emerald-600">100% URLs</span></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                      <h4 className="font-bold text-sm text-slate-900 mb-2">Google Business Profile Local 3-Pack</h4>
                      <p className="text-xs text-slate-600">Optimized primary category, geocoded photo citations, 4.9-star review gating workflow, and weekly service updates driving +148% phone calls.</p>
                      <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-xs font-mono font-bold">Local 3-Pack Rank #1 Achieved</div>
                    </div>
                  </div>
                )}

                {/* MODULE 07: DIGITAL PLANNING */}
                {modId === "digitalPlanning" && (
                  <div className="bg-slate-950 text-white rounded-2xl p-6 h-full flex flex-col justify-between border border-slate-800">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">Executive Brand Audit & Gap Analysis Deck</span>
                      <span className="text-xs text-slate-400">16-Week Omnichannel Roadmap</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6 my-2 text-xs">
                      <div className="space-y-2">
                        <div className="font-bold text-slate-300">Diagnostic Findings:</div>
                        <ul className="list-disc pl-4 space-y-1 text-slate-400">
                          <li>72% reliance on Meta prospecting with zero email retention</li>
                          <li>Brand search trailed competitors by 4.2x due to lack of PR authority</li>
                          <li>Bounce rate on mobile was 68% due to slow product page load times</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl space-y-2">
                        <div className="font-bold text-slate-300">Phase 1 Infrastructure (Weeks 1-4):</div>
                        <div className="text-slate-400">Server-Side Meta CAPI, Sub-1.5s mobile speed, and 6-part automated Klaviyo retention sequence.</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">Verified Capstone Strategy Architecture</div>
                  </div>
                )}

                {/* MODULE 08: INFLUENCER MARKETING */}
                {modId === "influencerMarketing" && (
                  <div className="grid grid-cols-3 gap-6 h-full items-stretch">
                    {(modules.influencerMarketing?.creators || []).slice(0, 3).map((cr, crIdx) => (
                      <div key={crIdx} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">{cr.platform}</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">{cr.fitAssessment || "Recommended"}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{cr.name} ({cr.handle})</h4>
                        <div className="text-[11px] text-slate-600 font-mono">Followers: {cr.followers} · Eng: {cr.engagementRate}</div>
                        <div className="p-2.5 bg-slate-50 rounded-xl text-[10px] text-slate-600">Fake Followers: {cr.fakeFollowers || "< 5% Clean"}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODULE 09: SHOPIFY CRO */}
                {modId === "shopify" && (
                  <div className="grid grid-cols-12 gap-6 h-full items-center">
                    <div className="col-span-6 h-full rounded-2xl overflow-hidden border border-slate-200 bg-white">
                      <img src={modules.shopify?.imageUrl || mockupLaptopImg} alt="Shopify Mockup" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-6 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase">{modules.shopify?.nicheCategory || "Sustainable Activewear"}</span>
                        <h3 className="text-xl font-bold text-slate-900">{modules.shopify?.storeName || "Terra & Tide Apparel"}</h3>
                        <p className="text-xs text-slate-600 mt-1">{modules.shopify?.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">Conversion Rate</span>
                          <div className="font-bold text-blue-700 text-sm mt-0.5">{modules.shopify?.conversionRateAchieved || "3.84% (from 1.9%)"}</div>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">Achieved AOV</span>
                          <div className="font-bold text-amber-800 text-sm mt-0.5">{modules.shopify?.aovAchieved || "$89.50 (+$21 lift)"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODULE 10: VIDEO EDITING REELS */}
                {modId === "videoEditing" && (
                  <div className="grid grid-cols-2 gap-6 h-full items-stretch">
                    {(modules.videoEditing?.reels || []).slice(0, 2).map((reel, rlIdx) => (
                      <div key={rlIdx} className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-amber-400 font-bold">{reel.formatTag || "Reels / TikTok"}</span>
                          <span className="font-mono text-slate-400">{reel.duration || "0:24"}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{reel.title}</h4>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 italic">
                          "{reel.hookStrategy || "0-3s visual pattern interrupt paired with curiosity headline text."}"
                        </div>
                        <div className="text-xs font-mono text-emerald-400 font-bold">{reel.retentionMetric || "62% retention at 15s mark"}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODULE 11: DROPSHIPPING */}
                {modId === "dropshipping" && (
                  <div className="grid grid-cols-12 gap-6 h-full items-center">
                    <div className="col-span-5 h-full rounded-2xl overflow-hidden border border-slate-200 bg-white">
                      <img src={modules.dropshipping?.productImage || mockupLaptopImg} alt="Dropship" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-7 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-teal-600 uppercase">Product Validation Labs</span>
                        <h3 className="text-lg font-bold text-slate-900">{modules.dropshipping?.winningProduct || "Smart Ergonomic Cervical Pillow"}</h3>
                        <p className="text-xs text-slate-600 mt-1">{modules.dropshipping?.storefrontDetails}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="p-3 bg-slate-100 rounded-xl text-center"><span className="text-[10px] text-slate-500 font-bold">COGS</span><div className="font-bold text-slate-800 text-sm mt-0.5">{modules.dropshipping?.cogs || "$14.20"}</div></div>
                        <div className="p-3 bg-slate-100 rounded-xl text-center"><span className="text-[10px] text-slate-500 font-bold">RETAIL</span><div className="font-bold text-slate-800 text-sm mt-0.5">{modules.dropshipping?.retailPrice || "$59.95"}</div></div>
                        <div className="p-3 bg-emerald-100 rounded-xl text-center"><span className="text-[10px] text-emerald-800 font-bold">PROFIT/UNIT</span><div className="font-bold text-emerald-800 text-sm mt-0.5">{modules.dropshipping?.netProfit || "+$45.75"}</div></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODULE 12: AI MARKETING APP */}
                {modId === "aiApp" && (
                  <div className="grid grid-cols-2 gap-6 h-full items-center">
                    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">&gt;_ Engineered System Prompt:</span>
                      <p className="font-mono text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                        {modules.aiApp?.systemPromptInstruction || '"You are an elite direct-response copywriter. Output 3 distinct hooks under 125 characters, paired with 2 persuasive bodies."'}
                      </p>
                      <div className="flex gap-2 text-[10px] font-mono text-slate-400"><span>Model: Gemini 2.5 Flash</span>·<span>API: REST Serverless</span></div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{modules.aiApp?.appName || "AdCopyGenius AI — Creative Co-Pilot"}</h3>
                        <p className="text-xs text-slate-600 mt-1">{modules.aiApp?.appDescription}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-xs space-y-1">
                        <div className="font-bold text-purple-900">Direct-Response Output Engine:</div>
                        <div className="text-purple-700">Automated Google Ads compliance validation, Meta CTR predicted score, and 1-click clipboard export.</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODULE 13: PERFORMANCE MARKETING */}
                {modId === "performanceMarketing" && (
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div className="grid grid-cols-4 gap-4">
                      {(modules.performanceMarketing?.stats || []).slice(0, 4).map((st, si) => (
                        <div key={si} className="p-4 bg-white rounded-2xl border border-slate-200 text-center">
                          <div className="text-lg font-black text-slate-900">{st.value}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{st.label}</div>
                          <div className="text-[10px] font-mono text-emerald-600 mt-1">{st.subtext}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">Attribution Rigor</span>
                        <div className="font-bold text-sm text-white mt-0.5">Triple Whale Server-Side CAPI & GA4 BigQuery</div>
                      </div>
                      <div className="font-mono text-slate-300">Blended CAC: $82.40 (-28% vs Account Baseline)</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Slide Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-400 font-mono">
                <span>Operating Media Digital Marketing Academy · Verified Student Capstone</span>
                <span>Module {modNumber} · {catalogMod?.title || modTitle}</span>
                <span>Slide {slideNumber} of {totalSlides}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PortfolioPdfExporter;
