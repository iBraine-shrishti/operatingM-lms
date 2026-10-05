import React from "react";
import {
  IndianRupee,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Download,
  ChevronRight,
} from "lucide-react";

export const StudentFeesCard = ({ profile, onOpenReceipt }) => {
  if (!profile) return null;

  const {
    totalFees = 35000,
    totalPaid = 25000,
    balanceDue = 10000,
    paidPercentage = 71.4,
    paymentStatus = "Partial Due",
    nextDueDate = "15 May 2026",
    nextDueAmount = 10000,
    installments = [],
    admissionNo = "OMC-0266",
  } = profile;

  return (
    <div className="bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Accounts & Enrollment Billing
            </span>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                balanceDue <= 0
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {paymentStatus}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-1">
            Course Fee Management & Installments
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenReceipt}
          className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <FileText size={13} />
          <span>Official Fee Receipt</span>
        </button>
      </div>

      {/* 3 Prominent Metric Cards (Total / Paid / Balance) */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: Total Fees */}
        <div className="p-3.5 sm:p-4 bg-slate-50/80 border border-slate-200/80 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
              Total Course Fee
            </span>
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              ₹
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              ₹{totalFees.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
              Ref ID:{" "}
              <strong className="text-slate-600 font-semibold">
                {admissionNo}
              </strong>
            </span>
          </div>
        </div>

        {/* Card 2: Total Paid */}
        <div className="p-3.5 sm:p-4 bg-emerald-50/40 border border-emerald-200/80 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-700">
              Amount Cleared
            </span>
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={14} />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-800 tabular-nums">
              ₹{totalPaid.toLocaleString("en-IN")}
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, paidPercentage)}%` }}
                />
              </div>
              <span className="text-[10.5px] font-extrabold text-emerald-700 tabular-nums shrink-0">
                {paidPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Balance Due */}
        <div className="p-3.5 sm:p-4 bg-amber-50/40 border border-amber-200/80 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-800">
              Outstanding Balance
            </span>
            <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock size={14} />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-black text-amber-900 tabular-nums">
              ₹{balanceDue.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-amber-700 font-medium block mt-0.5">
              {balanceDue > 0 ? (
                <span>
                  Next Due: <strong className="font-bold">{nextDueDate}</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-bold">
                  All Dues Cleared ✓
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Installment Stepper / Timeline Roadmap */}
      <div className="mt-4 pt-3.5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Installment Payment Roadmap
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Automated CRM Receipt Sync
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {installments.map((inst, idx) => {
            const isPaid = inst.status === "Paid";
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition-all ${
                  isPaid
                    ? "bg-slate-50/60 border-slate-200/80"
                    : "bg-amber-50/30 border-amber-200/70 ring-1 ring-amber-400/20"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 truncate">
                    {inst.title}
                  </span>
                  {isPaid ? (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      PAID
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                      DUE
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-baseline justify-between gap-1.5 flex-wrap">
                  <span className="text-sm font-black text-slate-900 tabular-nums">
                    ₹{inst.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10.5px] text-slate-400 font-medium whitespace-nowrap">
                    {inst.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
