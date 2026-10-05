import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Video,
  ExternalLink,
  Filter,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const SchedulePage = () => {
  const navigate = useNavigate();
  const { crmProfile, crmBatch } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' | 'curriculum' | 'timetable'

  const upcomingSessions = [
    {
      id: "01",
      title: "Data Science & Analytics Foundations",
      dates: "22 Apr 2026 - 24 Apr 2026",
      timing: "9:00 AM - 10:00 AM",
      faculty: "Harsh Pareek (Lead Faculty)",
      status: "In Session",
      isLive: true,
      room: "Lab 2 & Zoom Hybrid",
      batch: "Masters Weekday Morning",
    },
    {
      id: "02",
      title: "Social Media Marketing & Meta Ads Strategy",
      dates: "3 Mar 2026 - 19 Mar 2026",
      timing: "9:00 AM - 10:00 AM",
      faculty: "Nishi Solanki",
      status: "Upcoming",
      isLive: false,
      room: "Room 104",
      batch: "Masters Weekday Morning",
    },
    {
      id: "03",
      title: "Website Development with WordPress & CMS Customization",
      dates: "04 Mar 2026 - 12 Mar 2026",
      timing: "9:00 AM - 10:00 AM",
      faculty: "Darshan Deorukhkar",
      status: "Upcoming",
      isLive: false,
      room: "Lab 1",
      batch: "Masters Weekday Morning",
    },
    {
      id: "04",
      title: "Google Ads (PPC) Campaign Planning & ROAS Optimization",
      dates: "16 Mar 2026 - 28 Mar 2026",
      timing: "9:00 AM - 10:00 AM",
      faculty: "Harsh Pareek",
      status: "Upcoming",
      isLive: false,
      room: "Main Conference",
      batch: "Masters Weekday Morning",
    },
  ];

  const weeklySchedule = [
    {
      day: "Monday",
      time: "9:00 AM - 10:00 AM",
      topic: "Technical SEO Audits & Core Web Vitals",
      faculty: "Harsh Pareek",
      type: "Lecture + Lab",
    },
    {
      day: "Tuesday",
      time: "9:00 AM - 10:00 AM",
      topic: "Schema Markup & Rich Snippets Hands-on",
      faculty: "Harsh Pareek",
      type: "Live Workshop",
    },
    {
      day: "Wednesday",
      time: "9:00 AM - 10:00 AM",
      topic: "Robots.txt, XML Sitemaps & Canonicalization",
      faculty: "Harsh Pareek",
      type: "Theory & Case Study",
    },
    {
      day: "Thursday",
      time: "9:00 AM - 10:00 AM",
      topic: "Google Search Console Advanced Diagnostics",
      faculty: "Harsh Pareek",
      type: "Lab Session",
    },
    {
      day: "Friday",
      time: "9:00 AM - 10:00 AM",
      topic: "Weekly Q&A, Doubt Solving & Project Review",
      faculty: "Harsh Pareek & Nishi",
      type: "Interactive Review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 border border-blue-200 rounded">
              ACADEMIC CALENDAR & TIMETABLE
            </span>
            <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Batch Sync</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Classroom Schedule & Curriculum
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Real-time enrolled batch schedule, active lecture timings, and
            upcoming curriculum sessions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "upcoming"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Curriculum Sessions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("timetable")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "timetable"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Weekly Timetable
          </button>
        </div>
      </div>

      {/* 1. Enrolled Batch & Schedule Card (LATEST UI) */}
      <div className="bg-white border border-slate-200/90rounded p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Enrolled Batch & Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Official batch registration details from Operating Media CRM
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 flex items-center space-x-2 self-start sm:self-auto">
            <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-purple-200/80 text-purple-800 text-[10px] font-black uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              <span>LIVE</span>
            </span>
            <span>
              {crmProfile.batchName ||
                "Masters in Digital Marketing - Weekday Morning"}
            </span>
          </div>
        </div>

        {/* 2x2 Meta Grid matching LATEST UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase text-[10px]">
              <Clock size={12} />
              <span>TIMING:</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm">
              9:00 AM - 10:00 AM
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Daily 1-Hour Lecture
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase text-[10px]">
              <Calendar size={12} />
              <span>DAYS:</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm">
              Monday to Friday
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              5 Days / Week Schedule
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase text-[10px]">
              <MapPin size={12} />
              <span>BRANCH / CENTER:</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm">
              {crmProfile.branch || "Borivali Center"}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Classroom + Live Zoom Hybrid
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase text-[10px]">
              <User size={12} />
              <span>FACULTY LEAD:</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm truncate">
              Harsh Pareek
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Director & Lead Faculty
            </div>
          </div>
        </div>

        {/* CURRENT TOPIC IN SESSION */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                CURRENT TOPIC IN SESSION
              </span>
              <h4 className="font-black text-slate-900 text-sm sm:text-base mt-0.5">
                Data Science & Advanced Python for Marketers
              </h4>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-2xs">
              22 Apr 2026 - 24 Apr 2026
            </span>
            <button
              onClick={() => navigate("/lesson-player?courseId=course-8")}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
            >
              <span>Join Lecture</span>
              <Video size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Curriculum Sessions (LATEST UI) */}
      {activeTab === "upcoming" ? (
        <div className="bg-white border border-slate-200/90 rounded p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Upcoming Curriculum Sessions
              </h3>
              <p className="text-xs text-slate-500">
                Planned module roadmap and chronological class timelines
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {upcomingSessions.length} Modules Scheduled
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                    {session.id}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {session.title}
                      </h4>
                      {session.isLive && (
                        <span className="text-[9.5px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1 font-medium">
                      <span>
                        Faculty:{" "}
                        <strong className="text-slate-700">
                          {session.faculty}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Location:{" "}
                        <strong className="text-slate-700">
                          {session.room}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
                  <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                    {session.dates}
                  </span>
                  <button
                    onClick={() => navigate("/enrolled-courses")}
                    className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Syllabus</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Weekly Timetable View */
        <div className="bg-white border border-slate-200/90rounded p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Weekly Class Timetable
            </h3>
            <p className="text-xs text-slate-500">
              Daily lecture times and active classroom rooms
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Day</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Lecture Subject / Topic</th>
                  <th className="pb-3">Format</th>
                  <th className="pb-3">Faculty</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {weeklySchedule.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3.5 pr-3 font-black text-slate-900">
                      {row.day}
                    </td>
                    <td className="py-3.5 pr-3 font-semibold text-blue-600">
                      {row.time}
                    </td>
                    <td className="py-3.5 pr-3 font-bold text-slate-800">
                      {row.topic}
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px]">
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3.5 pr-3 font-medium text-slate-600">
                      {row.faculty}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() =>
                          navigate("/lesson-player?courseId=course-8")
                        }
                        className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer"
                      >
                        Enter Room
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
