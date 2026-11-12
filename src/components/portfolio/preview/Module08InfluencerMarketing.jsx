import React, { useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  Search,
  Filter,
  ExternalLink,
  Award,
  CheckCircle2,
  DollarSign,
  Target,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { renderCustomIcon } from "./previewShared";
import { createInitialPortfolioData } from "../portfolioData";

export const Module08InfluencerMarketing = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-50/70 border-b border-slate-200/40",
}) => {
  const initialInf = createInitialPortfolioData().modules.influencerMarketing;
  const infData = modules.influencerMarketing || initialInf;
  const [influencerSearchQuery, setInfluencerSearchQuery] = useState("");
  const [influencerPlatformFilter, setInfluencerPlatformFilter] = useState("All");

  const allCreators = Array.isArray(infData?.creators) ? infData.creators : (initialInf.creators || []);
  const filteredCreators = allCreators.filter((creator) => {
    const matchesPlatform =
      influencerPlatformFilter === "All" ||
      creator.platform?.toLowerCase() === influencerPlatformFilter.toLowerCase();
    const query = influencerSearchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      creator.name?.toLowerCase().includes(query) ||
      creator.handle?.toLowerCase().includes(query) ||
      creator.niche?.toLowerCase().includes(query);
    return matchesPlatform && matchesQuery;
  });

  const handleAddInfluencerCreator = () => {
    if (onChange) {
      const im = modules.influencerMarketing || {};
      const current = Array.isArray(im.creators) ? im.creators : [];
      const newCreator = {
        id: "inf-" + Date.now(),
        name: "New Creator",
        handle: "@creator_handle",
        platform: influencerPlatformFilter === "All" ? "Instagram" : influencerPlatformFilter,
        niche: "Clean Skincare & Lifestyle",
        followers: "150,000",
        fakeFollowersAudit: "4.5% (Exceptional Authenticity)",
        auditClean: true,
        genderDemographics: "80% Female / 20% Male",
        engagementRate: "5.20%",
        collaborationCost: "$900 (1 Reel + 2 Stories)",
        fitAssessment: "Recommended",
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          influencerMarketing: {
            ...im,
            creators: [...current, newCreator],
          },
        },
      });
    }
  };

  const handleDeleteInfluencerCreator = (cIdx) => {
    if (onChange) {
      const im = modules.influencerMarketing || {};
      const current = Array.isArray(im.creators) ? im.creators : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          influencerMarketing: {
            ...im,
            creators: current.filter((_, i) => i !== cIdx),
          },
        },
      });
    }
  };

  return (
    <section
      id="influencerMarketing"
      className={`w-full py-10 sm:py-14 scroll-mt-16 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
                  {/* Module Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        <EditableText
                          value={infData.categoryBadge || "MODULE 08 · CREATOR & AFFILIATE PARTNERSHIPS"}
                          path="modules.influencerMarketing.categoryBadge"
                          placeholder="MODULE 08 · CREATOR & AFFILIATE PARTNERSHIPS"
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={infData.sheetTitle || "Influencer Marketing Research & Vetting Sheet"}
                          path="modules.influencerMarketing.sheetTitle"
                          placeholder="Influencer Marketing Research & Vetting Sheet"
                        />
                      </h2>
                      <div className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                        <EditableText
                          value={infData.subtitle ||
                            "A comprehensive creator vetting database evaluating follower authenticity, audience fraud detection, demographic skew, engagement rates, and projected collaboration ROI."}
                          path="modules.influencerMarketing.subtitle"
                          placeholder="Subtitle description..."
                          multiline
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      <div className="border border-blue-200 bg-blue-50/50 text-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <Users size={14} className="text-blue-600" />
                        <EditableText
                          value={infData.badge || "Fraud Audit · Modash & HypeAuditor Metrics"}
                          path="modules.influencerMarketing.badge"
                          placeholder="Badge..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
                    <div className="relative flex-1 max-w-md">
                      <Search
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Search creator by name, handle, or niche..."
                        value={influencerSearchQuery}
                        onChange={(e) => setInfluencerSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Platform:</span>
                        <div className="flex items-center gap-1.5">
                          {["All", "Instagram", "TikTok", "YouTube"].map((platform) => {
                            const isActive = influencerPlatformFilter === platform;
                            return (
                              <button
                                key={platform}
                                type="button"
                                onClick={() => setInfluencerPlatformFilter(platform)}
                                className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                                  isActive
                                    ? "bg-blue-600 text-white shadow-xs"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                {platform}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {isEditable && (
                        <button
                          type="button"
                          onClick={handleAddInfluencerCreator}
                          className="px-3 py-1 text-xs rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Plus size={13} />
                          <span>Add Creator</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Vetting Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0a192f] text-white text-xs font-bold uppercase tracking-wider">
                            <th className="py-3.5 px-4">Creator & Handle</th>
                            <th className="py-3.5 px-4">Platform & Niche</th>
                            <th className="py-3.5 px-4 text-center">Follower Count</th>
                            <th className="py-3.5 px-4">Fake Followers Audit</th>
                            <th className="py-3.5 px-4">Gender Demographics</th>
                            <th className="py-3.5 px-4 text-center">Engagement Rate</th>
                            <th className="py-3.5 px-4">Est. Collaboration Cost</th>
                            <th className="py-3.5 px-4 text-right">Fit Assessment</th>
                            {isEditable && <th className="py-3.5 px-2 text-center w-10">Actions</th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {filteredCreators.length > 0 ? (
                            filteredCreators.map((creator) => {
                              const realIdx = allCreators.findIndex(c => (c.id && c.id === creator.id) || c === creator);
                              return (
                                <tr key={creator.id || realIdx} className="hover:bg-slate-50/70 transition-colors">
                                  {/* Creator & Handle */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-bold text-slate-900 text-sm">
                                      <EditableText
                                        value={creator.name || ""}
                                        path={`modules.influencerMarketing.creators[${realIdx}].name`}
                                        placeholder="Creator Name"
                                      />
                                    </div>
                                    <div className="text-blue-600 font-medium">
                                      <EditableText
                                        value={creator.handle || ""}
                                        path={`modules.influencerMarketing.creators[${realIdx}].handle`}
                                        placeholder="@handle"
                                      />
                                    </div>
                                  </td>

                                  {/* Platform & Niche */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-semibold text-slate-800">
                                      <EditableText
                                        value={creator.platform || ""}
                                        path={`modules.influencerMarketing.creators[${realIdx}].platform`}
                                        placeholder="Platform"
                                      />
                                    </div>
                                    <div className="text-slate-500 text-[11px]">
                                      <EditableText
                                        value={creator.niche || ""}
                                        path={`modules.influencerMarketing.creators[${realIdx}].niche`}
                                        placeholder="Niche"
                                      />
                                    </div>
                                  </td>

                                  {/* Follower Count */}
                                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                                    <EditableText
                                      value={creator.followers || ""}
                                      path={`modules.influencerMarketing.creators[${realIdx}].followers`}
                                      placeholder="100,000"
                                    />
                                  </td>

                                  {/* Fake Followers Audit */}
                                  <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-1.5">
                                      {isEditable ? (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (onChange) {
                                              const updated = [...allCreators];
                                              updated[realIdx] = { ...updated[realIdx], auditClean: !updated[realIdx].auditClean };
                                              onChange({
                                                ...portfolioData,
                                                modules: {
                                                  ...modules,
                                                  influencerMarketing: { ...infData, creators: updated },
                                                },
                                              });
                                            }
                                          }}
                                          title="Click to toggle Shield / Warning"
                                          className="cursor-pointer hover:scale-110 transition-transform"
                                        >
                                          {creator.auditClean ? (
                                            <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                                          ) : (
                                            <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                                          )}
                                        </button>
                                      ) : creator.auditClean ? (
                                        <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                                      ) : (
                                        <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                                      )}
                                      <span className="text-slate-800 font-medium">
                                        <EditableText
                                          value={creator.fakeFollowersAudit || ""}
                                          path={`modules.influencerMarketing.creators[${realIdx}].fakeFollowersAudit`}
                                          placeholder="4.8% (Clean)"
                                        />
                                      </span>
                                    </div>
                                  </td>

                                  {/* Gender Demographics */}
                                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                                    <EditableText
                                      value={creator.genderDemographics || ""}
                                      path={`modules.influencerMarketing.creators[${realIdx}].genderDemographics`}
                                      placeholder="80% Female / 20% Male"
                                    />
                                  </td>

                                  {/* Engagement Rate */}
                                  <td className="py-3.5 px-4 text-center">
                                    <span className="inline-block px-2.5 py-0.5 rounded font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      <EditableText
                                        value={creator.engagementRate || ""}
                                        path={`modules.influencerMarketing.creators[${realIdx}].engagementRate`}
                                        placeholder="4.92%"
                                      />
                                    </span>
                                  </td>

                                  {/* Est. Collaboration Cost */}
                                  <td className="py-3.5 px-4">
                                    <span className="font-bold text-slate-900">
                                      <EditableText
                                        value={creator.collaborationCost || ""}
                                        path={`modules.influencerMarketing.creators[${realIdx}].collaborationCost`}
                                        placeholder="$850 (1 Reel)"
                                      />
                                    </span>
                                  </td>

                                  {/* Fit Assessment */}
                                  <td className="py-3.5 px-4 text-right">
                                    <span
                                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold border ${
                                        creator.fitAssessment === "Recommended"
                                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                          : creator.fitAssessment === "Risky"
                                          ? "border-rose-300 bg-rose-50 text-rose-600"
                                          : "border-blue-300 bg-blue-50 text-blue-700"
                                      }`}
                                    >
                                      <EditableText
                                        value={creator.fitAssessment || ""}
                                        path={`modules.influencerMarketing.creators[${realIdx}].fitAssessment`}
                                        placeholder="Recommended"
                                      />
                                    </span>
                                  </td>

                                  {/* Delete Action if isEditable */}
                                  {isEditable && (
                                    <td className="py-3.5 px-2 text-center">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteInfluencerCreator(realIdx)}
                                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                        title="Delete Creator Row"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={isEditable ? 9 : 8} className="py-8 text-center text-slate-400">
                                No creators found matching "{influencerSearchQuery}" on {influencerPlatformFilter}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-slate-50/80 px-4 py-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                      <div>
                        <EditableText
                          value={infData.cpmBenchmark || "Evaluated against creator CPM benchmarks ($12-$18 CPM target)."}
                          path="modules.influencerMarketing.cpmBenchmark"
                          placeholder="Evaluated against creator CPM benchmarks ($12-$18 CPM target)."
                        />
                      </div>
                      <div className="font-bold text-amber-700 flex items-center gap-1">
                        <span>Average cohort engagement rate:</span>
                        <EditableText
                          value={infData.cohortAvgEngagement || "5.25%"}
                          path="modules.influencerMarketing.cohortAvgEngagement"
                          placeholder="5.25%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  );
};
