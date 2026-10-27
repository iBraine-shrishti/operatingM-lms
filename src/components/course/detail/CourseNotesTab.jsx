import React from "react";
import { Search, X, Check, Copy, Trash2 } from "lucide-react";

/**
 * CourseNotesTab Component
 * Renders the student notebook for the course:
 * - Quick note entry form with module tag selector
 * - Live search input and module tag filter
 * - Mapped notes list with one-click copy and delete actions
 */
export const CourseNotesTab = ({
  sections = [],
  courseNotes = [],
  filteredCourseNotes = [],
  availableNoteTags = [],
  newNoteText = "",
  newNoteTag = "",
  courseNotesSearch = "",
  courseNotesFilterTag = "all",
  copiedNoteId = null,
  onNewNoteTextChange,
  onNewNoteTagChange,
  onSaveNote,
  onSearchChange,
  onFilterTagChange,
  onResetFilter,
  onCopyNote,
  onDeleteNote,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">
          My Course Notebook
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Capture personal notes, timestamps, and strategies while learning.
        </p>
      </div>

      {/* Note Creation Form */}
      <form
        onSubmit={onSaveNote}
        className="p-5 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Add a Quick Note
          </label>
          <select
            value={newNoteTag}
            onChange={(e) => onNewNoteTagChange(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-hidden"
          >
            {sections.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          rows={3}
          required
          value={newNoteText}
          onChange={(e) => onNewNoteTextChange(e.target.value)}
          placeholder="Type your notes here..."
          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df] focus:bg-white dark:focus:bg-[#0b1329]"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs font-semibold px-5 py-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            Save Note
          </button>
        </div>
      </form>

      {/* Course Notebook Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            value={courseNotesSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes in this course..."
            className="w-full pl-9 pr-8 py-2 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
          />
          {courseNotesSearch && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="sm:w-60">
          <select
            value={courseNotesFilterTag}
            onChange={(e) => onFilterTagChange(e.target.value)}
            className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] cursor-pointer"
          >
            <option value="all">All Modules & Tags</option>
            {availableNoteTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredCourseNotes.length === 0 ? (
          <div className="p-8 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {courseNotes.length === 0
                ? "You haven't added any notes for this course yet."
                : "No matching notes found"}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {courseNotes.length === 0
                ? "Use the form above to capture key insights, timestamps, or strategies."
                : "Try adjusting your search terms or filter."}
            </p>
            {(courseNotesSearch || courseNotesFilterTag !== "all") && (
              <button
                onClick={onResetFilter}
                className="text-xs text-[#3b49df] dark:text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          filteredCourseNotes.map((note) => {
            const noteText = note.text || note.content || "";
            const noteTag = note.lessonTag || note.lessonTitle || "General";
            const noteDate = note.date || note.createdAt || "Recently";
            const isCopied = copiedNoteId === note.id;

            return (
              <div
                key={note.id}
                className="p-4 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4 group hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-[#3b49df] dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 px-2.5 py-0.5 rounded-full">
                      {noteTag}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      {noteDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-line break-words">
                    {noteText}
                  </p>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => onCopyNote(noteText, note.id)}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-[#3b49df] dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                    title="Copy Note"
                  >
                    {isCopied ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1.5 text-slate-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Delete Note"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CourseNotesTab;
