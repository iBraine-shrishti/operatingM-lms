import React, { useState } from "react";
import {
  BarChart3,
  Plus,
  Trash2,
  Search,
  ExternalLink,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Filter,
  ChevronRight,
  Eye,
  ShieldCheck,
  MapPin,
  Globe,
  Activity,
  Star,
  Store,
} from "lucide-react";
import { EditableText } from "../EditableText";

export const Module06Seo = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-50/70 border-b border-slate-200/40",
}) => {
  const seoData = modules.seo || {};
  const seoMeta = modules.seoMeta || {};
  const [seoActiveTab, setSeoActiveTab] = useState("keywords");
  const [seoSearchQuery, setSeoSearchQuery] = useState("");
  const [seoIntentFilter, setSeoIntentFilter] = useState("All");

  const defaultKeywords = [
    { keyword: "best organic skincare for sensitive skin", searchVolume: 18100, keywordDifficulty: 42, intent: "Commercial", cpc: "$2.80", targetPage: "/collections/sensitive-skin-barrier", priority: "High" },
    { keyword: "ceramide barrier cream review", searchVolume: 9900, keywordDifficulty: 38, intent: "Informational", cpc: "$1.40", targetPage: "/blog/ceramide-skin-barrier-restoration", priority: "High" },
    { keyword: "buy organic peptide serum online", searchVolume: 6400, keywordDifficulty: 51, intent: "Transactional", cpc: "$4.20", targetPage: "/products/tri-peptide-nourishing-serum", priority: "High" },
    { keyword: "how to repair damaged skin barrier naturally", searchVolume: 14200, keywordDifficulty: 29, intent: "Informational", cpc: "$0.95", targetPage: "/guides/repair-skin-barrier-in-7-days", priority: "Medium" },
    { keyword: "hypoallergenic morning routine steps", searchVolume: 4800, keywordDifficulty: 24, intent: "Informational", cpc: "$1.10", targetPage: "/blog/hypoallergenic-morning-routine", priority: "Medium" },
    { keyword: "vegan cold pressed facial oil discount", searchVolume: 3200, keywordDifficulty: 35, intent: "Transactional", cpc: "$3.50", targetPage: "/products/botanical-glow-elixir", priority: "Low" },
  ];
  const rawKeywords = Array.isArray(seoData.keywords) && seoData.keywords.length > 0 ? seoData.keywords : defaultKeywords;
  const filteredKeywords = rawKeywords.filter((kw) => {
    const query = (seoSearchQuery || "").toLowerCase();
    const matchesQuery = !query || kw.keyword?.toLowerCase().includes(query) || kw.targetPage?.toLowerCase().includes(query);
    const matchesIntent = seoIntentFilter === "All" || (kw.intent || "").toLowerCase() === seoIntentFilter.toLowerCase();
    return matchesQuery && matchesIntent;
  });

  const auditCategories = Array.isArray(seoData.auditCategories) && seoData.auditCategories.length > 0
    ? seoData.auditCategories
    : [
        {
          category: "Technical Crawlability & Indexation",
          score: 98,
          findings: [
            "Resolved 24 orphan URLs via updated XML sitemap and automated internal linking",
            "Fixed 14 legacy 301 redirect chains to direct canonical destinations",
            "Configured robots.txt directives to prevent indexing of internal search filter facets",
          ],
          actionTaken: "Submitted pristine dynamic sitemap index to Google Search Console; 100% of target pages indexed within 48 hours.",
        },
        {
          category: "Core Web Vitals & Page Speed (LCP, INP, CLS)",
          score: 95,
          findings: [
            "Largest Contentful Paint (LCP) reduced from 4.1s to 1.1s via WebP compression & AVIF next-gen formats",
            "Cumulative Layout Shift (CLS) reduced from 0.28 to 0.01 by specifying image aspect ratios in CSS",
            "Interaction to Next Paint (INP) clocked at 68ms (well within Google's <200ms good threshold)",
          ],
          actionTaken: "Deferred unneeded third-party tracking scripts, self-hosted web fonts, and leveraged Cloudflare Polish edge caching.",
        },
        {
          category: "On-Page SEO & Structured Data",
          score: 92,
          findings: [
            "Implemented JSON-LD Schema markup for Product, Review, FAQPage, and Organization",
            "Rewrote meta titles & H1 hierarchy across 45 collection pages to include primary keyword triggers",
            "Introduced automated descriptive alt text and internal breadcrumb navigation structure",
          ],
          actionTaken: "Achieved Google Rich Results approval with review star snippets displaying directly in SERPs.",
        },
      ];

  const localSeo = seoData.localSeo || {
    businessName: "Aura Dental & Holistic Smile Studio",
    category: "Cosmetic Dentist & Dental Clinic",
    addressSnippet: "450 Sutter St Suite 1200, San Francisco, CA 94108",
    reviewsCount: 148,
    avgRating: 4.9,
    localKeywordsRanked: [
      "#1 for 'holistic cosmetic dentist san francisco'",
      "#2 for 'clear aligners financial district sf'",
      "#1 in Google 3-Pack Maps for 'emergency gentle dental clinic'",
    ],
    optimizationSteps: [
      "Claimed & 100% verified Google Business Profile with secondary categories (Teeth Whitening, Dental Hygienist)",
      "Uploaded 60+ geotagged high-resolution clinic and smiling staff photos with EXIF metadata",
      "Automated post-appointment SMS review generation workflow resulting in 42 new 5-star reviews in 60 days",
      "Standardized Name-Address-Phone (NAP) consistency across 35 top local citations (Yelp, Healthgrades, YellowPages)",
    ],
    sampleReview: {
      author: "Dr. Elena Vance, Tech Executive",
      rating: 5,
      text: "Found Aura Dental on Google Maps while looking for holistic biomimetic treatments. The staff was incredible, booking was seamless, and the clinic feels like a peaceful spa. Highly recommend!",
    },
  };

  const openSeoMedia = () => {
    const seoData = modules.seo || {};
    const localSeo = seoData.localSeo || {};
    onOpenMedia && onOpenMedia({
      type: "image",
      moduleNumber: "MODULE 06",
      moduleTitle: "SEO & Google Business Profile 3-Pack",
      category: "Local SEO & Map Pack Optimization",
      title: localSeo.businessName || "Local Google Business Profile",
      imageUrl: mockupLaptopImg,
      clientType: localSeo.addressSnippet || "Google Maps Geo-Targeted Business",
      description: "Verified Google Business Profile ranking #1-#3 in the Google Maps Local 3-Pack, optimized with NAP citations, geo-tagged photo geotags, review velocity, and primary category alignment.",
      metrics: [
        { label: "Google Rating", value: `${localSeo.rating || 4.9} ★`, highlight: "amber" },
        { label: "Verified Reviews", value: `${localSeo.reviewCount || 128}+`, highlight: "emerald" },
        { label: "Local 3-Pack Rank", value: "#1 Rank", highlight: "purple" },
        { label: "NAP Consistency", value: "100% Citations", highlight: "slate" },
      ],
      tags: ["Google Business Profile", "Local 3-Pack", "Geo-Targeting", "NAP Citations", "Review Funnels"],
      currentIndex: 0,
      itemsList: [localSeo],
      navigateFn: null,
    });
  };


  const handleAddSeoKeyword = () => {
    if (onChange) {
      const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
      const newKw = {
        keyword: "new high-intent target keyword",
        searchVolume: 5400,
        keywordDifficulty: 32,
        intent: "Commercial",
        cpc: "$2.40",
        targetPage: "/collections/best-products",
        priority: "High",
      };
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          seo: {
            ...modules.seo,
            keywords: [...current, newKw],
          },
        },
      });
    }
  };

  const handleDeleteSeoKeyword = (kIdx) => {
    if (onChange) {
      const current = Array.isArray(modules.seo?.keywords) ? modules.seo.keywords : [];
      const updated = current.filter((_, i) => i !== kIdx);
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          seo: {
            ...modules.seo,
            keywords: updated,
          },
        },
      });
    }
  };

  return (
    <section
      id="seo"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Header with 3-Option Switch Toggle */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={seoMeta.category || "Module 06 · Organic Search Engine Optimization"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, seoMeta: { ...seoMeta, category: val } },
                              });
                            }
                          }}
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={seoMeta.title || "SEO Keyword Research, Site Audit & Local SEO (GBP)"}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, seoMeta: { ...seoMeta, title: val } },
                              });
                            }
                          }}
                        />
                      </h2>
                      <p className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          tag="span"
                          value={seoMeta.subtitle || "A comprehensive three-tier SEO execution covering transactional keyword strategy, technical Core Web Vitals optimization, and Google Business Profile local 3-pack dominance."}
                          onChange={(val) => {
                            if (onChange) {
                              onChange({
                                ...portfolioData,
                                modules: { ...modules, seoMeta: { ...seoMeta, subtitle: val } },
                              });
                            }
                          }}
                        />
                      </p>
                    </div>

                    {/* Switch Toggle Buttons */}
                    <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/90 shadow-2xs self-start md:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => setSeoActiveTab("keywords")}
                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          seoActiveTab === "keywords"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        }`}
                      >
                        1. Keyword Research Sheet
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoActiveTab("audit")}
                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          seoActiveTab === "audit"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        }`}
                      >
                        2. Technical SEO Audit
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoActiveTab("local")}
                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          seoActiveTab === "local"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        }`}
                      >
                        3. Local SEO & GBP Project
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: KEYWORD RESEARCH SHEET */}
                  {seoActiveTab === "keywords" && (
                    <div className="space-y-4 animate-in fade-in-50 duration-200">
                      {/* Search & Filter Bar */}
                      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
                          <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                          <input
                            type="text"
                            placeholder="Search keywords in research sheet..."
                            value={seoSearchQuery}
                            onChange={(e) => setSeoSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                          />
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                          <span className="text-xs text-slate-500 font-medium">Filter Intent:</span>
                          {["All", "Commercial", "Transactional", "Informational"].map((intent) => {
                            const isSelected = seoIntentFilter === intent;
                            return (
                              <button
                                key={intent}
                                type="button"
                                onClick={() => setSeoIntentFilter(intent)}
                                className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-slate-900 text-white shadow-2xs"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {intent}
                              </button>
                            );
                          })}
                          {isEditable && (
                            <button
                              type="button"
                              onClick={handleAddSeoKeyword}
                              className="px-3 py-1 text-xs rounded-md font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 shadow-2xs cursor-pointer ml-auto"
                            >
                              <Plus size={13} />
                              <span>Add Keyword</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Keywords Table */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                        <div className="overflow-x-auto custom-scrollbar">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-900 text-slate-200 border-b border-slate-800">
                                <th className="py-3 px-4 font-bold tracking-wide">Target Keyword</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-right">Volume / Mo</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-center">KD (Difficulty)</th>
                                <th className="py-3 px-4 font-bold tracking-wide">Search Intent</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-right">Est. CPC</th>
                                <th className="py-3 px-4 font-bold tracking-wide">Target Page Architecture</th>
                                <th className="py-3 px-4 font-bold tracking-wide text-center">Priority</th>
                                {isEditable && <th className="py-3 px-2 text-center w-10">Delete</th>}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {filteredKeywords.map((kw, idx) => {
                                const realIdx = rawKeywords.indexOf(kw);
                                const kd = kw.keywordDifficulty ?? 35;
                                const kdClass =
                                  kd < 30
                                    ? "bg-emerald-100 text-emerald-800"
                                    : kd < 45
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-800";
                                const priorityClass =
                                  kw.priority === "High"
                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                    : kw.priority === "Medium"
                                    ? "bg-slate-100 text-slate-700"
                                    : "bg-slate-100 text-slate-500";
                                return (
                                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group/kw">
                                    <td className="py-3 px-4 font-semibold text-slate-900">
                                      <EditableText
                                        value={kw.keyword}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...rawKeywords];
                                            updated[realIdx] = { ...updated[realIdx], keyword: val };
                                            onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, keywords: updated } } });
                                          }
                                        }}
                                      />
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono text-slate-700 font-medium">
                                      <EditableText
                                        value={String(kw.searchVolume ?? "")}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...rawKeywords];
                                            updated[realIdx] = { ...updated[realIdx], searchVolume: parseInt(val.replace(/,/g, ""), 10) || val };
                                            onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, keywords: updated } } });
                                          }
                                        }}
                                      />
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold ${kdClass}`}>
                                        <EditableText
                                          value={String(kd)}
                                          onChange={(val) => {
                                            if (onChange) {
                                              const updated = [...rawKeywords];
                                              updated[realIdx] = { ...updated[realIdx], keywordDifficulty: parseInt(val, 10) || 30 };
                                              onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, keywords: updated } } });
                                            }
                                          }}
                                        />%
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <span className="text-slate-600 font-medium">
                                        <EditableText
                                          value={kw.intent || "Commercial"}
                                          onChange={(val) => {
                                            if (onChange) {
                                              const updated = [...rawKeywords];
                                              updated[realIdx] = { ...updated[realIdx], intent: val };
                                              onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, keywords: updated } } });
                                            }
                                          }}
                                        />
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono text-slate-700 font-medium">
                                      <EditableText
                                        value={kw.cpc || "$2.50"}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...rawKeywords];
                                            updated[realIdx] = { ...updated[realIdx], cpc: val };
                                            onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, keywords: updated } } });
                                          }
                                        }}
                                      />
                                    </td>
                                    <td className="py-3 px-4 font-mono text-[11px] text-blue-600 truncate max-w-xs">
                                      <EditableText
                                        value={kw.targetPage || kw.url || "/"}
                                        onChange={(val) => {
                                          if (onChange) {
                                            const updated = [...rawKeywords];
                                            updated[realIdx] = { ...updated[realIdx], targetPage: val };
                                            onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, keywords: updated } } });
                                          }
                                        }}
                                      />
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${priorityClass}`}>
                                        <EditableText
                                          value={kw.priority || "High"}
                                          onChange={(val) => {
                                            if (onChange) {
                                              const updated = [...rawKeywords];
                                              updated[realIdx] = { ...updated[realIdx], priority: val };
                                              onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, keywords: updated } } });
                                            }
                                          }}
                                        />
                                      </span>
                                    </td>
                                    {isEditable && (
                                      <td className="py-3 px-2 text-center">
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteSeoKeyword(realIdx)}
                                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                          title="Delete keyword"
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                      </td>
                                    )}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Footer Information */}
                        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                          <EditableText
                            value={seoData.footerText || `Showing ${filteredKeywords.length} of ${rawKeywords.length} mapped keywords from SEMrush / Ahrefs research dataset.`}
                            onChange={(val) => {
                              if (onChange) {
                                onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, footerText: val } } });
                              }
                            }}
                          />
                          <span className="font-mono text-blue-600 font-bold">
                            <EditableText
                              value={seoData.totalSearchPotential || "Total monthly search potential: 56,600+ impressions"}
                              onChange={(val) => {
                                if (onChange) {
                                  onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, totalSearchPotential: val } } });
                                }
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: TECHNICAL SEO AUDIT */}
                  {seoActiveTab === "audit" && (
                    <div className="space-y-4 animate-in fade-in-50 duration-200">
                      {isEditable && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (onChange) {
                                const newCat = {
                                  category: "New Technical Audit Category",
                                  score: 94,
                                  findings: [
                                    "Identified and rectified critical technical crawling or schema blocker.",
                                    "Optimized resource delivery and compressed heavy script bundles.",
                                  ],
                                  actionTaken: "Implemented corrective directive and validated clean status in Google Search Console.",
                                };
                                onChange({
                                  ...portfolioData,
                                  modules: { ...modules, seo: { ...seoData, auditCategories: [...auditCategories, newCat] } },
                                });
                              }
                            }}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
                          >
                            <Plus size={13} />
                            <span>Add Audit Category Card</span>
                          </button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {auditCategories.map((cat, cIdx) => (
                          <div
                            key={cIdx}
                            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative group/card"
                          >
                            {isEditable && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (onChange) {
                                    const updated = auditCategories.filter((_, i) => i !== cIdx);
                                    onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, auditCategories: updated } } });
                                  }
                                }}
                                className="absolute top-3 right-3 p-1 rounded bg-slate-100 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                title="Delete this audit card"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}

                            <div>
                              <div className="flex items-center justify-between pr-6">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                  AUDIT CATEGORY {cIdx + 1}
                                </span>
                                <div className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded">
                                  <span>Score:</span>
                                  <EditableText
                                    value={String(cat.score || 95)}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const updated = [...auditCategories];
                                        updated[cIdx] = { ...updated[cIdx], score: parseInt(val, 10) || 90 };
                                        onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, auditCategories: updated } } });
                                      }
                                    }}
                                  />
                                  <span>/100</span>
                                </div>
                              </div>

                              <h3 className="text-base font-bold text-slate-900 mt-2">
                                <EditableText
                                  value={cat.category}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...auditCategories];
                                      updated[cIdx] = { ...updated[cIdx], category: val };
                                      onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, auditCategories: updated } } });
                                    }
                                  }}
                                />
                              </h3>

                              <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    AUDIT FINDINGS & RESOLVED ISSUES:
                                  </div>
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onChange) {
                                          const updated = [...auditCategories];
                                          const findings = [...(updated[cIdx].findings || [])];
                                          findings.push("Resolved new technical audit finding and verified fix");
                                          updated[cIdx] = { ...updated[cIdx], findings };
                                          onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, auditCategories: updated } } });
                                        }
                                      }}
                                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                    >
                                      <Plus size={10} />
                                      <span>Add Finding</span>
                                    </button>
                                  )}
                                </div>
                                {(cat.findings || []).map((finding, fIdx) => (
                                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 group/finding">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                    <EditableText
                                      value={finding}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const updated = [...auditCategories];
                                          const findings = [...(updated[cIdx].findings || [])];
                                          findings[fIdx] = val;
                                          updated[cIdx] = { ...updated[cIdx], findings };
                                          onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, auditCategories: updated } } });
                                        }
                                      }}
                                      className="leading-relaxed flex-1"
                                    />
                                    {isEditable && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onChange) {
                                            const updated = [...auditCategories];
                                            const findings = (updated[cIdx].findings || []).filter((_, i) => i !== fIdx);
                                            updated[cIdx] = { ...updated[cIdx], findings };
                                            onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, auditCategories: updated } } });
                                          }
                                        }}
                                        className="opacity-0 group-hover/finding:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer mt-0.5"
                                        title="Delete finding"
                                      >
                                        <Trash2 size={11} />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-0.5">
                                ACTION TAKEN BY STUDENT:
                              </div>
                              <div className="text-xs text-slate-600 italic leading-relaxed">
                                "<EditableText
                                  value={cat.actionTaken}
                                  onChange={(val) => {
                                    if (onChange) {
                                      const updated = [...auditCategories];
                                      updated[cIdx] = { ...updated[cIdx], actionTaken: val };
                                      onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, auditCategories: updated } } });
                                    }
                                  }}
                                />"
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: LOCAL SEO & GBP PROJECT */}
                  {seoActiveTab === "local" && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 animate-in fade-in-50 duration-200 shadow-xs">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Business Card & Mockup (5 cols) */}
                        <div className="lg:col-span-5 space-y-4">
                          <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 shadow-2xs">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                                <Store className="w-6 h-6 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-base font-bold text-slate-900 truncate">
                                  <EditableText
                                    value={localSeo.businessName}
                                    onChange={(val) => {
                                      if (onChange) {
                                        onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, businessName: val } } } });
                                      }
                                    }}
                                  />
                                </h4>
                                <p className="text-xs text-slate-500">
                                  <EditableText
                                    value={localSeo.category}
                                    onChange={(val) => {
                                      if (onChange) {
                                        onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, category: val } } } });
                                      }
                                    }}
                                  />
                                </p>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, sIdx) => (
                                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400" />
                                    ))}
                                  </div>
                                  <span className="text-xs font-bold text-slate-900">
                                    <EditableText
                                      value={String(localSeo.avgRating || 4.9)}
                                      onChange={(val) => {
                                        if (onChange) {
                                          onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, avgRating: parseFloat(val) || 4.9 } } } });
                                        }
                                      }}
                                    />
                                  </span>
                                  <span className="text-xs text-slate-500 font-medium">
                                    (<EditableText
                                      value={String(localSeo.reviewsCount || 148)}
                                      onChange={(val) => {
                                        if (onChange) {
                                          onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, reviewsCount: parseInt(val, 10) || 100 } } } });
                                        }
                                      }}
                                    /> Google Reviews)
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs text-slate-600">
                              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="truncate">
                                <EditableText
                                  value={localSeo.addressSnippet}
                                  onChange={(val) => {
                                    if (onChange) {
                                      onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, addressSnippet: val } } } });
                                    }
                                  }}
                                />
                              </span>
                            </div>
                          </div>

                          {/* Laptop / Mockup Showcase Image */}
                          <div
                            className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[16/10] shadow-xs group cursor-pointer"
                            onClick={() => openSeoMedia()}
                            title="Click to view Google Business Profile data & Local 3-Pack rank"
                          >
                            <img
                              src={mockupLaptopImg}
                              alt="Local SEO Live Website Build"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                            />
                            {/* Hover Inspect Indicator */}
                            <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                                <span>Inspect 3-Pack & GBP Data</span>
                              </div>
                            </div>
                            <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                              Verified Google Maps Local 3-Pack
                            </div>
                          </div>
                        </div>

                        {/* Right Column: 3-Pack Rankings, Steps & Review (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                          {/* Google Maps 3-Pack Rankings Achieved */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                GOOGLE MAPS 3-PACK RANKINGS ACHIEVED:
                              </div>
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onChange) {
                                      const ranks = [...(localSeo.localKeywordsRanked || [])];
                                      ranks.push("#1 in Google 3-Pack for 'new top geo-targeted service'");
                                      onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, localKeywordsRanked: ranks } } } });
                                    }
                                  }}
                                  className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus size={10} />
                                  <span>Add Ranking</span>
                                </button>
                              )}
                            </div>
                            <div className="space-y-2">
                              {(localSeo.localKeywordsRanked || []).map((rankText, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="flex items-center justify-between gap-2 p-2.5 bg-emerald-50/70 border border-emerald-200/90 rounded-xl text-xs font-medium text-emerald-950 group/rank"
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <EditableText
                                      value={rankText}
                                      onChange={(val) => {
                                        if (onChange) {
                                          const ranks = [...(localSeo.localKeywordsRanked || [])];
                                          ranks[rIdx] = val;
                                          onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, localKeywordsRanked: ranks } } } });
                                        }
                                      }}
                                      className="flex-1"
                                    />
                                  </div>
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onChange) {
                                          const ranks = (localSeo.localKeywordsRanked || []).filter((_, i) => i !== rIdx);
                                          onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, localKeywordsRanked: ranks } } } });
                                        }
                                      }}
                                      className="opacity-0 group-hover/rank:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer"
                                      title="Delete ranking"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Local Optimization & NAP Consistency Executed */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                LOCAL OPTIMIZATION & NAP CONSISTENCY EXECUTED:
                              </div>
                              {isEditable && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onChange) {
                                      const steps = [...(localSeo.optimizationSteps || [])];
                                      steps.push("Audited and optimized local business directory listings for NAP consistency");
                                      onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, optimizationSteps: steps } } } });
                                    }
                                  }}
                                  className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus size={10} />
                                  <span>Add Step</span>
                                </button>
                              )}
                            </div>
                            <div className="space-y-1.5">
                              {(localSeo.optimizationSteps || []).map((step, sIdx) => (
                                <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 group/step">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                  <EditableText
                                    value={step}
                                    onChange={(val) => {
                                      if (onChange) {
                                        const steps = [...(localSeo.optimizationSteps || [])];
                                        steps[sIdx] = val;
                                        onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, optimizationSteps: steps } } } });
                                      }
                                    }}
                                    className="leading-relaxed flex-1"
                                  />
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onChange) {
                                          const steps = (localSeo.optimizationSteps || []).filter((_, i) => i !== sIdx);
                                          onChange({ ...portfolioData, modules: { ...modules, seo: { ...seoData, localSeo: { ...localSeo, optimizationSteps: steps } } } });
                                        }
                                      }}
                                      className="opacity-0 group-hover/step:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer mt-0.5"
                                      title="Delete step"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Verified 5-Star Customer Review */}
                          {localSeo.sampleReview && (
                            <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                                  VERIFIED 5-STAR PATIENT / CUSTOMER REVIEW:
                                </span>
                                <div className="flex text-amber-400">
                                  {[...Array(5)].map((_, sIdx) => (
                                    <Star key={sIdx} className="w-3 h-3 fill-amber-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-slate-700 italic leading-relaxed">
                                "<EditableText
                                  value={localSeo.sampleReview.text}
                                  onChange={(val) => {
                                    if (onChange) {
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          seo: {
                                            ...seoData,
                                            localSeo: {
                                              ...localSeo,
                                              sampleReview: { ...localSeo.sampleReview, text: val },
                                            },
                                          },
                                        },
                                      });
                                    }
                                  }}
                                />"
                              </p>
                              <div className="text-[11px] font-bold text-slate-800">
                                — <EditableText
                                  value={localSeo.sampleReview.author}
                                  onChange={(val) => {
                                    if (onChange) {
                                      onChange({
                                        ...portfolioData,
                                        modules: {
                                          ...modules,
                                          seo: {
                                            ...seoData,
                                            localSeo: {
                                              ...localSeo,
                                              sampleReview: { ...localSeo.sampleReview, author: val },
                                            },
                                          },
                                        },
                                      });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
  );
};
