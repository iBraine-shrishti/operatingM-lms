import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import { Plus, Search, Edit, Trash2, Play, ChevronDown, X } from "lucide-react";
import { useToast } from "../context/ToastContext";
export const ManageQuizzesPage = () => {
  const { showToast } = useToast();
  const courses = lmsService.getCourses();
  const [quizzes, setQuizzes] = useState(() => lmsService.getQuizzes());
  // Default to course-3 (Advanced Topics) or first course
  const defaultCourse =
    courses.find((c) => c.title.toLowerCase().includes("advanced")) ||
    courses[0];
  const [selectedCourseId, setSelectedCourseId] = useState(
    defaultCourse?.id || "course-3",
  );
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  // Modal form states
  const [modalCourseId, setModalCourseId] = useState(selectedCourseId);
  const [newTitle, setNewTitle] = useState("");
  const [newQuestions, setNewQuestions] = useState(15);
  const [newDuration, setNewDuration] = useState(25);
  const [newPassScore, setNewPassScore] = useState(80);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  // Compute quiz count per course
  const courseQuizCounts = useMemo(() => {
    const map = {};
    quizzes.forEach((q) => {
      map[q.courseId] = (map[q.courseId] || 0) + 1;
    });
    return map;
  }, [quizzes]);
  // Quizzes filtered by selected course and search
  const courseQuizzes = useMemo(() => {
    if (selectedCourseId === "all") return quizzes;
    return quizzes.filter((q) => q.courseId === selectedCourseId);
  }, [quizzes, selectedCourseId]);
  const filteredQuizzes = useMemo(() => {
    return courseQuizzes.filter(
      (q) =>
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.courseTitle.toLowerCase().includes(search.toLowerCase()),
    );
  }, [courseQuizzes, search]);
  const handleOpenAddModal = (courseId) => {
    setModalCourseId(courseId || selectedCourseId);
    setShowAddModal(true);
  };
  const handleCreateQuiz = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("Please enter a quiz title", "warning");
      return;
    }
    const targetCourse =
      courses.find((c) => c.id === modalCourseId) || courses[0];
    const created = lmsService.addQuiz({
      courseId: targetCourse.id,
      courseTitle: targetCourse.title,
      title: newTitle.trim(),
      totalQuestions: Number(newQuestions) || 15,
      durationMinutes: Number(newDuration) || 20,
      passScorePercentage: Number(newPassScore) || 80,
      status: "active",
    });
    setQuizzes(lmsService.getQuizzes());
    setNewTitle("");
    setShowAddModal(false);
    showToast(
      `Quiz "${created.title}" created for ${targetCourse.title}!`,
      "success",
    );
  };
  const handleDeleteQuiz = (id, title) => {
    if (confirm(`Delete quiz "${title}"?`)) {
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      showToast(`Quiz "${title}" deleted`, "info");
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">
            Manage Quizzes
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-normal">
            Categorized by course. Select a course below to review assessments,
            pass criteria, and student scores.
          </p>
        </div>
        <button
          onClick={() => handleOpenAddModal()}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-2 shrink-0 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Quiz for Course</span>
        </button>
      </div>

      {/* SIMPLE COURSE SELECT DROPDOWN & SEARCH */}
      <div className="bg-white rounded border border-slate-200/80 p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1">
            <label
              htmlFor="quiz-course-select"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0"
            >
              Select Course:
            </label>
            <div className="relative flex-1 max-w-md">
              <select
                id="quiz-course-select"
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  setSearch("");
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-medium pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 cursor-pointer appearance-none transition-colors"
              >
                <option value="all">
                  All Courses ({quizzes.length} Quizzes)
                </option>
                {courses.map((course) => {
                  const count = courseQuizCounts[course.id] || 0;
                  return (
                    <option key={course.id} value={course.id}>
                      {course.title} ({count} {count === 1 ? "Quiz" : "Quizzes"}
                      )
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {selectedCourse && (
            <div className="flex items-center space-x-2 shrink-0 text-xs">
              <span className="text-slate-500 font-medium">Active:</span>
              <span className="font-semibold text-slate-800">
                {selectedCourse.title}
              </span>
              <span className="font-medium text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                {courseQuizzes.length} Quizzes
              </span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search quizzes in ${selectedCourse?.title || "all courses"}...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredQuizzes.length}{" "}
            {filteredQuizzes.length === 1 ? "Quiz" : "Quizzes"} Found
          </span>
        </div>
      </div>

      {/* Quizzes Grid for Selected Course */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredQuizzes.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
            No quizzes found for this course. Click "+ Create Quiz for Course"
            above to add one.
          </div>
        ) : (
          filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-md uppercase">
                    Assessment Test
                  </span>
                  <span className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                    {quiz.passScorePercentage}% Pass Score
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 text-base leading-snug">
                  {quiz.title}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-3 rounded-xl text-center text-xs border border-slate-200/60">
                <div>
                  <span className="text-slate-500 text-xs block font-medium">
                    Questions
                  </span>
                  <strong className="font-semibold text-slate-900 text-sm tabular-nums">
                    {quiz.totalQuestions} Qs
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block font-medium">
                    Duration
                  </span>
                  <strong className="font-semibold text-slate-900 text-sm tabular-nums">
                    {quiz.durationMinutes}m
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block font-medium">
                    Avg Score
                  </span>
                  <strong className="font-semibold text-slate-900 text-sm tabular-nums">
                    {quiz.averageScore}%
                  </strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500 font-normal">
                  {quiz.attemptsCount} Attempts
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      showToast(
                        `Starting test preview for "${quiz.title}"...`,
                        "info",
                        "Quiz Started",
                      )
                    }
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Play size={13} />
                    <span>Start Test</span>
                  </button>
                  <button
                    onClick={() =>
                      showToast(`Edit quiz "${quiz.title}"`, "info")
                    }
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Quiz"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Delete Quiz"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE QUIZ MODAL (Scoped to Course) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">
                  Create New Quiz
                </h3>
                <p className="text-[11px] text-slate-400 font-normal">
                  Target assessment to a specific course.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Course
                </label>
                <select
                  value={modalCourseId}
                  onChange={(e) => setModalCourseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quiz Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Campaign Optimization & Audit Exam"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Questions
                  </label>
                  <input
                    type="number"
                    value={newQuestions}
                    onChange={(e) => setNewQuestions(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration (m)
                  </label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pass %
                  </label>
                  <input
                    type="number"
                    value={newPassScore}
                    onChange={(e) => setNewPassScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs transition-colors"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageQuizzesPage;
