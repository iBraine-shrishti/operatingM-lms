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
import { StudentPageHeader } from "../student/StudentPageHeader";

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
 * Styled consistently with other student pages (Enrolled Courses, Quizzes, Assignments),
 * featuring StudentPageHeader, category filters, and color-coordinated exam cards.
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
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Standardized Student Page Header matching other pages */}
      <StudentPageHeader
        icon={Award}
        category="Operating Media Skillshop Certifications"
        badgeText="8 Tracks Open"
        title="Official Skills Certification Exams"
        description="Choose from 8 specialized industry certification tracks. Select any track to begin your proctored assessment with zero negative marking and earn verified credentials."
        metrics={[
          {
            label: "Certification Tracks",
            value: "8 Tracks",
            icon: Award,
            color: "text-blue-600 dark:text-cyan-400",
          },
          {
            label: "Marking Policy",
            value: "Zero Penalty",
            icon: ShieldCheck,
            color: "text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Passing Score",
            value: "80% Threshold",
            icon: CheckCircle2,
            color: "text-purple-600 dark:text-purple-400",
          },
        ]}
      />

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
  );
};

export default ExamCourseSelector;
