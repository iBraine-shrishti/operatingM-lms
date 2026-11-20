import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  X,
  Printer,
  ShieldCheck,
  Award,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  FileDown,
  Loader2,
} from "lucide-react";
import { OperatingMediaCertificate } from "../certificate/OperatingMediaCertificate";
import { useToast } from "../../context/ToastContext";

export const CertificateViewerModal = ({
  isOpen,
  onClose,
  certificate,
  studentName = "Student",
  isDemo = false,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const certRef = useRef(null);

  if (!isOpen) return null;

  const demoActive = isDemo || certificate?.isDemo;

  // For now keep as "YOUR NAME" and "COURSE NAME" as requested
  const name = "YOUR NAME";

  // Sanitize certificate ID to avoid duplicate "OMC-OMC-"
  const rawCertId =
    certificate?.certificate_id ||
    certificate?.id ||
    "OMC-8480";

  const certId = String(rawCertId).startsWith("OMC-")
    ? String(rawCertId).replace(/^(OMC-)+/, "OMC-")
    : `OMC-${rawCertId}`;

  const course = "COURSE NAME";

  const issueDate =
    certificate?.date ||
    certificate?.issueDate ||
    certificate?.issue_date ||
    "4 Sept 2026";

  const expiryDate =
    certificate?.expiryDate ||
    certificate?.expiry_date ||
    "February 10, 2026";

  const verifyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify-certificate?id=${certId}&name=${encodeURIComponent(
          name
        )}&course=${encodeURIComponent(course)}`
      : `https://operatingmedia.com/verify-certificate?id=${certId}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    try {
      setIsGeneratingPdf(true);
      showToast("Generating crystal-clear PDF certificate...", "info");

      // High-res capture at 3x scale (300+ DPI equivalent) for zero blurring
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      // Create landscape A4 PDF (297mm x 210mm)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 297mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

      const cleanFileName = `Operating_Media_Certificate_${(name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
      pdf.save(cleanFileName);

      showToast("Certificate downloaded successfully in high definition!", "success");
    } catch (err) {
      console.error("PDF generation error:", err);
      showToast("Could not generate direct PDF, opening browser print...", "error");
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
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
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-5xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        {/* Modal Top Bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#dc2626] via-[#ea580c] to-[#84cc16] text-white flex items-center justify-center shadow-xs">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                {demoActive ? "Official Operating Media Certificate Specimen" : "Official Operating Media Certificate"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {demoActive ? `Verified Demo Specimen • Course: ${course}` : `Verified Credential #${certId} • Conferred to ${name}`}
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

            {/* Direct High-Resolution PDF Download (Zero Blurring / 300+ DPI) */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors shadow-xs cursor-pointer disabled:opacity-70"
              title="Download high-resolution PDF certificate"
            >
              {isGeneratingPdf ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <FileDown size={13} />
              )}
              <span>{isGeneratingPdf ? "Generating PDF..." : "Download PDF"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors shadow-xs cursor-pointer"
              title="Print or Save via Browser"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">Print</span>
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
            ref={certRef}
            studentName={name}
            courseTitle={course}
            certificateId={certId}
            issueDate={issueDate}
            expiryDate={expiryDate}
            verificationUrl={verifyUrl}
            showBorder={true}
            isDemo={demoActive}
          />
        </div>

        {/* Print Landscape Isolation Stylesheet */}
        <style>{`
          @media print {
            @page {
              size: A4 landscape;
              margin: 0;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body * {
              visibility: hidden !important;
            }
            #printable-certificate-document, #printable-certificate-document * {
              visibility: visible !important;
            }
            #printable-certificate-document {
              position: fixed !important;
              left: 0 !important;
              top: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 8mm 12mm !important;
              box-sizing: border-box !important;
              z-index: 9999999 !important;
              border: none !important;
              box-shadow: none !important;
              background: #ffffff !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }
        `}</style>

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
