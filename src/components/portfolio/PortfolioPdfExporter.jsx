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
import logoHorizontalDarkImg from "../../assets/logo-horizontal-dark.png";
import logoHorizontalImg from "../../assets/logo-horizontal.png";

/**
 * Loads an image URL and converts it to a base64 Data URL for jsPDF.
 */
function loadImgDataUrl(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth || img.width;
        c.height = img.naturalHeight || img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(c.toDataURL("image/png"));
      } catch (e) {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

/**
 * Fits a captured canvas image into the slide content area
 * between the institutional top header and bottom footer.
 */
function addFitImage(pdf, canvas, imgData, slideW = 960, contentH = 488, contentTop = 27) {
  const imgAspect = canvas.width / canvas.height;
  const areaAspect = slideW / contentH;

  let renderW = slideW;
  let renderH = contentH;
  let offsetX = 0;
  let offsetY = contentTop;

  if (imgAspect >= areaAspect) {
    // Image is wider than content area -> fit to width
    renderW = slideW;
    renderH = slideW / imgAspect;
    offsetY = contentTop + (contentH - renderH) / 2;
  } else {
    // Image is taller than content area -> fit to height
    renderH = contentH;
    renderW = contentH * imgAspect;
    offsetX = (slideW - renderW) / 2;
  }

  pdf.addImage(imgData, "JPEG", offsetX, offsetY, renderW, renderH, undefined, "FAST");
}

/**
 * Draws the Operating Media institutional header and footer mildly & tastefully
 * on each slide of the downloaded PDF.
 */
function drawInstitutionalHeaderFooter(pdf, { isDark, slideNum, totalSlides, studentName, logoDataUrl }) {
  // 1. TOP HEADER (Height: 25pt)
  if (logoDataUrl) {
    try {
      // 55pt width x 15.8pt height maintains original 2255:650 aspect ratio
      pdf.addImage(logoDataUrl, "PNG", 24, 7, 55, 15.8);
    } catch (e) {}
  }

  // Divider between logo and academy name
  if (isDark) {
    pdf.setDrawColor(51, 65, 85); // slate-700
    pdf.line(86, 9, 86, 21);
    pdf.setTextColor(148, 163, 184); // slate-400
  } else {
    pdf.setDrawColor(226, 232, 240); // slate-200
    pdf.line(86, 9, 86, 21);
    pdf.setTextColor(100, 116, 139); // slate-500
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.text("Operating Media Digital Marketing Academy", 92, 16);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  if (isDark) {
    pdf.setTextColor(100, 116, 139); // slate-500
  } else {
    pdf.setTextColor(148, 163, 184); // slate-400
  }
  pdf.text("  |  Verified Capstone Portfolio", 262, 16);

  // Right side top: Student Candidate info
  if (isDark) {
    pdf.setTextColor(203, 213, 225); // slate-300
  } else {
    pdf.setTextColor(71, 85, 105); // slate-600
  }
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.text(`${studentName} • Executive Master Program`, 936, 16, { align: "right" });

  // Top hairline separator line
  if (isDark) {
    pdf.setDrawColor(30, 41, 59); // slate-800
  } else {
    pdf.setDrawColor(241, 245, 249); // slate-100
  }
  pdf.line(24, 25, 936, 25);

  // 2. BOTTOM FOOTER (Height: 24pt)
  if (isDark) {
    pdf.setDrawColor(30, 41, 59); // slate-800
  } else {
    pdf.setDrawColor(226, 232, 240); // slate-200
  }
  pdf.line(24, 517, 936, 517);

  // Bottom left: Institutional accreditation & locations
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);
  if (isDark) {
    pdf.setTextColor(100, 116, 139); // slate-500
  } else {
    pdf.setTextColor(148, 163, 184); // slate-400
  }
  pdf.text(
    "Operating Media  •  Official Digital Marketing Training & Placement Division  •  operatingmedia.com",
    24,
    529
  );

  // Bottom center: ISO certification badge
  if (isDark) {
    pdf.setTextColor(71, 85, 105);
  } else {
    pdf.setTextColor(148, 163, 184);
  }
  pdf.text("ISO 9001:2015 Certified Digital Marketing Institute", 480, 529, { align: "center" });

  // Bottom right: Slide counter
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  if (isDark) {
    pdf.setTextColor(148, 163, 184);
  } else {
    pdf.setTextColor(100, 116, 139);
  }
  pdf.text(`Slide ${slideNum} of ${totalSlides}`, 936, 529, { align: "right" });
}

/**
 * PortfolioPdfExporter:
 * Captures direct full-desktop screenshots of the actual website views
 * and places each screenshot directly onto a blank 16:9 PPT slide in the PDF
 * with subtle Operating Media institutional top & bottom branding.
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
      // 1. Preload logos as Data URLs for jsPDF
      const [logoDarkDataUrl, logoLightDataUrl] = await Promise.all([
        loadImgDataUrl(logoHorizontalDarkImg),
        loadImgDataUrl(logoHorizontalImg),
      ]);

      // 2. Wait for offscreen full-width desktop container to render
      await new Promise((resolve) => setTimeout(resolve, 800));

      const captureContainer = document.getElementById("pdf-desktop-capture-container");
      if (!captureContainer) {
        throw new Error("Desktop capture container not found.");
      }

      // Initialize 16:9 PowerPoint slide format (960 x 540 pt)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [960, 540],
        compress: true,
      });

      // 3. CAPTURE SLIDE 1: Hero & Profile section
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

        // Fit screenshot in content area
        addFitImage(pdf, heroCanvas, heroCanvas.toDataURL("image/jpeg", 0.95), 960, 488, 27);

        // Institutional Top Header and Bottom Footer (Mild & Elegant)
        drawInstitutionalHeaderFooter(pdf, {
          isDark: true,
          slideNum: 1,
          totalSlides,
          studentName: student.name || "Student",
          logoDataUrl: logoDarkDataUrl,
        });
      }

      // 4. CAPTURE SLIDES 2..N: Each Visible Module
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

          // Fit screenshot in content area
          addFitImage(pdf, modCanvas, modCanvas.toDataURL("image/jpeg", 0.95), 960, 488, 27);

          // Institutional Top Header and Bottom Footer (Mild & Elegant)
          drawInstitutionalHeaderFooter(pdf, {
            isDark: false,
            slideNum,
            totalSlides,
            studentName: student.name || "Student",
            logoDataUrl: logoLightDataUrl,
          });
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
            <div className="flex items-center space-x-3">
              <img
                src={logoHorizontalImg}
                alt="Operating Media"
                className="h-7 w-auto object-contain"
              />
              <div className="border-l border-slate-200 pl-3">
                <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
                  Operating Media Digital Marketing Academy
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">
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
                  <span>Adding Operating Media institutional accreditation...</span>
                  <span className="font-bold text-slate-700">{progressPercent}%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 flex items-center space-x-2">
                <Sparkles size={14} className="text-amber-500 shrink-0" />
                <span>
                  Embedding official Operating Media header & footer accreditation on 16:9 widescreen slides.
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
                    Presentation PDF Ready!
                  </div>
                  <div className="text-xs text-slate-500">
                    Captured {totalSlides} widescreen slides with Operating Media institutional verification.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Student Candidate:</span>
                  <span className="font-bold text-slate-800">{student.name || "Student"}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Institution:</span>
                  <span className="font-bold text-blue-600">Operating Media Academy</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Total Slides:</span>
                  <span className="font-bold text-slate-800">{totalSlides} Slides (16:9)</span>
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
