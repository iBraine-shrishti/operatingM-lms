import React, { useState } from "react";
import { lmsService } from "../services/lmsService";
import {
  Award,
  CheckCircle,
  Download,
  Eye,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Search,
  Layout,
  BarChart3,
  Palette,
  CheckCircle2,
  Lock,
  Unlock,
  Calendar,
  Layers,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { CertificateViewerModal } from "../components/crm/CertificateViewerModal";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";

// Imported Badges
import achivementBatchImg from "../assets/achivement-batch.png";
import badgeBlue from "../assets/badge-type-blue.png";
import badgePurple from "../assets/badge-type-purple.png";
import badgeGreen from "../assets/badge-type-green.png";
import badgeGold from "../assets/badge-type-gold.png";

// Distinctive category themes for achievement milestone badges
const BADGE_THEMES = {
  SEO: {
    accent: "text-emerald-700",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/90",
    cardBorder: "border-emerald-200/90 hover:border-emerald-300",
    topGradient: "from-emerald-500 via-teal-500 to-emerald-600",
    categoryLabel: "SEO & AUDIT",
  },
  WordPress: {
    accent: "text-teal-700",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200/90",
    cardBorder: "border-teal-200/90 hover:border-teal-300",
    topGradient: "from-teal-500 via-cyan-500 to-teal-600",
    categoryLabel: "CMS ARCHITECTURE",
  },
  Analytics: {
    accent: "text-amber-800",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-200/90",
    cardBorder: "border-amber-200/90 hover:border-amber-300",
    topGradient: "from-amber-500 via-orange-500 to-amber-600",
    categoryLabel: "DATA & ANALYTICS",
  },
  Design: {
    accent: "text-rose-700",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200/90",
    cardBorder: "border-rose-200/90 hover:border-rose-300",
    topGradient: "from-rose-500 via-pink-500 to-rose-600",
    categoryLabel: "UI & BRANDING",
  },
  Marketing: {
    accent: "text-purple-700",
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200/90",
    cardBorder: "border-purple-200/90 hover:border-purple-300",
    topGradient: "from-purple-500 via-indigo-500 to-purple-600",
    categoryLabel: "DIGITAL STRATEGY",
  },
};

const getBadgeTheme = (category = "") => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("seo")) return BADGE_THEMES.SEO;
  if (cat.includes("word") || cat.includes("web")) return BADGE_THEMES.WordPress;
  if (cat.includes("analytic")) return BADGE_THEMES.Analytics;
  if (cat.includes("design") || cat.includes("creative")) return BADGE_THEMES.Design;
  if (cat.includes("market") || cat.includes("strategy") || cat.includes("capstone")) return BADGE_THEMES.Marketing;
  return BADGE_THEMES.SEO;
};

// Rich descriptions for achievements
const ENHANCED_ACHIEVEMENT_DESCRIPTIONS = {
  "ach-1": "Completed 100% of Search Engine Optimization Masterclass, submitted a live technical site audit with Core Web Vitals optimization, and achieved verified top-tier keyword rankings in audit simulations.",
  "ach-2": "Built and deployed 3 live client WordPress production environments featuring custom post types, responsive Elementor Pro layouts, advanced caching architectures, and secure REST API endpoints.",
  "ach-3": "Attained top 5% cohort score (90%+) on Google Analytics 4 conversion tracking examination, demonstrating hands-on dataLayer triggers, custom dimensions, and automated Looker Studio executive reporting.",
  "ach-4": "Architected a comprehensive Figma design system and high-converting marketing collateral across 15+ ad formats with scalable typography tokens, WCAG AA color harmonies, and brand kits.",
  "ach-5": "Premier Capstone Honor: Requires completing all 6 core masterclass tracks at Operating Media, delivering an end-to-end multi-channel digital marketing plan, and passing the comprehensive final exam.",
};

// Course Batches Data - Each course batch changes its badge image from batches-types.png
const COURSE_BATCHES_DATA = [
  {
    id: 132929482,
    certificate_id: "OMC-132929482",
    course: "Diploma in Digital Marketing & Artificial Intelligence",
    category: "Diploma Program",
    date: "February 10, 2026",
    rating: 9.8,
    grade: "A+ Distinction",
    badgeType: "gold",
    badgeImg: badgeGold,
    badgeTitle: "100 Milestone Honor",
    badgeDesc: "Gold Cohort Honor",
    description: "Comprehensive 8-month diploma mastery encompassing technical SEO audits, Google Ads AI bidding, Meta Ads Manager, GA4 dataLayer tagging, and live client capstone pitches.",
    unlocked: true,
  },
  {
    id: 132929483,
    certificate_id: "OMC-132929483",
    course: "Advanced Search Engine Optimization (SEO) Masterclass",
    category: "Specialized Track",
    date: "January 15, 2026",
    rating: 9.6,
    grade: "Honors with Distinction",
    badgeType: "green",
    badgeImg: badgeGreen,
    badgeTitle: "Certified SEO Specialist",
    badgeDesc: "Green Technical Shield",
    description: "Hands-on mastery of on-page schema, enterprise site architecture, Core Web Vitals optimization, backlink audit strategies, and algorithmic penalty recovery.",
    unlocked: true,
  },
  {
    id: 132929484,
    certificate_id: "OMC-132929484",
    course: "WordPress & Performance Web Development",
    category: "Core Track",
    date: "December 20, 2025",
    rating: 9.5,
    grade: "Certified Specialist",
    badgeType: "purple",
    badgeImg: badgePurple,
    badgeTitle: "Interactive Web Developer",
    badgeDesc: "Purple Interactive Shield",
    description: "Full-stack WordPress CMS architecture, custom Elementor Pro designs, FlyingPress & BunnyCDN speed optimization, and secure WooCommerce integrations.",
    unlocked: true,
  },
  {
    id: 132929485,
    certificate_id: "OMC-132929485",
    course: "Social Media Marketing & Creative Performance Ads",
    category: "Creative Track",
    date: "November 18, 2025",
    rating: 9.7,
    grade: "Distinction Award",
    badgeType: "blue",
    badgeImg: badgeBlue,
    badgeTitle: "Top Tier Campaign Creator",
    badgeDesc: "Blue Star Ribbon Shield",
    description: "Data-driven creative strategy across Instagram Reels, LinkedIn Thought Leader campaigns, YouTube video ads, and full-funnel remarketing architecture.",
    unlocked: true,
  },
];

export const AchievementsPage = () => {
  const { currentUser } = useAuth();
  const achievements = lmsService.getAchievements();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const handleOpenCertificate = (cert) => {
    setSelectedCert(cert);
    setIsCertModalOpen(true);
  };

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - WITH STYLED BG TO DIFFERENTIATE FROM BELOW   */}
      {/* ------------------------------------------------------------- */}
      <div
        className="relative bg-cover bg-center rounded-2xl border border-blue-100/80 p-5 sm:p-6 md:p-8 shadow-xs overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all"
        style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-900 text-sm font-extrabold uppercase tracking-wider">
            <Award size={17} />
            <span>Official Credentials & Honor Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Certifications & Honor Badges
          </h1>
          <p className="text-slate-900/90 text-sm sm:text-base max-w-2xl leading-relaxed font-semibold">
            Verified diplomas, course completion batches, and earned achievement badges synchronized directly from Operating Media CRM.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3 border-t border-slate-200/80 text-sm font-medium">
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="font-extrabold text-slate-900">{COURSE_BATCHES_DATA.length}</span>
              <span className="text-slate-800 font-semibold">Course Batches</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span className="font-extrabold text-slate-900">{achievements.length}</span>
              <span className="text-slate-800 font-semibold">Achievement Badges</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="font-extrabold text-slate-900">{achievements.filter(a => a.unlocked).length}</span>
              <span className="text-slate-800 font-semibold">Milestones Earned</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
              <span className="font-extrabold text-slate-900">100%</span>
              <span className="text-slate-800 font-semibold">CRM Authenticated</span>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="w-full sm:w-auto shrink-0">
          <button
            onClick={() => handleOpenCertificate(COURSE_BATCHES_DATA[0])}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
          >
            <Award size={16} />
            <span>View Verified Certificate</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. COURSE COMPLETION BATCHES SECTION (CHANGES PER COURSE)      */}
      {/* 2-COL CARD LAYOUT: { INFO - LEFT, BATCH IMG - RIGHT }          */}
      {/* ============================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={18} className="text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Course Completion Batches & Credentials
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Distinct cohort color shields • Verifiable via QR & Credential ID
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {COURSE_BATCHES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top Accent Gradient based on badge type */}
              <div
                className={`h-1.5 w-full ${
                  cert.badgeType === "gold"
                    ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500"
                    : cert.badgeType === "green"
                    ? "bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"
                    : cert.badgeType === "purple"
                    ? "bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600"
                    : "bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600"
                }`}
              />

              {/* 2-COLUMN CARD BODY: { INFO - LEFT, BATCH IMG - RIGHT } */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
                {/* LEFT COLUMN: INFO */}
                <div className="flex-1 min-w-0 space-y-3 w-full">
                  {/* Top Row: Category Pill + Grade Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      {cert.category}
                    </span>
                    <span className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black px-2.5 py-0.5 rounded-lg shadow-2xs">
                      {cert.rating} / 10 • {cert.grade}
                    </span>
                  </div>

                  {/* Title & Credential Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      CREDENTIAL ID: {cert.certificate_id}
                    </span>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#3b49df] transition-colors break-words">
                      {cert.course}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Awarded to <strong className="text-slate-800 font-bold">{currentUser.name || "Hiteshpuri Goswami"}</strong> • {cert.date}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal break-words pt-0.5">
                    {cert.description}
                  </p>
                </div>

                {/* RIGHT COLUMN: BATCH IMAGE (CHANGES PER COURSE) */}
                <div className="shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-all w-28 sm:w-32">
                  <img
                    src={cert.badgeImg}
                    alt={cert.badgeTitle}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-contain drop-shadow-sm transition-transform duration-300"
                  />
                  <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider mt-2 text-center leading-tight">
                    {cert.badgeTitle}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight text-center">
                    {cert.badgeDesc}
                  </span>
                </div>
              </div>

              {/* Footer Row */}
              <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span>Authenticated & Issued</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleOpenCertificate(cert)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Eye size={13} />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. CURRICULUM MILESTONE BADGES (SAME ACH BADGE FOR ALL)        */}
      {/* 2-COL CARD LAYOUT: { INFO - LEFT, BATCH IMG - RIGHT }          */}
      {/* ============================================================== */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-blue-600 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Curriculum Milestone Achievement Badges
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Official 'Learning Master' Honor Badge • Earned across platform tasks
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {achievements.map((ach) => {
            const theme = getBadgeTheme(ach.category);
            const desc = ENHANCED_ACHIEVEMENT_DESCRIPTIONS[ach.id] || ach.description;

            return (
              <div
                key={ach.id}
                className={`bg-white rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group ${
                  ach.unlocked
                    ? theme.cardBorder
                    : "border-slate-200/70 opacity-75 bg-slate-50/40"
                }`}
              >
                {/* Top Vibrant Accent Bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${
                    ach.unlocked ? theme.topGradient : "from-slate-300 to-slate-400"
                  }`}
                />

                {/* 2-COLUMN CARD BODY: { INFO - LEFT, BATCH IMG - RIGHT } */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
                  {/* LEFT COLUMN: INFO */}
                  <div className="flex-1 min-w-0 space-y-3 w-full">
                    {/* Top Row: Category Pill + Status Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-block text-[10.5px] sm:text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg border shrink-0 ${
                          ach.unlocked ? theme.badgeBg : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {theme.categoryLabel || ach.category}
                      </span>

                      {ach.unlocked ? (
                        <span className="inline-flex items-center space-x-1.5 text-xs font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-2xs shrink-0">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <span>EARNED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                          <Lock size={12} className="text-slate-400" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    {/* Milestone Title */}
                    <div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#3b49df] transition-colors break-words">
                        {ach.title}
                      </h3>
                    </div>

                    {/* Rich Description */}
                    <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal break-words">
                      {desc}
                    </p>
                  </div>

                  {/* RIGHT COLUMN: ACHIEVEMENT BADGE (REMAINS SAME FOR ALL) */}
                  <div className="shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-rose-50/50 to-white border border-rose-100 shadow-2xs group-hover:scale-105 transition-all w-28 sm:w-32 relative">
                    <img
                      src={achivementBatchImg}
                      alt="Achievement Learning Master Badge"
                      className={`w-18 h-20 sm:w-22 sm:h-24 object-contain drop-shadow-sm transition-all duration-300 ${
                        ach.unlocked ? "filter-none" : "grayscale opacity-50"
                      }`}
                    />
                    <span className="text-[10px] font-black uppercase text-rose-700 tracking-wider mt-2 text-center leading-tight">
                      Learning Master
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight text-center">
                      {ach.unlocked ? "Verified Honor" : "Milestone Target"}
                    </span>

                    {/* Locked Badge Overlay */}
                    {!ach.unlocked && (
                      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md">
                          <Lock size={14} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{ach.unlocked ? `Unlocked: ${ach.earnedDate}` : "Target Milestone"}</span>
                  </span>

                  {ach.unlocked ? (
                    <span className="text-emerald-700 font-extrabold flex items-center space-x-1 text-xs">
                      <Sparkles size={12} className="text-emerald-600" />
                      <span>Skill Verified</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 font-semibold text-xs flex items-center space-x-1">
                      <Lock size={11} />
                      <span>Complete track to unlock</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={selectedCert || COURSE_BATCHES_DATA[0]}
        studentName={currentUser.name}
      />
    </div>
  );
};
