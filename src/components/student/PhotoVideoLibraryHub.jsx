import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, PlaySquare, ArrowRight, ChevronLeft, ChevronRight, 
  Film, Maximize2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryPhotos, galleryVideos } from '../../data/galleryData';
import { PhotoLightboxModal } from '../common/PhotoLightboxModal';
import { VideoPlayerModal } from '../common/VideoPlayerModal';
import photoBg from '../../assets/photo-bg.png';
import videoBg from '../../assets/video-bg.png';
import imageGall1 from '../../assets/image-gall1.webp';

export const PhotoVideoLibraryHub = () => {
  const navigate = useNavigate();

  // Photo Carousel State (Infinite loop on imageGall1)
  const [photoCycleKey, setPhotoCycleKey] = useState(0);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Video State (Infinite loop on YouTube Short MVpDf5bariI)
  const [videoCycleKey, setVideoCycleKey] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const totalPhotosCount = 150; // Visual badge matching samplw-ui.png (1 / 150)

  // Subtle infinite cycle effect for photo (auto loops every 4s unless hovered)
  useEffect(() => {
    if (isPhotoHovered || isPhotoModalOpen) return;
    const photoTimer = setInterval(() => {
      setPhotoCycleKey((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(photoTimer);
  }, [isPhotoHovered, isPhotoModalOpen]);

  // Infinite loop navigation for photos
  const prevPhoto = (e) => {
    e?.stopPropagation();
    setPhotoCycleKey((prev) => prev - 1);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setPhotoCycleKey((prev) => prev + 1);
  };

  // Infinite loop navigation for video (re-triggers loop)
  const prevVideo = (e) => {
    e?.stopPropagation();
    setVideoCycleKey((prev) => prev - 1);
  };

  const nextVideo = (e) => {
    e?.stopPropagation();
    setVideoCycleKey((prev) => prev + 1);
  };

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
              title="Previous Photo (Infinite Loop)"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Center Vertical Social Card (matching samplw-ui.png) */}
            <div
              onClick={() => setIsPhotoModalOpen(true)}
              className="relative w-[155px] sm:w-[185px] md:w-[205px] h-[215px] sm:h-[250px] md:h-[275px] rounded-2xl overflow-hidden border-[3.5px] border-white ring-1 ring-blue-100/70 shadow-[0_16px_40px_rgba(37,99,235,0.18)] cursor-pointer transform -rotate-2 hover:rotate-0 transition-all duration-300 z-10 flex items-center justify-center bg-slate-900 group"
              title="Click to view full photo"
            >
              <img
                key={photoCycleKey}
                src={imageGall1}
                alt="Operating Media Campus & Certification"
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 animate-in fade-in"
              />

              {/* Bottom-right Counter Badge: [Film] 1 / 150 */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-md border border-white/10 z-20 pointer-events-none">
                <Film size={11} strokeWidth={2.2} />
                <span>1 / {totalPhotosCount}</span>
              </div>
            </div>

            {/* Right Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#2563eb] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-100"
              title="Next Photo (Infinite Loop)"
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
          >
            {/* Left Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={prevVideo}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#2563eb] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-100"
              title="Previous Video (Infinite Loop)"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Center Vertical Social Media Video Card (Infinite Loop YouTube Short MVpDf5bariI) */}
            <div className="relative w-[155px] sm:w-[185px] md:w-[205px] h-[215px] sm:h-[250px] md:h-[275px] rounded-2xl overflow-hidden border-[3.5px] border-white ring-1 ring-blue-100/70 shadow-[0_16px_40px_rgba(37,99,235,0.18)] z-10 flex items-center justify-center bg-black group">
              {/* YouTube Short Player Embed looping infinitely */}
              <iframe
                key={videoCycleKey}
                src="https://www.youtube.com/embed/MVpDf5bariI?autoplay=1&mute=1&loop=1&playlist=MVpDf5bariI&controls=1&playsinline=1&rel=0&modestbranding=1"
                title="Operating Media YouTube Short"
                className="w-full h-full border-0 object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Expand Fullscreen Modal Button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-md z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                title="Open Video Modal"
              >
                <Maximize2 size={13} />
              </button>
            </div>

            {/* Right Circular Navigation Button (Infinite loop) */}
            <button
              type="button"
              onClick={nextVideo}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#2563eb] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 border border-slate-100"
              title="Next Video (Infinite Loop)"
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
        currentIndex={0}
        onIndexChange={() => {}}
      />

      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videos={galleryVideos}
        currentIndex={0}
        onIndexChange={() => {}}
      />
    </>
  );
};
