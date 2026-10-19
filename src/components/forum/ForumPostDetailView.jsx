import React, { useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Pin,
  Tag,
  Send,
  ImageIcon,
  ShieldCheck,
} from "lucide-react";
import { ForumVoteButtons } from "./ForumVoteButtons";
import { ForumCommentNode } from "./ForumCommentNode";
import { ForumSidebar, getTopicLabel, cleanAuthorHandle } from "./ForumSidebar";

export const ForumPostDetailView = ({
  post,
  onBack,
  onVotePost,
  userReaction = null,
  onReplySubmit,
  onCommentVote,
  commentVotes = {},
  onImageClick,
  currentUser,
  onCreatePostClick,
}) => {
  const [commentInput, setCommentInput] = useState("");

  if (!post) {
    return (
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Post not found
        </h3>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-[#3b49df] text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          ← Back to Forums
        </button>
      </div>
    );
  }

  const communitySlug = (post.community || post.category || "general")
    .replace(/^r\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const topicLabel = getTopicLabel(communitySlug);
  const authorDisplay = cleanAuthorHandle(post.authorHandle, post.authorName);
  const replies = Array.isArray(post.replies) ? post.replies : [];

  const handlePostTopComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    onReplySubmit &&
      onReplySubmit({
        parentId: null,
        content: commentInput.trim(),
        authorName: currentUser?.name || "Sahil Hasolkar",
        authorRole: currentUser?.role || "Student",
        authorAvatar:
          currentUser?.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      });

    setCommentInput("");
  };

  return (
    <div className="space-y-4">
      {/* 1. Breadcrumb / Back Bar */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 bg-white dark:bg-[#0b1329] px-4 sm:px-5 py-3 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
        <button
          type="button"
          onClick={onBack}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#3b49df] dark:hover:text-blue-400 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 transition-colors flex items-center space-x-2 text-xs sm:text-sm font-bold cursor-pointer shrink-0"
        >
          <ArrowLeft size={17} />
          <span>Back to Feed</span>
        </button>
        <span className="text-slate-300 dark:text-slate-600 text-xs sm:text-sm font-medium shrink-0">/</span>
        <span className="text-xs sm:text-sm font-bold text-[#3b49df] dark:text-blue-400 shrink-0">
          {topicLabel}
        </span>
        <span className="text-slate-300 dark:text-slate-600 text-xs sm:text-sm font-medium shrink-0">/</span>
        <span
          title={post.title}
          className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
        >
          {post.title}
        </span>
      </div>

      {/* 2. Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Full Thread & Comments (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Post Card */}
          <article className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex overflow-hidden">
            {/* Left Vote Gutter */}
            <div className="hidden sm:flex">
              <ForumVoteButtons
                score={post.upvotes ?? post.score ?? 0}
                userReaction={userReaction}
                onVote={onVotePost}
                layout="vertical"
              />
            </div>

            {/* Post Content */}
            <div className="flex-1 p-4 sm:p-5 min-w-0 space-y-3">
              {/* Header Meta Line */}
              <div className="flex items-center flex-wrap gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-bold text-[#3b49df] dark:text-blue-400">
                  {topicLabel}
                </span>
                <span>•</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Posted by {authorDisplay}
                </span>
                {post.authorRole && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {post.authorRole}
                  </span>
                )}
                <span>•</span>
                <span className="tabular-nums">{post.createdAt || "Just now"}</span>

                {post.isPinned && (
                  <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                    <Pin size={11} className="fill-emerald-500" />
                    <span>Pinned</span>
                  </span>
                )}

                {post.category && (
                  <span className="ml-auto inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold border border-slate-200/80 dark:border-slate-700">
                    <Tag size={10} />
                    <span>{post.category}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {post.title}
              </h1>

              {/* Body Text */}
              {post.content && (
                <div className="text-[12px] sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                  {post.content}
                </div>
              )}

              {/* Attached Image (Full View) */}
              {post.imageUrl && (
                <div
                  onClick={() =>
                    onImageClick && onImageClick(post.imageUrl, post.title)
                  }
                  className="mt-3 max-h-[500px] w-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-950/20 dark:bg-slate-950/60 flex items-center justify-center cursor-zoom-in relative group/detailImg"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-auto h-auto max-h-[500px] max-w-full object-contain rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold rounded-lg flex items-center space-x-1 opacity-80 group-hover/detailImg:opacity-100 transition-opacity">
                    <ImageIcon size={12} />
                    <span>Click to expand full size</span>
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                {/* Mobile Votes */}
                <div className="flex sm:hidden">
                  <ForumVoteButtons
                    score={post.upvotes ?? post.score ?? 0}
                    userReaction={userReaction}
                    onVote={onVotePost}
                    layout="horizontal"
                    size="sm"
                  />
                </div>

                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 font-semibold text-[11px] sm:text-xs">
                  <span className="px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5">
                    <MessageSquare size={13} />
                    <span>{replies.length} Comments</span>
                  </span>
                </div>

                {post.courseTitle && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[160px] hidden sm:inline">
                    in {post.courseTitle}
                  </span>
                )}
              </div>
            </div>
          </article>

          {/* 3. Reddit Comment Composer */}
          <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comment as{" "}
              <strong className="text-slate-900 dark:text-white font-bold">
                {currentUser?.name || "Sahil Hasolkar"}
              </strong>
            </p>

            <form onSubmit={handlePostTopComment} className="space-y-2.5">
              <textarea
                rows={3}
                required
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="What are your thoughts? Support your peers with actionable tips..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs leading-relaxed text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-98"
                >
                  <Send size={12} />
                  <span>Comment</span>
                </button>
              </div>
            </form>
          </div>

          {/* 4. Reddit Threaded Comments List */}
          <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Comments ({replies.length})
              </h3>
              <span className="text-[11px] text-slate-400">
                Sorted by: <strong className="text-slate-700 dark:text-slate-300">Top</strong>
              </span>
            </div>

            {replies.length === 0 ? (
              <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                No comments yet. Be the first to share your thoughts!
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {replies.map((comment) => (
                  <ForumCommentNode
                    key={comment.id}
                    comment={comment}
                    depth={0}
                    onReplySubmit={onReplySubmit}
                    onCommentVote={onCommentVote}
                    commentVotes={commentVotes}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Reddit Community Sidebar (4 cols) */}
        <div className="lg:col-span-4 hidden lg:block">
          <ForumSidebar
            selectedCommunity={post.community?.replace("r/", "") || "all"}
            totalPostsCount={1}
          />
        </div>
      </div>
    </div>
  );
};
