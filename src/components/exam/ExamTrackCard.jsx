import React from "react";
import {
  Globe,
  Target,
  BarChart2,
  Share2,
  Layout,
  GraduationCap,
  Palette,
  Sparkles,
  Film,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const ICON_COMPONENTS = {
  Layout,
  Globe,
  Target,
  Palette,
  Share2,
  Sparkles,
  Film,
  TrendingUp,
  BarChart2,
  GraduationCap,
};

// Coordinated color themes for each track category
const TRACK_THEMES = {
  wordpress: {
    border: "border-cyan-200 dark:border-cyan-900/50 hover:border-cyan-500 dark:hover:border-cyan-400",
    glowBg: "from-cyan-500/8 via-cyan-500/2 to-transparent",
    iconGrad: "from-cyan-500 to-blue-600 shadow-cyan-500/25",
    badge: "bg-cyan-100/90 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    codeText: "text-cyan-700 dark:text-cyan-400",
    titleHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
    specIcon: "text-cyan-600 dark:text-cyan-400",
    skillBadge: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border-cyan-200/60 dark:border-cyan-800/50",
    button: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/25 hover:shadow-cyan-600/40",
  },
  seo: {
    border: "border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 dark:hover:border-emerald-400",
    glowBg: "from-emerald-500/8 via-emerald-500/2 to-transparent",
    iconGrad: "from-emerald-500 to-teal-600 shadow-emerald-500/25",
    badge: "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    codeText: "text-emerald-700 dark:text-emerald-400",
    titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    specIcon: "text-emerald-600 dark:text-emerald-400",
    skillBadge: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 hover:shadow-emerald-600/40",
  },
  "google-ads": {
    border: "border-amber-200 dark:border-amber-900/50 hover:border-amber-500 dark:hover:border-amber-400",
    glowBg: "from-amber-500/8 via-amber-500/2 to-transparent",
    iconGrad: "from-amber-500 to-orange-600 shadow-amber-500/25",
    badge: "bg-amber-100/90 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    codeText: "text-amber-700 dark:text-amber-400",
    titleHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    specIcon: "text-amber-600 dark:text-amber-400",
    skillBadge: "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/50",
    button: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/25 hover:shadow-amber-600/40",
  },
  "graphic-design": {
    border: "border-fuchsia-200 dark:border-fuchsia-900/50 hover:border-fuchsia-500 dark:hover:border-fuchsia-400",
    glowBg: "from-fuchsia-500/8 via-fuchsia-500/2 to-transparent",
    iconGrad: "from-fuchsia-500 to-pink-600 shadow-fuchsia-500/25",
    badge: "bg-fuchsia-100/90 text-fuchsia-800 dark:bg-fuchsia-950/80 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800",
    codeText: "text-fuchsia-700 dark:text-fuchsia-400",
    titleHover: "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400",
    specIcon: "text-fuchsia-600 dark:text-fuchsia-400",
    skillBadge: "bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-200/60 dark:border-fuchsia-800/50",
    button: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-fuchsia-600/25 hover:shadow-fuchsia-600/40",
  },
  smm: {
    border: "border-rose-200 dark:border-rose-900/50 hover:border-rose-500 dark:hover:border-rose-400",
    glowBg: "from-rose-500/8 via-rose-500/2 to-transparent",
    iconGrad: "from-rose-500 to-pink-600 shadow-rose-500/25",
    badge: "bg-rose-100/90 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    codeText: "text-rose-700 dark:text-rose-400",
    titleHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    specIcon: "text-rose-600 dark:text-rose-400",
    skillBadge: "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/50",
    button: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25 hover:shadow-rose-600/40",
  },
  "ai-prompt": {
    border: "border-violet-200 dark:border-violet-900/50 hover:border-violet-500 dark:hover:border-violet-400",
    glowBg: "from-violet-500/8 via-violet-500/2 to-transparent",
    iconGrad: "from-violet-600 to-indigo-600 shadow-violet-600/25",
    badge: "bg-violet-100/90 text-violet-800 dark:bg-violet-950/80 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    codeText: "text-violet-700 dark:text-violet-400",
    titleHover: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    specIcon: "text-violet-600 dark:text-violet-400",
    skillBadge: "bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-300 border-violet-200/60 dark:border-violet-800/50",
    button: "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/25 hover:shadow-violet-600/40",
  },
  "video-editing": {
    border: "border-red-200 dark:border-red-900/50 hover:border-red-500 dark:hover:border-red-400",
    glowBg: "from-red-500/8 via-red-500/2 to-transparent",
    iconGrad: "from-red-500 to-rose-600 shadow-red-500/25",
    badge: "bg-red-100/90 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800",
    codeText: "text-red-700 dark:text-red-400",
    titleHover: "group-hover:text-red-600 dark:group-hover:text-red-400",
    specIcon: "text-red-600 dark:text-red-400",
    skillBadge: "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200/60 dark:border-red-800/50",
    button: "bg-red-600 hover:bg-red-700 text-white shadow-red-600/25 hover:shadow-red-600/40",
  },
  smo: {
    border: "border-sky-200 dark:border-sky-900/50 hover:border-sky-500 dark:hover:border-sky-400",
    glowBg: "from-sky-500/8 via-sky-500/2 to-transparent",
    iconGrad: "from-sky-500 to-blue-600 shadow-sky-500/25",
    badge: "bg-sky-100/90 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    codeText: "text-sky-700 dark:text-sky-400",
    titleHover: "group-hover:text-sky-600 dark:group-hover:text-sky-400",
    specIcon: "text-sky-600 dark:text-sky-400",
    skillBadge: "bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/50",
    button: "bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/25 hover:shadow-sky-600/40",
  },
};

const DEFAULT_THEME = {
  border: "border-blue-200 dark:border-blue-900/50 hover:border-blue-500 dark:hover:border-blue-400",
  glowBg: "from-blue-500/8 via-blue-500/2 to-transparent",
  iconGrad: "from-blue-600 to-indigo-600 shadow-blue-500/25",
  badge: "bg-blue-100/90 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  codeText: "text-blue-700 dark:text-blue-400",
  titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  specIcon: "text-blue-600 dark:text-blue-400",
  skillBadge: "bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/50",
  button: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:shadow-blue-600/40",
};

/**
 * ExamTrackCard: Individual color-coordinated card for an official certification exam.
 * Features track icon, badges, title, description, 4 key specs, skills tags, and "Take Exam" CTA.
 */
export const ExamTrackCard = ({ track, onSelectTrack }) => {
  const theme = TRACK_THEMES[track.categoryKey] || DEFAULT_THEME;
  const IconComponent = ICON_COMPONENTS[track.iconName] || BookOpen;

  return (
    <div
      className={`group relative bg-white dark:bg-[#0f172a] rounded-2xl border ${theme.border} transition-all duration-300 flex flex-col justify-between p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 overflow-hidden`}
    >
      {/* Top subtle ambient glow */}
      <div
        className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${theme.glowBg} pointer-events-none transition-opacity duration-300`}
      />

      {/* Main Content */}
      <div className="relative z-10 space-y-3.5">
        {/* Top Header: Track Icon + Category & Code */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.iconGrad} text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300`}
          >
            <IconComponent size={22} />
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${theme.badge}`}
            >
              {track.category || track.badgeText}
            </span>
            <span
              className={`text-[10.5px] font-mono font-semibold ${theme.codeText}`}
            >
              {track.code}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3
            className={`text-base font-bold text-slate-900 dark:text-white tracking-tight ${theme.titleHover} transition-colors leading-snug line-clamp-2`}
          >
            {track.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 line-clamp-2">
            {track.description}
          </p>
        </div>

        {/* 4 Key Specifications Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate">
            <Clock size={13} className={`${theme.specIcon} shrink-0`} />
            <span className="font-semibold">{track.durationMinutes} Mins</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate">
            <BookOpen size={13} className={`${theme.specIcon} shrink-0`} />
            <span className="font-semibold">{track.questionsCount} Questions</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate">
            <Award size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold">80% ({track.passingMarks}/{track.totalMarks}M)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold truncate">
            <CheckCircle2 size={13} className="shrink-0" />
            <span>0 Penalty</span>
          </div>
        </div>

        {/* Skills Covered Tags */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1.5">
            {track.skillsCovered.slice(0, 3).map((skill, sIdx) => (
              <span
                key={sIdx}
                className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium truncate max-w-[150px] border ${theme.skillBadge}`}
              >
                {skill}
              </span>
            ))}
            {track.skillsCovered.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 dark:text-slate-500 font-mono self-center">
                +{track.skillsCovered.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer: Take Exam Button */}
      <div className="relative z-10 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => onSelectTrack(track)}
          className={`w-full py-2.5 px-4 rounded-xl ${theme.button} font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer group-hover:scale-[1.01] active:scale-[0.99]`}
        >
          <span>Take Exam</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ExamTrackCard;
