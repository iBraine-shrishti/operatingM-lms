import React, { useState } from "react";
import {
  Cpu,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  X,
  Code2,
  AlertTriangle,
  Activity,
  Search,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { renderCustomIcon } from "./previewShared";
import { createInitialPortfolioData } from "../portfolioData";

export const Module12AiApp = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-50/70 border-b border-slate-200/40",
}) => {
  const initialAi = createInitialPortfolioData().modules.aiApp;
  const aiData = modules.aiApp?.systemPromptInstruction ? modules.aiApp : initialAi;
  const [aiProductInput, setAiProductInput] = useState("Anti-Fatigue Ergonomic Standing Mat");
  const [aiFramework, setAiFramework] = useState("AIDA");
  const [copiedVariantIdx, setCopiedVariantIdx] = useState(null);

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

  const handleAddAiFeature = () => {
    if (onChange) {
      const ai = modules.aiApp || {};
      const current = Array.isArray(ai.features) ? ai.features : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          aiApp: {
            ...ai,
            features: [...current, { text: "Instant 3-Hook Generation (Curiosity, Pain Point, Social Proof)", icon: "check" }],
          },
        },
      });
    }
  };

  const handleDeleteAiFeature = (fIdx) => {
    if (onChange) {
      const ai = modules.aiApp || {};
      const current = Array.isArray(ai.features) ? ai.features : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          aiApp: {
            ...ai,
            features: current.filter((_, i) => i !== fIdx),
          },
        },
      });
    }
  };

  const handleCycleAiFeatureIcon = (fIdx) => {
    if (onChange) {
      const ai = modules.aiApp || {};
      const current = Array.isArray(ai.features) ? [...ai.features] : [];
      const item = current[fIdx];
      const currentIcon = typeof item === "object" ? (item.icon || "check") : "check";
      const iconCycle = ["check", "zap", "sparkles", "shield", "trending", "target", "award"];
      const nextIcon = iconCycle[(iconCycle.indexOf(currentIcon) + 1) % iconCycle.length];
      if (typeof item === "object") {
        current[fIdx] = { ...item, icon: nextIcon };
      } else {
        current[fIdx] = { text: item, icon: nextIcon };
      }
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          aiApp: { ...ai, features: current },
        },
      });
    }
  };

  const handleAddAiTech = () => {
    if (onChange) {
      const ai = modules.aiApp || {};
      const current = Array.isArray(ai.techStack) ? ai.techStack : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          aiApp: {
            ...ai,
            techStack: [...current, "Gemini API"],
          },
        },
      });
    }
  };

  const handleDeleteAiTech = (tIdx) => {
    if (onChange) {
      const ai = modules.aiApp || {};
      const current = Array.isArray(ai.techStack) ? ai.techStack : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          aiApp: {
            ...ai,
            techStack: current.filter((_, i) => i !== tIdx),
          },
        },
      });
    }
  };

  const handleAddAiVariant = (framework) => {
    if (onChange) {
      const ai = modules.aiApp || {};
      const currentFw = Array.isArray(ai.variants?.[framework]) ? ai.variants[framework] : [];
      const newVar = {
        framework: framework + " Pattern Hook",
        ctr: "3.95% Pred. CTR",
        text: '"High-converting direct response angle hook addressing customer pain point directly."',
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          aiApp: {
            ...ai,
            variants: {
              ...(ai.variants || {}),
              [framework]: [...currentFw, newVar],
            },
          },
        },
      });
    }
  };

  const handleDeleteAiVariant = (framework, vIdx) => {
    if (onChange) {
      const ai = modules.aiApp || {};
      const currentFw = Array.isArray(ai.variants?.[framework]) ? ai.variants[framework] : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          aiApp: {
            ...ai,
            variants: {
              ...(ai.variants || {}),
              [framework]: currentFw.filter((_, i) => i !== vIdx),
            },
          },
        },
      });
    }
  };

  return (
    <section
      id="aiApp"
      className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        <EditableText
                          value={aiData.moduleEyebrow || "MODULE 12 · ARTIFICIAL INTELLIGENCE & AUTOMATION"}
                          path="modules.aiApp.moduleEyebrow"
                          placeholder="MODULE 12 · ARTIFICIAL INTELLIGENCE & AUTOMATION"
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={aiData.title || "AI-Powered Marketing Application & Creative Co-Pilot"}
                          path="modules.aiApp.title"
                          placeholder="AI-Powered Marketing Application & Creative Co-Pilot"
                        />
                      </h2>
                      <div className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                        <EditableText
                          value={aiData.subtitle ||
                            "Custom software engineered with modern AI APIs to accelerate marketing workflows, automate direct-response ad copy generation, and scale creative testing."}
                          path="modules.aiApp.subtitle"
                          placeholder="Subtitle description..."
                          multiline
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      <div className="border border-blue-200 bg-blue-50/50 text-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <Sparkles size={14} className="text-blue-600" />
                        <EditableText
                          value={aiData.topBadge || "Gemini API · React 19 · Prompt Engineered"}
                          path="modules.aiApp.topBadge"
                          placeholder="Gemini API · React 19 · Prompt Engineered"
                        />
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
                          <EditableText
                            value={aiData.mockupBanner || "Gemini 2.5 Flash with custom system prompts & temperature fine-tuning"}
                            path="modules.aiApp.mockupBanner"
                            placeholder="Gemini 2.5 Flash with custom system prompts & temperature fine-tuning"
                          />
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
                            <EditableText
                              value={aiData.category || "PRODUCT ARCHITECTURE & WORKFLOW"}
                              path="modules.aiApp.category"
                              placeholder="PRODUCT ARCHITECTURE & WORKFLOW"
                            />
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
                            <EditableText
                              value={aiData.appName || "AdCopyGenius AI — Marketing Creative Co-Pilot"}
                              path="modules.aiApp.appName"
                              placeholder="AdCopyGenius AI — Marketing Creative Co-Pilot"
                            />
                          </h3>
                        </div>

                        <div className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          <EditableText
                            value={aiData.appDescription ||
                              "Digital marketers spend 10+ hours a week staring at blank screens trying to write compelling ad angles. AdCopyGenius AI structures inputs into proven frameworks (AIDA, PAS, BAB) with automatic character count validation and emoji formatting."}
                            path="modules.aiApp.appDescription"
                            placeholder="Description..."
                            multiline
                          />
                        </div>

                        {/* Terminal Box */}
                        <div className="bg-[#050b14] border border-slate-700/60 rounded-xl p-4">
                          <div className="text-[11px] font-mono font-bold text-amber-500">
                            <EditableText
                              value={aiData.systemPromptEyebrow || ">_ ENGINEERED SYSTEM PROMPT INSTRUCTION:"}
                              path="modules.aiApp.systemPromptEyebrow"
                              placeholder=">_ ENGINEERED SYSTEM PROMPT INSTRUCTION:"
                            />
                          </div>
                          <div className="text-slate-200 font-mono text-xs leading-relaxed italic mt-1.5">
                            <EditableText
                              value={aiData.systemPromptInstruction ||
                                '"You are an elite direct-response copywriter. Given a product, audience, and pain point, output 3 distinct hooks (Curiosity, Problem-Agitate, Social Proof) under 125 characters, paired with 2 persuasive bodies and call-to-actions."'}
                              path="modules.aiApp.systemPromptInstruction"
                              placeholder="System Prompt..."
                              multiline
                            />
                          </div>
                        </div>

                        {/* Bullets with Customizable Icons */}
                        <div className="space-y-2 pt-1 text-xs text-slate-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Features</span>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddAiFeature}
                                className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                              >
                                <Plus size={11} />
                                <span>Add Feature</span>
                              </button>
                            )}
                          </div>
                          {(aiData.features || [
                            { text: "Instant 3-Hook Generation (Curiosity, Pain Point, Social Proof)", icon: "check" },
                            { text: "Automated Google Ads Headline & Description compliance checker", icon: "check" },
                            { text: "Meta Primary Text generator with estimated CTR rating score", icon: "check" },
                            { text: "1-Click Copy to Clipboard & CSV batch export for Google Ads Editor", icon: "check" },
                          ]).map((feat, fIdx) => {
                            const featText = typeof feat === "object" ? feat.text : feat;
                            const featIcon = typeof feat === "object" ? feat.icon : "check";
                            return (
                              <div key={fIdx} className="flex items-center justify-between gap-2.5 group/feat">
                                <div className="flex items-center gap-2.5 flex-1">
                                  {isEditable ? (
                                    <button
                                      type="button"
                                      onClick={() => handleCycleAiFeatureIcon(fIdx)}
                                      className="shrink-0 text-blue-400 hover:scale-120 transition-transform cursor-pointer"
                                      title="Click to cycle icon"
                                    >
                                      {renderCustomIcon(featIcon, "check", "w-4 h-4 text-blue-400")}
                                    </button>
                                  ) : (
                                    <div className="shrink-0 text-blue-400">
                                      {renderCustomIcon(featIcon, "check", "w-4 h-4 text-blue-400")}
                                    </div>
                                  )}
                                  <EditableText
                                    value={featText}
                                    path={`modules.aiApp.features[${fIdx}].text`}
                                    placeholder="Feature..."
                                  />
                                </div>
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAiFeature(fIdx)}
                                    className="opacity-0 group-hover/feat:opacity-100 p-0.5 text-slate-400 hover:text-rose-400 rounded cursor-pointer transition-opacity"
                                  >
                                    <X size={12} />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="pt-2 border-t border-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tech Stack</span>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddAiTech}
                                className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                              >
                                <Plus size={11} />
                                <span>Add Tech</span>
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(aiData.techStack || ["React 19", "TypeScript", "Tailwind CSS", "Gemini API", "Vite"]).map(
                              (tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs group/tech"
                                >
                                  <EditableText
                                    value={tech}
                                    path={`modules.aiApp.techStack[${tIdx}]`}
                                    placeholder="Tech Name"
                                  />
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteAiTech(tIdx)}
                                      className="p-0.5 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                                    >
                                      <X size={11} />
                                    </button>
                                  )}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom White Card: Interactive Test Drive */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-amber-500">✨</span>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                        <EditableText
                          value={aiData.interactiveTitle || "Interactive Test Drive: Try the Student's AI Ad Copy Output Engine"}
                          path="modules.aiApp.interactiveTitle"
                          placeholder="Interactive Test Drive: Try the Student's AI Ad Copy Output Engine"
                        />
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

                        <div className="text-xs text-slate-400 leading-relaxed pt-1">
                          <EditableText
                            value={aiData.interactiveNote || "Interactive simulator executing the student's fine-tuned copywriting prompt matrix."}
                            path="modules.aiApp.interactiveNote"
                            placeholder="Interactive simulator executing the student's fine-tuned copywriting prompt matrix."
                          />
                        </div>
                      </div>

                      {/* Right: Generated Ad Variants */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            GENERATED AD VARIANTS FOR {(aiProductInput || "ANTI-FATIGUE ERGONOMIC STANDING MAT").toUpperCase().slice(0, 32)}...:
                          </div>
                          {isEditable && (
                            <button
                              type="button"
                              onClick={() => handleAddAiVariant(aiFramework)}
                              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                            >
                              <Plus size={11} />
                              <span>Add Variant ({aiFramework})</span>
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          {frameworkVariants.map((variant, vIdx) => {
                            const isCopied = copiedVariantIdx === vIdx;
                            return (
                              <div
                                key={vIdx}
                                className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-colors relative space-y-2 group/var"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-bold text-blue-600">
                                      <EditableText
                                        value={variant.framework}
                                        path={`modules.aiApp.variants.${aiFramework}[${vIdx}].framework`}
                                        placeholder="Framework Name"
                                      />
                                    </span>
                                    <span className="text-slate-300">·</span>
                                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      <EditableText
                                        value={variant.ctr}
                                        path={`modules.aiApp.variants.${aiFramework}[${vIdx}].ctr`}
                                        placeholder="3.85% Pred. CTR"
                                      />
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1">
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
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteAiVariant(aiFramework, vIdx)}
                                        className="opacity-0 group-hover/var:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity cursor-pointer"
                                        title="Delete Variant"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                  <EditableText
                                    value={variant.text}
                                    path={`modules.aiApp.variants.${aiFramework}[${vIdx}].text`}
                                    placeholder="Variant Ad Copy text..."
                                    multiline
                                  />
                                </div>
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
};
