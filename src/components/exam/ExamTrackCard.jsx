import React from "react";
import { Clock, HelpCircle, Star, ArrowRight } from "lucide-react";

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
    code: "Code: WP-001",
    questionsCount: 24,
    description:
      "Master WordPress development, theme customization, plugins and web architecture with real-world projects.",
  },
  "track-seo": {
    badge: "SEO",
    code: "Code: SEO-002",
    questionsCount: 12,
    description:
      "Learn keyword research, on-page & off-page SEO, link building and ranking strategies.",
  },
  "track-google-ads": {
    badge: "Design & Media",
    code: "Code: PPC-003",
    questionsCount: 12,
    description:
      "Understand Google Ads, campaign setup, bidding, analytics and performance tracking.",
  },
  "track-graphic-design": {
    badge: "Design & Media",
    code: "Code: GDC-004",
    questionsCount: 12,
    description:
      "Learn Canva, brand identity, social media creatives, visual storytelling and design principles.",
  },
  "track-smm": {
    badge: "Social Media",
    code: "Code: SMM-005",
    questionsCount: 24,
    description:
      "Plan campaigns, create content, run paid ads and analyze performance across social platforms.",
  },
  "track-ai-prompt": {
    badge: "Development",
    code: "Code: AI-006",
    questionsCount: 20,
    description:
      "Explore AI tools, prompt engineering, create content and automate workflows.",
  },
  "track-video-editing": {
    badge: "Video Production",
    code: "Code: VED-007",
    questionsCount: 16,
    description:
      "Edit videos, create motion graphics and produce engaging short-form content.",
  },
  "track-smo": {
    badge: "Marketing",
    code: "Code: SMO-008",
    questionsCount: 24,
    description:
      "Build organic strategies, increase engagement and grow your brand presence.",
  },
};

/**
 * ExamTrackCard: Singular, uniform UI matching "Certification Course Dashboard Grid.png"
 * Features category pill, title, description, code, 3D graphic illustration,
 * specifications row (30 mins | Questions | 80%), and "Start Exam ➔" + "View Details" actions.
 */
export const ExamTrackCard = ({ track, onSelectTrack }) => {
  const display = TRACK_DISPLAY_DATA[track.id] || {
    badge: track.category || "Certification",
    code: `Code: ${track.code}`,
    questionsCount: track.questionsCount || 15,
    description: track.description,
  };

  const illustration = TRACK_ILLUSTRATIONS[track.id] || wpImg;
  const questionsDisplay = display.questionsCount || track.questionsCount || 15;

  return (
    <div className="group bg-white dark:bg-[#0b1329] rounded-2xl border border-blue-100/90 dark:border-slate-800 p-5 sm:p-5.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(37,99,235,0.04)] hover:shadow-md dark:shadow-none hover:-translate-y-0.5 transition-all duration-200">
      {/* Top Section */}
      <div>
        {/* Category Pill Badge */}
        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#e8f0fe] text-[#1a73e8] dark:bg-blue-950/70 dark:text-blue-300 w-fit mb-3">
          {display.badge}
        </span>

        {/* Content Row: Text on left, 3D Graphic on right */}
        <div className="flex items-start justify-between gap-2.5">
          {/* Left Text Info */}
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white leading-snug tracking-tight line-clamp-2">
              {track.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {display.description || track.description}
            </p>
            <div className="text-[11.5px] font-mono text-slate-400 dark:text-slate-500 mt-2 font-medium">
              {display.code}
            </div>
          </div>

          {/* Right 3D Illustration */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center -mt-1 -mr-1">
            <img
              src={illustration}
              alt={track.title}
              className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>
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
            <span>80%</span>
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
