import React, { useState, useMemo } from "react";
import {
  Search,
  Monitor,
  Smartphone,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Info,
  ExternalLink,
  Sliders,
  Globe,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const MetaLengthCheckerTool = () => {
  const { showToast } = useToast();

  const [url, setUrl] = useState("https://operatingmedia.com/courses/digital-marketing");
  const [keyword, setKeyword] = useState("Digital Marketing Course");
  const [title, setTitle] = useState(
    "Best Digital Marketing Course in Mumbai with 100% Placement - Operating Media"
  );
  const [description, setDescription] = useState(
    "Join the #1 Digital Marketing Course in Mumbai. Master SEO, Social Media, Google Ads, and AI tools with live project internships and industry-recognized certifications."
  );
  const [previewDevice, setPreviewDevice] = useState("desktop"); // desktop | mobile
  const [copiedType, setCopiedType] = useState(null);

  // Character & approximate pixel calculations
  // Average letter in Arial/Roboto is ~9.5px in 20px title, ~7.5px in 14px snippet
  const titlePixelWidth = useMemo(() => {
    let px = 0;
    for (const ch of title) {
      if (/[A-Z]/.test(ch)) px += 11.5;
      else if (/[wmi]/i.test(ch)) px += ch === "w" || ch === "m" ? 14 : 5;
      else if (ch === " ") px += 4.5;
      else px += 8.8;
    }
    return Math.round(px);
  }, [title]);

  const descPixelWidth = useMemo(() => {
    let px = 0;
    for (const ch of description) {
      if (/[A-Z]/.test(ch)) px += 9;
      else if (ch === " ") px += 3.5;
      else px += 6.8;
    }
    return Math.round(px);
  }, [description]);

  // Limits
  // Desktop Title: ~60 chars or ~580px
  // Desktop Desc: ~160 chars or ~960px
  // Mobile Title: ~70 chars or ~600px
  // Mobile Desc: ~120 chars or ~750px
  const titleCharLimit = previewDevice === "desktop" ? 60 : 65;
  const titlePixelLimit = previewDevice === "desktop" ? 580 : 600;

  const descCharLimit = previewDevice === "desktop" ? 160 : 130;
  const descPixelLimit = previewDevice === "desktop" ? 960 : 780;

  const titleLength = title.length;
  const descLength = description.length;

  // Title Status
  const titleStatus = useMemo(() => {
    if (titleLength === 0) return { label: "Empty", color: "text-slate-400", bg: "bg-slate-100", state: "empty" };
    if (titleLength < 40) return { label: "Too Short", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/40", state: "short" };
    if (titleLength <= 60 && titlePixelWidth <= titlePixelLimit) return { label: "Optimal", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40", state: "optimal" };
    return { label: "Truncated", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/40", state: "long" };
  }, [titleLength, titlePixelWidth, titlePixelLimit]);

  // Description Status
  const descStatus = useMemo(() => {
    if (descLength === 0) return { label: "Empty", color: "text-slate-400", bg: "bg-slate-100", state: "empty" };
    if (descLength < 120) return { label: "Too Short", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/40", state: "short" };
    if (descLength <= 160 && descPixelWidth <= descPixelLimit) return { label: "Optimal", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40", state: "optimal" };
    return { label: "Truncated", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/40", state: "long" };
  }, [descLength, descPixelWidth, descPixelLimit]);

  // SEO Quality Checks
  const checks = useMemo(() => {
    const kwLower = keyword.trim().toLowerCase();
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    const urlLower = url.toLowerCase();

    const hasKwInTitle = kwLower ? titleLower.includes(kwLower) : false;
    const hasKwAtStartOfTitle = kwLower ? titleLower.startsWith(kwLower) : false;
    const hasKwInDesc = kwLower ? descLower.includes(kwLower) : false;
    const hasKwInUrl = kwLower ? urlLower.includes(kwLower.replace(/\s+/g, "-")) : false;
    const titleLenOk = titleLength >= 45 && titleLength <= 60;
    const descLenOk = descLength >= 120 && descLength <= 160;

    let score = 20; // baseline
    if (titleLenOk) score += 20;
    if (descLenOk) score += 20;
    if (hasKwInTitle) score += 20;
    if (hasKwInDesc) score += 10;
    if (hasKwInUrl) score += 10;

    return {
      hasKwInTitle,
      hasKwAtStartOfTitle,
      hasKwInDesc,
      hasKwInUrl,
      titleLenOk,
      descLenOk,
      score: Math.min(score, 100),
    };
  }, [keyword, title, description, url, titleLength, descLength]);

  // Breadcrumb derivation from URL
  const breadcrumb = useMemo(() => {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      const parts = u.pathname.split("/").filter(Boolean);
      return `${u.origin} ${parts.length > 0 ? "› " + parts.join(" › ") : ""}`;
    } catch {
      return url;
    }
  }, [url]);

  // Snippet highlight helper: bolds keyword in search description
  const renderHighlightedSnippet = (rawText, searchKw) => {
    if (!searchKw || !searchKw.trim()) return rawText;
    const regex = new RegExp(`(${searchKw.trim()})`, "gi");
    const parts = rawText.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === searchKw.trim().toLowerCase() ? (
        <span key={i} className="font-bold text-slate-900 dark:text-white">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleCopy = (content, type) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    showToast?.(`Copied ${type} to clipboard!`, "success");
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleReset = () => {
    setTitle("Best Digital Marketing Course in Mumbai with 100% Placement - Operating Media");
    setDescription(
      "Join the #1 Digital Marketing Course in Mumbai. Master SEO, Social Media, Google Ads, and AI tools with live project internships and industry-recognized certifications."
    );
    setKeyword("Digital Marketing Course");
    setUrl("https://operatingmedia.com/courses/digital-marketing");
    showToast?.("Reset to sample data", "info");
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP SEO SCORE OVERVIEW */}
      <div className="bg-white dark:bg-[#0b1329] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-[#003873] dark:text-sky-400 flex items-center justify-center font-black text-lg shadow-2xs">
            {checks.score}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                SERP Optimization Score: {checks.score}%
              </span>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  checks.score >= 80
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : checks.score >= 50
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                }`}
              >
                {checks.score >= 80 ? "Excellent" : checks.score >= 50 ? "Needs Polish" : "Poor"}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live Google Search result preview with dynamic pixel & character length limits
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 transition-all"
        >
          <RotateCcw size={12} />
          <span>Reset Sample</span>
        </button>
      </div>

      {/* 2. MAIN 2-COLUMN GRID: INPUT FORM (LEFT) + GOOGLE SERP PREVIEW (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-[#0b1329] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders size={14} className="text-[#003873] dark:text-sky-400" />
              <span>Meta Tags Configuration</span>
            </h3>

            {/* Target URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Page URL
              </label>
              <div className="relative">
                <Globe size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://operatingmedia.com/..."
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Focus Keyword */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Focus SEO Keyword
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. Digital Marketing Course"
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Meta Title Input + Real-time Length Meter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Meta Title
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${titleStatus.bg} ${titleStatus.color}`}>
                    {titleStatus.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    {titleLength} / {titleCharLimit} chars (~{titlePixelWidth}px)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full transition-all duration-300 ${
                    titleStatus.state === "optimal"
                      ? "bg-emerald-500"
                      : titleStatus.state === "short"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.min((titleLength / titleCharLimit) * 100, 100)}%` }}
                />
              </div>

              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={2}
                placeholder="Page Title — aim for 50 to 60 characters..."
                className="w-full p-3 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            {/* Meta Description Input + Real-time Length Meter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${descStatus.bg} ${descStatus.color}`}>
                    {descStatus.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    {descLength} / {descCharLimit} chars (~{descPixelWidth}px)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full transition-all duration-300 ${
                    descStatus.state === "optimal"
                      ? "bg-emerald-500"
                      : descStatus.state === "short"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.min((descLength / descCharLimit) * 100, 100)}%` }}
                />
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Meta Description — aim for 140 to 160 characters..."
                className="w-full p-3 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Quick Checklist */}
          <div className="bg-white dark:bg-[#0b1329] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
              SEO Best Practice Checklist
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                {checks.titleLenOk ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={14} className="text-amber-500" />
                )}
                <span className={checks.titleLenOk ? "text-slate-700 dark:text-slate-300" : "text-amber-600"}>
                  Title is within 45–60 characters ({titleLength} chars)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {checks.descLenOk ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={14} className="text-amber-500" />
                )}
                <span className={checks.descLenOk ? "text-slate-700 dark:text-slate-300" : "text-amber-600"}>
                  Description is within 120–160 characters ({descLength} chars)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {checks.hasKwInTitle ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={14} className="text-rose-500" />
                )}
                <span className={checks.hasKwInTitle ? "text-slate-700 dark:text-slate-300" : "text-rose-500"}>
                  Focus keyword found in Meta Title
                </span>
              </div>

              <div className="flex items-center gap-2">
                {checks.hasKwInDesc ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={14} className="text-rose-500" />
                )}
                <span className={checks.hasKwInDesc ? "text-slate-700 dark:text-slate-300" : "text-rose-500"}>
                  Focus keyword found in Meta Description
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Google Search SERP Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-[#0b1329] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            {/* SERP Header + Device Toggles */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Search size={16} className="text-blue-600" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Google SERP Live Preview
                </span>
              </div>

              {/* Toggle Desktop vs Mobile */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    previewDevice === "desktop"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Monitor size={12} />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    previewDevice === "mobile"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Smartphone size={12} />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Google Search Card Preview Box */}
            <div
              className={`p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#1a2333] transition-all font-sans ${
                previewDevice === "mobile" ? "max-w-sm mx-auto shadow-md" : "w-full"
              }`}
            >
              {/* Google Brand / Favicon Header */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-[#003873] dark:text-sky-400 shrink-0 border border-slate-200/60 dark:border-slate-700">
                  OM
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-slate-900 dark:text-slate-100 leading-none truncate">
                    Operating Media
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none truncate mt-0.5">
                    {breadcrumb}
                  </p>
                </div>
              </div>

              {/* Blue Title Link */}
              <h4
                className="text-base sm:text-lg font-normal text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-2 mt-1"
                title={title}
              >
                {title || "Please enter a meta title..."}
              </h4>

              {/* Snippet Description */}
              <p
                className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed line-clamp-3"
                title={description}
              >
                {renderHighlightedSnippet(
                  description || "Please enter a meta description...",
                  keyword
                )}
              </p>
            </div>

            {/* Copy Tags Output Section */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Ready-to-Paste HTML Meta Tags
              </span>

              <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto space-y-1 relative group">
                <p>&lt;title&gt;{title}&lt;/title&gt;</p>
                <p>&lt;meta name="description" content="{description}" /&gt;</p>
                <p>&lt;link rel="canonical" href="{url}" /&gt;</p>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `<title>${title}</title>\n<meta name="description" content="${description}" />\n<link rel="canonical" href="${url}" />`,
                      "HTML Tags"
                    )
                  }
                  className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold inline-flex items-center gap-1"
                >
                  {copiedType === "HTML Tags" ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedType === "HTML Tags" ? "Copied" : "Copy HTML"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MetaLengthCheckerTool;
