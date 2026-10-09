import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import {
  CheckSquare,
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  X,
  BarChart3,
  SlidersHorizontal,
  Palette,
  GraduationCap,
  Share2,
  Laptop,
  Megaphone,
  BookOpen,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { AdminAssignmentDetailHub } from "../components/admin/AdminAssignmentDetailHub";

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
    icon: BarChart3,
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
    icon: BarChart3,
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

export const ManageAssignmentsPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const courses = lmsService.getCourses();
  const [assignments, setAssignments] = useState(() =>
    lmsService.getAssignments(),
  );

  const urlId = searchParams.get("id");
  const urlTitle = searchParams.get("title");

  // Active assignment if selected or passed in URL
  const activeAssignment = useMemo(() => {
    if (urlId) {
      return assignments.find((a) => a.id === urlId);
    }
    if (urlTitle) {
      return assignments.find(
        (a) => a.title.toLowerCase() === urlTitle.toLowerCase(),
      );
    }
    return null;
  }, [assignments, urlId, urlTitle]);

  const handleOpenManageAssignment = (assign) => {
    setSearchParams({ id: assign.id });
  };

  const handleBackToList = () => {
    setSearchParams({});
  };

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all"); // 'all' | 'pending' | 'submitted' | 'graded'
  const [sortBy, setSortBy] = useState("dueDateAsc");

  // Add / Edit Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Form states
  const [modalCourseId, setModalCourseId] = useState("course-3");
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("2026-10-30");
  const [newMaxScore, setNewMaxScore] = useState(100);
  const [newInstructions, setNewInstructions] = useState("");

  // Counts
  const pendingCount = useMemo(
    () => assignments.filter((a) => a.status === "pending" || !a.status).length,
    [assignments],
  );
  const submittedCount = useMemo(
    () => assignments.filter((a) => a.status === "submitted").length,
    [assignments],
  );
  const gradedCount = useMemo(
    () => assignments.filter((a) => a.status === "graded").length,
    [assignments],
  );

  // Filtered & Sorted Assignments
  const filteredAssignments = useMemo(() => {
    let result = assignments.filter((a) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = a.title?.toLowerCase().includes(q);
        const matchesCourse = a.courseTitle?.toLowerCase().includes(q);
        const matchesInst = a.instructions?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCourse && !matchesInst) return false;
      }

      // Course filter
      if (selectedCourseId !== "all") {
        if (a.courseId !== selectedCourseId) return false;
      }

      // Status filter
      if (selectedStatus !== "all") {
        const status = a.status || "pending";
        if (status !== selectedStatus) return false;
      }

      return true;
    });

    // Sorting
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
        return (a.status || "pending").localeCompare(b.status || "pending");
      }
      return 0;
    });

    return result;
  }, [assignments, searchQuery, selectedCourseId, selectedStatus, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCourseId !== "all" ||
    selectedStatus !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourseId("all");
    setSelectedStatus("all");
    setSortBy("dueDateAsc");
  };

  const handleOpenAddModal = (courseId = null) => {
    setModalCourseId(courseId || courses[0]?.id || "course-3");
    setNewTitle("");
    setNewDueDate("2026-10-30");
    setNewMaxScore(100);
    setNewInstructions("");
    setShowAddModal(true);
  };

  const handleOpenEditModal = (assign) => {
    setEditingAssignment(assign);
    setModalCourseId(assign.courseId);
    setNewTitle(assign.title);
    setNewDueDate(assign.dueDate || "2026-10-30");
    setNewMaxScore(assign.maxScore || 100);
    setNewInstructions(assign.instructions || "");
    setShowEditModal(true);
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("Please enter an assignment title", "warning");
      return;
    }
    const targetCourse =
      courses.find((c) => c.id === modalCourseId) || courses[0];
    const created = lmsService.addAssignment({
      courseId: targetCourse.id,
      courseTitle: targetCourse.title,
      title: newTitle.trim(),
      dueDate: newDueDate,
      maxScore: Number(newMaxScore) || 100,
      instructions:
        newInstructions.trim() ||
        "Submit complete practical project report in PDF.",
    });
    setAssignments(lmsService.getAssignments());
    setShowAddModal(false);
    showToast(
      `Assignment "${created.title}" created for ${targetCourse.title}! Opening management hub...`,
      "success",
      "Assignment Created",
    );
    setSearchParams({ id: created.id });
  };

  const handleUpdateAssignment = (e) => {
    e.preventDefault();
    if (!editingAssignment || !newTitle.trim()) return;

    const targetCourse =
      courses.find((c) => c.id === modalCourseId) || courses[0];
    const updatedList = assignments.map((a) =>
      a.id === editingAssignment.id
        ? {
            ...a,
            courseId: targetCourse.id,
            courseTitle: targetCourse.title,
            title: newTitle.trim(),
            dueDate: newDueDate,
            maxScore: Number(newMaxScore) || 100,
            instructions: newInstructions.trim(),
          }
        : a,
    );
    setAssignments(updatedList);
    setShowEditModal(false);
    showToast(`Assignment "${newTitle}" updated successfully`, "success");
  };

  const handleDeleteAssignment = (id, title) => {
    if (confirm(`Delete assignment "${title}"?`)) {
      setAssignments((prev) => prev.filter((a) => a.id !== id));
      showToast(`Assignment "${title}" deleted`, "info");
    }
  };

  // If an assignment is selected, render the dedicated 4-tab Assignment Hub (matching MANAGE-ASSIGNMENTS screenshots)
  if (activeAssignment) {
    return (
      <AdminAssignmentDetailHub
        assignment={activeAssignment}
        onBack={handleBackToList}
        onUpdateAssignment={(updated) => {
          setAssignments((prev) =>
            prev.map((a) => (a.id === updated.id ? updated : a)),
          );
        }}
      />
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
            <span>Practical Evaluation & Assignment Management</span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Review Portal Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Manage Assignments
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
            Categorized practical assessments, submissions, activity audit trails, and student performance grading.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{assignments.length}</span>
              <span className="font-semibold">Total</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{pendingCount}</span>
              <span className="font-semibold">Pending Review</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{submittedCount}</span>
              <span className="font-semibold">Submissions</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{gradedCount}</span>
              <span className="font-semibold">Graded</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0 relative z-10 flex items-center space-x-2">
          <button
            onClick={() => navigate("/create-assignment")}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR - MATCHING EXACT REFERENCE DESIGN         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Row: Search + Course Filter + Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
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
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer pr-10"
            >
              <option value="all">All Courses ({assignments.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
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
            <ChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
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
              <span
                className={`w-2 h-2 rounded-full ${selectedStatus === "pending" ? "bg-white" : "bg-rose-500"}`}
              ></span>
              <span>Pending Review ({pendingCount})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("submitted")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                selectedStatus === "submitted"
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                  : "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200/80 dark:border-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-900/60"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${selectedStatus === "submitted" ? "bg-white" : "bg-purple-500"}`}
              ></span>
              <span>Submissions ({submittedCount})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("graded")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                selectedStatus === "graded"
                  ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${selectedStatus === "graded" ? "bg-white" : "bg-emerald-500"}`}
              ></span>
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
              : "No assignments are currently created for this course."}
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
              onClick={() => handleOpenAddModal()}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer shadow-xs"
            >
              + Create Assignment
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
                  <th className="py-4 px-6 min-w-[110px]">Score / Result</th>
                  <th className="py-4 px-6 min-w-[240px] text-right">
                    Actions
                  </th>
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
                          onClick={() => handleOpenManageAssignment(a)}
                          className="font-bold text-sm text-slate-900 dark:text-white leading-snug hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          {a.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-1 leading-relaxed">
                          {a.instructions}
                        </div>
                      </td>

                      {/* Course Pill */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.pillStyle}`}
                        >
                          <CourseIcon size={13} className="shrink-0" />
                          <span>{theme.short}</span>
                        </span>
                      </td>

                      {/* Due Date */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar
                            size={14}
                            className="text-slate-400 dark:text-slate-500 shrink-0"
                          />
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
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {a.totalSubmissions || 45} submissions
                        </div>
                        {a.pendingGrading > 0 && (
                          <div className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">
                            {a.pendingGrading} pending review
                          </div>
                        )}
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

                      {/* Score / Avg */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        {isGraded ? (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/90 dark:border-emerald-800/60">
                            {a.score} / 100
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold pl-2">
                            -
                          </span>
                        )}
                      </td>

                      {/* Admin Actions */}
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenManageAssignment(a)}
                            className="bg-slate-900 dark:bg-blue-600 hover:bg-[#3b49df] dark:hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1.5 active:scale-95"
                            title="Manage Assignment Submissions & Statistics"
                          >
                            <BarChart3 size={13} />
                            <span>Manage</span>
                            <ChevronRight size={13} />
                          </button>
                          <button
                            onClick={() => navigate(`/create-assignment?edit=${a.id}`)}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1 active:scale-95"
                            title="Edit Assignment in Builder Flow"
                          >
                            <Edit size={13} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAssignment(a.id, a.title)
                            }
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Delete Assignment"
                          >
                            <Trash2 size={14} />
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
      )}

      {/* ------------------------------------------------------------- */}
      {/* NEW ASSIGNMENT MODAL (Scoped to Course)                        */}
      {/* ------------------------------------------------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  New Assignment
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                  Target practical assessment to a specific course.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Course
                </label>
                <select
                  value={modalCourseId}
                  onChange={(e) => setModalCourseId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Influencer Barter Agreement & Outreach"
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Max Score
                  </label>
                  <input
                    type="number"
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Instructions
                </label>
                <textarea
                  rows={3}
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  placeholder="Provide assignment brief and submission requirements..."
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EDIT ASSIGNMENT MODAL                                         */}
      {/* ------------------------------------------------------------- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Edit Assignment
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                  Update assignment metadata and brief.
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Course
                </label>
                <select
                  value={modalCourseId}
                  onChange={(e) => setModalCourseId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Max Score
                  </label>
                  <input
                    type="number"
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Instructions
                </label>
                <textarea
                  rows={3}
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAssignmentsPage;
