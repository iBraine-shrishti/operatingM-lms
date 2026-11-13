import React from "react";
import {
  Printer,
  Mail,
  Phone,
  MapPin,
  Award,
  Trash2,
  Plus,
  TrendingUp,
  Eye,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { renderSocialIcon } from "./previewShared";
import logoHorizontalImg from "../../../assets/logo-horizontal.png";

export const PortfolioHeroSection = ({
  student,
  theme,
  isEditable,
  isStandalone,
  navItems,
  portfolioData,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  onOpenCustomizer,
  onOpenPdfExport,
  onOpenContact,
  scrollToSection,
}) => {
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

  const openAvatarMedia = () => {
    if (onOpenMedia) {
      onOpenMedia({
        type: "image",
        moduleNumber: "DOSSIER",
        moduleTitle: "Executive Profile",
        category: "Curriculum Verified Student Dossier",
        title: student.name || "Student Dossier",
        imageUrl: student.avatarUrl,
        clientType: student.location || "Mumbai, India",
        description: student.bio || "Student Profile & Curriculum Verified Dossier",
        metrics: (student.highlights || []).map((h) => ({
          label: h.label,
          value: h.value,
          highlight: "emerald",
        })),
        tags: [student.email, student.showPhone ? student.phone : null, student.location].filter(Boolean),
        liveUrl: student.portfolioUrl || (student.socials && student.socials[0]?.url) || "",
        currentIndex: 0,
        itemsList: [student],
        navigateFn: null,
      });
    }
  };

  const setIsPdfExportOpen = (val) => {
    if (val && onOpenPdfExport) onOpenPdfExport();
  };

  const openImageModal = (title, currentUrl, isAvatar, onSave) => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave);
    }
  };

  return (
      <div id="portfolio-section-hero" className="w-full">
      <header className="relative z-20 bg-white border-b border-slate-200 shadow-2xs">
        <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 min-h-16 py-2.5 flex items-center justify-between gap-3">
          {/* Left Brand & Institutional Accreditation */}
          <div className="flex items-center space-x-3 sm:space-x-3.5 shrink-0 min-w-0">
            {/* Operating Media Academy Logo (Subtle & Professional) */}
            <a
              href="https://operatingmedia.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pr-3 border-r border-slate-200 shrink-0 hover:opacity-85 transition-opacity"
              title="Operating Media Digital Marketing Academy"
            >
              <img
                src={logoHorizontalImg}
                alt="Operating Media"
                className="h-6 sm:h-7 w-auto object-contain shrink-0"
              />
            </a>

            {/* Student Monogram Badge */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-xs tracking-wider shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              {student.name.split(" ").map((n) => n[0]).slice(0, 2).join("") || "DM"}
            </div>
            <div className="truncate shrink min-w-0">
              <div className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight truncate">
                <EditableText
                  value={student.name}
                  onChange={(val) => handleUpdateStudentField("name", val)}
                />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight hidden sm:flex items-center gap-1.5">
                <span>Digital Marketing Portfolio</span>
                <span className="text-slate-300">•</span>
                <span className="text-blue-600 font-semibold">Operating Media Verified</span>
              </div>
            </div>
          </div>

          {/* Center Links (Only displayed in standalone full-window mode on wide screens; hidden in side preview to avoid overlapping) */}
          {isStandalone && (
            <nav className="hidden 2xl:flex items-center space-x-5 text-xs font-semibold text-slate-600 shrink min-w-0 overflow-hidden">
              {navItems.slice(0, 7).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-blue-600 transition-colors cursor-pointer truncate max-w-[140px] whitespace-nowrap"
                >
                  {item.label.replace(/^\d+\.\s*/, "")}
                </button>
              ))}
            </nav>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsPdfExportOpen(true)}
              className="inline-flex items-center p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer shadow-2xs"
              title="Save / Print Portfolio as PDF"
            >
              <Printer size={15} />
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 sm:py-2 text-xs font-bold text-slate-950 rounded-lg transition-all shadow-xs cursor-pointer hover:brightness-105 active:scale-95"
              style={{ backgroundColor: theme.primary }}
              title="Get in Touch with candidate"
            >
              <Mail size={13} />
              <span>Get in Touch</span>
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
                {Boolean(student.showPhone && student.phone) && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={14} style={{ color: theme.primary }} className="shrink-0" />
                    <EditableText
                      value={student.phone}
                      onChange={(val) => handleUpdateStudentField("phone", val)}
                      className="hover:text-white transition-colors"
                    />
                  </div>
                )}
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

                <button
                  type="button"
                  onClick={() => setIsPdfExportOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  <Printer size={16} style={{ color: theme.primary }} />
                  <span>Save / Print Portfolio</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all cursor-pointer hover:border-slate-500"
                  title="Open direct contact and inquiry dialog"
                >
                  <Mail size={16} style={{ color: theme.primary }} />
                  <span>Get in Touch</span>
                </button>
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
                  <div
                    className="relative overflow-hidden rounded-xl cursor-pointer group/avatar"
                    onClick={() => openAvatarMedia()}
                    title="Click to inspect student dossier & photo in high-resolution"
                  >
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[4/5] max-h-[460px] object-cover rounded-xl transition-transform duration-500 group-hover/avatar:scale-102"
                    />

                    {/* Hover Inspect Indicator */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-2 pointer-events-none">
                      <div className="p-3 rounded-full bg-blue-600/90 text-white shadow-xl backdrop-blur-xs flex items-center justify-center">
                        <Eye size={20} />
                      </div>
                      <span className="text-xs font-bold tracking-wide">Inspect Profile Dossier</span>
                      <span className="text-[10px] text-slate-300">View complete credentials & bio</span>
                    </div>

                    {/* Change Photo Button in Edit Mode */}
                    {isEditable && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openImageModal(
                            "Update Profile Photo",
                            student.avatarUrl,
                            true,
                            (newUrl) => handleUpdateStudentField("avatarUrl", newUrl)
                          );
                        }}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/90 hover:bg-blue-600 text-white shadow-lg backdrop-blur-md transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold z-10 border border-slate-700/80"
                        title="Upload or change profile photo"
                      >
                        <Camera size={13} />
                        <span className="text-[11px]">Change</span>
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
      </div>
  );
};
