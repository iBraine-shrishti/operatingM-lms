import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { OperatingMediaCertificate } from "../components/certificate/OperatingMediaCertificate";
import logoImg from "../assets/logo.png";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Award,
  Calendar,
  Building2,
  Check,
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export const CertificateVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Read query params or fallback to current student certificate
  const certificateId = searchParams.get("id") || "132929482";
  const studentName = searchParams.get("name") || "Sahil Hasolkar";
  const courseTitle =
    searchParams.get("course") ||
    "Masters in Digital Marketing & Artificial Intelligence";
  const issueDate = searchParams.get("issued") || "February 10, 2025";
  const expiryDate = searchParams.get("expiry") || "February 10, 2026";

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Enforce Light Mode as default theme on Certificate Verification Page
  useEffect(() => {
    const wasDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.remove("dark");
    return () => {
      if (wasDark) {
        document.documentElement.classList.add("dark");
      }
    };
  }, []);

  // Determine if certificate is expired with date condition
  const isExpired = (() => {
    if (!expiryDate) return false;
    const str = String(expiryDate).trim().toLowerCase();
    if (str === "never" || str === "lifetime" || str === "no expiry") return false;
    const parsed = new Date(expiryDate);
    if (!isNaN(parsed.getTime())) {
      return parsed.getTime() < Date.now();
    }
    return false;
  })();

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      showToast("Public certificate verification link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Top Navbar: Focused Brand Logo for Advertising Purpose (Print Certificate & LMS Portal removed) */}
        <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-2xs print:hidden">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2" title="Operating Media Home">
              <img
                src={logoImg}
                alt="Operating Media - Digitize Your Career"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <span className="hidden sm:inline-block h-5 w-[1px] bg-slate-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 hidden sm:inline-block">
              Institutional Credential Ledger
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              ISO 9001:2015 Accredited
            </span>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
          {/* Verification Status Banner (Active vs Expired) */}
          <div
            className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden ${
              isExpired ? "border-rose-300" : "border-emerald-200"
            }`}
          >
            <div className="flex items-start sm:items-center space-x-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                  isExpired
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "bg-emerald-50 text-emerald-600 border-emerald-200"
                }`}
              >
                {isExpired ? <ShieldAlert size={24} /> : <ShieldCheck size={24} />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-black uppercase tracking-wider ${
                      isExpired ? "text-rose-700" : "text-emerald-700"
                    }`}
                  >
                    {isExpired
                      ? "Official Credential Past Expiration"
                      : "Verified Authentic Institutional Credential"}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isExpired ? "bg-rose-500 animate-pulse" : "bg-emerald-500 animate-pulse"
                    }`}
                  />
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Operating Media Official Certification Record
                </h2>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">
                STATUS
              </span>
              <span
                className={`inline-flex items-center space-x-1.5 text-xs font-black px-3 py-1 rounded-full border ${
                  isExpired
                    ? "bg-rose-100 text-rose-800 border-rose-300"
                    : "bg-emerald-100 text-emerald-800 border-emerald-300"
                }`}
              >
                {isExpired ? (
                  <>
                    <AlertTriangle size={13} className="text-rose-600" />
                    <span>EXPIRED</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>ACTIVE & VALID</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Certificate Display Canvas */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-8 md:p-10 shadow-sm print:border-none print:shadow-none print:p-0">
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
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4 print:hidden">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Award size={18} className="text-[#dc2626]" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Academic Ledger Record & Accreditation
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  CANDIDATE NAME
                </span>
                <strong className="text-slate-900 text-sm font-black block">
                  {studentName}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  QUALIFICATION / CONFERRED PROGRAM
                </span>
                <strong className="text-slate-900 font-bold block truncate">
                  {courseTitle}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  CREDENTIAL ID
                </span>
                <strong className="text-slate-900 font-black text-sm font-mono block">
                  {certificateId}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  CONFERRED DATE
                </span>
                <strong className="text-slate-800 font-bold block">
                  {issueDate}
                </strong>
              </div>

              {/* Expiry Date (Red when expired) */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  VALIDITY PERIOD
                </span>
                <strong
                  className={`block ${
                    isExpired ? "text-red-600 font-bold" : "text-slate-800 font-bold"
                  }`}
                >
                  {expiryDate}
                  {isExpired && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-red-100 text-red-700 border border-red-200 inline-block">
                      Expired
                    </span>
                  )}
                </strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  ISSUING INSTITUTION
                </span>
                <strong className="text-slate-800 font-bold block">
                  Operating Media (ISO 9001:2015)
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* INSTITUTIONAL FOOTER                                             */}
      {/* Displays Operating Media Credential, Verification Service, Share Link */}
      {/* ================================================================ */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 px-4 sm:px-8 text-xs text-slate-600 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">
              Operating Media Credential
            </span>
            <span className="h-4 w-[1px] bg-slate-300" />
            <span className="font-semibold text-slate-600">
              Verification Service
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Copy verification link to share"
            >
              {copied ? (
                <Check size={14} className="text-emerald-600" />
              ) : (
                <Copy size={14} className="text-slate-600" />
              )}
              <span>{copied ? "Link Copied!" : "Share Link"}</span>
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>© 2026 Operating Media • All Rights Reserved</span>
          <span>Official Public Credential Ledger • Cryptographically Timestamped</span>
        </div>
      </footer>
    </div>
  );
};

export default CertificateVerificationPage;
