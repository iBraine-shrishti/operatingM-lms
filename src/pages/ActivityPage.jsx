import React, { useState, useMemo } from "react";
import { 
  Activity, Search, Filter, Clock, Award, BookOpen, 
  CheckCircle2, UserCheck, CheckSquare, MessagesSquare, 
  FileText, ArrowRight, RefreshCw, X, Shield, Sparkles, 
  ChevronRight, Calendar, UserPlus, GraduationCap
} from "lucide-react";
import { lmsService } from "../services/lmsService";
import { useAuth } from "../context/AuthContext";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

export const ActivityPage = () => {
  const { isAdmin } = useAuth();
  const [activitiesList, setActivitiesList] = useState(() => lmsService.getActivities());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest"

  // Activity Category Theming
  const getActivityTheme = (type) => {
    switch (type) {
      case "enrollment":
        return {
          icon: UserPlus,
          badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/40",
          iconBg: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/40",
          dotColor: "bg-blue-600 dark:bg-blue-400",
          label: "New Enrollment",
        };
      case "quiz":
        return {
          icon: CheckSquare,
          badgeBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/40",
          iconBg: "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/40",
          dotColor: "bg-purple-600 dark:bg-purple-400",
          label: "Quiz Exam Passed",
        };
      case "certificate":
        return {
          icon: Award,
          badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40",
          iconBg: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/40",
          dotColor: "bg-emerald-500 dark:bg-emerald-400",
          label: "Certificate Issued",
        };
      case "completion":
        return {
          icon: GraduationCap,
          badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40",
          iconBg: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/40",
          dotColor: "bg-indigo-600 dark:bg-indigo-400",
          label: "Course Completed",
        };
      case "assignment":
        return {
          icon: FileText,
          badgeBg: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/40",
          iconBg: "bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/40",
          dotColor: "bg-sky-600 dark:bg-sky-400",
          label: "Assignment Submitted",
        };
      case "discussion":
        return {
          icon: MessagesSquare,
          badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/40",
          iconBg: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/40",
          dotColor: "bg-amber-500 dark:bg-amber-400",
          label: "Forum Resolved",
        };
      case "grading":
        return {
          icon: CheckCircle2,
          badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40",
          iconBg: "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/40",
          dotColor: "bg-rose-500 dark:bg-rose-400",
          label: "Assignment Graded",
        };
      default:
        return {
          icon: Activity,
          badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
          iconBg: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
          dotColor: "bg-slate-500 dark:bg-slate-400",
          label: "System Event",
        };
    }
  };

  // Filter and search logic
  const filteredActivities = useMemo(() => {
    let list = activitiesList.filter((act) => {
      // Type filter
      if (selectedFilter !== "all" && act.type !== selectedFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const userName = act.user?.name?.toLowerCase() || "";
        const action = act.action?.toLowerCase() || "";
        const target = act.target?.toLowerCase() || "";
        const type = act.type?.toLowerCase() || "";
        return (
          userName.includes(q) ||
          action.includes(q) ||
          target.includes(q) ||
          type.includes(q)
        );
      }
      return true;
    });

    if (sortBy === "oldest") {
      return [...list].reverse();
    }
    return list;
  }, [activitiesList, selectedFilter, searchQuery, sortBy]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: activitiesList.length,
      enrollment: activitiesList.filter((a) => a.type === "enrollment").length,
      quiz: activitiesList.filter((a) => a.type === "quiz").length,
      certificate: activitiesList.filter((a) => a.type === "certificate" || a.type === "completion").length,
      assignment: activitiesList.filter((a) => a.type === "assignment" || a.type === "grading").length,
      discussion: activitiesList.filter((a) => a.type === "discussion").length,
    };
  }, [activitiesList]);

  return (
    <div className="space-y-4 sm:space-y-5 2xl:space-y-6">
      {/* ============================================================== */}
      {/* 1. HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER         */}
      {/* ============================================================== */}
      {isAdmin ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
          <div className="space-y-2 relative z-10 min-w-0">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Activity size={17} />
              <span>Audit Trail & Activity Log</span>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Real-Time Live</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              System Activity Audit Log
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
              Real-time tracking of student enrollments, exam submissions, certifications, and live classroom interactions.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">{activitiesList.length}</span>
                <span className="font-semibold">Logged Events</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">{counts.enrollment}</span>
                <span className="font-semibold">Enrollments</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">{counts.certificate + counts.quiz}</span>
                <span className="font-semibold">Certificates & Quizzes</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                <span className="font-black text-slate-900 dark:text-white">100%</span>
                <span className="font-semibold">Synchronized</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 relative z-10">
            <button
              onClick={() => setActivitiesList(lmsService.getActivities())}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <RefreshCw size={16} className="2xl:w-4.5 2xl:h-4.5" />
              <span>Refresh Activity</span>
            </button>
          </div>
        </div>
      ) : (
        <StudentPageHeader
          {...STUDENT_HEADERS_CONFIG.activity}
          metrics={[
            { value: activitiesList.length, label: "Total Events", dotColor: "bg-blue-600" },
            { value: counts.enrollment, label: "Enrollments", dotColor: "bg-emerald-500" },
            { value: counts.quiz + counts.certificate, label: "Quizzes & Certs", dotColor: "bg-purple-500" },
            { value: counts.assignment, label: "Submissions", dotColor: "bg-rose-500" },
          ]}
          action={
            <button
              onClick={() => setActivitiesList(lmsService.getActivities())}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <RefreshCw size={16} className="2xl:w-4.5 2xl:h-4.5" />
              <span>Refresh Activity</span>
            </button>
          }
        />
      )}

      {/* ============================================================== */}
      {/* 2. SEARCH & FILTER TABS BAR                                    */}
      {/* ============================================================== */}
      <div className="bg-white dark:bg-[#0b1329]/95 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 2xl:p-6 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] space-y-4 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, course, action, or keyword..."
              className="w-full pl-10 pr-10 py-2.5 2xl:py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 text-sm 2xl:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium focus:bg-white dark:focus:bg-slate-850 focus:border-[#2563eb] dark:focus:border-blue-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 2xl:py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer focus:bg-white dark:focus:bg-slate-850 transition-colors"
            >
              <option value="newest" className="dark:bg-slate-900">Newest First</option>
              <option value="oldest" className="dark:bg-slate-900">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2 2xl:gap-2.5">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-[#2563eb] text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800"
              }`}
            >
              All Activities ({counts.all})
            </button>
            <button
              onClick={() => setSelectedFilter("enrollment")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "enrollment"
                  ? "bg-blue-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200/60 dark:border-blue-500/30"
              }`}
            >
              Enrollments ({counts.enrollment})
            </button>
            <button
              onClick={() => setSelectedFilter("quiz")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "quiz"
                  ? "bg-purple-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200/60 dark:border-purple-500/30"
              }`}
            >
              Quizzes ({counts.quiz})
            </button>
            <button
              onClick={() => setSelectedFilter("certificate")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "certificate"
                  ? "bg-emerald-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/60 dark:border-emerald-500/30"
              }`}
            >
              Certificates ({counts.certificate})
            </button>
            <button
              onClick={() => setSelectedFilter("assignment")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "assignment"
                  ? "bg-sky-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(14,165,233,0.4)]"
                  : "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/40 border border-sky-200/60 dark:border-sky-500/30"
              }`}
            >
              Submissions ({counts.assignment})
            </button>
            <button
              onClick={() => setSelectedFilter("discussion")}
              className={`px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-xl text-xs sm:text-sm 2xl:text-[13.5px] font-bold transition-all cursor-pointer ${
                selectedFilter === "discussion"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200/60 dark:border-amber-500/30"
              }`}
            >
              Forums ({counts.discussion})
            </button>
          </div>

          <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredActivities.length}</strong> of {activitiesList.length} logs
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TIMELINE ACTIVITY FEED CARDS                                */}
      {/* ============================================================== */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329]/95 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-500/30">
            <Activity size={26} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Activity Logs Found</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            No events match your current search query or filter selection.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="px-5 py-2.5 bg-[#2563eb] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        </div>
      ) : !isAdmin ? (
        /* ============================================================== */
        /* STUDENT VIEW: DEDICATED TIMELINE FORMAT                       */
        /* ============================================================== */
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 2xl:p-8 shadow-xs">
          <div className="relative pl-6 sm:pl-10 before:absolute before:top-3 before:bottom-3 before:left-[17px] sm:before:left-[21px] before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-blue-300 dark:before:via-blue-800 before:to-slate-200 dark:before:to-slate-800 space-y-6 sm:space-y-8">
            {filteredActivities.map((act) => {
              const theme = getActivityTheme(act.type);
              const TypeIcon = theme.icon;

              return (
                <div key={act.id} className="relative flex items-start group">
                  {/* Timeline Node Marker on the continuous line */}
                  <div className="absolute -left-[17px] sm:-left-[21px] -translate-x-1/2 top-1.5 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-[#0b1329] shadow-sm flex items-center justify-center ${theme.iconBg} ring-2 ring-slate-100 dark:ring-slate-800 group-hover:scale-110 group-hover:ring-blue-300 dark:group-hover:ring-blue-500/70 transition-all duration-200`}
                    >
                      <TypeIcon size={16} />
                    </div>
                  </div>

                  {/* Timeline Event Card */}
                  <div className="flex-1 ml-6 sm:ml-7 bg-slate-50/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-850 border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-500/60 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200">
                    {/* Top Row: Time & Category Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60 dark:border-slate-800/60 text-xs">
                      <span className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                        <Clock size={12} className="text-slate-400 dark:text-slate-500" />
                        <span>{act.timeAgo}</span>
                      </span>

                      <span
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${theme.badgeBg}`}
                      >
                        <TypeIcon size={12} />
                        <span>{theme.label}</span>
                      </span>
                    </div>

                    {/* Middle Row: User Details, Action, and Target */}
                    <div className="flex items-start sm:items-center space-x-3.5 pt-3">
                      <img
                        src={act.user.avatar}
                        alt={act.user.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0 mt-0.5 sm:mt-0"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base">
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {act.user.name}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            {act.action}
                          </span>
                          <span className="font-extrabold text-blue-600 dark:text-cyan-400 break-words">
                            {act.target}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                          <span>Live Timeline Milestone</span>
                          <span>•</span>
                          <span>Synchronized with Operating Media Student Engine</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ADMIN VIEW: KEPT ORIGINAL CARDS FORMAT */
        <div className="bg-white dark:bg-[#0b1329]/95 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-6 2xl:p-7 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] space-y-3 sm:space-y-3.5 2xl:space-y-4 transition-colors duration-200">
          {filteredActivities.map((act) => {
            const theme = getActivityTheme(act.type);
            const TypeIcon = theme.icon;

            return (
              <div
                key={act.id}
                className="p-4 sm:p-5 2xl:p-5.5 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-500/60 bg-white dark:bg-slate-900/90 hover:bg-blue-50/30 dark:hover:bg-slate-850 transition-all duration-200 shadow-2xs hover:shadow-md dark:hover:shadow-[0_6px_25px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-default"
              >
                {/* User Avatar + Details */}
                <div className="flex items-start sm:items-center space-x-3.5 sm:space-x-4 min-w-0 flex-1">
                  {/* Avatar with relative pulse indicator */}
                  <div className="relative shrink-0">
                    <img
                      src={act.user.avatar}
                      alt={act.user.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 2xl:w-15 2xl:h-15 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-300 dark:group-hover:ring-blue-500/70 transition-all"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 2xl:w-4 2xl:h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-2xs ${theme.dotColor}`}
                      title={theme.label}
                    />
                  </div>

                  {/* Text details: Student Name, Action, Target */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base 2xl:text-lg">
                        {act.user.name}
                      </span>
                      <span className="text-xs sm:text-sm 2xl:text-base text-slate-600 dark:text-slate-300 font-medium">
                        {act.action}
                      </span>
                      <span className="font-extrabold text-blue-700 dark:text-cyan-400 group-hover:text-blue-800 dark:group-hover:text-cyan-300 text-sm sm:text-base 2xl:text-lg break-words transition-colors">
                        {act.target}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs 2xl:text-sm text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                      <span className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 font-semibold">
                        <Clock size={13} className="text-slate-400 dark:text-slate-500" />
                        <span>{act.timeAgo}</span>
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        Live CRM Sync
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Badge & Type Icon */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl border text-xs sm:text-sm 2xl:text-[13.5px] font-bold shadow-2xs transition-all duration-200 group-hover:scale-105 ${theme.badgeBg}`}
                  >
                    <TypeIcon size={14} className="shrink-0 2xl:w-4 2xl:h-4" />
                    <span>{theme.label}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
