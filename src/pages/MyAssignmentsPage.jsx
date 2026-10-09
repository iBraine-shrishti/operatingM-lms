import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { 
  CheckSquare, Search, Upload, Calendar, Clock, CheckCircle2, 
  Award, X, Filter, ExternalLink, FileText, Check, AlertCircle,
  FileCheck2, ChevronRight, ChevronDown, Sparkles, Laptop, Palette, Share2,
  GraduationCap, BarChart3, Target, Layers, BookOpen, Eye, Megaphone
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

// Color themes & icons for distinct course identities (matching screenshot pills)
const COURSE_THEMES = {
  "course-4": {
    name: "Creative Designing",
    short: "Creative & UI/UX",
    icon: Palette,
    pillStyle: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/90 dark:border-rose-800/60",
    dot: "bg-rose-500",
  },
  "course-3": {
    name: "Advanced Topics",
    short: "Career & Guidance",
    icon: GraduationCap,
    pillStyle: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border-sky-200/90 dark:border-sky-800/60",
    dot: "bg-sky-500",
  },
  "course-1": {
    name: "Social Media Marketing",
    short: "Social Media",
    icon: Share2,
    pillStyle: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-200/90 dark:border-purple-800/60",
    dot: "bg-purple-500",
  },
  "course-8": {
    name: "Search Engine Optimization (SEO)",
    short: "SEO & Analytics",
    icon: BarChart3,
    pillStyle: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-cyan-200/90 dark:border-cyan-800/60",
    dot: "bg-cyan-500",
  },
  "course-6": {
    name: "Google Ads",
    short: "Digital Marketing",
    icon: Megaphone,
    pillStyle: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/90 dark:border-amber-800/60",
    dot: "bg-amber-500",
  },
  "course-5": {
    name: "Google Analytics Course",
    short: "Analytics",
    icon: BarChart3,
    pillStyle: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60",
    dot: "bg-emerald-500",
  },
  "course-7": {
    name: "Website Development With WordPress",
    short: "WordPress & CMS",
    icon: Laptop,
    pillStyle: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300 border-teal-200/90 dark:border-teal-800/60",
    dot: "bg-teal-500",
  },
};

const getCourseTheme = (courseId, courseTitle = "") => {
  if (courseId && COURSE_THEMES[courseId]) return COURSE_THEMES[courseId];
  const t = (courseTitle || "").toLowerCase();
  if (t.includes("seo")) return COURSE_THEMES["course-8"];
  if (t.includes("word") || t.includes("web")) return COURSE_THEMES["course-7"];
  if (t.includes("design") || t.includes("creative")) return COURSE_THEMES["course-4"];
  if (t.includes("social")) return COURSE_THEMES["course-1"];
  if (t.includes("analytic")) return COURSE_THEMES["course-5"];
  if (t.includes("ads") || t.includes("ppc") || t.includes("digital marketing")) return COURSE_THEMES["course-6"];
  if (t.includes("advanced") || t.includes("career")) return COURSE_THEMES["course-3"];
  return {
    name: courseTitle,
    short: courseTitle,
    icon: BookOpen,
    pillStyle: "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400",
  };
};

const getDaysLeftText = (dueDate) => {
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

export const MyAssignmentsPage = () => {
  const { showToast } = useToast();
  const [assignments, setAssignments] = useState(() => lmsService.getAssignments());
  const courses = lmsService.getCourses();

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all"); // 'all' | 'pending' | 'submitted' | 'graded'
  const [sortBy, setSortBy] = useState("dueDateAsc"); // 'dueDateAsc' | 'dueDateDesc' | 'title' | 'status'

  // Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissionLink, setSubmissionLink] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [fileName, setFileName] = useState("");

  // Automatically open target assignment if specified in query string (?id=...)
  useEffect(() => {
    const targetId = searchParams.get("id");
    if (targetId && assignments.length > 0) {
      const match = assignments.find((a) => a.id === targetId);
      if (match) {
        setActiveAssignment(match);
        setIsSubmitModalOpen(true);
      }
    }
  }, [searchParams, assignments]);

  // Feedback Modal State
  const [feedbackModalAssignment, setFeedbackModalAssignment] = useState(null);

  // Status counts
  const pendingCount = useMemo(() => assignments.filter(a => a.status === 'pending').length, [assignments]);
  const submittedCount = useMemo(() => assignments.filter(a => a.status === 'submitted').length, [assignments]);
  const gradedCount = useMemo(() => assignments.filter(a => a.status === 'graded').length, [assignments]);

  // Filtered & Sorted Assignments
  const filteredAssignments = useMemo(() => {
    let result = assignments.filter((a) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = a.title?.toLowerCase().includes(q);
        const matchesCourse = a.courseTitle?.toLowerCase().includes(q);
        const matchesInst = a.instructions?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCourse && !matchesInst) {
          return false;
        }
      }

      // Course filter
      if (selectedCourse !== "all") {
        const courseObj = courses.find((c) => c.id === selectedCourse);
        if (courseObj && a.courseTitle !== courseObj.title && a.courseId !== selectedCourse) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== "all") {
        if (a.status !== selectedStatus) {
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
      return 0;
    });

    return result;
  }, [assignments, searchQuery, selectedCourse, selectedStatus, sortBy, courses]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCourse !== "all" || selectedStatus !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("all");
    setSelectedStatus("all");
    setSortBy("dueDateAsc");
  };

  const openSubmitModal = (assignment = null) => {
    const target = assignment || assignments.find(a => a.status === 'pending') || assignments[0];
    setActiveAssignment(target);
    setSubmissionLink("");
    setSubmissionNotes("");
    setFileName("");
    setIsSubmitModalOpen(true);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!activeAssignment) return;

    if (!submissionLink.trim() && !fileName) {
      showToast("Please provide a project link or select a file to submit.", "warning", "Submission Required");
      return;
    }

    lmsService.submitAssignment(activeAssignment.id, {
      submissionLink: submissionLink.trim(),
      submissionNotes: submissionNotes.trim(),
      submittedFileName: fileName || "assignment_project_final.pdf"
    });

    setAssignments(lmsService.getAssignments());
    setIsSubmitModalOpen(false);
    showToast(`Assignment "${activeAssignment.title}" submitted successfully!`, "success", "Work Submitted");
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER           */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.myAssignments}
        metrics={[
          { value: assignments.length, label: "Total Tasks", dotColor: "bg-blue-600" },
          { value: pendingCount, label: "Pending", dotColor: "bg-rose-500" },
          { value: submittedCount, label: "Submitted", dotColor: "bg-purple-500" },
          { value: gradedCount, label: "Graded", dotColor: "bg-emerald-500" },
        ]}
        action={
          <button
            onClick={() => openSubmitModal()}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Upload size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>+ Submit Assignment</span>
          </button>
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR - MATCHING EXACT REFERENCE DESIGN         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Row: Search + Course Filter + Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by title, course, or instructions..."
              className="w-full pl-11 pr-9 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
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
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer pr-10"
            >
              <option value="all">All Enrolled Courses ({assignments.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative min-w-[230px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer pr-10"
            >
              <option value="dueDateAsc">Sort: Due Date (Earliest)</option>
              <option value="dueDateDesc">Sort: Due Date (Latest)</option>
              <option value="title">Sort: Title (A-Z)</option>
              <option value="status">Sort: Status</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Second Row: Status Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1.5 sm:pb-0 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2 shrink-0">
              STATUS:
            </span>
            <button
              onClick={() => setSelectedStatus("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedStatus === "all"
                  ? "bg-[#2563eb] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All ({assignments.length})
            </button>
            <button
              onClick={() => setSelectedStatus("pending")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                selectedStatus === "pending"
                  ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                  : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/60"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedStatus === "pending" ? "bg-white" : "bg-rose-500"}`}></span>
              <span>Pending ({pendingCount})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("submitted")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                selectedStatus === "submitted"
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                  : "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200/80 dark:border-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-900/60"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedStatus === "submitted" ? "bg-white" : "bg-purple-500"}`}></span>
              <span>Submitted ({submittedCount})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("graded")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                selectedStatus === "graded"
                  ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedStatus === "graded" ? "bg-white" : "bg-emerald-500"}`}></span>
              <span>Graded ({gradedCount})</span>
            </button>
          </div>

          {/* Active Filter Clear action */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline flex items-center space-x-1 self-start sm:self-auto cursor-pointer shrink-0"
            >
              <X size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* HIGH-DENSITY TABLE VIEW - MATCHING REFERENCE DESIGNS          */}
      {/* ------------------------------------------------------------- */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
            <CheckSquare size={26} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            No assignments matched your search criteria
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {hasActiveFilters
              ? "Try adjusting your search terms or clearing course and status filters to view more assignments."
              : "No assignments are currently assigned for your enrolled courses."}
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
              onClick={() => openSubmitModal()}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer shadow-xs"
            >
              + Submit Work
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/30">
                  <th className="py-4 px-6 w-14 text-center">#</th>
                  <th className="py-4 px-6 min-w-[280px]">Assignment</th>
                  <th className="py-4 px-6 min-w-[170px]">Course</th>
                  <th className="py-4 px-6 min-w-[150px]">Due Date</th>
                  <th className="py-4 px-6 min-w-[110px]">Max Points</th>
                  <th className="py-4 px-6 min-w-[130px]">Submissions</th>
                  <th className="py-4 px-6 min-w-[140px]">Status</th>
                  <th className="py-4 px-6 min-w-[110px]">Score</th>
                  <th className="py-4 px-6 min-w-[140px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
                {filteredAssignments.map((a, index) => {
                  const isGraded = a.status === "graded";
                  const isSubmitted = a.status === "submitted";
                  const isPending = a.status === "pending" || !a.status;
                  const theme = getCourseTheme(a.courseId, a.courseTitle);
                  const CourseIcon = theme.icon;

                  return (
                    <tr
                      key={a.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors group"
                    >
                      {/* # Index */}
                      <td className="py-5 px-6 text-sm font-bold text-slate-400 dark:text-slate-500 text-center whitespace-nowrap">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* Assignment Title & Brief */}
                      <td className="py-5 px-6 max-w-md">
                        <div
                          onClick={() => {
                            if (isGraded) setFeedbackModalAssignment(a);
                            else openSubmitModal(a);
                          }}
                          className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {a.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-1 leading-relaxed">
                          {a.instructions}
                        </div>
                      </td>

                      {/* Course Pill */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.pillStyle}`}>
                          <CourseIcon size={13} className="shrink-0" />
                          <span>{theme.short}</span>
                        </span>
                      </td>

                      {/* Due Date */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {a.dueDate}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 pl-5 font-medium">
                          {getDaysLeftText(a.dueDate)}
                        </div>
                      </td>

                      {/* Max Points */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {a.maxScore || 100} pts
                        </span>
                      </td>

                      {/* Submissions */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {a.totalSubmissions || 45} submissions
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        {isGraded && (
                          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/90 dark:border-emerald-800/60">
                            <CheckCircle2 size={13} className="shrink-0" />
                            <span>GRADED</span>
                          </span>
                        )}
                        {isSubmitted && (
                          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200/90 dark:border-purple-800/60">
                            <CheckCircle2 size={13} className="shrink-0" />
                            <span>SUBMITTED</span>
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/90 dark:border-rose-800/60">
                            <Clock size={13} className="shrink-0" />
                            <span>PENDING</span>
                          </span>
                        )}
                      </td>

                      {/* Score */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        {isGraded ? (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/90 dark:border-emerald-800/60">
                            {a.score} / 100
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold pl-2">-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (isGraded) setFeedbackModalAssignment(a);
                            else openSubmitModal(a);
                          }}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs group-hover:border-blue-300 dark:group-hover:border-blue-700"
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                          <ChevronRight size={13} className="text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBMISSION MODAL - FULLY RESPONSIVE                           */}
      {/* ------------------------------------------------------------- */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#3b49df] dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Upload size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Submit Assignment</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Upload your completed project or provide link.</p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-4 text-xs">
              {/* Selected Assignment dropdown */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Select Assignment *
                </label>
                <select
                  value={activeAssignment?.id || ""}
                  onChange={(e) => {
                    const found = assignments.find(a => a.id === e.target.value);
                    if (found) setActiveAssignment(found);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500"
                >
                  {assignments.map(a => (
                    <option key={a.id} value={a.id}>
                      [{a.courseTitle}] {a.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Instructions Preview */}
              {activeAssignment && (
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-[11px] block">Requirements:</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {activeAssignment.instructions}
                  </p>
                </div>
              )}

              {/* Project Link Input */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Project Link (Google Drive, Figma, GitHub, Staging URL)
                </label>
                <input
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://drive.google.com/... or https://figma.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500"
                />
              </div>

              {/* File Attachment Drag/Drop Mock */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Or Attach File (Any format: PDF, ZIP, DOCX, Media, Figma, Code - Max 50MB)
                </label>
                <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-[#3b49df] dark:hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/40 hover:bg-blue-50/20 dark:hover:bg-blue-950/30">
                  <Upload size={20} className="text-slate-400 dark:text-slate-500 mb-1.5" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
                    {fileName ? fileName : "Click to select or drag and drop your file here"}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Supports ANY format (PDF, DOCX, ZIP, MP4, PNG, Figma, code, etc. up to 50MB)
                  </span>
                  <input
                    type="file"
                    accept="*/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Submission Notes */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Student Notes / Methodology Comments (Optional)
                </label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Summarize key assumptions, password credentials for staging, or extra observations..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#3b49df] hover:bg-[#2f3cb3] text-white font-semibold shadow-xs transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Upload size={14} />
                  <span>Confirm Submission</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW FEEDBACK MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {feedbackModalAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Assignment Evaluation</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{feedbackModalAssignment.courseTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setFeedbackModalAssignment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{feedbackModalAssignment.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{feedbackModalAssignment.instructions}</p>
              </div>

              <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300">Final Grade:</span>
                  <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">{feedbackModalAssignment.score} / 100</span>
                </div>
                <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px] block mb-1">Official Instructor Notes:</span>
                  <p className="text-emerald-950 dark:text-emerald-200 text-xs italic leading-relaxed">
                    "{feedbackModalAssignment.feedback}"
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setFeedbackModalAssignment(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignmentsPage;
