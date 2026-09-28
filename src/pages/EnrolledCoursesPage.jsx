import React from 'react';
import { lmsService } from '../services/lmsService';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const EnrolledCoursesPage = () => {
    const navigate = useNavigate();
    const courses = lmsService.getCourses().filter(c => c.status === 'published');
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">My Enrolled Courses</h1>
        <p className="text-slate-500 text-sm mt-1">Continue learning where you left off across your active masterclasses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => {
            const progress = idx === 0 ? 65 : idx === 1 ? 40 : 85;
            return (<div key={course.id} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover"/>
                  <span className="absolute top-3 left-3 bg-white/90 text-slate-900 text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                    {course.category}
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 text-base leading-snug">{course.title}</h3>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-600 tabular-nums">
                    <span>Course Progress</span>
                    <span className="text-blue-600">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }}/>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">12 of 24 lessons completed</span>
                <button onClick={() => navigate(`/lesson-player?courseId=${course.id}`)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5">
                  <Play size={14} className="fill-white"/>
                  <span>Continue</span>
                </button>
              </div>
            </div>);
        })}
      </div>
    </div>);
};
