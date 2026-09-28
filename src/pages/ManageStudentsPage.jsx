import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { Plus, Search, Mail } from 'lucide-react';
import { useToast } from '../context/ToastContext';
export const ManageStudentsPage = () => {
    const { showToast } = useToast();
    const [students, setStudents] = useState(() => lmsService.getStudents());
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const filtered = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    const handleAddStudent = () => {
        const name = prompt('Enter Student Name:');
        if (!name)
            return;
        const email = prompt('Enter Student Email:') || `${name.toLowerCase().replace(' ', '.')}@example.com`;
        lmsService.addStudent({
            name,
            email,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            enrolledCoursesCount: 1,
            completedCoursesCount: 0,
            overallProgress: 0,
            status: 'active'
        });
        setStudents(lmsService.getStudents());
        showToast(`Student "${name}" added successfully!`, 'success');
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">Manage Students</h1>
          <p className="text-slate-500 text-sm mt-1">Track student enrollments, course progress, completion status, and credentials.</p>
        </div>
        <button onClick={handleAddStudent} className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-2 shrink-0">
          <Plus size={16}/>
          <span>Add New Student</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students by name or email..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-hidden"/>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <span className="text-xs font-medium text-slate-500 tabular-nums">{filtered.length} Students</span>
        </div>
      </div>

      {/* Student Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Enrolled Tracks</th>
                <th className="pb-3">Overall Progress</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(std => (<tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center space-x-3">
                      <img src={std.avatar} alt={std.name} className="w-10 h-10 rounded-full object-cover shrink-0"/>
                      <div>
                        <span className="font-semibold text-slate-900 text-sm block">{std.name}</span>
                        <span className="text-slate-400 text-[11px]">{std.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className="font-semibold text-slate-800 tabular-nums">{std.enrolledCoursesCount} Courses</span>
                    <span className="text-[10px] text-slate-400 block">{std.completedCoursesCount} Completed</span>
                  </td>
                  <td className="py-3.5 w-48">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium tabular-nums">
                        <span className="text-slate-700">Progress</span>
                        <span className="text-blue-600">{std.overallProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${std.overallProgress}%` }}/>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-600 font-medium">{std.joinedDate}</td>
                  <td className="py-3.5">
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${std.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {std.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button onClick={() => showToast(`Drafting email to ${std.name} (${std.email})`, 'info', 'Email Contact')} className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center space-x-1" title="Send Email">
                      <Mail size={16}/>
                    </button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
};
