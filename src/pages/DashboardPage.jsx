import React from 'react';
import { StatCard } from '../components/common/StatCard';
import { BookOpen, Users, User, Award, ArrowRight, Star, Play, CheckCircle2, CheckSquare, Shield, GraduationCap, Clock, Flame, Sparkles, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { lmsService } from '../services/lmsService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assests/logo.png';

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
        {/* Student Welcome Header - Clean, Expansive SaaS Greeting */}
        <div className="bg-white border border-slate-200/90 p-6 sm:p-7 rounded-2xl relative shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center space-x-4">
              <img
                src={currentUser.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"}
                alt={currentUser.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 shadow-xs shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200/80">
                    <GraduationCap size={13} className="text-teal-700" />
                    <span>Student Portal</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                    <Flame size={12} className="text-amber-600 fill-amber-500" />
                    <span>5-Day Streak</span>
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-normal">
                  You are making great progress across your 4 active specializations. Keep up the momentum!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
              <button
                onClick={() => navigate('/enrolled-courses')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>My Courses</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Student Learning KPI Cards matching dashborad cards.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Continue Learning Featured Lesson Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                <Play size={16} className="fill-teal-700 translate-x-0.5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200/80">
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
                  <span className="text-teal-700 font-bold tabular-nums">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
                  <div className="h-full bg-teal-700 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <button
                onClick={() => navigate('/lesson-player?courseId=course-8')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
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
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">In-Progress Learning Tracks</h3>
                <p className="text-xs text-slate-500 font-normal">Jump right back into your active curriculum</p>
              </div>
              <button
                onClick={() => navigate('/enrolled-courses')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
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
                          <div className="h-full bg-teal-700 rounded-full" style={{ width: `${progressVal}%` }} />
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/lesson-player?courseId=${c.id}`)}
                        className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
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
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckSquare size={16} className="text-slate-600" />
                  <h4 className="font-semibold text-slate-900 text-sm">Active Quizzes</h4>
                </div>
                <button
                  onClick={() => navigate('/my-quizzes')}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
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
                      <span className="font-semibold text-teal-700 tabular-nums">{q.passScorePercentage}% pass</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Unlocked */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-slate-600" />
                  <h4 className="font-semibold text-slate-900 text-sm">Unlocked Badges</h4>
                </div>
                <button
                  onClick={() => navigate('/achievements')}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
                >
                  See All (4)
                </button>
              </div>

              <div className="space-y-2">
                {achievements.slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-center space-x-3 p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-semibold text-xs shrink-0">
                      <Award size={15} />
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
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
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
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between space-y-4">
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
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
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
