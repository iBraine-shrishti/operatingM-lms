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
} from "lucide-react";
import { PORTFOLIO_THEMES } from "./portfolioThemes";
import { MODULES_CATALOG } from "./portfolioData";

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
  const student = data.student;

  const handleStudentFieldChange = (field, val) => {
    onChange({
      ...data,
      student: {
        ...student,
        [field]: val,
      },
    });
  };

  const handleHighlightChange = (index, field, val) => {
    const updated = [...student.highlights];
    updated[index] = { ...updated[index], [field]: val };
    onChange({
      ...data,
      student: {
        ...student,
        highlights: updated,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Editor Header Navigation Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 pt-3 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("theme")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "theme"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Palette size={14} />
          <span>Theme & Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bio")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "bio"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <User size={14} />
          <span>Student Bio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("modules")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "modules"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Layers size={14} />
          <span>Active Modules ({Object.values(moduleVisibility).filter(v => v !== false).length}/13)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("casestudies")}
          className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "casestudies"
              ? "border-blue-600 text-blue-600 bg-white rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText size={14} />
          <span>Case Studies</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs">
        {/* TAB 1: THEME & COLOR CUSTOMIZER */}
        {activeTab === "theme" && (
          <div className="space-y-5">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Portfolio Theme & Color Palettes
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Choose a distinctive color palette or customize individual primary colors to ensure no repetitive colors.
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
                        <div className="text-[10px] text-slate-500">
                          Primary: {th.primary}
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
                  className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5"
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
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT BIO & HIGHLIGHTS */}
        {activeTab === "bio" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => handleStudentFieldChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={student.email}
                  onChange={(e) => handleStudentFieldChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Primary Headline</label>
              <input
                type="text"
                value={student.headline}
                onChange={(e) => handleStudentFieldChange("headline", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subheadline / Specialization</label>
              <input
                type="text"
                value={student.subheadline}
                onChange={(e) => handleStudentFieldChange("subheadline", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Bio / Growth Summary</label>
              <textarea
                rows={3}
                value={student.bio}
                onChange={(e) => handleStudentFieldChange("bio", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={student.phone}
                  onChange={(e) => handleStudentFieldChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location / Working Mode</label>
                <input
                  type="text"
                  value={student.location}
                  onChange={(e) => handleStudentFieldChange("location", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Student Photo / Avatar URL</label>
              <input
                type="text"
                value={student.avatarUrl}
                onChange={(e) => handleStudentFieldChange("avatarUrl", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* 4 Highlights */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <span className="font-extrabold text-slate-900 block">
                Top 4 Stat Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {student.highlights.map((stat, idx) => (
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
          </div>
        )}

        {/* TAB 3: MODULES VISIBILITY TOGGLES */}
        {activeTab === "modules" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                13 Curriculum Modules Visibility
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Toggle any module on or off to tailor your portfolio for specific digital marketing roles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MODULES_CATALOG.map((mod) => {
                const isVisible = moduleVisibility[mod.id] !== false;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => onToggleModule(mod.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isVisible
                        ? "border-blue-300 bg-blue-50/50"
                        : "border-slate-200 bg-slate-50 opacity-60"
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs text-slate-900">
                        {mod.number}. {mod.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {mod.description}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        isVisible
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {isVisible ? "✓" : "–"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: CASE STUDIES CONTENT */}
        {activeTab === "casestudies" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Case Studies & Project Details
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Quickly customize real campaign data for WordPress, Meta Ads, and SEO keywords.
              </p>
            </div>

            {/* WordPress 1 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">
                WordPress Project 1:
              </span>
              <input
                type="text"
                value={data.modules.wordpress[0]?.title || ""}
                onChange={(e) => {
                  const updated = [...data.modules.wordpress];
                  updated[0] = { ...updated[0], title: e.target.value };
                  onChange({ ...data, modules: { ...data.modules, wordpress: updated } });
                }}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                placeholder="Project Title"
              />
              <input
                type="text"
                value={data.modules.wordpress[0]?.liveUrl || ""}
                onChange={(e) => {
                  const updated = [...data.modules.wordpress];
                  updated[0] = { ...updated[0], liveUrl: e.target.value };
                  onChange({ ...data, modules: { ...data.modules, wordpress: updated } });
                }}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                placeholder="Live Demo URL"
              />
            </div>

            {/* Meta Ads 1 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">
                Meta Ads Campaign 1:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={data.modules.socialMarketing[0]?.adSpend || ""}
                  onChange={(e) => {
                    const updated = [...data.modules.socialMarketing];
                    updated[0] = { ...updated[0], adSpend: e.target.value };
                    onChange({ ...data, modules: { ...data.modules, socialMarketing: updated } });
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  placeholder="Ad Spend"
                />
                <input
                  type="text"
                  value={data.modules.socialMarketing[0]?.roas || ""}
                  onChange={(e) => {
                    const updated = [...data.modules.socialMarketing];
                    updated[0] = { ...updated[0], roas: e.target.value };
                    onChange({ ...data, modules: { ...data.modules, socialMarketing: updated } });
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-emerald-600"
                  placeholder="ROAS (e.g. 4.50x)"
                />
              </div>
            </div>

            {/* Reset Button */}
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
