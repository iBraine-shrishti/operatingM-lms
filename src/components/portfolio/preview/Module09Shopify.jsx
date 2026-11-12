import React from "react";
import {
  ShoppingBag,
  Plus,
  Trash2,
  Camera,
  Eye,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Store,
  Activity,
  Layers,
  RotateCcw,
  X,
  ShieldCheck,
} from "lucide-react";
import { EditableText } from "../EditableText";
import { renderCustomIcon } from "./previewShared";
import mockupLaptopImg from "../../../assets/mockup-laptop.jpg";

export const Module09Shopify = ({
  portfolioData,
  modules,
  theme,
  isEditable,
  onChange,
  onOpenImageModal,
  onOpenMedia,
  bgClass = "bg-slate-100/90 border-b border-slate-200/90",
}) => {
  const shopData = modules.shopify || {};
  const storeName = shopData.storeName || "Terra & Tide Apparel";
  const nicheCat = shopData.nicheCategory || "SUSTAINABLE ORGANIC OUTDOOR APPAREL & GEAR";
  const themeBadge = shopData.themeUsed || "Customized Dawn 2.0 with liquid micro-optimizations";
  const description = shopData.description || "Complete Shopify store setup from scratch. Configured product collections, payment gateways, automated tax settings, shipping zones, and integrated post-purchase cross-sell flows that immediately increased average order value by 30%.";
  
  const kpiList = Array.isArray(shopData.kpis) && shopData.kpis.length > 0 ? shopData.kpis : [
    { id: "kpi-1", label: shopData.conversionRateLabel || "CONVERSION RATE", value: shopData.conversionRateAchieved || "3.84% (up from 1.9% store baseline)", highlight: "blue" },
    { id: "kpi-2", label: shopData.aovLabel || "ACHIEVED AOV", value: shopData.aovAchieved || "$89.50 (+$21 lift via cart cross-sells)", highlight: "amber" },
  ];

  const croFeatures = Array.isArray(shopData.croFeatures) && shopData.croFeatures.length > 0 ? shopData.croFeatures : [
    { text: "Slide-out Smart Cart with progress bar toward free shipping", icon: "cart" },
    { text: "Instant 1-Click Shopify Pay & Apple Pay express checkout", icon: "zap" },
    { text: "Sticky mobile buy bar with real-time stock scarcity notice", icon: "trending" },
    { text: "Size guide interactive modal with 98% fit confidence", icon: "shield" },
  ];

  const installedApps = Array.isArray(shopData.installedApps) && shopData.installedApps.length > 0 ? shopData.installedApps : [
    "Klaviyo: Email Marketing & SMS",
    "Rebuy Engine: Smart Cart & AI Upsells",
    "Judge.me: Verified Product Reviews",
    "Matrixify: Bulk Inventory Automation",
    "Loox: Photo Reviews & UGC Carousel",
  ];

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (onOpenImageModal) {
      onOpenImageModal(title, currentUrl, isAvatar, onSave, initialWebsiteUrl);
    }
  };

  const openShopifyMedia = () => {
    const shopData = modules.shopify || {};
    onOpenMedia && onOpenMedia({
      type: "image",
      moduleNumber: "MODULE 09",
      moduleTitle: "Shopify E-Commerce Store Architecture",
      category: shopData.topBadge || "Shopify Partner Certified",
      title: shopData.storeName || "Shopify Store Showcase",
      imageUrl: shopData.imageUrl || mockupCreativesImg,
      clientType: shopData.niche || "Direct-To-Consumer (D2C)",
      description: shopData.description || `Fully functional Shopify storefront with customized Liquid templates, streamlined 1-click checkout, conversion-rate optimized product pages, and app integrations.`,
      metrics: [
        { label: "Conversion Rate", value: shopData.conversionRate || "3.8%", highlight: "emerald" },
        { label: "Average Order Value", value: shopData.aov || "₹2,450", highlight: "amber" },
        { label: "Monthly Revenue", value: shopData.monthlyRevenue || "₹4,80,000", highlight: "purple" },
        { label: "Mobile Speed Score", value: shopData.speedScore || "94/100", highlight: "slate" },
      ],
      tags: ["Shopify Liquid", shopData.themeUsed || "Dawn 2.0", "Klaviyo CRM", "Loox Reviews", "1-Page Checkout"],
      liveUrl: shopData.liveUrl || "",
      currentIndex: 0,
      itemsList: [shopData],
      navigateFn: null,
    });
  };


  const handleAddShopifyKpi = () => {
    if (onChange) {
      const shop = modules.shopify || {};
      const current = Array.isArray(shop.kpis)
        ? shop.kpis
        : [
            { id: "kpi-1", label: shop.conversionRateLabel || "CONVERSION RATE", value: shop.conversionRateAchieved || "3.84%", highlight: "blue" },
            { id: "kpi-2", label: shop.aovLabel || "ACHIEVED AOV", value: shop.aovAchieved || "$89.50", highlight: "amber" },
          ];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          shopify: {
            ...shop,
            kpis: [...current, { id: "kpi-" + Date.now(), label: "NEW KPI METRIC", value: "4.5x Lift", highlight: "emerald" }],
          },
        },
      });
    }
  };

  const handleDeleteShopifyKpi = (idx) => {
    if (onChange) {
      const shop = modules.shopify || {};
      const current = Array.isArray(shop.kpis) ? shop.kpis : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          shopify: {
            ...shop,
            kpis: current.filter((_, i) => i !== idx),
          },
        },
      });
    }
  };

  const handleAddShopifyCroFeature = () => {
    if (onChange) {
      const shop = modules.shopify || {};
      const current = Array.isArray(shop.croFeatures) ? shop.croFeatures : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          shopify: {
            ...shop,
            croFeatures: [...current, { text: "Slide-out Smart Cart with progress bar toward free shipping", icon: "cart" }],
          },
        },
      });
    }
  };

  const handleDeleteShopifyCroFeature = (fIdx) => {
    if (onChange) {
      const shop = modules.shopify || {};
      const current = Array.isArray(shop.croFeatures) ? shop.croFeatures : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          shopify: {
            ...shop,
            croFeatures: current.filter((_, i) => i !== fIdx),
          },
        },
      });
    }
  };

  const handleCycleShopifyCroIcon = (fIdx) => {
    if (onChange) {
      const shop = modules.shopify || {};
      const current = Array.isArray(shop.croFeatures) ? [...shop.croFeatures] : [];
      const item = current[fIdx];
      const currentIcon = typeof item === "object" ? (item.icon || "check") : "check";
      const iconCycle = ["check", "zap", "trending", "shield", "sparkles", "cart", "award", "truck", "target", "dollar"];
      const nextIcon = iconCycle[(iconCycle.indexOf(currentIcon) + 1) % iconCycle.length];
      if (typeof item === "object") {
        current[fIdx] = { ...item, icon: nextIcon };
      } else {
        current[fIdx] = { text: item, icon: nextIcon };
      }
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          shopify: { ...shop, croFeatures: current },
        },
      });
    }
  };

  const handleAddShopifyApp = () => {
    if (onChange) {
      const shop = modules.shopify || {};
      const current = Array.isArray(shop.installedApps) ? shop.installedApps : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          shopify: {
            ...shop,
            installedApps: [...current, "Rebuy Engine: Smart Cart & AI Upsells"],
          },
        },
      });
    }
  };

  const handleDeleteShopifyApp = (aIdx) => {
    if (onChange) {
      const shop = modules.shopify || {};
      const current = Array.isArray(shop.installedApps) ? shop.installedApps : [];
      onChange({
        ...portfolioData,
        modules: {
          ...modules,
          shopify: {
            ...shop,
            installedApps: current.filter((_, i) => i !== aIdx),
          },
        },
      });
    }
  };

  return (
    <section
      id="shopify"
      className={`w-full py-12 sm:py-16 scroll-mt-28 transition-colors ${bgClass}`}
    >
      <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-1 sm:px-2 space-y-8">
                  {/* Module 09 Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        <EditableText
                          value={shopData.categoryBadge || "Module 09 · E-Commerce Architecture"}
                          path="modules.shopify.categoryBadge"
                          placeholder="Module 09 · E-Commerce Architecture"
                        />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                        <EditableText
                          value={shopData.moduleTitle || "Shopify E-Commerce Store & CRO Architecture"}
                          path="modules.shopify.moduleTitle"
                          placeholder="Shopify E-Commerce Store & CRO Architecture"
                        />
                      </h2>
                      <div className="mt-2 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
                        <EditableText
                          value={shopData.subtitle || "End-to-end Shopify merchant deployment designed for high Average Order Value (AOV), seamless 1-click checkout, and automated retention loops."}
                          path="modules.shopify.subtitle"
                          placeholder="Subtitle description..."
                          multiline
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto shadow-2xs shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <EditableText
                        value={shopData.topBadge || "Shopify Partner Certified · Liquid Customized"}
                        path="modules.shopify.topBadge"
                        placeholder="Shopify Partner Certified · Liquid Customized"
                      />
                    </div>
                  </div>

                  {/* Store Showcase Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Store Screenshot Mockup */}
                      <div className="lg:col-span-6 space-y-3">
                        <div
                          className="relative bg-slate-950 aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 shadow-xs group cursor-pointer"
                          onClick={() => openShopifyMedia()}
                          title="Click to inspect Shopify store data & CRO metrics"
                        >
                          <img
                            src={shopData.imageUrl || mockupCreativesImg}
                            alt={storeName}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          {/* Hover Inspect Indicator */}
                          <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <div className="px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>Inspect Store & CRO Metrics</span>
                            </div>
                          </div>
                          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-amber-400 font-mono text-[10px] px-2.5 py-1 rounded-md border border-slate-700 shadow-xs font-bold">
                            <EditableText
                              value={themeBadge}
                              path="modules.shopify.themeUsed"
                              placeholder="Customized Dawn 2.0 with liquid micro-optimizations"
                            />
                          </div>

                          {/* Editable Image Upload Overlay */}
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
                                              shopify: { ...shopData, imageUrl: reader.result },
                                            },
                                          });
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  if (onChange) {
                                    onChange({
                                      ...portfolioData,
                                      modules: {
                                        ...modules,
                                        shopify: { ...shopData, imageUrl: mockupCreativesImg },
                                      },
                                    });
                                  }
                                }}
                                className="text-slate-400 hover:text-white text-[11px] font-medium"
                              >
                                Reset
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Store Details, KPIs & CRO */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                            <EditableText
                              value={nicheCat}
                              path="modules.shopify.nicheCategory"
                              placeholder="SUSTAINABLE ORGANIC OUTDOOR APPAREL & GEAR"
                            />
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                            <EditableText
                              value={storeName}
                              path="modules.shopify.storeName"
                              placeholder="Terra & Tide Apparel"
                            />
                          </h3>
                          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                            <EditableText
                              value={description}
                              path="modules.shopify.description"
                              placeholder="Complete Shopify store setup description..."
                              multiline
                            />
                          </div>
                        </div>

                        {/* Dynamic Stat Boxes */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Store Performance Metrics</span>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddShopifyKpi}
                                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                              >
                                <Plus size={11} />
                                <span>Add KPI Card</span>
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {kpiList.map((kpi, kIdx) => {
                              const isBlue = kpi.highlight === "blue" || kIdx === 0;
                              const isAmber = kpi.highlight === "amber" || kIdx === 1;
                              const isEmerald = kpi.highlight === "emerald";
                              return (
                                <div
                                  key={kpi.id || kIdx}
                                  className={`p-3.5 rounded-xl border relative group/kpi ${
                                    isEmerald
                                      ? "bg-emerald-50/60 border-emerald-200"
                                      : isAmber
                                      ? "bg-amber-50/60 border-amber-200"
                                      : "bg-blue-50/60 border-blue-200"
                                  }`}
                                >
                                  {isEditable && kpiList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteShopifyKpi(kIdx)}
                                      className="opacity-0 group-hover/kpi:opacity-100 absolute top-2 right-2 p-0.5 text-slate-400 hover:text-rose-600 rounded transition-opacity cursor-pointer"
                                      title="Delete KPI Card"
                                    >
                                      <X size={12} />
                                    </button>
                                  )}
                                  <div className={`text-[11px] font-bold uppercase tracking-wider ${
                                    isEmerald
                                      ? "text-emerald-800"
                                      : isAmber
                                      ? "text-amber-800"
                                      : "text-blue-700"
                                  }`}>
                                    <EditableText
                                      value={kpi.label}
                                      path={`modules.shopify.kpis[${kIdx}].label`}
                                      placeholder="KPI LABEL"
                                    />
                                  </div>
                                  <div className="font-mono font-bold text-sm sm:text-base text-slate-900 mt-1">
                                    <EditableText
                                      value={kpi.value}
                                      path={`modules.shopify.kpis[${kIdx}].value`}
                                      placeholder="3.84%"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* CRO Features with Customizable Icons */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                              <EditableText
                                value={shopData.croFeaturesHeading || "CONVERSION RATE OPTIMIZATION (CRO) FEATURES:"}
                                path="modules.shopify.croFeaturesHeading"
                                placeholder="CONVERSION RATE OPTIMIZATION (CRO) FEATURES:"
                              />
                            </div>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddShopifyCroFeature}
                                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                              >
                                <Plus size={11} />
                                <span>Add Feature</span>
                              </button>
                            )}
                          </div>
                          <div className="space-y-1.5 text-xs text-slate-700">
                            {croFeatures.map((feat, fIdx) => {
                              const featText = typeof feat === "object" ? feat.text : feat;
                              const featIcon = typeof feat === "object" ? feat.icon : "check";
                              return (
                                <div key={fIdx} className="flex items-center justify-between gap-2 group/feat">
                                  <div className="flex items-center gap-2 flex-1">
                                    {isEditable ? (
                                      <button
                                        type="button"
                                        onClick={() => handleCycleShopifyCroIcon(fIdx)}
                                        className="shrink-0 text-blue-600 hover:scale-120 transition-transform cursor-pointer"
                                        title="Click to cycle icon (Check, Zap, Trend, Shield, Sparkle...)"
                                      >
                                        {renderCustomIcon(featIcon, "check", "w-4 h-4 text-blue-600")}
                                      </button>
                                    ) : (
                                      <div className="shrink-0 text-blue-600">
                                        {renderCustomIcon(featIcon, "check", "w-4 h-4 text-blue-600")}
                                      </div>
                                    )}
                                    <EditableText
                                      value={featText}
                                      path={`modules.shopify.croFeatures[${fIdx}].text`}
                                      placeholder="CRO Feature..."
                                    />
                                  </div>
                                  {isEditable && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteShopifyCroFeature(fIdx)}
                                      className="opacity-0 group-hover/feat:opacity-100 p-0.5 text-slate-400 hover:text-rose-600 rounded transition-opacity cursor-pointer"
                                      title="Delete Feature"
                                    >
                                      <X size={12} />
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Integrated Shopify Apps */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                              <EditableText
                                value={shopData.installedAppsHeading || "INTEGRATED SHOPIFY APPS:"}
                                path="modules.shopify.installedAppsHeading"
                                placeholder="INTEGRATED SHOPIFY APPS:"
                              />
                            </div>
                            {isEditable && (
                              <button
                                type="button"
                                onClick={handleAddShopifyApp}
                                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                              >
                                <Plus size={11} />
                                <span>Add App Tag</span>
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {installedApps.map((app, aIdx) => (
                              <span
                                key={aIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 group/app"
                              >
                                <EditableText
                                  value={app}
                                  path={`modules.shopify.installedApps[${aIdx}]`}
                                  placeholder="App Name"
                                />
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteShopifyApp(aIdx)}
                                    className="p-0.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                                    title="Delete App"
                                  >
                                    <X size={11} />
                                  </button>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  );
};
