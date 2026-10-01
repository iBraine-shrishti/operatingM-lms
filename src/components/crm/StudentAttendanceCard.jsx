import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CheckCircle2, XCircle, TrendingUp, Calendar, Clock, AlertCircle, FileSpreadsheet, Sparkles, ChevronRight, User } from 'lucide-react';

export const StudentAttendanceCard = ({ attendance }) => {
  const [activeTab, setActiveTab] = useState('chart'); // 'chart' | 'logs'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'PRESENT' | 'ABSENT'

  if (!attendance) return null;

  const {
    totalLectures = 28,
    presentCount = 25,
    absentCount = 3,
    attendancePercentage = 89.3,
    standing = { label: 'Excellent Standing', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    monthlyTrend = [],
    logs = []
  } = attendance;

  const filteredLogs = logs.filter(l => {
    if (statusFilter === 'PRESENT') return l.status === 'PRESENT';
    if (statusFilter === 'ABSENT') return l.status === 'ABSENT';
    return true;
  });

  // Calculate circular gauge parameters
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendancePercentage / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Live Academic Record
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${standing.bg} ${standing.text} ${standing.border}`}>
              {standing.label}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-1">
            Attendance & Classroom Standing
          </h2>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('chart')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'chart'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp size={13} className={activeTab === 'chart' ? 'text-teal-600' : 'text-slate-400'} />
            <span>Trend Graph</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'logs'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar size={13} className={activeTab === 'logs' ? 'text-teal-600' : 'text-slate-400'} />
            <span>Class Logs ({logs.length})</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      {activeTab === 'chart' ? (
        <div className="pt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Speedometer Circular Rate & Metric Chips (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center sm:flex-row lg:flex-col justify-center gap-5 p-4 bg-slate-50/70 border border-slate-100 rounded-2xl">
            {/* Circular Gauge */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  fill="transparent"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  fill="transparent"
                  stroke="url(#attGradient)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="attGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#3b49df" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="text-2xl font-black text-slate-900 leading-none tabular-nums tracking-tight">
                  {attendancePercentage}%
                </span>
                <span className="text-[10px] uppercase font-bold text-teal-700 tracking-wider mt-1">
                  Verified
                </span>
              </div>
            </div>

            {/* Micro Metrics Chips */}
            <div className="w-full space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white border border-slate-200/80 p-2 rounded-xl shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Conducted</span>
                  <span className="text-base font-black text-slate-800 tabular-nums">{totalLectures}</span>
                </div>
                <div className="bg-white border border-emerald-200/80 p-2 rounded-xl shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">Attended</span>
                  <span className="text-base font-black text-emerald-700 tabular-nums">{presentCount}</span>
                </div>
                <div className="bg-white border border-rose-200/80 p-2 rounded-xl shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">Absences</span>
                  <span className="text-base font-black text-rose-600 tabular-nums">{absentCount}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 pt-1 justify-center sm:justify-start lg:justify-center">
                <Sparkles size={12} className="text-amber-500 shrink-0" />
                <span>Eligibility threshold for diploma exam: <strong className="text-slate-800">75%</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Attendance Progression Graph (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp size={13} className="text-teal-600" />
                Monthly Attendance Trend (%)
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Operating Media LMS CRM Sync
              </span>
            </div>

            {/* Recharts Area Chart */}
            <div className="w-full h-44 sm:h-48 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="attendanceArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                  />
                  <YAxis
                    domain={[60, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    unit="%"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-xl border border-slate-700 space-y-1">
                            <p className="font-bold text-amber-400">{data.month} Standing</p>
                            <p className="font-semibold text-emerald-400">Rate: {data.rate}%</p>
                            <p className="text-slate-300 text-[10px]">
                              Attended: {data.present} of {data.total} lectures
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#0d9488"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#attendanceArea)"
                    activeDot={{ r: 5, fill: '#0d9488', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-600 inline-block" />
                Attendance Percentage Rate
              </span>
              <span className="text-slate-600 font-semibold">Consistent &gt;85% throughout term</span>
            </div>
          </div>
        </div>
      ) : (
        /* Class Logs View */
        <div className="pt-4 space-y-3">
          {/* Status filter bar */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-600">Filter Status:</span>
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({logs.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('PRESENT')}
                className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                  statusFilter === 'PRESENT'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Present ({logs.filter(l => l.status === 'PRESENT').length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('ABSENT')}
                className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                  statusFilter === 'ABSENT'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Absent ({logs.filter(l => l.status === 'ABSENT').length})
              </button>
            </div>
          </div>

          {/* Logs List */}
          <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
            {filteredLogs.map((log, idx) => (
              <div key={log.lecture_id || idx} className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/60 px-2 rounded-lg transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-800 truncate">{log.topic}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">#{log.lecture_id}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                    <span>{log.date}</span>
                    <span>•</span>
                    <span>Trainer: <strong className="text-slate-700 font-medium">{log.trainer_name}</strong></span>
                  </div>
                </div>

                <div className="shrink-0">
                  {log.status === 'PRESENT' ? (
                    <span className="inline-flex items-center space-x-1 text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      <span>Present</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[10.5px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80 px-2.5 py-0.5 rounded-full">
                      <XCircle size={12} className="text-rose-600" />
                      <span>Absent</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
