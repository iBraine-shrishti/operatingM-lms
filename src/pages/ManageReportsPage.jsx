import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { TrendingUp, Users, GraduationCap, Award, Download, BarChart3 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
const categoryData = [
    { name: 'Digital Marketing', students: 480 },
    { name: 'Web Development', students: 390 },
    { name: 'Paid Media', students: 310 },
    { name: 'Analytics', students: 250 },
    { name: 'Design', students: 180 },
];
const COLORS = ['#2563eb', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];
export const ManageReportsPage = () => {
    const { showToast } = useToast();
    return (<div className="space-y-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER - ACTIVITY PAGE STYLE (ADMIN CLEAN THEME)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-8 2xl:p-8.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-2 relative z-10 min-w-0">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <BarChart3 size={17} />
            <span>Executive Analytics & LMS Insights</span>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/85 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Reports</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Executive LMS Reports & Funnels
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base 2xl:text-lg max-w-2xl leading-relaxed font-normal">
            Deep analytics on student learning progress, completion funnels, assessment pass ratios, and certification issuance rates.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium">
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">2,840</span>
              <span className="font-semibold">Certificates Issued</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">84.2%</span>
              <span className="font-semibold">Avg Completion</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">1,240</span>
              <span className="font-semibold">Monthly Active</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-full px-3 py-1 text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <span className="font-black text-slate-900 dark:text-white">91.5%</span>
              <span className="font-semibold">Exam Pass Rate</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0 relative z-10">
          <button
            onClick={() => showToast('Exporting full analytics report CSV...', 'info', 'Export Started')}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Download size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>Export Report Data</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Certificates Issued" value="2,840" change="+24.5%" isPositive={true} icon={GraduationCap} variant="neutral" iconColor="text-emerald-600 dark:text-emerald-400" iconBg="bg-emerald-50 dark:bg-emerald-950/40"/>
        <StatCard title="Avg Course Completion" value="84.2%" change="+5.1%" isPositive={true} icon={Award} variant="neutral" iconColor="text-blue-600 dark:text-blue-400" iconBg="bg-blue-50 dark:bg-blue-950/40"/>
        <StatCard title="Active Monthly Learners" value="1,240" change="+12.0%" isPositive={true} icon={Users} variant="neutral" iconColor="text-amber-600 dark:text-amber-400" iconBg="bg-amber-50 dark:bg-amber-950/40"/>
        <StatCard title="Quiz Pass Rate" value="91.5%" change="+2.2%" isPositive={true} icon={TrendingUp} variant="neutral" iconColor="text-purple-600 dark:text-purple-400" iconBg="bg-purple-50 dark:bg-purple-950/40"/>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white text-base">Students by Category</h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3}/>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false}/>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }} />
                <Bar dataKey="students" fill="#3b49df" radius={[8, 8, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white text-base">Category Enrollment Share</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {categoryData.map((_, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);
};
