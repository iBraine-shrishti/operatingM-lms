import mockupLaptopImg from "../../assets/mockup-laptop.jpg";
import mockupCreativesImg from "../../assets/mockup-creatives.jpg";
import React, { useState, useEffect } from "react";
import {
  Globe,
  Palette,
  Share2,
  TrendingUp,
  Search,
  BarChart3,
  Briefcase,
  Users,
  ShoppingBag,
  Video,
  Box,
  Cpu,
  Zap,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Award,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Printer,
  Code2,
  Settings,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  MessageCircle,
  Camera,
  Trash2,
  Plus,
  Edit2,
  Eye,
  Play,
  Clock,
  DollarSign,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  Target,
  Calendar,
  Truck,
  Star,
  Store,
} from "lucide-react";
import { EditableText, PortfolioEditableContext } from "./EditableText";
import { ImageUploadModal } from "./ImageUploadModal";
import { MODULES_CATALOG, DEFAULT_MODULE_ORDER, createInitialPortfolioData } from "./portfolioData";
import logoHorizontalDarkImg from "../../assets/logo-horizontal-dark.png";
import logoHorizontalImg from "../../assets/logo-horizontal.png";

const renderSocialIcon = (platform) => {
  switch (platform?.toLowerCase()) {
    case "linkedin":
      return <Linkedin size={13} />;
    case "twitter":
    case "x":
      return <Twitter size={13} />;
    case "instagram":
      return <Instagram size={13} />;
    case "github":
      return <Github size={13} />;
    case "whatsapp":
      return <MessageCircle size={13} className="text-emerald-400" />;
    case "behance":
      return <span className="text-[10px] font-black font-mono">Bē</span>;
    default:
      return <Globe size={13} />;
  }
};

const getModuleIcon = (id) => {
  switch (id) {
    case "wordpress": return Globe;
    case "canva": return Palette;
    case "socialOrganic": return Share2;
    case "socialMarketing": return TrendingUp;
    case "googleAds": return Search;
    case "seo": return BarChart3;
    case "digitalPlanning": return Briefcase;
    case "influencerMarketing": return Users;
    case "shopify": return ShoppingBag;
    case "videoEditing": return Video;
    case "dropshipping": return Box;
    case "aiApp": return Cpu;
    case "performanceMarketing": return Zap;
    default: return Globe;
  }
};

export const PortfolioPreview = ({
  portfolioData,
  theme,
  moduleVisibility = {},
  onChange,
  onOpenCustomizer,
  isStandalone = false,
}) => {
  const defaultData = React.useMemo(() => createInitialPortfolioData(), []);
  const student = portfolioData?.student || defaultData.student;
  const modules = { ...defaultData.modules, ...(portfolioData?.modules || {}) };
  const moduleOrder =
    Array.isArray(portfolioData?.moduleOrder) && portfolioData.moduleOrder.length > 0
      ? portfolioData.moduleOrder
      : defaultData.moduleOrder;
  const isEditable = !isStandalone && Boolean(onChange);
  const [activeTab, setActiveTab] = useState("wordpress");
  const [openMetaIdx, setOpenMetaIdx] = useState(0);
  const [openGoogleIdx, setOpenGoogleIdx] = useState(0);
  const [canvaFilter, setCanvaFilter] = useState("all");
  const [seoActiveTab, setSeoActiveTab] = useState("keywords");
  const [seoSearchQuery, setSeoSearchQuery] = useState("");
  const [seoIntentFilter, setSeoIntentFilter] = useState("All");
  const [planSlideIdx, setPlanSlideIdx] = useState(0);
  const [influencerSearchQuery, setInfluencerSearchQuery] = useState("");
  const [influencerPlatformFilter, setInfluencerPlatformFilter] = useState("All");
  const [aiProductInput, setAiProductInput] = useState("Anti-Fatigue Ergonomic Standing Mat");
  const [aiFramework, setAiFramework] = useState("AIDA");
  const [copiedVariantIdx, setCopiedVariantIdx] = useState(null);

  // Image editing modal state
  const [imageModalConfig, setImageModalConfig] = useState({
    isOpen: false,
    title: "",
    currentUrl: "",
    isAvatar: false,
    onSave: null,
  });

  const openImageModal = (title, currentUrl, isAvatar, onSave) => {
    if (!isEditable) return;
    setImageModalConfig({
      isOpen: true,
      title,
      currentUrl,
      isAvatar,
      onSave,
    });
  };

  const closeImageModal = () => {
    setImageModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Student field updater
  const handleUpdateStudentField = (field, val) => {
    if (onChange) {
      onChange({
        ...portfolioData,
        student: {
          ...student,
          [field]: val,
        },
      });
    }
  };

  // Highlight updater
  const handleUpdateHighlight = (index, field, val) => {
    if (onChange) {
      const updated = [...(student.highlights || [])];
      updated[index] = { ...updated[index], [field]: val };
      onChange({
        ...portfolioData,
        student: {
          ...student,
          highlights: updated,
        },
      });
    }
  };

  const handleDeleteHighlight = (index) => {
    if (onChange) {
      const updated = (student.highlights || []).filter((_, i) => i !== index);
      onChange({
        ...portfolioData,
        student: { ...student, highlights: updated },
      });
    }
  };

  const handleAddHighlight = () => {
    if (onChange) {
      const updated = [
        ...(student.highlights || []),
        { label: "New Verified Metric", value: "98.4%", detail: "Campaign Tracking Attribution" },
      ];
      onChange({
        ...portfolioData,
        student: { ...student, highlights: updated },
      });
    }
  };

  // Socials updater & delete
  const handleUpdateSocial = (index, field, val) => {
    if (onChange) {
      const updated = [...(student.socials || [])];
      updated[index] = { ...updated[index], [field]: val };
      onChange({
        ...portfolioData,
        student: { ...student, socials: updated },
      });
    }
  };

  const handleDeleteSocial = (index) => {
    if (onChange) {
      const updated = (student.socials || []).filter((_, i) => i !== index);
      onChange({
        ...portfolioData,
        student: { ...student, socials: updated },
      });
    }
  };

  const handleAddSocial = () => {
    if (onChange) {
      const updated = [
        ...(student.socials || []),
        { platform: "globe", url: "https://", label: "Portfolio" },
      ];
      onChange({
        ...portfolioData,
        student: { ...student, socials: updated },
      });
    }
  };

  // Module items delete & add handlers
  const handleDeleteWordPress = (pIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.wordpress) ? modules.wordpress : [];
      const updated = current.filter((_, i) => i !== pIdx);
      onChange({
        ...portfolioData,
        modules: { ...modules, wordpress: updated },
      });
    }
  };

  const handleAddWordPress = () => {
    if (onChange) {
      const current = Array.isArray(modules.wordpress) ? modules.wordpress : [];
      const newProj = {
        id: `wp-${Date.now()}`,
        title: "New Client Website & E-commerce Store",
        clientType: "Direct-to-Consumer Brand",
        description: "Custom Elementor Pro and WooCommerce build optimized for mobile conversion and Core Web Vitals.",
        imageUrl: mockupLaptopImg,
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
      onChange({
        ...portfolioData,
        modules: { ...modules, wordpress: [...current, newProj] },
      });
    }
  };

  const handleDeleteCanvaDesign = (dIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.canva?.designs)
        ? modules.canva.designs
        : Array.isArray(modules.canva)
        ? modules.canva
        : [];
      const updated = current.filter((_, i) => i !== dIdx);
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          canva: {
            ...modules.canva,
            designs: updated,
          },
        },
      });
    }
  };

  const handleAddCanvaDesign = () => {
    if (onChange) {
      const current = Array.isArray(modules.canva?.designs)
        ? modules.canva.designs
        : Array.isArray(modules.canva)
        ? modules.canva
        : [];
      const newDesign = {
        id: `canva-d-${Date.now()}`,
        title: "New Marketing Creative Showcase",
        category: "Display Banner",
        dimensions: "1200 x 628 px",
        description: "Custom-designed high-CTR advertising asset created in Canva.",
        imageUrl: mockupCreativesImg,
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          canva: {
            ...modules.canva,
            designs: [...current, newDesign],
          },
        },
      });
    }
  };

  const handleDeleteCanvaVideo = (vIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.canva?.videos) ? modules.canva.videos : [];
      const updated = current.filter((_, i) => i !== vIdx);
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          canva: {
            ...modules.canva,
            videos: updated,
          },
        },
      });
    }
  };

  const handleDeleteSMO = (sIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
      const updated = current.filter((_, i) => i !== sIdx);
      onChange({
        ...portfolioData,
        modules: { ...modules, socialOrganic: updated },
      });
    }
  };

  const handleDeleteMetaAd = (idx) => {
    if (onChange) {
      const current = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
      const updated = current.filter((_, i) => i !== idx);
      onChange({
        ...portfolioData,
        modules: { ...modules, socialMarketing: updated },
      });
    }
  };

  const handleDeleteGoogleAd = (idx) => {
    if (onChange) {
      const current = Array.isArray(modules.googleAds) ? modules.googleAds : [];
      const updated = current.filter((_, i) => i !== idx);
      onChange({
        ...portfolioData,
        modules: { ...modules, googleAds: updated },
      });
    }
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Ordered navItems matching the student's custom module sequence
  const navItems = moduleOrder
    .map((modId, index) => {
      const catalogMod = MODULES_CATALOG.find((m) => m.id === modId);
      if (!catalogMod) return null;
      const formattedRank = String(index + 1).padStart(2, "0");
      return {
        id: modId,
        label: `${formattedRank}. ${catalogMod.title}`,
        icon: getModuleIcon(modId),
      };
    })
    .filter((item) => item && moduleVisibility[item.id] !== false);

  const scrollSlider = (direction) => {
    const slider = document.getElementById("portfolio-module-slider");
    if (slider) {
      const scrollAmount = direction === "left" ? -280 : 280;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Scroll listener for sticky navigation sync
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <PortfolioEditableContext.Provider value={isEditable}>
      <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. TOPBAR HEADER (Matching reference: Aarav Sharma / DM initials / Center links / Developer Specs / Customize / Print) */}
      <header className="relative z-20 bg-white border-b border-slate-200 shadow-2xs">
        <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 min-h-16 py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-4">
          {/* Left Brand Badge */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-xs tracking-wider shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              {student.name.split(" ").map((n) => n[0]).slice(0, 2).join("") || "DM"}
            </div>
            <div className="truncate">
              <div className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight truncate">
                <EditableText
                  value={student.name}
                  onChange={(val) => handleUpdateStudentField("name", val)}
                />
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight hidden sm:block">
                Digital Marketing Portfolio
              </div>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden xl:flex items-center space-x-5 text-xs font-semibold text-slate-600">
            {navItems.slice(0, 7).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="hover:text-blue-600 transition-colors cursor-pointer truncate max-w-[140px]"
              >
                {item.label.replace(/^\d+\.\s*/, "")}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            {!isStandalone && (
              <button
                type="button"
                onClick={() => window.open("/portfolio-live", "_blank")}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300/70 cursor-pointer shadow-2xs"
                title="View Live Standalone Portfolio"
              >
                <Code2 size={13} style={{ color: theme.primary }} />
                <span className="hidden sm:inline">Developer Specs</span>
              </button>
            )}

            {isEditable && onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 sm:py-2 text-xs font-bold text-slate-950 rounded-lg transition-colors shadow-xs cursor-pointer"
                style={{ backgroundColor: theme.primary }}
                title="Edit student details & customize theme"
              >
                <Settings size={13} />
                <span>Customize</span>
              </button>
            )}

            {!isStandalone && (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer shadow-2xs"
                title="Print or Save Portfolio as PDF"
              >
                <Printer size={15} />
              </button>
            )}

            {isStandalone && student.email && (
              <a
                href={`mailto:${student.email}`}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 sm:py-2 text-xs font-bold text-slate-950 rounded-lg transition-colors shadow-xs cursor-pointer"
                style={{ backgroundColor: theme.primary }}
              >
                <Mail size={13} />
                <span>Get in Touch</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (DYNAMICALLY TIED TO SELECTED THEME PALETTE & CUSTOM COLOR) */}
      <section className={`text-white border-b border-slate-800 relative overflow-hidden py-10 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br ${
        theme.heroGradient || "from-slate-950 via-slate-900 to-slate-950"
      }`}>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        {/* Dynamic theme ambient glow orbs */}
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15"
          style={{ backgroundColor: theme.primary }}
        />
        <div
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: theme.primary }}
        />

        <div className="relative w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[clamp(1.5rem,3.5vw,3.5rem)]">
            {/* Left Content Column (Proportional ~62% on Desktop) */}
            <div className="w-full lg:w-[calc(62%-clamp(1rem,2vw,1.75rem))] flex-1 min-w-0 space-y-6">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium border"
                  style={{
                    backgroundColor: `${theme.primary}18`,
                    color: theme.primary,
                    borderColor: `${theme.primary}45`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>Open to Full-Time & Client Contracts</span>
                </span>
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Award size={14} style={{ color: theme.primary }} />
                  <span>Academy Graduate Cohort 2026</span>
                </span>
              </div>

              {/* Student Name & Titles (CLICK-TO-EDIT DIRECTLY) */}
              <div>
                <EditableText
                  tag="h1"
                  value={student.name}
                  onChange={(val) => handleUpdateStudentField("name", val)}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight break-words block"
                />
                <EditableText
                  tag="p"
                  value={student.headline}
                  onChange={(val) => handleUpdateStudentField("headline", val)}
                  className="mt-1.5 sm:mt-2 text-lg sm:text-xl md:text-2xl font-bold leading-snug transition-colors break-words block"
                  style={{ color: theme.primary }}
                />
                <EditableText
                  tag="p"
                  value={student.subheadline}
                  onChange={(val) => handleUpdateStudentField("subheadline", val)}
                  className="mt-1 text-sm sm:text-base text-slate-300 font-normal block"
                />
              </div>

              {/* Bio Paragraph (CLICK-TO-EDIT) */}
              <EditableText
                tag="p"
                value={student.bio}
                onChange={(val) => handleUpdateStudentField("bio", val)}
                className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light block"
              />

              {/* Contact Meta Row (CLICK-TO-EDIT) */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <Mail size={14} style={{ color: theme.primary }} className="shrink-0" />
                  <EditableText
                    value={student.email}
                    onChange={(val) => handleUpdateStudentField("email", val)}
                    className="hover:text-white transition-colors"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={14} style={{ color: theme.primary }} className="shrink-0" />
                  <EditableText
                    value={student.phone}
                    onChange={(val) => handleUpdateStudentField("phone", val)}
                    className="hover:text-white transition-colors"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} style={{ color: theme.primary }} className="shrink-0" />
                  <EditableText
                    value={student.location}
                    onChange={(val) => handleUpdateStudentField("location", val)}
                    className="hover:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Verified Social & Portfolio Profiles */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Verified Social & Portfolio Profiles
                  </div>
                  {isEditable && (
                    <button
                      type="button"
                      onClick={handleAddSocial}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Add another social or portfolio link"
                    >
                      <Plus size={12} />
                      <span>Add Profile</span>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(student.socials || []).map((social, sIdx) => (
                    <div
                      key={sIdx}
                      className="group/soc relative inline-flex items-center gap-1.5 pl-3 pr-2 py-1 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/80 transition-all duration-200 shadow-xs"
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-white"
                        title={social.url}
                      >
                        {renderSocialIcon(social.platform)}
                      </a>
                      <EditableText
                        value={social.label}
                        onChange={(val) => handleUpdateSocial(sIdx, "label", val)}
                        className="font-semibold text-xs"
                      />
                      {isEditable && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteSocial(sIdx);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                          title={`Delete ${social.label || "link"}`}
                        >
                          <Trash2 size={11} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => scrollToSection(navItems[0]?.id || "wordpress")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  style={{ backgroundColor: theme.primary }}
                >
                  <TrendingUp size={16} />
                  <span>Explore Projects ({navItems.length} Modules)</span>
                </button>

                {!isStandalone && (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Printer size={16} style={{ color: theme.primary }} />
                    <span>Save / Print Portfolio</span>
                  </button>
                )}

                {isStandalone && student.email && (
                  <a
                    href={`mailto:${student.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                  >
                    <Mail size={16} style={{ color: theme.primary }} />
                    <span>Connect Directly</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Avatar Column (Proportional ~38% on Desktop, calc-width & clamped aspect ratio) */}
            <div className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none lg:w-[calc(38%-clamp(1rem,2vw,1.75rem))] shrink-0 flex flex-col items-center lg:items-end">
              <div className="relative w-full">
                {/* Luminous Glow Ring */}
                <div
                  className="absolute -inset-2.5 rounded-2xl opacity-70 blur-xs transition-colors"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, #3b82f6, #6366f1)`,
                  }}
                />

                {/* Main Card Body */}
                <div className="relative bg-slate-900 rounded-2xl p-2 border border-slate-700/80 shadow-2xl overflow-hidden group">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[4/5] max-h-[460px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-102"
                    />

                    {/* Change Photo Hover Overlay Button */}
                    {isEditable && (
                      <button
                        type="button"
                        onClick={() =>
                          openImageModal(
                            "Update Profile Photo",
                            student.avatarUrl,
                            true,
                            (newUrl) => handleUpdateStudentField("avatarUrl", newUrl)
                          )
                        }
                        className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-1.5 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-full bg-blue-600 text-white shadow-lg">
                          <Camera size={18} />
                        </div>
                        <span className="text-xs font-bold tracking-wide">Change Photo</span>
                        <span className="text-[10px] text-slate-300">Click to upload or pick avatar</span>
                      </button>
                    )}
                  </div>

                  {/* Floating Glass Bottom Bar Over Photo */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${theme.primary}25`,
                          borderColor: `${theme.primary}60`,
                        }}
                      >
                        <CheckCircle2 size={16} style={{ color: theme.primary }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Full-Stack Certified</div>
                        <div className="text-[11px] text-slate-400">Meta · Google · HubSpot · Shopify</div>
                      </div>
                    </div>
                    {isEditable && onOpenCustomizer && (
                      <button
                        type="button"
                        onClick={onOpenCustomizer}
                        className="text-[11px] font-semibold underline underline-offset-2 cursor-pointer transition-colors"
                        style={{ color: theme.primary }}
                      >
                        Edit Info
                      </button>
                    )}
                  </div>
                </div>

                {/* Trainer Verification Pill Bar Under Card */}
                <div className="mt-4 bg-slate-800/70 border border-slate-700/60 rounded-xl p-3.5 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Portfolio Verified by Trainer</span>
                  </div>
                  <span
                    className="font-mono font-bold transition-colors"
                    style={{ color: theme.primary }}
                  >
                    100% Practical Coursework
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stat Highlights Grid (CLICK-TO-EDIT NUMBERS & LABELS) */}
          <div className="mt-8 sm:mt-12 lg:mt-14 pt-6 sm:pt-8 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Key Performance Highlights & Verified Metrics
              </div>
              {isEditable && (
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Add another highlight metric card"
                >
                  <Plus size={12} />
                  <span>Add Stat Card</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[clamp(0.75rem,1.5vw,1.25rem)] w-full">
              {(student.highlights || []).map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/70 rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 group relative"
                >
                  {isEditable && (student.highlights || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteHighlight(sIdx)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-700/60 opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                      title="Delete this stat card"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                  <EditableText
                    value={stat.label}
                    onChange={(val) => handleUpdateHighlight(sIdx, "label", val)}
                    className="text-xs text-slate-400 font-medium mb-1 block"
                  />
                  <EditableText
                    value={stat.value}
                    onChange={(val) => handleUpdateHighlight(sIdx, "value", val)}
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono transition-colors block"
                    style={{ color: theme.primary }}
                  />
                  <EditableText
                    value={stat.detail}
                    onChange={(val) => handleUpdateHighlight(sIdx, "detail", val)}
                    className="text-xs text-slate-400 mt-1 line-clamp-1 block"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY 13-MODULE NAVIGATION SLIDER (CUSTOM SHUFFLED SEQUENCE & FULL-BLEED) */}
      <nav
        id="portfolio-module-slider-nav"
        className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md transition-all"
      >
        <div className="w-full px-1.5 sm:px-3 lg:px-6 flex items-center space-x-1 sm:space-x-2">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            aria-label="Scroll modules left"
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer transition-colors shadow-2xs border border-slate-200"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Module Tabs Slider (Custom Shuffled Sequence) */}
          <div
            id="portfolio-module-slider"
            className="flex items-center space-x-2 sm:space-x-2.5 py-2.5 sm:py-3 overflow-x-auto scroll-smooth no-scrollbar w-full flex-1 touch-pan-x"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 sm:space-x-2 transition-all cursor-pointer shrink-0 shadow-2xs ${
                    isActive
                      ? "text-white shadow-sm ring-2 ring-white/20"
                      : "text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/90 border border-slate-200/60"
                  }`}
                  style={isActive ? { backgroundColor: theme.primary } : {}}
                >
                  <Icon size={13} className="shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollSlider("right")}
            aria-label="Scroll modules right"
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer transition-colors shadow-2xs border border-slate-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* 4. MAIN ALL 13 MODULES CONTENT SHOWCASE (RENDERED IN CUSTOM SHUFFLE SEQUENCE) */}
      <main className="w-full">
        {moduleOrder
          .filter((modId) => moduleVisibility[modId] !== false)
          .map((modId, modIndex) => {
            const isEven = modIndex % 2 === 0;
            const bgClass = isEven
              ? "bg-slate-100/90 border-b border-slate-200/90"
              : "bg-slate-50/70 border-b border-slate-200/40";

          // MODULE 01: WORDPRESS
          if (modId === "wordpress") {
            const wpProjects = Array.isArray(modules.wordpress) ? modules.wordpress : [];
            return (
              <section
                key={modId}
                id="wordpress"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 01 · Full-Stack CMS
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        WordPress Web Design & Development
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        Custom-built corporate and e-commerce websites focused on high conversion rates, sub-second loading speeds, and responsive mobile architecture.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-slate-700">Elementor Pro · WooCommerce · Core Web Vitals Tested</span>
                    </div>
                  </div>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-[repeat(2,minmax(0,1fr))] gap-[clamp(1.25rem,2.5vw,2rem)]">
                    {wpProjects.map((proj, pIdx) => {
                      const domainName = proj.title?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "sample";
                      return (
                        <div
                          key={proj.id || pIdx}
                          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group relative"
                        >
                          {/* Mac Chrome Header */}
                          <div className="bg-slate-900 text-slate-300 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                              </div>
                              <div className="ml-2 sm:ml-3 flex items-center gap-1 bg-slate-800/90 text-[11px] font-mono text-slate-400 px-3 py-1 rounded-md border border-slate-700/60 max-w-[200px] sm:max-w-xs truncate">
                                <span className="text-emerald-400">https://</span>
                                <span className="truncate">{domainName}.demo</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {isEditable && wpProjects.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteWordPress(pIdx)}
                                  className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                  title="Delete this project build"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                              <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                                <Zap className="w-3 h-3 text-amber-400" />
                                <span>Speed {proj.speedScore || 96}/100</span>
                              </div>
                              <div className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 text-[11px] font-mono px-2 py-0.5 rounded">
                                <Smartphone className="w-3 h-3 text-blue-400" />
                                <span>100% Mobile</span>
                              </div>
                            </div>
                          </div>

                          {/* Laptop Mockup Image */}
                          <div className="relative bg-slate-950 aspect-[16/10] w-full max-h-[380px] overflow-hidden group/img">
                            <img
                              src={proj.imageUrl || mockupLaptopImg}
                              alt={proj.title}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                            />
                            {/* Hover View Screenshot Overlay */}
                            <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (isEditable) {
                                    openImageModal(
                                      `Update WordPress Screenshot: ${proj.title}`,
                                      proj.imageUrl || mockupLaptopImg,
                                      false,
                                      (newUrl) => {
                                        if (onChange) {
                                          const updated = [...wpProjects];
                                          updated[pIdx] = { ...updated[pIdx], imageUrl: newUrl };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, wordpress: updated },
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    window.open(proj.imageUrl || mockupLaptopImg, "_blank");
                                  }
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-100 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                                <span>{isEditable ? "Change / View Screenshot" : "View Fullscreen"}</span>
                              </button>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                              <EditableText
                                value={proj.clientType}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...wpProjects];
                                    updated[pIdx] = { ...updated[pIdx], clientType: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, wordpress: updated },
                                    });
                                  }
                                }}
                                className="text-xs font-bold text-amber-600 uppercase tracking-wider block"
                              />
                              <EditableText
                                tag="h3"
                                value={proj.title}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...wpProjects];
                                    updated[pIdx] = { ...updated[pIdx], title: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, wordpress: updated },
                                    });
                                  }
                                }}
                                className="text-xl font-bold text-slate-900 mt-1 block"
                              />
                              <EditableText
                                tag="p"
                                value={proj.description}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...wpProjects];
                                    updated[pIdx] = { ...updated[pIdx], description: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, wordpress: updated },
                                    });
                                  }
                                }}
                                className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed block"
                              />
                            </div>

                            {/* Core Technical Implementations */}
                            <div className="space-y-2 pt-3 border-t border-slate-100">
                              <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                                Core Technical Implementations:
                              </div>
                              <div className="space-y-1.5">
                                {(proj.keyFeatures || []).map((feat, fIdx) => (
                                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                    <EditableText
                                      value={feat}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...wpProjects];
                                          const feats = [...(updated[pIdx].keyFeatures || [])];
                                          feats[fIdx] = val;
                                          updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, wordpress: updated },
                                          });
                                        }
                                      }}
                                      className="flex-1"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Footer tech tags & inspect link */}
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex flex-wrap gap-1.5">
                                {(proj.techStack || []).map((tech, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <a
                                href={proj.liveUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors ml-auto"
                              >
                                <span>Inspect Design</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 02: CANVA
          if (modId === "canva") {
            const canvaDesigns = Array.isArray(modules.canva?.designs)
              ? modules.canva.designs
              : Array.isArray(modules.canva)
              ? modules.canva
              : [];
            const canvaVideos = Array.isArray(modules.canva?.videos)
              ? modules.canva.videos
              : [];
            const totalAssets = canvaDesigns.length + canvaVideos.length;

            return (
              <section
                key={modId}
                id="canva"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 02 · Visual Branding & Motion
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Canva Graphic Design & Short-Form Video Creatives
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        High-retention social media carousels, performance ad banners, infographic frameworks, and kinetic motion reels engineered for thumb-stopping engagement.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start md:self-auto border border-slate-200 shrink-0">
                      <button
                        type="button"
                        onClick={() => setCanvaFilter("all")}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          canvaFilter === "all"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        All Assets ({totalAssets})
                      </button>
                      <button
                        type="button"
                        onClick={() => setCanvaFilter("designs")}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          canvaFilter === "designs"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Graphic Designs ({canvaDesigns.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setCanvaFilter("videos")}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          canvaFilter === "videos"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Video Reels ({canvaVideos.length})
                      </button>
                    </div>
                  </div>

                  {/* 4 Graphic Design Showcases */}
                  {(canvaFilter === "all" || canvaFilter === "designs") && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-amber-500" />
                        <h3 className="text-lg font-bold text-slate-900">
                          Graphic Design Assets & Carousels
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">
                          ({canvaDesigns.length} showcases)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,1.5vw,1.5rem)]">
                        {canvaDesigns.map((design, dIdx) => (
                          <div
                            key={design.id || dIdx}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group relative"
                          >
                            {/* Delete Design Button */}
                            {isEditable && canvaDesigns.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteCanvaDesign(dIdx)}
                                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white shadow-xs opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20"
                                title="Delete this graphic design showcase"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                            <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden group/img">
                              <img
                                src={design.imageUrl || mockupCreativesImg}
                                alt={design.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                                {design.category || "Design"}
                              </div>
                              {/* Change Screenshot Overlay */}
                              {isEditable && (
                                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openImageModal(
                                        `Update Canva Design: ${design.title}`,
                                        design.imageUrl || mockupCreativesImg,
                                        false,
                                        (newUrl) => {
                                          if (onChange) {
                                            const updatedDesigns = [...canvaDesigns];
                                            updatedDesigns[dIdx] = { ...updatedDesigns[dIdx], imageUrl: newUrl };
                                            onChange({
                                              ...portfolioData,
                                              modules: {
                                                ...modules,
                                                canva: {
                                                  ...modules.canva,
                                                  designs: updatedDesigns,
                                                },
                                              },
                                            });
                                          }
                                        }
                                      )
                                    }
                                    className="p-2 rounded-full bg-white text-blue-600 shadow-md hover:bg-slate-100 cursor-pointer"
                                    title="Change Design Image"
                                  >
                                    <Camera className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="text-[11px] font-mono text-slate-400 font-semibold">
                                  {design.dimensions}
                                </div>
                                <EditableText
                                  tag="h4"
                                  value={design.title}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updatedDesigns = [...canvaDesigns];
                                      updatedDesigns[dIdx] = { ...updatedDesigns[dIdx], title: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          canva: { ...modules.canva, designs: updatedDesigns },
                                        },
                                      });
                                    }
                                  }}
                                  className="text-sm font-bold text-slate-900 mt-1 line-clamp-2 block"
                                />
                                <EditableText
                                  tag="p"
                                  value={design.description}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updatedDesigns = [...canvaDesigns];
                                      updatedDesigns[dIdx] = { ...updatedDesigns[dIdx], description: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          canva: { ...modules.canva, designs: updatedDesigns },
                                        },
                                      });
                                    }
                                  }}
                                  className="text-xs text-slate-600 mt-2 line-clamp-3 block"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  if (isEditable) {
                                    openImageModal(
                                      `View / Edit Canva Design: ${design.title}`,
                                      design.imageUrl || mockupCreativesImg,
                                      false,
                                      (newUrl) => {
                                        if (onChange) {
                                          const updatedDesigns = [...canvaDesigns];
                                          updatedDesigns[dIdx] = { ...updatedDesigns[dIdx], imageUrl: newUrl };
                                          onChange({
                                            ...portfolioData,
                                            modules: {
                                              ...modules,
                                              canva: { ...modules.canva, designs: updatedDesigns },
                                            },
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    window.open(design.imageUrl || mockupCreativesImg, "_blank");
                                  }
                                }}
                                className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start cursor-pointer"
                              >
                                <span>{isEditable ? "Expand / Edit Design" : "Expand Design"}</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2 Motion & Short-Form Video Ads */}
                  {(canvaFilter === "all" || canvaFilter === "videos") && (
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-blue-600" />
                        <h3 className="text-lg font-bold text-slate-900">
                          Motion & Short-Form Video Ads
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">
                          ({canvaVideos.length} videos)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-[repeat(2,minmax(0,1fr))] gap-[clamp(1.25rem,2.5vw,2rem)]">
                        {canvaVideos.map((video, vIdx) => (
                          <div
                            key={video.id || vIdx}
                            className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row w-full group"
                          >
                            {/* Left Thumbnail with fixed mathematical clamp width */}
                            <div className="relative w-full md:w-[clamp(200px,36%,280px)] aspect-[16/10] md:aspect-[9/13] shrink-0 bg-black overflow-hidden group/thumb">
                              <img
                                src={video.thumbnailUrl || mockupCreativesImg}
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                                </div>
                              </div>
                              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] bg-slate-900/90 text-amber-400 px-2 py-0.5 rounded font-mono">
                                <Clock className="w-3 h-3" />
                                <span>{video.duration || "0:30"}</span>
                              </div>
                            </div>

                            {/* Right Details */}
                            <div className="w-full md:w-[calc(100%-clamp(200px,36%,280px))] p-[clamp(1rem,2vw,1.5rem)] flex flex-col justify-between space-y-3 min-w-0">
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold">
                                    {video.format}
                                  </span>
                                  {isEditable && canvaVideos.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCanvaVideo(vIdx)}
                                      className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                                      title="Delete this video reel"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  )}
                                </div>
                                <EditableText
                                  tag="h4"
                                  value={video.title}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updatedVideos = [...canvaVideos];
                                      updatedVideos[vIdx] = { ...updatedVideos[vIdx], title: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          canva: { ...modules.canva, videos: updatedVideos },
                                        },
                                      });
                                    }
                                  }}
                                  className="text-base font-bold text-white mt-1 block"
                                />
                                <EditableText
                                  tag="p"
                                  value={video.description}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updatedVideos = [...canvaVideos];
                                      updatedVideos[vIdx] = { ...updatedVideos[vIdx], description: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          canva: { ...modules.canva, videos: updatedVideos },
                                        },
                                      });
                                    }
                                  }}
                                  className="text-xs text-slate-300 mt-2 leading-relaxed block"
                                />
                              </div>

                              {/* Hook Box */}
                              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
                                <div className="text-[10px] uppercase font-bold text-amber-400">
                                  Opening Hook Strategy:
                                </div>
                                <EditableText
                                  value={video.hook}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updatedVideos = [...canvaVideos];
                                      updatedVideos[vIdx] = { ...updatedVideos[vIdx], hook: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          canva: { ...modules.canva, videos: updatedVideos },
                                        },
                                      });
                                    }
                                  }}
                                  className="text-slate-200 mt-0.5 italic block"
                                />
                              </div>

                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openImageModal(
                                      `Change Video Thumbnail: ${video.title}`,
                                      video.thumbnailUrl || mockupCreativesImg,
                                      false,
                                      (newUrl) => {
                                        if (onChange) {
                                          const updatedVideos = [...canvaVideos];
                                          updatedVideos[vIdx] = { ...updatedVideos[vIdx], thumbnailUrl: newUrl };
                                          onChange({
                                            ...portfolioData,
                                            modules: {
                                              ...modules,
                                              canva: { ...modules.canva, videos: updatedVideos },
                                            },
                                          });
                                        }
                                      }
                                    )
                                  }
                                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start cursor-pointer"
                                >
                                  <Camera className="w-3 h-3" />
                                  <span>Change Thumbnail</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          }

          // MODULE 03: SOCIAL ORGANIC (SMO)
          if (modId === "socialOrganic") {
            const smoProfiles = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
            return (
              <section
                key={modId}
                id="socialOrganic"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 03 · Organic Growth Engineering
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Social Media Organic (SMO) Profile Optimization
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        Auditing, restructuring, and scaling organic social presence through strategic bio copywriting, content pillars, aesthetic grid curation, and high-retention community triggers.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs shrink-0">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-slate-700">Zero Ad Spend · Pure Organic Inbound Funnels</span>
                    </div>
                  </div>

                  {/* 2 Profile Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {smoProfiles.map((profile, pIdx) => (
                      <div
                        key={profile.id || pIdx}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                      >
                        {/* Header Navy Banner */}
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500 text-amber-400 flex items-center justify-center shrink-0">
                              {profile.platform?.toLowerCase() === "linkedin" ? (
                                <Linkedin className="w-5 h-5 text-blue-400" />
                              ) : (
                                <Instagram className="w-5 h-5 text-pink-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                                <EditableText
                                  value={profile.handle}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...smoProfiles];
                                      updated[pIdx] = { ...updated[pIdx], handle: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: { ...modules, socialOrganic: updated },
                                      });
                                    }
                                  }}
                                />
                                <span className="text-xs text-amber-400 font-normal">
                                  ({profile.platform})
                                </span>
                              </h3>
                              <EditableText
                                value={profile.niche}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], niche: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, socialOrganic: updated },
                                    });
                                  }
                                }}
                                className="text-xs text-slate-400 block"
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <EditableText
                              value={profile.growthRate}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...smoProfiles];
                                  updated[pIdx] = { ...updated[pIdx], growthRate: val };
                                  onChange({
                                    ...portfolioData,
                                    modules: { ...modules, socialOrganic: updated },
                                  });
                                }
                              }}
                              className="text-xs text-emerald-400 font-bold font-mono block"
                            />
                            <div className="text-[11px] text-slate-400">Verified Analytics</div>
                          </div>
                        </div>

                        {/* Baseline vs Post-Optimization Stats */}
                        <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 divide-x divide-slate-200">
                          <div className="p-3.5 text-center">
                            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                              Starting Baseline
                            </div>
                            <EditableText
                              value={profile.beforeFollowers}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...smoProfiles];
                                  updated[pIdx] = { ...updated[pIdx], beforeFollowers: val };
                                  onChange({
                                    ...portfolioData,
                                    modules: { ...modules, socialOrganic: updated },
                                  });
                                }
                              }}
                              className="text-sm sm:text-base font-mono font-bold text-slate-600 mt-0.5 block"
                            />
                          </div>
                          <div className="p-3.5 text-center bg-blue-50/50">
                            <div className="text-[11px] uppercase tracking-wider text-blue-700 font-semibold">
                              Post-Optimization
                            </div>
                            <EditableText
                              value={profile.afterFollowers}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...smoProfiles];
                                  updated[pIdx] = { ...updated[pIdx], afterFollowers: val };
                                  onChange({
                                    ...portfolioData,
                                    modules: { ...modules, socialOrganic: updated },
                                  });
                                }
                              }}
                              className="text-sm sm:text-base font-mono font-bold text-blue-700 mt-0.5 block"
                            />
                          </div>
                        </div>

                        {/* Grid Screenshot Preview */}
                        <div className="relative bg-slate-950 aspect-[16/9] w-full max-h-[300px] overflow-hidden group/img">
                          <img
                            src={profile.screenshotUrl || mockupCreativesImg}
                            alt={profile.handle}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                if (isEditable) {
                                  openImageModal(
                                    `Update SMO Profile Screenshot: ${profile.handle}`,
                                    profile.screenshotUrl || mockupCreativesImg,
                                    false,
                                    (newUrl) => {
                                      if (onChange) {
                                        const updated = [...smoProfiles];
                                        updated[pIdx] = { ...updated[pIdx], screenshotUrl: newUrl };
                                        onChange({
                                          ...portfolioData,
                                          modules: { ...modules, socialOrganic: updated },
                                        });
                                      }
                                    }
                                  );
                                } else {
                                  window.open(profile.screenshotUrl || mockupCreativesImg, "_blank");
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-100 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>{isEditable ? "Change / Inspect Screenshot" : "Inspect Profile Grid Screenshot"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Bio & CTA Framework Box */}
                            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                                Optimized Bio & CTA Framework:
                              </div>
                              <EditableText
                                value={profile.bioStrategy}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], bioStrategy: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, socialOrganic: updated },
                                    });
                                  }
                                }}
                                className="text-xs text-slate-700 mt-1 italic block leading-relaxed"
                              />
                            </div>

                            {/* Content Pillars */}
                            <div className="mt-4 space-y-1.5">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Engineered Content Pillars:
                              </div>
                              <div className="space-y-1.5">
                                {(profile.contentPillars || []).map((pillar, cIdx) => (
                                  <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-700">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <EditableText
                                      value={pillar}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...smoProfiles];
                                          const pillars = [...(updated[pIdx].contentPillars || [])];
                                          pillars[cIdx] = val;
                                          updated[pIdx] = { ...updated[pIdx], contentPillars: pillars };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, socialOrganic: updated },
                                          });
                                        }
                                      }}
                                      className="flex-1"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Student Campaign Impact */}
                          <div className="pt-3 border-t border-slate-100">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Student Campaign Impact:
                            </div>
                            <EditableText
                              tag="p"
                              value={profile.resultsSummary}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...smoProfiles];
                                  updated[pIdx] = { ...updated[pIdx], resultsSummary: val };
                                  onChange({
                                    ...portfolioData,
                                    modules: { ...modules, socialOrganic: updated },
                                  });
                                }
                              }}
                              className="text-xs text-slate-600 leading-relaxed block"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 04: META ADS
          if (modId === "socialMarketing") {
            const metaAds = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
            return (
              <section
                key={modId}
                id="socialMarketing"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 04 · Paid Social Advertising
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Social Media Marketing (Meta & Paid Ads Accordions)
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        Performance advertising campaigns deployed across Meta Ads Manager (Advantage+ Shopping, Lead Gen, and Dynamic Retargeting). Click each accordion to review ad screenshots, targeting, and summary teardowns.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs shrink-0">
                      <span className="text-amber-500">👉</span>
                      <span className="font-semibold text-slate-700">Interactive Accordion Structure</span>
                    </div>
                  </div>

                  {/* Accordions */}
                  <div className="space-y-4">
                    {metaAds.map((ad, idx) => {
                      const isOpen = openMetaIdx === idx;
                      return (
                        <div
                          key={ad.id || idx}
                          className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "border-blue-400/80 shadow-md bg-white"
                              : "border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          {/* Accordion Bar */}
                          <button
                            type="button"
                            onClick={() => setOpenMetaIdx(isOpen ? -1 : idx)}
                            aria-expanded={isOpen}
                            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 select-none focus:outline-hidden cursor-pointer"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                              <div className="w-8 h-8 rounded-lg bg-blue-600 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                                #{idx + 1}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                                    {ad.campaignType}
                                  </span>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-xs text-slate-500 font-medium">
                                    {ad.objective}
                                  </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                                  {ad.title}
                                </h3>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="hidden md:inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                {ad.metrics?.roasOrCpa}
                              </span>
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                                  isOpen ? "bg-blue-600 text-white rotate-180" : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                          </button>

                          {/* Expanded Content */}
                          {isOpen && (
                            <div className="border-t border-slate-200 bg-white p-[clamp(1rem,2vw,1.5rem)] flex flex-col lg:flex-row gap-[clamp(1.25rem,2.5vw,2rem)] items-start">
                              {/* Left Column: Creative Mockup with Clamped Proportional Width */}
                              <div className="w-full lg:w-[clamp(300px,40%,440px)] shrink-0 space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Ad Creative & Placement Screenshot:
                                </div>
                                <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-xs group/ad">
                                  <img
                                    src={ad.screenshotUrl || mockupCreativesImg}
                                    alt={ad.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                  />
                                  {isEditable && (
                                    <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover/ad:opacity-100 transition-opacity flex items-center justify-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          openImageModal(
                                            `Change Meta Ad Creative: ${ad.title}`,
                                            ad.screenshotUrl || mockupCreativesImg,
                                            false,
                                            (newUrl) => {
                                              if (onChange) {
                                                const updated = [...metaAds];
                                                updated[idx] = { ...updated[idx], screenshotUrl: newUrl };
                                                onChange({
                                                  ...portfolioData,
                                                  modules: { ...modules, socialMarketing: updated },
                                                });
                                              }
                                            }
                                          )
                                        }
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-100 cursor-pointer"
                                      >
                                        <Camera className="w-3.5 h-3.5 text-blue-600" />
                                        <span>Change Ad Screenshot</span>
                                      </button>
                                    </div>
                                  )}
                                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                                    Meta Ads Manager Verified
                                  </div>
                                </div>
                                <div className="text-[11px] text-slate-500 text-center italic">
                                  Screenshot of live ad creative tested across Instagram Stories & Facebook Feed.
                                </div>
                              </div>

                              {/* Right Column: Details & KPIs */}
                              <div className="w-full lg:w-[calc(100%-clamp(300px,40%,440px)-clamp(1.25rem,2.5vw,2rem))] flex-1 min-w-0 space-y-5">
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                                    Student Ad Campaign Summary:
                                  </div>
                                  <EditableText
                                    tag="p"
                                    value={ad.summary}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...metaAds];
                                        updated[idx] = { ...updated[idx], summary: val };
                                        onChange({
                                          ...portfolioData,
                                          modules: { ...modules, socialMarketing: updated },
                                        });
                                      }
                                    }}
                                    className="text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200/80 block"
                                  />
                                </div>

                                {/* Targeting & Budget */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                                      <Target className="w-3.5 h-3.5 text-blue-600" />
                                      <span>Audience & Targeting:</span>
                                    </div>
                                    <EditableText
                                      value={ad.audienceTargeting}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...metaAds];
                                          updated[idx] = { ...updated[idx], audienceTargeting: val };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, socialMarketing: updated },
                                          });
                                        }
                                      }}
                                      className="text-slate-600 text-[11px] leading-relaxed block"
                                    />
                                  </div>

                                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Budget & Flight:</span>
                                    </div>
                                    <EditableText
                                      value={ad.budgetSpend}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...metaAds];
                                          updated[idx] = { ...updated[idx], budgetSpend: val };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, socialMarketing: updated },
                                          });
                                        }
                                      }}
                                      className="text-slate-600 text-[11px] leading-relaxed block"
                                    />
                                  </div>
                                </div>

                                {/* KPI Grid */}
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                                    <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Key Performance Indicators (KPIs):</span>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-slate-500">
                                        Outbound CTR
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.ctr}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, ctr: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-sm font-mono font-bold text-blue-700 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-slate-500">
                                        Average CPC
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.cpc}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, cpc: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-sm font-mono font-bold text-slate-800 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-amber-800">
                                        ROAS / CPA
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.roasOrCpa}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, roasOrCpa: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-sm font-mono font-bold text-amber-900 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-slate-500">
                                        Total Conv.
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.conversions}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, conversions: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-sm font-mono font-bold text-emerald-700 mt-0.5 block"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 05: GOOGLE ADS
          if (modId === "googleAds") {
            const gAds = Array.isArray(modules.googleAds) ? modules.googleAds : [];
            return (
              <section
                key={modId}
                id="googleAds"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 05 · Search Engine & Intent Advertising
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Google Ads Campaigns & Search Architecture
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        High-intent Google Search, Performance Max, and YouTube video ad campaigns configured with tight STAG ad groups, negative keyword exclusions, and automated bidding strategies.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs shrink-0">
                      <span className="text-amber-500">👉</span>
                      <span className="font-semibold text-slate-700">Ad Copy Variations · Quality Scores 9/10</span>
                    </div>
                  </div>

                  {/* Accordions */}
                  <div className="space-y-4">
                    {gAds.map((gad, idx) => {
                      const isOpen = openGoogleIdx === idx;
                      return (
                        <div
                          key={gad.id || idx}
                          className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "border-blue-500/80 shadow-md bg-white"
                              : "border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          {/* Accordion Bar */}
                          <button
                            type="button"
                            onClick={() => setOpenGoogleIdx(isOpen ? -1 : idx)}
                            aria-expanded={isOpen}
                            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 select-none focus:outline-hidden cursor-pointer"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                              <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs border border-slate-700">
                                G{idx + 1}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                                    {gad.campaignType}
                                  </span>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-xs text-emerald-700 font-semibold">
                                    {gad.qualityScore}
                                  </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                                  {gad.campaignName || gad.title}
                                </h3>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="hidden md:inline-flex items-center gap-1 font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                                {gad.metrics?.roas}
                              </span>
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                                  isOpen ? "bg-blue-600 text-white rotate-180" : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                          </button>

                          {/* Expanded Content */}
                          {isOpen && (
                            <div className="border-t border-slate-200 bg-white p-[clamp(1rem,2vw,1.5rem)] flex flex-col lg:flex-row gap-[clamp(1.25rem,2.5vw,2rem)] items-start">
                              {/* Left Column: Mockup & Google Sponsored Search Box (Clamped Proportion) */}
                              <div className="w-full lg:w-[clamp(300px,40%,440px)] shrink-0 space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Ad Preview & Campaign Screenshot:
                                </div>
                                <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-xs group/ad">
                                  <img
                                    src={gad.screenshotUrl || mockupLaptopImg}
                                    alt={gad.campaignName || gad.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                  />
                                  {isEditable && (
                                    <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover/ad:opacity-100 transition-opacity flex items-center justify-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          openImageModal(
                                            `Change Google Ads Screenshot: ${gad.campaignName || gad.title}`,
                                            gad.screenshotUrl || mockupLaptopImg,
                                            false,
                                            (newUrl) => {
                                              if (onChange) {
                                                const updated = [...gAds];
                                                updated[idx] = { ...updated[idx], screenshotUrl: newUrl };
                                                onChange({
                                                  ...portfolioData,
                                                  modules: { ...modules, googleAds: updated },
                                                });
                                              }
                                            }
                                          )
                                        }
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-100 cursor-pointer"
                                      >
                                        <Camera className="w-3.5 h-3.5 text-blue-600" />
                                        <span>Change Screenshot</span>
                                      </button>
                                    </div>
                                  )}
                                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                                    Google Ads Verified
                                  </div>
                                </div>

                                {/* Realistic Google Search Sponsored Box */}
                                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                    <span className="font-bold text-slate-900">Sponsored</span>
                                    <span>·</span>
                                    <span className="font-mono">https://example.com/services</span>
                                  </div>
                                  <div className="text-sm font-semibold text-blue-800 hover:underline cursor-pointer">
                                    {gad.headlines?.[0] || gad.campaignName}
                                  </div>
                                  <p className="text-slate-600 text-[11px] leading-relaxed">
                                    {gad.descriptions?.[0] || gad.summary}
                                  </p>
                                </div>
                              </div>

                              {/* Right Column: Execution, RSA Copy, Keywords, Metrics */}
                              <div className="w-full lg:w-[calc(100%-clamp(300px,40%,440px)-clamp(1.25rem,2.5vw,2rem))] flex-1 min-w-0 space-y-5">
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                                    Student Campaign Execution & Strategy:
                                  </div>
                                  <EditableText
                                    tag="p"
                                    value={gad.summary}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...gAds];
                                        updated[idx] = { ...updated[idx], summary: val };
                                        onChange({
                                          ...portfolioData,
                                          modules: { ...modules, googleAds: updated },
                                        });
                                      }
                                    }}
                                    className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80 block"
                                  />
                                </div>

                                {/* Tested Responsive Search Ad (RSA) Copy */}
                                <div className="space-y-2">
                                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Tested Responsive Search Ad (RSA) Copy:
                                  </div>
                                  <div className="space-y-1.5">
                                    {(gad.headlines || []).map((headline, hIdx) => (
                                      <div
                                        key={hIdx}
                                        className="flex items-center gap-2 text-xs text-slate-800 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
                                      >
                                        <span className="text-[10px] font-mono font-bold text-blue-600 shrink-0">
                                          H{hIdx + 1}:
                                        </span>
                                        <EditableText
                                          value={headline}
                                          onChange={(val) => {
                                            if (onChange) {
                                              const updated = [...gAds];
                                              const heads = [...(updated[idx].headlines || [])];
                                              heads[hIdx] = val;
                                              updated[idx] = { ...updated[idx], headlines: heads };
                                              onChange({
                                                ...portfolioData,
                                                modules: { ...modules, googleAds: updated },
                                              });
                                            }
                                          }}
                                          className="flex-1"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Target Keywords & Match Types */}
                                <div className="space-y-1.5">
                                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                    <Search className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Target Keywords & Match Types:</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {(gad.targetKeywords || gad.topSearchTerms || []).map((kw, kIdx) => (
                                      <span
                                        key={kIdx}
                                        className="px-2 py-0.5 text-[11px] font-mono bg-blue-50 text-blue-800 rounded-md border border-blue-200"
                                      >
                                        {kw}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Verified Google Ads Metrics */}
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    Verified Google Ads Metrics:
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
                                      <div className="text-[10px] text-slate-500 font-medium">
                                        Impressions
                                      </div>
                                      <EditableText
                                        value={gad.metrics?.impressions}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...gAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, impressions: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, googleAds: updated },
                                            });
                                          }
                                        }}
                                        className="text-xs font-mono font-bold text-slate-800 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
                                      <div className="text-[10px] text-slate-500 font-medium">
                                        CTR
                                      </div>
                                      <EditableText
                                        value={gad.metrics?.ctr}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...gAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, ctr: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, googleAds: updated },
                                            });
                                          }
                                        }}
                                        className="text-xs font-mono font-bold text-blue-700 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
                                      <div className="text-[10px] text-slate-500 font-medium">
                                        Avg CPC
                                      </div>
                                      <EditableText
                                        value={gad.metrics?.avgCpc}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...gAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, avgCpc: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, googleAds: updated },
                                            });
                                          }
                                        }}
                                        className="text-xs font-mono font-bold text-slate-800 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
                                      <div className="text-[10px] text-slate-500 font-medium">
                                        Conversions
                                      </div>
                                      <EditableText
                                        value={gad.metrics?.conversions}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...gAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, conversions: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, googleAds: updated },
                                            });
                                          }
                                        }}
                                        className="text-xs font-mono font-bold text-emerald-700 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-amber-50 border border-amber-300 rounded-lg p-2 col-span-2 sm:col-span-1">
                                      <div className="text-[10px] text-amber-800 font-bold">
                                        ROAS
                                      </div>
                                      <EditableText
                                        value={gad.metrics?.roas}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...gAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, roas: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, googleAds: updated },
                                            });
                                          }
                                        }}
                                        className="text-xs font-mono font-bold text-amber-900 mt-0.5 block"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }
          
          // MODULE 06: SEO KEYWORD RESEARCH, SITE AUDIT & LOCAL SEO (GBP)
          if (modId === "seo") {
            const seoData = modules.seo || {};
            const defaultKeywords = [
              { keyword: "best organic skincare for sensitive skin", searchVolume: 18100, keywordDifficulty: 42, intent: "Commercial", cpc: "$2.80", targetPage: "/collections/sensitive-skin-barrier", priority: "High" },
              { keyword: "ceramide barrier cream review", searchVolume: 9900, keywordDifficulty: 38, intent: "Informational", cpc: "$1.40", targetPage: "/blog/ceramide-skin-barrier-restoration", priority: "High" },
              { keyword: "buy organic peptide serum online", searchVolume: 6400, keywordDifficulty: 51, intent: "Transactional", cpc: "$4.20", targetPage: "/products/tri-peptide-nourishing-serum", priority: "High" },
              { keyword: "how to repair damaged skin barrier naturally", searchVolume: 14200, keywordDifficulty: 29, intent: "Informational", cpc: "$0.95", targetPage: "/guides/repair-skin-barrier-in-7-days", priority: "Medium" },
              { keyword: "hypoallergenic morning routine steps", searchVolume: 4800, keywordDifficulty: 24, intent: "Informational", cpc: "$1.10", targetPage: "/blog/hypoallergenic-morning-routine", priority: "Medium" },
              { keyword: "vegan cold pressed facial oil discount", searchVolume: 3200, keywordDifficulty: 35, intent: "Transactional", cpc: "$3.50", targetPage: "/products/botanical-glow-elixir", priority: "Low" },
            ];
            const hasValidKeywords = Array.isArray(seoData.keywords) &&
              seoData.keywords.length > 0 &&
              Boolean(seoData.keywords[0].intent);
            const rawKeywords = hasValidKeywords ? seoData.keywords : defaultKeywords;
            const filteredKeywords = rawKeywords.filter((kw) => {
              const query = (seoSearchQuery || "").toLowerCase();
              const matchesQuery = !query || kw.keyword?.toLowerCase().includes(query) || kw.targetPage?.toLowerCase().includes(query);
              const matchesIntent = seoIntentFilter === "All" || (kw.intent || "").toLowerCase() === seoIntentFilter.toLowerCase();
              return matchesQuery && matchesIntent;
            });

            const auditCategories = Array.isArray(seoData.auditCategories) && seoData.auditCategories.length > 0
              ? seoData.auditCategories
              : [
                  {
                    category: "Technical Crawlability & Indexation",
                    score: 98,
                    findings: [
                      "Resolved 24 orphan URLs via updated XML sitemap and automated internal linking",
                      "Fixed 14 legacy 301 redirect chains to direct canonical destinations",
                      "Configured robots.txt directives to prevent indexing of internal search filter facets",
                    ],
                    actionTaken: "Submitted pristine dynamic sitemap index to Google Search Console; 100% of target pages indexed within 48 hours.",
                  },
                  {
                    category: "Core Web Vitals & Page Speed (LCP, INP, CLS)",
                    score: 95,
                    findings: [
                      "Largest Contentful Paint (LCP) reduced from 4.1s to 1.1s via WebP compression & AVIF next-gen formats",
                      "Cumulative Layout Shift (CLS) reduced from 0.28 to 0.01 by specifying image aspect ratios in CSS",
                      "Interaction to Next Paint (INP) clocked at 68ms (well within Google's <200ms good threshold)",
                    ],
                    actionTaken: "Deferred unneeded third-party tracking scripts, self-hosted web fonts, and leveraged Cloudflare Polish edge caching.",
                  },
                  {
                    category: "On-Page SEO & Structured Data",
                    score: 92,
                    findings: [
                      "Implemented JSON-LD Schema markup for Product, Review, FAQPage, and Organization",
                      "Rewrote meta titles & H1 hierarchy across 45 collection pages to include primary keyword triggers",
                      "Introduced automated descriptive alt text and internal breadcrumb navigation structure",
                    ],
                    actionTaken: "Achieved Google Rich Results approval with review star snippets displaying directly in SERPs.",
                  },
                ];

            const localSeo = seoData.localSeo || {
              businessName: "Aura Dental & Holistic Smile Studio",
              category: "Cosmetic Dentist & Dental Clinic",
              addressSnippet: "450 Sutter St Suite 1200, San Francisco, CA 94108",
              reviewsCount: 148,
              avgRating: 4.9,
              localKeywordsRanked: [
                "#1 for 'holistic cosmetic dentist san francisco'",
                "#2 for 'clear aligners financial district sf'",
                "#1 in Google 3-Pack Maps for 'emergency gentle dental clinic'",
              ],
              optimizationSteps: [
                "Claimed & 100% verified Google Business Profile with secondary categories (Teeth Whitening, Dental Hygienist)",
                "Uploaded 60+ geotagged high-resolution clinic and smiling staff photos with EXIF metadata",
                "Automated post-appointment SMS review generation workflow resulting in 42 new 5-star reviews in 60 days",
                "Standardized Name-Address-Phone (NAP) consistency across 35 top local citations (Yelp, Healthgrades, YellowPages)",
              ],
              sampleReview: {
                author: "Dr. Elena Vance, Tech Executive",
                rating: 5,
                text: "Found Aura Dental on Google Maps while looking for holistic biomimetic treatments. The staff was incredible, booking was seamless, and the clinic feels like a peaceful spa. Highly recommend!",
              },
            };

            return (
              <section
                key={modId}
                id="seo"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Header with 3-Option Switch Toggle */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 06 · Organic Search Engine Optimization
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        SEO Keyword Research, Site Audit & Local SEO (GBP)
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        A comprehensive three-tier SEO execution covering transactional keyword strategy, technical Core Web Vitals optimization, and Google Business Profile local 3-pack dominance.
                      </p>
                    </div>

                    {/* Switch Toggle Buttons */}
                    <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/90 shadow-2xs self-start md:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => setSeoActiveTab("keywords")}
                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          seoActiveTab === "keywords"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        }`}
                      >
                        1. Keyword Research Sheet
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoActiveTab("audit")}
                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          seoActiveTab === "audit"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        }`}
                      >
                        2. Technical SEO Audit
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoActiveTab("local")}
                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          seoActiveTab === "local"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        }`}
                      >
                        3. Local SEO & GBP Project
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: KEYWORD RESEARCH SHEET */}
                  {seoActiveTab === "keywords" && (
                    <div className="space-y-4 animate-in fade-in-50 duration-200">
                      {/* Search & Filter Bar */}
                      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
                          <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                          <input
                            type="text"
                            placeholder="Search keywords in research sheet..."
                            value={seoSearchQuery}
                            onChange={(e) => setSeoSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                          />
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                          <span className="text-xs text-slate-500 font-medium">Filter Intent:</span>
                          {["All", "Commercial", "Transactional", "Informational"].map((intent) => {
                            const isSelected = seoIntentFilter === intent;
                            return (
                              <button
                                key={intent}
                                type="button"
                                onClick={() => setSeoIntentFilter(intent)}
                                className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-slate-900 text-white shadow-2xs"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {intent}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Keywords Table */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                        <div className="overflow-x-auto custom-scrollbar">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-900 text-slate-200 border-b border-slate-800">
                                <th className="py-3 px-4 font-bold tracking-wide">Target Keyword</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-right">Volume / Mo</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-center">KD (Difficulty)</th>
                                <th className="py-3 px-4 font-bold tracking-wide">Search Intent</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-right">Est. CPC</th>
                                <th className="py-3 px-4 font-bold tracking-wide">Target Page Architecture</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-center">Priority</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {filteredKeywords.map((kw, idx) => {
                                const kd = kw.keywordDifficulty ?? 35;
                                const kdClass =
                                  kd < 30
                                    ? "bg-emerald-100 text-emerald-800"
                                    : kd < 45
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-800";
                                const priorityClass =
                                  kw.priority === "High"
                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                    : kw.priority === "Medium"
                                    ? "bg-slate-100 text-slate-700"
                                    : "bg-slate-100 text-slate-500";
                                return (
                                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-3 px-4 font-semibold text-slate-900">
                                      {kw.keyword}
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono text-slate-700 font-medium">
                                      {typeof kw.searchVolume === "number" ? kw.searchVolume.toLocaleString() : (kw.searchVolume || kw.volume || "-")}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold ${kdClass}`}>
                                        {kd}%
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <span className="text-slate-600 font-medium">
                                        {kw.intent || "Commercial"}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono text-slate-700 font-medium">
                                      {kw.cpc || "$2.50"}
                                    </td>
                                    <td className="py-3 px-4 font-mono text-[11px] text-blue-600 truncate max-w-xs">
                                      {kw.targetPage || kw.url || "/"}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${priorityClass}`}>
                                        {kw.priority || "High"}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Footer Information */}
                        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                          <span>
                            Showing {filteredKeywords.length} of {rawKeywords.length} mapped keywords from SEMrush / Ahrefs research dataset.
                          </span>
                          <span className="font-mono text-blue-600 font-bold">
                            Total monthly search potential: 56,600+ impressions
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: TECHNICAL SEO AUDIT */}
                  {seoActiveTab === "audit" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50 duration-200">
                      {auditCategories.map((cat, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                AUDIT CATEGORY {cIdx + 1}
                              </span>
                              <div className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded">
                                <span>Score:</span>
                                <span>{cat.score || 95}/100</span>
                              </div>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 mt-2">
                              {cat.category}
                            </h3>

                            <div className="mt-4 space-y-2">
                              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                AUDIT FINDINGS & RESOLVED ISSUES:
                              </div>
                              {(cat.findings || []).map((finding, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{finding}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-0.5">
                              ACTION TAKEN BY STUDENT:
                            </div>
                            <p className="text-xs text-slate-600 italic leading-relaxed">
                              "{cat.actionTaken}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 3: LOCAL SEO & GBP PROJECT */}
                  {seoActiveTab === "local" && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 animate-in fade-in-50 duration-200 shadow-xs">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Business Card & Mockup (5 cols) */}
                        <div className="lg:col-span-5 space-y-4">
                          <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 shadow-2xs">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                                <Store className="w-6 h-6 text-white" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-base font-bold text-slate-900 truncate">
                                  {localSeo.businessName}
                                </h4>
                                <p className="text-xs text-slate-500">
                                  {localSeo.category}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, sIdx) => (
                                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400" />
                                    ))}
                                  </div>
                                  <span className="text-xs font-bold text-slate-900">
                                    {localSeo.avgRating || 4.9}
                                  </span>
                                  <span className="text-xs text-slate-500 font-medium">
                                    ({localSeo.reviewsCount || 148} Google Reviews)
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs text-slate-600">
                              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="truncate">{localSeo.addressSnippet}</span>
                            </div>
                          </div>

                          {/* Laptop / Mockup Showcase Image */}
                          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[16/10] shadow-xs group">
                            <img
                              src={mockupLaptopImg}
                              alt="Local SEO Live Website Build"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                            />
                            <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                              Verified Google Maps Local 3-Pack
                            </div>
                          </div>
                        </div>

                        {/* Right Column: 3-Pack Rankings, Steps & Review (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                          {/* Google Maps 3-Pack Rankings Achieved */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                              GOOGLE MAPS 3-PACK RANKINGS ACHIEVED:
                            </div>
                            <div className="space-y-2">
                              {(localSeo.localKeywordsRanked || []).map((rankText, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="flex items-center gap-2 p-2.5 bg-emerald-50/70 border border-emerald-200/90 rounded-xl text-xs font-semibold text-emerald-900"
                                >
                                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{rankText}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Local SEO Implementation Steps */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                              LOCAL SEO IMPLEMENTATION STEPS:
                            </div>
                            <div className="space-y-2">
                              {(localSeo.optimizationSteps || []).map((step, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="flex items-start gap-2.5 p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl text-xs text-slate-700 font-medium"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Authentic Review Card */}
                          {localSeo.sampleReview && (
                            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5 shadow-2xs">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">
                                  {localSeo.sampleReview.author}
                                </span>
                                <div className="flex text-amber-400">
                                  {[...Array(localSeo.sampleReview.rating || 5)].map((_, sIdx) => (
                                    <Star key={sIdx} className="w-3 h-3 fill-amber-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-slate-700 italic leading-relaxed">
                                "{localSeo.sampleReview.text}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          }

          // MODULE 07: STRATEGIC GROWTH ARCHITECTURE - DIGITAL PLANNING & BRAND AUDIT
          if (modId === "digitalPlanning") {
            const planData = modules.digitalPlanning || {};
            const defaultDeck = [
              {
                slideNumber: 1,
                tag: "EXECUTIVE DELIVERABLE · CURRENT STATE VS MARKET LEADERS IN SUSTAINABLE ACTIVEWEAR",
                title: "Executive Brand Audit: Omni-Channel Gap Analysis",
                findings: [
                  "Brand had a 72% reliance on paid Meta prospecting with zero email retention lifecycle marketing",
                  "Organic brand search volume trailed competitors by 4.2x due to lack of PR and SEO authority content",
                  "Website bounce rate on mobile was 68% due to sluggish product page loading times",
                ],
                metricsTable: [
                  { metric: "Organic Traffic Share", auditState: "11%", benchmark: "38%" },
                  { metric: "Blended Customer Acquisition Cost", auditState: "$64", benchmark: "$39" },
                  { metric: "Email List Revenue Contribution", auditState: "6%", benchmark: "28%" },
                ],
              },
              {
                slideNumber: 2,
                tag: "EXECUTIVE DELIVERABLE · PERSONA: 'CONSCIOUS ACHIEVER CLARA' (AGE 28-42, HIGH HOUSEHOLD INCOME)",
                title: "Target Customer Persona & Mindset Mapping",
                findings: [
                  "Primary motivation: Technical performance without toxic synthetic petroleum dyes or microplastics",
                  "Main friction: Skeptical of greenwashing claims; needs transparent third-party laboratory certifications",
                  "Trigger moments: New fitness milestones, corporate marathon signups, weekend hiking expeditions",
                ],
                frameworkArchitecture: "Empathy map outlining Clara's daily routine, media consumption channels (Substack, podcasts, TikTok), and purchase objections.",
              },
              {
                slideNumber: 3,
                tag: "EXECUTIVE DELIVERABLE · INTEGRATING PAID DISCOVERY, ORGANIC COMMUNITY, AND AUTOMATED RETENTION",
                title: "360° Omnichannel Funnel Architecture",
                findings: [
                  "TOFU: Meta Broad Advantage+ Video hooks + TikTok UGC problem/solution demonstrations",
                  "MOFU: Google Search commercial intent keywords + Retargeting comparison landing pages",
                  "BOFU: Klaviyo 6-part automated welcome flow + SMS cart recovery offering VIP perks instead of deep discounts",
                ],
                frameworkArchitecture: "Funnel visual flow showing user progression from initial video impression down to post-purchase referral.",
              },
            ];

            const defaultRoadmap = [
              {
                weeks: "Weeks 1 - 4",
                allocation: "15% Allocation",
                phase: "Phase 1: Foundation & Infrastructure",
                channels: ["Technical SEO", "Analytics Setup", "Tracking Pixel CAPI"],
                deliverables: [
                  "Deploy Server-Side Meta CAPI & Google Tag Manager Enhanced Conversions",
                  "Perform comprehensive site speed optimization (sub-1.5s load times)",
                  "Build Klaviyo automated core email flows (Welcome, Cart, Post-Purchase)",
                ],
                milestone: "Milestone Review at 4",
              },
              {
                weeks: "Weeks 5 - 10",
                allocation: "60% Allocation",
                phase: "Phase 2: Acquisition & Paid Testing",
                channels: ["Meta Advantage+ CBO", "Google PMax & Search", "Micro-Influencer Seeding"],
                deliverables: [
                  "Test 20 creative iterations across 4 hook themes to find winning angles",
                  "Launch Exact Match Google Ads for high-intent category terms",
                  "Seed product with 30 micro-influencers for authentic testimonial UGC assets",
                ],
                milestone: "Milestone Review at 10",
              },
              {
                weeks: "Weeks 11 - 16",
                allocation: "25% Allocation",
                phase: "Phase 3: Scaling, CRO & Retention",
                channels: ["Full-Scale Performance Budget", "A/B Landing Page Testing", "Affiliate Program"],
                deliverables: [
                  "Scale winning Meta ad sets vertically and horizontally across lookalike pockets",
                  "Launch dedicated advertorial landing pages via Replo/Unbounce to boost conversion rates",
                  "Activate VIP loyalty tier and subscription re-order triggers",
                ],
                milestone: "Milestone Review at 16",
              },
            ];

            const hasValidDeck =
              Array.isArray(planData.brandAuditDeck) &&
              planData.brandAuditDeck.length > 0 &&
              Array.isArray(planData.brandAuditDeck[0].findings) &&
              planData.brandAuditDeck[0].findings.length > 0;
            const deck = hasValidDeck ? planData.brandAuditDeck : defaultDeck;

            const hasValidRoadmap =
              Array.isArray(planData.strategyRoadmap) &&
              planData.strategyRoadmap.length > 0 &&
              Array.isArray(planData.strategyRoadmap[0].deliverables) &&
              planData.strategyRoadmap[0].deliverables.length > 0;
            const roadmap = hasValidRoadmap ? planData.strategyRoadmap : defaultRoadmap;

            const currentSlide = deck[planSlideIdx] || deck[0];

            return (
              <section
                key={modId}
                id="digitalPlanning"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 07 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 07 · Strategic Growth Architecture
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Digital Planning, Brand Audit & Strategy Deck
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        A complete executive brand audit deck presented to leadership, coupled with a 16-week omnichannel growth marketing plan and budget allocation framework.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-2xs shrink-0">
                      <Briefcase className="w-4 h-4 text-amber-500" />
                      <span>Interactive Pitch Deck & 16-Week Roadmap</span>
                    </div>
                  </div>

                  {/* 1. Executive Pitch Deck Dark Slider */}
                  <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                    {/* Slide Top Bar */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                        <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider shrink-0">
                          SLIDE {planSlideIdx + 1} OF {deck.length}
                        </span>
                        <span className="text-slate-600 hidden sm:inline">|</span>
                        <span className="text-xs text-slate-300 font-medium truncate hidden sm:inline">
                          Executive Brand Audit & Gap Analysis Deck
                        </span>
                      </div>

                      {/* Controls: Prev, Indicators, Next */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPlanSlideIdx((prev) => (prev > 0 ? prev - 1 : deck.length - 1))}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Previous Slide"
                        >
                          <ChevronLeft size={14} />
                        </button>

                        <div className="flex items-center gap-1.5 px-1">
                          {deck.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setPlanSlideIdx(idx)}
                              className={`transition-all cursor-pointer ${
                                idx === planSlideIdx
                                  ? "w-6 h-1.5 rounded-full bg-amber-400"
                                  : "w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-500"
                              }`}
                              title={`Go to Slide ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setPlanSlideIdx((prev) => (prev < deck.length - 1 ? prev + 1 : 0))}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Next Slide"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Slide Body Content */}
                    <div className="py-6 sm:py-8 space-y-6">
                      <div>
                        <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                          {currentSlide.tag}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                          {currentSlide.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: 3 Strategic Diagnostic Findings */}
                        <div className="lg:col-span-7 space-y-3">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            STRATEGIC DIAGNOSTIC FINDINGS:
                          </div>
                          {(currentSlide.findings || []).map((finding, fIdx) => (
                            <div
                              key={fIdx}
                              className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 flex items-start gap-3.5 shadow-2xs"
                            >
                              <span className="w-6 h-6 rounded-md bg-blue-600/30 text-blue-400 border border-blue-500/40 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {fIdx + 1}
                              </span>
                              <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                                {finding}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Right Column: Benchmarking Matrix or Framework Architecture */}
                        <div className="lg:col-span-5 space-y-3">
                          {currentSlide.metricsTable && (
                            <div className="space-y-2">
                              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                DIAGNOSTIC BENCHMARKING MATRIX:
                              </div>
                              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 overflow-hidden shadow-2xs">
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-800 text-[11px] text-slate-400 font-semibold">
                                      <th className="pb-2.5">Metric</th>
                                      <th className="pb-2.5 text-right">Audit State</th>
                                      <th className="pb-2.5 text-right text-emerald-400">Benchmark</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-800/60 font-mono">
                                    {currentSlide.metricsTable.map((row, rIdx) => (
                                      <tr key={rIdx}>
                                        <td className="py-2.5 text-slate-300 font-sans text-xs">
                                          {row.metric}
                                        </td>
                                        <td className="py-2.5 text-right font-bold text-rose-400">
                                          {row.auditState}
                                        </td>
                                        <td className="py-2.5 text-right font-bold text-emerald-400">
                                          {row.benchmark}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {currentSlide.frameworkArchitecture && (
                            <div className="space-y-2">
                              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                FRAMEWORK ARCHITECTURE:
                              </div>
                              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 shadow-2xs">
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {currentSlide.frameworkArchitecture}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Slide Bottom Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Presented for Capstone Certification Review
                      </span>
                      <span className="font-mono font-bold text-amber-400">
                        Verified by Academy Lead Trainer
                      </span>
                    </div>
                  </div>

                  {/* 2. 16-Week Digital Marketing Execution Roadmap */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        16-Week Digital Marketing Execution Roadmap
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {roadmap.map((phase, pIdx) => (
                        <div
                          key={pIdx}
                          className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                        >
                          <div>
                            {/* Card Top: Weeks & Allocation */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-blue-600">
                                {phase.weeks}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                                {phase.allocation}
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-slate-900 mt-2">
                              {phase.phase}
                            </h4>

                            {/* Channel Pills */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {(phase.channels || []).map((ch, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                                >
                                  {ch}
                                </span>
                              ))}
                            </div>

                            {/* Deliverables */}
                            <div className="mt-4 space-y-2">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                KEY DELIVERABLES:
                              </div>
                              {(phase.deliverables || []).map((item, dIdx) => (
                                <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Milestone Footer */}
                          <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 font-mono">
                            {phase.milestone}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 08: INFLUENCER MARKETING
          if (modId === "influencerMarketing") {
            const initialInf = createInitialPortfolioData().modules.influencerMarketing;
            const infData = modules.influencerMarketing?.creators
              ? modules.influencerMarketing
              : initialInf;

            const allCreators = infData?.creators || initialInf.creators || [];
            const filteredCreators = allCreators.filter((creator) => {
              const matchesPlatform =
                influencerPlatformFilter === "All" ||
                creator.platform?.toLowerCase() === influencerPlatformFilter.toLowerCase();
              const query = influencerSearchQuery.trim().toLowerCase();
              const matchesQuery =
                !query ||
                creator.name?.toLowerCase().includes(query) ||
                creator.handle?.toLowerCase().includes(query) ||
                creator.niche?.toLowerCase().includes(query);
              return matchesPlatform && matchesQuery;
            });

            return (
              <section
                key={modId}
                id="influencerMarketing"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        MODULE 08 · CREATOR & AFFILIATE PARTNERSHIPS
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {infData.sheetTitle || "Influencer Marketing Research & Vetting Sheet"}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                        {infData.subtitle ||
                          "A comprehensive creator vetting database evaluating follower authenticity, audience fraud detection, demographic skew, engagement rates, and projected collaboration ROI."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      <div className="border border-blue-200 bg-blue-50/50 text-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <Users size={14} className="text-blue-600" />
                        <span>{infData.badge || "Fraud Audit · Modash & HypeAuditor Metrics"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
                    <div className="relative flex-1 max-w-md">
                      <Search
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Search creator by name, handle, or niche..."
                        value={influencerSearchQuery}
                        onChange={(e) => setInfluencerSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Platform:</span>
                      <div className="flex items-center gap-1.5">
                        {["All", "Instagram", "TikTok", "YouTube"].map((platform) => {
                          const isActive = influencerPlatformFilter === platform;
                          return (
                            <button
                              key={platform}
                              type="button"
                              onClick={() => setInfluencerPlatformFilter(platform)}
                              className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                                isActive
                                  ? "bg-blue-600 text-white shadow-xs"
                                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {platform}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Vetting Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0a192f] text-white text-xs font-bold uppercase tracking-wider">
                            <th className="py-3.5 px-4">Creator & Handle</th>
                            <th className="py-3.5 px-4">Platform & Niche</th>
                            <th className="py-3.5 px-4 text-center">Follower Count</th>
                            <th className="py-3.5 px-4">Fake Followers Audit</th>
                            <th className="py-3.5 px-4">Gender Demographics</th>
                            <th className="py-3.5 px-4 text-center">Engagement Rate</th>
                            <th className="py-3.5 px-4">Est. Collaboration Cost</th>
                            <th className="py-3.5 px-4 text-right">Fit Assessment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {filteredCreators.length > 0 ? (
                            filteredCreators.map((creator) => {
                              return (
                                <tr key={creator.id} className="hover:bg-slate-50/70 transition-colors">
                                  {/* Creator & Handle */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-bold text-slate-900 text-sm">
                                      {creator.name}
                                    </div>
                                    <div className="text-blue-600 font-medium">
                                      {creator.handle}
                                    </div>
                                  </td>

                                  {/* Platform & Niche */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-semibold text-slate-800">
                                      {creator.platform}
                                    </div>
                                    <div className="text-slate-500 text-[11px]">
                                      {creator.niche}
                                    </div>
                                  </td>

                                  {/* Follower Count */}
                                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                                    {creator.followers}
                                  </td>

                                  {/* Fake Followers Audit */}
                                  <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-1.5">
                                      {creator.auditClean ? (
                                        <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                                      ) : (
                                        <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                                      )}
                                      <span className="text-slate-800 font-medium">
                                        {creator.fakeFollowersAudit}
                                      </span>
                                    </div>
                                  </td>

                                  {/* Gender Demographics */}
                                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                                    {creator.genderDemographics}
                                  </td>

                                  {/* Engagement Rate */}
                                  <td className="py-3.5 px-4 text-center">
                                    <span
                                      className={`inline-block px-2.5 py-0.5 rounded font-bold text-xs ${
                                        parseFloat(creator.engagementRate) >= 4
                                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                          : "bg-slate-100 text-slate-700 border border-slate-200"
                                      }`}
                                    >
                                      {creator.engagementRate}
                                    </span>
                                  </td>

                                  {/* Est. Collaboration Cost */}
                                  <td className="py-3.5 px-4">
                                    <span className="font-bold text-slate-900">
                                      {creator.collaborationCost}
                                    </span>
                                  </td>

                                  {/* Fit Assessment */}
                                  <td className="py-3.5 px-4 text-right">
                                    <span
                                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold border ${
                                        creator.fitAssessment === "Recommended"
                                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                          : creator.fitAssessment === "Risky"
                                          ? "border-rose-300 bg-rose-50 text-rose-600"
                                          : "border-blue-300 bg-blue-50 text-blue-700"
                                      }`}
                                    >
                                      {creator.fitAssessment}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={8} className="py-8 text-center text-slate-400">
                                No creators found matching "{influencerSearchQuery}" on {influencerPlatformFilter}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-slate-50/80 px-4 py-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                      <span>{infData.cpmBenchmark || "Evaluated against creator CPM benchmarks ($12-$18 CPM target)."}</span>
                      <span className="font-bold text-amber-700">
                        Average cohort engagement rate: {infData.cohortAvgEngagement || "5.25%"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 09: SHOPIFY E-COMMERCE STORE & CRO ARCHITECTURE
          if (modId === "shopify") {
            return (
              <section
                key={modId}
                id="shopify"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 09 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 09 · E-Commerce Architecture
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Shopify E-Commerce Store & CRO Architecture
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        End-to-end Shopify merchant deployment designed for high Average Order Value (AOV), seamless 1-click checkout, and automated retention loops.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-2xs shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Shopify Partner Certified · Liquid Customized</span>
                    </div>
                  </div>

                  {/* Store Showcase Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Store Screenshot Mockup */}
                      <div className="lg:col-span-6 space-y-3">
                        <div className="relative bg-slate-950 aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 shadow-xs group">
                          <img
                            src={mockupCreativesImg}
                            alt="Terra & Tide Apparel Shopify Store"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-amber-400 font-mono text-[10px] px-2.5 py-1 rounded-md border border-slate-700 shadow-xs font-bold">
                            Customized Dawn 2.0 with liquid micro-optimizations
                          </div>
                        </div>
                      </div>

                      {/* Right: Store Details, KPIs & CRO */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                            SUSTAINABLE ORGANIC OUTDOOR APPAREL & GEAR
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                            Terra & Tide Apparel
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                            Complete Shopify store setup from scratch. Configured product collections, payment gateways, automated tax settings, shipping zones, and integrated post-purchase cross-sell flows that immediately increased average order value by 30%.
                          </p>
                        </div>

                        {/* 2 Stat Boxes */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50/60 border border-blue-200 p-3.5 rounded-xl">
                            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                              CONVERSION RATE
                            </div>
                            <div className="font-mono font-bold text-sm sm:text-base text-slate-900 mt-1">
                              3.84% <span className="text-xs font-medium text-slate-500">(up from 1.9% store baseline)</span>
                            </div>
                          </div>
                          <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl">
                            <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                              ACHIEVED AOV
                            </div>
                            <div className="font-mono font-bold text-sm sm:text-base text-slate-900 mt-1">
                              $89.50 <span className="text-xs font-medium text-amber-700">(+$21 lift via cart cross-sells)</span>
                            </div>
                          </div>
                        </div>

                        {/* CRO Features */}
                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            CONVERSION RATE OPTIMIZATION (CRO) FEATURES:
                          </div>
                          <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>Slide-out Smart Cart with progress bar toward free shipping</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>Instant 1-Click Shopify Pay & Apple Pay express checkout</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>Sticky mobile buy bar with real-time stock scarcity notice</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>Size guide interactive modal with 98% fit confidence</span>
                            </div>
                          </div>
                        </div>

                        {/* Integrated Shopify Apps */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            INTEGRATED SHOPIFY APPS:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              "Klaviyo: Email Marketing & SMS",
                              "Rebuy Engine: Smart Cart & AI Upsells",
                              "Judge.me: Verified Product Reviews",
                              "Matrixify: Bulk Inventory Automation",
                              "Loox: Photo Reviews & UGC Carousel",
                            ].map((app, aIdx) => (
                              <span
                                key={aIdx}
                                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-200"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 10: VIDEO EDITING, UGC CREATIVES & COMMERCIAL REELS
          if (modId === "videoEditing") {
            const reels = [
              {
                formatTag: "Reels / TikTok",
                duration: "0:24",
                title: "High-Retention UGC Hook: The 'Stop Scrolling' Skincare Teardown",
                description: "Engineered a TikTok-native UGC video ad featuring jump cuts every 1.2 seconds, dynamic auto-synced subtitles, sound design (whooshes, pop-ups), and a clear call-to-action.",
                hookStrategy: "0-3s visual pattern interrupt (rapid zoom on textured skin) paired with curiosity headline text and dynamic sound effects.",
                retentionMetric: "62% completion rate at 15s mark (4.1x benchmark)",
                tools: ["Adobe Premiere Pro", "CapCut Desktop", "After Effects"],
              },
              {
                formatTag: "Brand Teaser",
                duration: "0:45",
                title: "Cinematic Product Commercial: Matte Black Espresso Machine",
                description: "Commercial-grade promotional video focusing on product textures, precision engineering, and lifestyle aspiration. Used as top-of-funnel brand anchor for Meta and YouTube campaigns.",
                hookStrategy: "Slow-motion espresso extraction shot at 120fps with tactile ASMR audio and atmospheric golden hour backlight.",
                retentionMetric: "54% 30-second retention rate on YouTube In-Stream",
                tools: ["DaVinci Resolve", "Color Grading with Film LUTs", "Sound FX Library"],
              },
            ];

            return (
              <section
                key={modId}
                id="videoEditing"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 10 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 10 · Post-Production & Motion
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Video Editing, UGC Creatives & Commercial Reels
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        Short-form video assets engineered for algorithm retention, featuring dynamic jump-cut pacing, kinetic subtitles, and psycho-acoustic sound design.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-2xs shrink-0">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span>CapCut Desktop · Premiere Pro · 4K Color Graded</span>
                    </div>
                  </div>

                  {/* 2 Video Cards Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {reels.map((reel, rIdx) => (
                      <div
                        key={rIdx}
                        className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-md flex flex-col justify-between group"
                      >
                        {/* Video Thumbnail Area */}
                        <div className="relative aspect-[16/9] bg-black overflow-hidden group/vid">
                          <img
                            src={mockupCreativesImg}
                            alt={reel.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                          />
                          <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 font-mono text-[10px] px-2.5 py-1 rounded font-bold shadow-xs">
                            {reel.formatTag}
                          </div>
                          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/90 text-slate-300 font-mono text-[10px] px-2.5 py-1 rounded shadow-xs">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{reel.duration}</span>
                          </div>

                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                            </div>
                          </div>

                          {/* Yellow Accent Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400" />
                        </div>

                        {/* Video Details */}
                        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                              {reel.title}
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed font-normal">
                              {reel.description}
                            </p>
                          </div>

                          {/* Hook & Retention Architecture Box */}
                          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>HOOK & RETENTION ARCHITECTURE (0-3S):</span>
                            </div>
                            <p className="text-slate-200 italic leading-relaxed">
                              "{reel.hookStrategy}"
                            </p>
                            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                              <span className="text-slate-400">Verified Retention:</span>
                              <span className="text-emerald-400 font-mono font-bold">
                                {reel.retentionMetric}
                              </span>
                            </div>
                          </div>

                          {/* Footer with Tools & Enlarge link */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
                            <div className="flex flex-wrap gap-1.5">
                              {reel.tools.map((tool, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 text-[11px] font-medium bg-slate-800 text-slate-300 rounded-md border border-slate-700"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer">
                              Enlarge Player
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 11: DROPSHIPPING STORE & WINNING PRODUCT VALIDATION
          if (modId === "dropshipping") {
            return (
              <section
                key={modId}
                id="dropshipping"
                className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 11 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Module 11 · Direct-To-Consumer Fulfillment
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Dropshipping Store & Winning Product Validation
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        Product discovery research, supplier supply chain integration, margin modeling, and TikTok/Meta ad testing for rapid profitable scaling.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-2xs shrink-0">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>Fast 5-Day US Fulfillment · 76.3% Gross Margin</span>
                    </div>
                  </div>

                  {/* Winning Product Case Study Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Store Screenshot Mockup */}
                      <div className="lg:col-span-6 space-y-3">
                        <div className="relative bg-slate-950 aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 shadow-xs group">
                          <img
                            src={mockupCreativesImg}
                            alt="Smart Ergonomic Contour Pillow"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          <div className="absolute top-3 left-3 bg-emerald-600 text-white font-mono text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
                            76.3% Gross Margin
                          </div>
                        </div>
                      </div>

                      {/* Right: Product Case Study & Unit Economics */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            WINNING PRODUCT CASE STUDY
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                            Smart Ergonomic Cervical Contour Pillow with Cooling Gel
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 font-medium">
                            Storefront: Lumina Sleep Lab · Fulfilled via CJ Dropshipping & Direct Private Agent (5-8 day US delivery)
                          </p>
                        </div>

                        {/* 3 Unit Economics KPI Boxes */}
                        <div className="grid grid-cols-3 gap-3 my-4">
                          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase">
                              UNIT COGS
                            </div>
                            <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 mt-1 leading-snug">
                              $14.20 <span className="block text-[10px] font-normal text-slate-500">(including ePacket express fulfillment)</span>
                            </div>
                          </div>
                          <div className="bg-blue-50/50 border border-blue-200 p-3 rounded-xl text-center flex flex-col justify-center">
                            <div className="text-[10px] font-bold text-blue-700 uppercase">
                              RETAIL PRICE
                            </div>
                            <div className="font-mono font-bold text-sm sm:text-base text-blue-700 mt-1">
                              $59.95
                            </div>
                          </div>
                          <div className="bg-amber-50/60 border border-amber-300 p-3 rounded-xl text-center flex flex-col justify-center">
                            <div className="text-[10px] font-bold text-amber-800 uppercase">
                              NET PROFIT/UNIT
                            </div>
                            <div className="font-mono font-extrabold text-sm sm:text-base text-amber-800 mt-1">
                              +$45.75
                            </div>
                          </div>
                        </div>

                        {/* Winning Ad Creative Hook & Angle */}
                        <div className="space-y-1">
                          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                            WINNING AD CREATIVE HOOK & ANGLE:
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Tackled widespread neck stiffness and morning migraines caused by smartphone posture. Ad creative demonstrated side-by-side spine alignment using 3D medical animation vs traditional flat pillows.
                          </p>
                        </div>

                        {/* Pilot Test Validation Performance (14-Day Sprint) */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            PILOT TEST VALIDATION PERFORMANCE (14-DAY SPRINT):
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
                              <span className="text-[10px] text-slate-400 font-medium block">Units Sold</span>
                              <span className="font-mono font-bold text-xs text-slate-800">420</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
                              <span className="text-[10px] text-slate-400 font-medium block">Ad Spend</span>
                              <span className="font-mono font-bold text-xs text-slate-800">$3,800</span>
                            </div>
                            <div className="bg-blue-50/60 border border-blue-200 p-2 rounded-lg">
                              <span className="text-[10px] text-blue-600 font-medium block">Revenue</span>
                              <span className="font-mono font-bold text-xs text-blue-700">$25,179</span>
                            </div>
                            <div className="bg-emerald-50/80 border border-emerald-300 p-2 rounded-lg">
                              <span className="text-[10px] text-emerald-700 font-medium block">Net Profit</span>
                              <span className="font-mono font-bold text-xs text-emerald-700">$8,950</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 12: AI MARKETING APP
          if (modId === "aiApp") {
            const initialAi = createInitialPortfolioData().modules.aiApp;
            const aiData = modules.aiApp?.systemPromptInstruction ? modules.aiApp : initialAi;
            const frameworkVariants =
              aiData?.variants?.[aiFramework] ||
              aiData?.variants?.AIDA ||
              initialAi.variants.AIDA;

            const handleCopyVariant = (text, idx) => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(text);
                setCopiedVariantIdx(idx);
                setTimeout(() => setCopiedVariantIdx(null), 2000);
              }
            };

            return (
              <section
                key={modId}
                id="aiApp"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        {aiData.moduleEyebrow || "MODULE 12 · ARTIFICIAL INTELLIGENCE & AUTOMATION"}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {aiData.title || "AI-Powered Marketing Application & Creative Co-Pilot"}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                        {aiData.subtitle ||
                          "Custom software engineered with modern AI APIs to accelerate marketing workflows, automate direct-response ad copy generation, and scale creative testing."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      <div className="border border-blue-200 bg-blue-50/50 text-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <Sparkles size={14} className="text-blue-600" />
                        <span>{aiData.topBadge || "Gemini API · React 19 · Prompt Engineered"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Dark Hero Card: Product Architecture & Workflow */}
                  <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6 lg:p-8 text-white shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Interactive UI Dashboard Mockup */}
                      <div className="lg:col-span-6 space-y-3">
                        {/* Floating Feature Pill */}
                        <div className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-xs font-bold px-3.5 py-1 rounded-md shadow-md">
                          <Sparkles size={12} className="text-white" />
                          <span>Gemini 2.5 Flash with custom system prompts & temperature fine-tuning</span>
                        </div>

                        {/* Mockup Dashboard Window */}
                        <div className="bg-slate-100 rounded-xl border border-slate-300/80 shadow-md p-3 sm:p-4 text-slate-900 text-xs">
                          {/* Mockup Topbar */}
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                            <span className="font-bold text-slate-800 text-[11px]">
                              Ad Copy Generation Dashboard
                            </span>
                            <div className="flex items-center gap-2">
                              <Search size={12} className="text-slate-400" />
                              <div className="w-4 h-4 rounded-full bg-blue-600 text-[9px] text-white flex items-center justify-center font-bold">
                                A
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Left Pane: Prompt Editor */}
                            <div className="bg-white rounded-lg p-3 border border-slate-200 space-y-2 text-[10px]">
                              <div>
                                <span className="text-slate-400 block font-semibold text-[9px]">Campaign Selector</span>
                                <div className="border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium bg-slate-50">
                                  Spring Launch 2024
                                </div>
                              </div>
                              <div className="font-bold text-slate-700 text-[10px] pt-1">
                                Prompt Editor
                              </div>
                              <div className="space-y-1 text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                                <div><strong className="text-slate-800">Product:</strong> AeroFit Wireless Earbuds</div>
                                <div><strong className="text-slate-800">Audience:</strong> Tech-savvy fitness (25-40)</div>
                                <div><strong className="text-slate-800">Goal:</strong> Driving sales with 20% discount</div>
                                <div><strong className="text-slate-800">Key features:</strong> Noise canceling, 30h battery</div>
                              </div>
                              <div className="flex gap-2 text-slate-600 pt-1">
                                <div><strong className="text-slate-800">Style:</strong> Creative</div>
                                <div><strong className="text-slate-800">Tone:</strong> Energetic</div>
                              </div>
                              <button
                                type="button"
                                className="w-full bg-blue-600 text-white font-bold py-1.5 rounded text-center text-[10px] shadow-xs cursor-default"
                              >
                                Generate Ad Copy
                              </button>
                            </div>

                            {/* Right Pane: Generated Ad Variants */}
                            <div className="bg-white rounded-lg p-3 border border-slate-200 space-y-2.5 text-[10px]">
                              <span className="font-bold text-slate-800 block text-[10px]">
                                Generated Ad Variants
                              </span>

                              {/* Variant 1 */}
                              <div className="border border-slate-200 rounded p-2 bg-slate-50 space-y-1">
                                <div className="flex items-center justify-between text-[9px]">
                                  <span className="font-bold text-blue-600">Variant 1 (Facebook/Instagram)</span>
                                </div>
                                <div className="font-bold text-slate-900 leading-tight">
                                  Elevate Your Workout: AeroFit Earbuds
                                </div>
                                <p className="text-slate-600 text-[9px] line-clamp-2">
                                  Experience sound without limits. 30h battery & Noise Canceling. Get 20% OFF! #AeroFit #Fitness
                                </p>
                                <div className="flex items-center justify-between text-[9px] pt-1 border-t border-slate-200/60">
                                  <span className="text-slate-500">Score: <strong className="text-blue-600">89/100</strong></span>
                                  <span className="text-emerald-600 font-bold">High Engagement ↗</span>
                                </div>
                              </div>

                              {/* Variant 2 */}
                              <div className="border border-slate-200 rounded p-2 bg-slate-50 space-y-1">
                                <div className="flex items-center justify-between text-[9px]">
                                  <span className="font-bold text-blue-600">Variant 2 (Google Ads)</span>
                                </div>
                                <div className="font-bold text-slate-900 leading-tight">
                                  AeroFit Earbuds | 20% OFF Limited Time
                                </div>
                                <p className="text-slate-600 text-[9px] line-clamp-2">
                                  Power your workout with water-resistant wireless earbuds. Shop Now!
                                </p>
                                <div className="flex items-center justify-between text-[9px] pt-1 border-t border-slate-200/60">
                                  <span className="text-slate-500">Score: <strong className="text-blue-600">92/100</strong></span>
                                  <span className="text-emerald-600 font-bold">High Quality Score ↗</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Export bar */}
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200 text-[9px] text-slate-500">
                            <span className="font-semibold text-slate-700">Export Options:</span>
                            <div className="flex gap-1.5 font-medium">
                              <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-700">Export All Variants</span>
                              <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">Meta (FB/IG)</span>
                              <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">Google Ads</span>
                              <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">TikTok</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Architecture & Engineered System Prompt */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
                            {aiData.category || "PRODUCT ARCHITECTURE & WORKFLOW"}
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
                            {aiData.appName || "AdCopyGenius AI — Marketing Creative Co-Pilot"}
                          </h3>
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {aiData.appDescription || aiData.tagline ||
                            "Digital marketers spend 10+ hours a week staring at blank screens trying to write compelling ad angles. AdCopyGenius AI structures inputs into proven frameworks (AIDA, PAS, BAB) with automatic character count validation and emoji formatting."}
                        </p>

                        {/* Terminal Box */}
                        <div className="bg-[#050b14] border border-slate-700/60 rounded-xl p-4">
                          <div className="text-[11px] font-mono font-bold text-amber-500">
                            &gt;_ ENGINEERED SYSTEM PROMPT INSTRUCTION:
                          </div>
                          <p className="text-slate-200 font-mono text-xs leading-relaxed italic mt-1.5">
                            {aiData.systemPromptInstruction ||
                              '"You are an elite direct-response copywriter. Given a product, audience, and pain point, output 3 distinct hooks (Curiosity, Problem-Agitate, Social Proof) under 125 characters, paired with 2 persuasive bodies and call-to-actions."'}
                          </p>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-2 pt-1 text-xs text-slate-200">
                          {(aiData.features || [
                            "Instant 3-Hook Generation (Curiosity, Pain Point, Social Proof)",
                            "Automated Google Ads Headline & Description compliance checker",
                            "Meta Primary Text generator with estimated CTR rating score",
                            "1-Click Copy to Clipboard & CSV batch export for Google Ads Editor",
                          ]).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2.5">
                              <CheckCircle2 size={15} className="text-blue-400 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(aiData.techStack || ["React 19", "TypeScript", "Tailwind CSS", "Gemini API", "Vite"]).map(
                            (tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom White Card: Interactive Test Drive */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-amber-500">✨</span>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                        {aiData.interactiveTitle || "Interactive Test Drive: Try the Student's AI Ad Copy Output Engine"}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                      {/* Left: Simulator Controls */}
                      <div className="lg:col-span-5 space-y-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                            Product / Service Name:
                          </label>
                          <input
                            type="text"
                            value={aiProductInput}
                            onChange={(e) => setAiProductInput(e.target.value)}
                            placeholder="e.g. Anti-Fatigue Ergonomic Standing Mat"
                            className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-2">
                            Direct Response Framework:
                          </label>
                          <div className="flex items-center gap-2">
                            {["AIDA", "PAS", "Curiosity"].map((fw) => {
                              const isActive = aiFramework === fw;
                              return (
                                <button
                                  key={fw}
                                  type="button"
                                  onClick={() => setAiFramework(fw)}
                                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                    isActive
                                      ? "bg-blue-600 text-white shadow-xs"
                                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                  }`}
                                >
                                  {fw}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed pt-1">
                          Interactive simulator executing the student's fine-tuned copywriting prompt matrix.
                        </p>
                      </div>

                      {/* Right: Generated Ad Variants */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          GENERATED AD VARIANTS FOR {(aiProductInput || "ANTI-FATIGUE ERGONOMIC STANDING MAT").toUpperCase().slice(0, 32)}...:
                        </div>

                        <div className="space-y-3">
                          {frameworkVariants.map((variant, vIdx) => {
                            const isCopied = copiedVariantIdx === vIdx;
                            return (
                              <div
                                key={vIdx}
                                className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-colors relative space-y-2"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-bold text-blue-600">
                                      {variant.framework}
                                    </span>
                                    <span className="text-slate-300">·</span>
                                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      {variant.ctr}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleCopyVariant(variant.text, vIdx)}
                                    title="Copy Ad Variant"
                                    className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors cursor-pointer"
                                  >
                                    {isCopied ? (
                                      <Check size={15} className="text-emerald-600" />
                                    ) : (
                                      <Copy size={15} />
                                    )}
                                  </button>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                  {variant.text}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // MODULE 13: PERFORMANCE MARKETING
          if (modId === "performanceMarketing") {
            const initialPerf = createInitialPortfolioData().modules.performanceMarketing;
            const perfData = modules.performanceMarketing?.funnelArchitecture
              ? modules.performanceMarketing
              : initialPerf;

            const statsList = perfData.stats || initialPerf.stats || [];
            const stagesList =
              perfData.funnelArchitecture?.stages ||
              initialPerf.funnelArchitecture.stages ||
              [];
            const outcomesList =
              perfData.attribution?.outcomes ||
              initialPerf.attribution.outcomes ||
              [];

            return (
              <section
                key={modId}
                id="performanceMarketing"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        {perfData.moduleEyebrow || "MODULE 13 · ADVANCED PERFORMANCE MARKETING"}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {perfData.title || "Performance Marketing & Full-Funnel Scaling"}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                        {perfData.subtitle ||
                          "Full-funnel paid acquisition architecture scaling spend from $8k to $45k/month while sustaining high profitability through CAC reduction and cohort LTV expansion."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      <div className="border border-emerald-200 bg-emerald-50/50 text-emerald-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <BarChart3 size={14} className="text-emerald-600" />
                        <span>{perfData.topBadge || "Triple Whale & GA4 Attributed · $135k Managed"}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Top Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statsList.map((stat, sIdx) => {
                      const isBlue = stat.highlight === "blue";
                      const isAmber = stat.highlight === "amber";

                      return (
                        <div
                          key={sIdx}
                          className={`rounded-2xl p-5 shadow-xs border transition-all ${
                            isBlue
                              ? "bg-blue-50/30 border-blue-200"
                              : isAmber
                              ? "bg-amber-50/30 border-amber-200"
                              : "bg-white border-slate-200"
                          }`}
                        >
                          <div
                            className={`text-xs font-medium ${
                              isBlue
                                ? "text-blue-600 font-semibold"
                                : isAmber
                                ? "text-amber-700 font-semibold"
                                : "text-slate-500"
                            }`}
                          >
                            {stat.label}
                          </div>
                          <div
                            className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                              isBlue
                                ? "text-blue-600"
                                : isAmber
                                ? "text-amber-800"
                                : "text-slate-900"
                            }`}
                          >
                            {stat.value}
                          </div>
                          <div
                            className={`text-xs mt-1 font-medium ${
                              stat.highlight === "emerald"
                                ? "text-emerald-600 font-bold"
                                : isBlue
                                ? "text-blue-600/80"
                                : isAmber
                                ? "text-amber-700/80"
                                : "text-slate-400"
                            }`}
                          >
                            {stat.subtext}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Middle Card: Funnel Allocation Architecture */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        {perfData.funnelArchitecture?.eyebrow || "FUNNEL ALLOCATION ARCHITECTURE:"}
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                        {perfData.funnelArchitecture?.title || "Multi-Stage Channel Mix & Budget Orchestration"}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {stagesList.map((stage, stIdx) => {
                        return (
                          <div
                            key={stIdx}
                            className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 flex flex-col justify-between"
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 text-sm">
                                  {stage.stage}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                                    stage.pctBadgeClass || "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {stage.pct}
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed">
                                {stage.objective}
                              </p>

                              <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                  ACTIVE CHANNELS:
                                </span>
                                <p className="text-xs font-medium text-slate-800 mt-1">
                                  {stage.channels}
                                </p>
                              </div>

                              <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                  CREATIVE FORMATS:
                                </span>
                                <p className="text-xs font-medium text-slate-800 mt-1 leading-relaxed">
                                  {stage.creativeFormats}
                                </p>
                              </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-200">
                              <span className="text-xs text-slate-400 font-medium">
                                {stage.budgetFooter}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Dark Card: Attribution & Measurement Rigor */}
                  <div className="bg-[#0a1526] border border-slate-800 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Attribution Rigor info */}
                      <div className="lg:col-span-5 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
                          {perfData.attribution?.eyebrow || "ATTRIBUTION & MEASUREMENT RIGOR"}
                        </div>
                        <h3 className="text-2xl font-extrabold text-white">
                          {perfData.attribution?.title || "Independent First-Party Tracking"}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md pt-1">
                          {perfData.attribution?.description ||
                            "Triple Whale 1-Day Click / 1-Day View First-Party Pixel & Google Analytics 4 Data-Driven Attribution"}
                        </p>
                      </div>

                      {/* Right: Verified Student Outcomes */}
                      <div className="lg:col-span-7 space-y-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          {perfData.attribution?.outcomesHeading || "VERIFIED STUDENT SCALING OUTCOMES:"}
                        </span>

                        <div className="space-y-3">
                          {outcomesList.map((outcome, oIdx) => (
                            <div
                              key={oIdx}
                              className="bg-[#0f1d38] border border-slate-700/60 rounded-xl px-4 py-3.5 flex items-center gap-3"
                            >
                              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                              <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                                {outcome}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </main>

      {/* 5. FOOTER WITH OPERATING MEDIA OFFICIAL LOGO & COPYRIGHT */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            {/* Left: Operating Media Logo & Tagline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={logoHorizontalDarkImg}
                alt="Operating Media"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="sm:border-l sm:border-slate-800 sm:pl-4">
                <span className="font-extrabold text-sm text-white block">
                  Digital Marketing Training & Placement Division
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Official Masterclass Graduate Certification & Verified Showcase
                </span>
              </div>
            </div>

            {/* Right: Verified Student Credentials Badge */}
            <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0"
                style={{ backgroundColor: theme.primary }}
              >
                {student.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-white">{student.name}</div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={11} />
                  <span>Curriculum Verified • Cohort 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Accreditation Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <div>
              <p className="font-medium text-slate-400">
                © {new Date().getFullYear()} Operating Media. All Rights Reserved.
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ISO 9001:2015 Certified Curriculum • Training Centers: Andheri • Borivali
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-[11px] text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                {navItems.length} Practical Modules
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                Live Campaign Data
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                Verified Portfolio
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 6. MODAL FOR UPDATING IMAGES DIRECTLY */}
      <ImageUploadModal
        isOpen={imageModalConfig.isOpen && isEditable}
        onClose={closeImageModal}
        title={imageModalConfig.title}
        currentUrl={imageModalConfig.currentUrl}
        isAvatar={imageModalConfig.isAvatar}
        onSave={(newUrl) => {
          if (imageModalConfig.onSave) {
            imageModalConfig.onSave(newUrl);
          }
          closeImageModal();
        }}
      />
    </div>
    </PortfolioEditableContext.Provider>
  );
};

export default PortfolioPreview;
