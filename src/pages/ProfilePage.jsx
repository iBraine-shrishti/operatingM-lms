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
  GraduationCap,
  CreditCard,
  Wallet,
  LayoutGrid,
  Bookmark,
  Download,
  Eye,
  MoreVertical,
  History,
  Zap,
  CheckSquare,
  Square,
  ChevronRight,
  X,
  ExternalLink,
  FileCheck,
  AlertTriangle,
  Heart,
  Building,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FeeReceiptModal } from "../components/crm/FeeReceiptModal";
import { AttendanceComparisonChart } from "../components/crm/AttendanceComparisonChart";

// Visual assets
import profilePic from "../assets/profile-pic.png";
import sahilProfilePic from "../assets/sahil-profile.png";
import dashboardHat from "../assets/header-bg/dashboard-hat.png";
import continueLearningLaptop from "../assets/continue-learning-laptop.png";
import docAadhaarImg from "../assets/doc-aadhaar.png";
import doc10thImg from "../assets/doc-10th.png";
import doc12thImg from "../assets/doc-12th.png";

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

  // Active Tab state: 'overview' | 'attendance' | 'personal' | 'documents' | 'history'
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "attendance") return "attendance";
    if (tabParam === "details" || tabParam === "personal") return "personal";
    if (tabParam === "documents") return "documents";
    if (tabParam === "history") return "history";
    return "overview";
  });

  // Keep search params in sync
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "overview") setSearchParams({});
    else setSearchParams({ tab });
  };

  // Student Profile State (seeded from crmProfile with Sahil Hasolkar default & pending fees)
  const [studentData, setStudentData] = useState(() => ({
    name: crmProfile?.name || "Sahil Hasolkar",
    fullName: crmProfile?.fullName || "Sahil Nilesh Hasolkar",
    studentId: crmProfile?.admissionNo || "OMC-0375",
    numericId: "#375",
    course: crmProfile?.course || "Masters in Digital Marketing",
    courseDesc:
      "Comprehensive program covering SEO, Social Media, Google Ads, Analytics and more.",
    center: crmProfile?.branch || crmProfile?.center || "Borivali Center",
    batch: crmProfile?.batchName || "WD-M1",
    admissionDate: crmProfile?.admissionDate || "22 Apr 2026",
    registrationDate: crmProfile?.registrationDate || "18 Apr 2026",
    dob: crmProfile?.dob || "28 Nov 2006",
    gender: crmProfile?.gender || "Male",
    maritalStatus: crmProfile?.maritalStatus || "Single",
    email: crmProfile?.email || "hasolkarsahil@gmail.com",
    mobile: crmProfile?.mobile || crmProfile?.phone || "919372017331",
    facultyLead: crmProfile?.facultyLead || "Harsh Pareek",
    facultyLeadRole: crmProfile?.facultyLeadRole || "Director & Lead Faculty",
    courseDuration: "12 Months",
    courseStart: "22 Apr 2026",
    courseEnd: "20 Apr 2027",
    daysLeft: 360,
    progressPercentage: 65,
    // Financial State (Fees Pending as requested)
    totalFees: crmProfile?.totalFees || 90000,
    amountPaid: crmProfile?.totalPaid || 5000,
    balanceDue: crmProfile?.balanceDue || 85000,
    feesClearedPercent: 6,
    paymentStatus: crmProfile?.paymentStatus || "Fees Pending",
    installments: crmProfile?.installments || [
      {
        id: "inst-0",
        number: 0,
        title: "Registration Fee",
        dueDate: "30 Sep 2026",
        amount: 5000,
        mode: "GPay",
        status: "PAID",
      },
      {
        id: "inst-1",
        number: 1,
        title: "Inst 1",
        dueDate: "01 Oct 2026",
        amount: 17000,
        mode: "Bank Transfer",
        status: "UNPAID",
        isOverdue: true,
      },
      {
        id: "inst-2",
        number: 2,
        title: "Inst 2",
        dueDate: "01 Nov 2026",
        amount: 17000,
        mode: "Bank Transfer",
        status: "UNPAID",
      },
      {
        id: "inst-3",
        number: 3,
        title: "Inst 3",
        dueDate: "01 Dec 2026",
        amount: 17000,
        mode: "Bank Transfer",
        status: "UNPAID",
      },
      {
        id: "inst-4",
        number: 4,
        title: "Inst 4",
        dueDate: "01 Jan 2027",
        amount: 17000,
        mode: "Bank Transfer",
        status: "UNPAID",
      },
      {
        id: "inst-5",
        number: 5,
        title: "Inst 5",
        dueDate: "01 Feb 2027",
        amount: 17000,
        mode: "Bank Transfer",
        status: "UNPAID",
      },
    ],
  }));

  // Attendance sub-view state
  const [attendanceView, setAttendanceView] = useState("graph"); // 'graph' | 'logs'

  // Modals state
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptInstallment, setReceiptInstallment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [activePayingInstallment, setActivePayingInstallment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Table selection & bulk action
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [bulkAction, setBulkAction] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedInstallments(studentData.installments.map((i) => i.id));
    } else {
      setSelectedInstallments([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedInstallments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk action handler
  const handleApplyBulkAction = () => {
    if (!bulkAction) {
      showToast("Please choose a bulk action to apply");
      return;
    }
    if (selectedInstallments.length === 0) {
      showToast("Please select at least one installment row");
      return;
    }

    if (bulkAction === "mark-paid") {
      setStudentData((prev) => {
        let addedPaid = 0;
        const updated = prev.installments.map((inst) => {
          if (selectedInstallments.includes(inst.id) && inst.status !== "PAID") {
            addedPaid += inst.amount;
            return { ...inst, status: "PAID", isOverdue: false };
          }
          return inst;
        });
        const newPaid = prev.amountPaid + addedPaid;
        const newBal = Math.max(0, prev.totalFees - newPaid);
        return {
          ...prev,
          amountPaid: newPaid,
          balanceDue: newBal,
          feesClearedPercent: Math.round((newPaid / prev.totalFees) * 100),
          installments: updated,
        };
      });
      showToast(`Selected installments marked as PAID successfully!`);
      setSelectedInstallments([]);
    } else if (bulkAction === "download-receipts") {
      showToast(`Generating consolidated fee receipts for selected items...`);
    } else if (bulkAction === "send-reminder") {
      showToast(`Payment reminder dispatch queued for registered contact!`);
    }
  };

  // Pay single installment handler
  const handleOpenPayModal = (installment) => {
    setActivePayingInstallment(installment);
    setIsPayModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!activePayingInstallment) return;

    setStudentData((prev) => {
      const updated = prev.installments.map((inst) =>
        inst.id === activePayingInstallment.id
          ? { ...inst, status: "PAID", isOverdue: false, mode: paymentMethod.toUpperCase() }
          : inst
      );
      const newPaid = prev.amountPaid + activePayingInstallment.amount;
      const newBal = Math.max(0, prev.totalFees - newPaid);
      return {
        ...prev,
        amountPaid: newPaid,
        balanceDue: newBal,
        feesClearedPercent: Math.round((newPaid / prev.totalFees) * 100),
        installments: updated,
      };
    });

    setIsPayModalOpen(false);
    showToast(
      `Payment of ₹${activePayingInstallment.amount.toLocaleString()} for ${activePayingInstallment.title} confirmed successfully!`
    );
  };

  // Open receipt for specific installment or total
  const handleOpenReceipt = (inst = null) => {
    setReceiptInstallment(inst);
    setIsReceiptModalOpen(true);
  };

  // Save profile edits
  const handleSaveProfileForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      fullName: formData.get("fullName") || studentData.fullName,
      email: formData.get("email") || studentData.email,
      mobile: formData.get("mobile") || studentData.mobile,
      gender: formData.get("gender") || studentData.gender,
      maritalStatus: formData.get("maritalStatus") || studentData.maritalStatus,
    };
    setStudentData((prev) => ({ ...prev, ...updated }));
    updateCurrentUser({
      name: updated.fullName,
      email: updated.email,
    });
    setIsEditModalOpen(false);
    showToast("Student details updated successfully!");
  };

  // Document item list
  const studentDocuments = [
    {
      id: "aadhaar",
      title: "Aadhaar Card",
      status: "Verified",
      thumb: docAadhaarImg,
      uploadedOn: "22 Apr 2026",
      docNo: "XXXX-XXXX-8921",
    },
    {
      id: "10th",
      title: "10th Marksheet",
      status: "Verified",
      thumb: doc10thImg,
      uploadedOn: "22 Apr 2026",
      docNo: "MSBSHSE / SSC 2022",
    },
    {
      id: "12th",
      title: "12th Marksheet",
      status: "Verified",
      thumb: doc12thImg,
      uploadedOn: "22 Apr 2026",
      docNo: "MSBSHSE / HSC 2024",
    },
  ];

  /* ------------------------------------------------------------- */
  /* ADMIN VIEW                                                    */
  /* ------------------------------------------------------------- */
  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={currentUser.avatar || profilePic}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/30"
            />
            <div>
              <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                ADMINISTRATOR PROFILE
              </span>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {currentUser.name || "Vishal Chaurasiya"}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser.email || "vishal.c@operatingmedia.com"} •{" "}
                {currentUser.designation || "Head of Operations & Lead Instructor"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            System Administration Settings
          </h3>
          <p className="text-xs text-slate-500">
            Administrator permissions allow managing student admissions, curricula, quiz creation, and course workflows.
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* STUDENT VIEW - PIXEL PERFECT TO profile.png                   */
  /* ------------------------------------------------------------- */
  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. TOP HEADER BANNER CARD                                      */}
      {/* ============================================================== */}
      <div className="relative rounded-3xl border border-blue-100 dark:border-slate-800 bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-blue-50/20 dark:from-slate-900/90 dark:via-blue-950/30 dark:to-slate-900/90 p-5 sm:p-7 shadow-xs overflow-hidden transition-all">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Avatar & Identity Details */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
            {/* Avatar Container with Green Active Dot */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-md bg-white dark:bg-slate-800 p-0.5">
                <img
                  src={sahilProfilePic}
                  alt={studentData.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Online Green Indicator Dot on Top Right */}
              <span
                className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-xs ring-1 ring-emerald-400"
                title="Active Student"
              />
            </div>

            {/* Student Name & Badges */}
            <div className="min-w-0 space-y-1 sm:space-y-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                Welcome back,
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {studentData.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {studentData.course} • ID: {studentData.numericId}
              </p>

              {/* Status Badge Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Student</span>
                </span>

                <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <ShieldCheck size={13} className="text-blue-600 dark:text-blue-400" />
                  <span>CRM Verified</span>
                </span>

                {/* FEES PENDING BADGE */}
                {studentData.balanceDue > 0 && (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 animate-pulse">
                    <AlertTriangle size={12} className="text-rose-600 dark:text-rose-400" />
                    <span>Fees Pending: ₹{studentData.balanceDue.toLocaleString()} Due</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center-Right: Countdown Card + 3D Cap Illustration */}
          <div className="flex items-center space-x-4 shrink-0">
            {/* Days Left Pill Card */}
            <div className="bg-white/95 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 rounded-2xl px-5 py-3.5 shadow-xs flex items-center space-x-3.5 relative min-w-[210px]">
              <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div className="pr-5">
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {studentData.daysLeft} <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Days Left</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Course ends on {studentData.courseEnd}
                </div>
              </div>
              <Calendar size={14} className="absolute top-3 right-3 text-blue-500 dark:text-blue-400 opacity-80" />
            </div>

            {/* 3D Graduation Cap on books graphic */}
            <div className="hidden md:block select-none">
              <img
                src={dashboardHat}
                alt="Learning Cap"
                className="w-24 sm:w-32 h-auto drop-shadow-md select-none transform hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>

        {/* Bottom Metadata Pills Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-5 mt-5 border-t border-blue-100/80 dark:border-slate-800/80">
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <BookOpen size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">Course</span>
              <strong className="text-slate-900 dark:text-white font-bold truncate block">
                {studentData.course}
              </strong>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <LayoutGrid size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">Student ID</span>
              <strong className="text-slate-900 dark:text-white font-bold block">
                {studentData.studentId}
              </strong>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <MapPin size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">Center</span>
              <strong className="text-slate-900 dark:text-white font-bold block">
                {studentData.center}
              </strong>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs flex items-center space-x-2.5 shadow-2xs">
            <Bookmark size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">Batch</span>
              <strong className="text-slate-900 dark:text-white font-bold block">
                {studentData.batch}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. TAB NAVIGATION BAR                                          */}
      {/* ============================================================== */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => handleTabChange("overview")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "overview"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <BookOpen size={14} />
          <span>Student Overview</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("attendance")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "attendance"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <Calendar size={14} />
          <span>Attendance & Fees</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("personal")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "personal"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <User size={14} />
          <span>Personal Information</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("documents")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "documents"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <FileText size={14} />
          <span>Documents</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("history")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === "history"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
          }`}
        >
          <History size={14} />
          <span>Course History</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 3. FOUR METRIC CARDS ROW                                       */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Admission Date */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Admission Date
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.admissionDate}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              Started your learning journey
            </span>
          </div>
        </div>

        {/* Card 2: Registration Date */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Registration Date
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.registrationDate}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              Account created
            </span>
          </div>
        </div>

        {/* Card 3: Branch / Center */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Branch / Center
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.center}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              Classroom + Live Zoom Hybrid
            </span>
          </div>
        </div>

        {/* Card 4: Faculty Lead */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <User size={18} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Faculty Lead
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
              {studentData.facultyLead}
            </strong>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              {studentData.facultyLeadRole}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. TWO-COLUMN MIDDLE SECTION                                   */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT: Course Progress & Timeline */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <GraduationCap size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Course Progress & Timeline
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate("/enrolled-courses")}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <span>View Course Details</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Course graphic & summary */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-4">
              <img
                src={continueLearningLaptop}
                alt="Course laptop"
                className="w-28 sm:w-32 h-auto object-contain shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {studentData.course}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {studentData.courseDesc}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">
                  {studentData.progressPercentage}% Completed
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {studentData.daysLeft} Days Left
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${studentData.progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom 3 metrics grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
              <Calendar size={14} className="mx-auto text-blue-600 dark:text-blue-400 mb-1" />
              <span className="text-[10px] text-slate-400 block">Total Duration</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData.courseDuration}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
              <Clock size={14} className="mx-auto text-blue-600 dark:text-blue-400 mb-1" />
              <span className="text-[10px] text-slate-400 block">Started On</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData.courseStart}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
              <Calendar size={14} className="mx-auto text-blue-600 dark:text-blue-400 mb-1" />
              <span className="text-[10px] text-slate-400 block">Ends On</span>
              <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                {studentData.courseEnd}
              </strong>
            </div>
          </div>
        </div>

        {/* RIGHT: Payment Summary (Shows Fees Pending & Balance Due) */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <Wallet size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Payment Summary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange("attendance")}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <span>View All Payments</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* 3 Metric Figures */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-left">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                  Total Fees
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                  ₹{studentData.totalFees.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                  Amount Paid
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                  ₹{studentData.amountPaid.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-xs text-rose-500 dark:text-rose-400 font-bold block flex items-center space-x-1">
                  <span>Balance</span>
                  <span className="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-1 rounded uppercase">DUE</span>
                </span>
                <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                  ₹{studentData.balanceDue.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Fees progress bar */}
            <div className="space-y-1.5 pt-5">
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(4, studentData.feesClearedPercent)}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                {studentData.feesClearedPercent}% of total fees cleared
              </span>
            </div>

            {/* Pending Fee Notice Alert */}
            {studentData.balanceDue > 0 && (
              <div className="mt-3.5 p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 flex items-start space-x-2.5 text-xs text-rose-800 dark:text-rose-300">
                <AlertCircle size={15} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Tuition Fees Pending: ₹{studentData.balanceDue.toLocaleString()} Due</span>
                  <span className="text-rose-700/80 dark:text-rose-400/80 text-[11px] block">
                    Installment 1 of ₹17,000 is Overdue since 01 Oct 2026. Please complete the transaction to avoid interruption.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Button (Dotted button matching profile.png) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                const firstUnpaid = studentData.installments.find((i) => i.status !== "PAID");
                if (firstUnpaid) {
                  handleOpenPayModal(firstUnpaid);
                } else {
                  showToast("All tuition fees are fully cleared!");
                }
              }}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700/80 hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>+ Issue Refund / Pay Installment</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. FULL WIDTH PAYMENT SCHEDULE TABLE                           */}
      {/* ============================================================== */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        {/* Table Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Calendar size={16} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Payment Schedule
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Installment breakdown, due dates, and verified payment vouchers
              </p>
            </div>
          </div>

          {/* Bulk Actions Controls */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Bulk Action:</span>
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-hidden"
            >
              <option value="">Change to...</option>
              <option value="mark-paid">Mark as Paid</option>
              <option value="download-receipts">Download Receipts</option>
              <option value="send-reminder">Send Reminder</option>
            </select>
            <button
              type="button"
              onClick={handleApplyBulkAction}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Table Component */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedInstallments.length > 0 &&
                      selectedInstallments.length === studentData.installments.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="py-3 px-4 font-bold">Installment</th>
                <th className="py-3 px-4 font-bold">Due Date</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold">Mode</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {studentData.installments.map((inst) => (
                <tr
                  key={inst.id}
                  className={`hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors ${
                    inst.isOverdue ? "bg-rose-50/20 dark:bg-rose-950/10" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedInstallments.includes(inst.id)}
                      onChange={() => handleToggleSelect(inst.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {inst.title}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <span>{inst.dueDate}</span>
                      {inst.isOverdue && (
                        <span className="text-[10px] font-black text-rose-600 bg-rose-100 dark:bg-rose-950 px-1.5 py-0.2 rounded uppercase">
                          Overdue
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-black text-slate-900 dark:text-white tabular-nums">
                    ₹{inst.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                      {inst.mode}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {inst.status === "PAID" ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        PAID
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        UNPAID
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {inst.status === "PAID" ? (
                        <button
                          type="button"
                          onClick={() => handleOpenReceipt(inst)}
                          className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenPayModal(inst)}
                          className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer shadow-2xs"
                        >
                          Pay Now
                        </button>
                      )}
                      <button
                        type="button"
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 6. LOWER TWO-COLUMN SECTION: PERSONAL INFO & DOCUMENTS          */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT: Personal Information */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Personal Information
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
            >
              <Edit3 size={12} />
              <span>Edit Details</span>
            </button>
          </div>

          {/* Grid of details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <User size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Full Name</span>
                <strong className="text-slate-900 dark:text-white font-bold truncate block">
                  {studentData.fullName}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <Calendar size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Date of Birth</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.dob}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <User size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Gender</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.gender}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <Heart size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Marital Status</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.maritalStatus}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5 sm:col-span-2">
              <Mail size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Email</span>
                <strong className="text-slate-900 dark:text-white font-bold truncate block">
                  {studentData.email}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <Phone size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Mobile</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.mobile}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <Calendar size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Admission Date</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.admissionDate}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <Calendar size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Registration Date</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.registrationDate}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <Building size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Branch / Center</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.center}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <BookOpen size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Course</span>
                <strong className="text-slate-900 dark:text-white font-bold truncate block">
                  {studentData.course}
                </strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-2.5">
              <User size={15} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block">Faculty Lead</span>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  {studentData.facultyLead}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Student Documents */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <FileText size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Student Documents
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleTabChange("documents")}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3 Document Cards side by side */}
          <div className="grid grid-cols-3 gap-3">
            {studentDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setPreviewDoc(doc)}
                className="group p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer flex flex-col items-center text-center space-y-2"
              >
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src={doc.thumb}
                    alt={doc.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full">
                  <strong className="text-[11px] font-bold text-slate-900 dark:text-white truncate block">
                    {doc.title}
                  </strong>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center space-x-1 mt-0.5">
                    <Check size={10} className="stroke-[3]" />
                    <span>{doc.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 7. BOTTOM ROW: COURSE CHANGE HISTORY & QUICK ACTIONS           */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT (~60%): Course Change History */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <History size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Course Change History
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleTabChange("history")}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Timeline entry */}
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-blue-100 dark:bg-slate-800" />
            <div className="relative flex items-start space-x-3 text-xs">
              <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950" />
              <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 pt-0.5">
                01 Oct 2026
              </span>
              <div className="flex items-start space-x-2.5 bg-slate-50/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex-1">
                <FileText size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white font-bold block">
                    Upgraded: Masters Only (₹0.00) → Masters in Digital Marketing (₹90,000)
                  </strong>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Course upgraded by admin. Payment adjusted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (~40%): Quick Actions */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Zap size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Quick Actions
            </h3>
          </div>

          {/* 3 Quick Action Cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* Action 1: Download Fee Receipt (Solid Blue) */}
            <button
              type="button"
              onClick={() => handleOpenReceipt()}
              className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center text-center space-y-2 shadow-xs transition-all cursor-pointer active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Download size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-bold leading-tight">
                Download Fee Receipt
              </span>
            </button>

            {/* Action 2: Document Gallery */}
            <button
              type="button"
              onClick={() => handleTabChange("documents")}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs transition-all cursor-pointer active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Eye size={16} />
              </div>
              <span className="text-[11px] font-bold leading-tight">
                Document Gallery
              </span>
            </button>

            {/* Action 3: Download All Documents */}
            <button
              type="button"
              onClick={() => showToast("Preparing documents archive for download...")}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs transition-all cursor-pointer active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Download size={16} />
              </div>
              <span className="text-[11px] font-bold leading-tight">
                Download All Documents
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 8. ATTENDANCE SUB-TAB VIEW (WHEN ACTIVE)                       */}
      {/* ============================================================== */}
      {activeTab === "attendance" && (
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Classroom Attendance & Lecture Analytics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Attendance compliance tracked automatically via Operating Media CRM
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setAttendanceView("graph")}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  attendanceView === "graph"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
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
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                <Calendar size={13} />
                <span>Class Logs (8)</span>
              </button>
            </div>
          </div>

          {attendanceView === "graph" ? (
            <div className="pt-2">
              <AttendanceComparisonChart
                enrolledCourseTitle={studentData.course}
              />
            </div>
          ) : (
            <div className="space-y-2 pt-1">
              {(crmAttendance.logs || []).slice(0, 8).map((log, lIdx) => (
                <div
                  key={lIdx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        log.status === "PRESENT" ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {log.topic}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                        {log.date} • {log.batch_name || studentData.batch} • Faculty: {log.trainer_name || studentData.facultyLead}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`font-bold px-2.5 py-1 rounded text-xs ${
                      log.status === "PRESENT"
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                        : "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 9. MODALS                                                      */}
      {/* ============================================================== */}

      {/* Fee Receipt Modal */}
      <FeeReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => {
          setIsReceiptModalOpen(false);
          setReceiptInstallment(null);
        }}
        profile={{
          ...crmProfile,
          admissionNo: studentData.studentId,
          name: studentData.name,
          email: studentData.email,
          phone: studentData.mobile,
          course: studentData.course,
          branch: studentData.center,
          totalFees: studentData.totalFees,
          totalPaid: studentData.amountPaid,
          balanceDue: studentData.balanceDue,
          installments: studentData.installments,
        }}
      />

      {/* Pay Installment Modal */}
      {isPayModalOpen && activePayingInstallment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Pay Tuition Installment
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activePayingInstallment.title} • Operating Media LMS
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPayModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-1">
              <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold block">
                Amount Payable
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                ₹{activePayingInstallment.amount.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Due Date: {activePayingInstallment.dueDate}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {["upi", "bank", "card"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMethod(mode)}
                    className={`py-2 px-3 rounded-xl border text-center font-bold capitalize transition-all cursor-pointer ${
                      paymentMethod === mode
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {mode === "upi" ? "UPI / GPay" : mode === "bank" ? "Net Banking" : "Card"}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsPayModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs cursor-pointer flex items-center space-x-1.5"
              >
                <CheckCircle2 size={14} />
                <span>Confirm & Pay ₹{activePayingInstallment.amount.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Details Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Edit3 size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Edit Personal Information
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfileForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  defaultValue={studentData.fullName}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={studentData.email}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number
                  </label>
                  <input
                    name="mobile"
                    defaultValue={studentData.mobile}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    defaultValue={studentData.gender}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    defaultValue={studentData.maritalStatus}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs cursor-pointer flex items-center space-x-1.5"
                >
                  <Save size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Lightbox Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <FileCheck size={18} className="text-emerald-500" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {previewDoc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <img
                src={previewDoc.thumb}
                alt={previewDoc.title}
                className="max-h-72 object-contain rounded-lg shadow-xs"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Status: <strong className="text-emerald-600 font-bold">{previewDoc.status}</strong></span>
              <span>Doc Ref: {previewDoc.docNo}</span>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => showToast(`Downloaded ${previewDoc.title}`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Download size={14} />
                <span>Download Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
