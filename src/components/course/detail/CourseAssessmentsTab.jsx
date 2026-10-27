import React from "react";
import { CheckSquare, HelpCircle, FileText, ArrowLeft } from "lucide-react";
import { AssessmentCard } from "../../student/AssessmentCard";

/**
 * CourseAssessmentsTab Component
 * Renders independent Quizzes & Practical Assignments for the course:
 * - Header banner with live counts of quizzes (passed) and assignments (submitted)
 * - Filter bar (All / Quizzes / Assignments) + links to all portal assessments
 * - Quizzes card grid (or empty state)
 * - Assignments card grid (or empty state)
 */
export const CourseAssessmentsTab = ({
  course = {},
  courseQuizzes = [],
  courseAssignments = [],
  allQuizzesCount = 0,
  allAssignmentsCount = 0,
  assessmentFilter = "all",
  onFilterChange,
  onNavigate,
}) => {
  const passedQuizzesCount = courseQuizzes.filter(
    (q) => q.studentStatus === "passed",
  ).length;

  const submittedAssignmentsCount = courseAssignments.filter(
    (a) => a.status === "graded" || a.status === "submitted",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-purple-50/40 dark:from-slate-900 dark:via-blue-950/40 dark:to-indigo-950/30 border border-blue-200/80 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#3b49df] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckSquare size={22} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Quizzes & Practical Assignments
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-[#3b49df] dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/60">
                Independent Assessments
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Assessments mapped to {course.title}. Managed as dedicated
              entities outside curriculum lecture modules.
            </p>
          </div>
        </div>

        {/* Assessment Counter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs shadow-2xs flex items-center space-x-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Quizzes:
            </span>
            <span className="font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
              {courseQuizzes.length}
            </span>
            <span className="text-[10px] text-slate-400">
              ({passedQuizzesCount} passed)
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs shadow-2xs flex items-center space-x-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Assignments:
            </span>
            <span className="font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
              {courseAssignments.length}
            </span>
            <span className="text-[10px] text-slate-400">
              ({submittedAssignmentsCount} submitted)
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar: All / Quizzes / Assignments */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 flex-wrap">
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              assessmentFilter === "all"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All ({courseQuizzes.length + courseAssignments.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("quizzes")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              assessmentFilter === "quizzes"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Quizzes ({courseQuizzes.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("assignments")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              assessmentFilter === "assignments"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Assignments ({courseAssignments.length})
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onNavigate("/my-quizzes")}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>All Quizzes ({allQuizzesCount})</span>
            <ArrowLeft size={12} className="rotate-180" />
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            type="button"
            onClick={() => onNavigate("/my-assignments")}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>All Assignments ({allAssignmentsCount})</span>
            <ArrowLeft size={12} className="rotate-180" />
          </button>
        </div>
      </div>

      {/* QUIZZES SECTION */}
      {(assessmentFilter === "all" || assessmentFilter === "quizzes") && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <HelpCircle
                  size={16}
                  className="text-purple-600 dark:text-purple-400"
                />
                <span>Course Quizzes ({courseQuizzes.length})</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Timed multiple-choice tests evaluating conceptual mastery.
              </p>
            </div>
          </div>

          {courseQuizzes.length === 0 ? (
            <div className="p-8 bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                <HelpCircle size={20} />
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                No Direct Quizzes for This Course
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                No specific quiz is assigned directly under this course ID. You
                can practice general digital marketing quizzes in your quiz
                dashboard.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("/my-quizzes")}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 mt-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Browse All My Quizzes</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseQuizzes.map((quiz) => (
                <AssessmentCard
                  key={quiz.id}
                  type="quiz"
                  data={quiz}
                  onAction={(q) => onNavigate(`/take-quiz/${q.id}`)}
                  onSecondaryAction={(q) => onNavigate(`/take-quiz/${q.id}`)}
                  onTertiaryAction={(q) => onNavigate(`/take-quiz/${q.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ASSIGNMENTS SECTION */}
      {(assessmentFilter === "all" || assessmentFilter === "assignments") && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <FileText
                  size={16}
                  className="text-amber-600 dark:text-amber-400"
                />
                <span>
                  Practical Assignments & Projects ({courseAssignments.length})
                </span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-world briefs, submissions, and portfolio projects evaluated
                by Operating Media faculty.
              </p>
            </div>
          </div>

          {courseAssignments.length === 0 ? (
            <div className="p-8 bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                <FileText size={20} />
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                No Direct Assignments for This Course
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                No specific assignment is assigned directly under this course ID.
                You can check all institute assignments in your assignment portal.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("/my-assignments")}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 mt-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Browse All My Assignments</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseAssignments.map((assignment) => (
                <AssessmentCard
                  key={assignment.id}
                  type="assignment"
                  data={assignment}
                  onAction={(a) => onNavigate(`/take-assignment/${a.id}`)}
                  onSecondaryAction={(a) =>
                    onNavigate(`/take-assignment/${a.id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseAssessmentsTab;
