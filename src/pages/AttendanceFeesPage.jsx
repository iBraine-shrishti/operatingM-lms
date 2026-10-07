import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle2,
  Award,
  Clock,
  Check,
  Download,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { FeeReceiptModal } from "../components/crm/FeeReceiptModal";
import { AttendanceComparisonChart } from "../components/crm/AttendanceComparisonChart";

export const AttendanceFeesPage = () => {
  const { currentUser, crmProfile, crmAttendance } = useAuth();
  const [crmActiveTab, setCrmActiveTab] = useState("overview"); // 'overview' | 'academic' | 'financial'
  const [attendanceView, setAttendanceView] = useState("graph"); // 'graph' | 'logs'
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const attendanceTrendData = [
    { month: "Nov", rate: 91 },
    { month: "Dec", rate: 88 },
    { month: "Jan", rate: 94 },
    { month: "Feb", rate: 89 },
    { month: "Mar", rate: 93 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200 rounded-lg">
              FINANCIAL & ATTENDANCE MANAGEMENT
            </span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CRM Verified</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Attendance Records & Tuition Fees
          </h1>
          <p className="text-slate-600 text-sm font-medium mt-1">
            Monitor real-time lecture attendance benchmarks, installment payment
            roadmap, and official fee receipts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsReceiptModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-2 cursor-pointer self-start sm:self-auto"
        >
          <FileText size={14} />
          <span>Official Fee Receipt</span>
        </button>
      </div>

      {/* The 3-Toggle Navigation Bar (matching LATEST UI) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setCrmActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            crmActiveTab === "overview"
              ? "bg-white border border-slate-200 text-blue-600 shadow-2xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Student CRM Overview
        </button>
        <button
          type="button"
          onClick={() => setCrmActiveTab("academic")}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            crmActiveTab === "academic"
              ? "bg-white border border-slate-200 text-blue-600 shadow-2xs font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Official Operating Media & Academic
        </button>
        <button
          type="button"
          onClick={() => setCrmActiveTab("financial")}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            crmActiveTab === "financial"
              ? "bg-white border border-slate-200 text-blue-600 shadow-2xs font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Financial Management
        </button>
      </div>

      {/* 1. Classroom Attendance Card */}
      <div className="bg-white border border-slate-200/90rounded p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Classroom Attendance, Fees, Batches & Qualifications
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Lecture attendance compliance tracked automatically via Operating
              Media CRM
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setAttendanceView("graph")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                attendanceView === "graph"
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <TrendingUp size={13} />
              <span>Trend Graph</span>
            </button>
            <button
              type="button"
              onClick={() => setAttendanceView("logs")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                attendanceView === "logs"
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Calendar size={13} />
              <span>Class Logs (5)</span>
            </button>
          </div>
        </div>

        {attendanceView === "graph" ? (
          <div className="pt-2">
            <AttendanceComparisonChart
              enrolledCourseTitle={crmProfile.course || "Diploma in Digital Marketing"}
            />
          </div>
        ) : (
          /* Class Logs List */
          <div className="space-y-2 pt-1">
            {(crmAttendance.logs || []).slice(0, 8).map((log, lIdx) => (
              <div
                key={lIdx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${log.status === "PRESENT" ? "bg-emerald-500" : "bg-rose-500"}`}
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {log.topic}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {log.date} • {log.batch_name || "Masters Weekday Morning"}{" "}
                      • Faculty: {log.trainer_name || "Harsh Pareek"}
                    </span>
                  </div>
                </div>
                <span
                  className={`font-bold px-2.5 py-1 rounded text-xs ${
                    log.status === "PRESENT"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Accounts & Enrollment Billing Card */}
      <div className="bg-white border border-slate-200/90rounded p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Accounts & Enrollment Billing
              </h3>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Fully Cleared
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Course Fee Management & Installments
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Student:{" "}
            <strong className="text-slate-900">
              {currentUser.name || "Hiteshpuri Goswami"}
            </strong>{" "}
            ({crmProfile.admissionNo || "OMC-0266"})
          </div>
        </div>

        {/* 3 Summary Metric Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                TOTAL COURSE FEE
              </span>
              <Award size={16} className="text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              ₹45,000
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Ref ID: OMC-0266 • Diploma Track
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                AMOUNT CLEARED
              </span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              ₹55,000
            </div>
            <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden mt-1">
              <div className="w-full h-full bg-emerald-500 rounded-full" />
            </div>
            <div className="text-xs text-right font-black text-emerald-700">
              122.2% Realized
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                OUTSTANDING BALANCE
              </span>
              <Clock size={16} className="text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              ₹0
            </div>
            <div className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
              <span>All Dues Cleared ✓</span>
            </div>
          </div>
        </div>

        {/* Installment Payment Roadmap */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              INSTALLMENT PAYMENT ROADMAP
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Automated CRM Receipt Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 font-medium block">
                  Registration Fee
                </span>
                <span className="font-black text-slate-900 text-sm">
                  ₹3,000
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Mode: UPI / Online
                </span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 block">
                  PAID
                </span>
                <span className="text-[11px] text-slate-400">
                  Admission Day
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 font-medium block">
                  Installment 1
                </span>
                <span className="font-black text-slate-900 text-sm">
                  ₹52,000
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Mode: Bank Transfer
                </span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 block">
                  PAID
                </span>
                <span className="text-[11px] text-slate-400">25 Feb 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Fee Receipt Modal */}
      <FeeReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        profile={crmProfile}
      />
    </div>
  );
};

export default AttendanceFeesPage;
