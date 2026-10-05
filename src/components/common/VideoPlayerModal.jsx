import React, { useEffect, useRef } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, Film, Clock, User, CheckCircle2 } from 'lucide-react';

export const VideoPlayerModal = ({ isOpen, onClose, videos = [], currentIndex = 0, onIndexChange }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndexChange((currentIndex + 1) % videos.length);
      if (e.key === 'ArrowLeft') onIndexChange((currentIndex - 1 + videos.length) % videos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, videos.length, onClose, onIndexChange]);

  if (!isOpen || !videos.length) return null;

  const currentVideo = videos[currentIndex] || videos[0];

  const handlePrev = (e) => {
    e.stopPropagation();
    onIndexChange((currentIndex - 1 + videos.length) % videos.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onIndexChange((currentIndex + 1) % videos.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 text-white">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Film size={16} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base leading-tight truncate">{currentVideo.title}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User size={11} className="text-blue-400" />
                <span className="truncate">{currentVideo.instructor}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {currentIndex + 1} / {videos.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Video Player Area with Infinite Next/Prev Overlay Controls */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={currentVideo.videoUrl}
            poster={currentVideo.thumbnail}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />

          {/* Previous Video Button (Infinite loop) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            title="Previous Video (Infinite Loop)"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next Video Button (Infinite loop) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            title="Next Video (Infinite Loop)"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock size={13} className="text-blue-400" />
              <span>Duration: {currentVideo.duration}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-800/60 font-semibold">
              {currentVideo.category || 'Masterclass'}
            </span>
          </div>

          <p className="text-slate-500 text-xs hidden sm:block max-w-sm truncate">
            {currentVideo.description}
          </p>
        </div>
      </div>
    </div>
  );
};
