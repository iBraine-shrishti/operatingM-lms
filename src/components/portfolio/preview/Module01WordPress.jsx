import React, { useState } from "react";
import {
  Globe,
  Plus,
  Trash2,
  ExternalLink,
  Camera,
  Loader2,
  Sparkles,
  Check,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Edit2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Smartphone,
  X,
} from "lucide-react";
import { EditableText } from "../EditableText";
import mockupLaptopImg from "../../../assets/mockup-laptop.jpg";
import { captureWebsiteScreenshot, isValidWebUrl } from "../screenshotService";
import { InfiniteCardMarquee, formatModuleCategory } from "./previewShared";

export const Module01WordPress = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-100/90 border-b border-slate-200/90",
  sequenceNumber = 1,
  formattedRank = "01",
}) => {
  const wpProjects = Array.isArray(modules.wordpress) ? modules.wordpress : [];
  const wpMeta = modules.wordpressMeta || {};
  const [isCapturingWpIdx, setIsCapturingWpIdx] = useState(null);

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave, initialWebsiteUrl);
    }
  };

  const handleCaptureWpCardScreenshot = async (pIdx, urlToCapture) => {
    if (!urlToCapture || !isValidWebUrl(urlToCapture)) {
      if (typeof window !== "undefined") window.alert("Please enter a valid live website URL to capture its UI screenshot.");
      return;
    }

    setIsCapturingWpIdx(pIdx);
    try {
      const screenshot = await captureWebsiteScreenshot(urlToCapture);
      const wpProjects = Array.isArray(modules.wordpress) ? [...modules.wordpress] : [];
      if (wpProjects[pIdx]) {
        wpProjects[pIdx] = { ...wpProjects[pIdx], imageUrl: screenshot };
        if (onChange) {
          onChange({
            ...portfolioData,
            modules: { ...modules, wordpress: wpProjects },
          });
        }
      }
    } catch (err) {
      console.error("Card screenshot capture failed:", err);
      if (typeof window !== "undefined") window.alert("Failed to capture live website screenshot: " + (err.message || "Unknown error"));
    } finally {
      setIsCapturingWpIdx(null);
    }
  };


  const openWpMedia = (index) => {
    const wpProjects = Array.isArray(modules.wordpress) ? modules.wordpress : [];
    if (!wpProjects[index]) return;
    const p = wpProjects[index];
    onOpenMedia && onOpenMedia({
      type: "image",
      moduleNumber: `MODULE ${formattedRank}`,
      moduleTitle: "WordPress CMS Development",
      category: p.type || "Full-Stack CMS Build",
      title: p.title || "WordPress Website",
      imageUrl: p.imageUrl || mockupLaptopImg,
      clientType: p.client || p.category || "Client Website",
      description: p.description || "Custom built WordPress website with sub-second load times and responsive architecture.",
      metrics: [
        { label: "PageSpeed Score", value: `${p.speedScore ?? 96}/100`, highlight: "emerald" },
        { label: "Mobile Responsive", value: "100% Tested", highlight: "purple" },
        { label: "Theme / Builder", value: p.builder || p.theme || "Elementor Pro", highlight: "slate" },
        { label: "Active Plugins", value: p.pluginsCount ? `${p.pluginsCount}+` : "Optimized", highlight: "slate" },
      ],
      tags: [p.builder, p.theme, ...(p.tags || ["WordPress", "WooCommerce", "Elementor Pro"])].filter(Boolean),
      liveUrl: p.liveUrl || "",
      currentIndex: index,
      itemsList: wpProjects,
      navigateFn: (nextIdx) => openWpMedia(nextIdx),
    });
  };


  const handleDeleteWordPress = (pIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.wordpress) ? modules.wordpress : [];
      const updated = current.filter((_, i) => i !== pIdx);
      onChange({
        ...portfolioData,
        modules: { ...modules, wordpress: updated },
      });
    }
  };

  const handleAddWordPress = () => {
    if (onChange) {
      const current = Array.isArray(modules.wordpress) ? modules.wordpress : [];
      const newProj = {
        id: `wp-${Date.now()}`,
        title: "New Client Website & E-commerce Store",
        clientType: "Direct-to-Consumer Brand",
        description: "Custom Elementor Pro and WooCommerce build optimized for mobile conversion and Core Web Vitals.",
        imageUrl: mockupLaptopImg,
        liveUrl: "https://demo.example.com",
        speedScore: 95,
        mobileOptimized: true,
        techStack: ["WordPress 6.4", "Elementor Pro", "WooCommerce", "Cloudflare CDN"],
        keyFeatures: [
          "Custom Sticky Add-to-Cart with dynamic variant selectors",
          "Automated Customer Review Schema markup for rich Google stars",
          "Google Tag Manager & Meta Pixel server-side events configured",
          "Mobile-first responsive drawer navigation with instant search",
        ],
      };
      onChange({
        ...portfolioData,
        modules: { ...modules, wordpress: [...current, newProj] },
      });
    }
  };

  return (
    <section
      id="wordpress"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={formatModuleCategory(wpMeta.category, "Full-Stack CMS", formattedRank)}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  wordpressMeta: { ...wpMeta, category: val },
                                },
                              });
                            }
                          }}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={wpMeta.title || "WordPress Web Design & Development"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  wordpressMeta: { ...wpMeta, title: val },
                                },
                              });
                            }
                          }}
                        />
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          tag="span"
                          value={wpMeta.subtitle || "Custom-built corporate and e-commerce websites focused on high conversion rates, sub-second loading speeds, and responsive mobile architecture."}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  wordpressMeta: { ...wpMeta, subtitle: val },
                                },
                              });
                            }
                          }}
                        />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <EditableText
                        className="font-semibold text-slate-700"
                        value={wpMeta.badge || "Elementor Pro · WooCommerce · Core Web Vitals Tested"}
                        onChange={(val) => {
                          if (onChange) {
                            onChange({
                              ...portfolioData,
                              modules: {
                                ...modules,
                                wordpressMeta: { ...wpMeta, badge: val },
                              },
                            });
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Infinite Horizontal Cards Marquee */}
                  <InfiniteCardMarquee
                    items={wpProjects}
                    itemKeyPrefix="wp-proj"
                    renderItem={(proj, pIdx) => {
                      const domainName = proj.domain || proj.title?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "sample";
                      return (
                        <div
                          key={proj.id || pIdx}
                          className="w-[360px] sm:w-[420px] lg:w-[460px] h-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group relative shrink-0"
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
                                <EditableText
                                  className="text-slate-300 truncate"
                                  value={proj.domain || `${domainName}.demo`}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...wpProjects];
                                      updated[pIdx] = { ...updated[pIdx], domain: val };
                                      onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                    }
                                  }}
                                />
                              </div>
                              {isEditable && (proj.liveUrl || proj.domain) && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCaptureWpCardScreenshot(
                                      pIdx,
                                      proj.liveUrl || (proj.domain ? `https://${proj.domain}` : "")
                                    )
                                  }
                                  disabled={isCapturingWpIdx === pIdx}
                                  className="p-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                  title="Capture screenshot from this live website link"
                                >
                                  {isCapturingWpIdx === pIdx ? (
                                    <Loader2 size={12} className="animate-spin text-blue-400" />
                                  ) : (
                                    <Camera size={12} />
                                  )}
                                </button>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteWordPress(pIdx)}
                                  className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                  title="Delete this project build"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                              <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                                <Zap className="w-3 h-3 text-amber-400" />
                                <span>Speed </span>
                                <EditableText
                                  value={String(proj.speedScore ?? 96)}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...wpProjects];
                                      updated[pIdx] = { ...updated[pIdx], speedScore: parseInt(val, 10) || 90 };
                                      onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                    }
                                  }}
                                />
                                <span>/100</span>
                              </div>
                              <div className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 text-[11px] font-mono px-2 py-0.5 rounded">
                                <Smartphone className="w-3 h-3 text-blue-400" />
                                <span>100% Mobile</span>
                              </div>
                            </div>
                          </div>

                          {/* Laptop Mockup Image */}
                          <div
                            className="relative bg-slate-950 aspect-[16/10] w-full max-h-[380px] overflow-hidden group/img cursor-pointer"
                            onClick={() => openWpMedia(pIdx)}
                            title="Click to view full project data & screenshot"
                          >
                            <img
                              src={proj.imageUrl || mockupLaptopImg}
                              alt={proj.title}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                            />

                            {/* Loading overlay when capturing live UI screenshot */}
                            {isCapturingWpIdx === pIdx && (
                              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2 z-20 animate-in fade-in">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                                <span className="text-xs font-bold font-mono tracking-wide">Capturing Live Website UI...</span>
                                <span className="text-[10px] text-slate-300">Fetching high-res screenshot</span>
                              </div>
                            )}

                            {/* Hover View Screenshot Overlay */}
                            <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-wrap items-center justify-center gap-2 p-3">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openWpMedia(pIdx);
                                }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-lg hover:bg-slate-100 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                                <span>Inspect Project & Data</span>
                              </button>
                              {isEditable && (
                                <>
                                  {/* Auto-capture screenshot from link button */}
                                  {(proj.liveUrl || proj.domain) && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCaptureWpCardScreenshot(
                                          pIdx,
                                          proj.liveUrl || (proj.domain ? `https://${proj.domain}` : "")
                                        );
                                      }}
                                      disabled={isCapturingWpIdx === pIdx}
                                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg transition-colors cursor-pointer"
                                      title="Capture screenshot of live website UI"
                                    >
                                      <Camera className="w-3.5 h-3.5" />
                                      <span>Capture from Link</span>
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
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
                                        },
                                        proj.liveUrl || (proj.domain ? `https://${proj.domain}` : "")
                                      );
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 text-white rounded-lg text-xs font-semibold shadow-lg hover:bg-blue-600 transition-colors cursor-pointer border border-slate-700"
                                  >
                                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                                    <span>Change</span>
                                  </button>
                                </>
                              )}
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
                                    onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                  }
                                }}
                                className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block"
                              />
                              <EditableText
                                value={proj.title}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...wpProjects];
                                    updated[pIdx] = { ...updated[pIdx], title: val };
                                    onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
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
                                    onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                  }
                                }}
                                className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed block"
                              />
                            </div>

                            {/* Core Technical Implementations */}
                            <div className="space-y-2 pt-3 border-t border-slate-100">
                              <div className="flex items-center justify-between">
                                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                                  Core Technical Implementations:
                                </div>
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onChange) {
                                        const updated = [...wpProjects];
                                        const feats = [...(updated[pIdx].keyFeatures || [])];
                                        feats.push("Custom conversion feature & performance optimization");
                                        updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                                        onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                      }
                                    }}
                                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus size={11} />
                                    <span>Add Implementation</span>
                                  </button>
                                )}
                              </div>
                              <div className="space-y-1.5">
                                {(proj.keyFeatures || []).map((feat, fIdx) => (
                                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 group/feat">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                    <EditableText
                                      value={feat}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...wpProjects];
                                          const feats = [...(updated[pIdx].keyFeatures || [])];
                                          feats[fIdx] = val;
                                          updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                                          onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                        }
                                      }}
                                      className="flex-1"
                                    />
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onChange) {
                                            const updated = [...wpProjects];
                                            const feats = (updated[pIdx].keyFeatures || []).filter((_, i) => i !== fIdx);
                                            updated[pIdx] = { ...updated[pIdx], keyFeatures: feats };
                                            onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                          }
                                        }}
                                        className="opacity-0 group-hover/feat:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 transition-opacity cursor-pointer shrink-0"
                                        title="Delete this implementation"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Footer tech tags & inspect link */}
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {(proj.techStack || []).map((tech, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200 group/tag"
                                  >
                                    <EditableText
                                      value={tech}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...wpProjects];
                                          const techs = [...(updated[pIdx].techStack || [])];
                                          techs[tIdx] = val;
                                          updated[pIdx] = { ...updated[pIdx], techStack: techs };
                                          onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                        }
                                      }}
                                    />
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onChange) {
                                            const updated = [...wpProjects];
                                            const techs = (updated[pIdx].techStack || []).filter((_, i) => i !== tIdx);
                                            updated[pIdx] = { ...updated[pIdx], techStack: techs };
                                            onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                          }
                                        }}
                                        className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                        title="Delete tag"
                                      >
                                        <X size={10} />
                                      </button>
                                    )}
                                  </span>
                                ))}
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onChange) {
                                        const updated = [...wpProjects];
                                        const techs = [...(updated[pIdx].techStack || []), "WordPress 6.4"];
                                        updated[pIdx] = { ...updated[pIdx], techStack: techs };
                                        onChange({ ...portfolioData, modules: { ...modules, wordpress: updated } });
                                      }
                                    }}
                                    className="px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus size={10} />
                                    <span>Tag</span>
                                  </button>
                                )}
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
                    }}
                  />

                  {/* Add Project Card Button */}
                  {isEditable && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleAddWordPress}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/60 hover:bg-blue-50 text-blue-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <Plus size={15} />
                        <span>Add WordPress Project Card</span>
                      </button>
                    </div>
                  )}
                </div>
              </section>
  );
};
