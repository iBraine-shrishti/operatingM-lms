import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import {
  Search,
  X,
  BookOpen,
  Award,
  CheckSquare,
  BookCheck,
  MessagesSquare,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lmsService } from "../../services/lmsService";
import { EXAM_TRACKS } from "../exam/examTracksConfig";

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const resultItemRef = useRef([]);

  // Reset search state & auto-focus input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(-1);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Load student learning resources safely
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

  // Compute unified list of matching results when query > 1
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length <= 1) return [];

    const matches = [];

    // 1. Courses
    courses.forEach((c) => {
      if (
        c.title?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q)
      ) {
        matches.push({
          id: c.id,
          type: "Course",
          title: c.title,
          subtitle: `${c.category || "Course"} • ${c.totalLessons || 12} Lessons`,
          badge: c.category || "Course",
          link: `/courses/${c.id}`,
          icon: BookOpen,
          color: "blue",
        });
      }
    });

    // 2. Official Exams
    exams.forEach((e) => {
      if (
        e.title?.toLowerCase().includes(q) ||
        e.shortName?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q)
      ) {
        matches.push({
          id: e.id,
          type: "Exam",
          title: e.title,
          subtitle: `85% Pass • ${e.duration || "45 Mins"} • ${e.totalQuestions || 20} Questions`,
          badge: "Official Exam",
          link: `/exam?track=${e.id}`,
          icon: Award,
          color: "pink",
        });
      }
    });

    // 3. Quizzes
    quizzes.forEach((qz) => {
      if (
        qz.title?.toLowerCase().includes(q) ||
        qz.category?.toLowerCase().includes(q)
      ) {
        matches.push({
          id: qz.id,
          type: "Quiz",
          title: qz.title,
          subtitle: `${qz.category || "Chapter Quiz"}${qz.duration ? ` • ${qz.duration}` : ""}`,
          badge: "Quiz",
          link: `/take-quiz/${qz.id}`,
          icon: CheckSquare,
          color: "purple",
        });
      }
    });

    // 4. Assignments
    assignments.forEach((a) => {
      if (
        a.title?.toLowerCase().includes(q) ||
        a.courseTitle?.toLowerCase().includes(q)
      ) {
        matches.push({
          id: a.id,
          type: "Assignment",
          title: a.title,
          subtitle: `${a.courseTitle || "Batch Project"}${a.dueDate ? ` • Due ${a.dueDate}` : ""}`,
          badge: "Assignment",
          link: `/take-assignment/${a.id}`,
          icon: BookCheck,
          color: "emerald",
        });
      }
    });

    // 5. Discussions
    discussions.forEach((d) => {
      if (
        d.title?.toLowerCase().includes(q) ||
        d.category?.toLowerCase().includes(q) ||
        d.course?.toLowerCase().includes(q)
      ) {
        matches.push({
          id: d.id,
          type: "Discussion",
          title: d.title,
          subtitle: `${d.category || d.course || "Community"}${d.author ? ` • By ${d.author}` : ""}`,
          badge: "Forum",
          link: `/forums/${d.id}`,
          icon: MessagesSquare,
          color: "amber",
        });
      }
    });

    return matches;
  }, [query, courses, exams, quizzes, assignments, discussions]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && resultItemRef.current[activeIndex]) {
      resultItemRef.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const handleSelect = (item) => {
    if (!item) return;
    navigate(item.link);
    onClose();
  };

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Esc, Cmd+K
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          results.length > 0 ? (prev + 1) % results.length : -1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          results.length > 0 ? (prev - 1 + results.length) % results.length : -1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex]);
        } else if (results.length > 0) {
          handleSelect(results[0]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, activeIndex]);

  if (!isOpen) return null;

  const getItemColors = (color) => {
    switch (color) {
      case "pink":
        return {
          iconBox:
            "bg-pink-50 dark:bg-pink-500/15 text-[#db2777] dark:text-pink-400",
          badge:
            "bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/60",
        };
      case "purple":
        return {
          iconBox:
            "bg-purple-50 dark:bg-purple-500/15 text-[#7c3aed] dark:text-purple-400",
          badge:
            "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60",
        };
      case "emerald":
        return {
          iconBox:
            "bg-emerald-50 dark:bg-emerald-500/15 text-[#059669] dark:text-emerald-400",
          badge:
            "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
        };
      case "amber":
        return {
          iconBox:
            "bg-amber-50 dark:bg-amber-500/15 text-[#d97706] dark:text-amber-400",
          badge:
            "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
        };
      default:
        return {
          iconBox:
            "bg-blue-50 dark:bg-blue-500/15 text-[#2563eb] dark:text-blue-400",
          badge:
            "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
        };
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0b1329] w-full max-w-[600px] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-top-3 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 dark:border-slate-800 gap-3 bg-white dark:bg-[#0b1329]">
          <Search size={20} className="text-[#2563eb] dark:text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, exams, assignments, quizzes..."
            className="flex-1 border-none outline-none text-base font-medium text-slate-900 dark:text-white bg-transparent placeholder-slate-400 dark:placeholder-slate-500"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors cursor-pointer"
              title="Clear"
            >
              <X size={16} />
            </button>
          ) : (
            <kbd className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-[380px] overflow-y-auto p-3 custom-scrollbar">
          {/* Matches Found */}
          {results.length > 0 &&
            results.map((item, index) => {
              const Icon = item.icon;
              const { iconBox, badge } = getItemColors(item.color);
              const isActive = index === activeIndex;

              return (
                <div
                  key={`${item.type}-${item.id}-${index}`}
                  ref={(el) => (resultItemRef.current[index] = el)}
                  onClick={() => handleSelect(item)}
                  className={`flex items-center p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl cursor-pointer transition-all gap-3.5 mb-1 border group ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80 shadow-2xs"
                      : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-100 dark:hover:border-slate-800"
                  }`}
                >
                  <div
                    className={`w-9.5 h-9.5 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${iconBox}`}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-[#2563eb] dark:group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h4>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${badge}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.type} • {item.subtitle}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-slate-300 dark:text-slate-600 group-hover:text-[#2563eb] dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </div>
              );
            })}

          {/* No Results Found */}
          {query.trim().length > 1 && results.length === 0 && (
            <div className="py-10 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
              No matching learning resources found for &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Default / Placeholder State */}
          {query.trim().length <= 1 && (
            <div className="py-8 px-4 text-center space-y-3">
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                Type course name, exam, quiz, assignment, or discussion topic to search...
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleSelect({ link: "/enrolled-courses" })}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-[#2563eb] dark:hover:text-cyan-400 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Courses
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ link: "/exam" })}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-950/40 hover:text-pink-600 dark:hover:text-pink-400 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Official Exams
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ link: "/my-quizzes" })}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Quizzes
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ link: "/my-assignments" })}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Assignments
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GlobalSearchModal;
