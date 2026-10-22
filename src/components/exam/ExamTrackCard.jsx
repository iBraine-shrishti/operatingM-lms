import React from "react";
import {
  Clock,
  HelpCircle,
  Star,
  ArrowRight,
  Search,
  Palette,
  Share2,
  Cpu,
  Play,
  TrendingUp,
} from "lucide-react";

import wpImg from "../../assets/exam-cards/wordpress.png";
import seoImg from "../../assets/exam-cards/seo.png";
import gadsImg from "../../assets/exam-cards/googleadds.png";
import canvaImg from "../../assets/exam-cards/canva.png";
import smmImg from "../../assets/exam-cards/smm.png";
import aiImg from "../../assets/exam-cards/prompteng.png";
import videoImg from "../../assets/exam-cards/videoeditting.png";
import smoImg from "../../assets/exam-cards/smo.png";

const TRACK_ILLUSTRATIONS = {
  "track-wordpress": wpImg,
  "track-seo": seoImg,
  "track-google-ads": gadsImg,
  "track-graphic-design": canvaImg,
  "track-smm": smmImg,
  "track-ai-prompt": aiImg,
  "track-video-editing": videoImg,
  "track-smo": smoImg,
};

const TRACK_DISPLAY_DATA = {
  "track-wordpress": {
    badge: "Development",
    badgeStyle: "bg-[#e8f0fe] text-[#1a73e8] dark:bg-blue-950/70 dark:text-blue-300",
    code: "Code: WPC-001",
    questionsCount: 24,
    description:
      "Master WordPress development, theme customization, plugins and web architecture with real-world projects.",
  },
  "track-seo": {
    badge: "SEO",
    badgeStyle: "bg-[#e6f4ea] text-[#137333] dark:bg-emerald-950/70 dark:text-emerald-300",
    code: "Code: SEO-002",
    questionsCount: 12,
    description:
      "Learn keyword research, on-page & off-page SEO, link building and ranking strategies.",
  },
  "track-google-ads": {
    badge: "Design & Media",
    badgeStyle: "bg-[#f3e8fd] text-[#9334e9] dark:bg-purple-950/70 dark:text-purple-300",
    code: "Code: PPC-003",
    questionsCount: 12,
    description:
      "Understand Google Ads, campaign setup, bidding, analytics and performance tracking.",
  },
  "track-graphic-design": {
    badge: "Design & Media",
    badgeStyle: "bg-[#fce8e6] text-[#c5221f] dark:bg-pink-950/70 dark:text-pink-300",
    code: "Code: GD-004",
    questionsCount: 12,
    description:
      "Learn Canva, brand identity, social media creatives, visual storytelling and design principles.",
  },
  "track-smm": {
    badge: "Social Media",
    badgeStyle: "bg-[#e0f2fe] text-[#0284c7] dark:bg-cyan-950/70 dark:text-cyan-300",
    code: "Code: SMM-005",
    questionsCount: 24,
    description:
      "Plan campaigns, create content, run paid ads and analyze performance across social platforms.",
  },
  "track-ai-prompt": {
    badge: "Development",
    badgeStyle: "bg-[#f3e8fd] text-[#7c3aed] dark:bg-purple-950/70 dark:text-purple-300",
    code: "Code: AI-006",
    questionsCount: 20,
    description:
      "Explore AI tools, prompt engineering, create content and automate workflows.",
  },
  "track-video-editing": {
    badge: "Video Production",
    badgeStyle: "bg-[#e0f2fe] text-[#0284c7] dark:bg-sky-950/70 dark:text-sky-300",
    code: "Code: VED-007",
    questionsCount: 16,
    description:
      "Edit videos, create motion graphics and produce engaging short-form content.",
  },
  "track-smo": {
    badge: "Marketing",
    badgeStyle: "bg-[#fef7e0] text-[#b06000] dark:bg-amber-950/70 dark:text-amber-300",
    code: "Code: SMO-008",
    questionsCount: 24,
    description:
      "Build organic strategies, increase engagement and grow your brand presence.",
  },
};

/**
 * Renders the top-left colorful circular icon corresponding to each track
 * as shown in image.png.
 */
const renderTrackIcon = (trackId) => {
  switch (trackId) {
    case "track-wordpress":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0073aa] dark:bg-[#1a73e8] flex items-center justify-center shrink-0 shadow-xs border border-blue-600/30">
          <svg
            viewBox="0 0 32 32"
            className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
          >
            <path d="M6.45538 16C6.45538 19.7823 8.65538 23.04 11.8369 24.5885L7.28462 12.1162C6.73798 13.338 6.45541 14.6615 6.45538 16ZM16 25.5446C17.1085 25.5446 18.1746 25.35 19.1731 25.0031L19.1054 24.8762L16.1692 16.8377L13.3092 25.1554C14.1554 25.4092 15.0608 25.5446 16 25.5446ZM17.3115 11.5238L20.7638 21.7877L21.72 18.6062C22.1262 17.2862 22.4392 16.3385 22.4392 15.5177C22.4392 14.3331 22.0162 13.5208 21.6608 12.8946C21.17 12.0992 20.7215 11.4308 20.7215 10.6523C20.7215 9.77231 21.3815 8.96 22.3292 8.96H22.4477C20.689 7.34546 18.3874 6.45141 16 6.45538C14.4192 6.45509 12.8632 6.84777 11.4718 7.59809C10.0805 8.34842 8.89746 9.43285 8.02923 10.7538L8.63846 10.7708C9.63692 10.7708 11.1769 10.6438 11.1769 10.6438C11.7015 10.6185 11.7608 11.3715 11.2446 11.4308C11.2446 11.4308 10.7285 11.4985 10.1446 11.5238L13.6308 21.8638L15.7208 15.6023L14.2315 11.5238C13.898 11.5054 13.565 11.4772 13.2331 11.4392C12.7169 11.4054 12.7762 10.6185 13.2923 10.6438C13.2923 10.6438 14.8662 10.7708 15.8054 10.7708C16.8038 10.7708 18.3438 10.6438 18.3438 10.6438C18.86 10.6185 18.9277 11.3715 18.4115 11.4308C18.4115 11.4308 17.8954 11.49 17.3115 11.5238ZM20.7977 24.25C22.2416 23.4104 23.4399 22.2066 24.2729 20.7589C25.1059 19.3112 25.5444 17.6703 25.5446 16C25.5446 14.3415 25.1215 12.7846 24.3769 11.4223C24.5281 12.9211 24.3012 14.4339 23.7169 15.8223L20.7977 24.25ZM16 27C13.0826 27 10.2847 25.8411 8.22183 23.7782C6.15893 21.7153 5 18.9174 5 16C5 13.0826 6.15893 10.2847 8.22183 8.22183C10.2847 6.15893 13.0826 5 16 5C18.9174 5 21.7153 6.15893 23.7782 8.22183C25.8411 10.2847 27 13.0826 27 16C27 18.9174 25.8411 21.7153 23.7782 23.7782C21.7153 25.8411 18.9174 27 16 27Z" />
          </svg>
        </div>
      );
    case "track-seo":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
          <Search
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-emerald-600 dark:text-emerald-400"
            strokeWidth={2.6}
          />
        </div>
      );
    case "track-google-ads":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/40 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
            <path
              fill="#4285F4"
              d="M12.75 3.5a2.5 2.5 0 0 0-2.17 1.25L4.42 15.58a2.5 2.5 0 1 0 4.33 2.5l6.16-10.83a2.5 2.5 0 0 0-2.16-3.75z"
            />
            <path
              fill="#FBBC04"
              d="M19.58 15.58L13.42 4.75a2.5 2.5 0 0 0-4.33 2.5l6.16 10.83a2.5 2.5 0 0 0 4.33-2.5z"
            />
            <circle cx="6.58" cy="16.83" r="2.5" fill="#34A853" />
          </svg>
        </div>
      );
    case "track-graphic-design":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-pink-50 dark:bg-pink-950/60 border border-pink-200/60 dark:border-pink-800/40 flex items-center justify-center shrink-0">
          <Palette
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-pink-500 dark:text-pink-400"
            strokeWidth={2.3}
          />
        </div>
      );
    case "track-smm":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/40 flex items-center justify-center shrink-0">
          <Share2
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-teal-600 dark:text-teal-400"
            strokeWidth={2.4}
          />
        </div>
      );
    case "track-ai-prompt":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/40 flex items-center justify-center shrink-0">
          <Cpu
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-purple-600 dark:text-purple-400"
            strokeWidth={2.3}
          />
        </div>
      );
    case "track-video-editing":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/40 flex items-center justify-center shrink-0">
          <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
            <Play className="w-3 h-3 fill-white text-white translate-x-[1px]" />
          </div>
        </div>
      );
    case "track-smo":
      return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-center shrink-0">
          <TrendingUp
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-amber-600 dark:text-amber-400"
            strokeWidth={2.5}
          />
        </div>
      );
    default:
      return null;
  }
};

/**
 * ExamTrackCard: Singular, uniform UI matching "image.png"
 * Features:
 * - Top-left colorful circular icon
 * - Category badge and full course title (NO truncation, fully visible on all viewports)
 * - Track code (Code: XXX-000)
 * - 3D Illustration graphic
 * - Full-width description
 * - Specifications row (30 mins | Questions | 80%)
 * - Action buttons ("Start Exam ➔" and "View Details")
 * - Strictly omits right-top status tags (New, Trending, etc.) as requested
 */
export const ExamTrackCard = ({ track, onSelectTrack }) => {
  const display = TRACK_DISPLAY_DATA[track.id] || {
    badge: track.category || "Certification",
    badgeStyle: "bg-[#e8f0fe] text-[#1a73e8] dark:bg-blue-950/70 dark:text-blue-300",
    code: `Code: ${track.code}`,
    questionsCount: track.questionsCount || 15,
    description: track.description,
  };

  const illustration = TRACK_ILLUSTRATIONS[track.id] || wpImg;
  const questionsDisplay = display.questionsCount || track.questionsCount || 15;

  return (
    <div className="group bg-white dark:bg-[#0b1329] rounded-2xl border border-blue-100/90 dark:border-slate-800 p-4.5 sm:p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(37,99,235,0.04)] hover:shadow-md dark:shadow-none hover:-translate-y-0.5 transition-all duration-200 h-full">
      {/* Top Section */}
      <div>
        {/* Top Header Block: Left info (Icon + Badge + Title + Code) & Right 3D illustration */}
        <div className="flex items-start justify-between gap-3">
          {/* Left Block with circular icon and textual details */}
          <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
            {/* Top-Left Colorful Circular Icon */}
            {renderTrackIcon(track.id)}

            <div className="flex-1 min-w-0">
              {/* Category Pill Badge */}
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit mb-1 ${display.badgeStyle}`}
              >
                {display.badge}
              </span>

              {/* Course Title - Complete course title clearly visible with NO line-clamp truncation */}
              <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-900 dark:text-white leading-snug tracking-tight break-words">
                {track.title}
              </h3>

              {/* Code */}
              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1 font-medium">
                {display.code}
              </div>
            </div>
          </div>

          {/* Right 3D Illustration Graphic */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center self-start -mt-1 -mr-1">
            <img
              src={illustration}
              alt={track.title}
              className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* Full-width Description below the top row */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-2">
          {display.description || track.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div>
        {/* Specifications Row */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 mt-4 pt-3 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#1a73e8] dark:text-blue-400 shrink-0" />
            <span>30 mins</span>
          </div>

          <span className="text-slate-200 dark:text-slate-700">|</span>

          <div className="flex items-center gap-1.5">
            <HelpCircle size={14} className="text-[#1a73e8] dark:text-blue-400 shrink-0" />
            <span>{questionsDisplay} Questions</span>
          </div>

          <span className="text-slate-200 dark:text-slate-700">|</span>

          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />
            <span>{track.passingScorePercent || 85}%</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-3.5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelectTrack(track)}
            className="py-2 px-5 rounded-full bg-[#1a73e8] hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Start Exam</span>
            <ArrowRight size={13} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => onSelectTrack(track)}
            className="text-[#1a73e8] dark:text-blue-400 hover:underline text-xs font-semibold cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamTrackCard;
