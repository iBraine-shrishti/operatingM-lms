import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, PlaySquare, ArrowRight, ChevronLeft, ChevronRight, 
  Film, Play, X, ExternalLink 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryPhotos, galleryVideos } from '../../data/galleryData';
import { PhotoLightboxModal } from '../common/PhotoLightboxModal';
import { VideoPlayerModal } from '../common/VideoPlayerModal';
import photoBg from '../../assets/photo-bg.png';
import videoBg from '../../assets/video-bg.png';

export const PhotoVideoLibraryHub = () => {
  const navigate = useNavigate();

  // Photo Carousel State
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Video State
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInlineVideoPlaying, setIsInlineVideoPlaying] = useState(false);

  const totalPhotosCount = 150; // Visual badge matching samplw-ui.png (1 / 150)

  // Infinite Loop Auto-rotation for Photos (4s cycle)
  useEffect(() => {
    if (isPhotoHovered || isPhotoModalOpen) return;
    const photoTimer = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % galleryPhotos.length);
    }, 4000);
    return () => clearInterval(photoTimer);
  }, [isPhotoHovered, isPhotoModalOpen]);

  // Infinite Loop Auto-rotation for Videos (5.5s cycle, only when not playing inline)
  useEffect(() => {
    if (isVideoHovered || isVideoModalOpen || isInlineVideoPlaying) return;
    const videoTimer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % galleryVideos.length);
    }, 5500);
    return () => clearInterval(videoTimer);
  }, [isVideoHovered, isVideoModalOpen, isInlineVideoPlaying]);

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
    setIsInlineVideoPlaying(false);
    setCurrentVideoIdx((prev) => (prev - 1 + galleryVideos.length) % galleryVideos.length);
  };

  const nextVideo = (e) => {
    e?.stopPropagation();
    setIsInlineVideoPlaying(false);
    setCurrentVideoIdx((prev) => (prev + 1) % galleryVideos.length);
  };

  const currentPhoto = galleryPhotos[currentPhotoIdx] || galleryPhotos[0];
  const currentVideo = galleryVideos[currentVideoIdx] || galleryVideos[0];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* ============================================================== */}
        {/* CARD 1: PHOTO LIBRARY (MATCHING samplw-ui.png)                 */}
        {/* ============================================================== */}
        <div className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between space-y-3.5 rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2.5">
              <div className="text-[#2563eb] flex items-center justify-center shrink-0">
                <ImageIcon size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-snug">
                  Photo Library
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-normal leading-tight">
                  Explore moments, event photos, and campus highlights.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/gallery?tab=photos')}
              className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors group shrink-0"
            >
              <span>View All</span>
              <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Photo Content Container with photo-bg.png & Vertical Card */}
          <div
            className="relative rounded-2xl overflow-hidden bg-cover bg-center h-64 sm:h-72 lg:h-80 flex items-center justify-center p-4 select-none shadow-xs border border-blue-50/80"
            style={{ backgroundImage: `url(${photoBg})` }}
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
          >
            {/* Left Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#2563eb] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-100"
              title="Previous Photo"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Center Vertical Social Card (matching samplw-ui.png) */}
            <div
              onClick={() => setIsPhotoModalOpen(true)}
              className="relative w-[155px] sm:w-[185px] md:w-[205px] h-[215px] sm:h-[250px] md:h-[275px] rounded-2xl overflow-hidden border-[3.5px] border-white ring-1 ring-blue-100/70 shadow-[0_16px_40px_rgba(37,99,235,0.18)] cursor-pointer transform -rotate-2 hover:rotate-0 transition-all duration-300 z-10 flex items-center justify-center bg-slate-900"
              title="Click to view full photo"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                key={currentPhoto.id}
                className="w-full h-full object-cover object-center transition-all duration-500 animate-in fade-in"
              />

              {/* Bottom-right Counter Badge: [Film/Clapperboard] 1 / 150 */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-md border border-white/10 z-20 pointer-events-none">
                <Film size={11} strokeWidth={2.2} />
                <span>{currentPhotoIdx + 1} / {totalPhotosCount}</span>
              </div>
            </div>

            {/* Right Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#2563eb] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-100"
              title="Next Photo"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 2: VIDEO LIBRARY (MATCHING samplw-ui.png)                 */}
        {/* ============================================================== */}
        <div className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between space-y-3.5 rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2.5">
              <div className="text-[#2563eb] flex items-center justify-center shrink-0">
                <PlaySquare size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-snug">
                  Video Library
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-normal leading-tight">
                  Short videos, lectures, workshops and event highlights.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/gallery?tab=videos')}
              className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors group shrink-0"
            >
              <span>View All</span>
              <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Video Content Container with video-bg.png & Vertical Card */}
          <div
            className="relative rounded-2xl overflow-hidden bg-cover bg-center h-64 sm:h-72 lg:h-80 flex items-center justify-center p-4 select-none shadow-xs border border-blue-50/80"
            style={{ backgroundImage: `url(${videoBg})` }}
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
          >
            {/* Left Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={prevVideo}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#2563eb] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-100"
              title="Previous Video"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Center Vertical Social Media Video Card (matching samplw-ui.png) */}
            <div className="relative w-[155px] sm:w-[185px] md:w-[205px] h-[215px] sm:h-[250px] md:h-[275px] rounded-2xl overflow-hidden border-[3.5px] border-white ring-1 ring-blue-100/70 shadow-[0_16px_40px_rgba(37,99,235,0.18)] z-10 flex items-center justify-center bg-slate-950 group">
              {isInlineVideoPlaying ? (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/MVpDf5bariI?autoplay=1&enablejsapi=1&rel=0"
                    title="Operating Media YouTube Short"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsInlineVideoPlaying(false);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-red-600 transition z-30"
                    title="Close Video"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsInlineVideoPlaying(true)}
                  className="w-full h-full relative cursor-pointer flex items-center justify-center"
                  title="Click to play YouTube Short"
                >
                  {/* Vertical Video Thumbnail */}
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                    alt={currentVideo.title}
                    key={currentVideo.id}
                    className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700 animate-in fade-in"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Center Circular Play Button (matching samplw-ui.png) */}
                  <div
                    className="w-12 h-12 rounded-full bg-slate-900/75 hover:bg-[#2563eb] border border-white/20 text-white flex items-center justify-center shadow-xl transition-all duration-200 transform group-hover:scale-115 cursor-pointer z-20"
                    title="Play Video"
                  >
                    <Play size={18} className="fill-white translate-x-0.5" />
                  </div>

                  {/* Bottom-right Duration Badge: [Film] 08:24 */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-md border border-white/10 z-20 pointer-events-none">
                    <Film size={11} strokeWidth={2.2} />
                    <span>08:24</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={nextVideo}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#2563eb] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-100"
              title="Next Video"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
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
