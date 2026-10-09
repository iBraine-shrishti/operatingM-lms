import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Play,
  ChevronDown,
  X,
  CheckSquare,
  List,
  LayoutGrid,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  Palette,
  GraduationCap,
  Share2,
  Laptop,
  Megaphone,
  BookOpen,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { QuizManagementDetailFlow } from "../components/admin/QuizManagementDetailFlow";

// Distinct course pill identities matching design system
const COURSE_THEMES = {
  "course-4": {
    name: "Creative Designing",
    short: "Creative & UI/UX",
    icon: Palette,
    pillStyle:
      "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/90 dark:border-rose-800/60",
    dot: "bg-rose-500",
  },
  "course-3": {
    name: "Advanced Topics",
    short: "Career & Guidance",
    icon: GraduationCap,
    pillStyle:
      "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border-sky-200/90 dark:border-sky-800/60",
    dot: "bg-sky-500",
  },
  "course-1": {
    name: "Social Media Marketing",
    short: "Social Media",
    icon: Share2,
    pillStyle:
      "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-200/90 dark:border-purple-800/60",
    dot: "bg-purple-500",
  },
  "course-8": {
    name: "Search Engine Optimization (SEO)",
    short: "SEO & Analytics",
    icon: BookOpen,
    pillStyle:
      "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-200/90 dark:border-cyan-800/60",
    dot: "bg-cyan-500",
  },
  "course-6": {
    name: "Google Ads",
    short: "Digital Marketing",
    icon: Megaphone,
    pillStyle:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/90 dark:border-amber-800/60",
    dot: "bg-amber-500",
  },
  "course-5": {
    name: "Google Analytics Course",
    short: "Analytics",
    icon: Award,
    pillStyle:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60",
    dot: "bg-emerald-500",
  },
  "course-7": {
    name: "Website Development With WordPress",
    short: "WordPress & CMS",
    icon: Laptop,
    pillStyle:
      "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-200/90 dark:border-teal-800/60",
    dot: "bg-teal-500",
  },
};

const getCourseTheme = (courseId, courseTitle = "") => {
  if (courseId && COURSE_THEMES[courseId]) return COURSE_THEMES[courseId];
  const t = (courseTitle || "").toLowerCase();
  if (t.includes("seo")) return COURSE_THEMES["course-8"];
  if (t.includes("word") || t.includes("web")) return COURSE_THEMES["course-7"];
  if (t.includes("design") || t.includes("creative"))
    return COURSE_THEMES["course-4"];
  if (t.includes("social")) return COURSE_THEMES["course-1"];
  if (t.includes("analytic")) return COURSE_THEMES["course-5"];
  if (t.includes("ads") || t.includes("ppc") || t.includes("digital marketing"))
    return COURSE_THEMES["course-6"];
  if (t.includes("advanced") || t.includes("career"))
    return COURSE_THEMES["course-3"];
  return {
    name: courseTitle,
    short: courseTitle,
    icon: BookOpen,
    pillStyle:
      "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400",
  };
};

export const ManageQuizzesPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const courses = lmsService.getCourses();
  const [quizzes, setQuizzes] = useState(() => lmsService.getQuizzes());

  // Selected Quiz for dedicated management flow
  const manageParam = searchParams.get("manage");
  const [selectedQuizForDetail, setSelectedQuizForDetail] = useState(() => {
    if (manageParam) {
      return quizzes.find((q) => q.id === manageParam) || null;
    }
    return null;
  });

  useEffect(() => {
    if (manageParam) {
      const found = quizzes.find((q) => q.id === manageParam);
      if (found) setSelectedQuizForDetail(found);
    }
  }, [manageParam, quizzes]);

  // Filters & display mode states
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("questionsDesc");
  const [selectedFilter, setSelectedFilter] = useState("all"); // 'all' | 'highPass' | 'active'
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'cards'

  // Compute quiz count per course
  const courseQuizCounts = useMemo(() => {
    const map = {};
    quizzes.forEach((q) => {
      map[q.courseId] = (map[q.courseId] || 0) + 1;
    });
    return map;
  }, [quizzes]);

  // Filtered quizzes
  const filteredQuizzes = useMemo(() => {
    return quizzes
      .filter((q) => {
        // Course filter
        if (selectedCourseId !== "all" && q.courseId !== selectedCourseId) {
          return false;
        }
        // Search filter
        if (search.trim()) {
          const s = search.toLowerCase();
          const matchTitle = (q.title || "").toLowerCase().includes(s);
          const matchCourse = (q.courseTitle || "").toLowerCase().includes(s);
          const matchDesc = (q.description || "").toLowerCase().includes(s);
          if (!matchTitle && !matchCourse && !matchDesc) return false;
        }
        // Category filter
        if (selectedFilter === "highPass" && (q.passScorePercentage || 80) < 80) {
          return false;
        }
        if (selectedFilter === "active" && q.status !== "active") {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "questionsDesc") return (b.totalQuestions || 0) - (a.totalQuestions || 0);
        if (sortBy === "durationDesc") return (b.durationMinutes || 0) - (a.durationMinutes || 0);
        if (sortBy === "passScoreDesc") return (b.passScorePercentage || 0) - (a.passScorePercentage || 0);
        if (sortBy === "attemptsDesc") return (b.attemptsCount || 0) - (a.attemptsCount || 0);
        if (sortBy === "titleAsc") return (a.title || "").localeCompare(b.title || "");
        return 0;
      });
  }, [quizzes, selectedCourseId, search, selectedFilter, sortBy]);

  const hasActiveFilters =
    search.trim() !== "" || selectedCourseId !== "all" || selectedFilter !== "all";

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCourseId("all");
    setSelectedFilter("all");
    setSortBy("questionsDesc");
  };

  const handleDeleteQuiz = (id, title) => {
    if (confirm(`Delete quiz "${title}"?`)) {
      lmsService.deleteQuiz(id);
      setQuizzes(lmsService.getQuizzes());
      showToast(`Quiz "${title}" deleted`, "info");
    }
  };

  const handleOpenDetail = (quiz) => {
    setSelectedQuizForDetail(quiz);
    setSearchParams({ manage: quiz.id });
  };

  // If a quiz is selected for the dedicated Management Flow
  if (selectedQuizForDetail) {
    return (
      <div className="space-y-4">
        <QuizManagementDetailFlow
          quiz={selectedQuizForDetail}
          onBack={() => {
            setSelectedQuizForDetail(null);
            setSearchParams({});
          }}
          onEditQuiz={(q) => navigate(`/create-quiz?edit=${q.id}`)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER - ACTIVITY PAGE STYLE (ADMIN CLEAN THEME)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-2 relative z-10 min-w-0">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <CheckSquare size={17} />
            <span>Examination Bank & Quizzes Management</span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Auto-Evaluation Live</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Manage Course Quizzes
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
            Categorized by course. Review assessments, pass criteria, grading thresholds, and student exam attempts.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{quizzes.length}</span>
              <span className="font-semibold">Total Quizzes</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">
                {quizzes.filter((q) => q.status === "active").length || quizzes.length}
              </span>
              <span className="font-semibold">Active Exams</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">80%</span>
              <span className="font-semibold">Passing Cutoff</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">100%</span>
              <span className="font-semibold">Automated Grading</span>
            </div>
          </div>
        </div>

        {/* Action Button - Compact and Right-Aligned */}
        <div className="w-full sm:w-auto shrink-0 relative z-10">
          <button
            onClick={() => navigate("/create-quiz")}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>+ Create Quiz</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SEARCH & CONTROLS TOOLBAR (Matching Manage Assignments)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: Search + Course Filter + Sort + View Mode */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quizzes by title, description, or course..."
              className="w-full pl-11 pr-9 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 transition-all font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter by Course Select */}
          <div className="relative min-w-[240px]">
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer pr-10"
            >
              <option value="all">All Courses ({quizzes.length} Quizzes)</option>
              {courses.map((c) => {
                const count = courseQuizCounts[c.id] || 0;
                return (
                  <option key={c.id} value={c.id}>
                    {c.title} ({count} {count === 1 ? "Quiz" : "Quizzes"})
                  </option>
                );
              })}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative min-w-[210px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer pr-10"
            >
              <option value="questionsDesc">Sort: Most Questions</option>
              <option value="durationDesc">Sort: Duration (Longest)</option>
              <option value="passScoreDesc">Sort: Pass Cutoff (High-Low)</option>
              <option value="attemptsDesc">Sort: Attempts Count</option>
              <option value="titleAsc">Sort: Title (A-Z)</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
          </div>

          {/* View Mode Toggle: Table / Cards */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-end lg:self-auto shrink-0">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                viewMode === "table"
                  ? "bg-white dark:bg-[#0b1329] text-blue-600 dark:text-cyan-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Table View"
            >
              <List size={16} />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                viewMode === "cards"
                  ? "bg-white dark:bg-[#0b1329] text-blue-600 dark:text-cyan-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Cards View"
            >
              <LayoutGrid size={16} />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>
        </div>

        {/* Row 2: Status Pills + Reset Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1 shrink-0">
              FILTER:
            </span>
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedFilter === "all"
                  ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Quizzes ({quizzes.length})
            </button>
            <button
              onClick={() => setSelectedFilter("active")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
                selectedFilter === "active"
                  ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 hover:bg-emerald-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Active Exams</span>
            </button>
            <button
              onClick={() => setSelectedFilter("highPass")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
                selectedFilter === "highPass"
                  ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                  : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 hover:bg-indigo-100"
              }`}
            >
              <span>Cutoff ≥ 80%</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">
              Showing {filteredQuizzes.length} of {quizzes.length} quizzes
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <X size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CONTENT AREA: TABLE VIEW OR CARDS VIEW                     */}
      {/* ------------------------------------------------------------- */}
      {filteredQuizzes.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
            <CheckSquare size={26} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            No quizzes matched your search criteria
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {hasActiveFilters
              ? "Try adjusting your search terms or clearing course filters to view more quizzes."
              : "No quizzes are currently registered in this category."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            )}
            <button
              onClick={() => navigate("/create-quiz")}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer shadow-xs"
            >
              + Create Quiz
            </button>
          </div>
        </div>
      ) : viewMode === "table" ? (
        /* ======================== TABLE VIEW ======================== */
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/30">
                  <th className="py-4 px-6 w-14 text-center">#</th>
                  <th className="py-4 px-6 min-w-[280px]">Quiz Title & Scope</th>
                  <th className="py-4 px-6 min-w-[180px]">Course</th>
                  <th className="py-4 px-6 min-w-[110px]">Questions</th>
                  <th className="py-4 px-6 min-w-[110px]">Duration</th>
                  <th className="py-4 px-6 min-w-[110px]">Pass Cutoff</th>
                  <th className="py-4 px-6 min-w-[110px]">Avg Score</th>
                  <th className="py-4 px-6 min-w-[110px]">Attempts</th>
                  <th className="py-4 px-6 min-w-[220px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
                {filteredQuizzes.map((quiz, index) => {
                  const theme = getCourseTheme(quiz.courseId, quiz.courseTitle);
                  const CourseIcon = theme.icon;

                  return (
                    <tr
                      key={quiz.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors group"
                    >
                      {/* # Index */}
                      <td className="py-4 px-6 text-sm font-bold text-slate-400 dark:text-slate-500 text-center whitespace-nowrap">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* Quiz Title & Scope */}
                      <td className="py-4 px-6 max-w-md">
                        <div
                          onClick={() => handleOpenDetail(quiz)}
                          className="font-bold text-sm text-slate-900 dark:text-white leading-snug hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                        >
                          {quiz.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-0.5 leading-relaxed">
                          {quiz.description || "Standard comprehensive multi-choice assessment test."}
                        </div>
                      </td>

                      {/* Course Pill */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.pillStyle}`}
                        >
                          <CourseIcon size={13} className="shrink-0" />
                          <span>{theme.short}</span>
                        </span>
                      </td>

                      {/* Questions */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                          {quiz.totalQuestions || 20} Qs
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                          {quiz.durationMinutes || 20}m
                        </span>
                      </td>

                      {/* Pass Cutoff */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {quiz.passScorePercentage || 80}%
                        </span>
                      </td>

                      {/* Avg Score */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                          {quiz.averageScore || 0}%
                        </span>
                      </td>

                      {/* Attempts */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 tabular-nums">
                          {quiz.attemptsCount || 0} attempts
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenDetail(quiz)}
                            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-xs hover:shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                            title="Manage Quiz Flow (Statistics, Activity, Submissions, View)"
                          >
                            <span>Manage Quiz</span>
                          </button>

                          <button
                            onClick={() =>
                              showToast(
                                `Starting preview test for "${quiz.title}"...`,
                                "info",
                                "Preview Mode",
                              )
                            }
                            className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Preview Test"
                          >
                            <Play size={15} />
                          </button>

                          <button
                            onClick={() => navigate(`/create-quiz?edit=${quiz.id}`)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Edit Quiz details, settings, and questions"
                          >
                            <Edit size={15} />
                          </button>

                          <button
                            onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Delete Quiz"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ======================== CARDS VIEW ======================== */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuizzes.map((quiz) => {
            const theme = getCourseTheme(quiz.courseId, quiz.courseTitle);
            const CourseIcon = theme.icon;

            return (
              <div
                key={quiz.id}
                className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${theme.pillStyle}`}
                    >
                      <CourseIcon size={12} className="shrink-0" />
                      <span>{theme.short}</span>
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-800 px-2 py-0.5 rounded-md">
                      {quiz.passScorePercentage || 80}% Pass
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenDetail(quiz)}
                    className="font-bold text-slate-900 dark:text-white text-base leading-snug cursor-pointer group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2"
                  >
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {quiz.description || "Comprehensive evaluation assessing practical digital proficiency and core modules."}
                  </p>
                </div>

                {/* 3-column quick metric panel */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50/80 dark:bg-slate-900/60 p-3 rounded-xl text-center text-xs border border-slate-200/60 dark:border-slate-800">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-medium">
                      Questions
                    </span>
                    <strong className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">
                      {quiz.totalQuestions || 20} Qs
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-medium">
                      Duration
                    </span>
                    <strong className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">
                      {quiz.durationMinutes || 20}m
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-medium">
                      Avg Score
                    </span>
                    <strong className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">
                      {quiz.averageScore || 0}%
                    </strong>
                  </div>
                </div>

                {/* Card Footer with Compact Blue Actions */}
                <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {quiz.attemptsCount || 0} Attempts
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleOpenDetail(quiz)}
                      className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center space-x-1 cursor-pointer"
                      title="Manage Quiz Flow (Statistics, Activity, Submissions, View)"
                    >
                      <span>Manage Quiz</span>
                    </button>

                    <button
                      onClick={() => navigate(`/create-quiz?edit=${quiz.id}`)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit Quiz"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                      className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete Quiz"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageQuizzesPage;
