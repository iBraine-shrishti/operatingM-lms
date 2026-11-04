import mockupLaptopImg from "../../assets/mockup-laptop.jpg";
import mockupCreativesImg from "../../assets/mockup-creatives.jpg";
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
  Youtube,
  Facebook,
  Music,
  Pin,
  X,
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
      platform: "Instagram",
      icon: "Instagram",
      handle: "@vitalbloom.wellness",
      niche: "Holistic Health & Adaptogens",
      beforeFollowers: "840 followers",
      afterFollowers: "14,800 followers (+1,661%)",
      growthRate: "+210% engagement rate across 90 days",
      bioStrategy: "Revamped bio from generic quote to: 'Doctor-formulated organic adaptogens for sustained focus 🌿 | 25,000+ Happy Minds | Claim your free focus quiz 👇'",
      contentPillars: [
        "40% Science-backed myth busters (educational carousels)",
        "30% Routine reels & Morning rituals (relatable lifestyle)",
        "20% User-Generated Content & Customer Transformations",
        "10% Founder story & behind-the-scenes laboratory batching",
      ],
      customMetrics: [
        { id: `cm-${Date.now()}-1`, label: "Monthly Impressions", value: "280,000/mo" },
        { id: `cm-${Date.now()}-2`, label: "Bio-Link Clicks", value: "640 / week" },
      ],
      screenshotUrl: mockupCreativesImg,
      resultsSummary: "Grew organic impressions from 4,200/mo to 280,000/mo. Generated 640 organic bio-link clicks per week directly to the email opt-in funnel without any paid boost.",
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

  // Shopify CRO Features & Apps
  const handleAddShopifyCroFeature = () => {
    const shop = modules.shopify || {};
    const current = Array.isArray(shop.croFeatures) ? shop.croFeatures : [];
    handleModuleDataChange("shopify", {
      ...shop,
      croFeatures: [...current, "Slide-out Smart Cart with progress bar toward free shipping"],
    });
  };

  const handleRemoveShopifyCroFeature = (fIdx) => {
    const shop = modules.shopify || {};
    const current = Array.isArray(shop.croFeatures) ? shop.croFeatures : [];
    handleModuleDataChange("shopify", {
      ...shop,
      croFeatures: current.filter((_, i) => i !== fIdx),
    });
  };

  const handleAddShopifyApp = () => {
    const shop = modules.shopify || {};
    const current = Array.isArray(shop.installedApps) ? shop.installedApps : [];
    handleModuleDataChange("shopify", {
      ...shop,
      installedApps: [...current, "Rebuy Engine: Smart Cart & AI Upsells"],
    });
  };

  const handleRemoveShopifyApp = (aIdx) => {
    const shop = modules.shopify || {};
    const current = Array.isArray(shop.installedApps) ? shop.installedApps : [];
    handleModuleDataChange("shopify", {
      ...shop,
      installedApps: current.filter((_, i) => i !== aIdx),
    });
  };

  // Video Editing Tool Add/Remove
  const handleAddVideoTool = (rIdx) => {
    const ve = modules.videoEditing || {};
    const current = Array.isArray(ve.reels) ? [...ve.reels] : [];
    if (current[rIdx]) {
      const tools = Array.isArray(current[rIdx].tools) ? [...current[rIdx].tools] : [];
      current[rIdx] = { ...current[rIdx], tools: [...tools, "Adobe Premiere Pro"] };
      handleModuleDataChange("videoEditing", { ...ve, reels: current });
    }
  };

  const handleRemoveVideoTool = (rIdx, tIdx) => {
    const ve = modules.videoEditing || {};
    const current = Array.isArray(ve.reels) ? [...ve.reels] : [];
    if (current[rIdx]) {
      const tools = Array.isArray(current[rIdx].tools) ? current[rIdx].tools.filter((_, i) => i !== tIdx) : [];
      current[rIdx] = { ...current[rIdx], tools };
      handleModuleDataChange("videoEditing", { ...ve, reels: current });
    }
  };

  // AI App Features & Tech Stack
  const handleAddAiFeature = () => {
    const ai = modules.aiApp || {};
    const current = Array.isArray(ai.features) ? ai.features : [];
    handleModuleDataChange("aiApp", {
      ...ai,
      features: [...current, "Instant 3-Hook Generation (Curiosity, Pain Point, Social Proof)"],
    });
  };

  const handleRemoveAiFeature = (fIdx) => {
    const ai = modules.aiApp || {};
    const current = Array.isArray(ai.features) ? ai.features : [];
    handleModuleDataChange("aiApp", {
      ...ai,
      features: current.filter((_, i) => i !== fIdx),
    });
  };

  const handleAddAiTech = () => {
    const ai = modules.aiApp || {};
    const current = Array.isArray(ai.techStack) ? ai.techStack : [];
    handleModuleDataChange("aiApp", {
      ...ai,
      techStack: [...current, "Gemini API"],
    });
  };

  const handleRemoveAiTech = (tIdx) => {
    const ai = modules.aiApp || {};
    const current = Array.isArray(ai.techStack) ? ai.techStack : [];
    handleModuleDataChange("aiApp", {
      ...ai,
      techStack: current.filter((_, i) => i !== tIdx),
    });
  };

  // Performance Funnel Stage Add/Remove
  const handleAddPerfStage = () => {
    const pm = modules.performanceMarketing || {};
    const fa = pm.funnelArchitecture || {};
    const current = Array.isArray(fa.stages) ? fa.stages : [];
    const newStage = {
      stage: "Top of Funnel (TOF)",
      pct: "65%",
      pctBadgeClass: "bg-blue-100 text-blue-700",
      objective: "Problem Awareness & Cold Traffic Acquisition",
      channels: "Meta Advantage+ (60%) + TikTok Ads (40%)",
      creativeFormats: "Founder Story UGC, Spine Pain Medical Demonstration, Hook-tested Reels",
      budgetFooter: "65% of Total Budget ($29,250/mo)",
    };
    handleModuleDataChange("performanceMarketing", {
      ...pm,
      funnelArchitecture: {
        ...fa,
        stages: [...current, newStage],
      },
    });
  };

  const handleRemovePerfStage = (stIdx) => {
    const pm = modules.performanceMarketing || {};
    const fa = pm.funnelArchitecture || {};
    const current = Array.isArray(fa.stages) ? fa.stages : [];
    handleModuleDataChange("performanceMarketing", {
      ...pm,
      funnelArchitecture: {
        ...fa,
        stages: current.filter((_, i) => i !== stIdx),
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
              <div className="p-4 border-t border-slate-200 space-y-5 bg-white">
                {/* Module Header Meta Customizer */}
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 block">
                    Module 01 Header & Category Labels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.wordpressMeta?.category || "Module 01 · Full-Stack CMS"}
                        onChange={(e) => {
                          const updated = { ...(modules.wordpressMeta || {}), category: e.target.value };
                          handleModuleDataChange("wordpressMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.wordpressMeta?.title || "WordPress Web Design & Development"}
                        onChange={(e) => {
                          const updated = { ...(modules.wordpressMeta || {}), title: e.target.value };
                          handleModuleDataChange("wordpressMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Header Verification Badge</label>
                      <input
                        type="text"
                        value={modules.wordpressMeta?.badge || "Elementor Pro · WooCommerce · Core Web Vitals Tested"}
                        onChange={(e) => {
                          const updated = { ...(modules.wordpressMeta || {}), badge: e.target.value };
                          handleModuleDataChange("wordpressMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description Subtitle</label>
                      <input
                        type="text"
                        value={modules.wordpressMeta?.subtitle || "Custom-built corporate and e-commerce websites focused on high conversion rates, sub-second loading speeds, and responsive mobile architecture."}
                        onChange={(e) => {
                          const updated = { ...(modules.wordpressMeta || {}), subtitle: e.target.value };
                          handleModuleDataChange("wordpressMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Projects Header & Add Button */}
                <div className="flex items-center justify-between pb-1 pt-1">
                  <span className="text-xs font-extrabold text-slate-800">
                    Client Website Builds ({(modules.wordpress || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddWordPress}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                  >
                    <Plus size={13} />
                    <span>Add Project Card</span>
                  </button>
                </div>

                {/* Project Cards */}
                {(Array.isArray(modules.wordpress) ? modules.wordpress : []).map((proj, pIdx) => (
                  <div key={proj.id || pIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          Project #{pIdx + 1}: {proj.title || "Untitled Project"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {proj.speedScore ?? 96}/100 Speed
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveWordPress(pIdx)}
                          className="p-1 rounded bg-slate-200/60 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                          title="Delete this project card"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Basic Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-blue-600 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Mac Bar Domain URL</label>
                        <input
                          type="text"
                          value={proj.domain || ""}
                          placeholder="e.g. aura-artisan-sample.demo"
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], domain: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Speed Score (0-100)</label>
                        <input
                          type="number"
                          value={proj.speedScore ?? 96}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], speedScore: parseInt(e.target.value, 10) || 90 };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Project Overview / Description</label>
                      <textarea
                        rows={2}
                        value={proj.description || ""}
                        onChange={(e) => {
                          const updated = [...modules.wordpress];
                          updated[pIdx] = { ...updated[pIdx], description: e.target.value };
                          handleModuleDataChange("wordpress", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white leading-relaxed"
                      />
                    </div>

                    {/* IMAGES: Full Image Manager */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                          <ImageIcon size={13} className="text-blue-600" />
                          <span>Project Mockup / Screenshot Image</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...modules.wordpress];
                              updated[pIdx] = { ...updated[pIdx], imageUrl: mockupLaptopImg };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="text-[10px] text-blue-600 hover:underline cursor-pointer"
                          >
                            Reset Mockup
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...modules.wordpress];
                              updated[pIdx] = { ...updated[pIdx], imageUrl: "" };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="text-[10px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <div className="w-full sm:w-36 aspect-[16/10] bg-slate-900 rounded-lg overflow-hidden border border-slate-200 shrink-0 relative group">
                          {proj.imageUrl ? (
                            <img
                              src={proj.imageUrl}
                              alt="Mockup preview"
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-[10px]">
                              <ImageIcon size={18} />
                              <span>No Image</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 w-full space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-2xs transition-colors">
                              <Upload size={13} />
                              <span>Upload Custom Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageFileUpload(e, (url) => {
                                    const updated = [...modules.wordpress];
                                    updated[pIdx] = { ...updated[pIdx], imageUrl: url };
                                    handleModuleDataChange("wordpress", updated);
                                  })
                                }
                              />
                            </label>
                            <span className="text-[10px] text-slate-400">or paste URL:</span>
                          </div>
                          <input
                            type="text"
                            placeholder="https://... or paste image URL / Data URL"
                            value={proj.imageUrl || ""}
                            onChange={(e) => {
                              const updated = [...modules.wordpress];
                              updated[pIdx] = { ...updated[pIdx], imageUrl: e.target.value };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CORE TECHNICAL IMPLEMENTATIONS */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-blue-600" />
                          <span>Core Technical Implementations ({(proj.keyFeatures || []).length})</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.wordpress];
                            const feats = [...(updated[pIdx].keyFeatures || [])];
                            feats.push("Custom conversion feature & performance optimization");
                            updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                        >
                          <Plus size={11} />
                          <span>Add Implementation</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(proj.keyFeatures || []).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <span className="text-xs text-blue-600 font-bold shrink-0">•</span>
                            <input
                              type="text"
                              value={feat || ""}
                              onChange={(e) => {
                                const updated = [...modules.wordpress];
                                const feats = [...(updated[pIdx].keyFeatures || [])];
                                feats[fIdx] = e.target.value;
                                updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                                handleModuleDataChange("wordpress", updated);
                              }}
                              className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50/70"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...modules.wordpress];
                                const feats = (updated[pIdx].keyFeatures || []).filter((_, i) => i !== fIdx);
                                updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                                handleModuleDataChange("wordpress", updated);
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                              title="Delete implementation bullet"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TAGS: TECH STACK PILLS */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Layers size={13} className="text-blue-600" />
                          <span>Tech Stack Tags ({(proj.techStack || []).length})</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.wordpress];
                            const techs = [...(updated[pIdx].techStack || []), "WordPress 6.4"];
                            updated[pIdx] = { ...updated[pIdx], techStack: techs };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                        >
                          <Plus size={11} />
                          <span>Add Tag</span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {(proj.techStack || []).map((tech, tIdx) => (
                          <div
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-700"
                          >
                            <input
                              type="text"
                              value={tech || ""}
                              onChange={(e) => {
                                const updated = [...modules.wordpress];
                                const techs = [...(updated[pIdx].techStack || [])];
                                techs[tIdx] = e.target.value;
                                updated[pIdx] = { ...updated[pIdx], techStack: techs };
                                handleModuleDataChange("wordpress", updated);
                              }}
                              className="bg-transparent border-none p-0 text-xs font-semibold focus:outline-none w-24 sm:w-28 text-slate-800"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...modules.wordpress];
                                const techs = (updated[pIdx].techStack || []).filter((_, i) => i !== tIdx);
                                updated[pIdx] = { ...updated[pIdx], techStack: techs };
                                handleModuleDataChange("wordpress", updated);
                              }}
                              className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete tag"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Delete Project Button */}
                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveWordPress(pIdx)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 p-1 cursor-pointer"
                      >
                        <Trash2 size={12} />
                        <span>Delete Project Card #{pIdx + 1}</span>
                      </button>
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
              <div className="p-4 border-t border-slate-200 space-y-5 bg-white">
                {/* Module 02 Header Customizer */}
                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 block">
                    Module 02 Header & Category Labels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.canvaMeta?.category || "Module 02 · Visual Branding & Motion"}
                        onChange={(e) => {
                          const updated = { ...(modules.canvaMeta || {}), category: e.target.value };
                          handleModuleDataChange("canvaMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.canvaMeta?.title || "Canva Graphic Design & Short-Form Video Creatives"}
                        onChange={(e) => {
                          const updated = { ...(modules.canvaMeta || {}), title: e.target.value };
                          handleModuleDataChange("canvaMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description Subtitle</label>
                    <input
                      type="text"
                      value={modules.canvaMeta?.subtitle || "High-impact social media carousels, performance ad banners, infographic frameworks, and kinetic motion reels engineered for thumb-stopping engagement."}
                      onChange={(e) => {
                        const updated = { ...(modules.canvaMeta || {}), subtitle: e.target.value };
                        handleModuleDataChange("canvaMeta", updated);
                      }}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                    />
                  </div>
                </div>

                {/* SUBSECTION A: GRAPHIC DESIGNS */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Box size={14} className="text-amber-500" />
                      <span>Static Graphic Designs & Carousels ({((modules.canva?.designs || modules.canva || [])).length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddCanvaDesign}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200"
                    >
                      <Plus size={13} />
                      <span>Add Graphic Design</span>
                    </button>
                  </div>

                  {((modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []))).map((design, dIdx) => (
                    <div key={design.id || dIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                        <span className="font-extrabold text-slate-900 text-xs">
                          Design #{dIdx + 1}: {design.title || "Untitled Showcase"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {design.dimensions || "Dimensions"}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCanvaDesign(dIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete this design showcase"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Design Title</label>
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
                            placeholder="e.g. Carousel, Display Banner, Infographic"
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Dimensions (e.g. 1080 x 1350 px)</label>
                          <input
                            type="text"
                            value={design.dimensions || ""}
                            onChange={(e) => {
                              const current = modules.canva?.designs || modules.canva || [];
                              const updated = [...current];
                              updated[dIdx] = { ...updated[dIdx], dimensions: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description</label>
                          <input
                            type="text"
                            value={design.description || ""}
                            onChange={(e) => {
                              const current = modules.canva?.designs || modules.canva || [];
                              const updated = [...current];
                              updated[dIdx] = { ...updated[dIdx], description: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-600"
                          />
                        </div>
                      </div>

                      {/* Image Manager for Design */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            Graphic Showcase Image
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const current = modules.canva?.designs || modules.canva || [];
                                const updated = [...current];
                                updated[dIdx] = { ...updated[dIdx], imageUrl: mockupCreativesImg };
                                handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                              }}
                              className="text-[10px] text-indigo-600 hover:underline cursor-pointer"
                            >
                              Reset
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const current = modules.canva?.designs || modules.canva || [];
                                const updated = [...current];
                                updated[dIdx] = { ...updated[dIdx], imageUrl: "" };
                                handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                              }}
                              className="text-[10px] text-rose-600 hover:underline cursor-pointer"
                            >
                              Clear
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-16 h-20 bg-slate-900 rounded overflow-hidden border border-slate-200 shrink-0">
                            {design.imageUrl ? (
                              <img src={design.imageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500 text-[9px]">
                                Empty
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <label className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs">
                              <Upload size={11} />
                              <span>Upload Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageFileUpload(e, (url) => {
                                    const current = modules.canva?.designs || modules.canva || [];
                                    const updated = [...current];
                                    updated[dIdx] = { ...updated[dIdx], imageUrl: url };
                                    handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                                  })
                                }
                              />
                            </label>
                            <input
                              type="text"
                              value={design.imageUrl || ""}
                              placeholder="or paste Image URL"
                              onChange={(e) => {
                                const current = modules.canva?.designs || modules.canva || [];
                                const updated = [...current];
                                updated[dIdx] = { ...updated[dIdx], imageUrl: e.target.value };
                                handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                              }}
                              className="w-full px-2 py-1 text-[11px] rounded border border-slate-200 bg-slate-50 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SUBSECTION B: VIDEO REELS */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Video size={14} className="text-blue-500" />
                      <span>Short-Form Video Creatives & Reels ({(modules.canva?.videos || []).length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddCanvaVideo}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Plus size={13} />
                      <span>Add Video Reel</span>
                    </button>
                  </div>

                  {(modules.canva?.videos || []).map((video, vIdx) => (
                    <div key={video.id || vIdx} className="p-3.5 rounded-xl bg-slate-900 text-white space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-extrabold text-white text-xs">
                          Reel #{vIdx + 1}: {video.title || "Untitled Video"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-amber-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            {video.duration || "0:30"}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCanvaVideo(vIdx)}
                            className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete this video reel"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Video Title</label>
                          <input
                            type="text"
                            value={video.title || ""}
                            onChange={(e) => {
                              const updated = [...(modules.canva?.videos || [])];
                              updated[vIdx] = { ...updated[vIdx], title: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Format</label>
                          <input
                            type="text"
                            value={video.format || ""}
                            placeholder="e.g. 9:16 Vertical Reel"
                            onChange={(e) => {
                              const updated = [...(modules.canva?.videos || [])];
                              updated[vIdx] = { ...updated[vIdx], format: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-amber-400 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Duration</label>
                          <input
                            type="text"
                            value={video.duration || ""}
                            placeholder="e.g. 0:28"
                            onChange={(e) => {
                              const updated = [...(modules.canva?.videos || [])];
                              updated[vIdx] = { ...updated[vIdx], duration: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Opening Hook Strategy</label>
                        <input
                          type="text"
                          value={video.hook || ""}
                          onChange={(e) => {
                            const updated = [...(modules.canva?.videos || [])];
                            updated[vIdx] = { ...updated[vIdx], hook: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-200 italic"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Description</label>
                        <textarea
                          rows={2}
                          value={video.description || ""}
                          onChange={(e) => {
                            const updated = [...(modules.canva?.videos || [])];
                            updated[vIdx] = { ...updated[vIdx], description: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-300"
                        />
                      </div>

                      {/* Video Thumbnail Manager */}
                      <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Video Thumbnail Image
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(modules.canva?.videos || [])];
                              updated[vIdx] = { ...updated[vIdx], thumbnailUrl: mockupCreativesImg };
                              handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                            }}
                            className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-20 bg-slate-950 rounded overflow-hidden border border-slate-700 shrink-0">
                            {video.thumbnailUrl ? (
                              <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500 text-[9px]">
                                Empty
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <label className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-bold rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs">
                              <Upload size={11} />
                              <span>Upload Thumbnail</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageFileUpload(e, (url) => {
                                    const updated = [...(modules.canva?.videos || [])];
                                    updated[vIdx] = { ...updated[vIdx], thumbnailUrl: url };
                                    handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                                  })
                                }
                              />
                            </label>
                            <input
                              type="text"
                              value={video.thumbnailUrl || ""}
                              placeholder="or paste Thumbnail URL"
                              onChange={(e) => {
                                const updated = [...(modules.canva?.videos || [])];
                                updated[vIdx] = { ...updated[vIdx], thumbnailUrl: e.target.value };
                                handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                              }}
                              className="w-full px-2 py-1 text-[11px] rounded border border-slate-700 bg-slate-950 text-slate-200 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              <div className="p-4 border-t border-slate-200 space-y-5 bg-white">
                {/* Module 03 Header Customizer */}
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 block">
                    Module 03 Header & Category Labels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.socialOrganicMeta?.category || "Module 03 · Organic Growth Engineering"}
                        onChange={(e) => {
                          const updated = { ...(modules.socialOrganicMeta || {}), category: e.target.value };
                          handleModuleDataChange("socialOrganicMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.socialOrganicMeta?.title || "Social Media Organic (SMO) Profile Optimization"}
                        onChange={(e) => {
                          const updated = { ...(modules.socialOrganicMeta || {}), title: e.target.value };
                          handleModuleDataChange("socialOrganicMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Header Verification Badge</label>
                      <input
                        type="text"
                        value={modules.socialOrganicMeta?.badge || "Zero Ad Spend · Pure Organic Inbound Funnels"}
                        onChange={(e) => {
                          const updated = { ...(modules.socialOrganicMeta || {}), badge: e.target.value };
                          handleModuleDataChange("socialOrganicMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description Subtitle</label>
                      <input
                        type="text"
                        value={modules.socialOrganicMeta?.subtitle || "Auditing, restructuring, and scaling organic social presence through strategic bio copywriting, content pillars, aesthetic grid curation, and high-retention community triggers."}
                        onChange={(e) => {
                          const updated = { ...(modules.socialOrganicMeta || {}), subtitle: e.target.value };
                          handleModuleDataChange("socialOrganicMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Profiles Header & Add Button */}
                <div className="flex items-center justify-between pb-1 pt-1">
                  <span className="text-xs font-extrabold text-slate-800">
                    Channel Growth Profiles ({(modules.socialOrganic || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddSMO}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                  >
                    <Plus size={13} />
                    <span>Add Channel Profile</span>
                  </button>
                </div>

                {/* Profiles Cards */}
                {(Array.isArray(modules.socialOrganic) ? modules.socialOrganic : []).map((profile, sIdx) => (
                  <div key={profile.id || sIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          Profile #{sIdx + 1}: {profile.handle || profile.platform || "New Channel"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSMO(sIdx)}
                        className="p-1 rounded bg-slate-200/60 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete this profile card"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Platform & Icon Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Platform Name</label>
                        <input
                          type="text"
                          value={profile.platform || ""}
                          placeholder="e.g. Instagram, LinkedIn, YouTube"
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], platform: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Platform Icon</label>
                        <select
                          value={profile.icon || profile.platform || "Instagram"}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], icon: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
                        >
                          <option value="Instagram">Instagram</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Twitter">Twitter / X</option>
                          <option value="TikTok">TikTok / Music</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Pinterest">Pinterest</option>
                          <option value="Share2">Custom Share Icon</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Profile Handle</label>
                        <input
                          type="text"
                          value={profile.handle || ""}
                          placeholder="@handle"
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], handle: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-blue-600 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Niche / Industry</label>
                        <input
                          type="text"
                          value={profile.niche || ""}
                          placeholder="e.g. Holistic Health & Adaptogens"
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], niche: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Growth Rate Metric</label>
                        <input
                          type="text"
                          value={profile.growthRate || ""}
                          placeholder="+210% engagement in 90 days"
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], growthRate: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Verified Analytics Label</label>
                        <input
                          type="text"
                          value={profile.verifiedBadgeText || "Verified Analytics"}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], verifiedBadgeText: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-600"
                        />
                      </div>
                    </div>

                    {/* Baseline vs Post-Optimization Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-white p-3 rounded-xl border border-slate-200">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Starting Baseline
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Label (Starting Baseline)"
                            value={profile.beforeLabel || "Starting Baseline"}
                            onChange={(e) => {
                              const updated = [...modules.socialOrganic];
                              updated[sIdx] = { ...updated[sIdx], beforeLabel: e.target.value };
                              handleModuleDataChange("socialOrganic", updated);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200"
                          />
                          <input
                            type="text"
                            placeholder="Value (840 followers)"
                            value={profile.beforeFollowers || profile.followers || ""}
                            onChange={(e) => {
                              const updated = [...modules.socialOrganic];
                              updated[sIdx] = {
                                ...updated[sIdx],
                                beforeFollowers: e.target.value,
                                followers: e.target.value,
                              };
                              handleModuleDataChange("socialOrganic", updated);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                          Post-Optimization
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Label (Post-Optimization)"
                            value={profile.afterLabel || "Post-Optimization"}
                            onChange={(e) => {
                              const updated = [...modules.socialOrganic];
                              updated[sIdx] = { ...updated[sIdx], afterLabel: e.target.value };
                              handleModuleDataChange("socialOrganic", updated);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200"
                          />
                          <input
                            type="text"
                            placeholder="Value (14,800 followers (+1,661%))"
                            value={profile.afterFollowers || ""}
                            onChange={(e) => {
                              const updated = [...modules.socialOrganic];
                              updated[sIdx] = { ...updated[sIdx], afterFollowers: e.target.value };
                              handleModuleDataChange("socialOrganic", updated);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-blue-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Screenshot / Creative Proof Image Manager */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                          <ImageIcon size={13} className="text-emerald-600" />
                          <span>Aesthetic Grid Screenshot / Proof Image</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...modules.socialOrganic];
                              updated[sIdx] = { ...updated[sIdx], screenshotUrl: mockupCreativesImg };
                              handleModuleDataChange("socialOrganic", updated);
                            }}
                            className="text-[10px] text-emerald-600 hover:underline cursor-pointer"
                          >
                            Reset Mockup
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...modules.socialOrganic];
                              updated[sIdx] = { ...updated[sIdx], screenshotUrl: "" };
                              handleModuleDataChange("socialOrganic", updated);
                            }}
                            className="text-[10px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <div className="w-full sm:w-36 aspect-[16/9] bg-slate-900 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                          {profile.screenshotUrl ? (
                            <img
                              src={profile.screenshotUrl}
                              alt="Grid proof preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-[10px]">
                              <ImageIcon size={18} />
                              <span>No Image</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 w-full space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-2xs transition-colors">
                              <Upload size={13} />
                              <span>Upload Grid Screenshot</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageFileUpload(e, (url) => {
                                    const updated = [...modules.socialOrganic];
                                    updated[sIdx] = { ...updated[sIdx], screenshotUrl: url };
                                    handleModuleDataChange("socialOrganic", updated);
                                  })
                                }
                              />
                            </label>
                            <span className="text-[10px] text-slate-400">or paste URL:</span>
                          </div>
                          <input
                            type="text"
                            placeholder="https://... or paste image URL / Data URL"
                            value={profile.screenshotUrl || ""}
                            onChange={(e) => {
                              const updated = [...modules.socialOrganic];
                              updated[sIdx] = { ...updated[sIdx], screenshotUrl: e.target.value };
                              handleModuleDataChange("socialOrganic", updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bio & CTA Framework */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                        Optimized Bio & CTA Framework
                      </label>
                      <textarea
                        rows={2}
                        value={profile.bioStrategy || profile.bioSetup || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialOrganic];
                          updated[sIdx] = {
                            ...updated[sIdx],
                            bioStrategy: e.target.value,
                            bioSetup: e.target.value,
                          };
                          handleModuleDataChange("socialOrganic", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white italic"
                      />
                    </div>

                    {/* Content Pillars */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <span>Engineered Content Pillars ({(profile.contentPillars || []).length})</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.socialOrganic];
                            const pillars = [...(updated[sIdx].contentPillars || [])];
                            pillars.push("25% High-value educational carousels & tutorials");
                            updated[sIdx] = { ...updated[sIdx], contentPillars: pillars };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                        >
                          <Plus size={11} />
                          <span>Add Content Pillar</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(profile.contentPillars || []).map((pillar, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2">
                            <span className="text-xs text-emerald-600 font-bold shrink-0">•</span>
                            <input
                              type="text"
                              value={pillar || ""}
                              onChange={(e) => {
                                const updated = [...modules.socialOrganic];
                                const pillars = [...(updated[sIdx].contentPillars || [])];
                                pillars[cIdx] = e.target.value;
                                updated[sIdx] = { ...updated[sIdx], contentPillars: pillars };
                                handleModuleDataChange("socialOrganic", updated);
                              }}
                              className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50/70"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...modules.socialOrganic];
                                const pillars = (updated[sIdx].contentPillars || []).filter((_, i) => i !== cIdx);
                                updated[sIdx] = { ...updated[sIdx], contentPillars: pillars };
                                handleModuleDataChange("socialOrganic", updated);
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                              title="Delete content pillar"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Student Campaign Impact */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                        Student Campaign Impact & Results
                      </label>
                      <textarea
                        rows={2}
                        value={profile.resultsSummary || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialOrganic];
                          updated[sIdx] = { ...updated[sIdx], resultsSummary: e.target.value };
                          handleModuleDataChange("socialOrganic", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    {/* CUSTOM METRICS & ADDITIONAL FIELDS */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Zap size={13} className="text-emerald-600" />
                            <span>Custom Metric Fields ({(profile.customMetrics || []).length})</span>
                          </label>
                          <span className="text-[10px] text-slate-400">
                            Add any custom metric (e.g. Monthly Impressions, Save Rate, Bio Clicks)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.socialOrganic];
                            const cms = [...(updated[sIdx].customMetrics || [])];
                            cms.push({
                              id: `cm-${Date.now()}`,
                              label: "Monthly Impressions",
                              value: "250,000/mo",
                            });
                            updated[sIdx] = { ...updated[sIdx], customMetrics: cms };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                        >
                          <Plus size={11} />
                          <span>Add Custom Field</span>
                        </button>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {(profile.customMetrics || []).map((cm, cmIdx) => (
                          <div key={cm.id || cmIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Field Name (e.g. Monthly Reach)"
                              value={cm.label || ""}
                              onChange={(e) => {
                                const updated = [...modules.socialOrganic];
                                const cms = [...(updated[sIdx].customMetrics || [])];
                                cms[cmIdx] = { ...cms[cmIdx], label: e.target.value };
                                updated[sIdx] = { ...updated[sIdx], customMetrics: cms };
                                handleModuleDataChange("socialOrganic", updated);
                              }}
                              className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 font-bold"
                            />
                            <input
                              type="text"
                              placeholder="Value (e.g. 280k/mo)"
                              value={cm.value || ""}
                              onChange={(e) => {
                                const updated = [...modules.socialOrganic];
                                const cms = [...(updated[sIdx].customMetrics || [])];
                                cms[cmIdx] = { ...cms[cmIdx], value: e.target.value };
                                updated[sIdx] = { ...updated[sIdx], customMetrics: cms };
                                handleModuleDataChange("socialOrganic", updated);
                              }}
                              className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 font-mono text-emerald-700 font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...modules.socialOrganic];
                                const cms = (updated[sIdx].customMetrics || []).filter((_, i) => i !== cmIdx);
                                updated[sIdx] = { ...updated[sIdx], customMetrics: cms };
                                handleModuleDataChange("socialOrganic", updated);
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                              title="Delete this custom field"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Delete Profile Button */}
                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveSMO(sIdx)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 p-1 cursor-pointer"
                      >
                        <Trash2 size={12} />
                        <span>Delete Profile Card #{sIdx + 1}</span>
                      </button>
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
                    Advantage+ Shopping, CBO scaling, DCT hooks & CPA teardowns
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.socialMarketing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.socialMarketing && (
              <div className="p-4 border-t border-slate-200 space-y-5 bg-white">
                {/* Header Customizer */}
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 block">
                    Module 04 Header & Category Labels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.socialMarketingMeta?.category || "Module 04 · Paid Social Advertising"}
                        onChange={(e) => {
                          const updated = { ...(modules.socialMarketingMeta || {}), category: e.target.value };
                          handleModuleDataChange("socialMarketingMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.socialMarketingMeta?.title || "Social Media Marketing (Meta & Paid Ads Accordions)"}
                        onChange={(e) => {
                          const updated = { ...(modules.socialMarketingMeta || {}), title: e.target.value };
                          handleModuleDataChange("socialMarketingMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description Subtitle</label>
                    <input
                      type="text"
                      value={modules.socialMarketingMeta?.subtitle || "Performance advertising campaigns deployed across Meta Ads Manager (Advantage+ Shopping, Lead Gen, and Dynamic Retargeting)."}
                      onChange={(e) => {
                        const updated = { ...(modules.socialMarketingMeta || {}), subtitle: e.target.value };
                        handleModuleDataChange("socialMarketingMeta", updated);
                      }}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                    />
                  </div>
                </div>

                {/* Campaigns List */}
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-extrabold text-slate-800">
                    Paid Campaigns ({(modules.socialMarketing || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddMetaAd}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                  >
                    <Plus size={13} />
                    <span>Add Meta Campaign</span>
                  </button>
                </div>

                {(Array.isArray(modules.socialMarketing) ? modules.socialMarketing : []).map((ad, aIdx) => (
                  <div key={ad.id || aIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        Campaign #{aIdx + 1}: {ad.title || "Untitled Ad Campaign"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMetaAd(aIdx)}
                        className="p-1 rounded bg-slate-200/60 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete this campaign"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Type</label>
                        <input
                          type="text"
                          value={ad.campaignType || ""}
                          placeholder="e.g. Advantage+ Shopping / CBO Scale"
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], campaignType: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Objective</label>
                        <input
                          type="text"
                          value={ad.objective || ""}
                          placeholder="e.g. Conversions (Purchase) — Top of Funnel"
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], objective: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Budget & Flight</label>
                        <input
                          type="text"
                          value={ad.budgetSpend || ""}
                          placeholder="e.g. $450/day spend ($13,500 total)"
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], budgetSpend: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700"
                        />
                      </div>
                    </div>

                    {/* Screenshot Manager */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          Ad Creative Screenshot
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], screenshotUrl: mockupCreativesImg };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="text-[10px] text-blue-600 hover:underline cursor-pointer"
                        >
                          Reset Mockup
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-16 bg-slate-900 rounded overflow-hidden border border-slate-200 shrink-0">
                          {ad.screenshotUrl ? (
                            <img src={ad.screenshotUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-[9px]">Empty</div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <label className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs">
                            <Upload size={11} />
                            <span>Upload Screenshot</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileUpload(e, (url) => {
                                  const updated = [...modules.socialMarketing];
                                  updated[aIdx] = { ...updated[aIdx], screenshotUrl: url };
                                  handleModuleDataChange("socialMarketing", updated);
                                })
                              }
                            />
                          </label>
                          <input
                            type="text"
                            value={ad.screenshotUrl || ""}
                            placeholder="or paste Screenshot URL"
                            onChange={(e) => {
                              const updated = [...modules.socialMarketing];
                              updated[aIdx] = { ...updated[aIdx], screenshotUrl: e.target.value };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded border border-slate-200 bg-slate-50 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Summary</label>
                      <textarea
                        rows={2}
                        value={ad.summary || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialMarketing];
                          updated[aIdx] = { ...updated[aIdx], summary: e.target.value };
                          handleModuleDataChange("socialMarketing", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Audience & Targeting</label>
                      <input
                        type="text"
                        value={ad.audienceTargeting || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialMarketing];
                          updated[aIdx] = { ...updated[aIdx], audienceTargeting: e.target.value };
                          handleModuleDataChange("socialMarketing", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">Outbound CTR</label>
                        <input
                          type="text"
                          value={ad.metrics?.ctr || ""}
                          placeholder="2.84%"
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, ctr: e.target.value } };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-blue-700"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">Average CPC</label>
                        <input
                          type="text"
                          value={ad.metrics?.cpc || ""}
                          placeholder="$0.84"
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, cpc: e.target.value } };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono text-slate-700"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">Blended ROAS / CPA</label>
                        <input
                          type="text"
                          value={ad.metrics?.roasOrCpa || ""}
                          placeholder="4.45x ($24.80 CPA)"
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, roasOrCpa: e.target.value } };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-emerald-700"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">Purchases / Leads</label>
                        <input
                          type="text"
                          value={ad.metrics?.purchases || ad.metrics?.conversions || ""}
                          placeholder="544 Orders"
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = {
                              ...updated[aIdx],
                              metrics: { ...updated[aIdx].metrics, purchases: e.target.value, conversions: e.target.value },
                            };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-slate-800"
                        />
                      </div>
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
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <Search size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    7. Module 05 · Google Ads Campaigns & Search Architecture
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Tight STAG ad groups, RSA headline tests, extensions & conversions
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.googleAds ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.googleAds && (
              <div className="p-4 border-t border-slate-200 space-y-5 bg-white">
                {/* Header Customizer */}
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 block">
                    Module 05 Header & Category Labels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.googleAdsMeta?.category || "Module 05 · Search Engine & Intent Advertising"}
                        onChange={(e) => {
                          const updated = { ...(modules.googleAdsMeta || {}), category: e.target.value };
                          handleModuleDataChange("googleAdsMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.googleAdsMeta?.title || "Google Ads Campaigns & Search Architecture"}
                        onChange={(e) => {
                          const updated = { ...(modules.googleAdsMeta || {}), title: e.target.value };
                          handleModuleDataChange("googleAdsMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Campaigns List */}
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-extrabold text-slate-800">
                    Google Ads Campaigns ({(modules.googleAds || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddGoogleAd}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                  >
                    <Plus size={13} />
                    <span>Add Google Campaign</span>
                  </button>
                </div>

                {(Array.isArray(modules.googleAds) ? modules.googleAds : []).map((gad, gIdx) => (
                  <div key={gad.id || gIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        Campaign #{gIdx + 1}: {gad.campaignName || "Untitled Google Ad"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGoogleAd(gIdx)}
                        className="p-1 rounded bg-slate-200/60 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete this campaign"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Name</label>
                        <input
                          type="text"
                          value={gad.campaignName || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], campaignName: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Type</label>
                        <input
                          type="text"
                          value={gad.campaignType || ""}
                          placeholder="Search Ad, Performance Max, Display"
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], campaignType: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700 font-bold"
                        />
                      </div>
                    </div>

                    {/* Screenshot Manager */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          Search Ad Screenshot / UI Proof
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], screenshotUrl: mockupLaptopImg };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="text-[10px] text-emerald-700 hover:underline cursor-pointer"
                        >
                          Reset Mockup
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-16 bg-slate-900 rounded overflow-hidden border border-slate-200 shrink-0">
                          {gad.screenshotUrl ? (
                            <img src={gad.screenshotUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-[9px]">Empty</div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <label className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs">
                            <Upload size={11} />
                            <span>Upload Screenshot</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileUpload(e, (url) => {
                                  const updated = [...modules.googleAds];
                                  updated[gIdx] = { ...updated[gIdx], screenshotUrl: url };
                                  handleModuleDataChange("googleAds", updated);
                                })
                              }
                            />
                          </label>
                          <input
                            type="text"
                            value={gad.screenshotUrl || ""}
                            placeholder="or paste Screenshot URL"
                            onChange={(e) => {
                              const updated = [...modules.googleAds];
                              updated[gIdx] = { ...updated[gIdx], screenshotUrl: e.target.value };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded border border-slate-200 bg-slate-50 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Strategy & Structure</label>
                      <textarea
                        rows={2}
                        value={gad.summary || ""}
                        onChange={(e) => {
                          const updated = [...modules.googleAds];
                          updated[gIdx] = { ...updated[gIdx], summary: e.target.value };
                          handleModuleDataChange("googleAds", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    {/* Headlines List */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                          <span>Responsive Search Headlines (H1-H3)</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.googleAds];
                            const hls = [...(updated[gIdx].headlines || [])];
                            hls.push("New High-Converting Google Headline | Call Now");
                            updated[gIdx] = { ...updated[gIdx], headlines: hls };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                        >
                          <Plus size={11} />
                          <span>Add Headline</span>
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {(gad.headlines || []).map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-blue-700 w-6">H{hIdx + 1}</span>
                            <input
                              type="text"
                              value={hl || ""}
                              onChange={(e) => {
                                const updated = [...modules.googleAds];
                                const hls = [...(updated[gIdx].headlines || [])];
                                hls[hIdx] = e.target.value;
                                updated[gIdx] = { ...updated[gIdx], headlines: hls };
                                handleModuleDataChange("googleAds", updated);
                              }}
                              className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50/70 font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...modules.googleAds];
                                const hls = (updated[gIdx].headlines || []).filter((_, i) => i !== hIdx);
                                updated[gIdx] = { ...updated[gIdx], headlines: hls };
                                handleModuleDataChange("googleAds", updated);
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete headline"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Descriptions List */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                          Descriptions (D1-D2)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...modules.googleAds];
                            const descs = [...(updated[gIdx].descriptions || [])];
                            descs.push("Clear upfront pricing and prompt expert assistance. Contact us today.");
                            updated[gIdx] = { ...updated[gIdx], descriptions: descs };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                        >
                          <Plus size={11} />
                          <span>Add Description</span>
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {(gad.descriptions || []).map((desc, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-emerald-700 w-6">D{dIdx + 1}</span>
                            <input
                              type="text"
                              value={desc || ""}
                              onChange={(e) => {
                                const updated = [...modules.googleAds];
                                const descs = [...(updated[gIdx].descriptions || [])];
                                descs[dIdx] = e.target.value;
                                updated[gIdx] = { ...updated[gIdx], descriptions: descs };
                                handleModuleDataChange("googleAds", updated);
                              }}
                              className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50/70"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...modules.googleAds];
                                const descs = (updated[gIdx].descriptions || []).filter((_, i) => i !== dIdx);
                                updated[gIdx] = { ...updated[gIdx], descriptions: descs };
                                handleModuleDataChange("googleAds", updated);
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete description"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">CTR</label>
                        <input
                          type="text"
                          value={gad.metrics?.ctr || ""}
                          placeholder="8.65%"
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, ctr: e.target.value } };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-blue-700"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">Avg CPC</label>
                        <input
                          type="text"
                          value={gad.metrics?.avgCpc || ""}
                          placeholder="$3.42"
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, avgCpc: e.target.value } };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono text-slate-700"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">Conv Rate</label>
                        <input
                          type="text"
                          value={gad.metrics?.convRate || ""}
                          placeholder="14.2%"
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, convRate: e.target.value } };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-emerald-700"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block">Conversions</label>
                        <input
                          type="text"
                          value={gad.metrics?.conversions || ""}
                          placeholder="324 Leads"
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, conversions: e.target.value } };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 8: MODULE 06 - SEO & LOCAL GBP */}
        {matchesFilter("seo", "Module 06: SEO & Local Google Business Profile") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("seo")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <BarChart3 size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    8. Module 06 · SEO & Local Google Business Profile
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Keyword research sheet, technical site audits & Google Maps 3-pack dominance
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.seo ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.seo && (
              <div className="p-4 border-t border-slate-200 space-y-6 bg-white">
                {/* Header Customizer */}
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 block">
                    Module 06 Header & Category Labels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.seoMeta?.category || "Module 06 · Organic Search Engine Optimization"}
                        onChange={(e) => {
                          const updated = { ...(modules.seoMeta || {}), category: e.target.value };
                          handleModuleDataChange("seoMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.seoMeta?.title || "SEO Keyword Research, Site Audit & Local SEO (GBP)"}
                        onChange={(e) => {
                          const updated = { ...(modules.seoMeta || {}), title: e.target.value };
                          handleModuleDataChange("seoMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBSECTION 1: KEYWORD RESEARCH SHEET */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Search size={14} className="text-blue-600" />
                      <span>1. Keyword Research Sheet ({(modules.seo?.keywords || []).length} mapped)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                        const newKw = {
                          keyword: "new targeted organic keyword",
                          searchVolume: 5400,
                          keywordDifficulty: 35,
                          intent: "Commercial",
                          cpc: "$2.50",
                          targetPage: "/collections/best-sellers",
                          priority: "High",
                        };
                        handleModuleDataChange("seo", { ...modules.seo, keywords: [...current, newKw] });
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Plus size={13} />
                      <span>Add Keyword Row</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(modules.seo?.keywords || []).map((kw, kIdx) => (
                      <div key={kIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-slate-900 text-xs">Keyword #{kIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                              const updated = current.filter((_, i) => i !== kIdx);
                              handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete this keyword"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Target Keyword</label>
                            <input
                              type="text"
                              value={kw.keyword || ""}
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                                const updated = [...current];
                                updated[kIdx] = { ...updated[kIdx], keyword: e.target.value };
                                handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Search Volume / Mo</label>
                            <input
                              type="number"
                              value={kw.searchVolume || ""}
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                                const updated = [...current];
                                updated[kIdx] = { ...updated[kIdx], searchVolume: parseInt(e.target.value, 10) || 0 };
                                handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-0.5">KD (Difficulty %)</label>
                            <input
                              type="number"
                              value={kw.keywordDifficulty || ""}
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                                const updated = [...current];
                                updated[kIdx] = { ...updated[kIdx], keywordDifficulty: parseInt(e.target.value, 10) || 0 };
                                handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Intent</label>
                            <input
                              type="text"
                              value={kw.intent || ""}
                              placeholder="Commercial, Transactional"
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                                const updated = [...current];
                                updated[kIdx] = { ...updated[kIdx], intent: e.target.value };
                                handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Est. CPC</label>
                            <input
                              type="text"
                              value={kw.cpc || ""}
                              placeholder="$2.80"
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                                const updated = [...current];
                                updated[kIdx] = { ...updated[kIdx], cpc: e.target.value };
                                handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Target Page URL</label>
                            <input
                              type="text"
                              value={kw.targetPage || ""}
                              placeholder="/products/serum"
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                                const updated = [...current];
                                updated[kIdx] = { ...updated[kIdx], targetPage: e.target.value };
                                handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono text-blue-600"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Priority</label>
                            <select
                              value={kw.priority || "High"}
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
                                const updated = [...current];
                                updated[kIdx] = { ...updated[kIdx], priority: e.target.value };
                                handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
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

                  {/* Summary Text inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Dataset Attribution Note</label>
                      <input
                        type="text"
                        value={modules.seo?.footerText || "Showing 6 of 6 mapped keywords from SEMrush / Ahrefs research dataset."}
                        onChange={(e) => {
                          handleModuleDataChange("seo", { ...modules.seo, footerText: e.target.value });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Total Potential Metric</label>
                      <input
                        type="text"
                        value={modules.seo?.totalSearchPotential || "Total monthly search potential: 56,600+ impressions"}
                        onChange={(e) => {
                          handleModuleDataChange("seo", { ...modules.seo, totalSearchPotential: e.target.value });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-blue-600 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBSECTION 2: TECHNICAL SEO AUDIT */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-600" />
                      <span>2. Technical SEO Audit Categories ({(modules.seo?.auditCategories || []).length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                        const newCat = {
                          category: "New Technical Audit Category",
                          score: 95,
                          findings: [
                            "Identified and rectified critical technical crawlability blocker",
                            "Optimized resource delivery & dynamic sitemap indexing",
                          ],
                          actionTaken: "Implemented directive and achieved clean indexation in Google Search Console.",
                        };
                        handleModuleDataChange("seo", { ...modules.seo, auditCategories: [...current, newCat] });
                      }}
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                    >
                      <Plus size={13} />
                      <span>Add Audit Category</span>
                    </button>
                  </div>

                  {(modules.seo?.auditCategories || []).map((cat, cIdx) => (
                    <div key={cIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-extrabold text-slate-900 text-xs">
                          Category #{cIdx + 1}: {cat.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                            const updated = current.filter((_, i) => i !== cIdx);
                            handleModuleDataChange("seo", { ...modules.seo, auditCategories: updated });
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete category"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Category Name</label>
                          <input
                            type="text"
                            value={cat.category || ""}
                            onChange={(e) => {
                              const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                              const updated = [...current];
                              updated[cIdx] = { ...updated[cIdx], category: e.target.value };
                              handleModuleDataChange("seo", { ...modules.seo, auditCategories: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Score (0-100)</label>
                          <input
                            type="number"
                            value={cat.score ?? 95}
                            onChange={(e) => {
                              const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                              const updated = [...current];
                              updated[cIdx] = { ...updated[cIdx], score: parseInt(e.target.value, 10) || 90 };
                              handleModuleDataChange("seo", { ...modules.seo, auditCategories: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold text-emerald-700"
                          />
                        </div>
                      </div>

                      {/* Findings list */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-extrabold uppercase text-slate-600">
                            Audit Findings & Resolved Issues
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                              const updated = [...current];
                              const findings = [...(updated[cIdx].findings || [])];
                              findings.push("Resolved new technical audit finding");
                              updated[cIdx] = { ...updated[cIdx], findings };
                              handleModuleDataChange("seo", { ...modules.seo, auditCategories: updated });
                            }}
                            className="text-[9px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                          >
                            <Plus size={10} />
                            <span>Add Finding</span>
                          </button>
                        </div>
                        {(cat.findings || []).map((finding, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5">
                            <span className="text-blue-600 font-bold text-xs">•</span>
                            <input
                              type="text"
                              value={finding || ""}
                              onChange={(e) => {
                                const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                                const updated = [...current];
                                const findings = [...(updated[cIdx].findings || [])];
                                findings[fIdx] = e.target.value;
                                updated[cIdx] = { ...updated[cIdx], findings };
                                handleModuleDataChange("seo", { ...modules.seo, auditCategories: updated });
                              }}
                              className="flex-1 px-2 py-0.5 text-xs rounded border border-slate-200 bg-slate-50"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                                const updated = [...current];
                                const findings = (updated[cIdx].findings || []).filter((_, i) => i !== fIdx);
                                updated[cIdx] = { ...updated[cIdx], findings };
                                handleModuleDataChange("seo", { ...modules.seo, auditCategories: updated });
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Action Taken by Student</label>
                        <input
                          type="text"
                          value={cat.actionTaken || ""}
                          onChange={(e) => {
                            const current = Array.isArray(modules.seo?.auditCategories) ? modules.seo.auditCategories : [];
                            const updated = [...current];
                            updated[cIdx] = { ...updated[cIdx], actionTaken: e.target.value };
                            handleModuleDataChange("seo", { ...modules.seo, auditCategories: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white italic text-slate-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* SUBSECTION 3: LOCAL SEO & GBP PROJECT */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 pb-1">
                    <Store size={14} className="text-blue-600" />
                    <span>3. Local SEO & Google Business Profile (GBP) Project</span>
                  </span>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Local Business Name</label>
                        <input
                          type="text"
                          value={modules.seo?.localSeo?.businessName || ""}
                          onChange={(e) => {
                            const localSeo = { ...(modules.seo?.localSeo || {}), businessName: e.target.value };
                            handleModuleDataChange("seo", { ...modules.seo, localSeo });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Primary Category</label>
                        <input
                          type="text"
                          value={modules.seo?.localSeo?.category || ""}
                          onChange={(e) => {
                            const localSeo = { ...(modules.seo?.localSeo || {}), category: e.target.value };
                            handleModuleDataChange("seo", { ...modules.seo, localSeo });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Average Rating (e.g. 4.9)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={modules.seo?.localSeo?.avgRating || 4.9}
                          onChange={(e) => {
                            const localSeo = { ...(modules.seo?.localSeo || {}), avgRating: parseFloat(e.target.value) || 4.9 };
                            handleModuleDataChange("seo", { ...modules.seo, localSeo });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Reviews Count</label>
                        <input
                          type="number"
                          value={modules.seo?.localSeo?.reviewsCount || 148}
                          onChange={(e) => {
                            const localSeo = { ...(modules.seo?.localSeo || {}), reviewsCount: parseInt(e.target.value, 10) || 0 };
                            handleModuleDataChange("seo", { ...modules.seo, localSeo });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Address Snippet</label>
                        <input
                          type="text"
                          value={modules.seo?.localSeo?.addressSnippet || ""}
                          onChange={(e) => {
                            const localSeo = { ...(modules.seo?.localSeo || {}), addressSnippet: e.target.value };
                            handleModuleDataChange("seo", { ...modules.seo, localSeo });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    {/* Rankings list */}
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-extrabold uppercase text-slate-600">
                          Google Maps 3-Pack Rankings Achieved
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const localSeo = { ...(modules.seo?.localSeo || {}) };
                            const ranks = [...(localSeo.localKeywordsRanked || [])];
                            ranks.push("#1 in Google 3-Pack for 'new top geo-targeted keyword'");
                            handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, localKeywordsRanked: ranks } });
                          }}
                          className="text-[9px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus size={10} />
                          <span>Add Ranking</span>
                        </button>
                      </div>
                      {(modules.seo?.localSeo?.localKeywordsRanked || []).map((rank, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-1.5">
                          <span className="text-emerald-600 font-bold text-xs">•</span>
                          <input
                            type="text"
                            value={rank || ""}
                            onChange={(e) => {
                              const localSeo = { ...(modules.seo?.localSeo || {}) };
                              const ranks = [...(localSeo.localKeywordsRanked || [])];
                              ranks[rIdx] = e.target.value;
                              handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, localKeywordsRanked: ranks } });
                            }}
                            className="flex-1 px-2 py-0.5 text-xs rounded border border-slate-200 bg-slate-50 font-medium text-emerald-950"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const localSeo = { ...(modules.seo?.localSeo || {}) };
                              const ranks = (localSeo.localKeywordsRanked || []).filter((_, i) => i !== rIdx);
                              handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, localKeywordsRanked: ranks } });
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Optimization steps list */}
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-extrabold uppercase text-slate-600">
                          Local Optimization & NAP Consistency Steps
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const localSeo = { ...(modules.seo?.localSeo || {}) };
                            const steps = [...(localSeo.optimizationSteps || [])];
                            steps.push("Audited and optimized local business directory listings for NAP consistency");
                            handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, optimizationSteps: steps } });
                          }}
                          className="text-[9px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus size={10} />
                          <span>Add Step</span>
                        </button>
                      </div>
                      {(modules.seo?.localSeo?.optimizationSteps || []).map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5">
                          <span className="text-blue-600 font-bold text-xs">•</span>
                          <input
                            type="text"
                            value={step || ""}
                            onChange={(e) => {
                              const localSeo = { ...(modules.seo?.localSeo || {}) };
                              const steps = [...(localSeo.optimizationSteps || [])];
                              steps[sIdx] = e.target.value;
                              handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, optimizationSteps: steps } });
                            }}
                            className="flex-1 px-2 py-0.5 text-xs rounded border border-slate-200 bg-slate-50"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const localSeo = { ...(modules.seo?.localSeo || {}) };
                              const steps = (localSeo.optimizationSteps || []).filter((_, i) => i !== sIdx);
                              handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, optimizationSteps: steps } });
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Customer Review */}
                    <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200/80 space-y-1.5">
                      <span className="text-[9px] font-bold uppercase text-amber-900 block">
                        Verified 5-Star Customer Review
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Review Author"
                          value={modules.seo?.localSeo?.sampleReview?.author || ""}
                          onChange={(e) => {
                            const localSeo = { ...(modules.seo?.localSeo || {}) };
                            const sampleReview = { ...(localSeo.sampleReview || {}), author: e.target.value };
                            handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, sampleReview } });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
                        />
                        <input
                          type="number"
                          placeholder="Rating (1-5)"
                          value={modules.seo?.localSeo?.sampleReview?.rating || 5}
                          onChange={(e) => {
                            const localSeo = { ...(modules.seo?.localSeo || {}) };
                            const sampleReview = { ...(localSeo.sampleReview || {}), rating: parseInt(e.target.value, 10) || 5 };
                            handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, sampleReview } });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Review Text"
                        value={modules.seo?.localSeo?.sampleReview?.text || ""}
                        onChange={(e) => {
                          const localSeo = { ...(modules.seo?.localSeo || {}) };
                          const sampleReview = { ...(localSeo.sampleReview || {}), text: e.target.value };
                          handleModuleDataChange("seo", { ...modules.seo, localSeo: { ...localSeo, sampleReview } });
                        }}
                        className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white italic"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 9: MODULE 07 - DIGITAL PLANNING */}
        {matchesFilter("digitalPlanning", "Module 07: Digital Media Planning & Strategy") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("digitalPlanning")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  <Briefcase size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    9. Module 07 · Digital Planning & Strategy Deck
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Executive pitch deck slides, gap analysis matrix & 16-week execution roadmap
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.digitalPlanning ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.digitalPlanning && (
              <div className="p-4 border-t border-slate-200 space-y-6 bg-white">
                {/* Header Customizer */}
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">
                    Module 07 Header & Category Labels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.digitalPlanningMeta?.category || "MODULE 07 · STRATEGIC GROWTH ARCHITECTURE"}
                        onChange={(e) => {
                          const updated = { ...(modules.digitalPlanningMeta || {}), category: e.target.value };
                          handleModuleDataChange("digitalPlanningMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.digitalPlanningMeta?.title || "Digital Planning, Brand Audit & Strategy Deck"}
                        onChange={(e) => {
                          const updated = { ...(modules.digitalPlanningMeta || {}), title: e.target.value };
                          handleModuleDataChange("digitalPlanningMeta", updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* PART 1: EXECUTIVE SLIDES */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Briefcase size={14} className="text-amber-500" />
                      <span>Executive Pitch Deck Slides ({(modules.digitalPlanning?.brandAuditDeck || []).length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                          ? modules.digitalPlanning.brandAuditDeck
                          : [];
                        const newSlide = {
                          slideNumber: current.length + 1,
                          tag: "EXECUTIVE DELIVERABLE · STRATEGIC GROWTH ARCHITECTURE",
                          title: "New Executive Strategy Deliverable",
                          findings: [
                            "Core strategic takeaway outlining customer journey friction and unlock points.",
                            "Key benchmark comparison against top category competitors.",
                            "Actionable milestone roadmap for scaling marketing attribution.",
                          ],
                          frameworkArchitecture: "Strategic workflow architecture detailing channel dependencies and expected ROI.",
                        };
                        handleModuleDataChange("digitalPlanning", {
                          ...modules.digitalPlanning,
                          brandAuditDeck: [...current, newSlide],
                        });
                      }}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
                    >
                      <Plus size={13} />
                      <span>Add Slide</span>
                    </button>
                  </div>

                  {(modules.digitalPlanning?.brandAuditDeck || []).map((slide, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-extrabold text-amber-400 text-xs">
                          Slide #{sIdx + 1}: {slide.title || "Untitled Slide"}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                              ? modules.digitalPlanning.brandAuditDeck
                              : [];
                            const updated = current.filter((_, i) => i !== sIdx);
                            handleModuleDataChange("digitalPlanning", {
                              ...modules.digitalPlanning,
                              brandAuditDeck: updated,
                            });
                          }}
                          className="p-1 rounded bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Delete slide"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">
                            Slide Tag / Deliverable
                          </label>
                          <input
                            type="text"
                            value={slide.tag || ""}
                            onChange={(e) => {
                              const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                ? modules.digitalPlanning.brandAuditDeck
                                : [];
                              const updated = [...current];
                              updated[sIdx] = { ...updated[sIdx], tag: e.target.value };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                brandAuditDeck: updated,
                              });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-blue-400 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">
                            Slide Title
                          </label>
                          <input
                            type="text"
                            value={slide.title || ""}
                            onChange={(e) => {
                              const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                ? modules.digitalPlanning.brandAuditDeck
                                : [];
                              const updated = [...current];
                              updated[sIdx] = { ...updated[sIdx], title: e.target.value };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                brandAuditDeck: updated,
                              });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-white font-bold"
                          />
                        </div>
                      </div>

                      {/* Strategic Diagnostic Findings */}
                      <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-extrabold uppercase text-slate-300">
                            Strategic Diagnostic Findings
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                ? modules.digitalPlanning.brandAuditDeck
                                : [];
                              const updated = [...current];
                              const findings = [...(updated[sIdx].findings || [])];
                              findings.push("New strategic diagnostic observation and critical benchmark takeaway.");
                              updated[sIdx] = { ...updated[sIdx], findings };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                brandAuditDeck: updated,
                              });
                            }}
                            className="text-[9px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-0.5 cursor-pointer"
                          >
                            <Plus size={10} />
                            <span>Add Finding</span>
                          </button>
                        </div>
                        {(slide.findings || []).map((finding, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5">
                            <span className="text-blue-400 font-bold text-xs">{fIdx + 1}.</span>
                            <input
                              type="text"
                              value={finding || ""}
                              onChange={(e) => {
                                const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                  ? modules.digitalPlanning.brandAuditDeck
                                  : [];
                                const updated = [...current];
                                const findings = [...(updated[sIdx].findings || [])];
                                findings[fIdx] = e.target.value;
                                updated[sIdx] = { ...updated[sIdx], findings };
                                handleModuleDataChange("digitalPlanning", {
                                  ...modules.digitalPlanning,
                                  brandAuditDeck: updated,
                                });
                              }}
                              className="flex-1 px-2 py-0.5 text-xs rounded border border-slate-700 bg-slate-900 text-slate-200"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                  ? modules.digitalPlanning.brandAuditDeck
                                  : [];
                                const updated = [...current];
                                const findings = (updated[sIdx].findings || []).filter((_, i) => i !== fIdx);
                                updated[sIdx] = { ...updated[sIdx], findings };
                                handleModuleDataChange("digitalPlanning", {
                                  ...modules.digitalPlanning,
                                  brandAuditDeck: updated,
                                });
                              }}
                              className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Benchmarking Matrix (if present) */}
                      {slide.metricsTable && (
                        <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-[9px] font-extrabold uppercase text-amber-400">
                              Diagnostic Benchmarking Matrix Rows
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                  ? modules.digitalPlanning.brandAuditDeck
                                  : [];
                                const updated = [...current];
                                const mt = [...(updated[sIdx].metricsTable || [])];
                                mt.push({ metric: "New Benchmark Metric", auditState: "15%", benchmark: "45%" });
                                updated[sIdx] = { ...updated[sIdx], metricsTable: mt };
                                handleModuleDataChange("digitalPlanning", {
                                  ...modules.digitalPlanning,
                                  brandAuditDeck: updated,
                                });
                              }}
                              className="text-[9px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-0.5 cursor-pointer"
                            >
                              <Plus size={10} />
                              <span>Add Row</span>
                            </button>
                          </div>
                          {(slide.metricsTable || []).map((row, rIdx) => (
                            <div key={rIdx} className="grid grid-cols-12 gap-1.5 items-center">
                              <input
                                type="text"
                                placeholder="Metric"
                                value={row.metric || ""}
                                onChange={(e) => {
                                  const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                    ? modules.digitalPlanning.brandAuditDeck
                                    : [];
                                  const updated = [...current];
                                  const mt = [...(updated[sIdx].metricsTable || [])];
                                  mt[rIdx] = { ...mt[rIdx], metric: e.target.value };
                                  updated[sIdx] = { ...updated[sIdx], metricsTable: mt };
                                  handleModuleDataChange("digitalPlanning", {
                                    ...modules.digitalPlanning,
                                    brandAuditDeck: updated,
                                  });
                                }}
                                className="col-span-5 px-2 py-0.5 text-xs rounded border border-slate-700 bg-slate-900 text-white"
                              />
                              <input
                                type="text"
                                placeholder="Audit State"
                                value={row.auditState || ""}
                                onChange={(e) => {
                                  const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                    ? modules.digitalPlanning.brandAuditDeck
                                    : [];
                                  const updated = [...current];
                                  const mt = [...(updated[sIdx].metricsTable || [])];
                                  mt[rIdx] = { ...mt[rIdx], auditState: e.target.value };
                                  updated[sIdx] = { ...updated[sIdx], metricsTable: mt };
                                  handleModuleDataChange("digitalPlanning", {
                                    ...modules.digitalPlanning,
                                    brandAuditDeck: updated,
                                  });
                                }}
                                className="col-span-3 px-2 py-0.5 text-xs rounded border border-slate-700 bg-slate-900 text-rose-400 font-mono font-bold"
                              />
                              <input
                                type="text"
                                placeholder="Benchmark"
                                value={row.benchmark || ""}
                                onChange={(e) => {
                                  const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                    ? modules.digitalPlanning.brandAuditDeck
                                    : [];
                                  const updated = [...current];
                                  const mt = [...(updated[sIdx].metricsTable || [])];
                                  mt[rIdx] = { ...mt[rIdx], benchmark: e.target.value };
                                  updated[sIdx] = { ...updated[sIdx], metricsTable: mt };
                                  handleModuleDataChange("digitalPlanning", {
                                    ...modules.digitalPlanning,
                                    brandAuditDeck: updated,
                                  });
                                }}
                                className="col-span-3 px-2 py-0.5 text-xs rounded border border-slate-700 bg-slate-900 text-emerald-400 font-mono font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                    ? modules.digitalPlanning.brandAuditDeck
                                    : [];
                                  const updated = [...current];
                                  const mt = (updated[sIdx].metricsTable || []).filter((_, i) => i !== rIdx);
                                  updated[sIdx] = { ...updated[sIdx], metricsTable: mt };
                                  handleModuleDataChange("digitalPlanning", {
                                    ...modules.digitalPlanning,
                                    brandAuditDeck: updated,
                                  });
                                }}
                                className="col-span-1 p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Framework Architecture (if present) */}
                      {slide.frameworkArchitecture !== undefined && (
                        <div>
                          <label className="text-[9px] font-bold text-amber-400 uppercase block mb-0.5">
                            Framework Architecture
                          </label>
                          <textarea
                            rows={2}
                            value={slide.frameworkArchitecture || ""}
                            onChange={(e) => {
                              const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
                                ? modules.digitalPlanning.brandAuditDeck
                                : [];
                              const updated = [...current];
                              updated[sIdx] = { ...updated[sIdx], frameworkArchitecture: e.target.value };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                brandAuditDeck: updated,
                              });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-slate-300"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Footers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-white rounded-xl border border-slate-200">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Slide Left Footer</label>
                      <input
                        type="text"
                        value={modules.digitalPlanning?.capstoneReviewText || "Presented for Capstone Certification Review"}
                        onChange={(e) => {
                          handleModuleDataChange("digitalPlanning", {
                            ...modules.digitalPlanning,
                            capstoneReviewText: e.target.value,
                          });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Slide Right Footer</label>
                      <input
                        type="text"
                        value={modules.digitalPlanning?.verifiedTrainerText || "Verified by Academy Lead Trainer"}
                        onChange={(e) => {
                          handleModuleDataChange("digitalPlanning", {
                            ...modules.digitalPlanning,
                            verifiedTrainerText: e.target.value,
                          });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-amber-700"
                      />
                    </div>
                  </div>
                </div>

                {/* PART 2: 16-WEEK ROADMAP */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Calendar size={14} className="text-blue-600" />
                      <span>16-Week Execution Roadmap Phases ({(modules.digitalPlanning?.strategyRoadmap || []).length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                          ? modules.digitalPlanning.strategyRoadmap
                          : [];
                        const newPhase = {
                          weeks: "Weeks 17 - 20",
                          allocation: "15% Allocation",
                          phase: "Phase 4: Omnichannel Scaling",
                          channels: ["Influencer Marketing", "Affiliate Loops"],
                          deliverables: [
                            "Scale profitable influencer seeding agreements",
                            "Deploy affiliate tracking and wholesale onboarding",
                          ],
                          milestone: "Milestone Review at 20",
                        };
                        handleModuleDataChange("digitalPlanning", {
                          ...modules.digitalPlanning,
                          strategyRoadmap: [...current, newPhase],
                        });
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Plus size={13} />
                      <span>Add Phase</span>
                    </button>
                  </div>

                  {(modules.digitalPlanning?.strategyRoadmap || []).map((phase, pIdx) => (
                    <div key={pIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-extrabold text-slate-900 text-xs">
                          {phase.weeks}: {phase.phase}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                              ? modules.digitalPlanning.strategyRoadmap
                              : [];
                            const updated = current.filter((_, i) => i !== pIdx);
                            handleModuleDataChange("digitalPlanning", {
                              ...modules.digitalPlanning,
                              strategyRoadmap: updated,
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete phase"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Weeks</label>
                          <input
                            type="text"
                            value={phase.weeks || ""}
                            onChange={(e) => {
                              const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                                ? modules.digitalPlanning.strategyRoadmap
                                : [];
                              const updated = [...current];
                              updated[pIdx] = { ...updated[pIdx], weeks: e.target.value };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                strategyRoadmap: updated,
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold text-blue-600"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Budget Allocation</label>
                          <input
                            type="text"
                            value={phase.allocation || ""}
                            placeholder="15% Allocation"
                            onChange={(e) => {
                              const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                                ? modules.digitalPlanning.strategyRoadmap
                                : [];
                              const updated = [...current];
                              updated[pIdx] = { ...updated[pIdx], allocation: e.target.value };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                strategyRoadmap: updated,
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold text-emerald-700"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Milestone Label</label>
                          <input
                            type="text"
                            value={phase.milestone || ""}
                            onChange={(e) => {
                              const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                                ? modules.digitalPlanning.strategyRoadmap
                                : [];
                              const updated = [...current];
                              updated[pIdx] = { ...updated[pIdx], milestone: e.target.value };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                strategyRoadmap: updated,
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono text-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-500 block mb-0.5">Phase Title</label>
                        <input
                          type="text"
                          value={phase.phase || ""}
                          onChange={(e) => {
                            const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                              ? modules.digitalPlanning.strategyRoadmap
                              : [];
                            const updated = [...current];
                            updated[pIdx] = { ...updated[pIdx], phase: e.target.value };
                            handleModuleDataChange("digitalPlanning", {
                              ...modules.digitalPlanning,
                              strategyRoadmap: updated,
                            });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
                        />
                      </div>

                      {/* Deliverables list */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-extrabold uppercase text-slate-600">
                            Key Deliverables
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                                ? modules.digitalPlanning.strategyRoadmap
                                : [];
                              const updated = [...current];
                              const deliverables = [...(updated[pIdx].deliverables || [])];
                              deliverables.push("New core deliverable during this campaign flight");
                              updated[pIdx] = { ...updated[pIdx], deliverables };
                              handleModuleDataChange("digitalPlanning", {
                                ...modules.digitalPlanning,
                                strategyRoadmap: updated,
                              });
                            }}
                            className="text-[9px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                          >
                            <Plus size={10} />
                            <span>Add Deliverable</span>
                          </button>
                        </div>
                        {(phase.deliverables || []).map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-1.5">
                            <span className="text-blue-600 font-bold text-xs">•</span>
                            <input
                              type="text"
                              value={deliv || ""}
                              onChange={(e) => {
                                const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                                  ? modules.digitalPlanning.strategyRoadmap
                                  : [];
                                const updated = [...current];
                                const deliverables = [...(updated[pIdx].deliverables || [])];
                                deliverables[dIdx] = e.target.value;
                                updated[pIdx] = { ...updated[pIdx], deliverables };
                                handleModuleDataChange("digitalPlanning", {
                                  ...modules.digitalPlanning,
                                  strategyRoadmap: updated,
                                });
                              }}
                              className="flex-1 px-2 py-0.5 text-xs rounded border border-slate-200 bg-slate-50"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(modules.digitalPlanning?.strategyRoadmap)
                                  ? modules.digitalPlanning.strategyRoadmap
                                  : [];
                                const updated = [...current];
                                const deliverables = (updated[pIdx].deliverables || []).filter((_, i) => i !== dIdx);
                                updated[pIdx] = { ...updated[pIdx], deliverables };
                                handleModuleDataChange("digitalPlanning", {
                                  ...modules.digitalPlanning,
                                  strategyRoadmap: updated,
                                });
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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
                {/* Module 08 Header Controls */}
                <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-900 block">
                    Header & Metric Footers
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.influencerMarketing?.categoryBadge || "MODULE 08 · CREATOR & AFFILIATE PARTNERSHIPS"}
                        onChange={(e) => handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, categoryBadge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Sheet Title</label>
                      <input
                        type="text"
                        value={modules.influencerMarketing?.sheetTitle || "Influencer Marketing Research & Vetting Sheet"}
                        onChange={(e) => handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, sheetTitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Subtitle</label>
                    <input
                      type="text"
                      value={modules.influencerMarketing?.subtitle || "A comprehensive creator vetting database evaluating follower authenticity, audience fraud detection, demographic skew, engagement rates, and projected collaboration ROI."}
                      onChange={(e) => handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, subtitle: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Top Badge</label>
                      <input
                        type="text"
                        value={modules.influencerMarketing?.badge || "Fraud Audit · Modash & HypeAuditor Metrics"}
                        onChange={(e) => handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, badge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">CPM Benchmark Footer</label>
                      <input
                        type="text"
                        value={modules.influencerMarketing?.cpmBenchmark || "Evaluated against creator CPM benchmarks ($12-$18 CPM target)."}
                        onChange={(e) => handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, cpmBenchmark: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Cohort Avg Engagement</label>
                      <input
                        type="text"
                        value={modules.influencerMarketing?.cohortAvgEngagement || "5.25%"}
                        onChange={(e) => handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, cohortAvgEngagement: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-amber-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Creators List */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Vetted Creators Database ({((modules.influencerMarketing?.creators || [])).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddCreator}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                  >
                    <Plus size={13} />
                    <span>Add Creator Row</span>
                  </button>
                </div>

                {((modules.influencerMarketing?.creators || [])).map((creator, cIdx) => (
                  <div key={creator.id || cIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs">#{cIdx + 1} {creator.name}</span>
                        <span className="text-blue-600 font-medium text-xs">{creator.handle}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCreator(cIdx)}
                        className="p-1 rounded bg-slate-200/60 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete Creator Row"
                      >
                        <Trash2 size={13} />
                      </button>
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white text-blue-600 font-medium"
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-medium"
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Niche / Focus</label>
                        <input
                          type="text"
                          value={creator.niche || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], niche: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Gender Demographics</label>
                        <input
                          type="text"
                          value={creator.genderDemographics || ""}
                          onChange={(e) => {
                            const updated = [...modules.influencerMarketing.creators];
                            updated[cIdx] = { ...updated[cIdx], genderDemographics: e.target.value };
                            handleModuleDataChange("influencerMarketing", { ...modules.influencerMarketing, creators: updated });
                          }}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono"
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold text-emerald-700"
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold"
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
                          className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-bold"
                        >
                          <option value="Recommended">Recommended</option>
                          <option value="High Potential">High Potential</option>
                          <option value="Risky">Risky</option>
                        </select>
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
                {/* Header Customizer */}
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 block">
                    Module 09 Header & Badges
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.shopify?.categoryBadge || "Module 09 · E-Commerce Architecture"}
                        onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, categoryBadge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.shopify?.moduleTitle || "Shopify E-Commerce Store & CRO Architecture"}
                        onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, moduleTitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={modules.shopify?.subtitle || "End-to-end Shopify merchant deployment designed for high Average Order Value (AOV), seamless 1-click checkout, and automated retention loops."}
                        onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, subtitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Top Right Badge</label>
                      <input
                        type="text"
                        value={modules.shopify?.topBadge || "Shopify Partner Certified · Liquid Customized"}
                        onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, topBadge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Screenshot & Theme Overlay */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      Store Preview Mockup Image & Theme Badge
                    </label>
                    <button
                      type="button"
                      onClick={() => handleModuleDataChange("shopify", { ...modules.shopify, imageUrl: mockupCreativesImg })}
                      className="text-[10px] text-blue-600 hover:underline cursor-pointer"
                    >
                      Reset Mockup
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-16 bg-slate-900 rounded overflow-hidden border border-slate-200 shrink-0">
                      <img src={modules.shopify?.imageUrl || mockupCreativesImg} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs">
                        <Upload size={11} />
                        <span>Upload Store Screenshot</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileUpload(e, (url) => {
                              handleModuleDataChange("shopify", { ...modules.shopify, imageUrl: url });
                            })
                          }
                        />
                      </label>
                      <input
                        type="text"
                        value={modules.shopify?.imageUrl || ""}
                        placeholder="or paste image URL"
                        onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, imageUrl: e.target.value })}
                        className="w-full px-2 py-1 text-[11px] rounded border border-slate-200 bg-slate-50 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Theme Badge Overlay Text</label>
                    <input
                      type="text"
                      value={modules.shopify?.themeUsed || "Customized Dawn 2.0 with liquid micro-optimizations"}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, themeUsed: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-amber-700"
                    />
                  </div>
                </div>

                {/* Store Info & KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Niche Category Eyebrow</label>
                    <input
                      type="text"
                      value={modules.shopify?.nicheCategory || "SUSTAINABLE ORGANIC OUTDOOR APPAREL & GEAR"}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, nicheCategory: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-amber-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Store Brand Name</label>
                    <input
                      type="text"
                      value={modules.shopify?.storeName || "Terra & Tide Apparel"}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, storeName: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Store Description</label>
                  <textarea
                    rows={2}
                    value={modules.shopify?.description || ""}
                    onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, description: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Conversion Rate Value</label>
                    <input
                      type="text"
                      value={modules.shopify?.conversionRateAchieved || "3.84% (up from 1.9% store baseline)"}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, conversionRateAchieved: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-blue-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Achieved AOV Value</label>
                    <input
                      type="text"
                      value={modules.shopify?.aovAchieved || "$89.50 (+$21 lift via cart cross-sells)"}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, aovAchieved: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-amber-800"
                    />
                  </div>
                </div>

                {/* CRO Features List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Conversion Rate Optimization (CRO) Features ({((modules.shopify?.croFeatures || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddShopifyCroFeature}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Plus size={13} />
                      <span>Add Feature</span>
                    </button>
                  </div>
                  {((modules.shopify?.croFeatures || [])).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...modules.shopify.croFeatures];
                          updated[fIdx] = e.target.value;
                          handleModuleDataChange("shopify", { ...modules.shopify, croFeatures: updated });
                        }}
                        className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveShopifyCroFeature(fIdx)}
                        className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Delete feature"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Integrated Shopify Apps */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Integrated Shopify Apps ({((modules.shopify?.installedApps || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddShopifyApp}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Plus size={13} />
                      <span>Add App</span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {((modules.shopify?.installedApps || [])).map((app, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={app}
                          onChange={(e) => {
                            const updated = [...modules.shopify.installedApps];
                            updated[aIdx] = e.target.value;
                            handleModuleDataChange("shopify", { ...modules.shopify, installedApps: updated });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveShopifyApp(aIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Delete app"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
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
                {/* Header Customizer */}
                <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-900 block">
                    Module 10 Header & Badges
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Badge</label>
                      <input
                        type="text"
                        value={modules.videoEditing?.categoryBadge || "Module 10 · Post-Production & Motion"}
                        onChange={(e) => handleModuleDataChange("videoEditing", { ...modules.videoEditing, categoryBadge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.videoEditing?.moduleTitle || "Video Editing, UGC Creatives & Commercial Reels"}
                        onChange={(e) => handleModuleDataChange("videoEditing", { ...modules.videoEditing, moduleTitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={modules.videoEditing?.subtitle || "Short-form video assets engineered for algorithm retention, featuring dynamic jump-cut pacing, kinetic subtitles, and psycho-acoustic sound design."}
                        onChange={(e) => handleModuleDataChange("videoEditing", { ...modules.videoEditing, subtitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Top Badge</label>
                      <input
                        type="text"
                        value={modules.videoEditing?.topBadge || "CapCut Desktop · Premiere Pro · 4K Color Graded"}
                        onChange={(e) => handleModuleDataChange("videoEditing", { ...modules.videoEditing, topBadge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Reels List */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Video Reels & UGC Assets ({((modules.videoEditing?.reels || modules.videoEditing || [])).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddVideoReel}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                  >
                    <Plus size={13} />
                    <span>Add Video Reel</span>
                  </button>
                </div>

                {((modules.videoEditing?.reels || (Array.isArray(modules.videoEditing) ? modules.videoEditing : []))).map((reel, rIdx) => (
                  <div key={reel.id || rIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        Reel #{rIdx + 1}: {reel.title || "Untitled Video"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveVideoReel(rIdx)}
                        className="p-1 rounded bg-slate-200/60 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete video reel"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Format Pill Tag</label>
                        <input
                          type="text"
                          value={reel.formatTag || ""}
                          placeholder="e.g. Reels / TikTok"
                          onChange={(e) => {
                            const current = modules.videoEditing?.reels || modules.videoEditing || [];
                            const updated = [...current];
                            updated[rIdx] = { ...updated[rIdx], formatTag: e.target.value };
                            handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-amber-700 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Duration</label>
                        <input
                          type="text"
                          value={reel.duration || ""}
                          placeholder="e.g. 0:24"
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

                    {/* Thumbnail Image Manager */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Thumbnail Image</label>
                        <button
                          type="button"
                          onClick={() => {
                            const current = modules.videoEditing?.reels || modules.videoEditing || [];
                            const updated = [...current];
                            updated[rIdx] = { ...updated[rIdx], imageUrl: mockupCreativesImg };
                            handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                          }}
                          className="text-[10px] text-blue-600 hover:underline cursor-pointer"
                        >
                          Reset Default
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-14 bg-slate-900 rounded overflow-hidden border border-slate-200 shrink-0">
                          <img src={reel.imageUrl || mockupCreativesImg} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <label className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs">
                            <Upload size={11} />
                            <span>Upload Thumbnail</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileUpload(e, (url) => {
                                  const current = modules.videoEditing?.reels || modules.videoEditing || [];
                                  const updated = [...current];
                                  updated[rIdx] = { ...updated[rIdx], imageUrl: url };
                                  handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                                })
                              }
                            />
                          </label>
                          <input
                            type="text"
                            value={reel.imageUrl || ""}
                            placeholder="or paste image URL"
                            onChange={(e) => {
                              const current = modules.videoEditing?.reels || modules.videoEditing || [];
                              const updated = [...current];
                              updated[rIdx] = { ...updated[rIdx], imageUrl: e.target.value };
                              handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded border border-slate-200 bg-slate-50 font-mono"
                          />
                        </div>
                      </div>
                    </div>

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
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={reel.description || ""}
                        onChange={(e) => {
                          const current = modules.videoEditing?.reels || modules.videoEditing || [];
                          const updated = [...current];
                          updated[rIdx] = { ...updated[rIdx], description: e.target.value };
                          handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Hook & Retention Strategy Quote</label>
                      <input
                        type="text"
                        value={reel.hookStrategy || ""}
                        onChange={(e) => {
                          const current = modules.videoEditing?.reels || modules.videoEditing || [];
                          const updated = [...current];
                          updated[rIdx] = { ...updated[rIdx], hookStrategy: e.target.value };
                          handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white italic"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Verified Retention Metric</label>
                      <input
                        type="text"
                        value={reel.retentionMetric || ""}
                        onChange={(e) => {
                          const current = modules.videoEditing?.reels || modules.videoEditing || [];
                          const updated = [...current];
                          updated[rIdx] = { ...updated[rIdx], retentionMetric: e.target.value };
                          handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-emerald-700"
                      />
                    </div>

                    {/* Tools list */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Software / Tools Used</span>
                        <button
                          type="button"
                          onClick={() => handleAddVideoTool(rIdx)}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus size={11} />
                          <span>Add Tool</span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(Array.isArray(reel.tools) ? reel.tools : []).map((tool, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-1 bg-white border border-slate-200 rounded px-2 py-0.5 text-xs">
                            <input
                              type="text"
                              value={tool}
                              onChange={(e) => {
                                const current = modules.videoEditing?.reels || modules.videoEditing || [];
                                const updated = [...current];
                                const tools = [...updated[rIdx].tools];
                                tools[tIdx] = e.target.value;
                                updated[rIdx] = { ...updated[rIdx], tools };
                                handleModuleDataChange("videoEditing", { ...modules.videoEditing, reels: updated });
                              }}
                              className="text-xs bg-transparent border-none p-0 focus:outline-none w-24 font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveVideoTool(rIdx, tIdx)}
                              className="text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 13: MODULE 11 - DROPSHIPPING */}
        {matchesFilter("dropshipping", "Module 11: Dropshipping Store & Winning Product Validation") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("dropshipping")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  <Truck size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    13. Module 11 · Dropshipping Store & Product Validation
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Product discovery, supply chain, margin modeling & pilot sprint results
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Winning Product Name</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.winningProduct || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, winningProduct: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Storefront & Supplier Info</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.storefrontDetails || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, storefrontDetails: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">COGS</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.cogs || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, cogs: e.target.value })}
                      className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Retail Price</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.retailPrice || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, retailPrice: e.target.value })}
                      className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Net Profit / Margin</label>
                    <input
                      type="text"
                      value={modules.dropshipping?.netProfit || modules.dropshipping?.grossMarginPct || ""}
                      onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, netProfit: e.target.value })}
                      className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white font-mono font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Winning Ad Angle & Hook</label>
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
                {/* Header Customizer */}
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-900 block">
                    Module 12 Header & Workflow
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Eyebrow</label>
                      <input
                        type="text"
                        value={modules.aiApp?.moduleEyebrow || "MODULE 12 · ARTIFICIAL INTELLIGENCE & AUTOMATION"}
                        onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, moduleEyebrow: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.aiApp?.title || "AI-Powered Marketing Application & Creative Co-Pilot"}
                        onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, title: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={modules.aiApp?.subtitle || "Custom software engineered with modern AI APIs to accelerate marketing workflows, automate direct-response ad copy generation, and scale creative testing."}
                        onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, subtitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Top Badge</label>
                      <input
                        type="text"
                        value={modules.aiApp?.topBadge || "Gemini API · React 19 · Prompt Engineered"}
                        onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, topBadge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Mockup Banner Pill</label>
                    <input
                      type="text"
                      value={modules.aiApp?.mockupBanner || "Gemini 2.5 Flash with custom system prompts & temperature fine-tuning"}
                      onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, mockupBanner: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold text-blue-600"
                    />
                  </div>
                </div>

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
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category Eyebrow</label>
                    <input
                      type="text"
                      value={modules.aiApp?.category || ""}
                      onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, category: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">App Description</label>
                  <textarea
                    rows={2}
                    value={modules.aiApp?.appDescription || ""}
                    onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, appDescription: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Engineered System Prompt Instruction</label>
                  <textarea
                    rows={3}
                    value={modules.aiApp?.systemPromptInstruction || ""}
                    onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, systemPromptInstruction: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-slate-800"
                  />
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Product Architecture Features ({((modules.aiApp?.features || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddAiFeature}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                    >
                      <Plus size={11} />
                      <span>Add Feature</span>
                    </button>
                  </div>
                  {((modules.aiApp?.features || [])).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...modules.aiApp.features];
                          updated[fIdx] = e.target.value;
                          handleModuleDataChange("aiApp", { ...modules.aiApp, features: updated });
                        }}
                        className="flex-1 px-2.5 py-1 text-xs rounded border border-slate-200 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAiFeature(fIdx)}
                        className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tech Stack List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Tech Stack Pills ({((modules.aiApp?.techStack || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddAiTech}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                    >
                      <Plus size={11} />
                      <span>Add Tech</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {((modules.aiApp?.techStack || [])).map((tech, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded px-2 py-0.5 text-xs">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => {
                            const updated = [...modules.aiApp.techStack];
                            updated[tIdx] = e.target.value;
                            handleModuleDataChange("aiApp", { ...modules.aiApp, techStack: updated });
                          }}
                          className="text-xs bg-transparent border-none p-0 focus:outline-none w-20 font-mono font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAiTech(tIdx)}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ad Variants for Interactive Simulator */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Interactive Simulator Ad Variants (AIDA, PAS, Curiosity)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddAiVariant("AIDA")}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                    >
                      <Plus size={12} />
                      <span>Add AIDA Variant</span>
                    </button>
                  </div>

                  {["AIDA", "PAS", "Curiosity"].map((fw) => (
                    <div key={fw} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-blue-900 text-xs uppercase">{fw} Framework Variants</span>
                        <button
                          type="button"
                          onClick={() => handleAddAiVariant(fw)}
                          className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          + Add {fw}
                        </button>
                      </div>
                      {(modules.aiApp?.variants?.[fw] || []).map((variant, vIdx) => (
                        <div key={vIdx} className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-[11px]">Variant #{vIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveAiVariant(fw, vIdx)}
                              className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={variant.framework || ""}
                              placeholder="Framework Label"
                              onChange={(e) => {
                                const current = [...(modules.aiApp.variants[fw] || [])];
                                current[vIdx] = { ...current[vIdx], framework: e.target.value };
                                handleModuleDataChange("aiApp", {
                                  ...modules.aiApp,
                                  variants: { ...modules.aiApp.variants, [fw]: current },
                                });
                              }}
                              className="px-2 py-1 text-xs rounded border border-slate-200 font-semibold text-blue-600"
                            />
                            <input
                              type="text"
                              value={variant.ctr || ""}
                              placeholder="Pred. CTR"
                              onChange={(e) => {
                                const current = [...(modules.aiApp.variants[fw] || [])];
                                current[vIdx] = { ...current[vIdx], ctr: e.target.value };
                                handleModuleDataChange("aiApp", {
                                  ...modules.aiApp,
                                  variants: { ...modules.aiApp.variants, [fw]: current },
                                });
                              }}
                              className="px-2 py-1 text-xs rounded border border-slate-200 font-mono font-bold text-emerald-700"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={variant.text || ""}
                            placeholder="Variant Ad Copy text"
                            onChange={(e) => {
                              const current = [...(modules.aiApp.variants[fw] || [])];
                              current[vIdx] = { ...current[vIdx], text: e.target.value };
                              handleModuleDataChange("aiApp", {
                                ...modules.aiApp,
                                variants: { ...modules.aiApp.variants, [fw]: current },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 text-slate-700"
                          />
                        </div>
                      ))}
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
                {/* Header Customizer */}
                <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-900 block">
                    Module 13 Header & Verification Badges
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Eyebrow</label>
                      <input
                        type="text"
                        value={modules.performanceMarketing?.moduleEyebrow || "MODULE 13 · ADVANCED PERFORMANCE MARKETING"}
                        onChange={(e) => handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, moduleEyebrow: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Module Title</label>
                      <input
                        type="text"
                        value={modules.performanceMarketing?.title || "Performance Marketing & Full-Funnel Scaling"}
                        onChange={(e) => handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, title: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={modules.performanceMarketing?.subtitle || "Full-funnel paid acquisition architecture scaling spend from $8k to $45k/month while sustaining high profitability through CAC reduction and cohort LTV expansion."}
                        onChange={(e) => handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, subtitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Top Badge</label>
                      <input
                        type="text"
                        value={modules.performanceMarketing?.topBadge || "Triple Whale & GA4 Attributed · $135k Managed"}
                        onChange={(e) => handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, topBadge: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* 4 Stat Cards Editor */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">
                      Performance Stat Cards ({((modules.performanceMarketing?.stats || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPerfStat}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
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

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
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
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono font-bold"
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
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Highlight</label>
                          <select
                            value={stat.highlight || "none"}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.stats];
                              updated[sIdx] = { ...updated[sIdx], highlight: e.target.value === "none" ? false : e.target.value };
                              handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, stats: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200"
                          >
                            <option value="none">Standard</option>
                            <option value="blue">Blue</option>
                            <option value="amber">Amber</option>
                            <option value="emerald">Emerald</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Funnel Allocation Architecture */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">
                      Funnel Allocation Stages ({((modules.performanceMarketing?.funnelArchitecture?.stages || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPerfStage}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Plus size={13} />
                      <span>Add Funnel Stage</span>
                    </button>
                  </div>

                  {((modules.performanceMarketing?.funnelArchitecture?.stages || [])).map((stage, stIdx) => (
                    <div key={stIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-xs">Stage #{stIdx + 1}: {stage.stage}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePerfStage(stIdx)}
                          className="p-1 rounded bg-slate-200/60 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Stage Name</label>
                          <input
                            type="text"
                            value={stage.stage || ""}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.funnelArchitecture.stages];
                              updated[stIdx] = { ...updated[stIdx], stage: e.target.value };
                              handleModuleDataChange("performanceMarketing", {
                                ...modules.performanceMarketing,
                                funnelArchitecture: { ...modules.performanceMarketing.funnelArchitecture, stages: updated },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Budget %</label>
                          <input
                            type="text"
                            value={stage.pct || ""}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.funnelArchitecture.stages];
                              updated[stIdx] = { ...updated[stIdx], pct: e.target.value };
                              handleModuleDataChange("performanceMarketing", {
                                ...modules.performanceMarketing,
                                funnelArchitecture: { ...modules.performanceMarketing.funnelArchitecture, stages: updated },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-bold text-blue-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Objective</label>
                        <input
                          type="text"
                          value={stage.objective || ""}
                          onChange={(e) => {
                            const updated = [...modules.performanceMarketing.funnelArchitecture.stages];
                            updated[stIdx] = { ...updated[stIdx], objective: e.target.value };
                            handleModuleDataChange("performanceMarketing", {
                              ...modules.performanceMarketing,
                              funnelArchitecture: { ...modules.performanceMarketing.funnelArchitecture, stages: updated },
                            });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 text-slate-700"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Active Channels</label>
                          <input
                            type="text"
                            value={stage.channels || ""}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.funnelArchitecture.stages];
                              updated[stIdx] = { ...updated[stIdx], channels: e.target.value };
                              handleModuleDataChange("performanceMarketing", {
                                ...modules.performanceMarketing,
                                funnelArchitecture: { ...modules.performanceMarketing.funnelArchitecture, stages: updated },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Creative Formats</label>
                          <input
                            type="text"
                            value={stage.creativeFormats || ""}
                            onChange={(e) => {
                              const updated = [...modules.performanceMarketing.funnelArchitecture.stages];
                              updated[stIdx] = { ...updated[stIdx], creativeFormats: e.target.value };
                              handleModuleDataChange("performanceMarketing", {
                                ...modules.performanceMarketing,
                                funnelArchitecture: { ...modules.performanceMarketing.funnelArchitecture, stages: updated },
                              });
                            }}
                            className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 text-slate-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Budget Footer Text</label>
                        <input
                          type="text"
                          value={stage.budgetFooter || ""}
                          onChange={(e) => {
                            const updated = [...modules.performanceMarketing.funnelArchitecture.stages];
                            updated[stIdx] = { ...updated[stIdx], budgetFooter: e.target.value };
                            handleModuleDataChange("performanceMarketing", {
                              ...modules.performanceMarketing,
                              funnelArchitecture: { ...modules.performanceMarketing.funnelArchitecture, stages: updated },
                            });
                          }}
                          className="w-full px-2 py-1 text-xs rounded bg-white border border-slate-200 text-slate-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attribution & Student Outcomes */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">
                      Verified Student Scaling Outcomes ({((modules.performanceMarketing?.attribution?.outcomes || [])).length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPerfOutcome}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Plus size={13} />
                      <span>Add Outcome</span>
                    </button>
                  </div>

                  {((modules.performanceMarketing?.attribution?.outcomes || [])).map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
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
