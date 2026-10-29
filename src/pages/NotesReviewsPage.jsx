import { ModalPortal } from "../components/common/ModalPortal";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { lmsService } from "../services/lmsService";
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Copy,
  BookOpen,
  Calendar,
  Check,
  X,
  Bookmark,
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Target,
  Share2,
  BarChart3,
  Layout,
  Palette,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Table,
  Image,
  Link,
  Minus,
  Eraser,
  Edit,
  Undo,
  Redo,
  Eye,
  Maximize2,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { crmService } from "../services/crmService";
import dashboardHeaderBg from "../assets/header-bg/dashboard-header.png";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";

// Differentiated visual themes for note categories
const NOTE_CATEGORY_THEMES = {
  seo: {
    name: "SEO",
    tag: "SEO Mastery",
    icon: Search,
    accent: "text-emerald-600 dark:text-emerald-400",
    borderAccent: "border-emerald-200 dark:border-emerald-800/60",
    cardBorder:
      "border-emerald-200/90 hover:border-emerald-400 dark:border-slate-800/80 dark:hover:border-emerald-500/60",
    badgeBg:
      "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60",
    iconBg:
      "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200/90 dark:border-emerald-800/60",
    topGradient: "from-emerald-500 via-teal-500 to-green-600",
    contentBg:
      "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-100/90 dark:border-emerald-800/40",
    pillDot: "bg-emerald-500",
  },
  ads: {
    name: "Google Ads",
    tag: "Paid Advertising",
    icon: Target,
    accent: "text-blue-600 dark:text-blue-400",
    borderAccent: "border-blue-200 dark:border-blue-800/60",
    cardBorder:
      "border-blue-200/90 hover:border-blue-400 dark:border-slate-800/80 dark:hover:border-blue-500/60",
    badgeBg:
      "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200/90 dark:border-blue-800/60",
    iconBg:
      "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200/90 dark:border-blue-800/60",
    topGradient: "from-blue-600 via-indigo-600 to-cyan-500",
    contentBg:
      "bg-blue-50/30 dark:bg-blue-950/20 border-blue-100/90 dark:border-blue-800/40",
    pillDot: "bg-blue-500",
  },
  social: {
    name: "Social Media",
    tag: "Social Strategy",
    icon: Share2,
    accent: "text-purple-600 dark:text-purple-400",
    borderAccent: "border-purple-200 dark:border-purple-800/60",
    cardBorder:
      "border-purple-200/90 hover:border-purple-400 dark:border-slate-800/80 dark:hover:border-purple-500/60",
    badgeBg:
      "bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200/90 dark:border-purple-800/60",
    iconBg:
      "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200/90 dark:border-purple-800/60",
    topGradient: "from-purple-600 via-fuchsia-600 to-pink-500",
    contentBg:
      "bg-purple-50/30 dark:bg-purple-950/20 border-purple-100/90 dark:border-purple-800/40",
    pillDot: "bg-purple-500",
  },
  analytics: {
    name: "Analytics",
    tag: "Data & Tracking",
    icon: BarChart3,
    accent: "text-amber-600 dark:text-amber-400",
    borderAccent: "border-amber-200 dark:border-amber-800/60",
    cardBorder:
      "border-amber-200/90 hover:border-amber-400 dark:border-slate-800/80 dark:hover:border-amber-500/60",
    badgeBg:
      "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/90 dark:border-amber-800/60",
    iconBg:
      "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200/90 dark:border-amber-800/60",
    topGradient: "from-amber-500 via-orange-500 to-yellow-500",
    contentBg:
      "bg-amber-50/30 dark:bg-amber-950/20 border-amber-100/90 dark:border-amber-800/40",
    pillDot: "bg-amber-500",
  },
  wordpress: {
    name: "WordPress",
    tag: "CMS & Web Dev",
    icon: Layout,
    accent: "text-teal-600 dark:text-teal-400",
    borderAccent: "border-teal-200 dark:border-teal-800/60",
    cardBorder:
      "border-teal-200/90 hover:border-teal-400 dark:border-slate-800/80 dark:hover:border-teal-500/60",
    badgeBg:
      "bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200/90 dark:border-teal-800/60",
    iconBg:
      "bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border-teal-200/90 dark:border-teal-800/60",
    topGradient: "from-teal-500 via-emerald-600 to-cyan-600",
    contentBg:
      "bg-teal-50/30 dark:bg-teal-950/20 border-teal-100/90 dark:border-teal-800/40",
    pillDot: "bg-teal-500",
  },
  design: {
    name: "Design",
    tag: "Creative & UI",
    icon: Palette,
    accent: "text-rose-600 dark:text-rose-400",
    borderAccent: "border-rose-200 dark:border-rose-800/60",
    cardBorder:
      "border-rose-200/90 hover:border-rose-400 dark:border-slate-800/80 dark:hover:border-rose-500/60",
    badgeBg:
      "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200/90 dark:border-rose-800/60",
    iconBg:
      "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200/90 dark:border-rose-800/60",
    topGradient: "from-rose-500 via-pink-500 to-red-500",
    contentBg:
      "bg-rose-50/30 dark:bg-rose-950/20 border-rose-100/90 dark:border-rose-800/40",
    pillDot: "bg-rose-500",
  },
  general: {
    name: "General",
    tag: "Study Notes",
    icon: BookOpen,
    accent: "text-indigo-600 dark:text-indigo-400",
    borderAccent: "border-indigo-200 dark:border-indigo-800/60",
    cardBorder:
      "border-indigo-200/90 hover:border-indigo-400 dark:border-slate-800/80 dark:hover:border-indigo-500/60",
    badgeBg:
      "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200/90 dark:border-indigo-800/60",
    iconBg:
      "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200/90 dark:border-indigo-800/60",
    topGradient: "from-indigo-600 via-blue-600 to-violet-600",
    contentBg:
      "bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-100/90 dark:border-indigo-800/40",
    pillDot: "bg-indigo-500",
  },
};

const getNoteCategoryTheme = (category = "", courseTitle = "") => {
  const c = (category || "").toLowerCase();
  const t = (courseTitle || "").toLowerCase();
  if (c.includes("seo") || t.includes("seo")) return NOTE_CATEGORY_THEMES.seo;
  if (c.includes("ads") || c.includes("ppc") || t.includes("ads"))
    return NOTE_CATEGORY_THEMES.ads;
  if (c.includes("social") || t.includes("social"))
    return NOTE_CATEGORY_THEMES.social;
  if (c.includes("analytic") || t.includes("analytic"))
    return NOTE_CATEGORY_THEMES.analytics;
  if (
    c.includes("word") ||
    c.includes("web") ||
    t.includes("word") ||
    t.includes("web")
  )
    return NOTE_CATEGORY_THEMES.wordpress;
  if (
    c.includes("design") ||
    c.includes("creative") ||
    t.includes("design") ||
    t.includes("creative")
  )
    return NOTE_CATEGORY_THEMES.design;
  return NOTE_CATEGORY_THEMES.general;
};

// Text helpers for HTML notes
const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const getWordCount = (html) => {
  const text = stripHtml(html).trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
};

const getCharCount = (html) => {
  const text = stripHtml(html);
  return text.length;
};

const ENHANCED_NOTE_CONTENT = {};

export const NotesReviewsPage = () => {
  const { showToast } = useToast();
  const { currentUser, crmProfile } = useAuth();
  const studentId = lmsService.getActiveStudentId(
    crmProfile?.id ||
    currentUser?.crmAdmissionId ||
    currentUser?.admissionId ||
    currentUser?.id ||
    crmService.getSelectedStudentId()
  );

  const [notes, setNotes] = useState(() => lmsService.getNotes(studentId));
  const courses = lmsService.getCourses();
  const [manageCourses, setManageCourses] = useState(() => lmsService.getManageCourses());

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'title'
  const [copiedId, setCopiedId] = useState(null);

  // Modal & Editor state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  const [newCourseId, setNewCourseId] = useState(manageCourses[0]?.id || courses[0]?.id || "");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const editorRef = useRef(null);
  const imageInputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const toolbarRef = useRef(null);
  const courseSectionRef = useRef(null);

  // Auto upward inscroll when editor is focused on mobile
  const handleEditorFocus = () => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (isMobile && scrollContainerRef.current && toolbarRef.current) {
      setTimeout(() => {
        if (!scrollContainerRef.current || !toolbarRef.current) return;
        const targetTop = toolbarRef.current.offsetTop;
        scrollContainerRef.current.scrollTo({
          top: Math.max(0, targetTop - 4),
          behavior: "smooth",
        });
      }, 150);
    }
  };

  const scrollToCourseDetails = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Synchronize live manage courses from CRM Database
  useEffect(() => {
    lmsService.fetchManageCourses().then((live) => {
      if (live && live.length > 0) {
        setManageCourses(live);
      }
    });
  }, []);

  // Keep editor visible on mobile virtual keyboard resize
  useEffect(() => {
    if (!isModalOpen || typeof window === "undefined" || !window.visualViewport) return;

    const handleViewportResize = () => {
      if (
        document.activeElement === editorRef.current &&
        scrollContainerRef.current &&
        toolbarRef.current
      ) {
        const targetTop = toolbarRef.current.offsetTop;
        scrollContainerRef.current.scrollTo({
          top: Math.max(0, targetTop - 4),
          behavior: "smooth",
        });
      }
    };

    window.visualViewport.addEventListener("resize", handleViewportResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
    };
  }, [isModalOpen]);

  // Fetch live student notes from database table on mount and when student changes
  useEffect(() => {
    lmsService.fetchStudentNotes(studentId).then((live) => {
      if (live) setNotes(live);
    });
  }, [studentId]);

  // Synchronize notes across app events
  useEffect(() => {
    const handleSync = () => setNotes(lmsService.getNotes(studentId));
    window.addEventListener("lms_notes_changed", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("lms_notes_changed", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [studentId]);

  // Populate editor content when modal opens
  useEffect(() => {
    if (isModalOpen && editorRef.current) {
      editorRef.current.innerHTML = newContent || "";
      // Place cursor at end
      try {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {}
    }
  }, [isModalOpen]);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set(["All Notes"]);
    notes.forEach((n) => {
      if (n.category) set.add(n.category);
    });
    [
      "Social Media",
      "SEO",
      "Analytics",
      "Google Ads",
      "WordPress",
      "Design",
    ].forEach((c) => set.add(c));
    return Array.from(set);
  }, [notes]);

  // Filtered & Sorted Notes
  const filteredNotes = useMemo(() => {
    let result = notes.filter((n) => {
      // Search text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const rawContent = n.content || n.text || "";
        const cleanBody = (stripHtml(rawContent) || rawContent).toLowerCase();
        const matchesContent = cleanBody.includes(q);
        const matchesLesson = (n.lessonTitle || n.lessonTag || "")
          .toLowerCase()
          .includes(q);
        const matchesCourse = (n.courseTitle || "").toLowerCase().includes(q);
        const matchesCat = (n.category || "").toLowerCase().includes(q);
        if (
          !matchesContent &&
          !matchesLesson &&
          !matchesCourse &&
          !matchesCat
        ) {
          return false;
        }
      }

      // Course filter
      if (selectedCourse !== "all") {
        const courseObj =
          manageCourses.find(
            (c) =>
              c.id === selectedCourse ||
              String(c.id).replace(/^course-/, "") ===
                String(selectedCourse).replace(/^course-/, "")
          ) ||
          courses.find(
            (c) =>
              c.id === selectedCourse ||
              String(c.id).replace(/^course-/, "") ===
                String(selectedCourse).replace(/^course-/, "")
          );
        if (!lmsService.isNoteMatchingCourse(n, courseObj || selectedCourse)) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && selectedCategory !== "All Notes") {
        const nCat = (n.category || "").toLowerCase();
        const sCat = selectedCategory.toLowerCase();
        if (nCat !== sCat && !nCat.includes(sCat) && !sCat.includes(nCat)) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "title") {
        return (a.lessonTitle || "").localeCompare(b.lessonTitle || "");
      }
      if (sortBy === "oldest") {
        return (a.id || "").localeCompare(b.id || "");
      }
      // default: newest
      return (b.id || "").localeCompare(a.id || "");
    });

    return result;
  }, [notes, searchQuery, selectedCourse, selectedCategory, sortBy, courses, manageCourses]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCourse !== "all" ||
    selectedCategory !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("all");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  const handleCopyNote = (note) => {
    const rawContent = note.content || note.text || "";
    const textToCopy = stripHtml(rawContent) || rawContent;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(note.id);
    showToast("Note content copied to clipboard!", "success", "Copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteNote = (id, lessonTitle) => {
    lmsService.deleteNote(id, studentId);
    setNotes(lmsService.getNotes(studentId));
    showToast(
      `Note for "${lessonTitle || "lesson"}" removed.`,
      "info",
      "Note Deleted"
    );
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingNoteId(null);
    setNewCourseId(manageCourses[0]?.id || courses[0]?.id || "");
    setNewLessonTitle("");
    setNewContent("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (note) => {
    setEditingNoteId(note.id);
    setNewCourseId(note.courseId || "");
    setNewLessonTitle(note.lessonTitle || "");
    setNewContent(note.content || note.text || "");
    setIsModalOpen(true);
  };

  // Rich Text Editor Helpers
  const exec = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setNewContent(editorRef.current.innerHTML);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setNewContent(editorRef.current.innerHTML);
    }
  };

  // Image insertion via file selection
  const handleImageFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be smaller than 5MB", "warning", "Image Too Large");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (editorRef.current) {
        editorRef.current.focus();
      }
      document.execCommand(
        "insertHTML",
        false,
        `<img src="${dataUrl}" alt="Study Diagram" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; border: 1px solid #cbd5e1; display: block;" /><p><br></p>`
      );
      if (editorRef.current) {
        setNewContent(editorRef.current.innerHTML);
      }
      showToast("Image inserted into note!", "success", "Image Added");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Image insertion via URL prompt
  const handleInsertImageUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url && url.trim()) {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      document.execCommand(
        "insertHTML",
        false,
        `<img src="${url.trim()}" alt="Note diagram" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; border: 1px solid #cbd5e1; display: block;" /><p><br></p>`
      );
      if (editorRef.current) {
        setNewContent(editorRef.current.innerHTML);
      }
    }
  };

  // Direct paste support for screenshots / images from clipboard
  const handleEditorPaste = (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault();
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const dataUrl = event.target.result;
              document.execCommand(
                "insertHTML",
                false,
                `<img src="${dataUrl}" alt="Pasted Diagram" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; border: 1px solid #cbd5e1; display: block;" /><p><br></p>`
              );
              if (editorRef.current) {
                setNewContent(editorRef.current.innerHTML);
              }
              showToast("Pasted image added to note!", "success", "Image Pasted");
            };
            reader.readAsDataURL(file);
          }
          return;
        }
      }
    }
  };

  // Table insertion helper
  const handleInsertTable = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 12px 0; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background-color: rgba(241, 245, 249, 0.85);">
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; text-align: left;">Topic / Metric</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; text-align: left;">Description</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; text-align: left;">Key Formula / Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Concept A</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Details & explanation</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Formula / Takeaway</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Concept B</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Details & explanation</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">Formula / Takeaway</td>
          </tr>
        </tbody>
      </table>
      <p><br></p>
    `;
    document.execCommand("insertHTML", false, tableHtml);
    if (editorRef.current) {
      setNewContent(editorRef.current.innerHTML);
    }
  };

  // Save / Update Note
  const handleSaveNote = (e) => {
    if (e) e.preventDefault();

    let contentToSave = newContent;
    if (editorRef.current) {
      contentToSave = editorRef.current.innerHTML;
    }

    const courseObj =
      manageCourses.find(
        (c) => c.id === newCourseId || String(c.id) === String(newCourseId)
      ) ||
      courses.find(
        (c) => c.id === newCourseId || String(c.id) === String(newCourseId)
      );
    const courseTitle = courseObj
      ? courseObj.title || courseObj.name
      : newCourseId
      ? "General Course"
      : "General";

    // Non-mandatory fallback: default title if blank
    const nowStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const lessonTitle = newLessonTitle.trim() || `Study Note - ${nowStr}`;
    const category = courseObj?.category || "General";

    if (editingNoteId) {
      // Update existing note
      lmsService.updateNote(
        editingNoteId,
        {
          courseId: newCourseId,
          courseTitle,
          lessonTitle,
          lessonTag: lessonTitle,
          category,
          content: contentToSave,
          text: stripHtml(contentToSave),
        },
        studentId
      );

      setNotes(lmsService.getNotes(studentId));
      setIsModalOpen(false);
      setEditingNoteId(null);
      setNewLessonTitle("");
      setNewContent("");
      showToast("Study note updated successfully!", "success", "Note Updated");
    } else {
      // Create new note
      lmsService.addNote({
        studentId,
        studentName: currentUser?.name || currentUser?.fullName || "",
        courseId: newCourseId,
        courseTitle,
        lessonTitle,
        lessonTag: lessonTitle,
        category,
        content: contentToSave,
        text: stripHtml(contentToSave),
      });

      setNotes(lmsService.getNotes(studentId));
      setIsModalOpen(false);
      setEditingNoteId(null);
      setNewLessonTitle("");
      setNewContent("");
      showToast("New study note saved successfully!", "success", "Note Created");
    }
  };

  const wordCount = useMemo(() => getWordCount(newContent), [newContent]);
  const charCount = useMemo(() => getCharCount(newContent), [newContent]);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER           */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.notes}
        metrics={[
          {
            value: notes.length,
            label: "Total Notes",
            dotColor: "bg-blue-600",
          },
          ...(hasActiveFilters
            ? [
                {
                  value: filteredNotes.length,
                  label: "Matching Filter",
                  dotColor: "bg-emerald-500",
                },
              ]
            : []),
          { value: "6 Domains", label: "Covered", dotColor: "bg-purple-500" },
          { value: "Auto-Saved", label: "Cloud Sync", dotColor: "bg-cyan-500" },
        ]}
        action={
          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>Add New Note</span>
          </button>
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR - RESPONSIVE STACKED & GRID DESIGN        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Row: Search + Course Filter + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Live Search Input */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by keyword, lesson topic, concept..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter by Course Select */}
          <div className="md:col-span-3 lg:col-span-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Enrolled Courses ({notes.length})</option>
              {manageCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title || c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer"
              >
                <option value="newest">Sort: Newest Added</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="title">Sort: Topic Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Pills Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mr-1">
            <Tag size={13} />
            <span>Category:</span>
          </span>
          {categories.map((cat) => {
            const isAll = cat === "All Notes";
            const isSelected = isAll
              ? selectedCategory === "all" || selectedCategory === "All Notes"
              : selectedCategory.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isAll ? "all" : cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#3b49df] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="ml-auto text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NOTES GRID - WITH RICH PREVIEWS & EDIT SUPPORT                */}
      {/* ------------------------------------------------------------- */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
            <FileText size={26} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            No notes matched your search criteria
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {hasActiveFilters
              ? "Try broadening your keywords or clearing the category and course filters to view more notes."
              : "You haven't created any study notes yet. Click the button below to add your first rich note!"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            )}
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#3b49df] text-white hover:bg-[#2f3cb3] transition-colors cursor-pointer"
            >
              + Add New Note
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredNotes.map((note) => {
            const theme = getNoteCategoryTheme(note.category, note.courseTitle);
            const CategoryIcon = theme.icon;
            const contentText = note.content || note.text || "";

            return (
              <div
                key={note.id}
                className={`bg-white dark:bg-[#0b1329] rounded-2xl border shadow-xs hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all duration-200 flex flex-col justify-between overflow-hidden group ${theme.cardBorder}`}
              >
                {/* Top Vibrant Accent Bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${theme.topGradient}`}
                />

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Header Row: Category Badge + Date */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg border ${theme.badgeBg}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${theme.pillDot}`}
                        />
                        <span>{note.category || theme.name}</span>
                      </span>

                      <span className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        <Calendar size={12} />
                        <span>{note.createdAt || note.date || "Today"}</span>
                      </span>
                    </div>

                    {/* Course Title Badge */}
                    <div className="pt-0.5">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-2.5 py-0.5 rounded-md inline-block">
                        {note.courseTitle || "General Course"}
                      </span>
                    </div>

                    {/* Middle Row: Themed Icon Badge + Lesson Title */}
                    <div className="flex items-start gap-3 pt-1">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs mt-0.5 ${theme.iconBg}`}
                      >
                        <CategoryIcon size={20} className={theme.accent} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-[#3b49df] dark:group-hover:text-blue-400 transition-colors break-words">
                          {note.lessonTitle || "Untitled Note"}
                        </h3>
                      </div>
                    </div>

                    {/* Note Body Box: Rich Formatted Preview */}
                    <div
                      onClick={() => setViewingNote(note)}
                      className={`text-sm sm:text-[13.5px] text-slate-700 dark:text-slate-300 ${theme.contentBg} border p-4 rounded-xl leading-relaxed break-words font-medium overflow-hidden max-h-52 relative group/content cursor-pointer transition-colors hover:border-blue-300 dark:hover:border-blue-700/60`}
                      title="Click to view full note"
                    >
                      <div
                        className="prose-note"
                        dangerouslySetInnerHTML={{
                          __html:
                            contentText ||
                            "<p class='italic text-slate-400'>Empty note</p>",
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/90 dark:from-[#0b1329]/90 to-transparent pointer-events-none" />
                    </div>

                    <div className="flex justify-end pt-0.5">
                      <button
                        type="button"
                        onClick={() => setViewingNote(note)}
                        className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye size={12} />
                        <span>View Full Note</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Footer: Copy, Edit, Delete */}
                <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() =>
                        handleCopyNote({ ...note, content: contentText })
                      }
                      className="flex items-center space-x-1 text-slate-700 dark:text-slate-200 hover:text-[#3b49df] dark:hover:text-blue-400 font-bold py-1 px-2.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer active:scale-95 shadow-2xs"
                      title="Copy note text"
                    >
                      {copiedId === note.id ? (
                        <>
                          <Check
                            size={13}
                            className="text-emerald-600 dark:text-emerald-400"
                          />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(note)}
                      className="flex items-center space-x-1 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold py-1 px-2.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer active:scale-95 shadow-2xs"
                      title="Edit note"
                    >
                      <Edit size={13} />
                      <span className="text-[11px]">Edit</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleDeleteNote(note.id, note.lessonTitle)
                      }
                      className="flex items-center space-x-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 font-semibold py-1 px-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer active:scale-95"
                      title="Delete note"
                    >
                      <Trash2 size={13} />
                      <span className="text-[11px]">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* FULL-SIZE STUDY NOTE MODAL (ADD & EDIT)                       */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <ModalPortal>
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-t-2xl sm:rounded-2xl w-full max-w-6xl h-[100dvh] sm:h-[92vh] max-h-[100dvh] sm:max-h-[96vh] flex flex-col shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header: Title + Close (Compact on Mobile) */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-[#0b1329]">
              <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#3b49df] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                  {editingNoteId ? <Edit size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Bookmark size={16} className="sm:w-[18px] sm:h-[18px]" />}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base md:text-lg truncate">
                    {editingNoteId ? "Edit Study Note" : "Create Study Note"}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hidden xs:block truncate">
                    Capture important lecture points, format with bold/italic, insert tables, and add diagrams.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingNoteId(null);
                }}
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                title="Close modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Form with unified scrollable container */}
            <form
              onSubmit={handleSaveNote}
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
              {/* SCROLLABLE BODY: Contains Course, Title, Sticky Toolbar, and Editor */}
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/40 dark:bg-slate-900/30 custom-scrollbar flex flex-col"
              >
                {/* 1. Metadata Inputs Section: Related Course + Lesson Title */}
                <div
                  ref={courseSectionRef}
                  className="px-4 sm:px-6 pt-3.5 pb-3 grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 shrink-0 bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80 transition-all"
                >
                  <div className="sm:col-span-5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Related Course
                    </label>
                    <select
                      value={newCourseId}
                      onChange={(e) => setNewCourseId(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 cursor-pointer shadow-2xs"
                    >
                      <option value="">General (No specific course)</option>
                      {manageCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title || c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-7">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Note Title / Topic
                    </label>
                    <input
                      type="text"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      onFocus={() => {
                        // Keep top visible when editing title
                        scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      placeholder="e.g. 02 Keyword Intent Mapping & Competitor Audit"
                      className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 shadow-2xs"
                    />
                  </div>
                </div>

                {/* 2. Sticky Formatting Toolbar (Decorators):
                       - On mobile, horizontal scrollable without wrapping into multiple rows!
                       - Stays docked at top when scrolled so tools are always within reach */}
                <div
                  ref={toolbarRef}
                  className="sticky top-0 z-20 px-3 sm:px-6 py-1.5 sm:py-2 bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none text-slate-700 dark:text-slate-300 select-none shadow-2xs shrink-0"
                >
                  {/* Text Formatting Group */}
                  <div className="flex items-center space-x-0.5 pr-2 border-r border-slate-200 dark:border-slate-700 shrink-0">
                    <button
                      type="button"
                      onClick={() => exec("bold")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("italic")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("underline")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Underline (Ctrl+U)"
                    >
                      <Underline size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("strikeThrough")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Strikethrough"
                    >
                      <Strikethrough size={15} />
                    </button>
                  </div>

                  {/* Headings Buttons */}
                  <div className="flex items-center space-x-0.5 px-2 border-r border-slate-200 dark:border-slate-700 shrink-0">
                    <button
                      type="button"
                      onClick={() => exec("formatBlock", "<h1>")}
                      className="px-2 py-1 rounded-lg text-xs font-black hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-colors"
                      title="Heading 1"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("formatBlock", "<h2>")}
                      className="px-2 py-1 rounded-lg text-xs font-black hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-colors"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("formatBlock", "<h3>")}
                      className="px-2 py-1 rounded-lg text-xs font-black hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-colors"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("formatBlock", "<p>")}
                      className="px-2 py-1 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Normal Paragraph"
                    >
                      Normal
                    </button>
                  </div>

                  {/* Lists & Callouts */}
                  <div className="flex items-center space-x-0.5 px-2 border-r border-slate-200 dark:border-slate-700 shrink-0">
                    <button
                      type="button"
                      onClick={() => exec("insertUnorderedList")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Bullet List"
                    >
                      <List size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("insertOrderedList")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Numbered List"
                    >
                      <ListOrdered size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("formatBlock", "<blockquote>")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Quote / Concept Callout"
                    >
                      <Quote size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("formatBlock", "<pre>")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Code Snippet"
                    >
                      <Code size={15} />
                    </button>
                  </div>

                  {/* Table & Images Insertion */}
                  <div className="flex items-center space-x-1 px-2 border-r border-slate-200 dark:border-slate-700 shrink-0">
                    <button
                      type="button"
                      onClick={handleInsertTable}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs"
                      title="Insert 3-Column Table"
                    >
                      <Table size={14} />
                      <span>Table</span>
                    </button>

                    {/* Hidden image file input */}
                    <input
                      type="file"
                      ref={imageInputRef}
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs"
                      title="Upload Image from computer"
                    >
                      <Image size={14} />
                      <span>Image</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleInsertImageUrl}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Insert Image by Web URL"
                    >
                      <Link size={14} />
                    </button>
                  </div>

                  {/* Actions: Divider, Undo, Redo, Clear */}
                  <div className="flex items-center space-x-0.5 pl-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => exec("insertHorizontalRule")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Horizontal Divider"
                    >
                      <Minus size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("undo")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Undo (Ctrl+Z)"
                    >
                      <Undo size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("redo")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Redo (Ctrl+Y)"
                    >
                      <Redo size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => exec("removeFormat")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                      title="Clear Formatting"
                    >
                      <Eraser size={14} />
                    </button>
                  </div>
                </div>

                {/* 3. Document Canvas Area */}
                <div className="flex-1 p-3.5 sm:p-6 flex flex-col min-h-0">
                  {/* Mobile Quick Navigation Pill */}
                  <div className="flex sm:hidden items-center justify-between pb-1.5 px-0.5 text-[11px] text-slate-400 font-medium">
                    <span>Note Workspace</span>
                    <button
                      type="button"
                      onClick={scrollToCourseDetails}
                      className="text-[10.5px] text-[#2563eb] dark:text-cyan-400 hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
                    >
                      <span>↑ Edit Course & Title</span>
                    </button>
                  </div>

                  <div
                    ref={editorRef}
                    contentEditable="true"
                    onFocus={handleEditorFocus}
                    onClick={handleEditorFocus}
                    onInput={handleEditorInput}
                    onPaste={handleEditorPaste}
                    data-placeholder="Start typing your study notes here... Use the toolbar above to make text bold, italic, insert tables, upload diagrams, and paste screenshots with Ctrl+V."
                    className="flex-1 min-h-[260px] sm:min-h-[380px] p-4 sm:p-8 bg-white dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-[#3b49df]/20 dark:focus:ring-blue-500/20 focus:border-[#3b49df] dark:focus:border-blue-500 leading-relaxed text-sm sm:text-base prose-note selection:bg-blue-500/20"
                  />
                </div>
              </div>

              {/* 4. Footer Bar: Stats + Cancel + Save (Sticky at bottom) */}
              <div className="px-4 sm:px-6 py-2.5 sm:py-3.5 bg-white dark:bg-[#0b1329] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-sm">
                <div className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 flex items-center space-x-1.5 sm:space-x-2">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{charCount} chars</span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingNoteId(null);
                    }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center space-x-1.5 active:scale-98"
                  >
                    {editingNoteId ? <Check size={15} /> : <Plus size={15} />}
                    <span>{editingNoteId ? "Save Changes" : "Save Note"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </ModalPortal>
      )}

      {/* FULL NOTE VIEWER MODAL                                        */}
      {/* ------------------------------------------------------------- */}
      {viewingNote && (
        <ModalPortal>
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {viewingNote.courseTitle || "General Course"}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {viewingNote.createdAt || viewingNote.date || "Today"}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {viewingNote.lessonTitle || "Untitled Note"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setViewingNote(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Note Full Content Body */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto prose-note text-slate-800 dark:text-slate-100 leading-relaxed text-sm sm:text-base">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    viewingNote.content ||
                    viewingNote.text ||
                    "<p class='italic text-slate-400'>No content recorded.</p>",
                }}
              />
            </div>

            {/* Viewer Footer */}
            <div className="px-6 py-3.5 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => handleCopyNote(viewingNote)}
                className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
              >
                <Copy size={14} />
                <span>Copy Note</span>
              </button>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    const note = viewingNote;
                    setViewingNote(null);
                    handleOpenEditModal(note);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Edit size={14} />
                  <span>Edit Note</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingNote(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        </ModalPortal>
      )}
    </div>
  );
};

export default NotesReviewsPage;
