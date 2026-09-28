import React, { useState } from 'react';
import { Plus, Search, ChevronDown, Grid, List, Sparkles, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { lmsService } from '../services/lmsService';
import { CourseCard } from '../components/course/CourseCard';
import { CourseListItem } from '../components/course/CourseListItem';
import { CourseSkeletonCard } from '../components/common/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
export const ManageCoursesPage = () => {
    const navigate = useNavigate();
    const { isAdmin, isStudent } = useAuth();
    const [courses, setCourses] = useState(() => lmsService.getCourses());
    const [activeTab, setActiveTab] = useState('published');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent');
    const [viewMode, setViewMode] = useState('grid');
    const [isLoading, setIsLoading] = useState(false);
    const [showEmptyState, setShowEmptyState] = useState(false);
    const publishedCount = courses.filter(c => c.status === 'published').length;
    const pendingCount = courses.filter(c => c.status === 'pending').length;
    const draftCount = courses.filter(c => c.status === 'draft').length;
    const currentTab = isStudent ? 'published' : activeTab;
    const filteredCourses = courses.filter(course => {
        const matchesTab = showEmptyState ? false : course.status === currentTab;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course?')) {
            lmsService.deleteCourse(id);
            setCourses(lmsService.getCourses());
        }
    };
    const handleSimulateLoading = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1200);
    };
    return (<div className="space-y-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">
            {isStudent ? 'Course Catalog' : 'Manage Courses'}
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-normal">
            {isStudent
            ? 'Explore comprehensive certification tracks and masterclasses at Operating Media.'
            : 'Create, organize and manage your courses. Inspire learners, build skills, grow together.'}
          </p>
        </div>

        {isAdmin ? (<button onClick={() => navigate('/create-course')} className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 shrink-0 self-start sm:self-auto">
            <span>Create Course</span>
            <Plus size={16}/>
          </button>) : (<button onClick={() => navigate('/enrolled-courses')} className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 shrink-0 self-start sm:self-auto">
            <GraduationCap size={16}/>
            <span>My Enrolled Courses</span>
          </button>)}
      </div>

      {/* Controls Bar: Tabs, Search, Sort, View Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        {/* Filter Tabs */}
        {isAdmin ? (<div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto custom-scrollbar">
            <button onClick={() => { setActiveTab('published'); setShowEmptyState(false); }} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap tabular-nums ${activeTab === 'published' && !showEmptyState
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'}`}>
              Published ({publishedCount})
            </button>
            <button onClick={() => { setActiveTab('pending'); setShowEmptyState(false); }} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap tabular-nums ${activeTab === 'pending' && !showEmptyState
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'}`}>
              Pending ({pendingCount})
            </button>
            <button onClick={() => { setActiveTab('draft'); setShowEmptyState(false); }} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap tabular-nums ${activeTab === 'draft' && !showEmptyState
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'}`}>
              Drafts ({draftCount})
            </button>
          </div>) : (<div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl tabular-nums">
              Available Courses ({publishedCount})
            </span>
          </div>)}

        {/* Right side controls: Search, Sort, Grid/List view toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search courses..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 transition-colors"/>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-700 cursor-pointer focus:outline-hidden focus:border-blue-500">
              <option value="recent">Recent</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rating</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
          </div>

          {/* Grid / List toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`} title="Grid View">
              <Grid size={16}/>
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-400 hover:text-slate-600'}`} title="List View">
              <List size={16}/>
            </button>
          </div>

          {/* Interactive State Demos */}
          <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
            <button onClick={handleSimulateLoading} className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors" title="Test skeleton loading state">
              Skeleton
            </button>
            <button onClick={() => setShowEmptyState(!showEmptyState)} className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${showEmptyState ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:text-slate-800 bg-slate-100'}`} title="Toggle empty state view">
              Empty
            </button>
          </div>
        </div>
      </div>

      {/* Main Course Content View */}
      {isLoading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseSkeletonCard />
          <CourseSkeletonCard />
          <CourseSkeletonCard />
        </div>) : showEmptyState || filteredCourses.length === 0 ? (<div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32}/>
          </div>
          <h3 className="text-lg font-bold text-slate-900">No courses found</h3>
          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
            There are no courses matching your current filter. Create your first course to get started!
          </p>
          <button onClick={() => navigate('/create-course')} className="mt-5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center space-x-2">
            <span>Create New Course</span>
            <Plus size={14}/>
          </button>
        </div>) : viewMode === 'grid' ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (<CourseCard key={course.id} course={course} onDelete={handleDelete}/>))}
        </div>) : (<div className="space-y-4">
          {filteredCourses.map((course) => (<CourseListItem key={course.id} course={course} onDelete={handleDelete}/>))}
        </div>)}
    </div>);
};
