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
} from "lucide-react";
import { useAuth, STUDENT_USER } from "../context/AuthContext";
import { crmService } from "../services/crmService";
import logo from "../assets/logo.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, switchCrmStudent, updateCurrentUser } = useAuth();

  const [email, setEmail] = useState("student@operatingmedia.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [studentImgFailed, setStudentImgFailed] = useState(false);

  const validStudentEmails = [
    "student@operatingmedia.com",
    "hasolkarsahil@gmail.com",
    "aarav.patel@operatingmedia.com",
  ];
  const validPasswords = ["password123", "student123", "admin123"];

  const handleQuickFill = () => {
    setEmail("student@operatingmedia.com");
    setPassword("password123");
    setError("");
  };

  const handle1ClickLogin = () => {
    login("STUDENT");
    navigate("/dashboard");
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

    try {
      // 1. Authenticate with real CRM student credentials
      const student = await crmService.studentLogin(trimmedLogin, trimmedPass);
      if (student) {
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
      if (err.message && !err.message.includes("fetch") && !err.message.includes("token") && !err.message.includes("JSON") && !err.message.includes("<")) {
        setError(err.message);
        return;
      }
    }

    // 2. Demo fallback credentials
    const lower = trimmedLogin.toLowerCase();
    const isValidEmail =
      validStudentEmails.includes(lower) ||
      lower.includes("student") ||
      lower.includes("sahil");

    const isValidPassword = validPasswords.includes(trimmedPass);

    if (isValidEmail && isValidPassword) {
      login("STUDENT");
      navigate("/dashboard");
      return;
    }

    setError("Invalid student credentials. Please verify your email and password.");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060b18] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center py-1">
            <img
              src={logo}
              alt="Operating Media"
              className="h-12 w-auto object-contain dark:brightness-110"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 text-xs font-semibold">
            <GraduationCap size={14} />
            <span>Student Learning Portal</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome Back, Student
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Access your courses, lecture videos, quizzes & certificates
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs font-semibold rounded-xl p-3.5 flex items-start space-x-2.5">
            <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError("")}
              className="text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-200 p-1 cursor-pointer"
              title="Dismiss error"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Student Account Quick-fill Card */}
        <div
          onClick={handleQuickFill}
          className="cursor-pointer rounded-2xl p-4 border-2 border-blue-600/30 dark:border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-500 transition-all flex flex-col justify-between"
        >
          <div className="flex items-start space-x-3">
            {!studentImgFailed ? (
              <img
                src={STUDENT_USER.avatar}
                alt={STUDENT_USER.name}
                onError={() => setStudentImgFailed(true)}
                className="w-11 h-11 rounded-xl object-cover ring-1 ring-blue-300 dark:ring-blue-700 shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                SH
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {STUDENT_USER.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded-md">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                student@operatingmedia.com
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                Masters in Digital Marketing • Batch WD-M1
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Demo Student Account
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handle1ClickLogin();
              }}
              className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center space-x-1"
            >
              <span>1-Click Sign In</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Student Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="student@operatingmedia.com"
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Default: password123
              </span>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Sign In to Student Portal</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Verification Link */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            type="button"
            onClick={() => navigate("/verify-certificate")}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center space-x-1"
          >
            <BookOpen size={13} />
            <span>Verify an Operating Media Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
