import { getCourseTheme } from "../config/courseThemesConfig";

/**
 * Enhanced descriptions for quizzes to enrich student guidance
 */
export const QUIZ_ENHANCED_DESCRIPTIONS = {
  "q-gads-inter":
    "Intermediate examination testing Google Ads campaign structures, Quality Score, ad extensions, bidding strategies, match types, conversion tracking, remarketing, and performance optimization.",
  "q-ga4-inter":
    "Mastery assessment evaluating Google Analytics 4 event schema implementation, custom dimensions & metrics, conversion path attribution modeling, Google Tag Manager dataLayer triggers, and real-time debug view workflows.",
  "q-adsense-inter":
    "Google AdSense examination covering publisher monetization policies, ad placements, RPM calculations, viewability optimization, and ad unit management.",
  "q-gsc-inter":
    "Google Search Console evaluation covering performance report analysis, indexing coverage, URL inspection, sitemap submission, and core web vitals diagnostics.",
  "q-gtm-inter":
    "Hands-on examination covering Google Tag Manager container setup, dataLayer triggers, custom variables, GA4 tag firing, and preview debug workflow.",
  "q-local-seo-inter":
    "Local SEO examination covering Google Business Profile optimization, local citations, NAP consistency, local pack ranking factors, and customer review velocity.",
  "q-on-off-seo-inter":
    "In-depth technical and strategic examination covering keyword intent analysis, on-page meta tag architecture, crawler HTTP status codes, XML sitemaps, and core web vitals optimization.",
};

/**
 * Standardized Sort Options
 */
export const ASSIGNMENT_SORT_OPTIONS = [
  { id: "dueDateAsc", label: "Sort: Due Date (Earliest)" },
  { id: "dueDateDesc", label: "Sort: Due Date (Latest)" },
  { id: "title", label: "Sort: Title (A-Z)" },
  { id: "status", label: "Sort: Status" },
];

export const QUIZ_SORT_OPTIONS = [
  { id: "default", label: "Sort: Default Sequence" },
  { id: "durationAsc", label: "Sort: Duration (Shortest)" },
  { id: "durationDesc", label: "Sort: Duration (Longest)" },
  { id: "questionsDesc", label: "Sort: Questions (Most)" },
  { id: "questionsAsc", label: "Sort: Questions (Least)" },
  { id: "passScore", label: "Sort: Pass Benchmark (Highest)" },
  { id: "title", label: "Sort: Title (A-Z)" },
  { id: "status", label: "Sort: Status" },
];

/**
 * Standardized Category Options
 */
export const ASSIGNMENT_CATEGORIES = [
  { id: "all", label: "All Specializations" },
  { id: "design", label: "Creative & UI/UX" },
  { id: "career", label: "Career & Guidance" },
  { id: "social", label: "Social Media" },
  { id: "seo", label: "SEO & Analytics" },
  { id: "ppc", label: "Digital Marketing & PPC" },
  { id: "analytics", label: "Analytics & Tracking" },
  { id: "wordpress", label: "WordPress & CMS" },
];

export const QUIZ_CATEGORIES = [
  { id: "all", label: "All Specializations" },
  { id: "ppc", label: "PPC Advertising" },
  { id: "seo", label: "SEO Strategy" },
  { id: "social", label: "Social Media" },
  { id: "analytics", label: "Analytics & Tracking" },
  { id: "wordpress", label: "WordPress Architecture" },
  { id: "design", label: "Creative Design" },
  { id: "career", label: "Career Orientation" },
  { id: "capstone", label: "Capstone Exam" },
];

/**
 * Helper to calculate status filter options with dynamic counts
 */
export const getAssignmentStatusOptions = (assignments = []) => {
  const pendingCount = assignments.filter((a) => a.status === "pending" || !a.status).length;
  const submittedCount = assignments.filter((a) => a.status === "submitted").length;
  const approvedCount = assignments.filter((a) => a.status === "approved" || a.status === "graded").length;
  const notApprovedCount = assignments.filter((a) => a.status === "not_approved").length;

  return [
    {
      id: "all",
      label: "All",
      count: assignments.length,
      color: "blue",
    },
    {
      id: "approved",
      label: "Approved",
      count: approvedCount,
      color: "emerald",
      dotColor: "bg-emerald-500",
    },
    {
      id: "not_approved",
      label: "Not Approved",
      count: notApprovedCount,
      color: "rose",
      dotColor: "bg-rose-500",
    },
    {
      id: "submitted",
      label: "Submitted",
      count: submittedCount,
      color: "purple",
      dotColor: "bg-purple-500",
    },
    {
      id: "pending",
      label: "Pending",
      count: pendingCount,
      color: "amber",
      dotColor: "bg-amber-500",
    },
  ];
};

export const getQuizStatusOptions = (quizzes = []) => {
  const pendingCount = quizzes.filter((q) => q.studentStatus === "pending").length;
  const passedCount = quizzes.filter((q) => q.studentStatus === "passed").length;

  return [
    {
      id: "all",
      label: "All",
      count: quizzes.length,
      color: "blue",
    },
    {
      id: "pending",
      label: "Pending",
      count: pendingCount,
      color: "rose",
      dotColor: "bg-rose-500",
    },
    {
      id: "passed",
      label: "Passed",
      count: passedCount,
      color: "emerald",
      dotColor: "bg-emerald-500",
    },
  ];
};

/**
 * Calculate Student Page Header Metrics
 */
export const calculateAssignmentMetrics = (assignments = []) => {
  const pending = assignments.filter((a) => a.status === "pending" || !a.status).length;
  const submitted = assignments.filter((a) => a.status === "submitted").length;
  const approved = assignments.filter((a) => a.status === "approved" || a.status === "graded").length;
  const notApproved = assignments.filter((a) => a.status === "not_approved").length;

  return [
    { value: assignments.length, label: "Total Tasks", dotColor: "bg-blue-600" },
    { value: approved, label: "Approved", dotColor: "bg-emerald-500" },
    { value: notApproved, label: "Not Approved", dotColor: "bg-rose-500" },
    { value: submitted, label: "Under Review", dotColor: "bg-purple-500" },
    { value: pending, label: "Pending", dotColor: "bg-amber-500" },
  ];
};

export const calculateQuizMetrics = (quizzes = []) => {
  const pending = quizzes.filter((q) => q.studentStatus === "pending").length;
  const passed = quizzes.filter((q) => q.studentStatus === "passed").length;

  const passedTests = quizzes.filter(
    (q) => q.studentStatus === "passed" && typeof q.studentScore === "number"
  );
  const avgScore =
    passedTests.length === 0
      ? "0%"
      : `${(
          passedTests.reduce((acc, curr) => acc + curr.studentScore, 0) /
          passedTests.length
        ).toFixed(1)}%`;

  return [
    { value: quizzes.length, label: "Total Quizzes", dotColor: "bg-blue-600" },
    { value: passed, label: "Passed", dotColor: "bg-emerald-500" },
    { value: pending, label: "Pending", dotColor: "bg-rose-500" },
    { value: avgScore, label: "Avg. Score", dotColor: "bg-purple-500" },
  ];
};

/**
 * Centralized Filter & Sort Engine for Assignments
 */
export const filterAndSortAssignments = (
  assignments = [],
  { searchQuery = "", selectedCourse = "all", selectedCategory = "all", selectedStatus = "all", sortBy = "dueDateAsc" },
  courses = []
) => {
  let result = assignments.filter((a) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = a.title?.toLowerCase().includes(q);
      const matchCourse = a.courseTitle?.toLowerCase().includes(q);
      const matchInst = a.instructions?.toLowerCase().includes(q);
      if (!matchTitle && !matchCourse && !matchInst) return false;
    }

    // 2. Course Filter
    if (selectedCourse !== "all") {
      const courseObj = courses.find((c) => c.id === selectedCourse);
      if (courseObj && a.courseTitle !== courseObj.title && a.courseId !== selectedCourse) {
        return false;
      }
    }

    // 3. Category Filter
    if (selectedCategory !== "all") {
      const theme = getCourseTheme(a.courseId, a.courseTitle);
      const catKey = (theme.category || theme.short || "").toLowerCase();
      const targetCat = selectedCategory.toLowerCase();
      if (!catKey.includes(targetCat) && !targetCat.includes(catKey)) {
        return false;
      }
    }

    // 4. Status Filter
    if (selectedStatus !== "all") {
      const aStatus = a.status || "pending";
      if (selectedStatus === "approved") {
        if (aStatus !== "approved" && aStatus !== "graded") return false;
      } else if (aStatus !== selectedStatus) {
        return false;
      }
    }

    return true;
  });

  // Sort
  result.sort((a, b) => {
    if (sortBy === "dueDateAsc") {
      return (a.dueDate || "").localeCompare(b.dueDate || "");
    }
    if (sortBy === "dueDateDesc") {
      return (b.dueDate || "").localeCompare(a.dueDate || "");
    }
    if (sortBy === "title") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (sortBy === "status") {
      return (a.status || "").localeCompare(b.status || "");
    }
    if (sortBy === "scoreDesc") {
      return (b.score || 0) - (a.score || 0);
    }
    return 0;
  });

  return result;
};

/**
 * Centralized Filter & Sort Engine for Quizzes
 */
export const filterAndSortQuizzes = (
  quizzes = [],
  { searchQuery = "", selectedCourse = "all", selectedCategory = "all", selectedStatus = "all", sortBy = "default" },
  courses = []
) => {
  let result = quizzes.filter((q) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = q.title?.toLowerCase().includes(query);
      const matchesCourse = q.courseTitle?.toLowerCase().includes(query);
      const matchesCategory = q.category?.toLowerCase().includes(query);
      const matchesDesc = q.description?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCourse && !matchesCategory && !matchesDesc) {
        return false;
      }
    }

    // 2. Course Filter
    if (selectedCourse !== "all") {
      const courseObj = courses.find((c) => c.id === selectedCourse);
      if (
        courseObj &&
        q.courseTitle !== courseObj.title &&
        q.courseId !== selectedCourse
      ) {
        return false;
      }
    }

    // 3. Category Filter
    if (selectedCategory !== "all") {
      const catText = (q.category || "").toLowerCase();
      const targetCat = selectedCategory.toLowerCase();
      if (!catText.includes(targetCat) && !targetCat.includes(catText)) {
        return false;
      }
    }

    // 4. Status Filter
    if (selectedStatus !== "all") {
      if (q.studentStatus !== selectedStatus) {
        return false;
      }
    }

    return true;
  });

  // Sort logic
  result.sort((a, b) => {
    if (sortBy === "durationAsc") {
      return (a.durationMinutes || 0) - (b.durationMinutes || 0);
    }
    if (sortBy === "durationDesc") {
      return (b.durationMinutes || 0) - (a.durationMinutes || 0);
    }
    if (sortBy === "questionsDesc") {
      return (b.totalQuestions || 0) - (a.totalQuestions || 0);
    }
    if (sortBy === "questionsAsc") {
      return (a.totalQuestions || 0) - (b.totalQuestions || 0);
    }
    if (sortBy === "passScore") {
      return (b.passScorePercentage || 0) - (a.passScorePercentage || 0);
    }
    if (sortBy === "title") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (sortBy === "status") {
      return (a.studentStatus || "").localeCompare(b.studentStatus || "");
    }
    return 0;
  });

  return result;
};
