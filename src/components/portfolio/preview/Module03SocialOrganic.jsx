import React from "react";
import {
  Share2,
  Plus,
  Trash2,
  ExternalLink,
  Camera,
  Eye,
  CheckCircle2,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Repeat,
  ChevronRight,
  X,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { renderSmoIcon, InfiniteCardMarquee, formatModuleCategory } from "./previewShared";
import mockupCreativesImg from "../../../assets/mockup-creatives.jpg";

export const Module03SocialOrganic = ({
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
  const smoProfiles = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
  const smoMeta = modules.socialOrganicMeta || {};

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave, initialWebsiteUrl);
    }
  };

  const openSmoMedia = (index) => {
    const smoProfiles = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
    if (!smoProfiles[index]) return;
    const p = smoProfiles[index];
    onOpenMedia && onOpenMedia({
      type: "image",
      moduleNumber: `MODULE ${formattedRank}`,
      moduleTitle: "Organic Social Growth Engineering",
      category: `${p.platform || "Social Media"} Organic Strategy`,
      title: `${p.handle || "@profile"} — ${p.name || "Brand Account"}`,
      imageUrl: p.screenshotUrl || mockupCreativesImg,
      clientType: p.platform || "Organic Social Profile",
      description: p.strategy || `End-to-end 9-grid visual aesthetic curation, bio conversion funnel, hashtag clustering, and audience growth roadmap for ${p.name || p.handle}.`,
      metrics: [
        { label: "Followers", value: p.followers || "12.4K", highlight: "purple" },
        { label: "Engagement Rate", value: p.engagementRate || "4.8%", highlight: "emerald" },
        { label: "30-Day Growth", value: p.growth || "+34%", highlight: "amber" },
        { label: "Total Posts", value: p.postsCount || "84 Posts", highlight: "slate" },
      ],
      tags: [p.platform, "9-Grid Aesthetics", "Hashtag Clustering", "Content Pillars", p.topPostTopic].filter(Boolean),
      liveUrl: p.profileUrl || "",
      currentIndex: index,
      itemsList: smoProfiles,
      navigateFn: (nextIdx) => openSmoMedia(nextIdx),
    });
  };


  const handleAddSMO = () => {
    if (onChange) {
      const current = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
      const newProfile = {
        id: `smo-${Date.now()}`,
        platform: "Instagram",
        icon: "Instagram",
        handle: "@vitalbloom.wellness",
        niche: "Holistic Health & Adaptogens",
        beforeFollowers: "840 followers",
        afterFollowers: "14,800 followers (+1,661%)",
        growthRate: "+210% engagement rate across 90 days",
        bioStrategy: "Revamped bio from generic quote to: 'Doctor-formulated organic adaptogens for sustained focus 🌿 | 25,000+ Happy Minds | Claim your free focus quiz 👇'",
        contentPillars: [
          "40% Science-backed myth busters (educational carousels)",
          "30% Routine reels & Morning rituals (relatable lifestyle)",
          "20% User-Generated Content & Customer Transformations",
          "10% Founder story & behind-the-scenes laboratory batching",
        ],
        customMetrics: [
          { id: `cm-${Date.now()}-1`, label: "Monthly Impressions", value: "280,000/mo" },
          { id: `cm-${Date.now()}-2`, label: "Bio-Link Clicks", value: "640 / week" },
        ],
        screenshotUrl: mockupCreativesImg,
        resultsSummary: "Grew organic impressions from 4,200/mo to 280,000/mo. Generated 640 organic bio-link clicks per week directly to the email opt-in funnel without any paid boost.",
      };
      onChange({
        ...portfolioData,
        modules: { ...modules, socialOrganic: [...current, newProfile] },
      });
    }
  };

  const handleDeleteSMO = (sIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.socialOrganic) ? modules.socialOrganic : [];
      const updated = current.filter((_, i) => i !== sIdx);
      onChange({
        ...portfolioData,
        modules: { ...modules, socialOrganic: updated },
      });
    }
  };

  return (
    <section
      id="socialOrganic"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={formatModuleCategory(smoMeta.category, "Organic Growth Engineering", formattedRank)}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  socialOrganicMeta: { ...smoMeta, category: val },
                                },
                              });
                            }
                          }}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={smoMeta.title || "Social Media Organic (SMO) Profile Optimization"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  socialOrganicMeta: { ...smoMeta, title: val },
                                },
                              });
                            }
                          }}
                        />
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          tag="span"
                          value={smoMeta.subtitle || "Auditing, restructuring, and scaling organic social presence through strategic bio copywriting, content pillars, aesthetic grid curation, and high-retention community triggers."}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  socialOrganicMeta: { ...smoMeta, subtitle: val },
                                },
                              });
                            }
                          }}
                        />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs shrink-0">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <EditableText
                        className="font-semibold text-slate-700"
                        value={smoMeta.badge || "Zero Ad Spend · Pure Organic Inbound Funnels"}
                        onChange={(val) => {
                          if (onChange) {
                            onChange({
                              ...portfolioData,
                              modules: {
                                ...modules,
                                socialOrganicMeta: { ...smoMeta, badge: val },
                              },
                            });
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Infinite Horizontal Cards Marquee */}
                  <InfiniteCardMarquee
                    items={smoProfiles}
                    itemKeyPrefix="smo-profile"
                    renderItem={(profile, pIdx) => (
                      <div
                        key={profile.id || pIdx}
                        className="w-[360px] sm:w-[420px] lg:w-[450px] h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow relative shrink-0"
                      >
                        {/* Header Navy Banner */}
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center shrink-0">
                              {renderSmoIcon(profile.platform, profile.icon)}
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                                <EditableText
                                  value={profile.handle || "@brand"}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...smoProfiles];
                                      updated[pIdx] = { ...updated[pIdx], handle: val };
                                      onChange({
                                        ...portfolioData,
                                        modules: { ...modules, socialOrganic: updated },
                                      });
                                    }
                                  }}
                                />
                                <span className="text-xs text-amber-400 font-normal">
                                  (<EditableText
                                    value={profile.platform || "Platform"}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...smoProfiles];
                                        updated[pIdx] = { ...updated[pIdx], platform: val };
                                        onChange({
                                          ...portfolioData,
                                          modules: { ...modules, socialOrganic: updated },
                                        });
                                      }
                                    }}
                                  />)
                                </span>
                              </h3>
                              <EditableText
                                value={profile.niche}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], niche: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, socialOrganic: updated },
                                    });
                                  }
                                }}
                                className="text-xs text-slate-400 block"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <EditableText
                                value={profile.growthRate}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], growthRate: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, socialOrganic: updated },
                                    });
                                  }
                                }}
                                className="text-xs text-emerald-400 font-bold font-mono block"
                              />
                              <EditableText
                                value={profile.verifiedBadgeText || "Verified Analytics"}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], verifiedBadgeText: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, socialOrganic: updated },
                                    });
                                  }
                                }}
                                className="text-[11px] text-slate-400 block"
                              />
                            </div>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={() => handleDeleteSMO(pIdx)}
                                className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1 shrink-0"
                                title="Delete this profile card"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Baseline vs Post-Optimization Stats */}
                        <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 divide-x divide-slate-200">
                          <div className="p-3.5 text-center">
                            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                              <EditableText
                                value={profile.beforeLabel || "Starting Baseline"}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], beforeLabel: val };
                                    onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                  }
                                }}
                              />
                            </div>
                            <EditableText
                              value={profile.beforeFollowers || profile.followers || "840 followers"}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...smoProfiles];
                                  updated[pIdx] = { ...updated[pIdx], beforeFollowers: val, followers: val };
                                  onChange({
                                    ...portfolioData,
                                    modules: { ...modules, socialOrganic: updated },
                                  });
                                }
                              }}
                              className="text-sm sm:text-base font-mono font-bold text-slate-600 mt-0.5 block"
                            />
                          </div>
                          <div className="p-3.5 text-center bg-blue-50/50">
                            <div className="text-[11px] uppercase tracking-wider text-blue-700 font-semibold">
                              <EditableText
                                value={profile.afterLabel || "Post-Optimization"}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], afterLabel: val };
                                    onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                  }
                                }}
                              />
                            </div>
                            <EditableText
                              value={profile.afterFollowers || "14,800 followers (+1,661%)"}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...smoProfiles];
                                  updated[pIdx] = { ...updated[pIdx], afterFollowers: val };
                                  onChange({
                                    ...portfolioData,
                                    modules: { ...modules, socialOrganic: updated },
                                  });
                                }
                              }}
                              className="text-sm sm:text-base font-mono font-bold text-blue-700 mt-0.5 block"
                            />
                          </div>
                        </div>

                        {/* Custom Additional Fields / Metrics (customizable) */}
                        {((profile.customMetrics && profile.customMetrics.length > 0) || isEditable) && (
                          <div className="px-5 py-2.5 bg-slate-900/5 border-b border-slate-200">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Key Campaign Metrics:
                              </span>
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onChange) {
                                      const updated = [...smoProfiles];
                                      const cms = [...(updated[pIdx].customMetrics || [])];
                                      cms.push({
                                        id: `cm-${Date.now()}`,
                                        label: "Custom Metric",
                                        value: "100+",
                                      });
                                      updated[pIdx] = { ...updated[pIdx], customMetrics: cms };
                                      onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                    }
                                  }}
                                  className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus size={11} />
                                  <span>Add Metric Field</span>
                                </button>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(profile.customMetrics || []).map((cm, cmIdx) => (
                                <div
                                  key={cm.id || cmIdx}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs text-xs group/cm"
                                >
                                  <EditableText
                                    className="text-[10px] uppercase font-bold text-slate-400"
                                    value={cm.label}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...smoProfiles];
                                        const cms = [...(updated[pIdx].customMetrics || [])];
                                        cms[cmIdx] = { ...cms[cmIdx], label: val };
                                        updated[pIdx] = { ...updated[pIdx], customMetrics: cms };
                                        onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                      }
                                    }}
                                  />
                                  <span className="text-slate-300">:</span>
                                  <EditableText
                                    className="font-mono font-bold text-slate-800"
                                    value={cm.value}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...smoProfiles];
                                        const cms = [...(updated[pIdx].customMetrics || [])];
                                        cms[cmIdx] = { ...cms[cmIdx], value: val };
                                        updated[pIdx] = { ...updated[pIdx], customMetrics: cms };
                                        onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                      }
                                    }}
                                  />
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onChange) {
                                          const updated = [...smoProfiles];
                                          const cms = (updated[pIdx].customMetrics || []).filter((_, i) => i !== cmIdx);
                                          updated[pIdx] = { ...updated[pIdx], customMetrics: cms };
                                          onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                        }
                                      }}
                                      className="text-slate-400 hover:text-rose-600 p-0.5 transition-colors cursor-pointer"
                                      title="Delete this custom metric"
                                    >
                                      <X size={11} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Grid Mockup Image */}
                        <div
                          className="relative aspect-[16/9] max-h-[260px] bg-slate-950 overflow-hidden group/img cursor-pointer"
                          onClick={() => openSmoMedia(pIdx)}
                          title="Click to view 9-grid mockup & organic growth data"
                        >
                          <img
                            src={profile.screenshotUrl || mockupCreativesImg}
                            alt={profile.handle}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openSmoMedia(pIdx);
                              }}
                              className="px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-lg hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>Inspect Grid & Data</span>
                            </button>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openImageModal(
                                    `Update SMO Grid Screenshot: ${profile.handle}`,
                                    profile.screenshotUrl || mockupCreativesImg,
                                    false,
                                    (newUrl) => {
                                      if (onChange) {
                                        const updated = [...smoProfiles];
                                        updated[pIdx] = { ...updated[pIdx], screenshotUrl: newUrl };
                                        onChange({
                                          ...portfolioData,
                                          modules: { ...modules, socialOrganic: updated },
                                        });
                                      }
                                    }
                                  );
                                }}
                                className="px-3 py-2 bg-slate-900/90 text-white rounded-lg text-xs font-semibold shadow-lg hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
                              >
                                <Camera className="w-3.5 h-3.5 text-blue-400" />
                                <span>Change</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Bio & CTA Framework Box */}
                            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                                Optimized Bio & CTA Framework:
                              </div>
                              <EditableText
                                value={profile.bioStrategy || profile.bioSetup}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...smoProfiles];
                                    updated[pIdx] = { ...updated[pIdx], bioStrategy: val, bioSetup: val };
                                    onChange({
                                      ...portfolioData,
                                      modules: { ...modules, socialOrganic: updated },
                                    });
                                  }
                                }}
                                className="text-xs text-slate-700 mt-1 italic block leading-relaxed"
                              />
                            </div>

                            {/* Content Pillars */}
                            <div className="mt-4 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                  Engineered Content Pillars:
                                </div>
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onChange) {
                                        const updated = [...smoProfiles];
                                        const pillars = [...(updated[pIdx].contentPillars || [])];
                                        pillars.push("25% High-value educational carousels & tutorials");
                                        updated[pIdx] = { ...updated[pIdx], contentPillars: pillars };
                                        onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                      }
                                    }}
                                    className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus size={11} />
                                    <span>Add Pillar</span>
                                  </button>
                                )}
                              </div>
                              <div className="space-y-1.5">
                                {(profile.contentPillars || []).map((pillar, cIdx) => (
                                  <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-700 group/pillar">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <EditableText
                                      value={pillar}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...smoProfiles];
                                          const pillars = [...(updated[pIdx].contentPillars || [])];
                                          pillars[cIdx] = val;
                                          updated[pIdx] = { ...updated[pIdx], contentPillars: pillars };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, socialOrganic: updated },
                                          });
                                        }
                                      }}
                                      className="flex-1"
                                    />
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onChange) {
                                            const updated = [...smoProfiles];
                                            const pillars = (updated[pIdx].contentPillars || []).filter((_, i) => i !== cIdx);
                                            updated[pIdx] = { ...updated[pIdx], contentPillars: pillars };
                                            onChange({ ...portfolioData, modules: { ...modules, socialOrganic: updated } });
                                          }
                                        }}
                                        className="opacity-0 group-hover/pillar:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 transition-opacity cursor-pointer shrink-0"
                                        title="Delete this content pillar"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Student Campaign Impact */}
                          <div className="pt-3 border-t border-slate-100">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Student Campaign Impact:
                            </div>
                            <EditableText
                              tag="p"
                              value={profile.resultsSummary}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...smoProfiles];
                                  updated[pIdx] = { ...updated[pIdx], resultsSummary: val };
                                  onChange({
                                    ...portfolioData,
                                    modules: { ...modules, socialOrganic: updated },
                                  });
                                }
                              }}
                              className="text-xs text-slate-600 leading-relaxed block"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  {/* Add Profile Card Button */}
                  {isEditable && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleAddSMO}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/60 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <Plus size={15} />
                        <span>Add Channel Profile Card</span>
                      </button>
                    </div>
                  )}
                </div>
              </section>
  );
};
