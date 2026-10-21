import React from "react";
import {
  MessageSquare,
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

          {/* Main Content Area: Text (Left) & Compact Thumbnail (Right) Side-by-Side (matching FORUM-ALIGNMENT.png) */}
          <div className="flex items-start justify-between gap-3.5 sm:gap-4 pt-0.5">
            {/* Left Column: Title, Content snippet & Resource Link */}
            <div className="flex-1 min-w-0 space-y-1.5">
              {/* Post Title - Reddit Bold Style */}
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 sm:line-clamp-3">
                {post.title}
              </h2>

              {/* Post Text - Clean Snippet */}
              {post.content && (
                <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                  {post.content}
                </p>
              )}

              {/* Resource / External Article Link (matching FORUM-ALIGNMENT.png) */}
              {(post.linkUrl || post.sourceUrl || post.link) && (
                <div className="pt-0.5">
                  <a
                    href={post.linkUrl || post.sourceUrl || post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#2563eb] dark:text-blue-400 hover:underline font-medium truncate max-w-full"
                  >
                    <ExternalLink size={11} className="shrink-0" />
                    <span className="truncate">
                      {post.linkUrl || post.sourceUrl || post.link}
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Thumbnail Image (side-by-side, compact aspect ratio) */}
            {post.imageUrl && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick ? onImageClick(post.imageUrl, post.title) : onOpenPost(post);
                }}
                className="shrink-0 w-24 h-18 sm:w-32 sm:h-22 md:w-36 md:h-24 lg:w-40 lg:h-26 rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/90 shadow-2xs relative group/thumb cursor-pointer self-start"
                title="Click to view image"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="p-1 rounded-md bg-black/60 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    <ExternalLink size={12} />
                  </div>
                </div>
              </div>
            )}
          </div>
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
