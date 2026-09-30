import React, { useState } from 'react';
import { StatCard } from '../components/common/StatCard';
import { BookOpen, Users, User, Award, ArrowRight, ArrowLeft, Star, Play, CheckCircle2, CheckSquare, Shield, GraduationCap, Clock, Flame, Sparkles, DollarSign, Camera, Upload, X, Check, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { lmsService } from '../services/lmsService';
import { useNavigate } from 'react-router-dom';
import { useAuth, boyAvatar, girlAvatar } from '../context/AuthContext';
import logo from '../assets/logo.png';

const chartData = [
  { month: 'Jan', completions: 180, enrollments: 320 },
  { month: 'Feb', completions: 240, enrollments: 410 },
  { month: 'Mar', completions: 310, enrollments: 480 },
  { month: 'Apr', completions: 420, enrollments: 620 },
  { month: 'May', completions: 510, enrollments: 710 },
  { month: 'Jun', completions: 640, enrollments: 840 },
  { month: 'Jul', completions: 760, enrollments: 950 },
  { month: 'Aug', completions: 1120, enrollments: 1480 },
];

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { isStudent, isAdmin, currentUser, updateCurrentUser } = useAuth();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const courses = lmsService.getCourses();
  const activities = lmsService.getActivities();
  const quizzes = lmsService.getQuizzes();
  const assignments = lmsService.getAssignments();
  const achievements = lmsService.getAchievements().filter(a => a.unlocked);

  const isCurrentlyBoy = currentUser.avatar === boyAvatar || (!currentUser.avatar?.includes('Girl') && currentUser.avatar !== girlAvatar);

  const toggleGenderAvatar = (e) => {
    e?.stopPropagation();
    const nextAvatar = isCurrentlyBoy ? girlAvatar : boyAvatar;
    updateCurrentUser({ avatar: nextAvatar });
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result;
        if (typeof result === 'string') {
          updateCurrentUser({ avatar: result });
          setIsAvatarModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // -------------------------------------------------------------
  // STUDENT DASHBOARD VIEW
  // -------------------------------------------------------------
  if (isStudent) {
    const enrolledCourses = courses.filter(c => c.status === 'published').slice(0, 3);

    return (
      <div className="space-y-6">
        {/* Student Welcome Header with 3D Character bottom-anchored touching bottom border only */}
        <div className="relative mt-12 sm:mt-16 md:mt-20 lg:mt-24 bg-white border-b border-slate-200 pb-3.5 sm:pb-4 px-1 sm:px-3 lg:px-4">
          {/* 3D Character Image stuck to the bottom container border and prominently overflowing above */}
          <div className="absolute -bottom-0.5 left-0 sm:left-2 lg:left-3 z-10 pointer-events-auto group">
            <div className="relative">
              <img
                src={currentUser.avatar || boyAvatar}
                alt={currentUser.name}
                className="h-[145px] sm:h-[165px] md:h-[195px] lg:h-[235px] w-auto max-w-[110px] sm:max-w-[130px] md:max-w-[155px] lg:max-w-[200px] object-contain object-bottom drop-shadow-md select-none transition-transform duration-300 group-hover:scale-105 cursor-pointer block"
                onClick={() => setIsAvatarModalOpen(true)}
                title="Click to customize avatar"
              />
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute bottom-2 right-0.5 sm:right-1 bg-white hover:bg-slate-50 text-slate-800 p-1.5 rounded-full shadow-md border border-slate-200 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Click to customize avatar"
              >
                <Camera size={13} className="text-slate-700" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-2.5 sm:space-x-4 min-w-0">
              {/* Spacer matching character width + clearance to prevent hand overlap */}
              <div className="w-[105px] sm:w-[125px] md:w-[145px] lg:w-[195px] shrink-0 self-stretch pointer-events-none" aria-hidden="true" />

              {/* Greeting & Information - Two-Tone Heading inline on desktop/tablet, stacked column only on small screen */}
              <div className="min-w-0 py-0.5">
                <h1 className="tracking-tight leading-snug flex flex-col sm:flex-row sm:items-baseline gap-x-2">
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-500 leading-tight">Welcome back,</span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-black text-[#3b49df] leading-tight">{currentUser.name}!</span>
                </h1>
                {/* Section commented out to save width, moved to Up Next section:
                <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-1.5 font-normal max-w-xl">
                  You are making great progress across your 4 active specializations. Keep up the momentum!
                </p>
                */}
              </div>
            </div>

            {/* Action button always placed on the right to keep card height slim and maintain character overflow */}
            <div className="shrink-0 self-center">
              <button
                onClick={() => navigate('/enrolled-courses')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3 py-1.5 sm:px-3.5 sm:py-2 lg:px-4 lg:py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 sm:space-x-2 shadow-xs cursor-pointer"
              >
                <span>My Courses</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Student Learning KPI Cards - 2x2 grid from mobile up to 1023px, 4-col on desktop (no asymmetry, no auto margin) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
          <StatCard
            title="ENROLLED COURSES"
            value="4 Courses"
            progress={65}
            subtitle="2 Active In-Progress"
            icon={BookOpen}
            color="blue"
          />
          <StatCard
            title="COMPLETED LESSONS"
            value="28 / 72"
            progress={40}
            subtitle="4 Lessons this week"
            icon={CheckCircle2}
            color="emerald"
          />
          <StatCard
            title="AVG QUIZ SCORE"
            value="88.5%"
            progress={88}
            subtitle="Passed all 3 quizzes"
            icon={CheckSquare}
            color="purple"
          />
          <StatCard
            title="BADGES & HONORS"
            value="4 Unlocked"
            progress={80}
            subtitle="1 badge pending"
            icon={Award}
            color="orange"
          />
        </div>

        {/* Pick Up Where You Left Off - Clean Light Card with Logical Flow & Seamless Pie Chart */}
        <div className="bg-white border border-slate-200/90 shadow-2xs p-4 sm:p-5 lg:p-6 transition-all">
          {/* Header Bar: Category & Course Title */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-50 text-[#3b49df] flex items-center justify-center">
                <Play size={12} className="fill-[#3b49df]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3b49df]">
                Pick Up Where You Left Off
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Course: <strong className="text-slate-800 font-semibold">Search Engine Optimization (SEO)</strong>
            </span>
          </div>

          {/* Main Content Area: Logical Left-to-Right Flow */}
          <div className="pt-4 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
            {/* Left: Module & Lesson Information with Stopped Timestamp */}
            <div className="space-y-2 min-w-0 max-w-2xl">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Module 2 of 4: On-Page & Technical Optimization
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                Lesson 2.2: Schema Markup & Structured Data Implementation
              </h3>

              {/* Stopped Timestamp & "Yay only _ mins remains" Callout (Clean typography, no repetitive border boxes) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs pt-0.5">
                <div className="flex items-center space-x-1.5 text-slate-600 font-medium">
                  <Clock size={14} className="text-slate-400 shrink-0" />
                  <span>Stopped at <strong className="text-slate-900 font-semibold tabular-nums">16:15</strong> of 25:00 min</span>
                </div>
                <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
                <div className="inline-flex items-center space-x-1.5 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 border border-amber-200/60">
                  <Sparkles size={13} className="text-amber-500 shrink-0" />
                  <span>Yay, only 9 mins remains. Almost there!</span>
                </div>
              </div>

              {/* Encouragement line */}
              <p className="text-xs text-slate-500 font-normal pt-0.5">
                You are making great progress across your 4 active specializations. Keep up the momentum!
              </p>
            </div>

            {/* Right: Pie Chart Visualization + Start Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 xl:gap-6 shrink-0 xl:pl-6 xl:border-l xl:border-slate-100 pt-3 xl:pt-0 border-t xl:border-t-0 border-slate-100">
              {/* Professional Frontend Developer: Clean white card, colorful in limit */}
              <div className="flex flex-col sm:flex-row items-center gap-4.5 bg-white border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all">
                {/* Dual-Tone Crisp Pie Chart: Brand Blue (65% Covered) & Warm Amber (35% Remaining) */}
                <div className="relative w-20 h-20 sm:w-[88px] sm:h-[88px] shrink-0 flex items-center justify-center">
                  <svg className="w-20 h-20 sm:w-[88px] sm:h-[88px] -rotate-90" viewBox="0 0 88 88">
                    {/* Remaining 35% track: Warm Amber */}
                    <circle
                      cx="44"
                      cy="44"
                      r="36"
                      fill="#ffffff"
                      stroke="#f59e0b"
                      strokeWidth="7.5"
                    />
                    {/* Covered 65% track: Brand Blue */}
                    <circle
                      cx="44"
                      cy="44"
                      r="36"
                      fill="transparent"
                      stroke="#3b49df"
                      strokeWidth="7.5"
                      strokeDasharray="226.19"
                      strokeDashoffset={226.19 * (1 - 0.65)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none tabular-nums">65%</span>
                    <span className="text-[10px] uppercase font-black text-[#3b49df] tracking-wider leading-none mt-1">done</span>
                  </div>
                </div>

                {/* Detailed Info: Clean typography with colorful pills and indicators */}
                <div className="space-y-1.5 text-xs min-w-[210px] w-full sm:w-auto">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Module Progress
                    </span>
                    <span className="text-[10.5px] font-extrabold text-[#3b49df] bg-blue-50 px-2 py-0.5 border border-blue-200/80">
                      Module 2 of 4
                    </span>
                  </div>

                  {/* Total Number of Modules [Covered Numbered] */}
                  <div className="flex items-center justify-between gap-3 text-xs pt-0.5">
                    <div className="flex items-center space-x-2 text-slate-600 font-medium">
                      <span className="w-2.5 h-2.5 bg-[#3b49df] shrink-0" />
                      <span>Total Modules:</span>
                    </div>
                    <div className="text-slate-900 font-bold tabular-nums whitespace-nowrap">
                      4 Modules <span className="text-[#3b49df] font-black">[2 Covered]</span>
                    </div>
                  </div>

                  {/* Minutes Covered */}
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-slate-600 font-medium">
                      <span className="w-2.5 h-2.5 bg-[#3b49df] shrink-0" />
                      <span>Covered:</span>
                    </div>
                    <div className="text-slate-900 font-bold tabular-nums whitespace-nowrap">
                      16m <span className="text-[#3b49df] font-black">(65%)</span>
                    </div>
                  </div>

                  {/* Minutes Remaining */}
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-slate-600 font-medium">
                      <span className="w-2.5 h-2.5 bg-amber-500 shrink-0" />
                      <span>Remaining:</span>
                    </div>
                    <div className="text-slate-700 font-bold tabular-nums whitespace-nowrap">
                      9m <span className="text-amber-600 font-semibold">(35%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start / Resume Action Button */}
              <button
                onClick={() => navigate('/lesson-player?courseId=course-8')}
                className="bg-[#3b49df] hover:bg-[#2f3cb8] text-white font-bold text-xs sm:text-sm px-6 py-3.5 transition-all shadow-sm flex items-center justify-center space-x-2 shrink-0 cursor-pointer active:scale-95"
              >
                <Play size={14} className="fill-white" />
                <span>Resume Lesson</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Active Courses & Learning Sidebar with Clean White BG, Accent Borders, and Vibrant Colors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active In-Progress Courses (2 columns) */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">In-Progress Learning Tracks</h3>
                <p className="text-xs text-slate-500 font-normal">Jump right back into your active curriculum</p>
              </div>
              <button
                onClick={() => navigate('/enrolled-courses')}
                className="text-xs font-semibold text-[#3b49df] hover:underline cursor-pointer flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="space-y-3">
              {enrolledCourses.map((c, idx) => {
                const progressVal = idx === 0 ? 65 : idx === 1 ? 40 : 20;
                // Color schemes: Text color, border color, hover tint, progress bar color - NOT entire bg!
                const trackSchemes = [
                  {
                    border: 'border-l-4 border-l-[#5068f2]',
                    hover: 'hover:border-blue-300 hover:bg-blue-50/30',
                    tag: 'text-[#5068f2]',
                    progress: 'bg-[#5068f2]',
                    btn: 'text-[#5068f2] bg-blue-50 hover:bg-[#5068f2] hover:text-white border-blue-200'
                  },
                  {
                    border: 'border-l-4 border-l-[#0d9488]',
                    hover: 'hover:border-teal-300 hover:bg-teal-50/30',
                    tag: 'text-[#0d9488]',
                    progress: 'bg-[#0d9488]',
                    btn: 'text-[#0d9488] bg-teal-50 hover:bg-[#0d9488] hover:text-white border-teal-200'
                  },
                  {
                    border: 'border-l-4 border-l-[#6b3ec6]',
                    hover: 'hover:border-purple-300 hover:bg-purple-50/30',
                    tag: 'text-[#6b3ec6]',
                    progress: 'bg-[#6b3ec6]',
                    btn: 'text-[#6b3ec6] bg-purple-50 hover:bg-[#6b3ec6] hover:text-white border-purple-200'
                  },
                ];
                const scheme = trackSchemes[idx % trackSchemes.length];

                return (
                  <div
                    key={c.id}
                    className={`bg-white border border-slate-200/80 ${scheme.border} p-3.5 sm:p-4 transition-all duration-200 ${scheme.hover} flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 group`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-16 h-12 object-cover shrink-0 shadow-2xs border border-slate-200/80"
                      />
                      <div className="min-w-0">
                        <span className={`text-[10.5px] font-extrabold uppercase tracking-wider ${scheme.tag} block leading-tight`}>
                          {c.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate leading-snug my-0.5 group-hover:text-slate-950">
                          {c.title}
                        </h4>
                        <span className="text-xs text-slate-500 font-normal">
                          {c.duration} • 12 of {c.lessonsCount} lessons
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 sm:shrink-0 justify-between sm:justify-end">
                      <div className="w-28 sm:w-36">
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span className="text-slate-500 text-[11px] font-medium">Curriculum</span>
                          <span className={`tabular-nums font-bold ${scheme.tag}`}>{progressVal}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                          <div className={`h-full ${scheme.progress} rounded-full transition-all duration-500`} style={{ width: `${progressVal}%` }} />
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/lesson-player?courseId=${c.id}`)}
                        className={`border text-xs font-bold px-3.5 py-2 transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer shrink-0 active:scale-95 ${scheme.btn}`}
                      >
                        <Play size={11} className="fill-current" />
                        <span>Continue</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Quizzes & Achievements with Clean White BG, Accent Borders, and Vibrant Colors */}
          <div className="space-y-5">
            {/* Upcoming Quizzes */}
            <div className="bg-white border border-slate-200/80 p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckSquare size={16} className="text-[#6b3ec6]" />
                  <h4 className="font-bold text-slate-900 text-base">Active Quizzes</h4>
                </div>
                <button
                  onClick={() => navigate('/my-quizzes')}
                  className="text-xs font-semibold text-[#6b3ec6] hover:underline cursor-pointer flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="space-y-3">
                {quizzes.slice(0, 2).map((q, idx) => {
                  const quizSchemes = [
                    {
                      border: 'border-l-4 border-l-[#6b3ec6]',
                      hover: 'hover:border-purple-300 hover:bg-purple-50/20',
                      badge: 'bg-purple-50 text-[#6b3ec6] border-purple-200',
                      tag: 'text-[#6b3ec6]',
                      btn: 'text-[#6b3ec6] bg-purple-50 hover:bg-[#6b3ec6] hover:text-white border-purple-200'
                    },
                    {
                      border: 'border-l-4 border-l-[#f03030]',
                      hover: 'hover:border-red-300 hover:bg-red-50/20',
                      badge: 'bg-red-50 text-[#f03030] border-red-200',
                      tag: 'text-[#f03030]',
                      btn: 'text-[#f03030] bg-red-50 hover:bg-[#f03030] hover:text-white border-red-200'
                    }
                  ];
                  const qScheme = quizSchemes[idx % quizSchemes.length];

                  return (
                    <div
                      key={q.id}
                      className={`bg-white border border-slate-200/80 ${qScheme.border} p-3.5 transition-all duration-200 ${qScheme.hover} flex items-center justify-between gap-3 group`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${qScheme.badge}`}>
                          <CheckSquare size={17} />
                        </div>
                        <div className="min-w-0">
                          <span className={`text-[9.5px] font-extrabold uppercase tracking-wider ${qScheme.tag} block leading-tight`}>
                            Specialization Test
                          </span>
                          <h5 className="font-bold text-slate-900 text-xs sm:text-sm truncate leading-tight my-0.5 group-hover:text-slate-950">
                            {q.title}
                          </h5>
                          <span className="text-[11px] text-slate-500 font-medium block">
                            {q.totalQuestions} Questions • {q.durationMinutes} mins
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end space-y-1.5">
                        <span className={`text-[10px] font-extrabold border px-2 py-0.5 ${qScheme.badge}`}>
                          {q.passScorePercentage}% PASS
                        </span>
                        <button
                          onClick={() => navigate('/my-quizzes')}
                          className={`border text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer flex items-center space-x-1 ${qScheme.btn}`}
                        >
                          <span>Start</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements Unlocked */}
            <div className="bg-white border border-slate-200/80 p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-[#fca119]" />
                  <h4 className="font-bold text-slate-900 text-base">Unlocked Badges</h4>
                </div>
                <button
                  onClick={() => navigate('/achievements')}
                  className="text-xs font-semibold text-[#fca119] hover:underline cursor-pointer flex items-center space-x-1"
                >
                  <span>See All ({achievements.length})</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="space-y-2.5">
                {achievements.slice(0, 3).map((a, idx) => {
                  const badgeSchemes = [
                    {
                      border: 'border-l-4 border-l-[#fca119]',
                      hover: 'hover:border-amber-300 hover:bg-amber-50/20',
                      badge: 'bg-amber-50 text-[#fca119] border-amber-200',
                      tag: 'text-amber-700 bg-amber-50 border-amber-200'
                    },
                    {
                      border: 'border-l-4 border-l-[#0d9488]',
                      hover: 'hover:border-teal-300 hover:bg-teal-50/20',
                      badge: 'bg-teal-50 text-[#0d9488] border-teal-200',
                      tag: 'text-teal-700 bg-teal-50 border-teal-200'
                    },
                    {
                      border: 'border-l-4 border-l-[#6b3ec6]',
                      hover: 'hover:border-purple-300 hover:bg-purple-50/20',
                      badge: 'bg-purple-50 text-[#6b3ec6] border-purple-200',
                      tag: 'text-purple-700 bg-purple-50 border-purple-200'
                    }
                  ];
                  const bScheme = badgeSchemes[idx % badgeSchemes.length];

                  return (
                    <div
                      key={a.id}
                      className={`bg-white border border-slate-200/80 ${bScheme.border} p-3 transition-all duration-200 ${bScheme.hover} flex items-center justify-between gap-3 group`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${bScheme.badge}`}>
                          <Award size={16} />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-bold text-slate-900 text-xs truncate leading-snug group-hover:text-slate-950">
                            {a.title}
                          </h5>
                          <span className="text-[11px] text-slate-500 font-medium truncate block">
                            {a.description}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[9.5px] font-extrabold border px-2 py-0.5 shrink-0 whitespace-nowrap ${bScheme.tag}`}>
                        Unlocked
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Customization Modal */}
        {isAvatarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-500" />
                    Customize Your Student Avatar
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Personalize your dashboard character or upload your own photo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                    Choose 3D Animated Character
                  </span>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Option 1: 3D Boy */}
                    <button
                      type="button"
                      onClick={() => {
                        updateCurrentUser({ avatar: boyAvatar });
                        setIsAvatarModalOpen(false);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center cursor-pointer group ${
                        currentUser.avatar === boyAvatar
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="w-24 h-24 flex items-center justify-center mb-2.5">
                        <img
                          src={boyAvatar}
                          alt="Boy Character"
                          className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <span>3D Boy (Waving)</span>
                        {currentUser.avatar === boyAvatar && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5">Friendly animated boy</span>
                    </button>

                    {/* Option 2: 3D Girl */}
                    <button
                      type="button"
                      onClick={() => {
                        updateCurrentUser({ avatar: girlAvatar });
                        setIsAvatarModalOpen(false);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center cursor-pointer group ${
                        currentUser.avatar === girlAvatar
                          ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="w-24 h-24 flex items-center justify-center mb-2.5">
                        <img
                          src={girlAvatar}
                          alt="Girl Character"
                          className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <span>3D Girl (Waving)</span>
                        {currentUser.avatar === girlAvatar && (
                          <Check size={14} className="text-purple-600" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5">Friendly animated girl</span>
                    </button>
                  </div>
                </div>

                {/* Option 3: Upload Custom Photo */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                    Or Upload Your Own Photo
                  </span>

                  <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20 group">
                    <div className="w-10 h-10 rounded-full bg-slate-200/80 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 flex items-center justify-center mb-2 transition-colors">
                      <Upload size={18} />
                    </div>
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Click to choose photo from your computer
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      PNG, JPG, SVG or WEBP (Transparent PNG recommended)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    updateCurrentUser({ avatar: boyAvatar });
                    setIsAvatarModalOpen(false);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Reset to default (Boy)
                </button>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
              <Shield size={12} className="text-slate-600" />
              ADMINISTRATOR DASHBOARD
            </span>
          </div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-normal">
            Welcome back, {currentUser.name}! Here is what is happening across Operating Media LMS today.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => navigate('/manage-reports')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            <span>View Analytics Report</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Cards matching dashborad cards.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="TOTAL STUDENTS"
          value="3280"
          progress={80}
          subtitle="80% Increase in 20 Days"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="NEW STUDENTS"
          value="245"
          progress={50}
          subtitle="50% Increase in 25 Days"
          icon={User}
          color="orange"
        />
        <StatCard
          title="TOTAL COURSE"
          value="28"
          progress={76}
          subtitle="76% Increase in 20 Days"
          icon={GraduationCap}
          color="purple"
        />
        <StatCard
          title="FEES COLLECTION"
          value="25160$"
          progress={30}
          subtitle="30% Increase in 30 Days"
          icon={DollarSign}
          color="red"
        />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart (2 columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Student Enrollments & Completions</h3>
              <p className="text-xs text-slate-500 font-normal">Monthly academic growth trajectory for 2026</p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                <span className="text-slate-600">Completions</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-600">Enrollments</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEnr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="completions" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorComp)" />
                <Area type="monotone" dataKey="enrollments" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorEnr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity Stream (1 column) */}
        <div className="bg-white border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 text-base">Real-time Activity</h3>
              <button
                onClick={() => navigate('/activity')}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
              >
                View Log
              </button>
            </div>

            <div className="space-y-4">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start space-x-3">
                  <img
                    src={act.user.avatar}
                    alt={act.user.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200/80"
                  />
                  <div className="text-xs">
                    <p className="text-slate-800">
                      <span className="font-medium text-slate-900">{act.user.name}</span>{' '}
                      <span className="text-slate-500">{act.action}</span>{' '}
                      <span className="font-medium text-slate-800">{act.target}</span>
                    </p>
                    <span className="text-xs text-slate-400 font-normal">{act.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Operating Media" className="h-4 w-auto object-contain opacity-70" />
              <div className="text-[11px] text-slate-400">
                <span className="font-medium text-slate-600 block">Operating Media LMS</span>
                <span>Instructor & Portal Documentation</span>
              </div>
            </div>
            <button
              onClick={() => showToast('Documentation knowledgebase is up to date!', 'info')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Docs
            </button>
          </div>
        </div>
      </div>

      {/* Top Performing Courses Table */}
      <div className="bg-white border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Top Performing Courses</h3>
            <p className="text-xs text-slate-500 font-normal">Enrollment volumes and ratings across active tracks</p>
          </div>
          <button
            onClick={() => navigate('/manage-courses')}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
          >
            Manage Courses
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Course</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Enrolled</th>
                <th className="pb-3 font-semibold">Rating</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {courses.slice(0, 5).map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center space-x-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-10 h-8 rounded-md object-cover shrink-0 border border-slate-200/70"
                    />
                    <span className="font-semibold text-slate-900 hover:text-teal-700 cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
                      {course.title}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500 font-normal">{course.category}</td>
                  <td className="py-3.5 pr-4 font-bold text-slate-900 tabular-nums">{course.studentsCount}</td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">{course.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase">
                      {course.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
