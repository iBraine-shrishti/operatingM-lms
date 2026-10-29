import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  Sparkles,
  Lock,
  SkipBack,
  SkipForward,
  Radio,
  Tv,
  ExternalLink,
  CheckCircle2,
  Clock,
  Settings,
  Flame,
  Check
} from "lucide-react";

/**
 * PremiumVideoPlayer
 * World-class custom HTML5 video player with:
 * - Fluid custom glassmorphism controls (auto-hiding on playback inactivity)
 * - Interactive seek scrubber with hover timestamp preview & buffer progress
 * - Dynamic Cloudflare R2 S3 HTTP 206 chunked streaming
 * - Smooth volume slider, 10s skip controls, speed popover, PiP & true fullscreen
 * - Keyboard shortcuts (Space, F, M, Arrows, J/L)
 * - CRM access lock screen & autoplay countdown
 */
export const PremiumVideoPlayer = ({
  videoRef,
  streamUrl,
  videoMime = "video/mp4",
  isLoading = false,
  isLocked = false,
  lockMessage = "",
  title = "Course Lecture",
  moduleName = "Core Curriculum",
  lessonNumber = 1,
  totalLessons = 10,
  poster = "",
  playbackSpeed = 1,
  onSpeedChange = () => {},
  theaterMode = false,
  onToggleTheater = () => {},
  onTimeUpdate = () => {},
  onLoadedMetadata = () => {},
  onEnded = () => {},
  resumePrompt = null,
  onRestartVideo = () => {},
  onDismissResume = () => {},
  onPreviousLesson = null,
  onNextLesson = null,
  hasPrevLesson = false,
  hasNextLesson = false,
  isCompleted = false,
  onToggleCompleted = () => {},
  onNavigateToFees = () => {},
  onBackToCourse = () => {},
}) => {
  const containerRef = useRef(null);
  const scrubberRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const rippleTimeoutRef = useRef(null);

  // Playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem("om_player_volume");
      return saved !== null ? parseFloat(saved) : 1;
    } catch {
      return 1;
    }
  });
  const [isMuted, setIsMuted] = useState(false);
  const lastNonZeroVolumeRef = useRef(volume > 0 ? volume : 0.8);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [rippleAction, setRippleAction] = useState(null); // 'play' | 'pause' | 'skip-back' | 'skip-fwd' | 'volume'

  // Hover & Popover states
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [showRemainingTime, setShowRemainingTime] = useState(false);

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = useCallback((secs) => {
    if (!secs || isNaN(secs) || secs < 0) return "00:00";
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Sync volume with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, videoRef]);

  // Sync playback speed with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, videoRef]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Controls auto-hide timer
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (!showSpeedMenu && !isScrubbing) {
          setShowControls(false);
        }
      }, 2500);
    }
  }, [isPlaying, showSpeedMenu, isScrubbing]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying && !showSpeedMenu && !isScrubbing) {
      setShowControls(false);
    }
  }, [isPlaying, showSpeedMenu, isScrubbing]);

  // Trigger tactile center ripple icon
  const triggerRipple = useCallback((type) => {
    setRippleAction(type);
    if (rippleTimeoutRef.current) clearTimeout(rippleTimeoutRef.current);
    rippleTimeoutRef.current = setTimeout(() => {
      setRippleAction(null);
    }, 600);
  }, []);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          triggerRipple("play");
        })
        .catch((err) => console.warn("Playback error:", err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
      triggerRipple("pause");
    }
  }, [videoRef]);

  // Skip time (+/- seconds)
  const skipTime = useCallback(
    (seconds) => {
      if (!videoRef.current) return;
      const newTime = Math.min(
        Math.max(0, videoRef.current.currentTime + seconds),
        duration || 99999
      );
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      triggerRipple(seconds > 0 ? "skip-fwd" : "skip-back");
    },
    [duration, videoRef]
  );

  // Toggle Fullscreen
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request error:", err);
    }
  }, []);

  // Toggle Picture-in-Picture
  const togglePiP = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn("Picture in Picture error:", err);
    }
  }, [videoRef]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const willMute = !prev;
      if (!willMute) {
        if (volume === 0) {
          const restored = lastNonZeroVolumeRef.current || 0.8;
          setVolume(restored);
        }
      } else {
        if (volume > 0) {
          lastNonZeroVolumeRef.current = volume;
        }
      }
      return willMute;
    });
    triggerRipple("volume");
  }, [volume, triggerRipple]);

  // Volume slider / meter change
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) {
      lastNonZeroVolumeRef.current = val;
      if (isMuted) setIsMuted(false);
    } else {
      setIsMuted(true);
    }
    try {
      localStorage.setItem("om_player_volume", val.toString());
    } catch {
      // quota fallback
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture when typing in inputs/textareas
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target.isContentEditable
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "arrowleft":
        case "j":
          e.preventDefault();
          skipTime(-10);
          break;
        case "arrowright":
        case "l":
          e.preventDefault();
          skipTime(10);
          break;
        case "arrowup":
          e.preventDefault();
          setVolume((prev) => {
            const nextVol = Math.min(1, Math.round((prev + 0.1) * 10) / 10);
            lastNonZeroVolumeRef.current = nextVol;
            return nextVol;
          });
          setIsMuted(false);
          triggerRipple("volume");
          break;
        case "arrowdown":
          e.preventDefault();
          setVolume((prev) => {
            const nextVol = Math.max(0, Math.round((prev - 0.1) * 10) / 10);
            if (nextVol === 0) setIsMuted(true);
            return nextVol;
          });
          triggerRipple("volume");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, toggleFullscreen, toggleMute, skipTime, triggerRipple]);

  // Progress update & buffer calculation
  const handleInternalTimeUpdate = (e) => {
    if (!videoRef.current) return;
    const now = videoRef.current.currentTime;
    setCurrentTime(now);

    // Track buffer range
    if (videoRef.current.buffered.length > 0) {
      try {
        const end = videoRef.current.buffered.end(
          videoRef.current.buffered.length - 1
        );
        setBufferedEnd(end);
      } catch {
        // buffered range error fallback
      }
    }

    onTimeUpdate(e);
  };

  const handleInternalLoadedMetadata = (e) => {
    if (videoRef.current) {
      const vidDur = videoRef.current.duration;
      setDuration(vidDur);
    }
    onLoadedMetadata(e);
  };

  // Scrubber drag / click
  const handleScrubberSeek = (e) => {
    if (!scrubberRef.current || !videoRef.current || !duration) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pos * duration;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleScrubberMouseMove = (e) => {
    if (!scrubberRef.current || !duration) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPosition(pos * 100);
    setHoverTime(pos * duration);
  };

  const handleScrubberMouseLeave = () => {
    setHoverTime(null);
  };

  // Progress percentages
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070b14] border border-slate-800/80 shadow-2xl shadow-blue-950/20 group select-none transition-all ${
        theaterMode ? "w-full" : ""
      } ${!showControls && isPlaying ? "cursor-none" : "cursor-default"}`}
      style={{
        aspectRatio: "16 / 9",
        background: "radial-gradient(circle at 50% 50%, #0d1527 0%, #060913 100%)",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. LOCKED OVERLAY (CRM Access Control State)                  */}
      {/* ------------------------------------------------------------- */}
      {isLocked ? (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-md text-white">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-2xl shadow-amber-500/15 animate-in zoom-in-95">
            <Lock size={32} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-3">
            <Radio size={12} className="text-amber-400 animate-pulse" />
            <span>Operating Media CRM Protected Content</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-extrabold mb-2 tracking-tight">
            Lesson Video Restricted
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            {lockMessage ||
              "This lecture requires active course enrollment verified via Operating Media CRM. Please contact administration or check your student account to unlock this module."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateToFees}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View CRM Enrollment & Fees</span>
              <ExternalLink size={14} />
            </button>
            <button
              onClick={onBackToCourse}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer border border-slate-700/60"
            >
              Back to Course
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ------------------------------------------------------------- */}
          {/* 2. CORE HTML5 VIDEO ELEMENT                                  */}
          {/* ------------------------------------------------------------- */}
          <video
            ref={videoRef}
            src={streamUrl || undefined}
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            poster={poster}
            onClick={togglePlay}
            onDoubleClick={toggleFullscreen}
            onTimeUpdate={handleInternalTimeUpdate}
            onLoadedMetadata={handleInternalLoadedMetadata}
            onEnded={() => {
              setIsPlaying(false);
              setShowControls(true);
              onEnded();
            }}
            onWaiting={() => setIsBuffering(true)}
            onCanPlay={() => setIsBuffering(false)}
            onPlaying={() => {
              setIsPlaying(true);
              setIsBuffering(false);
            }}
            onPause={() => {
              setIsPlaying(false);
              setShowControls(true);
            }}
            className="w-full h-full object-contain cursor-pointer"
          >
            Your browser does not support HTML5 video streaming.
          </video>

          {/* ------------------------------------------------------------- */}
          {/* 3. TACTILE CENTER RIPPLE FEEDBACK ON PLAY / PAUSE / SKIP      */}
          {/* ------------------------------------------------------------- */}
          {rippleAction && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
              <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl animate-out fade-out zoom-out-95 duration-500">
                {rippleAction === "play" && <Play size={34} className="ml-1 text-cyan-400" />}
                {rippleAction === "pause" && <Pause size={34} className="text-amber-400" />}
                {rippleAction === "skip-fwd" && (
                  <div className="flex flex-col items-center">
                    <RotateCw size={26} className="text-blue-400" />
                    <span className="text-[10px] font-bold font-mono mt-0.5">+10s</span>
                  </div>
                )}
                {rippleAction === "skip-back" && (
                  <div className="flex flex-col items-center">
                    <RotateCcw size={26} className="text-blue-400" />
                    <span className="text-[10px] font-bold font-mono mt-0.5">-10s</span>
                  </div>
                )}
                {rippleAction === "volume" && (
                  <div className="flex flex-col items-center">
                    {isMuted || volume === 0 ? (
                      <VolumeX size={28} className="text-red-400" />
                    ) : volume < 0.5 ? (
                      <Volume1 size={28} className="text-cyan-400" />
                    ) : (
                      <Volume2 size={28} className="text-cyan-400" />
                    )}
                    <span className="text-[10px] font-bold font-mono mt-0.5">
                      {isMuted || volume === 0 ? "MUTED" : `${Math.round(volume * 100)}%`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 4. STREAM LOADING / BUFFERING SPINNER                         */}
          {/* ------------------------------------------------------------- */}
          {(isLoading || isBuffering) && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-25 bg-black/30 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-2.5 bg-slate-900/90 border border-slate-700/80 px-6 py-4 rounded-2xl shadow-2xl text-white">
                <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold tracking-wide text-slate-200">
                  {isLoading ? "Securing Stream from Cloudflare R2..." : "Buffering HD Video..."}
                </span>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 5. TOP VIDEO HEADER OVERLAY                                   */}
          {/* ------------------------------------------------------------- */}
          <div
            className={`absolute top-0 left-0 right-0 p-2 sm:p-4 md:p-5 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-20 transition-opacity duration-300 flex items-start justify-between gap-2 sm:gap-3 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="min-w-0 flex-1 pr-1 sm:pr-2">
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] font-semibold text-cyan-400 uppercase tracking-wider mb-0.5 sm:mb-1 truncate">
                <span className="truncate max-w-[110px] xs:max-w-[180px] sm:max-w-xs">{moduleName}</span>
                <span className="text-slate-500 shrink-0">•</span>
                <span className="text-slate-300 font-mono shrink-0">
                  Lesson {lessonNumber} of {totalLessons}
                </span>
              </div>
              <h2 className="text-[11px] sm:text-base font-bold text-white drop-shadow-md truncate">
                {title}
              </h2>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">1080p Full HD</span>
                <span className="sm:hidden font-bold">1080p</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                <Radio size={11} className="text-cyan-400" />
                <span>FastEdge R2</span>
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 6. RESUME PLAYBACK NOTIFICATION BANNER                        */}
          {/* ------------------------------------------------------------- */}
          {resumePrompt && (
            <div className="absolute top-16 left-4 right-4 z-25 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-white rounded-2xl p-3 flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center space-x-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-semibold">
                  Resumed from where you left off at{" "}
                  <strong className="text-cyan-400">{resumePrompt.formatted}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onRestartVideo}
                  className="text-xs font-bold text-slate-200 hover:text-white px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Start over</span>
                </button>
                <button
                  onClick={onDismissResume}
                  className="text-slate-400 hover:text-white text-xs px-1 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 7. BOTTOM CUSTOM CONTROLS OVERLAY                            */}
          {/* ------------------------------------------------------------- */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent px-2 sm:px-5 pt-6 sm:pt-10 pb-2 sm:pb-4 z-20 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* A. INTERACTIVE SCRUBBER / TIMELINE */}
            <div
              ref={scrubberRef}
              onClick={handleScrubberSeek}
              onMouseMove={handleScrubberMouseMove}
              onMouseLeave={handleScrubberMouseLeave}
              className="relative w-full h-2.5 sm:h-3 flex items-center cursor-pointer group/scrubber mb-1 sm:mb-2"
            >
              {/* Background Track */}
              <div className="relative w-full h-1 group-hover/scrubber:h-2 bg-white/20 rounded-full overflow-hidden transition-all duration-150">
                {/* Buffered Range Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white/30 rounded-full transition-all duration-200"
                  style={{ width: `${bufferPercent}%` }}
                />
                {/* Played Progress Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full shadow-sm shadow-cyan-400/50"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Glowing Scrubber Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-white shadow-md shadow-cyan-400/60 ring-2 ring-cyan-400/50 scale-0 group-hover/scrubber:scale-100 transition-transform pointer-events-none"
                style={{
                  left: `calc(${progressPercent}% - 6px)`,
                }}
              />

              {/* Hover Tooltip Timestamp */}
              {hoverTime !== null && (
                <div
                  className="absolute -top-7 sm:-top-8 -translate-x-1/2 bg-slate-900/95 text-white text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border border-slate-700/80 shadow-xl pointer-events-none"
                  style={{ left: `${hoverPosition}%` }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>

            {/* B. ACTION BUTTONS ROW */}
            <div className="flex items-center justify-between text-white text-[11px] sm:text-sm gap-1 sm:gap-2">
              {/* LEFT GROUP: Play, Skip, Volume, Time */}
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  className="p-1 sm:p-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all cursor-pointer text-white shrink-0"
                  title={isPlaying ? "Pause (Space/K)" : "Play (Space/K)"}
                >
                  {isPlaying ? (
                    <Pause size={17} className="fill-current text-white sm:w-5 sm:h-5" />
                  ) : (
                    <Play size={17} className="fill-current text-white ml-0.5 sm:w-5 sm:h-5" />
                  )}
                </button>

                {/* Skip -10s (hidden on very small viewports) */}
                <button
                  onClick={() => skipTime(-10)}
                  className="hidden xs:flex p-1 sm:p-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all text-slate-300 hover:text-white cursor-pointer relative shrink-0"
                  title="Rewind 10s (Left Arrow/J)"
                >
                  <RotateCcw size={14} className="sm:w-[17px] sm:h-[17px]" />
                  <span className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 text-[7px] sm:text-[8px] font-bold font-mono">
                    10
                  </span>
                </button>

                {/* Skip +10s (hidden on very small viewports) */}
                <button
                  onClick={() => skipTime(10)}
                  className="hidden xs:flex p-1 sm:p-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all text-slate-300 hover:text-white cursor-pointer relative shrink-0"
                  title="Forward 10s (Right Arrow/L)"
                >
                  <RotateCw size={14} className="sm:w-[17px] sm:h-[17px]" />
                  <span className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 text-[7px] sm:text-[8px] font-bold font-mono">
                    10
                  </span>
                </button>

                {/* Volume Control with Interactive Meter & Level Readout */}
                <div className="flex items-center space-x-1 sm:space-x-1.5 bg-black/40 hover:bg-black/60 px-1 sm:px-2 py-0.5 sm:py-1 rounded-xl border border-white/10 transition-colors group/volume shrink-0">
                  {/* Mute/Unmute Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    title={isMuted || volume === 0 ? "Unmute (M)" : "Mute (M)"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={15} className="text-red-400 sm:w-[17px] sm:h-[17px]" />
                    ) : volume < 0.5 ? (
                      <Volume1 size={15} className="text-cyan-300 sm:w-[17px] sm:h-[17px]" />
                    ) : (
                      <Volume2 size={15} className="text-cyan-400 sm:w-[17px] sm:h-[17px]" />
                    )}
                  </button>

                  {/* Interactive Volume Slider & Meter Bar - visible on sm+ screens */}
                  <div className="hidden sm:flex relative w-14 sm:w-18 md:w-22 h-5 items-center cursor-pointer group/meter">
                    {/* Background Track */}
                    <div className="w-full h-1.5 group-hover/meter:h-2 bg-white/20 rounded-full overflow-hidden transition-all duration-150 relative">
                      {/* Active Volume Meter Level Fill */}
                      <div
                        className={`h-full rounded-full transition-all duration-75 ${
                          isMuted || volume === 0
                            ? "w-0 bg-slate-500"
                            : "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shadow-sm shadow-cyan-400/50"
                        }`}
                        style={{
                          width: `${isMuted ? 0 : Math.round(volume * 100)}%`,
                        }}
                      />
                    </div>

                    {/* Native Range Input for Smooth Dragging & Accessibility */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      aria-label="Volume Meter"
                    />

                    {/* Glowing Indicator Knob */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md shadow-cyan-400/60 ring-2 ring-cyan-400/50 transition-opacity pointer-events-none ${
                        isMuted || volume === 0
                          ? "opacity-30"
                          : "opacity-90 group-hover/meter:opacity-100"
                      }`}
                      style={{
                        left: `calc(${isMuted ? 0 : Math.round(volume * 100)}% - 5px)`,
                      }}
                    />
                  </div>

                  {/* Volume Level Percentage - visible on sm+ screens */}
                  <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-mono font-bold text-slate-300 tabular-nums min-w-[24px] sm:min-w-[28px] text-right select-none">
                    {isMuted || volume === 0 ? "0%" : `${Math.round(volume * 100)}%`}
                  </span>
                </div>

                {/* Time Display */}
                <div
                  onClick={() => setShowRemainingTime((prev) => !prev)}
                  className="px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white font-mono text-[10px] sm:text-xs cursor-pointer select-none shrink-0"
                  title="Click to toggle elapsed / remaining time"
                >
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-500 mx-0.5 sm:mx-1">/</span>
                  <span>
                    {showRemainingTime && duration > 0
                      ? `-${formatTime(Math.max(0, duration - currentTime))}`
                      : formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* RIGHT GROUP: Previous/Next, Speed, PiP, Theater, Fullscreen */}
              <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                {/* Previous Lesson */}
                {onPreviousLesson && (
                  <button
                    disabled={!hasPrevLesson}
                    onClick={onPreviousLesson}
                    className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer hidden md:flex"
                    title="Previous Lesson"
                  >
                    <SkipBack size={17} />
                  </button>
                )}

                {/* Next Lesson */}
                {onNextLesson && (
                  <button
                    disabled={!hasNextLesson}
                    onClick={onNextLesson}
                    className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer hidden md:flex"
                    title="Next Lesson"
                  >
                    <SkipForward size={17} />
                  </button>
                )}

                {/* Playback Speed Popover */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu((prev) => !prev)}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold font-mono bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center space-x-1"
                    title="Playback Speed"
                  >
                    <span>{playbackSpeed}x</span>
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 w-32 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl z-40 animate-in fade-in zoom-in-95">
                      <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                        Speed
                      </div>
                      {[0.75, 1, 1.25, 1.5, 1.75, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => {
                            onSpeedChange(spd);
                            setShowSpeedMenu(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                            playbackSpeed === spd
                              ? "bg-blue-600 text-white"
                              : "text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          <span>{spd === 1 ? "1.0x (Normal)" : `${spd}x`}</span>
                          {playbackSpeed === spd && <Check size={13} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Picture in Picture */}
                <button
                  onClick={togglePiP}
                  className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
                  title="Picture-in-Picture"
                >
                  <Tv size={17} />
                </button>

                {/* Theater Mode */}
                <button
                  onClick={onToggleTheater}
                  className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer hidden lg:flex"
                  title={theaterMode ? "Exit Theater Mode" : "Theater Mode"}
                >
                  {theaterMode ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1 sm:p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                >
                  {isFullscreen ? <Minimize size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Maximize size={16} className="sm:w-[18px] sm:h-[18px]" />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
