import React, { useState, useMemo } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Download,
  FileText,
  Type,
  Sparkles,
  AlignLeft,
  Hash,
  Clock,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const CaseConverterTool = () => {
  const { showToast } = useToast();
  const [text, setText] = useState(
    "Master Digital Marketing with Operating Media. Learn SEO, SEM, Social Media Marketing, and Analytics with hands-on live projects and industry certifications."
  );
  const [copied, setCopied] = useState(false);

  // Statistics calculation
  const stats = useMemo(() => {
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim()
      ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const readingTimeMin = Math.ceil(words / 200);

    return {
      charsWithSpaces,
      charsWithoutSpaces,
      words,
      sentences,
      lines,
      readingTimeMin,
    };
  }, [text]);

  // Conversion functions
  const handleUpper = () => setText((prev) => prev.toUpperCase());
  const handleLower = () => setText((prev) => prev.toLowerCase());

  const handleTitleCase = () => {
    setText((prev) =>
      prev.toLowerCase().replace(/(?:^|\s|-|\/)\S/g, (match) => match.toUpperCase())
    );
  };

  const handleSentenceCase = () => {
    setText((prev) => {
      const lower = prev.toLowerCase();
      return lower.replace(/(^\s*|\.\s*|\?\s*|!\s*)([a-z])/g, (_, prefix, char) => {
        return prefix + char.toUpperCase();
      });
    });
  };

  const handleCamelCase = () => {
    setText((prev) => {
      return prev
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase());
    });
  };

  const handlePascalCase = () => {
    setText((prev) => {
      return prev
        .toLowerCase()
        .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, chr) => chr.toUpperCase());
    });
  };

  const handleKebabCase = () => {
    setText((prev) => {
      return prev
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    });
  };

  const handleSnakeCase = () => {
    setText((prev) => {
      return prev
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9\s_]/g, "")
        .replace(/\s+/g, "_")
        .replace(/_+/g, "_");
    });
  };

  const handleConstantCase = () => {
    setText((prev) => {
      return prev
        .toUpperCase()
        .trim()
        .replace(/[^A-Z0-9\s_]/g, "")
        .replace(/\s+/g, "_")
        .replace(/_+/g, "_");
    });
  };

  const handleAlternatingCase = () => {
    setText((prev) => {
      let isUpper = false;
      return prev
        .split("")
        .map((char) => {
          if (/[a-zA-Z]/.test(char)) {
            isUpper = !isUpper;
            return isUpper ? char.toUpperCase() : char.toLowerCase();
          }
          return char;
        })
        .join("");
    });
  };

  const handleInverseCase = () => {
    setText((prev) =>
      prev
        .split("")
        .map((char) => {
          if (char === char.toUpperCase()) return char.toLowerCase();
          return char.toUpperCase();
        })
        .join("")
    );
  };

  const handleCleanSpaces = () => {
    setText((prev) => {
      return prev
        .split("\n")
        .map((line) => line.replace(/\s+/g, " ").trim())
        .filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""))
        .join("\n");
    });
    showToast?.("Cleaned extra spaces & blank lines", "success");
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast?.("Text copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast?.("Failed to copy text", "error");
    }
  };

  const handleClear = () => {
    setText("");
    showToast?.("Text cleared", "info");
  };

  const handleDownloadTxt = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted-text.txt";
    link.click();
    URL.revokeObjectURL(url);
    showToast?.("Downloaded as converted-text.txt", "success");
  };

  const conversionButtons = [
    { label: "UPPERCASE", fn: handleUpper, desc: "ALL CAPS" },
    { label: "lowercase", fn: handleLower, desc: "all lower" },
    { label: "Title Case", fn: handleTitleCase, desc: "Capitalize Words" },
    { label: "Sentence case", fn: handleSentenceCase, desc: "Standard Sentences" },
    { label: "kebab-case (Slug)", fn: handleKebabCase, desc: "url-friendly-slug" },
    { label: "camelCase", fn: handleCamelCase, desc: "codeFriendly" },
    { label: "PascalCase", fn: handlePascalCase, desc: "ComponentNaming" },
    { label: "snake_case", fn: handleSnakeCase, desc: "python_var_style" },
    { label: "CONSTANT_CASE", fn: handleConstantCase, desc: "ENV_VAR_STYLE" },
    { label: "aLtErNaTe cAsE", fn: handleAlternatingCase, desc: "tOgGlE sTyLe" },
    { label: "InVeRsE cAsE", fn: handleInverseCase, desc: "sWAP eACH cHAR" },
    { label: "Clean Spaces", fn: handleCleanSpaces, desc: "Remove Duplicates" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Tool Header Info & Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-[#0b1329] p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <Hash size={13} className="text-blue-500" />
            <span>Characters</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            {stats.charsWithSpaces}
          </p>
          <span className="text-[10px] text-slate-400">
            {stats.charsWithoutSpaces} w/o spaces
          </span>
        </div>

        <div className="bg-white dark:bg-[#0b1329] p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <AlignLeft size={13} className="text-emerald-500" />
            <span>Words</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            {stats.words}
          </p>
          <span className="text-[10px] text-slate-400">Total words</span>
        </div>

        <div className="bg-white dark:bg-[#0b1329] p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <Type size={13} className="text-violet-500" />
            <span>Sentences</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            {stats.sentences}
          </p>
          <span className="text-[10px] text-slate-400">Punctuation based</span>
        </div>

        <div className="bg-white dark:bg-[#0b1329] p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <FileText size={13} className="text-amber-500" />
            <span>Lines</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            {stats.lines}
          </p>
          <span className="text-[10px] text-slate-400">Paragraphs/rows</span>
        </div>

        <div className="bg-white dark:bg-[#0b1329] p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <Clock size={13} className="text-sky-500" />
            <span>Est. Reading Time</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            ~{stats.readingTimeMin} {stats.readingTimeMin === 1 ? "min" : "mins"}
          </p>
          <span className="text-[10px] text-slate-400">Avg 200 WPM</span>
        </div>
      </div>

      {/* 2. Main Editor Area */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Editor Toolbar */}
        <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#003873] dark:text-sky-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Interactive Case Converter & Text Formatter
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTxt}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Download size={12} />
              <span>Download .txt</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-white transition-all shadow-2xs ${
                copied
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-[#003873] hover:bg-[#002855]"
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? "Copied!" : "Copy Text"}</span>
            </button>
          </div>
        </div>

        {/* Textarea */}
        <div className="p-4 sm:p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to convert cases, clean up formatting, count characters, and prepare SEO copy..."
            rows={10}
            className="w-full p-4 rounded-xl text-sm sm:text-base font-normal text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-y leading-relaxed"
          />
        </div>

        {/* Action Transformation Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Click to Transform Text
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {conversionButtons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={btn.fn}
                disabled={!text}
                className="flex flex-col items-start p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 hover:border-blue-500 hover:shadow-xs disabled:opacity-50 disabled:cursor-not-allowed text-left transition-all group"
              >
                <span className="text-xs font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400">
                  {btn.label}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate w-full mt-0.5">
                  {btn.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CaseConverterTool;
