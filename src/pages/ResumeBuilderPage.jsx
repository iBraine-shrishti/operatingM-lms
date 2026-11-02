import React, { useState, useEffect } from "react";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  createInitialResumeData,
  TEMPLATES_CONFIG,
} from "../components/resume/resumeData";
import { RESUME_THEMES, getThemeById } from "../components/resume/ResumeThemes";
import { ResumeFormEditor } from "../components/resume/ResumeFormEditor";
import { ResumePreview } from "../components/resume/ResumePreview";
import {
  Printer,
  Download,
  RotateCcw,
  Palette,
  Layout,
  Eye,
  Edit3,
  Columns,
  Check,
} from "lucide-react";

export const ResumeBuilderPage = () => {
  const { currentUser, crmProfile, crmBatch, crmCertificates } = useAuth();
  const { showToast } = useToast();

  // 1. Resume Content State
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem("om_lms_resume_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to read saved resume:", e);
    }
    return createInitialResumeData(
      currentUser,
      crmProfile,
      crmBatch,
      crmCertificates,
    );
  });

  // Auto-sync student profile on first load if default was empty
  useEffect(() => {
    if (!localStorage.getItem("om_lms_resume_data")) {
      setResumeData(
        createInitialResumeData(
          currentUser,
          crmProfile,
          crmBatch,
          crmCertificates,
        ),
      );
    }
  }, [currentUser?.name, crmProfile?.name, crmBatch?.courseName]);

  // Save changes to localStorage
  const handleDataChange = (updated) => {
    setResumeData(updated);
    try {
      localStorage.setItem("om_lms_resume_data", JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to persist resume:", e);
    }
  };

  // Reset to initial profile prefill
  const handleReset = () => {
    if (
      window.confirm(
        "Reset resume details back to student profile default data?",
      )
    ) {
      const fresh = createInitialResumeData(
        currentUser,
        crmProfile,
        crmBatch,
        crmCertificates,
      );
      setResumeData(fresh);
      try {
        localStorage.setItem("om_lms_resume_data", JSON.stringify(fresh));
      } catch (e) {}
      showToast(
        "Resume reset to default student credentials",
        "info",
        "Reset Complete",
      );
    }
  };

  // 2. Template Selector State
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    const saved = localStorage.getItem("om_lms_resume_template");
    if (!saved || saved === "dual-arch-creative") return "modern-executive";
    return saved;
  });

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    localStorage.setItem("om_lms_resume_template", templateId);
  };

  // 3. Theme / Multi-tone Color State
  const [selectedThemeId, setSelectedThemeId] = useState(() => {
    return localStorage.getItem("om_lms_resume_theme") || "om-navy";
  });
  const [customColor, setCustomColor] = useState("#003873");

  const handleThemeChange = (themeId) => {
    setSelectedThemeId(themeId);
    localStorage.setItem("om_lms_resume_theme", themeId);
  };

  const activeTheme = getThemeById(selectedThemeId, customColor);

  // 4. Responsive View Mode (for mobile/tablet: "split" | "edit" | "preview")
  const [mobileTab, setMobileTab] = useState("split");

  // 5. Print / PDF Export
  const handlePrint = () => {
    const originalTitle = document.title;
    const studentName = resumeData?.personalInfo?.fullName || "Student";
    const cleanFileName = `${studentName.replace(/[^a-zA-Z0-9_-]/g, "_")}_Resume`;
    document.title = cleanFileName;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans print:p-0 print:m-0 print:pb-0 print:space-y-0">
      {/* 1. HERO HEADER */}
      <div className="resume-hide-on-print">
        <StudentPageHeader
          category="Student Placement & Career Launchpad"
          badgeText="Live AI & ATS Verified"
          title="Dynamic Student Resume Builder"
          description="Build industry-standard, ATS-optimized resumes prefilled with your Operating Media certifications, real agency projects, and custom multi-tone color branding."
          metrics={[
            {
              value: "4 Templates",
              label: "Available",
              dotColor: "bg-[#003873]",
            },
            {
              value: "Live Sync",
              label: "Real-time Preview",
              dotColor: "bg-emerald-500",
            },
            {
              value: "A4 PDF Export",
              label: "1-Click Download",
              dotColor: "bg-blue-600",
            },
          ]}
        />
      </div>

      {/* 2. CONTROL RIBBON (TEMPLATES, THEMES & ACTIONS) */}
      <div className="resume-control-ribbon resume-hide-on-print bg-white dark:bg-[#0b1329] p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        {/* ROW 1: TEMPLATE SELECTOR */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Layout size={15} className="text-[#003873] dark:text-sky-400" />
              <span>Choose Template ({TEMPLATES_CONFIG.length} Styles)</span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Switching templates preserves all your edits
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {TEMPLATES_CONFIG.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleTemplateChange(tmpl.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#003873] text-white border-[#003873] shadow-xs"
                      : "bg-slate-50 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#003873]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-extrabold truncate">
                      {tmpl.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-white text-[#003873] flex items-center justify-center shrink-0">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[10.5px] mt-1 line-clamp-1 ${
                      isSelected
                        ? "text-blue-100"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {tmpl.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ROW 2: THEME / COLOR CUSTOMIZER (NO REPETITIVE MONOTONE) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Palette size={15} className="text-[#003873] dark:text-sky-400" />
              <span>Multi-Tone Color Theme (Zero Repetitive Colors)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {RESUME_THEMES.map((th) => {
                const isSelected = selectedThemeId === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => handleThemeChange(th.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent shadow-xs"
                        : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    {/* Multi-tone color dots (Primary + Secondary + Accent) */}
                    <span className="flex items-center -space-x-1 shrink-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                        style={{ backgroundColor: th.primary }}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-white shadow-2xs"
                        style={{ backgroundColor: th.secondary }}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs"
                        style={{ backgroundColor: th.accent }}
                      />
                    </span>
                    <span className="text-[11px] truncate">{th.name}</span>
                  </button>
                );
              })}

              {/* Custom Color Input */}
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    handleThemeChange("custom");
                  }}
                  className="w-5 h-5 rounded cursor-pointer border-none bg-transparent"
                  title="Pick custom brand color"
                />
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  Custom
                </span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (PRINT/PDF & RESET) */}
          <div className="flex items-center gap-2 pt-2 md:pt-0 self-end md:self-center">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#003873] hover:bg-[#002d5c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer active:scale-98"
            >
              <Download size={15} />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>

        {/* MOBILE VIEW TOGGLE TABS (ONLY VISIBLE ON < LG SCREENS) */}
        <div className="lg:hidden pt-2 border-t border-slate-100 dark:border-slate-800 flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1">
          <button
            type="button"
            onClick={() => setMobileTab("edit")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "edit"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Edit3 size={13} />
            <span>Form Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "preview"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Eye size={13} />
            <span>Live A4 Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("split")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "split"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Columns size={13} />
            <span>Split View</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE (SPLIT SCREEN: EDITOR ON LEFT, LIVE A4 PREVIEW ON RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start print:block print:w-full print:m-0 print:p-0 print:min-h-0 print:h-auto">
        {/* LEFT COLUMN: RESUME FORM EDITOR */}
        <div
          className={`lg:col-span-5 resume-hide-on-print ${
            mobileTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <ResumeFormEditor
            data={resumeData}
            templateId={selectedTemplate}
            onChange={handleDataChange}
            onReset={handleReset}
          />
        </div>

        {/* RIGHT COLUMN: LIVE A4 PREVIEW */}
        <div
          className={`lg:col-span-7 ${
            mobileTab === "edit" ? "hidden lg:block" : "block"
          } print:block print:w-full print:max-w-none print:m-0 print:p-0 print:min-h-0 print:h-auto`}
        >
          <div className="sticky top-20 print:static print:top-0 print:m-0 print:p-0 print:min-h-0 print:h-auto">
            <div className="resume-hide-on-print flex items-center justify-between pb-2 mb-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <span>A4 Document Preview ({activeTheme.name})</span>
              <span className="text-[11px] text-slate-400 font-semibold lowercase">
                click headings on preview to quick-edit
              </span>
            </div>
            <ResumePreview
              data={resumeData}
              templateId={selectedTemplate}
              theme={activeTheme}
              onChange={handleDataChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
