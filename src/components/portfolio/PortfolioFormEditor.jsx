import React, { useState, useRef } from "react";
import {
  Palette,
  User,
  Layers,
  FileText,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Shuffle,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Sparkles,
  Camera,
  Search,
  Globe,
  TrendingUp,
  Award,
  Video,
  Box,
  Cpu,
  Zap,
  ShoppingBag,
  Users,
  Briefcase,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  Sliders,
  DollarSign,
  Target,
  Clock,
  Play,
  Share2,
} from "lucide-react";
import { PORTFOLIO_THEMES } from "./portfolioThemes";
import { MODULES_CATALOG, DEFAULT_MODULE_ORDER, createInitialPortfolioData } from "./portfolioData";
import { PRESET_AVATARS } from "./ImageUploadModal";
import { useAuth } from "../../context/AuthContext";

export const PortfolioFormEditor = ({
  data,
  onChange,
  theme,
  onThemeChange,
  moduleVisibility = {},
  onToggleModule,
  onReset,
}) => {
  const { currentUser, crmProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all"); // "all", "profile", "m1-5", "m6-13", "settings"
  const [openSections, setOpenSections] = useState({
    personal: true,
    highlights: false,
    wordpress: false,
    canva: false,
    socialOrganic: false,
    socialMarketing: false,
    googleAds: false,
    theme: false,
    sequence: false,
  });

  const avatarFileInputRef = useRef(null);

  const defaultData = React.useMemo(() => createInitialPortfolioData(currentUser, crmProfile), [currentUser, crmProfile]);
  const student = data?.student || defaultData.student;
  const modules = { ...defaultData.modules, ...(data?.modules || {}) };
  const moduleOrder =
    Array.isArray(data?.moduleOrder) && data.moduleOrder.length > 0
      ? data.moduleOrder
      : defaultData.moduleOrder;

  // Toggle accordion open/close
  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const expandAll = () => {
    const all = {
      personal: true,
      highlights: true,
      wordpress: true,
      canva: true,
      socialOrganic: true,
      socialMarketing: true,
      googleAds: true,
      seo: true,
      digitalPlanning: true,
      influencerMarketing: true,
      shopify: true,
      videoEditing: true,
      dropshipping: true,
      aiApp: true,
      performanceMarketing: true,
      sequence: true,
      theme: true,
    };
    setOpenSections(all);
  };

  const collapseAll = () => {
    setOpenSections({});
  };

  // Student field update helper
  const handleStudentFieldChange = (field, val) => {
    onChange({
      ...data,
      student: {
        ...student,
        [field]: val,
      },
    });
  };

  // 4 Top stat highlights update helper
  const handleHighlightChange = (index, field, val) => {
    const updated = [...(student.highlights || [])];
    updated[index] = { ...updated[index], [field]: val };
    onChange({
      ...data,
      student: {
        ...student,
        highlights: updated,
      },
    });
  };

  // Socials updater
  const handleSocialChange = (index, field, val) => {
    const updated = [...(student.socials || [])];
    updated[index] = { ...updated[index], [field]: val };
    onChange({
      ...data,
      student: {
        ...student,
        socials: updated,
      },
    });
  };

  const handleAddSocial = () => {
    const newSocial = { platform: "globe", url: "https://", label: "Website" };
    onChange({
      ...data,
      student: {
        ...student,
        socials: [...(student.socials || []), newSocial],
      },
    });
  };

  const handleRemoveSocial = (index) => {
    const updated = (student.socials || []).filter((_, i) => i !== index);
    onChange({
      ...data,
      student: {
        ...student,
        socials: updated,
      },
    });
  };

  // Generic module data updater
  const handleModuleDataChange = (moduleKey, updatedContent) => {
    onChange({
      ...data,
      modules: {
        ...modules,
        [moduleKey]: updatedContent,
      },
    });
  };

  // Generic Image file uploader
  const handleImageFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Image exceeds 3MB. Please choose a smaller photo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === "string") {
          callback(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Sync photo directly from student account in backend / CRM
  const handleSyncBackendPhoto = () => {
    const backendAvatar =
      currentUser?.avatar ||
      currentUser?.profilePicture ||
      crmProfile?.photo ||
      crmProfile?.avatar ||
      (typeof localStorage !== "undefined" ? localStorage.getItem("om_lms_student_avatar") : null);

    if (backendAvatar) {
      handleStudentFieldChange("avatarUrl", backendAvatar);
      alert("Profile photo synced from student LMS account!");
    } else {
      alert("No backend photo found in current student account. You can upload one using the 'Upload Custom Photo' button.");
    }
  };

  // Highlights Add/Remove
  const handleAddHighlight = () => {
    const updated = [
      ...(student.highlights || []),
      { label: "New Verified Metric", value: "98.4%", detail: "Campaign Performance" },
    ];
    onChange({ ...data, student: { ...student, highlights: updated } });
  };

  const handleRemoveHighlight = (index) => {
    const updated = (student.highlights || []).filter((_, i) => i !== index);
    onChange({ ...data, student: { ...student, highlights: updated } });
  };

  // Canva Add/Remove
  const handleRemoveCanvaDesign = (dIdx) => {
    const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
    const updated = current.filter((_, i) => i !== dIdx);
    handleModuleDataChange("canva", { ...modules.canva, designs: updated });
  };

  const handleAddCanvaDesign = () => {
    const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
    const newDesign = {
      id: `canva-d-${Date.now()}`,
      title: "New Marketing Creative Showcase",
      category: "Display Banner",
      dimensions: "1200 x 628 px",
      description: "Custom-designed high-CTR advertising asset created in Canva.",
      imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800",
    };
    handleModuleDataChange("canva", { ...modules.canva, designs: [...current, newDesign] });
  };

  const handleRemoveCanvaVideo = (vIdx) => {
    const current = modules.canva?.videos || [];
    const updated = current.filter((_, i) => i !== vIdx);
    handleModuleDataChange("canva", { ...modules.canva, videos: updated });
  };

  const handleAddCanvaVideo = () => {
    const current = modules.canva?.videos || [];
    const newVideo = {
      id: `canva-v-${Date.now()}`,
      title: "New Short-Form Video Reel",
      format: "9:16 Vertical Reel",
      duration: "0:30 Reel",
      description: "High-retention mobile video ad with kinetic typography.",
      hook: "Stop scrolling if you want to scale your ROAS.",
      thumbnailUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800",
    };
    handleModuleDataChange("canva", { ...modules.canva, videos: [...current, newVideo] });
  };

  // WordPress Add/Remove
  const handleRemoveWordPress = (pIdx) => {
    const current = Array.isArray(modules.wordpress) ? modules.wordpress : [];
    const updated = current.filter((_, i) => i !== pIdx);
    handleModuleDataChange("wordpress", updated);
  };

  const handleAddWordPress = () => {
    const current = Array.isArray(modules.wordpress) ? modules.wordpress : [];
    const newProj = {
      id: `wp-${Date.now()}`,
      title: "New Client Website & E-commerce Store",
      clientType: "Direct-to-Consumer Brand",
      description: "Custom Elementor Pro and WooCommerce build optimized for mobile conversion and Core Web Vitals.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      liveUrl: "https://demo.example.com",
      speedScore: 95,
      mobileOptimized: true,
      techStack: ["WordPress 6.4", "Elementor Pro", "WooCommerce", "Cloudflare CDN"],
      keyFeatures: [
        "Custom Sticky Add-to-Cart with dynamic variant selectors",
        "Automated Customer Review Schema markup for rich Google stars",
        "Google Tag Manager & Meta Pixel server-side events configured",
        "Mobile-first responsive drawer navigation with instant search",
      ],
    };
    handleModuleDataChange("wordpress", [...current, newProj]);
  };

  // SMO Add/Remove
  const handleRemoveSMO = (sIdx) => {
    const current = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
    const updated = current.filter((_, i) => i !== sIdx);
    handleModuleDataChange("socialOrganic", updated);
  };

  const handleAddSMO = () => {
    const current = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
    const newProfile = {
      id: `smo-${Date.now()}`,
      platform: "YouTube",
      handle: "@brand_growth",
      followers: "24,500",
      growthRate: "+45% in 90 days",
      engagementRate: "5.8%",
      bioSetup: "High-converting video channel funnel driving organic newsletter subscribers and trial signups.",
      pillars: ["Tutorial Teardowns", "Industry Analysis", "Short-Form Tips", "Behind the Scenes"],
      metrics: {
        impressions: "340k/mo",
        topReach: "85k views",
        savesOrShares: "4.2k shares",
      },
    };
    handleModuleDataChange("socialOrganic", [...current, newProfile]);
  };

  // Meta Add/Remove
  const handleRemoveMetaAd = (aIdx) => {
    const current = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
    const updated = current.filter((_, i) => i !== aIdx);
    handleModuleDataChange("socialMarketing", updated);
  };

  const handleAddMetaAd = () => {
    const current = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
    const newAd = {
      id: `meta-${Date.now()}`,
      title: "Meta Advantage+ Scaling Sprint",
      objective: "Purchases & High AOV Acquisition",
      budget: "₹180,000/mo",
      creativeAngle: "Founder Origin Story UGC + Direct Product Demo",
      metrics: {
        spend: "₹180,000",
        roasOrCpa: "4.15x ROAS",
        cpc: "₹14.20",
        ctr: "2.85%",
      },
      targetAudience: "Advantage+ Broad (Age 24-48, Pan-India High Intent)",
      copywritingFramework: "PAS (Problem-Agitate-Solution)",
      sampleAdCopy: "Still struggling with fatigue after 2 PM? Watch how 10,000+ professionals solved it with our ergonomic setup.",
    };
    handleModuleDataChange("socialMarketing", [...current, newAd]);
  };

  // Google Add/Remove
  const handleRemoveGoogleAd = (gIdx) => {
    const current = Array.isArray(modules.googleAds) ? modules.googleAds : [];
    const updated = current.filter((_, i) => i !== gIdx);
    handleModuleDataChange("googleAds", updated);
  };

  const handleAddGoogleAd = () => {
    const current = Array.isArray(modules.googleAds) ? modules.googleAds : [];
    const newGad = {
      id: `gad-${Date.now()}`,
      campaignName: "High Intent Search - Core Category Solutions",
      type: "Search Campaign (Exact & Phrase Match)",
      adScore: "9.2/10 Quality Score",
      budget: "₹120,000/mo",
      metrics: {
        clicks: "8,400",
        conversions: "385",
        roas: "4.30x ROAS",
        avgCpc: "₹14.28",
      },
      targetKeywords: [
        "[best organic skincare barrier]",
        "\"buy peptide serum online\"",
        "[dermatologist recommended cream]",
      ],
      adCopy: {
        headline: "Clinically Verified Skincare | 20% Off First Order",
        description: "Experience 72-hour moisture retention with zero synthetic dyes. Free Express Shipping.",
      },
    };
    handleModuleDataChange("googleAds", [...current, newGad]);
  };

  // SEO Add/Remove
  const handleAddSeoKeyword = () => {
    const seo = modules.seo || {};
    const current = Array.isArray(seo.keywords) ? seo.keywords : [];
    const newKw = {
      id: `kw-${Date.now()}`,
      keyword: "new targeted organic search query",
      volume: "6,500",
      difficulty: "28%",
      kd: "28%",
      intent: "Commercial",
      cpc: "$2.10",
      targetPage: "/collections/best-sellers",
      priority: "High",
    };
    handleModuleDataChange("seo", { ...seo, keywords: [...current, newKw] });
  };

  const handleRemoveSeoKeyword = (kIdx) => {
    const seo = modules.seo || {};
    const current = Array.isArray(seo.keywords) ? seo.keywords : [];
    handleModuleDataChange("seo", { ...seo, keywords: current.filter((_, i) => i !== kIdx) });
  };

  // Digital Planning Add/Remove
  const handleAddPlanSlide = () => {
    const dp = modules.digitalPlanning || {};
    const current = Array.isArray(dp.brandAuditDeck) ? dp.brandAuditDeck : [];
    const newSlide = {
      slideNumber: current.length + 1,
      category: "EXECUTIVE DELIVERABLE · OMNI-CHANNEL EXPANSION",
      title: "New Omnichannel Strategy & Conversion Architecture",
      findings: [
        "Identified 42% drop-off on mobile cart checkout flow",
        "Competitor gap analysis highlights lack of retention email flows",
        "High-intent keyword opportunities uncovered in non-branded search",
      ],
      benchmarks: [
        { metric: "Organic Search Share", auditState: "14%", benchmark: "42%" },
        { metric: "Blended Customer Acquisition Cost", auditState: "$68", benchmark: "$36" },
        { metric: "Email List Revenue Contribution", auditState: "8%", benchmark: "30%" },
      ],
    };
    handleModuleDataChange("digitalPlanning", { ...dp, brandAuditDeck: [...current, newSlide] });
  };

  const handleRemovePlanSlide = (sIdx) => {
    const dp = modules.digitalPlanning || {};
    const current = Array.isArray(dp.brandAuditDeck) ? dp.brandAuditDeck : [];
    handleModuleDataChange("digitalPlanning", { ...dp, brandAuditDeck: current.filter((_, i) => i !== sIdx) });
  };

  // Influencer Add/Remove
  const handleAddCreator = () => {
    const im = modules.influencerMarketing || {};
    const current = Array.isArray(im.creators) ? im.creators : [];
    const newCreator = {
      id: `inf-${Date.now()}`,
      name: "New Creator",
      handle: "@creator_handle",
      platform: "Instagram",
      niche: "Clean Skincare & Dermatologist Insights",
      followers: "150,000",
      fakeFollowersAudit: "4.2% (Exceptional Authenticity)",
      auditClean: true,
      genderDemographics: "82% Female / 18% Male",
      engagementRate: "5.10%",
      collaborationCost: "$900 (1 Reel + 3 Stories)",
      fitAssessment: "Recommended",
    };
    handleModuleDataChange("influencerMarketing", { ...im, creators: [...current, newCreator] });
  };

  const handleRemoveCreator = (cIdx) => {
    const im = modules.influencerMarketing || {};
    const current = Array.isArray(im.creators) ? im.creators : [];
    handleModuleDataChange("influencerMarketing", { ...im, creators: current.filter((_, i) => i !== cIdx) });
  };

  // Video Editing Add/Remove
  const handleAddVideoReel = () => {
    const ve = modules.videoEditing || {};
    const current = Array.isArray(ve.reels) ? ve.reels : (Array.isArray(ve) ? ve : []);
    const newReel = {
      id: `reel-${Date.now()}`,
      formatTag: "Reels / TikTok",
      duration: "0:30",
      title: "Viral Problem-Agitate-Solve UGC Hook",
      description: "High-retention mobile video ad engineered with visual pattern interrupts and auto-synced subtitles.",
      hookStrategy: "0-3s visual pattern interrupt with sound effects and bold curiosity headline.",
      retentionMetric: "58% completion rate at 15s mark",
      tools: ["Adobe Premiere Pro", "CapCut Desktop", "After Effects"],
    };
    handleModuleDataChange("videoEditing", { ...ve, reels: [...current, newReel] });
  };

  const handleRemoveVideoReel = (rIdx) => {
    const ve = modules.videoEditing || {};
    const current = Array.isArray(ve.reels) ? ve.reels : (Array.isArray(ve) ? ve : []);
    handleModuleDataChange("videoEditing", { ...ve, reels: current.filter((_, i) => i !== rIdx) });
  };

  // AI App Variant Add/Remove
  const handleAddAiVariant = (framework = "AIDA") => {
    const ai = modules.aiApp || {};
    const variants = ai.variants || {};
    const current = Array.isArray(variants[framework]) ? variants[framework] : [];
    const newVar = {
      framework: `${framework} Custom Hook`,
      ctr: "4.10% Pred. CTR",
      text: `"Experience instant relief with our ergonomically engineered design. Backed by 2,500+ physical therapist reviews."`,
    };
    handleModuleDataChange("aiApp", {
      ...ai,
      variants: {
        ...variants,
        [framework]: [...current, newVar],
      },
    });
  };

  const handleRemoveAiVariant = (framework, vIdx) => {
    const ai = modules.aiApp || {};
    const variants = ai.variants || {};
    const current = Array.isArray(variants[framework]) ? variants[framework] : [];
    handleModuleDataChange("aiApp", {
      ...ai,
      variants: {
        ...variants,
        [framework]: current.filter((_, i) => i !== vIdx),
      },
    });
  };

  // Performance Marketing Stat & Outcome Add/Remove
  const handleAddPerfStat = () => {
    const pm = modules.performanceMarketing || {};
    const current = Array.isArray(pm.stats) ? pm.stats : [];
    const newStat = {
      label: "Customer Acquisition (CAC)",
      value: "$76.50",
      subtext: "-32% vs Baseline",
      highlight: "emerald",
    };
    handleModuleDataChange("performanceMarketing", { ...pm, stats: [...current, newStat] });
  };

  const handleRemovePerfStat = (sIdx) => {
    const pm = modules.performanceMarketing || {};
    const current = Array.isArray(pm.stats) ? pm.stats : [];
    handleModuleDataChange("performanceMarketing", { ...pm, stats: current.filter((_, i) => i !== sIdx) });
  };

  const handleAddPerfOutcome = () => {
    const pm = modules.performanceMarketing || {};
    const attr = pm.attribution || {};
    const current = Array.isArray(attr.outcomes) ? attr.outcomes : [];
    const newOutcome = "Scaled monthly ad spend from $10,000 to $50,000 while maintaining 3.9x blended ROAS.";
    handleModuleDataChange("performanceMarketing", {
      ...pm,
      attribution: {
        ...attr,
        outcomes: [...current, newOutcome],
      },
    });
  };

  const handleRemovePerfOutcome = (oIdx) => {
    const pm = modules.performanceMarketing || {};
    const attr = pm.attribution || {};
    const current = Array.isArray(attr.outcomes) ? attr.outcomes : [];
    handleModuleDataChange("performanceMarketing", {
      ...pm,
      attribution: {
        ...attr,
        outcomes: current.filter((_, i) => i !== oIdx),
      },
    });
  };

  // Reorder modules: Move Up
  const handleMoveModuleUp = (index) => {
    if (index === 0) return;
    const newOrder = [...moduleOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    onChange({ ...data, moduleOrder: newOrder });
  };

  // Reorder modules: Move Down
  const handleMoveModuleDown = (index) => {
    if (index === moduleOrder.length - 1) return;
    const newOrder = [...moduleOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    onChange({ ...data, moduleOrder: newOrder });
  };

  // Shuffle modules order randomly
  const handleShuffleModules = () => {
    const shuffled = [...moduleOrder].sort(() => Math.random() - 0.5);
    onChange({ ...data, moduleOrder: shuffled });
  };

  // Reset module sequence to standard 1 to 13
  const handleResetModuleOrder = () => {
    onChange({ ...data, moduleOrder: [...DEFAULT_MODULE_ORDER] });
  };

  // Section visibility check based on search & category filters
  const matchesFilter = (sectionId, title = "") => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!sectionId.toLowerCase().includes(q) && !title.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (sectionFilter === "all") return true;
    if (sectionFilter === "profile" && (sectionId === "personal" || sectionId === "highlights")) return true;
    if (sectionFilter === "m1-5" && ["wordpress", "canva", "socialOrganic", "socialMarketing", "googleAds"].includes(sectionId)) return true;
    if (sectionFilter === "m6-13" && ["seo", "digitalPlanning", "influencerMarketing", "shopify", "videoEditing", "dropshipping", "aiApp", "performanceMarketing"].includes(sectionId)) return true;
    if (sectionFilter === "settings" && ["theme", "sequence"].includes(sectionId)) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      {/* 1. Header Toolbar: Search & Section Filters */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="font-extrabold text-sm text-slate-900 tracking-tight">
              Section-by-Section Portfolio Editor
            </h2>
          </div>
          <div className="flex items-center space-x-1.5 text-[11px]">
            <button
              type="button"
              onClick={expandAll}
              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer px-1.5 py-0.5 rounded hover:bg-blue-50 transition-colors"
            >
              Expand All
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-slate-500 hover:text-slate-700 font-semibold cursor-pointer px-1.5 py-0.5 rounded hover:bg-slate-200/60 transition-colors"
            >
              Collapse
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search sections (e.g. Canva, Google Ads, Bio, Highlights)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-medium pt-0.5">
          <button
            type="button"
            onClick={() => setSectionFilter("all")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sectionFilter === "all"
                ? "bg-blue-600 text-white font-bold shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Sections (17)
          </button>
          <button
            type="button"
            onClick={() => setSectionFilter("profile")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sectionFilter === "profile"
                ? "bg-blue-600 text-white font-bold shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Profile & Intro
          </button>
          <button
            type="button"
            onClick={() => setSectionFilter("m1-5")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sectionFilter === "m1-5"
                ? "bg-blue-600 text-white font-bold shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Core Modules (01–05)
          </button>
          <button
            type="button"
            onClick={() => setSectionFilter("m6-13")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sectionFilter === "m6-13"
                ? "bg-blue-600 text-white font-bold shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Advanced Modules (06–13)
          </button>
          <button
            type="button"
            onClick={() => setSectionFilter("settings")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              sectionFilter === "settings"
                ? "bg-blue-600 text-white font-bold shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Theme & Sequence
          </button>
        </div>
      </div>

      {/* 2. Scrollable Accordion Section List */}
      <div className="p-3 sm:p-4 overflow-y-auto overscroll-contain flex-1 space-y-3.5 text-xs custom-scrollbar">

        {/* SECTION 1: PROFILE & CONTACT DETAILS */}
        {matchesFilter("personal", "Profile Photo & Contact Details") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("personal")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <User size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    1. Profile Photo & Contact Details
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Sync student account photo, edit headlines, bio, and contact channels
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.personal ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.personal && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                {/* PHOTO MANAGEMENT (DIRECT FROM BACKEND OR UPLOAD) */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                    <span>Student Profile Photo</span>
                    <span className="text-[10px] text-emerald-600 font-mono font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Backend Sync Ready
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Photo Preview */}
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-900 shrink-0 group">
                      <img
                        src={student.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2 flex-1 w-full">
                      <div className="flex flex-wrap gap-2">
                        {/* Sync from Backend button */}
                        <button
                          type="button"
                          onClick={handleSyncBackendPhoto}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                        >
                          <RotateCcw size={13} />
                          <span>Sync Photo from Student Account</span>
                        </button>

                        {/* Upload custom photo */}
                        <button
                          type="button"
                          onClick={() => avatarFileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Upload size={13} />
                          <span>Upload Custom File</span>
                        </button>
                        <input
                          ref={avatarFileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, (url) => handleStudentFieldChange("avatarUrl", url))}
                        />
                      </div>

                      {/* URL input */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Or Direct Photo URL</label>
                        <input
                          type="text"
                          value={student.avatarUrl || ""}
                          onChange={(e) => handleStudentFieldChange("avatarUrl", e.target.value)}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preset Avatars Row */}
                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Or Select from Curated Student Avatars:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                      {PRESET_AVATARS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleStudentFieldChange("avatarUrl", preset.url)}
                          className="w-9 h-9 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-blue-500 hover:scale-105 transition-all shrink-0 cursor-pointer shadow-2xs"
                          title={preset.label}
                        >
                          <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name & Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Full Student Name</label>
                    <input
                      type="text"
                      value={student.name || ""}
                      onChange={(e) => handleStudentFieldChange("name", e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Center / Location</label>
                    <input
                      type="text"
                      value={student.location || ""}
                      onChange={(e) => handleStudentFieldChange("location", e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Headline / Core Designation</label>
                  <input
                    type="text"
                    value={student.headline || ""}
                    onChange={(e) => handleStudentFieldChange("headline", e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Specialization Subheadline</label>
                  <input
                    type="text"
                    value={student.subheadline || ""}
                    onChange={(e) => handleStudentFieldChange("subheadline", e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Executive Summary / Bio</label>
                  <textarea
                    rows={3}
                    value={student.bio || ""}
                    onChange={(e) => handleStudentFieldChange("bio", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 leading-relaxed"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={student.email || ""}
                      onChange={(e) => handleStudentFieldChange("email", e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={student.phone || ""}
                      onChange={(e) => handleStudentFieldChange("phone", e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>

                {/* Social Links List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">Verified Social & Portfolio Links</span>
                    <button
                      type="button"
                      onClick={handleAddSocial}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add Social Link</span>
                    </button>
                  </div>

                  {(student.socials || []).map((soc, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={soc.label}
                        placeholder="Platform"
                        onChange={(e) => handleSocialChange(sIdx, "label", e.target.value)}
                        className="w-24 px-2 py-1 text-xs rounded-lg border border-slate-200 font-medium"
                      />
                      <input
                        type="text"
                        value={soc.url}
                        placeholder="https://..."
                        onChange={(e) => handleSocialChange(sIdx, "url", e.target.value)}
                        className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSocial(sIdx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Remove link"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: PERFORMANCE HIGHLIGHTS (4 STATS) */}
        {matchesFilter("highlights", "Key Performance Highlights & Metrics") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("highlights")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <BarChart3 size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    2. Key Performance Highlights (4 Stats)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Total ad spend, blended ROAS, keyword ranks & deployed funnels
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.highlights ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.highlights && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-700">Highlights List ({(student.highlights || []).length})</span>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Stat Card</span>
                  </button>
                </div>
                {(student.highlights || []).map((hl, hIdx) => (
                  <div key={hIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                        Stat #{hIdx + 1}
                      </span>
                      {(student.highlights || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(hIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete this stat card"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Label</label>
                        <input
                          type="text"
                          value={hl.label}
                          onChange={(e) => handleHighlightChange(hIdx, "label", e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Big Metric Value</label>
                        <input
                          type="text"
                          value={hl.value}
                          onChange={(e) => handleHighlightChange(hIdx, "value", e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-blue-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Detail / Context</label>
                      <input
                        type="text"
                        value={hl.detail}
                        onChange={(e) => handleHighlightChange(hIdx, "detail", e.target.value)}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: MODULE 01 - WORDPRESS */}
                {/* SECTION 3: MODULE 01 - WORDPRESS */}
        {matchesFilter("wordpress", "Module 01: WordPress Website Development") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("wordpress")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <Globe size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    3. Module 01 · WordPress Website Development
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Live client projects, Elementor Pro architectures, speed scores & custom features
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.wordpress ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.wordpress && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-700">
                    Client Projects ({(modules.wordpress || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddWordPress}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Project Card</span>
                  </button>
                </div>

                {(Array.isArray(modules.wordpress) ? modules.wordpress : []).map((proj, pIdx) => (
                  <div key={proj.id || pIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">Project #{pIdx + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {proj.speedScore}/100 Speed
                        </span>
                        {(modules.wordpress || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveWordPress(pIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete this project"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Project Title</label>
                        <input
                          type="text"
                          value={proj.title || ""}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Client / Niche Type</label>
                        <input
                          type="text"
                          value={proj.clientType || ""}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], clientType: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Live Demo URL</label>
                        <input
                          type="text"
                          value={proj.liveUrl || ""}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], liveUrl: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">PageSpeed Score (0-100)</label>
                        <input
                          type="number"
                          value={proj.speedScore || 95}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], speedScore: parseInt(e.target.value, 10) || 90 };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Project Overview</label>
                      <textarea
                        rows={2}
                        value={proj.description || ""}
                        onChange={(e) => {
                          const updated = [...modules.wordpress];
                          updated[pIdx] = { ...updated[pIdx], description: e.target.value };
                          handleModuleDataChange("wordpress", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: MODULE 02 - CANVA */}
        {matchesFilter("canva", "Module 02: Canva Creative Graphics") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("canva")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <Palette size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    4. Module 02 · Canva Creative Graphics & Video Ads
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Display banners, ad creatives, 9:16 vertical reels & design dimensions
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.canva ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.canva && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-700">
                    Static Graphic Designs ({((modules.canva?.designs || modules.canva || [])).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddCanvaDesign}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Graphic Design</span>
                  </button>
                </div>

                {((modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []))).map((design, dIdx) => (
                  <div key={design.id || dIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">Design #{dIdx + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {design.dimensions}
                        </span>
                        {((modules.canva?.designs || modules.canva || [])).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCanvaDesign(dIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete this design"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Title</label>
                        <input
                          type="text"
                          value={design.title || ""}
                          onChange={(e) => {
                            const current = modules.canva?.designs || modules.canva || [];
                            const updated = [...current];
                            updated[dIdx] = { ...updated[dIdx], title: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category</label>
                        <input
                          type="text"
                          value={design.category || ""}
                          onChange={(e) => {
                            const current = modules.canva?.designs || modules.canva || [];
                            const updated = [...current];
                            updated[dIdx] = { ...updated[dIdx], category: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Image URL</label>
                      <input
                        type="text"
                        value={design.imageUrl || ""}
                        onChange={(e) => {
                          const current = modules.canva?.designs || modules.canva || [];
                          const updated = [...current];
                          updated[dIdx] = { ...updated[dIdx], imageUrl: e.target.value };
                          handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 5: MODULE 03 - SOCIAL ORGANIC */}
        {matchesFilter("socialOrganic", "Module 03: Social Media Organic (SMO)") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("socialOrganic")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <Share2 size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    5. Module 03 · Social Media Organic (SMO)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Channel teardowns, growth metrics, bio funnels & content pillars
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.socialOrganic ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.socialOrganic && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-700">
                    Channel Profiles ({(modules.socialOrganic || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddSMO}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Channel Profile</span>
                  </button>
                </div>

                {(Array.isArray(modules.socialOrganic) ? modules.socialOrganic : []).map((profile, sIdx) => (
                  <div key={profile.id || sIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">{profile.platform} Profile</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {profile.growthRate}
                        </span>
                        {(modules.socialOrganic || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSMO(sIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete this profile"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Platform</label>
                        <input
                          type="text"
                          value={profile.platform || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], platform: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Profile Handle</label>
                        <input
                          type="text"
                          value={profile.handle || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], handle: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-blue-600 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Followers</label>
                        <input
                          type="text"
                          value={profile.followers || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], followers: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Engagement Rate</label>
                        <input
                          type="text"
                          value={profile.engagementRate || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], engagementRate: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Growth Rate</label>
                        <input
                          type="text"
                          value={profile.growthRate || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], growthRate: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Bio Setup & Organic Funnel</label>
                      <textarea
                        rows={2}
                        value={profile.bioSetup || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialOrganic];
                          updated[sIdx] = { ...updated[sIdx], bioSetup: e.target.value };
                          handleModuleDataChange("socialOrganic", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 6: MODULE 04 - META PAID ADS */}
        {matchesFilter("socialMarketing", "Module 04: Social Media Marketing (Meta Paid Ads)") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("socialMarketing")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    6. Module 04 · Meta Paid Ads Accordions
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Advantage+ Shopping, Lead Generation & Retargeting campaigns
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.socialMarketing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.socialMarketing && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-700">
                    Paid Campaigns ({(modules.socialMarketing || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddMetaAd}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Meta Campaign</span>
                  </button>
                </div>

                {(Array.isArray(modules.socialMarketing) ? modules.socialMarketing : []).map((ad, aIdx) => (
                  <div key={ad.id || aIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">{ad.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {ad.metrics?.roasOrCpa}
                        </span>
                        {(modules.socialMarketing || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMetaAd(aIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete this campaign"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Title</label>
                        <input
                          type="text"
                          value={ad.title || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], title: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Objective</label>
                        <input
                          type="text"
                          value={ad.objective || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], objective: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Spend</label>
                        <input
                          type="text"
                          value={ad.metrics?.spend || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, spend: e.target.value } };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">ROAS / CPA</label>
                        <input
                          type="text"
                          value={ad.metrics?.roasOrCpa || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, roasOrCpa: e.target.value } };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">CTR (%)</label>
                        <input
                          type="text"
                          value={ad.metrics?.ctr || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, ctr: e.target.value } };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Sample Direct-Response Ad Copy</label>
                      <textarea
                        rows={2}
                        value={ad.sampleAdCopy || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialMarketing];
                          updated[aIdx] = { ...updated[aIdx], sampleAdCopy: e.target.value };
                          handleModuleDataChange("socialMarketing", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 7: MODULE 05 - GOOGLE ADS */}
        {matchesFilter("googleAds", "Module 05: Google Ads Campaigns & Search Architecture") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("googleAds")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  <Search size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    7. Module 05 · Google Ads Campaigns (Search & PMax)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Search keywords, Performance Max assets & Quality Scores
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.googleAds ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.googleAds && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-700">
                    Google Campaigns ({(modules.googleAds || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddGoogleAd}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Google Campaign</span>
                  </button>
                </div>

                {(Array.isArray(modules.googleAds) ? modules.googleAds : []).map((gad, gIdx) => (
                  <div key={gad.id || gIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">{gad.campaignName || gad.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {gad.metrics?.roas}
                        </span>
                        {(modules.googleAds || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveGoogleAd(gIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete this campaign"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Name</label>
                        <input
                          type="text"
                          value={gad.campaignName || gad.title || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], campaignName: e.target.value, title: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Ad Quality Score</label>
                        <input
                          type="text"
                          value={gad.adScore || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], adScore: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Budget</label>
                        <input
                          type="text"
                          value={gad.budget || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], budget: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Conversions</label>
                        <input
                          type="text"
                          value={gad.metrics?.conversions || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, conversions: e.target.value } };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">ROAS</label>
                        <input
                          type="text"
                          value={gad.metrics?.roas || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, roas: e.target.value } };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-blue-700 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 8: MODULE 06 - SEO */}
        {matchesFilter("seo", "Module 06: SEO & Local Google Business Profile") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("seo")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  <BarChart3 size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    8. Module 06 · SEO Keyword Research, Site Audit & Local SEO (GBP)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Keyword research sheet, technical Core Web Vitals audit & Google Business Profile 3-pack
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.seo ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.seo && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                {/* Keywords Sub-editor */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">
                      1. Target Keywords Portfolio ({((modules.seo?.keywords || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddSeoKeyword}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add Target Keyword</span>
                    </button>
                  </div>

                  {((modules.seo?.keywords || [])).map((kw, kIdx) => (
                    <div key={kw.id || kIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">Keyword #{kIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSeoKeyword(kIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete keyword"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Keyword</label>
                          <input
                            type="text"
                            value={kw.keyword || ""}
                            onChange={(e) => {
                              const updated = [...modules.seo.keywords];
                              updated[kIdx] = { ...updated[kIdx], keyword: e.target.value };
                              handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Target Page URL</label>
                          <input
                            type="text"
                            value={kw.targetPage || kw.page || ""}
                            onChange={(e) => {
                              const updated = [...modules.seo.keywords];
                              updated[kIdx] = { ...updated[kIdx], targetPage: e.target.value, page: e.target.value };
                              handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono text-blue-600"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Volume/Mo</label>
                          <input
                            type="text"
                            value={kw.volume || ""}
                            onChange={(e) => {
                              const updated = [...modules.seo.keywords];
                              updated[kIdx] = { ...updated[kIdx], volume: e.target.value };
                              handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Difficulty (KD)</label>
                          <input
                            type="text"
                            value={kw.difficulty || kw.kd || ""}
                            onChange={(e) => {
                              const updated = [...modules.seo.keywords];
                              updated[kIdx] = { ...updated[kIdx], difficulty: e.target.value, kd: e.target.value };
                              handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Intent</label>
                          <select
                            value={kw.intent || "Commercial"}
                            onChange={(e) => {
                              const updated = [...modules.seo.keywords];
                              updated[kIdx] = { ...updated[kIdx], intent: e.target.value };
                              handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200"
                          >
                            <option value="Commercial">Commercial</option>
                            <option value="Transactional">Transactional</option>
                            <option value="Informational">Informational</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Priority</label>
                          <select
                            value={kw.priority || "High"}
                            onChange={(e) => {
                              const updated = [...modules.seo.keywords];
                              updated[kIdx] = { ...updated[kIdx], priority: e.target.value };
                              handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold"
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 9: MODULE 07 - DIGITAL STRATEGY */}
        {matchesFilter("digitalPlanning", "Module 07: Digital Media Planning & Strategy") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("digitalPlanning")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-700 text-white flex items-center justify-center font-bold text-xs">
                  <Briefcase size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    9. Module 07 · Digital Planning, Brand Audit & Strategy Deck
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Interactive pitch deck slides, gap analysis, target persona & 16-week growth roadmap
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.digitalPlanning ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.digitalPlanning && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Presentation Slides ({((modules.digitalPlanning?.brandAuditDeck || [])).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddPlanSlide}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Presentation Slide</span>
                  </button>
                </div>

                {((modules.digitalPlanning?.brandAuditDeck || [])).map((slide, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">Slide #{sIdx + 1}: {slide.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePlanSlide(sIdx)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete slide"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Eyebrow</label>
                        <input
                          type="text"
                          value={slide.category || ""}
                          onChange={(e) => {
                            const updated = [...modules.digitalPlanning.brandAuditDeck];
                            updated[sIdx] = { ...updated[sIdx], category: e.target.value };
                            handleModuleDataChange("digitalPlanning", { ...modules.digitalPlanning, brandAuditDeck: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Slide Title</label>
                        <input
                          type="text"
                          value={slide.title || ""}
                          onChange={(e) => {
                            const updated = [...modules.digitalPlanning.brandAuditDeck];
                            updated[sIdx] = { ...updated[sIdx], title: e.target.value };
                            handleModuleDataChange("digitalPlanning", { ...modules.digitalPlanning, brandAuditDeck: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                    </div>

                    {/* Diagnostic Findings */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">
                        Strategic Diagnostic Findings (Bullet Points)
                      </label>
                      {(slide.findings || []).map((finding, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-blue-600 w-4">{fIdx + 1}.</span>
                          <input
                            type="text"
                            value={finding}
                            onChange={(e) => {
                              const updatedDeck = [...modules.digitalPlanning.brandAuditDeck];
                              const updatedFindings = [...updatedDeck[sIdx].findings];
                              updatedFindings[fIdx] = e.target.value;
                              updatedDeck[sIdx] = { ...updatedDeck[sIdx], findings: updatedFindings };
                              handleModuleDataChange("digitalPlanning", { ...modules.digitalPlanning, brandAuditDeck: updatedDeck });
                            }}
                            className="flex-1 px-2 py-1 text-xs rounded border border-slate-200 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedDeck = [...modules.digitalPlanning.brandAuditDeck];
                              const updatedFindings = updatedDeck[sIdx].findings.filter((_, i) => i !== fIdx);
                              updatedDeck[sIdx] = { ...updatedDeck[sIdx], findings: updatedFindings };
                              handleModuleDataChange("digitalPlanning", { ...modules.digitalPlanning, brandAuditDeck: updatedDeck });
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedDeck = [...modules.digitalPlanning.brandAuditDeck];
                          const updatedFindings = [...(updatedDeck[sIdx].findings || []), "New strategic diagnostic finding"];
                          updatedDeck[sIdx] = { ...updatedDeck[sIdx], findings: updatedFindings };
                          handleModuleDataChange("digitalPlanning", { ...modules.digitalPlanning, brandAuditDeck: updatedDeck });
                        }}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus size={11} />
                        <span>Add Finding Bullet</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 10: MODULE 08 - INFLUENCER MARKETING */}
        {matchesFilter("influencerMarketing", "Module 08: Influencer Marketing Research & Vetting Sheet") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("influencerMarketing")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-600 text-white flex items-center justify-center font-bold text-xs">
                  <Users size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    10. Module 08 · Influencer Marketing Research & Vetting Sheet
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Follower authenticity audit, demographic skew, engagement rates & fit assessments
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.influencerMarketing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.influencerMarketing && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Vetted Creators Database ({((modules.influencerMarketing?.creators || [])).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddCreator}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Creator Row</span>
                  </button>
                </div>

                {((modules.influencerMarketing?.creators || [])).map((creator, cIdx) => (
                  <div key={creator.id || cIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs">{creator.name}</span>
                        <span className="text-blue-600 font-medium text-xs">{creator.handle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            creator.fitAssessment === "Recommended"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : creator.fitAssessment === "Risky"
                              ? "bg-rose-50 text-rose-600 border-rose-300"
                              : "bg-blue-50 text-blue-700 border-blue-300"
                          }`}
                        >
                          {creator.fitAssessment}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCreator(cIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete creator"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Name</label>
                        <input
                          type="text"
                          value={creator.name || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], name: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Handle</label>
                        <input
                          type="text"
                          value={creator.handle || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], handle: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono text-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Platform</label>
                        <select
                          value={creator.platform || "Instagram"}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], platform: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200"
                        >
                          <option value="Instagram">Instagram</option>
                          <option value="TikTok">TikTok</option>
                          <option value="YouTube">YouTube</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Followers</label>
                        <input
                          type="text"
                          value={creator.followers || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], followers: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Niche</label>
                        <input
                          type="text"
                          value={creator.niche || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], niche: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Engagement Rate</label>
                        <input
                          type="text"
                          value={creator.engagementRate || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], engagementRate: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono text-emerald-700 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Fit Assessment</label>
                        <select
                          value={creator.fitAssessment || "Recommended"}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], fitAssessment: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold"
                        >
                          <option value="Recommended">Recommended</option>
                          <option value="High Potential">High Potential</option>
                          <option value="Risky">Risky</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Fake Followers Audit</label>
                        <input
                          type="text"
                          value={creator.fakeFollowersAudit || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], fakeFollowersAudit: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Est. Collaboration Cost</label>
                        <input
                          type="text"
                          value={creator.collaborationCost || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], collaborationCost: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 11: MODULE 09 - SHOPIFY */}
        {matchesFilter("shopify", "Module 09: Shopify E-Commerce Store & CRO Architecture") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("shopify")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <ShoppingBag size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    11. Module 09 · Shopify Store & E-Commerce CRO Architecture
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Store deployment, high AOV cross-sells, checkout flows & CRO features
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.shopify ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.shopify && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Store Brand Name</label>
                    <input
                      type="text"
                      value={modules.shopify?.storeName || ""}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, storeName: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Niche Category</label>
                    <input
                      type="text"
                      value={modules.shopify?.nicheCategory || ""}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, nicheCategory: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Conversion Rate Achieved</label>
                    <input
                      type="text"
                      value={modules.shopify?.conversionRateAchieved || ""}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, conversionRateAchieved: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-blue-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Achieved AOV & Lift</label>
                    <input
                      type="text"
                      value={modules.shopify?.aovAchieved || ""}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, aovAchieved: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Store Architecture Description</label>
                  <textarea
                    rows={2}
                    value={modules.shopify?.description || ""}
                    onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, description: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 12: MODULE 10 - VIDEO EDITING */}
        {matchesFilter("videoEditing", "Module 10: Video Editing & Commercial Reels") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("videoEditing")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                  <Video size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    12. Module 10 · Video Editing, UGC Creatives & Commercial Reels
                  </div>
                  <div className="text-[11px] text-slate-500">
                    High-retention UGC hook architecture, pacing, sound design & completion rates
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.videoEditing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.videoEditing && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Video Reels & UGC Assets ({((modules.videoEditing?.reels || modules.videoEditing || [])).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddVideoReel}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add Video Reel</span>
                  </button>
                </div>

                {((modules.videoEditing?.reels || (Array.isArray(modules.videoEditing) ? modules.videoEditing : []))).map((reel, rIdx) => (
                  <div key={reel.id || rIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs">Reel #{rIdx + 1}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                          {reel.formatTag || "Reels / TikTok"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveVideoReel(rIdx)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete video reel"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Video Title</label>
                        <input
                          type="text"
                          value={reel.title || ""}
                          onChange={(e) => {
                            const current = modules.videoEditing?.reels || modules.videoEditing || [];
                            const updated = [...current];
                            updated[rIdx] = { ...updated[rIdx], title: e.target.value };
                            handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Duration</label>
                        <input
                          type="text"
                          value={reel.duration || ""}
                          onChange={(e) => {
                            const current = modules.videoEditing?.reels || modules.videoEditing || [];
                            const updated = [...current];
                            updated[rIdx] = { ...updated[rIdx], duration: e.target.value };
                            handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Hook & Retention Architecture (0-3s)</label>
                      <input
                        type="text"
                        value={reel.hookStrategy || reel.hookArchitecture || ""}
                        onChange={(e) => {
                          const current = modules.videoEditing?.reels || modules.videoEditing || [];
                          const updated = [...current];
                          updated[rIdx] = { ...updated[rIdx], hookStrategy: e.target.value, hookArchitecture: e.target.value };
                          handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Verified Retention Metric</label>
                      <input
                        type="text"
                        value={reel.retentionMetric || reel.retentionRate || ""}
                        onChange={(e) => {
                          const current = modules.videoEditing?.reels || modules.videoEditing || [];
                          const updated = [...current];
                          updated[rIdx] = { ...updated[rIdx], retentionMetric: e.target.value, retentionRate: e.target.value };
                          handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold text-emerald-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 13: MODULE 11 - DROPSHIPPING */}
        {matchesFilter("dropshipping", "Module 11: Dropshipping Winning Product") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("dropshipping")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                  <Box size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    13. Module 11 · Dropshipping Store & Winning Product Validation
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Product margins, fast US fulfillment supply chain, ad angles & ROAS
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.dropshipping ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.dropshipping && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Winning Product Name</label>
                  <input
                    type="text"
                    value={modules.dropshipping?.winningProduct || ""}
                    onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, winningProduct: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Unit COGS</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.cogs || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, cogs: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Retail Price</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.retailPrice || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, retailPrice: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-blue-700 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Net Profit/Unit</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.netProfit || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, netProfit: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-amber-800 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Winning Ad Creative Hook & Angle</label>
                  <textarea
                    rows={2}
                    value={modules.dropshipping?.adAngleDescription || ""}
                    onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, adAngleDescription: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 14: MODULE 12 - AI MARKETING APP */}
        {matchesFilter("aiApp", "Module 12: AI Marketing Application & Creative Co-Pilot") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("aiApp")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                  <Cpu size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    14. Module 12 · AI-Powered Marketing Application & Creative Co-Pilot
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Engineered system prompts, Gemini API workflow & interactive copy test drive
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.aiApp ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.aiApp && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">App Name</label>
                    <input
                      type="text"
                      value={modules.aiApp?.appName || ""}
                      onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, appName: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category</label>
                    <input
                      type="text"
                      value={modules.aiApp?.category || ""}
                      onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, category: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Engineered System Prompt Instruction</label>
                  <textarea
                    rows={2}
                    value={modules.aiApp?.systemPromptInstruction || ""}
                    onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, systemPromptInstruction: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                  />
                </div>

                {/* Ad Variants for Interactive Simulator */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Interactive Simulator Ad Variants (AIDA)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddAiVariant("AIDA")}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add Ad Variant</span>
                    </button>
                  </div>

                  {(modules.aiApp?.variants?.AIDA || []).map((variant, vIdx) => (
                    <div key={vIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">Variant #{vIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAiVariant("AIDA", vIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete variant"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Angle / Hook Name</label>
                          <input
                            type="text"
                            value={variant.framework || ""}
                            onChange={(e) => {
                              const updatedAida = [...modules.aiApp.variants.AIDA];
                              updatedAida[vIdx] = { ...updatedAida[vIdx], framework: e.target.value };
                              handleModuleDataChange("aiApp", {
                                ...modules.aiApp,
                                variants: { ...modules.aiApp.variants, AIDA: updatedAida },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold text-blue-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Predicted CTR</label>
                          <input
                            type="text"
                            value={variant.ctr || ""}
                            onChange={(e) => {
                              const updatedAida = [...modules.aiApp.variants.AIDA];
                              updatedAida[vIdx] = { ...updatedAida[vIdx], ctr: e.target.value };
                              handleModuleDataChange("aiApp", {
                                ...modules.aiApp,
                                variants: { ...modules.aiApp.variants, AIDA: updatedAida },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono font-bold text-emerald-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Ad Copy Text</label>
                        <textarea
                          rows={2}
                          value={variant.text || ""}
                          onChange={(e) => {
                            const updatedAida = [...modules.aiApp.variants.AIDA];
                            updatedAida[vIdx] = { ...updatedAida[vIdx], text: e.target.value };
                            handleModuleDataChange("aiApp", {
                              ...modules.aiApp,
                              variants: { ...modules.aiApp.variants, AIDA: updatedAida },
                            });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 15: MODULE 13 - PERFORMANCE MARKETING */}
        {matchesFilter("performanceMarketing", "Module 13: Performance Marketing & Full-Funnel Scaling") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("performanceMarketing")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                  <Zap size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    15. Module 13 · Performance Marketing & Full-Funnel Scaling
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Scaled spend, blended ROAS, multi-stage funnel mix & independent first-party tracking
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.performanceMarketing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.performanceMarketing && (
              <div className="p-4 border-t border-slate-200 space-y-4 bg-white">
                {/* 4 Stat Cards Editor */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">
                      Performance Stat Cards ({((modules.performanceMarketing?.stats || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPerfStat}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add Stat Card</span>
                    </button>
                  </div>

                  {((modules.performanceMarketing?.stats || [])).map((stat, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">Stat #{sIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePerfStat(sIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete stat card"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Label</label>
                          <input
                            type="text"
                            value={stat.label || ""}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.stats];
                              updated[sIdx] = { ...updated[sIdx], label: e.target.value };
                              handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, stats: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Value</label>
                          <input
                            type="text"
                            value={stat.value || ""}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.stats];
                              updated[sIdx] = { ...updated[sIdx], value: e.target.value };
                              handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, stats: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Subtext</label>
                          <input
                            type="text"
                            value={stat.subtext || ""}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.stats];
                              updated[sIdx] = { ...updated[sIdx], subtext: e.target.value };
                              handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, stats: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verified Scaling Outcomes Editor */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-bold text-slate-800">
                      Verified Student Scaling Outcomes ({((modules.performanceMarketing?.attribution?.outcomes || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPerfOutcome}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add Scaling Outcome</span>
                    </button>
                  </div>

                  {((modules.performanceMarketing?.attribution?.outcomes || [])).map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600 w-4">{oIdx + 1}.</span>
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => {
                          const updated = [...modules.performanceMarketing.attribution.outcomes];
                          updated[oIdx] = e.target.value;
                          handleModuleDataChange("performanceMarketing", {
                            ...modules.performanceMarketing,
                            attribution: { ...modules.performanceMarketing.attribution, outcomes: updated },
                          });
                        }}
                        className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePerfOutcome(oIdx)}
                        className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Delete outcome"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {matchesFilter("sequence", "Module Sequence & Reorder") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("sequence")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                  <Layers size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    16. Module Sequence & Order Shuffling
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Reorder curriculum sequence, hide modules, or shuffle randomly
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.sequence ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.sequence && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">Curriculum Sequence ({moduleOrder.length} Modules)</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleShuffleModules}
                      className="px-2.5 py-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Shuffle size={12} />
                      <span>Shuffle</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetModuleOrder}
                      className="px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw size={12} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {moduleOrder.map((modId, index) => {
                    const catalogMod = MODULES_CATALOG.find((m) => m.id === modId);
                    const isVisible = moduleVisibility[modId] !== false;
                    return (
                      <div
                        key={modId}
                        className={`p-2 rounded-lg border flex items-center justify-between transition-colors ${
                          isVisible
                            ? "bg-slate-50 border-slate-200 text-slate-800"
                            : "bg-slate-100/50 border-dashed border-slate-300 text-slate-400 opacity-60"
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-xs font-semibold truncate">
                            {catalogMod?.title || modId}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0">
                          {onToggleModule && (
                            <button
                              type="button"
                              onClick={() => onToggleModule(modId)}
                              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                              title={isVisible ? "Hide Module" : "Show Module"}
                            >
                              {isVisible ? <Eye size={13} className="text-blue-600" /> : <EyeOff size={13} />}
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveModuleUp(index)}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={index === moduleOrder.length - 1}
                            onClick={() => handleMoveModuleDown(index)}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 17: THEME & COLOR PALETTE */}
        {matchesFilter("theme", "Theme & Color Palettes") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("theme")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-500 text-white flex items-center justify-center font-bold text-xs">
                  <Palette size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    17. Theme & Color Palettes
                  </div>
                  <div className="text-[11px] text-slate-500">
                    6 cohort presets + custom primary color hex
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.theme ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.theme && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PORTFOLIO_THEMES.map((th) => {
                    const isSelected = theme.id === th.id;
                    return (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => onThemeChange(th)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-500/20"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="flex -space-x-1">
                            <span className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: th.primary }} />
                            <span className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: th.secondary }} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{th.name}</div>
                            <div className="text-[10px] text-slate-400">{th.description}</div>
                          </div>
                        </div>
                        {isSelected && <Check size={14} className="text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Hex Color Picker */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-700">Custom Accent Color</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={theme.primary}
                      onChange={(e) => onThemeChange({ ...theme, primary: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0 bg-transparent"
                    />
                    <span className="text-xs font-mono font-bold text-slate-600 uppercase">
                      {theme.primary}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default PortfolioFormEditor;
