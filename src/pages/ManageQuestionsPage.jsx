import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { Plus, Search, Check } from 'lucide-react';
export const ManageQuestionsPage = () => {
    const [questions, setQuestions] = useState(() => lmsService.getQuestions());
    const [search, setSearch] = useState('');
    const filtered = questions.filter(q => q.text.toLowerCase().includes(search.toLowerCase()));
    const handleAddQuestion = () => {
        const text = prompt('Enter Question Text:');
        if (!text)
            return;
        const answer = prompt('Enter Correct Answer:') || 'Option A';
        lmsService.addQuestion({
            text,
            category: 'SEO & Marketing',
            difficulty: 'Medium',
            type: 'Multiple Choice',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: answer
        });
        setQuestions(lmsService.getQuestions());
    };
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">Manage Questions</h1>
          <p className="text-slate-500 text-sm mt-1">Central question bank for quizzes, exams, and auto-graded assessments.</p>
        </div>
        <button onClick={handleAddQuestion} className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-2 shrink-0">
          <Plus size={16}/>
          <span>Add Question</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search question bank..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-hidden"/>
        </div>
        <span className="text-xs font-medium text-slate-500 tabular-nums">{filtered.length} Questions</span>
      </div>

      <div className="space-y-4">
        {filtered.map(q => (<div key={q.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full uppercase">
                {q.category} • {q.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">{q.type}</span>
            </div>

            <h3 className="font-semibold text-slate-900 text-base">{q.text}</h3>

            {q.options && (<div className="grid grid-cols-2 gap-2 pt-2">
                {q.options.map((opt, i) => (<div key={i} className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between ${opt === q.correctAnswer ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                    <span>{opt}</span>
                    {opt === q.correctAnswer && (
                      <span className="inline-flex items-center space-x-1 text-emerald-700 font-semibold">
                        <Check size={13} />
                        <span>(Correct)</span>
                      </span>
                    )}
                  </div>))}
              </div>)}
          </div>))}
      </div>
    </div>);
};
