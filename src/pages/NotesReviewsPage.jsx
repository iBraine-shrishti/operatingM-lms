import React, { useState, useMemo } from "react";
import { lmsService } from "../services/lmsService";
import { 
  FileText, Search, Plus, Trash2, Copy, BookOpen, 
  Calendar, Check, X, Bookmark, Filter, ArrowUpDown, 
  SlidersHorizontal, Sparkles, Tag, Target, Share2, 
  BarChart3, Layout, Palette
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";

// Differentiated visual themes for note categories
const NOTE_CATEGORY_THEMES = {
  seo: {
    name: "SEO",
    tag: "SEO Mastery",
    icon: Search,
    accent: "text-emerald-600 dark:text-emerald-400",
    borderAccent: "border-emerald-200 dark:border-emerald-800/60",
    cardBorder: "border-emerald-200/90 hover:border-emerald-400 dark:border-slate-800/80 dark:hover:border-emerald-500/60",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200/90 dark:border-emerald-800/60",
    topGradient: "from-emerald-500 via-teal-500 to-green-600",
    contentBg: "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-100/90 dark:border-emerald-800/40",
    pillDot: "bg-emerald-500",
  },
  ads: {
    name: "Google Ads",
    tag: "Paid Advertising",
    icon: Target,
    accent: "text-blue-600 dark:text-blue-400",
    borderAccent: "border-blue-200 dark:border-blue-800/60",
    cardBorder: "border-blue-200/90 hover:border-blue-400 dark:border-slate-800/80 dark:hover:border-blue-500/60",
    badgeBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200/90 dark:border-blue-800/60",
    iconBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200/90 dark:border-blue-800/60",
    topGradient: "from-blue-600 via-indigo-600 to-cyan-500",
    contentBg: "bg-blue-50/30 dark:bg-blue-950/20 border-blue-100/90 dark:border-blue-800/40",
    pillDot: "bg-blue-500",
  },
  social: {
    name: "Social Media",
    tag: "Social Strategy",
    icon: Share2,
    accent: "text-purple-600 dark:text-purple-400",
    borderAccent: "border-purple-200 dark:border-purple-800/60",
    cardBorder: "border-purple-200/90 hover:border-purple-400 dark:border-slate-800/80 dark:hover:border-purple-500/60",
    badgeBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200/90 dark:border-purple-800/60",
    iconBg: "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200/90 dark:border-purple-800/60",
    topGradient: "from-purple-600 via-fuchsia-600 to-pink-500",
    contentBg: "bg-purple-50/30 dark:bg-purple-950/20 border-purple-100/90 dark:border-purple-800/40",
    pillDot: "bg-purple-500",
  },
  analytics: {
    name: "Analytics",
    tag: "Data & Tracking",
    icon: BarChart3,
    accent: "text-amber-600 dark:text-amber-400",
    borderAccent: "border-amber-200 dark:border-amber-800/60",
    cardBorder: "border-amber-200/90 hover:border-amber-400 dark:border-slate-800/80 dark:hover:border-amber-500/60",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/90 dark:border-amber-800/60",
    iconBg: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200/90 dark:border-amber-800/60",
    topGradient: "from-amber-500 via-orange-500 to-yellow-500",
    contentBg: "bg-amber-50/30 dark:bg-amber-950/20 border-amber-100/90 dark:border-amber-800/40",
    pillDot: "bg-amber-500",
  },
  wordpress: {
    name: "WordPress",
    tag: "CMS & Web Dev",
    icon: Layout,
    accent: "text-teal-600 dark:text-teal-400",
    borderAccent: "border-teal-200 dark:border-teal-800/60",
    cardBorder: "border-teal-200/90 hover:border-teal-400 dark:border-slate-800/80 dark:hover:border-teal-500/60",
    badgeBg: "bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200/90 dark:border-teal-800/60",
    iconBg: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border-teal-200/90 dark:border-teal-800/60",
    topGradient: "from-teal-500 via-emerald-600 to-cyan-600",
    contentBg: "bg-teal-50/30 dark:bg-teal-950/20 border-teal-100/90 dark:border-teal-800/40",
    pillDot: "bg-teal-500",
  },
  design: {
    name: "Design",
    tag: "Creative & UI",
    icon: Palette,
    accent: "text-rose-600 dark:text-rose-400",
    borderAccent: "border-rose-200 dark:border-rose-800/60",
    cardBorder: "border-rose-200/90 hover:border-rose-400 dark:border-slate-800/80 dark:hover:border-rose-500/60",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200/90 dark:border-rose-800/60",
    iconBg: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200/90 dark:border-rose-800/60",
    topGradient: "from-rose-500 via-pink-500 to-red-500",
    contentBg: "bg-rose-50/30 dark:bg-rose-950/20 border-rose-100/90 dark:border-rose-800/40",
    pillDot: "bg-rose-500",
  },
  general: {
    name: "General",
    tag: "Study Notes",
    icon: BookOpen,
    accent: "text-indigo-600 dark:text-indigo-400",
    borderAccent: "border-indigo-200 dark:border-indigo-800/60",
    cardBorder: "border-indigo-200/90 hover:border-indigo-400 dark:border-slate-800/80 dark:hover:border-indigo-500/60",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200/90 dark:border-indigo-800/60",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200/90 dark:border-indigo-800/60",
    topGradient: "from-indigo-600 via-blue-600 to-violet-600",
    contentBg: "bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-100/90 dark:border-indigo-800/40",
    pillDot: "bg-indigo-500",
  },
};

const getNoteCategoryTheme = (category = "", courseTitle = "") => {
  const c = (category || "").toLowerCase();
  const t = (courseTitle || "").toLowerCase();
  if (c.includes("seo") || t.includes("seo")) return NOTE_CATEGORY_THEMES.seo;
  if (c.includes("ads") || c.includes("ppc") || t.includes("ads")) return NOTE_CATEGORY_THEMES.ads;
  if (c.includes("social") || t.includes("social")) return NOTE_CATEGORY_THEMES.social;
  if (c.includes("analytic") || t.includes("analytic")) return NOTE_CATEGORY_THEMES.analytics;
  if (c.includes("word") || c.includes("web") || t.includes("word") || t.includes("web")) return NOTE_CATEGORY_THEMES.wordpress;
  if (c.includes("design") || c.includes("creative") || t.includes("design") || t.includes("creative")) return NOTE_CATEGORY_THEMES.design;
  return NOTE_CATEGORY_THEMES.general;
};

// Rich practical descriptions for standard study notes
const ENHANCED_NOTE_CONTENT = {
  "note-1": `• Vertical 9:16 Video Framework: Short-form Reels and TikToks require a decisive 3-second hook before user drop-off exceeds 60%.
• Audio Trends & Algorithms: Always test trending original sounds within their initial 7 days of algorithmic surge to capitalize on Discovery feed visibility.
• Creative Cadence: Publish 4–5 Reels weekly with high-contrast subtitles centered in the 1080x1920 safe zone for optimal engagement.`,

  "note-2": `• Search Intent Hierarchy: Informational keywords generate broad top-of-funnel traffic but yield lower conversion rates. Focus commercial long-tail queries onto dedicated high-converting product pages.
• SERP Feature Competition: Inspect whether the top 5 ranking positions feature featured snippets, People Also Ask boxes, or video carousels before finalizing headings.
• Keyword Difficulty Rule: Prioritize KD < 35 keywords during initial sprint phases to secure rapid topical authority on Google.`,

  "note-3": `• Conversion Event Setup: Always designate custom GTM trigger events as 'Key Events' within GA4 Admin properties prior to publishing Looker Studio dashboards.
• Attribution Stability: Allow 24–48 hours for data attribution backfill and cross-device modeling to stabilize before reporting to stakeholders.
• DebugView Protocol: Validate all data layer variables inside Tag Assistant and the live GA4 DebugView stream before deploying container changes to production.`,

  "note-4": `• Smart Bidding Calibration: Ensure Performance Max campaigns accrue at least 30 conversions over a 30-day window before switching to Target ROAS bidding to prevent volatility.
• Comprehensive Asset Group: Upload full asset sets (at least 5 punchy headlines, 5 long descriptions, 1200x628 landscape banners, and square brand logos).
• Account Exclusions: Implement account-level placement exclusion lists to avoid wasting ad spend on low-intent mobile gaming apps.`,

  "note-5": `• DOM Tree Optimization: Convert legacy section and column wrappers into modern CSS Flexbox containers to reduce total DOM depth by up to 40%.
• LCP Optimization: Preload the hero banner using fetchpriority="high" and convert high-resolution assets into next-gen WebP format.
• Script Deferral: Dequeue unused block stylesheets and defer non-critical JavaScript to guarantee a Largest Contentful Paint under 1.2 seconds.`,

  "note-6": `• 8pt Grid Discipline: Maintain a strict 8-point spatial system for margin, padding, and layout bounding boxes to preserve visual rhythm and design consistency.
• Color Space Fidelity: Export all web and social media ad creatives using sRGB color profiles to eliminate desaturation discrepancies across iOS Safari and Android screens.
• Typographic Scale: Utilize a 1.25 major-third scale (12px, 14px, 16px, 20px, 24px, 32px, 40px) with minimum 140% line-height for clean readability.`
};

export const NotesReviewsPage = () => {
  const { showToast } = useToast();
  const [notes, setNotes] = useState(() => lmsService.getNotes());
  const courses = lmsService.getCourses();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'title'
  const [copiedId, setCopiedId] = useState(null);

  // New Note Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || "course-1");
  const [newCategory, setNewCategory] = useState("General");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set(["All Notes"]);
    notes.forEach((n) => {
      if (n.category) set.add(n.category);
    });
    ["Social Media", "SEO", "Analytics", "Google Ads", "WordPress", "Design"].forEach(c => set.add(c));
    return Array.from(set);
  }, [notes]);

  // Filtered & Sorted Notes
  const filteredNotes = useMemo(() => {
    let result = notes.filter((n) => {
      // Search text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesContent = n.content?.toLowerCase().includes(q);
        const matchesLesson = n.lessonTitle?.toLowerCase().includes(q);
        const matchesCourse = n.courseTitle?.toLowerCase().includes(q);
        const matchesCat = n.category?.toLowerCase().includes(q);
        if (!matchesContent && !matchesLesson && !matchesCourse && !matchesCat) {
          return false;
        }
      }

      // Course filter
      if (selectedCourse !== "all") {
        const courseObj = courses.find((c) => c.id === selectedCourse);
        if (courseObj && n.courseTitle !== courseObj.title && n.courseId !== selectedCourse) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && selectedCategory !== "All Notes") {
        if (n.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "title") {
        return (a.lessonTitle || "").localeCompare(b.lessonTitle || "");
      }
      if (sortBy === "oldest") {
        return (a.id || "").localeCompare(b.id || "");
      }
      // default: newest
      return (b.id || "").localeCompare(a.id || "");
    });

    return result;
  }, [notes, searchQuery, selectedCourse, selectedCategory, sortBy, courses]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCourse !== "all" || selectedCategory !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("all");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  const handleCopyNote = (note) => {
    const textToCopy = ENHANCED_NOTE_CONTENT[note.id] || note.content;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(note.id);
    showToast("Note content copied to clipboard!", "success", "Copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteNote = (id, lessonTitle) => {
    lmsService.deleteNote(id);
    setNotes(lmsService.getNotes());
    showToast(`Note for "${lessonTitle}" removed.`, "info", "Note Deleted");
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !newContent.trim()) {
      showToast("Please provide both a lesson topic and note content.", "warning", "Incomplete Form");
      return;
    }

    const courseObj = courses.find((c) => c.id === newCourseId);
    const courseTitle = courseObj ? courseObj.title : "Digital Marketing";

    lmsService.addNote({
      courseId: newCourseId,
      courseTitle,
      lessonTitle: newLessonTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
    });

    setNotes(lmsService.getNotes());
    setIsModalOpen(false);
    setNewLessonTitle("");
    setNewContent("");
    showToast("New study note saved successfully!", "success", "Note Created");
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - FULLY RESPONSIVE WITH BRANDED BACKGROUND      */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="relative dashboard-hero-banner rounded-2xl border border-blue-100/80 dark:border-blue-900/40 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all overflow-hidden"
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400 text-sm font-extrabold uppercase tracking-wider">
            <Bookmark size={17} />
            <span>Study Space & Notebook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Study Notes & Reference Notebook
          </h1>
          <p className="text-slate-900/90 dark:text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed font-semibold">
            Search, filter, and review key formulas, frameworks, definitions, and technical checklists across all your enrolled courses.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 text-sm font-medium">
            <div className="flex items-center space-x-1.5 text-slate-800 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b49df] inline-block"></span>
              <span className="font-extrabold text-slate-900 dark:text-white">{notes.length}</span>
              <span className="text-slate-800 dark:text-slate-300 font-semibold">Total Notes</span>
            </div>
            {hasActiveFilters && (
              <div className="flex items-center space-x-1.5 text-slate-800 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="font-extrabold text-slate-900 dark:text-white">{filteredNotes.length}</span>
                <span className="text-slate-800 dark:text-slate-300 font-semibold">Matching Filter</span>
              </div>
            )}
            <div className="flex items-center space-x-1.5 text-slate-800 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
              <span className="font-extrabold text-slate-900 dark:text-white">6 Domains</span>
              <span className="text-slate-800 dark:text-slate-300 font-semibold">Covered</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#3b49df] hover:bg-[#2f3cb3] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>Add New Note</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR - RESPONSIVE STACKED & GRID DESIGN        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Row: Search + Course Filter + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Live Search Input */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by keyword, lesson topic, concept..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter by Course Select */}
          <div className="md:col-span-3 lg:col-span-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Enrolled Courses ({notes.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer"
              >
                <option value="newest">Sort: Newest Added</option>
                <option value="oldest">Sort: Oldest Added</option>
                <option value="title">Sort: Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second Row: Topic/Category Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar pb-1.5 sm:pb-0 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline-block shrink-0">
              Categories:
            </span>
            {categories.map((cat) => {
              const isActive = (cat === "All Notes" && selectedCategory === "all") || selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === "All Notes" ? "all" : cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#3b49df] text-white shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Active Filter Clear action */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline flex items-center space-x-1 self-start sm:self-auto cursor-pointer shrink-0"
            >
              <X size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NOTES GRID - DIFFERENTIATED CARDS WITH RICH DESCRIPTIONS      */}
      {/* ------------------------------------------------------------- */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
            <FileText size={26} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            No notes matched your search criteria
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {hasActiveFilters
              ? "Try broadening your keywords or clearing the category and course filters to view more notes."
              : "You haven't created any lecture notes yet. Click the button below to add your first note!"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#3b49df] text-white hover:bg-[#2f3cb3] transition-colors cursor-pointer"
            >
              + Add New Note
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredNotes.map((note) => {
            const theme = getNoteCategoryTheme(note.category, note.courseTitle);
            const CategoryIcon = theme.icon;
            const contentText = ENHANCED_NOTE_CONTENT[note.id] || note.content;

            return (
              <div
                key={note.id}
                className={`bg-white dark:bg-[#0b1329] rounded-2xl border shadow-xs hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all duration-200 flex flex-col justify-between overflow-hidden group ${theme.cardBorder}`}
              >
                {/* Top Vibrant Accent Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${theme.topGradient}`} />

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Header Row: Category Badge + Date */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg border ${theme.badgeBg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.pillDot}`} />
                        <span>{note.category || theme.name}</span>
                      </span>

                      <span className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        <Calendar size={12} />
                        <span>{note.createdAt}</span>
                      </span>
                    </div>

                    {/* Course Title Badge */}
                    <div className="pt-0.5">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-0.5 rounded-md inline-block">
                        {note.courseTitle}
                      </span>
                    </div>

                    {/* Middle Row: Themed Icon Badge + Lesson Title */}
                    <div className="flex items-start gap-3 pt-1">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs mt-0.5 ${theme.iconBg}`}>
                        <CategoryIcon size={20} className={theme.accent} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-[#3b49df] dark:group-hover:text-blue-400 transition-colors break-words">
                          {note.lessonTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Note Body Box: Increased Font Size & Rich Description */}
                    <div className={`text-sm sm:text-[13.5px] text-slate-700 dark:text-slate-300 ${theme.contentBg} border p-4 rounded-xl leading-relaxed whitespace-pre-line break-words font-medium`}>
                      {contentText}
                    </div>
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleCopyNote({ ...note, content: contentText })}
                    className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-200 hover:text-[#3b49df] dark:hover:text-blue-400 font-bold py-1.5 px-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer active:scale-95 shadow-2xs"
                  >
                    {copiedId === note.id ? (
                      <>
                        <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Note</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hidden sm:inline-block">
                      {theme.tag}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id, note.lessonTitle)}
                      className="flex items-center space-x-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 font-semibold py-1.5 px-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer active:scale-95"
                      title="Delete note"
                    >
                      <Trash2 size={14} />
                      <span className="text-[11px]">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ADD NEW NOTE MODAL - FULLY RESPONSIVE                         */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#3b49df] dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Bookmark size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Add New Study Note</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Capture important ideas, formulas, or strategies.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Related Course *
                </label>
                <select
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Lesson Topic / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="e.g. 02 Keyword Intent Mapping"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500"
                  >
                    <option value="General">General</option>
                    <option value="Social Media">Social Media</option>
                    <option value="SEO">SEO</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="WordPress">WordPress</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Note Content / Summary *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Jot down formulas, framework steps, code snippets, or lecture insights..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#3b49df] hover:bg-[#2f3cb3] text-white font-semibold shadow-xs transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Plus size={15} />
                  <span>Save Note</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesReviewsPage;
