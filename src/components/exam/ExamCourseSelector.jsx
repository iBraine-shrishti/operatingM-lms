import React, { useState, useMemo } from "react";
import {
  Globe,
  Target,
  BarChart2,
  Share2,
  Layout,
  GraduationCap,
  Palette,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Filter,
} from "lucide-react";
import { EXAM_TRACKS } from "./examTracksConfig";

const ICONS_MAP = {
  Globe,
  Target,
  BarChart2,
  Share2,
  Layout,
  Palette,
  GraduationCap,
};

const CATEGORIES = [
  { key: "all", label: "All Certifications" },
  { key: "seo", label: "Search & SEO" },
  { key: "google-ads", label: "Paid Advertising" },
  { key: "analytics", label: "Data & Analytics" },
  { key: "social", label: "Social & Growth" },
  { key: "web-dev", label: "Web Architecture" },
  { key: "creative", label: "Creative Designing" },
  { key: "master", label: "Diploma Capstone" },
];

/**
 * Enterprise Course Selection Catalog.
 * Utilizes the full horizontal screen canvas with a 4-column responsive grid on desktop,
 * minimizing vertical scrolling and presenting a sleek, professional UI.
 */
export const ExamCourseSelector = ({ onSelectTrack }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTracks = useMemo(() => {
    return EXAM_TRACKS.filter((track) => {
      const matchesCategory =
        selectedCategory === "all" || track.categoryKey === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.shortTitle.toLowerCase().includes(q) ||
        track.description.toLowerCase().includes(q) ||
        track.code.toLowerCase().includes(q) ||
        track.skillsCovered.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-[1650px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 space-y-6">
      {/* 1. FULL-WIDTH ENTERPRISE HERO BANNER */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-blue-200/80 dark:border-slate-800 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white dark:from-slate-900/95 dark:via-blue-950/30 dark:to-slate-900/90 p-5 sm:p-6 lg:p-7 shadow-xs overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Title & Intro */}
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-100/80 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 text-[11px] font-mono font-bold tracking-wider uppercase">
              <Sparkles size={12} className="text-blue-600 dark:text-blue-400" />
              <span>Operating Media Skillshop Certifications</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Choose Your Certification Track
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Select any of the 7 specialized industry certifications to validate your competencies,
              or complete the Comprehensive Board Assessment for your official Diploma.
            </p>
          </div>

          {/* Right Metrics Matrix (Uses horizontal space) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 shrink-0 text-xs font-mono">
            <div className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold mb-0.5">
                <Award size={14} />
                <span>7 Tracks</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Available Exams</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-0.5">
                <ShieldCheck size={14} />
                <span>+2.00 / 0</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero Penalty</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold mb-0.5">
                <Clock size={14} />
                <span>80% Score</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Passing Threshold</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold mb-0.5">
                <CheckCircle2 size={14} />
                <span>Proctored</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">3 Warnings Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/90 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Box & Counter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-full sm:w-72">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tracks, skills..."
              className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium hidden sm:inline">
            {filteredTracks.length} / {EXAM_TRACKS.length} Tracks
          </span>
        </div>
      </div>

      {/* 3. FLUID 4-COLUMN RESPONSIVE GRID (Minimizes vertical scroll on desktop) */}
      {filteredTracks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No certification track matches "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200 dark:border-blue-800/60 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTracks.map((track) => {
            const IconComponent = ICONS_MAP[track.iconName] || BookOpen;

            return (
              <div
                key={track.id}
                className="group relative bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 flex flex-col justify-between p-4 sm:p-5 shadow-2xs hover:shadow-md"
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon, Code & Category Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${track.gradient} text-white flex items-center justify-center shadow-xs shrink-0`}
                    >
                      <IconComponent size={19} />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold uppercase tracking-wider ${track.badgeColor}`}
                      >
                        {track.badgeText}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                        {track.code}
                      </span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 line-clamp-2">
                      {track.description}
                    </p>
                  </div>

                  {/* Quick Specification Strip */}
                  <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px] font-mono border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 truncate">
                      <Clock size={11} className="text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{track.durationMinutes} Mins</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 truncate">
                      <BookOpen size={11} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>{track.questionsCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 truncate">
                      <Award size={11} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>80% ({track.passingMarks}/{track.totalMarks}M)</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold truncate">
                      <CheckCircle2 size={11} className="shrink-0" />
                      <span>0 Penalty</span>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="pt-0.5">
                    <div className="flex flex-wrap gap-1">
                      {track.skillsCovered.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300 truncate max-w-[130px]"
                        >
                          {skill}
                        </span>
                      ))}
                      {track.skillsCovered.length > 3 && (
                        <span className="px-1 py-0.5 rounded text-[10px] text-slate-400 font-mono">
                          +{track.skillsCovered.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onSelectTrack(track)}
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:shadow transition-all group-hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <span>Prepare & Launch Exam</span>
                    <ArrowRight size={13} />
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
