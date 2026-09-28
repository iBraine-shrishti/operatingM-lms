import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { TrendingUp, Users, GraduationCap, Award, Download } from 'lucide-react';
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">Manage Reports</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Beta
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">Deep analytics on student learning progress, completion funnels, and certification rates.</p>
        </div>

        <button onClick={() => showToast('Exporting full analytics report CSV...', 'info', 'Export Started')} className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shrink-0 self-start sm:self-auto">
          <Download size={14}/>
          <span>Export Report Data</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Certificates Issued" value="2,840" change="+24.5%" isPositive={true} icon={GraduationCap} iconColor="text-emerald-600" iconBg="bg-emerald-50"/>
        <StatCard title="Avg Course Completion" value="84.2%" change="+5.1%" isPositive={true} icon={Award} iconColor="text-blue-600" iconBg="bg-blue-50"/>
        <StatCard title="Active Monthly Learners" value="1,240" change="+12.0%" isPositive={true} icon={Users} iconColor="text-amber-600" iconBg="bg-amber-50"/>
        <StatCard title="Quiz Pass Rate" value="91.5%" change="+2.2%" isPositive={true} icon={TrendingUp} iconColor="text-purple-600" iconBg="bg-purple-50"/>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-base">Students by Category</h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false}/>
                <Tooltip />
                <Bar dataKey="students" fill="#2563eb" radius={[8, 8, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-base">Category Enrollment Share</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {categoryData.map((_, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);
};
