import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Target,
  Sparkles,
  BarChart3,
  Eye,
  TrendingUp,
  Layers,
  ChevronDown,
  Camera,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { formatModuleCategory } from "./previewShared";
import mockupLaptopImg from "../../../assets/mockup-laptop.jpg";

export const Module05GoogleAds = ({
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
  const gAds = Array.isArray(modules.googleAds) ? modules.googleAds : [];
  const gMeta = modules.googleAdsMeta || {};
  const [openGoogleIdx, setOpenGoogleIdx] = useState(0);

  const openGoogleAdMedia = (index) => {
    const gAds = Array.isArray(modules.googleAds) ? modules.googleAds : [];
    if (!gAds[index]) return;
    const gad = gAds[index];
    onOpenMedia && onOpenMedia({
      type: "image",
      moduleNumber: `MODULE ${formattedRank}`,
      moduleTitle: "Google Ads & High-Intent Search Architecture",
      category: gad.campaignType || "Google Search Campaign",
      title: gad.campaignName || "Google Ads Architecture",
      imageUrl: gad.screenshotUrl || mockupLaptopImg,
      clientType: gad.campaignType || "Search Network",
      description: `${gad.headline1 || "High Converting Search Ad"} | ${gad.description1 || "Comprehensive keyword bidding structure with sitelink extensions, callouts, and conversion tracking."}`,
      metrics: [
        { label: "Monthly Spend", value: gad.spend ? `₹${gad.spend}` : "₹60,000", highlight: "purple" },
        { label: "Conversion Rate", value: gad.conversionRate ? `${gad.conversionRate}%` : "5.4%", highlight: "emerald" },
        { label: "Average CPC", value: gad.cpc ? `₹${gad.cpc}` : "₹12.40", highlight: "amber" },
        { label: "ROAS / Quality Score", value: gad.qualityScore ? `${gad.qualityScore}/10` : "9/10 QS", highlight: "slate" },
      ],
      tags: ["Google Ads", gad.campaignType, "SKAG Keyword Structure", "Sitelink Extensions", "Negative Keywords"].filter(Boolean),
      liveUrl: gad.landingPageUrl || "",
      currentIndex: index,
      itemsList: gAds,
      navigateFn: (nextIdx) => openGoogleAdMedia(nextIdx),
    });
  };


  const handleDeleteGoogleAd = (idx) => {
    if (onChange) {
      const current = Array.isArray(modules.googleAds) ? modules.googleAds : [];
      const updated = current.filter((_, i) => i !== idx);
      onChange({
        ...portfolioData,
        modules: { ...modules, googleAds: updated },
      });
    }
  };

  const handleAddGoogleAd = () => {
    if (onChange) {
      const current = Array.isArray(modules.googleAds) ? modules.googleAds : [];
      const newGad = {
        id: `gads-${Date.now()}`,
        campaignName: "High-Intent Search: Category Keywords",
        campaignType: "Search Ad",
        screenshotUrl: mockupLaptopImg,
        summary: "Restructured legacy broad-match campaigns into tight single-theme ad groups (STAGs) with exact and phrase match keywords.",
        headlines: [
          "Emergency Commercial Plumber | 24/7 Rapid Response",
          "Licensed Techs on Site in 45 Min | Upfront Pricing",
          "No Hidden Overtime Fees | Call Our Master Dispatch",
        ],
        descriptions: [
          "Top-rated licensed master plumbers dispatched immediately. Clear upfront flat-rate pricing.",
          "Fast response times, emergency shutoff & commercial pipe repairs. Speak with an expert now.",
        ],
        metrics: {
          ctr: "8.65%",
          avgCpc: "$3.42",
          convRate: "14.2%",
          conversions: "324 verified phone calls & lead forms",
          costPerConv: "$24.10",
          roas: "5.8x",
          impressions: "42,000",
        },
      };
      onChange({
        ...portfolioData,
        modules: { ...modules, googleAds: [...current, newGad] },
      });
    }
  };

  return (
    <section
      id="googleAds"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={formatModuleCategory(gMeta.category, "Search Engine & Intent Advertising", formattedRank)}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, googleAdsMeta: { ...gMeta, category: val } },
                              });
                            }
                          }}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={gMeta.title || "Google Ads Campaigns & Search Architecture"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, googleAdsMeta: { ...gMeta, title: val } },
                              });
                            }
                          }}
                        />
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          tag="span"
                          value={gMeta.subtitle || "High-intent Google Search, Performance Max, and YouTube video ad campaigns configured with tight STAG ad groups, negative keyword exclusions, and automated bidding strategies."}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, googleAdsMeta: { ...gMeta, subtitle: val } },
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
                        value={gMeta.badge || "Ad Copy Variations · Quality Scores 9/10"}
                        onChange={(val) => {
                          if (onChange) {
                            onChange({
                              ...portfolioData,
                              modules: { ...modules, googleAdsMeta: { ...gMeta, badge: val } },
                            });
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Accordions */}
                  <div className="space-y-4">
                    {gAds.map((gad, idx) => {
                      const isOpen = openGoogleIdx === idx;
                      return (
                        <div
                          key={gad.id || idx}
                          className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "border-blue-500/80 shadow-md bg-white"
                              : "border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          {/* Accordion Bar */}
                          <div className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 select-none bg-white">
                            <button
                              type="button"
                              onClick={() => setOpenGoogleIdx(isOpen ? -1 : idx)}
                              aria-expanded={isOpen}
                              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 text-left cursor-pointer focus:outline-hidden"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                                #{idx + 1}
                              </div>
                              <div>
                                <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                                  <EditableText
                                    value={gad.campaignType || "Search Ad"}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...gAds];
                                        updated[idx] = { ...updated[idx], campaignType: val };
                                        onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                      }
                                    }}
                                  />
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                                  <EditableText
                                    value={gad.campaignName || "Google Ads Campaign"}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...gAds];
                                        updated[idx] = { ...updated[idx], campaignName: val };
                                        onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                      }
                                    }}
                                  />
                                </h3>
                              </div>
                            </button>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="hidden md:inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                <EditableText
                                  value={gad.metrics?.convRate || "14.2% Conv"}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...gAds];
                                      updated[idx] = {
                                        ...updated[idx],
                                        metrics: { ...updated[idx].metrics, convRate: val },
                                      };
                                      onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                    }
                                  }}
                                />
                              </span>
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteGoogleAd(idx)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white transition-colors cursor-pointer"
                                  title="Delete this Google ad campaign"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setOpenGoogleIdx(isOpen ? -1 : idx)}
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
                              {/* Left Column: UI Mockup */}
                              <div className="w-full lg:w-[clamp(300px,40%,440px)] shrink-0 space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  Search Architecture & Extension Preview:
                                </div>
                                <div
                                  className="relative bg-slate-950 rounded-xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-xs group/gad cursor-pointer"
                                  onClick={() => openGoogleAdMedia(idx)}
                                  title="Click to inspect Google Ad & performance data"
                                >
                                  <img
                                    src={gad.screenshotUrl || mockupLaptopImg}
                                    alt={gad.campaignName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                  />
                                  {/* Hover Inspect Overlay */}
                                  <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover/gad:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openGoogleAdMedia(idx);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-lg hover:bg-slate-100 cursor-pointer"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                                      <span>Inspect Ad & Metrics</span>
                                    </button>
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onOpenImageModal && onOpenImageModal(
                                            `Change Google Ads Preview: ${gad.campaignName}`,
                                            gad.screenshotUrl || mockupLaptopImg,
                                            false,
                                            (newUrl) => {
                                              if (onChange) {
                                                const updated = [...gAds];
                                                updated[idx] = { ...updated[idx], screenshotUrl: newUrl };
                                                onChange({
                                                  ...portfolioData,
                                                  modules: { ...modules, googleAds: updated },
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
                                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                                    Google Ads Verified
                                  </div>
                                </div>
                              </div>

                              {/* Right Column: Copy & KPIs */}
                              <div className="w-full lg:w-[calc(100%-clamp(300px,40%,440px)-clamp(1.25rem,2.5vw,2rem))] flex-1 min-w-0 space-y-5">
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                                    Campaign Strategy & Structure:
                                  </div>
                                  <EditableText
                                    tag="p"
                                    value={gad.summary}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...gAds];
                                        updated[idx] = { ...updated[idx], summary: val };
                                        onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                      }
                                    }}
                                    className="text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200/80 block"
                                  />
                                </div>

                                {/* Responsive Search Ad Headlines */}
                                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                      Tested Responsive Search Headlines (H1 - H3):
                                    </div>
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onChange) {
                                            const updated = [...gAds];
                                            const hls = [...(updated[idx].headlines || [])];
                                            hls.push("New High-Converting Google Headline | Call Now");
                                            updated[idx] = { ...updated[idx], headlines: hls };
                                            onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                          }
                                        }}
                                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                      >
                                        <Plus size={11} />
                                        <span>Add Headline</span>
                                      </button>
                                    )}
                                  </div>
                                  <div className="space-y-1.5">
                                    {(gad.headlines || []).map((headline, hIdx) => (
                                      <div key={hIdx} className="flex items-center gap-2 text-xs group/hl">
                                        <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                                          H{hIdx + 1}
                                        </span>
                                        <EditableText
                                          value={headline}
                                          onChange={(val) => {
                                            if (onChange) {
                                              const updated = [...gAds];
                                              const hls = [...(updated[idx].headlines || [])];
                                              hls[hIdx] = val;
                                              updated[idx] = { ...updated[idx], headlines: hls };
                                              onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                            }
                                          }}
                                          className="text-slate-800 font-medium flex-1"
                                        />
                                        {isEditable && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (onChange) {
                                                const updated = [...gAds];
                                                const hls = (updated[idx].headlines || []).filter((_, i) => i !== hIdx);
                                                updated[idx] = { ...updated[idx], headlines: hls };
                                                onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                              }
                                            }}
                                            className="opacity-0 group-hover/hl:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer"
                                            title="Delete headline"
                                          >
                                            <Trash2 size={11} />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Descriptions */}
                                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                      Descriptions & Callout Extensions (D1 - D2):
                                    </div>
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onChange) {
                                            const updated = [...gAds];
                                            const descs = [...(updated[idx].descriptions || [])];
                                            descs.push("Clear upfront pricing and prompt expert assistance. Contact us today.");
                                            updated[idx] = { ...updated[idx], descriptions: descs };
                                            onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                          }
                                        }}
                                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                      >
                                        <Plus size={11} />
                                        <span>Add Description</span>
                                      </button>
                                    )}
                                  </div>
                                  <div className="space-y-1.5">
                                    {(gad.descriptions || []).map((desc, dIdx) => (
                                      <div key={dIdx} className="flex items-start gap-2 text-xs group/desc">
                                        <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                          D{dIdx + 1}
                                        </span>
                                        <EditableText
                                          value={desc}
                                          onChange={(val) => {
                                            if (onChange) {
                                              const updated = [...gAds];
                                              const descs = [...(updated[idx].descriptions || [])];
                                              descs[dIdx] = val;
                                              updated[idx] = { ...updated[idx], descriptions: descs };
                                              onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                            }
                                          }}
                                          className="text-slate-600 flex-1 leading-relaxed"
                                        />
                                        {isEditable && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (onChange) {
                                                const updated = [...gAds];
                                                const descs = (updated[idx].descriptions || []).filter((_, i) => i !== dIdx);
                                                updated[idx] = { ...updated[idx], descriptions: descs };
                                                onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                              }
                                            }}
                                            className="opacity-0 group-hover/desc:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer mt-0.5"
                                            title="Delete description"
                                          >
                                            <Trash2 size={11} />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* KPI Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                    <div className="text-[10px] uppercase font-bold text-slate-500">
                                      Click-Through Rate
                                    </div>
                                    <EditableText
                                      value={gad.metrics?.ctr}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...gAds];
                                          updated[idx] = { ...updated[idx], metrics: { ...updated[idx].metrics, ctr: val } };
                                          onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
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
                                      value={gad.metrics?.avgCpc}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...gAds];
                                          updated[idx] = { ...updated[idx], metrics: { ...updated[idx].metrics, avgCpc: val } };
                                          onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                        }
                                      }}
                                      className="text-sm font-mono font-bold text-slate-700 mt-0.5 block"
                                    />
                                  </div>

                                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                    <div className="text-[10px] uppercase font-bold text-slate-500">
                                      Conversion Rate
                                    </div>
                                    <EditableText
                                      value={gad.metrics?.convRate}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...gAds];
                                          updated[idx] = { ...updated[idx], metrics: { ...updated[idx].metrics, convRate: val } };
                                          onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                        }
                                      }}
                                      className="text-sm font-mono font-bold text-emerald-700 mt-0.5 block"
                                    />
                                  </div>

                                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
                                    <div className="text-[10px] uppercase font-bold text-slate-500">
                                      Conversions
                                    </div>
                                    <EditableText
                                      value={gad.metrics?.conversions || "324 Leads"}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...gAds];
                                          updated[idx] = { ...updated[idx], metrics: { ...updated[idx].metrics, conversions: val } };
                                          onChange({ ...portfolioData, modules: { ...modules, googleAds: updated } });
                                        }
                                      }}
                                      className="text-xs font-mono font-bold text-slate-800 mt-0.5 truncate block"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Google Campaign Button */}
                  {isEditable && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleAddGoogleAd}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/60 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <Plus size={15} />
                        <span>Add Google Ads Campaign</span>
                      </button>
                    </div>
                  )}
                </div>
              </section>
  );
};
