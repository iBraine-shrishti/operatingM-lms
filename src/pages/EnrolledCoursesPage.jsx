import React from 'react';
import { lmsService } from '../services/lmsService';
import { Play, BookOpen, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DoodleStar, DoodleHeart, DoodleCloud, DoodleBurst } from '../components/common/CheerfulDoodles';

export const EnrolledCoursesPage = () => {
  const navigate = useNavigate();
  const courses = lmsService.getCourses().filter(c => c.status === 'published');

  return (
    <div className="space-y-6">
      {/* Cheerful Hero Banner matching our-courses.png */}
      <div className="bg-[#fbf7f4] border border-[#f0e6de] rounded-3xl p-6 sm:p-9 relative overflow-hidden shadow-xs">
        <DoodleStar className="w-10 h-10 absolute top-4 left-4 -rotate-12 pointer-events-none opacity-90 hidden sm:block" />
        <DoodleHeart className="w-9 h-9 absolute top-3 left-1/2 -translate-x-1/2 -rotate-6 pointer-events-none opacity-90" />
        <DoodleCloud className="w-14 h-10 absolute top-4 right-10 rotate-6 pointer-events-none opacity-90 hidden sm:block" />
        <DoodleBurst className="w-12 h-12 absolute -bottom-1 -right-1 rotate-12 pointer-events-none opacity-90 hidden sm:block" />

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 text-xs font-medium">
            <Award size={13} />
            <span>Active Learning Tracks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight font-serif">
            My Enrolled Courses
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
            Continue learning where you left off across your active masterclasses and earn your official certificates.
          </p>
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
              className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image inset */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100 mb-3.5">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                    {course.category}
                  </span>

                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-teal-700 text-white flex flex-col items-center justify-center font-semibold text-[10px] shadow-md border-2 border-white leading-tight">
                    <span>★</span>
                    <span className="tabular-nums">{course.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="font-semibold text-slate-900 text-base leading-snug cursor-pointer hover:text-teal-700 transition-colors line-clamp-2 mb-2"
                >
                  {course.title}
                </h3>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex justify-between text-xs font-medium text-slate-700 tabular-nums">
                    <span>Progress: {completedCount} of {totalCount} lessons</span>
                    <span className="text-[#0d7a5f] font-semibold">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0d7a5f] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="border-t border-slate-100 pt-3 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-teal-700 bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 text-xs font-medium flex items-center justify-center space-x-1.5 transition-all shadow-2xs"
                >
                  <BookOpen size={14} />
                  <span>Outline</span>
                </button>
                <button
                  onClick={() => navigate(`/lesson-player?courseId=${course.id}`)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#0d7a5f] hover:bg-teal-800 text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-all shadow-xs"
                >
                  <Play size={14} className="fill-white" />
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
