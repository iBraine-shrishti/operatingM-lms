import React, { useState, useRef } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
  Award,
  Calendar,
  DollarSign,
  Activity,
  Users,
  Layers,
  ShieldCheck,
  Flame,
  Zap,
} from "lucide-react";
import { EditableText } from "../EditableText";

export const Module07DigitalPlanning = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-100/90 border-b border-slate-200/90",
}) => {
  const planData = modules.digitalPlanning || {};
  const planMeta = modules.digitalPlanningMeta || {};
  const [planSlideIdx, setPlanSlideIdx] = useState(0);
  const deckTouchStartX = useRef(0);
  const deckLastWheelTime = useRef(0);

  const handleDeckTouchStart = (e) => {
    deckTouchStartX.current = e.touches[0].clientX;
  };

  const handleDeckTouchEnd = (e, totalSlides) => {
    const endX = e.changedTouches[0].clientX;
    const diff = deckTouchStartX.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setPlanSlideIdx((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
      } else {
        setPlanSlideIdx((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
      }
    }
  };

  const handleDeckWheel = (e, totalSlides) => {
    if (Math.abs(e.deltaX) > 30 || (e.shiftKey && Math.abs(e.deltaY) > 30)) {
      const now = Date.now();
      if (now - deckLastWheelTime.current > 350) {
        deckLastWheelTime.current = now;
        const delta = Math.abs(e.deltaX) > 30 ? e.deltaX : e.deltaY;
        if (delta > 0) {
          setPlanSlideIdx((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
        } else {
          setPlanSlideIdx((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
        }
      }
    }
  };

  const defaultDeck = [
    {
      slideNumber: 1,
      tag: "EXECUTIVE DELIVERABLE · CURRENT STATE VS MARKET LEADERS IN SUSTAINABLE ACTIVEWEAR",
      title: "Executive Brand Audit: Omni-Channel Gap Analysis",
      findings: [
        "Brand had a 72% reliance on paid Meta prospecting with zero email retention lifecycle marketing",
        "Organic brand search volume trailed competitors by 4.2x due to lack of PR and SEO authority content",
        "Website bounce rate on mobile was 68% due to sluggish product page loading times",
      ],
      metricsTable: [
        { metric: "Organic Traffic Share", auditState: "11%", benchmark: "38%" },
        { metric: "Blended Customer Acquisition Cost", auditState: "$64", benchmark: "$39" },
        { metric: "Email List Revenue Contribution", auditState: "6%", benchmark: "28%" },
      ],
    },
    {
      slideNumber: 2,
      tag: "EXECUTIVE DELIVERABLE · PERSONA: 'CONSCIOUS ACHIEVER CLARA' (AGE 28-42, HIGH HOUSEHOLD INCOME)",
      title: "Target Customer Persona & Mindset Mapping",
      findings: [
        "Primary motivation: Technical performance without toxic synthetic petroleum dyes or microplastics",
        "Main friction: Skeptical of greenwashing claims; needs transparent third-party laboratory certifications",
        "Trigger moments: New fitness milestones, corporate marathon signups, weekend hiking expeditions",
      ],
      frameworkArchitecture: "Empathy map outlining Clara's daily routine, media consumption channels (Substack, podcasts, TikTok), and purchase objections.",
    },
    {
      slideNumber: 3,
      tag: "EXECUTIVE DELIVERABLE · INTEGRATING PAID DISCOVERY, ORGANIC COMMUNITY, AND AUTOMATED RETENTION",
      title: "360° Omnichannel Funnel Architecture",
      findings: [
        "TOFU: Meta Broad Advantage+ Video hooks + TikTok UGC problem/solution demonstrations",
        "MOFU: Google Search commercial intent keywords + Retargeting comparison landing pages",
        "BOFU: Klaviyo 6-part automated welcome flow + SMS cart recovery offering VIP perks instead of deep discounts",
      ],
      frameworkArchitecture: "Funnel visual flow showing user progression from initial video impression down to post-purchase referral.",
    },
  ];

  const defaultRoadmap = [
    {
      weeks: "Weeks 1 - 4",
      allocation: "15% Allocation",
      phase: "Phase 1: Foundation & Infrastructure",
      channels: ["Technical SEO", "Analytics Setup", "Tracking Pixel CAPI"],
      deliverables: [
        "Deploy Server-Side Meta CAPI & Google Tag Manager Enhanced Conversions",
        "Perform comprehensive site speed optimization (sub-1.5s load times)",
        "Build Klaviyo automated core email flows (Welcome, Cart, Post-Purchase)",
      ],
      milestone: "Milestone Review at 4",
    },
    {
      weeks: "Weeks 5 - 10",
      allocation: "60% Allocation",
      phase: "Phase 2: Acquisition & Paid Testing",
      channels: ["Meta Advantage+ CBO", "Google PMax & Search", "Micro-Influencer Seeding"],
      deliverables: [
        "Test 20 creative iterations across 4 hook themes to find winning angles",
        "Launch Exact Match Google Ads for high-intent category terms",
        "Seed product with 30 micro-influencers for authentic testimonial UGC assets",
      ],
      milestone: "Milestone Review at 10",
    },
    {
      weeks: "Weeks 11 - 16",
      allocation: "25% Allocation",
      phase: "Phase 3: Scaling, CRO & Retention",
      channels: ["Full-Scale Performance Budget", "A/B Landing Page Testing", "Affiliate Program"],
      deliverables: [
        "Scale winning Meta ad sets vertically and horizontally across lookalike pockets",
        "Launch dedicated advertorial landing pages via Replo/Unbounce to boost conversion rates",
        "Activate VIP loyalty tier and subscription re-order triggers",
      ],
      milestone: "Milestone Review at 16",
    },
  ];

  const deck = Array.isArray(planData.brandAuditDeck) && planData.brandAuditDeck.length > 0 ? planData.brandAuditDeck : defaultDeck;
  const roadmap = Array.isArray(planData.strategyRoadmap) && planData.strategyRoadmap.length > 0 ? planData.strategyRoadmap : defaultRoadmap;
  const currentSlide = deck[planSlideIdx] || deck[0];

  const handleAddPlanSlide = () => {
    if (onChange) {
      const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
        ? modules.digitalPlanning.brandAuditDeck
        : [];
      const newSlide = {
        slideNumber: current.length + 1,
        tag: "EXECUTIVE DELIVERABLE · STRATEGIC GROWTH ROADMAP",
        title: "New Omnichannel Strategy Deliverable",
        findings: [
          "Core strategic takeaway outlining customer journey friction and unlock points.",
          "Key benchmark comparison against top category competitors.",
          "Actionable milestone roadmap for scaling marketing attribution.",
        ],
        frameworkArchitecture: "Strategic workflow architecture detailing channel dependencies and expected ROI.",
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          digitalPlanning: {
            ...modules.digitalPlanning,
            brandAuditDeck: [...current, newSlide],
          },
        },
      });
    }
  };

  const handleDeletePlanSlide = (sIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.digitalPlanning?.brandAuditDeck)
        ? modules.digitalPlanning.brandAuditDeck
        : [];
      const updated = current.filter((_, i) => i !== sIdx);
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          digitalPlanning: {
            ...modules.digitalPlanning,
            brandAuditDeck: updated,
          },
        },
      });
    }
  };

  return (
    <section
      id="digitalPlanning"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 07 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={planMeta.category || "MODULE 07 · STRATEGIC GROWTH ARCHITECTURE"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, digitalPlanningMeta: { ...planMeta, category: val } },
                              });
                            }
                          }}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={planMeta.title || "Digital Planning, Brand Audit & Strategy Deck"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, digitalPlanningMeta: { ...planMeta, title: val } },
                              });
                            }
                          }}
                        />
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          tag="span"
                          value={planMeta.subtitle || "A complete executive brand audit deck presented to leadership, coupled with a 16-week omnichannel growth marketing plan and budget allocation framework."}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, digitalPlanningMeta: { ...planMeta, subtitle: val } },
                              });
                            }
                          }}
                        />
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-2xs shrink-0">
                      <Briefcase className="w-4 h-4 text-amber-500" />
                      <EditableText
                        className="font-semibold text-slate-700"
                        value={planMeta.badge || "Interactive Pitch Deck & 16-Week Roadmap"}
                        onChange={(val) => {
                          if (onChange) {
                            onChange({
                              ...portfolioData,
                              modules: { ...modules, digitalPlanningMeta: { ...planMeta, badge: val } },
                            });
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* 1. Executive Pitch Deck Dark Slider Container */}
                  <div
                    className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden select-none transition-all touch-pan-y"
                    onTouchStart={handleDeckTouchStart}
                    onTouchEnd={(e) => handleDeckTouchEnd(e, deck.length)}
                    onWheel={(e) => handleDeckWheel(e, deck.length)}
                  >
                    {/* Slide Top Bar */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                        <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider shrink-0">
                          SLIDE {planSlideIdx + 1} OF {deck.length}
                        </span>
                        <span className="text-slate-600 hidden sm:inline">|</span>
                        <span className="text-xs text-slate-300 font-medium truncate hidden sm:inline">
                          Executive Brand Audit & Gap Analysis Deck
                        </span>
                      </div>

                      {/* Controls: Prev, Indicators, Next, Delete, Add */}
                      <div className="flex items-center gap-2 shrink-0">
                        {isEditable && (
                          <button
                            type="button"
                            onClick={() => handleDeletePlanSlide(planSlideIdx)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Delete this slide"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setPlanSlideIdx((prev) => (prev > 0 ? prev - 1 : deck.length - 1))}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Previous Slide"
                        >
                          <ChevronLeft size={14} />
                        </button>

                        <div className="flex items-center gap-1.5 px-1">
                          {deck.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setPlanSlideIdx(idx)}
                              className={`transition-all cursor-pointer ${
                                idx === planSlideIdx
                                  ? "w-6 h-1.5 rounded-full bg-amber-400"
                                  : "w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-500"
                              }`}
                              title={`Go to Slide ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setPlanSlideIdx((prev) => (prev < deck.length - 1 ? prev + 1 : 0))}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Next Slide"
                        >
                          <ChevronRight size={14} />
                        </button>

                        {isEditable && (
                          <button
                            type="button"
                            onClick={handleAddPlanSlide}
                            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                            title="Add new slide"
                          >
                            <Plus size={13} />
                            <span className="hidden sm:inline">Add Slide</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Slide Body Content */}
                    <div className="py-6 sm:py-8 space-y-6">
                      <div>
                        <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                          <EditableText
                            value={currentSlide.tag || "EXECUTIVE DELIVERABLE · CURRENT STATE VS MARKET LEADERS IN SUSTAINABLE ACTIVEWEAR"}
                            onChange={(val) => {
                              if (onChange) {
                                const updated = [...deck];
                                updated[planSlideIdx] = { ...updated[planSlideIdx], tag: val };
                                onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                              }
                            }}
                          />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                          <EditableText
                            value={currentSlide.title || "Executive Brand Audit: Omni-Channel Gap Analysis"}
                            onChange={(val) => {
                              if (onChange) {
                                const updated = [...deck];
                                updated[planSlideIdx] = { ...updated[planSlideIdx], title: val };
                                onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                              }
                            }}
                          />
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Strategic Diagnostic Findings */}
                        <div className="lg:col-span-7 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                              STRATEGIC DIAGNOSTIC FINDINGS:
                            </div>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (onChange) {
                                    const updated = [...deck];
                                    const findings = [...(updated[planSlideIdx].findings || [])];
                                    findings.push("New strategic diagnostic observation and critical benchmark takeaway.");
                                    updated[planSlideIdx] = { ...updated[planSlideIdx], findings };
                                    onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                  }
                                }}
                                className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                              >
                                <Plus size={10} />
                                <span>Add Finding</span>
                              </button>
                            )}
                          </div>
                          {(currentSlide.findings || []).map((finding, fIdx) => (
                            <div
                              key={fIdx}
                              className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 flex items-start gap-3.5 shadow-2xs group/find"
                            >
                              <span className="w-6 h-6 rounded-md bg-blue-600/30 text-blue-400 border border-blue-500/40 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {fIdx + 1}
                              </span>
                              <EditableText
                                value={finding}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...deck];
                                    const findings = [...(updated[planSlideIdx].findings || [])];
                                    findings[fIdx] = val;
                                    updated[planSlideIdx] = { ...updated[planSlideIdx], findings };
                                    onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                  }
                                }}
                                className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal flex-1"
                              />
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onChange) {
                                      const updated = [...deck];
                                      const findings = (updated[planSlideIdx].findings || []).filter((_, i) => i !== fIdx);
                                      updated[planSlideIdx] = { ...updated[planSlideIdx], findings };
                                      onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                    }
                                  }}
                                  className="opacity-0 group-hover/find:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-0.5 cursor-pointer shrink-0"
                                  title="Delete finding"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Right Column: Benchmarking Matrix or Framework Architecture */}
                        <div className="lg:col-span-5 space-y-3">
                          {currentSlide.metricsTable && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                  DIAGNOSTIC BENCHMARKING MATRIX:
                                </div>
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onChange) {
                                        const updated = [...deck];
                                        const mt = [...(updated[planSlideIdx].metricsTable || [])];
                                        mt.push({ metric: "New Benchmark Metric", auditState: "15%", benchmark: "45%" });
                                        updated[planSlideIdx] = { ...updated[planSlideIdx], metricsTable: mt };
                                        onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                      }
                                    }}
                                    className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus size={10} />
                                    <span>Add Metric</span>
                                  </button>
                                )}
                              </div>
                              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 overflow-hidden shadow-2xs">
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-800 text-slate-400">
                                      <th className="pb-2 font-semibold">Metric</th>
                                      <th className="pb-2 font-semibold text-right">Audit State</th>
                                      <th className="pb-2 font-semibold text-right text-emerald-400">Benchmark</th>
                                      {isEditable && <th className="pb-2 w-8 text-center"></th>}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-800/60 font-mono">
                                    {(currentSlide.metricsTable || []).map((row, rIdx) => (
                                      <tr key={rIdx} className="hover:bg-slate-800/40 group/mtr">
                                        <td className="py-2.5 text-slate-200 font-sans font-medium">
                                          <EditableText
                                            value={row.metric}
                                            onChange={(val) => {
                                              if (onChange) {
                                                const updated = [...deck];
                                                const mt = [...(updated[planSlideIdx].metricsTable || [])];
                                                mt[rIdx] = { ...mt[rIdx], metric: val };
                                                updated[planSlideIdx] = { ...updated[planSlideIdx], metricsTable: mt };
                                                onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                              }
                                            }}
                                          />
                                        </td>
                                        <td className="py-2.5 text-right text-rose-400 font-bold">
                                          <EditableText
                                            value={row.auditState}
                                            onChange={(val) => {
                                              if (onChange) {
                                                const updated = [...deck];
                                                const mt = [...(updated[planSlideIdx].metricsTable || [])];
                                                mt[rIdx] = { ...mt[rIdx], auditState: val };
                                                updated[planSlideIdx] = { ...updated[planSlideIdx], metricsTable: mt };
                                                onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                              }
                                            }}
                                          />
                                        </td>
                                        <td className="py-2.5 text-right text-emerald-400 font-bold">
                                          <EditableText
                                            value={row.benchmark}
                                            onChange={(val) => {
                                              if (onChange) {
                                                const updated = [...deck];
                                                const mt = [...(updated[planSlideIdx].metricsTable || [])];
                                                mt[rIdx] = { ...mt[rIdx], benchmark: val };
                                                updated[planSlideIdx] = { ...updated[planSlideIdx], metricsTable: mt };
                                                onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                              }
                                            }}
                                          />
                                        </td>
                                        {isEditable && (
                                          <td className="py-2.5 text-center">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                if (onChange) {
                                                  const updated = [...deck];
                                                  const mt = (updated[planSlideIdx].metricsTable || []).filter((_, i) => i !== rIdx);
                                                  updated[planSlideIdx] = { ...updated[planSlideIdx], metricsTable: mt };
                                                  onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                                }
                                              }}
                                              className="opacity-0 group-hover/mtr:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-0.5 cursor-pointer"
                                              title="Delete benchmark row"
                                            >
                                              <Trash2 size={11} />
                                            </button>
                                          </td>
                                        )}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {currentSlide.frameworkArchitecture && (
                            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-2">
                              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                FRAMEWORK ARCHITECTURE:
                              </div>
                              <EditableText
                                tag="p"
                                value={currentSlide.frameworkArchitecture}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...deck];
                                    updated[planSlideIdx] = { ...updated[planSlideIdx], frameworkArchitecture: val };
                                    onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, brandAuditDeck: updated } } });
                                  }
                                }}
                                className="text-xs text-slate-300 leading-relaxed block font-normal"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Slide Bottom Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                      <EditableText
                        value={planData.capstoneReviewText || "Presented for Capstone Certification Review"}
                        onChange={(val) => {
                          if (onChange) {
                            onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, capstoneReviewText: val } } });
                          }
                        }}
                      />
                      <span className="font-mono text-amber-400/90 font-medium">
                        <EditableText
                          value={planData.verifiedTrainerText || "Verified by Academy Lead Trainer"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, verifiedTrainerText: val } } });
                            }
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  {/* 2. 16-Week Digital Marketing Execution Roadmap */}
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          16-Week Digital Marketing Execution Roadmap
                        </h3>
                      </div>
                      {isEditable && (
                        <button
                          type="button"
                          onClick={() => {
                            if (onChange) {
                              const newPhase = {
                                weeks: "Weeks 17 - 20",
                                allocation: "15% Allocation",
                                phase: "Phase 4: Omnichannel Expansion",
                                channels: ["TikTok Shop", "Affiliate Program", "Wholesale Leads"],
                                deliverables: [
                                  "Deploy dedicated influencer gifting campaign with affiliate links",
                                  "Launch wholesale catalog landing page with B2B lead capture",
                                ],
                                milestone: "Milestone Review at 20",
                              };
                              onChange({
                                ...portfolioData,
                                modules: {
                                  ...modules,
                                  digitalPlanning: {
                                    ...planData,
                                    strategyRoadmap: [...roadmap, newPhase],
                                  },
                                },
                              });
                            }
                          }}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
                        >
                          <Plus size={13} />
                          <span>Add Phase</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {roadmap.map((phase, pIdx) => (
                        <div
                          key={pIdx}
                          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow relative group/phase"
                        >
                          {isEditable && (
                            <button
                              type="button"
                              onClick={() => {
                                if (onChange) {
                                  const updated = roadmap.filter((_, i) => i !== pIdx);
                                  onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                }
                              }}
                              className="absolute top-3 right-3 p-1 rounded bg-slate-100 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Delete this phase card"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}

                          <div>
                            <div className="flex items-center justify-between gap-2 pr-6">
                              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                                <EditableText
                                  value={phase.weeks}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...roadmap];
                                      updated[pIdx] = { ...updated[pIdx], weeks: val };
                                      onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                    }
                                  }}
                                />
                              </span>
                              <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <EditableText
                                  value={phase.allocation}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...roadmap];
                                      updated[pIdx] = { ...updated[pIdx], allocation: val };
                                      onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                    }
                                  }}
                                />
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-slate-900 mt-3">
                              <EditableText
                                value={phase.phase}
                                onChange={(val) => {
                                  if (onChange) {
                                    const updated = [...roadmap];
                                    updated[pIdx] = { ...updated[pIdx], phase: val };
                                    onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                  }
                                }}
                              />
                            </h4>

                            {/* Channels Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {(phase.channels || []).map((chan, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                                >
                                  <EditableText
                                    value={chan}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...roadmap];
                                        const chans = [...(updated[pIdx].channels || [])];
                                        chans[cIdx] = val;
                                        updated[pIdx] = { ...updated[pIdx], channels: chans };
                                        onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                      }
                                    }}
                                  />
                                </span>
                              ))}
                            </div>

                            {/* Deliverables */}
                            <div className="mt-4 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  KEY PHASE DELIVERABLES:
                                </div>
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onChange) {
                                        const updated = [...roadmap];
                                        const dels = [...(updated[pIdx].deliverables || [])];
                                        dels.push("New core milestone deliverable executed during this sprint");
                                        updated[pIdx] = { ...updated[pIdx], deliverables: dels };
                                        onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                      }
                                    }}
                                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus size={10} />
                                    <span>Add</span>
                                  </button>
                                )}
                              </div>
                              {(phase.deliverables || []).map((deliv, dIdx) => (
                                <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 group/deliv">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                  <EditableText
                                    value={deliv}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...roadmap];
                                        const dels = [...(updated[pIdx].deliverables || [])];
                                        dels[dIdx] = val;
                                        updated[pIdx] = { ...updated[pIdx], deliverables: dels };
                                        onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                      }
                                    }}
                                    className="leading-relaxed flex-1"
                                  />
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onChange) {
                                          const updated = [...roadmap];
                                          const dels = (updated[pIdx].deliverables || []).filter((_, i) => i !== dIdx);
                                          updated[pIdx] = { ...updated[pIdx], deliverables: dels };
                                          onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                        }
                                      }}
                                      className="opacity-0 group-hover/deliv:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer mt-0.5"
                                      title="Delete deliverable"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <EditableText
                              value={phase.milestone || "Milestone Review"}
                              onChange={(val) => {
                                if (onChange) {
                                  const updated = [...roadmap];
                                  updated[pIdx] = { ...updated[pIdx], milestone: val };
                                  onChange({ ...portfolioData, modules: { ...modules, digitalPlanning: { ...planData, strategyRoadmap: updated } } });
                                }
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
  );
};
