import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import { 
  MessagesSquare, Search, Plus, Send, Pin, CheckCircle2, 
  MessageSquare, ChevronDown, ChevronUp, BookOpen, Tag, 
  Sparkles, X, UserCheck, CornerDownRight, Flame, Filter,
  Heart, Reply
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

// Helper to render comments with Instagram-style highlighted @mentions
const renderCommentContent = (content = "") => {
  if (!content) return null;
  // Splits and highlights @Name or @First Last mentions
  const mentionRegex = /(@[A-Za-z0-9_]+(?:\s+[A-Za-z0-9_]+)?)/g;
  const parts = content.split(mentionRegex);

  return (
    <span>
      {parts.map((part, index) => {
        if (part && part.startsWith("@")) {
          return (
            <span
              key={index}
              className="inline-flex items-center font-extrabold text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md mr-1.5 text-xs sm:text-sm"
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

// Helper to recursively count all replies across all depths
const countTotalResponses = (repliesList = []) => {
  let total = 0;
  for (const r of repliesList) {
    total += 1;
    if (Array.isArray(r.replies) && r.replies.length > 0) {
      total += countTotalResponses(r.replies);
    }
  }
  return total;
};

// Recursive Instagram-style Comment Node with nested replies loop and "Hide replies" toggle
const CommentNode = ({
  reply,
  discussionId,
  depth = 0,
  activeInlineReply,
  onInitiateInlineReply,
  onCancelInlineReply,
  onPostInlineReply,
  inlineDrafts,
  onInlineDraftChange,
  expandedReplies,
  onToggleReplies,
  replyLikes,
  onToggleLike,
  currentUser,
  isStudent
}) => {
  const isInlineActive = activeInlineReply?.parentReplyId === reply.id;
  const hasSubReplies = Array.isArray(reply.replies) && reply.replies.length > 0;
  const isRepliesExpanded = !!expandedReplies[reply.id];
  const { liked, count } = replyLikes[reply.id] || { liked: false, count: reply.likesCount || 0 };

  return (
    <div className="group/item">
      {/* Comment Body */}
      <div className="flex items-start space-x-3 sm:space-x-3.5 py-2.5 px-2.5 sm:px-3 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
        {/* User Avatar */}
        <img
          src={reply.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
          alt={reply.authorName}
          className={`${
            depth === 0 ? "w-9 h-9" : "w-8 h-8"
          } rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700 mt-0.5`}
        />

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Header: Name + Badge + Timestamp */}
          <div className="flex flex-wrap items-center gap-2 leading-snug">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {reply.authorName}
            </span>
            {reply.isOfficial && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={11} className="text-amber-600 dark:text-amber-400" />
                <span>Faculty</span>
              </span>
            )}
            <span className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium">
              • {reply.createdAt}
            </span>
          </div>

          {/* Comment text with interactive @mentions - BOLD REPLIES */}
          <div className="text-sm sm:text-[15px] text-slate-900 dark:text-slate-100 font-semibold leading-relaxed mt-1.5 break-words">
            {renderCommentContent(reply.content)}
          </div>

          {/* Action Row: Reply + Heart Likes */}
          <div className="flex items-center space-x-5 mt-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => onInitiateInlineReply(discussionId, reply.id, reply.authorName)}
              className="font-bold text-slate-600 dark:text-slate-400 hover:text-[#3b49df] dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Reply
            </button>

            <button
              type="button"
              onClick={() => onToggleLike(reply.id, reply.likesCount || 0)}
              className={`flex items-center space-x-1.5 transition-colors cursor-pointer ${
                liked ? "text-rose-600 dark:text-rose-400 font-bold" : "text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium"
              }`}
            >
              <Heart
                size={14}
                className={liked ? "fill-rose-500 text-rose-500" : "text-slate-400 dark:text-slate-500"}
              />
              <span>
                {count} {count === 1 ? "like" : "likes"}
              </span>
            </button>
          </div>

          {/* Instagram-style Toggle: View replies (X) / Hide replies */}
          {hasSubReplies && (
            <button
              type="button"
              onClick={() => onToggleReplies(reply.id)}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors mt-2.5 py-1 cursor-pointer group"
            >
              <span className="w-6 sm:w-8 h-[2px] bg-slate-300 dark:bg-slate-700 group-hover:bg-[#3b49df] dark:group-hover:bg-blue-400 transition-colors"></span>
              <span>
                {isRepliesExpanded
                  ? "Hide replies"
                  : `View ${reply.replies.length === 1 ? "1 reply" : `replies (${reply.replies.length})`}`}
              </span>
            </button>
          )}

          {/* Inline Reply Box inside this comment's own loop */}
          {isInlineActive && (
            <div className="mt-3 p-3 sm:p-4 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/90 dark:border-blue-900/50 rounded-2xl space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  Replying to <span className="text-[#3b49df] dark:text-blue-400 font-extrabold">@{reply.authorName}</span>
                </span>
                <button
                  type="button"
                  onClick={onCancelInlineReply}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md cursor-pointer"
                  title="Cancel reply"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#3b49df]/20 dark:focus-within:border-blue-500">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt="You"
                  className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <input
                  id={`inline-input-${reply.id}`}
                  type="text"
                  value={inlineDrafts[reply.id] || ""}
                  onChange={(e) => onInlineDraftChange(reply.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      onPostInlineReply(discussionId, reply.id, reply.authorName);
                    }
                  }}
                  placeholder={`Reply to @${reply.authorName}...`}
                  className="flex-1 bg-transparent border-0 border-none text-xs sm:text-sm text-slate-900 dark:text-white font-medium placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:outline-none focus:ring-0 ring-0 shadow-none focus:shadow-none"
                  style={{ outline: 'none', boxShadow: 'none' }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => onPostInlineReply(discussionId, reply.id, reply.authorName)}
                  disabled={!inlineDrafts[reply.id]?.trim()}
                  className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    inlineDrafts[reply.id]?.trim()
                      ? "bg-[#3b49df] text-white hover:bg-[#2f3cb3]"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 pointer-events-none"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          )}

          {/* Nested Replies Loop */}
          {hasSubReplies && isRepliesExpanded && (
            <div className="mt-3 space-y-2.5 pl-3.5 sm:pl-6 border-l-2 border-slate-200/90 dark:border-slate-800">
              {reply.replies.map((subReply) => (
                <CommentNode
                  key={subReply.id}
                  reply={subReply}
                  discussionId={discussionId}
                  depth={depth + 1}
                  activeInlineReply={activeInlineReply}
                  onInitiateInlineReply={onInitiateInlineReply}
                  onCancelInlineReply={onCancelInlineReply}
                  onPostInlineReply={onPostInlineReply}
                  inlineDrafts={inlineDrafts}
                  onInlineDraftChange={onInlineDraftChange}
                  expandedReplies={expandedReplies}
                  onToggleReplies={onToggleReplies}
                  replyLikes={replyLikes}
                  onToggleLike={onToggleLike}
                  currentUser={currentUser}
                  isStudent={isStudent}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const QuestionDiscussionsPage = () => {
  const { showToast } = useToast();
  const { currentUser, isStudent, isAdmin } = useAuth();
  const courses = lmsService.getCourses();

  const [discussions, setDiscussions] = useState(() => lmsService.getDiscussions());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFilterTab, setActiveFilterTab] = useState("all"); // 'all' | 'my' | 'answered'
  
  // Track open replies section per discussion (closed by default)
  const [expandedThreads, setExpandedThreads] = useState({});

  // Track expanded replies per comment (closed by default)
  const [expandedReplies, setExpandedReplies] = useState({});

  const toggleReplies = (replyId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }));
  };

  // Main discussion bottom reply drafts: { [discussionId]: string }
  const [discussionReplyInputs, setDiscussionReplyInputs] = useState({});

  // Active inline reply target: { discussionId, parentReplyId, authorName } | null
  const [activeInlineReply, setActiveInlineReply] = useState(null);
  const [inlineDrafts, setInlineDrafts] = useState({});

  // Heart Likes single atomic dictionary: { [replyId]: { liked: boolean, count: number } }
  // Single atomic updater ensures strictly +1 / -1 even with React StrictMode
  const [replyLikes, setReplyLikes] = useState({});

  const handleToggleLike = (replyId, initialLikes = 0) => {
    setReplyLikes(prev => {
      const current = prev[replyId] || { liked: false, count: initialLikes };
      const nextLiked = !current.liked;
      return {
        ...prev,
        [replyId]: {
          liked: nextLiked,
          count: nextLiked ? current.count + 1 : Math.max(0, current.count - 1)
        }
      };
    });
  };

  // Ask question modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || "course-1");
  const [newCategory, setNewCategory] = useState("General");
  const [newContent, setNewContent] = useState("");

  // Categories list derived from discussions + popular digital marketing topics
  const categories = useMemo(() => {
    const cats = new Set(["All Topics"]);
    discussions.forEach(d => {
      if (d.category) cats.add(d.category);
    });
    ["Social Media", "Technical SEO", "PMAX & Bidding", "Analytics", "WordPress", "Content Marketing"].forEach(c => cats.add(c));
    return Array.from(cats);
  }, [discussions]);

  const toggleThread = (id) => {
    setExpandedThreads(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Initiate inline reply on ANY comment at any level
  const handleInitiateInlineReply = (discussionId, parentReplyId, targetAuthorName) => {
    if (!expandedThreads[discussionId]) {
      setExpandedThreads(prev => ({ ...prev, [discussionId]: true }));
    }
    // Expand this comment's replies so user sees context
    setExpandedReplies(prev => ({ ...prev, [parentReplyId]: true }));

    setActiveInlineReply({
      discussionId,
      parentReplyId,
      authorName: targetAuthorName
    });

    setInlineDrafts(prev => ({
      ...prev,
      [parentReplyId]: `@${targetAuthorName} `
    }));

    setTimeout(() => {
      const el = document.getElementById(`inline-input-${parentReplyId}`);
      if (el) {
        el.focus();
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }
    }, 60);
  };

  const handleCancelInlineReply = () => {
    setActiveInlineReply(null);
  };

  const handleInlineDraftChange = (replyId, text) => {
    setInlineDrafts(prev => ({ ...prev, [replyId]: text }));
  };

  // Post inline reply directly into that comment's own loop
  const handlePostInlineReply = (discussionId, parentReplyId, targetAuthorName) => {
    const rawText = inlineDrafts[parentReplyId]?.trim();
    if (!rawText) {
      showToast("Please enter a reply message before posting.", "warning", "Empty Reply");
      return;
    }

    let finalText = rawText;
    if (targetAuthorName && !rawText.includes(`@${targetAuthorName}`)) {
      finalText = `@${targetAuthorName} ${rawText}`;
    }

    const authorName = currentUser?.name || (isStudent ? "Student" : "Instructor");
    const authorRole = isStudent ? "Student" : "Instructor";
    const authorAvatar = currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    const newReply = {
      authorName,
      authorRole,
      authorAvatar,
      content: finalText,
      isOfficial: !isStudent,
      likesCount: 0
    };

    lmsService.addDiscussionReply(discussionId, newReply, parentReplyId);

    // Refresh discussions
    setDiscussions(lmsService.getDiscussions());
    setInlineDrafts(prev => ({ ...prev, [parentReplyId]: "" }));
    setActiveInlineReply(null);

    // Ensure parent thread and comment replies are expanded
    setExpandedThreads(prev => ({ ...prev, [discussionId]: true }));
    setExpandedReplies(prev => ({ ...prev, [parentReplyId]: true }));

    showToast(
      `Reply posted directly inside @${targetAuthorName}'s loop!`,
      "success",
      "Reply Published"
    );
  };

  // Post top-level discussion reply
  const handlePostDiscussionReply = (discussionId) => {
    const rawText = discussionReplyInputs[discussionId]?.trim();
    if (!rawText) {
      showToast("Please enter a response before posting.", "warning", "Empty Response");
      return;
    }

    const authorName = currentUser?.name || (isStudent ? "Student" : "Instructor");
    const authorRole = isStudent ? "Student" : "Instructor";
    const authorAvatar = currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    const newReply = {
      authorName,
      authorRole,
      authorAvatar,
      content: rawText,
      isOfficial: !isStudent,
      likesCount: 0
    };

    lmsService.addDiscussionReply(discussionId, newReply, null);

    setDiscussions(lmsService.getDiscussions());
    setDiscussionReplyInputs(prev => ({ ...prev, [discussionId]: "" }));
    setExpandedThreads(prev => ({ ...prev, [discussionId]: true }));

    showToast("Your response was published to the topic!", "success", "Response Posted");
  };

  const handleDiscussionReplyChange = (discussionId, text) => {
    setDiscussionReplyInputs(prev => ({ ...prev, [discussionId]: text }));
  };

  const handleInitiateReplyToQuestion = (discussionId, questionAuthorName) => {
    if (!expandedThreads[discussionId]) {
      setExpandedThreads(prev => ({ ...prev, [discussionId]: true }));
    }
    setDiscussionReplyInputs(prev => ({
      ...prev,
      [discussionId]: `@${questionAuthorName} `
    }));
    setTimeout(() => {
      const el = document.getElementById(`reply-input-${discussionId}`);
      if (el) {
        el.focus();
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }
    }, 60);
  };

  const handleCreateDiscussion = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast("Please complete both title and discussion details.", "warning", "Incomplete Form");
      return;
    }

    const courseObj = courses.find(c => c.id === newCourseId);
    const courseTitle = courseObj ? courseObj.title : "General Marketing";
    const authorName = currentUser?.name || (isStudent ? "Hiteshpuri Goswami" : "Vishal Chaurasiya");
    const authorRole = isStudent ? "Student" : "Instructor";
    const authorAvatar = currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    const created = lmsService.addDiscussion({
      courseTitle,
      authorName,
      authorRole,
      authorAvatar,
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      isPinned: false,
      replies: []
    });

    setDiscussions(lmsService.getDiscussions());
    setExpandedThreads(prev => ({ ...prev, [created.id]: true }));
    setIsModalOpen(false);
    setNewTitle("");
    setNewContent("");

    showToast("Your discussion topic has been published to the community forum!", "success", "Topic Created");
  };

  // Filtered discussions
  const filteredDiscussions = useMemo(() => {
    return discussions.filter(disc => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = disc.title?.toLowerCase().includes(query);
        const matchesContent = disc.content?.toLowerCase().includes(query);
        const matchesAuthor = disc.authorName?.toLowerCase().includes(query);
        const matchesCourse = disc.courseTitle?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesCourse) {
          return false;
        }
      }

      // Course filter
      if (selectedCourse !== "all") {
        const courseObj = courses.find(c => c.id === selectedCourse);
        if (courseObj && disc.courseTitle !== courseObj.title) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && selectedCategory !== "All Topics") {
        if (disc.category !== selectedCategory) {
          return false;
        }
      }

      // Filter tabs
      if (activeFilterTab === "my") {
        const myName = currentUser?.name?.toLowerCase();
        if (!myName || !disc.authorName?.toLowerCase().includes(myName)) {
          return false;
        }
      } else if (activeFilterTab === "answered") {
        const hasReplies = (disc.replies && disc.replies.length > 0) || (disc.repliesCount > 0);
        if (!hasReplies) return false;
      }

      return true;
    });
  }, [discussions, searchQuery, selectedCourse, selectedCategory, activeFilterTab, courses, currentUser]);

  const totalAnsweredCount = useMemo(() => {
    return discussions.filter(d => (d.replies && d.replies.length > 0) || (d.repliesCount > 0)).length;
  }, [discussions]);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER        */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.forums}
        isAdmin={isAdmin}
        metrics={[
          { value: discussions.length, label: "Total Topics", dotColor: "bg-blue-600" },
          { value: totalAnsweredCount, label: "Resolved Discussions", dotColor: "bg-emerald-500" },
          { value: "100%", label: "Instructor Response Rate", dotColor: "bg-purple-500" },
        ]}
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>+ Ask a Question</span>
          </button>
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR - LARGER SIZE & SPACIOUS DESIGN          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3.5">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forum topics, keywords, courses, or authors..."
              className="w-full pl-12 pr-10 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:outline-none focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Course Selector */}
          <div className="w-full md:w-72 shrink-0">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm sm:text-base font-medium text-slate-900 dark:text-white outline-none focus:outline-none focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:border-blue-500 cursor-pointer transition-all"
            >
              <option value="all" className="dark:bg-slate-900 dark:text-white">All Enrolled Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id} className="dark:bg-slate-900 dark:text-white">{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab pills row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* View filter tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: "all", label: "All Discussions" },
              { id: "answered", label: "Answered Topics" },
              { id: "my", label: "My Questions" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilterTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilterTab === tab.id
                    ? "bg-[#3b49df] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1">
            {categories.slice(0, 5).map(cat => {
              const isActive = (cat === "All Topics" && selectedCategory === "all") || (selectedCategory === cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === "All Topics" ? "all" : cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-slate-900 dark:bg-blue-600 text-white shadow-2xs"
                      : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DISCUSSIONS LIST                                              */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-5">
        {filteredDiscussions.length === 0 ? (
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
              <MessagesSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No discussions match your criteria</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search keywords, clear category filters, or be the first to ask a question!
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCourse("all");
                  setSelectedCategory("all");
                  setActiveFilterTab("all");
                }}
                className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#3b49df] text-white hover:bg-[#2f3cb3] transition-colors cursor-pointer"
              >
                + Ask Question
              </button>
            </div>
          </div>
        ) : (
          filteredDiscussions.map((disc) => {
            const isExpanded = !!expandedThreads[disc.id];
            const replies = disc.replies || [];

            return (
              <div
                key={disc.id}
                className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-sm dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] space-y-4"
              >
                {/* Thread Header: Author, Badge, Pinned, Date */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={disc.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                      alt={disc.authorName}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                          {disc.authorName}
                        </h4>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          disc.authorRole === "Instructor"
                            ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                            : "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60"
                        }`}>
                          {disc.authorRole || "Student"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        {disc.courseTitle} • <span className="text-slate-400 dark:text-slate-500">{disc.createdAt}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {disc.isPinned && (
                      <span className="flex items-center space-x-1.5 text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-3 py-1 rounded-md">
                        <Pin size={12} className="fill-current rotate-45" />
                        <span>Pinned</span>
                      </span>
                    )}
                    {disc.category && (
                      <span className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">
                        <Tag size={11} />
                        <span>{disc.category}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Thread Question Title & Body */}
                <div className="space-y-2.5">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl leading-snug">
                    {disc.title}
                  </h3>
                  <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 rounded-2xl leading-relaxed whitespace-pre-line font-medium">
                    {disc.content}
                  </div>
                </div>

                {/* Thread Actions Bar - Instagram Style */}
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                  <button
                    onClick={() => toggleThread(disc.id)}
                    className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-[#3b49df] dark:hover:text-blue-400 font-bold py-1.5 px-3 -ml-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={16} className="text-[#3b49df] dark:text-blue-400" />
                    <span>{countTotalResponses(replies)} {countTotalResponses(replies) === 1 ? "Response" : "Responses"}</span>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleInitiateReplyToQuestion(disc.id, disc.authorName)}
                      className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#3b49df] dark:text-blue-400 hover:text-[#2f3cb3] dark:hover:text-blue-300 py-1.5 px-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                    >
                      <Reply size={14} />
                      <span>Reply to @{disc.authorName.split(" ")[0]}</span>
                    </button>
                  </div>
                </div>

                {/* Collapsible Responses & Reply Input */}
                {isExpanded && (
                  <div className="pt-3 space-y-4 border-t border-slate-100 dark:border-slate-800">
                    {/* Responses List (Instagram-style nested loop with per-comment replies) */}
                    {replies.length > 0 && (
                      <div className="space-y-3.5">
                        {replies.map((reply) => (
                          <CommentNode
                            key={reply.id}
                            reply={reply}
                            discussionId={disc.id}
                            depth={0}
                            activeInlineReply={activeInlineReply}
                            onInitiateInlineReply={handleInitiateInlineReply}
                            onCancelInlineReply={handleCancelInlineReply}
                            onPostInlineReply={handlePostInlineReply}
                            inlineDrafts={inlineDrafts}
                            onInlineDraftChange={handleInlineDraftChange}
                            expandedReplies={expandedReplies}
                            onToggleReplies={toggleReplies}
                            replyLikes={replyLikes}
                            onToggleLike={handleToggleLike}
                            currentUser={currentUser}
                            isStudent={isStudent}
                          />
                        ))}
                      </div>
                    )}

                    {/* Main Discussion Bottom Reply Input */}
                    <div className="pt-2">
                      <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-700 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#3b49df]/20 dark:focus-within:border-blue-500 transition-all">
                        <img
                          src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                          alt="You"
                          className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <input
                          id={`reply-input-${disc.id}`}
                          type="text"
                          value={discussionReplyInputs[disc.id] || ""}
                          onChange={(e) => handleDiscussionReplyChange(disc.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handlePostDiscussionReply(disc.id);
                            }
                          }}
                          placeholder="Add a comment to this discussion..."
                          className="flex-1 bg-transparent border-0 border-none text-sm sm:text-base text-slate-900 dark:text-white font-medium placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:outline-none focus:ring-0 ring-0 shadow-none focus:shadow-none"
                          style={{ outline: 'none', boxShadow: 'none' }}
                        />
                        <button
                          onClick={() => handlePostDiscussionReply(disc.id)}
                          disabled={!discussionReplyInputs[disc.id]?.trim()}
                          className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                            discussionReplyInputs[disc.id]?.trim()
                              ? "bg-[#3b49df] text-white hover:bg-[#2f3cb3] shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 pointer-events-none"
                          }`}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ASK A QUESTION MODAL                                          */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 flex items-center justify-center">
                  <MessagesSquare size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Ask a Question</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Post a new doubt or discussion topic to the community.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Question Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How do I configure conversion API for Shopify stores?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:outline-none focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:border-[#3b49df]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Related Course *
                  </label>
                  <select
                    value={newCourseId}
                    onChange={(e) => setNewCourseId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 outline-none focus:outline-none focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:border-[#3b49df]"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id} className="dark:bg-slate-900 dark:text-white">{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 outline-none focus:outline-none focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:border-[#3b49df]"
                  >
                    <option value="General" className="dark:bg-slate-900 dark:text-white">General</option>
                    <option value="Technical SEO" className="dark:bg-slate-900 dark:text-white">Technical SEO</option>
                    <option value="PMAX & Bidding" className="dark:bg-slate-900 dark:text-white">PMAX & Bidding</option>
                    <option value="Social Media" className="dark:bg-slate-900 dark:text-white">Social Media</option>
                    <option value="Analytics" className="dark:bg-slate-900 dark:text-white">Analytics</option>
                    <option value="WordPress" className="dark:bg-slate-900 dark:text-white">WordPress</option>
                    <option value="Content Marketing" className="dark:bg-slate-900 dark:text-white">Content Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Discussion Details / Query Explanation *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your question, what you tried, and what error or outcome you are experiencing..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:outline-none focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:border-[#3b49df]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#3b49df] hover:bg-[#2f3cb3] text-white font-semibold shadow-xs transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Send size={13} />
                  <span>Post Discussion</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDiscussionsPage;
