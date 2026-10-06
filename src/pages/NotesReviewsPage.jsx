import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import { 
  FileText, Search, Plus, Trash2, Copy, BookOpen, 
  Calendar, Check, X, Bookmark, Filter, ArrowUpDown, 
  SlidersHorizontal, Sparkles, Tag
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export const NotesReviewsPage = () => {
  const { showToast } = useToast();
  const [notes, setNotes] = useState(() => lmsService.getNotes());
  const courses = lmsService.getCourses();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'title'
  const [copiedId, setCopiedId] = useState(null);

  // New Note Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || "course-1");
  const [newCategory, setNewCategory] = useState("General");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set(["All Notes"]);
    notes.forEach((n) => {
      if (n.category) set.add(n.category);
    });
    ["Social Media", "SEO", "Analytics", "Google Ads", "WordPress", "Design"].forEach(c => set.add(c));
    return Array.from(set);
  }, [notes]);

  // Filtered & Sorted Notes
  const filteredNotes = useMemo(() => {
    let result = notes.filter((n) => {
      // Search text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesContent = n.content?.toLowerCase().includes(q);
        const matchesLesson = n.lessonTitle?.toLowerCase().includes(q);
        const matchesCourse = n.courseTitle?.toLowerCase().includes(q);
        const matchesCat = n.category?.toLowerCase().includes(q);
        if (!matchesContent && !matchesLesson && !matchesCourse && !matchesCat) {
          return false;
        }
      }

      // Course filter
      if (selectedCourse !== "all") {
        const courseObj = courses.find((c) => c.id === selectedCourse);
        if (courseObj && n.courseTitle !== courseObj.title && n.courseId !== selectedCourse) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && selectedCategory !== "All Notes") {
        if (n.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "title") {
        return (a.lessonTitle || "").localeCompare(b.lessonTitle || "");
      }
      if (sortBy === "oldest") {
        return (a.id || "").localeCompare(b.id || "");
      }
      // default: newest
      return (b.id || "").localeCompare(a.id || "");
    });

    return result;
  }, [notes, searchQuery, selectedCourse, selectedCategory, sortBy, courses]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCourse !== "all" || selectedCategory !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("all");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  const handleCopyNote = (note) => {
    navigator.clipboard.writeText(note.content);
    setCopiedId(note.id);
    showToast("Note content copied to clipboard!", "success", "Copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteNote = (id, lessonTitle) => {
    lmsService.deleteNote(id);
    setNotes(lmsService.getNotes());
    showToast(`Note for "${lessonTitle}" removed.`, "info", "Note Deleted");
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !newContent.trim()) {
      showToast("Please provide both a lesson topic and note content.", "warning", "Incomplete Form");
      return;
    }

    const courseObj = courses.find((c) => c.id === newCourseId);
    const courseTitle = courseObj ? courseObj.title : "Digital Marketing";

    lmsService.addNote({
      courseId: newCourseId,
      courseTitle,
      lessonTitle: newLessonTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
    });

    setNotes(lmsService.getNotes());
    setIsModalOpen(false);
    setNewLessonTitle("");
    setNewContent("");
    showToast("New study note saved successfully!", "success", "Note Created");
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - FULLY RESPONSIVE                              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#3b49df] text-xs font-bold uppercase tracking-wider">
            <Bookmark size={15} />
            <span>Study Space & Notebook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notes
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Search, filter, and review key formulas, definitions, and practical frameworks across all your enrolled courses.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b49df] inline-block"></span>
              <span className="font-bold text-slate-900">{notes.length}</span>
              <span className="text-slate-500">Total Notes</span>
            </div>
            {hasActiveFilters && (
              <div className="flex items-center space-x-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="font-bold text-slate-900">{filteredNotes.length}</span>
                <span className="text-slate-500">Matching Filter</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Add New Note</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR - RESPONSIVE STACKED & GRID DESIGN        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Row: Search + Course Filter + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Live Search Input */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by keyword, lesson topic, concept..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter by Course Select */}
          <div className="md:col-span-3 lg:col-span-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] cursor-pointer"
            >
              <option value="all">All Enrolled Courses ({notes.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] cursor-pointer"
              >
                <option value="newest">Sort: Newest Added</option>
                <option value="oldest">Sort: Oldest Added</option>
                <option value="title">Sort: Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second Row: Topic/Category Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar pb-1.5 sm:pb-0 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline-block shrink-0">
              Categories:
            </span>
            {categories.map((cat) => {
              const isActive = (cat === "All Notes" && selectedCategory === "all") || selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === "All Notes" ? "all" : cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#3b49df] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Active Filter Clear action */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center space-x-1 self-start sm:self-auto cursor-pointer shrink-0"
            >
              <X size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NOTES GRID - FULLY RESPONSIVE (1 col mobile, 2 col desktop)   */}
      {/* ------------------------------------------------------------- */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <FileText size={26} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            No notes matched your search criteria
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            {hasActiveFilters
              ? "Try broadening your keywords or clearing the category and course filters to view more notes."
              : "You haven't created any lecture notes yet. Click the button below to add your first note!"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#3b49df] text-white hover:bg-[#2f3cb3] transition-colors cursor-pointer"
            >
              + Add New Note
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header: Course Pill, Category Badge, Date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#3b49df] bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-md truncate max-w-[200px]">
                    {note.courseTitle}
                  </span>
                  
                  <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] text-slate-400">
                    {note.category && (
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {note.category}
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Calendar size={11} />
                      <span>{note.createdAt}</span>
                    </span>
                  </div>
                </div>

                {/* Lesson Title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-[#3b49df] transition-colors">
                  {note.lessonTitle}
                </h3>

                {/* Note Body Box */}
                <div className="text-xs sm:text-sm text-slate-700 bg-slate-50/80 border border-slate-100 p-3.5 sm:p-4 rounded-xl leading-relaxed whitespace-pre-line break-words font-normal">
                  {note.content}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <button
                  onClick={() => handleCopyNote(note)}
                  className="flex items-center space-x-1.5 text-slate-600 hover:text-[#3b49df] font-semibold py-1.5 px-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
                >
                  {copiedId === note.id ? (
                    <>
                      <Check size={14} className="text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Note</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDeleteNote(note.id, note.lessonTitle)}
                  className="flex items-center space-x-1 text-slate-400 hover:text-rose-600 font-semibold py-1.5 px-2 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer active:scale-95"
                  title="Delete note"
                >
                  <Trash2 size={14} />
                  <span className="text-[11px]">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ADD NEW NOTE MODAL - FULLY RESPONSIVE                         */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3b49df] flex items-center justify-center shrink-0">
                  <Bookmark size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add New Study Note</h3>
                  <p className="text-[11px] text-slate-500">Capture important ideas, formulas, or strategies.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Related Course *
                </label>
                <select
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Lesson Topic / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="e.g. 02 Keyword Intent Mapping"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                  >
                    <option value="General">General</option>
                    <option value="Social Media">Social Media</option>
                    <option value="SEO">SEO</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="WordPress">WordPress</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Note Content / Summary *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Jot down formulas, framework steps, code snippets, or lecture insights..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#3b49df] hover:bg-[#2f3cb3] text-white font-semibold shadow-xs transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Plus size={15} />
                  <span>Save Note</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesReviewsPage;
