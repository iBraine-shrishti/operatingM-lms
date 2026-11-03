import React, { useState } from "react";
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
} from "lucide-react";
import { PORTFOLIO_THEMES } from "./portfolioThemes";
import { MODULES_CATALOG, DEFAULT_MODULE_ORDER } from "./portfolioData";
import { PRESET_AVATARS } from "./ImageUploadModal";

export const PortfolioFormEditor = ({
  data,
  onChange,
  theme,
  onThemeChange,
  moduleVisibility = {},
  onToggleModule,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState("theme");
  const [selectedCaseModule, setSelectedCaseModule] = useState("wordpress");
  const student = data.student;
  const moduleOrder = data.moduleOrder || DEFAULT_MODULE_ORDER;

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

  // Social link update helper
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

  // Reorder modules: Move Up
  const handleMoveModuleUp = (index) => {
    if (index === 0) return;
    const newOrder = [...moduleOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    onChange({
      ...data,
      moduleOrder: newOrder,
    });
  };

  // Reorder modules: Move Down
  const handleMoveModuleDown = (index) => {
    if (index === moduleOrder.length - 1) return;
    const newOrder = [...moduleOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    onChange({
      ...data,
      moduleOrder: newOrder,
    });
  };

  // Shuffle modules order randomly
  const handleShuffleModules = () => {
    const shuffled = [...moduleOrder].sort(() => Math.random() - 0.5);
    onChange({
      ...data,
      moduleOrder: shuffled,
    });
  };

  // Reset module sequence to standard 1 to 13
  const handleResetModuleOrder = () => {
    onChange({
      ...data,
      moduleOrder: [...DEFAULT_MODULE_ORDER],
    });
  };

  // Handle local avatar photo upload
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === "string") {
        handleStudentFieldChange("avatarUrl", dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Generic Module data updater helper
  const handleModuleDataChange = (moduleKey, updatedContent) => {
    onChange({
      ...data,
      modules: {
        ...data.modules,
        [moduleKey]: updatedContent,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Editor Header Navigation Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-4 pt-2.5 flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("theme")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 ${
            activeTab === "theme"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Palette size={13} />
          <span>Theme & Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bio")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 ${
            activeTab === "bio"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <User size={13} />
          <span>Bio & Photos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("modules")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 ${
            activeTab === "modules"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Layers size={13} />
          <span>Shuffle & Order ({moduleOrder.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("casestudies")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 ${
            activeTab === "casestudies"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText size={13} />
          <span>Case Studies</span>
        </button>
      </div>

      {/* Editor Content Area (Bounded, Overscroll Contain to eliminate any outer window overscrolling) */}
      <div className="p-4 sm:p-5 overflow-y-auto overscroll-contain flex-1 space-y-5 text-xs custom-scrollbar">
        {/* TAB 1: THEME & COLOR CUSTOMIZER */}
        {activeTab === "theme" && (
          <div className="space-y-5">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Portfolio Theme & Color Palettes
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Select a cohort-distinct palette or configure custom brand colors. Applies across all 13 modules and hero elements instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_THEMES.map((th) => {
                const isSelected = theme.id === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => onThemeChange(th)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-1">
                        <span
                          className="w-5 h-5 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: th.primary }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: th.secondary }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: th.accent }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          {th.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {th.primary}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Primary HEX Color Override */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="font-bold text-slate-800 text-xs block">
                Custom Color Override:
              </span>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={theme.primary}
                  onChange={(e) =>
                    onThemeChange({
                      ...theme,
                      id: "custom",
                      primary: e.target.value,
                    })
                  }
                  className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5 shrink-0"
                />
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Brand Accent HEX Code
                  </label>
                  <input
                    type="text"
                    value={theme.primary}
                    onChange={(e) =>
                      onThemeChange({
                        ...theme,
                        id: "custom",
                        primary: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT BIO & PHOTOS */}
        {activeTab === "bio" && (
          <div className="space-y-5">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Student Profile & Photo Manager
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Every field is completely customizable. Upload your own photo or paste any web image URL.
              </p>
            </div>

            {/* Photo Section */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <span className="font-bold text-slate-800 block text-xs">
                Profile Photo / Avatar:
              </span>
              <div className="flex items-center space-x-3.5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-200 shrink-0">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-blue-500 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs transition-colors">
                      <Upload size={13} className="text-blue-600" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={student.avatarUrl.startsWith("data:") ? "" : student.avatarUrl}
                    onChange={(e) => handleStudentFieldChange("avatarUrl", e.target.value)}
                    placeholder="Or paste external photo URL..."
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Or pick a professional sample avatar:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {PRESET_AVATARS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleStudentFieldChange("avatarUrl", preset.url)}
                      className={`p-1 rounded-lg border text-center transition-all cursor-pointer ${
                        student.avatarUrl === preset.url
                          ? "border-blue-600 ring-2 ring-blue-500/20 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-8 h-8 rounded-md mx-auto object-cover"
                      />
                      <span className="text-[9px] text-slate-600 font-medium block truncate mt-0.5">
                        {preset.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => handleStudentFieldChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={student.email}
                  onChange={(e) => handleStudentFieldChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Primary Headline</label>
              <input
                type="text"
                value={student.headline}
                onChange={(e) => handleStudentFieldChange("headline", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subheadline / Specialization</label>
              <input
                type="text"
                value={student.subheadline}
                onChange={(e) => handleStudentFieldChange("subheadline", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Bio Description</label>
              <textarea
                rows={3}
                value={student.bio}
                onChange={(e) => handleStudentFieldChange("bio", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={student.phone}
                  onChange={(e) => handleStudentFieldChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location / Branch</label>
                <input
                  type="text"
                  value={student.location}
                  onChange={(e) => handleStudentFieldChange("location", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>

            {/* 4 Stat Highlights */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <span className="font-extrabold text-slate-900 block">
                Top 4 Stat Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(student.highlights || []).map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleHighlightChange(idx, "label", e.target.value)}
                      placeholder="Stat Label"
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleHighlightChange(idx, "value", e.target.value)}
                      placeholder="Stat Value (e.g. 4.12x)"
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-black text-blue-600"
                    />
                    <input
                      type="text"
                      value={stat.detail}
                      onChange={(e) => handleHighlightChange(idx, "detail", e.target.value)}
                      placeholder="Supporting Detail"
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Social Profiles */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <span className="font-extrabold text-slate-900 block">
                Verified Social & Portfolio URLs
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(student.socials || []).map((soc, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-20 text-[11px] font-bold text-slate-600 capitalize truncate">
                      {soc.label}:
                    </span>
                    <input
                      type="text"
                      value={soc.url}
                      onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
                      className="flex-1 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[11px] font-mono"
                      placeholder={`https://${soc.platform}.com/...`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 13 MODULES & SHUFFLE SEQUENCE */}
        {activeTab === "modules" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Custom Module Sequencing & Shuffle
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Use the Up/Down arrows to feature your strongest projects first, or hit Shuffle.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShuffleModules}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-2xs transition-colors cursor-pointer"
                  title="Randomize module sequence"
                >
                  <Shuffle size={13} />
                  <span>Shuffle Sequence</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetModuleOrder}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center space-x-1 transition-colors cursor-pointer"
                  title="Restore default sequence"
                >
                  <RotateCcw size={12} />
                  <span>Reset Order</span>
                </button>
              </div>
            </div>

            {/* Reorderable Module Cards List */}
            <div className="space-y-2">
              {moduleOrder.map((modId, index) => {
                const catalogMod = MODULES_CATALOG.find((m) => m.id === modId) || {
                  id: modId,
                  title: modId,
                };
                const isVisible = moduleVisibility[modId] !== false;
                const formattedNumber = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={modId}
                    className={`px-3 sm:px-4 py-2.5 rounded-2xl border text-left flex items-center justify-between transition-all shadow-2xs ${
                      isVisible
                        ? "border-blue-400 bg-white hover:border-blue-500"
                        : "border-slate-200 bg-slate-50/70 opacity-60"
                    }`}
                  >
                    {/* Left: Reorder Up/Down arrows + Rank + Title */}
                    <div className="flex items-center space-x-2 truncate mr-3">
                      {/* Reorder Up/Down Controls */}
                      <div className="flex flex-col space-y-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveModuleUp(index)}
                          disabled={index === 0}
                          className="p-0.5 rounded text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                          title="Move Up in Showcase Sequence"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveModuleDown(index)}
                          disabled={index === moduleOrder.length - 1}
                          className="p-0.5 rounded text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                          title="Move Down in Showcase Sequence"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>

                      <span className="font-mono text-xs sm:text-sm font-black text-amber-500 shrink-0">
                        {formattedNumber}.
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isVisible ? "text-slate-800" : "text-slate-400 line-through"
                        }`}
                      >
                        {catalogMod.title}
                      </span>
                    </div>

                    {/* Right: Visibility Toggle Button */}
                    <button
                      type="button"
                      onClick={() => onToggleModule(modId)}
                      className={`text-xs sm:text-sm font-bold shrink-0 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isVisible
                          ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                          : "text-slate-400 bg-slate-200 hover:bg-slate-300"
                      }`}
                    >
                      {isVisible ? "Active" : "Inactive"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: COMPREHENSIVE CASE STUDIES FOR ALL 13 MODULES */}
        {activeTab === "casestudies" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Custom Case Studies & Project Details
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Customize every single data point, URL, ad spend, and live demo link across all 13 modules.
              </p>
            </div>

            {/* Module Picker Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
              {MODULES_CATALOG.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setSelectedCaseModule(mod.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCaseModule === mod.id
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {mod.number}. {mod.title.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Case Studies Form Content Based on Selected Module */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              {/* 01. WORDPRESS */}
              {selectedCaseModule === "wordpress" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-extrabold text-slate-900">
                      Module 01: WordPress Projects ({data.modules.wordpress.length})
                    </span>
                  </div>

                  {data.modules.wordpress.map((proj, pIdx) => (
                    <div key={proj.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 text-xs">Project #{pIdx + 1}</span>
                        <span className="text-[10px] font-black uppercase text-blue-600">{proj.clientType}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Project Name</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...data.modules.wordpress];
                              updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Speed Score (0-100)</label>
                          <input
                            type="number"
                            value={proj.speedScore}
                            onChange={(e) => {
                              const updated = [...data.modules.wordpress];
                              updated[pIdx] = { ...updated[pIdx], speedScore: Number(e.target.value) };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-black text-emerald-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...data.modules.wordpress];
                            updated[pIdx] = { ...updated[pIdx], description: e.target.value };
                            handleModuleDataChange("wordpress", updated);
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Live Demo URL</label>
                          <input
                            type="text"
                            value={proj.liveUrl}
                            onChange={(e) => {
                              const updated = [...data.modules.wordpress];
                              updated[pIdx] = { ...updated[pIdx], liveUrl: e.target.value };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Screenshot Image URL</label>
                          <input
                            type="text"
                            value={proj.imageUrl}
                            onChange={(e) => {
                              const updated = [...data.modules.wordpress];
                              updated[pIdx] = { ...updated[pIdx], imageUrl: e.target.value };
                              handleModuleDataChange("wordpress", updated);
                            }}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 04. META ADS */}
              {selectedCaseModule === "socialMarketing" && (
                <div className="space-y-4">
                  <span className="font-extrabold text-slate-900 block border-b border-slate-200 pb-2">
                    Module 04: Meta Ads Campaigns
                  </span>
                  {data.modules.socialMarketing.map((ad, idx) => (
                    <div key={ad.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-800 text-xs block">Campaign #{idx + 1}</span>
                      <input
                        type="text"
                        value={ad.campaignName}
                        onChange={(e) => {
                          const updated = [...data.modules.socialMarketing];
                          updated[idx] = { ...updated[idx], campaignName: e.target.value };
                          handleModuleDataChange("socialMarketing", updated);
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                        placeholder="Campaign Name"
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">ROAS</label>
                          <input
                            type="text"
                            value={ad.roas}
                            onChange={(e) => {
                              const updated = [...data.modules.socialMarketing];
                              updated[idx] = { ...updated[idx], roas: e.target.value };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-black text-emerald-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">Ad Spend</label>
                          <input
                            type="text"
                            value={ad.adSpend}
                            onChange={(e) => {
                              const updated = [...data.modules.socialMarketing];
                              updated[idx] = { ...updated[idx], adSpend: e.target.value };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">Revenue</label>
                          <input
                            type="text"
                            value={ad.revenueGenerated}
                            onChange={(e) => {
                              const updated = [...data.modules.socialMarketing];
                              updated[idx] = { ...updated[idx], revenueGenerated: e.target.value };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">CPA</label>
                          <input
                            type="text"
                            value={ad.cpa}
                            onChange={(e) => {
                              const updated = [...data.modules.socialMarketing];
                              updated[idx] = { ...updated[idx], cpa: e.target.value };
                              handleModuleDataChange("socialMarketing", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 05. GOOGLE ADS */}
              {selectedCaseModule === "googleAds" && (
                <div className="space-y-4">
                  <span className="font-extrabold text-slate-900 block border-b border-slate-200 pb-2">
                    Module 05: Google Ads Campaigns
                  </span>
                  {data.modules.googleAds.map((gads, idx) => (
                    <div key={gads.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-800 text-xs block">Campaign #{idx + 1}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={gads.campaignType}
                          onChange={(e) => {
                            const updated = [...data.modules.googleAds];
                            updated[idx] = { ...updated[idx], campaignType: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                          placeholder="Campaign Type"
                        />
                        <input
                          type="text"
                          value={gads.industry}
                          onChange={(e) => {
                            const updated = [...data.modules.googleAds];
                            updated[idx] = { ...updated[idx], industry: e.target.value };
                            handleModuleDataChange("googleAds", updated);
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                          placeholder="Industry"
                        />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">Quality Score</label>
                          <input
                            type="text"
                            value={gads.qualityScoreAvg}
                            onChange={(e) => {
                              const updated = [...data.modules.googleAds];
                              updated[idx] = { ...updated[idx], qualityScoreAvg: e.target.value };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold text-blue-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">Conversions</label>
                          <input
                            type="text"
                            value={gads.conversions}
                            onChange={(e) => {
                              const updated = [...data.modules.googleAds];
                              updated[idx] = { ...updated[idx], conversions: e.target.value };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">CTR</label>
                          <input
                            type="text"
                            value={gads.ctrPct}
                            onChange={(e) => {
                              const updated = [...data.modules.googleAds];
                              updated[idx] = { ...updated[idx], ctrPct: e.target.value };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block">Budget</label>
                          <input
                            type="text"
                            value={gads.monthlyBudget}
                            onChange={(e) => {
                              const updated = [...data.modules.googleAds];
                              updated[idx] = { ...updated[idx], monthlyBudget: e.target.value };
                              handleModuleDataChange("googleAds", updated);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 06. SEO */}
              {selectedCaseModule === "seo" && (
                <div className="space-y-4">
                  <span className="font-extrabold text-slate-900 block border-b border-slate-200 pb-2">
                    Module 06: SEO & Keyword Rankings
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Organic Traffic Growth</label>
                      <input
                        type="text"
                        value={data.modules.seo.audit.organicTrafficGrowth}
                        onChange={(e) => {
                          handleModuleDataChange("seo", {
                            ...data.modules.seo,
                            audit: { ...data.modules.seo.audit, organicTrafficGrowth: e.target.value },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Domain Authority (After)</label>
                      <input
                        type="number"
                        value={data.modules.seo.audit.domainAuthorityAfter}
                        onChange={(e) => {
                          handleModuleDataChange("seo", {
                            ...data.modules.seo,
                            audit: { ...data.modules.seo.audit, domainAuthorityAfter: Number(e.target.value) },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-700 block">Top Ranked Keywords:</span>
                    {data.modules.seo.keywords.map((kw, kIdx) => (
                      <div key={kIdx} className="grid grid-cols-3 gap-2 bg-white p-2 rounded-lg border border-slate-200">
                        <input
                          type="text"
                          value={kw.keyword}
                          onChange={(e) => {
                            const updated = [...data.modules.seo.keywords];
                            updated[kIdx] = { ...updated[kIdx], keyword: e.target.value };
                            handleModuleDataChange("seo", { ...data.modules.seo, keywords: updated });
                          }}
                          className="px-2 py-1 border border-slate-300 rounded text-xs font-bold"
                          placeholder="Keyword"
                        />
                        <input
                          type="text"
                          value={kw.volume}
                          onChange={(e) => {
                            const updated = [...data.modules.seo.keywords];
                            updated[kIdx] = { ...updated[kIdx], volume: e.target.value };
                            handleModuleDataChange("seo", { ...data.modules.seo, keywords: updated });
                          }}
                          className="px-2 py-1 border border-slate-300 rounded text-xs"
                          placeholder="Search Vol"
                        />
                        <input
                          type="number"
                          value={kw.currentRank}
                          onChange={(e) => {
                            const updated = [...data.modules.seo.keywords];
                            updated[kIdx] = { ...updated[kIdx], currentRank: Number(e.target.value) };
                            handleModuleDataChange("seo", { ...data.modules.seo, keywords: updated });
                          }}
                          className="px-2 py-1 border border-slate-300 rounded text-xs font-bold text-emerald-600"
                          placeholder="Google Rank"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 09. SHOPIFY STORE */}
              {selectedCaseModule === "shopify" && (
                <div className="space-y-3">
                  <span className="font-extrabold text-slate-900 block border-b border-slate-200 pb-2">
                    Module 09: Shopify E-Commerce Store
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Store Name</label>
                      <input
                        type="text"
                        value={data.modules.shopify.storeName}
                        onChange={(e) =>
                          handleModuleDataChange("shopify", { ...data.modules.shopify, storeName: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Store Niche</label>
                      <input
                        type="text"
                        value={data.modules.shopify.niche}
                        onChange={(e) =>
                          handleModuleDataChange("shopify", { ...data.modules.shopify, niche: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Conversion Rate</label>
                      <input
                        type="text"
                        value={data.modules.shopify.conversionRateAchieved}
                        onChange={(e) =>
                          handleModuleDataChange("shopify", { ...data.modules.shopify, conversionRateAchieved: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Average Order Value (AOV)</label>
                      <input
                        type="text"
                        value={data.modules.shopify.aovAchieved}
                        onChange={(e) =>
                          handleModuleDataChange("shopify", { ...data.modules.shopify, aovAchieved: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-emerald-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={data.modules.shopify.description}
                      onChange={(e) =>
                        handleModuleDataChange("shopify", { ...data.modules.shopify, description: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 12. AI APP */}
              {selectedCaseModule === "aiApp" && (
                <div className="space-y-3">
                  <span className="font-extrabold text-slate-900 block border-b border-slate-200 pb-2">
                    Module 12: Custom AI Marketing App
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">App Name</label>
                      <input
                        type="text"
                        value={data.modules.aiApp.appName}
                        onChange={(e) =>
                          handleModuleDataChange("aiApp", { ...data.modules.aiApp, appName: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">AI Model Engine</label>
                      <input
                        type="text"
                        value={data.modules.aiApp.aiModelUsed}
                        onChange={(e) =>
                          handleModuleDataChange("aiApp", { ...data.modules.aiApp, aiModelUsed: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">System Prompt Architecture</label>
                    <textarea
                      rows={3}
                      value={data.modules.aiApp.samplePromptSystem}
                      onChange={(e) =>
                        handleModuleDataChange("aiApp", { ...data.modules.aiApp, samplePromptSystem: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* OTHER MODULES GENERIC EDITOR */}
              {!["wordpress", "socialMarketing", "googleAds", "seo", "shopify", "aiApp"].includes(selectedCaseModule) && (
                <div className="space-y-3">
                  <span className="font-extrabold text-slate-900 block border-b border-slate-200 pb-2">
                    Module Case Study Quick-Edit
                  </span>
                  <p className="text-slate-600 text-xs">
                    You can edit all text and metric values directly on the <strong>Live Side Preview</strong> (resume-style click-to-edit), or customize the raw module JSON.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Module Details (Directly Editable on Preview):
                    </span>
                    <pre className="text-[11px] font-mono text-slate-700 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-slate-50 rounded-lg border border-slate-200">
                      {JSON.stringify(data.modules[selectedCaseModule], null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Reset to Default Button */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onReset}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset to Default Student Credentials</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioFormEditor;
