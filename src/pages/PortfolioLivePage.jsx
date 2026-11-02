import React, { useState, useEffect } from "react";
import { PortfolioPreview } from "../components/portfolio/PortfolioPreview";
import {
  createInitialPortfolioData,
} from "../components/portfolio/portfolioData";
import {
  PORTFOLIO_THEMES,
} from "../components/portfolio/portfolioThemes";
import { Copy, Check, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export const PortfolioLivePage = () => {
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem("om_lms_portfolio_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createInitialPortfolioData();
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
      {/* Floating Top Control Bar */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/80">
        <Link
          to="/portfolio-builder"
          className="text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1.5 transition-colors pr-3 border-r border-slate-700"
        >
          <ArrowLeft size={13} />
          <span>Edit Portfolio</span>
        </Link>

        <button
          type="button"
          onClick={handleCopyLink}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1.5 cursor-pointer transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Link Copied!" : "Copy Share Link"}</span>
        </button>
      </div>

      {/* Fullscreen Portfolio Preview */}
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
