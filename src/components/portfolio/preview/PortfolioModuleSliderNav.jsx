import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const PortfolioModuleSliderNav = ({
  navItems,
  activeTab,
  theme,
  scrollToSection,
  scrollSlider,
}) => {
  return (
    <nav
      id="portfolio-module-slider-nav"
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md transition-all"
    >
      <div className="w-full px-1.5 sm:px-3 lg:px-6 flex items-center space-x-1 sm:space-x-2">
        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => scrollSlider("left")}
          aria-label="Scroll modules left"
          className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer transition-colors shadow-2xs border border-slate-200"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Module Tabs Slider (Custom Shuffled Sequence) */}
        <div
          id="portfolio-module-slider"
          className="flex items-center space-x-2 sm:space-x-2.5 py-2.5 sm:py-3 overflow-x-auto scroll-smooth no-scrollbar w-full flex-1 touch-pan-x"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-pill-${item.id}`}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 sm:space-x-2 transition-all cursor-pointer shrink-0 shadow-2xs ${
                  isActive
                    ? "text-white shadow-sm ring-2 ring-white/20"
                    : "text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/90 border border-slate-200/60"
                }`}
                style={isActive ? { backgroundColor: theme.primary } : {}}
              >
                <Icon size={13} className="shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => scrollSlider("right")}
          aria-label="Scroll modules right"
          className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 cursor-pointer transition-colors shadow-2xs border border-slate-200"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
};
