import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Pin,
  Tag,
  Send,
  ImageIcon,
  ShieldCheck,
  ExternalLink,
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
  const [isReplyingToPost, setIsReplyingToPost] = useState(false);
  const topCommentInputRef = useRef(null);

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
        replyToAuthor: isReplyingToPost ? authorDisplay : null,
        content: isReplyingToPost
          ? `@${authorDisplay} ${commentInput.trim()}`
          : commentInput.trim(),
        authorName: currentUser?.name || "Sahil Hasolkar",
        authorRole: currentUser?.role || "Student",
        authorAvatar:
          currentUser?.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      });

    setCommentInput("");
    setIsReplyingToPost(false);
  };

  return (
    <div className="flex flex-col h-full min-h-0 space-y-3.5 overflow-hidden w-full">
      {/* 1. Breadcrumb / Back Bar - FIXED AT TOP */}
      <div className="shrink-0 flex items-center space-x-2.5 sm:space-x-3 bg-white dark:bg-[#0b1329] px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0 overflow-hidden">
        {/* Left Column: Full Thread & Comments (8 cols) - ONLY THIS SCROLLS WITH NO-SCROLLBAR */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-4 pr-1 pb-6">
            {/* Main Post Card */}
            <article className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex overflow-hidden">
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

                {/* Resource / External Article Link */}
                {(post.linkUrl || post.sourceUrl || post.link) && (
                  <div className="pt-0.5">
                    <a
                      href={post.linkUrl || post.sourceUrl || post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium truncate max-w-full bg-blue-50/70 dark:bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40"
                    >
                      <ExternalLink size={12} className="shrink-0" />
                      <span className="truncate">
                        {post.linkUrl || post.sourceUrl || post.link}
                      </span>
                    </a>
                  </div>
                )}

                {/* Attached Image (Full View) */}
                {post.imageUrl && (
                  <div
                    onClick={() =>
                      onImageClick && onImageClick(post.imageUrl, post.title)
                    }
                    className="mt-3 max-h-[480px] w-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-950/20 dark:bg-slate-950/60 flex items-center justify-center cursor-zoom-in relative group/detailImg"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-auto h-auto max-h-[480px] max-w-full object-contain rounded-lg"
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

                    <button
                      type="button"
                      onClick={() => {
                        setIsReplyingToPost(true);
                        setTimeout(() => topCommentInputRef.current?.focus(), 50);
                      }}
                      className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <MessageSquare size={13} />
                      <span>Reply</span>
                    </button>
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
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comment as{" "}
                  <strong className="text-slate-900 dark:text-white font-bold">
                    {currentUser?.name || "Sahil Hasolkar"}
                  </strong>
                </p>
                {isReplyingToPost && (
                  <span className="text-[11px] text-[#3b49df] dark:text-blue-400 font-medium">
                    Replying to original post
                  </span>
                )}
              </div>

              <form onSubmit={handlePostTopComment} className="space-y-2.5">
                <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus-within:border-[#3b49df] focus-within:ring-2 focus-within:ring-[#3b49df]/20 transition-all shadow-xs">
                  <div className="flex items-start gap-2">
                    {isReplyingToPost && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-[#3b49df] dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 text-xs font-bold shrink-0 select-none shadow-2xs mt-0.5">
                        <span className="opacity-70">@</span>
                        <span>{authorDisplay}</span>
                        <button
                          type="button"
                          onClick={() => setIsReplyingToPost(false)}
                          className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 cursor-pointer"
                          title="Remove mention"
                        >
                          ×
                        </button>
                      </div>
                    )}

                    <textarea
                      ref={topCommentInputRef}
                      rows={3}
                      required
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder={
                        isReplyingToPost
                          ? `Write your reply to @${authorDisplay}...`
                          : "What are your thoughts? Support your peers with actionable tips..."
                      }
                      className="flex-1 bg-transparent border-0 p-0 text-xs leading-relaxed text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-0 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  {isReplyingToPost && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsReplyingToPost(false);
                        setCommentInput("");
                      }}
                      className="px-3.5 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className="px-4 py-2 rounded-xl bg-[#3b49df] hover:bg-[#2f3ab2] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-98"
                  >
                    <Send size={12} />
                    <span>{isReplyingToPost ? "Reply" : "Comment"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 4. Reddit Threaded Comments List */}
            <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-3">
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
        </div>

        {/* Right Column: Reddit Community Sidebar (4 cols) - FIXED */}
        <div className="lg:col-span-4 hidden lg:block overflow-hidden h-full">
          <ForumSidebar
            selectedCommunity={post.community?.replace("r/", "") || "all"}
            totalPostsCount={1}
          />
        </div>
      </div>
    </div>
  );
};
