import React, { useState } from 'react';
import { Plus, Search, ChevronDown, Grid, List, Sparkles, GraduationCap, BookOpen, Clock, Award, CheckCircle2 } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const publishedCount = courses.filter(c => c.status === 'published').length;
  const pendingCount = courses.filter(c => c.status === 'pending').length;
  const draftCount = courses.filter(c => c.status === 'draft').length;

  const currentTab = isStudent ? 'published' : activeTab;

  // Filter Categories
  const CATEGORIES = [
    { id: 'all', label: 'All Courses' },
    { id: 'social', label: 'Social Media' },
    { id: 'seo', label: 'SEO Mastery' },
    { id: 'design', label: 'Design & Media' },
    { id: 'analytics', label: 'Google Analytics' },
    { id: 'ads', label: 'Google Ads' },
    { id: 'wordpress', label: 'WordPress Dev' },
    { id: 'advanced', label: 'Advanced Topics' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesTab = showEmptyState ? false : course.status === currentTab;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      course.title.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesTab && matchesSearch && matchesCategory;
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

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* PROFESSIONAL CATALOG HERO BANNER                              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-medium">
              <Award size={13} className="text-teal-700" />
              <span>Operating Media Masterclass Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore Our Courses
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl">
              Comprehensive hands-on digital marketing, SEO, analytics, and development programs with live industry projects and verified credentials.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center space-x-4 sm:space-x-6 shrink-0 bg-slate-50 border border-slate-100 rounded-xl p-3.5 sm:p-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Specializations</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">08 Tracks</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Practical Labs</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">140+ Labs</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Credentials</span>
              <span className="text-lg font-bold text-teal-700 font-semibold">Certified</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Tabs, Search, Sort, View Toggle */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        {/* Admin Tabs / Student Count */}
        {isAdmin ? (
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => { setActiveTab('published'); setShowEmptyState(false); }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === 'published' && !showEmptyState
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => { setActiveTab('pending'); setShowEmptyState(false); }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === 'pending' && !showEmptyState
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => { setActiveTab('draft'); setShowEmptyState(false); }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === 'draft' && !showEmptyState
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg tabular-nums">
              Available Courses ({filteredCourses.length})
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-teal-700 hover:underline font-medium cursor-pointer"
              >
                Clear Category Filter
              </button>
            )}
          </div>
        )}

        {/* Right Controls: Search, Sort, Grid/List toggle, Create Course */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-teal-600 transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-medium text-slate-700 cursor-pointer focus:outline-hidden focus:border-teal-600"
            >
              <option value="recent">Recent</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rating</option>
            </select>
            <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Grid / List toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <List size={15} />
            </button>
          </div>

          {isAdmin && (
            <button
              onClick={() => navigate('/create-course')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Course</span>
            </button>
          )}

          {/* Developer / Admin Test Tools */}
          {isAdmin && (
            <div className="flex items-center space-x-1.5 border-l border-slate-200 pl-2.5">
              <button
                onClick={handleSimulateLoading}
                className="text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
                title="Test skeleton loading"
              >
                Skeleton
              </button>
              <button
                onClick={() => setShowEmptyState(!showEmptyState)}
                className={`text-[11px] font-medium px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  showEmptyState ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:text-slate-800 bg-slate-100'
                }`}
                title="Toggle empty state view"
              >
                Empty
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Course Content View */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
          <CourseSkeletonCard />
          <CourseSkeletonCard />
          <CourseSkeletonCard />
          <CourseSkeletonCard />
        </div>
      ) : showEmptyState || filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <Sparkles size={28} />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No courses found</h3>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-normal">
            There are no courses matching your current filter. Clear your filters or explore other categories.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setShowEmptyState(false); }}
            className="mt-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2 cursor-pointer"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCourses.map((course) => (
            <CourseListItem key={course.id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCoursesPage;
