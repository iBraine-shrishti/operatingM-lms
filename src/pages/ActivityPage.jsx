import React, { useState, useMemo } from "react";
import { 
  Activity, Search, Filter, Clock, Award, BookOpen, 
  CheckCircle2, UserCheck, CheckSquare, MessagesSquare, 
  FileText, ArrowRight, RefreshCw, X, Shield, Sparkles, 
  ChevronRight, Calendar, UserPlus, GraduationCap
} from "lucide-react";
import { lmsService } from "../services/lmsService";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";

export const ActivityPage = () => {
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
          badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
          iconBg: "bg-blue-100 text-blue-600 border-blue-200",
          dotColor: "bg-blue-600",
          label: "New Enrollment",
        };
      case "quiz":
        return {
          icon: CheckSquare,
          badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
          iconBg: "bg-purple-100 text-purple-600 border-purple-200",
          dotColor: "bg-purple-600",
          label: "Quiz Exam Passed",
        };
      case "certificate":
        return {
          icon: Award,
          badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          iconBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
          dotColor: "bg-emerald-500",
          label: "Certificate Issued",
        };
      case "completion":
        return {
          icon: GraduationCap,
          badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
          iconBg: "bg-indigo-100 text-indigo-600 border-indigo-200",
          dotColor: "bg-indigo-600",
          label: "Course Completed",
        };
      case "assignment":
        return {
          icon: FileText,
          badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
          iconBg: "bg-sky-100 text-sky-600 border-sky-200",
          dotColor: "bg-sky-600",
          label: "Assignment Submitted",
        };
      case "discussion":
        return {
          icon: MessagesSquare,
          badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
          iconBg: "bg-amber-100 text-amber-700 border-amber-200",
          dotColor: "bg-rose-500",
          label: "Forum Resolved",
        };
      case "grading":
        return {
          icon: CheckCircle2,
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
          iconBg: "bg-rose-100 text-rose-600 border-rose-200",
          dotColor: "bg-rose-500",
          label: "Assignment Graded",
        };
      default:
        return {
          icon: Activity,
          badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
          iconBg: "bg-slate-100 text-slate-600 border-slate-200",
          dotColor: "bg-slate-500",
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
    <div className="space-y-6">
      {/* ============================================================== */}
      {/* 1. HEADER BANNER - FULLY BRANDED WITH HIGH-CONTRAST TYPOGRAPHY */}
      {/* ============================================================== */}
      <div
        className="relative bg-cover bg-center rounded-2xl border border-blue-100/80 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all overflow-hidden"
        style={{ backgroundImage: `url(${dashboardHeaderBg})` }}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-blue-700 text-sm font-extrabold uppercase tracking-wider">
            <Activity size={17} />
            <span>Audit Trail & Activity Log</span>
            <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Live</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Activity Audit Log
          </h1>

          <p className="text-slate-900/90 text-sm sm:text-base max-w-2xl leading-relaxed font-semibold">
            Real-time tracking of student enrollments, exam submissions, certifications, and live classroom interactions.
          </p>

          {/* Quick Metrics Bar - With red bullet as requested */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3 border-t border-slate-200/80 text-sm font-medium">
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{activitiesList.length}</span>
              <span className="text-slate-800 font-semibold">Logged Events</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
              <span className="font-extrabold text-slate-900">{counts.enrollment}</span>
              <span className="text-slate-800 font-semibold">Enrollments</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">{counts.certificate + counts.quiz}</span>
              <span className="text-slate-800 font-semibold">Certificates & Quizzes</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
              <span className="font-extrabold text-slate-900">100%</span>
              <span className="text-slate-800 font-semibold">Synchronized</span>
            </div>
          </div>
        </div>

        {/* Action Button: Refresh Logs */}
        <div className="w-full sm:w-auto shrink-0">
          <button
            onClick={() => setActivitiesList(lmsService.getActivities())}
            className="w-full sm:w-auto bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
          >
            <RefreshCw size={16} />
            <span>Refresh Activity</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SEARCH & FILTER TABS BAR                                    */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, course, action, or keyword..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#3b49df] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer focus:bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-[#3b49df] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Activities ({counts.all})
            </button>
            <button
              onClick={() => setSelectedFilter("enrollment")}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === "enrollment"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60"
              }`}
            >
              Enrollments ({counts.enrollment})
            </button>
            <button
              onClick={() => setSelectedFilter("quiz")}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === "quiz"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60"
              }`}
            >
              Quizzes ({counts.quiz})
            </button>
            <button
              onClick={() => setSelectedFilter("certificate")}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === "certificate"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60"
              }`}
            >
              Certificates ({counts.certificate})
            </button>
            <button
              onClick={() => setSelectedFilter("assignment")}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === "assignment"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/60"
              }`}
            >
              Submissions ({counts.assignment})
            </button>
            <button
              onClick={() => setSelectedFilter("discussion")}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === "discussion"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60"
              }`}
            >
              Forums ({counts.discussion})
            </button>
          </div>

          <div className="text-xs sm:text-sm font-medium text-slate-500">
            Showing <strong className="text-slate-900 font-bold">{filteredActivities.length}</strong> of {activitiesList.length} logs
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TIMELINE ACTIVITY FEED CARDS                                */}
      {/* ============================================================== */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#3b49df] flex items-center justify-center mx-auto">
            <Activity size={26} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Activity Logs Found</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            No events match your current search query or filter selection.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="px-5 py-2.5 bg-[#3b49df] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:bg-[#2f3cb3] transition-all cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
          {filteredActivities.map((act) => {
            const theme = getActivityTheme(act.type);
            const TypeIcon = theme.icon;

            return (
              <div
                key={act.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-100 hover:border-blue-200 bg-white hover:bg-blue-50/20 transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* User Avatar + Details */}
                <div className="flex items-start sm:items-center space-x-3.5 sm:space-x-4 min-w-0 flex-1">
                  {/* Avatar with relative pulse indicator */}
                  <div className="relative shrink-0">
                    <img
                      src={act.user.avatar}
                      alt={act.user.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-300 transition-all"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white shadow-2xs ${theme.dotColor}`}
                      title={theme.label}
                    />
                  </div>

                  {/* Text details: Student Name, Action, Target */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {act.user.name}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 font-medium">
                        {act.action}
                      </span>
                      <span className="font-extrabold text-blue-700 text-sm sm:text-base break-words">
                        {act.target}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium pt-0.5">
                      <span className="flex items-center space-x-1 text-slate-600 font-semibold">
                        <Clock size={13} className="text-slate-400" />
                        <span>{act.timeAgo}</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">
                        Live CRM Sync
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Badge & Type Icon */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold shadow-2xs ${theme.badgeBg}`}
                  >
                    <TypeIcon size={14} className="shrink-0" />
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
