import React from "react";
import {
  Zap,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Target,
  ShieldCheck,
  Award,
  X,
  Activity,
  Layers,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { renderCustomIcon, formatModuleCategory } from "./previewShared";
import { createInitialPortfolioData } from "../portfolioData";

export const Module13PerformanceMarketing = ({
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
  const initialPerf = createInitialPortfolioData().modules.performanceMarketing;
  const perfData = modules.performanceMarketing?.funnelArchitecture
    ? modules.performanceMarketing
    : initialPerf;

  const statsList = Array.isArray(perfData.stats) ? perfData.stats : (initialPerf.stats || []);
  const stagesList =
    Array.isArray(perfData.funnelArchitecture?.stages)
      ? perfData.funnelArchitecture.stages
      : (initialPerf.funnelArchitecture.stages || []);
  const outcomesList =
    Array.isArray(perfData.attribution?.outcomes)
      ? perfData.attribution.outcomes
      : (initialPerf.attribution.outcomes || []);
  const attributionTools = Array.isArray(perfData.attribution?.tools) ? perfData.attribution.tools : [
    "Triple Whale 1-Day Click",
    "GA4 Server-Side",
    "Northbeam Attribution",
    "Post-Purchase Survey",
  ];

  const handleAddPerfStat = () => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.stats) ? pm.stats : [];
      const newStat = {
        label: "Scale Milestone",
        value: "$60,000",
        subtext: "Sprint Target Growth",
        highlight: "blue",
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            stats: [...current, newStat],
          },
        },
      });
    }
  };

  const handleDeletePerfStat = (sIdx) => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.stats) ? pm.stats : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            stats: current.filter((_, i) => i !== sIdx),
          },
        },
      });
    }
  };

  const handleAddPerfStage = () => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.funnelArchitecture?.stages) ? pm.funnelArchitecture.stages : [];
      const newStage = {
        stage: "Custom Stage",
        pct: "25%",
        pctBadgeClass: "bg-purple-100 text-purple-800",
        objective: "Targeted Audience Retargeting & Brand Uplift",
        channels: "Meta + Google Video + Klaviyo Email",
        creativeFormats: "Social Proof Grids, Customer Review Carousels",
        budgetFooter: "25% of Total Budget ($11,250/mo)",
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            funnelArchitecture: {
              ...(pm.funnelArchitecture || {}),
              stages: [...current, newStage],
            },
          },
        },
      });
    }
  };

  const handleDeletePerfStage = (stIdx) => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.funnelArchitecture?.stages) ? pm.funnelArchitecture.stages : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            funnelArchitecture: {
              ...(pm.funnelArchitecture || {}),
              stages: current.filter((_, i) => i !== stIdx),
            },
          },
        },
      });
    }
  };

  const handleAddPerfOutcome = () => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.attribution?.outcomes) ? pm.attribution.outcomes : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            attribution: {
              ...(pm.attribution || {}),
              outcomes: [...current, { text: "Achieved predictable positive cashflow across all scaled ad cohorts.", icon: "check" }],
            },
          },
        },
      });
    }
  };

  const handleDeletePerfOutcome = (oIdx) => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.attribution?.outcomes) ? pm.attribution.outcomes : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            attribution: {
              ...(pm.attribution || {}),
              outcomes: current.filter((_, i) => i !== oIdx),
            },
          },
        },
      });
    }
  };

  const handleCyclePerfOutcomeIcon = (oIdx) => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.attribution?.outcomes) ? [...pm.attribution.outcomes] : [];
      const item = current[oIdx];
      const currentIcon = typeof item === "object" ? (item.icon || "check") : "check";
      const iconCycle = ["check", "zap", "trending", "shield", "sparkles", "award", "target"];
      const nextIcon = iconCycle[(iconCycle.indexOf(currentIcon) + 1) % iconCycle.length];
      if (typeof item === "object") {
        current[oIdx] = { ...item, icon: nextIcon };
      } else {
        current[oIdx] = { text: item, icon: nextIcon };
      }
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            attribution: {
              ...(pm.attribution || {}),
              outcomes: current,
            },
          },
        },
      });
    }
  };

  const handleAddPerfAttributionTool = () => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.attribution?.tools) ? pm.attribution.tools : ["Triple Whale 1-Day Click", "GA4 Server-Side", "Northbeam"];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            attribution: {
              ...(pm.attribution || {}),
              tools: [...current, "Post-Purchase Survey Loop"],
            },
          },
        },
      });
    }
  };

  const handleDeletePerfAttributionTool = (tIdx) => {
    if (onChange) {
      const pm = modules.performanceMarketing || {};
      const current = Array.isArray(pm.attribution?.tools) ? pm.attribution.tools : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          performanceMarketing: {
            ...pm,
            attribution: {
              ...(pm.attribution || {}),
              tools: current.filter((_, i) => i !== tIdx),
            },
          },
        },
      });
    }
  };

  return (
    <section
      id="performanceMarketing"
      className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        <EditableText
                          value={formatModuleCategory(perfData.moduleEyebrow, "ADVANCED PERFORMANCE MARKETING", formattedRank)}
                          path="modules.performanceMarketing.moduleEyebrow"
                          placeholder={`MODULE ${formattedRank} · ADVANCED PERFORMANCE MARKETING`}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={perfData.title || "Performance Marketing & Full-Funnel Scaling"}
                          path="modules.performanceMarketing.title"
                          placeholder="Performance Marketing & Full-Funnel Scaling"
                        />
                      </h2>
                      <div className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                        <EditableText
                          value={perfData.subtitle ||
                            "Full-funnel paid acquisition architecture scaling spend from $8k to $45k/month while sustaining high profitability through CAC reduction and cohort LTV expansion."}
                          path="modules.performanceMarketing.subtitle"
                          placeholder="Subtitle description..."
                          multiline
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                      <div className="border border-emerald-200 bg-emerald-50/50 text-emerald-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <BarChart3 size={14} className="text-emerald-600" />
                        <EditableText
                          value={perfData.topBadge || "Triple Whale & GA4 Attributed · $135k Managed"}
                          path="modules.performanceMarketing.topBadge"
                          placeholder="Triple Whale & GA4 Attributed · $135k Managed"
                        />
                      </div>
                      {isEditable && (
                        <button
                          type="button"
                          onClick={handleAddPerfStat}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Plus size={13} />
                          <span>Add Stat</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 4 Top Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statsList.map((stat, sIdx) => {
                      const isBlue = stat.highlight === "blue";
                      const isAmber = stat.highlight === "amber";
                      const isEmerald = stat.highlight === "emerald";

                      return (
                        <div
                          key={sIdx}
                          className={`rounded-2xl p-5 shadow-xs border transition-all relative group/stat ${
                            isEmerald
                              ? "bg-emerald-50/30 border-emerald-200"
                              : isBlue
                              ? "bg-blue-50/30 border-blue-200"
                              : isAmber
                              ? "bg-amber-50/30 border-amber-200"
                              : "bg-white border-slate-200"
                          }`}
                        >
                          {isEditable && statsList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeletePerfStat(sIdx)}
                              className="opacity-0 group-hover/stat:opacity-100 absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity cursor-pointer"
                              title="Delete Stat Card"
                            >
                              <X size={13} />
                            </button>
                          )}
                          <div
                            className={`text-xs font-medium ${
                              isEmerald
                                ? "text-emerald-700 font-semibold"
                                : isBlue
                                ? "text-blue-600 font-semibold"
                                : isAmber
                                ? "text-amber-700 font-semibold"
                                : "text-slate-500"
                            }`}
                          >
                            <EditableText
                              value={stat.label}
                              path={`modules.performanceMarketing.stats[${sIdx}].label`}
                              placeholder="Stat Label"
                            />
                          </div>
                          <div
                            className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                              isEmerald
                                ? "text-emerald-700"
                                : isBlue
                                ? "text-blue-600"
                                : isAmber
                                ? "text-amber-800"
                                : "text-slate-900"
                            }`}
                          >
                            <EditableText
                              value={stat.value}
                              path={`modules.performanceMarketing.stats[${sIdx}].value`}
                              placeholder="$45,000"
                            />
                          </div>
                          <div
                            className={`text-xs mt-1 font-medium ${
                              isEmerald
                                ? "text-emerald-600 font-bold"
                                : isBlue
                                ? "text-blue-600/80"
                                : isAmber
                                ? "text-amber-700/80"
                                : "text-slate-400"
                            }`}
                          >
                            <EditableText
                              value={stat.subtext}
                              path={`modules.performanceMarketing.stats[${sIdx}].subtext`}
                              placeholder="Subtext detail"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Middle Card: Funnel Allocation Architecture */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          <EditableText
                            value={perfData.funnelArchitecture?.eyebrow || "FUNNEL ALLOCATION ARCHITECTURE:"}
                            path="modules.performanceMarketing.funnelArchitecture.eyebrow"
                            placeholder="FUNNEL ALLOCATION ARCHITECTURE:"
                          />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                          <EditableText
                            value={perfData.funnelArchitecture?.title || "Multi-Stage Channel Mix & Budget Orchestration"}
                            path="modules.performanceMarketing.funnelArchitecture.title"
                            placeholder="Multi-Stage Channel Mix & Budget Orchestration"
                          />
                        </h3>
                      </div>
                      {isEditable && (
                        <button
                          type="button"
                          onClick={handleAddPerfStage}
                          className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus size={13} />
                          <span>Add Funnel Stage</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {stagesList.map((stage, stIdx) => {
                        return (
                          <div
                            key={stIdx}
                            className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 flex flex-col justify-between relative group/stage"
                          >
                            {isEditable && stagesList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeletePerfStage(stIdx)}
                                className="opacity-0 group-hover/stage:opacity-100 absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity cursor-pointer"
                                title="Delete Stage"
                              >
                                <X size={13} />
                              </button>
                            )}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between pr-4">
                                <span className="font-bold text-slate-900 text-sm">
                                  <EditableText
                                    value={stage.stage}
                                    path={`modules.performanceMarketing.funnelArchitecture.stages[${stIdx}].stage`}
                                    placeholder="Top of Funnel (TOF)"
                                  />
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                                    stage.pctBadgeClass || "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  <EditableText
                                    value={stage.pct}
                                    path={`modules.performanceMarketing.funnelArchitecture.stages[${stIdx}].pct`}
                                    placeholder="65%"
                                  />
                                </span>
                              </div>

                              <div className="text-xs text-slate-600 leading-relaxed">
                                <EditableText
                                  value={stage.objective}
                                  path={`modules.performanceMarketing.funnelArchitecture.stages[${stIdx}].objective`}
                                  placeholder="Objective..."
                                  multiline
                                />
                              </div>

                              <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                  ACTIVE CHANNELS:
                                </span>
                                <div className="text-xs font-medium text-slate-800 mt-1">
                                  <EditableText
                                    value={stage.channels}
                                    path={`modules.performanceMarketing.funnelArchitecture.stages[${stIdx}].channels`}
                                    placeholder="Active channels..."
                                  />
                                </div>
                              </div>

                              <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                  CREATIVE FORMATS:
                                </span>
                                <div className="text-xs font-medium text-slate-800 mt-1 leading-relaxed">
                                  <EditableText
                                    value={stage.creativeFormats}
                                    path={`modules.performanceMarketing.funnelArchitecture.stages[${stIdx}].creativeFormats`}
                                    placeholder="Creative formats..."
                                    multiline
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-200">
                              <span className="text-xs text-slate-400 font-medium">
                                <EditableText
                                  value={stage.budgetFooter}
                                  path={`modules.performanceMarketing.funnelArchitecture.stages[${stIdx}].budgetFooter`}
                                  placeholder="65% of Total Budget ($29,250/mo)"
                                />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Dark Card: Attribution & Measurement Rigor */}
                  <div className="bg-[#0a1526] border border-slate-800 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Attribution Rigor info */}
                      <div className="lg:col-span-5 space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
                          <EditableText
                            value={perfData.attribution?.eyebrow || "ATTRIBUTION & MEASUREMENT RIGOR"}
                            path="modules.performanceMarketing.attribution.eyebrow"
                            placeholder="ATTRIBUTION & MEASUREMENT RIGOR"
                          />
                        </div>
                        <h3 className="text-2xl font-extrabold text-white">
                          <EditableText
                            value={perfData.attribution?.title || "Independent First-Party Tracking"}
                            path="modules.performanceMarketing.attribution.title"
                            placeholder="Independent First-Party Tracking"
                          />
                        </h3>
                        <div className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md pt-1">
                          <EditableText
                            value={perfData.attribution?.description ||
                              "Triple Whale 1-Day Click / 1-Day View First-Party Pixel & Google Analytics 4 Data-Driven Attribution"}
                            path="modules.performanceMarketing.attribution.description"
                            placeholder="Attribution description..."
                            multiline
                          />
                        </div>

                        {/* Attribution Tools Tags */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracking Infrastructure</span>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddPerfAttributionTool}
                                className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                              >
                                <Plus size={10} />
                                <span>Add Tool</span>
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {attributionTools.map((tool, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]"
                              >
                                <EditableText
                                  value={tool}
                                  path={`modules.performanceMarketing.attribution.tools[${tIdx}]`}
                                  placeholder="Tracking Tool"
                                />
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePerfAttributionTool(tIdx)}
                                    className="p-0.5 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                                  >
                                    <X size={10} />
                                  </button>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Verified Student Outcomes */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            <EditableText
                              value={perfData.attribution?.outcomesHeading || "VERIFIED STUDENT SCALING OUTCOMES:"}
                              path="modules.performanceMarketing.attribution.outcomesHeading"
                              placeholder="VERIFIED STUDENT SCALING OUTCOMES:"
                            />
                          </span>
                          {isEditable && (
                            <button
                              type="button"
                              onClick={handleAddPerfOutcome}
                              className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                            >
                              <Plus size={11} />
                              <span>Add Outcome</span>
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          {outcomesList.map((outcome, oIdx) => {
                            const outcomeText = typeof outcome === "object" ? outcome.text : outcome;
                            const outcomeIcon = typeof outcome === "object" ? outcome.icon : "check";
                            return (
                              <div key={oIdx} className="flex items-start justify-between gap-3 group/out">
                                <div className="flex items-start gap-3 flex-1">
                                  {isEditable ? (
                                    <button
                                      type="button"
                                      onClick={() => handleCyclePerfOutcomeIcon(oIdx)}
                                      className="shrink-0 text-emerald-400 mt-0.5 hover:scale-120 transition-transform cursor-pointer"
                                      title="Click to cycle icon"
                                    >
                                      {renderCustomIcon(outcomeIcon, "check", "w-4 h-4 text-emerald-400")}
                                    </button>
                                  ) : (
                                    <div className="shrink-0 text-emerald-400 mt-0.5">
                                      {renderCustomIcon(outcomeIcon, "check", "w-4 h-4 text-emerald-400")}
                                    </div>
                                  )}
                                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    <EditableText
                                      value={outcomeText}
                                      path={`modules.performanceMarketing.attribution.outcomes[${oIdx}].text`}
                                      placeholder="Outcome text..."
                                      multiline
                                    />
                                  </span>
                                </div>
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePerfOutcome(oIdx)}
                                    className="opacity-0 group-hover/out:opacity-100 p-0.5 text-slate-400 hover:text-rose-400 rounded cursor-pointer transition-opacity"
                                  >
                                    <X size={12} />
                                  </button>
                                )}
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
