import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Clock,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  Globe,
  Share2,
  TrendingUp,
  Search,
  BarChart3,
  Users,
  ShoppingBag,
  Video,
  Box,
  Cpu,
  Eye,
  Info,
} from "lucide-react";

/**
 * Universal High-Res Media & Data Lightbox Modal
 * Opens for any image-based or video-based work in the portfolio
 * Features a high-blur backdrop, video player with playback simulation,
 * complete work specifications, metrics, strategy hooks, and sibling navigation.
 */
export const PortfolioMediaModal = ({
  mediaItem,
  onClose,
  onNavigate,
}) => {
  if (!mediaItem) return null;

  const {
    type = "image", // "image" | "video"
    title = "Work Showcase",
    category = "Portfolio Project",
    moduleNumber = "MODULE",
    moduleTitle = "",
    imageUrl = "",
    videoUrl = "",
    thumbnailUrl = "",
    dimensions = "",
    duration = "0:30",
    description = "",
    hook = "",
    retentionMetric = "",
    tools = [],
    metrics = [],
    liveUrl = "",
    tags = [],
    clientType = "",
    itemsList = [],
    currentIndex = -1,
  } = mediaItem;

  // Video playback states
  const [isPlaying, setIsPlaying] = useState(type === "video");
  const [isMuted, setIsMuted] = useState(false);
  const [progressSec, setProgressSec] = useState(0);
  const totalDurationSec = (() => {
    if (!duration) return 30;
    const parts = duration.split(":").map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    return 30;
  })();

  const videoElementRef = useRef(null);

  // Helper to parse embeddable video URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
    }
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isDirectVideo = videoUrl && (videoUrl.endsWith(".mp4") || videoUrl.endsWith(".webm") || videoUrl.startsWith("blob:") || videoUrl.startsWith("data:video"));

  // Timer loop for simulated video playback when no native video element is used
  useEffect(() => {
    if (type !== "video" || isDirectVideo || embedUrl) return;
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= totalDurationSec) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, totalDurationSec, type, isDirectVideo, embedUrl]);

  // Keyboard navigation & ESC listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === " " && type === "video") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, itemsList]);

  // Navigate to sibling item in list
  const hasMultiple = Array.isArray(itemsList) && itemsList.length > 1;

  const handlePrev = () => {
    if (!hasMultiple || !onNavigate || currentIndex <= 0) {
      if (hasMultiple && onNavigate && currentIndex === 0) {
        onNavigate(itemsList.length - 1);
      }
      return;
    }
    onNavigate(currentIndex - 1);
  };

  const handleNext = () => {
    if (!hasMultiple || !onNavigate) return;
    if (currentIndex >= itemsList.length - 1) {
      onNavigate(0);
      return;
    }
    onNavigate(currentIndex + 1);
  };

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const allTags = Array.from(new Set([...(tags || []), ...(tools || [])])).filter(Boolean);

  const displayImage = imageUrl || thumbnailUrl || "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/85 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between pointer-events-none z-20">
        {/* Module Badge & Counter */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-3 py-1 rounded-full bg-slate-900/90 text-blue-400 border border-slate-700/80 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{moduleNumber}</span>
            {moduleTitle && (
              <>
                <span className="text-slate-500">•</span>
                <span className="text-slate-200">{moduleTitle}</span>
              </>
            )}
          </span>

          {hasMultiple && currentIndex >= 0 && (
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700/60 text-[11px] font-mono font-medium backdrop-blur-md hidden sm:inline-block">
              {currentIndex + 1} of {itemsList.length}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {hasMultiple && (
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 rounded-xl p-1 backdrop-blur-md shadow-lg">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Previous Work (←)"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Next Work (→)"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {displayImage && (
            <a
              href={displayImage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors backdrop-blur-md shadow-lg"
              title="Open full resolution in new tab"
            >
              <Maximize2 size={16} />
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white transition-colors shadow-lg cursor-pointer flex items-center justify-center"
            title="Close modal (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Card */}
      <div
        className="relative w-full max-w-5xl max-h-[88vh] bg-slate-900/95 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row text-white animate-in zoom-in-95 duration-200 mt-6 sm:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ============================================================== */}
        {/* LEFT COLUMN: Media Viewport (Image or Video Player)            */}
        {/* ============================================================== */}
        <div className="w-full lg:w-[62%] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden min-h-[280px] sm:min-h-[380px] lg:min-h-[520px]">
          {/* Subtle luminous ambient backdrop */}
          <div className="absolute inset-0 bg-radial from-blue-950/20 via-transparent to-black pointer-events-none" />

          {type === "video" ? (
            /* VIDEO PLAYER VIEWPORT */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6">
              {embedUrl ? (
                /* YouTube / Vimeo Embedded Player */
                <div className="w-full aspect-[16/9] max-h-[70vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
                  <iframe
                    src={embedUrl}
                    title={title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : isDirectVideo ? (
                /* HTML5 Native Video Player */
                <div className="w-full max-h-[72vh] flex items-center justify-center">
                  <video
                    ref={videoElementRef}
                    src={videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[70vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain bg-black"
                  />
                </div>
              ) : (
                /* Simulated High-Retention Motion Reel Player */
                <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] max-h-[72vh] bg-black rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl flex flex-col justify-between group">
                  {/* Thumbnail / Animated poster */}
                  <img
                    src={displayImage}
                    alt={title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? "scale-105 opacity-90" : "scale-100 opacity-80"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                  {/* Top Bar inside simulated reel */}
                  <div className="relative z-10 p-3.5 flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-bold font-mono uppercase tracking-wider shadow-xs">
                      {mediaItem.format || "9:16 Vertical Reel"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsMuted((m) => !m)}
                      className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors backdrop-blur-xs cursor-pointer"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>

                  {/* Center Play/Pause Touch Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                        isPlaying
                          ? "bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 hover:scale-105 backdrop-blur-xs"
                          : "bg-amber-400 text-slate-950 scale-100 opacity-100 hover:scale-110"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7 fill-white" />
                      ) : (
                        <Play className="w-7 h-7 fill-slate-950 ml-1" />
                      )}
                    </div>
                  </button>

                  {/* Bottom Video HUD: Hook subtitle, scrubber, timer */}
                  <div className="relative z-10 p-3.5 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                    {/* Simulated Kinetic Subtitle Hook Overlay */}
                    {hook && (
                      <div className="bg-amber-400/90 text-slate-950 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wide inline-block shadow-md">
                        🔥 HOOK: {hook}
                      </div>
                    )}

                    {/* Progress Bar Scrubber */}
                    <div className="space-y-1">
                      <div
                        className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const ratio = clickX / rect.width;
                          setProgressSec(Math.round(ratio * totalDurationSec));
                        }}
                      >
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-300"
                          style={{
                            width: `${(progressSec / totalDurationSec) * 100}%`,
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-white/80">
                        <span>{formatTime(progressSec)}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{duration}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* IMAGE VIEWPORT */
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <img
                src={displayImage}
                alt={title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              />

              {/* Bottom Subtle Bar over Image */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none text-xs">
                {dimensions && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 text-amber-400 border border-slate-700/80 font-mono text-[10px] font-bold backdrop-blur-md shadow-xs">
                    {dimensions}
                  </span>
                )}
                <span className="ml-auto px-2.5 py-1 rounded-md bg-slate-950/80 text-slate-300 border border-slate-700/80 text-[10px] backdrop-blur-md shadow-xs flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" />
                  <span>Verified Showcase Deliverable</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Detailed Work Data & Specifications Sidebar     */}
        {/* ============================================================== */}
        <div className="w-full lg:w-[38%] p-5 sm:p-6 lg:p-7 bg-slate-900 flex flex-col justify-between overflow-y-auto max-h-[75vh] lg:max-h-[88vh] border-t lg:border-t-0 lg:border-l border-slate-800 space-y-6">
          <div className="space-y-5">
            {/* Category Eyebrow */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
                {category}
              </span>
              {type === "video" && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Video size={10} />
                  <span>Video Deliverable</span>
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">
                {title}
              </h3>
              {clientType && (
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Client / Industry: <span className="text-slate-200">{clientType}</span>
                </p>
              )}
            </div>

            {/* Key Performance Metrics Pills */}
            {metrics && metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5">
                {metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className={`p-2.5 rounded-xl border text-xs ${
                      m.highlight === "emerald"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : m.highlight === "amber"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : m.highlight === "purple"
                        ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                        : "bg-slate-800/80 border-slate-700/60 text-slate-200"
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-75 font-mono">
                      {m.label}
                    </div>
                    <div className="text-sm font-black mt-0.5 truncate">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Work Description / Deliverable Brief */}
            {description && (
              <div className="space-y-1.5">
                <div className="text-[10.5px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Info size={11} />
                  <span>Project Deliverable & Scope:</span>
                </div>
                <p className="text-xs sm:text-[12.5px] text-slate-300 leading-relaxed font-normal bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
                  {description}
                </p>
              </div>
            )}

            {/* Video Specific: Hook Strategy & Retention */}
            {(hook || retentionMetric) && (
              <div className="p-3.5 bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl border border-amber-500/30 space-y-2 text-xs">
                {hook && (
                  <div>
                    <div className="text-[10px] uppercase font-bold text-amber-400 font-mono tracking-wider">
                      Opening Hook Architecture:
                    </div>
                    <div className="text-xs text-white font-semibold mt-0.5">
                      {hook}
                    </div>
                  </div>
                )}
                {retentionMetric && (
                  <div className="pt-1 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Target Retention:</span>
                    <span className="font-bold text-emerald-400">{retentionMetric}</span>
                  </div>
                )}
              </div>
            )}

            {/* Tools / Tags */}
            {allTags && allTags.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10.5px] uppercase font-bold tracking-wider text-slate-400">
                  Tools & Capabilities:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions Row */}
          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>View Live Project</span>
                <ExternalLink size={13} />
              </a>
            ) : displayImage ? (
              <a
                href={displayImage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Eye size={13} />
                <span>Open Full Image</span>
              </a>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMediaModal;
