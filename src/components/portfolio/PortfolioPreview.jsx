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
  Edit2,
  Eye,
  Play,
  Clock,
  DollarSign,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { EditableText } from "./EditableText";
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
  const [activeTab, setActiveTab] = useState("wordpress");
  const [openMetaIdx, setOpenMetaIdx] = useState(0);
  const [openGoogleIdx, setOpenGoogleIdx] = useState(0);
  const [canvaFilter, setCanvaFilter] = useState("all");

  // Image editing modal state
  const [imageModalConfig, setImageModalConfig] = useState({
    isOpen: false,
    title: "",
    currentUrl: "",
    isAvatar: false,
    onSave: null,
  });

  const openImageModal = (title, currentUrl, isAvatar, onSave) => {
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
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. TOPBAR HEADER (Matching reference: Aarav Sharma / DM initials / Center links / Developer Specs / Customize / Print) */}
      <header className="relative z-20 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 min-h-16 py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-4">
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
            <button
              type="button"
              onClick={() => window.open("/portfolio-live", "_blank")}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300/70 cursor-pointer shadow-2xs"
              title="View Live Standalone Portfolio"
            >
              <Code2 size={13} style={{ color: theme.primary }} />
              <span className="hidden sm:inline">Developer Specs</span>
            </button>

            {onOpenCustomizer && (
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

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer shadow-2xs"
              title="Print or Save Portfolio as PDF"
            >
              <Printer size={15} />
            </button>
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

        <div className="relative max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            {/* Left Content Column (7 cols) - RESUME-LIKE DIRECT INLINE EDITING */}
            <div className="lg:col-span-7 space-y-6">
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
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2.5">
                  Verified Social & Portfolio Profiles
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(student.socials || []).map((social, sIdx) => (
                    <a
                      key={sIdx}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/80 transition-all duration-200 shadow-xs hover:-translate-y-0.5"
                    >
                      {renderSocialIcon(social.platform)}
                      <span>{social.label}</span>
                    </a>
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

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  <Printer size={16} style={{ color: theme.primary }} />
                  <span>Save / Print Portfolio</span>
                </button>
              </div>
            </div>

            {/* Right Column (5 cols) - LARGER AVATAR PHOTO CARD (CLICK TO CHANGE PHOTO) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
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
                      className="w-full aspect-[4/4.2] sm:aspect-square object-cover rounded-xl transition-transform duration-500 group-hover:scale-102"
                    />

                    {/* Change Photo Hover Overlay Button */}
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
                    {onOpenCustomizer && (
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {(student.highlights || []).map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/70 rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 group"
                >
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
                <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {wpProjects.map((proj, pIdx) => {
                      const domainName = proj.title?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "sample";
                      return (
                        <div
                          key={proj.id || pIdx}
                          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
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
                          <div className="relative bg-slate-950 aspect-[16/10] overflow-hidden group/img">
                            <img
                              src={proj.imageUrl || mockupLaptopImg}
                              alt={proj.title}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                            />
                            {/* Hover View Screenshot Overlay */}
                            <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
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
                                  )
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-100 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                                <span>View / Change Screenshot</span>
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
                <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {canvaDesigns.map((design, dIdx) => (
                          <div
                            key={design.id || dIdx}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group"
                          >
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
                                onClick={() =>
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
                                  )
                                }
                                className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start cursor-pointer"
                              >
                                <span>Expand Design</span>
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

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {canvaVideos.map((video, vIdx) => (
                          <div
                            key={video.id || vIdx}
                            className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row group"
                          >
                            {/* Left Thumbnail */}
                            <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto bg-black overflow-hidden group/thumb min-h-[200px]">
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
                            <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold">
                                  {video.format}
                                </span>
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
                                <Play className="w-3 h-3 fill-amber-400" />
                                <span>Preview Reel Storyboard</span>
                              </button>
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
                <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
                        <div className="relative bg-slate-950 aspect-[16/9] overflow-hidden group/img">
                          <img
                            src={profile.screenshotUrl || mockupCreativesImg}
                            alt={profile.handle}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() =>
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
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-100 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>Inspect Profile Grid Screenshot</span>
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
                <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
                            <div className="border-t border-slate-200 bg-white p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                              {/* Left Column: Creative Mockup */}
                              <div className="lg:col-span-5 space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Ad Creative & Placement Screenshot:
                                </div>
                                <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-xs group/ad">
                                  <img
                                    src={ad.screenshotUrl || mockupCreativesImg}
                                    alt={ad.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                  />
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
                                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                                    Meta Ads Manager Verified
                                  </div>
                                </div>
                                <div className="text-[11px] text-slate-500 text-center italic">
                                  Screenshot of live ad creative tested across Instagram Stories & Facebook Feed.
                                </div>
                              </div>

                              {/* Right Column: Details & KPIs */}
                              <div className="lg:col-span-7 space-y-5">
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
                <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
                            <div className="border-t border-slate-200 bg-white p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                              {/* Left Column: Mockup & Google Sponsored Search Box */}
                              <div className="lg:col-span-5 space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Ad Preview & Campaign Screenshot:
                                </div>
                                <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-xs group/ad">
                                  <img
                                    src={gad.screenshotUrl || mockupLaptopImg}
                                    alt={gad.campaignName || gad.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                  />
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
                              <div className="lg:col-span-7 space-y-5">
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
          
          // MODULE 06: SEO & LOCAL GBP
          if (modId === "seo") {
            return (
              <section
                key={modId}
                id="seo"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        SEO & Local GBP
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Technical audits, Core Web Vitals optimization, Top 10 rankings & Google Map Pack
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
                    <span>Rankings Audit Report: {modules.seo?.audit?.organicTrafficGrowth || "+380%"} Organic Traffic Growth</span>
                    <span>DA: {modules.seo?.audit?.domainAuthorityBefore ?? 14} → {modules.seo?.audit?.domainAuthorityAfter ?? 38}</span>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar w-full">
                    <table className="w-full min-w-[500px] text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Target Keyword</th>
                          <th className="py-3 px-4">Monthly Search Volume</th>
                          <th className="py-3 px-4">Initial Rank</th>
                          <th className="py-3 px-4">Current Google Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {(Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : []).map((kw, kIdx) => (
                          <tr key={kIdx} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-bold text-slate-900">{kw.keyword}</td>
                            <td className="py-3 px-4 text-slate-600">{kw.volume}/mo</td>
                            <td className="py-3 px-4 text-slate-400">Position #{kw.initialRank}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full font-black text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Rank #{kw.currentRank} on Google
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              
                </div>
              </section>
            );
          }

          // MODULE 07: DIGITAL PLANNING DECK
          if (modId === "digitalPlanning") {
            return (
              <section
                key={modId}
                id="digitalPlanning"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Digital Planning Deck
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Executive brand audit decks, competitor analysis & 3-month growth roadmap
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(Array.isArray(modules.digitalPlanning?.brandAuditDeck) ? modules.digitalPlanning.brandAuditDeck : []).map((slide, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-600 block">
                          Slide 0{slide.slideNumber}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                          {slide.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed mt-2">
                        {slide.takeaway}
                      </p>
                    </div>
                  ))}
                </div>
              
                </div>
              </section>
            );
          }

          // MODULE 08: INFLUENCER MARKETING
          if (modId === "influencerMarketing") {
            return (
              <section
                key={modId}
                id="influencerMarketing"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Users size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Influencer Marketing
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Creator tiering, contract deliverables, cost-per-engagement & revenue attribution
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Array.isArray(modules.influencerMarketing) ? modules.influencerMarketing : []).map((inf) => (
                    <div
                      key={inf.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900">
                          {inf.tier}
                        </h3>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {inf.revenueDrawn} Revenue
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center text-xs">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block">CREATORS</span>
                          <span className="font-extrabold text-slate-900">{inf.countHired}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block">TOTAL SPEND</span>
                          <span className="font-extrabold text-slate-900">{inf.totalSpend}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block">REACH</span>
                          <span className="font-extrabold text-blue-600">{inf.reach}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              
                </div>
              </section>
            );
          }

          // MODULE 09: SHOPIFY STORE
          if (modId === "shopify") {
            return (
              <section
                key={modId}
                id="shopify"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Shopify Store
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        High AOV architecture, custom cart upsells, and payment gateway integration
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                        {modules.shopify.niche}
                      </span>
                      <h3 className="text-lg font-black text-slate-900">
                        {modules.shopify.storeName}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                        CR: {modules.shopify.conversionRateAchieved}
                      </span>
                      <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200">
                        AOV: {modules.shopify.aovAchieved}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {modules.shopify.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Conversion Rate Optimization (CRO) Features Built:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {(Array.isArray(modules.shopify?.croFeatures) ? modules.shopify.croFeatures : []).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start">
                          <span className="text-emerald-500 mr-2 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              
                </div>
              </section>
            );
          }

          // MODULE 10: VIDEO EDITING
          if (modId === "videoEditing") {
            return (
              <section
                key={modId}
                id="videoEditing"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Video size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Video Editing
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Short-form viral hook structures, dynamic kinetic typography, and motion ad cuts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Array.isArray(modules.videoEditing) ? modules.videoEditing : []).map((vid) => (
                    <div
                      key={vid.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-purple-600">
                          {vid.software}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          {vid.retentionRate}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {vid.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Hook Strategy: <strong className="text-slate-700">{vid.hookTime}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              
                </div>
              </section>
            );
          }

          // MODULE 11: DROPSHIPPING STORE
          if (modId === "dropshipping") {
            return (
              <section
                key={modId}
                id="dropshipping"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Box size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Dropshipping Store
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Product validation economics, supplier procurement, gross margins & ad angles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-600">
                        {modules.dropshipping.supplierPlatform}
                      </span>
                      <h3 className="text-base font-black text-slate-900">
                        Winning Product: {modules.dropshipping.winningProduct}
                      </h3>
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      {modules.dropshipping.grossMarginPct} Gross Margin
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">COGS</span>
                      <span className="font-extrabold text-slate-900">{modules.dropshipping.cogs}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">RETAIL</span>
                      <span className="font-extrabold text-slate-900">{modules.dropshipping.retailPrice}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-slate-400 font-bold block">VALIDATION</span>
                      <span className="font-bold text-slate-800">{modules.dropshipping.validationMetrics}</span>
                    </div>
                  </div>
                </div>
              
                </div>
              </section>
            );
          }

          // MODULE 12: AI MARKETING APP
          if (modId === "aiApp") {
            return (
              <section
                key={modId}
                id="aiApp"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Cpu size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        AI Marketing App
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        AI prompt engineering systems, automated copy generators & custom GPT pipelines
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-purple-600">
                        {modules.aiApp.aiModelUsed}
                      </span>
                      <h3 className="text-base font-black text-slate-900">
                        {modules.aiApp.appName}
                      </h3>
                    </div>
                    <a
                      href={modules.aiApp.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs"
                    >
                      <span>Launch Live AI App</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {modules.aiApp.tagline}
                  </p>

                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl text-xs font-mono">
                    <span className="text-slate-400 block text-[10px] font-bold mb-1">// SYSTEM PROMPT ARCHITECTURE</span>
                    "{modules.aiApp.samplePromptSystem}"
                  </div>
                </div>
              
                </div>
              </section>
            );
          }

          // MODULE 13: PERFORMANCE MARKETING
          if (modId === "performanceMarketing") {
            return (
              <section
                key={modId}
                id="performanceMarketing"
                className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
              >
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Zap size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Performance Marketing
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Multi-channel attribution, blended CAC reduction, and budget scaling economics
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                        {modules.performanceMarketing?.clientIndustry || "Omnichannel DTC Brand"}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                        {modules.performanceMarketing?.budgetScaled || "Scaled to ₹850,000/mo"}
                      </h3>
                    </div>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg self-start sm:self-auto">
                      Blended CAC: {modules.performanceMarketing?.blendedCacReduced || modules.performanceMarketing?.blendedCac || "₹410"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-white/5 p-4 rounded-xl text-center text-xs border border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">SCALE SPEND</span>
                      <span className="font-extrabold text-white text-sm">
                        {modules.performanceMarketing?.budgetScaled ? String(modules.performanceMarketing.budgetScaled).split(" ")[0] : "₹850k"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">LTV:CAC</span>
                      <span className="font-extrabold text-emerald-400 text-sm">
                        {modules.performanceMarketing?.cohortLtvCac || modules.performanceMarketing?.ltvEstimate || "3.9x"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-slate-400 font-bold block">CHANNELS</span>
                      <span className="font-semibold text-slate-300 truncate">
                        {modules.performanceMarketing?.attributionMix || modules.performanceMarketing?.funnelStages || "Meta Ads + Google Search + Email"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                    <strong className="text-white">Cohort Economics: </strong>
                    {modules.performanceMarketing?.scalingMethodology || modules.performanceMarketing?.scalingResults || "Delivered profitable growth with full attribution."}
                  </p>
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
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
        isOpen={imageModalConfig.isOpen}
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
  );
};

export default PortfolioPreview;
