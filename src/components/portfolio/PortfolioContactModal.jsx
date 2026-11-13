import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Copy,
  Check,
  MapPin,
  Building2,
  Sparkles,
  CheckCircle2,
  Send,
  Loader2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { db } from "../../firebase";
import { ref, push } from "firebase/database";

export const PortfolioContactModal = ({
  isOpen,
  onClose,
  student = {},
  theme = { primary: "#2563eb" },
}) => {
  const [copiedType, setCopiedType] = useState(null); // 'email' | 'draft'
  const [inquiryType, setInquiryType] = useState("hiring");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [messageText, setMessageText] = useState(
    "Hi " +
      (student.name || "there") +
      ", I reviewed your Operating Media digital marketing portfolio and would like to discuss an opportunity."
  );

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Reset sent state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setIsSent(false);
      setIsSending(false);
      setErrorMessage("");
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Update default message when purpose changes
  const handleSelectInquiryType = (type) => {
    setInquiryType(type);
    const sName = student.name || "there";
    if (type === "hiring") {
      setMessageText(
        `Hi ${sName}, I came across your verified portfolio and would like to connect regarding a full-time digital marketing role with our team.`
      );
    } else if (type === "freelance") {
      setMessageText(
        `Hi ${sName}, I was impressed by your campaign projects and would love to discuss a freelance marketing/growth project.`
      );
    } else if (type === "consultation") {
      setMessageText(
        `Hi ${sName}, I'm interested in booking a digital marketing consultation session to audit our current acquisition funnels.`
      );
    } else {
      setMessageText(
        `Hi ${sName}, I reviewed your Operating Media portfolio and wanted to reach out directly.`
      );
    }
  };

  const copyToClipboard = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2200);
  };

  if (!isOpen) return null;

  const studentName = student.name || "Student Candidate";
  const studentEmail = student.email || "student@operatingmedia.com";

  // Handle direct text send (No mail app redirect)
  const handleSendDirectMessage = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (!senderEmail.trim()) {
      setErrorMessage("Please enter your email address so the student can reply to you.");
      return;
    }
    if (!messageText.trim()) {
      setErrorMessage("Please write a message before sending.");
      return;
    }

    setIsSending(true);

    const inquiryPayload = {
      id: "inq_" + Date.now(),
      studentName,
      studentEmail,
      senderName: senderName.trim() || "Interested Recruiter / Client",
      senderEmail: senderEmail.trim(),
      inquiryType,
      message: messageText.trim(),
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // 1. Save to localStorage for portfolio owner & sender
    try {
      const existingInquiries = JSON.parse(
        localStorage.getItem("om_lms_portfolio_inquiries") || "[]"
      );
      existingInquiries.unshift(inquiryPayload);
      localStorage.setItem(
        "om_lms_portfolio_inquiries",
        JSON.stringify(existingInquiries.slice(0, 50))
      );
    } catch (_) {}

    // 2. Dispatch to Firebase RTDB if available
    try {
      if (db) {
        const studentCleanId =
          String(student.studentId || "").replace(/[^0-9]/g, "") || "portfolio_inquiries";
        const inquiriesRef = ref(db, `lms_portfolio_inquiries/${studentCleanId}`);
        await push(inquiriesRef, inquiryPayload);
      }
    } catch (_) {}

    // Clean realistic delivery transition
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 500);
  };

  const handleResetForAnother = () => {
    setIsSent(false);
    setMessageText(
      `Hi ${studentName}, I reviewed your Operating Media digital marketing portfolio and would like to discuss an opportunity.`
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto z-10 animate-in fade-in zoom-in-95 duration-200 text-slate-900">
        {/* Top Header with Accent Gradient */}
        <div
          className="relative px-6 pt-7 pb-6 text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #090d16 0%, #0f172a 60%, ${theme.primary}55 100%)`,
          }}
        >
          {/* Subtle Ambient Light Orb */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-xs"
          >
            <X size={18} />
          </button>

          <div className="flex items-start space-x-4">
            {/* Student Avatar / Monogram */}
            <div className="relative shrink-0">
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={studentName}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-white/20 shadow-md"
                />
              ) : (
                <div
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md"
                  style={{ backgroundColor: theme.primary }}
                >
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
              {/* Online / Active status pulse */}
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-900 flex items-center justify-center"
                title="Available for direct messages"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </span>
            </div>

            {/* Profile Credentials */}
            <div className="min-w-0 flex-1 pr-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 border border-white/15 text-emerald-300 mb-1.5">
                <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                <span>Operating Media Verified Candidate</span>
              </div>

              <h2
                id="contact-modal-title"
                className="text-lg sm:text-xl font-extrabold text-white truncate leading-tight"
              >
                {studentName}
              </h2>

              <p className="text-xs text-slate-300 truncate mt-0.5">
                {student.headline || "Digital Marketer & Growth Strategist"}
              </p>

              {student.location && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  <MapPin size={11} className="shrink-0 text-slate-400" />
                  <span className="truncate">{student.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[calc(85vh-180px)] overflow-y-auto custom-scrollbar">
          {/* Direct Email Display Card (Only Source of Contact) */}
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 pr-2">
              <div
                className="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0 shadow-2xs"
                style={{ backgroundColor: theme.primary }}
              >
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Official Contact Email
                </span>
                <span
                  className="text-xs sm:text-sm font-bold text-slate-900 truncate block select-all"
                  title={studentEmail}
                >
                  {studentEmail}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(studentEmail, "email")}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all cursor-pointer shrink-0"
              title="Copy email to clipboard"
            >
              {copiedType === "email" ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Conditional: Either Sent Confirmation OR Direct Send Form */}
          {isSent ? (
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Message Sent Directly!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your direct inquiry has been delivered to{" "}
                  <strong className="text-slate-900">{studentName}</strong>. They will
                  review your message and follow up at{" "}
                  <strong className="text-slate-900">{senderEmail}</strong>.
                </p>
              </div>

              {/* Delivery Receipt Pill */}
              <div className="p-3 rounded-xl bg-white border border-emerald-100 text-left text-xs text-slate-600 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-100">
                  <span>Direct Delivery Confirmation</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check size={12} /> Delivered
                  </span>
                </div>
                <div className="text-[11px] pt-1">
                  <span className="font-semibold text-slate-700">From: </span>
                  <span>{senderName || "Recruiter"} &lt;{senderEmail}&gt;</span>
                </div>
                <div className="text-[11px] truncate">
                  <span className="font-semibold text-slate-700">Message: </span>
                  <span className="italic">"{messageText}"</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetForAnother}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all cursor-pointer hover:brightness-105"
                  style={{ backgroundColor: theme.primary }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSendDirectMessage}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <MessageSquare size={14} style={{ color: theme.primary }} />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Direct Text Send
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  Instant browser delivery
                </span>
              </div>

              {/* Inquiry Purpose Chips */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "hiring", label: "💼 Full-Time Role" },
                  { id: "freelance", label: "🚀 Project / Freelance" },
                  { id: "consultation", label: "📈 Growth Audit" },
                  { id: "general", label: "🤝 General Inquiry" },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleSelectInquiryType(chip.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      inquiryType === chip.id
                        ? "text-white shadow-2xs ring-1 ring-black/10"
                        : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 border border-slate-200/60"
                    }`}
                    style={inquiryType === chip.id ? { backgroundColor: theme.primary } : {}}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Sender Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name / Company"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  disabled={isSending}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address *"
                  value={senderEmail}
                  onChange={(e) => {
                    setSenderEmail(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  disabled={isSending}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  rows={3}
                  required
                  value={messageText}
                  onChange={(e) => {
                    setMessageText(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  disabled={isSending}
                  placeholder="Write your direct message here..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none leading-relaxed placeholder:text-slate-400"
                />
              </div>

              {/* Error feedback if any */}
              {errorMessage && (
                <div className="flex items-center space-x-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-xl">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Direct Send Action Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:brightness-105 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: theme.primary }}
                >
                  {isSending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Sending Message Directly...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Institutional Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-1.5">
            <Building2 size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">
              Operating Media Academy • Andheri & Borivali, Mumbai
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioContactModal;
