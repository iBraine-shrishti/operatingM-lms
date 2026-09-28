import React from 'react';
import { lmsService } from '../services/lmsService';
import { Upload } from 'lucide-react';
import { useToast } from '../context/ToastContext';
export const MyAssignmentsPage = () => {
    const { showToast } = useToast();
    const assignments = lmsService.getAssignments();
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">My Assignments</h1>
        <p className="text-slate-500 text-sm mt-1">Submit your practical projects, audits, and code assignments.</p>
      </div>

      <div className="space-y-4">
        {assignments.map(a => (<div key={a.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-medium bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full uppercase">
                {a.courseTitle}
              </span>
              <h3 className="font-semibold text-slate-900 text-base">{a.title}</h3>
              <p className="text-xs text-slate-500">{a.instructions}</p>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <div className="text-right">
                <span className="text-xs font-medium text-slate-400 block">Deadline</span>
                <span className="text-xs font-semibold text-amber-600 tabular-nums">{a.dueDate}</span>
              </div>
              <button onClick={() => showToast(`Upload dialog opened for: ${a.title}`, 'info', 'Assignment Submission')} className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5">
                <Upload size={14}/>
                <span>Submit Work</span>
              </button>
            </div>
          </div>))}
      </div>
    </div>);
};
