import React, { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Users,
  HelpCircle,
  FileText,
  ArrowRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lmsService } from "../../services/lmsService";

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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

  if (!isOpen) return null;

  const courses = lmsService.getCourses();
  const students = lmsService.getStudents();

  const filteredCourses = query
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()),
      )
    : courses.slice(0, 3);

  const filteredStudents = query
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.email.toLowerCase().includes(query.toLowerCase()),
      )
    : students.slice(0, 2);

  const quickLinks = [
    { label: "Manage Courses", path: "/manage-courses", icon: BookOpen },
    { label: "Manage Students", path: "/manage-students", icon: Users },
    { label: "Manage Units", path: "/manage-units", icon: FileText },
    {
      label: "Question & Discussions",
      path: "/question-discussions",
      icon: HelpCircle,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3 bg-slate-50/70 dark:bg-slate-900/60">
          <Search size={20} className="text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, students, modules, discussions..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base font-medium focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results / Navigation */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Quick Links */}
          {!query && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Quick Shortcuts
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        onClose();
                        navigate(item.path);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-amber-50/60 dark:hover:bg-amber-950/30 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-900 dark:group-hover:text-amber-300">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Courses Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Courses ({filteredCourses.length})
            </h4>
            <div className="space-y-1.5">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    onClose();
                    navigate(`/courses/${course.id}`);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        {course.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        {course.category} • {course.studentsCount} Students
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 dark:text-slate-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Students Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Students ({filteredStudents.length})
            </h4>
            <div className="space-y-1.5">
              {filteredStudents.map((std) => (
                <div
                  key={std.id}
                  onClick={() => {
                    onClose();
                    navigate("/manage-students");
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={std.avatar}
                      alt={std.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        {std.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {std.email}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                    {std.overallProgress}% Complete
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex justify-between items-center">
          <span>
            Navigate with <strong>↑</strong> <strong>↓</strong> and press{" "}
            <strong>Enter</strong>
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
