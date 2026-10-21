import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Search,
  ChevronDown,
  CheckCircle2,
  Award,
  Play,
  ArrowRight,
  Clock,
  Star,
  Users,
  Check,
  X,
  Edit,
  RotateCcw,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { lmsService } from "../services/lmsService";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

// Filter Categories matching Browse Courses
const CATEGORIES = [
  { id: "all", label: "All Courses" },
  { id: "social", label: "Social Media" },
  { id: "seo", label: "SEO Mastery" },
  { id: "design", label: "Design & Media" },
  { id: "analytics", label: "Google Analytics" },
  { id: "ads", label: "Google Ads" },
  { id: "wordpress", label: "WordPress Dev" },
  { id: "growth", label: "Growth Marketing" },
];

export const EnrolledCoursesPage = () => {
  const navigate = useNavigate();
  const { currentUser, studentUser, isAdmin, assignedCourseIds } = useAuth();
  
  const studentId = currentUser?.crmAdmissionId || studentUser?.crmAdmissionId || 375;
  const [permittedCourseIds, setPermittedCourseIds] = useState(() => assignedCourseIds || []);
  const [isLoadingPerms, setIsLoadingPerms] = useState(false);

  // Sync real course permissions from CRM API
  useEffect(() => {
    let isMounted = true;
    if (studentId) {
      setIsLoadingPerms(true);
      lmsService.fetchStudentCoursePermissions(studentId).then((perms) => {
        if (isMounted) {
          setIsLoadingPerms(false);
          if (Array.isArray(perms)) {
            const granted = perms.filter((p) => p.hasAccess).map((p) => p.courseId);
            setPermittedCourseIds(granted);
          }
        }
      }).catch(() => {
        if (isMounted) setIsLoadingPerms(false);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [studentId]);

  // All published courses from service
  const allPublishedCourses = useMemo(
    () => lmsService.getCourses().filter((c) => c.status === "published"),
    []
  );

  // Enrolled courses: Only courses granted to the student in CRM
  const enrolledCourses = useMemo(() => {
    if (isAdmin) return allPublishedCourses;
    if (!permittedCourseIds || permittedCourseIds.length === 0) {
      return [];
    }
    return allPublishedCourses.filter((c) => permittedCourseIds.includes(c.id));
  }, [isAdmin, allPublishedCourses, permittedCourseIds]);

  // Real course metrics computed directly from real video units
  const courseMetricsMap = useMemo(() => {
    const map = {};
    allPublishedCourses.forEach((c) => {
      map[c.id] = lmsService.getRealCourseMetrics(c.id);
    });
    return map;
  }, [allPublishedCourses]);

  const [activeTab, setActiveTab] = useState("all"); // 'all', 'in-progress', 'completed'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Metrics counts based on real video metrics
  const totalCount = enrolledCourses.length;
  const inProgressCount = enrolledCourses.filter((c) => {
    const info = courseMetricsMap[c.id];
    return !info?.isCompleted;
  }).length;
  const completedCount = enrolledCourses.filter((c) => {
    const info = courseMetricsMap[c.id];
    return info?.isCompleted;
  }).length;
  const avgProgress = totalCount > 0
    ? Math.round(
        enrolledCourses.reduce((sum, c) => sum + (courseMetricsMap[c.id]?.progress || 0), 0) / totalCount
      )
    : 0;

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return enrolledCourses
      .filter((course) => {
        const metrics = courseMetricsMap[course.id] || { progress: 0, isCompleted: false };
        const isDone = metrics.isCompleted;

        // Tab Filter
        if (activeTab === "in-progress" && isDone) return false;
        if (activeTab === "completed" && !isDone) return false;

        // Search Filter
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          course.title.toLowerCase().includes(q) ||
          course.category.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q);

        // Category Filter
        const matchesCategory =
          selectedCategory === "all" ||
          course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          course.title.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const metricsA = courseMetricsMap[a.id] || { progress: 0 };
        const metricsB = courseMetricsMap[b.id] || { progress: 0 };

        if (sortBy === "progress") {
          return metricsB.progress - metricsA.progress;
        }
        if (sortBy === "popular") {
          return (b.studentsCount || 0) - (a.studentsCount || 0);
        }
        return 0; // Default order
      });
  }, [enrolledCourses, courseMetricsMap, activeTab, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH REAL CRM ENROLLMENT METRICS */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.enrolledCourses}
        metrics={[
          {
            value: totalCount,
            label: "Enrolled Courses",
            dotColor: "bg-blue-600",
          },
          {
            value: inProgressCount,
            label: "In Progress",
            dotColor: "bg-rose-500",
          },
          {
            value: completedCount,
            label: "Completed",
            dotColor: "bg-emerald-500",
          },
          { value: `${avgProgress}%`, label: "Avg. Progress", dotColor: "bg-purple-500" },
        ]}
        action={
          <button
            onClick={() => {
              const active = enrolledCourses[0];
              navigate(active ? `/lesson-player?courseId=${active.id}` : "/lesson-player");
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Play size={16} className="fill-white 2xl:w-4.5 2xl:h-4.5" />
            <span>Resume Active Lesson</span>
          </button>
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR                                          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-4">
        {/* Top Control Row: Search + Category Filter + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Live Search Input */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search enrolled courses by title, category, or skills..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="all">All Course Categories ({totalCount})</option>
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3 lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="recent">Sort: Recently Active</option>
              <option value="progress">Sort: Highest Progress</option>
              <option value="popular">Sort: Most Popular</option>
            </select>
          </div>
        </div>

        {/* Filter Pills Bar: Status Pills on left + Category Chips / Reset Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
              STATUS:
            </span>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab("in-progress")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "in-progress"
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "completed"
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Showing{" "}
              <strong className="text-slate-800 dark:text-white">
                {filteredCourses.length}
              </strong>{" "}
              of {totalCount} courses
            </span>
            {(selectedCategory !== "all" ||
              activeTab !== "all" ||
              searchQuery.trim() !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setActiveTab("all");
                  setSearchQuery("");
                  setSortBy("recent");
                }}
                className="text-xs font-bold text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer ml-2"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COURSE CARDS GRID - 100% REAL VIDEO DATA & CRM ACCESS        */}
      {/* ------------------------------------------------------------- */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-500/30">
            <BookOpen size={22} />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            No Enrolled Courses Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {enrolledCourses.length === 0
              ? "You do not have active course enrollments assigned in Operating Media CRM. Please contact administration to assign your curriculum modules."
              : "No courses match your selected filter criteria. Try choosing another category or clearing your search."}
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCourses.map((course) => {
            const metrics = courseMetricsMap[course.id] || lmsService.getRealCourseMetrics(course.id);
            const isCompleted = metrics.isCompleted;

            return (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] hover:border-blue-300 dark:hover:border-blue-500/60 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  {/* Banner / Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-850">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Progress Badge overlay */}
                    <span
                      className={`absolute top-2.5 right-2.5 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs flex items-center space-x-1 ${
                        isCompleted ? "bg-emerald-600/90" : "bg-slate-900/85"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw size={11} strokeWidth={2.5} />
                          <span>100% • Rewatch</span>
                        </>
                      ) : (
                        <span>{metrics.progress}% Done</span>
                      )}
                    </span>
                  </div>

                  {/* Content Body */}
                  <div className="p-4 sm:p-5">
                    {/* Category & Status Row */}
                    <div className="flex items-center justify-between gap-1.5 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] dark:text-blue-400 truncate">
                        {course.category}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/40 text-xs font-bold shadow-2xs">
                          <Check size={12} strokeWidth={2.5} />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-300 border border-blue-200/70 dark:border-blue-500/40 text-xs font-bold shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] dark:bg-blue-400 animate-pulse"></span>
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    {/* Header & Title */}
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <h3
                        className="font-bold text-slate-900 dark:text-white text-base xl:text-lg leading-snug group-hover:text-[#2563eb] dark:group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[2.5rem]"
                        title={course.title}
                      >
                        {course.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3 font-medium">
                      {course.description}
                    </p>

                    {/* Real Progress Bar Component */}
                    <div className="space-y-1.5 mb-3 bg-slate-50/80 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                        <span>
                          {metrics.completedActivities || metrics.completedLessons} of {metrics.totalActivities || metrics.totalLessons}{" "}
                          Activities
                        </span>
                        <span
                          className={`font-bold ${
                            isCompleted
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-[#2563eb] dark:text-blue-400"
                          }`}
                        >
                          {isCompleted
                            ? "100% Completed"
                            : `${metrics.progress}%`}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? "bg-emerald-500" : "bg-[#2563eb]"
                          }`}
                          style={{ width: `${metrics.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Real Metadata Row: Duration | Lessons calculated from actual video units */}
                    <div className="grid grid-cols-2 gap-1.5 text-center text-xs text-slate-600 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 mb-1">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 tracking-wider">
                          Duration
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums text-xs sm:text-sm truncate">
                          {metrics.duration}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-slate-200/70 dark:border-slate-800">
                        <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 tracking-wider">
                          Lessons
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums text-xs sm:text-sm">
                          {metrics.totalLessons}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action Buttons (Outline & Continue/Rewatch) */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center gap-2">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/create-course?edit=${course.id}`);
                      }}
                      className="py-2 sm:py-2.5 px-3 rounded-xl border border-amber-300/80 dark:border-amber-700/80 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 font-bold text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-[0.98]"
                      title="Edit Course in Course Builder"
                    >
                      <Edit size={13} />
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/${course.id}`);
                    }}
                    className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-[0.98]"
                  >
                    <BookOpen size={13} />
                    <span>Outline</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lesson-player?courseId=${course.id}`);
                    }}
                    className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-white font-bold text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.98] ${
                      isCompleted
                        ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                        : "bg-[#2563eb] hover:bg-blue-600 shadow-blue-500/20"
                    }`}
                    title={
                      isCompleted
                        ? "Rewatch course lessons"
                        : "Resume course lessons"
                    }
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw size={13} strokeWidth={2.5} />
                        <span>Rewatch</span>
                      </>
                    ) : (
                      <>
                        <Play size={13} className="fill-white" />
                        <span>Continue</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
