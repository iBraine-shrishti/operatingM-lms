import React from "react";
import { Award } from "lucide-react";
import { ExamCertificateCard } from "./ExamCertificateCard";

/**
 * Exam Completion Certificates Section (Course Completion Batches)
 * Exact layout matching course-comp-achieve.png:
 * Section Header: Blue icon with Award, "Course Completion Batches (X)" + "Verified CRM Certificates"
 * 4-column responsive grid of ExamCertificateCard items
 */
export const ExamCertificatesSection = ({
  certificates = [],
  onOpenCertificate,
}) => {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="space-y-3.5">
      {/* Section Header Matching UI Reference */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-blue-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Award size={15} />
          </div>
          <h2 className="text-base sm:text-[17px] font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
            <span>Course Completion Batches</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              ({certificates.length})
            </span>
          </h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
          Verified CRM Certificates
        </span>
      </div>

      {/* 4 Cards Grid - Exact Layout from Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {certificates.map((cert) => (
          <ExamCertificateCard
            key={cert.id || cert.certificate_id}
            cert={cert}
            onOpen={onOpenCertificate}
          />
        ))}
      </div>
    </div>
  );
};

export default ExamCertificatesSection;
