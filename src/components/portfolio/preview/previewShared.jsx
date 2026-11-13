import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Palette,
  Share2,
  TrendingUp,
  Search,
  BarChart3,
  Briefcase,
  Users,
  ShoppingBag,
  Video,
  Box,
  Cpu,
  Zap,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  Play,
  Truck,
  DollarSign,
  Flame,
  Activity,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Music,
  Github,
  MessageCircle,
  Facebook,
  Pin,
  Target,
} from "lucide-react";

export const renderSmoIcon = (platform, icon) => {
  const key = (icon || platform || "").toLowerCase();
  if (key.includes("linkedin")) return <Linkedin className="w-5 h-5 text-blue-400" />;
  if (key.includes("instagram")) return <Instagram className="w-5 h-5 text-pink-400" />;
  if (key.includes("youtube")) return <Youtube className="w-5 h-5 text-red-500" />;
  if (key.includes("twitter") || key.includes(" x") || key === "x") return <Twitter className="w-5 h-5 text-sky-400" />;
  if (key.includes("tiktok") || key.includes("music")) return <Music className="w-5 h-5 text-fuchsia-400" />;
  if (key.includes("facebook")) return <Facebook className="w-5 h-5 text-blue-500" />;
  if (key.includes("pinterest") || key.includes("pin")) return <Pin className="w-5 h-5 text-rose-500" />;
  return <Share2 className="w-5 h-5 text-emerald-400" />;
};

export const renderSocialIcon = (platform) => {
  switch (platform?.toLowerCase()) {
    case "linkedin":
      return <Linkedin size={13} />;
    case "twitter":
    case "x":
      return <Twitter size={13} />;
    case "instagram":
      return <Instagram size={13} />;
    case "github":
      return <Github size={13} />;
    case "whatsapp":
      return <MessageCircle size={13} className="text-emerald-400" />;
    case "behance":
      return <span className="text-[10px] font-black font-mono">Bē</span>;
    default:
      return <Globe size={13} />;
  }
};

export const getModuleIcon = (id) => {
  switch (id) {
    case "wordpress": return Globe;
    case "canva": return Palette;
    case "socialOrganic": return Share2;
    case "socialMarketing": return TrendingUp;
    case "googleAds": return Search;
    case "seo": return BarChart3;
    case "digitalPlanning": return Briefcase;
    case "influencerMarketing": return Users;
    case "shopify": return ShoppingBag;
    case "videoEditing": return Video;
    case "dropshipping": return Box;
    case "aiApp": return Cpu;
    case "performanceMarketing": return Zap;
    default: return Globe;
  }
};

// Helper to render customized icons for features, outcomes and badges
export const renderCustomIcon = (iconName, defaultIcon = "check", className = "w-4 h-4") => {
  const name = (typeof iconName === "object" ? iconName?.icon : iconName || defaultIcon || "").toLowerCase();
  if (name.includes("sparkle") || name.includes("star")) return <Sparkles className={className} />;
  if (name.includes("zap") || name.includes("bolt") || name.includes("flash")) return <Zap className={className} />;
  if (name.includes("shield")) return <ShieldCheck className={className} />;
  if (name.includes("chart") || name.includes("graph") || name.includes("bar")) return <BarChart3 className={className} />;
  if (name.includes("trend") || name.includes("growth")) return <TrendingUp className={className} />;
  if (name.includes("target")) return <Target className={className} />;
  if (name.includes("award")) return <Award className={className} />;
  if (name.includes("clock") || name.includes("time")) return <Clock className={className} />;
  if (name.includes("play") || name.includes("video")) return <Play className={className} />;
  if (name.includes("bag") || name.includes("shop") || name.includes("cart")) return <ShoppingBag className={className} />;
  if (name.includes("truck") || name.includes("shipping")) return <Truck className={className} />;
  if (name.includes("cpu") || name.includes("ai") || name.includes("bot")) return <Cpu className={className} />;
  if (name.includes("dollar") || name.includes("cash") || name.includes("money")) return <DollarSign className={className} />;
  if (name.includes("flame") || name.includes("fire")) return <Flame className={className} />;
  if (name.includes("activity") || name.includes("pulse")) return <Activity className={className} />;
  if (name.includes("layer")) return <Layers className={className} />;
  return <CheckCircle2 className={className} />;
};

/**
 * Dynamically format a module category/eyebrow string with the current visible rank
 * e.g., "Module 02 · Visual Branding" with rank "01" becomes "Module 01 · Visual Branding"
 */
export const formatModuleCategory = (category, fallbackSuffix, rank) => {
  const formattedRank = String(rank || "01").padStart(2, "0");
  if (!category || typeof category !== "string") {
    return `Module ${formattedRank} · ${fallbackSuffix}`;
  }
  if (/^module\s+\d+\s*[·•\-:]\s*/i.test(category)) {
    return category.replace(/^module\s+\d+(\s*[·•\-:]\s*)/i, (match, sep) => {
      const isUpper = match.toUpperCase() === match;
      return `${isUpper ? "MODULE" : "Module"} ${formattedRank}${sep}`;
    });
  }
  return category;
};

/**
 * InfiniteCardMarquee:
 * Horizontally scrolling infinite loop for portfolio cards.
 * Automatically glides across the screen, hides scrollbar,
 * and pauses instantly on hover or focus so users can comfortably read & interact.
 */
export const InfiniteCardMarquee = ({
  items,
  renderItem,
  speed = 36, // pixels per second
  className = "",
  itemKeyPrefix = "marquee-item",
}) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items enough times so total width exceeds viewport
  const repeatCount = !items || items.length === 0 ? 0 : items.length < 3 ? 4 : items.length < 5 ? 3 : 2;
  const duplicatedItems = [];
  for (let r = 0; r < repeatCount; r++) {
    (items || []).forEach((item, idx) => {
      duplicatedItems.push({ item, originalIdx: idx, repIdx: r });
    });
  }

  // Smooth JS continuous auto-scroll using delta time
  useEffect(() => {
    const container = containerRef.current;
    if (!container || duplicatedItems.length === 0) return;

    let animId;
    let lastTime = performance.now();

    const step = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isPaused && container) {
        container.scrollLeft += speed * dt;
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft -= maxScroll;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, duplicatedItems.length, speed]);

  // Mouse wheel horizontal scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY * 1.2, behavior: "auto" });
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Desktop drag-to-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      if (e.target.closest("button") || e.target.closest("input") || e.target.closest("textarea") || e.target.closest("a")) return;
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; };
    const onMouseUp = () => { isDown = false; };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const scrollByAmount = (offset) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={`relative w-full group/marquee ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Scroll Left Button */}
      <button
        type="button"
        onClick={() => scrollByAmount(-400)}
        aria-label="Scroll Left"
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all hover:scale-105 hover:bg-slate-50 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Marquee Track Container */}
      <div
        ref={containerRef}
        className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1 touch-pan-x"
      >
        {duplicatedItems.map(({ item, originalIdx, repIdx }, i) => (
          <div
            key={`${itemKeyPrefix}-${repIdx}-${originalIdx}-${i}`}
            className="shrink-0 flex items-stretch"
          >
            {renderItem(item, originalIdx, repIdx > 0)}
          </div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        type="button"
        onClick={() => scrollByAmount(400)}
        aria-label="Scroll Right"
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all hover:scale-105 hover:bg-slate-50 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      {/* Subtle Hover Pause indicator badge */}
      <div className="flex items-center justify-end gap-1.5 pt-1 pr-1 text-[10px] font-mono text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Infinite marquee · Hover to pause and read</span>
      </div>
    </div>
  );
};
