import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import {
  Plus,
  Search,
  Video,
  FileText,
  CheckCircle2,
  Edit,
  Trash2,
  Play,
  CheckSquare,
  ChevronDown,
  X,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
export const ManageUnitsPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const courses = lmsService.getCourses();
  const [units, setUnits] = useState(() => lmsService.getUnits());
  // Selected course for categorization (default to first course or course-3 Advanced Topics)
  const defaultCourse =
    courses.find((c) => c.title.toLowerCase().includes("advanced")) ||
    courses[0];
  const [selectedCourseId, setSelectedCourseId] = useState(
    defaultCourse?.id || "course-3",
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  // Modal form states
  const [modalCourseId, setModalCourseId] = useState(selectedCourseId);
  const [newTitle, setNewTitle] = useState("");
  const [newModuleName, setNewModuleName] = useState("");
  const [newType, setNewType] = useState("video");
  const [newDuration, setNewDuration] = useState("20:00");
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  // Compute unit counts per course
  const courseUnitCounts = useMemo(() => {
    const map = {};
    units.forEach((u) => {
      map[u.courseId] = (map[u.courseId] || 0) + 1;
    });
    return map;
  }, [units]);
  // Filter units by selected course, search, and type
  const courseUnits = useMemo(() => {
    if (selectedCourseId === "all") {
      return units;
    }
    return units.filter((u) => u.courseId === selectedCourseId);
  }, [units, selectedCourseId]);
  const filteredUnits = useMemo(() => {
    return courseUnits.filter((u) => {
      const matchesSearch =
        u.title.toLowerCase().includes(search.toLowerCase()) ||
        (u.moduleName &&
          u.moduleName.toLowerCase().includes(search.toLowerCase()));
      const matchesType = typeFilter === "all" ? true : u.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [courseUnits, search, typeFilter]);
  // Group by module / section for the selected course
  const moduleSections = useMemo(() => {
    const map = new Map();
    filteredUnits.forEach((u) => {
      const mod = u.moduleName || "General Lessons";
      const list = map.get(mod) || [];
      list.push(u);
      map.set(mod, list);
    });
    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }, [filteredUnits]);
  const handleOpenAddModal = (courseId, moduleName) => {
    setModalCourseId(courseId || selectedCourseId);
    setNewModuleName(
      moduleName || (selectedCourse ? "Module 1" : "General Lessons"),
    );
    setShowAddModal(true);
  };
  const handleAddUnit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("Please enter unit title", "warning");
      return;
    }
    const targetCourse =
      courses.find((c) => c.id === modalCourseId) || courses[0];
    const created = lmsService.addUnit({
      courseId: targetCourse.id,
      moduleName: newModuleName.trim() || "General Lessons",
      title: newTitle.trim(),
      duration: newDuration || "15:00",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      isCompleted: false,
      isLocked: false,
      type: newType,
      description: "Standard curriculum learning material.",
    });
    setUnits(lmsService.getUnits());
    setNewTitle("");
    setShowAddModal(false);
    showToast(
      `Unit "${created.title}" added to ${targetCourse.title}!`,
      "success",
    );
  };
  const handleDeleteUnit = (id, title) => {
    if (confirm(`Delete unit "${title}"?`)) {
      const remaining = units.filter((u) => u.id !== id);
      setUnits(remaining);
      showToast(`Unit "${title}" deleted`, "info");
    }
  };
  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER - ACTIVITY PAGE STYLE (ADMIN CLEAN THEME)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-2 relative z-10 min-w-0">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <FileText size={17} />
            <span>Course Curriculum & Learning Units</span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Curriculum Synchronized</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Manage Learning Units
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
            Categorized by course. Organize learning modules, video lessons, reference documentation, and practical exercises.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{units.length}</span>
              <span className="font-semibold">Total Units</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{units.filter(u => u.type === 'video').length}</span>
              <span className="font-semibold">Video Lessons</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">{units.filter(u => u.type === 'doc' || u.type === 'quiz').length}</span>
              <span className="font-semibold">Interactive & Docs</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">100%</span>
              <span className="font-semibold">HD Streaming</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0 relative z-10">
          <button
            onClick={() => handleOpenAddModal()}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>+ Add Unit to Course</span>
          </button>
        </div>
      </div>

      {/* SIMPLE COURSE SELECT DROPDOWN & SEARCH FILTERS */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1">
            <label
              htmlFor="unit-course-select"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 shrink-0"
            >
              Select Course:
            </label>
            <div className="relative flex-1 max-w-md">
              <select
                id="unit-course-select"
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  setSearch("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3b49df] cursor-pointer appearance-none transition-colors"
              >
                <option value="all">All Courses ({units.length} Units)</option>
                {courses.map((course) => {
                  const count = courseUnitCounts[course.id] || 0;
                  return (
                    <option key={course.id} value={course.id}>
                      {course.title} ({count} {count === 1 ? "Unit" : "Units"})
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
              />
            </div>
          </div>

          {selectedCourse && (
            <div className="flex items-center space-x-2 shrink-0 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Active:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {selectedCourse.title}
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                {courseUnits.length} Units
              </span>
            </div>
          )}
        </div>

        {/* Search & Type Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search units in ${selectedCourse?.title || "all courses"}...`}
              className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
            {["all", "video", "assignment", "document", "quiz"].map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-colors cursor-pointer ${
                  typeFilter === f
                    ? "bg-slate-900 dark:bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {f === "all" ? `All (${courseUnits.length})` : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIZED UNITS BY MODULE / SECTION */}
      <div className="space-y-5">
        {moduleSections.length === 0 ? (
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center text-slate-400 dark:text-slate-500 text-xs shadow-xs">
            No units found for this selection. Click "+ Add Unit to Course"
            above to create one.
          </div>
        ) : (
          moduleSections.map((section) => (
            <div key={section.name} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base flex items-center space-x-2">
                  <span>{section.name}</span>
                  <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                    ({section.items.length})
                  </span>
                </h3>
                <button
                  onClick={() =>
                    handleOpenAddModal(selectedCourseId, section.name)
                  }
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add to Section</span>
                </button>
              </div>

              <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/80 shadow-xs overflow-hidden">
                {section.items.map((unit) => (
                  <div
                    key={unit.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                        {unit.type === "video" ? (
                          <Video size={16} />
                        ) : unit.type === "assignment" ? (
                          <FileText size={16} />
                        ) : unit.type === "quiz" ? (
                          <CheckSquare size={16} />
                        ) : (
                          <FileText size={16} />
                        )}
                      </div>

                      <div className="truncate">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {unit.title}
                          </h4>
                          <span className="text-[11px] font-medium uppercase px-2 py-0.5 rounded-md shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {unit.type}
                          </span>
                        </div>
                        {unit.description && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-normal truncate max-w-xl mt-0.5">
                            {unit.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        {unit.duration}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                        {unit.isCompleted && (
                          <CheckCircle2
                            size={13}
                            className="inline mr-1 text-slate-800 dark:text-slate-200"
                          />
                        )}
                        <span>{unit.isCompleted ? "Completed" : "Active"}</span>
                      </span>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() =>
                            navigate(
                              `/lesson-player?courseId=${unit.courseId}&unitId=${unit.id}`,
                            )
                          }
                          className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Preview in Lesson Player"
                        >
                          <Play size={15} />
                        </button>
                        <button
                          onClick={() =>
                            showToast(`Edit modal for "${unit.title}"`, "info")
                          }
                          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Edit Unit"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteUnit(unit.id, unit.title)}
                          className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Delete Unit"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD UNIT MODAL (Scoped to Course) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  Add New Unit
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                  Attach unit to specific course & module.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddUnit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Course
                </label>
                <select
                  value={modalCourseId}
                  onChange={(e) => setModalCourseId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Module / Section Name
                </label>
                <input
                  type="text"
                  required
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="e.g. Affiliate Marketing or Module 1"
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Unit Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Affiliate Network Integrations"
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Unit Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden"
                  >
                    <option value="video">Video Lecture</option>
                    <option value="assignment">Assignment</option>
                    <option value="document">Text / Document</option>
                    <option value="quiz">Interactive Quiz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="20:00"
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Add Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageUnitsPage;
