import React, { useState } from 'react';
import { StatCard } from '../components/common/StatCard';
import { 
  BookOpen, Users, User, Award, ArrowRight, ArrowLeft, Star, Play, 
  CheckCircle2, CheckSquare, Shield, GraduationCap, Clock, Flame, 
  Sparkles, DollarSign, Camera, Upload, X, Check, RefreshCw, 
  Image as ImageIcon, BarChart3, PieChart as PieIcon, TrendingUp, 
  Building2, AlertCircle, ExternalLink, Layers, ArrowUpRight, FileText,
  Calendar, ChevronRight, ChevronDown, MapPin, UserCheck
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { lmsService } from '../services/lmsService';
import { useNavigate } from 'react-router-dom';
import { useAuth, boyAvatar, girlAvatar } from '../context/AuthContext';
import { StudentAttendanceCard } from '../components/crm/StudentAttendanceCard';
import { StudentFeesCard } from '../components/crm/StudentFeesCard';
import { StudentBatchesCard } from '../components/crm/StudentBatchesCard';
import { StudentCertificatesCard } from '../components/crm/StudentCertificatesCard';
import { CertificateViewerModal } from '../components/crm/CertificateViewerModal';
import { FeeReceiptModal } from '../components/crm/FeeReceiptModal';
import { AdminCategorizedAnalyticsHub } from '../components/admin/AdminCategorizedAnalyticsHub';
import { StudentDashboardHub } from '../components/student/StudentDashboardHub';
import { useToast } from '../context/ToastContext';
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
  const {
    isStudent,
    isAdmin,
    currentUser,
    updateCurrentUser,
    crmProfile,
    crmAttendance,
    crmBatch,
    crmCertificates,
    availableStudents,
    crmLoading,
    switchCrmStudent,
    refreshCrmData
  } = useAuth();
  
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const courses = lmsService.getCourses();
  const activities = lmsService.getActivities();
  const quizzes = lmsService.getQuizzes();
  const assignments = lmsService.getAssignments();
  const achievements = lmsService.getAchievements().filter(a => a.unlocked);

  const isIllustration = currentUser.avatar === boyAvatar || currentUser.avatar === girlAvatar;
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
  // -------------------------------------------------------------
  // STUDENT DASHBOARD VIEW (MATCHING LASTEST UI.png)
  // -------------------------------------------------------------
  if (isStudent) {
    return (
      <StudentDashboardHub
        currentUser={currentUser}
        crmProfile={crmProfile}
        crmAttendance={crmAttendance}
        crmBatch={crmBatch}
        crmCertificates={crmCertificates}
        courses={courses}
        quizzes={quizzes}
        achievements={achievements}
        onUpdateCurrentUser={updateCurrentUser}
      />
    );
  }

  // -------------------------------------------------------------
  // ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
              <Shield size={12} className="text-slate-600 dark:text-slate-400" />
              ADMINISTRATOR DASHBOARD
            </span>
            <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CRM API Connected • Live Sync Active</span>
            </span>
          </div>
          <h1 className="text-2xl md:text-[28px] font-black text-slate-900 dark:text-white tracking-tight">
            Central Administrator Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5 font-normal">
            Welcome back, {currentUser.name}! Course classification, student attendance, fees collection, and certifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate('/create-course')}
            className="bg-[#3b49df] hover:bg-[#2f3cb8] text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
          >
            <BookOpen size={13} />
            <span>Create Course Track</span>
          </button>

          <button
            onClick={() => navigate('/manage-reports')}
            className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            <span>Analytics Report</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Cards matching senior grade frontend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="TOTAL STUDENTS"
          value="3,280"
          progress={80}
          subtitle="80% Increase in 20 Days • 12 Rosters"
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
          title="ACTIVE SPECIALIZATIONS"
          value="7 Tracks"
          progress={100}
          subtitle="100% Published Across Centers"
          icon={GraduationCap}
          color="purple"
        />
        <StatCard
          title="FEES COLLECTION"
          value="₹87.4L"
          progress={82}
          subtitle="82% Recovery • CRM Verified"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* ============================================================== */}
      {/* EXECUTIVE CATEGORIZED COMPARISON ANALYTICS HUB                  */}
      {/* ============================================================== */}
      <AdminCategorizedAnalyticsHub courses={courses} />

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart (2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Student Enrollments & Completions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">Monthly academic growth trajectory for 2026</p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span className="text-slate-600 dark:text-slate-300">Completions</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-600 dark:text-slate-300">Enrollments</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEnr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.25} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="completions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorComp)" />
                <Area type="monotone" dataKey="enrollments" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorEnr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity Stream (1 column) */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Real-time Activity</h3>
              <button
                onClick={() => navigate('/activity')}
                className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:underline cursor-pointer"
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
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200/80 dark:border-slate-700"
                  />
                  <div className="text-xs">
                    <p className="text-slate-800 dark:text-slate-300">
                      <span className="font-medium text-slate-900 dark:text-white">{act.user.name}</span>{' '}
                      <span className="text-slate-500 dark:text-slate-400">{act.action}</span>{' '}
                      <span className="font-medium text-slate-800 dark:text-slate-200">{act.target}</span>
                    </p>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">{act.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Operating Media" className="h-4 w-auto object-contain opacity-70" />
              <div className="text-[11px] text-slate-400 dark:text-slate-500">
                <span className="font-medium text-slate-600 dark:text-slate-300 block">Operating Media LMS</span>
                <span>Instructor & Portal Documentation</span>
              </div>
            </div>
            <button
              onClick={() => showToast('Documentation knowledgebase is up to date!', 'info')}
              className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Docs
            </button>
          </div>
        </div>
      </div>

      {/* Top Performing Courses Table */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Top Performing Courses</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">Enrollment volumes and ratings across active tracks</p>
          </div>
          <button
            onClick={() => navigate('/manage-courses')}
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:underline cursor-pointer"
          >
            Manage Courses
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Course</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Enrolled</th>
                <th className="pb-3 font-semibold">Rating</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {courses.slice(0, 5).map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center space-x-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-10 h-8 rounded-md object-cover shrink-0 border border-slate-200/70 dark:border-slate-700"
                    />
                    <span className="font-semibold text-slate-900 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
                      {course.title}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500 dark:text-slate-400 font-normal">{course.category}</td>
                  <td className="py-3.5 pr-4 font-bold text-slate-900 dark:text-white tabular-nums">{course.studentsCount}</td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{course.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase">
                      {course.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors cursor-pointer"
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
