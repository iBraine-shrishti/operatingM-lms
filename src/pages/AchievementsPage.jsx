import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CertificateViewerModal } from "../components/crm/CertificateViewerModal";
import { AchievementsHeader } from "../components/achievements/AchievementsHeader";
import { OrganicCornerWave } from "../components/achievements/OrganicCornerWave";
import badgeGold from "../assets/badge-type-gold.png";
import {
  Award,
  Calendar,
  Eye,
  GraduationCap,
  ArrowRight,
  Lock,
} from "lucide-react";

/**
 * AchievementsPage Component
 * Retains original header, displays the motivational banner to complete exams,
 * renders only 1 demo certificate card with {View Demo} button,
 * sets student name as "YOUR NAME", and keeps badges/milestones hidden.
 */
export const AchievementsPage = () => {
  const { currentUser, crmProfile } = useAuth();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const courseTitle = "COURSE NAME";

  const demoCert = {
    id: "OMC-DEMO-2026",
    certificate_id: "OMC-DEMO-2026",
    course: courseTitle,
    category: "OFFICIAL COURSE DEMO",
    date: "Feb 10, 2026",
    expiryDate: "Lifetime Credential",
    rating: 9.9,
    grade: "Grade: A+ Distinction",
    badgeType: "gold",
    badgeImg: badgeGold,
    badgeTitle: "GOLD ACCREDITATION",
    shortDetail: "Official Operating Media Accredited Certification",
    name: "YOUR NAME",
    isDemo: true,
  };

  return (
    <div className="space-y-6">
      {/* 1. Header (Original Header retained) */}
      <AchievementsHeader liveExamCount={1} liveMilestoneCount={0} />

      {/* 2. Motivational Banner: Complete Exams to get Certificate */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300/80 dark:border-amber-500/40 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white dark:from-[#171610] dark:via-[#131722] dark:to-[#0b1329] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <GraduationCap size={26} />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <Lock size={12} className="inline" />
                <span>Certification Unlocking Requirement</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                Complete Your Exams to Get Your Certificate!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Clear all course module exams and practical track assessments with qualifying scores to unlock your officially accredited, verifiable Operating Media Certificate.
              </p>
            </div>
          </div>

          <Link
            to="/exam"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Go to Exams</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 3. Single Certificate Showcase (Only 1 card, matching exact layout) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-blue-500 text-white flex items-center justify-center shadow-xs shrink-0">
              <Award size={15} />
            </div>
            <h2 className="text-base sm:text-[17px] font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>Course Completion Certificate</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                (1 Demo Specimen)
              </span>
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            Official Course Specimen
          </span>
        </div>

        {/* ONLY 1 Certificate Card */}
        <div className="max-w-xl">
          <div
            onClick={() => setIsCertModalOpen(true)}
            className="rounded-2xl p-4 sm:p-4.5 border border-blue-200/80 dark:border-blue-800/60 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-2.5 group relative overflow-hidden cursor-pointer min-h-[175px] bg-white dark:bg-[#0b1329]"
          >
            {/* Organic Corner Wave */}
            <OrganicCornerWave color="blue" />

            {/* Left Content Column */}
            <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2 relative z-10">
              <div className="space-y-1.5">
                {/* 2 Pills Row */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wide border border-blue-300/80 bg-blue-50/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80 shrink-0">
                    DEMO CERTIFICATE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold border border-amber-300/80 bg-amber-50/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80 shrink-0">
                    A+ Distinction
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="font-black text-slate-900 dark:text-white text-xs sm:text-[14px] leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pt-0.5">
                  {courseTitle}
                </h3>

                {/* Subtitle */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                  Accredited Program Certificate • Conferred to: YOUR NAME
                </p>
              </div>

              {/* Bottom Section: Calendar + View Demo Button */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 dark:text-slate-400 font-semibold">
                  <Calendar size={12} className="text-blue-500 shrink-0" />
                  <span className="truncate">Sample ID: OMC-DEMO-2026</span>
                </div>

                {/* View Demo Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCertModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <Eye size={13} />
                  <span>View Demo</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Column: 3D Shield Badge */}
            <div className="shrink-0 flex flex-col items-center justify-center pl-1 relative z-10 w-22 sm:w-24">
              <img
                src={badgeGold}
                alt="Gold Honor"
                className="w-13 h-15 sm:w-14 sm:h-16 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-[9px] font-black uppercase text-slate-900 dark:text-slate-100 tracking-wider mt-1.5 text-center whitespace-nowrap">
                GOLD HONOR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={demoCert}
        studentName="YOUR NAME"
        isDemo={true}
      />
    </div>
  );
};

export default AchievementsPage;
