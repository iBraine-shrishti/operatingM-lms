import React, { useState, useEffect } from "react";
import { PortfolioPreview } from "../components/portfolio/PortfolioPreview";
import {
  createInitialPortfolioData,
} from "../components/portfolio/portfolioData";
import {
  PORTFOLIO_THEMES,
} from "../components/portfolio/portfolioThemes";
import { Copy, Check, Mail } from "lucide-react";

export const PortfolioLivePage = () => {
  const [portfolioData, setPortfolioData] = useState(() => {
    const defaultData = createInitialPortfolioData();
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
    } catch (e) {}
    return defaultData;
  });

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("om_lms_portfolio_theme");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return PORTFOLIO_THEMES[0];
  });

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

  const [copied, setCopied] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Cross-tab real-time sync with localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "om_lms_portfolio_modules" && e.newValue) {
        try {
          setModuleVisibility(JSON.parse(e.newValue));
        } catch (err) {}
      }
      if (e.key === "om_lms_portfolio_data" && e.newValue) {
        try {
          const defaultData = createInitialPortfolioData();
          const parsed = JSON.parse(e.newValue);
          setPortfolioData({
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
            },
          });
        } catch (err) {}
      }
      if (e.key === "om_lms_portfolio_theme" && e.newValue) {
        try {
          setTheme(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Floating Share & Contact Pill */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-full shadow-2xl border border-slate-700/80">
        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="text-xs font-bold text-white hover:text-amber-300 flex items-center space-x-1.5 cursor-pointer transition-colors pr-2.5 border-r border-slate-700"
          title="Open candidate contact and message modal"
        >
          <Mail size={13} className="text-amber-400" />
          <span>Get in Touch</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1.5 cursor-pointer transition-colors pl-0.5"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? "Link Copied!" : "Share Link"}</span>
        </button>
      </div>

      {/* Fullscreen Portfolio Preview (Strict Read-Only Mode) */}
      <PortfolioPreview
        portfolioData={portfolioData}
        theme={theme}
        moduleVisibility={moduleVisibility}
        isStandalone={true}
        isContactOpen={isContactOpen}
        onContactOpenChange={setIsContactOpen}
      />
    </div>
  );
};

export default PortfolioLivePage;
