import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Globe,
  SlidersHorizontal,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const MetaLengthCheckerTool = () => {
  const { showToast } = useToast();
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const titleLength = metaTitle.length;
  const descriptionLength = metaDescription.length;

  // Title Status
  const getTitleStatus = () => {
    if (titleLength === 0) return { text: "Empty", color: "text-slate-400 bg-slate-100 dark:bg-slate-800", type: "idle" };
    if (titleLength < 50) return { text: "Too Short (<50)", color: "text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800", type: "warning" };
    if (titleLength <= 60) return { text: "Optimal (50–60)", color: "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800", type: "optimal" };
    return { text: `Truncated (>60, +${titleLength - 60})`, color: "text-rose-700 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800", type: "danger" };
  };

  // Description Status
  const getDescriptionStatus = () => {
    if (descriptionLength === 0) return { text: "Empty", color: "text-slate-400 bg-slate-100 dark:bg-slate-800", type: "idle" };
    if (descriptionLength < 140) return { text: "Too Short (<140)", color: "text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800", type: "warning" };
    if (descriptionLength <= 160) return { text: "Optimal (140–160)", color: "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800", type: "optimal" };
    return { text: `Truncated (>160, +${descriptionLength - 160})`, color: "text-rose-700 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800", type: "danger" };
  };

  const titleStatus = getTitleStatus();
  const descStatus = getDescriptionStatus();

  const handleReset = () => {
    setMetaTitle("");
    setMetaDescription("");
    showToast?.("Cleared fields", "info");
  };

  const handleCopyTags = () => {
    if (!metaTitle && !metaDescription) return;
    const tags = `<title>${metaTitle}</title>\n<meta name="description" content="${metaDescription}" />`;
    navigator.clipboard.writeText(tags);
    setCopied(true);
    showToast?.("Copied HTML meta tags!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  // Truncated preview helper for SERP
  const displayTitle = metaTitle || "Example Page Title | Operating Media Digital Marketing";
  const displayDesc =
    metaDescription ||
    "Learn industry-leading digital marketing strategies, SEO techniques, Google Ads, and analytics with practical hands-on exercises at Operating Media.";

  return (
    <div className="w-full bg-white dark:bg-[#0b1329] p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
      {/* 1. Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
        <div className="flex items-center gap-3">
          {/* Logo badge in OUR BLUE (#003873) */}
          <div className="w-11 h-11 rounded-2xl bg-[#003873] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <Search size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Meta Title & Description Length Checker
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verify your meta title and description character lengths in real-time against Google search display limits.
            </p>
          </div>
        </div>

        {/* Live SERP Checker Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50 text-xs font-semibold shadow-2xs">
          <Zap size={13} className="fill-emerald-500 text-emerald-500" />
          <span>Live SERP Validation</span>
        </div>
      </div>

      {/* 2. Responsive 2-Column Split Screen (Input Left, Google SERP Preview Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
        {/* Left Column: Input Form */}
        <div className="bg-slate-50/50 dark:bg-[#080d1a] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                <SlidersHorizontal size={14} className="text-[#003873] dark:text-sky-400" />
                <span>Meta Tag Inputs</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                disabled={!metaTitle && !metaDescription}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Meta Title Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 dark:text-slate-200">
                  Meta Title:
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${titleStatus.color}`}>
                    {titleStatus.text}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {titleLength} / 60
                  </span>
                </div>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Enter your meta title..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#003873]/20 focus:border-[#003873] transition-all placeholder:text-slate-400"
              />
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    titleLength > 60
                      ? "bg-rose-500"
                      : titleLength >= 50
                      ? "bg-emerald-500"
                      : titleLength > 0
                      ? "bg-amber-500"
                      : "bg-transparent"
                  }`}
                  style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
                />
              </div>
            </div>

            {/* Meta Description Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 dark:text-slate-200">
                  Meta Description:
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${descStatus.color}`}>
                    {descStatus.text}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {descriptionLength} / 160
                  </span>
                </div>
              </div>
              <textarea
                rows={4}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Enter your meta description..."
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#003873]/20 focus:border-[#003873] transition-all placeholder:text-slate-400 leading-relaxed resize-y"
              />
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    descriptionLength > 160
                      ? "bg-rose-500"
                      : descriptionLength >= 140
                      ? "bg-emerald-500"
                      : descriptionLength > 0
                      ? "bg-amber-500"
                      : "bg-transparent"
                  }`}
                  style={{ width: `${Math.min(100, (descriptionLength / 160) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleCopyTags}
              disabled={!metaTitle && !metaDescription}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#003873] hover:bg-[#002d5c] text-white text-xs sm:text-sm font-bold shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied HTML Tags!" : "Copy HTML Meta Tags"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Google SERP Snippet Preview */}
        <div className="bg-slate-50/50 dark:bg-[#080d1a] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                <Globe size={14} className="text-[#003873] dark:text-sky-400" />
                <span>Google Search Snippet Preview</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Desktop SERP
              </span>
            </div>

            {/* Simulated Google Search Result */}
            <div className="bg-white dark:bg-[#0b1329] p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1.5 font-sans">
              {/* Google Breadcrumb / URL */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  G
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] text-slate-800 dark:text-slate-200 font-medium">
                    operatingmedia.com
                  </span>
                  <span className="text-[11px] text-slate-400">
                    https://www.operatingmedia.com › seo-tools
                  </span>
                </div>
              </div>

              {/* Title link in Google Blue */}
              <h3 className="text-base sm:text-lg font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug pt-0.5 line-clamp-2">
                {titleLength > 60
                  ? `${displayTitle.substring(0, 58)}...`
                  : displayTitle}
              </h3>

              {/* Description in Google gray */}
              <p className="text-xs sm:text-sm text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed line-clamp-3">
                {descriptionLength > 160
                  ? `${displayDesc.substring(0, 157)}...`
                  : displayDesc}
              </p>
            </div>

            {/* Quick SEO Guidelines Card */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Title Limit</span>
                <p className="font-extrabold text-slate-800 dark:text-slate-200">50 – 60 Chars</p>
                <p className="text-[10px] text-slate-500">Under 600px width on Google desktop search</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Desc Limit</span>
                <p className="font-extrabold text-slate-800 dark:text-slate-200">140 – 160 Chars</p>
                <p className="text-[10px] text-slate-500">Optimal length for mobile & desktop SERP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaLengthCheckerTool;
