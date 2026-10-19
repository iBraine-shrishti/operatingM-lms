import React, { useState, useMemo } from "react";
import {
  Award,
  Search,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { EXAM_TRACKS } from "./examTracksConfig";
import { ExamTrackCard } from "./ExamTrackCard";

const CATEGORIES = [
  { key: "all", label: "All Certifications" },
  { key: "wordpress", label: "WordPress" },
  { key: "seo", label: "SEO" },
  { key: "google-ads", label: "Google Ads (PPC)" },
  { key: "graphic-design", label: "Graphic Designing" },
  { key: "smm", label: "SMM" },
  { key: "ai-prompt", label: "AI & Prompt Eng" },
  { key: "video-editing", label: "Video Editing" },
  { key: "smo", label: "SMO" },
];

/**
 * Card-Based Exam Catalog Page.
 * A clean, simple, color-coordinated, component-based layout showcasing all 8 certification tracks.
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
    <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
      <div className="max-w-7xl w-full mx-auto space-y-6 pb-12 sm:pb-16">
        {/* Simple & Clean Header */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0f172a] p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} className="text-blue-600 dark:text-blue-400" />
                <span>Operating Media Skillshop</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Official Certification Exams
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Choose from 8 specialized industry certification tracks. Complete the proctored assessment to earn your official industry credentials.
              </p>
            </div>

            {/* Quick Summary Pill Highlights */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-300 font-bold flex items-center gap-1.5">
                <Award size={14} className="text-blue-600 dark:text-blue-400" />
                <span>8 Tracks Open</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>Zero Penalty</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-purple-800 dark:text-purple-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400" />
                <span>80% Passing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search Bar */}
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box & Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
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

        {/* Card-Based Exam Grid */}
        {filteredTracks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No certification tracks match "{searchQuery}".
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTracks.map((track) => (
              <ExamTrackCard
                key={track.id}
                track={track}
                onSelectTrack={onSelectTrack}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ExamCourseSelector;
