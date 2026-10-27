import React, { useState, useRef } from "react";
import { MessageSquare, Send, X, CornerDownRight, CheckCircle2 } from "lucide-react";
import { ForumVoteButtons } from "./ForumVoteButtons";
import { cleanAuthorHandle } from "./ForumSidebar";

const KNOWN_AUTHORS = [
  "Aryan Jawale",
  "Ayesha Chunawala",
  "Sahil Hasolkar",
  "Prem Chaurasiya",
  "Vikram Malhotra",
  "Rohan Mehta",
  "Harsh Pareek",
  "Sneha Roy",
  "Aarav Sharma",
  "Pooja Hegde",
  "Karan Patel",
];

/**
 * Resolves avatar URL:
 * - If base64 data URL: returns as-is
 * - If mock image (unsplash, default boy/girl): returns null
 * - If absolute URL: returns as-is
 * - If relative URL: prefixes with CRM API host (operatingmedia.org or localhost)
 */
export const resolveAvatarUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  const lower = url.toLowerCase().trim();
  if (
    lower.includes("photo-1472099645785") ||
    lower.includes("photo-1534528741775") ||
    lower.includes("unsplash.com") ||
    lower.includes("boy.png") ||
    lower.includes("girl.png") ||
    lower.includes("profile-pic.png") ||
    lower.includes("sahil-clean-avatar") ||
    lower.includes("sahil-profile")
  ) {
    return null;
  }
  if (url.startsWith("data:image")) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) {
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");
    const apiHost = isLocal
      ? "https://crm.dmsoi.org"
      : "https://operatingmedia.org";
    return `${apiHost}${url}`;
  }
  return url;
};

/**
 * ForumAvatar: Renders image with onError fallback to stylish initials badge.
 * Eliminates broken image icons.
 */
export const ForumAvatar = ({
  src,
  name = "User",
  role = "Student",
  className = "w-5 h-5 rounded-full object-cover shrink-0",
}) => {
  const [hasError, setHasError] = useState(false);
  const resolved = resolveAvatarUrl(src);

  const getInitials = (n) => {
    if (!n) return "U";
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const isOfficial =
    role &&
    (role.toLowerCase().includes("instructor") ||
      role.toLowerCase().includes("admin") ||
      role.toLowerCase().includes("faculty"));

  if (!resolved || hasError) {
    return (
      <div
        className={`${className} flex items-center justify-center font-bold text-[9px] select-none text-white shrink-0 ${
          isOfficial
            ? "bg-gradient-to-tr from-amber-500 to-orange-500"
            : "bg-gradient-to-tr from-blue-600 to-indigo-600"
        }`}
        title={name}
      >
        {isOfficial && (name || "").toLowerCase().includes("admin")
          ? "AD"
          : getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={name}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

// Formats inline @mentions in any comment text
const formatInlineMentions = (text = "") => {
  if (!text) return null;
  const parts = text.split(/(@[A-Za-z0-9_\.]+)/g);
  return parts.map((part, idx) =>
    part && part.startsWith("@") ? (
      <span
        key={idx}
        className="inline-flex items-center font-bold text-[#3b49df] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-1.5 py-0.2 rounded text-[11px] sm:text-xs mr-0.5 select-none"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};

// Helper to highlight @mentions inside comments (full name + surname highlighted together)
export const formatCommentContent = (content = "", replyToAuthor = null, threadAuthors = []) => {
  if (!content) return null;

  // 1. If explicit replyToAuthor is provided (e.g. "Aryan Jawale")
  if (replyToAuthor) {
    const cleanMention = `@${replyToAuthor.replace(/^@/, "").trim()}`;
    const escaped = cleanMention.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${escaped}\\s*`, "i");
    if (regex.test(content)) {
      const restText = content.replace(regex, "");
      return (
        <span>
          <span className="inline-flex items-center font-bold text-[#3b49df] dark:text-blue-300 bg-blue-100/90 dark:bg-blue-950/90 border border-blue-200/90 dark:border-blue-800/80 px-2 py-0.5 rounded-md text-[11px] sm:text-xs mr-1.5 shadow-2xs select-none">
            {cleanMention}
          </span>
          {formatInlineMentions(restText)}
        </span>
      );
    }
  }

  // 2. Check candidate authors (thread authors + known students & staff)
  const candidateAuthors = [
    ...(Array.isArray(threadAuthors) ? threadAuthors : []),
    ...KNOWN_AUTHORS,
  ].filter(Boolean);

  // Sort by length descending so longer full names match first
  const sortedCandidates = Array.from(new Set(candidateAuthors)).sort(
    (a, b) => b.length - a.length
  );

  for (const author of sortedCandidates) {
    const prefix = `@${author.replace(/^@/, "").trim()}`;
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const reg = new RegExp(`^${escaped}(\\s+.*|$)`, "i");
    const match = content.match(reg);
    if (match) {
      const restText = (match[1] || "").trimStart();
      return (
        <span>
          <span className="inline-flex items-center font-bold text-[#3b49df] dark:text-blue-300 bg-blue-100/90 dark:bg-blue-950/90 border border-blue-200/90 dark:border-blue-800/80 px-2 py-0.5 rounded-md text-[11px] sm:text-xs mr-1.5 shadow-2xs select-none">
            {prefix}
          </span>
          {formatInlineMentions(restText)}
        </span>
      );
    }
  }

  // 3. Fallback: match full name mentions (@FirstName LastName)
  const fullMentionMatch = content.match(
    /^(@[A-Z][a-zA-Z0-9_.\-]*(?:\s+[A-Z][a-zA-Z0-9_.\-]*)+)(?:\s+(.*)|$)/s
  );
  if (fullMentionMatch) {
    const mention = fullMentionMatch[1];
    const rest = fullMentionMatch[2] || "";
    return (
      <span>
        <span className="inline-flex items-center font-bold text-[#3b49df] dark:text-blue-300 bg-blue-100/90 dark:bg-blue-950/90 border border-blue-200/90 dark:border-blue-800/80 px-2 py-0.5 rounded-md text-[11px] sm:text-xs mr-1.5 shadow-2xs select-none">
          {mention}
        </span>
        {formatInlineMentions(rest)}
      </span>
    );
  }

  // 4. Single-word mention fallback (@username)
  const singleMatch = content.match(/^(@[A-Za-z0-9_\.\-]+)(?:\s+(.*)|$)/s);
  if (singleMatch) {
    const mention = singleMatch[1];
    const rest = singleMatch[2] || "";
    return (
      <span>
        <span className="inline-flex items-center font-bold text-[#3b49df] dark:text-blue-300 bg-blue-100/90 dark:bg-blue-950/90 border border-blue-200/90 dark:border-blue-800/80 px-2 py-0.5 rounded-md text-[11px] sm:text-xs mr-1.5 shadow-2xs select-none">
          {mention}
        </span>
        {formatInlineMentions(rest)}
      </span>
    );
  }

  return <span>{formatInlineMentions(content)}</span>;
};

export const ForumCommentNode = ({
  comment,
  depth = 0,
  onReplySubmit,
  onCommentVote,
  commentVotes = {},
  currentUser,
  threadAuthors = [],
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const textareaRef = useRef(null);

  const authorDisplay = cleanAuthorHandle(comment.authorHandle, comment.authorName);
  const targetAuthor = cleanAuthorHandle(comment.authorHandle, comment.authorName);
  const voteData = commentVotes[comment.id] || {
    score: comment.likesCount ?? comment.score ?? comment.upvotes ?? 0,
    reaction: comment.userReaction || (comment.userVote === 1 ? "up" : (comment.userVote === -1 ? "down" : null)),
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onReplySubmit &&
      onReplySubmit({
        parentId: comment.id,
        replyToAuthor: targetAuthor,
        content: `@${targetAuthor} ${replyText.trim()}`,
        authorName: currentUser?.name || "Student",
        authorRole: currentUser?.role || "Student",
        authorAvatar: currentUser?.avatar || currentUser?.photo || null,
      });

    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div
      className={`relative ${
        depth > 0
          ? "ml-4 sm:ml-7 pl-3 border-l-2 border-slate-200/80 dark:border-slate-800"
          : ""
      }`}
    >
      {/* Comment Card */}
      <div className="py-2.5 space-y-1.5 group/comment">
        {/* Comment Header: Avatar, Author, Role Flair, Date */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
          <ForumAvatar
            src={comment.authorAvatar}
            name={comment.authorName}
            role={comment.authorRole}
            className="w-5 h-5 rounded-full object-cover shrink-0"
          />
          <span className="font-bold text-slate-900 dark:text-white truncate">
            {authorDisplay}
          </span>

          {comment.authorRole && (
            <span
              className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                comment.authorRole.toLowerCase().includes("instructor") ||
                comment.isOfficial
                  ? "bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 border-blue-200/80 dark:border-blue-800/60"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
            >
              {comment.authorRole}
            </span>
          )}

          {comment.isOfficial && (
            <span className="inline-flex items-center space-x-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={10} />
              <span>Verified</span>
            </span>
          )}

          <span>•</span>
          <span className="tabular-nums">{comment.createdAt || "Just now"}</span>

          {/* Toggle collapse thread */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 ml-auto cursor-pointer"
          >
            {isCollapsed ? "[+ Expand]" : "[- Collapse]"}
          </button>
        </div>

        {/* Comment Body */}
        {!isCollapsed && (
          <>
            <div className="text-[12px] sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
              {formatCommentContent(
                comment.content,
                comment.replyToAuthor,
                threadAuthors
              )}
            </div>

            {/* Comment Action Footer: Thumbs up / down + Reply button */}
            <div className="flex items-center space-x-2 pl-7 pt-1">
              <ForumVoteButtons
                score={voteData.score}
                userReaction={voteData.reaction}
                onVote={(type) =>
                  onCommentVote && onCommentVote(comment.id, type)
                }
                layout="horizontal"
                size="sm"
              />

              <button
                type="button"
                onClick={() => {
                  setIsReplying(!isReplying);
                  setReplyText("");
                }}
                className="px-2 py-1 rounded text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <MessageSquare size={12} />
                <span>Reply</span>
              </button>
            </div>

            {/* Inline Reply Composer */}
            {isReplying && (
              <form onSubmit={handleSendReply} className="mt-2.5 ml-7 space-y-2">
                <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 sm:p-3 focus-within:border-[#3b49df] focus-within:ring-2 focus-within:ring-[#3b49df]/20 transition-all shadow-xs">
                  <div className="flex items-start gap-2">
                    {/* Format: @Name is ALWAYS 1st and HIGHLIGHTED */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-[#3b49df] dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/80 text-xs font-bold shrink-0 select-none shadow-2xs mt-0.5">
                      <span className="opacity-70">@</span>
                      <span>{targetAuthor}</span>
                    </div>

                    {/* Text input directly after @Name */}
                    <textarea
                      ref={textareaRef}
                      rows={2}
                      autoFocus
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Type your reply to @${targetAuthor}...`}
                      className="flex-1 bg-transparent border-0 p-1 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-0 resize-none leading-relaxed min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center space-x-1">
                    <CornerDownRight size={12} />
                    <span>
                      Replying to{" "}
                      <strong className="text-slate-700 dark:text-slate-200 font-semibold">
                        @{targetAuthor}
                      </strong>
                    </span>
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsReplying(false);
                        setReplyText("");
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="px-3.5 py-1.5 rounded-lg bg-[#3b49df] hover:bg-[#2f3ab2] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer active:scale-98"
                    >
                      <Send size={12} />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Recursive Child Replies Loop */}
            {Array.isArray(comment.replies) && comment.replies.length > 0 && (
              <div className="mt-1 space-y-1">
                {comment.replies.map((child) => (
                  <ForumCommentNode
                    key={child.id}
                    comment={child}
                    depth={depth + 1}
                    onReplySubmit={onReplySubmit}
                    onCommentVote={onCommentVote}
                    commentVotes={commentVotes}
                    currentUser={currentUser}
                    threadAuthors={threadAuthors}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
