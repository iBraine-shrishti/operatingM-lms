import React, { useState } from "react";
import { lmsService } from "../services/lmsService";
import {
  CheckSquare,
  ArrowRight,
  Clock,
  Award,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Play,
  RefreshCw,
  BarChart3,
  HelpCircle,
  X,
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export const MyQuizzesPage = () => {
  const { showToast } = useToast();
  const [selectedTab, setSelectedTab] = useState("active"); // 'active' | 'completed'
  const [activeQuizModal, setActiveQuizModal] = useState(null);

  // Active Specialization Quizzes (Shifted from Dashboard, matching LATEST UI design)
  const activeQuizzes = [
    {
      id: "quiz-active-1",
      title: "Digital Marketing Career Aptitude Quiz",
      category: "SPECIALIZATION TEST",
      course: "Diploma in Digital Marketing",
      questions: 15,
      duration: 20,
      passScore: "76% PASS",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      iconColor: "bg-rose-50 border-rose-200 text-rose-600",
      description:
        "Test your understanding of core digital channels, customer personas, conversion funnels, and marketing metrics.",
      deadline: "Available Anytime",
    },
    {
      id: "quiz-active-2",
      title: "SEO Fundamentals & Keyword Strategy Assessment",
      category: "SPECIALIZATION TEST",
      course: "Advanced Search Engine Optimization",
      questions: 20,
      duration: 25,
      passScore: "80% PASS",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      iconColor: "bg-rose-50 border-rose-200 text-rose-600",
      description:
        "Evaluate your ability to conduct keyword difficulty analysis, optimize on-page tags, and evaluate crawler response headers.",
      deadline: "Due this Sunday",
    },
    {
      id: "quiz-active-3",
      title: "Google Ads Search & ROAS Campaign Specialist Test",
      category: "PPC CERTIFICATION",
      course: "Google PPC & Performance Marketing",
      questions: 25,
      duration: 30,
      passScore: "85% PASS",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconColor: "bg-blue-50 border-blue-200 text-blue-600",
      description:
        "Practical scenario questions on bid strategies, Quality Score mechanics, negative keyword match types, and conversion tracking.",
      deadline: "Due Next Week",
    },
    {
      id: "quiz-active-4",
      title: "Social Media Meta Ads & Pixel Verification",
      category: "SOCIAL MEDIA",
      course: "Social Media Marketing",
      questions: 10,
      duration: 15,
      passScore: "70% PASS",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      iconColor: "bg-purple-50 border-purple-200 text-purple-600",
      description:
        "Assess event tracking setup, Aggregated Event Measurement (AEM), custom audience lookalikes, and creative testing frameworks.",
      deadline: "Available Anytime",
    },
  ];

  // Past Completed Quizzes
  const completedQuizzes = [
    {
      id: "past-1",
      title: "WordPress Website Architecture & CMS Basics",
      score: "92%",
      questions: 15,
      status: "PASSED",
      date: "18 Feb 2026",
      timeSpent: "14 mins",
    },
    {
      id: "past-2",
      title: "Digital Marketing Fundamentals & Terminology",
      score: "88%",
      questions: 20,
      status: "PASSED",
      date: "02 Feb 2026",
      timeSpent: "18 mins",
    },
    {
      id: "past-3",
      title: "On-Page SEO & Content Strategy Quiz",
      score: "85%",
      questions: 15,
      status: "PASSED",
      date: "22 Jan 2026",
      timeSpent: "12 mins",
    },
  ];

  const handleStartQuiz = (quiz) => {
    setActiveQuizModal(quiz);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/80 border border-blue-100/90 rounded sm:rounded-3xl p-6 sm:p-7 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/95 text-blue-700 border border-blue-200/80 text-xs font-bold shadow-2xs">
              <CheckSquare size={13} className="text-blue-600" />
              <span>Assessment & Testing Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Quizzes & Specialization Tests
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Review active tests, demonstrate mastery of digital marketing
              concepts, meet passing criteria, and maintain an average score
              above 85%.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/90 border border-slate-200/90 rounded p-3 px-4 shadow-2xs text-center">
              <span className="text-[10px] font-black uppercase text-slate-400 block">
                AVG SCORE
              </span>
              <span className="text-xl font-black text-purple-700">88.5%</span>
            </div>
            <div className="bg-white/90 border border-slate-200/90 rounded p-3 px-4 shadow-2xs text-center">
              <span className="text-[10px] font-black uppercase text-slate-400 block">
                PASSED
              </span>
              <span className="text-xl font-black text-emerald-600">
                8 / 10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setSelectedTab("active")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedTab === "active"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Active Tests ({activeQuizzes.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("completed")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedTab === "completed"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Completed History ({completedQuizzes.length})
        </button>
      </div>

      {/* Content */}
      {selectedTab === "active" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${quiz.iconColor}`}
                    >
                      <CheckSquare size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        {quiz.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {quiz.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {quiz.course}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 text-[10.5px] font-black px-2 py-0.5 rounded-lg border ${quiz.badgeColor}`}
                  >
                    {quiz.passScore}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {quiz.description}
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between text-xs text-slate-700 font-semibold tabular-nums">
                  <div className="flex items-center space-x-1.5">
                    <HelpCircle size={14} className="text-slate-400" />
                    <span>{quiz.questions} Questions</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock size={14} className="text-slate-400" />
                    <span>{quiz.duration} Minutes</span>
                  </div>
                  <div className="text-slate-500 font-medium">
                    {quiz.deadline}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Single attempt allowed per window
                </span>
                <button
                  type="button"
                  onClick={() => handleStartQuiz(quiz)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  <span>Start Test</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Completed Quizzes List */
        <div className="bg-white border border-slate-200/90 rounded overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              Past Submission Scores
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Verified in Student Academic Ledger
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {completedQuizzes.map((past) => (
              <div
                key={past.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {past.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Completed on {past.date} • {past.questions} questions •{" "}
                      {past.timeSpent}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      FINAL SCORE
                    </span>
                    <span className="text-base font-black text-emerald-700">
                      {past.score}
                    </span>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {past.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Attempt Modal Preview */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-indigo-50/30">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider block">
                  {activeQuizModal.category}
                </span>
                <h3 className="font-black text-base text-slate-900 mt-0.5">
                  {activeQuizModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveQuizModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2">
                <AlertCircle
                  size={16}
                  className="text-amber-600 shrink-0 mt-0.5"
                />
                <div className="space-y-1">
                  <span className="font-bold block">
                    Important Test Guidelines:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                    <li>
                      Duration is {activeQuizModal.duration} minutes with{" "}
                      {activeQuizModal.questions} multiple choice questions.
                    </li>
                    <li>
                      Requires a minimum benchmark of{" "}
                      {activeQuizModal.passScore} to pass.
                    </li>
                    <li>
                      Do not close or switch browser tabs during the test
                      session.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Timer Window
                  </span>
                  <span className="font-black text-slate-900">
                    {activeQuizModal.duration} Minutes
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Passing Criterion
                  </span>
                  <span className="font-black text-emerald-700">
                    {activeQuizModal.passScore}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveQuizModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveQuizModal(null);
                    showToast(
                      `Quiz examination session started: "${activeQuizModal.title}". Best of luck!`,
                      "success",
                      "Examination In Progress",
                    );
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Play size={12} className="fill-white" />
                  <span>Begin Examination Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuizzesPage;
