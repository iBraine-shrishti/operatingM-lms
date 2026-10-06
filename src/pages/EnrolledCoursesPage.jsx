import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, ChevronDown, CheckCircle2, Award, Play, 
  ArrowRight, Clock, Star, Users, Check 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { lmsService } from '../services/lmsService';

// Enrollment progress data for student courses
const ENROLLMENT_DATA = {
  'course-1': { progress: 65, completedLessons: 14, totalLessons: 22, status: 'in-progress' },
  'course-2': { progress: 100, completedLessons: 8, totalLessons: 8, status: 'completed' },
  'course-3': { progress: 40, completedLessons: 8, totalLessons: 20, status: 'in-progress' },
  'course-4': { progress: 85, completedLessons: 17, totalLessons: 20, status: 'in-progress' },
  'course-5': { progress: 50, completedLessons: 10, totalLessons: 20, status: 'in-progress' },
  'course-6': { progress: 70, completedLessons: 14, totalLessons: 20, status: 'in-progress' },
  'course-7': { progress: 100, completedLessons: 22, totalLessons: 22, status: 'completed' },
  'course-8': { progress: 35, completedLessons: 7, totalLessons: 20, status: 'in-progress' },
};

// Filter Categories matching Browse Courses
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

export const EnrolledCoursesPage = () => {
  const navigate = useNavigate();
  const [courses] = useState(() => lmsService.getCourses().filter(c => c.status === 'published'));
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'in-progress', 'completed'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Metrics counts
  const totalCount = courses.length;
  const inProgressCount = courses.filter(c => (ENROLLMENT_DATA[c.id]?.status || 'in-progress') === 'in-progress').length;
  const completedCount = courses.filter(c => ENROLLMENT_DATA[c.id]?.status === 'completed').length;

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        const enrollInfo = ENROLLMENT_DATA[course.id] || { status: 'in-progress' };
        
        // Tab Filter
        if (activeTab === 'in-progress' && enrollInfo.status !== 'in-progress') return false;
        if (activeTab === 'completed' && enrollInfo.status !== 'completed') return false;

        // Search Filter
        const matchesSearch =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Category Filter
        const matchesCategory =
          selectedCategory === 'all' ||
          course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          course.title.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const infoA = ENROLLMENT_DATA[a.id] || { progress: 50 };
        const infoB = ENROLLMENT_DATA[b.id] || { progress: 50 };

        if (sortBy === 'progress') {
          return infoB.progress - infoA.progress;
        }
        if (sortBy === 'popular') {
          return (b.studentsCount || 0) - (a.studentsCount || 0);
        }
        return 0; // Default recent / array order
      });
  }, [courses, activeTab, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* PROFESSIONAL CATALOG HERO BANNER (In-Progress Accent Style)   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/80 border-l-4 border-l-[#5068f2] p-6 sm:p-7 shadow-2xs relative overflow-hidden transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-blue-50 border border-blue-200/80 text-[#3b49df] text-xs font-bold uppercase tracking-wider">
              <BookOpen size={13} className="text-[#3b49df]" />
              <span>Operating Media Masterclass Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              My Enrolled <span className="text-[#3b49df]">Courses</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl">
              Comprehensive hands-on digital marketing, SEO, analytics, and development programs with live industry projects and verified credentials.
            </p>
          </div>

          {/* Quick Metrics Chips: Colorful In-Progress Style Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto">
            {/* Chip 1: Blue Scheme */}
            <div className="bg-white border border-slate-200/80 border-l-4 border-l-[#5068f2] p-2.5 sm:px-3.5 sm:py-2.5 shadow-2xs flex items-center space-x-2.5 hover:bg-blue-50/20 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200/80 text-[#5068f2] flex items-center justify-center shrink-0">
                <BookOpen size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[9.5px] uppercase font-bold text-slate-500 tracking-wider block whitespace-nowrap">Specializations</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums whitespace-nowrap">{totalCount} Tracks</span>
              </div>
            </div>

            {/* Chip 2: Amber Scheme */}
            <div className="bg-white border border-slate-200/80 border-l-4 border-l-[#fca119] p-2.5 sm:px-3.5 sm:py-2.5 shadow-2xs flex items-center space-x-2.5 hover:bg-amber-50/20 transition-colors">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 text-[#fca119] flex items-center justify-center shrink-0">
                <Award size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[9.5px] uppercase font-bold text-slate-500 tracking-wider block whitespace-nowrap">Credentials</span>
                <span className="text-sm sm:text-base font-extrabold text-[#fca119] whitespace-nowrap">Certified</span>
              </div>
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#3b49df] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:border-blue-300 hover:text-[#3b49df] hover:bg-blue-50/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONTROLS BAR: TABS, SEARCH, SORT (MATCHING BROWSE COURSES)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/80 p-3 sm:p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-1.5 bg-slate-100/90 p-1 border border-slate-200/60 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#3b49df] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              All Enrolled ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === 'in-progress'
                  ? 'bg-[#3b49df] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap tabular-nums cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-[#3b49df] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-[#3b49df] hover:underline font-semibold cursor-pointer ml-1"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Right Controls: Search, Sort, Browse Catalog Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full xl:w-auto">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search enrolled courses..."
              className="w-full bg-slate-50/80 border border-slate-200/90 pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#3b49df] focus:bg-white focus:ring-1 focus:ring-[#3b49df]/20 transition-all shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-50/80 border border-slate-200/90 pl-3 pr-7 py-1.5 text-xs font-bold text-slate-700 cursor-pointer focus:outline-hidden focus:border-[#3b49df] focus:bg-white transition-all shadow-2xs"
              >
                <option value="recent">Recent</option>
                <option value="progress">Highest Progress</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COURSE CARDS GRID (EXACT BROWSE COURSES CARD UI)              */}
      {/* ------------------------------------------------------------- */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white border border-slate-200/80 p-12 text-center shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#3b49df] flex items-center justify-center mx-auto">
            <BookOpen size={22} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No Enrolled Courses Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No courses match your selected filter criteria. Try choosing another category or clearing your search.
          </p>
          <div className="pt-2">
            <button
              onClick={() => { setSelectedCategory('all'); setActiveTab('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#3b49df] text-white font-bold text-xs rounded shadow-xs hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCourses.map((course) => {
            const enroll = ENROLLMENT_DATA[course.id] || { progress: 50, completedLessons: 10, totalLessons: 20, status: 'in-progress' };
            const isCompleted = enroll.status === 'completed';

            return (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
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
                    
                    {/* Progress Badge overlay */}
                    <span className={`absolute top-2.5 right-2.5 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${
                      isCompleted ? 'bg-emerald-600/90' : 'bg-slate-900/85'
                    }`}>
                      {isCompleted ? 'Completed' : `${enroll.progress}% Done`}
                    </span>
                  </div>

                  {/* Content Body */}
                  <div className="p-3 sm:p-4 xl:p-5">
                    {/* Category & Status Row */}
                    <div className="flex items-center justify-between gap-1.5 mb-1 sm:mb-1.5">
                      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-teal-700 truncate">
                        {course.category}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[10px] font-bold shadow-2xs">
                          <Check size={11} strokeWidth={2.5} />
                          <span>Finished</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-blue-50 text-[#3b49df] border border-blue-200/70 text-[10px] font-bold shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3b49df] animate-pulse"></span>
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    {/* Header & Title */}
                    <div className="flex items-start justify-between gap-1.5 mb-1 sm:mb-1.5">
                      <h3
                        className="font-semibold text-slate-900 text-xs sm:text-sm xl:text-[15px] leading-snug group-hover:text-[#3b49df] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]"
                        title={course.title}
                      >
                        {course.title}
                      </h3>
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

                    {/* Progress Bar Component */}
                    <div className="space-y-1 mb-2.5 sm:mb-3 bg-slate-50/80 p-2 border border-slate-100">
                      <div className="flex justify-between text-[10.5px] font-semibold text-slate-700 tabular-nums">
                        <span>{enroll.completedLessons} of {enroll.totalLessons} Lessons</span>
                        <span className="text-[#3b49df] font-bold">{enroll.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#3b49df] to-blue-500'
                          }`}
                          style={{ width: `${enroll.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Metadata Row: Duration | Lessons */}
                    <div className="grid grid-cols-2 gap-1.5 text-center text-xs text-slate-600 bg-slate-50/80 p-1.5 sm:p-2 xl:p-2.5 border border-slate-100 mb-2 sm:mb-3.5">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">Duration</span>
                        <span className="font-semibold text-slate-800 tabular-nums text-[10px] sm:text-xs truncate">{course.duration}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-l border-slate-200/70">
                        <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">Lessons</span>
                        <span className="font-semibold text-slate-800 tabular-nums text-[10px] sm:text-xs">{course.lessonsCount || enroll.totalLessons}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action Buttons (Outline & Continue) */}
                <div className="px-3 pb-3 sm:px-4 sm:pb-4 xl:px-5 xl:pb-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/${course.id}`);
                    }}
                    className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Outline</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lesson-player?courseId=${course.id}`);
                    }}
                    className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 bg-slate-900 group-hover:bg-[#3b49df] text-white font-medium text-[11px] sm:text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Play size={12} className="fill-white" />
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
