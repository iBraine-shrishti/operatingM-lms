import React from "react";
import {
  Users,
  ShieldCheck,
  Plus,
  BookOpen,
  Sparkles,
  Award,
  Globe,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export const COMMUNITIES_LIST = [
  { id: "all", name: "r/all", label: "All Communities", icon: Globe, count: "All" },
  { id: "social-media", name: "r/social-media", label: "Social Media Marketing", icon: Sparkles, count: 185 },
  { id: "google-ads", name: "r/google-ads", label: "Google Ads & PPC", icon: Award, count: 210 },
  { id: "seo-mastery", name: "r/seo-mastery", label: "SEO & Core Web Vitals", icon: Globe, count: 142 },
  { id: "web-dev", name: "r/web-development", label: "WordPress & Web Dev", icon: BookOpen, count: 166 },
  { id: "analytics", name: "r/analytics", label: "GA4 & Data Tracking", icon: ShieldCheck, count: 130 },
  { id: "general-doubts", name: "r/general-doubts", label: "General Q&A", icon: HelpCircle, count: 98 },
];

export const ForumSidebar = ({
  selectedCommunity = "all",
  onSelectCommunity,
  onCreatePostClick,
  totalPostsCount = 0,
}) => {
  return (
    <aside className="space-y-4">
      {/* 1. About Community Card (Reddit Style) */}
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
              <span>r/OperatingMedia</span>
              <ShieldCheck size={14} className="text-blue-500 fill-blue-500/20" />
            </h3>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Official student forum for Operating Media. Share live ad campaigns, ask technical doubts with screenshots, and learn together.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-xs">
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

          {/* Create Post Button */}
          <button
            type="button"
            onClick={onCreatePostClick}
            className="w-full bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-[0.99]"
          >
            <Plus size={14} />
            <span>Create Post / Ask Question</span>
          </button>
        </div>
      </div>

      {/* 2. Subreddits / Communities Filter Card */}
      <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs space-y-2.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Communities & Subreddits
        </h4>

        <div className="space-y-1">
          {COMMUNITIES_LIST.map((comm) => {
            const Icon = comm.icon;
            const isSelected = selectedCommunity === comm.id;
            return (
              <button
                key={comm.id}
                type="button"
                onClick={() => onSelectCommunity && onSelectCommunity(comm.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/70 text-[#3b49df] dark:text-blue-400 font-bold border border-blue-200/80 dark:border-blue-800/80"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Icon size={13} className="shrink-0 text-slate-400" />
                  <span className="truncate">{comm.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal ml-1 shrink-0">
                  {comm.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Community Rules Card */}
      <div className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs space-y-2.5 text-xs">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Community Rules
        </h4>

        <ol className="space-y-2 text-[12px] text-slate-600 dark:text-slate-400 list-decimal pl-4 leading-snug">
          <li>
            <strong className="text-slate-800 dark:text-slate-200 font-semibold">Be respectful:</strong> Support peers with constructive answers.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-200 font-semibold">Upload Screenshots:</strong> Include screenshots when asking for campaign audits or debugging.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-200 font-semibold">No Self-Promotion:</strong> Keep all posts strictly educational and coursework-focused.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-200 font-semibold">Tag the Community:</strong> Use accurate subreddit tags for quick mentor discovery.
          </li>
        </ol>
      </div>

      {/* 4. Footer Links */}
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
