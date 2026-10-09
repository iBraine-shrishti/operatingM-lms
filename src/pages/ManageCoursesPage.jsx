import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  Sparkles,
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { CourseCard } from "../components/course/CourseCard";
import { CourseSkeletonCard } from "../components/common/SkeletonLoader";
import { useAuth } from "../context/AuthContext";

export const ManageCoursesPage = () => {
  const navigate = useNavigate();
  const { isAdmin, isStudent } = useAuth();

  useEffect(() => {
    if (isStudent) {
      navigate("/enrolled-courses", { replace: true });
    }
  }, [isStudent, navigate]);
  const [courses, setCourses] = useState(() => lmsService.getCourses());
  const [activeTab, setActiveTab] = useState("published");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const publishedCount = courses.filter((c) => c.status === "published").length;
  const pendingCount = courses.filter((c) => c.status === "pending").length;
  const draftCount = courses.filter((c) => c.status === "draft").length;

  const currentTab = isStudent ? "published" : activeTab;

  // Filter Categories
  const CATEGORIES = [
    { id: "all", label: "All Courses" },
    { id: "social", label: "Social Media" },
    { id: "seo", label: "SEO Mastery" },
    { id: "design", label: "Design & Media" },
    { id: "analytics", label: "Google Analytics" },
    { id: "ads", label: "Google Ads" },
    { id: "wordpress", label: "WordPress Dev" },
    { id: "advanced", label: "Advanced Topics" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesTab = showEmptyState ? false : course.status === currentTab;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      course.title.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesTab && matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      lmsService.deleteCourse(id);
      setCourses(lmsService.getCourses());
    }
  };

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER - ACTIVITY PAGE STYLE (ADMIN CLEAN THEME)    */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 relative z-10 min-w-0">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <BookOpen size={17} />
              <span>Operating Media Masterclass Curriculum</span>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Curriculum Active</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Explore Our Courses
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
              Comprehensive hands-on digital marketing, SEO, analytics, and
              development programs with live industry projects and verified
              credentials.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">
                  {courses.length} Tracks
                </span>
                <span className="font-semibold">Specializations</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">
                  {publishedCount} Published
                </span>
                <span className="font-semibold">Live Courses</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">
                  140+ Labs
                </span>
                <span className="font-semibold">Practical Hands-on</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">
                  100%
                </span>
                <span className="font-semibold">Verified Credentials</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto shrink-0 relative z-10">
            <button
              onClick={() => navigate("/create-course")}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <Plus size={16} className="2xl:w-4.5 2xl:h-4.5" />
              <span>Create Course</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2 relative z-10">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#3b49df] text-white shadow-xs"
                    : "bg-white/90 dark:bg-[#0b1329]/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:text-[#3b49df] dark:hover:text-cyan-400 hover:bg-blue-50/40 dark:hover:bg-slate-800/60"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Tabs, Search, Sort (Matching the Page Accent Design) */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
        {/* Admin Tabs / Student Available Count */}
        {isAdmin ? (
          <div className="flex items-center space-x-1.5 bg-slate-100/90 dark:bg-slate-900/90 p-1 border border-slate-200/60 dark:border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => {
                setActiveTab("published");
                setShowEmptyState(false);
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === "published" && !showEmptyState
                  ? "bg-[#3b49df] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => {
                setActiveTab("pending");
                setShowEmptyState(false);
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === "pending" && !showEmptyState
                  ? "bg-[#3b49df] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => {
                setActiveTab("draft");
                setShowEmptyState(false);
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === "draft" && !showEmptyState
                  ? "bg-[#3b49df] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-bold text-[#3b49df] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60 px-3 py-1.5 rounded-lg tabular-nums inline-flex items-center space-x-1.5 shadow-2xs">
              <BookOpen
                size={13}
                className="text-[#3b49df] dark:text-blue-400"
              />
              <span>Available Courses ({filteredCourses.length})</span>
            </span>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-[#3b49df] dark:text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                Clear Category Filter
              </button>
            )}
          </div>
        )}

        {/* Right Controls: Search, Sort, Create Course */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full xl:w-auto">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df] focus:bg-white dark:focus:bg-[#0b1329] focus:ring-1 focus:ring-[#3b49df]/20 transition-all shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-700/80 rounded-xl pl-3 pr-7 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-hidden focus:border-[#3b49df] focus:bg-white dark:focus:bg-[#0b1329] transition-all shadow-2xs"
              >
                <option value="recent">Recent</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rating</option>
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
              />
            </div>

            {isAdmin && (
              <button
                onClick={() => navigate("/create-course")}
                className="bg-slate-900 dark:bg-blue-600 hover:bg-[#3b49df] dark:hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>Create Course</span>
              </button>
            )}

            {/* Developer / Admin Test Tools */}
            {isAdmin && (
              <div className="flex items-center space-x-1.5 border-l border-slate-200 dark:border-slate-700 pl-2">
                <button
                  onClick={handleSimulateLoading}
                  className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 px-2 py-1 rounded-md transition-colors cursor-pointer"
                  title="Test skeleton loading"
                >
                  Skeleton
                </button>
                <button
                  onClick={() => setShowEmptyState(!showEmptyState)}
                  className={`text-[11px] font-bold px-2 py-1 rounded-md transition-colors cursor-pointer ${
                    showEmptyState
                      ? "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800"
                  }`}
                  title="Toggle empty state view"
                >
                  Empty
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Course Content View: 2 columns on mobile, 4 columns on laptop */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5 lg:gap-6">
          <CourseSkeletonCard />
          <CourseSkeletonCard />
          <CourseSkeletonCard />
          <CourseSkeletonCard />
        </div>
      ) : showEmptyState || filteredCourses.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8 shadow-xs">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Sparkles size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No courses found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed font-normal">
            There are no courses matching your current filter. Clear your
            filters or explore other categories.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setShowEmptyState(false);
            }}
            className="mt-4 bg-slate-900 dark:bg-blue-600 hover:bg-[#3b49df] dark:hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors inline-flex items-center space-x-2 cursor-pointer shadow-xs"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5 lg:gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCoursesPage;
