import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Image as ImageIcon, PlaySquare, Film, Camera, Search, Filter, 
  ArrowLeft, Play, Calendar, User, Clock, CheckCircle2, Sparkles, Layers 
} from 'lucide-react';
import { galleryPhotos, galleryVideos } from '../data/galleryData';
import { PhotoLightboxModal } from '../components/common/PhotoLightboxModal';
import { VideoPlayerModal } from '../components/common/VideoPlayerModal';

export const GalleryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeTab = searchParams.get('tab') || 'all'; // 'all', 'photos', 'videos'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [videoModalIndex, setVideoModalIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const categories = ['All', 'Classroom & Practical', 'Masterclasses', 'Workshops & Seminars', 'Convocation & Awards', 'Campus Excursion & Outdoors'];

  // Filtered Photos
  const filteredPhotos = useMemo(() => {
    return galleryPhotos.filter(photo => {
      const matchCat = selectedCategory === 'All' || photo.category === selectedCategory;
      const matchSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          photo.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Filtered Videos
  const filteredVideos = useMemo(() => {
    return galleryVideos.filter(video => {
      const matchCat = selectedCategory === 'All' || video.category === selectedCategory;
      const matchSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenPhoto = (idx) => {
    setLightboxIndex(idx);
    setIsLightboxOpen(true);
  };

  const handleOpenVideo = (idx) => {
    setVideoModalIndex(idx);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/80 border border-blue-100/90 rounded sm:rounded-3xl p-5 sm:p-7 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-white border border-blue-200/80 px-2 py-0.5 rounded shadow-2xs">
                CAMPUS ARCHIVES & MEDIA HUB
              </span>
              <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Studio Sync</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Photo & Video Library
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Explore Operating Media classroom sessions, faculty masterclasses, convocation moments, and seminar archives.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs flex items-center space-x-1.5 self-start sm:self-center cursor-pointer active:scale-95"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* 2. Tabs & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        {/* Tab Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers size={14} />
            <span>All Media</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchParams({ tab: 'photos' })}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'photos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ImageIcon size={14} />
            <span>Photo Library ({galleryPhotos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchParams({ tab: 'videos' })}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'videos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PlaySquare size={14} />
            <span>Video Library ({galleryVideos.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photos or videos..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>
      </div>

      {/* 3. Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Media Display Area */}
      <div className="space-y-8">
        {/* SECTION: PHOTO LIBRARY */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-[#2563eb]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Photo Library ({filteredPhotos.length})
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Infinite loop slideshow available
              </span>
            </div>

            {filteredPhotos.length === 0 ? (
              <div className="text-center py-10 bg-white border border-slate-100 rounded-2xl text-slate-400 text-xs">
                No photos found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onClick={() => handleOpenPhoto(idx)}
                    className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                          <Camera size={13} /> View Photo
                        </span>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {photo.category}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {photo.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                        <span>{photo.date}</span>
                        <span>{photo.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION: VIDEO LIBRARY */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlaySquare size={18} className="text-[#2563eb]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Video Library ({filteredVideos.length})
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Studio Masterclasses & Lectures
              </span>
            </div>

            {filteredVideos.length === 0 ? (
              <div className="text-center py-10 bg-white border border-slate-100 rounded-2xl text-slate-400 text-xs">
                No videos found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVideos.map((video, idx) => (
                  <div
                    key={video.id}
                    onClick={() => handleOpenVideo(idx)}
                    className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-950 flex items-center justify-center">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                      {/* Center Play Button */}
                      <div className="w-11 h-11 rounded-full bg-slate-900/80 group-hover:bg-[#2563eb] border border-white/20 text-white flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-115 z-10">
                        <Play size={18} className="fill-white translate-x-0.5" />
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                        <Film size={11} />
                        <span>{video.duration}</span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-semibold text-blue-600 uppercase tracking-wider text-[10px]">
                            {video.category}
                          </span>
                          <span>{video.views}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {video.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1 font-medium">
                          <User size={12} className="text-slate-400" />
                          <span className="truncate max-w-[180px]">{video.instructor}</span>
                        </span>
                        <span className="text-blue-600 font-bold group-hover:underline">
                          Watch &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox & Video Player Modals */}
      <PhotoLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        photos={galleryPhotos}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />

      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videos={galleryVideos}
        currentIndex={videoModalIndex}
        onIndexChange={setVideoModalIndex}
      />
    </div>
  );
};

export default GalleryPage;
