import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Info
} from "lucide-react";
import { useAuth, ADMIN_USER, STUDENT_USER } from "../context/AuthContext";
import logo from "../assets/logo.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState("ADMIN");
  const [email, setEmail] = useState("admin@operatingmedia.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [adminImgFailed, setAdminImgFailed] = useState(false);
  const [studentImgFailed, setStudentImgFailed] = useState(false);

  // Accounts configuration
  const validAdminEmails = ["admin@operatingmedia.com", "vishal.c@operatingmedia.com"];
  const validStudentEmails = ["student@operatingmedia.com", "aarav.patel@operatingmedia.com"];
  const validPasswords = ["password123", "admin123", "student123"];

  // Handle clicking role card
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setError("");
    if (role === "ADMIN") {
      setEmail("admin@operatingmedia.com");
      setPassword("password123");
    } else {
      setEmail("student@operatingmedia.com");
      setPassword("password123");
    }
  };

  // Auto-detect role when typing email
  const handleEmailChange = (val) => {
    setEmail(val);
    if (error) setError("");

    const lower = val.toLowerCase().trim();
    if (validStudentEmails.includes(lower) || lower.startsWith("student") || lower.startsWith("aarav")) {
      setSelectedRole("STUDENT");
    } else if (validAdminEmails.includes(lower) || lower.startsWith("admin") || lower.startsWith("vishal")) {
      setSelectedRole("ADMIN");
    }
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    if (error) setError("");
  };

  // Perform login validation
  const performLogin = (targetRole) => {
    login(targetRole);
    navigate("/dashboard");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    // 1. Check empty email
    if (!trimmedEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    // 2. Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g., name@operatingmedia.com).");
      return;
    }

    // 3. Check empty password
    if (!trimmedPass) {
      setError("Please enter your account password.");
      return;
    }

    // 4. Validate credentials
    const isAdminAccount = validAdminEmails.includes(trimmedEmail);
    const isStudentAccount = validStudentEmails.includes(trimmedEmail);

    if (isAdminAccount) {
      if (trimmedPass === "password123" || trimmedPass === "admin123") {
        performLogin("ADMIN");
        return;
      } else {
        setError("Incorrect password for Administrator account. Demo password is: password123");
        return;
      }
    }

    if (isStudentAccount) {
      if (trimmedPass === "password123" || trimmedPass === "student123") {
        performLogin("STUDENT");
        return;
      } else {
        setError("Incorrect password for Student account. Demo password is: password123");
        return;
      }
    }

    // Unrecognized email
    setError("Unrecognized account credentials. Please use one of the demo accounts or click a role card above.");
  };

  // Direct 1-click login helper
  const handleQuickLogin = (role) => {
    handleSelectRole(role);
    performLogin(role);
  };

  // Trigger error simulation for visual inspection
  const handleSimulateError = () => {
    setError("Demo Error: Invalid email or password. Please verify your credentials or select an account card.");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-lg w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center py-1">
            <img
              src={logo}
              alt="Operating Media"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                // Fallback to text badge if image fails
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
            Operating Media LMS
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Enterprise Management Portal & Student Learning Platform
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl p-3.5 flex items-start space-x-2.5">
            <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError("")}
              className="text-rose-500 hover:text-rose-700 text-xs font-bold px-1"
              title="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Account Role Selector Cards */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Demo Account
            </label>
            <span className="text-xs text-slate-400">Click to auto-fill</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Admin User Card */}
            <div
              id="admin-role-card"
              onClick={() => handleSelectRole("ADMIN")}
              className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all relative flex flex-col justify-between ${
                selectedRole === "ADMIN"
                  ? "border-slate-900 bg-slate-50/80 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start space-x-3">
                {!adminImgFailed ? (
                  <img
                    src={ADMIN_USER.avatar}
                    alt={ADMIN_USER.name}
                    onError={() => setAdminImgFailed(true)}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    VC
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck size={14} className="text-slate-700 shrink-0" />
                    <span className="text-xs font-bold text-slate-900 truncate">
                      Admin Portal
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">
                    {ADMIN_USER.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    admin@operatingmedia.com
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-md">
                  Administrator
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickLogin("ADMIN");
                    }}
                    className="text-[11px] font-bold text-slate-900 hover:underline bg-white border border-slate-300 px-2 py-0.5 rounded-md hover:bg-slate-50 transition-colors"
                    title="1-Click Login as Admin"
                  >
                    1-Click
                  </button>
                  {selectedRole === "ADMIN" && (
                    <CheckCircle2 size={16} className="text-slate-900 shrink-0" />
                  )}
                </div>
              </div>
            </div>

            {/* Student User Card */}
            <div
              id="student-role-card"
              onClick={() => handleSelectRole("STUDENT")}
              className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all relative flex flex-col justify-between ${
                selectedRole === "STUDENT"
                  ? "border-slate-900 bg-slate-50/80 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start space-x-3">
                {!studentImgFailed ? (
                  <img
                    src={STUDENT_USER.avatar}
                    alt={STUDENT_USER.name}
                    onError={() => setStudentImgFailed(true)}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    AP
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1.5">
                    <GraduationCap size={14} className="text-slate-700 shrink-0" />
                    <span className="text-xs font-bold text-slate-900 truncate">
                      Student Hub
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">
                    {STUDENT_USER.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    student@operatingmedia.com
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-md">
                  Student Learner
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickLogin("STUDENT");
                    }}
                    className="text-[11px] font-bold text-slate-900 hover:underline bg-white border border-slate-300 px-2 py-0.5 rounded-md hover:bg-slate-50 transition-colors"
                    title="1-Click Login as Student"
                  >
                    1-Click
                  </button>
                  {selectedRole === "STUDENT" && (
                    <CheckCircle2 size={16} className="text-slate-900 shrink-0" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="login-email-input"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="name@operatingmedia.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <span className="text-xs text-slate-400">Demo password: password123</span>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="login-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center space-x-2"
          >
            <span>
              Sign In to {selectedRole === "ADMIN" ? "Admin Portal" : "Student Hub"}
            </span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Helper Controls */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <Info size={13} className="text-slate-400" />
            <span>Need to see error handling?</span>
          </div>
          <button
            id="preview-error-btn"
            type="button"
            onClick={handleSimulateError}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline hover:no-underline"
          >
            Preview Error Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
