import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import {
  Award,
  CheckCircle,
  Eye,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  Calendar,
  Filter,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { CertificateViewerModal } from "../components/crm/CertificateViewerModal";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

// Imported Badges
import achivementBatchImg from "../assets/achivement-batch.png";
import badgeBlue from "../assets/badge-type-blue.png";
import badgePurple from "../assets/badge-type-purple.png";
import badgeGreen from "../assets/badge-type-green.png";
import badgeGold from "../assets/badge-type-gold.png";

// Category theme mapping for milestone badges
const BADGE_THEMES = {
  SEO: {
    accent: "text-emerald-700 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-500/40",
    topGradient: "from-emerald-400 via-teal-500 to-emerald-600",
    categoryLabel: "SEO & AUDIT",
  },
  WordPress: {
    accent: "text-teal-700 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200/90 dark:border-teal-500/40",
    topGradient: "from-teal-400 via-cyan-500 to-teal-600",
    categoryLabel: "CMS ARCHITECTURE",
  },
  Analytics: {
    accent: "text-amber-800 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-200/90 dark:border-amber-500/40",
    topGradient: "from-amber-400 via-orange-500 to-amber-600",
    categoryLabel: "DATA & ANALYTICS",
  },
  Design: {
    accent: "text-rose-700 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200/90 dark:border-rose-500/40",
    topGradient: "from-rose-400 via-pink-500 to-rose-600",
    categoryLabel: "UI & BRANDING",
  },
  Marketing: {
    accent: "text-purple-700 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200/90 dark:border-purple-500/40",
    topGradient: "from-purple-400 via-indigo-500 to-purple-600",
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

// Concise, non-bloated 1-line details for achievements
const SHORT_ACHIEVEMENT_DESCRIPTIONS = {
  "ach-1": "100% course completed & technical audit passed",
  "ach-2": "Built & deployed 3 client sites with Elementor",
  "ach-3": "Scored 90%+ on GA4 conversion tracking exam",
  "ach-4": "Top Figma design system in Creative Essentials",
  "ach-5": "Complete all 6 masterclass tracks to unlock",
};

// Course Batches Data - Each course batch has a distinctive color shield badge
const COURSE_BATCHES_DATA = [
  {
    id: 132929482,
    certificate_id: "OMC-132929482",
    course: "Diploma in Digital Marketing & AI",
    category: "Diploma Program",
    date: "Feb 10, 2026",
    rating: 9.8,
    grade: "A+ Distinction",
    badgeType: "gold",
    badgeImg: badgeGold,
    badgeTitle: "Gold Honor",
    badgeDesc: "Cohort Honor",
    shortDetail: "Technical SEO, AI bidding, GA4 & client pitch",
    unlocked: true,
  },
  {
    id: 132929483,
    certificate_id: "OMC-132929483",
    course: "Advanced SEO Masterclass",
    category: "Specialized Track",
    date: "Jan 15, 2026",
    rating: 9.6,
    grade: "Honors with Distinction",
    badgeType: "green",
    badgeImg: badgeGreen,
    badgeTitle: "SEO Specialist",
    badgeDesc: "Tech Shield",
    shortDetail: "On-page schema, Core Web Vitals & audits",
    unlocked: true,
  },
  {
    id: 132929484,
    certificate_id: "OMC-132929484",
    course: "WordPress & Performance Web Dev",
    category: "Core Track",
    date: "Dec 20, 2025",
    rating: 9.5,
    grade: "Certified Specialist",
    badgeType: "purple",
    badgeImg: badgePurple,
    badgeTitle: "Web Developer",
    badgeDesc: "Purple Shield",
    shortDetail: "Elementor Pro, speed caching & WooCommerce",
    unlocked: true,
  },
  {
    id: 132929485,
    certificate_id: "OMC-132929485",
    course: "Social Media & Creative Ads",
    category: "Creative Track",
    date: "Nov 18, 2025",
    rating: 9.7,
    grade: "Distinction Award",
    badgeType: "blue",
    badgeImg: badgeBlue,
    badgeTitle: "Top Campaigner",
    badgeDesc: "Blue Ribbon",
    shortDetail: "Instagram Reels, LinkedIn & performance ads",
    unlocked: true,
  },
];

export const AchievementsPage = () => {
  const { currentUser } = useAuth();
  const achievements = lmsService.getAchievements();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'batches', 'milestones'
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenCertificate = (cert) => {
    setSelectedCert(cert);
    setIsCertModalOpen(true);
  };

  // Filtered lists based on search & active tab
  const filteredBatches = useMemo(() => {
    if (activeFilter === "milestones") return [];
    return COURSE_BATCHES_DATA.filter(
      (b) =>
        b.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.certificate_id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeFilter, searchQuery]);

  const filteredAchievements = useMemo(() => {
    if (activeFilter === "batches") return [];
    return achievements.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeFilter, searchQuery, achievements]);

  const totalCredentials = COURSE_BATCHES_DATA.length + achievements.length;
  const totalEarned = COURSE_BATCHES_DATA.length + achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO BANNER - STANDARDIZED WITH STUDENTPAGEHEADER      */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.achievements}
        metrics={[
          { value: COURSE_BATCHES_DATA.length, label: "Course Batches", dotColor: "bg-blue-600" },
          { value: achievements.length, label: "Milestone Badges", dotColor: "bg-amber-500" },
          { value: `${totalEarned} / ${totalCredentials}`, label: "Earned", dotColor: "bg-emerald-500" },
          { value: "100%", label: "Verified Credentials", dotColor: "bg-purple-500" },
        ]}
        action={
          <button
            type="button"
            onClick={() => handleOpenCertificate(COURSE_BATCHES_DATA[0])}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Award size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>View Verified Certificate</span>
          </button>
        }
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
                ? "bg-amber-500 text-slate-950 font-black shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Credentials ({totalCredentials})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("batches")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "batches"
                ? "bg-amber-500 text-slate-950 font-black shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Course Batches ({COURSE_BATCHES_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("milestones")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "milestones"
                ? "bg-amber-500 text-slate-950 font-black shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Milestone Badges ({achievements.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-60">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search credentials..."
            className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. COURSE COMPLETION BATCHES SECTION                           */}
      {/* SMALL COMPACT CARDS: { LITTLE DETAIL - LEFT, BADGE IMG - RIGHT }*/}
      {/* ============================================================== */}
      {filteredBatches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <ShieldCheck size={16} className="text-amber-500 shrink-0" />
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                Course Completion Batches
              </h2>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                ({filteredBatches.length})
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Verified CRM Certificates
            </span>
          </div>

          {/* COMPACT MULTI-COLUMN GRID (NOT STRETCHED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredBatches.map((cert) => (
              <div
                key={cert.id}
                onClick={() => handleOpenCertificate(cert)}
                className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/80 dark:hover:border-amber-500/50 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md dark:shadow-none dark:hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:-translate-y-0.5 transition-all flex items-center justify-between gap-3 group relative overflow-hidden cursor-pointer"
              >
                {/* Top Subtle Color Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    cert.badgeType === "gold"
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                      : cert.badgeType === "green"
                      ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                      : cert.badgeType === "purple"
                      ? "bg-gradient-to-r from-purple-400 to-indigo-500"
                      : "bg-gradient-to-r from-blue-400 to-cyan-500"
                  }`}
                />

                {/* LEFT COLUMN: A LITTLE DETAIL */}
                <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
                  {/* Category & Grade Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700/80 shrink-0">
                      {cert.category}
                    </span>
                    <span className="text-[9.5px] font-black text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 px-1.5 py-0.5 rounded-md shrink-0">
                      {cert.grade}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-black text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cert.course}
                  </h3>

                  {/* Little 1-line detail */}
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                    {cert.shortDetail}
                  </p>

                  {/* Meta & View Action */}
                  <div className="pt-1 flex items-center justify-between gap-1 text-[10.5px]">
                    <span className="text-slate-400 dark:text-slate-500 font-semibold truncate">
                      {cert.certificate_id} • {cert.date}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCertificate(cert);
                      }}
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-black inline-flex items-center space-x-1 shrink-0 cursor-pointer"
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: BADGE IMAGE IN SMALL CARD */}
                <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 w-20 sm:w-24 transition-all">
                  <img
                    src={cert.badgeImg}
                    alt={cert.badgeTitle}
                    className="w-12 h-14 sm:w-14 sm:h-16 object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-200"
                  />
                  <span className="text-[9px] font-black uppercase text-slate-700 dark:text-slate-300 tracking-tight mt-1 text-center line-clamp-1 max-w-full">
                    {cert.badgeTitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. CURRICULUM MILESTONE BADGES SECTION                         */}
      {/* SMALL COMPACT CARDS: { LITTLE DETAIL - LEFT, BADGE IMG - RIGHT }*/}
      {/* ============================================================== */}
      {filteredAchievements.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-amber-500 shrink-0" />
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                Curriculum Milestone Badges
              </h2>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                ({filteredAchievements.length})
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Skill & Achievement Milestones
            </span>
          </div>

          {/* COMPACT MULTI-COLUMN GRID (NOT STRETCHED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredAchievements.map((ach) => {
              const theme = getBadgeTheme(ach.category);
              const desc = SHORT_ACHIEVEMENT_DESCRIPTIONS[ach.id] || ach.description;

              return (
                <div
                  key={ach.id}
                  className={`bg-white dark:bg-[#0b1329] border rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md dark:shadow-none dark:hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:-translate-y-0.5 transition-all flex items-center justify-between gap-3 group relative overflow-hidden ${
                    ach.unlocked
                      ? "border-slate-200/90 dark:border-slate-800 hover:border-amber-400/80 dark:hover:border-amber-500/50"
                      : "border-slate-200/60 dark:border-slate-800/50 opacity-80 bg-slate-50/40 dark:bg-slate-900/30"
                  }`}
                >
                  {/* Top Subtle Color Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                      ach.unlocked
                        ? theme.topGradient
                        : "from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800"
                    }`}
                  />

                  {/* LEFT COLUMN: A LITTLE DETAIL */}
                  <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
                    {/* Category & Status Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${
                          ach.unlocked
                            ? theme.badgeBg
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {theme.categoryLabel || ach.category}
                      </span>

                      {ach.unlocked ? (
                        <span className="text-[9.5px] font-black px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-500/40 inline-flex items-center space-x-1 shrink-0">
                          <CheckCircle2 size={10} className="text-emerald-600 dark:text-emerald-400" />
                          <span>EARNED</span>
                        </span>
                      ) : (
                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 inline-flex items-center space-x-1 shrink-0">
                          <Lock size={9} className="text-slate-400 dark:text-slate-500" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    {/* Milestone Title */}
                    <h3 className="font-black text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {ach.title}
                    </h3>

                    {/* Little 1-line detail */}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                      {desc}
                    </p>

                    {/* Meta Status */}
                    <div className="pt-1 flex items-center justify-between gap-1 text-[10.5px]">
                      <span className="text-slate-400 dark:text-slate-500 font-semibold truncate">
                        {ach.unlocked ? ach.earnedDate : "Target Milestone"}
                      </span>
                      {ach.unlocked && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-black inline-flex items-center space-x-1 shrink-0">
                          <Sparkles size={11} />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: BADGE IMAGE IN SMALL CARD */}
                  <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 w-16 sm:w-20 relative transition-all">
                    <img
                      src={achivementBatchImg}
                      alt={ach.title}
                      className={`w-12 h-14 sm:w-14 sm:h-16 object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-200 ${
                        ach.unlocked ? "filter-none" : "grayscale opacity-40"
                      }`}
                    />
                    <span className="text-[9px] font-black uppercase text-slate-700 dark:text-slate-300 tracking-tight mt-1 text-center truncate max-w-full">
                      {ach.unlocked ? "Master" : "Target"}
                    </span>

                    {/* Lock overlay for locked milestones */}
                    {!ach.unlocked && (
                      <div className="absolute inset-0 bg-slate-950/25 rounded-xl flex items-center justify-center backdrop-blur-[0.5px]">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-sm">
                          <Lock size={11} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty Search State */}
      {filteredBatches.length === 0 && filteredAchievements.length === 0 && (
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
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}

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
