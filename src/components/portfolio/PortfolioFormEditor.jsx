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
                {(student.highlights || []).map((hl, hIdx) => (
                  <div key={hIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                      Stat #{hIdx + 1}
                    </span>
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
        {matchesFilter("wordpress", "Module 01: WordPress Web Design & Development") && (
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
                    3. Module 01 · WordPress Web Design
                  </div>
                  <div className="text-[11px] text-slate-500">
                    2 Client Builds, PageSpeed metrics, WooCommerce checkout features
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
                {(modules.wordpress || []).map((proj, pIdx) => (
                  <div key={proj.id || pIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">Client Build #{pIdx + 1}</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Speed {proj.speedScore}/100
                      </span>
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
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Client Industry Tag</label>
                        <input
                          type="text"
                          value={proj.clientType || ""}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], clientType: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-amber-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description || ""}
                        onChange={(e) => {
                          const updated = [...modules.wordpress];
                          updated[pIdx] = { ...updated[pIdx], description: e.target.value };
                          handleModuleDataChange("wordpress", updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Live URL</label>
                        <input
                          type="text"
                          value={proj.liveUrl || ""}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], liveUrl: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Speed Score (0-100)</label>
                        <input
                          type="number"
                          value={proj.speedScore || 95}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], speedScore: Number(e.target.value) };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold"
                        />
                      </div>
                    </div>

                    {/* Screenshot Upload / URL */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Screenshot Image</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={proj.imageUrl || ""}
                          onChange={(e) => {
                            const updated = [...modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], imageUrl: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-[11px]"
                          placeholder="Image URL or upload below..."
                        />
                        <label className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer shrink-0">
                          <Upload size={12} />
                          <span>Upload</span>
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
                      </div>
                    </div>

                    {/* Core Implementations */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Core Technical Implementations (4 items)</label>
                      {(proj.keyFeatures || []).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-blue-600 shrink-0" />
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => {
                              const updated = [...modules.wordpress];
                              const feats = [...(updated[pIdx].keyFeatures || [])];
                              feats[fIdx] = e.target.value;
                              updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: MODULE 02 - CANVA GRAPHIC DESIGN & VIDEO REELS */}
        {matchesFilter("canva", "Module 02: Canva Graphic Design & Video Creatives") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("canva")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-600 text-white flex items-center justify-center font-bold text-xs">
                  <Palette size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    4. Module 02 · Canva Design & Motion Video Ads
                  </div>
                  <div className="text-[11px] text-slate-500">
                    4 Graphic showcases (carousels, banners) & 2 motion video reels
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
                {/* 4 Graphic Design Showcases */}
                <div className="space-y-3">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Box size={14} className="text-amber-500" />
                    <span>Graphic Design Showcases (4 Items)</span>
                  </div>

                  {((modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []))).map((design, dIdx) => (
                    <div key={design.id || dIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 text-xs">Graphic #{dIdx + 1}</span>
                        <input
                          type="text"
                          value={design.category || "Design"}
                          onChange={(e) => {
                            const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
                            const updated = [...current];
                            updated[dIdx] = { ...updated[dIdx], category: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                          }}
                          className="px-2 py-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 rounded border border-amber-200 w-28 text-right"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Asset Title</label>
                          <input
                            type="text"
                            value={design.title || ""}
                            onChange={(e) => {
                              const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
                              const updated = [...current];
                              updated[dIdx] = { ...updated[dIdx], title: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Dimensions</label>
                          <input
                            type="text"
                            value={design.dimensions || ""}
                            onChange={(e) => {
                              const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
                              const updated = [...current];
                              updated[dIdx] = { ...updated[dIdx], dimensions: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Description</label>
                        <input
                          type="text"
                          value={design.description || ""}
                          onChange={(e) => {
                            const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
                            const updated = [...current];
                            updated[dIdx] = { ...updated[dIdx], description: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={design.imageUrl || ""}
                          onChange={(e) => {
                            const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
                            const updated = [...current];
                            updated[dIdx] = { ...updated[dIdx], imageUrl: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-[11px]"
                          placeholder="Image URL..."
                        />
                        <label className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer shrink-0">
                          <Upload size={12} />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (url) => {
                                const current = modules.canva?.designs || (Array.isArray(modules.canva) ? modules.canva : []);
                                const updated = [...current];
                                updated[dIdx] = { ...updated[dIdx], imageUrl: url };
                                handleModuleDataChange("canva", { ...modules.canva, designs: updated });
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2 Motion Video Ads */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Video size={14} className="text-blue-600" />
                    <span>Motion & Short-Form Video Ads (2 Items)</span>
                  </div>

                  {(modules.canva?.videos || []).map((video, vIdx) => (
                    <div key={video.id || vIdx} className="p-3 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-xs">Video #{vIdx + 1}</span>
                        <input
                          type="text"
                          value={video.duration || "0:30"}
                          onChange={(e) => {
                            const updated = [...modules.canva.videos];
                            updated[vIdx] = { ...updated[vIdx], duration: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                          }}
                          className="px-2 py-0.5 text-[10px] font-mono text-amber-300 bg-slate-800 rounded border border-slate-700 w-20 text-right"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Video Title</label>
                          <input
                            type="text"
                            value={video.title || ""}
                            onChange={(e) => {
                              const updated = [...modules.canva.videos];
                              updated[vIdx] = { ...updated[vIdx], title: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Format</label>
                          <input
                            type="text"
                            value={video.format || ""}
                            onChange={(e) => {
                              const updated = [...modules.canva.videos];
                              updated[vIdx] = { ...updated[vIdx], format: e.target.value };
                              handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-amber-400 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Opening Hook Strategy</label>
                        <textarea
                          rows={2}
                          value={video.hook || ""}
                          onChange={(e) => {
                            const updated = [...modules.canva.videos];
                            updated[vIdx] = { ...updated[vIdx], hook: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-200 italic"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={video.thumbnailUrl || ""}
                          onChange={(e) => {
                            const updated = [...modules.canva.videos];
                            updated[vIdx] = { ...updated[vIdx], thumbnailUrl: e.target.value };
                            handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-300 font-mono text-[11px]"
                          placeholder="Thumbnail URL..."
                        />
                        <label className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-amber-400 font-semibold text-[11px] flex items-center gap-1 cursor-pointer shrink-0">
                          <Upload size={12} />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (url) => {
                                const updated = [...modules.canva.videos];
                                updated[vIdx] = { ...updated[vIdx], thumbnailUrl: url };
                                handleModuleDataChange("canva", { ...modules.canva, videos: updated });
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 5: MODULE 03 - SMO PROFILE OPTIMIZATION */}
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
                    Instagram & LinkedIn profile funnels, bio frameworks & content pillars
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
                {(modules.socialOrganic || []).map((profile, sIdx) => (
                  <div key={profile.id || sIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">{profile.platform} Profile Teardown</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {profile.growthRate}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Niche / Target Audience</label>
                        <input
                          type="text"
                          value={profile.niche || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], niche: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    {/* Followers Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Starting Baseline</label>
                        <input
                          type="text"
                          value={profile.beforeFollowers || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], beforeFollowers: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Post-Optimization</label>
                        <input
                          type="text"
                          value={profile.afterFollowers || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], afterFollowers: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-blue-700"
                        />
                      </div>
                    </div>

                    {/* Bio Strategy */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Optimized Bio & CTA Strategy</label>
                      <textarea
                        rows={2}
                        value={profile.bioStrategy || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialOrganic];
                          updated[sIdx] = { ...updated[sIdx], bioStrategy: e.target.value };
                          handleModuleDataChange("socialOrganic", updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white italic text-slate-700"
                      />
                    </div>

                    {/* Screenshot Upload */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Profile Grid Screenshot</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={profile.screenshotUrl || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialOrganic];
                            updated[sIdx] = { ...updated[sIdx], screenshotUrl: e.target.value };
                            handleModuleDataChange("socialOrganic", updated);
                          }}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-[11px]"
                          placeholder="Image URL..."
                        />
                        <label className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer shrink-0">
                          <Upload size={12} />
                          <span>Upload</span>
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
                      </div>
                    </div>

                    {/* Campaign Impact */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Student Campaign Impact</label>
                      <textarea
                        rows={2}
                        value={profile.resultsSummary || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialOrganic];
                          updated[sIdx] = { ...updated[sIdx], resultsSummary: e.target.value };
                          handleModuleDataChange("socialOrganic", updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 6: MODULE 04 - META PAID ADS ACCORDIONS */}
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
                    6. Module 04 · Meta Paid Ads Accordions (3 Campaigns)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Advantage+ Shopping, Lead Generation & Retargeting with verified KPIs
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
                {(modules.socialMarketing || []).map((ad, aIdx) => (
                  <div key={ad.id || aIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">Campaign #{aIdx + 1}</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {ad.metrics?.roasOrCpa}
                      </span>
                    </div>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Campaign Type</label>
                        <input
                          type="text"
                          value={ad.campaignType || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], campaignType: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium text-blue-600 font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Objective</label>
                        <input
                          type="text"
                          value={ad.objective || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], objective: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Summary Teardown</label>
                      <textarea
                        rows={2}
                        value={ad.summary || ""}
                        onChange={(e) => {
                          const updated = [...modules.socialMarketing];
                          updated[aIdx] = { ...updated[aIdx], summary: e.target.value };
                          handleModuleDataChange("socialMarketing", updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Audience & Targeting</label>
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
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Budget & Flight</label>
                        <input
                          type="text"
                          value={ad.budgetSpend || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], budgetSpend: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>

                    {/* Screenshot Upload */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Ad Creative Screenshot</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={ad.screenshotUrl || ""}
                          onChange={(e) => {
                            const updated = [...modules.socialMarketing];
                            updated[aIdx] = { ...updated[aIdx], screenshotUrl: e.target.value };
                            handleModuleDataChange("socialMarketing", updated);
                          }}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-[11px]"
                          placeholder="Image URL..."
                        />
                        <label className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer shrink-0">
                          <Upload size={12} />
                          <span>Upload</span>
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
                      </div>
                    </div>

                    {/* KPIs */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Key Performance Indicators</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Outbound CTR</span>
                          <input
                            type="text"
                            value={ad.metrics?.ctr || ""}
                            onChange={(e) => {
                              const updated = [...modules.socialMarketing];
                              updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, ctr: e.target.value } };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Avg CPC</span>
                          <input
                            type="text"
                            value={ad.metrics?.cpc || ""}
                            onChange={(e) => {
                              const updated = [...modules.socialMarketing];
                              updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, cpc: e.target.value } };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-amber-700 block">ROAS / CPA</span>
                          <input
                            type="text"
                            value={ad.metrics?.roasOrCpa || ""}
                            onChange={(e) => {
                              const updated = [...modules.socialMarketing];
                              updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, roasOrCpa: e.target.value } };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-amber-300 bg-amber-50 font-mono font-bold text-amber-900"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Total Conv.</span>
                          <input
                            type="text"
                            value={ad.metrics?.conversions || ""}
                            onChange={(e) => {
                              const updated = [...modules.socialMarketing];
                              updated[aIdx] = { ...updated[aIdx], metrics: { ...updated[aIdx].metrics, conversions: e.target.value } };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 7: MODULE 05 - GOOGLE ADS CAMPAIGNS */}
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
                    7. Module 05 · Google Ads Campaigns (3 Search & PMax)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Responsive Search Ad copy (H1-H3), match types, and Quality Scores
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
                {(modules.googleAds || []).map((gad, gIdx) => (
                  <div key={gad.id || gIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs">Google Campaign #{gIdx + 1}</span>
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {gad.metrics?.roas}
                      </span>
                    </div>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Campaign Type</label>
                        <input
                          type="text"
                          value={gad.campaignType || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], campaignType: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium text-blue-600 font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Quality Score / Rating</label>
                        <input
                          type="text"
                          value={gad.qualityScore || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], qualityScore: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-emerald-700 font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Campaign Strategy & Execution</label>
                      <textarea
                        rows={2}
                        value={gad.summary || ""}
                        onChange={(e) => {
                          const updated = [...modules.googleAds];
                          updated[gIdx] = { ...updated[gIdx], summary: e.target.value };
                          handleModuleDataChange("googleAds", updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    {/* RSA Headlines */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Tested RSA Headlines (H1 - H3)</label>
                      {(gad.headlines || []).map((head, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-blue-600 w-6">H{hIdx + 1}:</span>
                          <input
                            type="text"
                            value={head}
                            onChange={(e) => {
                              const updated = [...modules.googleAds];
                              const heads = [...(updated[gIdx].headlines || [])];
                              heads[hIdx] = e.target.value;
                              updated[gIdx] = { ...updated[gIdx], headlines: heads };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Screenshot Upload */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Ad Preview / Screenshot Image</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={gad.screenshotUrl || ""}
                          onChange={(e) => {
                            const updated = [...modules.googleAds];
                            updated[gIdx] = { ...updated[gIdx], screenshotUrl: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-[11px]"
                          placeholder="Image URL..."
                        />
                        <label className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer shrink-0">
                          <Upload size={12} />
                          <span>Upload</span>
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
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block">Verified Google Ads Metrics</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Impressions</span>
                          <input
                            type="text"
                            value={gad.metrics?.impressions || ""}
                            onChange={(e) => {
                              const updated = [...modules.googleAds];
                              updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, impressions: e.target.value } };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">CTR</span>
                          <input
                            type="text"
                            value={gad.metrics?.ctr || ""}
                            onChange={(e) => {
                              const updated = [...modules.googleAds];
                              updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, ctr: e.target.value } };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white font-mono text-blue-700 font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Avg CPC</span>
                          <input
                            type="text"
                            value={gad.metrics?.avgCpc || ""}
                            onChange={(e) => {
                              const updated = [...modules.googleAds];
                              updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, avgCpc: e.target.value } };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Conversions</span>
                          <input
                            type="text"
                            value={gad.metrics?.conversions || ""}
                            onChange={(e) => {
                              const updated = [...modules.googleAds];
                              updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, conversions: e.target.value } };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-white font-mono text-emerald-700"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-amber-800 block">ROAS</span>
                          <input
                            type="text"
                            value={gad.metrics?.roas || ""}
                            onChange={(e) => {
                              const updated = [...modules.googleAds];
                              updated[gIdx] = { ...updated[gIdx], metrics: { ...updated[gIdx].metrics, roas: e.target.value } };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 text-[11px] rounded-lg border border-amber-300 bg-amber-50 font-mono font-bold text-amber-900"
                          />
                        </div>
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
                    8. Module 06 · SEO & Local GBP Optimization
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Organic rankings, search volume, keyword difficulty & audit metrics
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.seo ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.seo && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div className="font-bold text-slate-800 text-xs">Target Keywords Portfolio</div>
                {((modules.seo?.keywords || [])).slice(0, 4).map((kw, kIdx) => (
                  <div key={kIdx} className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <input
                      type="text"
                      value={kw.keyword}
                      onChange={(e) => {
                        const updated = [...modules.seo.keywords];
                        updated[kIdx] = { ...updated[kIdx], keyword: e.target.value };
                        handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                      }}
                      className="px-2 py-1 text-xs rounded bg-white border border-slate-200 font-medium"
                      placeholder="Keyword"
                    />
                    <input
                      type="text"
                      value={kw.volume}
                      onChange={(e) => {
                        const updated = [...modules.seo.keywords];
                        updated[kIdx] = { ...updated[kIdx], volume: e.target.value };
                        handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                      }}
                      className="px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono"
                      placeholder="Volume"
                    />
                    <input
                      type="text"
                      value={kw.currentRank}
                      onChange={(e) => {
                        const updated = [...modules.seo.keywords];
                        updated[kIdx] = { ...updated[kIdx], currentRank: e.target.value };
                        handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                      }}
                      className="px-2 py-1 text-xs rounded bg-white border border-slate-200 font-mono text-emerald-700 font-bold"
                      placeholder="Rank"
                    />
                    <input
                      type="text"
                      value={kw.intent}
                      onChange={(e) => {
                        const updated = [...modules.seo.keywords];
                        updated[kIdx] = { ...updated[kIdx], intent: e.target.value };
                        handleModuleDataChange("seo", { ...modules.seo, keywords: updated });
                      }}
                      className="px-2 py-1 text-xs rounded bg-white border border-slate-200 font-medium text-slate-600"
                      placeholder="Intent"
                    />
                  </div>
                ))}
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
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <Briefcase size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    9. Module 07 · Digital Media Planning & Strategy
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Comprehensive omnichannel pitch deck & quarterly media allocation
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.digitalPlanning ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.digitalPlanning && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Brand / Pitch Title</label>
                  <input
                    type="text"
                    value={modules.digitalPlanning?.deckTitle || "Omnichannel Q3 Growth Master Plan"}
                    onChange={(e) => handleModuleDataChange("digitalPlanning", { ...modules.digitalPlanning, deckTitle: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Budget Allocation Summary</label>
                  <input
                    type="text"
                    value={modules.digitalPlanning?.budgetTotal || "₹2,500,000 Quarterly Budget"}
                    onChange={(e) => handleModuleDataChange("digitalPlanning", { ...modules.digitalPlanning, budgetTotal: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 10: MODULE 08 - INFLUENCER MARKETING */}
        {matchesFilter("influencerMarketing", "Module 08: Influencer Marketing Campaigns") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("influencerMarketing")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                  <Users size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    10. Module 08 · Influencer Marketing
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Creator rosters, tier breakdowns, engagement rates & inbound ROI
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.influencerMarketing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.influencerMarketing && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                {(modules.influencerMarketing || []).slice(0, 2).map((inf, iIdx) => (
                  <div key={iIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={inf.creatorName}
                        onChange={(e) => {
                          const updated = [...modules.influencerMarketing];
                          updated[iIdx] = { ...updated[iIdx], creatorName: e.target.value };
                          handleModuleDataChange("influencerMarketing", updated);
                        }}
                        className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                        placeholder="Creator Name"
                      />
                      <input
                        type="text"
                        value={inf.tier}
                        onChange={(e) => {
                          const updated = [...modules.influencerMarketing];
                          updated[iIdx] = { ...updated[iIdx], tier: e.target.value };
                          handleModuleDataChange("influencerMarketing", updated);
                        }}
                        className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium text-purple-700"
                        placeholder="Tier"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 11: MODULE 09 - SHOPIFY & CRO */}
        {matchesFilter("shopify", "Module 09: Shopify & E-commerce CRO") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("shopify")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  <ShoppingBag size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    11. Module 09 · Shopify & E-commerce CRO
                  </div>
                  <div className="text-[11px] text-slate-500">
                    High-converting checkout architecture & A/B conversion lifts
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.shopify ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.shopify && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Store / Brand Name</label>
                  <input
                    type="text"
                    value={modules.shopify?.storeName || ""}
                    onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, storeName: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Baseline CVR</label>
                    <input
                      type="text"
                      value={modules.shopify?.baselineCvr || "1.82%"}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, baselineCvr: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Optimized CVR</label>
                    <input
                      type="text"
                      value={modules.shopify?.optimizedCvr || "3.48% (+91% Lift)"}
                      onChange={(e) => handleModuleDataChange("shopify", { ...modules.shopify, optimizedCvr: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-emerald-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 12: MODULE 10 - SHORT FORM VIDEO EDITING */}
        {matchesFilter("videoEditing", "Module 10: Short-Form Video Editing") && (
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
                    12. Module 10 · Short-Form Video Editing
                  </div>
                  <div className="text-[11px] text-slate-500">
                    High-retention CapCut, Premiere & Canva motion cuts
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.videoEditing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.videoEditing && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Featured Video Showcase Title</label>
                  <input
                    type="text"
                    value={modules.videoEditing?.[0]?.title || "Kinetic DTC Hook Teardown"}
                    onChange={(e) => {
                      const updated = [...(modules.videoEditing || [{}])];
                      updated[0] = { ...updated[0], title: e.target.value };
                      handleModuleDataChange("videoEditing", updated);
                    }}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 13: MODULE 11 - DROPSHIPPING */}
        {matchesFilter("dropshipping", "Module 11: Dropshipping & Supply Chain") && (
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
                    13. Module 11 · Dropshipping & Supply Chain
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Winning product sourcing, supplier margins & transit velocity
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.dropshipping ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.dropshipping && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Winning Product Niche</label>
                  <input
                    type="text"
                    value={modules.dropshipping?.niche || "Smart Ergonomic Posture Wear"}
                    onChange={(e) => handleModuleDataChange("dropshipping", { ...modules.dropshipping, niche: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 14: MODULE 12 - AI MARKETING AUTOMATION */}
        {matchesFilter("aiApp", "Module 12: AI Marketing Automation & Apps") && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection("aiApp")}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs">
                  <Cpu size={14} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    14. Module 12 · AI Marketing Automation & Custom Tools
                  </div>
                  <div className="text-[11px] text-slate-500">
                    OpenAI / Claude workflows, automated direct-response copy generators
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.aiApp ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.aiApp && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Tool Name</label>
                  <input
                    type="text"
                    value={modules.aiApp?.toolName || ""}
                    onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, toolName: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">AI Models Stack</label>
                  <input
                    type="text"
                    value={modules.aiApp?.aiModelUsed || "GPT-4o + Claude 3.5 Sonnet"}
                    onChange={(e) => handleModuleDataChange("aiApp", { ...modules.aiApp, aiModelUsed: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 15: MODULE 13 - OMNICHANNEL PERFORMANCE MARKETING */}
        {matchesFilter("performanceMarketing", "Module 13: Omnichannel Performance Marketing") && (
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
                    15. Module 13 · Omnichannel Performance Marketing
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Scaled budget, blended CAC, 90-day LTV & full funnel attribution
                  </div>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openSections.performanceMarketing ? "rotate-180" : ""}`}
              />
            </button>

            {openSections.performanceMarketing && (
              <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Budget Scaled</label>
                  <input
                    type="text"
                    value={modules.performanceMarketing?.budgetScaled || "Scaled from ₹100,000/mo to ₹850,000/mo in 6 months"}
                    onChange={(e) => handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, budgetScaled: e.target.value })}
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Overall Blended ROAS</label>
                    <input
                      type="text"
                      value={modules.performanceMarketing?.overallRoas || "3.92x Blended"}
                      onChange={(e) => handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, overallRoas: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono font-bold text-amber-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Blended CAC</label>
                    <input
                      type="text"
                      value={modules.performanceMarketing?.blendedCac || "₹410 (Reduced by 28%)"}
                      onChange={(e) => handleModuleDataChange("performanceMarketing", { ...modules.performanceMarketing, blendedCac: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-mono text-emerald-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 16: MODULE SEQUENCE & SHUFFLE */}
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
