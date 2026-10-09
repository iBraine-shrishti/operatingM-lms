import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { OperatingMediaCertificate } from "../components/certificate/OperatingMediaCertificate";
import logoImg from "../assets/logo.png";
import {
  ShieldCheck,
  CheckCircle2,
  Printer,
  Copy,
  ExternalLink,
  Award,
  Calendar,
  Building2,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export const CertificateVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Read query params or fallback to current student dummy certificate
  const certificateId = searchParams.get("id") || "132929482";
  const studentName = searchParams.get("name") || "Hiteshpuri Goswami";
  const courseTitle =
    searchParams.get("course") ||
    "Diploma in Digital Marketing & Artificial Intelligence";
  const issueDate = searchParams.get("issued") || "February 10, 2025";
  const expiryDate = searchParams.get("expiry") || "February 10, 2026";

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      showToast("Public certificate verification link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060b18] text-slate-900 dark:text-white font-sans pb-16">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-[#0b1329] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-2xs print:hidden">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="Operating Media" className="h-7 w-auto object-contain dark:brightness-110" />
          </Link>
          <span className="hidden sm:inline-block h-4 w-[1px] bg-slate-300 dark:bg-slate-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline-block">
            Credential Verification Service
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Share Link"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Printer size={14} />
            <span>Print Certificate</span>
          </button>

          <Link
            to="/dashboard"
            className="hidden md:inline-flex items-center space-x-1 text-xs font-bold text-[#3b49df] dark:text-blue-400 hover:underline pl-2"
          >
            <span>LMS Portal</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Verification Status Banner */}
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-emerald-200 dark:border-emerald-800/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          <div className="flex items-start sm:items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Verified Authentic Credential
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Operating Media Official Certification Record
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block uppercase">
              STATUS
            </span>
            <span className="inline-flex items-center space-x-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 size={12} />
              <span>ACTIVE & VALID</span>
            </span>
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-8 md:p-10 shadow-sm print:border-none print:shadow-none print:p-0">
          <OperatingMediaCertificate
            studentName={studentName}
            courseTitle={courseTitle}
            certificateId={certificateId}
            issueDate={issueDate}
            expiryDate={expiryDate}
            verificationUrl={currentUrl}
            showBorder={true}
          />
        </div>

        {/* Verification Metadata Ledger Details */}
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4 print:hidden">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Award size={18} className="text-[#3b49df] dark:text-blue-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Academic Ledger Record
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 block">
                CANDIDATE NAME
              </span>
              <strong className="text-slate-900 dark:text-white text-sm font-black">
                {studentName}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 block">
                QUALIFICATION / CONFERRED PROGRAM
              </span>
              <strong className="text-slate-900 dark:text-white font-bold block truncate">
                {courseTitle}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 block">
                CREDENTIAL ID
              </span>
              <strong className="text-slate-900 dark:text-white font-black text-sm">
                {certificateId}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 block">
                CONFERRED DATE
              </span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">
                {issueDate}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 block">
                VALIDITY PERIOD
              </span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">
                {expiryDate}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 block">
                ISSUING INSTITUTION
              </span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold">
                Operating Media (ISO 9001:2015)
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
