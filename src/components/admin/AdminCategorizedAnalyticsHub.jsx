import React, { useState } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  TrendingUp, BarChart3, PieChart as PieIcon, Building2, 
  AlertCircle, CheckCircle2, DollarSign, Users, Award, 
  ArrowRight, ArrowUpRight, BookOpen, Clock, ShieldCheck, 
  Layers, Sparkles, Filter, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 1. Categorized Comparison: Attendance vs Syllabus Progress & Fees
const courseAnalyticsComparison = [
  { course: 'SEO', fullName: 'Search Engine Optimization', attendance: 92, progress: 88, students: 394, feesCleared: 15.8, feesDue: 2.2, color: '#3b49df' },
  { course: 'WordPress', fullName: 'Website Dev With WordPress', attendance: 86, progress: 78, students: 656, feesCleared: 18.4, feesDue: 3.6, color: '#0d9488' },
  { course: 'Google Ads', fullName: 'Google Ads (PPC)', attendance: 89, progress: 84, students: 525, feesCleared: 21.2, feesDue: 4.8, color: '#f59e0b' },
  { course: 'Social Media', fullName: 'Social Media Marketing', attendance: 75, progress: 48, students: 262, feesCleared: 12.0, feesDue: 6.0, color: '#ec4899' },
  { course: 'GA4 Analytics', fullName: 'Google Analytics 4', attendance: 100, progress: 100, students: 197, feesCleared: 8.5, feesDue: 0.5, color: '#8b5cf6' },
  { course: 'Design', fullName: 'Creative Designing', attendance: 91, progress: 80, students: 180, feesCleared: 8.0, feesDue: 1.2, color: '#f43f5e' },
  { course: 'Adv Topics', fullName: 'Advanced Digital Marketing', attendance: 88, progress: 64, students: 210, feesCleared: 14.5, feesDue: 2.5, color: '#0284c7' },
  { course: 'Orientation', fullName: 'Admissions Counseling & Quiz', attendance: 100, progress: 100, students: 856, feesCleared: 4.0, feesDue: 0.0, color: '#10b981' },
];

// 2. Student Enrollment Distribution Share by Category (Donut Chart)
const enrollmentShareData = [
  { name: 'Masters in DM', value: 38, count: 1246, color: '#3b49df' },
  { name: 'Web Dev (WordPress)', value: 20, count: 656, color: '#0d9488' },
  { name: 'Google Ads PPC', value: 16, count: 525, color: '#f59e0b' },
  { name: 'SEO Specialization', value: 12, count: 394, color: '#6366f1' },
  { name: 'Social Media', value: 8, count: 262, color: '#ec4899' },
  { name: 'Analytics & Design', value: 6, count: 197, color: '#8b5cf6' },
];

// 3. Center Comparison Matrix Data
const campusCenterData = [
  { 
    center: 'Andheri Center (Main Flagship)', 
    students: 1640, 
    percentage: 50, 
    attendance: 89.2, 
    revenue: '₹48.2L', 
    recovery: 86, 
    batches: 6, 
    faculty: 'Harsh Pareek (Director)' 
  },
  { 
    center: 'Borivali Center', 
    students: 980, 
    percentage: 30, 
    attendance: 84.5, 
    revenue: '₹26.8L', 
    recovery: 81, 
    batches: 4, 
    faculty: 'Darshan Deorukhkar' 
  },
  { 
    center: 'Online / Hybrid Live', 
    students: 660, 
    percentage: 20, 
    attendance: 81.0, 
    revenue: '₹12.4L', 
    recovery: 76, 
    batches: 3, 
    faculty: 'Live Zoom Cohorts' 
  }
];

// 4. Student Academic Standing Stratification (Risk & Honors Funnel)
const academicRiskFunnel = [
  { 
    tier: 'Distinction / High Honors', 
    count: 1480, 
    pct: 45.1, 
    criteria: 'Attendance ≥ 85% • Progress ≥ 75%', 
    color: 'emerald', 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-700', 
    border: 'border-emerald-200', 
    bar: 'bg-emerald-500' 
  },
  { 
    tier: 'Good Standing (In-Progress)', 
    count: 1240, 
    pct: 37.8, 
    criteria: 'Attendance 75-84% • Steady Pace', 
    color: 'blue', 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200', 
    bar: 'bg-blue-500' 
  },
  { 
    tier: 'Requires Attention / Fees Due', 
    count: 390, 
    pct: 11.9, 
    criteria: 'Attendance 60-74% or Due Installment', 
    color: 'amber', 
    bg: 'bg-amber-50', 
    text: 'text-amber-700', 
    border: 'border-amber-200', 
    bar: 'bg-amber-500' 
  },
  { 
    tier: 'Critical Intervention / Inactive', 
    count: 170, 
    pct: 5.2, 
    criteria: 'Attendance < 60% or Overdue Balance', 
    color: 'rose', 
    bg: 'bg-rose-50', 
    text: 'text-rose-700', 
    border: 'border-rose-200', 
    bar: 'bg-rose-500' 
  },
];

export const AdminCategorizedAnalyticsHub = ({ courses = [] }) => {
  const navigate = useNavigate();
  const [activeGraphTab, setActiveGraphTab] = useState('performance'); // 'performance' | 'financial' | 'share'

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* CATEGORIZED COMPARISON ANALYTICS CARD                         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all space-y-5">
        {/* Section Header with Multi-Perspective Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-[#3b49df] bg-blue-50 px-2 py-0.5 border border-blue-200/80">
                EXECUTIVE STUDENT ANALYTICS
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Categorized Comparative Benchmarking across Specializations
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-1">
              Multi-Dimensional Student Cohort Comparisons
            </h2>
          </div>

          {/* Perspective View Switcher */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveGraphTab('performance')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeGraphTab === 'performance'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <BarChart3 size={13} />
                <span>Attendance vs. Progress</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGraphTab('financial')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeGraphTab === 'financial'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <DollarSign size={13} />
                <span>Tuition Realization (₹)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGraphTab('share')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeGraphTab === 'share'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <PieIcon size={13} />
                <span>Enrollment Share</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate('/manage-students')}
              className="inline-flex items-center space-x-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>Manage Student Rosters</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* GRAPH PERSPECTIVE 1: ATTENDANCE VS PROGRESS BENCHMARK         */}
        {/* ------------------------------------------------------------- */}
        {activeGraphTab === 'performance' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 font-medium">
                Comparing <strong className="text-slate-800">Attendance Rate %</strong> against <strong className="text-slate-800">Course Syllabus Progress %</strong> across all 8 specializations.
              </span>
              <div className="flex items-center space-x-4 shrink-0 font-bold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-[#3b49df]" />
                  <span className="text-slate-700">Attendance Rate %</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-[#10b981]" />
                  <span className="text-slate-700">Course Progress %</span>
                </div>
              </div>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseAnalyticsComparison} margin={{ top: 15, right: 15, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="course" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} 
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    unit="%" 
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [`${val}%`, name === 'attendance' ? 'Attendance Rate' : 'Syllabus Progress']}
                    labelFormatter={(label) => {
                      const item = courseAnalyticsComparison.find(c => c.course === label);
                      return `${item?.fullName || label} (${item?.students} Students)`;
                    }}
                  />
                  <Bar dataKey="attendance" fill="#3b49df" radius={[6, 6, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="progress" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Micro Benchmark Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                    Highest Attendance Benchmark
                  </span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                    Google Analytics (100%) & SEO (92%)
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 block">
                    Largest Active Cohort
                  </span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                    Web Dev WordPress (656 Students • 86% Att)
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  👥
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">
                    Intervention Recommended
                  </span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                    Social Media Marketing (75% Att / 48% Prog)
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                  ⚠️
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* GRAPH PERSPECTIVE 2: TUITION REALIZATION & DUES BY COURSE     */}
        {/* ------------------------------------------------------------- */}
        {activeGraphTab === 'financial' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 font-medium">
                Tuition fee realization breakdown (in ₹ Lakhs) showing <strong className="text-emerald-700">Amount Cleared</strong> vs. <strong className="text-amber-700">Outstanding Balance Due</strong> per track.
              </span>
              <div className="flex items-center space-x-4 shrink-0 font-bold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span className="text-slate-700">Cleared Fees (₹ Lakhs)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500" />
                  <span className="text-slate-700">Balance Due (₹ Lakhs)</span>
                </div>
              </div>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseAnalyticsComparison} margin={{ top: 15, right: 15, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="course" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    unit="L" 
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name) => [`₹${val} Lakhs`, name === 'feesCleared' ? 'Tuition Cleared' : 'Balance Due']}
                    labelFormatter={(label) => {
                      const item = courseAnalyticsComparison.find(c => c.course === label);
                      return `${item?.fullName || label}`;
                    }}
                  />
                  <Bar dataKey="feesCleared" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} maxBarSize={32} />
                  <Bar dataKey="feesDue" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Financial Summary Highlight */}
            <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  ₹
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Total Tuition Recovery: ₹87.4 Lakhs Realized (82.1%)</h4>
                  <p className="text-xs text-slate-500">₹19.1 Lakhs pending across installment schedules (OMC-0266, OMC-0267, etc.)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/manage-students?fee=due')}
                className="text-xs font-bold text-[#3b49df] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>Filter Students with Outstanding Balance</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* GRAPH PERSPECTIVE 3: ENROLLMENT SHARE (DONUT CHART)           */}
        {/* ------------------------------------------------------------- */}
        {activeGraphTab === 'share' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-in fade-in duration-300">
            {/* Donut Chart Visualization (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-64 h-64 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={enrollmentShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {enrollmentShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '12px' }}
                      formatter={(val, name, props) => [`${val}% (${props.payload.count} Students)`, props.payload.name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Donut Readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    3,280
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-1">
                    Total Students
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Legends & Quantitative Breakdown (7 cols) */}
            <div className="lg:col-span-7 space-y-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Specialization Cohort Distribution
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {enrollmentShareData.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-800 block truncate">{item.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium tabular-nums">{item.count} Enrolled</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-md tabular-nums">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2-COLUMN SECTION: CAMPUS COMPARISON & STUDENT RISK FUNNEL     */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Campus Center Comparative Intelligence (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Building2 size={16} className="text-[#3b49df]" />
                <h3 className="font-bold text-slate-900 text-base">Campus Center Performance Comparison</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">
                3 Operating Centers
              </span>
            </div>

            <div className="space-y-3.5 mt-4">
              {campusCenterData.map((campus, idx) => (
                <div key={idx} className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3 hover:border-slate-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{campus.center}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Center Lead: <strong className="text-slate-600 font-semibold">{campus.faculty}</strong> • {campus.batches} Active Batches
                      </span>
                    </div>
                    <span className="text-xs font-black text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg self-start sm:self-auto tabular-nums">
                      {campus.students} Students ({campus.percentage}%)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-600 mb-1">
                        <span>Attendance Rate</span>
                        <span className="text-emerald-700 font-bold tabular-nums">{campus.attendance}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${campus.attendance}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-600 mb-1">
                        <span>Fee Collection</span>
                        <span className="text-[#3b49df] font-bold tabular-nums">{campus.revenue} ({campus.recovery}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3b49df] rounded-full" style={{ width: `${campus.recovery}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Student Academic Standing & Risk Stratification (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Academic Standing Cohorts</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">
                Risk & Honors Funnel
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {academicRiskFunnel.map((tier, idx) => (
                <div key={idx} className={`p-3.5 rounded-2xl border ${tier.border} ${tier.bg} space-y-1.5`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-black ${tier.text}`}>{tier.tier}</span>
                    <span className="font-extrabold text-slate-900 tabular-nums">
                      {tier.count} Students <span className="text-slate-400 font-normal">({tier.pct}%)</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {tier.criteria}
                  </span>
                  <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden">
                    <div className={`h-full ${tier.bar} rounded-full`} style={{ width: `${tier.pct * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/manage-students')}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs active:scale-95"
          >
            <span>Open Classified Student Roster</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COURSE SPECIALIZATIONS SUMMARY GRID & DIRECT ROSTER JUMP      */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Course Specializations Overview</h3>
            <p className="text-xs text-slate-500 font-normal">Direct jump to classified student rosters in Manage Students</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/manage-courses')}
            className="text-xs font-semibold text-[#3b49df] hover:underline cursor-pointer flex items-center space-x-1"
          >
            <span>Course Catalog</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {courses.map(course => (
            <div 
              key={course.id}
              className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block truncate">
                    {course.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#3b49df] transition-colors">
                    {course.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-800">{course.studentsCount} Students</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/manage-students?course=${course.id}`)}
                className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>View Students</span>
                <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
