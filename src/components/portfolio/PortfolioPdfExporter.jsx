import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { MODULES_CATALOG } from "./portfolioData";
import { PortfolioPreview } from "./PortfolioPreview";

/**
 * Fits a captured canvas image into a standard 16:9 PPT slide (960x540 pt)
 * without stretching, maintaining exact aspect ratio, centered.
 */
function addFitImage(pdf, canvas, imgData, slideW = 960, slideH = 540) {
  const imgAspect = canvas.width / canvas.height;
  const slideAspect = slideW / slideH;

  let renderW = slideW;
  let renderH = slideH;
  let offsetX = 0;
  let offsetY = 0;

  if (imgAspect >= slideAspect) {
    // Image is wider than 16:9
    renderW = slideW;
    renderH = slideW / imgAspect;
    offsetY = (slideH - renderH) / 2;
  } else {
    // Image is taller than 16:9
    renderH = slideH;
    renderW = slideH * imgAspect;
    offsetX = (slideW - renderW) / 2;
  }

  pdf.addImage(imgData, "JPEG", offsetX, offsetY, renderW, renderH, undefined, "FAST");
}

/**
 * PortfolioPdfExporter:
 * Captures direct full-desktop screenshots of the actual website views
 * and places each screenshot directly onto a blank 16:9 PPT slide in the PDF.
 * 
 * - Slide 1: Screenshot of the live Hero & Profile section
 * - Slides 2..N: Screenshots of each visible module on the live website
 * - Standard 16:9 PowerPoint widescreen format (960 x 540 pt)
 * - Automatically downloads the PDF and opens it in a new tab
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

  // Ordered visible modules list
  const activeModuleOrder =
    moduleOrder && moduleOrder.length > 0
      ? moduleOrder
      : MODULES_CATALOG.map((m) => m.id);

  const visibleModules = activeModuleOrder.filter((modId) => {
    return moduleVisibility[modId] !== false;
  });

  // Total slides = 1 (Hero/Profile) + Count of visible modules
  const totalSlides = 1 + visibleModules.length;

  useEffect(() => {
    if (isOpen) {
      startExport();
    } else {
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
    setCurrentSlideTitle("Slide 1 of " + totalSlides + ": Executive Profile & Credentials");
    setErrorMessage("");

    try {
      // 1. Wait for offscreen full-width desktop container to render
      await new Promise((resolve) => setTimeout(resolve, 800));

      const captureContainer = document.getElementById("pdf-desktop-capture-container");
      if (!captureContainer) {
        throw new Error("Desktop capture container not found.");
      }

      // Initialize 16:9 PowerPoint slide format (960 x 540 pt, matches standard PPT 16:9)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [960, 540],
        compress: true,
      });

      // 2. CAPTURE SLIDE 1: Hero & Profile section
      const heroEl =
        captureContainer.querySelector("#portfolio-section-hero") ||
        captureContainer.querySelector("header");

      if (heroEl) {
        const heroCanvas = await html2canvas(heroEl, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#0f172a",
          logging: false,
          windowWidth: 1440,
        });

        // Dark background matching hero
        pdf.setFillColor(15, 23, 42);
        pdf.rect(0, 0, 960, 540, "F");
        addFitImage(pdf, heroCanvas, heroCanvas.toDataURL("image/jpeg", 0.95), 960, 540);
      }

      // 3. CAPTURE SLIDES 2..N: Each Visible Module
      for (let i = 0; i < visibleModules.length; i++) {
        const modId = visibleModules[i];
        const catalogMod = MODULES_CATALOG.find((m) => m.id === modId);
        const modTitle = catalogMod ? catalogMod.title : modId;
        const slideNum = i + 2;

        setCurrentSlideIndex(slideNum);
        setCurrentSlideTitle(`Slide ${slideNum} of ${totalSlides}: ${modTitle}`);
        setProgressPercent(Math.round(((i + 1) / totalSlides) * 100));

        // Yield to browser UI thread
        await new Promise((resolve) => setTimeout(resolve, 200));

        const modEl =
          captureContainer.querySelector("#" + modId) ||
          captureContainer.querySelector("#portfolio-section-" + modId);

        if (modEl) {
          const modCanvas = await html2canvas(modEl, {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#f8fafc",
            logging: false,
            windowWidth: 1440,
          });

          pdf.addPage([960, 540], "landscape");
          // Light background matching website module sections
          pdf.setFillColor(248, 250, 252);
          pdf.rect(0, 0, 960, 540, "F");
          addFitImage(pdf, modCanvas, modCanvas.toDataURL("image/jpeg", 0.95), 960, 540);
        }
      }

      setProgressPercent(100);
      setCurrentSlideTitle("Finalizing & Compiling Presentation PDF...");

      const safeStudentName = (student.name || "Student").replace(/\s+/g, "_");
      const fileName = `${safeStudentName}_Digital_Marketing_Portfolio.pdf`;
      setPdfFileName(fileName);

      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);

      // Direct download
      pdf.save(fileName);

      // Open in a new tab
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
      {/* 1. VISIBLE PROGRESS & STATUS MODAL */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-xs"
                style={{ backgroundColor: theme?.primary || "#2563eb" }}
              >
                OM
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                  Operating Media Digital Marketing Academy
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Verified Student Portfolio Deck Exporter
                </p>
              </div>
            </div>

            {!isGenerating && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* GENERATING STATE */}
          {isGenerating && (
            <div className="space-y-5 py-2">
              <div className="flex items-center space-x-3 text-blue-600">
                <Loader2 size={24} className="animate-spin shrink-0" />
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    Capturing High-Resolution Slides ({currentSlideIndex} of {totalSlides})
                  </div>
                  <div className="text-xs text-slate-500 truncate max-w-[340px]">
                    {currentSlideTitle}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                  <span>Capturing live website views...</span>
                  <span className="font-bold text-slate-700">{progressPercent}%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 flex items-center space-x-2">
                <Sparkles size={14} className="text-amber-500 shrink-0" />
                <span>
                  Capturing full-desktop resolution (1440px) at 16:9 widescreen presentation ratio.
                </span>
              </div>
            </div>
          )}

          {/* COMPLETED STATE */}
          {isCompleted && (
            <div className="space-y-5 py-2">
              <div className="flex items-center space-x-3 text-emerald-600">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                </div>
                <div>
                  <div className="font-bold text-base text-slate-900">
                    Presentation PDF Generated!
                  </div>
                  <div className="text-xs text-slate-500">
                    Captured {totalSlides} widescreen slides faithfully from your live portfolio.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Student Candidate:</span>
                  <span className="font-bold text-slate-800">{student.name || "Student"}</span>
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

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 text-center cursor-pointer transition-colors"
              >
                Done / Close Exporter
              </button>
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

      {/* 2. ISOLATED FULL-WIDTH DESKTOP STAGING VIEWPORT (1440px Fixed Desktop Width) */}
      <div
        id="pdf-desktop-capture-container"
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
          width: "1440px",
          zIndex: -9999,
          background: "#0f172a",
          visibility: "visible",
          overflow: "visible",
        }}
      >
        <PortfolioPreview
          portfolioData={portfolioData}
          theme={theme}
          moduleVisibility={moduleVisibility}
          isStandalone={true}
          isExportCapture={true}
        />
      </div>
    </>
  );
};

export default PortfolioPdfExporter;
