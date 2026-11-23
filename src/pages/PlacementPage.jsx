import React, { useState, useEffect, useMemo } from "react";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";
import { useAuth } from "../context/AuthContext";
import { lmsService } from "../services/lmsService";
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Send,
  CheckCircle2,
  XCircle,
  FileText,
  ArrowUpRight,
  Search,
  Filter,
  Lock,
  Mail,
  Phone,
  User,
  GraduationCap,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Check,
  X
} from "lucide-react";

// Default fallback approved jobs if local storage has not populated yet
const DEFAULT_FALLBACK_JOBS = [
  {
    id: "job-101",
    positionTitle: "SEO & Content Marketing Executive",
    companyName: "Zenith Digital Media",
    requesterName: "Rahul Saxena",
    email: "hr@zenithmedia.in",
    department: "Search Engine Optimization (SEO)",
    positionType: "Full Time",
    salaryRange: "₹28,000 - ₹35,000 / month",
    location: "Andheri East, Mumbai",
    postingDate: "2026-11-18",
    jobDescription:
      "Looking for an energetic SEO executive to conduct on-page optimization, backlink auditing, Screaming Frog technical audits, and keyword ranking tracking.",
    requirements:
      "Operating Media Digital Marketing Diploma holder. Hands-on experience with GA4, GSC, Semrush, and WordPress.",
    status: "approved",
  },
  {
    id: "job-102",
    positionTitle: "Meta & Google Performance Marketing Specialist",
    companyName: "GrowthKite E-Commerce",
    requesterName: "Neha Kulkarni",
    email: "talent@growthkite.co",
    department: "Google Ads / Performance Marketing",
    positionType: "Full Time",
    salaryRange: "₹35,000 - ₹45,000 / month",
    location: "Bandra Kurla Complex (BKC), Mumbai",
    postingDate: "2026-11-19",
    jobDescription:
      "Scale high-budget e-commerce campaigns across Meta Ads Manager, Google Performance Max (PMax), and Google Search Ads. Analyze ROAS and CAC metrics.",
    requirements:
      "Proven live budget management experience. Strong analytical skills with GA4 funnel tracking and Tag Manager.",
    status: "approved",
  },
  {
    id: "job-103",
    positionTitle: "Social Media & Creative Brand Strategist",
    companyName: "SparkBrand Creative Agency",
    requesterName: "Kunal Deshmukh",
    email: "kunal@sparkbrand.agency",
    department: "Social Media Marketing",
    positionType: "Full Time",
    salaryRange: "₹25,000 - ₹32,000 / month",
    location: "Lower Parel, Mumbai",
    postingDate: "2026-11-20",
    jobDescription:
      "Lead creative campaigns, monthly social media content calendars, influencer outreach, and visual branding across Instagram, LinkedIn, and YouTube.",
    requirements:
      "Creative copywriter with Canva / Adobe designing proficiency. Hands-on experience with social media scheduling and analytics.",
    status: "approved",
  },
];

export const PlacementPage = () => {
  const { crmProfile, studentUser } = useAuth();

  // Active student identity identifiers
  const studentId = crmProfile?.id || studentUser?.crmAdmissionId || studentUser?.id || "s-1";
  const studentAdmissionNo = crmProfile?.admissionNo || studentUser?.admissionNo || "OMC-0382";
  const studentName = crmProfile?.fullName || crmProfile?.name || studentUser?.fullName || studentUser?.name || "Student Candidate";
  const studentEmail = crmProfile?.email || studentUser?.email || "student@example.com";
  const studentPhone = crmProfile?.phone || studentUser?.phone || "+91 98765 43210";
  const studentCourse = crmProfile?.course || studentUser?.course || "Master in Digital Marketing";

  // Clean numeric/alphanumeric student ID without any prefix
  const cleanId = useMemo(() => {
    return String(crmProfile?.id || studentUser?.crmAdmissionId || studentUser?.id || "267")
      .replace("std-", "")
      .replace("OMC-", "")
      .replace(/^0+/, "");
  }, [crmProfile?.id, studentUser?.crmAdmissionId, studentUser?.id]);

  // Tab State: "openings" vs "applications"
  const [activeTab, setActiveTab] = useState("openings");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  // Modal State for Applying
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [resumeLinkInput, setResumeLinkInput] = useState("");
  const [portfolioLinkInput, setPortfolioLinkInput] = useState("");
  const [coverNoteInput, setCoverNoteInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Live Sync trigger to re-read localStorage on storage events
  const [syncTick, setSyncTick] = useState(0);
  const [remoteJobAccess, setRemoteJobAccess] = useState([]);

  // Fetch remote cloud job permissions on mount and when student changes
  useEffect(() => {
    let isMounted = true;
    if (cleanId) {
      lmsService.fetchStudentJobAccess(cleanId).then((jobs) => {
        if (isMounted && Array.isArray(jobs) && jobs.length > 0) {
          setRemoteJobAccess(jobs);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [cleanId, syncTick]);

  useEffect(() => {
    const handleStorage = () => setSyncTick((prev) => prev + 1);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("om_crm_job_access_updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("om_crm_job_access_updated", handleStorage);
    };
  }, []);

  // 1. Check Student's Job Access Permission (from CRM Manage Access via local cache or remote sync)
  const studentJobAccess = useMemo(() => {
    try {
      const keysToCheck = [
        `om_lms_student_jobs_${studentId}`,
        `om_lms_student_jobs_${cleanId}`,
        `om_lms_student_jobs_std-${cleanId}`,
        studentAdmissionNo ? `om_lms_student_jobs_${studentAdmissionNo}` : null,
      ].filter(Boolean);

      for (const k of keysToCheck) {
        const cached = localStorage.getItem(k);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }

      // Check global access map
      const rawMap = localStorage.getItem("om_crm_student_job_access_map");
      if (rawMap) {
        const map = JSON.parse(rawMap);
        if (Array.isArray(map[studentId]) && map[studentId].length > 0) return map[studentId];
        if (Array.isArray(map[cleanId]) && map[cleanId].length > 0) return map[cleanId];
        if (studentAdmissionNo && Array.isArray(map[studentAdmissionNo]) && map[studentAdmissionNo].length > 0) {
          return map[studentAdmissionNo];
        }
      }
    } catch (e) {
      console.warn("Could not parse student job access permissions:", e);
    }

    if (remoteJobAccess && remoteJobAccess.length > 0) {
      return remoteJobAccess;
    }

    // Default: [] (Locked until administrator grants access from /lms-students)
    return [];
  }, [studentId, cleanId, studentAdmissionNo, syncTick, remoteJobAccess]);

  const hasAccess = studentJobAccess.length > 0;

  // 2. Load all live approved job postings
  const allApprovedJobs = useMemo(() => {
    try {
      const raw = localStorage.getItem("om_crm_job_postings");
      if (raw) {
        const parsed = JSON.parse(raw);
        const active = parsed.filter((j) => j.status !== "rejected");
        const map = new Map();
        DEFAULT_FALLBACK_JOBS.forEach((j) => map.set(j.id, j));
        active.forEach((j) => map.set(j.id, { ...j, status: "approved" }));
        return Array.from(map.values());
      }
    } catch {}
    return DEFAULT_FALLBACK_JOBS;
  }, [syncTick]);

  // 3. Filter jobs that this specific student is granted permission to see
  const accessibleJobs = useMemo(() => {
    if (!hasAccess) return [];
    const matched = allApprovedJobs.filter(
      (job) => studentJobAccess.includes(job.id) || studentJobAccess.includes("all")
    );
    return matched.length > 0 ? matched : allApprovedJobs;
  }, [allApprovedJobs, studentJobAccess, hasAccess]);

  // 4. Load all student applications
  const allApplications = useMemo(() => {
    try {
      const raw = localStorage.getItem("om_crm_student_job_applications");
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    return [];
  }, [syncTick]);

  // Filter applications submitted by this student
  const myApplications = useMemo(() => {
    return allApplications.filter(
      (app) =>
        app.studentAdmissionNo === studentAdmissionNo ||
        app.studentEmail === studentEmail ||
        app.studentId === studentId
    );
  }, [allApplications, studentAdmissionNo, studentEmail, studentId]);

  // Set of applied job IDs
  const appliedJobIds = useMemo(() => {
    return new Set(myApplications.map((app) => app.jobId));
  }, [myApplications]);

  // Departments list for filter
  const departments = useMemo(() => {
    const set = new Set();
    accessibleJobs.forEach((j) => {
      if (j.department) set.add(j.department);
    });
    return ["all", ...Array.from(set)];
  }, [accessibleJobs]);

  // Filtered Jobs based on search & department
  const filteredJobs = useMemo(() => {
    return accessibleJobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.positionTitle?.toLowerCase().includes(q) ||
        job.companyName?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.requirements?.toLowerCase().includes(q);

      const matchesDept = selectedDept === "all" || job.department === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [accessibleJobs, searchQuery, selectedDept]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Open Apply Modal
  const handleOpenApplyModal = (job) => {
    setApplyModalJob(job);
    // Pre-fill links if available from resume/portfolio builders
    const cachedResume = localStorage.getItem("om_lms_student_resume_url") || "";
    const cachedPortfolio = localStorage.getItem("om_lms_student_portfolio_url") || "";
    setResumeLinkInput(cachedResume);
    setPortfolioLinkInput(cachedPortfolio);
    setCoverNoteInput("");
  };

  // Submit Application
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!applyModalJob) return;

    if (!resumeLinkInput.trim()) {
      alert("Please provide your verified Resume URL (e.g. Google Drive, LinkedIn, or PDF link).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newApp = {
        id: `app-${Date.now()}`,
        studentId,
        studentName,
        studentAdmissionNo,
        studentEmail,
        studentPhone,
        batchName: studentCourse,
        jobId: applyModalJob.id,
        jobTitle: applyModalJob.positionTitle,
        companyName: applyModalJob.companyName,
        employerEmail: applyModalJob.email || "recruiter@company.com",
        appliedDate: new Date().toISOString().slice(0, 10),
        status: "pending",
        workflowTag: "Shortlisted",
        pushedToEmployer: false,
        resumeLink: resumeLinkInput.trim(),
        portfolioLink: portfolioLinkInput.trim() || undefined,
        coverNote: coverNoteInput.trim() || undefined,
      };

      try {
        const raw = localStorage.getItem("om_crm_student_job_applications");
        const existing = raw ? JSON.parse(raw) : [];
        const updated = [newApp, ...existing];
        localStorage.setItem("om_crm_student_job_applications", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Could not save application:", err);
      }

      setIsSubmitting(false);
      setApplyModalJob(null);
      showToast(`Application for ${applyModalJob.positionTitle} at ${applyModalJob.companyName} submitted successfully!`);
    }, 400);
  };

  const getWorkflowTagClass = (tag) => {
    switch (tag) {
      case "Shortlisted":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800";
      case "Interview scheduled":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800";
      case "Interview done":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      case "Offer given":
        return "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800";
      case "Job done / placed":
      case "Placed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      case "Not selected":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };

  return (
    <div className="font-jakarta space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl text-xs font-bold animate-fadeIn">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER BANNER (Standardized to match other student LMS pages) */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.placement}
        icon={Briefcase}
        metrics={[
          {
            value: hasAccess ? `${accessibleJobs.length} Active` : "Locked",
            label: "Open Vacancies",
            dotColor: hasAccess ? "bg-emerald-500" : "bg-amber-500",
          },
          {
            value: `${myApplications.length} Positions`,
            label: "Applied",
            dotColor: "bg-[#003873]",
          },
          {
            value: hasAccess ? "Placement Active" : "Access Restricted",
            label: "Status",
            dotColor: hasAccess ? "bg-blue-600" : "bg-slate-400",
          },
        ]}
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "openings" ? "applications" : "openings")}
              className="w-full sm:w-auto bg-[#003873] hover:bg-[#002855] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Briefcase size={14} />
              <span>{activeTab === "openings" ? `My Applications (${myApplications.length})` : `Available Jobs (${accessibleJobs.length})`}</span>
            </button>
          </div>
        }
      />

      {/* 2. ACCESS RESTRICTED GATE (If not granted access from LMS-Students) */}
      {!hasAccess ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
            <Lock size={32} />
          </div>

          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200/80 dark:border-amber-800 mb-3">
            Placement Portal Access Locked
          </span>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Placement Assistance Not Unlocked Yet
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-6 font-medium">
            Access to verified corporate openings is provisioned by the Operating Media placement coordinator once your core modules, resume validation, and faculty mock evaluations are approved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:placement@operatingmedia.com?subject=Request%20for%20Job%20Placement%20Portal%20Access"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003873] hover:bg-[#002855] text-white text-xs font-bold transition shadow-xs"
            >
              <Mail size={14} /> Contact Placement Coordinator
            </a>
            <a
              href="/resume-builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
            >
              <FileText size={14} /> Complete Resume First
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* 3. TAB SWITCHER STRIP (Centered & Compact matching Grievance / Exams) */}
          <div className="flex justify-center">
            <div className="bg-white dark:bg-[#0b1329] p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs w-full max-w-xl">
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    id: "openings",
                    label: "Available Openings",
                    icon: Briefcase,
                    badge: `${accessibleJobs.length} Jobs`,
                  },
                  {
                    id: "applications",
                    label: "My Applications",
                    icon: CheckCircle2,
                    badge: `${myApplications.length} Applied`,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#003873] text-white border-[#003873] shadow-sm"
                          : "bg-slate-50/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-[#003873]/40 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon
                          size={17}
                          className={isActive ? "text-white" : "text-[#003873] dark:text-sky-400"}
                        />
                        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide truncate">
                          {tab.label}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* TAB 1: AVAILABLE JOB OPENINGS */}
          {activeTab === "openings" && (
            <div className="space-y-4">
              {/* Search & Department Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-[#0b1329] p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="relative w-full sm:w-80">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by role, company, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#003873]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter size={14} className="text-slate-400 shrink-0" />
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
                  >
                    <option value="all">All Specializations ({accessibleJobs.length})</option>
                    {departments
                      .filter((d) => d !== "all")
                      .map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Jobs Grid */}
              {filteredJobs.length === 0 ? (
                <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center">
                  <Briefcase size={36} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    No Matching Job Openings Found
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Try clearing your search query or department filter.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredJobs.map((job) => {
                    const isApplied = appliedJobIds.has(job.id);
                    const appRecord = myApplications.find((a) => a.jobId === job.id);

                    return (
                      <div
                        key={job.id}
                        className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Company & Location Header */}
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#003873] dark:text-[#60a5fa] border border-blue-100 dark:border-blue-900 flex items-center justify-center shrink-0 font-bold">
                                <Building2 size={18} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                  {job.companyName}
                                </h4>
                                <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <MapPin size={10} /> {job.location || "Mumbai"}
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-900 shrink-0">
                              {job.positionType || "Full Time"}
                            </span>
                          </div>

                          {/* Position Title */}
                          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug mb-1">
                            {job.positionTitle}
                          </h3>

                          {/* Department & Salary */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            <span className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                              {job.department || "Digital Marketing"}
                            </span>
                            <span className="text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                              {job.salaryRange || "Competitive"}
                            </span>
                          </div>

                          {/* Description Snippet */}
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-3">
                            {job.jobDescription}
                          </p>

                          {/* Requirements Snippet */}
                          {job.requirements && (
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                              <strong>Key Skills:</strong> {job.requirements}
                            </div>
                          )}
                        </div>

                        {/* Action Footer */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-[10.5px] text-slate-400 flex items-center gap-1">
                            <Calendar size={11} /> Posted {job.postingDate || "Recently"}
                          </span>

                          {isApplied ? (
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getWorkflowTagClass(
                                  appRecord?.workflowTag || "Shortlisted"
                                )}`}
                              >
                                {appRecord?.workflowTag || "Applied"}
                              </span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenApplyModal(job)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#003873] hover:bg-[#002855] text-white text-xs font-bold transition shadow-xs"
                            >
                              <Send size={12} /> Apply Now
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY SUBMITTED APPLICATIONS */}
          {activeTab === "applications" && (
            <div className="space-y-4">
              {myApplications.length === 0 ? (
                <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center">
                  <CheckCircle2 size={36} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    No Applications Submitted Yet
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Browse the Available Openings tab to submit your candidature for live campus placements.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("openings")}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003873] text-white text-xs font-bold"
                  >
                    <Briefcase size={13} /> View Available Jobs
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#003873] dark:text-[#60a5fa] border border-blue-100 dark:border-blue-900 flex items-center justify-center shrink-0 font-bold">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                              {app.jobTitle}
                            </h4>
                            <span className="text-xs font-bold text-slate-500">
                              at {app.companyName}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar size={11} /> Applied: {app.appliedDate}
                            </span>
                            {app.pushedToEmployer ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                <CheckCircle2 size={11} /> Profile Pushed to Recruiter
                              </span>
                            ) : (
                              <span className="text-slate-400 flex items-center gap-1">
                                <Clock size={11} /> Application Under Review
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Stage & Credentials */}
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                        <div className="text-right">
                          <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-extrabold mb-1">
                            Current Stage
                          </span>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border inline-block ${getWorkflowTagClass(
                              app.workflowTag || "Shortlisted"
                            )}`}
                          >
                            {app.workflowTag || "Shortlisted"}
                          </span>
                        </div>

                        {app.resumeLink && (
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                            title="View Submitted Resume"
                          >
                            <FileText size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. APPLY FOR OPENING MODAL */}
          {applyModalJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
              <div
                className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#003873] text-white flex items-center justify-center shrink-0">
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                        Apply: {applyModalJob.positionTitle}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {applyModalJob.companyName} • {applyModalJob.location}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApplyModalJob(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Modal Form */}
                <form onSubmit={handleSubmitApplication} className="p-5 space-y-4">
                  {/* Candidate Readonly Summary */}
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 text-xs">
                    <div>
                      <span className="text-[10.5px] text-slate-400 block">Candidate Name:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{studentName}</strong>
                    </div>
                    <div>
                      <span className="text-[10.5px] text-slate-400 block">Roll / Admission No:</span>
                      <strong className="text-blue-600 dark:text-blue-400 font-mono">{studentAdmissionNo}</strong>
                    </div>
                    <div>
                      <span className="text-[10.5px] text-slate-400 block">Contact Phone:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{studentPhone}</strong>
                    </div>
                    <div>
                      <span className="text-[10.5px] text-slate-400 block">Student Email:</span>
                      <strong className="text-slate-800 dark:text-slate-200 truncate block">{studentEmail}</strong>
                    </div>
                  </div>

                  {/* Resume URL Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Resume / CV URL *</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-normal">
                        Google Drive / LinkedIn / Cloud link
                      </span>
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/file/d/..."
                      value={resumeLinkInput}
                      onChange={(e) => setResumeLinkInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#003873]"
                    />
                  </div>

                  {/* Portfolio URL Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Portfolio / Project URL (Optional)</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        GitHub / Behance / Live site
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://myportfolio.com or https://behance.net/..."
                      value={portfolioLinkInput}
                      onChange={(e) => setPortfolioLinkInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#003873]"
                    />
                  </div>

                  {/* Cover Note / Message to Employer */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Brief Note / Pitch to Recruiter (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Highlight relevant certifications, tool proficiency (GA4, GSC, Meta Ads), or previous project wins..."
                      value={coverNoteInput}
                      onChange={(e) => setCoverNoteInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#003873] resize-none"
                    />
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setApplyModalJob(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#003873] hover:bg-[#002855] text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
                    >
                      <Send size={13} />
                      <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlacementPage;
