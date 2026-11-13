import React, { useState } from "react";
import {
  Palette,
  Plus,
  Trash2,
  ExternalLink,
  Camera,
  Play,
  CheckCircle2,
  Award,
  Clock,
  Sparkles,
  Filter,
  ChevronRight,
  Eye,
  Box,
  Video,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { InfiniteCardMarquee, formatModuleCategory } from "./previewShared";
import mockupCreativesImg from "../../../assets/mockup-creatives.jpg";

export const Module02Canva = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-50/70 border-b border-slate-200/40",
  sequenceNumber = 1,
  formattedRank = "01",
}) => {
  const canvaDesigns = Array.isArray(modules.canva?.designs)
    ? modules.canva.designs
    : Array.isArray(modules.canva)
    ? modules.canva
    : [];
  const canvaVideos = Array.isArray(modules.canva?.videos)
    ? modules.canva.videos
    : [];
  const totalAssets = canvaDesigns.length + canvaVideos.length;
  const canvaMeta = modules.canvaMeta || {};
  const [canvaFilter, setCanvaFilter] = useState("all");

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave, initialWebsiteUrl);
    }
  };

  const openCanvaDesignMedia = (index) => {
    const canvaDesigns = Array.isArray(modules.canva?.designs) ? modules.canva.designs : [];
    if (!canvaDesigns[index]) return;
    const d = canvaDesigns[index];
    onOpenMedia && onOpenMedia({
      type: "image",
      moduleNumber: `MODULE ${formattedRank}`,
      moduleTitle: "Visual Branding & Graphic Design",
      category: d.category || "Canva Creative Deliverable",
      title: d.title || "Graphic Design Asset",
      imageUrl: d.imageUrl || mockupCreativesImg,
      dimensions: d.dimensions || d.format || "1080 × 1350 px (4:5)",
      clientType: d.clientType || d.format || "Commercial Creative",
      description: d.description || "High-impact visual creative engineered for commercial conversion, branding consistency, and brand identity standards.",
      metrics: [
        { label: "Design Format", value: d.dimensions || d.format || "Social Grid", highlight: "purple" },
        { label: "Asset Category", value: d.category || "Branding", highlight: "emerald" },
      ],
      tags: [d.category, d.dimensions, ...(d.tags || ["Canva Pro", "Visual Identity", "Typography"])].filter(Boolean),
      currentIndex: index,
      itemsList: canvaDesigns,
      navigateFn: (nextIdx) => openCanvaDesignMedia(nextIdx),
    });
  };


  const openCanvaVideoMedia = (index) => {
    const canvaVideos = Array.isArray(modules.canva?.videos) ? modules.canva.videos : [];
    if (!canvaVideos[index]) return;
    const v = canvaVideos[index];
    onOpenMedia && onOpenMedia({
      type: "video",
      moduleNumber: `MODULE ${formattedRank}`,
      moduleTitle: "Canva Motion Reels & Video Ads",
      category: v.format || "9:16 Vertical Video Reel",
      title: v.title || "Short-Form Video Creative",
      videoUrl: v.videoUrl || "",
      thumbnailUrl: v.thumbnailUrl || mockupCreativesImg,
      duration: v.duration || "0:30",
      dimensions: "1080 × 1920 px (9:16)",
      format: v.format || "9:16 Reel",
      hook: v.hook || "0-3s Pattern Interrupt & Hook Architecture",
      retentionMetric: v.retention || "84% Target 3s Retention",
      clientType: v.platform || "Instagram Reels & TikTok",
      description: v.description || "High-retention vertical short-form video creative edited with dynamic kinetic typography, audio synchronization, and high-converting CTA pacing.",
      metrics: [
        { label: "Video Duration", value: v.duration || "0:30", highlight: "amber" },
        { label: "Aspect Ratio", value: v.format || "9:16 Reel", highlight: "purple" },
        { label: "Retention Rate", value: v.retention || "84% Completion", highlight: "emerald" },
        { label: "Soundtrack", value: v.music || "Trending Audio Sync", highlight: "slate" },
      ],
      tags: [v.format, "Canva Video Suite", "Audio Keyframing", "Hook Optimization"],
      currentIndex: index,
      itemsList: canvaVideos,
      navigateFn: (nextIdx) => openCanvaVideoMedia(nextIdx),
    });
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

  const handleAddCanvaVideo = () => {
    if (onChange) {
      const current = Array.isArray(modules.canva?.videos) ? modules.canva.videos : [];
      const newVideo = {
        id: `canva-v-${Date.now()}`,
        title: "New Short-Form Video Reel",
        format: "9:16 Vertical Reel",
        duration: "0:30",
        hook: "First 2 seconds: 'Stop burning ad budget on this one button...'",
        thumbnailUrl: mockupCreativesImg,
        description: "Studio-lit product video reel with kinetic text overlays, feature callout callipers, and clear end-card discount code animation.",
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          canva: {
            ...modules.canva,
            videos: [...current, newVideo],
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

  return (
    <section
      id="canva"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={formatModuleCategory(canvaMeta.category, "Visual Branding & Motion", formattedRank)}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  canvaMeta: { ...canvaMeta, category: val },
                                },
                              });
                            }
                          }}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={canvaMeta.title || "Canva Graphic Design & Short-Form Video Creatives"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  canvaMeta: { ...canvaMeta, title: val },
                                },
                              });
                            }
                          }}
                        />
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          tag="span"
                          value={canvaMeta.subtitle || "High-impact social media carousels, performance ad banners, infographic frameworks, and kinetic motion reels engineered for thumb-stopping engagement."}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  canvaMeta: { ...canvaMeta, subtitle: val },
                                },
                              });
                            }
                          }}
                        />
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

                  {/* Graphic Design Showcases */}
                  {(canvaFilter === "all" || canvaFilter === "designs") && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Box className="w-4 h-4 text-amber-500" />
                          <h3 className="text-lg font-bold text-slate-900">
                            Graphic Design Assets & Carousels
                          </h3>
                          <span className="text-xs text-slate-500 font-mono">
                            ({canvaDesigns.length} showcases)
                          </span>
                        </div>
                        {isEditable && (
                          <button
                            type="button"
                            onClick={handleAddCanvaDesign}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={13} />
                            <span>Add Graphic Design</span>
                          </button>
                        )}
                      </div>

                      <InfiniteCardMarquee
                        items={canvaDesigns}
                        itemKeyPrefix="canva-design"
                        renderItem={(design, dIdx) => (
                          <div
                            key={design.id || dIdx}
                            className="w-[280px] sm:w-[310px] h-full bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative shrink-0"
                          >
                            {/* Delete Design Button */}
                            {isEditable && (
                              <button
                                type="button"
                                onClick={() => handleDeleteCanvaDesign(dIdx)}
                                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white shadow-xs opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20"
                                title="Delete this graphic design showcase"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                            <div
                              className="relative aspect-[4/5] bg-slate-900 overflow-hidden group/img cursor-pointer"
                              onClick={() => openCanvaDesignMedia(dIdx)}
                              title="Click to inspect graphic design deliverable & specifications"
                            >
                              <img
                                src={design.imageUrl || mockupCreativesImg}
                                alt={design.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                                <EditableText
                                  value={design.category || "Design"}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...canvaDesigns];
                                      updated[dIdx] = { ...updated[dIdx], category: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: { ...modules, canva: { ...modules.canva, designs: updated } },
                                      });
                                    }
                                  }}
                                />
                              </div>
                              {/* Hover Overlay with Inspect Work & Change Image */}
                              <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openCanvaDesignMedia(dIdx);
                                  }}
                                  className="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
                                >
                                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Inspect Work</span>
                                </button>
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
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
                                      );
                                    }}
                                    className="px-2.5 py-1.5 bg-slate-900/90 text-white rounded-lg text-xs font-semibold shadow-md hover:bg-blue-600 cursor-pointer flex items-center gap-1 border border-slate-700"
                                  >
                                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                                    <span>Change</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                              <div>
                                <div className="text-[10px] font-mono text-slate-400 mb-1">
                                  <EditableText
                                    value={design.dimensions}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...canvaDesigns];
                                        updated[dIdx] = { ...updated[dIdx], dimensions: val };
                                        onChange({
                                          ...portfolioData,
                                          modules: { ...modules, canva: { ...modules.canva, designs: updated } },
                                        });
                                      }
                                    }}
                                  />
                                </div>
                                <EditableText
                                  value={design.title}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...canvaDesigns];
                                      updated[dIdx] = { ...updated[dIdx], title: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: { ...modules, canva: { ...modules.canva, designs: updated } },
                                      });
                                    }
                                  }}
                                  className="text-xs font-bold text-slate-900 line-clamp-2 block"
                                />
                                <EditableText
                                  tag="p"
                                  value={design.description}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...canvaDesigns];
                                      updated[dIdx] = { ...updated[dIdx], description: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: { ...modules, canva: { ...modules.canva, designs: updated } },
                                      });
                                    }
                                  }}
                                  className="text-[11px] text-slate-600 mt-1 line-clamp-3 leading-relaxed block"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => openCanvaDesignMedia(dIdx)}
                                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 self-start pt-2 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect Design & Specifications</span>
                              </button>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  )}

                  {/* Video Creatives & Reels */}
                  {(canvaFilter === "all" || canvaFilter === "videos") && (
                    <div className="space-y-4 pt-4 border-t border-slate-200/80">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-blue-500" />
                          <h3 className="text-lg font-bold text-slate-900">
                            Short-Form Video Creatives & Kinetic Reels
                          </h3>
                          <span className="text-xs text-slate-500 font-mono">
                            ({canvaVideos.length} reels)
                          </span>
                        </div>
                        {isEditable && (
                          <button
                            type="button"
                            onClick={handleAddCanvaVideo}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={13} />
                            <span>Add Video Reel</span>
                          </button>
                        )}
                      </div>

                      <InfiniteCardMarquee
                        items={canvaVideos}
                        itemKeyPrefix="canva-vid"
                        speed={32}
                        renderItem={(video, vIdx) => (
                          <div
                            key={video.id || vIdx}
                            className="w-[290px] sm:w-[320px] h-full bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors relative shrink-0 shadow-md"
                          >
                            {/* Delete Video Button */}
                            {isEditable && (
                              <button
                                type="button"
                                onClick={() => handleDeleteCanvaVideo(vIdx)}
                                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800/90 hover:bg-rose-600 text-slate-300 hover:text-white shadow-xs opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20"
                                title="Delete this video reel"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}

                            {/* Compact Video Thumbnail mockup */}
                            <div
                              className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden flex items-center justify-center shrink-0 group/thumb cursor-pointer"
                              onClick={() => openCanvaVideoMedia(vIdx)}
                              title="Click to play video reel & view performance metrics"
                            >
                              <img
                                src={video.thumbnailUrl || mockupCreativesImg}
                                alt={video.title}
                                className="w-full h-full object-cover opacity-85 group-hover/thumb:opacity-100 transition-opacity"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10">
                                <EditableText
                                  value={video.format || "9:16 Reel"}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updatedVideos = [...canvaVideos];
                                      updatedVideos[vIdx] = { ...updatedVideos[vIdx], format: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          canva: { ...modules.canva, videos: updatedVideos },
                                        },
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                                <Clock size={10} />
                                <EditableText
                                  value={video.duration || "0:30"}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updatedVideos = [...canvaVideos];
                                      updatedVideos[vIdx] = { ...updatedVideos[vIdx], duration: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          canva: { ...modules.canva, videos: updatedVideos },
                                        },
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                                </div>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                              <div>
                                <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                                  <EditableText
                                    value={video.title || "Untitled Video"}
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
                                  />
                                </h4>
                                <EditableText
                                  value={video.description || ""}
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
                                  className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2 block"
                                />
                              </div>

                              {/* Hook Box */}
                              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
                                <div className="text-[9px] uppercase font-bold text-amber-400 font-mono tracking-wider">
                                  Opening Hook Strategy:
                                </div>
                                <EditableText
                                  value={video.hook || "0-3s pattern interrupt"}
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
                                  className="text-slate-200 mt-0.5 italic block line-clamp-2"
                                />
                              </div>

                              <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
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
                                    className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Camera className="w-3 h-3" />
                                    <span>Thumbnail</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => openCanvaVideoMedia(vIdx)}
                                  className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 ml-auto cursor-pointer"
                                >
                                  <Play className="w-3 h-3 fill-amber-400" />
                                  <span>Play & View Reel Data</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  )}
                </div>
              </section>
  );
};
