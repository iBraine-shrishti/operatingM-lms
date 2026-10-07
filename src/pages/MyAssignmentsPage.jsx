import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { 
  BookCheck, Search, Upload, Calendar, Clock, CheckCircle2, 
  Award, X, Filter, ExternalLink, FileText, Check, AlertCircle,
  FileCheck2, ChevronRight, Sparkles, Laptop, Palette, Share2,
  GraduationCap, BarChart3, Target, Layers, BookOpen
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";

// Color themes & icons for distinct course identities
const COURSE_THEMES = {
  "course-8": {
    name: "Search Engine Optimization (SEO)",
    short: "SEO Mastery",
    icon: Search,
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/90",
    headerColor: "text-emerald-700",
    borderAccent: "border-t-emerald-500",
    subtleBg: "bg-emerald-50/30",
    pillDot: "bg-emerald-500",
  },
  "course-7": {
    name: "Website Development With WordPress",
    short: "WordPress & CMS",
    icon: Laptop,
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200/90",
    headerColor: "text-teal-700",
    borderAccent: "border-t-teal-500",
    subtleBg: "bg-teal-50/30",
    pillDot: "bg-teal-500",
  },
  "course-4": {
    name: "Creative Designing",
    short: "Creative & UI/UX",
    icon: Palette,
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200/90",
    headerColor: "text-rose-700",
    borderAccent: "border-t-rose-500",
    subtleBg: "bg-rose-50/30",
    pillDot: "bg-rose-500",
  },
  "course-1": {
    name: "Social Media Marketing",
    short: "Social Media",
    icon: Share2,
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200/90",
    headerColor: "text-purple-700",
    borderAccent: "border-t-purple-500",
    subtleBg: "bg-purple-50/30",
    pillDot: "bg-purple-500",
  },
  "course-2": {
    name: "Counseling Video, Quiz and Brochure",
    short: "Career & Guidance",
    icon: GraduationCap,
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200/90",
    headerColor: "text-sky-700",
    borderAccent: "border-t-sky-500",
    subtleBg: "bg-sky-50/30",
    pillDot: "bg-sky-500",
  },
  "course-5": {
    name: "Google Analytics Course",
    short: "Google Analytics",
    icon: BarChart3,
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200/90",
    headerColor: "text-amber-700",
    borderAccent: "border-t-amber-500",
    subtleBg: "bg-amber-50/30",
    pillDot: "bg-amber-500",
  },
  "course-6": {
    name: "Google Ads",
    short: "Google Ads (PPC)",
    icon: Target,
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200/90",
    headerColor: "text-blue-700",
    borderAccent: "border-t-blue-500",
    subtleBg: "bg-blue-50/30",
    pillDot: "bg-blue-500",
  },
  "course-3": {
    name: "Advanced Topics",
    short: "Advanced Capstone",
    icon: Layers,
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200/90",
    headerColor: "text-indigo-700",
    borderAccent: "border-t-indigo-500",
    subtleBg: "bg-indigo-50/30",
    pillDot: "bg-indigo-500",
  },
};

const getCourseTheme = (courseId, courseTitle = "") => {
  if (courseId && COURSE_THEMES[courseId]) return COURSE_THEMES[courseId];
  const t = (courseTitle || "").toLowerCase();
  if (t.includes("seo")) return COURSE_THEMES["course-8"];
  if (t.includes("word") || t.includes("web")) return COURSE_THEMES["course-7"];
  if (t.includes("design") || t.includes("creative")) return COURSE_THEMES["course-4"];
  if (t.includes("social")) return COURSE_THEMES["course-1"];
  if (t.includes("counsel") || t.includes("career")) return COURSE_THEMES["course-2"];
  if (t.includes("analytic")) return COURSE_THEMES["course-5"];
  if (t.includes("ads") || t.includes("ppc")) return COURSE_THEMES["course-6"];
  if (t.includes("advanced")) return COURSE_THEMES["course-3"];
  return {
    name: courseTitle,
    short: courseTitle,
    icon: BookOpen,
    badgeBg: "bg-slate-50 text-slate-800 border-slate-200",
    headerColor: "text-slate-800",
    borderAccent: "border-t-[#3b49df]",
    subtleBg: "bg-slate-50/30",
    pillDot: "bg-slate-400",
  };
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
      {/* HEADER BANNER - FULLY RESPONSIVE WITH BRANDED BACKGROUND      */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="relative bg-cover bg-center rounded-2xl border border-blue-100/80 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all overflow-hidden"
        style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-blue-700 text-sm font-extrabold uppercase tracking-wider">
            <BookCheck size={17} />
            <span>Practical Assessment & Capstone</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Assignments
          </h1>
          <p className="text-slate-900/90 text-sm sm:text-base max-w-2xl leading-relaxed font-semibold">
            Submit your live client audits, campaign spreadsheets, Figma design decks, and tracking implementations.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3 border-t border-slate-200/80 text-sm font-medium">
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b49df] inline-block"></span>
              <span className="font-extrabold text-slate-900">{assignments.length}</span>
              <span className="text-slate-800 font-semibold">Total</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{pendingCount}</span>
              <span className="text-slate-800 font-semibold">Pending</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{submittedCount}</span>
              <span className="text-slate-800 font-semibold">Submitted</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{gradedCount}</span>
              <span className="text-slate-800 font-semibold">Graded</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0">
          <button
            onClick={() => openSubmitModal()}
            className="w-full sm:w-auto bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
          >
            <Upload size={17} />
            <span>Submit Assignment</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR - RESPONSIVE STACKED & GRID DESIGN        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Row: Search + Course Filter + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Live Search Input */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by title, course, or instructions..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
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
              <option value="all">All Enrolled Courses ({assignments.length})</option>
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
              <option value="dueDateAsc">Sort: Due Date (Earliest)</option>
              <option value="dueDateDesc">Sort: Due Date (Latest)</option>
              <option value="title">Sort: Title (A-Z)</option>
              <option value="status">Sort: Status</option>
            </select>
          </div>
        </div>

        {/* Second Row: Status Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar pb-1.5 sm:pb-0 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline-block shrink-0">
              Status:
            </span>
            {[
              { id: "all", label: `All (${assignments.length})` },
              { id: "pending", label: `Pending (${pendingCount})` },
              { id: "submitted", label: `Submitted (${submittedCount})` },
              { id: "graded", label: `Graded (${gradedCount})` },
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

          {/* Active Filter Clear action */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center space-x-1 self-start sm:self-auto cursor-pointer shrink-0"
            >
              <X size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ASSIGNMENTS GRID - FULLY RESPONSIVE                           */}
      {/* ------------------------------------------------------------- */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <BookCheck size={26} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            No assignments matched your search criteria
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            {hasActiveFilters
              ? "Try adjusting your search terms or clearing course and status filters to view more assignments."
              : "No assignments are currently assigned for your enrolled courses."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            )}
            <button
              onClick={() => openSubmitModal()}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#3b49df] text-white hover:bg-[#2f3cb3] transition-colors cursor-pointer"
            >
              + Submit Work
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredAssignments.map((a) => {
            const isGraded = a.status === "graded";
            const isSubmitted = a.status === "submitted";
            const isPending = a.status === "pending" || !a.status;
            const theme = getCourseTheme(a.courseId, a.courseTitle);
            const CourseIcon = theme.icon;

            return (
              <div
                key={a.id}
                className={`bg-white rounded-2xl border border-slate-200/80 border-t-4 ${theme.borderAccent} p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group hover:translate-y-[-2px]`}
              >
                <div className="space-y-3.5">
                  {/* Top Header: Bold Course Heading & Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${theme.pillDot} shrink-0`} />
                        <h4 className={`text-sm sm:text-base font-black uppercase tracking-wider truncate ${theme.headerColor}`}>
                          {a.courseTitle}
                        </h4>
                      </div>
                      <div className="mt-1">
                        <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-xs font-bold ${theme.badgeBg}`}>
                          <CourseIcon size={13} className="shrink-0" />
                          <span>{theme.short}</span>
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isPending && (
                        <span className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock size={13} className="text-amber-600" />
                          <span>PENDING</span>
                        </span>
                      )}
                      {isSubmitted && (
                        <span className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          <CheckCircle2 size={13} className="text-blue-600" />
                          <span>SUBMITTED</span>
                        </span>
                      )}
                      {isGraded && (
                        <span className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Award size={13} className="text-emerald-600" />
                          <span>GRADED • {a.score}%</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Assignment Title */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug group-hover:text-[#3b49df] transition-colors mt-0.5">
                    {a.title}
                  </h3>

                  {/* Metadata Strip: Due Date & Max Score */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-sm text-slate-600 font-medium pt-0.5">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={14} className="text-slate-400" />
                      <span>Due: <strong className="text-slate-900 font-bold">{a.dueDate}</strong></span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center space-x-1.5">
                      <FileCheck2 size={14} className="text-slate-400" />
                      <span>Max: <strong className="text-slate-900 font-bold">{a.maxScore || 100} pts</strong></span>
                    </div>
                    {a.totalSubmissions && (
                      <>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <div className="hidden sm:flex items-center space-x-1 text-slate-500 text-xs">
                          <span>({a.totalSubmissions} submissions)</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Brief / Instructions */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-1 text-xs font-black uppercase tracking-wider text-slate-500">
                      <FileText size={13} />
                      <span>Project Brief</span>
                    </div>
                    <div className="text-sm text-slate-700 bg-slate-50/90 border border-slate-100 p-3.5 sm:p-4 rounded-xl leading-relaxed whitespace-pre-line break-words font-medium">
                      {a.instructions}
                    </div>
                  </div>

                  {/* Evaluation / Feedback snippet if graded */}
                  {isGraded && a.feedback && (
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 sm:p-4 text-sm space-y-1.5">
                      <div className="flex items-center justify-between text-emerald-900 font-black text-xs sm:text-sm">
                        <span className="flex items-center space-x-1.5">
                          <Sparkles size={14} className="text-emerald-600" />
                          <span>Instructor Feedback & Score</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                          {a.score} / 100
                        </span>
                      </div>
                      <p className="text-emerald-950 text-sm leading-relaxed italic font-medium">
                        "{a.feedback}"
                      </p>
                    </div>
                  )}

                  {/* Submitted status snippet if submitted */}
                  {isSubmitted && (
                    <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 sm:p-4 text-sm space-y-1">
                      <div className="flex items-center space-x-1.5 text-blue-900 font-black text-xs sm:text-sm">
                        <CheckCircle2 size={14} className="text-blue-600" />
                        <span>Work Submitted on {a.submittedAt || "Recently"}</span>
                      </div>
                      <p className="text-blue-950 text-sm leading-relaxed font-medium">
                        Under instructor review. Grades and evaluation rubric will be unlocked upon approval.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-sm">
                  {isPending && (
                    <>
                      <span className="text-xs text-slate-500 font-medium">
                        Due: <strong className="text-slate-800 font-semibold">{a.dueDate || "Upcoming"}</strong>
                      </span>
                      <button
                        onClick={() => openSubmitModal(a)}
                        className="bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer active:scale-95 shrink-0"
                      >
                        <Upload size={13} />
                        <span>Submit Work</span>
                      </button>
                    </>
                  )}

                  {isSubmitted && (
                    <>
                      <span className="text-[11px] text-slate-500 font-medium">Status: In Review</span>
                      <button
                        onClick={() => openSubmitModal(a)}
                        className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                      >
                        <Upload size={13} />
                        <span>Resubmit</span>
                      </button>
                    </>
                  )}

                  {isGraded && (
                    <>
                      <span className="text-xs font-bold text-emerald-700">Passed ({a.score}%)</span>
                      <button
                        onClick={() => setFeedbackModalAssignment(a)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                      >
                        <Award size={13} />
                        <span>View Details</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBMISSION MODAL - FULLY RESPONSIVE                           */}
      {/* ------------------------------------------------------------- */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3b49df] flex items-center justify-center shrink-0">
                  <Upload size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Submit Assignment</h3>
                  <p className="text-[11px] text-slate-500">Upload your completed project or provide link.</p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-4 text-xs">
              {/* Selected Assignment dropdown */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Select Assignment *
                </label>
                <select
                  value={activeAssignment?.id || ""}
                  onChange={(e) => {
                    const found = assignments.find(a => a.id === e.target.value);
                    if (found) setActiveAssignment(found);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
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
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-600 text-[11px] block">Requirements:</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {activeAssignment.instructions}
                  </p>
                </div>
              )}

              {/* Project Link Input */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Project Link (Google Drive, Figma, GitHub, Staging URL)
                </label>
                <input
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://drive.google.com/... or https://figma.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                />
              </div>

              {/* File Attachment Drag/Drop Mock */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Or Attach File (PDF, ZIP, DOCX, XLSX - Max 50MB)
                </label>
                <label className="border-2 border-dashed border-slate-200 hover:border-[#3b49df] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20">
                  <Upload size={20} className="text-slate-400 mb-1.5" />
                  <span className="font-semibold text-slate-700 text-xs">
                    {fileName ? fileName : "Click to select or drag and drop your file here"}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Supports .pdf, .zip, .docx up to 50MB
                  </span>
                  <input
                    type="file"
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
                <label className="font-bold text-slate-700 block mb-1">
                  Student Notes / Methodology Comments (Optional)
                </label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Summarize key assumptions, password credentials for staging, or extra observations..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Assignment Evaluation</h3>
                  <p className="text-[11px] text-slate-500">{feedbackModalAssignment.courseTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setFeedbackModalAssignment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{feedbackModalAssignment.title}</h4>
                <p className="text-slate-500 mt-1">{feedbackModalAssignment.instructions}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">Final Grade:</span>
                  <span className="text-base font-extrabold text-emerald-700">{feedbackModalAssignment.score} / 100</span>
                </div>
                <div className="pt-2 border-t border-emerald-200/60">
                  <span className="font-bold text-emerald-800 text-[11px] block mb-1">Official Instructor Notes:</span>
                  <p className="text-emerald-950 text-xs italic leading-relaxed">
                    "{feedbackModalAssignment.feedback}"
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setFeedbackModalAssignment(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
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
