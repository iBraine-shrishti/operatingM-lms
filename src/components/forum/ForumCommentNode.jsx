import React, { useState } from "react";
import { MessageSquare, Send, X, CornerDownRight, CheckCircle2 } from "lucide-react";
import { ForumVoteButtons } from "./ForumVoteButtons";
import { cleanAuthorHandle } from "./ForumSidebar";

// Helper to highlight @mentions inside comments
const formatCommentContent = (text = "") => {
  if (!text) return null;
  const mentionRegex = /(@[A-Za-z0-9_]+(?:\s+[A-Za-z0-9_]+)?)/g;
  const parts = text.split(mentionRegex);

  return (
    <span>
      {parts.map((part, idx) => {
        if (part && part.startsWith("@")) {
          return (
            <span
              key={idx}
              className="font-bold text-[#3b49df] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded mr-1"
            >
              {part}
            </span>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
};

export const ForumCommentNode = ({
  comment,
  depth = 0,
  onReplySubmit,
  onCommentVote,
  commentVotes = {},
  currentUser,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const authorDisplay = cleanAuthorHandle(comment.authorHandle, comment.authorName);
  const voteData = commentVotes[comment.id] || {
    score: comment.likesCount || comment.score || 0,
    reaction: null,
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onReplySubmit &&
      onReplySubmit({
        parentId: comment.id,
        content: replyText.trim(),
        authorName: currentUser?.name || "Student",
        authorRole: currentUser?.role || "Student",
        authorAvatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      });

    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className={`relative ${depth > 0 ? "ml-4 sm:ml-7 pl-3 border-l-2 border-slate-200/80 dark:border-slate-800" : ""}`}>
      {/* Comment Card */}
      <div className="py-2.5 space-y-1.5 group/comment">
        {/* Comment Header: Avatar, Author, Role Flair, Date */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
          <img
            src={
              comment.authorAvatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            }
            alt={comment.authorName}
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
              {formatCommentContent(comment.content)}
            </div>

            {/* Comment Action Footer: Thumbs up / down + Reply button */}
            <div className="flex items-center space-x-2 pl-7 pt-1">
              <ForumVoteButtons
                score={voteData.score}
                userReaction={voteData.reaction}
                onVote={(type) => onCommentVote && onCommentVote(comment.id, type)}
                layout="horizontal"
                size="sm"
              />

              <button
                type="button"
                onClick={() => {
                  setIsReplying(!isReplying);
                  if (!isReplying) {
                    setReplyText(`@${comment.authorName} `);
                  }
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
                <textarea
                  rows={2}
                  autoFocus
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Replying to ${authorDisplay}...`}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsReplying(false)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1 rounded-lg bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs font-bold transition-all shadow-2xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Send size={11} />
                    <span>Reply</span>
                  </button>
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
