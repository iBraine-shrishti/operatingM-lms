import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';
export const QuestionDiscussionsPage = () => {
    const { showToast } = useToast();
    const discussions = lmsService.getDiscussions();
    const [replyInput, setReplyInput] = useState('');
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">Question & Discussions</h1>
        <p className="text-slate-500 text-sm mt-1">Instructor Q&A desk: resolve student queries and answer course doubts.</p>
      </div>

      <div className="space-y-6">
        {discussions.map(disc => (<div key={disc.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <img src={disc.authorAvatar} alt={disc.authorName} className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">{disc.authorName}</h4>
                <p className="text-[10px] text-slate-400">{disc.courseTitle} • {disc.createdAt}</p>
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 text-base">{disc.title}</h3>
            <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl">{disc.content}</p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h5 className="text-xs font-semibold text-slate-800">Instructor Reply Box</h5>
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="Type an official instructor answer..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-hidden"/>
                <button onClick={() => showToast('Official instructor reply posted to discussion!', 'success', 'Reply Sent')} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium px-4 py-2 rounded-xl flex items-center space-x-1">
                  <Send size={14}/>
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>))}
      </div>
    </div>);
};
