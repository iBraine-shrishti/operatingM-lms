import React, { useState } from 'react';
import { Users, CheckCircle2, Star, MoreVertical, Edit, Copy, Trash2, Eye, BookOpen, Clock, Layers } from 'lucide-react';
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
          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Published</span>
          </span>
        );
      case 'pending':
        return (
          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Pending</span>
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="bg-white/95 backdrop-blur-xs text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Draft</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col justify-between group">
      <div>
        {/* Banner / Thumbnail Inset matching our-courses.png */}
        <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100 mb-3.5">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Tag pill on top-left */}
          <div className="absolute top-3 left-3 z-10">
            {isAdmin ? getStatusBadge() : (
              <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                {course.category}
              </span>
            )}
          </div>

          {/* Operating Media Watermark Badge on top-right */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg flex items-center border border-slate-200/80 shadow-2xs">
            <img src={logo} alt="Operating Media" className="h-3 w-auto object-contain" />
          </div>

          {/* Cheerful Circular Rating / Badge matching our-courses.png $60 green circle */}
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-teal-700 text-white flex flex-col items-center justify-center font-semibold text-[10px] shadow-md border-2 border-white leading-tight">
            <span>★</span>
            <span className="tabular-nums">{course.rating > 0 ? course.rating.toFixed(1) : 'NEW'}</span>
          </div>
        </div>

        {/* Course Title and Admin Options */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            onClick={() => navigate(`/courses/${course.id}`)}
            className="font-semibold text-slate-900 text-base leading-snug cursor-pointer hover:text-teal-700 transition-colors line-clamp-2"
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

        {/* 2-line Description matching our-courses.png */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3 font-normal">
          {course.description}
        </p>
      </div>

      {/* Bottom Section: 3-column metadata bar & Action Button */}
      <div className="space-y-3">
        {/* 3-Column Metadata Bar (Age/Level | Time | Capacity/Lessons) matching our-courses.png */}
        <div className="border-t border-slate-100 pt-2.5 pb-1 grid grid-cols-3 text-center divide-x divide-slate-100 text-xs">
          <div className="px-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Level</span>
            <span className="text-xs font-medium text-slate-800">All Levels</span>
          </div>
          <div className="px-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Time</span>
            <span className="text-xs font-medium text-slate-800 tabular-nums">{course.duration}</span>
          </div>
          <div className="px-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Capacity</span>
            <span className="text-xs font-medium text-slate-800 tabular-nums">{course.lessonsCount || 16} Lessons</span>
          </div>
        </div>

        {/* Cheerful Action Button matching our-courses.png Purchase/Start Course */}
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-teal-700 bg-white hover:bg-teal-700 text-slate-700 hover:text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all shadow-2xs group-hover:border-teal-700 group-hover:text-teal-800 group-hover:bg-teal-50"
        >
          <BookOpen size={14} />
          <span>View Course Outline</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
