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
  const [discussions, setDiscussions] = useState(() =>
    lmsService.getDiscussions(),
  );

  // Filters & Navigation State
  const [selectedCommunity, setSelectedCommunity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState(null); // { url, title }

  // User Reactions & Bookmarks
  const [userReactions, setUserReactions] = useState(() => {
    const initial = {};
    discussions.forEach((d) => {
      if (d.userReaction) initial[d.id] = d.userReaction;
    });
    return initial;
  });

  const [commentVotes, setCommentVotes] = useState({});

  // Current Active Single Post (derived from URL param or local state)
  const currentPost = useMemo(() => {
    if (!postId) return null;
    return discussions.find((d) => d.id === postId) || null;
  }, [postId, discussions]);

  // Keep discussions updated if service updates
  useEffect(() => {
    setDiscussions(lmsService.getDiscussions());
  }, []);

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
  const handlePostVote = (targetPostId, type) => {
    const updated = lmsService.toggleDiscussionReaction(targetPostId, type);
    if (updated) {
      setUserReactions((prev) => ({
        ...prev,
        [targetPostId]: updated.userReaction,
      }));
      setDiscussions((prev) =>
        prev.map((d) => (d.id === targetPostId ? updated : d)),
      );
    }
  };

  // Handle Thumbs Up / Down reaction on Comments
  const handleCommentVote = (commentId, type) => {
    setCommentVotes((prev) => {
      const existing = prev[commentId] || { score: 0, reaction: null };
      let newReaction = type;
      let newScore = existing.score;

      if (existing.reaction === type) {
        newReaction = null;
        newScore = type === "up" ? existing.score - 1 : existing.score + 1;
      } else if (existing.reaction === "up" && type === "down") {
        newScore = existing.score - 2;
      } else if (existing.reaction === "down" && type === "up") {
        newScore = existing.score + 2;
      } else {
        newScore = type === "up" ? existing.score + 1 : existing.score - 1;
      }

      return {
        ...prev,
        [commentId]: { score: newScore, reaction: newReaction },
      };
    });
  };

  // Navigation: Open Single Post Detail Page
  const handleOpenPost = (post) => {
    navigate(`/forums/${post.id}`);
  };

  const handleBackToFeed = () => {
    navigate("/forums");
  };

  // Handle Post Creation (with Image Upload)
  const handleCreatePostSubmit = (newPostData) => {
    const created = lmsService.addDiscussion(newPostData);
    setDiscussions((prev) => [created, ...prev]);
    showToast("Post published to community!", "success", "Forums");
    navigate(`/forums/${created.id}`);
  };

  // Handle Comment Submission
  const handleReplySubmit = ({
    parentId,
    content,
    authorName,
    authorRole,
    authorAvatar,
  }) => {
    if (!currentPost) return;

    const newReply = {
      authorName,
      authorRole,
      authorAvatar,
      content,
      likesCount: 0,
      isOfficial: authorRole.toLowerCase().includes("instructor"),
    };

    lmsService.addDiscussionReply(currentPost.id, newReply, parentId);
    const updatedDiscussions = lmsService.getDiscussions();
    setDiscussions(updatedDiscussions);
    showToast("Comment posted!", "success");
  };

  // Image Lightbox zoom
  const handleImageClick = (imageUrl, title) => {
    setLightboxData({ url: imageUrl, title });
  };

  // If viewing a specific Reddit post thread (/forums/:postId)
  if (currentPost) {
    return (
      <div className="space-y-4 max-w-7xl mx-auto">
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
          {filteredDiscussions.length === 0 ? (
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
