import React, { useState } from "react";
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
} from "lucide-react";


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

export const PortfolioPreview = ({
  portfolioData,
  theme,
  moduleVisibility = {},
  onOpenCustomizer,
  isStandalone = false,
}) => {
  const { student, modules } = portfolioData;
  const [activeTab, setActiveTab] = useState("wordpress");
  const [openMetaIdx, setOpenMetaIdx] = useState(0);
  const [openGoogleIdx, setOpenGoogleIdx] = useState(0);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

    // Scroll listener for sticky navigation sync
  React.useEffect(() => {
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

  const scrollSlider = (direction) => {
    const slider = document.getElementById("portfolio-module-slider");
    if (slider) {
      const scrollAmount = direction === "left" ? -280 : 280;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // 13 Modules exactly matching curriculum & user screenshot
  const navItems = [
    { id: "wordpress", label: "01. WordPress Web Design", icon: Globe },
    { id: "canva", label: "02. Canva Design & Video", icon: Palette },
    { id: "socialOrganic", label: "03. Social Media Organic", icon: Share2 },
    { id: "socialMarketing", label: "04. Meta Ads (Accordions)", icon: TrendingUp },
    { id: "googleAds", label: "05. Google Ads (Accordions)", icon: Search },
    { id: "seo", label: "06. SEO & Local GBP", icon: BarChart3 },
    { id: "digitalPlanning", label: "07. Digital Planning Deck", icon: Briefcase },
    { id: "influencerMarketing", label: "08. Influencer Marketing", icon: Users },
    { id: "shopify", label: "09. Shopify Store", icon: ShoppingBag },
    { id: "videoEditing", label: "10. Video Editing", icon: Video },
    { id: "dropshipping", label: "11. Dropshipping Store", icon: Box },
    { id: "aiApp", label: "12. AI Marketing App", icon: Cpu },
    { id: "performanceMarketing", label: "13. Performance Marketing", icon: Zap },
  ].filter((item) => moduleVisibility[item.id] !== false);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. TOPBAR HEADER (Matching reference: Aarav Sharma / DM initials / Center links / Developer Specs / Customize / Print — "Hire Marketer" REMOVED) */}
      <header className="relative z-20 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Brand Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-xs tracking-wider"
              style={{ backgroundColor: theme.primary }}
            >
              {student.name.split(" ").map((n) => n[0]).slice(0, 2).join("") || "DM"}
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm leading-tight">
                {student.name}
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                Digital Marketing Portfolio
              </div>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden xl:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => scrollToSection("wordpress")}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              WordPress
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("canva")}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Canva & Video
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("socialMarketing")}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Meta Ads
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("googleAds")}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Google Ads
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("seo")}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              SEO & GBP
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("digitalPlanning")}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Strategy
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("performanceMarketing")}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Performance
            </button>
          </nav>

          {/* Right Action Buttons - Developer Specs, Customize, Print ("Hire Marketer" REMOVED) */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
            <button
              type="button"
              onClick={() => window.open("/portfolio-live", "_blank")}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300/70 cursor-pointer shadow-2xs"
              title="View Live Standalone Portfolio"
            >
              <Code2 size={13} className="text-blue-600" />
              <span className="hidden sm:inline">Developer Specs</span>
            </button>

            {onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 sm:py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs border border-amber-500/50 cursor-pointer"
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

      {/* 2. HERO SECTION (INCREASED SIZE & EXACT REFERENCE STYLING) */}
      <section className="bg-[#090e1a] text-white border-b border-slate-800 relative overflow-hidden py-14 sm:py-20 lg:py-24">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        {/* Ambient glow orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column (7 cols) - INCREASED SIZE */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-full font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Open to Full-Time & Client Contracts</span>
                </span>
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Award size={14} className="text-amber-400" />
                  <span>Academy Graduate Cohort 2026</span>
                </span>
              </div>

              {/* Student Name & Titles (LARGE TYPOGRAPHY) */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  {student.name}
                </h1>
                <p className="mt-2 text-xl sm:text-2xl font-bold text-amber-400 leading-snug">
                  {student.headline}
                </p>
                <p className="mt-1 text-sm sm:text-base text-slate-300 font-normal">
                  {student.subheadline}
                </p>
              </div>

              {/* Bio Paragraph */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                {student.bio}
              </p>

              {/* Contact Meta Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <Mail size={14} className="text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${student.email}`}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {student.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={14} className="text-amber-400 shrink-0" />
                  <a
                    href={`tel:${student.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {student.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-amber-400 shrink-0" />
                  <span>{student.location}</span>
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
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-blue-600 hover:text-white rounded-lg border border-slate-700/80 transition-all duration-200 shadow-xs hover:border-blue-500 hover:-translate-y-0.5"
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
                  onClick={() => scrollToSection("wordpress")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <TrendingUp size={16} />
                  <span>Explore Projects (13 Modules)</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  <Printer size={16} className="text-amber-400" />
                  <span>Save / Print Portfolio</span>
                </button>
              </div>
            </div>

            {/* Right Column (5 cols) - LARGER AVATAR PHOTO CARD ("INCREASE THE SIZE") */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                {/* Luminous Glow Ring */}
                <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 via-blue-500 to-indigo-600 opacity-60 blur-xs" />

                {/* Main Card Body */}
                <div className="relative bg-slate-900 rounded-2xl p-2 border border-slate-700/80 shadow-2xl overflow-hidden group">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/4.2] sm:aspect-square object-cover rounded-xl transition-transform duration-500 group-hover:scale-102"
                  />

                  {/* Floating Glass Bottom Bar Over Photo */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500 text-blue-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} className="text-amber-400" />
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
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
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
                  <span className="text-amber-400 font-mono font-bold">100% Practical Coursework</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stat Highlights Grid (EXACT FROM REFERENCE) */}
          <div className="mt-14 pt-8 border-t border-slate-800/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {(student.highlights || []).map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/70 rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <div className="text-xs text-slate-400 font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono group-hover:text-amber-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY 13-MODULE NAVIGATION SLIDER (FULL WIDTH STRETCHED) */}
      <nav id="portfolio-module-slider-nav" className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md transition-all">
        <div className="w-full px-2 sm:px-4 flex items-center space-x-1.5">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            aria-label="Scroll modules left"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer transition-colors shadow-2xs border border-slate-200"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Module Tabs Slider (100% Edge-to-Edge Stretched) */}
          <div
            id="portfolio-module-slider"
            className="flex items-center space-x-2.5 py-3 overflow-x-auto scroll-smooth no-scrollbar w-full flex-1"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center space-x-2 transition-all cursor-pointer shrink-0 shadow-2xs ${
                    isActive
                      ? "text-white shadow-sm ring-2 ring-blue-500/20"
                      : "text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/90 border border-slate-200/60"
                  }`}
                  style={isActive ? { backgroundColor: theme.primary } : {}}
                >
                  <Icon size={14} />
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
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer transition-colors shadow-2xs border border-slate-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* 4. MAIN ALL 13 MODULES CONTENT SHOWCASE */}
      <main className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* MODULE 1: WORDPRESS WEB DESIGN */}
        {moduleVisibility.wordpress !== false && (
          <section id="wordpress" className="space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    01. WordPress Web Design
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Custom themes, Elementor Pro layouts, speed optimization & WooCommerce checkouts
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                {modules.wordpress.length} Client Builds
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.wordpress.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1">
                      <span>Speed {proj.speedScore}/100</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                        {proj.clientType}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <ul className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                        {proj.keyFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start">
                            <span className="text-emerald-500 mr-1.5 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 w-full py-2 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <span>Explore Live Website Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MODULE 2: CANVA DESIGN & VIDEO */}
        {moduleVisibility.canva !== false && (
          <section id="canva" className="space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Palette size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    02. Canva Design & Video
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Viral Instagram carousels, ad creatives, brand style guides & video reels
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.canva.designs.map((design) => (
                <div
                  key={design.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
                >
                  <div className="h-44 rounded-xl overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                      {design.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {design.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {design.conceptNote}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500 font-medium">
                    <span>Reach: <strong className="text-slate-800">{design.impressionsAchieved}</strong></span>
                    <span>Saves: <strong className="text-slate-800">{design.savesCount}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MODULE 3: SOCIAL MEDIA ORGANIC */}
        {moduleVisibility.socialOrganic !== false && (
          <section id="socialOrganic" className="space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Share2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    03. Social Media Organic
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Organic audience building, viral Reels frameworks, and engagement growth
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {modules.socialOrganic.map((so) => (
                <div
                  key={so.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase text-blue-600">
                        {so.platform}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {so.handle}
                      </h3>
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg">
                      {so.growthPercent} Growth
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">SCALE</span>
                      <span className="font-extrabold text-slate-900">{so.currentFollowers.toLocaleString()} Followers</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">ENGAGEMENT</span>
                      <span className="font-extrabold text-slate-900">{so.avgEngagementRate}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <span className="font-bold text-slate-700 block">Viral Case Study:</span>
                    <p className="italic bg-amber-50/70 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                      "{so.viralCaseStudy}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MODULE 4: META ADS (ACCORDIONS) */}
        {moduleVisibility.socialMarketing !== false && (
          <section id="socialMarketing" className="space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    04. Meta Ads (Accordions)
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Collapsible Advantage+ Shopping campaigns, CPA optimization & ROAS scaling
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {modules.socialMarketing.map((ad, idx) => {
                const isOpen = openMetaIdx === idx;
                return (
                  <div
                    key={ad.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => setOpenMetaIdx(isOpen ? -1 : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 flex-1 mr-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0"
                          style={{ backgroundColor: theme.primary }}
                        >
                          #{idx + 1}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                            {ad.campaignName}
                          </h3>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {ad.objective}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg shrink-0">
                          {ad.roas} ROAS
                        </span>
                        {isOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div className="p-5 pt-0 border-t border-slate-100 space-y-4 mt-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3.5 rounded-xl text-center text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">AD SPEND</span>
                            <span className="font-black text-slate-900">{ad.adSpend}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">REVENUE</span>
                            <span className="font-black text-emerald-600">{ad.revenueGenerated}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">CPA</span>
                            <span className="font-black text-slate-900">{ad.cpa}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block">HOOK RATE</span>
                            <span className="font-black text-blue-600">{ad.hookRatePct}%</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                          <strong className="text-blue-900">Optimization Takeaway: </strong>{ad.keyLearning}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* MODULE 5: GOOGLE ADS (ACCORDIONS) */}
        {moduleVisibility.googleAds !== false && (
          <section id="googleAds" className="space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Search size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    05. Google Ads (Accordions)
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Collapsible Search & PMax campaigns, Quality Scores (9/10) & CPC metrics
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {modules.googleAds.map((gads, idx) => {
                const isOpen = openGoogleIdx === idx;
                return (
                  <div
                    key={gads.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => setOpenGoogleIdx(isOpen ? -1 : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 flex-1 mr-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0"
                          style={{ backgroundColor: theme.primary }}
                        >
                          #{idx + 1}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                            {gads.campaignType}
                          </h3>
                          <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">
                            {gads.industry}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg shrink-0">
                          QS: {gads.qualityScoreAvg}
                        </span>
                        {isOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div className="p-5 pt-0 border-t border-slate-100 space-y-4 mt-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3.5 rounded-xl text-center text-xs">
                          <div>
                            <span className="text-[9px] text-slate-400 font-bold block">CTR</span>
                            <span className="font-extrabold text-slate-900">{gads.ctrPct}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 font-bold block">AVG CPC</span>
                            <span className="font-extrabold text-slate-900">{gads.cpcAvg}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 font-bold block">CONVERSIONS</span>
                            <span className="font-extrabold text-emerald-600">{gads.conversions}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 font-bold block">BUDGET</span>
                            <span className="font-extrabold text-slate-900">{gads.monthlyBudget}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                            Target Search Terms:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {gads.topSearchTerms.map((term, tIdx) => (
                              <span
                                key={tIdx}
                                className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold"
                              >
                                "{term}"
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* MODULE 6: SEO & LOCAL GBP */}
        {moduleVisibility.seo !== false && (
          <section id="seo" className="space-y-6 scroll-mt-28">
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
                    06. SEO & Local GBP
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Technical audits, Core Web Vitals optimization, Top 10 rankings & Google Map Pack
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
                <span>Rankings Audit Report: {modules.seo.audit.organicTrafficGrowth} Organic Traffic Growth</span>
                <span>DA: {modules.seo.audit.domainAuthorityBefore} → {modules.seo.audit.domainAuthorityAfter}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Target Keyword</th>
                      <th className="py-3 px-4">Monthly Search Volume</th>
                      <th className="py-3 px-4">Initial Rank</th>
                      <th className="py-3 px-4">Current Google Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {modules.seo.keywords.map((kw, kIdx) => (
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
          </section>
        )}

        {/* MODULE 7: DIGITAL PLANNING DECK */}
        {moduleVisibility.digitalPlanning !== false && (
          <section id="digitalPlanning" className="space-y-6 scroll-mt-28">
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
                    07. Digital Planning Deck
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Executive brand audit decks, competitor analysis & 3-month growth roadmap
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modules.digitalPlanning.brandAuditDeck.map((slide, sIdx) => (
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
          </section>
        )}

        {/* MODULE 8: INFLUENCER MARKETING */}
        {moduleVisibility.influencerMarketing !== false && (
          <section id="influencerMarketing" className="space-y-6 scroll-mt-28">
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
                    08. Influencer Marketing
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Creator tiering, contract deliverables, cost-per-engagement & revenue attribution
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.influencerMarketing.map((inf) => (
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
          </section>
        )}

        {/* MODULE 9: SHOPIFY STORE */}
        {moduleVisibility.shopify !== false && (
          <section id="shopify" className="space-y-6 scroll-mt-28">
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
                    09. Shopify Store
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
                  {modules.shopify.croFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <span className="text-emerald-500 mr-2 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* MODULE 10: VIDEO EDITING */}
        {moduleVisibility.videoEditing !== false && (
          <section id="videoEditing" className="space-y-6 scroll-mt-28">
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
                    10. Video Editing
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Short-form viral hook structures, dynamic kinetic typography, and motion ad cuts
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.videoEditing.map((vid) => (
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
          </section>
        )}

        {/* MODULE 11: DROPSHIPPING STORE */}
        {moduleVisibility.dropshipping !== false && (
          <section id="dropshipping" className="space-y-6 scroll-mt-28">
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
                    11. Dropshipping Store
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
          </section>
        )}

        {/* MODULE 12: AI MARKETING APP */}
        {moduleVisibility.aiApp !== false && (
          <section id="aiApp" className="space-y-6 scroll-mt-28">
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
                    12. AI Marketing App
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
          </section>
        )}

        {/* MODULE 13: PERFORMANCE MARKETING */}
        {moduleVisibility.performanceMarketing !== false && (
          <section id="performanceMarketing" className="space-y-6 scroll-mt-28">
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
                    13. Performance Marketing
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
                    {modules.performanceMarketing.clientIndustry}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                    {modules.performanceMarketing.budgetScaled}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400">
                    {modules.performanceMarketing.overallRoas}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    Blended Campaign ROAS
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">BLENDED CAC</span>
                  <span className="font-bold text-white">{modules.performanceMarketing.blendedCac}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">ESTIMATED LTV</span>
                  <span className="font-bold text-white">{modules.performanceMarketing.ltvEstimate}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 font-bold block">TIMEFRAME</span>
                  <span className="font-bold text-white">{modules.performanceMarketing.timeframe}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Scaling Strategy: </strong>
                {modules.performanceMarketing.scalingResults}
              </p>
            </div>
          </section>
        )}
      </main>

      {/* 5. FOOTER */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs"
              style={{ backgroundColor: theme.primary }}
            >
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-sm text-white">{student.name}</div>
              <div className="text-xs text-slate-400">Operating Media Certified Digital Marketer</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center sm:text-right">
            <div>© {new Date().getFullYear()} {student.name}. All Rights Reserved.</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Designed for Operating Media Graduation & Hiring Partner Reviews
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPreview;
