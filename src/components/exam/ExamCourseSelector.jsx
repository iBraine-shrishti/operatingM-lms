import React from "react";
import { Award, CheckCircle2, ShieldCheck, GraduationCap, Clock } from "lucide-react";
import { ExamTrackCard } from "./ExamTrackCard";
import { StudentPageHeader } from "../student/StudentPageHeader";

/**
 * Card-Based Exam Catalog Page.
 * Styled consistently with other student pages (Enrolled Courses, Quizzes, Assignments),
 * featuring StudentPageHeader and a singular, uniform exam cards grid with responsive scaling.
 * Dynamically displays only the official certification exams granted by Faculty/Admin.
 */
export const ExamCourseSelector = ({ tracks = [], onSelectTrack, isLoading = false }) => {
  const passingScoreText = tracks.length > 0
    ? `${tracks[0].passingPercentage || tracks[0].passScorePercentage || 75}% Threshold`
    : "75% Threshold";

  return (
    <div className="space-y-6">
      {/* Standardized Student Page Header matching other pages */}
      <StudentPageHeader
        icon={Award}
        category="Operating Media Skillshop Certifications"
        badgeText={`${tracks.length} Assigned Exam${tracks.length === 1 ? '' : 's'}`}
        title="Official Skills Certification Exams"
        description="Select any assigned certification exam track to begin your proctored assessment with zero negative marking and earn verified credentials."
        metrics={[
          {
            label: "Assigned Tracks",
            value: `${tracks.length} Track${tracks.length === 1 ? '' : 's'}`,
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
            value: passingScoreText,
            icon: CheckCircle2,
            color: "text-purple-600 dark:text-purple-400",
          },
        ]}
      />

      {/* Loading State */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center space-y-3">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold">Loading assigned examination tracks...</p>
        </div>
      ) : tracks.length === 0 ? (
        /* Empty State */
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap size={28} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            No Official Exams Assigned Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            You do not currently have any official certification exams granted to your student account. Once your faculty assigns an exam from CRM, it will appear here.
          </p>
        </div>
      ) : (
        /* Singular, Unified Card Grid for assigned Exam Tracks */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
          {tracks.map((track) => (
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
