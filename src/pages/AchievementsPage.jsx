import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { Award, CheckCircle, Download, Eye, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CertificateViewerModal } from '../components/crm/CertificateViewerModal';

export const AchievementsPage = () => {
  const { currentUser, crmCertificates } = useAuth();
  const achievements = lmsService.getAchievements();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const handleOpenCertificate = (cert) => {
    setSelectedCert(cert);
    setIsCertModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              OFFICIAL CREDENTIALS
            </span>
          </div>
          <h1 className="text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight mt-1">
            Student Certifications & Honor Badges
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Verified diplomas, specializations, and earned badges synchronized from Operating Media CRM.
          </p>
        </div>

        {crmCertificates && crmCertificates.length > 0 && (
          <button
            onClick={() => handleOpenCertificate(crmCertificates[0])}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <Award size={15} />
            <span>View Verified Certificate</span>
          </button>
        )}
      </div>

      {/* ============================================================== */}
      {/* 1. OFFICIAL CRM ISSUED CERTIFICATES SECTION                    */}
      {/* ============================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Official Operating Media Certificates
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Verifiable via QR & Credential ID
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crmCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-amber-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Award size={24} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 block">
                      ID: {cert.certificate_id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug truncate">
                      {cert.course}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Awarded to <strong className="text-slate-800">{cert.name || currentUser.name}</strong> • {cert.date}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black px-2.5 py-1 rounded-xl shadow-2xs">
                    {cert.rating} / 10
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">
                    {cert.grade || 'A+ Distinction'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle size={13} className="text-emerald-600" />
                  <span>Authenticated & Issued</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleOpenCertificate(cert)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Eye size={12} />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. PLATFORM LEARNING BADGES & ACHIEVEMENTS                     */}
      {/* ============================================================== */}
      <div className="space-y-3 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Curriculum Milestone Badges
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Earned through lessons & quizzes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs flex flex-col justify-between space-y-3 ${
                ach.unlocked
                  ? 'border-slate-200/90'
                  : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                    ach.unlocked ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Award size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block">
                    {ach.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm truncate mt-0.5">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {ach.description}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {ach.unlocked ? `Unlocked: ${ach.earnedDate}` : 'Locked'}
                </span>
                {ach.unlocked && (
                  <span className="text-emerald-700 font-bold flex items-center space-x-1 text-[11px]">
                    <CheckCircle size={12} />
                    <span>Completed</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={selectedCert || crmCertificates?.[0]}
        studentName={currentUser.name}
      />
    </div>
  );
};
