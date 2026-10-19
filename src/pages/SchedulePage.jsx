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
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

const getDayBadgeClass = (day = "") => {
  switch (day.toLowerCase()) {
    case "monday":
      return "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200/90 dark:border-blue-800/60";
    case "tuesday":
      return "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60";
    case "wednesday":
      return "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200/90 dark:border-purple-800/60";
    case "thursday":
      return "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/90 dark:border-amber-800/60";
    case "friday":
      return "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200/90 dark:border-rose-800/60";
    default:
      return "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  }
};

export const SchedulePage = () => {
  const navigate = useNavigate();
  const { crmProfile, crmBatch, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("timetable"); // 1st default view: Weekly Timetable

  const upcomingSessions = [
    {
      id: "01",
      title: "Data Science & Analytics Foundations",
      dates: "22 Apr 2026 - 24 Apr 2026",
      timing: "9:00 AM - 10:00 AM",
      faculty: "Rahul Shende (Lead Faculty)",
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
      faculty: "Rahul Shende",
      status: "Upcoming",
      isLive: false,
      room: "Main Conference",
      batch: "Masters Weekday Morning",
    },
  ];

  const weeklySchedule = [
    {
      date: "20 Apr 2026",
      day: "Monday",
      time: "9:00 AM - 10:00 AM",
      topic: "Technical SEO Audits & Core Web Vitals",
      faculty: "Rahul Shende",
      type: "Lecture + Lab",
    },
    {
      date: "21 Apr 2026",
      day: "Tuesday",
      time: "9:00 AM - 10:00 AM",
      topic: "Schema Markup & Rich Snippets Hands-on",
      faculty: "Rahul Shende",
      type: "Live Workshop",
    },
    {
      date: "22 Apr 2026",
      day: "Wednesday",
      time: "9:00 AM - 10:00 AM",
      topic: "Robots.txt, XML Sitemaps & Canonicalization",
      faculty: "Rahul Shende",
      type: "Theory & Case Study",
    },
    {
      date: "23 Apr 2026",
      day: "Thursday",
      time: "9:00 AM - 10:00 AM",
      topic: "Google Search Console Advanced Diagnostics",
      faculty: "Rahul Shende",
      type: "Lab Session",
    },
    {
      date: "24 Apr 2026",
      day: "Friday",
      time: "9:00 AM - 10:00 AM",
      topic: "Weekly Q&A, Doubt Solving & Project Review",
      faculty: "Rahul Shende & Nishi",
      type: "Interactive Review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER           */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.schedule}
        isAdmin={isAdmin}
        metrics={[
          { value: "4 Modules", label: "Scheduled", dotColor: "bg-blue-600" },
          { value: "Live Hybrid", label: "In Session", dotColor: "bg-emerald-500" },
          { value: "Mon - Fri", label: "9:00 AM - 10:00 AM", dotColor: "bg-purple-500" },
          { value: "Borivali", label: "Campus", dotColor: "bg-rose-500" },
        ]}
      />

      {/* 1. Enrolled Batch & Schedule Card (LATEST UI) */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800/60">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Enrolled Batch & Schedule
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official batch registration details from Operating Media CRM
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/60 text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center space-x-2 self-start sm:self-auto">
            <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-purple-200/80 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 text-[10px] font-black uppercase">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Clock size={12} />
              <span>TIMING:</span>
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">
              9:00 AM - 10:00 AM
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Daily 1-Hour Lecture
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Calendar size={12} />
              <span>DAYS:</span>
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">
              Monday to Friday
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              5 Days / Week Schedule
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <MapPin size={12} />
              <span>BRANCH / CENTER:</span>
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">
              {crmProfile.branch || "Borivali Center"}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Classroom + Live Zoom Hybrid
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <User size={12} />
              <span>FACULTY LEAD:</span>
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm truncate">
              {(crmProfile.branch || "").toLowerCase().includes("andheri") ? "Nilkamal Mukharjee" : "Rahul Shende"}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {(crmProfile.branch || "").toLowerCase().includes("andheri") ? "Lead Faculty - Andheri Center" : "Lead Faculty - Borivali Center"}
            </div>
          </div>
        </div>

        {/* CURRENT TOPIC IN SESSION */}
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 block">
                CURRENT TOPIC IN SESSION
              </span>
              <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base mt-0.5">
                Data Science & Advanced Python for Marketers
              </h4>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/60 px-3 py-1.5 rounded-lg shadow-2xs">
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

      {/* 2. Schedule Details: Weekly Timetable & Curriculum Sessions */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-5">
        {/* Section Header with View Switcher Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800/60 shrink-0">
              {activeTab === "timetable" ? (
                <Calendar size={18} />
              ) : (
                <BookOpen size={18} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {activeTab === "timetable"
                    ? "Weekly Class Timetable"
                    : "Upcoming Curriculum Sessions"}
                </h3>
                {activeTab === "timetable" ? (
                  <span className="hidden sm:inline-flex text-[11px] font-extrabold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2 py-0.5 rounded-md">
                    Mon – Fri Active Batch
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                    {upcomingSessions.length} Modules Scheduled
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeTab === "timetable"
                  ? "Daily lecture times, topics, and interactive lab sessions"
                  : "Planned module roadmap and chronological class timelines"}
              </p>
            </div>
          </div>

          {/* Toggle: Weekly Timetable | Curriculum Sessions */}
          <div className="flex items-center space-x-1.5 shrink-0 bg-slate-100/90 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-750 self-start sm:self-auto shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("timetable")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === "timetable"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              <Calendar size={13} />
              <span>Weekly Timetable</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("upcoming")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              <BookOpen size={13} />
              <span>Curriculum Sessions</span>
            </button>
          </div>
        </div>

        {/* Tab Content: Upcoming Curriculum Sessions OR Weekly Timetable */}
        {activeTab === "upcoming" ? (
          <div className="space-y-3 pt-1">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-750 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-blue-50/20 dark:hover:bg-slate-800/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-xs flex items-center justify-center shrink-0">
                    {session.id}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {session.title}
                      </h4>
                      {session.isLive && (
                        <span className="text-[9.5px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.2 rounded uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      <span>
                        Faculty:{" "}
                        <strong className="text-slate-700 dark:text-slate-300">
                          {session.faculty}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Location:{" "}
                        <strong className="text-slate-700 dark:text-slate-300">
                          {session.room}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-2xs">
                    {session.dates}
                  </span>
                  <button
                    onClick={() => navigate("/enrolled-courses")}
                    className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Syllabus</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-300/80 dark:border-slate-800 shadow-xs">
            <table className="w-full text-center text-xs border-collapse">
              {/* Attribute Background Header */}
              <thead className="bg-[#1e293b] dark:bg-slate-950 text-white">
                <tr>
                  <th className="py-3.5 px-4 font-black uppercase tracking-wider text-[11px] text-slate-100 dark:text-slate-200 text-center">
                    Lecture Date
                  </th>
                  <th className="py-3.5 px-4 font-black uppercase tracking-wider text-[11px] text-slate-100 dark:text-slate-200 text-center">
                    Time
                  </th>
                  <th className="py-3.5 px-4 font-black uppercase tracking-wider text-[11px] text-slate-100 dark:text-slate-200 text-center">
                    Lecture Subject / Topic
                  </th>
                  <th className="py-3.5 px-4 font-black uppercase tracking-wider text-[11px] text-slate-100 dark:text-slate-200 text-center">
                    Format
                  </th>
                  <th className="py-3.5 px-4 font-black uppercase tracking-wider text-[11px] text-slate-100 dark:text-slate-200 text-center">
                    Faculty
                  </th>
                  <th className="py-3.5 px-4 font-black uppercase tracking-wider text-[11px] text-slate-100 dark:text-slate-200 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              {/* Body with distinct alternating colors & styled chips */}
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {weeklySchedule.map((row, rIdx) => {
                  const isEven = rIdx % 2 === 0;
                  return (
                    <tr
                      key={rIdx}
                      className={`transition-colors ${
                        isEven
                          ? "bg-white dark:bg-[#0b1329] hover:bg-blue-50/40 dark:hover:bg-slate-800/50"
                          : "bg-slate-50/80 dark:bg-slate-900/60 hover:bg-blue-50/40 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      {/* Lecture Date with Calendar Icon & Category Color */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-tight px-3 py-1.5 rounded-lg border shadow-2xs ${getDayBadgeClass(
                            row.day
                          )}`}
                        >
                          <Calendar size={13} className="shrink-0" />
                          <span>{row.date}</span>
                        </span>
                      </td>

                      {/* Time with Clock Icon */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center justify-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 px-2.5 py-1 rounded-md text-[11.5px] shadow-2xs">
                          <Clock
                            size={12}
                            className="text-blue-600 dark:text-blue-400"
                          />
                          <span>{row.time}</span>
                        </span>
                      </td>

                      {/* Topic - Bold & High Contrast, Centered */}
                      <td className="py-4 px-4 min-w-[220px] text-center">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug block text-center">
                          {row.topic}
                        </span>
                      </td>

                      {/* Format Badge with indicator dot, Centered */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center justify-center gap-1.5 bg-blue-50/90 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 px-2.5 py-1 rounded-md font-bold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>{row.type}</span>
                        </span>
                      </td>

                      {/* Faculty with User Avatar Icon, Centered */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center justify-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs">
                          <User
                            size={13}
                            className="text-slate-400 dark:text-slate-500"
                          />
                          <span>{row.faculty}</span>
                        </span>
                      </td>

                      {/* Action Button, Centered */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() =>
                            navigate("/lesson-player?courseId=course-8")
                          }
                          className="inline-flex items-center justify-center gap-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                          <span>Enter Room</span>
                          <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
