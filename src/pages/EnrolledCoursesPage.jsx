import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { Play, BookOpen, Clock, Award, ArrowRight, CheckCircle2, Star, Sparkles, Filter, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EnrolledCoursesPage = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState('all');
  const allCourses = lmsService.getCourses().filter(c => c.status === 'published');

  const filteredCourses = filterCategory === 'all' 
    ? allCourses 
    : allCourses.filter(c => c.category?.toLowerCase().includes(filterCategory.toLowerCase()));

  // In-Progress Learning Tracks (matching LATEST UI specification)
  const inProgressTracks = [
    {
      id: 'course-4',
      title: 'Social Media Marketing',
      category: 'SOCIAL MEDIA',
      categoryColor: 'text-[#2563eb]',
      categoryBg: 'bg-blue-50 border-blue-200',
      duration: '20h 30m',
      completedLessons: 12,
      totalLessons: 22,
      progress: 65,
      accentColor: 'from-[#2563eb] to-[#3b82f6]',
      buttonClass: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=80',
      currentTopic: 'Campaign Budget Optimization & Meta Pixel Auditing',
      nextUp: 'Audience Retargeting Frameworks'
    },
    {
      id: 'course-8',
      title: 'Counselling Video, Quiz and Brochure',
      category: 'STUDENT ORIENTATION & GUIDANCE',
      categoryColor: 'text-emerald-700',
      categoryBg: 'bg-emerald-50 border-emerald-200',
      duration: '4h 15m',
      completedLessons: 12,
      totalLessons: 16,
      progress: 40,
      accentColor: 'from-emerald-600 to-teal-500',
      buttonClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80',
      currentTopic: 'Operating Media Industry Placement & LMS Orientation',
      nextUp: 'Capstone Portfolio Submission Requirements'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Clean, Expansive Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/80 border border-blue-100/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/95 text-blue-700 border border-blue-200/80 text-xs font-bold shadow-2xs">
              <Award size={13} className="text-blue-600" />
              <span>Active Specializations & Tracks</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Enrolled Courses & Learning Tracks
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Continue learning where you left off across your active masterclasses, review course outlines, complete hands-on activities, and earn official credentials.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => navigate('/manage-courses')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-white bg-white/80 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1.5"
            >
              <BookOpen size={14} />
              <span>Browse Catalog</span>
            </button>
            <button
              onClick={() => navigate('/schedule')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
            >
              <span>View Batch Schedule</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. IN-PROGRESS LEARNING TRACKS (SHIFTED FROM DASHBOARD) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] animate-pulse" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              In-Progress Learning Tracks
            </h2>
            <span className="text-xs font-bold text-slate-400">
              ({inProgressTracks.length} Active Tracks)
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Directly resume video playback and exercises
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inProgressTracks.map((track) => (
            <div
              key={track.id}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <img
                      src={track.thumbnail}
                      alt={track.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider block ${track.categoryColor}`}>
                        {track.category}
                      </span>
                      <h3
                        onClick={() => navigate(`/lesson-player?courseId=${track.id}`)}
                        className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {track.duration} • {track.completedLessons} of {track.totalLessons} lessons
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs font-black text-slate-900 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                    {track.progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${track.accentColor} rounded-full transition-all duration-500`}
                      style={{ width: `${track.progress}%` }}
                    />
                  </div>
                </div>

                {/* Topic info */}
                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs space-y-0.5">
                  <div className="text-[10.5px] text-slate-400 font-bold uppercase">Current Focus:</div>
                  <div className="text-slate-800 font-semibold truncate">{track.currentTopic}</div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Next: {track.nextUp}</span>
                </span>

                <button
                  type="button"
                  onClick={() => navigate(`/lesson-player?courseId=${track.id}`)}
                  className={`${track.buttonClass} text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95`}
                >
                  <Play size={11} className="fill-current" />
                  <span>Continue</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ENROLLED SPECIALIZATIONS CATALOG */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              All Enrolled Courses ({filteredCourses.length})
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Full curriculum outlines, study materials, and lesson lectures
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {[
              { label: 'All Courses', val: 'all' },
              { label: 'Marketing', val: 'marketing' },
              { label: 'SEO & Content', val: 'seo' },
              { label: 'Development', val: 'web' },
            ].map((f) => (
              <button
                key={f.val}
                type="button"
                onClick={() => setFilterCategory(f.val)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === f.val
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Enrolled Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => {
            const progress = idx === 0 ? 65 : idx === 1 ? 40 : idx === 2 ? 85 : 50;
            const completedCount = idx === 0 ? 14 : idx === 1 ? 8 : idx === 2 ? 18 : 10;
            const totalCount = course.lessonsCount || 22;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Image inset */}
                  <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-slate-100 mb-3.5">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-slate-200/80 shadow-2xs">
                      {course.category}
                    </span>

                    <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-lg border border-white/10 shadow-2xs flex items-center space-x-1">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span>{course.rating ? course.rating.toFixed(1) : '4.9'}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="font-bold text-slate-900 text-base leading-snug cursor-pointer hover:text-blue-600 transition-colors line-clamp-1 mb-2"
                  >
                    {course.title}
                  </h3>

                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                      <span>{completedCount} of {totalCount} lessons completed</span>
                      <span className="text-[#2563eb] font-black">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2563eb] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="border-t border-slate-100 pt-3 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Outline</span>
                  </button>
                  <button
                    onClick={() => navigate(`/lesson-player?courseId=${course.id}`)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Play size={13} className="fill-white" />
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;
