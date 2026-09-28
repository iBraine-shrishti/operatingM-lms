import React from 'react';
import { lmsService } from '../services/lmsService';
export const ActivityPage = () => {
    const activities = lmsService.getActivities();
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">System Activity Audit Log</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time audit log of student enrollments, exam submissions, and certificates.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        {activities.map(act => (<div key={act.id} className="p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-3">
              <img src={act.user.avatar} alt={act.user.name} className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <p className="text-xs text-slate-800">
                  <strong className="font-semibold text-slate-900">{act.user.name}</strong> {act.action} <span className="font-semibold text-blue-600">{act.target}</span>
                </p>
                <span className="text-[10px] text-slate-400 font-medium">{act.timeAgo}</span>
              </div>
            </div>
            <span className="text-[10px] font-medium uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {act.type}
            </span>
          </div>))}
      </div>
    </div>);
};
