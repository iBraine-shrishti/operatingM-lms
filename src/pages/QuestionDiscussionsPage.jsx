import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

// Modular Forum Components
import { ForumHeader } from "../components/forum/ForumHeader";
import { ForumSortBar } from "../components/forum/ForumSortBar";
import { ForumPostCard } from "../components/forum/ForumPostCard";
import { ForumSidebar, getTopicLabel } from "../components/forum/ForumSidebar";
import { ForumPostDetailView } from "../components/forum/ForumPostDetailView";
import { ForumCreatePostModal } from "../components/forum/ForumCreatePostModal";
import { ForumImageModal } from "../components/forum/ForumImageModal";
import { MessagesSquare } from "lucide-react";

export const QuestionDiscussionsPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();
  const { showToast } = useToast();

  const courses = useMemo(() => lmsService.getCourses(), []);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePostDetail, setActivePostDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Filters & Navigation State
  const [selectedCommunity, setSelectedCommunity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState(null); // { url, title }

  // User Reactions & Bookmarks
  const [userReactions, setUserReactions] = useState({});
  const [commentVotes, setCommentVotes] = useState({});

  const studentId = currentUser?.crmAdmissionId
    ? `std-${currentUser.crmAdmissionId}`
    : (currentUser?.id || currentUser?.admissionNo || currentUser?.student_id || "std-267");

  // Fetch discussions from live API
  const loadDiscussions = async () => {
    setLoading(true);
    try {
      const posts = await lmsService.fetchDiscussions(studentId, {
        community: selectedCommunity,
        search: searchQuery,
      });
      setDiscussions(posts);
      const initialReactions = {};
      posts.forEach((d) => {
        if (d.userReaction) initialReactions[d.id] = d.userReaction;
      });
      setUserReactions(initialReactions);
    } catch (err) {
      console.warn("Could not load discussions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussions();
  }, [studentId, selectedCommunity, searchQuery]);

  // Fetch single post detail when postId param is in URL
  useEffect(() => {
    if (!postId) {
      setActivePostDetail(null);
      return;
    }
    let isMounted = true;
    const loadDetail = async () => {
      setLoadingDetail(true);
      try {
        const full = await lmsService.fetchDiscussionDetail(postId, studentId);
        if (isMounted && full) {
          setActivePostDetail(full);
        }
      } catch (err) {
        console.warn("Could not load post detail:", err);
      } finally {
        if (isMounted) setLoadingDetail(false);
      }
    };
    loadDetail();
    return () => { isMounted = false; };
  }, [postId, studentId]);

  // Current Active Single Post
  const currentPost = useMemo(() => {
    if (!postId) return null;
    return activePostDetail || discussions.find((d) => d.id === postId) || null;
  }, [postId, activePostDetail, discussions]);

  // Filter & Sort Discussions
  const filteredDiscussions = useMemo(() => {
    let result = [...discussions];

    // Filter by Topic Category
    if (selectedCommunity !== "all") {
      result = result.filter((d) => {
        const comm = (d.community || "").replace(/^r\//, "").toLowerCase();
        const cat = (d.category || "").toLowerCase();
        const target = selectedCommunity.replace(/^r\//, "").toLowerCase();
        return (
          comm.includes(target) ||
          cat.includes(target) ||
          target.includes(cat) ||
          target.includes(comm)
        );
      });
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title?.toLowerCase().includes(q) ||
          d.content?.toLowerCase().includes(q) ||
          d.authorName?.toLowerCase().includes(q) ||
          d.category?.toLowerCase().includes(q) ||
          d.community?.toLowerCase().includes(q),
      );
    }

    // Default Sort: pinned first, then combined score and replies activity
    result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      const hotA = (a.upvotes ?? a.score ?? 0) * 2 + (a.repliesCount || 0);
      const hotB = (b.upvotes ?? b.score ?? 0) * 2 + (b.repliesCount || 0);
      return hotB - hotA;
    });

    return result;
  }, [discussions, selectedCommunity, searchQuery]);

  // Handle Thumbs Up / Down reaction on Posts
  const handlePostVote = async (targetPostId, type) => {
    const currentReaction = userReactions[targetPostId];
    const newReaction = currentReaction === type ? null : type;
    setUserReactions((prev) => ({ ...prev, [targetPostId]: newReaction }));

    try {
      const res = await lmsService.toggleDiscussionReaction("post", targetPostId, studentId, type);
      if (res && res.success) {
        setDiscussions((prev) =>
          prev.map((d) => (d.id === targetPostId ? { ...d, upvotes: res.upvotes, score: res.upvotes, userReaction: res.vote_type } : d))
        );
        if (activePostDetail && activePostDetail.id === targetPostId) {
          setActivePostDetail((prev) => ({
            ...prev,
            upvotes: res.upvotes,
            score: res.upvotes,
            userReaction: res.vote_type,
          }));
        }
      }
    } catch (err) {
      console.warn("Post vote error:", err);
    }
  };

  // Handle Thumbs Up / Down reaction on Comments
  const handleCommentVote = async (commentId, type) => {
    try {
      const res = await lmsService.toggleDiscussionReaction("reply", commentId, studentId, type);
      if (res && res.success) {
        setCommentVotes((prev) => ({
          ...prev,
          [commentId]: { score: res.upvotes, reaction: res.vote_type },
        }));
      }
    } catch (err) {
      console.warn("Comment vote error:", err);
    }
  };

  // Navigation: Open Single Post Detail Page
  const handleOpenPost = (post) => {
    navigate(`/forums/${post.id}`);
  };

  const handleBackToFeed = () => {
    navigate("/forums");
  };

  // Handle Post Creation (with Image Upload to VPS and CRM moderation status)
  const handleCreatePostSubmit = async (newPostData) => {
    try {
      const created = await lmsService.createDiscussion({
        ...newPostData,
        studentId,
      });
      setDiscussions((prev) => [created, ...prev.filter(d => d.id !== created.id)]);
      showToast("Question submitted for review! Visible after faculty approval.", "success", "Forums");
      setIsCreateModalOpen(false);
      navigate(`/forums/${created.id}`);
    } catch (err) {
      showToast(err.message || "Failed to submit post", "error");
    }
  };

  // Handle Comment Submission
  const handleReplySubmit = async ({
    parentId,
    content,
    authorName,
    authorRole,
    authorAvatar,
    replyToAuthor,
  }) => {
    if (!currentPost) return;

    try {
      const newReply = {
        studentId,
        authorName,
        authorRole,
        authorAvatar,
        content,
        parentId: parentId || null,
        replyToAuthor: replyToAuthor || null,
        isOfficial: (authorRole || "").toLowerCase().includes("instructor"),
      };

      await lmsService.createDiscussionReply(currentPost.id, newReply);
      showToast("Comment posted!", "success");

      // Refetch current post detail
      const refreshed = await lmsService.fetchDiscussionDetail(currentPost.id, studentId);
      if (refreshed) {
        setActivePostDetail(refreshed);
      }
    } catch (err) {
      showToast(err.message || "Failed to post comment", "error");
    }
  };

  // Image Lightbox zoom
  const handleImageClick = (imageUrl, title) => {
    setLightboxData({ url: imageUrl, title });
  };

  // If viewing a specific Reddit post thread (/forums/:postId)
  if (currentPost) {
    return (
      <div className="h-[calc(100vh-5.5rem)] flex flex-col space-y-3.5 max-w-7xl mx-auto w-full overflow-hidden">
        <ForumPostDetailView
          post={currentPost}
          onBack={handleBackToFeed}
          onVotePost={(type) => handlePostVote(currentPost.id, type)}
          userReaction={userReactions[currentPost.id]}
          onReplySubmit={handleReplySubmit}
          onCommentVote={handleCommentVote}
          commentVotes={commentVotes}
          onImageClick={handleImageClick}
          currentUser={currentUser}
          onCreatePostClick={() => setIsCreateModalOpen(true)}
        />

        {/* Create Post Modal */}
        <ForumCreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePostSubmit}
          currentUser={currentUser}
          courses={courses}
          defaultCommunity={selectedCommunity === "all" ? "social-media" : selectedCommunity}
        />

        {/* Lightbox Modal */}
        {lightboxData && (
          <ForumImageModal
            imageUrl={lightboxData.url}
            title={lightboxData.title}
            onClose={() => setLightboxData(null)}
          />
        )}
      </div>
    );
  }

  // Main Reddit Forum Feed View
  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col space-y-3.5 max-w-7xl mx-auto w-full overflow-hidden">
      {/* 1. Reddit Community Header - FIXED AT TOP (SEARCH NEVER SCROLLS) */}
      <div className="shrink-0">
        <ForumHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreatePostClick={() => setIsCreateModalOpen(true)}
          selectedCommunity={selectedCommunity}
        />
      </div>

      {/* 2. 2-Column Grid (Feed + Right Community Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0 overflow-hidden">
        {/* Left Column: Post Feed (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-0 space-y-3">
          {/* Topic Category Filter Chips */}
          <div className="shrink-0">
            <ForumSortBar
              selectedCommunity={selectedCommunity}
              onSelectCommunity={setSelectedCommunity}
            />
          </div>

          {/* Posts Feed - ONLY QUESTIONS SCROLL, SCROLLBAR HIDDEN */}
          {loading ? (
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-12 text-center shadow-2xs space-y-3">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Loading discussions from server...</p>
            </div>
          ) : filteredDiscussions.length === 0 ? (
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-10 text-center shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 flex items-center justify-center mx-auto">
                <MessagesSquare size={22} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                No discussions found in {getTopicLabel(selectedCommunity)}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Be the first to ask a question or upload a campaign screenshot for review!
              </p>
              <div className="flex justify-center gap-2 pt-2">
                {selectedCommunity !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedCommunity("all")}
                    className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    View All Discussions
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-[#3b49df] text-white hover:bg-[#2f3ab2] shadow-xs cursor-pointer"
                >
                  Create First Post
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-3 pr-1 pb-4">
              {filteredDiscussions.map((post) => (
                <ForumPostCard
                  key={post.id}
                  post={post}
                  userReaction={userReactions[post.id]}
                  onVote={(type) => handlePostVote(post.id, type)}
                  onOpenPost={handleOpenPost}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Community Sidebar (4 cols on desktop) */}
        <div className="lg:col-span-4 hidden lg:block overflow-hidden">
          <ForumSidebar totalPostsCount={discussions.length} />
        </div>
      </div>

      {/* 3. Create Post / Ask Question Modal (with Image Upload) */}
      <ForumCreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePostSubmit}
        currentUser={currentUser}
        courses={courses}
        defaultCommunity={selectedCommunity === "all" ? "social-media" : selectedCommunity}
      />

      {/* 4. Fullscreen Image Lightbox Modal */}
      {lightboxData && (
        <ForumImageModal
          imageUrl={lightboxData.url}
          title={lightboxData.title}
          onClose={() => setLightboxData(null)}
        />
      )}
    </div>
  );
};

export default QuestionDiscussionsPage;
