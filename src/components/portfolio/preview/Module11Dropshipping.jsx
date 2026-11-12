import React from "react";
import {
  Box,
  Plus,
  Trash2,
  Camera,
  Eye,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Sparkles,
  Truck,
  Target,
  Calendar,
  AlertTriangle,
  Layers,
  X,
} from "lucide-react";
import { EditableText } from "../EditableText";

export const Module11Dropshipping = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-100/90 border-b border-slate-200/90",
}) => {
  const dropData = modules.dropshipping || {};
  const winProd = dropData.winningProduct || "Smart Ergonomic Cervical Contour Pillow with Cooling Gel";
  const storefront = dropData.storefrontDetails || "Storefront: Lumina Sleep Lab · Fulfilled via CJ Dropshipping & Direct Private Agent (5-8 day US delivery)";
  
  const economicsList = Array.isArray(dropData.economics) && dropData.economics.length > 0 ? dropData.economics : [
    { label: "COGS", value: dropData.cogs || "$14.20", highlight: "slate" },
    { label: "RETAIL PRICE", value: dropData.retailPrice || "$59.95", highlight: "slate" },
    { label: "NET PROFIT / UNIT", value: dropData.netProfit || "+$45.75", highlight: "emerald" },
  ];

  const supplierTags = Array.isArray(dropData.supplierTags) && dropData.supplierTags.length > 0 ? dropData.supplierTags : [
    "CJ Dropshipping",
    "Private Agent Shenzhen",
    "USPS Priority 5-Day",
    "AutoDS Automation",
  ];

  const sprintMetrics = Array.isArray(dropData.sprintMetrics) && dropData.sprintMetrics.length > 0 ? dropData.sprintMetrics : [
    { label: "Units Dispatched", value: dropData.pilotUnitsSold || "420", highlight: "white" },
    { label: "Test Ad Spend", value: dropData.pilotAdSpend || "$3,800", highlight: "white" },
    { label: "Gross Revenue", value: dropData.pilotGrossRevenue || "$25,179", highlight: "emerald" },
    { label: "Blended ROAS", value: dropData.pilotNetRoas || "3.84x", highlight: "blue" },
  ];

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave, initialWebsiteUrl);
    }
  };

  const openDropshippingMedia = () => {
    const dropData = modules.dropshipping || {};
    const winProd = dropData.winningProduct || "Ergonomic Lumbar Cushion Pro";
    onOpenMedia && onOpenMedia({
      type: "image",
      moduleNumber: "MODULE 11",
      moduleTitle: "Dropshipping Store & Winning Product Validation",
      category: dropData.categoryBadge || "Direct-To-Consumer Fulfillment",
      title: winProd,
      imageUrl: dropData.productImage || mockupLaptopImg,
      clientType: dropData.storefrontDetails || "AliExpress / CJ Dropshipping Private Supplier",
      description: `Validated winning product with confirmed product-market fit, proven Facebook/TikTok ad angles, optimized supplier lead times (7-10 days), and high operating profit margin.`,
      metrics: [
        { label: "Selling Price", value: dropData.sellingPrice || "₹1,899", highlight: "emerald" },
        { label: "Product COGS", value: dropData.cogs || "₹450", highlight: "amber" },
        { label: "Net Margin", value: dropData.netMargin || "62%", highlight: "purple" },
        { label: "Orders Validated", value: dropData.totalOrders || "450+ Units", highlight: "slate" },
      ],
      tags: ["Product Research", "CJ Dropshipping", "Winning Creative", "Unit Economics", "Private Labeling"],
      currentIndex: 0,
      itemsList: [dropData],
      navigateFn: null,
    });
  };


  const handleAddDropshipMetric = () => {
    if (onChange) {
      const drop = modules.dropshipping || {};
      const current = Array.isArray(drop.economics)
        ? drop.economics
        : [
            { label: "COGS", value: drop.cogs || "$14.20", highlight: "slate" },
            { label: "RETAIL PRICE", value: drop.retailPrice || "$59.95", highlight: "slate" },
            { label: "NET PROFIT / UNIT", value: drop.netProfit || "+$45.75", highlight: "emerald" },
          ];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          dropshipping: {
            ...drop,
            economics: [...current, { label: "NEW METRIC", value: "78% Margin", highlight: "emerald" }],
          },
        },
      });
    }
  };

  const handleDeleteDropshipMetric = (idx) => {
    if (onChange) {
      const drop = modules.dropshipping || {};
      const current = Array.isArray(drop.economics) ? drop.economics : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          dropshipping: {
            ...drop,
            economics: current.filter((_, i) => i !== idx),
          },
        },
      });
    }
  };

  const handleAddDropshipSupplier = () => {
    if (onChange) {
      const drop = modules.dropshipping || {};
      const current = Array.isArray(drop.supplierTags) ? drop.supplierTags : ["CJ Dropshipping", "Private Agent Shenzhen"];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          dropshipping: {
            ...drop,
            supplierTags: [...current, "AutoDS Automation"],
          },
        },
      });
    }
  };

  const handleDeleteDropshipSupplier = (idx) => {
    if (onChange) {
      const drop = modules.dropshipping || {};
      const current = Array.isArray(drop.supplierTags) ? drop.supplierTags : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          dropshipping: {
            ...drop,
            supplierTags: current.filter((_, i) => i !== idx),
          },
        },
      });
    }
  };

  const handleAddDropshipSprintMetric = () => {
    if (onChange) {
      const drop = modules.dropshipping || {};
      const current = Array.isArray(drop.sprintMetrics)
        ? drop.sprintMetrics
        : [
            { label: "Units Dispatched", value: drop.pilotUnitsSold || "420", highlight: "white" },
            { label: "Test Ad Spend", value: drop.pilotAdSpend || "$3,800", highlight: "white" },
            { label: "Gross Revenue", value: drop.pilotGrossRevenue || "$25,179", highlight: "emerald" },
            { label: "Blended ROAS", value: drop.pilotNetRoas || "3.84x", highlight: "blue" },
          ];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          dropshipping: {
            ...drop,
            sprintMetrics: [...current, { label: "Refund Rate", value: "1.2%", highlight: "emerald" }],
          },
        },
      });
    }
  };

  const handleDeleteDropshipSprintMetric = (idx) => {
    if (onChange) {
      const drop = modules.dropshipping || {};
      const current = Array.isArray(drop.sprintMetrics) ? drop.sprintMetrics : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          dropshipping: {
            ...drop,
            sprintMetrics: current.filter((_, i) => i !== idx),
          },
        },
      });
    }
  };

  return (
    <section
      id="dropshipping"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 11 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={dropData.categoryBadge || "Module 11 · Direct-To-Consumer Fulfillment"}
                          path="modules.dropshipping.categoryBadge"
                          placeholder="Module 11 · Direct-To-Consumer Fulfillment"
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={dropData.moduleTitle || "Dropshipping Store & Winning Product Validation"}
                          path="modules.dropshipping.moduleTitle"
                          placeholder="Dropshipping Store & Winning Product Validation"
                        />
                      </h2>
                      <div className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          value={dropData.subtitle || "Product discovery research, supplier supply chain integration, margin modeling, and TikTok/Meta ad testing for rapid profitable scaling."}
                          path="modules.dropshipping.subtitle"
                          placeholder="Subtitle description..."
                          multiline
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-2xs shrink-0">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <EditableText
                        value={dropData.topBadge || "Fast 5-Day US Fulfillment · 76.3% Gross Margin"}
                        path="modules.dropshipping.topBadge"
                        placeholder="Fast 5-Day US Fulfillment · 76.3% Gross Margin"
                      />
                    </div>
                  </div>

                  {/* Winning Product Case Study Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-7 space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            <EditableText
                              value={dropData.eyebrow || "PRODUCT VALIDATION LABS"}
                              path="modules.dropshipping.eyebrow"
                              placeholder="PRODUCT VALIDATION LABS"
                            />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                            <EditableText
                              value={winProd}
                              path="modules.dropshipping.winningProduct"
                              placeholder="Winning Product Name"
                            />
                          </h3>
                          <div className="text-xs text-slate-500 font-mono mt-1">
                            <EditableText
                              value={storefront}
                              path="modules.dropshipping.storefrontDetails"
                              placeholder="Storefront details..."
                            />
                          </div>
                        </div>

                        {/* Product Image Manager */}
                        <div
                          className="relative aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-slate-200 shadow-xs group cursor-pointer"
                          onClick={() => openDropshippingMedia()}
                          title="Click to view winning product validation & unit economics"
                        >
                          <img
                            src={dropData.productImage || mockupLaptopImg}
                            alt={winProd}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          {/* Hover Inspect Indicator */}
                          <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <div className="px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>Inspect Product & Economics</span>
                            </div>
                          </div>
                          {isEditable && (
                            <div
                              className="absolute bottom-3 right-3 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs shadow-lg z-10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <label className="text-white hover:text-blue-300 font-semibold cursor-pointer flex items-center gap-1.5">
                                <Camera size={13} />
                                <span>Change Image</span>
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
                                          onChange({
                                            ...portfolioData,
                                            modules: {
                                              ...modules,
                                              dropshipping: { ...dropData, productImage: reader.result },
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
                        </div>

                        {/* Dynamic Unit Economics Metrics */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Economics & Margins</span>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddDropshipMetric}
                                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                              >
                                <Plus size={11} />
                                <span>Add Metric</span>
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {economicsList.map((econ, eIdx) => {
                              const isEmerald = econ.highlight === "emerald" || eIdx === 2;
                              return (
                                <div key={eIdx} className="relative group/econ">
                                  {isEditable && economicsList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteDropshipMetric(eIdx)}
                                      className="opacity-0 group-hover/econ:opacity-100 absolute -top-1 -right-1 p-0.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                                    >
                                      <X size={11} />
                                    </button>
                                  )}
                                  <div className={`text-[10px] font-bold uppercase ${isEmerald ? "text-emerald-700" : "text-slate-400"}`}>
                                    <EditableText
                                      value={econ.label}
                                      path={`modules.dropshipping.economics[${eIdx}].label`}
                                      placeholder="LABEL"
                                    />
                                  </div>
                                  <div className={`font-mono font-bold text-sm mt-0.5 ${isEmerald ? "text-emerald-700" : "text-slate-900"}`}>
                                    <EditableText
                                      value={econ.value}
                                      path={`modules.dropshipping.economics[${eIdx}].value`}
                                      placeholder="$0.00"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Creative Angle */}
                        <div className="space-y-1">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            <EditableText
                              value={dropData.adAngleHeading || "WINNING AD ANGLE & HOOK:"}
                              path="modules.dropshipping.adAngleHeading"
                              placeholder="WINNING AD ANGLE & HOOK:"
                            />
                          </div>
                          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                            <EditableText
                              value={dropData.adAngleDescription}
                              path="modules.dropshipping.adAngleDescription"
                              placeholder="Ad angle description..."
                              multiline
                            />
                          </div>
                        </div>

                        {/* Supplier & Logistics Tags */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase">Supply Chain & Automation Partners</span>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddDropshipSupplier}
                                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                              >
                                <Plus size={11} />
                                <span>Add Partner</span>
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {supplierTags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200 group/tag"
                              >
                                <EditableText
                                  value={tag}
                                  path={`modules.dropshipping.supplierTags[${tIdx}]`}
                                  placeholder="Supplier Tag"
                                />
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteDropshipSupplier(tIdx)}
                                    className="p-0.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                                  >
                                    <X size={10} />
                                  </button>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Pilot Launch Results */}
                      <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            <EditableText
                              value={dropData.sprintHeading || "PILOT TESTING SPRINT RESULTS"}
                              path="modules.dropshipping.sprintHeading"
                              placeholder="PILOT TESTING SPRINT RESULTS"
                            />
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            <EditableText
                              value={dropData.sprintTimeframe || "14 Days Live"}
                              path="modules.dropshipping.sprintTimeframe"
                              placeholder="14 Days Live"
                            />
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {sprintMetrics.map((sm, smIdx) => {
                            const isEmerald = sm.highlight === "emerald" || smIdx === 2;
                            const isBlue = sm.highlight === "blue" || smIdx === 3;
                            return (
                              <div key={smIdx} className="relative group/sm">
                                {isEditable && sprintMetrics.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteDropshipSprintMetric(smIdx)}
                                    className="opacity-0 group-hover/sm:opacity-100 absolute -top-1 right-0 p-0.5 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                                  >
                                    <X size={11} />
                                  </button>
                                )}
                                <div className="text-[10px] font-bold text-slate-400 uppercase">
                                  <EditableText
                                    value={sm.label}
                                    path={`modules.dropshipping.sprintMetrics[${smIdx}].label`}
                                    placeholder="METRIC"
                                  />
                                </div>
                                <div className={`text-lg font-bold font-mono mt-0.5 ${
                                  isEmerald ? "text-emerald-400" : isBlue ? "text-blue-400" : "text-white"
                                }`}>
                                  <EditableText
                                    value={sm.value}
                                    path={`modules.dropshipping.sprintMetrics[${smIdx}].value`}
                                    placeholder="420"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {isEditable && (
                          <div className="pt-2 border-t border-slate-800 flex justify-end">
                            <button
                              type="button"
                              onClick={handleAddDropshipSprintMetric}
                              className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                            >
                              <Plus size={11} />
                              <span>Add Sprint Stat</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  );
};
