import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileDown,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Check,
  Settings2,
  FileCheck,
  RotateCcw,
  Sparkles,
  Info,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { useToast } from "../../context/ToastContext";

export const ImageToPdfTool = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [orientation, setOrientation] = useState("portrait"); // portrait | landscape | auto
  const [pageSize, setPageSize] = useState("a4"); // a4 | letter
  const [margin, setMargin] = useState("none"); // none (0) | small (10) | normal (20)
  const [fitMode, setFitMode] = useState("contain"); // contain | fill
  const [fileName, setFileName] = useState("operating-media-images.pdf");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((f) =>
      ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(f.type)
    );

    if (validFiles.length < files.length) {
      showToast?.("Some non-image files were skipped", "info");
    }

    if (!validFiles.length) return;

    const newItems = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      rawSize: file.size,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newItems]);
    showToast?.(`Added ${newItems.length} image(s)`, "success");

    // reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Drag and drop handlers
  const [isDragging, setIsDragging] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  // Reordering
  const moveUp = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].previewUrl);
      copy.splice(index, 1);
      return copy;
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    showToast?.("All images removed", "info");
  };

  // Helper to load image object
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  // PDF Generation using jsPDF
  const handleGeneratePdf = async () => {
    if (!images.length) {
      showToast?.("Please add at least one image", "error");
      return;
    }

    try {
      setIsConverting(true);
      setProgress(10);

      // Page definitions (in mm)
      const pageDims = {
        a4: { w: 210, h: 297 },
        letter: { w: 215.9, h: 279.4 },
      };

      const selectedDim = pageDims[pageSize] || pageDims.a4;
      const marginMm = margin === "none" ? 0 : margin === "small" ? 10 : 20;

      // Initialize PDF (empty start)
      let doc = null;

      for (let i = 0; i < images.length; i++) {
        const item = images[i];
        const img = await loadImage(item.previewUrl);

        // Determine page orientation
        let pageOrient = orientation;
        if (orientation === "auto") {
          pageOrient = img.width > img.height ? "landscape" : "portrait";
        }

        const pageWidth = pageOrient === "landscape" ? selectedDim.h : selectedDim.w;
        const pageHeight = pageOrient === "landscape" ? selectedDim.w : selectedDim.h;

        if (i === 0) {
          doc = new jsPDF({
            orientation: pageOrient,
            unit: "mm",
            format: [pageWidth, pageHeight],
          });
        } else {
          doc.addPage([pageWidth, pageHeight], pageOrient);
        }

        // Available printable area
        const availW = pageWidth - marginMm * 2;
        const availH = pageHeight - marginMm * 2;

        let renderW = availW;
        let renderH = availH;
        let posX = marginMm;
        let posY = marginMm;

        if (fitMode === "contain") {
          const imgAspect = img.width / img.height;
          const availAspect = availW / availH;

          if (imgAspect > availAspect) {
            renderW = availW;
            renderH = availW / imgAspect;
            posX = marginMm;
            posY = marginMm + (availH - renderH) / 2;
          } else {
            renderH = availH;
            renderW = availH * imgAspect;
            posX = marginMm + (availW - renderW) / 2;
            posY = marginMm;
          }
        }

        // Convert image to canvas to get consistent JPEG data URL
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);

        doc.addImage(dataUrl, "JPEG", posX, posY, renderW, renderH, undefined, "FAST");

        setProgress(Math.round(((i + 1) / images.length) * 90));
      }

      const saveName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
      doc.save(saveName);

      setProgress(100);
      showToast?.(`PDF successfully generated: ${saveName}`, "success");
    } catch (err) {
      console.error("PDF generation failed:", err);
      showToast?.("Failed to generate PDF. Check images and try again.", "error");
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Upload & Dropzone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 sm:p-10 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1329] hover:border-[#003873] hover:bg-slate-50/60 dark:hover:bg-slate-900/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-[#003873] dark:text-sky-400 flex items-center justify-center shadow-2xs">
          <UploadCloud size={28} />
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-100">
          Upload or Drag & Drop Images Here
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Supports JPG, PNG, WEBP. Fast in-browser client-side conversion — your images never leave your computer.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003873] hover:bg-[#002855] text-white text-xs font-bold shadow-2xs">
          <ImageIcon size={14} />
          <span>Browse Files</span>
        </div>
      </div>

      {/* 2. Conversion Settings & Action Ribbon */}
      <div className="bg-white dark:bg-[#0b1329] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Settings2 size={15} className="text-[#003873] dark:text-sky-400" />
          <span>PDF Page Layout & Settings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Orientation */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Orientation
            </label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="portrait">Portrait (Vertical)</option>
              <option value="landscape">Landscape (Horizontal)</option>
              <option value="auto">Auto (Match Image)</option>
            </select>
          </div>

          {/* Page Size */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Page Size
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="a4">A4 (Standard 210 x 297 mm)</option>
              <option value="letter">US Letter (8.5 x 11 in)</option>
            </select>
          </div>

          {/* Margin */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Page Margins
            </label>
            <select
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="none">No Margin (Full Bleed)</option>
              <option value="small">Small Margin (10 mm)</option>
              <option value="normal">Standard Margin (20 mm)</option>
            </select>
          </div>

          {/* Image Fit Mode */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Image Sizing
            </label>
            <select
              value={fitMode}
              onChange={(e) => setFitMode(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="contain">Fit (Keep Proportion)</option>
              <option value="fill">Fill Entire Area</option>
            </select>
          </div>
        </div>

        {/* Output File Name & Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full sm:w-auto flex-1 max-w-sm">
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="document-name.pdf"
              className="w-full px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {images.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all inline-flex items-center gap-1.5"
              >
                <Trash2 size={13} />
                <span>Remove All</span>
              </button>
            )}

            <button
              type="button"
              disabled={!images.length || isConverting}
              onClick={handleGeneratePdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003873] hover:bg-[#002855] text-white text-xs font-extrabold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown size={15} />
              <span>
                {isConverting
                  ? `Converting... ${progress}%`
                  : `Convert to PDF (${images.length} ${images.length === 1 ? "page" : "pages"})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Image List & Reordering Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Pages ({images.length}) — Drag or use arrows to reorder pages
            </h4>
            <span className="text-[11px] text-slate-400">
              Page 1 will be first page of your PDF
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {images.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200/80 dark:border-slate-800 p-3 shadow-2xs flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Page Number Badge */}
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-[#003873] text-white text-[10px] font-black shadow-xs">
                  Page {idx + 1}
                </div>

                {/* Thumbnail */}
                <div className="w-full h-36 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center mb-2.5">
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="mb-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{item.size}</p>
                </div>

                {/* Actions: Move Up, Move Down, Delete */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveUp(idx)}
                      title="Move up (earlier page)"
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => moveDown(idx)}
                      title="Move down (later page)"
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    title="Remove page"
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ImageToPdfTool;
