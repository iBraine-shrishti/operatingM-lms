import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Upload,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Users,
  Award,
  ChevronDown,
  X,
  Send,
  Eye,
  Download,
  Check,
  Sparkles,
  BarChart3,
  UserCheck,
  RefreshCw,
  ExternalLink,
  CheckSquare,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { lmsService } from "../../services/lmsService";

export const AdminAssignmentDetailHub = ({
  assignment,
  onBack,
  onUpdateAssignment,
}) => {
  const { showToast } = useToast();

  // Active top-level tab: 'statistics', 'activity', 'submissions', 'view'
  const [activeTab, setActiveTab] = useState("statistics");

  // Closeable section states for Statistics tab
  const [isStatsFilterOpen, setIsStatsFilterOpen] = useState(true);
  const [isAssignSectionOpen, setIsAssignSectionOpen] = useState(true);

  // Statistics filter checkboxes state
  const [statsFilters, setStatsFilters] = useState({
    startDateTime: false,
    endDateTime: false,
    id: false,
    studentName: true,
    score: true,
    questionScores: false,
    questionAnswers: false,
    scorePercentage: true,
    tagsPercentage: false,
  });
  const [statsSelectedStudent, setStatsSelectedStudent] = useState("all");

  // Activity tab filters
  const [activitySearch, setActivitySearch] = useState("");
  const [activityTypeFilter, setActivityTypeFilter] = useState("all");
  const [activityTimeFilter, setActivityTimeFilter] = useState("all");

  // Submissions tab sub-filter: 'pending', 'complete', 'unsubmitted'
  const [submissionSubTab, setSubmissionSubTab] = useState("pending");

  // Modals
  const [showAssignStudentModal, setShowAssignStudentModal] = useState(false);
  const [showAssignCourseModal, setShowAssignCourseModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [activeGradingSubmission, setActiveGradingSubmission] = useState(null);
  const [gradingScore, setGradingScore] = useState(18);
  const [gradingFeedback, setGradingFeedback] = useState("");

  // Assign to student modal state
  const [selectedStudentToAssign, setSelectedStudentToAssign] = useState("");
  const [assignDueDate, setAssignDueDate] = useState("2026-11-15");

  // Students list from lmsService
  const allStudents = useMemo(() => lmsService.getStudents(), []);

  // Mock activity entries matching MANAGE-ASSIGNMENT2Activity.png
  const [activitiesList, setActivitiesList] = useState([
    {
      id: "act-1",
      studentName: "Rahul Shende",
      studentAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      actionType: "started",
      title: `Student Rahul Shende started the assignment ${assignment.title}`,
      subtitle: `Student started assignment ${assignment.title}`,
      timeAgo: "15 mins ago",
    },
    {
      id: "act-2",
      studentName: "Operating Media",
      studentAvatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      actionType: "started",
      title: `Student Operating Media started the assignment ${assignment.title}`,
      subtitle: `Student started assignment ${assignment.title}`,
      timeAgo: "42 mins ago",
    },
    {
      id: "act-3",
      studentName: "admin",
      studentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      actionType: "submitted",
      title: `Student admin submitted the assignment ${assignment.title}`,
      subtitle: "Student submitted assignment",
      timeAgo: "2 hours ago",
    },
    {
      id: "act-4",
      studentName: "admin",
      studentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      actionType: "submitted",
      title: `Student admin submitted the assignment ${assignment.title}`,
      subtitle: "Student submitted assignment",
      timeAgo: "Yesterday at 6:20 PM",
    },
    {
      id: "act-5",
      studentName: "Umar Khan",
      studentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      actionType: "started",
      title: `Student Umar Khan started the assignment ${assignment.title}`,
      subtitle: `Student started assignment ${assignment.title}`,
      timeAgo: "2 days ago",
    },
    {
      id: "act-6",
      studentName: "admin",
      studentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      actionType: "started",
      title: `Student admin started the assignment ${assignment.title}`,
      subtitle: `Student started assignment ${assignment.title}`,
      timeAgo: "3 days ago",
    },
  ]);

  // Mock submissions matching MANAGE-ASSIGNMENT3Submissions.png
  const [submissions, setSubmissions] = useState([
    {
      id: "sub-1",
      studentId: "std-admin",
      studentName: "admin",
      studentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      status: "pending",
      submittedDate: "Feb 12, 2025 at 4:30 PM",
      fileName: "Operating-Media-Affiliate-Strategy-admin.pdf",
      score: null,
      feedback: "",
    },
    {
      id: "sub-2",
      studentId: "std-rahul",
      studentName: "Rahul Shende",
      studentAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      status: "pending",
      submittedDate: "Feb 12, 2025 at 2:15 PM",
      fileName: "Affiliate-Bridge-Page-Review-Rahul.docx",
      score: null,
      feedback: "",
    },
    {
      id: "sub-3",
      studentId: "std-umar",
      studentName: "Umar Khan",
      studentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      status: "completed",
      submittedDate: "Feb 11, 2025 at 11:20 AM",
      fileName: "Affiliate-Compliance-Checklist.pdf",
      score: 18,
      feedback: "Great comparison structure and FTC disclaimer inclusion.",
    },
    {
      id: "sub-4",
      studentId: "std-aditya",
      studentName: "Aditya Jadhav",
      studentAvatar: "/student_photo_266.jpg",
      status: "completed",
      submittedDate: "Feb 10, 2025 at 5:00 PM",
      fileName: "Aditya-Affiliate-Campaign-Plan.pdf",
      score: 19,
      feedback: "Exceptional breakdown of merchant commission structures.",
    },
    {
      id: "sub-5",
      studentId: "std-priya",
      studentName: "Priya Sharma",
      studentAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      status: "unsubmitted",
      submittedDate: null,
      fileName: null,
      score: null,
      feedback: "",
    },
    {
      id: "sub-6",
      studentId: "std-aarav",
      studentName: "Aarav Patel",
      studentAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      status: "unsubmitted",
      submittedDate: null,
      fileName: null,
      score: null,
      feedback: "",
    },
    {
      id: "sub-7",
      studentId: "std-om",
      studentName: "Operating Media",
      studentAvatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      status: "pending",
      submittedDate: "Feb 12, 2025 at 5:10 PM",
      fileName: "Omnichannel-Affiliate-Funnel.pdf",
      score: null,
      feedback: "",
    },
  ]);

  // Document view states
  const [viewCurrentPage, setViewCurrentPage] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([
    "Operating-Media-Privacy-Policy-1",
  ]);

  // Derived counts
  const totalSubmissionsCount = submissions.filter(
    (s) => s.status !== "unsubmitted",
  ).length;
  const maxScore = assignment.maxScore || 20;

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return activitiesList.filter((act) => {
      if (activitySearch.trim()) {
        const q = activitySearch.toLowerCase();
        const matchesName = act.studentName.toLowerCase().includes(q);
        const matchesTitle = act.title.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle) return false;
      }
      if (
        activityTypeFilter !== "all" &&
        act.actionType !== activityTypeFilter
      ) {
        return false;
      }
      return true;
    });
  }, [activitiesList, activitySearch, activityTypeFilter]);

  // Submissions filtered by status sub-tab
  const filteredSubmissions = useMemo(() => {
    if (submissionSubTab === "pending") {
      return submissions.filter((s) => s.status === "pending");
    }
    if (submissionSubTab === "complete") {
      return submissions.filter((s) => s.status === "completed");
    }
    return submissions.filter((s) => s.status === "unsubmitted");
  }, [submissions, submissionSubTab]);

  // Action handlers
  const handleGenerateStats = () => {
    const selectedCount = Object.values(statsFilters).filter(Boolean).length;
    showToast(
      `Generated detailed stats across ${selectedCount} selected parameters for ${statsSelectedStudent === "all" ? "All Students" : statsSelectedStudent}!`,
      "success",
      "Analytics Ready",
    );
  };

  const handleAssignToStudent = (e) => {
    e.preventDefault();
    if (!selectedStudentToAssign) {
      showToast("Please choose a student to assign", "warning");
      return;
    }
    const student = allStudents.find((s) => s.id === selectedStudentToAssign);
    showToast(
      `Assigned "${assignment.title}" to ${student?.name || "Student"} with due date ${assignDueDate}!`,
      "success",
      "Assignment Dispatched",
    );
    setShowAssignStudentModal(false);
  };

  const handleAssignToCourseStudents = () => {
    showToast(
      `Assignment "${assignment.title}" successfully assigned to all students enrolled in ${assignment.courseTitle || "this course"}!`,
      "success",
      "Course Enrolled Assigned",
    );
  };

  const handleOpenGradeModal = (sub) => {
    setActiveGradingSubmission(sub);
    setGradingScore(sub.score || 18);
    setGradingFeedback(
      sub.feedback || "Good analytical research and clean structure.",
    );
    setShowGradeModal(true);
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (!activeGradingSubmission) return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === activeGradingSubmission.id
          ? {
              ...s,
              status: "completed",
              score: Number(gradingScore),
              feedback: gradingFeedback,
            }
          : s,
      ),
    );
    // Add activity record
    const newAct = {
      id: `act-${Date.now()}`,
      studentName: activeGradingSubmission.studentName,
      studentAvatar: activeGradingSubmission.studentAvatar,
      actionType: "graded",
      title: `Admin evaluated assignment for ${activeGradingSubmission.studentName} (${gradingScore}/${maxScore})`,
      subtitle: "Evaluation completed",
      timeAgo: "Just now",
    };
    setActivitiesList([newAct, ...activitiesList]);

    showToast(
      `Graded ${activeGradingSubmission.studentName}: ${gradingScore}/${maxScore}`,
      "success",
    );
    setShowGradeModal(false);
  };

  const handleResubmit = () => {
    showToast(
      "Re-submission prompt sent to students. Allowed file formats: PDF, DOC, DOCX, PPT, PPTX, ZIP.",
      "info",
      "Re-submit Requested",
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ------------------------------------------------------------------ */}
      {/* BACK NAVIGATION BAR                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={16} />
          <span>Back to All Assignments</span>
        </button>

        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Course:{" "}
          <span className="text-[#3b49df] dark:text-blue-400 font-bold">
            {assignment.courseTitle || "Advanced Topics"}
          </span>
        </span>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN TOP HEADER - COHESIVE WITH DASHBOARD CARDS                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-wider">
            <CheckSquare size={15} />
            <span>PRACTICAL EVALUATION & ASSIGNMENT MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {assignment.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Created: {assignment.createdDate || "February 12, 2025"} • Due:{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {assignment.dueDate || "Upcoming"}
            </span>
          </p>
        </div>

        {/* Center action & Right Badges matching screenshot */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 inline-flex items-center space-x-2 transition-all cursor-pointer shadow-2xs"
          >
            <Upload size={15} className="text-slate-500 dark:text-slate-400" />
            <span>Upload Material</span>
          </button>

          <div className="flex items-center space-x-2 text-xs font-extrabold tabular-nums">
            <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200">
              {totalSubmissionsCount} Submissions
            </span>
            <span className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-3 py-2 rounded-xl text-amber-700 dark:text-amber-400">
              {maxScore} Max Pts
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4 PRIMARY TABS: Statistics | Activity | Submissions | View        */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center space-x-1 sm:space-x-2 border-b border-slate-200/80 dark:border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { key: "statistics", label: "Statistics", icon: BarChart3 },
          { key: "activity", label: "Activity", icon: Clock },
          { key: "submissions", label: "Submissions", icon: CheckCircle2 },
          { key: "view", label: "View Brief", icon: Eye },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                isActive
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <TabIcon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* TAB 1: STATISTICS (MANAGE-ASSIGNMENTS1Statistics.png)               */}
      {/* ================================================================== */}
      {activeTab === "statistics" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Card 1: Parameters Filter & Generate Stats */}
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsStatsFilterOpen(!isStatsFilterOpen)}
                className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer flex items-center space-x-1"
              >
                <span>{isStatsFilterOpen ? "CLOSE" : "EXPAND FILTERS"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isStatsFilterOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {isStatsFilterOpen && (
              <div className="space-y-4">
                {/* 2 Rows of Checkboxes matching MANAGE-ASSIGNMENTS1Statistics.png */}
                <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {/* Row 1 */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.startDateTime}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            startDateTime: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Start Date/Time</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.endDateTime}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            endDateTime: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>End Date/Time</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.id}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            id: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>ID</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.studentName}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            studentName: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Student Name</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.score}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            score: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Score</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.questionScores}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            questionScores: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Question scores (* for static quizzes only)</span>
                    </label>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-1">
                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.questionAnswers}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            questionAnswers: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>
                        Question Answers (* for static quizzes only, useful for
                        surveys)
                      </span>
                    </label>

                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.scorePercentage}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            scorePercentage: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Score Percentage</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                      <input
                        type="checkbox"
                        checked={statsFilters.tagsPercentage}
                        onChange={(e) =>
                          setStatsFilters({
                            ...statsFilters,
                            tagsPercentage: e.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Tags percentage</span>
                    </label>
                  </div>
                </div>

                {/* Dropdown: All students */}
                <div className="max-w-xs">
                  <select
                    value={statsSelectedStudent}
                    onChange={(e) => setStatsSelectedStudent(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#3b49df] cursor-pointer"
                  >
                    <option value="all">All students</option>
                    {allStudents.map((std) => (
                      <option key={std.id} value={std.name}>
                        {std.name} ({std.admissionNo})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generate Stats Button */}
                <button
                  type="button"
                  onClick={handleGenerateStats}
                  className="w-full bg-[#2563eb] hover:bg-[#d97706] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                >
                  Generate Stats
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Assign Action Buttons (Matching screenshot 1) */}
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsAssignSectionOpen(!isAssignSectionOpen)}
                className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer flex items-center space-x-1"
              >
                <span>{isAssignSectionOpen ? "CLOSE" : "EXPAND ASSIGN"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isAssignSectionOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {isAssignSectionOpen && (
              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAssignStudentModal(true)}
                  className="w-full bg-[#2563eb] hover:bg-[#d97706] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                >
                  Assign to student
                </button>

                <button
                  type="button"
                  onClick={handleAssignToCourseStudents}
                  className="w-full bg-[#2563eb] hover:bg-[#d97706] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                >
                  Assign to course students
                </button>
              </div>
            )}
          </div>

          {/* Card 3: Color legends & Distribution Chart & Summary */}
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Legend Badges matching MANAGE-ASSIGNMENTS1Statistics.png */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  {/* Red: Less than 25 */}
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-4 bg-[#e11d48] rounded-xs inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Less than 25
                    </span>
                  </div>

                  {/* Yellow: More than 25 Less than 50 */}
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-4 bg-[#eab308] rounded-xs inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">
                      More than 25 Less than 50
                    </span>
                  </div>

                  {/* Blue: More than 50 Less than 75 */}
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-4 bg-[#3b82f6] rounded-xs inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">
                      More than 50 Less than 75
                    </span>
                  </div>

                  {/* Green: More than 75 Less than 100 */}
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-4 bg-[#22c55e] rounded-xs inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">
                      More than 75 Less than 100
                    </span>
                  </div>
                </div>

                {/* Score bar chart graphic */}
                <div className="h-32 flex items-end space-x-8 pt-4 pl-4 border-l border-b border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col items-center space-y-1">
                    <div
                      className="w-10 bg-[#e11d48] rounded-t-sm transition-all"
                      style={{ height: "18px" }}
                    />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                      &lt;25
                    </span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div
                      className="w-10 bg-[#eab308] rounded-t-sm transition-all"
                      style={{ height: "35px" }}
                    />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                      25-50
                    </span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div
                      className="w-10 bg-[#3b82f6] rounded-t-sm transition-all"
                      style={{ height: "65px" }}
                    />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                      50-75
                    </span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div
                      className="w-10 bg-[#22c55e] rounded-t-sm transition-all"
                      style={{ height: "95px" }}
                    />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                      75-100
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Summary Statistics */}
              <div className="lg:w-72 space-y-3.5 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    Average Score
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white tabular-nums">
                    78.4%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    High Score
                  </span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    95.0%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    Low Score
                  </span>
                  <span className="font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
                    42.0%
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    Total Submissions
                  </span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                    {totalSubmissionsCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* TAB 2: ACTIVITY (MANAGE-ASSIGNMENT2Activity.png)                   */}
      {/* ================================================================== */}
      {activeTab === "activity" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 p-3 sm:p-4 rounded-2xl shadow-xs">
            <div className="relative flex-1">
              <input
                type="text"
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                placeholder="Type to search.."
                className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-2 text-xs focus:outline-hidden focus:border-[#3b49df]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={activityTypeFilter}
                onChange={(e) => setActivityTypeFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Actions</option>
                <option value="started">Started</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
              </select>

              <select
                value={activityTimeFilter}
                onChange={(e) => setActivityTimeFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="older">Older</option>
              </select>
            </div>
          </div>

          {/* Connected Activity Timeline (Exact matching screenshot 2) */}
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-xs">
            <div className="space-y-6 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />

              {filteredActivities.map((act, idx) => (
                <div
                  key={act.id}
                  className="flex items-start space-x-4 relative group"
                >
                  {/* Timeline node ring */}
                  <div className="relative z-10 flex items-center justify-center shrink-0 w-8 h-8">
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 ${
                        idx === 0
                          ? "border-amber-500 bg-amber-500/30"
                          : "border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800"
                      }`}
                    />
                  </div>

                  {/* Student Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                    <img
                      src={act.studentAvatar}
                      alt={act.studentName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                      }}
                    />
                  </div>

                  {/* Activity Details */}
                  <div className="space-y-0.5 flex-1 pt-0.5 min-w-0">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                      {act.subtitle}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-snug">
                      Student{" "}
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {act.studentName}
                      </span>{" "}
                      {act.actionType === "started"
                        ? "started the assignment"
                        : "submitted the assignment"}{" "}
                      <span className="font-medium text-slate-600 dark:text-slate-300">
                        {assignment.title}
                      </span>
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block pt-0.5">
                      {act.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* TAB 3: SUBMISSIONS (MANAGE-ASSIGNMENT3Submissions.png)              */}
      {/* ================================================================== */}
      {activeTab === "submissions" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Sub-Tabs: Pending evaluation | Evaluation complete | Unsubmitted */}
          <div className="flex items-center space-x-2 sm:space-x-3 border-b border-slate-200/80 dark:border-slate-800 pb-3 overflow-x-auto">
            <button
              onClick={() => setSubmissionSubTab("pending")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                submissionSubTab === "pending"
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Pending evaluation (
              {submissions.filter((s) => s.status === "pending").length})
            </button>

            <button
              onClick={() => setSubmissionSubTab("complete")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                submissionSubTab === "complete"
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Evaluation complete (
              {submissions.filter((s) => s.status === "completed").length})
            </button>

            <button
              onClick={() => setSubmissionSubTab("unsubmitted")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                submissionSubTab === "unsubmitted"
                  ? "bg-slate-900 dark:bg-slate-700 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Unsubmitted (
              {submissions.filter((s) => s.status === "unsubmitted").length})
            </button>
          </div>

          {/* Submissions List Container */}
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3 shadow-xs">
            {filteredSubmissions.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs font-medium">
                No submissions found under this filter.
              </div>
            ) : (
              filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                      <img
                        src={sub.studentAvatar}
                        alt={sub.studentName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {sub.studentName}
                      </h4>
                      {sub.fileName && (
                        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <FileText size={13} className="text-amber-500" />
                          <span className="truncate max-w-xs">
                            {sub.fileName}
                          </span>
                          {sub.submittedDate && (
                            <span className="text-slate-400 text-[11px]">
                              • {sub.submittedDate}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions / Score display */}
                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    {sub.status === "completed" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-lg tabular-nums">
                          {sub.score} / {maxScore} Marks
                        </span>
                        <button
                          onClick={() => handleOpenGradeModal(sub)}
                          className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline cursor-pointer"
                        >
                          Re-grade
                        </button>
                      </div>
                    )}

                    {sub.status === "pending" && (
                      <button
                        onClick={() => handleOpenGradeModal(sub)}
                        className="bg-[#2563eb] hover:bg-[#d97706] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs cursor-pointer"
                      >
                        Evaluate & Grade
                      </button>
                    )}

                    {sub.status === "unsubmitted" && (
                      <button
                        onClick={() =>
                          showToast(
                            `Reminder email dispatched to ${sub.studentName}`,
                            "info",
                          )
                        }
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                      >
                        Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* TAB 4: VIEW (MANAGE-ASSIGNMENT4view.png)                           */}
      {/* ================================================================== */}
      {activeTab === "view" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-150">
          {/* Main Left Document Area (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Toolbar matching screenshot 4 */}
            <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shadow-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    showToast("Downloading assignment document...", "info")
                  }
                  className="p-1 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  title="Download"
                >
                  <Download size={15} />
                </button>
                <button
                  onClick={() =>
                    showToast("Opening external document preview...", "info")
                  }
                  className="p-1 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  title="Open Externally"
                >
                  <ExternalLink size={15} />
                </button>
              </div>

              {/* Page indicator "1" from screenshot */}
              <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-md font-bold text-slate-800 dark:text-white tabular-nums">
                {viewCurrentPage}
              </div>
            </div>

            {/* Document Sheet Canvas matching screenshot 4 */}
            <div className="bg-white dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-xs max-w-2xl mx-auto space-y-5 font-sans leading-relaxed text-xs sm:text-sm">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight border-b border-slate-200 dark:border-slate-800 pb-2">
                What is Affiliate Marketing?
              </h2>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Understanding Affiliate Marketing
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Affiliate marketing is a performance-based marketing model
                  where you promote products or services of other companies and
                  earn a commission for each sale, click, or lead generated
                  through your unique affiliate link.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300 pt-1">
                  <li>
                    <strong>Affiliate:</strong> Promotes the merchant's
                    offerings and directs potential customers through unique
                    affiliate links or promo codes.
                  </li>
                  <li>
                    <strong>Merchant (or Advertiser):</strong> Provides
                    products, marketing materials, and commission structures.
                  </li>
                  <li>
                    <strong>Customer:</strong> Purchases through the affiliate's
                    link, resulting in a commission for the affiliate.
                  </li>
                </ul>
              </div>

              <div className="space-y-1.5 pt-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Key Drivers of Affiliate Marketing's Popularity in India
                </h3>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li>
                    <strong>Expanding E-commerce Market:</strong> India's online
                    shopper base continues to grow, creating abundant
                    opportunities for affiliates to recommend and showcase
                    products.
                  </li>
                  <li>
                    <strong>Tech-Savvy Population:</strong> The rise in
                    smartphone usage and internet accessibility makes it easier
                    for affiliates to reach potential buyers across devices and
                    regions.
                  </li>
                  <li>
                    <strong>Diverse Product Categories:</strong> From
                    electronics and fashion to financial services, affiliates
                    have numerous niches to explore, ensuring there's something
                    for everyone.
                  </li>
                </ol>
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  How Does It Work?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  By aligning with reputable brands and employing localized
                  strategies, affiliates in India can tap into a massive market
                  poised for continued expansion.
                </p>
              </div>
            </div>

            {/* Allowed file extensions text matching screenshot */}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2">
              Allowed File Extensions PDF DOC DOCX PPT PPTX ZIP
            </p>

            {/* Uploaded Files Section matching screenshot */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Uploaded Files
              </h4>

              {uploadedFiles.map((file, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 text-center text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors shadow-2xs"
                >
                  {file}
                </div>
              ))}

              {/* Full-width Re-submit button matching screenshot 4 */}
              <button
                type="button"
                onClick={handleResubmit}
                className="w-full bg-[#2563eb] hover:bg-[#d97706] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-center mt-3"
              >
                Re-submit
              </button>
            </div>
          </div>

          {/* Right Sidebar Card: Total Marks (20) & Unlimited time */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3 shadow-xs">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white block tracking-tight">
                {maxScore}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Total Marks
              </span>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block">
                  Unlimited time
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: ASSIGN TO STUDENT                                         */}
      {/* ------------------------------------------------------------------ */}
      {showAssignStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Assign to Student
              </h3>
              <button
                onClick={() => setShowAssignStudentModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={handleAssignToStudent}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Student
                </label>
                <select
                  required
                  value={selectedStudentToAssign}
                  onChange={(e) => setSelectedStudentToAssign(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-semibold focus:outline-hidden"
                >
                  <option value="">Choose an enrolled student...</option>
                  {allStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.admissionNo}) - {s.courseName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Deadline
                </label>
                <input
                  type="date"
                  value={assignDueDate}
                  onChange={(e) => setAssignDueDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-semibold focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAssignStudentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#d97706] text-white font-bold shadow-xs cursor-pointer"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: GRADE / EVALUATE SUBMISSION                               */}
      {/* ------------------------------------------------------------------ */}
      {showGradeModal && activeGradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Evaluate Submission
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Student: {activeGradingSubmission.studentName}
                </p>
              </div>
              <button
                onClick={() => setShowGradeModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Score (out of {maxScore})
                </label>
                <input
                  type="number"
                  min="0"
                  max={maxScore}
                  required
                  value={gradingScore}
                  onChange={(e) => setGradingScore(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-bold text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Evaluation Feedback & Remarks
                </label>
                <textarea
                  rows={3}
                  value={gradingFeedback}
                  onChange={(e) => setGradingFeedback(e.target.value)}
                  placeholder="Provide constructive feedback on the assignment submission..."
                  className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-hidden placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowGradeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#d97706] text-white font-bold shadow-xs cursor-pointer"
                >
                  Submit Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: UPLOAD ASSIGNMENT MATERIAL                                */}
      {/* ------------------------------------------------------------------ */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Upload Assignment Material
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
              <Upload size={28} className="mx-auto text-amber-500" />
              <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                Drag and drop files here, or browse
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                PDF, DOC, DOCX, PPT, PPTX, ZIP (Max 50MB)
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast("Material uploaded successfully!", "success");
                  setShowUploadModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#d97706] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAssignmentDetailHub;
