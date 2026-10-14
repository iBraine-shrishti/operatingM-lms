import React, { useState, useEffect, useMemo, useRef } from "react";
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
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FeeReceiptModal } from "../components/crm/FeeReceiptModal";
import { AttendanceComparisonChart } from "../components/crm/AttendanceComparisonChart";
import { lmsService } from "../services/lmsService";
import { crmService } from "../services/crmService";

// Visual assets
import profilePic from "../assets/profile-pic.png";
import sahilProfilePic from "../assets/sahil-profile.png";
import premPhotoImg from "../assets/Prem_Photo.jpg";
import premAadharFrontImg from "../assets/Prem_Aadhar Front.jpg";
import premAadharBackImg from "../assets/Prem_Aadhar Back.jpg";
import dashboardHat from "../assets/header-bg/dashboard-hat.png";
import continueLearningLaptop from "../assets/continue-learning-laptop.png";
import docAadhaarImg from "../assets/doc-aadhaar.png";
import doc10thImg from "../assets/doc-10th.png";
import doc12thImg from "../assets/doc-12th.png";

// ==============================================================
// HIGH-FIDELITY DOCUMENT RENDERERS (ZOOMABLE & CRISP)
// ==============================================================
const AadhaarDocView = ({ studentData, sahilProfilePic, isCard = false }) => (
  <div
    className={`bg-white rounded-xl border border-slate-300 shadow-md select-none overflow-hidden flex flex-col justify-between font-sans transition-transform ${
      isCard
        ? "w-full h-full p-2.5 max-w-[320px]"
        : "w-full max-w-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-2xl"
    }`}
  >
    {/* Top Header */}
    <div>
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-xs mb-1" />
      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
        <div className="flex items-center space-x-1.5">
          <div
            className={`rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center font-serif font-black text-amber-800 ${
              isCard ? "w-4 h-4 text-[7px]" : "w-7 h-7 text-xs"
            }`}
          >
            🏛️
          </div>
          <div className="text-left">
            <span
              className={`font-black text-slate-800 tracking-tight block leading-tight ${
                isCard ? "text-[8px]" : "text-xs"
              }`}
            >
              भारत सरकार / Government of India
            </span>
            <span
              className={`text-slate-500 font-semibold block leading-tight ${
                isCard ? "text-[6.5px]" : "text-[10px]"
              }`}
            >
              भारतीय विशिष्ट पहचान प्राधिकरण / UIDAI
            </span>
          </div>
        </div>
        <div className={`text-right ${isCard ? "text-[7px]" : "text-[10px]"}`}>
          <span className="font-bold text-red-600 block">आधार</span>
          <span className="text-slate-500 text-[6px]">AADHAAR</span>
        </div>
      </div>
    </div>

    {/* Middle: Photo & Details */}
    <div className={`flex items-start gap-2.5 ${isCard ? "my-1" : "my-4 gap-4"}`}>
      <div
        className={`relative shrink-0 rounded-md overflow-hidden border border-slate-300 shadow-xs bg-slate-100 ${
          isCard ? "w-12 h-14" : "w-28 h-32"
        }`}
      >
        <img
          src={studentData?.avatar || sahilProfilePic}
          alt={studentData?.fullName || "Student Photo"}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute bottom-0 inset-x-0 bg-blue-600/90 text-white font-bold text-center ${
            isCard ? "text-[5px] py-0.2" : "text-[9px] py-0.5"
          }`}
        >
          UIDAI
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-0.5 text-left">
        <div>
          <span className={`text-slate-400 block ${isCard ? "text-[6.5px]" : "text-[10px]"}`}>
            नाम / Name:
          </span>
          <strong
            className={`font-black text-slate-900 block truncate ${
              isCard ? "text-[9.5px]" : "text-base"
            }`}
          >
            {studentData.fullName || "Sahil Nilesh Hasolkar"}
          </strong>
        </div>
        <div className={`text-slate-600 ${isCard ? "text-[7.5px]" : "text-xs"}`}>
          <span>DOB: </span>
          <strong className="text-slate-900 font-bold">
            {studentData.dob || "28/11/2006"}
          </strong>
        </div>
        <div className={`text-slate-600 ${isCard ? "text-[7.5px]" : "text-xs"}`}>
          <span>लिंग / Gender: </span>
          <strong className="text-slate-900 font-bold">
            {studentData.gender || "Male"}
          </strong>
        </div>
        {!isCard && (
          <div className="text-[11px] text-slate-600 pt-1 leading-snug">
            <span>Address: </span>
            <span className="text-slate-800 font-medium">
              {studentData.address
                ? `${studentData.address}, ${studentData.city || "Mumbai"}, ${studentData.state || "Maharashtra"} - ${studentData.pincode || "400092"}`
                : "Flat 402, Sai Shraddha Apt, Borivali West, Mumbai, Maharashtra - 400092"}
            </span>
          </div>
        )}
      </div>

      <div
        className={`shrink-0 border border-slate-200 rounded p-1 bg-white flex flex-col items-center justify-center ${
          isCard ? "w-11 h-13" : "w-24 h-28"
        }`}
      >
        <div className="grid grid-cols-4 gap-0.5 w-full h-full p-0.5 bg-slate-50 border border-slate-100">
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-200 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-200 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-200 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-200 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
          <div className="bg-slate-200 rounded-xs" />
          <div className="bg-slate-900 rounded-xs" />
        </div>
        <span
          className={`text-slate-400 font-bold uppercase mt-0.5 ${
            isCard ? "text-[4.5px]" : "text-[8px]"
          }`}
        >
          SECURE QR
        </span>
      </div>
    </div>

    {/* Bottom: Bold Number & Strip */}
    <div className="border-t border-slate-200 pt-1">
      <div
        className={`font-mono font-black text-center tracking-widest text-red-600 ${
          isCard ? "text-[11.5px]" : "text-xl py-1.5"
        }`}
      >
        XXXX&nbsp;&nbsp;XXXX&nbsp;&nbsp;8921
      </div>
      <div
        className={`flex items-center justify-between text-slate-500 font-medium ${
          isCard ? "text-[6px]" : "text-[10px]"
        }`}
      >
        <span>मेरा आधार, मेरी पहचान</span>
        <span>Help: 1947 • help@uidai.gov.in</span>
      </div>
    </div>
  </div>
);

const TenthMarksheetDocView = ({ studentData, isCard = false }) => (
  <div
    className={`bg-[#fffef8] rounded-xl border-2 border-red-900/80 shadow-md select-none overflow-hidden flex flex-col justify-between font-serif transition-transform ${
      isCard
        ? "w-full h-full p-2.5 max-w-[320px]"
        : "w-full max-w-3xl p-6 sm:p-8 border-4 border-red-900/80 shadow-2xl"
    }`}
  >
    <div className="text-center border-b border-red-900/30 pb-1">
      <span
        className={`font-black text-red-950 uppercase tracking-tight block ${
          isCard ? "text-[7.5px]" : "text-xs"
        }`}
      >
        MAHARASHTRA STATE BOARD OF SECONDARY & HIGHER SECONDARY EDUCATION
      </span>
      <span
        className={`font-bold text-red-800 tracking-wider block ${
          isCard ? "text-[6.5px]" : "text-[10px]"
        }`}
      >
        STATEMENT OF MARKS - S.S.C. EXAMINATION - MARCH 2022
      </span>
    </div>

    <div
      className={`grid grid-cols-3 gap-1 bg-white/80 rounded p-1 border border-red-900/20 font-sans text-left ${
        isCard ? "text-[6.5px] my-1" : "text-xs my-2.5 p-2"
      }`}
    >
      <div>
        <span className="text-slate-400 block text-[6px]">SEAT NO.</span>
        <strong className="text-slate-900 font-black">B084921</strong>
      </div>
      <div>
        <span className="text-slate-400 block text-[6px]">CANDIDATE NAME</span>
        <strong className="text-slate-900 font-black truncate block">
          {studentData.fullName ? studentData.fullName.toUpperCase() : "RAM BALBIR CHARAN"}
        </strong>
      </div>
      <div>
        <span className="text-slate-400 block text-[6px]">CENTER</span>
        <strong className="text-slate-900 font-black">
          {studentData.studentId ? studentData.studentId.replace("OMC-", "") : "0267"} ({studentData.center ? studentData.center.replace("Center", "").trim().toUpperCase() : "ANDHERI"})
        </strong>
      </div>
    </div>

    {isCard ? (
      <div className="bg-white/90 rounded border border-red-900/20 p-1.5 font-sans text-[6.5px] space-y-0.5 text-left">
        <div className="flex justify-between font-bold text-slate-800">
          <span>ENG: 86 | MATH: 88 | SCI: 85</span>
          <span className="text-emerald-700 font-black">PASS (84.67%)</span>
        </div>
        <div className="text-slate-500 text-[6px]">
          Total: 508 / 600 • First Class with Distinction
        </div>
      </div>
    ) : (
      <div className="bg-white rounded border border-red-900/30 font-sans text-xs overflow-hidden my-2">
        <table className="w-full text-left text-xs">
          <thead className="bg-red-950 text-white text-[10px]">
            <tr>
              <th className="p-1.5">SUB CODE & SUBJECT</th>
              <th className="p-1.5 text-center">MAX</th>
              <th className="p-1.5 text-center">MARKS OBTAINED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800 text-[11px]">
            <tr>
              <td className="p-1 font-semibold">01 MARATHI</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">082</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">02 HINDI</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">080</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">03 ENGLISH</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">086</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">71 MATHEMATICS</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">088</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">72 SCIENCE & TECHNOLOGY</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">085</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">73 SOCIAL SCIENCES</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">087</td>
            </tr>
          </tbody>
          <tfoot className="bg-amber-100/70 border-t border-red-900/30 font-bold text-[11px]">
            <tr>
              <td className="p-1.5">TOTAL / PERCENTAGE</td>
              <td className="p-1.5 text-center">600</td>
              <td className="p-1.5 text-center text-emerald-800 font-black">
                508 (84.67%) • PASS
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )}

    <div
      className={`flex items-center justify-between border-t border-red-900/20 pt-1 font-sans ${
        isCard ? "text-[6px]" : "text-[10px]"
      }`}
    >
      <span className="text-slate-600 font-semibold">Ref: MSBSHSE / SSC 2022</span>
      <span className="text-emerald-700 font-black bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-300">
        ✓ OFFICIALLY VERIFIED
      </span>
    </div>
  </div>
);

const TwelfthMarksheetDocView = ({ studentData, isCard = false }) => (
  <div
    className={`bg-[#fafffb] rounded-xl border-2 border-emerald-800/80 shadow-md select-none overflow-hidden flex flex-col justify-between font-serif transition-transform ${
      isCard
        ? "w-full h-full p-2.5 max-w-[320px]"
        : "w-full max-w-3xl p-6 sm:p-8 border-4 border-emerald-800/80 shadow-2xl"
    }`}
  >
    <div className="text-center border-b border-emerald-800/30 pb-1">
      <span
        className={`font-black text-emerald-950 uppercase tracking-tight block ${
          isCard ? "text-[7.5px]" : "text-xs"
        }`}
      >
        MAHARASHTRA STATE BOARD OF SECONDARY & HIGHER SECONDARY EDUCATION
      </span>
      <span
        className={`font-bold text-emerald-800 tracking-wider block ${
          isCard ? "text-[6.5px]" : "text-[10px]"
        }`}
      >
        HIGHER SECONDARY CERTIFICATE EXAMINATION - FEBRUARY 2024
      </span>
    </div>

    <div
      className={`grid grid-cols-3 gap-1 bg-white/80 rounded p-1 border border-emerald-800/20 font-sans text-left ${
        isCard ? "text-[6.5px] my-1" : "text-xs my-2.5 p-2"
      }`}
    >
      <div>
        <span className="text-slate-400 block text-[6px]">SEAT NO.</span>
        <strong className="text-slate-900 font-black">H049182</strong>
      </div>
      <div>
        <span className="text-slate-400 block text-[6px]">CANDIDATE NAME</span>
        <strong className="text-slate-900 font-black truncate block">
          {studentData.fullName ? studentData.fullName.toUpperCase() : "RAM BALBIR CHARAN"}
        </strong>
      </div>
      <div>
        <span className="text-slate-400 block text-[6px]">STREAM</span>
        <strong className="text-slate-900 font-black">COMMERCE</strong>
      </div>
    </div>

    {isCard ? (
      <div className="bg-white/90 rounded border border-emerald-800/20 p-1.5 font-sans text-[6.5px] space-y-0.5 text-left">
        <div className="flex justify-between font-bold text-slate-800">
          <span>BK: 86 | IT: 90 | ENG: 84</span>
          <span className="text-emerald-700 font-black">PASS (84.55%)</span>
        </div>
        <div className="text-slate-500 text-[6px]">
          Total: 465 / 550 • First Class with Distinction
        </div>
      </div>
    ) : (
      <div className="bg-white rounded border border-emerald-800/30 font-sans text-xs overflow-hidden my-2">
        <table className="w-full text-left text-xs">
          <thead className="bg-emerald-950 text-white text-[10px]">
            <tr>
              <th className="p-1.5">SUB CODE & SUBJECT</th>
              <th className="p-1.5 text-center">MAX</th>
              <th className="p-1.5 text-center">MARKS OBTAINED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800 text-[11px]">
            <tr>
              <td className="p-1 font-semibold">01 ENGLISH</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">084</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">49 BOOK KEEPING & ACCOUNTANCY</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">086</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">50 ECONOMICS</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">078</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">51 ORGANIZATION OF COMMERCE</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">082</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">97 INFORMATION TECHNOLOGY</td>
              <td className="p-1 text-center">100</td>
              <td className="p-1 text-center font-bold">090</td>
            </tr>
            <tr>
              <td className="p-1 font-semibold">31 ENVIRONMENTAL EDUCATION</td>
              <td className="p-1 text-center">050</td>
              <td className="p-1 text-center font-bold">045</td>
            </tr>
          </tbody>
          <tfoot className="bg-emerald-100/70 border-t border-emerald-800/30 font-bold text-[11px]">
            <tr>
              <td className="p-1.5">TOTAL / PERCENTAGE</td>
              <td className="p-1.5 text-center">550</td>
              <td className="p-1.5 text-center text-emerald-800 font-black">
                465 (84.55%) • FIRST CLASS
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )}

    <div
      className={`flex items-center justify-between border-t border-emerald-800/20 pt-1 font-sans ${
        isCard ? "text-[6px]" : "text-[10px]"
      }`}
    >
      <span className="text-slate-600 font-semibold">Ref: MSBSHSE / HSC 2024</span>
      <span className="text-emerald-700 font-black bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-300">
        ✓ OFFICIALLY VERIFIED
      </span>
    </div>
  </div>
);

const DocumentVisualizer = ({ doc, studentData, sahilProfilePic, isCard = false }) => {
  if (doc?.id === "aadhaar") {
    return <AadhaarDocView studentData={studentData} sahilProfilePic={sahilProfilePic} isCard={isCard} />;
  }
  if (doc?.id === "10th") {
    return <TenthMarksheetDocView studentData={studentData} isCard={isCard} />;
  }
  return <TwelfthMarksheetDocView studentData={studentData} isCard={isCard} />;
};

const mapStudentDataFromCrm = (crm, user) => {
  const source = crm || {};
  const rawId = source.id || user?.crmAdmissionId || user?.id || 267;
  const numOnly = String(rawId).replace(/[^0-9]/g, "") || "267";
  const numericId = `#${numOnly}`;
  const studentId = source.admissionNo || user?.admissionNo || `OMC-${numOnly.padStart(4, "0")}`;
  const name = source.name || user?.name || "Ram Charan";
  const fullName = source.fullName || user?.fullName || source.name || user?.name || "Ram Charan";
  const avatar = source.photo || source.avatar || user?.avatar || premPhotoImg;
  const course = source.course || user?.course || "Diploma in Digital Marketing";
  const isDiploma = course.toLowerCase().includes("diploma");
  const center = source.center || source.branch || user?.center || user?.branch || "Andheri Center";
  const batch = source.batchName || user?.batchName || `${course} (${isDiploma ? "DDM-A1" : "WD-M1"})`;

  const admissionDate = source.admissionDate || (source.submission_time ? crmService.formatDate(source.submission_time) : "09 Mar 2026");
  const registrationDate = source.registrationDate || (source.registration_date ? crmService.formatDate(source.registration_date) : admissionDate);
  const dob = source.dob || "25 Jun 1994";
  const gender = source.gender || "Male";
  const maritalStatus = source.maritalStatus || source.status || "Single";
  const email = source.email || user?.email || "ram@lmsoperatingmedia.org";
  const mobile = source.mobile || source.phone || user?.phone || "+91 73047 48384";
  const address = source.address || "Pawar Chawl Kadam wadi Marol Pipeline Andheri E";
  const city = source.city || "Mumbai";
  const state = source.state || "Maharashtra";
  const pincode = source.pincode || "400059";
  const country = source.country || "India";
  const facultyLead = source.facultyLead || "Harsh Pareek";
  const facultyLeadRole = source.facultyLeadRole || "Director & Lead Faculty";
  const courseDuration = source.courseDuration || (isDiploma ? "6 Months" : "12 Months");
  const courseStart = source.courseStart || admissionDate;
  const courseEnd = source.courseEnd || (isDiploma ? "09 Sep 2026" : "20 Apr 2027");
  const daysLeft = typeof source.daysLeft === "number" ? source.daysLeft : 147;
  const totalFees = typeof source.totalFees === "number" ? source.totalFees : 25000;
  const amountPaid = typeof source.totalPaid === "number" ? source.totalPaid : 2000;
  const balanceDue = typeof source.balanceDue === "number" ? source.balanceDue : Math.max(0, totalFees - amountPaid);
  const feesClearedPercent = typeof source.paidPercentage === "number" ? Math.round(source.paidPercentage) : (totalFees > 0 ? Math.round((amountPaid / totalFees) * 100) : 0);
  const paymentStatus = source.paymentStatus || (balanceDue <= 0 ? "Fully Cleared" : "Fees Pending");

  // Installments list from CRM
  let installments = source.installments;
  if (!Array.isArray(installments) || installments.length === 0) {
    installments = [
      {
        id: "inst-0",
        number: 0,
        title: "Registration Fee",
        dueDate: registrationDate,
        date: registrationDate,
        amount: source.regAmount || 2000,
        mode: "Registration",
        status: (source.regAmount || 2000) > 0 ? "PAID" : "UNPAID",
        isOverdue: false,
      },
      {
        id: "inst-1",
        number: 1,
        title: "Inst 1",
        dueDate: "09 Mar 2026",
        date: "09 Mar 2026",
        amount: 11500,
        mode: "Pending",
        status: "UNPAID",
        isOverdue: true,
      },
      {
        id: "inst-2",
        number: 2,
        title: "Inst 2",
        dueDate: "04 Apr 2026",
        date: "04 Apr 2026",
        amount: 11500,
        mode: "Pending",
        status: "UNPAID",
        isOverdue: true,
      },
    ];
  } else {
    installments = installments.map((inst, idx) => ({
      ...inst,
      id: inst.id || `inst-${inst.number ?? idx}`,
      dueDate: inst.dueDate || inst.date || "Scheduled",
      status: String(inst.status).toUpperCase() === "PAID" ? "PAID" : "UNPAID",
    }));
  }

  // Course History
  let courseHistory = source.courseChangeHistory;
  if (!courseHistory && source.courseHistoryRaw) {
    const rawLines = String(source.courseHistoryRaw).split("\n").filter((l) => l.trim());
    courseHistory = rawLines.map((line, idx) => {
      const parts = line.split(":");
      const date = parts[0]?.trim() || "Logged Date";
      const title = parts.slice(1).join(":").trim() || line;
      return {
        id: `ch-${idx}`,
        date,
        title,
        description: "Course transition recorded in Operating Media CRM.",
      };
    });
  }
  if (!courseHistory || courseHistory.length === 0) {
    courseHistory = [
      {
        id: "ch-0",
        date: admissionDate,
        title: `Enrolled in ${course}`,
        description: "Official student admission confirmed in Operating Media CRM records.",
      },
    ];
  }

  return {
    name,
    fullName,
    avatar,
    studentId,
    numericId,
    course,
    courseDesc: "Comprehensive program covering SEO, Social Media, Google Ads, Analytics and more.",
    center,
    batch,
    admissionDate,
    registrationDate,
    dob,
    gender,
    maritalStatus,
    email,
    mobile,
    address,
    city,
    state,
    pincode,
    country,
    facultyLead,
    facultyLeadRole,
    courseDuration,
    courseStart,
    courseEnd,
    daysLeft,
    progressPercentage: 65,
    totalFees,
    amountPaid,
    balanceDue,
    feesClearedPercent,
    paymentStatus,
    installments,
    courseHistory,
  };
};

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

  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef(null);

  // Keep search params in sync and smoothly scroll to the corresponding section
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current) {
      clearTimeout(programmaticScrollTimerRef.current);
    }
    programmaticScrollTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 700);

    if (tab === "overview") {
      setSearchParams({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSearchParams({ tab });
      const targetMap = {
        attendance: "section-attendance-fees",
        personal: "section-personal-info",
        documents: "section-documents",
        history: "section-course-history",
      };
      const elemId = targetMap[tab];
      if (elemId) {
        const el = document.getElementById(elemId);
        if (el) {
          const yOffset = -70;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  // Scroll to section when tab query parameter is provided on mount or route update
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== "overview") {
      const targetMap = {
        attendance: "section-attendance-fees",
        details: "section-personal-info",
        personal: "section-personal-info",
        documents: "section-documents",
        history: "section-course-history",
      };
      const elemId = targetMap[tabParam];
      if (elemId) {
        const timer = setTimeout(() => {
          const el = document.getElementById(elemId);
          if (el) {
            const yOffset = -70;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  // Synchronize active tab highlight based on current scroll position
  useEffect(() => {
    const sections = [
      { id: "section-overview", tab: "overview" },
      { id: "section-attendance-fees", tab: "attendance" },
      { id: "section-personal-info", tab: "personal" },
      { id: "section-documents", tab: "documents" },
      { id: "section-course-history", tab: "history" },
    ];

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      // Bottom of page check - activate last section
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (atBottom) {
        setActiveTab("history");
        return;
      }

      const targetY = 140;

      // 1. Check Course History
      const histEl = document.getElementById("section-course-history");
      if (histEl && histEl.getBoundingClientRect().top <= targetY) {
        setActiveTab("history");
        return;
      }

      // 2. Check 2-column row: Personal Info & Documents
      const personalEl = document.getElementById("section-personal-info");
      const docsEl = document.getElementById("section-documents");
      const pTop = personalEl ? personalEl.getBoundingClientRect().top : 9999;
      const dTop = docsEl ? docsEl.getBoundingClientRect().top : 9999;
      const rowTop = Math.min(pTop, dTop);

      if (rowTop <= targetY) {
        setActiveTab((prev) => (prev === "documents" ? "documents" : "personal"));
        return;
      }

      // 3. Check Attendance & Fees
      const attEl = document.getElementById("section-attendance-fees");
      if (attEl && attEl.getBoundingClientRect().top <= targetY) {
        setActiveTab("attendance");
        return;
      }

      setActiveTab("overview");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Student Profile State (dynamically populated from CRM with real student credentials)
  const [studentData, setStudentData] = useState(() => mapStudentDataFromCrm(crmProfile, currentUser));

  // Reactive synchronization whenever crmProfile or currentUser changes
  useEffect(() => {
    if (crmProfile || currentUser) {
      setStudentData((prev) => {
        const next = mapStudentDataFromCrm(crmProfile, currentUser);
        return {
          ...prev,
          ...next,
          ...(prev?.isLocallyEdited
            ? {
                fullName: prev.fullName,
                name: prev.name,
                email: prev.email,
                mobile: prev.mobile,
                dob: prev.dob,
                gender: prev.gender,
                maritalStatus: prev.maritalStatus,
                address: prev.address,
                city: prev.city,
                state: prev.state,
                pincode: prev.pincode,
              }
            : {}),
        };
      });
    }
  }, [crmProfile, currentUser]);

  // Attendance sub-view state
  const [attendanceView, setAttendanceView] = useState("graph"); // 'graph' | 'logs'

  // Modals state
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptInstallment, setReceiptInstallment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [docZoomLevel, setDocZoomLevel] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Document Lightbox Modal with zoom reset
  const handleOpenDocPreview = (doc) => {
    setPreviewDoc(doc);
    setDocZoomLevel(1);
  };

  // Zoom handlers for modal
  const handleZoomIn = () => setDocZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setDocZoomLevel((z) => Math.max(0.75, +(z - 0.25).toFixed(2)));
  const handleResetZoom = () => setDocZoomLevel(1);

  // Respective course id for "View Course Details" navigation
  const respectiveCourseId = useMemo(() => {
    try {
      const courses = lmsService.getCourses();
      const courseTitle = (studentData.course || "").toLowerCase();
      const matched = courses.find(
        (c) =>
          c.title.toLowerCase() === courseTitle ||
          courseTitle.includes(c.title.toLowerCase()) ||
          c.title.toLowerCase().includes(courseTitle) ||
          (c.description && c.description.toLowerCase().includes("masters")) ||
          (c.overview?.greeting && c.overview.greeting.toLowerCase().includes("masters"))
      );
      return matched ? matched.id : "course-3";
    } catch {
      return "course-3";
    }
  }, [studentData.course]);





  // Only display the Action column if there are actionable items in the table
  const hasInstallmentActions = useMemo(() => {
    return studentData.installments?.some((inst) => Boolean(inst.action));
  }, [studentData.installments]);

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
      address: formData.get("address") || studentData.address,
      city: formData.get("city") || studentData.city,
      state: formData.get("state") || studentData.state,
      pincode: formData.get("pincode") || studentData.pincode,
    };
    setStudentData((prev) => ({
      ...prev,
      ...updated,
      name: updated.fullName,
      isLocallyEdited: true,
    }));
    updateCurrentUser({
      name: updated.fullName,
      email: updated.email,
    });
    setIsEditModalOpen(false);
    showToast("Student details updated successfully!");
  };

  // Document item list (Actual student verified records)
  const studentDocuments = [
    {
      id: "doc-photo",
      title: "Student Photo",
      type: "Passport Photograph",
      status: "Verified",
      image: studentData.avatar || premPhotoImg,
      fullImage: studentData.avatar || premPhotoImg,
      uploadedOn: studentData.admissionDate || "09 Mar 2026",
      docNo: `${studentData.studentId}-PHOTO`,
      desc: "Official Student Identity Photograph",
    },
    {
      id: "doc-aadhar-front",
      title: "Aadhaar Card (Front)",
      type: "UIDAI Official ID",
      status: "Verified",
      image: crmProfile?.aadharFront || premAadharFrontImg,
      fullImage: crmProfile?.aadharFront || premAadharFrontImg,
      uploadedOn: studentData.admissionDate || "09 Mar 2026",
      docNo: "9218 7859 8578",
      desc: "UIDAI Government Aadhaar • Front Side",
    },
    {
      id: "doc-aadhar-back",
      title: "Aadhaar Card (Back)",
      type: "UIDAI Address Record",
      status: "Verified",
      image: crmProfile?.aadharBack || premAadharBackImg,
      fullImage: crmProfile?.aadharBack || premAadharBackImg,
      uploadedOn: studentData.admissionDate || "09 Mar 2026",
      docNo: "9218 7859 8578",
      desc: "UIDAI Government Aadhaar • Back Side (Address)",
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
                  src={studentData.avatar || premPhotoImg}
                  alt={studentData.name}
                  className="w-full h-full object-cover object-top rounded-xl"
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
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto sticky top-0 bg-slate-50/90 dark:bg-[#070d1e]/90 backdrop-blur-md z-20 pt-2 -mt-2">
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
      <div id="section-overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 scroll-mt-20">
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
                onClick={() => navigate(`/courses/${respectiveCourseId}`)}
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
            {studentData.balanceDue > 0 && (() => {
              const pendingInst = (studentData.installments || []).find(
                (i) => i.amount > 0 && String(i.status).toUpperCase() !== "PAID"
              );
              const instTitle = pendingInst?.title || "Installment 1";
              const instAmount = pendingInst?.amount ? `₹${pendingInst.amount.toLocaleString()}` : `₹${studentData.balanceDue.toLocaleString()}`;
              const instDate = pendingInst?.dueDate || pendingInst?.date || studentData.nextDueDate || "Scheduled Date";
              const isOverdue = pendingInst?.isOverdue ?? true;

              return (
                <div className="mt-3.5 p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 flex items-start space-x-2.5 text-xs text-rose-800 dark:text-rose-300">
                  <AlertCircle size={15} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold block">Tuition Fees Pending: ₹{studentData.balanceDue.toLocaleString()} Due</span>
                    <span className="text-rose-700/80 dark:text-rose-400/80 text-[11px] block">
                      {pendingInst
                        ? `${instTitle} of ${instAmount} is ${isOverdue ? "Overdue since" : "due on"} ${instDate}. Please complete the transaction to avoid interruption.`
                        : `Please complete the transaction of ₹${studentData.balanceDue.toLocaleString()} to avoid interruption.`}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Fee Account Status Strip */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Account Status:
            </span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                studentData.balanceDue <= 0
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
              }`}
            >
              {studentData.balanceDue <= 0 ? "Fully Cleared ✓" : studentData.paymentStatus || "Fees Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. ATTENDANCE & FEES (PAYMENT SCHEDULE & CLASSROOM ANALYTICS)  */}
      {/* ============================================================== */}
      <div id="section-attendance-fees" className="space-y-5 scroll-mt-20">
        <div
          className={`bg-white dark:bg-[#0b1329] rounded-2xl shadow-xs overflow-hidden transition-all duration-500 ${
            activeTab === "attendance"
              ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
              : "border border-slate-200/80 dark:border-slate-800"
          }`}
        >
        {/* Table Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Calendar size={16} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Payment Schedule
                </h3>
                {activeTab === "attendance" && (
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800 animate-in fade-in duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                    <span>Active Section</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Installment breakdown, due dates, and verified payment vouchers
              </p>
            </div>
          </div>
        </div>

        {/* Table Component */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-bold">Installment</th>
                <th className="py-3 px-4 font-bold">Due Date</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold">Mode</th>
                <th className="py-3 px-4 font-bold">Status</th>
                {hasInstallmentActions && (
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                )}
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
                      <button
                        type="button"
                        onClick={() => handleOpenReceipt(inst)}
                        className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer"
                        title="Click to view verified official receipt"
                      >
                        <span>PAID</span>
                        <Check size={11} className="stroke-[3]" />
                      </button>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        UNPAID
                      </span>
                    )}
                  </td>
                  {hasInstallmentActions && (
                    <td className="py-3 px-4 text-right">
                      {inst.action ? (
                        <button
                          type="button"
                          onClick={() => inst.onAction && inst.onAction()}
                          className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          {inst.action}
                        </button>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 font-medium text-xs px-2">
                          —
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classroom Attendance & Lecture Analytics */}
      <div
        className={`bg-white dark:bg-[#0b1329] rounded-2xl p-6 shadow-xs space-y-5 transition-all duration-500 ${
          activeTab === "attendance"
            ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
            : "border border-slate-200/90 dark:border-slate-800"
        }`}
      >
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
    </div>

      {/* ============================================================== */}
      {/* 6. LOWER TWO-COLUMN SECTION: PERSONAL INFO & DOCUMENTS          */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT: Personal Information */}
        <div
          id="section-personal-info"
          className={`bg-white dark:bg-[#0b1329] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-500 scroll-mt-20 ${
            activeTab === "personal"
              ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
              : "border border-slate-200/80 dark:border-slate-800"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <User size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              {activeTab === "personal" && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800 animate-in fade-in duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <span>Active Section</span>
                </span>
              )}
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-800">
                Student Details
              </span>
            </div>
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

          {/* Address Details Section */}
          <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Address Details
                </h4>
              </div>
              <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 px-2 py-0.5 rounded-full">
                <Check size={10} className="stroke-[3]" />
                <span>Verified via Aadhaar</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Residential / Permanent Address
                  </span>
                  <strong className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm leading-relaxed block mt-0.5">
                    {studentData.address}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">City</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold block truncate">
                    {studentData.city}
                  </strong>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">State</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold block truncate">
                    {studentData.state}
                  </strong>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Pincode</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold block truncate">
                    {studentData.pincode}
                  </strong>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Country</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold block truncate">
                    {studentData.country || "India"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Student Documents */}
        <div
          id="section-documents"
          className={`bg-white dark:bg-[#0b1329] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-500 scroll-mt-20 flex flex-col justify-start ${
            activeTab === "documents"
              ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
              : "border border-slate-200/80 dark:border-slate-800"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center space-x-2">
              <FileText size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Student Documents
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              {activeTab === "documents" && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800 animate-in fade-in duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <span>Active Section</span>
                </span>
              )}
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 px-2.5 py-1 rounded-full">
                <Check size={11} className="stroke-[3]" />
                <span>3 Verified Documents</span>
              </span>
            </div>
          </div>

          {/* Identity & Verification Status Record Strip */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 shrink-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  UIDAI & KYC Verification Record
                </h4>
              </div>
              <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 px-2 py-0.5 rounded-full">
                <Check size={10} className="stroke-[3]" />
                <span>100% Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 block font-medium">Aadhaar No.</span>
                <strong className="text-slate-800 dark:text-slate-200 font-mono font-bold block truncate">
                  9218 7859 8578
                </strong>
              </div>
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 block font-medium">Doc Proof</span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold block truncate">
                  Govt UIDAI Card
                </strong>
              </div>
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 block font-medium">Verified On</span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold block truncate">
                  {studentData.admissionDate || "09 Mar 2026"}
                </strong>
              </div>
            </div>
          </div>

          {/* Responsive Document Cards: 3 on desktop -> 2-1 on medium -> 1-1-1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 flex-1">
            {studentDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleOpenDocPreview(doc)}
                className="group p-2.5 sm:p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 h-full sm:last:col-span-2 sm:last:max-w-[calc(50%-0.5rem)] sm:last:mx-auto xl:last:max-w-none xl:last:col-span-1 w-full"
              >
                {/* Clear original uncropped document image preview container */}
                <div className="w-full flex-1 min-h-[240px] sm:min-h-[270px] rounded-xl bg-slate-950 dark:bg-black border border-slate-800/80 p-2 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-all">
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-full max-h-[320px] object-contain rounded-lg drop-shadow-sm transform group-hover:scale-[1.02] transition-transform duration-300"
                  />

                  {/* Top-right HD badge */}
                  <span className="absolute top-2 right-2 z-10 text-[9px] sm:text-[10px] font-bold bg-white/95 dark:bg-slate-900/95 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded shadow-2xs border border-blue-200/60 dark:border-blue-800 flex items-center space-x-1 backdrop-blur-xs">
                    <ZoomIn size={10} />
                    <span>Original Doc</span>
                  </span>

                  {/* Hover zoom & inspect overlay */}
                  <div className="absolute inset-0 z-20 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <span className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center space-x-1.5 transform group-hover:scale-105 transition-transform">
                      <Maximize2 size={12} />
                      <span>Zoom View</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-0.5">
                  <strong className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                    {doc.title}
                  </strong>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono font-medium truncate block">
                    {doc.docNo}
                  </span>
                </div>

                {/* Footer status & quick download */}
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                    <Check size={11} className="stroke-[3]" />
                    <span>{doc.status}</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const ext = (doc.image || "").endsWith(".png") ? "png" : "jpg";
                      const link = document.createElement("a");
                      link.href = doc.image;
                      link.download = `${doc.title}.${ext}`;
                      link.click();
                      showToast(`Downloading official copy: ${doc.title}`);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Download Copy"
                  >
                    <Download size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 8. BOTTOM ROW: COURSE CHANGE HISTORY & QUICK ACTIONS           */}
      {/* ============================================================== */}
      <div id="section-course-history" className="grid grid-cols-1 lg:grid-cols-12 gap-5 scroll-mt-20">
        {/* LEFT (~60%): Course Change History */}
        <div
          className={`lg:col-span-7 bg-white dark:bg-[#0b1329] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-500 ${
            activeTab === "history"
              ? "border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
              : "border border-slate-200/80 dark:border-slate-800"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <History size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Course Change History
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              {activeTab === "history" && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800 animate-in fade-in duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <span>Active Section</span>
                </span>
              )}
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-800">
                {(studentData.courseHistory || []).length} Logged {(studentData.courseHistory || []).length === 1 ? "Event" : "Events"}
              </span>
            </div>
          </div>

          {/* Timeline entry */}
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-blue-100 dark:bg-slate-800" />
            {(studentData.courseHistory || []).map((ev, idx) => (
              <div key={ev.id || idx} className="relative flex items-start space-x-3 text-xs">
                <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950" />
                <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 pt-0.5 min-w-[75px]">
                  {ev.date}
                </span>
                <div className="flex items-start space-x-2.5 bg-slate-50/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex-1">
                  <FileText size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block">
                      {ev.title}
                    </strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                      {ev.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT (~40%): Quick Actions */}
        <div
          className={`lg:col-span-5 bg-white dark:bg-[#0b1329] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-500 ${
            activeTab === "history"
              ? "border-2 border-blue-500/80 dark:border-blue-500/80 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10"
              : "border border-slate-200/80 dark:border-slate-800"
          }`}
        >
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

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Residential Address
                </label>
                <input
                  name="address"
                  defaultValue={studentData.address}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    defaultValue={studentData.city}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    State
                  </label>
                  <input
                    name="state"
                    defaultValue={studentData.state}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    defaultValue={studentData.pincode}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:border-blue-500"
                  />
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

      {/* Document Lightbox Modal - Expansive H x W with Interactive Zoom */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl w-[96vw] max-w-6xl h-[92vh] max-h-[920px] border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <FileCheck size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate">
                      {previewDoc.title}
                    </h3>
                    <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <Check size={11} className="stroke-[3]" />
                      <span>Verified</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {studentData.fullName} • Ref: {previewDoc.docNo}
                  </p>
                </div>
              </div>

              {/* Center / Right Toolbar Controls */}
              <div className="flex items-center space-x-2 shrink-0">
                {/* Zoom Controls */}
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={docZoomLevel <= 0.75}
                    className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 cursor-pointer transition-colors"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-2.5 py-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
                    title="Click to reset zoom (100%)"
                  >
                    {Math.round(docZoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={docZoomLevel >= 2.5}
                    className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 cursor-pointer transition-colors"
                    title="Zoom In (+)"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setPreviewDoc(null);
                    setDocZoomLevel(1);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-1"
                  title="Close Modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Expansive Canvas (renders the CLEAR High-Resolution Original Image) */}
            <div className="flex-1 min-h-0 w-full overflow-auto bg-slate-950 p-4 sm:p-8 flex items-center justify-center relative">
              <div
                className="transition-transform duration-150 ease-out flex items-center justify-center my-auto"
                style={{
                  transform: `scale(${docZoomLevel})`,
                  transformOrigin: "center center",
                }}
              >
                <img
                  src={previewDoc.image}
                  alt={previewDoc.title}
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 sm:px-6 sm:py-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white dark:bg-[#0b1329]">
              <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center space-x-1.5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                  <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Authenticated & Verified</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Uploaded on {previewDoc.uploadedOn}
                </span>
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewDoc(null);
                    setDocZoomLevel(1);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const ext = (previewDoc.image || "").endsWith(".png") ? "png" : "jpg";
                    const link = document.createElement("a");
                    link.href = previewDoc.image;
                    link.download = `${previewDoc.title}.${ext}`;
                    link.click();
                    showToast(`Downloaded official copy: ${previewDoc.title}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Download size={14} />
                  <span>Download Official Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
