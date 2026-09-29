import React from 'react';
import { StatCard } from '../components/common/StatCard';
import { BookOpen, Users, Award, ArrowRight, Star, Play, CheckCircle2, CheckSquare, Shield, GraduationCap, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { lmsService } from '../services/lmsService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assests/logo.png';
import { DoodleStar, DoodleHeart, DoodleCloud, DoodleBurst } from '../components/common/CheerfulDoodles';

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
  const { isStudent, isAdmin, currentUser } = useAuth();
  const courses = lmsService.getCourses();
  const activities = lmsService.getActivities();
  const quizzes = lmsService.getQuizzes();
  const assignments = lmsService.getAssignments();
  const achievements = lmsService.getAchievements().filter(a => a.unlocked);

  // -------------------------------------------------------------
  // STUDENT DASHBOARD VIEW
  // -------------------------------------------------------------
  if (isStudent) {
    const enrolledCourses = courses.filter(c => c.status === 'published').slice(0, 3);

    return (
      <div className="space-y-6">
        {/* Student Welcome Header - Cheerful Banner matching our-courses.png */}
        <div className="bg-[#fbf7f4] border border-[#f0e6de] p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xs">
          <DoodleStar className="w-9 h-9 absolute top-3 left-4 -rotate-12 pointer-events-none opacity-90 hidden sm:block" />
          <DoodleHeart className="w-8 h-8 absolute top-3 left-1/2 -translate-x-1/2 -rotate-6 pointer-events-none opacity-90" />
          <DoodleCloud className="w-12 h-9 absolute top-3 right-6 rotate-6 pointer-events-none opacity-90 hidden sm:block" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-1.5 text-xs font-medium text-teal-800 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-200/80">
                <GraduationCap size={14} className="text-teal-700" />
                <span>Student Learning Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight font-serif">
                Welcome back, {currentUser.name}! 🌟
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
                You are currently active in 4 courses. 28 lessons completed and 4 official certification badges unlocked!
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => navigate('/enrolled-courses')}
                className="bg-[#0d7a5f] hover:bg-teal-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>My Enrolled Courses</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Student Learning KPI Cards with Cheerful Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Enrolled Courses" value="4 Courses" change="2 Active In-Progress" isPositive={true} icon={BookOpen} iconColor="text-sky-600" iconBg="bg-sky-50 border border-sky-100" />
          <StatCard title="Completed Lessons" value="28 / 72" change="+4 this week" isPositive={true} icon={CheckCircle2} iconColor="text-emerald-600" iconBg="bg-emerald-50 border border-emerald-100" />
          <StatCard title="Avg Quiz Score" value="88.5%" change="Passed all 3 quizzes" isPositive={true} icon={CheckSquare} iconColor="text-purple-600" iconBg="bg-purple-50 border border-purple-100" />
          <StatCard title="Badges & Honors" value="4 Unlocked" change="1 badge pending" isPositive={true} icon={Award} iconColor="text-amber-600" iconBg="bg-amber-50 border border-amber-100" />
        </div>

        {/* Continue Learning Featured Lesson Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 md:p-6 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0d7a5f] border border-teal-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                <Play size={18} className="fill-[#0d7a5f] translate-x-0.5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/80">
                  Up Next • Search Engine Optimization (SEO)
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  2.2 Schema Markup & Structured Data Implementation
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Module 2: On-Page & Content Optimization • 25 mins video lesson
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 md:self-center">
              <div className="w-36 hidden sm:block">
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Progress</span>
                  <span className="text-[#0d7a5f] font-semibold tabular-nums">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
                  <div className="h-full bg-[#0d7a5f] rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <button
                onClick={() => navigate('/lesson-player?courseId=course-8')}
                className="bg-[#0d7a5f] hover:bg-teal-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                <Play size={13} className="fill-white" />
                <span>Resume Lesson</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Active Courses & Learning Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active In-Progress Courses (2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">In-Progress Learning Tracks</h3>
                <p className="text-xs text-slate-500 font-normal">Jump right back into your active curriculum</p>
              </div>
              <button
                onClick={() => navigate('/enrolled-courses')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {enrolledCourses.map((c, idx) => {
                const progressVal = idx === 0 ? 65 : idx === 1 ? 40 : 20;
                return (
                  <div
                    key={c.id}
                    className="p-3.5 bg-slate-50/70 hover:bg-slate-100/60 rounded-xl border border-slate-200/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-14 h-11 rounded-lg object-cover shrink-0 shadow-2xs"
                      />
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {c.category}
                        </span>
                        <h4 className="font-medium text-slate-900 text-sm">{c.title}</h4>
                        <span className="text-xs text-slate-400 font-normal">
                          {c.duration} • 12 of {c.lessonsCount} lessons
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 sm:shrink-0 justify-between sm:justify-end">
                      <div className="w-24">
                        <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                          <span className="tabular-nums">{progressVal}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full" style={{ width: `${progressVal}%` }} />
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/lesson-player?courseId=${c.id}`)}
                        className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Play size={11} className="fill-slate-700" />
                        <span>Continue</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Quizzes & Achievements */}
          <div className="space-y-5">
            {/* Upcoming Quizzes */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckSquare size={16} className="text-slate-600" />
                  <h4 className="font-semibold text-slate-900 text-sm">Active Quizzes</h4>
                </div>
                <button
                  onClick={() => navigate('/my-quizzes')}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2.5">
                {quizzes.slice(0, 2).map((q) => (
                  <div key={q.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-1">
                    <p className="text-xs font-medium text-slate-800 leading-snug">{q.title}</p>
                    <div className="flex justify-between text-xs text-slate-500 font-normal">
                      <span>{q.totalQuestions} Questions • {q.durationMinutes} mins</span>
                      <span className="font-semibold text-slate-700 tabular-nums">{q.passScorePercentage}% pass</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Unlocked */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-slate-600" />
                  <h4 className="font-semibold text-slate-900 text-sm">Unlocked Badges</h4>
                </div>
                <button
                  onClick={() => navigate('/achievements')}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline"
                >
                  See All (4)
                </button>
              </div>

              <div className="space-y-2">
                {achievements.slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-center space-x-3 p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-xs shrink-0">
                      🏆
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-900 truncate">{a.title}</p>
                      <p className="text-xs text-slate-400 font-normal truncate">{a.earnedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-xs"
          >
            <span>View Analytics Report</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Grid - Clean Uniform Management Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Courses" value="8 Tracks" change="All Active & Published" isPositive={true} icon={BookOpen} />
        <StatCard title="Total Students" value="1,480" change="+18.4% this semester" isPositive={true} icon={Users} />
        <StatCard title="Completion Rate" value="88%" change="+3.5% vs avg benchmark" isPositive={true} icon={Award} />
        <StatCard title="Active Batches" value="18 Batches" change="+3 ongoing batches" isPositive={true} icon={GraduationCap} />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
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
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 text-base">Real-time Activity</h3>
              <button
                onClick={() => navigate('/activity')}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline"
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

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 px-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                <img src={logo} alt="Operating Media" className="h-5 w-auto object-contain" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Operating Media LMS</p>
                <p className="text-xs text-slate-500 font-normal">Instructor & Portal Documentation</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/manage-reports')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Docs
            </button>
          </div>
        </div>
      </div>

      {/* Popular Courses Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Top Performing Courses</h3>
            <p className="text-xs text-slate-500 font-normal">Enrollment volumes and ratings across active tracks</p>
          </div>
          <button
            onClick={() => navigate('/manage-courses')}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline"
          >
            Manage Courses
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 uppercase text-[11px] font-medium tracking-wider">
                <th className="pb-3 font-medium">Course</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Enrolled</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {courses.slice(0, 4).map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-medium text-slate-900 flex items-center space-x-3">
                    <img src={c.thumbnail} alt={c.title} className="w-10 h-7 rounded-lg object-cover shrink-0" />
                    <span className="truncate max-w-xs">{c.title}</span>
                  </td>
                  <td className="py-3 text-slate-500 text-xs font-normal">{c.category}</td>
                  <td className="py-3 text-slate-900 font-semibold tabular-nums">{c.studentsCount}</td>
                  <td className="py-3 text-slate-700 font-medium flex items-center space-x-1">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="tabular-nums">{c.rating.toFixed(1)}</span>
                  </td>
                  <td className="py-3">
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium px-2 py-0.5 rounded-md">
                      {c.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigate(`/courses/${c.id}`)}
                      className="text-slate-700 hover:text-slate-900 hover:underline font-medium text-xs"
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
