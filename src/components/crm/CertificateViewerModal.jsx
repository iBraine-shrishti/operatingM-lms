import React, { useRef, useState } from "react";
import {
  X,
  Printer,
  ShieldCheck,
  Award,
  ExternalLink,
  Copy,
  Check,
  QrCode,
} from "lucide-react";
import { OperatingMediaCertificate } from "../certificate/OperatingMediaCertificate";
import { useToast } from "../../context/ToastContext";

export const CertificateViewerModal = ({
  isOpen,
  onClose,
  certificate,
  studentName = "Hiteshpuri Goswami",
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const name =
    certificate?.name ||
    studentName ||
    "Hiteshpuri Goswami";

  const certId =
    certificate?.certificate_id ||
    certificate?.id ||
    "132929482";

  const course =
    certificate?.course ||
    "Diploma in Digital Marketing & Artificial Intelligence";

  const issueDate = certificate?.date || "February 10, 2025";
  const expiryDate = certificate?.expiryDate || "February 10, 2026";

  const verifyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify-certificate?id=${certId}&name=${encodeURIComponent(
          name
        )}&course=${encodeURIComponent(course)}`
      : `https://operatingmedia.com/verify-certificate?id=${certId}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      showToast("Credential verification link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        {/* Modal Top Bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#dc2626] via-[#ea580c] to-[#84cc16] text-white flex items-center justify-center shadow-xs">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                Official Operating Media Certificate
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Verified Credential #{certId} • Conferred to {name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="Copy public verification link"
            >
              {copied ? (
                <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy size={13} />
              )}
              <span className="hidden sm:inline">
                {copied ? "Link Copied" : "Copy Link"}
              </span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Printer size={13} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Certificate Canvas / Preview */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1 bg-slate-100/70 dark:bg-slate-950/60 flex items-center justify-center">
          <OperatingMediaCertificate
            studentName={name}
            courseTitle={course}
            certificateId={certId}
            issueDate={issueDate}
            expiryDate={expiryDate}
            verificationUrl={verifyUrl}
            showBorder={true}
          />
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-5 sm:px-6 py-3.5 bg-white dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
            <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span>
              Real-time QR Code verification active • Anyone can scan to verify
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#2563eb] dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
            >
              <span>View Public Verification Page</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewerModal;
