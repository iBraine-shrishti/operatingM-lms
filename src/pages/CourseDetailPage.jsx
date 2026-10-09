import React, { useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import {
  Star,
  Users,
  CheckCircle2,
  Play,
  Clock,
  ArrowLeft,
  Trash2,
  Camera,
  BookOpen,
  Video,
  FileText,
  CheckSquare,
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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

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
  const { isAdmin, isStudent, currentUser } = useAuth();
  const { showToast } = useToast();

  const courses = lmsService.getCourses();
  // Default to course matching id, or first course
  const course =
    courses.find((c) => c.id === id) ||
    courses.find((c) => c.title.toLowerCase().includes("social")) ||
    courses[0];

  const [units, setUnits] = useState(() =>
    lmsService.getUnitsByCourse(course.id),
  );
  const students = lmsService.getStudents();
  const reviews = lmsService.getReviews();

  const [searchParams] = useSearchParams();
  // Tab state: 'overview' 1st by default as requested, 'outline', 'notes', 'students'
  const [activeTab, setActiveTab] = useState(
    () => searchParams.get("tab") || "overview",
  );

  // Cover image customizable state matching "Change Cover" in course-outline.png
  const [coverImage, setCoverImage] = useState(
    course.thumbnail ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
  );
  const [showCoverModal, setShowCoverModal] = useState(false);

  // Module Accordion states - all closed by default
  const [expandedSections, setExpandedSections] = useState({});
  const [hiddenInfoSections, setHiddenInfoSections] = useState({});
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

  // Notes state
  const [notesList, setNotesList] = useState([
    {
      id: "n-1",
      date: "24 Sep 2026",
      lessonTag: "Viral Video Hooks",
      text: "Remember the 3-second hook rule: introduce the visual pattern interrupt before delivering the core proposition.",
    },
    {
      id: "n-2",
      date: "22 Sep 2026",
      lessonTag: "Content Pillars",
      text: "Topic Cluster model: 1 Core Pillar (Educational/Proof) feeding 4 secondary supporting posts each week.",
    },
  ]);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteTag, setNewNoteTag] = useState("Viral Video Hooks");
  const [courseNotesSearch, setCourseNotesSearch] = useState("");
  const [courseNotesFilterTag, setCourseNotesFilterTag] = useState("all");

  const filteredCourseNotes = useMemo(() => {
    return notesList.filter((note) => {
      if (courseNotesSearch.trim()) {
        const q = courseNotesSearch.toLowerCase();
        const matchesText = note.text?.toLowerCase().includes(q);
        const matchesTag = note.lessonTag?.toLowerCase().includes(q);
        if (!matchesText && !matchesTag) return false;
      }
      if (
        courseNotesFilterTag !== "all" &&
        note.lessonTag !== courseNotesFilterTag
      ) {
        return false;
      }
      return true;
    });
  }, [notesList, courseNotesSearch, courseNotesFilterTag]);

  // Group units by moduleName for Course Outline
  const sections = useMemo(() => {
    const map = new Map();
    units.forEach((u) => {
      const list = map.get(u.moduleName) || [];
      list.push(u);
      map.set(u.moduleName, list);
    });

    if (map.size === 0) {
      return [
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
            {
              id: "u-3",
              title: "03 Hands-on Strategy Plan & Pillar Creation",
              duration: "45:00",
              type: "assignment",
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
            {
              id: "u-5",
              title: "02 Optimization Checklist & Analytics Audit",
              duration: "18:00",
              type: "quiz",
              isCompleted: false,
            },
          ],
        },
      ];
    }

    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }, [units]);

  // Toggle completion of a unit
  const handleToggleCompletion = (unitId, e) => {
    e.stopPropagation();
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          const updated = !u.isCompleted;
          showToast(
            updated
              ? `Marked "${u.title}" as completed!`
              : `Marked "${u.title}" as incomplete`,
            "info",
          );
          return { ...u, isCompleted: updated };
        }
        return u;
      }),
    );
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
    const newNote = {
      id: `n-${Date.now()}`,
      date: "Today",
      lessonTag: newNoteTag,
      text: newNoteText.trim(),
    };
    setNotesList([newNote, ...notesList]);
    setNewNoteText("");
    showToast("Note saved to your course notebook!", "success");
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

  const toggleModuleInfo = (idx) => {
    setHiddenInfoSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalActivitiesCount = units.length || 16;
  const completedActivitiesCount = units.filter((u) => u.isCompleted).length;
  const progressPercent = Math.round(
    (completedActivitiesCount / (totalActivitiesCount || 1)) * 100,
  );

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVIGATION BAR matching course-outline.png                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 bg-white dark:bg-[#0b1329] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-start sm:items-center space-x-3.5">
          <button
            onClick={() => navigate("/courses")}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            title="Back to Courses"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                Course outline
              </h2>
              <button
                onClick={() =>
                  showToast(
                    "Course outline lets you structure modules, schedule drip releases, and configure activities.",
                    "info",
                    "Course Outline Guide",
                  )
                }
                className="inline-flex items-center space-x-1 text-xs text-slate-400 dark:text-slate-500 font-medium hover:text-[#3b49df] dark:hover:text-blue-400 cursor-pointer shrink-0"
              >
                <span>Learn more</span>
                <Info size={13} />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal max-w-xl">
              Develop your course outline and contents and set up the drip feed
              to schedule lesson delivery.
            </p>
          </div>
        </div>

        {/* Right Action Button matching course-outline.png */}
        <div className="flex items-center space-x-2.5 shrink-0 self-start md:self-auto">
          <button
            onClick={() => navigate(`/lesson-player?courseId=${course.id}`)}
            className="px-5 py-2 rounded-xl bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Play size={13} className="fill-white" />
            <span>Preview & Learn</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* WIDE COVER BANNER & INSET AVATAR matching course-outline.png  */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Cover Image Container with Change Cover button */}
        <div className="relative h-48 sm:h-56 md:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src={coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Change Cover Pill Button (Admin only) */}
          {isAdmin && (
            <button
              onClick={() => setShowCoverModal(true)}
              className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs backdrop-blur-xs transition-all flex items-center space-x-1.5 cursor-pointer z-10"
            >
              <Camera size={14} className="text-[#3b49df] dark:text-blue-400" />
              <span>Change Cover</span>
            </button>
          )}
        </div>

        {/* Header Body: Inset Circular Badge + Title + Instructor + Stat Chips */}
        <div className="px-5 sm:px-8 pb-6 pt-3 bg-white dark:bg-[#0b1329]">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 -mt-10 sm:-mt-12 mb-5">
            {/* Inset Circular Avatar matching course-outline.png */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-3.5 sm:gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 xl:w-28 xl:h-28 rounded-full ring-4 ring-white dark:ring-[#0b1329] shadow-md bg-white dark:bg-[#0b1329] overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&auto=format&fit=crop&q=80"
                  alt="Operating Media Masterclass"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pb-1 min-w-0">
                <span className="inline-block bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-blue-200/80 dark:border-blue-800/60 mb-1.5">
                  {course.category}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {course.title}
                </h1>
              </div>
            </div>

            {/* Instructor Credit on Right Side matching course-outline.png */}
            <div className="flex items-center space-x-3 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-2.5 rounded-xl shrink-0 self-start xl:self-auto">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                alt="Nilkamal Mukharjee"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-2xs shrink-0"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  Instructor: Nilkamal Mukharjee
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  tonystark@lms.com
                </p>
              </div>
            </div>
          </div>

          {/* Clean Stat Chips Row matching course-outline.png */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {/* Chip 1: Total Modules */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-blue-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center space-x-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#3b49df] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Layers size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                  Total Modules
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  0{sections.length}
                </span>
              </div>
            </div>

            {/* Chip 2: Activities */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-emerald-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center space-x-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Play size={18} className="fill-current translate-x-0.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                  Activities
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {totalActivitiesCount}
                </span>
              </div>
            </div>

            {/* Chip 3: Course Level */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-purple-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center space-x-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Star size={18} className="fill-current" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                  Course Level
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  Beginner
                </span>
              </div>
            </div>

            {/* Chip 4: Verified Certificate */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 hover:bg-amber-50/20 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center space-x-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Award size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                  Credential
                </span>
                <span className="text-base font-extrabold text-amber-700 dark:text-amber-400">
                  Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TABS HEADER: Overview (1st) | Course Outline | Notes          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 p-1.5 shadow-2xs flex space-x-1 sm:space-x-2 overflow-x-auto custom-scrollbar">
        {[
          { key: "overview", label: "Overview", icon: BookOpen },
          { key: "outline", label: "Course Outline", icon: Layers },
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
              className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                isActive
                  ? "bg-[#3b49df] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon
                size={14}
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
                Course Outline & Modules ({sections.length})
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
              const isInfoHidden = hiddenInfoSections[sIdx] === true;

              // Calculate module included activities
              const videoCount =
                section.items.filter(
                  (i) =>
                    i.type === "video" ||
                    (!i.type && !i.duration?.includes("Quiz")),
                ).length || 2;
              const readingCount =
                section.items.filter((i) => i.type === "reading").length || 1;
              const assignmentCount =
                section.items.filter((i) => i.type === "assignment").length ||
                1;
              const quizCount =
                section.items.filter((i) => i.type === "quiz").length || 1;

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
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Description & What's included block matching course-outline.png */}
                      {!isInfoHidden && (
                        <div className="space-y-3.5 bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 rounded-2xl">
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            In this foundational module, students will be
                            introduced to the core principles and practical
                            frameworks behind {section.name}. The module
                            explores comprehensive step-by-step execution,
                            industry standard metrics, and practical campaign
                            creation.
                          </p>

                          {/* "What's included" row with icons matching course-outline.png */}
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                              What's included
                            </span>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-lg shadow-2xs">
                                <Video
                                  size={14}
                                  className="text-blue-600 dark:text-blue-400"
                                />
                                <span>{videoCount} videos</span>
                              </div>
                              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-lg shadow-2xs">
                                <BookOpen
                                  size={14}
                                  className="text-emerald-600 dark:text-emerald-400"
                                />
                                <span>{readingCount} readings</span>
                              </div>
                              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-lg shadow-2xs">
                                <FileText
                                  size={14}
                                  className="text-amber-600 dark:text-amber-400"
                                />
                                <span>{assignmentCount} assignments</span>
                              </div>
                              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-lg shadow-2xs">
                                <CheckSquare
                                  size={14}
                                  className="text-purple-600 dark:text-purple-400"
                                />
                                <span>{quizCount} Quiz</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hide/Show info toggle link matching course-outline.png */}
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleModuleInfo(sIdx)}
                          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center space-x-1 cursor-pointer"
                        >
                          <span>
                            {isInfoHidden
                              ? "Show info about module content"
                              : "Hide info about module content"}
                          </span>
                          <ChevronDown
                            size={14}
                            className={isInfoHidden ? "" : "rotate-180"}
                          />
                        </button>
                      </div>

                      {/* Module Lessons List */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0b1329] shadow-2xs">
                        {section.items.map((item, iIdx) => {
                          const isAss = item.type === "assignment";
                          const isQuiz =
                            item.type === "quiz" ||
                            item.title.toLowerCase().includes("quiz");
                          const isReading = item.type === "reading";

                          return (
                            <div
                              key={item.id}
                              onClick={() =>
                                navigate(
                                  `/lesson-player?courseId=${course.id}&unitId=${item.id}`,
                                )
                              }
                              className="p-4 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center space-x-3.5 truncate">
                                {/* Type icon */}
                                <div
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                                    isAss
                                      ? "bg-amber-50 dark:bg-amber-950/60 border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-400"
                                      : isQuiz
                                        ? "bg-purple-50 dark:bg-purple-950/60 border-purple-200/80 dark:border-purple-800/60 text-purple-700 dark:text-purple-400"
                                        : isReading
                                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400"
                                          : "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/60 text-[#3b49df] dark:text-blue-400"
                                  }`}
                                >
                                  {isAss ? (
                                    <FileText size={15} />
                                  ) : isQuiz ? (
                                    <HelpCircle size={15} />
                                  ) : isReading ? (
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
                                    {isAss && (
                                      <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 px-2 py-0.5 rounded-full shrink-0">
                                        Assignment
                                      </span>
                                    )}
                                    {isQuiz && (
                                      <span className="text-[10px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 px-2 py-0.5 rounded-full shrink-0">
                                        Quiz
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                                    {item.duration || "15:00"} • Practical
                                    walkthrough
                                  </span>
                                </div>
                              </div>

                              {/* Completion toggle checkmark circle */}
                              <div className="flex items-center space-x-3 shrink-0">
                                {isAdmin && isAss && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        `/manage-assignments?title=${encodeURIComponent(item.title)}`,
                                      );
                                    }}
                                    className="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 transition-colors cursor-pointer shrink-0"
                                    title="Manage Assignment Portal"
                                  >
                                    Manage
                                  </button>
                                )}
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
      {/* TAB 2: OVERVIEW                                               */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 1. STARTING BRACKET TEXT CALLOUT (Course Introduction) */}
            {course.bracketText && (
              <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/20 border border-blue-200/80 dark:border-blue-800/60 rounded-2xl p-6 shadow-xs relative overflow-hidden">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Info size={20} />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                      Course Introduction & Focus
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {course.bracketText}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. OVERVIEW GREETING & DETAILS */}
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2">
                  About this Specialization
                </h3>
                {course.overview?.greeting && (
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {course.overview.greeting}
                  </p>
                )}
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {course.description || course.bracketText}
                </p>
              </div>

              {/* 3. KEY HIGHLIGHTS / WHY CHOOSE THIS COURSE (ICONS, NO EMOJIS) */}
              {course.overview?.highlights &&
                course.overview.highlights.length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3.5">
                      {course.overview.whyChooseUsTitle ||
                        "Key Highlights & Advantages"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {course.overview.highlights.map((h, i) => {
                        const IconComp =
                          OVERVIEW_ICONS[h.iconName] || CheckCircle2;
                        return (
                          <div
                            key={i}
                            className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700/60 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                              <IconComp size={16} />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                {h.title}
                              </h4>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                {h.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* 4. CONSULTATION & CONTACT CTA */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      Need Career Counseling or a Free Demo Class?
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {course.overview?.callToAction ||
                        "Schedule a 1:1 consultation or counseling session with our expert trainers."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center space-x-2 text-slate-200">
                    <Phone size={14} className="text-blue-400" />
                    <span>Call / WhatsApp:</span>
                    <span className="font-bold text-white tracking-wide">
                      {course.overview?.contact?.phone ||
                        "7700022882 / 9326474007"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-200">
                    <Globe size={14} className="text-blue-400" />
                    <span>Official Portal:</span>
                    <span className="font-bold text-white underline">
                      {course.overview?.contact?.website ||
                        "www.operatingmedia.com"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: COURSE CREDENTIALS */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Course Credentials
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Instructor
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {course.author}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Duration
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {course.duration}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Curriculum Modules
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {sections.length} Modules
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Total Units / Lessons
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {units.length} Items
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Rating
                  </span>
                  <span className="font-semibold text-amber-500 flex items-center space-x-1">
                    <Star size={13} className="fill-current" />
                    <span>
                      {course.rating} ({course.reviewsCount} reviews)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Enrolled
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {course.studentsCount} Students
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
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
                {sections.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredCourseNotes.length === 0 ? (
              <div className="p-8 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  No matching notes found
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Try adjusting your search terms or filter.
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
              filteredCourseNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-[#3b49df] dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 px-2 py-0.5 rounded-full">
                        {note.lessonTag}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {note.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                      {note.text}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setNotesList((prev) =>
                        prev.filter((n) => n.id !== note.id),
                      );
                      showToast("Note deleted", "info");
                    }}
                    className="p-1 text-slate-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 rounded transition-colors cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
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
      {/* CHANGE COVER MODAL                                            */}
      {/* ------------------------------------------------------------- */}
      {showCoverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Choose Course Cover Banner
              </h3>
              <button
                onClick={() => setShowCoverModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Select one of our curated high-resolution covers or enter an image
              URL:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
              ].map((imgUrl, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCoverImage(imgUrl);
                    setShowCoverModal(false);
                    showToast("Course cover updated successfully!", "success");
                  }}
                  className="h-24 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-[#3b49df] dark:hover:border-blue-500 cursor-pointer transition-all relative group shadow-2xs"
                >
                  <img
                    src={imgUrl}
                    alt="Cover option"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold bg-black/60 px-2.5 py-0.5 rounded-full">
                      Cover {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCoverModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
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
