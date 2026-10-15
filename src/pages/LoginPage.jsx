import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  ArrowRight,
  GraduationCap,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  BookOpen,
  Save,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { crmService } from "../services/crmService";
import logo from "../assets/logo.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, switchCrmStudent, updateCurrentUser } = useAuth();

  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("om_lms_saved_email") || "";
    } catch {
      return "";
    }
  });

  const [password, setPassword] = useState(() => {
    try {
      return localStorage.getItem("om_lms_saved_password") || "";
    } catch {
      return "";
    }
  });

  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem("om_lms_remember_me") === "true";
    } catch {
      return false;
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveToast, setSaveToast] = useState("");

  const handleSaveCredentials = (e) => {
    e?.preventDefault();
    const trimmedLogin = email.trim();
    const trimmedPass = password.trim();

    if (!trimmedLogin) {
      setError("Please enter your student email or login ID to save.");
      return;
    }

    try {
      localStorage.setItem("om_lms_saved_email", trimmedLogin);
      if (trimmedPass) {
        localStorage.setItem("om_lms_saved_password", trimmedPass);
      }
      localStorage.setItem("om_lms_remember_me", "true");
      setRememberMe(true);
      setError("");
      setSaveToast("Login details saved on this device!");
      setTimeout(() => setSaveToast(""), 3500);
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedLogin = email.trim();
    const trimmedPass = password.trim();

    if (!trimmedLogin) {
      setError("Please enter your registered student email or login ID.");
      return;
    }

    if (!trimmedPass) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const student = await crmService.studentLogin(trimmedLogin, trimmedPass);
      if (student) {
        try {
          if (rememberMe) {
            localStorage.setItem("om_lms_saved_email", trimmedLogin);
            localStorage.setItem("om_lms_saved_password", trimmedPass);
            localStorage.setItem("om_lms_remember_me", "true");
          } else {
            localStorage.removeItem("om_lms_saved_email");
            localStorage.removeItem("om_lms_saved_password");
            localStorage.setItem("om_lms_remember_me", "false");
          }
        } catch (storageErr) {
          console.warn("Failed saving rememberMe state", storageErr);
        }

        login("STUDENT");
        if (updateCurrentUser) {
          updateCurrentUser({
            id: `std-${student.id}`,
            crmAdmissionId: student.id,
            admissionNo: student.admissionNo,
            name: student.name,
            fullName: student.fullName || student.name,
            email: student.email,
            course: student.course,
            branch: student.branch,
            center: student.center,
            designation: student.designation,
            avatar: student.photo || undefined,
          });
        }
        if (student.id) {
          await switchCrmStudent(student.id);
        }
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      if (
        err.message &&
        !err.message.includes("fetch") &&
        !err.message.includes("token") &&
        !err.message.includes("JSON") &&
        !err.message.includes("<")
      ) {
        setError(err.message);
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(false);
    setError(
      "Invalid student credentials. Please verify your email / login ID and password."
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* ============================================================== */}
      {/* 1. SEAMLESS REPEATING STUDENT MATERIAL VECTOR WALLPAPER        */}
      {/* ============================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.20] text-blue-700"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="student-learning-pattern"
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            {/* 1. Graduation Mortarboard Cap */}
            <g transform="translate(25, 20) scale(0.85)">
              <polygon
                points="45 15 85 30 45 45 5 30"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 36v18c0 8 10 14 23 14s23-6 23-14V36"
                fill="currentColor"
                fillOpacity="0.06"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M78 33v28" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="78" cy="63" r="2.5" fill="currentColor" />
            </g>

            {/* 2. Open Study Book with Ribbon Bookmark */}
            <g transform="translate(180, 18) scale(0.8)">
              <path
                d="M15 55c15-8 32-8 45 0 15-8 32-8 45 0v-40c-15-8-32-8-45 0-15-8-32-8-45 0z"
                fill="currentColor"
                fillOpacity="0.08"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M60 15v40" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M25 24c8-4 18-4 25 0M25 33c8-4 18-4 25 0M25 42c8-4 18-4 25 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M70 24c8-4 18-4 25 0M70 33c8-4 18-4 25 0M70 42c8-4 18-4 25 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>

            {/* 3. Learning Laptop with Video Player & Bar Chart */}
            <g transform="translate(20, 125) scale(0.78)">
              <rect
                x="15"
                y="10"
                width="80"
                height="50"
                rx="4"
                fill="currentColor"
                fillOpacity="0.07"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5 60h100l-6 6H11z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle
                cx="35"
                cy="32"
                r="10"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <polygon
                points="33 28 40 32 33 36"
                fill="currentColor"
              />
              <path
                d="M62 44v-8M72 44v-14M82 44v-20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* 4. Diploma Certificate with Seal & Ribbon */}
            <g transform="translate(195, 120) scale(0.8)">
              <rect
                x="12"
                y="10"
                width="72"
                height="52"
                rx="3"
                fill="currentColor"
                fillOpacity="0.08"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="22"
                y1="22"
                x2="60"
                y2="22"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <line
                x1="22"
                y1="30"
                x2="74"
                y2="30"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <line
                x1="22"
                y1="38"
                x2="52"
                y2="38"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <circle
                cx="66"
                cy="46"
                r="9"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M62 53l-3 10 7-3 7 3-3-10"
                fill="currentColor"
                fillOpacity="0.25"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>

            {/* 5. Stacked Books & Pencil */}
            <g transform="translate(25, 230) scale(0.78)">
              <path
                d="M12 25l50-10 14 4-50 10z"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M12 25v8l50-10v-8z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M10 40l54-8 14 4-54 8z"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M10 40v8l54-8v-8z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M8 55l58-6 14 4-58 6z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M8 55v8l58-6v-8z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              {/* Crossed pencil */}
              <path
                d="M75 18l20-20 6 6-20 20z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <polygon points="75 18 73 24 79 22" fill="currentColor" />
            </g>

            {/* 6. Achievement Medal with Star */}
            <g transform="translate(195, 225) scale(0.8)">
              <circle
                cx="38"
                cy="32"
                r="18"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="38"
                cy="32"
                r="13"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <polygon
                points="38 24 40 30 46 30 42 33 43 39 38 36 33 39 34 33 30 30 36 30"
                fill="currentColor"
                fillOpacity="0.3"
              />
              <path
                d="M28 48l-6 20 12-5 8 5-4-20"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </g>

            {/* 7. Lightbulb for Ideas */}
            <g transform="translate(125, 75) scale(0.7)">
              <path
                d="M20 28a12 12 0 1 1 18 0c-3 3-4 5-4 9h-10c0-4-1-6-4-9z"
                fill="currentColor"
                fillOpacity="0.12"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M24 40h10M26 44h6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <line
                x1="29"
                y1="3"
                x2="29"
                y2="7"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="10"
                x2="14"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <line
                x1="47"
                y1="10"
                x2="44"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>

            {/* 8. Study Coffee / Mug */}
            <g transform="translate(125, 235) scale(0.7)">
              <path
                d="M15 18h26v22a8 8 0 0 1-8 8h-10a8 8 0 0 1-8-8z"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M41 24h6a5 5 0 0 1 0 10h-6"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M22 10c0-3 3-3 3-6M31 10c0-3 3-3 3-6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeDasharray="2 2"
                strokeLinecap="round"
              />
            </g>

            {/* Subtle Sparkle stars */}
            <path
              d="M155 170l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            <path
              d="M295 40l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z"
              fill="currentColor"
              fillOpacity="0.25"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#student-learning-pattern)"
        />
      </svg>

      {/* ============================================================== */}
      {/* 2. AMBIENT PASTEL GLOW ORBS (LIGHT, FRESH & AIRY)              */}
      {/* ============================================================== */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-blue-200/40 via-sky-100/35 to-transparent rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/35 via-blue-100/30 to-transparent rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-amber-100/25 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.16] pointer-events-none" />

      {/* ============================================================== */}
      {/* 3. CENTERED MODERN LOGIN CARD (CLEAN, AIRY & ELEGANT)          */}
      {/* ============================================================== */}
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-blue-900/10 p-7 sm:p-9 max-w-md w-full space-y-6 relative z-10 transition-all duration-300">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          {/* Logo */}
          <div className="flex justify-center py-1">
            <img
              src={logo}
              alt="Operating Media"
              className="h-11 sm:h-12 w-auto object-contain transition-transform hover:scale-102"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Student Learning Portal Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold shadow-2xs">
            <GraduationCap size={14} className="text-blue-600" />
            <span>Student Learning Portal</span>
          </div>

          <div className="pt-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Sign in with your registered student credentials
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl p-3.5 flex items-start space-x-2.5 animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={17} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError("")}
              className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer transition-colors"
              title="Dismiss error"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Save Confirmation Toast Alert */}
        {saveToast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl p-3 flex items-center space-x-2.5 animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span className="flex-1">{saveToast}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email / Login ID Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Student Email or LMS Login ID
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. ram@lmsoperatingmedia.org or OMC-0267"
                autoComplete="username"
                className="w-full bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                LMS Password
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                Issued upon admission
              </span>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your LMS password"
                autoComplete="current-password"
                className="w-full bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Save Credentials Action Row */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer select-none text-slate-600 hover:text-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
              />
              <span className="font-semibold text-slate-600">
                Remember on this device
              </span>
            </label>

            <button
              type="button"
              onClick={handleSaveCredentials}
              className="inline-flex items-center space-x-1.5 font-bold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200/70 transition-colors cursor-pointer"
              title="Save credentials on this device"
            >
              <Save size={13} />
              <span>Save Details</span>
            </button>
          </div>

          {/* Submit Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2 transform active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying Student Account...</span>
              </>
            ) : (
              <>
                <span>Sign In to Student Portal</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Verification Link & Help Desk */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5 text-center">
          <div>
            <button
              type="button"
              onClick={() => navigate("/verify-certificate")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer inline-flex items-center space-x-1"
            >
              <BookOpen size={13} />
              <span>Verify an Operating Media Certificate</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-center space-x-1 font-medium">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>Operating Media LMS • Official Student Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
