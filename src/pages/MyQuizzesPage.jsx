import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import {
  CheckSquare,
  ArrowRight,
  Clock,
  Award,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Play,
  RotateCcw,
  BarChart3,
  HelpCircle,
  X,
  Search,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Target,
  Share2,
  Layout,
  Palette,
  GraduationCap
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";

// Comprehensive descriptions for each quiz
const QUIZ_ENHANCED_DESCRIPTIONS = {
  "q-1": "Comprehensive evaluation assessing core channel competencies across search, social, display, email, and content marketing. Measures conversion funnel analysis, customer journey mapping, and foundational return on ad spend (ROAS) calculations.",
  "q-2": "In-depth technical and strategic examination covering keyword intent analysis, search volume clustering, on-page meta tag architecture, crawler HTTP status codes, robots.txt directives, XML sitemaps, and core web vitals optimization.",
  "q-3": "Hands-on architectural assessment testing WordPress database relationships, custom post types, responsive page-builder styling with Elementor Pro, theme hierarchy customization, caching strategies, and security configurations.",
  "q-4": "Mastery test evaluating Google Analytics 4 event schema implementation, custom dimensions & metrics, conversion path attribution modeling, Google Tag Manager dataLayer triggers, and real-time debug view workflows.",
  "q-5": "Advanced scenario-based examination covering Target CPA, Target ROAS, Quality Score mechanics, negative keyword match types, auction insights analysis, responsive search ads optimization, and conversion tracking tags.",
  "q-6": "Strategic assessment covering Meta Advantage+ campaigns, TikTok algorithmic engagement triggers, LinkedIn B2B lead generation funnels, influencer barter deliverables, and Aggregated Event Measurement (AEM) privacy protocols.",
  "q-7": "Practical creative examination testing visual hierarchy, complementary color harmonies, vector layout grids, typography kerning and pairing, brand identity guidelines, and high-impact digital advertising banner composition.",
  "q-8": "Rigorous capstone certification assessment covering multi-touch attribution, omnichannel marketing strategies, programmatic DSP ad buying, CRM automation workflows, client pitching frameworks, and live audit case studies.",
};

// Vibrant, distinctive category themes for cards and icons
const CATEGORY_THEMES = {
  ppc: {
    name: "PPC Advertising",
    accent: "text-blue-600",
    borderAccent: "border-blue-200",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200/90",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    topGradient: "from-blue-600 via-indigo-600 to-blue-500",
    buttonBg: "bg-blue-600 hover:bg-blue-700",
    icon: Target,
  },
  seo: {
    name: "SEO Strategy",
    accent: "text-emerald-600",
    borderAccent: "border-emerald-200",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200/90",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    topGradient: "from-emerald-600 via-teal-600 to-emerald-500",
    buttonBg: "bg-emerald-600 hover:bg-emerald-700",
    icon: Search,
  },
  social: {
    name: "Social Media",
    accent: "text-purple-600",
    borderAccent: "border-purple-200",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200/90",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200/80",
    topGradient: "from-purple-600 via-fuchsia-600 to-purple-500",
    buttonBg: "bg-purple-600 hover:bg-purple-700",
    icon: Share2,
  },
  analytics: {
    name: "Analytics & Tracking",
    accent: "text-amber-600",
    borderAccent: "border-amber-200",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200/90",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    topGradient: "from-amber-500 via-orange-500 to-amber-600",
    buttonBg: "bg-amber-600 hover:bg-amber-700",
    icon: BarChart3,
  },
  wordpress: {
    name: "WordPress Architecture",
    accent: "text-teal-600",
    borderAccent: "border-teal-200",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200/90",
    iconBg: "bg-teal-50 text-teal-600 border-teal-200/80",
    topGradient: "from-teal-600 via-cyan-600 to-teal-500",
    buttonBg: "bg-teal-600 hover:bg-teal-700",
    icon: Layout,
  },
  design: {
    name: "Creative Design",
    accent: "text-rose-600",
    borderAccent: "border-rose-200",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200/90",
    iconBg: "bg-rose-50 text-rose-600 border-rose-200/80",
    topGradient: "from-rose-500 via-pink-500 to-rose-600",
    buttonBg: "bg-rose-600 hover:bg-rose-700",
    icon: Palette,
  },
  career: {
    name: "Career Orientation",
    accent: "text-indigo-600",
    borderAccent: "border-indigo-200",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200/90",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200/80",
    topGradient: "from-indigo-600 via-blue-600 to-indigo-500",
    buttonBg: "bg-indigo-600 hover:bg-indigo-700",
    icon: GraduationCap,
  },
  capstone: {
    name: "Capstone Exam",
    accent: "text-violet-600",
    borderAccent: "border-violet-200",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-200/90",
    iconBg: "bg-violet-50 text-violet-600 border-violet-200/80",
    topGradient: "from-violet-600 via-purple-600 to-indigo-600",
    buttonBg: "bg-violet-600 hover:bg-violet-700",
    icon: Award,
  },
};

const getCategoryTheme = (category = "") => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("seo")) return CATEGORY_THEMES.seo;
  if (cat.includes("ads") || cat.includes("ppc")) return CATEGORY_THEMES.ppc;
  if (cat.includes("social")) return CATEGORY_THEMES.social;
  if (cat.includes("analytic")) return CATEGORY_THEMES.analytics;
  if (cat.includes("word") || cat.includes("web")) return CATEGORY_THEMES.wordpress;
  if (cat.includes("design") || cat.includes("creative")) return CATEGORY_THEMES.design;
  if (cat.includes("orientation") || cat.includes("counseling") || cat.includes("career")) return CATEGORY_THEMES.career;
  if (cat.includes("capstone") || cat.includes("exam") || cat.includes("advanced")) return CATEGORY_THEMES.capstone;
  return CATEGORY_THEMES.ppc;
};

export const MyQuizzesPage = () => {
  const { showToast } = useToast();
  const [quizzes, setQuizzes] = useState(() => lmsService.getQuizzes());
  const courses = lmsService.getCourses();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all"); // 'all' | 'pending' | 'passed'
  const [sortBy, setSortBy] = useState("default"); // 'default' | 'durationAsc' | 'durationDesc' | 'questionsDesc' | 'title' | 'score'

  // Modals
  const [activeQuizModal, setActiveQuizModal] = useState(null);
  const [scoreReviewModal, setScoreReviewModal] = useState(null);
  const [showAllCompletedModal, setShowAllCompletedModal] = useState(false);
  const [completedSearchQuery, setCompletedSearchQuery] = useState("");

  // Status counts
  const pendingCount = useMemo(
    () => quizzes.filter((q) => q.studentStatus === "pending").length,
    [quizzes]
  );
  const passedCount = useMemo(
    () => quizzes.filter((q) => q.studentStatus === "passed").length,
    [quizzes]
  );

  // Average score of completed tests
  const avgScore = useMemo(() => {
    const passed = quizzes.filter(
      (q) => q.studentStatus === "passed" && typeof q.studentScore === "number"
    );
    if (passed.length === 0) return "0%";
    const sum = passed.reduce((acc, curr) => acc + curr.studentScore, 0);
    return `${(sum / passed.length).toFixed(1)}%`;
  }, [quizzes]);

  // Filtered & Sorted Quizzes
  const filteredQuizzes = useMemo(() => {
    let result = quizzes.filter((q) => {
      // Keyword search (title, courseTitle, category, description)
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

      // Course filter
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

      // Status filter
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
      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }
      if (sortBy === "passScore") {
        return (b.passScorePercentage || 0) - (a.passScorePercentage || 0);
      }
      return 0;
    });

    return result;
  }, [quizzes, searchQuery, selectedCourse, selectedStatus, sortBy, courses]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCourse !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "default";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("all");
    setSelectedStatus("all");
    setSortBy("default");
  };

  const handleStartQuiz = (quiz) => {
    setActiveQuizModal(quiz);
  };

  const handleBeginExamination = () => {
    if (!activeQuizModal) return;
    
    // Simulate student examination completion with realistic high score
    const randomizedScore = Math.floor(Math.random() * 12) + 85; // 85% to 96%
    lmsService.submitQuizAttempt(activeQuizModal.id, randomizedScore);
    
    // Update local quizzes state
    setQuizzes(lmsService.getQuizzes());
    
    const quizTitle = activeQuizModal.title;
    setActiveQuizModal(null);

    showToast(
      `Congratulations! You passed "${quizTitle}" with an exceptional score of ${randomizedScore}%!`,
      "success",
      "Test Completed Successfully"
    );
  };

  const getCategoryBadgeClass = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("seo")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (cat.includes("ads") || cat.includes("ppc")) return "bg-blue-50 text-blue-700 border-blue-200";
    if (cat.includes("social")) return "bg-purple-50 text-purple-700 border-purple-200";
    if (cat.includes("analytics")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (cat.includes("wordpress") || cat.includes("web")) return "bg-teal-50 text-teal-700 border-teal-200";
    if (cat.includes("design")) return "bg-rose-50 text-rose-700 border-rose-200";
    if (cat.includes("orientation") || cat.includes("counseling") || cat.includes("career"))
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  // Find next pending quiz for header quick action
  const firstPendingQuiz = useMemo(
    () => quizzes.find((q) => q.studentStatus === "pending"),
    [quizzes]
  );

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - FULLY RESPONSIVE WITH BRANDED BACKGROUND      */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="relative bg-cover bg-center rounded-2xl border border-blue-100/80 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all overflow-hidden"
        style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-blue-700 text-sm font-extrabold uppercase tracking-wider">
            <CheckSquare size={17} />
            <span>Assessment & Certification Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Quizzes
          </h1>
          <p className="text-slate-900/90 text-sm sm:text-base max-w-2xl leading-relaxed font-semibold">
            Test your domain mastery across enrolled modules, meet passing criteria, and track your verified certification examination scores.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3 border-t border-slate-200/80 text-sm font-medium">
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b49df] inline-block"></span>
              <span className="font-extrabold text-slate-900">{quizzes.length}</span>
              <span className="text-slate-800 font-semibold">Total Quizzes</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{passedCount}</span>
              <span className="text-slate-800 font-semibold">Passed</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{pendingCount}</span>
              <span className="text-slate-800 font-semibold">Pending</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{avgScore}</span>
              <span className="text-slate-800 font-semibold">Avg. Score</span>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        {firstPendingQuiz && (
          <div className="w-full sm:w-auto shrink-0">
            <button
              onClick={() => handleStartQuiz(firstPendingQuiz)}
              className="w-full sm:w-auto bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
            >
              <Play size={16} className="fill-white" />
              <span>Take Next Quiz</span>
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONTINUE COURSE QUIZ & COMPLETED QUIZZES (ABOVE SEARCH)       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left Card: Small Continue Courses / Active Quiz (with dotted bar, perc & num of ques left) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3b49df] border border-blue-200/70 flex items-center justify-center shrink-0 shadow-2xs">
                <Play size={16} className="fill-[#3b49df] ml-0.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#3b49df]">
                    Continue Course Quiz
                  </span>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#3b49df] border border-blue-200/80 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b49df] animate-pulse" />
                    <span>In Progress</span>
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {firstPendingQuiz ? firstPendingQuiz.title : "Google Ads (PPC) Campaign Planning Assessment"}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-snug">
                  {firstPendingQuiz ? firstPendingQuiz.courseTitle : "Google Ads (PPC)"} • Passing Req: {firstPendingQuiz ? firstPendingQuiz.passScorePercentage : 85}%
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shrink-0">
              6 Questions Left
            </span>
          </div>

          {/* Dotted Segmented Progress Bar with Percentage */}
          <div className="space-y-2 bg-slate-50/80 border border-slate-100 rounded-xl p-3 sm:p-3.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-[#3b49df] font-black text-sm tabular-nums">
                  65%
                </span>
                <span className="text-slate-500 font-medium">Completed</span>
              </div>
              <span className="text-slate-600 text-xs font-bold">
                14 / 20 Answered
              </span>
            </div>

            {/* Dotted Bar (Series of rounded dot segments) */}
            <div className="grid grid-cols-12 gap-1.5 py-1">
              {Array.from({ length: 12 }).map((_, i) => {
                const isFilled = i < 8; // 8 of 12 = ~65%
                return (
                  <div
                    key={i}
                    title={isFilled ? `Question ${i + 1}: Answered` : `Question ${i + 1}: Pending`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isFilled
                        ? "bg-[#3b49df] shadow-2xs"
                        : "bg-slate-200/90"
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-0.5">
              <span>Current Section: Performance & ROAS Metrics</span>
              <span className="text-rose-600 font-bold">6 questions remaining</span>
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock size={13} className="text-slate-400" />
              <span>Est. ~8 mins left to complete</span>
            </div>

            {firstPendingQuiz && (
              <button
                type="button"
                onClick={() => handleStartQuiz(firstPendingQuiz)}
                className="px-4 py-2 bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
              >
                <Play size={12} className="fill-white" />
                <span>Resume Quiz</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Right Card: Beside a Label Like for Completed Quizzes */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/70 flex items-center justify-center shrink-0 shadow-2xs">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  Completed Quizzes
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Passed Assessments
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAllCompletedModal(true)}
              className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-200 shrink-0 transition-colors cursor-pointer"
            >
              {passedCount} / {quizzes.length} Passed
            </button>
          </div>

          {/* Completed Quizzes List / Labels */}
          <div className="space-y-2">
            {quizzes
              .filter((q) => q.studentStatus === "passed")
              .slice(0, 2)
              .map((q) => (
                <div
                  key={q.id}
                  onClick={() => setScoreReviewModal(q)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/90 hover:bg-emerald-50/40 border border-slate-100/90 hover:border-emerald-200 transition-all cursor-pointer group"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-slate-800 leading-snug group-hover:text-emerald-700">
                      {q.title}
                    </p>
                    <span className="text-[10.5px] text-slate-400 font-medium">
                      Completed {q.completedDate || "Feb 2026"} • {q.timeSpent || "14 mins"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-600 text-white shadow-2xs">
                      {q.studentScore}%
                    </span>
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-emerald-600" />
                  </div>
                </div>
              ))}
          </div>

          {/* Performance Summary Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Award size={14} className="text-amber-500" />
              <span>Overall Average:</span>
              <strong className="text-slate-900 font-extrabold">{avgScore}</strong>
            </div>

            <button
              type="button"
              onClick={() => setShowAllCompletedModal(true)}
              className="font-bold text-[#3b49df] hover:underline cursor-pointer text-xs"
            >
              View All ({passedCount}) &rarr;
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Row: Search + Course Filter + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Live Search Input */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quizzes by title, course, or category..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter by Course Select */}
          <div className="md:col-span-3 lg:col-span-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] cursor-pointer"
            >
              <option value="all">All Enrolled Courses ({quizzes.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] cursor-pointer"
            >
              <option value="default">Sort: Default Order</option>
              <option value="durationAsc">Sort: Duration (Shortest)</option>
              <option value="durationDesc">Sort: Duration (Longest)</option>
              <option value="questionsDesc">Sort: Questions (Most)</option>
              <option value="questionsAsc">Sort: Questions (Least)</option>
              <option value="passScore">Sort: Passing Score (Highest)</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Second Row: Status Filter Pills + Results Count / Reset Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar pb-1.5 sm:pb-0 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline-block shrink-0">
              Status:
            </span>
            {[
              { id: "all", label: `All (${quizzes.length})` },
              { id: "pending", label: `Pending (${pendingCount})` },
              { id: "passed", label: `Passed (${passedCount})` },
            ].map((st) => {
              const isActive = selectedStatus === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#3b49df] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto shrink-0 text-xs">
            <span className="text-slate-400">
              Showing{" "}
              <strong className="text-slate-700 font-semibold">
                {filteredQuizzes.length}
              </strong>{" "}
              of {quizzes.length} tests
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold text-[#3b49df] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <X size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* QUIZZES CARD GRID (3 IN GRID ON DESKTOP & RESPONSIVE)         */}
      {/* ------------------------------------------------------------- */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredQuizzes.map((quiz) => {
            const isPassed = quiz.studentStatus === "passed";
            const theme = getCategoryTheme(quiz.category);
            const CategoryIcon = theme.icon;
            const desc = QUIZ_ENHANCED_DESCRIPTIONS[quiz.id] || quiz.description;

            return (
              <div
                key={quiz.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Category Vibrant Accent Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${theme.topGradient}`} />

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    {/* Top Row: Category Pill + Status Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-block text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-lg border shrink-0 ${theme.badgeBg}`}
                      >
                        {quiz.category || "SPECIALIZATION"}
                      </span>

                      {/* Prominent Status Badge */}
                      {isPassed ? (
                        <span className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/90 shrink-0 shadow-2xs">
                          <CheckCircle2 size={14} className="text-emerald-600" />
                          <span>{quiz.studentScore}% Passed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/90 shrink-0 shadow-2xs">
                          <Clock size={14} className="text-amber-600" />
                          <span>Available</span>
                        </span>
                      )}
                    </div>

                    {/* Middle Block: Distinct Colored Icon Badge + Course Title & Quiz Title */}
                    <div className="flex items-start gap-3.5 pt-0.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs ${theme.iconBg} mt-0.5`}
                      >
                        <CategoryIcon size={20} className={theme.accent} />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        {/* Course Title - Full width, NEVER truncated into '...' */}
                        <div className="flex items-start space-x-1.5 text-xs sm:text-sm text-slate-600 font-bold">
                          <BookOpen size={14} className={`shrink-0 mt-0.5 ${theme.accent}`} />
                          <span className="break-words leading-snug">{quiz.courseTitle}</span>
                        </div>

                        {/* Larger Title - Full text, NEVER truncated into '...' */}
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#3b49df] transition-colors leading-snug break-words">
                          {quiz.title}
                        </h3>
                      </div>
                    </div>

                    {/* Rich Description - Full text, clearly readable font */}
                    <p className="text-sm sm:text-[15px] text-slate-700 font-medium leading-relaxed break-words pt-1">
                      {desc}
                    </p>
                  </div>

                  {/* Specifications Strip with Specific Colored Icons */}
                  <div className="bg-slate-50/90 border border-slate-100 rounded-xl p-3 grid grid-cols-3 gap-2 text-center mt-3">
                    <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/80 border border-slate-100/90 shadow-2xs">
                      <div className="flex items-center gap-1 text-slate-600 text-xs mb-0.5 font-bold">
                        <HelpCircle size={13} className="text-blue-500" />
                        <span>Questions</span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {quiz.totalQuestions}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/80 border border-slate-100/90 shadow-2xs">
                      <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-0.5 font-bold">
                        <Clock size={13} className="text-amber-500" />
                        <span>Duration</span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {quiz.durationMinutes} mins
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/80 border border-slate-100/90 shadow-2xs">
                      <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-0.5 font-bold">
                        <Award size={13} className="text-emerald-500" />
                        <span>Pass Req.</span>
                      </div>
                      <span className="font-extrabold text-emerald-700 text-xs sm:text-sm">
                        {quiz.passScorePercentage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:px-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                  {isPassed ? (
                    <>
                      <div className="text-xs text-slate-500 font-medium truncate">
                        <span>Passed on {quiz.completedDate || "Recently"}</span>
                        {quiz.timeSpent && (
                          <span className="hidden sm:inline"> • {quiz.timeSpent}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setScoreReviewModal(quiz)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                        >
                          Review
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartQuiz(quiz)}
                          className="px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                        >
                          <RotateCcw size={12} />
                          <span>Retake</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium truncate">
                        <Calendar size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">{quiz.deadline || "Available Anytime"}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStartQuiz(quiz)}
                        className={`px-4 py-2 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shrink-0 ${theme.buttonBg}`}
                      >
                        <Play size={12} className="fill-white" />
                        <span>Start Test</span>
                        <ArrowRight size={13} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Search size={22} />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Quizzes Match Your Filter
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mt-1 mb-4">
            {searchQuery
              ? `No tests match "${searchQuery}". Try searching for another topic or reset your filters.`
              : "No quizzes available for the selected filters."}
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-[#3b49df] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#2f3cb3] transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* START / RETAKE QUIZ MODAL                                     */}
      {/* ------------------------------------------------------------- */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-indigo-50/30">
              <div>
                <span className="text-[10px] font-black uppercase text-[#3b49df] tracking-wider block">
                  {activeQuizModal.category || "SPECIALIZATION ASSESSMENT"}
                </span>
                <h3 className="font-black text-base text-slate-900 mt-0.5">
                  {activeQuizModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveQuizModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2.5">
                <AlertCircle
                  size={16}
                  className="text-amber-600 shrink-0 mt-0.5"
                />
                <div className="space-y-1">
                  <span className="font-bold block">
                    Important Examination Guidelines:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                    <li>
                      Duration is {activeQuizModal.durationMinutes} minutes with{" "}
                      {activeQuizModal.totalQuestions} multiple choice questions.
                    </li>
                    <li>
                      Requires a minimum benchmark of{" "}
                      {activeQuizModal.passScorePercentage}% to pass.
                    </li>
                    <li>
                      Do not switch tabs or reload the browser while the examination timer is active.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Timer Window
                  </span>
                  <span className="font-black text-slate-900">
                    {activeQuizModal.durationMinutes} Minutes
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Passing Benchmark
                  </span>
                  <span className="font-black text-emerald-700">
                    {activeQuizModal.passScorePercentage}% Required
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveQuizModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBeginExamination}
                  className="px-5 py-2.5 rounded-xl bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center space-x-1.5 active:scale-95"
                >
                  <Play size={13} className="fill-white" />
                  <span>Begin Examination Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REVIEW RESULT MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {scoreReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/60 to-teal-50/40">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Examination Results
                  </h3>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">
                    Verified in Student Ledger
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScoreReviewModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center py-2 space-y-1">
                <div className="inline-block p-4 rounded-full bg-emerald-50 border-4 border-emerald-100 text-3xl font-black text-emerald-700 shadow-inner">
                  {scoreReviewModal.studentScore}%
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-2">
                  {scoreReviewModal.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {scoreReviewModal.courseTitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Result Status
                  </span>
                  <span className="font-extrabold text-emerald-700">
                    PASSED
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Passing Required
                  </span>
                  <span className="font-extrabold text-slate-800">
                    {scoreReviewModal.passScorePercentage}%
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Time Spent
                  </span>
                  <span className="font-bold text-slate-800">
                    {scoreReviewModal.timeSpent || "14 mins"}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Completion Date
                  </span>
                  <span className="font-bold text-slate-800">
                    {scoreReviewModal.completedDate || "18 Feb 2026"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const target = scoreReviewModal;
                    setScoreReviewModal(null);
                    handleStartQuiz(target);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <RotateCcw size={12} />
                  <span>Retake Test</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScoreReviewModal(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ALL COMPLETED QUIZZES POPUP MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {showAllCompletedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[88vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-blue-50/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-2xs">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                      Passed Assessments
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-extrabold border border-emerald-200">
                      {passedCount} Completed
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mt-0.5">
                    Completed Quizzes & Certifications
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAllCompletedModal(false);
                  setCompletedSearchQuery("");
                }}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Search & Summary Row */}
            <div className="p-4 sm:px-6 bg-slate-50/80 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search completed quizzes by title or course..."
                  value={completedSearchQuery}
                  onChange={(e) => setCompletedSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold shrink-0">
                <Award size={14} className="text-amber-500" />
                <span>
                  Average Score: <strong className="text-slate-900 font-extrabold">{avgScore}</strong>
                </span>
              </div>
            </div>

            {/* List of Completed Quizzes */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-3 flex-1">
              {quizzes
                .filter((q) => q.studentStatus === "passed")
                .filter((q) => {
                  if (!completedSearchQuery.trim()) return true;
                  const term = completedSearchQuery.toLowerCase();
                  return (
                    q.title?.toLowerCase().includes(term) ||
                    q.courseTitle?.toLowerCase().includes(term) ||
                    q.category?.toLowerCase().includes(term)
                  );
                })
                .map((quiz) => {
                  const theme = getCategoryTheme(quiz.category);
                  const CategoryIcon = theme.icon;
                  return (
                    <div
                      key={quiz.id}
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 p-4 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs ${theme.iconBg}`}
                        >
                          <CategoryIcon size={20} className={theme.accent} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${theme.badgeBg}`}
                            >
                              {quiz.category}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">
                              {quiz.courseTitle}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                            {quiz.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1.5 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-slate-400" />
                              Completed on {quiz.completedDate || "Recently"}
                            </span>
                            {quiz.timeSpent && (
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-slate-400" />
                                Time: {quiz.timeSpent}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-slate-600">
                              <HelpCircle size={12} className="text-blue-500" />
                              {quiz.totalQuestions} Questions
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Score & Actions */}
                      <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-xl text-sm font-black bg-emerald-600 text-white shadow-xs">
                            {quiz.studentScore}%
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 uppercase hidden sm:inline">
                            Passed
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAllCompletedModal(false);
                              setScoreReviewModal(quiz);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold transition-all cursor-pointer"
                          >
                            Review
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAllCompletedModal(false);
                              handleStartQuiz(quiz);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                            title="Retake Quiz"
                          >
                            <RotateCcw size={12} />
                            <span className="hidden sm:inline">Retake</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Showing <strong>{quizzes.filter((q) => q.studentStatus === "passed").length}</strong> passed assessments
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAllCompletedModal(false);
                  setCompletedSearchQuery("");
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuizzesPage;
