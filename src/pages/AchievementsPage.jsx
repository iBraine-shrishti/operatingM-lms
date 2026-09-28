import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { Award, CheckCircle, Download, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';
export const AchievementsPage = () => {
    const achievements = lmsService.getAchievements();
    const [certModalOpen, setCertModalOpen] = useState(false);
    const { showToast } = useToast();
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">Achievements & Certificates</h1>
          <p className="text-slate-500 text-sm mt-1">Badges earned and official Operating Media credentials.</p>
        </div>
        <button onClick={() => setCertModalOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-2 shrink-0">
          <Award size={16} className="text-amber-400"/>
          <span>View Verified Certificate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (<div key={ach.id} className={`bg-white rounded-3xl border p-6 shadow-xs flex flex-col justify-between space-y-4 ${ach.unlocked ? 'border-amber-200/80 bg-gradient-to-br from-white to-amber-50/30' : 'border-slate-200 opacity-60'}`}>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${ach.unlocked ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                <Award size={24}/>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 block">{ach.category}</span>
                <h3 className="font-semibold text-slate-900 text-base">{ach.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{ach.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-400">{ach.unlocked ? `Unlocked: ${ach.earnedDate}` : 'Locked'}</span>
              {ach.unlocked && (<span className="text-emerald-600 flex items-center space-x-1">
                  <CheckCircle size={14}/>
                  <span>Verified</span>
                </span>)}
            </div>
          </div>))}
      </div>

      {/* Certificate Modal */}
      {certModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full border-4 border-amber-400 shadow-2xl relative space-y-6">
            <button onClick={() => setCertModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700">
              <X size={20}/>
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Award size={36}/>
              </div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">OPERATING MEDIA • CERTIFICATE OF COMPLETION</h2>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Search Engine Optimization (SEO) Masterclass</h1>
              <p className="text-xs text-slate-500">This certifies that <strong className="text-slate-900">Vishal Chaurasiya</strong> has successfully completed all module criteria.</p>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs">
              <div>
                <p className="font-bold text-slate-900">Operating Media Executive</p>
                <p className="text-slate-400 text-[10px]">Credential ID: OM-SEO-2026-8849</p>
              </div>
              <button onClick={() => showToast('Downloading PDF Certificate...', 'info', 'Certificate Download')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5">
                <Download size={14}/>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
