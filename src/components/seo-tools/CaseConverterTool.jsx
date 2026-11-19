import React, { useState } from "react";
import {
  Copy,
  Check,
  Trash2,
  Download,
  FileText,
  CheckCircle2,
  Zap,
  ArrowDownAZ,
  Mail,
  Link2,
  AlignLeft,
  Layers,
  Hash,
  LayoutGrid,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const CaseConverterTool = () => {
  const { showToast } = useToast();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeAction, setActiveAction] = useState("remove-duplicates");
  const [copied, setCopied] = useState(false);

  // Stats calculation
  const inputChars = inputText.length;
  const inputWords = inputText.trim() ? inputText.trim().split(/\s+/).filter(Boolean).length : 0;
  const outputChars = outputText.length;
  const outputWords = outputText.trim() ? outputText.trim().split(/\s+/).filter(Boolean).length : 0;

  // 1. Remove Duplicates
  const handleRemoveDuplicates = () => {
    setActiveAction("remove-duplicates");
    if (!inputText) return;
    const lines = inputText.split("\n");
    if (lines.length > 1) {
      const unique = Array.from(new Set(lines.map((l) => l.trim()))).filter(Boolean);
      setOutputText(unique.join("\n"));
      showToast?.(`Removed duplicates (${unique.length} lines)`, "success");
    } else {
      const words = inputText.split(/\s+/);
      const unique = Array.from(new Set(words)).filter(Boolean);
      setOutputText(unique.join(" "));
      showToast?.(`Removed duplicates (${unique.length} words)`, "success");
    }
  };

  // 2. Remove Blank Lines
  const handleRemoveBlankLines = () => {
    setActiveAction("remove-blank-lines");
    if (!inputText) return;
    const cleaned = inputText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .join("\n");
    setOutputText(cleaned);
    showToast?.("Removed blank lines", "success");
  };

  // 3. Sort Alphabetically
  const handleSortAlphabetically = () => {
    setActiveAction("sort-alphabetically");
    if (!inputText) return;
    const lines = inputText.split("\n");
    if (lines.length > 1) {
      const sorted = [...lines].sort((a, b) => a.localeCompare(b));
      setOutputText(sorted.join("\n"));
    } else {
      const words = inputText.split(/\s+/).filter(Boolean);
      const sorted = [...words].sort((a, b) => a.localeCompare(b));
      setOutputText(sorted.join(" "));
    }
    showToast?.("Sorted alphabetically", "success");
  };

  // 4. Make Alphanumeric
  const handleMakeAlphanumeric = () => {
    setActiveAction("make-alphanumeric");
    if (!inputText) return;
    setOutputText(inputText.replace(/[^a-zA-Z0-9\s]/g, ""));
    showToast?.("Made alphanumeric", "success");
  };

  // 5. Uppercase
  const handleMakeUppercase = () => {
    setActiveAction("uppercase");
    if (!inputText) return;
    setOutputText(inputText.toUpperCase());
  };

  // 6. Lowercase
  const handleMakeLowercase = () => {
    setActiveAction("lowercase");
    if (!inputText) return;
    setOutputText(inputText.toLowerCase());
  };

  // 7. Title Case
  const handleMakeTitleCase = () => {
    setActiveAction("title-case");
    if (!inputText) return;
    setOutputText(
      inputText
        .toLowerCase()
        .replace(/(?:^|\s|-|\/)\S/g, (match) => match.toUpperCase())
    );
  };

  // 8. Extract Emails
  const handleExtractEmails = () => {
    setActiveAction("extract-emails");
    if (!inputText) return;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = inputText.match(emailRegex);
    if (matches && matches.length > 0) {
      const unique = Array.from(new Set(matches));
      setOutputText(unique.join("\n"));
      showToast?.(`Extracted ${unique.length} email(s)`, "success");
    } else {
      setOutputText("");
      showToast?.("No valid emails found", "info");
    }
  };

  // 9. Extract URLs
  const handleExtractUrls = () => {
    setActiveAction("extract-urls");
    if (!inputText) return;
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s]*)/gi;
    const matches = inputText.match(urlRegex);
    if (matches && matches.length > 0) {
      const unique = Array.from(new Set(matches));
      setOutputText(unique.join("\n"));
      showToast?.(`Extracted ${unique.length} URL(s)`, "success");
    } else {
      setOutputText("");
      showToast?.("No valid URLs found", "info");
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      showToast?.("Copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast?.("Failed to copy", "error");
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    showToast?.("Cleared input text", "info");
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast?.("Downloaded text file", "success");
  };

  const actions = [
    {
      id: "remove-duplicates",
      label: "Remove Duplicates",
      icon: Layers,
      handler: handleRemoveDuplicates,
    },
    {
      id: "remove-blank-lines",
      label: "Remove Blank Lines",
      icon: AlignLeft,
      handler: handleRemoveBlankLines,
    },
    {
      id: "sort-alphabetically",
      label: "Sort Alphabetically",
      icon: ArrowDownAZ,
      handler: handleSortAlphabetically,
    },
    {
      id: "make-alphanumeric",
      label: "Make Alphanumeric",
      icon: Hash,
      customIcon: (
        <span className="font-extrabold text-xs tracking-tighter leading-none">
          12<br />33
        </span>
      ),
      handler: handleMakeAlphanumeric,
    },
    {
      id: "uppercase",
      label: "Uppercase",
      customIcon: <span className="font-bold text-sm leading-none">Aa</span>,
      handler: handleMakeUppercase,
    },
    {
      id: "lowercase",
      label: "Lowercase",
      customIcon: <span className="font-medium text-xs lowercase leading-none">aa</span>,
      handler: handleMakeLowercase,
    },
    {
      id: "title-case",
      label: "Title Case",
      customIcon: <span className="font-semibold text-sm leading-none">Tt</span>,
      handler: handleMakeTitleCase,
    },
    {
      id: "extract-emails",
      label: "Extract Emails",
      icon: Mail,
      handler: handleExtractEmails,
    },
    {
      id: "extract-urls",
      label: "Extract URLs",
      icon: Link2,
      handler: handleExtractUrls,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0b1329] p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
      {/* 1. Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
        <div className="flex items-center gap-3">
          {/* Logo badge in OUR BLUE (#003873) */}
          <div className="w-11 h-11 rounded-2xl bg-[#003873] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            Aa
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Case Converter Tool
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Type or paste text on the left, click any conversion action, and view output on the right.
            </p>
          </div>
        </div>

        {/* Live Conversion Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50 text-xs font-semibold shadow-2xs">
          <Zap size={13} className="fill-emerald-500 text-emerald-500" />
          <span>Live Conversion</span>
        </div>
      </div>

      {/* 2. Conversion Actions Section */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
          <LayoutGrid size={15} className="text-[#003873] dark:text-sky-400" />
          <span>Conversion Actions</span>
        </div>

        {/* 3x3 Grid matching user mockup, with orange replaced by OUR BLUE (#003873) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {actions.map((act) => {
            const Icon = act.icon;
            const isActive = activeAction === act.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={act.handler}
                className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-[0.98] ${
                  isActive
                    ? "bg-[#003873] hover:bg-[#002d5c] text-white shadow-md border border-[#003873]"
                    : "bg-blue-50/70 dark:bg-slate-800/60 hover:bg-blue-100/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-blue-100/80 dark:border-slate-700/80"
                }`}
              >
                {act.customIcon ? (
                  <span className={isActive ? "text-white" : "text-[#003873] dark:text-sky-400"}>
                    {act.customIcon}
                  </span>
                ) : (
                  Icon && (
                    <Icon
                      size={16}
                      className={isActive ? "text-white" : "text-[#003873] dark:text-sky-400"}
                    />
                  )
                )}
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Input & Output Textareas (Split side by side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        {/* Left: Input Text Card */}
        <div className="bg-slate-50/50 dark:bg-[#080d1a] p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2">
          {/* Box Header */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/50 text-[#003873] dark:text-sky-400 flex items-center justify-center">
                <FileText size={13} />
              </div>
              <span>Input Text</span>
            </div>

            <button
              type="button"
              onClick={handleClear}
              disabled={!inputText}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            rows={7}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#003873]/20 focus:border-[#003873] transition-all placeholder:text-slate-400 leading-relaxed resize-y"
          />

          {/* Box Footer Stats */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-0.5">
            {inputChars} characters • {inputWords} words
          </div>
        </div>

        {/* Right: Converted Output Card */}
        <div className="bg-slate-50/50 dark:bg-[#080d1a] p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2">
          {/* Box Header */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 size={13} />
              </div>
              <span>Converted Output</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!outputText}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#0b1329] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-2xs disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Output</span>
                </>
              )}
            </button>
          </div>

          {/* Textarea */}
          <textarea
            rows={7}
            value={outputText}
            readOnly
            placeholder="Your converted text appears here..."
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 text-sm focus:outline-none placeholder:text-slate-400 leading-relaxed font-mono resize-y"
          />

          {/* Box Footer Stats */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-0.5">
            {outputChars} characters • {outputWords} words
          </div>
        </div>
      </div>

      {/* 4. Bottom Row Action: Download TXT button in OUR BLUE */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={handleDownload}
          disabled={!outputText}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-[#003873] hover:text-white text-[#003873] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/60 text-xs sm:text-sm font-bold shadow-2xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Download size={15} />
          <span>Download TXT</span>
        </button>
      </div>
    </div>
  );
};

export default CaseConverterTool;
