import React, { useRef } from "react";
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  Award,
  ExternalLink,
} from "lucide-react";

export const CertificateViewerModal = ({
  isOpen,
  onClose,
  certificate,
  studentName,
}) => {
  const printRef = useRef(null);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const name = certificate.name || studentName || "Aditya Jadhav";
  const certId = certificate.certificate_id || "OM/3/5/32";
  const course = certificate.course || "Masters in Digital Marketing";
  const date = certificate.date || "March, 2026";
  const rating = certificate.rating || "9.4";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                Official Credential Verification
              </h3>
              <p className="text-[11px] text-slate-500">
                Operating Media Institute of Digital Marketing • Certificate #
                {certId}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Certificate Canvas / Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/60 flex items-center justify-center">
          <div
            ref={printRef}
            className="relative w-full max-w-[800px] aspect-[1.414/1] bg-white rounded shadow-xl overflow-hidden border border-slate-300 print:border-none print:shadow-none print:w-full"
            style={{
              backgroundImage:
                "url('/OM Certificate 2026 (1).png'), url('/test_cert.png')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Overlay content matching CRM CertificateTemplate positions */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-10 select-none">
              {/* Header Spacer */}
              <div className="h-10 sm:h-16" />

              {/* Main Certification Text */}
              <div className="text-center w-full max-w-xl space-y-1 sm:space-y-2 mt-4 sm:mt-6">
                <p className="text-[11px] sm:text-sm font-serif italic text-slate-600 tracking-wide">
                  This certifies that
                </p>

                <h1 className="text-xl sm:text-3xl md:text-4xl font-serif font-black text-[#003873] tracking-tight">
                  {name}
                </h1>

                <p className="text-[9.5px] sm:text-xs text-slate-500 font-normal leading-relaxed max-w-md mx-auto">
                  has completed the required course of study for the below
                  mentioned topic and in testimony thereof is awarded this
                  certificate
                </p>

                <h2 className="text-base sm:text-xl md:text-2xl font-serif font-bold text-[#0d6b7b] tracking-wide pt-1">
                  {course}
                </h2>

                <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  given in the month of{" "}
                  <strong className="text-slate-800">{date}</strong>
                </p>
              </div>

              {/* Bottom Row: Rating box (left) and Signature (right) */}
              <div className="w-full flex items-end justify-between px-2 sm:px-6 mb-4 sm:mb-6">
                {/* Performance Rating */}
                <div className="text-center bg-white/90 backdrop-blur-xs border border-amber-300/80 px-3 py-1.5 rounded-xl shadow-xs">
                  <span className="text-sm sm:text-lg font-black text-[#003873] tabular-nums leading-none block">
                    {rating} / 10
                  </span>
                  <span className="text-[9px] sm:text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">
                    Performance Rating
                  </span>
                </div>

                {/* Director Signature */}
                <div className="text-center">
                  <div className="h-6 sm:h-8 flex items-end justify-center">
                    <span className="font-serif italic text-sm sm:text-base text-slate-800 font-bold border-b border-slate-400 pb-0.5 px-3">
                      Harsh Pareek
                    </span>
                  </div>
                  <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-600 block mt-0.5">
                    Harsh Pareek, Director
                  </span>
                </div>
              </div>

              {/* Footer Meta Row */}
              <div className="w-full flex items-center justify-between text-[8px] sm:text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-200/60">
                <span>Powered by iBraine Digital LLP</span>
                <span className="font-bold text-slate-600">
                  Certificate ID ~ {certId}
                </span>
                <span>www.OperatingMedia.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold">
            <ShieldCheck size={16} />
            <span>
              Digital signature cryptographically registered on CRM system
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
            >
              <Download size={13} />
              <span>Download Official PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
