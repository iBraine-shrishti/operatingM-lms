import React, { useState } from 'react';
import { Plus, Search, ChevronDown, Grid, List, Sparkles, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { lmsService } from '../services/lmsService';
import { CourseCard } from '../components/course/CourseCard';
import { CourseListItem } from '../components/course/CourseListItem';
import { CourseSkeletonCard } from '../components/common/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { DoodleStar, DoodleHeart, DoodleCloud, DoodleBurst } from '../components/common/CheerfulDoodles';

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

  // Filter Categories matching our-courses.png pill tabs
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
      {/* CHEERFUL "OUR COURSES" HERO BANNER matching our-courses.png   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#fbf7f4] border border-[#f0e6de] rounded-3xl p-6 sm:p-9 relative overflow-hidden shadow-xs">
        {/* Playful Hand-drawn Doodle Stickers matching our-courses.png */}
        <DoodleStar className="w-10 h-10 absolute top-4 left-4 -rotate-12 pointer-events-none opacity-90 hidden sm:block" />
        <DoodleHeart className="w-9 h-9 absolute top-3 left-1/2 -translate-x-1/2 -rotate-6 pointer-events-none opacity-90" />
        <DoodleCloud className="w-14 h-10 absolute top-4 right-10 rotate-6 pointer-events-none opacity-90 hidden sm:block" />
        <DoodleBurst className="w-12 h-12 absolute -bottom-1 -right-1 rotate-12 pointer-events-none opacity-90 hidden sm:block" />

        <div className="relative z-10 max-w-2xl space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight font-serif">
            Our Courses
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
            You can start learning these masterclasses and get certified within days.
          </p>
        </div>

        {/* Cheerful Category Filter Pill Buttons matching our-courses.png */}
        <div className="relative z-10 flex items-center space-x-2 pt-5 overflow-x-auto custom-scrollbar pb-1">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0d7a5f] text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Tabs, Search, Sort, View Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        {/* Admin Tabs */}
        {isAdmin ? (
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto custom-scrollbar">
            <button
              onClick={() => { setActiveTab('published'); setShowEmptyState(false); }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap tabular-nums ${
                activeTab === 'published' && !showEmptyState
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => { setActiveTab('pending'); setShowEmptyState(false); }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap tabular-nums ${
                activeTab === 'pending' && !showEmptyState
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => { setActiveTab('draft'); setShowEmptyState(false); }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap tabular-nums ${
                activeTab === 'draft' && !showEmptyState
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl tabular-nums">
              Available Courses ({filteredCourses.length})
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-teal-700 hover:underline font-medium"
              >
                Clear Category Filter
              </button>
            )}
          </div>
        )}

        {/* Right side controls: Search, Sort, Grid/List view toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-teal-600 transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-medium text-slate-700 cursor-pointer focus:outline-hidden focus:border-teal-600"
            >
              <option value="recent">Recent</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rating</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Grid / List toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>

          {isAdmin && (
            <button
              onClick={() => navigate('/create-course')}
              className="bg-[#0d7a5f] hover:bg-teal-800 text-white font-medium text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <Plus size={15} />
              <span>Create Course</span>
            </button>
          )}

          {/* Interactive State Demos (Admin only) */}
          {isAdmin && (
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
              <button
                onClick={handleSimulateLoading}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                title="Test skeleton loading state"
              >
                Skeleton
              </button>
              <button
                onClick={() => setShowEmptyState(!showEmptyState)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseSkeletonCard />
          <CourseSkeletonCard />
          <CourseSkeletonCard />
        </div>
      ) : showEmptyState || filteredCourses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No courses found</h3>
          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-normal">
            There are no courses matching your current filter. Clear your filters or explore other categories!
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setShowEmptyState(false); }}
            className="mt-5 bg-[#0d7a5f] hover:bg-teal-800 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-colors inline-flex items-center space-x-2"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <CourseListItem key={course.id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCoursesPage;
