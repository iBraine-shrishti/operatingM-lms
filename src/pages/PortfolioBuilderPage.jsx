import React, { useState, useEffect } from "react";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  createInitialPortfolioData,
  MODULES_CATALOG,
} from "../components/portfolio/portfolioData";
import {
  PORTFOLIO_THEMES,
  getThemeById,
} from "../components/portfolio/portfolioThemes";
import { PortfolioFormEditor } from "../components/portfolio/PortfolioFormEditor";
import { PortfolioPreview } from "../components/portfolio/PortfolioPreview";
import { PortfolioPdfExporter } from "../components/portfolio/PortfolioPdfExporter";
import {
  Sparkles,
  Download,
  RotateCcw,
  Palette,
  Columns,
  Eye,
  Edit3,
  FileCode,
  Check,
  ExternalLink,
  Copy,
} from "lucide-react";

export const PortfolioBuilderPage = () => {
  const { currentUser, crmProfile, crmBatch, crmCertificates } = useAuth();
  const { showToast } = useToast();

  // 1. Portfolio Data State (deep merge with defaults to prevent broken states from older localStorage data)
  const [portfolioData, setPortfolioData] = useState(() => {
    const defaultData = createInitialPortfolioData(
      currentUser,
      crmProfile,
      crmBatch,
      crmCertificates
    );
    try {
      const saved = localStorage.getItem("om_lms_portfolio_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultData,
          ...parsed,
          moduleOrder:
            Array.isArray(parsed.moduleOrder) && parsed.moduleOrder.length > 0
              ? parsed.moduleOrder
              : defaultData.moduleOrder,
          student: {
            ...defaultData.student,
            ...(parsed.student || {}),
          },
          modules: {
            ...defaultData.modules,
            ...(parsed.modules || {}),
            digitalPlanning:
              parsed.modules?.digitalPlanning?.brandAuditDeck?.[0]?.findings
                ? parsed.modules.digitalPlanning
                : defaultData.modules.digitalPlanning,
            seo:
              parsed.modules?.seo?.auditCategories
                ? parsed.modules.seo
                : defaultData.modules.seo,
            influencerMarketing:
              parsed.modules?.influencerMarketing?.creators
                ? parsed.modules.influencerMarketing
                : defaultData.modules.influencerMarketing,
            aiApp:
              parsed.modules?.aiApp?.systemPromptInstruction
                ? parsed.modules.aiApp
                : defaultData.modules.aiApp,
            performanceMarketing:
              parsed.modules?.performanceMarketing?.funnelArchitecture
                ? parsed.modules.performanceMarketing
                : defaultData.modules.performanceMarketing,
            videoEditing:
              parsed.modules?.videoEditing?.reels
                ? parsed.modules.videoEditing
                : defaultData.modules.videoEditing,
          },
        };
      }
    } catch (e) {
      console.warn("Failed to read saved portfolio:", e);
    }
    return defaultData;
  });

  // 2. Theme State
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("om_lms_portfolio_theme");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return PORTFOLIO_THEMES[0];
  });

  // 3. Modules Visibility State
  const [moduleVisibility, setModuleVisibility] = useState(() => {
    try {
      const saved = localStorage.getItem("om_lms_portfolio_modules");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      wordpress: true,
      canva: true,
      socialOrganic: true,
      socialMarketing: true,
      googleAds: true,
      seo: true,
      digitalPlanning: true,
      influencerMarketing: true,
      shopify: true,
      videoEditing: true,
      dropshipping: true,
      aiApp: true,
      performanceMarketing: true,
    };
  });

  // 4. View Mode: "split" | "edit" | "preview"
  const [viewMode, setViewMode] = useState("split");
  const [isPdfExportOpen, setIsPdfExportOpen] = useState(false);

  // Auto-sync backend student profile details on load if available (like Resume)
  useEffect(() => {
    const backendAvatar =
      currentUser?.avatar ||
      currentUser?.profilePicture ||
      crmProfile?.photo ||
      crmProfile?.avatar ||
      localStorage.getItem("om_lms_student_avatar");

    const studentName =
      currentUser?.name ||
      currentUser?.fullName ||
      crmProfile?.name ||
      crmProfile?.fullName;

    if (backendAvatar || studentName) {
      setPortfolioData((prev) => {
        let changed = false;
        const updatedStudent = { ...prev.student };

        if (
          backendAvatar &&
          (!updatedStudent.avatarUrl ||
            updatedStudent.avatarUrl.includes("photo-1534528741775-53994a69daeb") ||
            updatedStudent.avatarUrl.includes("photo-1507003211169-0a1dd7228f2d"))
        ) {
          updatedStudent.avatarUrl = backendAvatar;
          changed = true;
        }

        if (studentName && (updatedStudent.name === "Ram Charan" || !updatedStudent.name)) {
          updatedStudent.name = studentName;
          changed = true;
        }

        if (changed) {
          const updated = {
            ...prev,
            student: updatedStudent,
          };
          try {
            localStorage.setItem("om_lms_portfolio_data", JSON.stringify(updated));
          } catch (e) {}
          return updated;
        }
        return prev;
      });
    }
  }, [currentUser?.avatar, currentUser?.name, crmProfile?.photo, crmProfile?.name]);

  // Save changes to localStorage
  const handleDataChange = (updated) => {
    setPortfolioData(updated);
    try {
      localStorage.setItem("om_lms_portfolio_data", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("om_lms_portfolio_theme", JSON.stringify(newTheme));
    } catch (e) {}
    showToast(`Portfolio theme updated to "${newTheme.name}"`, "success", "Theme Changed");
  };

  const handleToggleModule = (modId) => {
    setModuleVisibility((prev) => {
      const updated = { ...prev, [modId]: prev[modId] === false ? true : false };
      try {
        localStorage.setItem("om_lms_portfolio_modules", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Reset to initial profile prefill
  const handleReset = () => {
    if (window.confirm("Reset all portfolio details back to default student LMS template?")) {
      const fresh = createInitialPortfolioData(
        currentUser,
        crmProfile,
        crmBatch,
        crmCertificates
      );
      setPortfolioData(fresh);
      setModuleVisibility({});
      setTheme(PORTFOLIO_THEMES[0]);
      try {
        localStorage.setItem("om_lms_portfolio_data", JSON.stringify(fresh));
        localStorage.setItem("om_lms_portfolio_theme", JSON.stringify(PORTFOLIO_THEMES[0]));
      } catch (e) {}
      showToast("Portfolio reset to default student credentials", "info", "Reset Complete");
    }
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const jsonStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ portfolioData, theme, moduleVisibility }, null, 2)
    )}`;
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute(
      "download",
      `${portfolioData.student.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_portfolio_backup.json`
    );
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast("Portfolio JSON data downloaded successfully", "success", "JSON Exported");
  };

  // Export Standalone HTML file
  const handleExportHTML = () => {
    const student = portfolioData.student;
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${student.name} — Digital Marketing Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
  <div class="py-16 text-white text-center" style="background-color: ${theme.secondary}">
    <h1 class="text-4xl font-black">${student.name}</h1>
    <p class="text-lg font-bold mt-2" style="color: ${theme.primary}">${student.headline}</p>
    <p class="text-sm text-slate-300 max-w-2xl mx-auto mt-2">${student.bio}</p>
  </div>
  <div class="max-w-5xl mx-auto p-8">
    <h2 class="text-2xl font-black mb-6">Key Performance Highlights</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${student.highlights
        .map(
          (h) => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs uppercase font-bold text-slate-400">${h.label}</div>
          <div class="text-2xl font-black mt-1" style="color: ${theme.primary}">${h.value}</div>
          <div class="text-xs text-slate-500 mt-0.5">${h.detail}</div>
        </div>
      `
        )
        .join("")}
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const dlAnchor = document.createElement("a");
    dlAnchor.href = url;
    dlAnchor.download = `${student.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_portfolio.html`;
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    URL.revokeObjectURL(url);
    showToast("Standalone HTML portfolio file generated!", "success", "HTML Exported");
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <StudentPageHeader
        icon={Sparkles}
        category="Operating Media Masterclass Curriculum"
        badgeText="Portfolio Studio"
        title="Digital Marketing Portfolio Builder"
        description="Build and customize an interactive 13-module graduation portfolio with personalized color palettes, client case studies, verified metrics, and 1-click HTML export."
        metrics={[
          {
            value: `${Object.values(moduleVisibility).filter((v) => v !== false).length}/13`,
            label: "Modules Active",
            dotColor: "bg-blue-600",
          },
          {
            value: theme.name.split(" ")[0],
            label: "Theme Color",
            dotColor: "bg-amber-500",
          },
          {
            value: "Live Preview",
            label: "Status",
            dotColor: "bg-emerald-500",
          },
          {
            value: "HTML & JSON",
            label: "Exports",
            dotColor: "bg-purple-500",
          },
        ]}
      />

      {/* 2. Top Toolbar: View Mode Switcher & Export Actions */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: View Mode Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              viewMode === "split"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Columns size={13} />
            <span>Split View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              viewMode === "edit"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Edit3 size={13} />
            <span>Edit Only</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              viewMode === "preview"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Eye size={13} />
            <span>Preview Only</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPdfExportOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Download Full Portfolio as 16:9 Presentation PDF"
          >
            <Printer size={13} />
            <span>Save / Print Portfolio</span>
          </button>

          <button
            type="button"
            onClick={() => window.open("/portfolio-live", "_blank")}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink size={13} />
            <span>Live Preview in Tab</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const url = window.location.origin + "/portfolio-live";
              navigator.clipboard.writeText(url);
              showToast("Portfolio live preview link copied to clipboard! Paste in any browser or tab.", "success", "Link Copied");
            }}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Copy size={13} />
            <span>Copy Link</span>
          </button>

          <button
            type="button"
            onClick={handleExportHTML}
            className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <FileCode size={13} />
            <span>Export HTML</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Download size={13} />
            <span>Backup JSON</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reset to Default"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* 3. Main Workspace: Split or Full */}
      {viewMode === "split" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Editor */}
          <div className="lg:col-span-5 h-[550px] sm:h-[700px] lg:h-[820px] xl:h-[860px] lg:sticky lg:top-24 overscroll-contain">
            <PortfolioFormEditor
              data={portfolioData}
              onChange={handleDataChange}
              theme={theme}
              onThemeChange={handleThemeChange}
              moduleVisibility={moduleVisibility}
              onToggleModule={handleToggleModule}
              onReset={handleReset}
            />
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-[550px] sm:h-[700px] lg:h-[820px] xl:h-[860px] overflow-y-auto overscroll-contain custom-scrollbar">
            <PortfolioPreview
              portfolioData={portfolioData}
              theme={theme}
              moduleVisibility={moduleVisibility}
              onChange={handleDataChange}
              onOpenCustomizer={() => setViewMode("edit")}
            />
          </div>
        </div>
      )}

      {viewMode === "edit" && (
        <div className="max-w-4xl mx-auto h-[550px] sm:h-[700px] lg:h-[820px] xl:h-[860px]">
          <PortfolioFormEditor
            data={portfolioData}
            onChange={handleDataChange}
            theme={theme}
            onThemeChange={handleThemeChange}
            moduleVisibility={moduleVisibility}
            onToggleModule={handleToggleModule}
            onReset={handleReset}
          />
        </div>
      )}

      <PortfolioPdfExporter
        isOpen={isPdfExportOpen}
        onClose={() => setIsPdfExportOpen(false)}
        portfolioData={portfolioData}
        theme={theme}
        moduleVisibility={moduleVisibility}
        moduleOrder={portfolioData.moduleOrder}
      />

      {viewMode === "preview" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-visible shadow-lg">
          <PortfolioPreview
            portfolioData={portfolioData}
            theme={theme}
            moduleVisibility={moduleVisibility}
            onChange={handleDataChange}
            onOpenCustomizer={() => setViewMode("edit")}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioBuilderPage;
