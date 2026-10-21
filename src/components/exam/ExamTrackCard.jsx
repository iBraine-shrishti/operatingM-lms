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

/**
 * ExamTrackCard: Individual certification exam card with a singular, uniform UI.
 * Features track icon, badges, title, description, 4 key specs, and a prominent "Take Exam" CTA.
 */
export const ExamTrackCard = ({ track, onSelectTrack }) => {
  const IconComponent = ICON_COMPONENTS[track.iconName] || BookOpen;

  return (
    <div className="group bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/50 shadow-xs hover:shadow-md dark:shadow-none hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between p-5">
      <div className="space-y-3.5">
        {/* Top Header: Track Icon + Category & Code */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 border border-blue-100 dark:border-blue-500/30 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#2563eb] dark:group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
            <IconComponent size={20} />
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
              {track.category || track.badgeText}
            </span>
            <span className="text-[10.5px] font-mono font-semibold text-slate-400 dark:text-slate-500">
              {track.code}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
            {track.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 line-clamp-2">
            {track.description}
          </p>
        </div>

        {/* 4 Key Specifications Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 text-xs font-mono border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate">
            <Clock size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-semibold">{track.durationMinutes} Mins</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate">
            <BookOpen size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-semibold">{track.questionsCount} Questions</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate">
            <Award size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold">80% ({track.passingMarks}/{track.totalMarks}M)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold truncate">
            <ShieldCheck size={13} className="shrink-0" />
            <span>Zero Penalty</span>
          </div>
        </div>
      </div>

      {/* Action Footer: Take Exam Button */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => onSelectTrack(track)}
          className="w-full py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <span>Take Exam</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ExamTrackCard;
