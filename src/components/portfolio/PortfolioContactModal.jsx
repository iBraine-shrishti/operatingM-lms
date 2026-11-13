import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Phone,
  MessageCircle,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  Send,
  Building2,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Share2,
} from "lucide-react";
import { renderSocialIcon } from "./preview/previewShared";

export const PortfolioContactModal = ({
  isOpen,
  onClose,
  student = {},
  theme = { primary: "#2563eb" },
}) => {
  const [copiedType, setCopiedType] = useState(null); // 'email' | 'phone' | 'draft'
  const [inquiryType, setInquiryType] = useState("hiring");
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [messageText, setMessageText] = useState(
    "Hi " +
      (student.name || "there") +
      ", I reviewed your Operating Media digital marketing portfolio and would like to discuss an opportunity."
  );

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
  const studentPhone = student.phone || "+91 98201 54321";
  const rawPhoneDigits = (student.phone || "").replace(/[^0-9]/g, "");
  const waDigits = rawPhoneDigits.length === 10 ? `91${rawPhoneDigits}` : rawPhoneDigits;

  // Build subject and body for email & whatsapp
  const emailSubject = encodeURIComponent(
    `Portfolio Inquiry for ${studentName} [${inquiryType.toUpperCase()}]`
  );
  const formattedBody = encodeURIComponent(
    `From: ${senderName || "Recruiter / Client"}\n` +
      `Contact Info: ${senderContact || "Not provided"}\n` +
      `Inquiry Type: ${inquiryType}\n\n` +
      `Message:\n${messageText}\n\n` +
      `Sent via ${studentName}'s Operating Media Verified Portfolio`
  );

  const emailHref = `mailto:${studentEmail}?subject=${emailSubject}&body=${formattedBody}`;
  const whatsappHref = waDigits
    ? `https://wa.me/${waDigits}?text=${formattedBody}`
    : `https://wa.me/?text=${formattedBody}`;

  const fullDraftText =
    `Candidate: ${studentName}\n` +
    `Email: ${studentEmail}\n` +
    `Phone: ${studentPhone}\n` +
    `From: ${senderName || "Interested Recruiter / Client"}\n` +
    `Contact: ${senderContact || "Not provided"}\n` +
    `Purpose: ${inquiryType}\n\n` +
    `Message:\n${messageText}`;

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
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto z-10 animate-in fade-in zoom-in-95 duration-200 text-slate-900">
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
                title="Available for inquiries"
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
        <div className="p-5 sm:p-6 space-y-5 max-h-[calc(85vh-180px)] overflow-y-auto custom-scrollbar">
          {/* Quick Contact Buttons Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Email Card */}
            <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-50 transition-colors flex items-center justify-between group">
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${studentEmail}`}
                    className="text-xs font-bold text-slate-900 hover:text-blue-600 truncate block transition-colors"
                    title={studentEmail}
                  >
                    {studentEmail}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(studentEmail, "email")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copiedType === "email" ? (
                  <Check size={14} className="text-emerald-600" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-50 transition-colors flex items-center justify-between group">
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={waDigits ? `https://wa.me/${waDigits}` : `tel:${studentPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-900 hover:text-emerald-600 truncate block transition-colors"
                    title={studentPhone}
                  >
                    {studentPhone}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(studentPhone, "phone")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer shrink-0"
                title="Copy phone to clipboard"
              >
                {copiedType === "phone" ? (
                  <Check size={14} className="text-emerald-600" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>

          {/* Interactive Inquiry Composer */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Sparkles size={14} style={{ color: theme.primary }} />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Direct Inquiry Composer
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                Instant pre-filled message
              </span>
            </div>

            {/* Inquiry Purpose Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "hiring", label: "💼 Full-Time Role" },
                { id: "freelance", label: "🚀 Project / Freelance" },
                { id: "consultation", label: "📈 Growth Audit" },
                { id: "general", label: "🤝 Connect" },
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
                placeholder="Your Name or Company"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                placeholder="Your Email or Phone"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                rows={3}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write a message..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none leading-relaxed placeholder:text-slate-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Email Send Button */}
              <a
                href={emailHref}
                className="flex-1 min-w-[130px] inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:brightness-105 active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: theme.primary }}
              >
                <Mail size={13} />
                <span>Open in Email</span>
              </a>

              {/* WhatsApp Send Button (if digits exist) */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer"
                title="Send inquiry directly via WhatsApp"
              >
                <MessageCircle size={14} className="text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Copy Draft Button */}
              <button
                type="button"
                onClick={() => copyToClipboard(fullDraftText, "draft")}
                className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                title="Copy pre-filled message text"
              >
                {copiedType === "draft" ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Verified Social & Professional Profiles */}
          {Array.isArray(student.socials) && student.socials.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Verified Social & Professional Handles
              </span>
              <div className="flex flex-wrap gap-1.5">
                {student.socials.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all group cursor-pointer"
                    title={soc.url}
                  >
                    {renderSocialIcon(soc.platform)}
                    <span>{soc.label || soc.platform}</span>
                    <ExternalLink
                      size={10}
                      className="text-slate-400 group-hover:text-slate-600"
                    />
                  </a>
                ))}
              </div>
            </div>
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
