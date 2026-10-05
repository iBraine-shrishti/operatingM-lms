import React, { useState } from "react";
import { lmsService } from "../services/lmsService";
import { Star } from "lucide-react";
export const NotesReviewsPage = () => {
  const [notes, setNotes] = useState(() => lmsService.getNotes());
  const reviews = lmsService.getReviews();
  const [activeTab, setActiveTab] = useState("notes");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">
          Notes & Reviews
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Access your saved lecture notes and course ratings.
        </p>
      </div>

      <div className="border-b border-slate-200 flex space-x-6">
        <button
          onClick={() => setActiveTab("notes")}
          className={`pb-3 text-xs font-medium border-b-2 transition-colors tabular-nums ${activeTab === "notes" ? "border-amber-500 text-amber-600 font-semibold" : "border-transparent text-slate-400 hover:text-slate-700"}`}
        >
          My Saved Notes ({notes.length})
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 text-xs font-medium border-b-2 transition-colors tabular-nums ${activeTab === "reviews" ? "border-amber-500 text-amber-600 font-semibold" : "border-transparent text-slate-400 hover:text-slate-700"}`}
        >
          Course Reviews ({reviews.length})
        </button>
      </div>

      {activeTab === "notes" ? (
        <div className="space-y-3">
          {notes.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded border border-slate-200/80 p-4 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  {n.courseTitle}
                </span>
                <span className="text-[10px] text-slate-400">
                  {n.createdAt}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-slate-900">
                {n.lessonTitle}
              </h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">
                {n.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded border border-slate-200/80 p-4 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < r.rating
                          ? "text-amber-500 fill-amber-400"
                          : "text-slate-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">{r.date}</span>
              </div>
              <p className="text-xs font-semibold text-slate-900">
                {r.courseTitle}
              </p>
              <p className="text-xs text-slate-600 italic">"{r.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
