import { getCourseTheme } from "../config/courseThemesConfig";

/**
 * Enhanced descriptions for quizzes to enrich student guidance
 */
export const QUIZ_ENHANCED_DESCRIPTIONS = {
  "q-1":
    "Comprehensive evaluation assessing core channel competencies across search, social, display, email, and content marketing. Measures conversion funnel analysis, customer journey mapping, and foundational return on ad spend (ROAS) calculations.",
  "q-2":
    "In-depth technical and strategic examination covering keyword intent analysis, search volume clustering, on-page meta tag architecture, crawler HTTP status codes, robots.txt directives, XML sitemaps, and core web vitals optimization.",
  "q-3":
    "Hands-on architectural assessment testing WordPress database relationships, custom post types, responsive page-builder styling with Elementor Pro, theme hierarchy customization, caching strategies, and security configurations.",
  "q-4":
    "Mastery test evaluating Google Analytics 4 event schema implementation, custom dimensions & metrics, conversion path attribution modeling, Google Tag Manager dataLayer triggers, and real-time debug view workflows.",
  "q-5":
    "Advanced scenario-based examination covering Target CPA, Target ROAS, Quality Score mechanics, negative keyword match types, auction insights analysis, responsive search ads optimization, and conversion tracking tags.",
  "q-6":
    "Strategic assessment covering Meta Advantage+ campaigns, TikTok algorithmic engagement triggers, LinkedIn B2B lead generation funnels, influencer barter deliverables, and Aggregated Event Measurement (AEM) privacy protocols.",
  "q-7":
    "Practical creative examination testing visual hierarchy, complementary color harmonies, vector layout grids, typography kerning and pairing, brand identity guidelines, and high-impact digital advertising banner composition.",
  "q-8":
    "Rigorous capstone certification assessment covering multi-touch attribution, omnichannel marketing strategies, programmatic DSP ad buying, CRM automation workflows, client pitching frameworks, and live audit case studies.",
};

/**
 * Standardized Sort Options
 */
export const ASSIGNMENT_SORT_OPTIONS = [
  { id: "dueDateAsc", label: "Sort: Due Date (Earliest)" },
  { id: "dueDateDesc", label: "Sort: Due Date (Latest)" },
  { id: "title", label: "Sort: Title (A-Z)" },
  { id: "status", label: "Sort: Status" },
  { id: "scoreDesc", label: "Sort: Score (Highest)" },
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
  const gradedCount = assignments.filter((a) => a.status === "graded").length;

  return [
    {
      id: "all",
      label: "All",
      count: assignments.length,
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
      id: "submitted",
      label: "Submitted",
      count: submittedCount,
      color: "purple",
      dotColor: "bg-purple-500",
    },
    {
      id: "graded",
      label: "Graded",
      count: gradedCount,
      color: "emerald",
      dotColor: "bg-emerald-500",
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
  const graded = assignments.filter((a) => a.status === "graded").length;

  return [
    { value: assignments.length, label: "Total Tasks", dotColor: "bg-blue-600" },
    { value: pending, label: "Pending", dotColor: "bg-rose-500" },
    { value: submitted, label: "Submitted", dotColor: "bg-purple-500" },
    { value: graded, label: "Graded", dotColor: "bg-emerald-500" },
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
      if (aStatus !== selectedStatus) return false;
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
