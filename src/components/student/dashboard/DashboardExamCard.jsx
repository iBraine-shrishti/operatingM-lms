import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

const TRACK_PREVIEWS = [
  {
    name: "WordPress",
    code: "WP",
    color: "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    trackId: "track-wordpress",
  },
  {
    name: "SEO",
    code: "SEO",
    color: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    trackId: "track-seo",
  },
  {
    name: "Google Ads (PPC)",
    code: "PPC",
    color: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    trackId: "track-google-ads",
  },
  {
    name: "Canva Design",
    code: "DES",
    color: "bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800",
    trackId: "track-graphic-design",
  },
  {
    name: "SMM Strategy",
    code: "SMM",
    color: "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    trackId: "track-smm",
  },
  {
    name: "AI & Prompt Eng",
    code: "AI",
    color: "bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    trackId: "track-ai-prompt",
  },
  {
    name: "Video Editing",
    code: "VID",
    color: "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
    trackId: "track-video-editing",
  },
  {
    name: "SMO & Growth",
    code: "SMO",
    color: "bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    trackId: "track-smo",
  },
];

/**
 * DashboardExamCard: Component-based exam overview card for the Student Dashboard.
 * Gives students a direct entry point into the 8 specialized certification tracks.
 */
export const DashboardExamCard = ({ crmProfile = {} }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white dark:from-slate-900/95 dark:via-blue-950/30 dark:to-slate-900/90 border border-blue-200/90 dark:border-blue-900/40 p-3.5 sm:p-4.5 xl:p-5 text-slate-900 dark:text-white shadow-xs dark:shadow-[0_4px_24px_rgba(37,99,235,0.12)]">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Info & Badges */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 flex items-center gap-1.5">
              <Sparkles size={11} className="text-blue-600 dark:text-blue-400" />
              <span>Official Skillshop Exams</span>
            </span>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              8 Tracks Available
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
              Candidate: {crmProfile?.admissionNo || "OMC-0375"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
              <Award size={22} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Official Skills Certification Exams
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                Complete specialized 15-question proctored assessments with zero negative marking. Score 80% or higher to earn instant industry-recognized credentials.
              </p>
            </div>
          </div>

          {/* Quick Track Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold mr-1">
              Tracks:
            </span>
            {TRACK_PREVIEWS.map((track) => (
              <button
                key={track.code}
                type="button"
                onClick={() => navigate("/exam")}
                className={`px-2 py-0.5 rounded-md text-[10.5px] font-mono font-semibold border ${track.color} hover:scale-105 transition-transform cursor-pointer`}
                title={`Explore ${track.name} Exam`}
              >
                {track.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Quick Specs & Primary CTA */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between sm:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1">
              <Clock size={13} className="text-blue-600 dark:text-blue-400" />
              <span>30 Mins</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck size={13} />
              <span>0 Penalty</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold">
              <CheckCircle2 size={13} />
              <span>80% Pass</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/exam")}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Take Exams</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardExamCard;
