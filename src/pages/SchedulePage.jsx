import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Sparkles,
  BookOpen,
  Video,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";
import {
  fetchLiveBatchSchedules,
  generate7DayTimetable,
  formatLectureDate,
} from "../utils/scheduleUtils";

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
    case "saturday":
      return "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200/90 dark:border-indigo-800/60";
    case "sunday":
      return "bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200/90 dark:border-teal-800/60";
    default:
      return "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  }
};

export const SchedulePage = () => {
  const navigate = useNavigate();
  const { crmProfile, crmBatch, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("timetable"); // 1st default view: 7-Day Timetable
  const [scheduleData, setScheduleData] = useState({
    loading: true,
    schedules: [],
    activeModule: null,
    branch: "Andheri Center",
    faculty: "Nilkamal Mukharjee",
    facultyRole: "Lead Faculty - Andheri Center",
    timing: "10:00 AM - 12:00 PM",
  });

  // Extract student details dynamically
  const rawBranch = crmProfile?.branch || crmBatch?.branch || "Andheri Center";
  const isAndheri = rawBranch.toLowerCase().includes("andheri");
  const branchDisplayName = isAndheri ? "Andheri Center" : "Borivali Center";
  const facultyLead = isAndheri ? "Nilkamal Mukharjee" : "Rahul Shende";
  const facultyLeadRole = isAndheri
    ? "Lead Faculty - Andheri Center"
    : "Lead Faculty - Borivali Center";
  const studentTiming =
    crmProfile?.batchTiming ||
    crmProfile?.timing ||
    crmBatch?.timing ||
    "10:00 AM - 12:00 PM";

  // Fetch live batch schedule from CRM API on mount and whenever student batch/branch changes
  useEffect(() => {
    let isMounted = true;

    async function loadSchedule() {
      setScheduleData((prev) => ({ ...prev, loading: true }));
      const res = await fetchLiveBatchSchedules(rawBranch, studentTiming);
      if (isMounted) {
        setScheduleData({
          loading: false,
          schedules: res.schedules || [],
          activeModule: res.activeModule,
          branch: branchDisplayName,
          faculty: facultyLead,
          facultyRole: facultyLeadRole,
          timing: studentTiming,
        });
      }
    }

    loadSchedule();

    return () => {
      isMounted = false;
    };
  }, [rawBranch, studentTiming, facultyLead, branchDisplayName, facultyLeadRole]);

  // Always starts dynamically from Today (e.g. 23 Oct 2026; tomorrow after 12:00 AM it will automatically start from 24 Oct)
  const today = new Date();
  const windowStartDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0, 0, 0, 0
  );

  // Generate 7-day lecture rows starting from today
  const timetableRows = generate7DayTimetable(
    scheduleData.schedules,
    windowStartDate,
    studentTiming,
    facultyLead
  );

  const activeTopicTitle =
    scheduleData.activeModule?.topic || "Google Ads (PPC)";
  const activeTopicDates =
    scheduleData.activeModule?.date_range || "26 Oct 2026 - 04 Nov 2026";

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER           */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.schedule}
        isAdmin={isAdmin}
        metrics={[
          {
            value: `${scheduleData.schedules.length} Modules`,
            label: "Scheduled",
            dotColor: "bg-blue-600",
          },
          {
            value: "Live Hybrid",
            label: "In Session",
            dotColor: "bg-emerald-500",
          },
          {
            value: "Mon - Fri",
            label: studentTiming,
            dotColor: "bg-purple-500",
          },
          {
            value: isAndheri ? "Andheri" : "Borivali",
            label: "Campus",
            dotColor: "bg-rose-500",
          },
        ]}
      />

      {/* 1. Enrolled Batch & Schedule Card (Dynamic from CRM) */}
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
        </div>

        {/* 2x2 Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              <Clock size={12} />
              <span>TIMING:</span>
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">
              {studentTiming}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Daily Scheduled Lectures
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
              {branchDisplayName}
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
              {facultyLead}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {facultyLeadRole}
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
                {activeTopicTitle}
              </h4>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/60 px-3 py-1.5 rounded-lg shadow-2xs">
              {activeTopicDates}
            </span>
            <button
              type="button"
              disabled
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all shadow-2xs flex items-center space-x-1.5 cursor-not-allowed select-none"
              title="Lecture access is currently blocked"
            >
              <Lock size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
              <span>Join Lecture</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Schedule Details: 7-Day Timetable & Curriculum Sessions */}
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
                    ? "7-Day Class Timetable"
                    : "Curriculum Sessions Roadmap"}
                </h3>
                {activeTab === "timetable" ? (
                  <span className="hidden sm:inline-flex text-[11px] font-extrabold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2 py-0.5 rounded-md">
                    7 Days Active Batch
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                    {scheduleData.schedules.length} Modules in Roadmap
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeTab === "timetable"
                  ? "7 consecutive days starting from today with dynamically assigned topics"
                  : "Planned module roadmap and chronological class timelines from CRM"}
              </p>
            </div>
          </div>

          {/* Toggle: 7-Day Timetable | Curriculum Sessions */}
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
              <span>7-Day Timetable</span>
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

        {/* Tab Content: Upcoming Curriculum Sessions OR 7-Day Timetable */}
        {activeTab === "upcoming" ? (
          <div className="pt-1">
            <div className="space-y-3 max-h-[440px] overflow-y-auto no-scrollbar pr-1">
              {scheduleData.schedules.map((session, idx) => {
              const isSessionActive =
                session.topic === scheduleData.activeModule?.topic;
              const displayId = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={session.id || idx}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-750 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-blue-50/20 dark:hover:bg-slate-800/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black text-xs flex items-center justify-center shrink-0">
                      {displayId}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {session.topic}
                        </h4>
                        {isSessionActive && (
                          <span className="text-[9.5px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.2 rounded uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        <span>
                          Faculty:{" "}
                          <strong className="text-slate-700 dark:text-slate-300">
                            {facultyLead}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center shrink-0 self-end md:self-auto">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-2xs">
                      {session.date_range}
                    </span>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        ) : (
          /* Table Container */
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
                      Faculty
                    </th>
                    <th className="py-3.5 px-4 font-black uppercase tracking-wider text-[11px] text-slate-100 dark:text-slate-200 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                {/* Body with distinct alternating colors & styled chips */}
                <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {timetableRows.map((row, rIdx) => {
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
                            type="button"
                            disabled
                            className="inline-flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition-all cursor-not-allowed select-none"
                            title="Lecture access is currently blocked"
                          >
                            <Lock size={12} className="shrink-0" />
                            <span>Enter Room</span>
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
