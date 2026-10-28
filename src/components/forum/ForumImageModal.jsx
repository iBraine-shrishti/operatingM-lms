import { ModalPortal } from "../common/ModalPortal";
import React, { useEffect } from "react";
import { X, Download, ExternalLink } from "lucide-react";

export const ForumImageModal = ({ imageUrl, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <ModalPortal>
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[92vh] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-white shrink-0">
          <p className="text-xs sm:text-sm font-semibold truncate max-w-md">
            {title || "Image Preview"}
          </p>
          <div className="flex items-center space-x-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Open full size in new tab"
            >
              <ExternalLink size={15} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-4 bg-slate-950/90">
          <img
            src={imageUrl}
            alt={title || "Forum image"}
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
    </ModalPortal>
  );
};
