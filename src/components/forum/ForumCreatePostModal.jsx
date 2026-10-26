import React, { useState, useRef } from "react";
import { X, Upload, ImageIcon, Tag, Sparkles, Check, AlertCircle, Trash2, MessageSquare, Loader2 } from "lucide-react";
import { lmsService } from "../../services/lmsService";

export const ForumCreatePostModal = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  courses = [],
  defaultCommunity = "social-media",
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [community, setCommunity] = useState(defaultCommunity);
  const [category, setCategory] = useState("Question");
  const [courseId, setCourseId] = useState("course-1");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Process uploaded image file directly to VPS storage
  const processImageFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFileName(file.name);
    setIsUploadingImage(true);
    try {
      const serverUrl = await lmsService.uploadForumImage(file);
      setImageUrl(serverUrl);
    } catch (err) {
      console.warn("Server upload error:", err);
      alert("Failed to upload image to server. Please ensure the image is under 8MB.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedCourseObj = courses.find((c) => c.id === courseId);

    const newPost = {
      title: title.trim(),
      content: content.trim(),
      community: community.replace(/^r\//, ""),
      category,
      courseId,
      courseTitle: selectedCourseObj?.title || "Digital Marketing",
      imageUrl: imageUrl.trim() || null,
      authorName: currentUser?.name || "Sahil Hasolkar",
      authorRole: currentUser?.role || "Student",
      authorAvatar:
        currentUser?.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      authorHandle: (currentUser?.name || "student")
        .toLowerCase()
        .replace(/\s+/g, "_"),
      createdAt: "Just now",
      upvotes: 1,
      score: 1,
      repliesCount: 0,
      replies: [],
    };

    onSubmit && onSubmit(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#3b49df] text-white flex items-center justify-center shadow-xs">
              <MessageSquare size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create a Post / Ask a Question
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Post to the Operating Media learning community
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Community & Category Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Topic Category
              </label>
              <select
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#3b49df]"
              >
                <option value="social-media">Social Media</option>
                <option value="google-ads">Google Ads & PPC</option>
                <option value="seo-mastery">SEO Mastery</option>
                <option value="web-development">Web Development</option>
                <option value="analytics">Analytics & GA4</option>
                <option value="growth-hacks">Growth Hacks</option>
                <option value="general-doubts">General Q&A</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tag
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#3b49df]"
              >
                <option value="Question">❓ Question</option>
                <option value="Bug / Issue">⚠️ Bug / Issue</option>
                <option value="Strategy">💡 Strategy</option>
                <option value="Case Study">📊 Case Study</option>
                <option value="Discussion">💬 Discussion</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Meta Ads ROAS dropped after weekend budget scaling - screenshot attached"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
            />
          </div>

          {/* Body Text */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description / Question Details
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your question, provide context on what you tried, or paste campaign metrics..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs leading-relaxed text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-[#3b49df]"
            />
          </div>

          {/* IMAGE UPLOAD SECTION (Reddit Style) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Attach Screenshot / Image (Optional)
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {!imageUrl ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-[#3b49df] bg-blue-50/50 dark:bg-blue-950/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-400 bg-slate-50/60 dark:bg-slate-900/40"
                }`}
              >
                {isUploadingImage ? (
                  <div className="py-2">
                    <Loader2 size={24} className="animate-spin text-[#3b49df] mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Uploading screenshot to VPS server...
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Please wait a moment
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 flex items-center justify-center mx-auto mb-2 shadow-2xs">
                      <Upload size={18} />
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Click to upload screenshot or drag and drop
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      PNG, JPG, WebP, GIF supported
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-56 bg-slate-950/30 flex items-center justify-center group/preview">
                <img
                  src={imageUrl}
                  alt="Upload preview"
                  className="max-h-56 w-auto max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl("");
                    setImageFileName("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex justify-end space-x-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3b49df] hover:bg-[#2f3ab2] text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-98"
            >
              <span>Post to Community</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
