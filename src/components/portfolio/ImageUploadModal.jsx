import React, { useState } from "react";
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Check } from "lucide-react";

export const PRESET_AVATARS = [
  {
    label: "Executive Woman",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop",
  },
  {
    label: "Growth Marketer (Woman)",
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop",
  },
  {
    label: "Creative Specialist (Woman)",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop",
  },
  {
    label: "Executive Man",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop",
  },
  {
    label: "PPC Strategist (Man)",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop",
  },
  {
    label: "Digital Leader (Man)",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop",
  },
];

export const ImageUploadModal = ({
  isOpen,
  onClose,
  currentUrl,
  onSave,
  title = "Update Image",
  isAvatar = false,
}) => {
  const [urlInput, setUrlInput] = useState(currentUrl || "");
  const [previewUrl, setPreviewUrl] = useState(currentUrl || "");
  const [uploadError, setUploadError] = useState("");

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size exceeds 5MB limit. Please choose a smaller photo.");
      return;
    }

    setUploadError("");
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === "string") {
        setUrlInput(dataUrl);
        setPreviewUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    if (urlInput.trim()) {
      onSave(urlInput.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <ImageIcon size={18} className="text-blue-600" />
            <h3 className="font-extrabold text-sm text-slate-900">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto overscroll-contain text-xs">
          {/* Current Preview */}
          <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setUploadError("Unable to load image from URL")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon size={20} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-slate-800 block text-xs">Active Image Preview</span>
              <span className="text-[11px] text-slate-500 block truncate">
                {previewUrl.startsWith("data:") ? "Local File Uploaded" : previewUrl || "No image provided"}
              </span>
            </div>
          </div>

          {uploadError && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {uploadError}
            </div>
          )}

          {/* Option A: Upload Local File */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              Upload from Device (PNG / JPG / WebP)
            </label>
            <label className="flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-colors">
              <Upload size={16} className="text-blue-600" />
              <span className="font-semibold text-slate-700">Choose Image File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Option B: Enter Direct Image URL */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Or Paste Web Image URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={urlInput.startsWith("data:") ? "" : urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setPreviewUrl(e.target.value);
                  setUploadError("");
                }}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-1 focus:ring-blue-600"
              />
              <LinkIcon size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>
          </div>

          {/* Option C: Preset Avatars (if editing avatar) */}
          {isAvatar && (
            <div>
              <span className="font-bold text-slate-700 block mb-2">
                Or Select Professional Preset Avatar:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_AVATARS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setUrlInput(preset.url);
                      setPreviewUrl(preset.url);
                    }}
                    className={`p-1.5 rounded-xl border text-left flex flex-col items-center space-y-1 transition-all cursor-pointer ${
                      previewUrl === preset.url
                        ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-[10px] text-slate-700 font-semibold text-center truncate w-full">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Check size={14} />
            <span>Apply Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
