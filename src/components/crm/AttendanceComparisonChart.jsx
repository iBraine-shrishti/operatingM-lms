import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
  Layers,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

// Degree programs and duration definitions directly from DEGREEE-TYPE.png
export const DEGREE_PROGRAMS = [
  {
    id: "diploma",
    title: "Diploma in Digital Marketing",
    shortName: "Diploma",
    badgeLabel: "DIPLOMA",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    durationMonths: 2,
    durationText: "2 Months",
    durationWeeks: 8,
    totalLectures: 28,
    attendedCount: 25,
    missedCount: 3,
    // Monthly breakdown (2 Months)
    monthlyData: [
      {
        period: "Month 1",
        label: "Month 1 (Core Foundations)",
        attended: 14,
        missed: 1,
        total: 15,
        rate: 93.3,
      },
      {
        period: "Month 2",
        label: "Month 2 (Live Projects & Ads)",
        attended: 11,
        missed: 2,
        total: 13,
        rate: 84.6,
      },
    ],
    // Weekly breakdown (8 Weeks)
    weeklyData: [
      { period: "Wk 1", label: "Week 1 (Orientation & SEO)", attended: 4, missed: 0, total: 4, rate: 100 },
      { period: "Wk 2", label: "Week 2 (Keyword Research)", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 3", label: "Week 3 (On-Page SEO & Content)", attended: 4, missed: 0, total: 4, rate: 100 },
      { period: "Wk 4", label: "Week 4 (Technical SEO Audits)", attended: 3, missed: 0, total: 3, rate: 100 },
      { period: "Wk 5", label: "Week 5 (WordPress & Elementor)", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 6", label: "Week 6 (Google Ads Search)", attended: 4, missed: 0, total: 4, rate: 100 },
      { period: "Wk 7", label: "Week 7 (PMax & Display Ads)", attended: 2, missed: 1, total: 3, rate: 66.7 },
      { period: "Wk 8", label: "Week 8 (Analytics & Capstone)", attended: 2, missed: 0, total: 2, rate: 100 },
    ],
    // Total aggregate breakdown
    totalData: [
      {
        period: "Total Program",
        label: "2 Months Full Diploma Track",
        attended: 25,
        missed: 3,
        total: 28,
        rate: 89.3,
      },
    ],
  },
  {
    id: "adv_diploma",
    title: "Advanced Diploma in Digital Marketing",
    shortName: "Adv. Diploma",
    badgeLabel: "ADV. DIPLOMA",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    durationMonths: 4,
    durationText: "4 Months",
    durationWeeks: 16,
    totalLectures: 56,
    attendedCount: 50,
    missedCount: 6,
    monthlyData: [
      { period: "Month 1", label: "Month 1 (SEO & Web)", attended: 14, missed: 1, total: 15, rate: 93.3 },
      { period: "Month 2", label: "Month 2 (Performance Ads)", attended: 12, missed: 2, total: 14, rate: 85.7 },
      { period: "Month 3", label: "Month 3 (Social & Creative)", attended: 13, missed: 1, total: 14, rate: 92.8 },
      { period: "Month 4", label: "Month 4 (Analytics & Automation)", attended: 11, missed: 2, total: 13, rate: 84.6 },
    ],
    weeklyData: [
      { period: "Wk 1", label: "Week 1", attended: 4, missed: 0, total: 4, rate: 100 },
      { period: "Wk 2", label: "Week 2", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 3", label: "Week 3", attended: 4, missed: 0, total: 4, rate: 100 },
      { period: "Wk 4", label: "Week 4", attended: 3, missed: 0, total: 3, rate: 100 },
      { period: "Wk 5", label: "Week 5", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 6", label: "Week 6", attended: 4, missed: 0, total: 4, rate: 100 },
      { period: "Wk 7", label: "Week 7", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 8", label: "Week 8", attended: 2, missed: 0, total: 2, rate: 100 },
      { period: "Wk 9", label: "Week 9", attended: 3, missed: 0, total: 3, rate: 100 },
      { period: "Wk 10", label: "Week 10", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 11", label: "Week 11", attended: 4, missed: 0, total: 4, rate: 100 },
      { period: "Wk 12", label: "Week 12", attended: 3, missed: 0, total: 3, rate: 100 },
      { period: "Wk 13", label: "Week 13", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 14", label: "Week 14", attended: 3, missed: 0, total: 3, rate: 100 },
      { period: "Wk 15", label: "Week 15", attended: 3, missed: 1, total: 4, rate: 75 },
      { period: "Wk 16", label: "Week 16", attended: 2, missed: 0, total: 2, rate: 100 },
    ],
    totalData: [
      { period: "Total Program", label: "4 Months Adv. Diploma Track", attended: 50, missed: 6, total: 56, rate: 89.3 },
    ],
  },
  {
    id: "masters",
    title: "Master's Program (Digital Strategy & AI)",
    shortName: "Master's",
    badgeLabel: "MASTER'S",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300 font-black",
    durationMonths: 8,
    durationText: "8 Months",
    durationWeeks: 32,
    totalLectures: 112,
    attendedCount: 101,
    missedCount: 11,
    monthlyData: [
      { period: "Month 1", label: "Month 1 (SEO Foundations)", attended: 14, missed: 1, total: 15, rate: 93.3 },
      { period: "Month 2", label: "Month 2 (WordPress & CMS)", attended: 13, missed: 1, total: 14, rate: 92.8 },
      { period: "Month 3", label: "Month 3 (Performance Marketing)", attended: 13, missed: 2, total: 15, rate: 86.7 },
      { period: "Month 4", label: "Month 4 (Social Media Growth)", attended: 14, missed: 0, total: 14, rate: 100 },
      { period: "Month 5", label: "Month 5 (Creative & Video)", attended: 12, missed: 2, total: 14, rate: 85.7 },
      { period: "Month 6", label: "Month 6 (Google Analytics 4)", attended: 13, missed: 1, total: 14, rate: 92.8 },
      { period: "Month 7", label: "Month 7 (AI & Growth Marketing)", attended: 11, missed: 2, total: 13, rate: 84.6 },
      { period: "Month 8", label: "Month 8 (Capstone & Client Pitch)", attended: 11, missed: 2, total: 13, rate: 84.6 },
    ],
    weeklyData: [
      { period: "M1", label: "Weeks 1-4", attended: 14, missed: 1, total: 15, rate: 93.3 },
      { period: "M2", label: "Weeks 5-8", attended: 13, missed: 1, total: 14, rate: 92.8 },
      { period: "M3", label: "Weeks 9-12", attended: 13, missed: 2, total: 15, rate: 86.7 },
      { period: "M4", label: "Weeks 13-16", attended: 14, missed: 0, total: 14, rate: 100 },
      { period: "M5", label: "Weeks 17-20", attended: 12, missed: 2, total: 14, rate: 85.7 },
      { period: "M6", label: "Weeks 21-24", attended: 13, missed: 1, total: 14, rate: 92.8 },
      { period: "M7", label: "Weeks 25-28", attended: 11, missed: 2, total: 13, rate: 84.6 },
      { period: "M8", label: "Weeks 29-32", attended: 11, missed: 2, total: 13, rate: 84.6 },
    ],
    totalData: [
      { period: "Total Program", label: "8 Months Master's Program Track", attended: 101, missed: 11, total: 112, rate: 90.2 },
    ],
  },
];

// Custom 2-way comparison tooltip
const CustomComparisonTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const attended = data.attended || 0;
    const missed = data.missed || 0;
    const total = data.total || attended + missed;
    const rate = data.rate || Math.round((attended / total) * 100);

    return (
      <div className="bg-slate-900 border border-slate-700 text-white p-3.5 rounded-xl shadow-xl space-y-2 min-w-[200px]">
        <div className="border-b border-slate-700/80 pb-1.5 flex items-center justify-between gap-2">
          <span className="font-extrabold text-xs text-slate-100">
            {data.label || label}
          </span>
          <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
            {rate}% Rate
          </span>
        </div>

        <div className="space-y-1.5 text-xs font-medium">
          {/* Green Attended */}
          <div className="flex items-center justify-between gap-3 text-emerald-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Attended Lectures:</span>
            </span>
            <strong className="font-black text-sm text-white">{attended}</strong>
          </div>

          {/* Red Missed */}
          <div className="flex items-center justify-between gap-3 text-rose-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span>Missed Lectures:</span>
            </span>
            <strong className="font-black text-sm text-white">{missed}</strong>
          </div>

          <div className="border-t border-slate-700/80 pt-1.5 flex items-center justify-between text-slate-300 text-[11px]">
            <span>Total Conducted:</span>
            <strong className="font-bold text-slate-100">{total} Lectures</strong>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const AttendanceComparisonChart = ({ enrolledCourseTitle = "Diploma in Digital Marketing" }) => {
  // Find default selected degree matching student's enrolled course
  const defaultDegreeId = useMemo(() => {
    if (enrolledCourseTitle?.toLowerCase().includes("master")) return "masters";
    if (enrolledCourseTitle?.toLowerCase().includes("advanced") || enrolledCourseTitle?.toLowerCase().includes("adv")) return "adv_diploma";
    return "diploma";
  }, [enrolledCourseTitle]);

  const [selectedDegreeId, setSelectedDegreeId] = useState(defaultDegreeId);
  const [breakdownMode, setBreakdownMode] = useState("monthly"); // "weekly" | "monthly" | "total"

  // Selected degree program object
  const activeProgram = useMemo(() => {
    return DEGREE_PROGRAMS.find((p) => p.id === selectedDegreeId) || DEGREE_PROGRAMS[0];
  }, [selectedDegreeId]);

  // Chart data according to breakdown mode
  const chartData = useMemo(() => {
    if (breakdownMode === "weekly") return activeProgram.weeklyData;
    if (breakdownMode === "total") return activeProgram.totalData;
    return activeProgram.monthlyData;
  }, [activeProgram, breakdownMode]);

  // Totals for the current program
  const totalAttended = activeProgram.attendedCount;
  const totalMissed = activeProgram.missedCount;
  const totalConducted = activeProgram.totalLectures;
  const overallRate = Math.round((totalAttended / totalConducted) * 100);

  return (
    <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-5">
      {/* ============================================================== */}
      {/* 1. TOP HEADER: DEGREE TIER SELECTOR & DURATION FROM IMAGE      */}
      {/* ============================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Attendance 2-Way Comparison Analysis</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Side-by-side comparison of <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Attended Lectures</strong> vs{" "}
            <strong className="text-rose-600 dark:text-rose-400 font-bold">Missed Lectures</strong> synchronized across degree duration.
          </p>
        </div>

        {/* Degree Program Selector based on DEGREEE-TYPE.png */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 hidden sm:inline-block">
            Degree Tier:
          </span>
          {DEGREE_PROGRAMS.map((prog) => {
            const isSelected = prog.id === selectedDegreeId;
            return (
              <button
                key={prog.id}
                type="button"
                onClick={() => setSelectedDegreeId(prog.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-[#2563eb] text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700"
                }`}
              >
                <span>{prog.shortName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {prog.durationText}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. PROGRAM OVERVIEW STRIP & 2-WAY KPI METRIC CARDS             */}
      {/* ============================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Degree Duration */}
        <div className="bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-4 rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <Clock size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Course Duration</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {activeProgram.durationText}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {activeProgram.durationWeeks} Weeks Full Cohort
          </div>
        </div>

        {/* Card 2: Total Conducted */}
        <div className="bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-4 rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <Calendar size={14} className="text-purple-600 dark:text-purple-400 shrink-0" />
            <span>Total Lectures</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {totalConducted} Sessions
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Scheduled in Curriculum
          </div>
        </div>

        {/* Card 3: Attended Lectures */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-3.5 sm:p-4 rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-black uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Attended Lectures</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-950 dark:text-emerald-200">
            {totalAttended} Lectures
          </div>
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
            {overallRate}% Present Rate
          </div>
        </div>

        {/* Card 4: Missed Lectures */}
        <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 p-3.5 sm:p-4 rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-xs text-rose-800 dark:text-rose-300 font-black uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span>Missed Lectures</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-rose-950 dark:text-rose-200">
            {totalMissed} Lectures
          </div>
          <div className="text-xs font-bold text-rose-700 dark:text-rose-400">
            {Math.round((totalMissed / totalConducted) * 100)}% Absent Rate
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CHART CONTROLS: BREAKDOWN TABS & TWO-WAY LEGEND             */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Breakdown Mode Tabs: Total / Monthly / Weekly */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setBreakdownMode("monthly")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              breakdownMode === "monthly"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Monthly Analysis ({activeProgram.durationMonths} Months)
          </button>
          <button
            type="button"
            onClick={() => setBreakdownMode("weekly")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              breakdownMode === "weekly"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Weekly Analysis ({activeProgram.durationWeeks} Weeks)
          </button>
          <button
            type="button"
            onClick={() => setBreakdownMode("total")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              breakdownMode === "total"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Overall Total
          </button>
        </div>

        {/* 2-WAY COLOR LEGEND */}
        <div className="flex items-center space-x-3 text-xs font-black">
          <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 px-2.5 py-1 rounded-lg shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Attended Lectures</span>
          </div>
          <div className="flex items-center space-x-1.5 text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 px-2.5 py-1 rounded-lg shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Missed Lectures</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. RECHARTS DUAL 2-WAY LINE CHART                              */}
      {/* ============================================================== */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 16, right: 24, left: -15, bottom: 6 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800/80" />
            <XAxis
              dataKey="period"
              axisLine={{ stroke: "#64748b", strokeOpacity: 0.3 }}
              tickLine={false}
              tick={{ fontSize: 12, fill: "currentColor", fontWeight: 700 }}
              className="text-slate-600 dark:text-slate-400"
              padding={{ left: 32, right: 32 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "currentColor", fontWeight: 600 }}
              className="text-slate-400 dark:text-slate-500"
              allowDecimals={false}
              domain={[0, "auto"]}
            />
            <Tooltip
              content={<CustomComparisonTooltip />}
              cursor={{ stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            {/* GREEN: Attended Lectures Line */}
            <Line
              type="monotone"
              dataKey="attended"
              name="Attended Lectures"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4.5, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 7, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
            />
            {/* RED: Missed Lectures Line */}
            <Line
              type="monotone"
              dataKey="missed"
              name="Missed Lectures"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4.5, fill: "#ef4444", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 7, fill: "#ef4444", stroke: "#ffffff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ============================================================== */}
      {/* 5. SUMMARY FOOTER & EXAM ELIGIBILITY THRESHOLD BENCHMARK       */}
      {/* ============================================================== */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-medium">
          <Sparkles size={16} className="text-amber-500 shrink-0" />
          <span>
            Certification Examination Eligibility Criteria:{" "}
            <strong className="text-slate-900 dark:text-white font-bold">Minimum 75% Attendance Required</strong>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Cohort Standing:
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 shadow-2xs">
            <CheckCircle2 size={13} className="text-emerald-700 dark:text-emerald-400" />
            <span>Eligible ({overallRate}%)</span>
          </span>
        </div>
      </div>
    </div>
  );
};
