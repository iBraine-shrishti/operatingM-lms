import React, { useState } from "react";
import {
  TrendingUp,
  Plus,
  Trash2,
  ExternalLink,
  Camera,
  Eye,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Target,
  Sparkles,
  BarChart3,
  ChevronDown,
  Play,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { InfiniteCardMarquee } from "./previewShared";
import mockupCreativesImg from "../../../assets/mockup-creatives.jpg";

export const Module04SocialMarketing = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-50/70 border-b border-slate-200/40",
}) => {
  const metaAds = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
  const metaMeta = modules.socialMarketingMeta || {};
  const [openMetaIdx, setOpenMetaIdx] = useState(0);

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave, initialWebsiteUrl);
    }
  };

  const openMetaAdMedia = (index) => {
    const metaAds = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
    if (!metaAds[index]) return;
    const ad = metaAds[index];
    onOpenMedia && onOpenMedia({
      type: ad.videoUrl ? "video" : "image",
      moduleNumber: "MODULE 04",
      moduleTitle: "Meta Ads & Paid Social Acquisition",
      category: ad.campaignType || "Meta Ads Manager",
      title: ad.title || "Meta Campaign Ad Creative",
      imageUrl: ad.screenshotUrl || mockupCreativesImg,
      videoUrl: ad.videoUrl || "",
      thumbnailUrl: ad.screenshotUrl || mockupCreativesImg,
      clientType: ad.objective || "Conversions / Sales",
      duration: ad.videoUrl ? "0:30" : undefined,
      hook: ad.hookText || (ad.summary ? `Hook: ${ad.summary.slice(0, 70)}...` : ""),
      description: ad.summary || `High-ROAS Meta advertising creative designed for Advantage+ placements across Instagram Stories, Reels, and Facebook Feeds.`,
      metrics: [
        { label: "ROAS Achieved", value: ad.roas ? `${ad.roas}x` : "4.2x", highlight: "emerald" },
        { label: "Click-Through Rate", value: ad.ctr ? `${ad.ctr}%` : "3.1%", highlight: "amber" },
        { label: "Monthly Spend", value: ad.spend ? `₹${ad.spend}` : "₹45,000", highlight: "purple" },
        { label: "Target CPA", value: ad.cpa ? `₹${ad.cpa}` : "₹180", highlight: "slate" },
      ],
      tags: ["Meta Ads Manager", "Advantage+ Placements", ad.objective, "Retargeting CBO"].filter(Boolean),
      currentIndex: index,
      itemsList: metaAds,
      navigateFn: (nextIdx) => openMetaAdMedia(nextIdx),
    });
  };


  const handleDeleteMetaAd = (idx) => {
    if (onChange) {
      const current = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
      const updated = current.filter((_, i) => i !== idx);
      onChange({
        ...portfolioData,
        modules: { ...modules, socialMarketing: updated },
      });
    }
  };

  const handleAddMetaAd = () => {
    if (onChange) {
      const current = Array.isArray(modules.socialMarketing) ? modules.socialMarketing : [];
      const newAd = {
        id: `smm-acc-${Date.now()}`,
        title: "New Meta Scale Campaign",
        campaignType: "Advantage+ Shopping / CBO Scale",
        objective: "Conversions (Purchase) — Top of Funnel",
        screenshotUrl: mockupCreativesImg,
        summary: "Engineered an Advantage+ Shopping Campaign utilizing dynamic creative testing (DCT) with 3 hooks, 2 bodies, and 2 headline variants.",
        audienceTargeting: "Broad 18-54 F, US National, Excluded 30-day website buyers.",
        budgetSpend: "$450/day spend ($13,500 total 30-day test flight)",
        metrics: {
          ctr: "2.84%",
          cpc: "$0.84",
          roasOrCpa: "4.45x ROAS ($24.80 CPA)",
          purchases: "544 verified DTC checkout conversions",
          conversions: "544 Orders",
          impressions: "450,000+",
          revenue: "$60,200",
        },
      };
      onChange({
        ...portfolioData,
        modules: { ...modules, socialMarketing: [...current, newAd] },
      });
    }
  };

  return (
    <section
      id="socialMarketing"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={metaMeta.category || "Module 04 · Paid Social Advertising"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  socialMarketingMeta: { ...metaMeta, category: val },
                                },
                              });
                            }
                          }}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={metaMeta.title || "Social Media Marketing (Meta & Paid Ads Accordions)"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  socialMarketingMeta: { ...metaMeta, title: val },
                                },
                              });
                            }
                          }}
                        />
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          tag="span"
                          value={metaMeta.subtitle || "Performance advertising campaigns deployed across Meta Ads Manager (Advantage+ Shopping, Lead Gen, and Dynamic Retargeting). Click each accordion to review ad screenshots, targeting, and summary teardowns."}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  socialMarketingMeta: { ...metaMeta, subtitle: val },
                                },
                              });
                            }
                          }}
                        />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs shrink-0">
                      <span className="text-amber-500">👉</span>
                      <EditableText
                        className="font-semibold text-slate-700"
                        value={metaMeta.badge || "Interactive Accordion Structure · Verified Meta ROI"}
                        onChange={(val) => {
                          if (onChange) {
                            onChange({
                              ...portfolioData,
                              modules: {
                                ...modules,
                                socialMarketingMeta: { ...metaMeta, badge: val },
                              },
                            });
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Accordions */}
                  <div className="space-y-4">
                    {metaAds.map((ad, idx) => {
                      const isOpen = openMetaIdx === idx;
                      return (
                        <div
                          key={ad.id || idx}
                          className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "border-blue-400/80 shadow-md bg-white"
                              : "border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          {/* Accordion Bar */}
                          <div className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 select-none bg-white">
                            <button
                              type="button"
                              onClick={() => setOpenMetaIdx(isOpen ? -1 : idx)}
                              aria-expanded={isOpen}
                              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 text-left cursor-pointer focus:outline-hidden"
                            >
                              <div className="w-8 h-8 rounded-lg bg-blue-600 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                                #{idx + 1}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                                    <EditableText
                                      value={ad.campaignType || "Advantage+ Shopping"}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...metaAds];
                                          updated[idx] = { ...updated[idx], campaignType: val };
                                          onChange({ ...portfolioData, modules: { ...modules, socialMarketing: updated } });
                                        }
                                      }}
                                    />
                                  </span>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-xs text-slate-500 font-medium">
                                    <EditableText
                                      value={ad.objective || "Conversions"}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...metaAds];
                                          updated[idx] = { ...updated[idx], objective: val };
                                          onChange({ ...portfolioData, modules: { ...modules, socialMarketing: updated } });
                                        }
                                      }}
                                    />
                                  </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                                  <EditableText
                                    value={ad.title || "Meta Campaign Title"}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...metaAds];
                                        updated[idx] = { ...updated[idx], title: val };
                                        onChange({ ...portfolioData, modules: { ...modules, socialMarketing: updated } });
                                      }
                                    }}
                                  />
                                </h3>
                              </div>
                            </button>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="hidden md:inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                <EditableText
                                  value={ad.metrics?.roasOrCpa || "4.45x ROAS"}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...metaAds];
                                      updated[idx] = {
                                        ...updated[idx],
                                        metrics: { ...updated[idx].metrics, roasOrCpa: val },
                                      };
                                      onChange({ ...portfolioData, modules: { ...modules, socialMarketing: updated } });
                                    }
                                  }}
                                />
                              </span>
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMetaAd(idx)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                                  title="Delete this campaign accordion"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setOpenMetaIdx(isOpen ? -1 : idx)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 cursor-pointer ${
                                  isOpen ? "bg-blue-600 text-white rotate-180" : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Content */}
                          {isOpen && (
                            <div className="border-t border-slate-200 bg-white p-[clamp(1rem,2vw,1.5rem)] flex flex-col lg:flex-row gap-[clamp(1.25rem,2.5vw,2rem)] items-start">
                              {/* Left Column: Creative Mockup */}
                              <div className="w-full lg:w-[clamp(300px,40%,440px)] shrink-0 space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Ad Creative & Placement Screenshot:
                                </div>
                                <div
                                  className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-xs group/ad cursor-pointer"
                                  onClick={() => openMetaAdMedia(idx)}
                                  title="Click to inspect ad creative & campaign data"
                                >
                                  <img
                                    src={ad.screenshotUrl || mockupCreativesImg}
                                    alt={ad.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                  />
                                  {/* Center Play Button if video ad */}
                                  {ad.videoUrl && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                      <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg">
                                        <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                                      </div>
                                    </div>
                                  )}
                                  {/* Hover Inspect Overlay */}
                                  <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover/ad:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openMetaAdMedia(idx);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-lg hover:bg-slate-100 cursor-pointer"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                                      <span>Inspect Creative & KPIs</span>
                                    </button>
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openImageModal(
                                            `Change Meta Ad Creative: ${ad.title}`,
                                            ad.screenshotUrl || mockupCreativesImg,
                                            false,
                                            (newUrl) => {
                                              if (onChange) {
                                                const updated = [...metaAds];
                                                updated[idx] = { ...updated[idx], screenshotUrl: newUrl };
                                                onChange({
                                                  ...portfolioData,
                                                  modules: { ...modules, socialMarketing: updated },
                                                });
                                              }
                                            }
                                          );
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 text-white rounded-lg text-xs font-semibold shadow-lg hover:bg-blue-600 transition-colors cursor-pointer border border-slate-700"
                                      >
                                        <Camera className="w-3.5 h-3.5 text-blue-400" />
                                        <span>Change</span>
                                      </button>
                                    )}
                                  </div>
                                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                                    Meta Ads Manager Verified
                                  </div>
                                </div>
                                <div className="text-[11px] text-slate-500 text-center italic">
                                  Screenshot of live ad creative tested across Instagram Stories & Facebook Feed.
                                </div>
                              </div>

                              {/* Right Column: Details & KPIs */}
                              <div className="w-full lg:w-[calc(100%-clamp(300px,40%,440px)-clamp(1.25rem,2.5vw,2rem))] flex-1 min-w-0 space-y-5">
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                                    Student Ad Campaign Summary:
                                  </div>
                                  <EditableText
                                    tag="p"
                                    value={ad.summary}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...metaAds];
                                        updated[idx] = { ...updated[idx], summary: val };
                                        onChange({
                                          ...portfolioData,
                                          modules: { ...modules, socialMarketing: updated },
                                        });
                                      }
                                    }}
                                    className="text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200/80 block"
                                  />
                                </div>

                                {/* Targeting & Budget */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                                      <Target className="w-3.5 h-3.5 text-blue-600" />
                                      <span>Audience & Targeting:</span>
                                    </div>
                                    <EditableText
                                      value={ad.audienceTargeting}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...metaAds];
                                          updated[idx] = { ...updated[idx], audienceTargeting: val };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, socialMarketing: updated },
                                          });
                                        }
                                      }}
                                      className="text-slate-600 text-[11px] leading-relaxed block"
                                    />
                                  </div>

                                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Budget & Flight:</span>
                                    </div>
                                    <EditableText
                                      value={ad.budgetSpend}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...metaAds];
                                          updated[idx] = { ...updated[idx], budgetSpend: val };
                                          onChange({
                                            ...portfolioData,
                                            modules: { ...modules, socialMarketing: updated },
                                          });
                                        }
                                      }}
                                      className="text-slate-600 text-[11px] leading-relaxed block"
                                    />
                                  </div>
                                </div>

                                {/* KPI Grid */}
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                                    <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Key Performance Indicators (KPIs):</span>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-slate-500">
                                        Outbound CTR
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.ctr}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, ctr: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-sm font-mono font-bold text-blue-700 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-slate-500">
                                        Average CPC
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.cpc}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, cpc: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-sm font-mono font-bold text-slate-700 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-slate-500">
                                        Blended ROAS
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.roasOrCpa}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, roasOrCpa: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-sm font-mono font-bold text-emerald-700 mt-0.5 block"
                                      />
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                      <div className="text-[10px] uppercase font-bold text-slate-500">
                                        Purchases / Leads
                                      </div>
                                      <EditableText
                                        value={ad.metrics?.purchases || ad.metrics?.conversions || "544 Orders"}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...metaAds];
                                            updated[idx] = {
                                              ...updated[idx],
                                              metrics: { ...updated[idx].metrics, purchases: val, conversions: val },
                                            };
                                            onChange({
                                              ...portfolioData,
                                              modules: { ...modules, socialMarketing: updated },
                                            });
                                          }
                                        }}
                                        className="text-xs font-mono font-bold text-slate-800 mt-0.5 truncate block"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Meta Campaign Button */}
                  {isEditable && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleAddMetaAd}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/60 hover:bg-blue-50 text-blue-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <Plus size={15} />
                        <span>Add Meta Paid Ad Campaign</span>
                      </button>
                    </div>
                  )}
                </div>
              </section>
  );
};
