import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import { 
  MessagesSquare, Search, Plus, Send, Pin, CheckCircle2, 
  MessageSquare, ChevronDown, ChevronUp, BookOpen, Tag, 
  Sparkles, X, UserCheck, CornerDownRight, Flame, Filter
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

export const QuestionDiscussionsPage = () => {
  const { showToast } = useToast();
  const { currentUser, isStudent, isAdmin } = useAuth();
  const courses = lmsService.getCourses();

  const [discussions, setDiscussions] = useState(() => lmsService.getDiscussions());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFilterTab, setActiveFilterTab] = useState("all"); // 'all' | 'my' | 'answered'
  
  // Track open replies section per discussion
  const [expandedThreads, setExpandedThreads] = useState(() => {
    // Expand the first two by default
    const init = {};
    discussions.slice(0, 2).forEach(d => { init[d.id] = true; });
    return init;
  });

  // Track reply input per discussion
  const [replyInputs, setReplyInputs] = useState({});

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

  const handleReplyChange = (id, text) => {
    setReplyInputs(prev => ({ ...prev, [id]: text }));
  };

  const handlePostReply = (discussionId) => {
    const text = replyInputs[discussionId]?.trim();
    if (!text) {
      showToast("Please enter a reply message before posting.", "warning", "Empty Reply");
      return;
    }

    const authorName = currentUser?.name || (isStudent ? "Student" : "Instructor");
    const authorRole = isStudent ? "Student" : "Instructor";
    const authorAvatar = currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    const newReply = {
      authorName,
      authorRole,
      authorAvatar,
      content: text,
      isOfficial: !isStudent
    };

    lmsService.addDiscussionReply(discussionId, newReply);
    
    // Update local state
    setDiscussions(lmsService.getDiscussions());
    setReplyInputs(prev => ({ ...prev, [discussionId]: "" }));
    
    // Auto expand
    setExpandedThreads(prev => ({ ...prev, [discussionId]: true }));

    showToast(
      isStudent ? "Your answer was posted to the forum thread!" : "Official instructor response published!",
      "success",
      "Reply Published"
    );
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
      {/* HEADER BANNER                                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[#3b49df] text-xs font-bold uppercase tracking-wider mb-2">
            <MessagesSquare size={16} />
            <span>Community Knowledge Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Forums & Discussions
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl leading-relaxed">
            Collaborate with peers, ask tricky digital marketing & coding doubts, and receive answers directly from Operating Media mentors and instructors.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-4 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
              <span className="font-bold text-slate-900">{discussions.length}</span>
              <span className="text-slate-500">Total Topics</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="font-bold text-slate-900">{totalAnsweredCount}</span>
              <span className="text-slate-500">Resolved Discussions</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span className="font-bold text-slate-900">100%</span>
              <span className="text-slate-500">Instructor Response Rate</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Plus size={18} />
            <span>Ask a Question</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR                                          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forum topics, keywords, courses, or authors..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Course Selector */}
          <div className="w-full md:w-64 shrink-0">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df] cursor-pointer"
            >
              <option value="all">All Enrolled Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab pills row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {/* View filter tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: "all", label: "All Discussions" },
              { id: "answered", label: "Answered Topics" },
              { id: "my", label: "My Questions" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilterTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilterTab === tab.id
                    ? "bg-[#3b49df] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar pb-1">
            {categories.slice(0, 5).map(cat => {
              const isActive = (cat === "All Topics" && selectedCategory === "all") || (selectedCategory === cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === "All Topics" ? "all" : cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
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
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <MessagesSquare size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">No discussions match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
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
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#3b49df] text-white hover:bg-[#2f3cb3] transition-colors cursor-pointer"
              >
                + Ask Question
              </button>
            </div>
          </div>
        ) : (
          filteredDiscussions.map((disc) => {
            const isExpanded = !!expandedThreads[disc.id];
            const replies = disc.replies || [];
            const replyText = replyInputs[disc.id] || "";

            return (
              <div
                key={disc.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-sm space-y-4"
              >
                {/* Thread Header: Author, Badge, Pinned, Date */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={disc.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                      alt={disc.authorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {disc.authorName}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          disc.authorRole === "Instructor"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {disc.authorRole || "Student"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {disc.courseTitle} • <span className="text-slate-400">{disc.createdAt}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {disc.isPinned && (
                      <span className="flex items-center space-x-1 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                        <Pin size={11} className="fill-current rotate-45" />
                        <span>Pinned</span>
                      </span>
                    )}
                    {disc.category && (
                      <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
                        <Tag size={10} />
                        <span>{disc.category}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Thread Question Title & Body */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                    {disc.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-700 bg-slate-50/80 border border-slate-100 p-4 rounded-xl leading-relaxed whitespace-pre-line">
                    {disc.content}
                  </div>
                </div>

                {/* Thread Actions Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => toggleThread(disc.id)}
                    className="flex items-center space-x-2 text-slate-600 hover:text-[#3b49df] font-semibold py-1 px-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={15} className="text-[#3b49df]" />
                    <span>{replies.length} {replies.length === 1 ? "Response" : "Responses"}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (!isExpanded) toggleThread(disc.id);
                      }}
                      className="text-xs font-semibold text-[#3b49df] hover:underline cursor-pointer"
                    >
                      Write an answer
                    </button>
                  </div>
                </div>

                {/* Collapsible Responses & Reply Input */}
                {isExpanded && (
                  <div className="pt-2 space-y-4 border-t border-slate-100">
                    {/* Responses List */}
                    {replies.length > 0 && (
                      <div className="space-y-3 pl-3 sm:pl-6 border-l-2 border-slate-200">
                        {replies.map((reply) => (
                          <div key={reply.id} className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-100 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center space-x-2.5">
                                <img
                                  src={reply.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                                  alt={reply.authorName}
                                  className="w-7 h-7 rounded-full object-cover shrink-0"
                                />
                                <span className="text-xs font-bold text-slate-900">{reply.authorName}</span>
                                {reply.isOfficial && (
                                  <span className="flex items-center space-x-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                                    <CheckCircle2 size={10} />
                                    <span>Instructor Verified</span>
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-xs text-slate-700 pl-9 leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply input field */}
                    <div className="flex items-start space-x-2.5 pt-2">
                      <img
                        src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                        alt="You"
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200"
                      />
                      <div className="flex-1 space-y-2">
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) => handleReplyChange(disc.id, e.target.value)}
                          placeholder={isStudent ? "Write your thoughts or share an answer..." : "Type an official instructor answer..."}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={() => handlePostReply(disc.id)}
                            className="bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-2xs transition-all cursor-pointer"
                          >
                            <Send size={13} />
                            <span>Post Reply</span>
                          </button>
                        </div>
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
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3b49df] flex items-center justify-center">
                  <MessagesSquare size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Ask a Question</h3>
                  <p className="text-[11px] text-slate-500">Post a new doubt or discussion topic to the community.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Question Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How do I configure conversion API for Shopify stores?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Related Course *
                  </label>
                  <select
                    value={newCourseId}
                    onChange={(e) => setNewCourseId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                  >
                    <option value="General">General</option>
                    <option value="Technical SEO">Technical SEO</option>
                    <option value="PMAX & Bidding">PMAX & Bidding</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Analytics">Analytics</option>
                    <option value="WordPress">WordPress</option>
                    <option value="Content Marketing">Content Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Discussion Details / Query Explanation *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your question, what you tried, and what error or outcome you are experiencing..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 focus:border-[#3b49df]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
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
