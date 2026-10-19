import React from "react";
import { ShieldCheck } from "lucide-react";

export const TOPIC_CATEGORIES = [
  { id: "all", label: "All Discussions" },
  { id: "google-ads", label: "Google Ads & PPC" },
  { id: "seo-mastery", label: "SEO Mastery" },
  { id: "social-media", label: "Social Media" },
  { id: "web-development", label: "Web Development" },
  { id: "analytics", label: "Analytics & GA4" },
  { id: "general-doubts", label: "General Q&A" },
];

export const getTopicLabel = (slug = "") => {
  if (!slug) return "General";
  const clean = slug.replace(/^r\//, "").toLowerCase();
  const found = TOPIC_CATEGORIES.find((t) => t.id === clean);
  if (found) return found.label;
  if (clean === "web-dev") return "Web Development";
  return clean
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export const cleanAuthorHandle = (handle = "", name = "") => {
  if (name && name.trim()) return name.trim();
  if (!handle) return "Student";
  return handle.replace(/^u\//, "").replace(/\s+/g, "_");
};

export const ForumSidebar = ({
  totalPostsCount = 0,
}) => {
  return (
    <aside className="space-y-4 sticky top-20">
      {/* 1. About Community Card */}
      <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* Banner strip */}
        <div className="h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
          <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-full bg-white dark:bg-[#0b1329] ring-2 ring-white dark:ring-[#0b1329] shadow-sm flex items-center justify-center text-[#3b49df] dark:text-blue-400 font-black text-sm">
            OM
          </div>
        </div>

        <div className="p-4 pt-6 space-y-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <span>Operating Media Community</span>
              <ShieldCheck size={14} className="text-blue-500 fill-blue-500/20" />
            </h3>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Official student forum for Operating Media. Share live ad campaigns, ask technical doubts with screenshots, and learn together.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 gap-2 py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Members
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                1,420
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online</span>
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                48
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Footer Links */}
      <div className="text-[10px] text-slate-400 dark:text-slate-500 px-2 space-y-1">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <span>Operating Media LMS Forums</span>
          <span>•</span>
          <span>Terms</span>
          <span>•</span>
          <span>Privacy Policy</span>
        </div>
        <p>© 2026 Operating Media Inc. All rights reserved.</p>
      </div>
    </aside>
  );
};
