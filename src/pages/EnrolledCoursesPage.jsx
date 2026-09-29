import React from 'react';
import { lmsService } from '../services/lmsService';
import { Play, BookOpen, Clock, Award, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EnrolledCoursesPage = () => {
  const navigate = useNavigate();
  const courses = lmsService.getCourses().filter(c => c.status === 'published');

  return (
    <div className="space-y-6">
      {/* Clean, Expansive Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 text-xs font-medium">
              <Award size={13} className="text-teal-700" />
              <span>Active Specializations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              My Enrolled Courses
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
              Continue learning where you left off across your active masterclasses, complete hands-on activities, and earn official credentials.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => navigate('/manage-courses')}
              className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Enrolled Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => {
          const progress = idx === 0 ? 65 : idx === 1 ? 40 : 85;
          const completedCount = idx === 0 ? 14 : idx === 1 ? 8 : 18;
          const totalCount = course.lessonsCount || 22;

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Image inset */}
                <div className="relative aspect-16/10 w-full rounded-lg overflow-hidden bg-slate-100 mb-3.5">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
                    {course.category}
                  </span>

                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md border border-white/10 shadow-2xs flex items-center space-x-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </span>
                </div>

                <h3
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="font-semibold text-slate-900 text-base leading-snug cursor-pointer hover:text-teal-700 transition-colors line-clamp-1 mb-2"
                >
                  {course.title}
                </h3>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-xs font-medium text-slate-700 tabular-nums">
                    <span>{completedCount} of {totalCount} lessons completed</span>
                    <span className="text-teal-700 font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-700 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="border-t border-slate-100 pt-3 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer"
                >
                  <BookOpen size={13} />
                  <span>Outline</span>
                </button>
                <button
                  onClick={() => navigate(`/lesson-player?courseId=${course.id}`)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
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
  );
};

export default EnrolledCoursesPage;
