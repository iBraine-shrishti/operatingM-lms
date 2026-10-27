// Official 3D Shield Badge Images for base exam credentials
import badgeGold from "../assets/badge-type-gold.png";
import badgeGreen from "../assets/badge-type-green.png";
import badgePurple from "../assets/badge-type-purple.png";
import badgeBlue from "../assets/badge-type-blue.png";

/**
 * Base verified exam certifications matching course-comp-achieve.png
 */
export const BASE_EXAM_CERTIFICATES = [
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

/**
 * Base curriculum milestones matching milestone.png
 * Covers Streaks, Continuous Assignment Streaks, and Quizzes Completed
 */
export const BASE_MILESTONES = [
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

/**
 * Loads exam certificates from localStorage if available, merging with base defaults.
 * @returns {Array} Array of exam certificate objects
 */
export const loadInitialExamCertificates = () => {
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
};
