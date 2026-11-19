import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const CaseConverterTool = () => {
  const { showToast } = useToast();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  // 1. Remove Duplicates
  const handleRemoveDuplicates = () => {
    if (!inputText) return;
    const lines = inputText.split("\n");
    if (lines.length > 1) {
      const unique = Array.from(new Set(lines.map((l) => l.trim()))).filter(Boolean);
      setOutputText(unique.join("\n"));
      showToast?.(`Removed duplicates (${unique.length} lines)`, "success");
    } else {
      const words = inputText.split(/\s+/);
      const unique = Array.from(new Set(words));
      setOutputText(unique.join(" "));
      showToast?.(`Removed duplicates (${unique.length} words)`, "success");
    }
  };

  // 2. Remove Blank Lines
  const handleRemoveBlankLines = () => {
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
    if (!inputText) return;
    setOutputText(inputText.replace(/[^a-zA-Z0-9\s]/g, ""));
    showToast?.("Made alphanumeric", "success");
  };

  // 5. Make All Uppercase
  const handleMakeUppercase = () => {
    if (!inputText) return;
    setOutputText(inputText.toUpperCase());
  };

  // 6. Make All Lowercase
  const handleMakeLowercase = () => {
    if (!inputText) return;
    setOutputText(inputText.toLowerCase());
  };

  // 7. Make Title Case
  const handleMakeTitleCase = () => {
    if (!inputText) return;
    setOutputText(
      inputText
        .toLowerCase()
        .replace(/(?:^|\s|-|\/)\S/g, (match) => match.toUpperCase())
    );
  };

  // 8. Extract Valid Emails Only
  const handleExtractEmails = () => {
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

  // 9. Extract Valid URLs Only
  const handleExtractUrls = () => {
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

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#0b1329] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
      <h2 className="text-lg sm:text-xl font-serif font-bold text-center text-slate-800 dark:text-slate-100">
        Case Converter Tool
      </h2>

      {/* Input Box */}
      <div>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-[#f58220] transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Buttons Grid matching Screenshot exactly */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleRemoveDuplicates}
          className="w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Remove Duplicates
        </button>

        <button
          type="button"
          onClick={handleRemoveBlankLines}
          className="w-full py-2 px-2.5 rounded-lg bg-[#6d4c28] hover:bg-[#5a3e20] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Remove Blank Lines
        </button>

        <button
          type="button"
          onClick={handleSortAlphabetically}
          className="w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Sort Alphabetically
        </button>

        <button
          type="button"
          onClick={handleMakeAlphanumeric}
          className="w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Make Alphanumeric
        </button>

        <button
          type="button"
          onClick={handleMakeUppercase}
          className="w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Make All Uppercase
        </button>

        <button
          type="button"
          onClick={handleMakeLowercase}
          className="w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Make All Lowercase
        </button>

        <button
          type="button"
          onClick={handleMakeTitleCase}
          className="w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Make Title Case
        </button>

        <button
          type="button"
          onClick={handleExtractEmails}
          className="w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Extract Valid Emails Only
        </button>

        <button
          type="button"
          onClick={handleExtractUrls}
          className="col-span-2 w-full py-2 px-2.5 rounded-lg bg-[#f58220] hover:bg-[#e07113] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs"
        >
          Extract Valid URLs Only
        </button>
      </div>

      {/* Output Box */}
      <div className="relative">
        <textarea
          rows={3}
          value={outputText}
          readOnly
          placeholder="Your converted text will appear here..."
          className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none placeholder:text-slate-400 font-mono"
        />

        {outputText && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-2 right-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#003873] hover:bg-[#002855] text-white text-xs font-bold shadow-2xs transition-all"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default CaseConverterTool;
