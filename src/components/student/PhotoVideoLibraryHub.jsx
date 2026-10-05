import React, { useState, useEffect, useRef } from 'react';
import { 
  Image as ImageIcon, PlaySquare, ArrowRight, ChevronLeft, ChevronRight, 
  Camera, Film, Play, Maximize2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryPhotos, galleryVideos } from '../../data/galleryData';
import { PhotoLightboxModal } from '../common/PhotoLightboxModal';
import { VideoPlayerModal } from '../common/VideoPlayerModal';

export const PhotoVideoLibraryHub = () => {
  const navigate = useNavigate();

  // Photo Carousel State
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Video Carousel State
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const totalPhotosCount = 120; // Visual badge matching PHOTO-LIB.png (1 / 120)

  // Infinite Loop Auto-rotation for Photos (4.5s cycle)
  useEffect(() => {
    if (isPhotoHovered || isPhotoModalOpen) return;
    const photoTimer = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % galleryPhotos.length);
    }, 4500);
    return () => clearInterval(photoTimer);
  }, [isPhotoHovered, isPhotoModalOpen]);

  // Infinite Loop Auto-rotation for Videos (5.5s cycle)
  useEffect(() => {
    if (isVideoHovered || isVideoModalOpen) return;
    const videoTimer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % galleryVideos.length);
    }, 5500);
    return () => clearInterval(videoTimer);
  }, [isVideoHovered, isVideoModalOpen]);

  // Photo Navigation (Infinite Loop)
  const prevPhoto = (e) => {
    e?.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % galleryPhotos.length);
  };

  // Video Navigation (Infinite Loop)
  const prevVideo = (e) => {
    e?.stopPropagation();
    setCurrentVideoIdx((prev) => (prev - 1 + galleryVideos.length) % galleryVideos.length);
  };

  const nextVideo = (e) => {
    e?.stopPropagation();
    setCurrentVideoIdx((prev) => (prev + 1) % galleryVideos.length);
  };

  const currentPhoto = galleryPhotos[currentPhotoIdx] || galleryPhotos[0];
  const currentVideo = galleryVideos[currentVideoIdx] || galleryVideos[0];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* ============================================================== */}
        {/* CARD 1: PHOTO LIBRARY (MATCHING PHOTO-LIB.png)                 */}
        {/* ============================================================== */}
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2">
              <div className="text-[#2563eb] flex items-center justify-center shrink-0">
                <ImageIcon size={19} strokeWidth={2.2} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                Photo Library
              </h3>
            </div>

            <button
              type="button"
              onClick={() => navigate('/gallery?tab=photos')}
              className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors group"
            >
              <span>View All</span>
              <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Photo Carousel Container with Blurred Peek Backdrop and Centered Card */}
          <div
            className="relative rounded-xl overflow-hidden bg-slate-900 h-52 sm:h-56 lg:h-60 flex items-center justify-center group select-none shadow-xs cursor-pointer"
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
            onClick={() => setIsPhotoModalOpen(true)}
            title="Click to view full photo"
          >
            {/* Blurred background panorama providing side-peek effect */}
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-md opacity-50 scale-110 transition-all duration-700"
              style={{ backgroundImage: `url(${currentPhoto.url})` }}
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Left Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              title="Previous Photo"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Center Main Panoramic Photo (matching PHOTO-LIB.png) */}
            <div className="relative z-10 w-[86%] sm:w-[88%] h-[88%] rounded-xl overflow-hidden shadow-2xl border border-white/25 flex items-center justify-center">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                key={currentPhoto.id}
                className="w-full h-full object-cover object-center transition-all duration-500 animate-in fade-in"
              />
            </div>

            {/* Right Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              title="Next Photo"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>

            {/* Bottom-right Counter Badge: [Camera Icon] 1 / 120 */}
            <div className="absolute bottom-3 right-4 bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md border border-white/10 z-20 pointer-events-none">
              <Camera size={12} strokeWidth={2.2} />
              <span>{currentPhotoIdx + 1} / {totalPhotosCount}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 2: VIDEO LIBRARY (MATCHING PHOTO-LIB.png)                 */}
        {/* ============================================================== */}
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2">
              <div className="text-[#2563eb] flex items-center justify-center shrink-0">
                <PlaySquare size={19} strokeWidth={2.2} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                Video Library
              </h3>
            </div>

            <button
              type="button"
              onClick={() => navigate('/gallery?tab=videos')}
              className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors group"
            >
              <span>View All</span>
              <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Video Container (matching PHOTO-LIB.png) */}
          <div
            className="relative rounded-xl overflow-hidden bg-slate-950 h-52 sm:h-56 lg:h-60 flex items-center justify-center group select-none shadow-xs cursor-pointer"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            onClick={() => setIsVideoModalOpen(true)}
            title="Click to play video"
          >
            {/* Video Poster Thumbnail */}
            <img
              src={currentVideo.thumbnail}
              alt={currentVideo.title}
              key={currentVideo.id}
              className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 animate-in fade-in"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none" />

            {/* Left Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={prevVideo}
              className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              title="Previous Video"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Center Circular Play Button */}
            <div
              className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-[#2563eb] border border-white/20 text-white flex items-center justify-center shadow-xl transition-all duration-200 transform group-hover:scale-115 cursor-pointer z-20"
              title="Play Lecture"
            >
              <Play size={18} className="fill-white translate-x-0.5" />
            </div>

            {/* Right Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={nextVideo}
              className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              title="Next Video"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>

            {/* Bottom-right Duration Badge: [Film Icon] 08:24 */}
            <div className="absolute bottom-3 right-4 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md border border-white/10 z-20 pointer-events-none">
              <Film size={12} strokeWidth={2.2} />
              <span>{currentVideo.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox & Video Player Modals */}
      <PhotoLightboxModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={galleryPhotos}
        currentIndex={currentPhotoIdx}
        onIndexChange={setCurrentPhotoIdx}
      />

      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videos={galleryVideos}
        currentIndex={currentVideoIdx}
        onIndexChange={setCurrentVideoIdx}
      />
    </>
  );
};
