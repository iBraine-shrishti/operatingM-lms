import React from "react";
import { Calendar } from "lucide-react";
import { OrganicCornerWave } from "./OrganicCornerWave";

/**
 * Single Exam Certificate Card
 * Exact 2-column split layout matching course-comp-achieve.png:
 * Left side: Category & Grade pills, Title, Subtitle, Calendar Date, View Details link
 * Right side: Vertically centered 3D Shield Badge with uppercase bold title below
 */
export const ExamCertificateCard = ({ cert, onOpen }) => {
  if (!cert) return null;

  return (
    <div
      onClick={() => onOpen && onOpen(cert)}
      className={`rounded-2xl p-4 sm:p-4.5 border shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-2.5 group relative overflow-hidden cursor-pointer min-h-[175px] bg-white dark:bg-[#0b1329] ${
        cert.cardBorderColor || "border-blue-200/80 dark:border-blue-800/60 hover:border-blue-300"
      }`}
    >
      {/* Organic Corner Wave */}
      <OrganicCornerWave color={cert.waveColor || "blue"} />

      {/* Left Content Column (Pills, Title, Subtitle, Calendar, View Details) */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2 relative z-10">
        <div className="space-y-1.5">
          {/* 2 Pills Row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wide border shrink-0 ${
                cert.categoryBadgeColor ||
                "border-blue-300/80 bg-blue-50/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80"
              }`}
            >
              {cert.category}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold border shrink-0 ${
                cert.gradeBadgeColor ||
                "border-amber-300/80 bg-amber-50/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80"
              }`}
            >
              {cert.grade}
            </span>
          </div>

          {/* Main Course / Exam Title */}
          <h3 className="font-black text-slate-900 dark:text-white text-xs sm:text-[13.5px] leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pt-0.5">
            {cert.course}
          </h3>

          {/* Subtitle / Topics */}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
            {cert.shortDetail}
          </p>
        </div>

        {/* Bottom Section: Calendar + View Details */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 dark:text-slate-400 font-semibold">
            <Calendar size={12} className="text-blue-500 shrink-0" />
            <span className="truncate">
              {cert.certificate_id} • {cert.date}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpen) onOpen(cert);
            }}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Details</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Right Column: Vertically Centered 3D Shield Badge with Title Below */}
      <div className="shrink-0 flex flex-col items-center justify-center pl-1 relative z-10 w-22 sm:w-24">
        <img
          src={cert.badgeImg}
          alt={cert.badgeTitle}
          className="w-13 h-15 sm:w-14 sm:h-16 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
        />
        <span className="text-[9px] font-black uppercase text-slate-900 dark:text-slate-100 tracking-wider mt-1.5 text-center whitespace-nowrap">
          {cert.badgeTitle}
        </span>
      </div>
    </div>
  );
};

export default ExamCertificateCard;
