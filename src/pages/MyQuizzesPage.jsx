import React from 'react';
import { lmsService } from '../services/lmsService';
import { CheckSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';
export const MyQuizzesPage = () => {
    const { showToast } = useToast();
    const quizzes = lmsService.getQuizzes();
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">My Quizzes</h1>
        <p className="text-slate-500 text-sm mt-1">Review active quizzes, attempt test papers, and view your scores.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (<div key={quiz.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full uppercase">
              {quiz.courseTitle}
            </span>
            <h3 className="font-semibold text-slate-900 text-base">{quiz.title}</h3>
            
            <div className="flex justify-between items-center text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl tabular-nums font-medium">
              <span>{quiz.totalQuestions} Questions</span>
              <span>{quiz.durationMinutes} mins</span>
              <span className="font-semibold text-emerald-600">{quiz.passScorePercentage}% Passing</span>
            </div>

            <button onClick={() => showToast(`Starting quiz session: "${quiz.title}"...`, 'info', 'Quiz Attempt')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors">
              <CheckSquare size={16}/>
              <span>Start Quiz Attempt</span>
            </button>
          </div>))}
      </div>
    </div>);
};
