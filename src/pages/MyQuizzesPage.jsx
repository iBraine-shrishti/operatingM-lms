import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import {
  Play,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Eye,
  Calendar,
  X,
  Search,
  CheckSquare,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";
import { AssessmentFilterBar } from "../components/common/AssessmentFilterBar";
import { CourseBadge } from "../components/common/CourseBadge";
import { AssessmentStatusBadge } from "../components/common/AssessmentStatusBadge";
import { AssessmentEmptyState } from "../components/common/AssessmentEmptyState";
import { AssessmentCard } from "../components/student/AssessmentCard";
import { getCourseTheme } from "../config/courseThemesConfig";
import {
  QUIZ_SORT_OPTIONS,
  QUIZ_CATEGORIES,
  QUIZ_ENHANCED_DESCRIPTIONS,
  getQuizStatusOptions,
  calculateQuizMetrics,
  filterAndSortQuizzes,
} from "../data/assessmentDataConfig";

export const MyQuizzesPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [quizzes, setQuizzes] = useState(() => lmsService.getQuizzes());
  const courses = lmsService.getCourses();

  // Filter & View State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'

  // Modals
  const [activeQuizModal, setActiveQuizModal] = useState(null);
  const [scoreReviewModal, setScoreReviewModal] = useState(null);
  const [showAllCompletedModal, setShowAllCompletedModal] = useState(false);
  const [completedSearchQuery, setCompletedSearchQuery] = useState("");

  // Next Pending Quiz for Header Quick Action
  const firstPendingQuiz = useMemo(
    () => quizzes.find((q) => q.studentStatus === "pending"),
    [quizzes]
  );

  // Derived filter & status options mapped from data file
  const statusOptions = useMemo(
    () => getQuizStatusOptions(quizzes),
    [quizzes]
  );

  const metrics = useMemo(
    () => calculateQuizMetrics(quizzes),
    [quizzes]
  );

  // Filtered & Sorted Quizzes mapped through centralized engine
  const filteredQuizzes = useMemo(() => {
    return filterAndSortQuizzes(
      quizzes,
      {
        searchQuery,
        selectedCourse,
        selectedCategory,
        selectedStatus,
        sortBy,
      },
      courses
    );
  }, [quizzes, searchQuery, selectedCourse, selectedCategory, selectedStatus, sortBy, courses]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCourse !== "all" ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "default";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("default");
  };

  const handleStartQuiz = (quiz) => {
    navigate(`/take-quiz/${quiz.id}`);
  };

  const handleBeginExamination = () => {
    if (!activeQuizModal) return;
    const targetId = activeQuizModal.id;
    setActiveQuizModal(null);
    navigate(`/take-quiz/${targetId}`);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER           */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.myQuizzes}
        metrics={metrics}
        action={
          firstPendingQuiz ? (
            <button
              onClick={() => handleStartQuiz(firstPendingQuiz)}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <Play size={16} className="fill-white 2xl:w-4.5 2xl:h-4.5" />
              <span>Take Next Quiz</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAllCompletedModal(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <Award size={16} className="2xl:w-4.5 2xl:h-4.5" />
              <span>View Certifications</span>
            </button>
          )
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* REUSABLE ASSESSMENT FILTER BAR                                */}
      {/* ------------------------------------------------------------- */}
      <AssessmentFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search quizzes by title, course, or specialization..."
        courses={courses}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
        categories={QUIZ_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOptions={QUIZ_SORT_OPTIONS}
        sortBy={sortBy}
        onSortChange={setSortBy}
        statusOptions={statusOptions}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalShowing={filteredQuizzes.length}
        totalCount={quizzes.length}
        itemLabel="quizzes"
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleClearFilters}
      />

      {/* ------------------------------------------------------------- */}
      {/* CONTENT LISTING: TABLE VIEW OR CARD GRID VIEW                 */}
      {/* ------------------------------------------------------------- */}
      {filteredQuizzes.length === 0 ? (
        <AssessmentEmptyState
          icon={CheckSquare}
          title="No quizzes matched your search criteria"
          description={
            hasActiveFilters
              ? "Try adjusting your search terms or clearing course and specialization filters to view more quizzes."
              : "No quizzes are currently scheduled for your enrolled courses."
          }
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleClearFilters}
          actionLabel={firstPendingQuiz ? "Take Next Quiz" : undefined}
          onAction={firstPendingQuiz ? () => handleStartQuiz(firstPendingQuiz) : undefined}
        />
      ) : viewMode === "grid" ? (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredQuizzes.map((quiz) => (
            <AssessmentCard
              key={quiz.id}
              type="quiz"
              data={quiz}
              onAction={handleStartQuiz}
              onSecondaryAction={setScoreReviewModal}
              onTertiaryAction={handleStartQuiz}
            />
          ))}
        </div>
      ) : (
        /* HIGH-DENSITY TABLE VIEW - MATCHING ASSIGNMENTS PAGE           */
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/30">
                  <th className="py-4 px-6 w-14 text-center">#</th>
                  <th className="py-4 px-6 min-w-[280px]">Quiz Assessment</th>
                  <th className="py-4 px-6 min-w-[170px]">Course</th>
                  <th className="py-4 px-6 min-w-[150px]">Duration</th>
                  <th className="py-4 px-6 min-w-[120px]">Benchmark</th>
                  <th className="py-4 px-6 min-w-[120px]">Questions</th>
                  <th className="py-4 px-6 min-w-[140px]">Status</th>
                  <th className="py-4 px-6 min-w-[110px]">Score</th>
                  <th className="py-4 px-6 min-w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
                {filteredQuizzes.map((quiz, index) => {
                  const isPassed = quiz.studentStatus === "passed";
                  const desc = QUIZ_ENHANCED_DESCRIPTIONS[quiz.id] || quiz.description;

                  return (
                    <tr
                      key={quiz.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors group"
                    >
                      {/* # Index */}
                      <td className="py-5 px-6 text-sm font-bold text-slate-400 dark:text-slate-500 text-center whitespace-nowrap">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* Quiz Title & Description */}
                      <td className="py-5 px-6 max-w-md">
                        <div
                          onClick={() => {
                            if (isPassed) setScoreReviewModal(quiz);
                            else handleStartQuiz(quiz);
                          }}
                          className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {quiz.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-1 leading-relaxed">
                          {desc}
                        </div>
                      </td>

                      {/* Course Pill */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <CourseBadge
                          courseId={quiz.courseId}
                          courseTitle={quiz.courseTitle}
                          category={quiz.category}
                          size="md"
                        />
                      </td>

                      {/* Duration */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {quiz.durationMinutes} mins
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 pl-5 font-medium">
                          {quiz.deadline || "Available Anytime"}
                        </div>
                      </td>

                      {/* Pass Benchmark */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          <Award size={13} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <span>{quiz.passScorePercentage}% Req.</span>
                        </span>
                      </td>

                      {/* Questions Count */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {quiz.totalQuestions} questions
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <AssessmentStatusBadge
                          status={quiz.studentStatus}
                          score={quiz.studentScore}
                        />
                      </td>

                      {/* Score */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        {isPassed && typeof quiz.studentScore === "number" ? (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/90 dark:border-emerald-800/60">
                            {quiz.studentScore}%
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold pl-2">
                            -
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        {isPassed ? (
                          <div className="inline-flex items-center space-x-1.5 justify-end">
                            <button
                              onClick={() => setScoreReviewModal(quiz)}
                              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs group-hover:border-blue-300 dark:group-hover:border-blue-700"
                            >
                              <Eye size={13} />
                              <span>Review</span>
                            </button>
                            <button
                              onClick={() => handleStartQuiz(quiz)}
                              title="Retake Quiz"
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer active:scale-95"
                            >
                              <RotateCcw size={12} />
                              <span>Retake</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartQuiz(quiz)}
                            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            <Play size={12} className="fill-white" />
                            <span>Start Test</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* START / RETAKE QUIZ MODAL                                     */}
      {/* ------------------------------------------------------------- */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-50/50 dark:from-blue-950/40 to-indigo-50/30 dark:to-indigo-950/20">
              <div>
                <span className="text-[10px] font-black uppercase text-[#2563eb] dark:text-blue-400 tracking-wider block">
                  {activeQuizModal.category || "EXAMINATION BENCHMARK"}
                </span>
                <h3 className="font-black text-base text-slate-900 dark:text-white mt-0.5">
                  {activeQuizModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveQuizModal(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl p-3.5 text-xs text-blue-950 dark:text-blue-200 flex items-start space-x-2.5">
                <AlertCircle
                  size={16}
                  className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                />
                <div className="space-y-1">
                  <span className="font-bold block">
                    Official Examination Instructions:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-blue-900 dark:text-blue-300">
                    <li>
                      Duration is {activeQuizModal.durationMinutes} minutes with{" "}
                      {activeQuizModal.totalQuestions} multiple choice questions.
                    </li>
                    <li>
                      Requires a minimum benchmark of{" "}
                      {activeQuizModal.passScorePercentage}% to achieve certification.
                    </li>
                    <li>
                      Questions evaluate real-world campaign metrics and case problems.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase">
                    Timer Window
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {activeQuizModal.durationMinutes} Minutes
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase">
                    Passing Benchmark
                  </span>
                  <span className="font-black text-emerald-700 dark:text-emerald-400">
                    {activeQuizModal.passScorePercentage}% Required
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveQuizModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBeginExamination}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center space-x-1.5 active:scale-95"
                >
                  <Play size={13} className="fill-white" />
                  <span>Begin Examination Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REVIEW RESULT MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {scoreReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-50/60 dark:from-emerald-950/40 to-teal-50/40 dark:to-teal-950/20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Examination Results
                  </h3>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                    Verified in Student Ledger
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScoreReviewModal(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center py-2 space-y-1">
                <div className="inline-block p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border-4 border-emerald-100 dark:border-emerald-800/60 text-3xl font-black text-emerald-700 dark:text-emerald-300 shadow-inner">
                  {scoreReviewModal.studentScore}%
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {scoreReviewModal.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {scoreReviewModal.courseTitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase">
                    Result Status
                  </span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                    PASSED
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase">
                    Passing Required
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">
                    {scoreReviewModal.passScorePercentage}%
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase">
                    Time Spent
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {scoreReviewModal.timeSpent || "14 mins"}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase">
                    Completion Date
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {scoreReviewModal.completedDate || "18 Feb 2026"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const target = scoreReviewModal;
                    setScoreReviewModal(null);
                    handleStartQuiz(target);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <RotateCcw size={12} />
                  <span>Retake Test</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScoreReviewModal(null)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ALL COMPLETED QUIZZES MODAL                                   */}
      {/* ------------------------------------------------------------- */}
      {showAllCompletedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[88vh]">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-50/70 dark:from-emerald-950/50 via-teal-50/40 dark:via-teal-950/30 to-blue-50/30 dark:to-blue-950/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shadow-2xs">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                      Passed Assessments
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10.5px] font-extrabold border border-emerald-200 dark:border-emerald-800/80">
                      {quizzes.filter((q) => q.studentStatus === "passed").length} Completed
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white mt-0.5">
                    Completed Quizzes & Certifications
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAllCompletedModal(false);
                  setCompletedSearchQuery("");
                }}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:px-6 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search completed quizzes by title or course..."
                  value={completedSearchQuery}
                  onChange={(e) => setCompletedSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-3 flex-1">
              {quizzes
                .filter((q) => q.studentStatus === "passed")
                .filter((q) => {
                  if (!completedSearchQuery.trim()) return true;
                  const term = completedSearchQuery.toLowerCase();
                  return (
                    q.title?.toLowerCase().includes(term) ||
                    q.courseTitle?.toLowerCase().includes(term) ||
                    q.category?.toLowerCase().includes(term)
                  );
                })
                .map((quiz) => {
                  return (
                    <div
                      key={quiz.id}
                      className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800/80 hover:border-emerald-300 dark:hover:border-emerald-600/60 p-4 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <CourseBadge
                          courseId={quiz.courseId}
                          courseTitle={quiz.courseTitle}
                          category={quiz.category}
                          size="md"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {quiz.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1.5 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-slate-400" />
                              Completed on {quiz.completedDate || "Recently"}
                            </span>
                            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                              <HelpCircle size={12} className="text-blue-500" />
                              {quiz.totalQuestions} Questions
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-3 py-1 rounded-xl text-sm font-black bg-emerald-600 text-white shadow-xs">
                          {quiz.studentScore}%
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAllCompletedModal(false);
                            setScoreReviewModal(quiz);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Showing <strong>{quizzes.filter((q) => q.studentStatus === "passed").length}</strong> passed assessments
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAllCompletedModal(false);
                  setCompletedSearchQuery("");
                }}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuizzesPage;
