import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import {
  Users,
  CheckCircle2,
  Play,
  Clock,
  ArrowLeft,
  Trash2,
  Edit,
  BookOpen,
  FileText,
  HelpCircle,
  Sparkles,
  MoreVertical,
  Eye,
  Settings,
  Plus,
  Upload,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
  Layers,
  Award,
  X,
  MessageSquare,
  BookMarked,
  UserCheck,
  Check,
  Sparkle,
  Search,
  TrendingUp,
  BarChart3,
  Target,
  ShieldCheck,
  Laptop,
  Cpu,
  Phone,
  Globe,
  Lock,
  CheckSquare,
  Copy,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { AssessmentCard } from "../components/student/AssessmentCard";

const OVERVIEW_ICONS = {
  Sparkles,
  Target,
  Layers,
  Laptop,
  Users,
  Award,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Search,
  Cpu,
  CheckCircle2,
  Check,
  BookOpen,
  Clock,
  FileText,
  Phone,
  Globe,
};

export const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, isStudent, currentUser, assignedCourseIds } = useAuth();
  const { showToast } = useToast();

  const courses = lmsService.getCourses();
  // Default to course matching id, or first course
  const course =
    courses.find((c) => c.id === id) ||
    courses.find((c) => c.title.toLowerCase().includes("social")) ||
    courses[0];

  const hasCourseAccess =
    isAdmin ||
    !assignedCourseIds ||
    assignedCourseIds.length === 0 ||
    assignedCourseIds.includes(course.id);

  const [units, setUnits] = useState(() =>
    lmsService.getUnitsByCourse(course.id),
  );
  const students = lmsService.getStudents();
  const reviews = lmsService.getReviews();

  const [searchParams] = useSearchParams();
  // Tab state: 'overview' 1st by default as requested, 'outline', 'assessments', 'notes', 'students'
  const [activeTab, setActiveTab] = useState(
    () => searchParams.get("tab") || "overview",
  );
  const [assessmentFilter, setAssessmentFilter] = useState("all"); // 'all' | 'quizzes' | 'assignments'

  // Module Accordion states - all closed by default
  const [expandedSections, setExpandedSections] = useState({});
  const [activeMenuIdx, setActiveMenuIdx] = useState(null);

  // AI Tutor / Activity helper modal
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);

  // Announcements state
  const [announcements, setAnnouncements] = useState([
    {
      id: "ann-1",
      title: "Upcoming Live Q&A Session on Meta Ads & Campaign Scaling",
      date: "Yesterday at 4:30 PM",
      author: "Operating Media Faculty",
      tag: "Live Masterclass",
      content:
        "Join our senior digital marketing strategist this Saturday at 11:00 AM IST for a live campaign walkthrough on Meta Advantage+ budget setup and ROAS optimization. Meeting link has been shared via email.",
    },
    {
      id: "ann-2",
      title:
        "New Case Study Added to Influencer Marketing & Contract Templates",
      date: "3 days ago",
      author: "Curriculum Team",
      tag: "Curriculum Update",
      content:
        "We have uploaded 3 new barter contract agreements and influencer rate calculation sheets under Influencer Marketing Assignment-2.",
    },
  ]);
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnContent, setNewAnnContent] = useState("");
  const [showAnnForm, setShowAnnForm] = useState(false);

  // QnA state
  const [qnaList, setQnaList] = useState([
    {
      id: "q-1",
      author: "Aarav Patel",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      date: "2 days ago",
      title:
        "How do we track affiliate conversions without server-side cookies?",
      question:
        "With third-party cookie restrictions, how can we reliably attribute conversions in our custom digital marketing campaign funnels?",
      upvotes: 6,
      replies: [
        {
          author: "Operating Media Faculty",
          role: "Instructor",
          date: "1 day ago",
          text: "Great question Aarav! You should use server-to-server (S2S) postback URLs or First-Party Click IDs passed directly into your campaign query strings.",
        },
      ],
    },
    {
      id: "q-2",
      author: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      date: "4 days ago",
      title: "Social Media Content Calendar Assignment Submission Format",
      question:
        "Should the 30-day content calendar be submitted as a Google Sheets link or an exported PDF with design mockups?",
      upvotes: 4,
      replies: [
        {
          author: "Admin Team",
          role: "Admin",
          date: "3 days ago",
          text: "Both Google Sheets with public view access or an exported PDF are acceptable. Please make sure the content pillars are clearly labeled.",
        },
      ],
    },
  ]);
  const [newQTitle, setNewQTitle] = useState("");
  const [newQBody, setNewQBody] = useState("");
  const [showQnaModal, setShowQnaModal] = useState(false);
  const [replyInput, setReplyInput] = useState({});

  const studentId =
    currentUser?.crmAdmissionId || currentUser?.id || "375";

  // Notes state - fully connected to lmsService and per-student database
  const [allNotes, setAllNotes] = useState(() =>
    lmsService.getNotes(studentId),
  );
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteTag, setNewNoteTag] = useState("");
  const [courseNotesSearch, setCourseNotesSearch] = useState("");
  const [courseNotesFilterTag, setCourseNotesFilterTag] = useState("all");
  const [copiedNoteId, setCopiedNoteId] = useState(null);

  // Fetch live student notes from backend on mount and student change
  useEffect(() => {
    lmsService.fetchStudentNotes(studentId, course?.id).then((live) => {
      if (live) setAllNotes(live);
    });
  }, [studentId, course?.id]);

  // Sync notes across tabs and actions
  useEffect(() => {
    const handleSync = () => setAllNotes(lmsService.getNotes(studentId));
    window.addEventListener("lms_notes_changed", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("lms_notes_changed", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [studentId]);

  // Filter notes belonging to this course
  const courseNotes = useMemo(() => {
    if (!course) return [];
    return allNotes.filter((n) => {
      const nCId = String(n.courseId || "").trim();
      const cId = String(course.id || "").trim();
      const nTitle = (n.courseTitle || "").trim().toLowerCase();
      const cTitle = (course.title || "").trim().toLowerCase();
      if (nCId && cId && nCId === cId) return true;
      if (nTitle && cTitle && (nTitle === cTitle || nTitle.includes(cTitle) || cTitle.includes(nTitle))) return true;
      return false;
    });
  }, [allNotes, course]);

  const [assessmentsVersion, setAssessmentsVersion] = useState(0);

  // Group units by moduleName for Course Outline
  const sections = useMemo(() => {
    const map = new Map();
    units.forEach((u) => {
      if (u.type === "quiz" || u.type === "assignment") return;
      const list = map.get(u.moduleName) || [];
      list.push(u);
      map.set(u.moduleName, list);
    });

    let result = [];
    if (map.size === 0) {
      result = [
        {
          name: "Introduction & Core Strategy Framework",
          items: [
            {
              id: "u-1",
              title: "01 Overview & Channel Architecture Setup",
              duration: "15:00",
              type: "video",
              isCompleted: true,
            },
            {
              id: "u-2",
              title: "02 Key Performance Metrics & Organic KPIs",
              duration: "20:00",
              type: "reading",
              isCompleted: false,
            },
          ],
        },
        {
          name: "Campaign Execution & Growth Scaling",
          items: [
            {
              id: "u-4",
              title: "01 Live Campaign Launch Walkthrough",
              duration: "28:00",
              type: "video",
              isCompleted: false,
            },
          ],
        },
      ];
    } else {
      result = Array.from(map.entries()).map(([name, items]) => ({ name, items }));
    }

    return result;
  }, [units]);

  // Set default module tag when sections load
  useEffect(() => {
    if (sections.length > 0 && !newNoteTag) {
      setNewNoteTag(sections[0].name);
    }
  }, [sections, newNoteTag]);

  // Available tags in this course (modules + existing notes tags)
  const availableNoteTags = useMemo(() => {
    const set = new Set();
    sections.forEach((s) => s.name && set.add(s.name));
    courseNotes.forEach((n) => {
      const tag = n.lessonTag || n.lessonTitle;
      if (tag) set.add(tag);
    });
    return Array.from(set);
  }, [sections, courseNotes]);

  // Filtered course notes
  const filteredCourseNotes = useMemo(() => {
    return courseNotes.filter((note) => {
      if (courseNotesSearch.trim()) {
        const q = courseNotesSearch.toLowerCase();
        const matchesText = (note.text || note.content || "").toLowerCase().includes(q);
        const matchesTag = (note.lessonTag || note.lessonTitle || "").toLowerCase().includes(q);
        if (!matchesText && !matchesTag) return false;
      }
      if (courseNotesFilterTag !== "all") {
        const tag = note.lessonTag || note.lessonTitle;
        if (tag !== courseNotesFilterTag) return false;
      }
      return true;
    });
  }, [courseNotes, courseNotesSearch, courseNotesFilterTag]);

  // Separate Entities: Course Quizzes & Assignments
  const courseQuizzes = useMemo(() => {
    return lmsService.getQuizzes().filter((q) => q.courseId === course.id);
  }, [course.id, assessmentsVersion]);

  const courseAssignments = useMemo(() => {
    return lmsService.getAssignments().filter((a) => a.courseId === course.id);
  }, [course.id, assessmentsVersion]);

  const allQuizzesCount = useMemo(() => lmsService.getQuizzes().length, [assessmentsVersion]);
  const allAssignmentsCount = useMemo(() => lmsService.getAssignments().length, [assessmentsVersion]);

  // Toggle completion of a unit, test, or assignment
  const handleToggleCompletion = (itemId, e) => {
    e.stopPropagation();
    const unitExists = units.some((u) => u.id === itemId);
    if (unitExists) {
      const targetUnit = units.find((u) => u.id === itemId);
      const updated = !targetUnit?.isCompleted;
      lmsService.updateUnit(itemId, { isCompleted: updated });
      setUnits((prev) =>
        prev.map((u) => {
          if (u.id === itemId) {
            return { ...u, isCompleted: updated };
          }
          return u;
        }),
      );
      showToast(
        updated
          ? `Marked "${targetUnit?.title || 'Lesson'}" as completed!`
          : `Marked "${targetUnit?.title || 'Lesson'}" as incomplete`,
        "info",
      );
      return;
    }

    const quiz = lmsService.getQuizById(itemId);
    if (quiz) {
      const isPassed = quiz.studentStatus === "passed";
      const newStatus = isPassed ? "pending" : "passed";
      lmsService.updateQuiz(itemId, {
        studentStatus: newStatus,
        studentScore: newStatus === "passed" ? 100 : null,
      });
      setAssessmentsVersion((v) => v + 1);
      showToast(
        !isPassed
          ? `Marked test "${quiz.title}" as completed!`
          : `Marked test "${quiz.title}" as incomplete`,
        "info",
      );
      return;
    }

    const assignments = lmsService.getAssignments();
    const assignment = assignments.find((a) => a.id === itemId);
    if (assignment) {
      const isDone = assignment.status === "submitted" || assignment.status === "graded";
      const newStatus = isDone ? "pending" : "submitted";
      lmsService.updateAssignment(itemId, {
        status: newStatus,
      });
      setAssessmentsVersion((v) => v + 1);
      showToast(
        !isDone
          ? `Marked assignment "${assignment.title}" as completed!`
          : `Marked assignment "${assignment.title}" as incomplete`,
        "info",
      );
      return;
    }
  };

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;
    const newAnn = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      date: "Just now",
      author: currentUser.name || "Operating Media Faculty",
      tag: "Announcement",
      content: newAnnContent.trim(),
    };
    setAnnouncements([newAnn, ...announcements]);
    setNewAnnTitle("");
    setNewAnnContent("");
    setShowAnnForm(false);
    showToast("Announcement posted successfully!", "success");
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!newQTitle.trim() || !newQBody.trim()) return;
    const newQ = {
      id: `q-${Date.now()}`,
      author: currentUser.name || "Student",
      avatar:
        currentUser.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      date: "Just now",
      title: newQTitle.trim(),
      question: newQBody.trim(),
      upvotes: 1,
      replies: [],
    };
    setQnaList([newQ, ...qnaList]);
    setNewQTitle("");
    setNewQBody("");
    setShowQnaModal(false);
    showToast(
      "Your question has been posted to the course Q&A board!",
      "success",
    );
  };

  const handleAddReply = (qId) => {
    const text = replyInput[qId]?.trim();
    if (!text) return;
    setQnaList((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          return {
            ...q,
            replies: [
              ...q.replies,
              {
                author: currentUser.name || "Instructor",
                role: isAdmin ? "Instructor" : "Peer",
                date: "Just now",
                text,
              },
            ],
          };
        }
        return q;
      }),
    );
    setReplyInput((prev) => ({ ...prev, [qId]: "" }));
    showToast("Reply submitted!", "success");
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const tagToUse = newNoteTag || (sections[0]?.name) || "General Notes";
    lmsService.addNote({
      studentId,
      studentName: currentUser?.name || currentUser?.fullName || "",
      courseId: course.id,
      courseTitle: course.title,
      category: course.category || "General",
      lessonTitle: tagToUse,
      lessonTag: tagToUse,
      content: newNoteText.trim(),
      text: newNoteText.trim(),
      date: "Today",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    setAllNotes(lmsService.getNotes(studentId));
    setNewNoteText("");
    showToast("Note saved to your course notebook!", "success");
  };

  const handleDeleteNote = (noteId) => {
    lmsService.deleteNote(noteId, studentId);
    setAllNotes(lmsService.getNotes(studentId));
    showToast("Note deleted", "info");
  };

  const handleCopyNote = (text, id) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedNoteId(id);
    showToast("Note copied to clipboard!", "success");
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  const toggleSection = (idx) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleExpandAll = () => {
    const all = {};
    sections.forEach((_, idx) => {
      all[idx] = true;
    });
    setExpandedSections(all);
  };

  const handleCollapseAll = () => {
    setExpandedSections({});
  };

  const allActivities = useMemo(() => {
    return sections.flatMap((sec) => sec.items || []);
  }, [sections]);

  const totalActivitiesCount = allActivities.length || units.length || 16;
  const totalVideosCount = useMemo(() => {
    const vids = allActivities.filter((item) => {
      const isQuiz = item.type === "quiz" || Boolean(item.quizId);
      const isAss = item.type === "assignment" || Boolean(item.assignmentId);
      const isReading = item.type === "reading";
      return !isQuiz && !isAss && !isReading;
    });
    return vids.length || course.lessonsCount || 10;
  }, [allActivities, course.lessonsCount]);
  const completedActivitiesCount = allActivities.filter((u) => u.isCompleted).length;
  const progressPercent = Math.round(
    (completedActivitiesCount / (totalActivitiesCount || 1)) * 100,
  );

  const courseInformationText = useMemo(() => {
    if (
      !course.bracketText ||
      course.bracketText.includes("content ideas") ||
      course.bracketText.includes("ready-to-use posts") ||
      course.bracketText.includes("Let me know the industry") ||
      course.bracketText.includes("Have questions about this course")
    ) {
      return "Gain comprehensive, practical knowledge of social media marketing and digital campaigns. This course covers step-by-step campaign setup, targeted audience reach, budget optimization, and conversion tracking across Meta, LinkedIn, Quora, and Twitter/X.";
    }
    return course.bracketText;
  }, [course.bracketText]);

  const courseDescriptionText = useMemo(() => {
    let desc = course.description || "";
    desc = desc.replace(
      /Are you looking for social media marketing content ideas or do you need ready-to-use posts for your brand\? Let me know the industry or business type, and I'll craft engaging content for your audience!\s*/gi,
      "",
    );
    if (!desc.trim()) {
      return "Master modern social media marketing with practical frameworks, industry standard metrics, and hands-on campaign execution across Facebook, Instagram, LinkedIn, Quora, and Twitter/X.";
    }
    return desc;
  }, [course.description]);

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVIGATION BAR matching course-outline.png                */}
      {/* ------------------------------------------------------------- */}
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVIGATION BAR                                            */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-white dark:bg-[#0b1329] px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/courses")}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            title="Back to Courses"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                Course Details
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal max-w-xl line-clamp-1">
              View curriculum, watch video lessons, and track your learning progress.
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center space-x-2 shrink-0 self-start md:self-auto">
            <button
              onClick={() => navigate(`/create-course?edit=${course.id}`)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
              title="Edit course in Course Builder"
            >
              <Edit size={13} />
              <span>Edit Course</span>
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COURSE HEADER CARD (Banner removed)                            */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 mb-4">
          {/* Course Thumbnail Image */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs bg-slate-100 dark:bg-slate-800">
            <img
              src={
                course.image ||
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&auto=format&fit=crop&q=80"
              }
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className="inline-block bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200/80 dark:border-blue-800/60">
                {course.category}
              </span>
              {course.tag && (
                <span className="inline-block bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-purple-200/80 dark:border-purple-800/60">
                  {course.tag}
                </span>
              )}
            </div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Stats Chips & Simplified Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5">
            {/* Chip 1: Total Modules */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-blue-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2 sm:p-2.5 flex items-center space-x-2.5 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#3b49df] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Layers size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                  Total Modules
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {String(sections.length).padStart(2, "0")} Modules
                </span>
              </div>
            </div>

            {/* Chip 2: Total Videos (Replaced Activities) */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-lg p-2 sm:p-2.5 flex items-center space-x-2.5 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Play size={15} className="fill-current translate-x-0.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                  Total Videos
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {totalVideosCount} Videos
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: Enrolled vs Restricted */}
          {hasCourseAccess ? (
            <button
              onClick={() => navigate(`/lesson-player?courseId=${course.id}`)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
            >
              <Play size={14} className="fill-white" />
              <span>
                {completedActivitiesCount > 0
                  ? "Continue Learning"
                  : "Start Learning"}
              </span>
            </button>
          ) : (
            <button
              disabled
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center space-x-2 cursor-not-allowed"
              title="Course access managed in Operating Media CRM"
            >
              <Lock size={14} />
              <span>Access Restricted in CRM</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TABS HEADER: Overview (1st) | Modules & Lessons | Notes       */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-md rounded-xl border border-slate-200/80 dark:border-slate-800 p-1 shadow-2xs flex space-x-1 sm:space-x-1.5 overflow-x-auto custom-scrollbar">
        {[
          { key: "overview", label: "Overview", icon: BookOpen },
          { key: "outline", label: "Modules & Lessons", icon: Layers },
          { key: "notes", label: "Notes", icon: BookMarked },
          ...(isAdmin
            ? [
                {
                  key: "students",
                  label: `Enrolled Students (${students.length})`,
                  icon: UserCheck,
                },
              ]
            : []),
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                isActive
                  ? "bg-[#3b49df] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon
                size={13}
                className={
                  isActive ? "text-white" : "text-slate-400 dark:text-slate-500"
                }
              />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: COURSE OUTLINE (EXACTLY matching course-outline.png)   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "outline" && (
        <div className="space-y-6">
          {/* Progress Summary Banner: Clean Distinct Milestone Card */}
          <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-[#0b1329] border border-blue-200/80 dark:border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#3b49df] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Course Progress:{" "}
                  <span className="text-[#3b49df] dark:text-blue-400">
                    {completedActivitiesCount}
                  </span>{" "}
                  of {totalActivitiesCount} activities completed
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Complete all modules to unlock your official Operating Media
                  certificate.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-56 shrink-0">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                <span>Completion Status</span>
                <span className="text-[#3b49df] dark:text-blue-400 font-black tabular-nums">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3b49df] to-[#5068f2] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Module List Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Modules & Lessons ({sections.length} Modules)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any module header to expand its lessons and activities.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <button
                type="button"
                onClick={handleExpandAll}
                className="font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Expand all
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Collapse all
              </button>
            </div>
          </div>

          {/* Module List matching course-outline.png */}
          <div className="space-y-4">
            {sections.map((section, sIdx) => {
              const isExpanded = Boolean(expandedSections[sIdx]);

              return (
                <div
                  key={section.name + sIdx}
                  className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden transition-all"
                >
                  {/* Module Header Bar matching course-outline.png */}
                  <div
                    onClick={() => toggleSection(sIdx)}
                    className="p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/40 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center space-x-3.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(sIdx);
                        }}
                        className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <ChevronUp
                            size={20}
                            className="text-[#3b49df] dark:text-blue-400"
                          />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>

                      <div className="flex items-center space-x-2.5">
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {String(sIdx + 1).padStart(2, "0")} {section.name}
                        </span>
                      </div>
                    </div>

                    {/* Right side: 3-dot dropdown menu matching course-outline.png (Admin Only) */}
                    {isAdmin && (
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() =>
                            setActiveMenuIdx(
                              activeMenuIdx === sIdx ? null : sIdx,
                            )
                          }
                          className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit section options"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Menu matching course-outline.png */}
                        {activeMenuIdx === sIdx && (
                          <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#0b1329] rounded-xl shadow-xl border border-slate-200/90 dark:border-slate-800 py-2 z-30 animate-in fade-in">
                            <button
                              onClick={() => {
                                setActiveMenuIdx(null);
                                showToast(
                                  `Editing section: ${section.name}`,
                                  "info",
                                );
                              }}
                              className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                            >
                              <Settings
                                size={14}
                                className="text-slate-400 dark:text-slate-500"
                              />
                              <span>Edit Section</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenuIdx(null);
                                navigate(
                                  `/lesson-player?courseId=${course.id}`,
                                );
                              }}
                              className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                            >
                              <Play
                                size={14}
                                className="text-slate-400 dark:text-slate-500"
                              />
                              <span>Preview Section</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenuIdx(null);
                                showToast(`Add activity dialog opened`, "info");
                              }}
                              className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                            >
                              <Plus
                                size={14}
                                className="text-slate-400 dark:text-slate-500"
                              />
                              <span>Add Activity</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenuIdx(null);
                                showToast(
                                  `Upload module content started`,
                                  "info",
                                );
                              }}
                              className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#3b49df] dark:hover:text-blue-400 flex items-center space-x-2.5"
                            >
                              <Upload
                                size={14}
                                className="text-slate-400 dark:text-slate-500"
                              />
                              <span>Upload Material</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenuIdx(null);
                                setShowAiModal(true);
                              }}
                              className="w-full px-4 py-2 text-left text-xs font-semibold text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 flex items-center space-x-2.5 border-t border-slate-100 dark:border-slate-800"
                            >
                              <Sparkles
                                size={14}
                                className="text-purple-600 dark:text-purple-400"
                              />
                              <span>Ai Assistant</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded Section Content */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5">
                      {/* Module Lessons List */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0b1329] shadow-2xs">
                        {section.items.map((item, iIdx) => {
                          const isReading = item.type === "reading";

                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                navigate(
                                  `/lesson-player?courseId=${course.id}&unitId=${item.id}`,
                                );
                              }}
                              className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center space-x-3.5 truncate">
                                {/* Type icon */}
                                <div
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                                    isReading
                                      ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400"
                                      : "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/60 text-[#3b49df] dark:text-blue-400"
                                  }`}
                                >
                                  {isReading ? (
                                    <BookOpen size={15} />
                                  ) : (
                                    <Play
                                      size={14}
                                      className="fill-current translate-x-0.5"
                                    />
                                  )}
                                </div>

                                <div className="truncate">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#3b49df] dark:group-hover:text-blue-400 transition-colors truncate">
                                      {item.title}
                                    </span>
                                    {isReading && (
                                      <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-full shrink-0">
                                        Reading Material
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                                    {item.duration || "15:00"} • Practical walkthrough
                                  </span>
                                </div>
                              </div>

                              {/* Completion toggle checkmark circle */}
                              <div className="flex items-center space-x-3 shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleToggleCompletion(item.id, e)
                                  }
                                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                  title={
                                    item.isCompleted
                                      ? "Mark as incomplete"
                                      : "Mark as complete"
                                  }
                                >
                                  {item.isCompleted ? (
                                    <CheckCircle2
                                      size={20}
                                      className="text-emerald-600 dark:text-emerald-400 fill-emerald-50 dark:fill-emerald-950/60"
                                    />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-[#3b49df] dark:group-hover:border-blue-400 transition-colors" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Action buttons row matching course-outline.png (Admin Only) */}
                      {isAdmin && (
                        <div className="pt-2 flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              showToast(
                                `Activity creation opened for: ${section.name}`,
                                "info",
                              );
                            }}
                            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-[#3b49df] dark:hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
                          >
                            <Plus size={14} />
                            <span>Add activity</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              showToast(`Upload module content started`, "info")
                            }
                            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                          >
                            <Upload
                              size={14}
                              className="text-slate-500 dark:text-slate-400"
                            />
                            <span>Upload activity</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              showToast(
                                `Importing shared curriculum library`,
                                "info",
                              )
                            }
                            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                          >
                            <Download
                              size={14}
                              className="text-slate-500 dark:text-slate-400"
                            />
                            <span>Import activity</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAiModal(true)}
                            className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs ml-auto cursor-pointer"
                          >
                            <Sparkles
                              size={14}
                              className="text-purple-600 dark:text-purple-400"
                            />
                            <span>Create activity with AI</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: QUIZZES & ASSIGNMENTS (DEDICATED INDEPENDENT ENTITY)     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "assessments" && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-purple-50/40 dark:from-slate-900 dark:via-blue-950/40 dark:to-indigo-950/30 border border-blue-200/80 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start sm:items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#3b49df] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckSquare size={22} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Quizzes & Practical Assignments
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-[#3b49df] dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/60">
                    Independent Assessments
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Assessments mapped to {course.title}. Managed as dedicated entities outside curriculum lecture modules.
                </p>
              </div>
            </div>

            {/* Assessment Counter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs shadow-2xs flex items-center space-x-1.5">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Quizzes:</span>
                <span className="font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
                  {courseQuizzes.length}
                </span>
                <span className="text-[10px] text-slate-400">
                  ({courseQuizzes.filter((q) => q.studentStatus === "passed").length} passed)
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs shadow-2xs flex items-center space-x-1.5">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Assignments:</span>
                <span className="font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                  {courseAssignments.length}
                </span>
                <span className="text-[10px] text-slate-400">
                  ({courseAssignments.filter((a) => a.status === "graded" || a.status === "submitted").length} submitted)
                </span>
              </div>
            </div>
          </div>

          {/* Filter Bar: All / Quizzes / Assignments */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 flex-wrap">
            <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => setAssessmentFilter("all")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  assessmentFilter === "all"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All ({courseQuizzes.length + courseAssignments.length})
              </button>
              <button
                type="button"
                onClick={() => setAssessmentFilter("quizzes")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  assessmentFilter === "quizzes"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Quizzes ({courseQuizzes.length})
              </button>
              <button
                type="button"
                onClick={() => setAssessmentFilter("assignments")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  assessmentFilter === "assignments"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Assignments ({courseAssignments.length})
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => navigate("/my-quizzes")}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <span>All Quizzes ({allQuizzesCount})</span>
                <ArrowLeft size={12} className="rotate-180" />
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={() => navigate("/my-assignments")}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <span>All Assignments ({allAssignmentsCount})</span>
                <ArrowLeft size={12} className="rotate-180" />
              </button>
            </div>
          </div>

          {/* QUIZZES SECTION */}
          {(assessmentFilter === "all" || assessmentFilter === "quizzes") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <HelpCircle size={16} className="text-purple-600 dark:text-purple-400" />
                    <span>Course Quizzes ({courseQuizzes.length})</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Timed multiple-choice tests evaluating conceptual mastery.
                  </p>
                </div>
              </div>

              {courseQuizzes.length === 0 ? (
                <div className="p-8 bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                    <HelpCircle size={20} />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    No Direct Quizzes for This Course
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    No specific quiz is assigned directly under this course ID. You can practice general digital marketing quizzes in your quiz dashboard.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/my-quizzes")}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 mt-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Browse All My Quizzes</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseQuizzes.map((quiz) => (
                    <AssessmentCard
                      key={quiz.id}
                      type="quiz"
                      data={quiz}
                      onAction={(q) => navigate(`/take-quiz/${q.id}`)}
                      onSecondaryAction={(q) => navigate(`/take-quiz/${q.id}`)}
                      onTertiaryAction={(q) => navigate(`/take-quiz/${q.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ASSIGNMENTS SECTION */}
          {(assessmentFilter === "all" || assessmentFilter === "assignments") && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <FileText size={16} className="text-amber-600 dark:text-amber-400" />
                    <span>Practical Assignments & Projects ({courseAssignments.length})</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Real-world briefs, submissions, and portfolio projects evaluated by Operating Media faculty.
                  </p>
                </div>
              </div>

              {courseAssignments.length === 0 ? (
                <div className="p-8 bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                    <FileText size={20} />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    No Direct Assignments for This Course
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    No specific assignment is assigned directly under this course ID. You can check all institute assignments in your assignment portal.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/my-assignments")}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 mt-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Browse All My Assignments</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseAssignments.map((assignment) => (
                    <AssessmentCard
                      key={assignment.id}
                      type="assignment"
                      data={assignment}
                      onAction={(a) => navigate(`/take-assignment/${a.id}`)}
                      onSecondaryAction={(a) => navigate(`/take-assignment/${a.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: OVERVIEW                                               */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            {/* 1. STARTING BRACKET TEXT CALLOUT (Course Information) */}
            <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/20 border border-blue-200/80 dark:border-blue-800/60 rounded-xl p-3.5 sm:p-4 shadow-2xs relative overflow-hidden">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Info size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    Course Information
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {courseInformationText}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. OVERVIEW GREETING & DETAILS */}
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">
                  About this Specialization
                </h3>
                {course.overview?.greeting && (
                  <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {course.overview.greeting}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {courseDescriptionText}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: COURSE CREDENTIALS */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Course Credentials
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Duration
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {course.duration}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Curriculum Modules
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {sections.length} Modules
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Total Units / Lessons
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {units.length} Items
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Enrolled
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {course.studentsCount} Students
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Certificate
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Official Operating Media Credential
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: NOTES                                                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              My Course Notebook
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Capture personal notes, timestamps, and strategies while learning.
            </p>
          </div>

          <form
            onSubmit={handleSaveNote}
            className="p-5 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Add a Quick Note
              </label>
              <select
                value={newNoteTag}
                onChange={(e) => setNewNoteTag(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-hidden"
              >
                {sections.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              rows={3}
              required
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Type your notes here..."
              className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df] focus:bg-white dark:focus:bg-[#0b1329]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs font-semibold px-5 py-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                Save Note
              </button>
            </div>
          </form>

          {/* Course Notebook Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-2.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
              />
              <input
                type="text"
                value={courseNotesSearch}
                onChange={(e) => setCourseNotesSearch(e.target.value)}
                placeholder="Search notes in this course..."
                className="w-full pl-9 pr-8 py-2 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
              />
              {courseNotesSearch && (
                <button
                  onClick={() => setCourseNotesSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="sm:w-60">
              <select
                value={courseNotesFilterTag}
                onChange={(e) => setCourseNotesFilterTag(e.target.value)}
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] cursor-pointer"
              >
                <option value="all">All Modules & Tags</option>
                {availableNoteTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredCourseNotes.length === 0 ? (
              <div className="p-8 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {courseNotes.length === 0
                    ? "You haven't added any notes for this course yet."
                    : "No matching notes found"}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {courseNotes.length === 0
                    ? "Use the form above to capture key insights, timestamps, or strategies."
                    : "Try adjusting your search terms or filter."}
                </p>
                {(courseNotesSearch || courseNotesFilterTag !== "all") && (
                  <button
                    onClick={() => {
                      setCourseNotesSearch("");
                      setCourseNotesFilterTag("all");
                    }}
                    className="text-xs text-[#3b49df] dark:text-blue-400 hover:underline font-semibold"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            ) : (
              filteredCourseNotes.map((note) => {
                const noteText = note.text || note.content || "";
                const noteTag = note.lessonTag || note.lessonTitle || "General";
                const noteDate = note.date || note.createdAt || "Recently";
                const isCopied = copiedNoteId === note.id;

                return (
                  <div
                    key={note.id}
                    className="p-4 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4 group hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-[#3b49df] dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 px-2.5 py-0.5 rounded-full">
                          {noteTag}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                          {noteDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-line break-words">
                        {noteText}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => handleCopyNote(noteText, note.id)}
                        className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-[#3b49df] dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                        title="Copy Note"
                      >
                        {isCopied ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 text-slate-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30"
                        title="Delete Note"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6 (ADMIN ONLY): ENROLLED STUDENTS                         */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "students" && isAdmin && (
        <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Enrolled Learners & Performance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {students.map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {s.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                      {s.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold tabular-nums text-[#3b49df] dark:text-blue-400 block">
                    {s.overallProgress}%
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ------------------------------------------------------------- */}
      {/* AI ACTIVITY / TUTOR ASSISTANT MODAL                            */}
      {/* ------------------------------------------------------------- */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
                <Sparkles size={18} />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  AI Curriculum Assistant
                </h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Prompt our AI curriculum engine to draft video outlines, practice
              assignments, or interactive quizzes:
            </p>

            <textarea
              rows={4}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Generate 5 multiple-choice questions on Instagram Reels organic reach algorithm..."
              className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-purple-600"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAiGenerating(true);
                  setTimeout(() => {
                    setAiGenerating(false);
                    setShowAiModal(false);
                    showToast(
                      "AI drafted 3 new interactive practice questions for this module!",
                      "success",
                      "AI Generation Complete",
                    );
                  }, 1200);
                }}
                disabled={aiGenerating}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Sparkles size={14} />
                <span>
                  {aiGenerating ? "Generating..." : "Generate Activity"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
