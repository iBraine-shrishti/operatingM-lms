import React from 'react';
import { Award, CheckCircle, ExternalLink, Download, ShieldCheck, Eye, Sparkles } from 'lucide-react';

export const StudentCertificatesCard = ({ certificates = [], onOpenCertificate }) => {
  const primaryCert = certificates && certificates.length > 0 ? certificates[0] : null;

  if (!primaryCert) return null;

  return (
    <div className="bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Verified Qualifications
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
            <ShieldCheck size={12} className="text-amber-600" />
            <span>Official Credential</span>
          </span>
        </div>

        {/* Certificate Feature Card */}
        <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-slate-50 border border-amber-200/80 shadow-2xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-md">
                <Award size={24} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 block">
                  Credential ID: {primaryCert.certificate_id}
                </span>
                <h4 className="font-bold text-slate-900 text-base truncate leading-snug">
                  {primaryCert.course}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conferred in <strong className="text-slate-700 font-semibold">{primaryCert.date}</strong>
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="inline-block bg-white border border-amber-200 px-2.5 py-1 rounded-xl shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Score</span>
                <span className="text-sm font-black text-amber-600 tabular-nums">
                  {primaryCert.rating} <span className="text-[10px] font-bold text-slate-400">/ 10</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle size={13} className="text-emerald-600" />
              <span>Accreditation Validated</span>
            </span>
            <span className="text-slate-400 text-[11px]">
              Signatory: Harsh Pareek, Director
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
          Available in high-resolution PDF with verifiable QR verification.
        </span>

        <button
          type="button"
          onClick={() => onOpenCertificate(primaryCert)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <Eye size={13} />
          <span>View Verified Certificate</span>
        </button>
      </div>
    </div>
  );
};
