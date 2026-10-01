import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lmsService } from '../services/lmsService';
import { AdminCourseStudentsMatrix } from '../components/admin/AdminCourseStudentsMatrix';

export const ManageStudentsPage = () => {
  const navigate = useNavigate();
  const courses = lmsService.getCourses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 border border-slate-200 rounded">
            STUDENT DIRECTORY & ADMISSION RECORDS
          </span>
          <span className="inline-flex items-center space-x-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operating Media CRM Sync Active</span>
          </span>
        </div>
        <h1 className="text-2xl md:text-[28px] font-black text-slate-900 tracking-tight">
          Manage Students & Course Rosters
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Classify students by course specialization, track real-time attendance, monitor tuition fee installments, and issue verified credentials.
        </p>
      </div>

      {/* Course-Classified Students Matrix & Management Actions */}
      <AdminCourseStudentsMatrix
        courses={courses}
        onNavigateCourse={(id) => navigate(`/courses/${id}`)}
      />
    </div>
  );
};

export default ManageStudentsPage;
