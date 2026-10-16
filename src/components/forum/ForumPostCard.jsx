import React from "react";
import {
  MessageSquare,
  Share2,
  Bookmark,
  Pin,
  ExternalLink,
  Tag,
  ImageIcon,
} from "lucide-react";
import { ForumVoteButtons } from "./ForumVoteButtons";
import { getTopicLabel, cleanAuthorHandle } from "./ForumSidebar";

// Color helper for topic badge
const getCommunityBadgeColor = (community = "") => {
  const c = community.toLowerCase();
  if (c.includes("seo")) {
    return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60";
  }
  if (c.includes("google") || c.includes("ads")) {
    return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60";
  }
  if (c.includes("social") || c.includes("marketing")) {
    return "bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 border-blue-200/80 dark:border-blue-800/60";
  }
  if (c.includes("web") || c.includes("wordpress")) {
    return "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800/60";
  }
  if (c.includes("analytics")) {
    return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60";
  }
  return "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60";
};

export const ForumPostCard = ({
  post,
  userReaction = null,
  onVote,
  onOpenPost,
  onImageClick,
  onShare,
  onSave,
  isSaved = false,
}) => {
  const communitySlug = (post.community || post.category || "general")
    .replace(/^r\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const topicLabel = getTopicLabel(communitySlug);
  const authorDisplay = cleanAuthorHandle(post.authorHandle, post.authorName);
  const totalComments =
    post.repliesCount ?? (Array.isArray(post.replies) ? post.replies.length : 0);

  return (
    <article
      onClick={() => onOpenPost && onOpenPost(post)}
      className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex overflow-hidden cursor-pointer group"
    >
      {/* 1. Left Reddit Vote Gutter */}
      <div className="hidden sm:flex">
        <ForumVoteButtons
          score={post.upvotes ?? post.score ?? 0}
          userReaction={userReaction}
          onVote={onVote}
          layout="vertical"
        />
      </div>

      {/* 2. Main Post Content Container */}
      <div className="flex-1 p-3.5 sm:p-4 min-w-0 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Post Header: Topic • Posted by • Date • Flair */}
          <div className="flex items-center flex-wrap gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            {/* Topic badge */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onOpenPost && onOpenPost(post);
              }}
              className={`font-bold hover:underline cursor-pointer px-2 py-0.5 rounded-full border text-[10px] ${getCommunityBadgeColor(
                communitySlug,
              )}`}
            >
              {topicLabel}
            </span>

            <span>•</span>

            <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
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

          {/* Post Title - Reddit Bold Style */}
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>

          {/* Post Text - A Little Small as Requested */}
          {post.content && (
            <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
              {post.content}
            </p>
          )}

          {/* Post Image Container (Reddit-style media card) */}
          {post.imageUrl && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onImageClick ? onImageClick(post.imageUrl, post.title) : onOpenPost(post);
              }}
              className="mt-2.5 max-h-80 sm:max-h-96 w-full rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-950/20 dark:bg-slate-950/50 flex items-center justify-center relative group/img cursor-pointer"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                loading="lazy"
                className="w-auto h-auto max-h-80 sm:max-h-96 max-w-full object-contain rounded-lg transition-transform group-hover/img:scale-[1.01]"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center space-x-1">
                <ImageIcon size={11} />
                <span>Click to view</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Bottom Action Bar */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {/* Mobile Vote Buttons */}
          <div className="flex sm:hidden">
            <ForumVoteButtons
              score={post.upvotes ?? post.score ?? 0}
              userReaction={userReaction}
              onVote={onVote}
              layout="horizontal"
              size="sm"
            />
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-slate-400 font-semibold text-[11px] sm:text-xs">
            {/* Comments button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPost && onOpenPost(post);
              }}
              className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <MessageSquare size={13} />
              <span>{totalComments} Comments</span>
            </button>

            {/* Share button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShare && onShare(post);
              }}
              className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Save / Bookmark button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSave && onSave(post);
              }}
              className={`px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1.5 cursor-pointer ${
                isSaved
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Bookmark size={13} className={isSaved ? "fill-current" : ""} />
              <span className="hidden sm:inline">
                {isSaved ? "Saved" : "Save"}
              </span>
            </button>
          </div>

          {/* Associated Course Tag */}
          {post.courseTitle && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[160px] hidden md:inline">
              in {post.courseTitle}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
