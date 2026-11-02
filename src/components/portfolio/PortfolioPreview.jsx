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
  ArrowUp,
  Award,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

export const PortfolioPreview = ({
  portfolioData,
  theme,
  moduleVisibility = {},
  onOpenCustomizer,
}) => {
  const { student, modules } = portfolioData;
  const [activeTab, setActiveTab] = useState("wordpress");

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollSlider = (direction) => {
    const slider = document.getElementById("portfolio-module-slider");
    if (slider) {
      const scrollAmount = direction === "left" ? -280 : 280;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "wordpress", label: "01. WordPress", icon: Globe },
    { id: "canva", label: "02. Canva Creatives", icon: Palette },
    { id: "socialOrganic", label: "03. Social Organic", icon: Share2 },
    { id: "socialMarketing", label: "04. Meta Ads", icon: TrendingUp },
    { id: "googleAds", label: "05. Google Ads", icon: Search },
    { id: "seo", label: "06. SEO & GBP", icon: BarChart3 },
    { id: "digitalPlanning", label: "07. Brand Strategy", icon: Briefcase },
    { id: "influencerMarketing", label: "08. Influencers", icon: Users },
    { id: "shopify", label: "09. Shopify E-Comm", icon: ShoppingBag },
    { id: "videoEditing", label: "10. Video Editing", icon: Video },
    { id: "dropshipping", label: "11. Dropshipping", icon: Box },
    { id: "aiApp", label: "12. AI Marketing", icon: Cpu },
    { id: "performanceMarketing", label: "13. Performance Scale", icon: Zap },
  ].filter((item) => moduleVisibility[item.id] !== false);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. TOPBAR HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-xs"
              style={{ backgroundColor: theme.primary }}
            >
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                  {student.name}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Graduate Portfolio
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                Operating Media Certified Digital Marketer
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: theme.primary }}
              >
                <SlidersHorizontal size={14} />
                <span>Customize Bio & Theme</span>
              </button>
            )}
            <a
              href={`mailto:${student.email}`}
              className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Mail size={13} />
              <span>Hire Marketer</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className={`py-12 sm:py-16 text-white bg-gradient-to-br ${theme.heroGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Bio & Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <Sparkles size={13} style={{ color: theme.primary }} />
                <span>Operating Media Verified Portfolio Showcase</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {student.name}
              </h1>

              <div
                className="text-lg sm:text-xl font-bold"
                style={{ color: theme.primary }}
              >
                {student.headline}
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
                {student.bio}
              </p>

              {/* Contact meta row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  <Mail size={12} style={{ color: theme.primary }} />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  <Phone size={12} style={{ color: theme.primary }} />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  <MapPin size={12} style={{ color: theme.primary }} />
                  <span>{student.location}</span>
                </div>
              </div>
            </div>

            {/* Right: Avatar Photo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 shadow-2xl p-1 bg-white/10 backdrop-blur-md"
                  style={{ borderColor: theme.primary }}
                >
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg flex items-center space-x-1 text-[11px] font-black uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  <span>Open for Roles</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stat Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-8 border-t border-white/15">
            {student.highlights.map((stat, sIdx) => (
              <div
                key={sIdx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15"
              >
                <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300">
                  {stat.label}
                </div>
                <div
                  className="text-xl sm:text-2xl font-black mt-1"
                  style={{ color: theme.primary }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STICKY MODULE NAVIGATION SLIDER (STRETCHED FULL WIDTH - NOT CONSTRAINED BY PARENT) */}
      <nav className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md">
        <div className="w-full px-2 sm:px-4 flex items-center space-x-1.5">
          {/* Scroll Left Indicator */}
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
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
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

          {/* Scroll Right Indicator */}
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

      {/* 4. MAIN MODULE CONTENT SHOWCASE (WIDE & EXPANDED) */}
      <main className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* MODULE 1: WORDPRESS */}
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
                    01. WordPress & CMS Architecture
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

        {/* MODULE 2: CANVA & CREATIVES */}
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
                    02. Canva & Visual Assets
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
                    03. Social Media Organic Engine
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

        {/* MODULE 4: META ADS */}
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
                    04. Meta Ads & Paid Acquisition
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Advantage+ Shopping campaigns, full-funnel media buying, CPA optimization & ROAS scaling
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.socialMarketing.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 flex-1 mr-2">
                      {ad.campaignName}
                    </h3>
                    <div
                      className="px-2.5 py-1 rounded-lg text-white font-black text-xs shrink-0"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {ad.roas} ROAS
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">SPEND</span>
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
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                    <strong>Growth Insight: </strong>{ad.keyLearning}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MODULE 5: GOOGLE ADS */}
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
                    05. Google Ads (Search & PMax)
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    SKAG architecture, High Quality Scores (9/10), Shopping feeds, and Negative keyword lists
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.googleAds.map((gads) => (
                <div
                  key={gads.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                      {gads.industry}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {gads.campaignType}
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl text-center text-xs">
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
                      <span className="text-[9px] text-slate-400 font-bold block">QS</span>
                      <span className="font-black text-blue-600">{gads.qualityScoreAvg}</span>
                    </div>
                  </div>

                  <div className="text-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                      Target Search Terms:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {gads.topSearchTerms.map((term, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold"
                        >
                          "{term}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MODULE 6: SEO & LOCAL MAP PACK */}
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
                    06. SEO & Google Business Profile
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

        {/* MODULE 7: SHOPIFY E-COMMERCE */}
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
                    09. Shopify E-Commerce Store
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

        {/* MODULE 8: PERFORMANCE MARKETING */}
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
                    13. Performance Marketing & Scaling
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
