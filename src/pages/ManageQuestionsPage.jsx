import React, { useState } from "react";
import { lmsService } from "../services/lmsService";
import { Plus, Search, Check, HelpCircle } from "lucide-react";
export const ManageQuestionsPage = () => {
  const [questions, setQuestions] = useState(() => lmsService.getQuestions());
  const [search, setSearch] = useState("");
  const filtered = questions.filter((q) =>
    q.text.toLowerCase().includes(search.toLowerCase()),
  );
  const handleAddQuestion = () => {
    const text = prompt("Enter Question Text:");
    if (!text) return;
    const answer = prompt("Enter Correct Answer:") || "Option A";
    lmsService.addQuestion({
      text,
      category: "SEO & Marketing",
      difficulty: "Medium",
      type: "Multiple Choice",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: answer,
    });
    setQuestions(lmsService.getQuestions());
  };
  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER - ACTIVITY PAGE STYLE (ADMIN CLEAN THEME)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-2 relative z-10 min-w-0">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <HelpCircle size={17} />
            <span>Assessment Bank & Question Repository</span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Question Bank Ready</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Manage Questions & Item Bank
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
            Centralized multi-choice, practical, and objective question bank for quizzes, exams, and auto-graded assessments.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{questions.length}</span>
              <span className="font-semibold">Bank Items</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">4 Choices</span>
              <span className="font-semibold">Options / Question</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">Multi-Course</span>
              <span className="font-semibold">Disciplines</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">100%</span>
              <span className="font-semibold">Auto-Graded</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0 relative z-10">
          <button
            onClick={handleAddQuestion}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>+ Add Question</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search question bank..."
            className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
          />
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
          {filtered.length} Questions
        </span>
      </div>

      <div className="space-y-4">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 px-2.5 py-0.5 rounded-full uppercase">
                {q.category} • {q.difficulty}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {q.type}
              </span>
            </div>

            <h3 className="font-semibold text-slate-900 dark:text-white text-base">{q.text}</h3>

            {q.options && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between ${opt === q.correctAnswer ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300" : "bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300"}`}
                  >
                    <span>{opt}</span>
                    {opt === q.correctAnswer && (
                      <span className="inline-flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <Check size={13} />
                        <span>(Correct)</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
