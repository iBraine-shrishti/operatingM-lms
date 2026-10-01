import React, { useState } from 'react';
import { Users, MoreVertical, Edit, Copy, Trash2, Eye, Clock, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

export const CourseCard = ({ course, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const getStatusBadge = () => {
    switch (course.status) {
      case 'published':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Published</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200/70 text-[11px] font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Pending</span>
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-[11px] font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Draft</span>
          </span>
        );
    }
  };

  const handleCardClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      <div>
        {/* Banner / Thumbnail Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-4 xl:p-5">
          {/* Category & Status Row */}
          <div className="flex items-center justify-between gap-1.5 mb-1 sm:mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-teal-700 truncate">
              {course.category}
            </span>
            {isAdmin && getStatusBadge()}
          </div>

          {/* Header & Title */}
          <div className="flex items-start justify-between gap-1.5 mb-1 sm:mb-1.5">
            <h3
              className="font-semibold text-slate-900 text-xs sm:text-sm xl:text-[15px] leading-snug group-hover:text-[#3b49df] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]"
              title={course.title}
            >
              {course.title}
            </h3>

            {/* Admin More Actions */}
            {isAdmin && (
              <div className="relative shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Course Options"
                >
                  <MoreVertical size={15} />
                </button>

                {menuOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-1 w-40 bg-white shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in"
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(false); navigate(`/courses/${course.id}`); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Eye size={13} className="text-slate-400" />
                      <span>View Outline</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(false); navigate(`/create-course?edit=${course.id}`); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Edit size={13} className="text-slate-400" />
                      <span>Edit Course</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Copy size={13} className="text-slate-400" />
                      <span>Duplicate</span>
                    </button>
                    {onDelete && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete(course.id); }}
                        className="w-full px-3 py-1.5 text-left text-xs font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-slate-100"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2 sm:mb-3 font-normal">
            {course.description}
          </p>

          {/* Instructor Line */}
          <div className="flex items-center space-x-2 pb-2 mb-2 sm:pb-2.5 sm:mb-3 border-b border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Instructor"
              className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-[11px] sm:text-xs text-slate-600 font-medium truncate">
              Tony Stark • <span className="text-slate-400 font-normal">Lead</span>
            </span>
          </div>

          {/* Metadata Row: Duration | Lessons */}
          <div className="grid grid-cols-2 gap-1.5 text-center text-xs text-slate-600 bg-slate-50/80 p-1.5 sm:p-2 xl:p-2.5 border border-slate-100 mb-2 sm:mb-3.5">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">Duration</span>
              <span className="font-semibold text-slate-800 tabular-nums text-[10px] sm:text-xs truncate">{course.duration}</span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-slate-200/70">
              <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">Lessons</span>
              <span className="font-semibold text-slate-800 tabular-nums text-[10px] sm:text-xs">{course.lessonsCount || 16}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Button */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4 xl:px-5 xl:pb-5 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/courses/${course.id}`);
          }}
          className="w-full py-2 sm:py-2.5 px-2.5 sm:px-3 bg-slate-900 group-hover:bg-[#3b49df] text-white font-medium text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs group/btn cursor-pointer"
        >
          <span>View Course Outline</span>
          <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
