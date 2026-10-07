import React, { useState, useEffect } from "react";
import {
  Save,
  Award,
  CheckCircle2,
  User,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Clock,
  Check,
  ShieldCheck,
  Sparkles,
  MapPin,
  Shield,
  BookOpen,
  AlertCircle,
  Phone,
  Mail,
  Edit3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FeeReceiptModal } from "../components/crm/FeeReceiptModal";
import { AttendanceComparisonChart } from "../components/crm/AttendanceComparisonChart";
import profilePic from "../assets/profile-pic.png";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";

export const ProfilePage = () => {
  const {
    currentUser,
    isAdmin,
    isStudent,
    updateCurrentUser,
    crmProfile,
    crmAttendance,
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state: default to 'attendance-fees' for students (as requested by user), or 'profile'
  const initialTab =
    searchParams.get("tab") === "details" ? "details" : "attendance-fees";
  const [activeTab, setActiveTab] = useState(
    isStudent ? initialTab : "details",
  );

  // Sub-tabs for Attendance & Fees
  const [crmActiveTab, setCrmActiveTab] = useState("overview"); // 'overview' | 'academic' | 'financial'
  const [attendanceView, setAttendanceView] = useState("graph"); // 'graph' | 'logs'
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Profile Form States
  const [name, setName] = useState(currentUser.name || "Hiteshpuri Goswami");
  const [email, setEmail] = useState(
    currentUser.email || "hiteshpuri.g@gmail.com",
  );
  const [phone, setPhone] = useState(crmProfile.phone || "+91 74001 23992");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setName(currentUser.name || "Hiteshpuri Goswami");
    setEmail(currentUser.email || "hiteshpuri.g@gmail.com");
  }, [currentUser]);

  const handleSave = (e) => {
    e.preventDefault();
    updateCurrentUser({ name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const attendanceTrendData = [
    { month: "Nov", rate: 91 },
    { month: "Dec", rate: 88 },
    { month: "Jan", rate: 94 },
    { month: "Feb", rate: 89 },
    { month: "Mar", rate: 93 },
  ];

  // Registration date & 365-day academic validity calculations
  const registrationDate =
    crmProfile?.joiningDate || crmProfile?.registrationDate || "2026-02-10";
  const formatDate = (dateStr) => {
    if (!dateStr) return "10 Feb 2026";
    try {
      const dt = new Date(dateStr);
      if (!isNaN(dt.getTime())) {
        return dt.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
    } catch {}
    return String(dateStr);
  };

  const regDateObj = new Date(registrationDate);
  const now = new Date();
  const diffTime = Math.max(0, now - regDateObj);
  const daysElapsed = Math.min(
    365,
    Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)))
  );
  const daysRemaining = Math.max(0, 365 - daysElapsed);
  const validityPercentage = Math.min(
    100,
    Math.round((daysElapsed / 365) * 100)
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Identity Card */}
      <div 
        className="relative bg-cover bg-center border border-blue-100/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs overflow-hidden"
        style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 min-w-0">
          {/* Circular Profile Picture with Last Active Status Pulse */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-white shadow-md ring-2 ring-blue-100/90 bg-slate-100 p-0.5">
              <img
                src={profilePic}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
            {/* Green Active Pulse Status Indicator on circular avatar */}
            <span
              className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-xs ring-1 ring-emerald-400"
              title="Active Now"
            />
          </div>

          <div className="min-w-0 space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-white border border-blue-200/90 px-2.5 py-1 rounded shadow-2xs">
                {isStudent
                  ? "STUDENT PROFILE & CRM LEDGER"
                  : "ADMINISTRATOR PROFILE"}
              </span>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CRM Verified</span>
              </span>
              {/* Last Active Indicator Badge with red indicator */}
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Active Today</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Last active 2m ago</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentUser.name || "Hiteshpuri Goswami"}
            </h1>

            {isStudent ? (
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <div className="bg-white/95 border border-slate-200/90 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-slate-800 font-medium flex items-center space-x-1.5 shadow-2xs">
                  <BookOpen size={14} className="text-[#2563eb]" />
                  <span>
                    Course:{" "}
                    <strong className="text-slate-950 font-extrabold">
                      {crmProfile.course || "Diploma in Digital Marketing"}
                    </strong>
                  </span>
                </div>
                <div className="bg-white/95 border border-slate-200/90 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-slate-800 font-medium flex items-center space-x-1.5 shadow-2xs">
                  <Shield size={14} className="text-[#2563eb]" />
                  <span>
                    Student ID:{" "}
                    <strong className="text-slate-950 font-extrabold">
                      {crmProfile.admissionNo || "OMC-0266"}
                    </strong>
                  </span>
                </div>
                <div className="bg-white/95 border border-slate-200/90 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-slate-800 font-medium flex items-center space-x-1.5 shadow-2xs">
                  <MapPin size={14} className="text-[#2563eb]" />
                  <span>
                    Center:{" "}
                    <strong className="text-slate-950 font-extrabold">
                      {crmProfile.branch || "Borivali Center"}
                    </strong>
                  </span>
                </div>
                {/* Registration Date & 365 Days Indicator Pill */}
                <div className="bg-white/95 border border-blue-200/90 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-slate-800 font-medium flex items-center space-x-1.5 shadow-2xs">
                  <Calendar size={14} className="text-[#2563eb]" />
                  <span>
                    Registered:{" "}
                    <strong className="text-slate-950 font-extrabold">
                      {formatDate(registrationDate)}
                    </strong>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[#2563eb] font-extrabold">
                    {daysElapsed} of 365 Days
                  </span>
                </div>
                {/* Last Active Timestamp Pill */}
                <div className="bg-white/95 border border-emerald-200/90 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-slate-800 font-medium flex items-center space-x-1.5 shadow-2xs">
                  <Clock size={14} className="text-emerald-600" />
                  <span>
                    Last Active:{" "}
                    <strong className="text-slate-950 font-extrabold">
                      Today, 04:30 PM
                    </strong>
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm font-semibold text-slate-700">
                {currentUser.designation || "Administrator"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Academic Validity & CRM Documentation Bar */}
      {isStudent && (
        <div className="bg-white border border-slate-200/90 rounded sm:rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Validity Details & Progress */}
            <div className="flex-1 min-w-0 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100/80 text-[#2563eb] flex items-center justify-center shrink-0">
                    <Calendar size={15} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        Academic Enrolment Validity
                      </h4>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full leading-none">
                        Active
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Registered: <strong className="text-slate-900 font-bold">{formatDate(registrationDate)}</strong> • 365 Days Course Period
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
                    {daysRemaining} days remaining
                  </span>
                </div>
              </div>

              {/* Progress Bar & Indicators */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-900">
                    {daysElapsed}{" "}
                    <span className="text-slate-500 font-medium">
                      of 365 days completed
                    </span>
                  </span>
                  <span className="font-black text-[#2563eb] tabular-nums">
                    {validityPercentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 shadow-xs"
                    style={{ width: `${validityPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Divider */}
            <div className="hidden md:block w-px h-14 bg-slate-200/80 self-center mx-1" />

            {/* Receipt Action Button */}
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-center gap-1.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                type="button"
                onClick={() => setIsReceiptModalOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer active:scale-95 w-full sm:w-auto md:min-w-[190px]"
              >
                <FileText size={16} />
                <span>Official Fee Receipt</span>
              </button>
              <span className="text-xs text-slate-500 text-center md:text-right font-medium">
                Verified CRM Financial Record
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Page Tab Navigation */}
      {isStudent && (
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("attendance-fees");
              setSearchParams({ tab: "attendance" });
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === "attendance-fees"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <DollarSign size={14} />
            <span>Attendance Records & Tuition Fees</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("details");
              setSearchParams({ tab: "details" });
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === "details"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <User size={14} />
            <span>Personal & Account Details</span>
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. TAB 1: ATTENDANCE RECORDS & TUITION FEES                    */}
      {/* ============================================================== */}
      {isStudent && activeTab === "attendance-fees" && (
        <div className="space-y-6">
          {/* The 3-Toggle Navigation Bar (matching LATEST UI specification) */}
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
          <div className="bg-white border border-slate-200/90  rounded p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Classroom Attendance, Fees, Batches & Qualifications
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lecture attendance compliance tracked automatically via
                  Operating Media CRM
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
                          {log.date} •{" "}
                          {log.batch_name || "Masters Weekday Morning"} •
                          Faculty: {log.trainer_name || "Harsh Pareek"}
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
          <div className="bg-white border border-slate-200/90 rounded p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Accounts & Enrollment Billing
                  </h3>
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Fully Cleared
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                  Course Fee Management & Installments
                </p>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 font-semibold">
                Student:{" "}
                <strong className="text-slate-900 font-bold">
                  {currentUser.name || "Hiteshpuri Goswami"}
                </strong>{" "}
                ({crmProfile.admissionNo || "OMC-0266"})
              </div>
            </div>

            {/* 3 Summary Metric Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    TOTAL COURSE FEE
                  </span>
                  <Award size={18} className="text-blue-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 tabular-nums">
                  ₹45,000
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                  Ref ID: OMC-0266 • Diploma Track
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    AMOUNT CLEARED
                  </span>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 tabular-nums">
                  ₹55,000
                </div>
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden mt-1">
                  <div className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
                <div className="text-xs sm:text-sm text-right font-black text-emerald-700">
                  122.2% Realized
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    OUTSTANDING BALANCE
                  </span>
                  <Clock size={18} className="text-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 tabular-nums">
                  ₹0
                </div>
                <div className="text-xs sm:text-sm text-emerald-600 font-bold flex items-center space-x-1">
                  <span>All Dues Cleared ✓</span>
                </div>
              </div>
            </div>

            {/* Installment Payment Roadmap */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  INSTALLMENT PAYMENT ROADMAP
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Automated CRM Receipt Sync
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs sm:text-sm">
                  <div className="space-y-0.5">
                    <span className="text-slate-600 font-medium block">
                      Registration Fee
                    </span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">
                      ₹3,000
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Mode: UPI / Online
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 block">
                      PAID
                    </span>
                    <span className="text-xs text-slate-500">
                      Admission Day
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs sm:text-sm">
                  <div className="space-y-0.5">
                    <span className="text-slate-600 font-medium block">
                      Installment 1
                    </span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">
                      ₹52,000
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Mode: Bank Transfer
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 block">
                      PAID
                    </span>
                    <span className="text-xs text-slate-500">
                      25 Feb 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. TAB 2: PERSONAL & ACCOUNT DETAILS                           */}
      {/* ============================================================== */}
      {(!isStudent || activeTab === "details") && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAdmin
                  ? "Administrator Access Credentials"
                  : "Personal & Enrollment Information"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your profile contact details and verified system
                credentials.
              </p>
            </div>
          </div>

          {/* Student Stats Badges */}
          {isStudent && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="text-center p-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Enrolled Courses
                </span>
                <span className="text-lg font-black tabular-nums text-slate-900">
                  4 Courses
                </span>
              </div>
              <div className="text-center p-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Completed Lessons
                </span>
                <span className="text-lg font-black tabular-nums text-emerald-600">
                  28 / 72
                </span>
              </div>
              <div className="text-center p-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Overall Progress
                </span>
                <span className="text-lg font-black tabular-nums text-[#2563eb]">
                  65%
                </span>
              </div>
              <div className="text-center p-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Verified Attendance
                </span>
                <span className="text-lg font-black tabular-nums text-emerald-700">
                  89.3%
                </span>
              </div>
              <div className="text-center p-2 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Registration Validity
                </span>
                <span className="text-lg font-black tabular-nums text-indigo-600">
                  {daysElapsed} / 365 Days
                </span>
                <span className="text-[10px] text-slate-400 block font-medium">
                  {daysRemaining} Days Left
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Role
                </label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.roleLabel || "STUDENT"}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            {isStudent && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={crmProfile.admissionNo || "OMC-0266"}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enrolled Course
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={crmProfile.course || "Diploma in Digital Marketing"}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Center / Branch
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={crmProfile.branch || "Borivali Center"}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Profile information updated successfully!</span>
              </div>
            )}

            <div className="pt-4 flex justify-between items-center border-t border-slate-100">
              {isStudent && (
                <button
                  type="button"
                  onClick={() => navigate("/achievements")}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <Award size={14} />
                  <span>View Verified Achievements</span>
                </button>
              )}

              <div className="ml-auto">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <Save size={15} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Official Fee Receipt Modal */}
      <FeeReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        profile={crmProfile}
      />
    </div>
  );
};

export default ProfilePage;
