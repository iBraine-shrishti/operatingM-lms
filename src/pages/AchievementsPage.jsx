import React, { useState, useMemo } from "react";
import {
  Award,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Eye,
  Search,
  Laptop,
  Code,
  BarChart3,
  Lightbulb,
  Target,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { CertificateViewerModal } from "../components/crm/CertificateViewerModal";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

// Official 3D Shield Badge Images
import badgeGold from "../assets/badge-type-gold.png";
import badgeGreen from "../assets/badge-type-green.png";
import badgePurple from "../assets/badge-type-purple.png";
import badgeBlue from "../assets/badge-type-blue.png";

/**
 * 3D Faceted Hexagonal Gemstone Icon for Milestone Badges
 * Matches the exact 3D gemstone aesthetic in milestone.png
 */
const HexMilestoneIcon = ({ type, color = "green" }) => {
  const colorMap = {
    green: {
      from: "#10b981",
      to: "#047857",
      glow: "rgba(16, 185, 129, 0.45)",
      stroke: "#6ee7b7",
    },
    blue: {
      from: "#2563eb",
      to: "#1d4ed8",
      glow: "rgba(37, 99, 235, 0.45)",
      stroke: "#93c5fd",
    },
    purple: {
      from: "#a855f7",
      to: "#6d28d9",
      glow: "rgba(168, 85, 247, 0.45)",
      stroke: "#d8b4fe",
    },
    orange: {
      from: "#f97316",
      to: "#c2410c",
      glow: "rgba(249, 115, 22, 0.45)",
      stroke: "#fdba74",
    },
    slate: {
      from: "#475569",
      to: "#1e293b",
      glow: "rgba(71, 85, 105, 0.2)",
      stroke: "#94a3b8",
    },
  };

  const c = colorMap[color] || colorMap.green;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center w-11 h-12"
      style={{
        filter: `drop-shadow(0 4px 10px ${c.glow})`,
      }}
    >
      <svg
        width="44"
        height="48"
        viewBox="0 0 44 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:scale-105 duration-200"
      >
        <defs>
          <linearGradient
            id={`hex-grad-${color}-${type}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={c.from} />
            <stop offset="100%" stopColor={c.to} />
          </linearGradient>
        </defs>
        {/* Main Hexagon Body */}
        <polygon
          points="22,2 41,12 41,36 22,46 3,36 3,12"
          fill={`url(#hex-grad-${color}-${type})`}
          stroke={c.stroke}
          strokeWidth="1.2"
        />
        {/* 3D Facet Bevels */}
        <polygon points="22,2 41,12 22,24" fill="rgba(255, 255, 255, 0.28)" />
        <polygon points="3,12 22,2 22,24" fill="rgba(255, 255, 255, 0.16)" />
        <polygon points="3,12 3,36 22,24" fill="rgba(0, 0, 0, 0.15)" />
        <polygon points="41,12 41,36 22,24" fill="rgba(0, 0, 0, 0.08)" />
        <polygon points="3,36 22,46 22,24" fill="rgba(0, 0, 0, 0.25)" />
        <polygon points="41,36 22,46 22,24" fill="rgba(0, 0, 0, 0.18)" />
      </svg>
      {/* Centered White Icon */}
      <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none drop-shadow-xs">
        {type === "laptop" && <Laptop size={17} strokeWidth={2.4} />}
        {type === "code" && <Code size={17} strokeWidth={2.6} />}
        {type === "chart" && <BarChart3 size={17} strokeWidth={2.4} />}
        {type === "bulb" && <Lightbulb size={17} strokeWidth={2.4} />}
        {type === "target" && <Target size={17} strokeWidth={2.4} />}
      </div>
    </div>
  );
};

// ============================================================================
// BASE DATA FOR EXAM CERTIFICATES (EXACT MATCH FOR course-comp-achieve.png)
// User requirement: WHERE EVER STUDENT COMPLETES AN EXAM WILL GET A CERTIFICATE {NOT FOR COURSES}
// ============================================================================
const BASE_EXAM_CERTIFICATES = [
  {
    id: "OMC-132929482",
    certificate_id: "OMC-132929482",
    course: "Diploma in Digital Marketing & AI",
    category: "DIPLOMA PROGRAM",
    date: "Feb 10, 2026",
    rating: 9.8,
    grade: "A+ Distinction",
    badgeType: "gold",
    badgeImg: badgeGold,
    badgeTitle: "GOLD HONOR",
    shortDetail: "Technical SEO, AI bidding, GA4 & client",
    unlocked: true,
    categoryBadgeColor:
      "border-blue-200/90 bg-blue-50/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80",
    gradeBadgeColor:
      "border-amber-200/90 bg-amber-50/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80",
    glowClass:
      "from-white via-white to-blue-50/50 dark:from-[#0b1329] dark:to-blue-950/20 hover:border-blue-300/80",
  },
  {
    id: "OMC-132929483",
    certificate_id: "OMC-132929483",
    course: "Advanced SEO Masterclass",
    category: "SPECIALIZED TRACK",
    date: "Jan 15, 2026",
    rating: 9.6,
    grade: "Honors with Distinction",
    badgeType: "green",
    badgeImg: badgeGreen,
    badgeTitle: "SEO SPECIALIST",
    shortDetail: "On-page schema, Core Web Vitals & audits",
    unlocked: true,
    categoryBadgeColor:
      "border-emerald-200/90 bg-emerald-50/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/80",
    gradeBadgeColor:
      "border-amber-200/90 bg-amber-50/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80",
    glowClass:
      "from-white via-white to-emerald-50/50 dark:from-[#0b1329] dark:to-emerald-950/20 hover:border-emerald-300/80",
  },
  {
    id: "OMC-132929484",
    certificate_id: "OMC-132929484",
    course: "WordPress & Performance Web Dev",
    category: "CORE TRACK",
    date: "Dec 20, 2025",
    rating: 9.5,
    grade: "Certified Specialist",
    badgeType: "purple",
    badgeImg: badgePurple,
    badgeTitle: "WEB DEV",
    shortDetail: "Elementor Pro, speed caching & WooCommerce",
    unlocked: true,
    categoryBadgeColor:
      "border-purple-200/90 bg-purple-50/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700/80",
    gradeBadgeColor:
      "border-purple-200/90 bg-purple-50/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700/80",
    glowClass:
      "from-white via-white to-purple-50/50 dark:from-[#0b1329] dark:to-purple-950/20 hover:border-purple-300/80",
  },
  {
    id: "OMC-132929485",
    certificate_id: "OMC-132929485",
    course: "Social Media & Creative Ads",
    category: "CREATIVE TRACK",
    date: "Nov 18, 2025",
    rating: 9.7,
    grade: "Distinction Award",
    badgeType: "blue",
    badgeImg: badgeBlue,
    badgeTitle: "TOP PERFORMER",
    shortDetail: "Instagram Reels, Linkedin & performance ads",
    unlocked: true,
    categoryBadgeColor:
      "border-blue-200/90 bg-blue-50/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80",
    gradeBadgeColor:
      "border-cyan-200/90 bg-cyan-50/80 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-700/80",
    glowClass:
      "from-white via-white to-cyan-50/50 dark:from-[#0b1329] dark:to-cyan-950/20 hover:border-cyan-300/80",
  },
];

// ============================================================================
// BASE DATA FOR MILESTONES (EXACT MATCH FOR milestone.png)
// User requirement: IN MILESTONES WILL GET FOR (STREAKS, QUIZ COMPLETED, CONTIOUS ASSIGNMENT STREAK)
// ============================================================================
const BASE_MILESTONES = [
  {
    id: "mile-streak-7",
    category: "streak",
    title: "SEO Specialist",
    displayMilestone: "7-Day Study Streak",
    description: "100% course completed & technical audit passed",
    date: "Sep 12, 2026",
    status: "COMPLETED",
    iconType: "laptop",
    color: "green",
    badgeClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700",
    glowClass:
      "from-white via-white to-emerald-50/50 dark:from-[#0b1329] dark:to-emerald-950/30 border-emerald-200/90 dark:border-emerald-800/80",
  },
  {
    id: "mile-assign-streak",
    category: "assignment_streak",
    title: "WordPress Developer",
    displayMilestone: "Continuous Assignment Streak",
    description: "Built & deployed 3 client sites with Elementor",
    date: "Aug 28, 2026",
    status: "IN PROGRESS",
    iconType: "code",
    color: "blue",
    badgeClass:
      "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
    glowClass:
      "from-white via-white to-blue-50/50 dark:from-[#0b1329] dark:to-blue-950/30 border-blue-200/90 dark:border-blue-800/80",
  },
  {
    id: "mile-quiz-completed",
    category: "quiz_completed",
    title: "GA4 Master Certified",
    displayMilestone: "Quiz Completed Mastery",
    description: "Scored 90%+ on GA4 conversion tracking exam",
    date: "Sep 01, 2026",
    status: "EARNED",
    iconType: "chart",
    color: "purple",
    badgeClass:
      "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-700",
    glowClass:
      "from-white via-white to-purple-50/50 dark:from-[#0b1329] dark:to-purple-950/30 border-purple-200/90 dark:border-purple-800/80",
  },
  {
    id: "mile-streak-30",
    category: "streak",
    title: "Design Innovator",
    displayMilestone: "30-Day Super Streak",
    description: "Top Figma design system in Creative Essentials",
    date: "Jul 19, 2026",
    status: "EARNED",
    iconType: "bulb",
    color: "orange",
    badgeClass:
      "bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200 dark:border-orange-700",
    glowClass:
      "from-white via-white to-orange-50/50 dark:from-[#0b1329] dark:to-orange-950/30 border-orange-200/90 dark:border-orange-800/80",
  },
  {
    id: "mile-mastery",
    category: "assignment_streak",
    title: "Digital Marketing Strategist",
    displayMilestone: "Continuous Master Streak",
    description: "Complete all 6 masterclasses tracks to unlock",
    date: "Target Milestone",
    status: "LOCKED",
    iconType: "target",
    color: "slate",
    badgeClass:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
    glowClass:
      "from-white via-white to-slate-50/60 dark:from-[#0b1329] dark:to-slate-900/40 border-slate-200/80 dark:border-slate-800/80 opacity-90",
  },
];

export const AchievementsPage = () => {
  const { currentUser } = useAuth();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'exams', 'milestones'
  const [searchQuery, setSearchQuery] = useState("");
  const [milestoneOffset, setMilestoneOffset] = useState(0);

  // Dynamic exam certificates: combine default verified certificates with newly passed exams
  const [examCertificates] = useState(() => {
    try {
      const savedRaw = localStorage.getItem("om_lms_exam_certificates");
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (Array.isArray(saved) && saved.length > 0) {
          const ids = new Set(saved.map((s) => s.certificate_id));
          const remainingBase = BASE_EXAM_CERTIFICATES.filter(
            (b) => !ids.has(b.certificate_id)
          );
          return [...saved, ...remainingBase];
        }
      }
    } catch {}
    return BASE_EXAM_CERTIFICATES;
  });

  const milestones = BASE_MILESTONES;

  const handleOpenCertificate = (cert) => {
    setSelectedCert(cert);
    setIsCertModalOpen(true);
  };

  // Filtered lists based on search & active tab
  const filteredExams = useMemo(() => {
    if (activeFilter === "milestones") return [];
    return examCertificates.filter(
      (b) =>
        b.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.certificate_id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeFilter, searchQuery, examCertificates]);

  const filteredMilestones = useMemo(() => {
    if (activeFilter === "exams") return [];
    return milestones.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeFilter, searchQuery, milestones]);

  const totalCredentials = examCertificates.length + milestones.length;
  const totalEarned =
    examCertificates.filter((e) => e.unlocked).length +
    milestones.filter((m) => m.status === "COMPLETED" || m.status === "EARNED")
      .length;

  const handlePrevMilestone = () => {
    setMilestoneOffset((prev) => Math.max(0, prev - 1));
  };

  const handleNextMilestone = () => {
    setMilestoneOffset((prev) =>
      Math.min(Math.max(0, milestones.length - 5), prev + 1)
    );
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO BANNER - STANDARDIZED WITH STUDENTPAGEHEADER      */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.achievements}
        metrics={[
          {
            value: examCertificates.length,
            label: "Exam Certificates",
            dotColor: "bg-blue-600",
          },
          {
            value: milestones.length,
            label: "Milestone Badges",
            dotColor: "bg-amber-500",
          },
          {
            value: `${totalEarned} / ${totalCredentials}`,
            label: "Earned",
            dotColor: "bg-emerald-500",
          },
          {
            value: "100%",
            label: "Verified Credentials",
            dotColor: "bg-purple-500",
          },
        ]}
      />

      {/* ------------------------------------------------------------- */}
      {/* FILTER TABS & SEARCH BAR                                      */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-2 sm:p-2.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "all"
                ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Credentials ({totalCredentials})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("exams")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "exams"
                ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Exam Certificates ({examCertificates.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("milestones")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "milestones"
                ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Milestone Badges ({milestones.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certificates & milestones..."
            className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-blue-500 shadow-2xs"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. EXAM COMPLETION CERTIFICATES (EXACT MATCH: course-comp-achieve.png) */}
      {/* User requirement: WHERE EVER STUDENT COMPLETES AN EXAM WILL GET A CERTIFICATE */}
      {/* ============================================================== */}
      {filteredExams.length > 0 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4">
          {/* Section Header Matching UI Reference */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <Award size={18} />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                <span>Course Completion Batches</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                  ({filteredExams.length})
                </span>
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Verified CRM Certificates
            </span>
          </div>

          {/* 4 Cards Grid - Exact Layout from Screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredExams.map((cert) => (
              <div
                key={cert.id}
                onClick={() => handleOpenCertificate(cert)}
                className={`rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3 group relative overflow-hidden cursor-pointer bg-gradient-to-br ${cert.glowClass}`}
              >
                {/* Upper Content: Badges, Title, Subtitle */}
                <div className="space-y-2">
                  {/* Top Badges Row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border shrink-0 ${cert.categoryBadgeColor}`}
                    >
                      {cert.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${cert.gradeBadgeColor}`}
                    >
                      {cert.grade}
                    </span>
                  </div>

                  {/* Course / Exam Title */}
                  <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-[14.5px] leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.course}
                  </h3>

                  {/* Short 1-line detail */}
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                    {cert.shortDetail}
                  </p>
                </div>

                {/* Bottom Row: Left Info + Right Shield Badge */}
                <div className="flex items-end justify-between pt-1 gap-2">
                  {/* Left Column: ID & Date, View Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                      <Calendar size={13} className="text-blue-500 shrink-0" />
                      <span className="truncate">
                        {cert.certificate_id} • {cert.date}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCertificate(cert);
                      }}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>View Details</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Right Column: Hexagonal 3D Shield Badge with Text Below */}
                  <div className="shrink-0 flex flex-col items-center justify-center">
                    <img
                      src={cert.badgeImg}
                      alt={cert.badgeTitle}
                      className="w-11 h-13 sm:w-12 sm:h-14 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-[9px] font-black uppercase text-slate-900 dark:text-slate-100 tracking-wider mt-1 text-center whitespace-nowrap">
                      {cert.badgeTitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. CURRICULUM MILESTONE BADGES (EXACT MATCH: milestone.png)     */}
      {/* User requirement: IN MILESTONES WILL GET FOR (STREAKS, QUIZ COMPLETED, CONTIOUS ASSIGNMENT STREAK) */}
      {/* ============================================================== */}
      {filteredMilestones.length > 0 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4">
          {/* Header Matching UI Reference */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs shrink-0">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 leading-tight">
                  <span>Curriculum Milestone Badges</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                    ({filteredMilestones.length})
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Complete milestones and earn badges for your progress
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveFilter("milestones")}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <span>→</span>
            </button>
          </div>

          {/* Carousel Row with Left & Right Arrows */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            {/* Left Carousel Arrow */}
            <button
              type="button"
              onClick={handlePrevMilestone}
              disabled={milestoneOffset === 0}
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous Milestones"
            >
              <ChevronLeft size={16} />
            </button>

            {/* 5 Milestone Cards Row */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
              {filteredMilestones
                .slice(milestoneOffset, milestoneOffset + 5)
                .map((ach) => (
                  <div
                    key={ach.id}
                    className={`rounded-2xl p-4 sm:p-4.5 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between min-h-[178px] group relative overflow-hidden bg-gradient-to-br ${ach.glowClass}`}
                  >
                    {/* Top Row: 3D Hexagon Gem Icon on Left, Status Pill on Right */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <HexMilestoneIcon type={ach.iconType} color={ach.color} />

                      {/* Pill Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shrink-0 inline-flex items-center gap-1 ${ach.badgeClass}`}
                      >
                        {ach.status === "COMPLETED" && <span>COMPLETED</span>}
                        {ach.status === "IN PROGRESS" && (
                          <span>IN PROGRESS</span>
                        )}
                        {ach.status === "EARNED" && (
                          <>
                            <Sparkles size={10} className="shrink-0" />
                            <span>EARNED</span>
                          </>
                        )}
                        {ach.status === "LOCKED" && (
                          <>
                            <Lock size={9} className="shrink-0" />
                            <span>LOCKED</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Middle: Title & 1-line Description */}
                    <div className="space-y-1">
                      <h3 className="font-black text-slate-900 dark:text-white text-xs sm:text-[13.5px] leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {ach.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>

                    {/* Bottom: Date or Target Milestone with Calendar/Lock Icon */}
                    <div className="pt-2 border-t border-slate-100/80 dark:border-slate-800/60 mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                        {ach.status === "LOCKED" ? (
                          <>
                            <Lock size={12} className="text-slate-400 shrink-0" />
                            <span>Target Milestone</span>
                          </>
                        ) : (
                          <>
                            <Calendar
                              size={12}
                              className={
                                ach.color === "green"
                                  ? "text-emerald-500"
                                  : ach.color === "blue"
                                  ? "text-blue-500"
                                  : ach.color === "purple"
                                  ? "text-purple-500"
                                  : "text-orange-500"
                              }
                            />
                            <span>{ach.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Right Carousel Arrow */}
            <button
              type="button"
              onClick={handleNextMilestone}
              disabled={milestoneOffset >= milestones.length - 5}
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next Milestones"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* ========================================================== */}
          {/* BOTTOM CONNECTED MILESTONE TIMELINE TRACK (FROM milestone.png) */}
          {/* ========================================================== */}
          <div className="hidden lg:flex items-center px-10 sm:px-14 pt-2">
            {/* Node 1: Green */}
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-emerald-500 shrink-0 shadow-2xs" />
            {/* Line 1 -> 2: Green to Blue */}
            <div className="h-1 flex-1 bg-gradient-to-r from-emerald-500 to-blue-500" />

            {/* Node 2: Blue */}
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-blue-500 shrink-0 shadow-2xs" />
            {/* Line 2 -> 3: Blue to Purple */}
            <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-purple-500" />

            {/* Node 3: Purple */}
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-purple-500 shrink-0 shadow-2xs" />
            {/* Line 3 -> 4: Purple to Orange */}
            <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-orange-500" />

            {/* Node 4: Orange */}
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-orange-500 shrink-0 shadow-2xs" />
            {/* Line 4 -> 5: Orange to Slate */}
            <div className="h-1 flex-1 bg-gradient-to-r from-orange-500 to-slate-300 dark:to-slate-700" />

            {/* Node 5: Slate */}
            <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-[3.5px] border-slate-300 dark:border-slate-600 shrink-0" />
          </div>
        </div>
      )}

      {/* Empty Search State */}
      {filteredExams.length === 0 && filteredMilestones.length === 0 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 text-center space-y-2">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No credentials or badges found matching "{searchQuery}"
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={selectedCert || examCertificates[0]}
        studentName={currentUser?.name || "Student"}
      />
    </div>
  );
};

export default AchievementsPage;
