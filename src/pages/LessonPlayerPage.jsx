import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import {
  Play,
  CheckCircle,
  Lock,
  ArrowLeft,
  FileText,
  Download,
  Send,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
export const LessonPlayerPage = () => {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get("courseId") || "course-1";
  const course =
    lmsService.getCourseById(courseId) || lmsService.getCourses()[0];
  const units = lmsService.getUnitsByCourse(course.id);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [noteContent, setNoteContent] = useState("");
  const [userNotes, setUserNotes] = useState(() => lmsService.getNotes());
  const currentLesson = units[activeLessonIdx] || {
    id: "u-1",
    title: "1.1 How Search Engines Crawl & Index Websites",
    duration: "14:20",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    moduleName: "Module 1: SEO Foundations",
    description:
      "Learn how Googlebot operates, rendering budgets, indexing queues, and canonicalization fundamentals.",
  };
  const handleSaveNote = () => {
    if (!noteContent.trim()) return;
    lmsService.addNote({
      courseId: course.id,
      courseTitle: course.title,
      lessonTitle: currentLesson.title,
      content: noteContent,
    });
    setUserNotes(lmsService.getNotes());
    setNoteContent("");
    showToast("Note saved to your profile notes!", "success", "Note Saved");
  };
  return (
    <div className="space-y-6">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] font-medium text-amber-600 uppercase tracking-wider block">
              {course.title}
            </span>
            <h1 className="text-sm font-semibold text-slate-900">
              {currentLesson.title}
            </h1>
          </div>
        </div>

        <button
          onClick={() => navigate("/manage-courses")}
          className="bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-xl"
        >
          Exit Player
        </button>
      </div>

      {/* Main Grid: Player on left (2 cols), Syllabus on right (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Video & Tabs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Container */}
          <div className="bg-black rounded-3xl overflow-hidden shadow-xl aspect-video relative group">
            <video
              key={currentLesson.videoUrl || currentLesson.id}
              controls
              autoPlay={false}
              className="w-full h-full object-contain"
              poster={course.thumbnail}
            >
              <source
                src={
                  currentLesson.videoUrl ||
                  "https://www.w3schools.com/html/mov_bbb.mp4"
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Tabbed Info Panel below Video */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 flex space-x-6 pb-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`text-xs font-bold pb-2 border-b-2 transition-colors ${activeTab === "overview" ? "border-amber-500 text-amber-600" : "border-transparent text-slate-400 hover:text-slate-700"}`}
              >
                Lesson Overview
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`text-xs font-bold pb-2 border-b-2 transition-colors ${activeTab === "notes" ? "border-amber-500 text-amber-600" : "border-transparent text-slate-400 hover:text-slate-700"}`}
              >
                Take Personal Notes ({userNotes.length})
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`text-xs font-bold pb-2 border-b-2 transition-colors ${activeTab === "resources" ? "border-amber-500 text-amber-600" : "border-transparent text-slate-400 hover:text-slate-700"}`}
              >
                Download Resources
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-2 text-xs text-slate-700">
                <h3 className="font-bold text-slate-900 text-sm">
                  {currentLesson.title}
                </h3>
                <p className="leading-relaxed">
                  {currentLesson.description ||
                    "In this lecture we cover essential strategies and practical execution steps."}
                </p>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Type your notes for this timestamp..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden"
                />
                <button
                  onClick={handleSaveNote}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1"
                >
                  <Send size={14} />
                  <span>Save Note</span>
                </button>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                    <FileText size={16} className="text-amber-500" />
                    <span>SEO_Audit_Checklist_2026.pdf</span>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Course Syllabus Playlist */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Course Syllabus
            </h3>
            <span className="text-[11px] font-bold text-slate-400">
              {units.length} Lessons
            </span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {units.map((unit, idx) => {
              const isActive = idx === activeLessonIdx;
              return (
                <div
                  key={unit.id}
                  onClick={() => setActiveLessonIdx(idx)}
                  className={`p-3rounded border transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-50 border-blue-200 shadow-xs"
                      : "bg-white border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h4
                          className={`text-xs font-bold leading-snug ${isActive ? "text-blue-900" : "text-slate-800"}`}
                        >
                          {unit.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                          {unit.duration}
                        </span>
                      </div>
                    </div>
                    {unit.isCompleted ? (
                      <CheckCircle
                        size={16}
                        className="text-emerald-500 shrink-0"
                      />
                    ) : unit.isLocked ? (
                      <Lock size={14} className="text-slate-300 shrink-0" />
                    ) : (
                      <Play
                        size={14}
                        className={
                          isActive
                            ? "text-blue-600 fill-blue-600 shrink-0"
                            : "text-slate-300 shrink-0"
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
