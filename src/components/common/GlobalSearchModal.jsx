import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  BookOpen,
  GraduationCap,
  Award,
  CheckSquare,
  BookCheck,
  MessagesSquare,
  Calendar,
  ArrowRight,
  X,
  Sparkles,
  ChevronRight,
  Clock,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lmsService } from "../../services/lmsService";
import { EXAM_TRACKS } from "../exam/examTracksConfig";

const STUDENT_SHORTCUTS = [
  {
    label: "Enrolled Courses",
    description: "Resume your course tracks & modules",
    path: "/enrolled-courses",
    icon: GraduationCap,
    badge: "Courses",
    bgClass: "bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400 group-hover:bg-[#2563eb] group-hover:text-white",
  },
  {
    label: "Official Exams",
    description: "Take Google Skills certification exams",
    path: "/exam",
    icon: Award,
    badge: "Exams",
    bgClass: "bg-pink-50 dark:bg-pink-500/15 text-[#db2777] dark:text-pink-400 group-hover:bg-[#db2777] group-hover:text-white",
  },
  {
    label: "My Quizzes",
    description: "Knowledge checks & module tests",
    path: "/my-quizzes",
    icon: CheckSquare,
    badge: "Quizzes",
    bgClass: "bg-purple-50 dark:bg-purple-500/15 text-[#7c3aed] dark:text-purple-400 group-hover:bg-[#7c3aed] group-hover:text-white",
  },
  {
    label: "My Assignments",
    description: "Submit & review practical batch tasks",
    path: "/my-assignments",
    icon: BookCheck,
    badge: "Tasks",
    bgClass: "bg-emerald-50 dark:bg-emerald-500/15 text-[#059669] dark:text-emerald-400 group-hover:bg-[#059669] group-hover:text-white",
  },
  {
    label: "Forums & Discussions",
    description: "Ask questions & collaborate with peers",
    path: "/forums",
    icon: MessagesSquare,
    badge: "Community",
    bgClass: "bg-amber-50 dark:bg-amber-500/15 text-[#d97706] dark:text-amber-400 group-hover:bg-[#d97706] group-hover:text-white",
  },
  {
    label: "Class Schedule",
    description: "Upcoming lectures & batch timings",
    path: "/schedule",
    icon: Calendar,
    badge: "Timetable",
    bgClass: "bg-indigo-50 dark:bg-indigo-500/15 text-[#4f46e5] dark:text-indigo-400 group-hover:bg-[#4f46e5] group-hover:text-white",
  },
];

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  // Keyboard shortcut listener: Cmd/Ctrl + K to toggle, Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query and filter on close/open
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedFilter("all");
    }
  }, [isOpen]);

  // Load student-accessible LMS collections safely
  const courses = useMemo(() => {
    try {
      return lmsService.getCourses() || [];
    } catch {
      return [];
    }
  }, [isOpen]);

  const quizzes = useMemo(() => {
    try {
      return lmsService.getQuizzes() || [];
    } catch {
      return [];
    }
  }, [isOpen]);

  const assignments = useMemo(() => {
    try {
      return lmsService.getAssignments() || [];
    } catch {
      return [];
    }
  }, [isOpen]);

  const discussions = useMemo(() => {
    try {
      return lmsService.getDiscussions() || [];
    } catch {
      return [];
    }
  }, [isOpen]);

  const exams = useMemo(() => {
    return Array.isArray(EXAM_TRACKS) ? EXAM_TRACKS : [];
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    if (!cleanQuery) return courses.slice(0, 3);
    return courses.filter((c) =>
      c.title?.toLowerCase().includes(cleanQuery) ||
      c.category?.toLowerCase().includes(cleanQuery)
    );
  }, [courses, cleanQuery]);

  // Filtered Official Exams
  const filteredExams = useMemo(() => {
    if (!cleanQuery) return exams.slice(0, 2);
    return exams.filter((e) =>
      e.title?.toLowerCase().includes(cleanQuery) ||
      e.shortName?.toLowerCase().includes(cleanQuery) ||
      e.category?.toLowerCase().includes(cleanQuery)
    );
  }, [exams, cleanQuery]);

  // Filtered Quizzes
  const filteredQuizzes = useMemo(() => {
    if (!cleanQuery) return [];
    return quizzes.filter((q) =>
      q.title?.toLowerCase().includes(cleanQuery) ||
      q.category?.toLowerCase().includes(cleanQuery)
    );
  }, [quizzes, cleanQuery]);

  // Filtered Assignments
  const filteredAssignments = useMemo(() => {
    if (!cleanQuery) return [];
    return assignments.filter((a) =>
      a.title?.toLowerCase().includes(cleanQuery) ||
      a.courseTitle?.toLowerCase().includes(cleanQuery)
    );
  }, [assignments, cleanQuery]);

  // Filtered Discussions
  const filteredDiscussions = useMemo(() => {
    if (!cleanQuery) return [];
    return discussions.filter((d) =>
      d.title?.toLowerCase().includes(cleanQuery) ||
      d.category?.toLowerCase().includes(cleanQuery) ||
      d.course?.toLowerCase().includes(cleanQuery)
    );
  }, [discussions, cleanQuery]);

  const totalResults =
    filteredCourses.length +
    filteredExams.length +
    filteredQuizzes.length +
    filteredAssignments.length +
    filteredDiscussions.length;

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3 bg-slate-50/70 dark:bg-slate-900/60 shrink-0">
          <Search size={20} className="text-[#2563eb] dark:text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, exams, assignments, quizzes, discussions..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Pills (Shown when searching) */}
        {cleanQuery && (
          <div className="flex items-center space-x-2 px-4 py-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto custom-scrollbar shrink-0 bg-white dark:bg-[#0b1329]">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === "all"
                  ? "bg-[#2563eb] text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All ({totalResults})
            </button>
            {filteredCourses.length > 0 && (
              <button
                onClick={() => setSelectedFilter("courses")}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedFilter === "courses"
                    ? "bg-[#2563eb] text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Courses ({filteredCourses.length})
              </button>
            )}
            {(filteredExams.length > 0 || filteredQuizzes.length > 0) && (
              <button
                onClick={() => setSelectedFilter("assessments")}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedFilter === "assessments"
                    ? "bg-[#2563eb] text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Exams & Quizzes ({filteredExams.length + filteredQuizzes.length})
              </button>
            )}
            {filteredAssignments.length > 0 && (
              <button
                onClick={() => setSelectedFilter("assignments")}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedFilter === "assignments"
                    ? "bg-[#2563eb] text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Assignments ({filteredAssignments.length})
              </button>
            )}
            {filteredDiscussions.length > 0 && (
              <button
                onClick={() => setSelectedFilter("discussions")}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedFilter === "discussions"
                    ? "bg-[#2563eb] text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Discussions ({filteredDiscussions.length})
              </button>
            )}
          </div>
        )}

        {/* Results / Navigation Body */}
        <div className="p-4 overflow-y-auto space-y-5 custom-scrollbar flex-1">
          {/* Default State: Student Quick Shortcuts */}
          {!cleanQuery && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                  Student Learning Tools
                </h4>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  Quick Access
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STUDENT_SHORTCUTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleNavigate(item.path)}
                      className="flex items-center space-x-3 p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all text-left group cursor-pointer shadow-2xs"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs ${item.bgClass}`}
                      >
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#2563eb] dark:group-hover:text-cyan-400 transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty Search State */}
          {cleanQuery && totalResults === 0 && (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search size={22} />
              </div>
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                No matching learning resources found
              </h5>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto mt-1">
                We couldn't find any courses, exams, assignments, or discussions matching &ldquo;{query}&rdquo;.
              </p>
            </div>
          )}

          {/* 1. Courses Section */}
          {(selectedFilter === "all" || selectedFilter === "courses") &&
            filteredCourses.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen size={13} className="text-[#2563eb]" />
                    Courses ({filteredCourses.length})
                  </h4>
                  <button
                    onClick={() => handleNavigate("/enrolled-courses")}
                    className="text-[11px] font-semibold text-[#2563eb] dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    View All Enrolled
                  </button>
                </div>
                <div className="space-y-1.5">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => handleNavigate(`/courses/${course.id}`)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 border border-slate-100 dark:border-slate-800/80 hover:border-blue-200 dark:hover:border-blue-500/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-[#2563eb] flex items-center justify-center shrink-0">
                            <BookOpen size={18} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-[#2563eb] dark:group-hover:text-cyan-400 transition-colors">
                            {course.title}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              {course.category}
                            </span>
                            <span>•</span>
                            <span>{course.totalLessons || "12"} Lessons</span>
                            {course.duration && (
                              <>
                                <span>•</span>
                                <span>{course.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md hidden sm:inline-block">
                          View Modules
                        </span>
                        <ArrowRight size={15} className="text-slate-300 dark:text-slate-600 group-hover:text-[#2563eb] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* 2. Official Certification Exams Section */}
          {(selectedFilter === "all" || selectedFilter === "assessments") &&
            filteredExams.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award size={13} className="text-pink-500" />
                    Official Certification Exams ({filteredExams.length})
                  </h4>
                  <button
                    onClick={() => handleNavigate("/exam")}
                    className="text-[11px] font-semibold text-pink-600 dark:text-pink-400 hover:underline cursor-pointer"
                  >
                    Exam Portal
                  </button>
                </div>
                <div className="space-y-1.5">
                  {filteredExams.map((exam) => (
                    <div
                      key={exam.id}
                      onClick={() => handleNavigate(`/exam?track=${exam.id}`)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-pink-50/40 dark:hover:bg-pink-950/20 border border-slate-100 dark:border-slate-800/80 hover:border-pink-200 dark:hover:border-pink-500/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/15 text-[#db2777] dark:text-pink-400 border border-pink-100 dark:border-pink-500/30 flex items-center justify-center shrink-0 shadow-2xs">
                          <Award size={18} strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                            {exam.title}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                            <span className="font-semibold text-pink-600 dark:text-pink-400">
                              Passing Threshold: 85%
                            </span>
                            <span>•</span>
                            <span>{exam.duration || "45 Mins"}</span>
                            <span>•</span>
                            <span>{exam.totalQuestions || 20} Questions</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-950/60 px-2 py-0.5 rounded-md">
                          Take Exam
                        </span>
                        <ArrowRight size={15} className="text-slate-300 dark:text-slate-600 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* 3. Quizzes Section */}
          {(selectedFilter === "all" || selectedFilter === "assessments") &&
            filteredQuizzes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare size={13} className="text-purple-500" />
                    Quizzes ({filteredQuizzes.length})
                  </h4>
                  <button
                    onClick={() => handleNavigate("/my-quizzes")}
                    className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    View All Quizzes
                  </button>
                </div>
                <div className="space-y-1.5">
                  {filteredQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      onClick={() => handleNavigate(`/take-quiz/${quiz.id}`)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 border border-slate-100 dark:border-slate-800/80 hover:border-purple-200 dark:hover:border-purple-500/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/15 text-[#7c3aed] dark:text-purple-400 border border-purple-100 dark:border-purple-500/30 flex items-center justify-center shrink-0 shadow-2xs">
                          <CheckSquare size={18} strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {quiz.title}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                            <span className="font-medium text-purple-600 dark:text-purple-400">
                              {quiz.category || "Module Quiz"}
                            </span>
                            {quiz.duration && (
                              <>
                                <span>•</span>
                                <span>{quiz.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
                          Start Quiz
                        </span>
                        <ArrowRight size={15} className="text-slate-300 dark:text-slate-600 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* 4. Assignments Section */}
          {(selectedFilter === "all" || selectedFilter === "assignments") &&
            filteredAssignments.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookCheck size={13} className="text-emerald-500" />
                    Assignments ({filteredAssignments.length})
                  </h4>
                  <button
                    onClick={() => handleNavigate("/my-assignments")}
                    className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    View All Assignments
                  </button>
                </div>
                <div className="space-y-1.5">
                  {filteredAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      onClick={() => handleNavigate(`/take-assignment/${assignment.id}`)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 border border-slate-100 dark:border-slate-800/80 hover:border-emerald-200 dark:hover:border-emerald-500/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 text-[#059669] dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/30 flex items-center justify-center shrink-0 shadow-2xs">
                          <BookCheck size={18} strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {assignment.title}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                              {assignment.courseTitle || "Course Assignment"}
                            </span>
                            {assignment.dueDate && (
                              <>
                                <span>•</span>
                                <span>Due: {assignment.dueDate}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                          Open Task
                        </span>
                        <ArrowRight size={15} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* 5. Discussions Section */}
          {(selectedFilter === "all" || selectedFilter === "discussions") &&
            filteredDiscussions.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessagesSquare size={13} className="text-amber-500" />
                    Forums & Discussions ({filteredDiscussions.length})
                  </h4>
                  <button
                    onClick={() => handleNavigate("/forums")}
                    className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    View Community
                  </button>
                </div>
                <div className="space-y-1.5">
                  {filteredDiscussions.map((disc) => (
                    <div
                      key={disc.id}
                      onClick={() => handleNavigate(`/forums/${disc.id}`)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 border border-slate-100 dark:border-slate-800/80 hover:border-amber-200 dark:hover:border-amber-500/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/15 text-[#d97706] dark:text-amber-400 border border-amber-100 dark:border-amber-500/30 flex items-center justify-center shrink-0 shadow-2xs">
                          <MessagesSquare size={18} strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {disc.title}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                            <span className="font-medium text-amber-600 dark:text-amber-400">
                              {disc.category || disc.course || "Discussion"}
                            </span>
                            {disc.author && (
                              <>
                                <span>•</span>
                                <span>By {disc.author}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                          Join Discussion
                        </span>
                        <ArrowRight size={15} className="text-slate-300 dark:text-slate-600 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Modal Footer Keybind Info */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex justify-between items-center shrink-0">
          <span>
            Operating Media LMS &bull; Student Learning Search
          </span>
          <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-mono text-[10px]">
            ESC to close
          </span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
