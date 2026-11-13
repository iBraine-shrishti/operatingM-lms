import React, { useState, useEffect, useMemo } from "react";
import { PortfolioEditableContext } from "./EditableText";
import { ImageUploadModal } from "./ImageUploadModal";
import { PortfolioPdfExporter } from "./PortfolioPdfExporter";
import { PortfolioMediaModal } from "./PortfolioMediaModal";
import { PortfolioContactModal } from "./PortfolioContactModal";
import { MODULES_CATALOG, createInitialPortfolioData } from "./portfolioData";
import {
  renderCustomIcon,
  renderSocialIcon,
  renderSmoIcon,
  getModuleIcon,
  InfiniteCardMarquee,
  formatModuleCategory,
} from "./preview/previewShared";

// Modular Preview Components
import { PortfolioHeroSection } from "./preview/PortfolioHeroSection";
import { PortfolioModuleSliderNav } from "./preview/PortfolioModuleSliderNav";
import { PortfolioFooterSection } from "./preview/PortfolioFooterSection";

// 13 Modular Module Showcases
import { Module01WordPress } from "./preview/Module01WordPress";
import { Module02Canva } from "./preview/Module02Canva";
import { Module03SocialOrganic } from "./preview/Module03SocialOrganic";
import { Module04SocialMarketing } from "./preview/Module04SocialMarketing";
import { Module05GoogleAds } from "./preview/Module05GoogleAds";
import { Module06Seo } from "./preview/Module06Seo";
import { Module07DigitalPlanning } from "./preview/Module07DigitalPlanning";
import { Module08InfluencerMarketing } from "./preview/Module08InfluencerMarketing";
import { Module09Shopify } from "./preview/Module09Shopify";
import { Module10VideoEditing } from "./preview/Module10VideoEditing";
import { Module11Dropshipping } from "./preview/Module11Dropshipping";
import { Module12AiApp } from "./preview/Module12AiApp";
import { Module13PerformanceMarketing } from "./preview/Module13PerformanceMarketing";

// Re-export utilities so any external consumer retains full backward compatibility
export {
  renderCustomIcon,
  renderSocialIcon,
  renderSmoIcon,
  getModuleIcon,
  InfiniteCardMarquee,
  formatModuleCategory,
};

// Component registry for dynamic sequencing
const MODULE_COMPONENTS = {
  wordpress: Module01WordPress,
  canva: Module02Canva,
  socialOrganic: Module03SocialOrganic,
  socialMarketing: Module04SocialMarketing,
  googleAds: Module05GoogleAds,
  seo: Module06Seo,
  digitalPlanning: Module07DigitalPlanning,
  influencerMarketing: Module08InfluencerMarketing,
  shopify: Module09Shopify,
  videoEditing: Module10VideoEditing,
  dropshipping: Module11Dropshipping,
  aiApp: Module12AiApp,
  performanceMarketing: Module13PerformanceMarketing,
};

export const PortfolioPreview = ({
  portfolioData,
  theme,
  moduleVisibility = {},
  onChange,
  onOpenCustomizer,
  isStandalone = false,
  isExportCapture = false,
  isContactOpen,
  onContactOpenChange,
}) => {
  const defaultData = useMemo(() => createInitialPortfolioData(), []);
  const student = portfolioData?.student || defaultData.student;
  const modules = { ...defaultData.modules, ...(portfolioData?.modules || {}) };
  const moduleOrder =
    Array.isArray(portfolioData?.moduleOrder) && portfolioData.moduleOrder.length > 0
      ? portfolioData.moduleOrder
      : defaultData.moduleOrder;
  const isEditable = !isStandalone && Boolean(onChange);

  const [activeTab, setActiveTab] = useState("wordpress");
  const [isPdfExportOpen, setIsPdfExportOpen] = useState(false);
  const [internalContactModalOpen, setInternalContactModalOpen] = useState(false);
  const isContactModalOpen = isContactOpen !== undefined ? isContactOpen : internalContactModalOpen;

  const openContactModal = () => {
    if (onContactOpenChange) onContactOpenChange(true);
    setInternalContactModalOpen(true);
  };

  const closeContactModal = () => {
    if (onContactOpenChange) onContactOpenChange(false);
    setInternalContactModalOpen(false);
  };

  // Universal Lightbox Modal state for image & video work inspection
  const [activeMediaItem, setActiveMediaItem] = useState(null);

  const handleNavigateMedia = (newIndex) => {
    if (!activeMediaItem || typeof activeMediaItem.navigateFn !== "function") return;
    activeMediaItem.navigateFn(newIndex);
  };

  // Image editing modal state
  const [imageModalConfig, setImageModalConfig] = useState({
    isOpen: false,
    title: "",
    currentUrl: "",
    isAvatar: false,
    initialWebsiteUrl: "",
    onSave: null,
  });

  const openImageModal = (title, currentUrl, isAvatar, onSave, initialWebsiteUrl = "") => {
    if (!isEditable) return;
    setImageModalConfig({
      isOpen: true,
      title,
      currentUrl,
      isAvatar,
      initialWebsiteUrl,
      onSave,
    });
  };

  const closeImageModal = () => {
    setImageModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Smooth scroll to section
  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const navEl = document.getElementById("portfolio-module-slider-nav");
      const navHeight = navEl ? navEl.offsetHeight : 64;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight - 12;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  // Ordered navItems matching the student's custom module sequence (filtered first so ranks dynamically update when any module is hidden)
  const navItems = useMemo(() => {
    return moduleOrder
      .filter((modId) => moduleVisibility[modId] !== false)
      .map((modId, index) => {
        const catalogMod = MODULES_CATALOG.find((m) => m.id === modId);
        if (!catalogMod) return null;
        const formattedRank = String(index + 1).padStart(2, "0");
        return {
          id: modId,
          label: `${formattedRank}. ${catalogMod.title}`,
          icon: getModuleIcon(modId),
        };
      })
      .filter(Boolean);
  }, [moduleOrder, moduleVisibility]);

  const scrollSlider = (direction) => {
    const slider = document.getElementById("portfolio-module-slider");
    if (slider) {
      const scrollAmount = direction === "left" ? -280 : 280;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // 1. Keep horizontal module slider smoothly scrolled so the active module pill is centered & live
  useEffect(() => {
    if (!activeTab) return;
    const pill = document.getElementById(`nav-pill-${activeTab}`);
    const slider = document.getElementById("portfolio-module-slider");
    if (pill && slider) {
      const pillLeft = pill.offsetLeft;
      const pillWidth = pill.offsetWidth;
      const sliderWidth = slider.offsetWidth;
      const targetScroll = pillLeft - sliderWidth / 2 + pillWidth / 2;
      slider.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
    }
  }, [activeTab]);

  // 2. High-precision scroll listener for sticky navigation sync using getBoundingClientRect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const navEl = document.getElementById("portfolio-module-slider-nav");
          const navHeight = navEl ? navEl.offsetHeight : 64;
          const triggerLine = navHeight + 120;

          let currentActiveId = null;
          for (const item of navItems) {
            const el = document.getElementById(item.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerLine && rect.bottom > triggerLine) {
                currentActiveId = item.id;
                break;
              }
            }
          }

          // If scrolled to near bottom of the page, activate the last visible module
          if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 80
          ) {
            if (navItems.length > 0) {
              currentActiveId = navItems[navItems.length - 1].id;
            }
          }

          if (currentActiveId && currentActiveId !== activeTab) {
            setActiveTab(currentActiveId);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems, activeTab]);

  // 3. Mouse Wheel & Drag-to-Scroll on horizontal module slider
  useEffect(() => {
    const slider = document.getElementById("portfolio-module-slider");
    if (!slider) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        e.preventDefault();
        slider.scrollBy({ left: e.deltaY * 1.2, behavior: "auto" });
      }
    };

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
    };
    const onMouseUp = () => {
      isDown = false;
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);

    return () => {
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <PortfolioEditableContext.Provider value={isEditable}>
      <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-amber-400 selection:text-slate-950">
        {/* 1. TOPBAR HEADER & HERO SECTION */}
        <PortfolioHeroSection
          student={student}
          theme={theme}
          isEditable={isEditable}
          isStandalone={isStandalone}
          navItems={navItems}
          portfolioData={portfolioData}
          onChange={onChange}
          onOpenImageModal={openImageModal}
          onOpenMedia={setActiveMediaItem}
          onOpenCustomizer={onOpenCustomizer}
          onOpenPdfExport={() => setIsPdfExportOpen(true)}
          onOpenContact={openContactModal}
          scrollToSection={scrollToSection}
        />

        {/* 2. STICKY 13-MODULE NAVIGATION SLIDER */}
        <PortfolioModuleSliderNav
          navItems={navItems}
          activeTab={activeTab}
          theme={theme}
          scrollToSection={scrollToSection}
          scrollSlider={scrollSlider}
        />

        {/* 3. MAIN 13 MODULES SHOWCASE (Rendered in custom dynamic sequence) */}
        <main className="w-full">
          {moduleOrder
            .filter((modId) => moduleVisibility[modId] !== false)
            .map((modId, modIndex) => {
              const Component = MODULE_COMPONENTS[modId];
              if (!Component) return null;
              const isEven = modIndex % 2 === 0;
              const bgClass = isEven
                ? "bg-slate-100/90 border-b border-slate-200/90"
                : "bg-slate-50/70 border-b border-slate-200/40";
              const sequenceNumber = modIndex + 1;
              const formattedRank = String(sequenceNumber).padStart(2, "0");

              return (
                <Component
                  key={modId}
                  portfolioData={portfolioData}
                  modules={modules}
                  theme={theme}
                  isEditable={isEditable}
                  onChange={onChange}
                  onOpenImageModal={openImageModal}
                  onOpenMedia={setActiveMediaItem}
                  bgClass={bgClass}
                  sequenceNumber={sequenceNumber}
                  formattedRank={formattedRank}
                />
              );
            })}
        </main>

        {/* 4. FOOTER WITH OPERATING MEDIA OFFICIAL LOGO & COPYRIGHT */}
        <PortfolioFooterSection
          theme={theme}
          student={student}
          navItems={navItems}
          onOpenContact={openContactModal}
        />

        {/* 5. MODALS */}
        {!isExportCapture && (
          <PortfolioPdfExporter
            isOpen={isPdfExportOpen}
            onClose={() => setIsPdfExportOpen(false)}
            portfolioData={portfolioData}
            theme={theme}
            moduleVisibility={moduleVisibility}
            moduleOrder={moduleOrder}
          />
        )}

        <ImageUploadModal
          isOpen={imageModalConfig.isOpen && isEditable}
          onClose={closeImageModal}
          title={imageModalConfig.title}
          currentUrl={imageModalConfig.currentUrl}
          isAvatar={imageModalConfig.isAvatar}
          initialWebsiteUrl={imageModalConfig.initialWebsiteUrl}
          onSave={(newUrl) => {
            if (imageModalConfig.onSave) {
              imageModalConfig.onSave(newUrl);
            }
            closeImageModal();
          }}
        />

        <PortfolioMediaModal
          mediaItem={activeMediaItem}
          onClose={() => setActiveMediaItem(null)}
          onNavigate={handleNavigateMedia}
        />

        <PortfolioContactModal
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
          student={student}
          theme={theme}
        />
      </div>
    </PortfolioEditableContext.Provider>
  );
};

export default PortfolioPreview;
