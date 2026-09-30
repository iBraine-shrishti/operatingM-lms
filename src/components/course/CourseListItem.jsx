import { Users, CheckCircle2, Star, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export const CourseListItem = ({ course, onDelete }) => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    return (<div className="bg-white border border-slate-200/80 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-xs transition-shadow">
      <div className="flex items-center space-x-4">
        <img src={course.thumbnail} alt={course.title} className="w-20 h-16 object-cover shrink-0"/>
        <div>
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${course.status === 'published'
            ? 'bg-emerald-100 text-emerald-700'
            : course.status === 'pending'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-100 text-slate-700'}`}>
              {course.status.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-medium">{course.category}</span>
          </div>
          <h4 onClick={() => navigate(`/courses/${course.id}`)} className="font-bold text-slate-900 text-base hover:text-blue-600 cursor-pointer transition-colors">
            {course.title}
          </h4>
          <span className="text-[11px] text-slate-400">By OPERATING MEDIA • Updated {course.updatedAt}</span>
        </div>
      </div>

      <div className="flex items-center space-x-6 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
        <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center space-x-1" title="Students">
            <Users size={14} className="text-slate-400"/>
            <span>{course.studentsCount}</span>
          </div>
          <div className="flex items-center space-x-1" title="Completed">
            <CheckCircle2 size={14} className="text-slate-400"/>
            <span>{course.completedCount}</span>
          </div>
          <div className="flex items-center space-x-1" title="Rating">
            <Star size={14} className="text-amber-500 fill-amber-400"/>
            <span>{course.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => navigate(`/courses/${course.id}`)} className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View Course">
            <Eye size={17}/>
          </button>
          {isAdmin && (<>
              <button onClick={() => navigate(`/create-course?edit=${course.id}`)} className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit Course">
                <Edit size={17}/>
              </button>
              {onDelete && (<button onClick={() => onDelete(course.id)} className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete Course">
                  <Trash2 size={17}/>
                </button>)}
            </>)}
        </div>
      </div>
    </div>);
};
