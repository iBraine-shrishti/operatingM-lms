import {
  Palette,
  GraduationCap,
  Share2,
  BarChart3,
  Megaphone,
  Laptop,
  BookOpen,
  Target,
  Search,
  Layout,
  Award,
} from "lucide-react";

/**
 * Standardized course identities, color themes, and badge styling
 * Used consistently across Student Assignments, Quizzes, Courses, and Analytics
 */
export const COURSE_THEMES = {
  "course-4": {
    id: "course-4",
    name: "Creative Designing",
    short: "Creative & UI/UX",
    category: "Design",
    icon: Palette,
    pillStyle:
      "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/90 dark:border-rose-800/60",
    dot: "bg-rose-500",
    accent: "text-rose-600 dark:text-rose-400",
    borderAccent: "border-rose-200 dark:border-rose-800/60",
    topGradient: "from-rose-500 via-pink-500 to-rose-600",
    badgeBg:
      "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/90 dark:border-rose-800/60",
    buttonBg: "bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500",
  },
  "course-3": {
    id: "course-3",
    name: "Masters in Digital Marketing - Advanced Topics",
    short: "Career & Guidance",
    category: "Career",
    icon: GraduationCap,
    pillStyle:
      "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border-sky-200/90 dark:border-sky-800/60",
    dot: "bg-sky-500",
    accent: "text-sky-600 dark:text-sky-400",
    borderAccent: "border-sky-200 dark:border-sky-800/60",
    topGradient: "from-sky-500 via-blue-600 to-indigo-600",
    badgeBg:
      "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200/90 dark:border-sky-800/60",
    buttonBg: "bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500",
  },
  "course-1": {
    id: "course-1",
    name: "Social Media Marketing",
    short: "Social Media",
    category: "Social Media",
    icon: Share2,
    pillStyle:
      "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-200/90 dark:border-purple-800/60",
    dot: "bg-purple-500",
    accent: "text-purple-600 dark:text-purple-400",
    borderAccent: "border-purple-200 dark:border-purple-800/60",
    topGradient: "from-purple-600 via-fuchsia-600 to-purple-500",
    badgeBg:
      "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/90 dark:border-purple-800/60",
    buttonBg:
      "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500",
  },
  "course-8": {
    id: "course-8",
    name: "Search Engine Optimization (SEO)",
    short: "SEO & Analytics",
    category: "SEO",
    icon: BarChart3,
    pillStyle:
      "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-200/90 dark:border-cyan-800/60",
    dot: "bg-cyan-500",
    accent: "text-emerald-600 dark:text-emerald-400",
    borderAccent: "border-emerald-200 dark:border-emerald-800/60",
    topGradient: "from-emerald-600 via-teal-600 to-emerald-500",
    badgeBg:
      "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60",
    buttonBg:
      "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",
  },
  "course-6": {
    id: "course-6",
    name: "Google Ads",
    short: "Digital Marketing",
    category: "PPC",
    icon: Megaphone,
    pillStyle:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/90 dark:border-amber-800/60",
    dot: "bg-amber-500",
    accent: "text-blue-600 dark:text-blue-400",
    borderAccent: "border-blue-200 dark:border-blue-800/60",
    topGradient: "from-blue-600 via-indigo-600 to-blue-500",
    badgeBg:
      "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/90 dark:border-blue-800/60",
    buttonBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500",
  },
  "course-5": {
    id: "course-5",
    name: "Google Analytics Course",
    short: "Analytics & Tracking",
    category: "Analytics",
    icon: BarChart3,
    pillStyle:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60",
    dot: "bg-emerald-500",
    accent: "text-amber-600 dark:text-amber-400",
    borderAccent: "border-amber-200 dark:border-amber-800/60",
    topGradient: "from-amber-500 via-orange-500 to-amber-600",
    badgeBg:
      "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/90 dark:border-amber-800/60",
    buttonBg:
      "bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500",
  },
  "course-7": {
    id: "course-7",
    name: "Website Development With WordPress",
    short: "WordPress & CMS",
    category: "WordPress",
    icon: Laptop,
    pillStyle:
      "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-200/90 dark:border-teal-800/60",
    dot: "bg-teal-500",
    accent: "text-teal-600 dark:text-teal-400",
    borderAccent: "border-teal-200 dark:border-teal-800/60",
    topGradient: "from-teal-600 via-cyan-600 to-teal-500",
    badgeBg:
      "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200/90 dark:border-teal-800/60",
    buttonBg: "bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500",
  },
};

/**
 * Resolve theme by courseId, courseTitle, or category
 */
export const getCourseTheme = (courseId, courseTitle = "", category = "") => {
  if (courseId && COURSE_THEMES[courseId]) return COURSE_THEMES[courseId];

  const searchKey = `${courseTitle} ${category}`.toLowerCase();
  if (searchKey.includes("seo") || searchKey.includes("search engine")) {
    return COURSE_THEMES["course-8"];
  }
  if (searchKey.includes("word") || searchKey.includes("web") || searchKey.includes("cms")) {
    return COURSE_THEMES["course-7"];
  }
  if (searchKey.includes("design") || searchKey.includes("creative") || searchKey.includes("figma") || searchKey.includes("ui/ux")) {
    return COURSE_THEMES["course-4"];
  }
  if (searchKey.includes("social") || searchKey.includes("smm") || searchKey.includes("instagram")) {
    return COURSE_THEMES["course-1"];
  }
  if (searchKey.includes("analytic") || searchKey.includes("ga4") || searchKey.includes("tracking")) {
    return COURSE_THEMES["course-5"];
  }
  if (searchKey.includes("ads") || searchKey.includes("ppc") || searchKey.includes("google ads") || searchKey.includes("marketing")) {
    return COURSE_THEMES["course-6"];
  }
  if (searchKey.includes("advanced") || searchKey.includes("career") || searchKey.includes("capstone") || searchKey.includes("aptitude")) {
    return COURSE_THEMES["course-3"];
  }

  return {
    id: courseId || "default",
    name: courseTitle || "General Course",
    short: courseTitle || "General",
    category: category || "General",
    icon: BookOpen,
    pillStyle:
      "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400",
    accent: "text-blue-600 dark:text-blue-400",
    borderAccent: "border-slate-200 dark:border-slate-700",
    topGradient: "from-blue-600 via-indigo-600 to-blue-500",
    badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    buttonBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500",
  };
};

/**
 * Formats a due date into a human readable 'X days left' or 'Overdue' string
 */
export const getDaysLeftText = (dueDate) => {
  if (!dueDate) return "Upcoming";
  try {
    const due = new Date(dueDate);
    const now = new Date();
    due.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  } catch {
    return "Upcoming";
  }
};
