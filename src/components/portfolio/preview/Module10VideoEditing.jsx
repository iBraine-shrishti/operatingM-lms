import React from "react";
import {
  Video,
  Plus,
  Trash2,
  Camera,
  Eye,
  Play,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  Clock,
  X,
  Smartphone,
  DollarSign,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { InfiniteCardMarquee } from "./previewShared";
import mockupCreativesImg from "../../../assets/mockup-creatives.jpg";

export const Module10VideoEditing = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-50/70 border-b border-slate-200/40",
}) => {
  const veData = modules.videoEditing || {};
  const defaultReels = [
    {
      formatTag: "Reels / TikTok",
      overlayTitle: "CREATIVE VISUALS - MARKETING GRAPHICS",
      duration: "0:24",
      imageUrl: mockupCreativesImg,
      title: "High-Retention UGC Hook: The 'Stop Scrolling' Skincare Teardown",
      description: "Engineered a TikTok-native UGC video ad featuring jump cuts every 1.2 seconds, dynamic auto-synced subtitles, sound design (whooshes, pop-ups), and a clear call-to-action.",
      hookEyebrow: "HOOK & RETENTION ARCHITECTURE (0-3S):",
      hookStrategy: "0-3s visual pattern interrupt (rapid zoom on textured skin) paired with curiosity headline text and dynamic sound effects.",
      retentionLabel: "Verified Retention:",
      retentionMetric: "62% completion rate at 15s mark (4.1x benchmark)",
      tools: ["Adobe Premiere Pro", "CapCut Desktop", "After Effects"],
    },
    {
      formatTag: "Brand Teaser",
      overlayTitle: "CREATIVE VISUALS - MARKETING GRAPHICS",
      duration: "0:45",
      imageUrl: mockupCreativesImg,
      title: "Cinematic Product Commercial: Matte Black Espresso Machine",
      description: "Commercial-grade promotional video focusing on product textures, precision engineering, and lifestyle aspiration. Used as top-of-funnel brand anchor for Meta and YouTube campaigns.",
      hookEyebrow: "HOOK & RETENTION ARCHITECTURE (0-3S):",
      hookStrategy: "Slow-motion espresso extraction shot at 120fps with tactile ASMR audio and atmospheric golden hour backlight.",
      retentionLabel: "Verified Retention:",
      retentionMetric: "54% 30-second retention rate on YouTube In-Stream",
      tools: ["DaVinci Resolve", "Color Grading with Film LUTs", "Sound FX Library"],
    },
  ];
  const reels = Array.isArray(veData?.reels) && veData.reels.length > 0
    ? veData.reels
    : Array.isArray(modules.videoEditing) && modules.videoEditing.length > 0
    ? modules.videoEditing
    : defaultReels;

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave, initialWebsiteUrl);
    }
  };

  const openVideoEditingMedia = (index) => {
    const veData = modules.videoEditing || {};
    const reels = Array.isArray(veData.reels) ? veData.reels : [];
    if (!reels[index]) return;
    const reel = reels[index];
    onOpenMedia && onOpenMedia({
      type: "video",
      moduleNumber: "MODULE 10",
      moduleTitle: "Video Editing & Post-Production",
      category: reel.formatTag || "Reels / TikTok Commercial Cut",
      title: reel.title || "Video Commercial Deliverable",
      imageUrl: reel.imageUrl || mockupCreativesImg,
      thumbnailUrl: reel.imageUrl || mockupCreativesImg,
      videoUrl: reel.videoUrl || "",
      duration: reel.duration || "0:30",
      format: reel.formatTag || "9:16 Vertical",
      hook: reel.hookStyle || reel.overlayTitle || "Pattern Interrupt Hook (0-3s)",
      retentionMetric: reel.retentionRate || "87% 3-Second Retention",
      clientType: reel.software || "Premiere Pro / After Effects / CapCut",
      description: reel.description || "High-energy commercial video cut with fast-paced beat sync, sound effects (SFX) layering, animated keyframes, subtitle kinetic typography, and color grading.",
      metrics: [
        { label: "Editing Software", value: reel.software || "Premiere Pro", highlight: "purple" },
        { label: "Target Retention", value: reel.retentionRate || "87%", highlight: "emerald" },
        { label: "Video Duration", value: reel.duration || "0:30", highlight: "amber" },
        { label: "Sound Design", value: reel.musicSoundFx || "Dynamic SFX", highlight: "slate" },
      ],
      tags: [reel.software, reel.formatTag, "Sound Design", "Kinetic Subtitles", "Color Grading"].filter(Boolean),
      currentIndex: index,
      itemsList: reels,
      navigateFn: (nextIdx) => openVideoEditingMedia(nextIdx),
    });
  };


  const handleAddVideoReel = () => {
    if (onChange) {
      const ve = modules.videoEditing || {};
      const current = Array.isArray(ve.reels) ? ve.reels : [];
      const newReel = {
        id: "reel-" + Date.now(),
        formatTag: "Reels / TikTok",
        overlayTitle: "CREATIVE VISUALS - MARKETING GRAPHICS",
        duration: "0:30",
        imageUrl: mockupCreativesImg,
        title: "High-Retention Product Teaser: Direct-Response Creative",
        description: "Engineered high-velocity commercial video with kinetic subtitles, audio pop-ups, and pattern-interrupt hook.",
        hookEyebrow: "HOOK & RETENTION ARCHITECTURE (0-3S):",
        hookStrategy: "0-3s visual pattern interrupt paired with curiosity headline text and dynamic sound effects.",
        retentionLabel: "Verified Retention:",
        retentionMetric: "64% completion rate at 15s mark (4.2x benchmark)",
        tools: ["Adobe Premiere Pro", "CapCut Desktop", "After Effects"],
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          videoEditing: {
            ...ve,
            reels: [...current, newReel],
          },
        },
      });
    }
  };

  const handleDeleteVideoReel = (rIdx) => {
    if (onChange) {
      const ve = modules.videoEditing || {};
      const current = Array.isArray(ve.reels) ? ve.reels : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          videoEditing: {
            ...ve,
            reels: current.filter((_, i) => i !== rIdx),
          },
        },
      });
    }
  };

  const handleAddVideoReelTool = (rIdx) => {
    if (onChange) {
      const ve = modules.videoEditing || {};
      const current = Array.isArray(ve.reels) ? [...ve.reels] : [];
      if (current[rIdx]) {
        const tools = Array.isArray(current[rIdx].tools) ? [...current[rIdx].tools] : [];
        current[rIdx] = { ...current[rIdx], tools: [...tools, "DaVinci Resolve"] };
        onChange({
          ...portfolioData,
          modules: {
            ...modules,
            videoEditing: { ...ve, reels: current },
          },
        });
      }
    }
  };

  const handleDeleteVideoReelTool = (rIdx, tIdx) => {
    if (onChange) {
      const ve = modules.videoEditing || {};
      const current = Array.isArray(ve.reels) ? [...ve.reels] : [];
      if (current[rIdx]) {
        const tools = Array.isArray(current[rIdx].tools) ? current[rIdx].tools.filter((_, i) => i !== tIdx) : [];
        current[rIdx] = { ...current[rIdx], tools };
        onChange({
          ...portfolioData,
          modules: {
            ...modules,
            videoEditing: { ...ve, reels: current },
          },
        });
      }
    }
  };

  return (
    <section
      id="videoEditing"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 10 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={veData.categoryBadge || "Module 10 · Post-Production & Motion"}
                          path="modules.videoEditing.categoryBadge"
                          placeholder="Module 10 · Post-Production & Motion"
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={veData.moduleTitle || "Video Editing, UGC Creatives & Commercial Reels"}
                          path="modules.videoEditing.moduleTitle"
                          placeholder="Video Editing, UGC Creatives & Commercial Reels"
                        />
                      </h2>
                      <div className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          value={veData.subtitle || "Short-form video assets engineered for algorithm retention, featuring dynamic jump-cut pacing, kinetic subtitles, and psycho-acoustic sound design."}
                          path="modules.videoEditing.subtitle"
                          placeholder="Subtitle description..."
                          multiline
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
                        <Video className="w-4 h-4 text-blue-600" />
                        <EditableText
                          value={veData.topBadge || "CapCut Desktop · Premiere Pro · 4K Color Graded"}
                          path="modules.videoEditing.topBadge"
                          placeholder="CapCut Desktop · Premiere Pro · 4K Color Graded"
                        />
                      </div>
                      {isEditable && (
                        <button
                          type="button"
                          onClick={handleAddVideoReel}
                          className="px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Plus size={14} />
                          <span>Add Reel</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Infinite Horizontal Cards Marquee */}
                  <InfiniteCardMarquee
                    items={reels}
                    itemKeyPrefix="video-reel"
                    renderItem={(reel, rIdx) => (
                      <div
                        key={reel.id || rIdx}
                        className="w-[380px] sm:w-[440px] lg:w-[480px] h-full bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-md flex flex-col justify-between group relative shrink-0"
                      >
                        {/* Video Thumbnail Area */}
                        <div
                          className="relative aspect-[16/9] bg-black overflow-hidden group/vid cursor-pointer"
                          onClick={() => openVideoEditingMedia(rIdx)}
                          title="Click to play video reel & view post-production data"
                        >
                          <img
                            src={reel.imageUrl || mockupCreativesImg}
                            alt={reel.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                          />
                          <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 font-mono text-[10px] px-2.5 py-1 rounded font-bold shadow-xs">
                            <EditableText
                              value={reel.formatTag || "Reels / TikTok"}
                              path={`modules.videoEditing.reels[${rIdx}].formatTag`}
                              placeholder="Reels / TikTok"
                            />
                          </div>

                          <div className="absolute top-3 left-28 hidden sm:block text-slate-300 font-mono text-[10px] font-bold tracking-wider uppercase opacity-80">
                            <EditableText
                              value={reel.overlayTitle || "CREATIVE VISUALS - MARKETING GRAPHICS"}
                              path={`modules.videoEditing.reels[${rIdx}].overlayTitle`}
                              placeholder="CREATIVE VISUALS - MARKETING GRAPHICS"
                            />
                          </div>

                          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/90 text-slate-300 font-mono text-[10px] px-2.5 py-1 rounded shadow-xs">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <EditableText
                              value={reel.duration || "0:30"}
                              path={`modules.videoEditing.reels[${rIdx}].duration`}
                              placeholder="0:30"
                            />
                          </div>

                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                            </div>
                          </div>

                          {/* Editable Image Upload Overlay */}
                          {isEditable && (
                            <div
                              className="absolute bottom-3 right-3 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-xs shadow-lg z-10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <label className="text-white hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1 text-[11px]">
                                <Camera size={12} />
                                <span>Change Thumbnail</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        if (onChange) {
                                          const updated = [...reels];
                                          updated[rIdx] = { ...updated[rIdx], imageUrl: reader.result };
                                          onChange({
                                            ...portfolioData,
                                            modules: {
                                              ...modules,
                                              videoEditing: { ...veData, reels: updated },
                                            },
                                          });
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          )}

                          {/* Delete Reel button if isEditable */}
                          {isEditable && reels.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteVideoReel(rIdx);
                              }}
                              className="absolute bottom-3 left-3 p-1.5 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg shadow-md cursor-pointer transition-colors z-10"
                              title="Delete Video Reel"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}

                          {/* Yellow Accent Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400" />
                        </div>

                        {/* Video Details */}
                        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                              <EditableText
                                value={reel.title}
                                path={`modules.videoEditing.reels[${rIdx}].title`}
                                placeholder="Video Reel Title"
                              />
                            </h3>
                            <div className="text-xs text-slate-300 leading-relaxed font-normal">
                              <EditableText
                                value={reel.description}
                                path={`modules.videoEditing.reels[${rIdx}].description`}
                                placeholder="Reel description..."
                                multiline
                              />
                            </div>
                          </div>

                          {/* Hook & Retention Architecture Box */}
                          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <EditableText
                                value={reel.hookEyebrow || "HOOK & RETENTION ARCHITECTURE (0-3S):"}
                                path={`modules.videoEditing.reels[${rIdx}].hookEyebrow`}
                                placeholder="HOOK & RETENTION ARCHITECTURE (0-3S):"
                              />
                            </div>
                            <div className="text-slate-200 italic leading-relaxed">
                              "<EditableText
                                value={reel.hookStrategy || "0-3s visual pattern interrupt paired with dynamic sound design."}
                                path={`modules.videoEditing.reels[${rIdx}].hookStrategy`}
                                placeholder="Hook strategy quote..."
                                multiline
                              />"
                            </div>
                            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                              <span className="text-slate-400">
                                <EditableText
                                  value={reel.retentionLabel || "Verified Retention:"}
                                  path={`modules.videoEditing.reels[${rIdx}].retentionLabel`}
                                  placeholder="Verified Retention:"
                                />
                              </span>
                              <span className="text-emerald-400 font-mono font-bold">
                                <EditableText
                                  value={reel.retentionMetric || "62% completion rate at 15s mark (4.1x benchmark)"}
                                  path={`modules.videoEditing.reels[${rIdx}].retentionMetric`}
                                  placeholder="62% completion rate"
                                />
                              </span>
                            </div>
                          </div>

                          {/* Footer with Tools & Enlarge link */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {(Array.isArray(reel.tools) ? reel.tools : ["Adobe Premiere Pro", "CapCut Desktop", "After Effects"]).map((tool, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-slate-800 text-slate-300 rounded-md border border-slate-700"
                                >
                                  <EditableText
                                    value={tool}
                                    path={`modules.videoEditing.reels[${rIdx}].tools[${tIdx}]`}
                                    placeholder="Tool Name"
                                  />
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteVideoReelTool(rIdx, tIdx)}
                                      className="p-0.5 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                                    >
                                      <X size={10} />
                                    </button>
                                  )}
                                </span>
                              ))}
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => handleAddVideoReelTool(rIdx)}
                                  className="px-1.5 py-0.5 text-[10px] font-bold text-amber-400 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 cursor-pointer"
                                >
                                  + Tool
                                </button>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => openVideoEditingMedia(rIdx)}
                              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-amber-400" />
                              <span>Play Reel & View Data</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </section>
  );
};
