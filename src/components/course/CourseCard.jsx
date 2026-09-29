import React, { useState } from 'react';
import { Users, Star, MoreVertical, Edit, Copy, Trash2, Eye, Clock, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Banner / Thumbnail Container */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top Left: Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-medium border border-slate-200/80 shadow-2xs">
              {course.category}
            </span>
          </div>

          {/* Top Right: Status (Admin) or Brand Logo */}
          <div className="absolute top-3 right-3 z-10 flex items-center space-x-2">
            {isAdmin ? (
              getStatusBadge()
            ) : (
              <div className="bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
                <img src={logo} alt="Operating Media" className="h-3 w-auto object-contain" />
              </div>
            )}
          </div>

          {/* Bottom Overlay: Rating & Level */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
            <div className="flex items-center space-x-1.5 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-white">{course.rating > 0 ? course.rating.toFixed(1) : '5.0'}</span>
              <span className="text-slate-300 text-[10px]">({course.studentsCount || 48} reviews)</span>
            </div>

            <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider text-white border border-white/20">
              Certified
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              onClick={() => navigate(`/courses/${course.id}`)}
              className="font-semibold text-slate-900 text-base leading-snug cursor-pointer hover:text-teal-700 transition-colors line-clamp-1"
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
                  <MoreVertical size={16} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in">
                    <button
                      onClick={() => { setMenuOpen(false); navigate(`/courses/${course.id}`); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Eye size={13} className="text-slate-400" />
                      <span>View Outline</span>
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); navigate(`/create-course?edit=${course.id}`); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Edit size={13} className="text-slate-400" />
                      <span>Edit Course</span>
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Copy size={13} className="text-slate-400" />
                      <span>Duplicate</span>
                    </button>
                    {onDelete && (
                      <button
                        onClick={() => { setMenuOpen(false); onDelete(course.id); }}
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
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 font-normal">
            {course.description}
          </p>

          {/* Instructor Line */}
          <div className="flex items-center space-x-2.5 pb-4 mb-4 border-b border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Instructor"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-xs text-slate-600 font-medium">
              Tony Stark • <span className="text-slate-400 font-normal">Operating Media Lead</span>
            </span>
          </div>

          {/* Metadata Row: Duration | Lessons | Enrolled */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600 bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 mb-4">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Duration</span>
              <span className="font-medium text-slate-800 tabular-nums">{course.duration}</span>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Lessons</span>
              <span className="font-medium text-slate-800 tabular-nums">{course.lessonsCount || 16}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Level</span>
              <span className="font-medium text-slate-800">All Levels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Button */}
      <div className="px-5 pb-5 pt-0">
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all shadow-xs group/btn cursor-pointer"
        >
          <span>View Course Outline</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
