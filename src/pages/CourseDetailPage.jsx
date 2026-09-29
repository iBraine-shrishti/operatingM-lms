import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lmsService } from '../services/lmsService';
import {
  Star, Users, CheckCircle2, Play, Clock, ArrowLeft, Trash2, Camera,
  BookOpen, Video, FileText, CheckSquare, HelpCircle, Sparkles,
  MoreVertical, Eye, Settings, Plus, Upload, Download, Info, ChevronDown, ChevronUp, Layers, Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { DoodleStar, DoodleHeart, DoodleCloud, DoodleBurst, CheerfulBadge } from '../components/common/CheerfulDoodles';

export const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, isStudent, currentUser } = useAuth();
  const { showToast } = useToast();

  const courses = lmsService.getCourses();
  // Default to course-3 (Advanced Topics) or first course if not found
  const course = courses.find(c => c.id === id) ||
    courses.find(c => c.title.toLowerCase().includes('advanced')) ||
    courses[0];

  const [units, setUnits] = useState(() => lmsService.getUnitsByCourse(course.id));
  const students = lmsService.getStudents();
  const reviews = lmsService.getReviews();

  // Tab state: 'outline' (default matching course-outline.png), 'overview', 'announcements', 'qna', 'notes', 'students'
  const [activeTab, setActiveTab] = useState('outline');

  // Cover image customizable state matching "Change Cover" in course-outline.png
  const [coverImage, setCoverImage] = useState(
    course.thumbnail ||
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'
  );
  const [showCoverModal, setShowCoverModal] = useState(false);

  // Module Accordion states
  const [expandedSections, setExpandedSections] = useState({ 0: true, 1: true });
  const [hiddenInfoSections, setHiddenInfoSections] = useState({});
  const [activeMenuIdx, setActiveMenuIdx] = useState(null);

  // AI Tutor / Activity helper modal
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // Announcements state
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      title: 'Upcoming Live Q&A Session on Affiliate Networks & CPA Models',
      date: 'Yesterday at 4:30 PM',
      author: 'Operating Media Faculty',
      tag: 'Live Masterclass',
      content:
        'Join our senior digital strategist this Saturday at 11:00 AM IST for a live campaign walkthrough on ShareASale and Amazon Associates API setup. Meeting link has been shared via email.'
    },
    {
      id: 'ann-2',
      title: 'New Case Study Added to Influencer Marketing & Contract Templates',
      date: '3 days ago',
      author: 'Curriculum Team',
      tag: 'Curriculum Update',
      content:
        'We have uploaded 3 new barter contract agreements and influencer rate calculation sheets under Influencer Marketing Assignment-2.'
    }
  ]);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [showAnnForm, setShowAnnForm] = useState(false);

  // QnA state
  const [qnaList, setQnaList] = useState([
    {
      id: 'q-1',
      author: 'Aarav Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      date: '2 days ago',
      title: 'How do we track affiliate conversions without server-side cookies?',
      question:
        'With third-party cookie restrictions, how can we reliably attribute conversions in our custom Affiliate Marketing bridge pages?',
      upvotes: 6,
      replies: [
        {
          author: 'Operating Media Faculty',
          role: 'Instructor',
          date: '1 day ago',
          text:
            'Great question Aarav! You should use server-to-server (S2S) postback URLs or First-Party Click IDs (like s1/subID parameters) passed directly into your bridge page query strings.'
        }
      ]
    },
    {
      id: 'q-2',
      author: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      date: '4 days ago',
      title: 'Content Marketing Assignment-1 Submission format',
      question:
        'Should the 90-day pillar content plan be submitted as a Google Sheets link or an exported PDF with calendar views?',
      upvotes: 4,
      replies: [
        {
          author: 'Admin Team',
          role: 'Admin',
          date: '3 days ago',
          text:
            'Both Google Sheets with public view access or an exported PDF are acceptable. Please make sure the pillar topic clusters are clearly color-coded.'
        }
      ]
    }
  ]);
  const [newQTitle, setNewQTitle] = useState('');
  const [newQBody, setNewQBody] = useState('');
  const [showQnaModal, setShowQnaModal] = useState(false);
  const [replyInput, setReplyInput] = useState({});

  // Notes state
  const [notesList, setNotesList] = useState([
    {
      id: 'n-1',
      date: '24 Sep 2026',
      lessonTag: 'Affiliate Marketing',
      text:
        'Remember to always check CPA payout tiers and cookies retention window (30 days vs 90 days) before running paid traffic to affiliate bridge funnels.'
    },
    {
      id: 'n-2',
      date: '22 Sep 2026',
      lessonTag: 'Content Marketing',
      text:
        'Topic Cluster model: 1 Pillar page (3,000+ words) linking internally to 6-8 cluster sub-articles targeting long-tail queries.'
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('Affiliate Marketing');

  // Group units by moduleName for Course Outline
  const sections = useMemo(() => {
    const map = new Map();
    units.forEach(u => {
      const list = map.get(u.moduleName) || [];
      list.push(u);
      map.set(u.moduleName, list);
    });

    if (map.size === 0) {
      return [
        {
          name: 'Introduction & Core Fundamentals',
          items: [
            { id: 'u-1', title: '01 Overview & Architecture Setup', duration: '15:00', type: 'video', isCompleted: true },
            { id: 'u-2', title: '02 Key Performance Metrics & KPIs', duration: '20:00', type: 'reading', isCompleted: false },
            { id: 'u-3', title: '03 Hands-on Assignment & Strategy Plan', duration: '45:00', type: 'assignment', isCompleted: false }
          ]
        },
        {
          name: 'Execution & Campaign Management',
          items: [
            { id: 'u-4', title: '01 Live Campaign Launch Walkthrough', duration: '28:00', type: 'video', isCompleted: false },
            { id: 'u-5', title: '02 Optimization Checklist & Audit', duration: '18:00', type: 'quiz', isCompleted: false }
          ]
        }
      ];
    }

    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }, [units]);

  // Toggle completion of a unit
  const handleToggleCompletion = (unitId, e) => {
    e.stopPropagation();
    setUnits(prev =>
      prev.map(u => {
        if (u.id === unitId) {
          const updated = !u.isCompleted;
          showToast(updated ? `Marked "${u.title}" as completed! 🌟` : `Marked "${u.title}" as incomplete`, 'info');
          return { ...u, isCompleted: updated };
        }
        return u;
      })
    );
  };

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;
    const newAnn = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      date: 'Just now',
      author: currentUser.name || 'Operating Media Faculty',
      tag: 'Announcement',
      content: newAnnContent.trim()
    };
    setAnnouncements([newAnn, ...announcements]);
    setNewAnnTitle('');
    setNewAnnContent('');
    setShowAnnForm(false);
    showToast('Announcement posted successfully!', 'success');
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!newQTitle.trim() || !newQBody.trim()) return;
    const newQ = {
      id: `q-${Date.now()}`,
      author: currentUser.name || 'Student',
      avatar:
        currentUser.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      date: 'Just now',
      title: newQTitle.trim(),
      question: newQBody.trim(),
      upvotes: 1,
      replies: []
    };
    setQnaList([newQ, ...qnaList]);
    setNewQTitle('');
    setNewQBody('');
    setShowQnaModal(false);
    showToast('Your question has been posted to the course Q&A board!', 'success');
  };

  const handleAddReply = (qId) => {
    const text = replyInput[qId]?.trim();
    if (!text) return;
    setQnaList(prev =>
      prev.map(q => {
        if (q.id === qId) {
          return {
            ...q,
            replies: [
              ...q.replies,
              {
                author: currentUser.name || 'Instructor',
                role: isAdmin ? 'Instructor' : 'Peer',
                date: 'Just now',
                text
              }
            ]
          };
        }
        return q;
      })
    );
    setReplyInput(prev => ({ ...prev, [qId]: '' }));
    showToast('Reply submitted!', 'success');
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const newNote = {
      id: `n-${Date.now()}`,
      date: 'Today',
      lessonTag: newNoteTag,
      text: newNoteText.trim()
    };
    setNotesList([newNote, ...notesList]);
    setNewNoteText('');
    showToast('Note saved to your course notebook!', 'success');
  };

  const toggleSection = (idx) => {
    setExpandedSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleModuleInfo = (idx) => {
    setHiddenInfoSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalActivitiesCount = units.length || 16;
  const completedActivitiesCount = units.filter(u => u.isCompleted).length;

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVIGATION BAR matching course-outline.png                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center space-x-3 truncate">
          <button
            onClick={() => navigate('/manage-courses')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
            title="Back to Courses"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="space-y-0.5 truncate">
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
                Course outline
              </h2>
              <span className="hidden sm:inline-flex items-center space-x-1 text-xs text-slate-400 font-medium">
                <Info size={13} />
                <span>Learn more</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal truncate max-w-xl">
              Develop your course outline and contents and set up the drip feed to schedule lesson delivery.
            </p>
          </div>
        </div>

        {/* Right Action Buttons matching course-outline.png */}
        <div className="flex items-center space-x-2.5 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => showToast('Drip feed schedule active. Lessons are released on milestone pace!', 'info', 'Drip Feed')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-2xs"
          >
            <Clock size={14} className="text-slate-500" />
            <span>Deep Feed</span>
          </button>
          <button
            onClick={() => navigate(`/lesson-player?courseId=${course.id}`)}
            className="px-5 py-2 rounded-xl bg-[#0d7a5f] hover:bg-teal-800 text-white text-xs font-medium transition-all shadow-xs flex items-center space-x-1.5"
          >
            <Play size={13} className="fill-white" />
            <span>Preview & Learn</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* WIDE COVER BANNER & INSET AVATAR matching course-outline.png  */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Cover Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 w-full bg-gradient-to-r from-teal-900 via-slate-800 to-indigo-900 overflow-hidden">
          <img
            src={coverImage}
            alt={course.title}
            className="w-full h-full object-cover opacity-85"
          />

          {/* Cheerful subtle doodle stickers floating in cover matching our-courses.png */}
          <DoodleStar className="w-10 h-10 absolute top-4 left-6 -rotate-12 pointer-events-none opacity-85 drop-shadow-md" />
          <DoodleHeart className="w-8 h-8 absolute bottom-6 right-36 rotate-12 pointer-events-none opacity-85 drop-shadow-md" />
          <DoodleCloud className="w-14 h-10 absolute top-4 right-32 -rotate-6 pointer-events-none opacity-85 drop-shadow-md hidden sm:block" />

          {/* Change Cover Pill Button matching course-outline.png */}
          <button
            onClick={() => setShowCoverModal(true)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 text-xs font-medium px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-xs backdrop-blur-xs transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Camera size={14} className="text-slate-600" />
            <span>Change Cover</span>
          </button>
        </div>

        {/* Header Body with Inset Circular Avatar */}
        <div className="px-6 sm:px-8 pb-7 pt-4 bg-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
            {/* Inset Circular Avatar matching course-outline.png */}
            <div className="flex items-end space-x-4">
              <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full ring-4 ring-white shadow-lg bg-white overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Operating Media Faculty"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pb-1">
                <span className="inline-block bg-teal-50 text-teal-800 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-teal-200/80 mb-1">
                  {course.category}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
                  {course.title}
                </h1>
              </div>
            </div>

            {/* Instructor Credit on Right Side matching course-outline.png */}
            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                alt="Tony Stark"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-2xs"
              />
              <div>
                <p className="text-xs font-semibold text-slate-900 leading-snug">
                  Instructor: Tony Stark
                </p>
                <p className="text-[11px] text-slate-400 font-normal">
                  tonystark@lms.com
                </p>
              </div>
            </div>
          </div>

          {/* Cheerful Stat Chips Row matching course-outline.png */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
            {/* Chip 1: Total Modules */}
            <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-3 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Layers size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-sky-700 tracking-wider block">
                  Total Modules
                </span>
                <span className="text-base font-semibold text-slate-900 tabular-nums">
                  0{sections.length}
                </span>
              </div>
            </div>

            {/* Chip 2: Activities */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0d7a5f] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Play size={18} className="fill-white translate-x-0.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-emerald-800 tracking-wider block">
                  Activities
                </span>
                <span className="text-base font-semibold text-slate-900 tabular-nums">
                  {totalActivitiesCount}
                </span>
              </div>
            </div>

            {/* Chip 3: Course Level */}
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Star size={18} className="fill-white" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-purple-800 tracking-wider block">
                  Course Level
                </span>
                <span className="text-base font-semibold text-slate-900">
                  Beginner
                </span>
              </div>
            </div>

            {/* Chip 4: Verified Certificate */}
            <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-amber-800 tracking-wider block">
                  Credential
                </span>
                <span className="text-base font-semibold text-slate-900">
                  Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TABS HEADER: Course Outline | Overview | Announcements | QnA  */}
      {/* ------------------------------------------------------------- */}
      <div className="border-b border-slate-200 flex space-x-6 overflow-x-auto custom-scrollbar">
        {[
          { key: 'outline', label: 'Course Outline' },
          { key: 'overview', label: 'Overview' },
          { key: 'announcements', label: 'Announcements & News' },
          { key: 'qna', label: 'QnA' },
          { key: 'notes', label: 'Notes' },
          ...(isAdmin ? [{ key: 'students', label: `Enrolled Students (${students.length})` }] : [])
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`pb-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === t.key
                ? 'border-[#0d7a5f] text-[#0d7a5f] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: COURSE OUTLINE (EXACTLY matching course-outline.png)   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'outline' && (
        <div className="space-y-6">
          {/* Cheerful Progress Summary Banner */}
          <div className="bg-[#fbf7f4] border border-[#f0e6de] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center space-x-3">
              <DoodleBurst className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Your Progress: {completedActivitiesCount} of {totalActivitiesCount} activities completed
                </p>
                <p className="text-[11px] text-slate-500 font-normal">
                  Complete all modules to unlock your official Operating Media certificate!
                </p>
              </div>
            </div>
            <div className="w-full sm:w-48">
              <div className="w-full h-2 bg-white rounded-full border border-slate-200 overflow-hidden">
                <div
                  className="h-full bg-[#0d7a5f] rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((completedActivitiesCount / totalActivitiesCount) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Module List matching course-outline.png */}
          <div className="space-y-4">
            {sections.map((section, sIdx) => {
              const isExpanded = expandedSections[sIdx] !== false;
              const isInfoHidden = hiddenInfoSections[sIdx] === true;

              // Calculate module included activities
              const videoCount = section.items.filter(i => i.type === 'video' || (!i.type && !i.duration?.includes('Quiz'))).length || 2;
              const readingCount = section.items.filter(i => i.type === 'reading').length || 1;
              const assignmentCount = section.items.filter(i => i.type === 'assignment').length || 1;
              const quizCount = section.items.filter(i => i.type === 'quiz').length || 1;

              return (
                <div
                  key={section.name + sIdx}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  {/* Module Header Bar matching course-outline.png */}
                  <div
                    onClick={() => toggleSection(sIdx)}
                    className="p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/60 cursor-pointer transition-colors border-b border-slate-100"
                  >
                    <div className="flex items-center space-x-3.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); toggleSection(sIdx); }}
                        className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>

                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                          {String(sIdx + 1).padStart(2, '0')} {section.name}
                        </h3>
                      </div>
                    </div>

                    {/* Right side: 3-dot dropdown menu matching course-outline.png */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveMenuIdx(activeMenuIdx === sIdx ? null : sIdx)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu from screenshot: Edit, Settings, Preview, Add, Upload, Ai Assistant */}
                      {activeMenuIdx === sIdx && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-30 animate-in fade-in">
                          <button
                            onClick={() => { setActiveMenuIdx(null); showToast(`Editing section: ${section.name}`, 'info'); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5"
                          >
                            <Settings size={14} className="text-slate-400" />
                            <span>Edit Section</span>
                          </button>
                          <button
                            onClick={() => { setActiveMenuIdx(null); navigate(`/lesson-player?courseId=${course.id}`); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5"
                          >
                            <Play size={14} className="text-slate-400" />
                            <span>Preview Section</span>
                          </button>
                          <button
                            onClick={() => { setActiveMenuIdx(null); showToast(`Add activity dialog opened`, 'info'); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5"
                          >
                            <Plus size={14} className="text-slate-400" />
                            <span>Add Activity</span>
                          </button>
                          <button
                            onClick={() => { setActiveMenuIdx(null); showToast(`Upload module content`, 'info'); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5"
                          >
                            <Upload size={14} className="text-slate-400" />
                            <span>Upload Material</span>
                          </button>
                          <button
                            onClick={() => { setActiveMenuIdx(null); setShowAiModal(true); }}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-purple-700 hover:bg-purple-50 flex items-center space-x-2.5 border-t border-slate-100"
                          >
                            <Sparkles size={14} className="text-purple-600" />
                            <span>Ai Assistant</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Section Content */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Description & What's included block matching course-outline.png */}
                      {!isInfoHidden && (
                        <div className="space-y-3.5 bg-slate-50/70 border border-slate-200/70 p-4 sm:p-5 rounded-2xl">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            In this foundational module, students will be introduced to the core principles and practical frameworks behind {section.name}. The module explores comprehensive step-by-step execution, industry standard metrics, and practical campaign creation.
                          </p>

                          {/* "What's included" row with icons matching course-outline.png */}
                          <div>
                            <span className="text-xs font-semibold text-slate-900 block mb-2">
                              What's included
                            </span>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                              <div className="flex items-center space-x-1.5">
                                <Video size={14} className="text-slate-500" />
                                <span>{videoCount} videos</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <BookOpen size={14} className="text-slate-500" />
                                <span>{readingCount} readings</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <FileText size={14} className="text-slate-500" />
                                <span>{assignmentCount} assignments</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <CheckSquare size={14} className="text-slate-500" />
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
                          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center space-x-1"
                        >
                          <span>{isInfoHidden ? 'Show info about module content' : 'Hide info about module content'}</span>
                          <ChevronDown size={14} className={isInfoHidden ? '' : 'rotate-180'} />
                        </button>
                      </div>

                      {/* Module Lessons List */}
                      <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
                        {section.items.map((item, iIdx) => {
                          const isAss = item.type === 'assignment';
                          const isQuiz = item.type === 'quiz' || item.title.toLowerCase().includes('quiz');

                          return (
                            <div
                              key={item.id}
                              onClick={() => navigate(`/lesson-player?courseId=${course.id}&unitId=${item.id}`)}
                              className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center space-x-3.5 truncate">
                                {/* Type icon */}
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                  isAss ? 'bg-amber-100 text-amber-800' :
                                  isQuiz ? 'bg-purple-100 text-purple-800' :
                                  'bg-teal-100 text-teal-800'
                                }`}>
                                  {isAss ? <FileText size={15} /> : isQuiz ? <HelpCircle size={15} /> : <Play size={14} className="fill-current" />}
                                </div>

                                <div className="truncate">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-[#0d7a5f] transition-colors truncate">
                                      {item.title}
                                    </span>
                                    {isAss && (
                                      <span className="text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
                                        Assignment
                                      </span>
                                    )}
                                    {isQuiz && (
                                      <span className="text-[10px] font-medium bg-purple-50 text-purple-800 border border-purple-200/80 px-2 py-0.5 rounded-full shrink-0">
                                        Quiz
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-slate-400 font-normal">
                                    {item.duration || '15:00'} • Practical walkthrough
                                  </span>
                                </div>
                              </div>

                              {/* Completion toggle checkmark circle */}
                              <div className="flex items-center space-x-3 shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleCompletion(item.id, e)}
                                  className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                                  title={item.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                                >
                                  {item.isCompleted ? (
                                    <CheckCircle2 size={20} className="text-emerald-600 fill-emerald-50" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-teal-600 transition-colors" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Action buttons row matching course-outline.png */}
                      <div className="pt-2 flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            showToast(`Activity creation opened for: ${section.name}`, 'info');
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-xs"
                        >
                          <Plus size={14} />
                          <span>Add activity</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`Upload module content started`, 'info')}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-2xs"
                        >
                          <Upload size={14} className="text-slate-500" />
                          <span>Upload activity</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`Importing shared curriculum library`, 'info')}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-2xs"
                        >
                          <Download size={14} className="text-slate-500" />
                          <span>Import activity</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAiModal(true)}
                          className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-2xs ml-auto"
                        >
                          <Sparkles size={14} className="text-purple-600" />
                          <span>Create activity with AI</span>
                        </button>
                      </div>
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">About this Course</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                {course.description} Designed by seasoned industry practitioners at Operating Media, this specialization delivers complete hands-on proficiency through real brand campaigns, live client scenarios, and rigorous certification prep.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-3">Key Skills & Core Competencies</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Comprehensive framework design and omnichannel campaign deployment.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Practical assignments with instructor feedback and portfolio validation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Real-time analytics, conversion optimization, and ROI tracking models.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Freelance proposal kits, client rate cards, and agreement templates.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-semibold text-slate-900 text-base">Course Credentials</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Instructor</span>
                <span className="font-semibold text-slate-900">{course.author}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-900 tabular-nums">{course.duration}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Curriculum Units</span>
                <span className="font-semibold text-slate-900 tabular-nums">{units.length} Items</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Certificate</span>
                <span className="font-semibold text-emerald-600">Official Operating Media Credential</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: ANNOUNCEMENTS & NEWS                                   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Course Announcements & News</h3>
              <p className="text-xs text-slate-400">Important batch updates, live webinars, and schedule changes.</p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowAnnForm(prev => !prev)}
                className="bg-[#0d7a5f] hover:bg-teal-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-2xs"
              >
                {showAnnForm ? 'Cancel' : '+ Post Announcement'}
              </button>
            )}
          </div>

          {showAnnForm && (
            <form onSubmit={handlePostAnnouncement} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-semibold text-slate-800">New Announcement</h4>
              <input
                type="text"
                required
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                placeholder="Announcement Title"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-teal-600"
              />
              <textarea
                rows={3}
                required
                value={newAnnContent}
                onChange={(e) => setNewAnnContent(e.target.value)}
                placeholder="Announcement body text..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden focus:border-teal-600"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors"
              >
                Publish Announcement
              </button>
            </form>
          )}

          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full uppercase">
                    {ann.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{ann.date}</span>
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{ann.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{ann.content}</p>
                <div className="text-[11px] text-slate-400 font-medium pt-1">
                  Posted by <span className="text-slate-700">{ann.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: QNA                                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'qna' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Questions & Answers Forum</h3>
              <p className="text-xs text-slate-400">Ask doubts, discuss campaign setups, and learn together.</p>
            </div>
            <button
              onClick={() => setShowQnaModal(true)}
              className="bg-[#0d7a5f] hover:bg-teal-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-2xs self-start sm:self-auto"
            >
              Ask a Question
            </button>
          </div>

          <div className="space-y-4">
            {qnaList.map(q => (
              <div key={q.id} className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={q.avatar} alt={q.author} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">{q.author}</h4>
                    <span className="text-[10px] text-slate-400">{q.date}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-900 text-sm mb-1">{q.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{q.question}</p>
                </div>

                {/* Replies */}
                {q.replies.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                    {q.replies.map((r, rIdx) => (
                      <div key={rIdx} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-semibold text-slate-900">{r.author}</span>
                          <span className="text-[10px] font-medium bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                            {r.role}
                          </span>
                          <span className="text-[10px] text-slate-400">{r.date}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-normal">{r.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply box */}
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                  <input
                    type="text"
                    value={replyInput[q.id] || ''}
                    onChange={(e) => setReplyInput({ ...replyInput, [q.id]: e.target.value })}
                    placeholder="Write a helpful answer..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-teal-600"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddReply(q.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddReply(q.id)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-xl transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ask Question Modal */}
          {showQnaModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
              <div className="bg-white rounded-3xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-900 text-base">Ask a Question</h3>
                  <button onClick={() => setShowQnaModal(false)} className="text-slate-400 hover:text-slate-600 font-semibold">✕</button>
                </div>
                <form onSubmit={handleAskQuestion} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={newQTitle}
                      onChange={(e) => setNewQTitle(e.target.value)}
                      placeholder="e.g. How to set up CPA postback URL?"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Details</label>
                    <textarea
                      rows={4}
                      required
                      value={newQBody}
                      onChange={(e) => setNewQBody(e.target.value)}
                      placeholder="Explain your scenario in detail..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowQnaModal(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-medium text-white bg-[#0d7a5f] hover:bg-teal-800 rounded-xl transition-colors"
                    >
                      Post Question
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: NOTES                                                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">My Course Notebook</h3>
            <p className="text-xs text-slate-400">Capture personal notes, timestamps, and strategies while learning.</p>
          </div>

          <form onSubmit={handleSaveNote} className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-xs font-semibold text-slate-700">Add a Quick Note</label>
              <select
                value={newNoteTag}
                onChange={(e) => setNewNoteTag(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs font-medium text-slate-700 focus:outline-hidden"
              >
                {sections.map(s => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <textarea
              rows={3}
              required
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Type your notes here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-teal-600"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#0d7a5f] hover:bg-teal-800 text-white text-xs font-medium px-5 py-2 rounded-xl transition-colors shadow-2xs"
              >
                Save Note
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {notesList.map(note => (
              <div key={note.id} className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-medium bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full">
                      {note.lessonTag}
                    </span>
                    <span className="text-[10px] text-slate-400">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-normal">{note.text}</p>
                </div>
                <button
                  onClick={() => {
                    setNotesList(prev => prev.filter(n => n.id !== note.id));
                    showToast('Note deleted', 'info');
                  }}
                  className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors"
                  title="Delete Note"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6 (ADMIN ONLY): ENROLLED STUDENTS                         */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'students' && isAdmin && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-base">Enrolled Learners & Performance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {students.map(s => (
              <div key={s.id} className="p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">{s.name}</h4>
                    <p className="text-[10px] text-slate-400">{s.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold tabular-nums text-teal-700 block">{s.overallProgress}%</span>
                  <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Choose Course Cover Banner</h3>
              <button
                onClick={() => setShowCoverModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 font-normal">
              Select one of our curated high-resolution covers or enter an image URL:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
              ].map((imgUrl, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCoverImage(imgUrl);
                    setShowCoverModal(false);
                    showToast('Course cover updated successfully! 🎨', 'success');
                  }}
                  className="h-24 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#0d7a5f] cursor-pointer transition-all relative group shadow-2xs"
                >
                  <img src={imgUrl} alt="Cover option" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <span className="text-white text-[10px] font-semibold bg-black/50 px-2 py-0.5 rounded-full">
                      Cover {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCoverModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-purple-700">
                <Sparkles size={18} />
                <h3 className="text-base font-semibold text-slate-900">AI Curriculum Assistant</h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 font-normal">
              Prompt our AI curriculum engine to draft video outlines, practice assignments, or interactive quizzes:
            </p>

            <textarea
              rows={4}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Generate 5 multiple-choice questions on Instagram Reels organic reach algorithm..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-purple-600"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAiGenerating(true);
                  setTimeout(() => {
                    setAiGenerating(false);
                    setShowAiModal(false);
                    showToast('AI drafted 3 new interactive practice questions for this module!', 'success', 'AI Generation Complete');
                  }, 1200);
                }}
                disabled={aiGenerating}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium flex items-center space-x-1.5 shadow-xs"
              >
                <Sparkles size={14} />
                <span>{aiGenerating ? 'Generating...' : 'Generate Activity'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
