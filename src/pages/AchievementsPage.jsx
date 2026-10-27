import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { CertificateViewerModal } from "../components/crm/CertificateViewerModal";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

// Modular Achievement Components
import {
  AchievementsFilterBar,
  ExamCertificatesSection,
  MilestoneBadgesSection,
} from "../components/achievements";

// Official 3D Shield Badge Images for base exam credentials
import badgeGold from "../assets/badge-type-gold.png";
import badgeGreen from "../assets/badge-type-green.png";
import badgePurple from "../assets/badge-type-purple.png";
import badgeBlue from "../assets/badge-type-blue.png";

// Base verified exam certifications matching course-comp-achieve.png
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
    cardBorderColor: "border-blue-200/80 dark:border-blue-800/60 hover:border-blue-300",
    waveColor: "blue",
    categoryBadgeColor:
      "border-blue-300/80 bg-blue-50/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80",
    gradeBadgeColor:
      "border-amber-300/80 bg-amber-50/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80",
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
    cardBorderColor: "border-emerald-200/80 dark:border-emerald-800/60 hover:border-emerald-300",
    waveColor: "green",
    categoryBadgeColor:
      "border-emerald-300/80 bg-emerald-50/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/80",
    gradeBadgeColor:
      "border-amber-300/80 bg-amber-50/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80",
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
    cardBorderColor: "border-purple-200/80 dark:border-purple-800/60 hover:border-purple-300",
    waveColor: "purple",
    categoryBadgeColor:
      "border-purple-300/80 bg-purple-50/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700/80",
    gradeBadgeColor:
      "border-purple-300/80 bg-purple-50/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700/80",
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
    cardBorderColor: "border-blue-200/80 dark:border-blue-800/60 hover:border-blue-300",
    waveColor: "cyan",
    categoryBadgeColor:
      "border-blue-300/80 bg-blue-50/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80",
    gradeBadgeColor:
      "border-cyan-300/80 bg-cyan-50/80 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-700/80",
  },
];

// Base curriculum milestones matching milestone.png
// Covers Streaks, Continuous Assignment Streaks, and Quizzes Completed
const BASE_MILESTONES = [
  {
    id: "mile-streak-7",
    category: "streak",
    title: "SEO Specialist",
    description: "100% course completed & technical audit passed",
    date: "Sep 12, 2026",
    status: "COMPLETED",
    iconType: "laptop",
    color: "green",
    cardBorderColor: "border-emerald-200/80 dark:border-emerald-800/60 hover:border-emerald-300",
    waveColor: "green",
    badgeClass:
      "bg-[#d1fae5] text-[#059669] dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700",
  },
  {
    id: "mile-assign-streak",
    category: "assignment_streak",
    title: "WordPress Developer",
    description: "Built & deployed 3 client sites with Elementor",
    date: "Aug 28, 2026",
    status: "IN PROGRESS",
    iconType: "wordpress",
    color: "blue",
    cardBorderColor: "border-blue-200/80 dark:border-blue-800/60 hover:border-blue-300",
    waveColor: "blue",
    badgeClass:
      "bg-[#dbeafe] text-[#2563eb] dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300/80 dark:border-blue-700",
  },
  {
    id: "mile-quiz-completed",
    category: "quiz_completed",
    title: "GA4 Master Certified",
    description: "Scored 90%+ on GA4 conversion tracking exam",
    date: "Sep 01, 2026",
    status: "EARNED",
    iconType: "chart",
    color: "purple",
    cardBorderColor: "border-purple-200/80 dark:border-purple-800/60 hover:border-purple-300",
    waveColor: "purple",
    badgeClass:
      "bg-[#f3e8ff] text-[#7c3aed] dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300/80 dark:border-purple-700",
  },
  {
    id: "mile-streak-30",
    category: "streak",
    title: "Design Innovator",
    description: "Top Figma design system in Creative Essentials",
    date: "Jul 19, 2026",
    status: "EARNED",
    iconType: "bulb",
    color: "orange",
    cardBorderColor: "border-orange-200/80 dark:border-orange-800/60 hover:border-orange-300",
    waveColor: "orange",
    badgeClass:
      "bg-[#ffedd5] text-[#ea580c] dark:bg-orange-950/80 dark:text-orange-300 border border-orange-300/80 dark:border-orange-700",
  },
  {
    id: "mile-mastery",
    category: "assignment_streak",
    title: "Digital Marketing Strategist",
    description: "Complete all 6 masterclasses tracks to unlock",
    date: "Target Milestone",
    status: "LOCKED",
    iconType: "target",
    color: "slate",
    cardBorderColor: "border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300",
    waveColor: "slate",
    badgeClass:
      "bg-[#f1f5f9] text-[#64748b] dark:bg-slate-800 dark:text-slate-400 border border-slate-300/80 dark:border-slate-700",
  },
];

export const AchievementsPage = () => {
  const { currentUser } = useAuth();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'exams', 'milestones'
  const [searchQuery, setSearchQuery] = useState("");

  // Live dynamic exam certificates: combine default verified certificates with student's passed exams
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

  // Defined live auto-generated numbers (Removed 7/9 per requirement)
  const liveExamCount = examCertificates.length;
  const liveMilestoneCount = milestones.length;

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO BANNER: ONLY LIVE DEFINED NUMBERS (NO 7/9)        */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.achievements}
        metrics={[
          {
            value: liveExamCount,
            label: "Exam Certificates",
            dotColor: "bg-blue-600",
          },
          {
            value: liveMilestoneCount,
            label: "Milestone Badges",
            dotColor: "bg-amber-500",
          },
          {
            value: "100%",
            label: "Verified Credentials",
            dotColor: "bg-purple-500",
          },
        ]}
      />

      {/* ------------------------------------------------------------- */}
      {/* FILTER TABS & SEARCH BAR COMPONENT                            */}
      {/* ------------------------------------------------------------- */}
      <AchievementsFilterBar
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalExams={examCertificates.length}
        totalMilestones={milestones.length}
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. EXAM COMPLETION CERTIFICATES SECTION                       */}
      {/* ------------------------------------------------------------- */}
      <ExamCertificatesSection
        certificates={filteredExams}
        onOpenCertificate={handleOpenCertificate}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. CURRICULUM MILESTONE BADGES SECTION                        */}
      {/* ------------------------------------------------------------- */}
      <MilestoneBadgesSection
        milestones={filteredMilestones}
        onViewAll={() => setActiveFilter("milestones")}
      />

      {/* ------------------------------------------------------------- */}
      {/* EMPTY SEARCH STATE                                            */}
      {/* ------------------------------------------------------------- */}
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

      {/* ------------------------------------------------------------- */}
      {/* CERTIFICATE VIEWER MODAL                                      */}
      {/* ------------------------------------------------------------- */}
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
