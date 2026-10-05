import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Camera, Calendar, MapPin } from 'lucide-react';

export const PhotoLightboxModal = ({ isOpen, onClose, photos = [], currentIndex = 0, onIndexChange }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndexChange((currentIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onIndexChange((currentIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onIndexChange]);

  if (!isOpen || !photos.length) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = (e) => {
    e.stopPropagation();
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onIndexChange((currentIndex + 1) % photos.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-400">
            <Camera size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base leading-tight">{currentPhoto.title}</h3>
            <p className="text-xs text-white/60">{currentPhoto.category || 'Operating Media Gallery'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white">
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Center Image Frame with Navigation */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto min-h-0" onClick={(e) => e.stopPropagation()}>
        {/* Previous Button (Infinite loop) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          title="Previous photo (Infinite Loop)"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Center Image */}
        <div className="relative max-h-[75vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl select-none transition-all duration-300"
          />
        </div>

        {/* Next Button (Infinite loop) */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          title="Next photo (Infinite Loop)"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Bottom Footer Info */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 py-2 border-t border-white/10 z-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-4">
          {currentPhoto.date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-blue-400" />
              <span>{currentPhoto.date}</span>
            </span>
          )}
          {currentPhoto.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-emerald-400" />
              <span>{currentPhoto.location}</span>
            </span>
          )}
        </div>

        <a
          href={currentPhoto.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer"
        >
          <Download size={13} />
          <span>Open Full Resolution</span>
        </a>
      </div>
    </div>
  );
};
