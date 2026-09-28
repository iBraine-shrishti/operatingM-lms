import React, { useState } from 'react';
import { Users, CheckCircle2, Star, MoreVertical, Edit, Copy, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assests/logo.png';

export const CourseCard = ({ course, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const getStatusBadge = () => {
    switch (course.status) {
      case 'published':
        return (
          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Published</span>
          </span>
        );
      case 'pending':
        return (
          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Pending</span>
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="bg-white/95 backdrop-blur-xs text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Draft</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Banner / Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        {/* Status Badge overlay */}
        <div className="absolute top-3 left-3 z-10">
          {getStatusBadge()}
        </div>

        {/* Operating Media Watermark Badge on Image Header */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center border border-slate-200/80 shadow-2xs">
          <img src={logo} alt="Operating Media" className="h-3.5 w-auto object-contain" />
        </div>
      </div>

      {/* Card Content Header */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              onClick={() => navigate(`/courses/${course.id}`)}
              className="font-semibold text-slate-900 text-base leading-snug cursor-pointer hover:text-slate-700 transition-colors line-clamp-2"
            >
              {course.title}
            </h3>

            {/* Three Dot Options Menu (Admin Only) */}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Course Options"
                >
                  <MoreVertical size={18} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-30 animate-in fade-in">
                    <button
                      onClick={() => { setMenuOpen(false); navigate(`/courses/${course.id}`); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Eye size={14} className="text-slate-400" />
                      <span>View Detail</span>
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); navigate(`/create-course?edit=${course.id}`); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Edit size={14} className="text-slate-400" />
                      <span>Edit Course</span>
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Copy size={14} className="text-slate-400" />
                      <span>Duplicate</span>
                    </button>
                    {onDelete && (
                      <button
                        onClick={() => { setMenuOpen(false); onDelete(course.id); }}
                        className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center space-x-2 border-t border-slate-100"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Author Subtitle */}
          <div className="flex items-center space-x-1.5 mb-3">
            <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
              Operating Media
            </span>
          </div>
        </div>
      </div>

      {/* Card Stats Footer Row */}
      <div className="border-t border-slate-100 bg-slate-50/60 grid grid-cols-3 divide-x divide-slate-100 py-2.5 text-center">
        {/* Stat 1: Students */}
        <div className="px-2">
          <div className="flex items-center justify-center space-x-1 text-slate-800">
            <Users size={14} className="text-slate-500" />
            <span className="text-xs font-semibold tabular-nums">{course.studentsCount}</span>
          </div>
          <div className="text-xs text-slate-400 font-normal">Students</div>
        </div>

        {/* Stat 2: Completed */}
        <div className="px-2">
          <div className="flex items-center justify-center space-x-1 text-slate-800">
            <CheckCircle2 size={14} className="text-slate-500" />
            <span className="text-xs font-semibold tabular-nums">{course.completedCount}</span>
          </div>
          <div className="text-xs text-slate-400 font-normal">Completed</div>
        </div>

        {/* Stat 3: Rating */}
        <div className="px-2">
          <div className="flex items-center justify-center space-x-1 text-slate-800">
            <Star size={14} className="text-amber-500 fill-amber-400" />
            <span className="text-xs font-semibold tabular-nums">{course.rating > 0 ? course.rating.toFixed(1) : 'New'}</span>
          </div>
          <div className="text-xs text-slate-400 font-normal">Rating</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
