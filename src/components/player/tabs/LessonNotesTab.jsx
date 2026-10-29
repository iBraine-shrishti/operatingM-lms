import { lmsService } from "../../../services/lmsService";
import React from "react";
import { Bookmark, Send } from "lucide-react";
import { formatTime } from "../../../utils/playerUtils";

/**
 * LessonNotesTab Component
 * Student scratchpad to take notes with timestamp bookmarks and review previous notes.
 */
export const LessonNotesTab = ({
  noteContent,
  setNoteContent,
  userNotes = [],
  currentCourse,
  currentLesson,
  currentTime,
  onInsertTimestamp,
  onSaveNote,
}) => {
  const courseNotes = userNotes.filter((n) =>
    lmsService.isNoteMatchingCourse(n, currentCourse)
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Scratchpad Note for this Lesson
          </label>
          <button
            type="button"
            onClick={onInsertTimestamp}
            className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <Bookmark size={12} />
            <span>
              Attach current time [{formatTime(currentTime)}]
            </span>
          </button>
        </div>
        <textarea
          rows={3}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write key concepts, formulas, or reminders for this timestamp..."
          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <div className="flex justify-end">
          <button
            onClick={onSaveNote}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <Send size={13} />
            <span>Save Note to Notebook</span>
          </button>
        </div>
      </div>

      {/* List of saved notes */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <h4 className="font-bold text-slate-900 dark:text-white text-xs">
          Your Saved Notes ({courseNotes.length})
        </h4>
        {courseNotes.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 py-3 italic">
            No notes saved for this course yet. Use the box above to take notes!
          </p>
        ) : (
          courseNotes.map((note) => {
            const contentText = note.content || note.text || "";
            const isHtml =
              typeof contentText === "string" &&
              contentText.includes("<") &&
              contentText.includes(">");

            return (
              <div
                key={note.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5 transition-all hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span className="font-bold text-blue-600 dark:text-cyan-400">
                    {note.lessonTitle || note.lessonTag || currentLesson?.title}
                  </span>
                  <span>{note.createdAt || note.date || "Recently"}</span>
                </div>
                {isHtml ? (
                  <div
                    className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium break-words prose-note prose-sm dark:prose-invert max-w-none text-xs"
                    dangerouslySetInnerHTML={{ __html: contentText }}
                  />
                ) : (
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-line break-words">
                    {contentText}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
