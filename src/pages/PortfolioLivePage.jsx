import React, { useState, useEffect } from "react";
import { PortfolioPreview } from "../components/portfolio/PortfolioPreview";
import {
  createInitialPortfolioData,
} from "../components/portfolio/portfolioData";
import {
  PORTFOLIO_THEMES,
} from "../components/portfolio/portfolioThemes";
import { Copy, Check } from "lucide-react";

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Floating Share Link Pill */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/80">
        <button
          type="button"
          onClick={handleCopyLink}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1.5 cursor-pointer transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Link Copied!" : "Copy Share Link"}</span>
        </button>
      </div>

      {/* Fullscreen Portfolio Preview (Strict Read-Only Mode) */}
      <PortfolioPreview
        portfolioData={portfolioData}
        theme={theme}
        moduleVisibility={moduleVisibility}
        isStandalone={true}
      />
    </div>
  );
};

export default PortfolioLivePage;
