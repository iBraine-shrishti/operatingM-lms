import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import {
  Play,
  Pause,
  CheckCircle2,
  Lock,
  ArrowLeft,
  FileText,
  Download,
  Send,
  RotateCcw,
  SkipBack,
  SkipForward,
  Maximize2,
  Minimize2,
  Bookmark,
  Volume2,
  Sparkles,
  MessagesSquare,
  Clock,
  BookOpen,
  Award,
  Search,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Layers,
  ThumbsUp,
  MessageCircle,
  Check,
  Video,
  Folder,
  FolderOpen,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { useAuth } from "../context/AuthContext";
import { PremiumVideoPlayer } from "../components/player/PremiumVideoPlayer";

export const LessonPlayerPage = () => {
  const { currentUser, crmProfile } = useAuth();
  const studentId = crmProfile?.id || currentUser?.crmAdmissionId || 375;
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const courses = useMemo(() => lmsService.getCourses(), []);
  const courseIdParam = searchParams.get("courseId");
  const unitIdParam = searchParams.get("unitId");

  // Determine current course
  const currentCourse = useMemo(() => {
    if (courseIdParam) {
      return courses.find((c) => c.id === courseIdParam) || courses[0];
    }
    return courses.find((c) => c.id === "course-8") || courses[0];
  }, [courses, courseIdParam]);

  // Load units for current course
  const [units, setUnits] = useState(() =>
    lmsService.getUnitsByCourse(currentCourse?.id || "course-8"),
  );

  useEffect(() => {
    const updatedUnits = lmsService.getUnitsByCourse(currentCourse.id);
    setUnits(updatedUnits);
  }, [currentCourse.id]);

  // Determine active lesson index
  const [activeLessonIdx, setActiveLessonIdx] = useState(() => {
    const initialUnits = lmsService.getUnitsByCourse(
      currentCourse?.id || "course-8",
    );
    if (unitIdParam && initialUnits.length > 0) {
      const foundIdx = initialUnits.findIndex((u) => u.id === unitIdParam);
      return foundIdx !== -1 ? foundIdx : 0;
    }
    return 0;
  });

  // Sync activeLessonIdx whenever unitIdParam or units changes
  useEffect(() => {
    if (!units || units.length === 0) return;
    if (unitIdParam) {
      const foundIdx = units.findIndex((u) => u.id === unitIdParam);
      if (foundIdx !== -1) {
        if (foundIdx !== activeLessonIdx) {
          setActiveLessonIdx(foundIdx);
        }
        return;
      }
    }
    if (activeLessonIdx >= units.length) {
      setActiveLessonIdx(0);
    }
  }, [unitIdParam, units]);

  // Derived current lesson
  const currentLesson = units[activeLessonIdx] ||
    units[0] || {
      id: "default-unit",
      title: "Lesson Lecture",
      duration: "20:00",
      videoUrl: "",
      moduleName: "Core Curriculum",
      description: "Lecture material.",
    };

  // Keep URL in sync when active lesson changes (only if different from URL query)
  useEffect(() => {
    if (currentLesson && currentLesson.id) {
      setSearchParams(
        { courseId: currentCourse.id, unitId: currentLesson.id },
        { replace: true },
      );
    }
  }, [currentLesson?.id, currentCourse.id]);

  // Dynamic stream state from CRM backend / database
  const [streamData, setStreamData] = useState({
    url: "",
    mime: "video/mp4",
    isLoading: true,
    isLocked: false,
    lockMessage: "",
  });
  const [isBuffering, setIsBuffering] = useState(false);

  // Fetch secure streaming URL from CRM backend / database on active lesson change
  useEffect(() => {
    let isCancelled = false;
    if (!currentLesson || !currentLesson.id) return;

    setStreamData((prev) => ({
      ...prev,
      isLoading: true,
      isLocked: false,
      lockMessage: "",
    }));
    setIsBuffering(true);

    lmsService
      .fetchUnitStreamUrl(currentLesson.id, studentId)
      .then((res) => {
        if (isCancelled) return;
        if (res && res.locked) {
          setStreamData({
            url: "",
            mime: "video/mp4",
            isLoading: false,
            isLocked: true,
            lockMessage:
              res.message ||
              "Access restricted. Video access is managed in Operating Media CRM.",
          });
        } else if (res && res.videoUrl) {
          setStreamData({
            url: res.videoUrl,
            mime:
              res.videoMime ||
              (res.videoUrl.endsWith(".mov") ? "video/quicktime" : "video/mp4"),
            isLoading: false,
            isLocked: false,
            lockMessage: "",
          });
        } else {
          setStreamData({
            url: "",
            mime: "video/mp4",
            isLoading: false,
            isLocked: true,
            lockMessage: "Access restricted. You do not have verified access to this course in Operating Media CRM.",
          });
        }
      })
      .catch((err) => {
        if (isCancelled) return;
        console.warn("Stream resolution error:", err);
        setStreamData({
          url: "",
          mime: "video/mp4",
          isLoading: false,
          isLocked: true,
          lockMessage: "Access restricted. Unable to verify CRM course enrollment.",
        });
      })
      .finally(() => {
        if (!isCancelled) {
          setIsBuffering(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [currentLesson?.id, studentId]);

  // Player feature states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [theaterMode, setTheaterMode] = useState(false);
  const [resumePrompt, setResumePrompt] = useState(null); // { time: seconds, formatted: "04:32" }
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState(null);

  // Reload video player whenever current lesson or videoUrl changes
  useEffect(() => {
    setVideoError(null);
    setCurrentTime(0);
    if (videoRef.current && currentLesson?.videoUrl) {
      videoRef.current.load();
    }
  }, [currentLesson?.videoUrl, currentLesson?.id]);

  // Tab & Notes states
  const [activeTab, setActiveTab] = useState("overview"); // overview | notes | resources | discussion
  const [noteContent, setNoteContent] = useState("");
  const [userNotes, setUserNotes] = useState(() => lmsService.getNotes());
  const [playlistSearch, setPlaylistSearch] = useState("");

  // Course selector dropdown state
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const courseDropdownRef = useRef(null);

  // Close course dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(e.target)
      ) {
        setIsCourseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle switching actual course
  const handleSelectCourse = (newCourse) => {
    setIsCourseDropdownOpen(false);
    navigate(`/lesson-player?courseId=${newCourse.id}`);
    const newUnits = lmsService.getUnitsByCourse(newCourse.id);
    setUnits(newUnits);
    setActiveLessonIdx(0);
    showToast(`Switched to "${newCourse.title}"`, "info");
  };

  // Storage key for video progress
  const progressStorageKey = `om_video_progress_${currentCourse.id}_${currentLesson?.id}`;

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // -------------------------------------------------------------
  // RESUME PLAYBACK FEATURE: Load saved timestamp when video mounts
  // -------------------------------------------------------------
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const vidDuration = videoRef.current.duration;
    setDuration(vidDuration);

    try {
      const savedProgress = localStorage.getItem(progressStorageKey);
      if (savedProgress) {
        const savedSecs = parseFloat(savedProgress);
        // Only resume if watched between 5s and near end
        if (savedSecs > 5 && savedSecs < vidDuration - 10) {
          videoRef.current.currentTime = savedSecs;
          setResumePrompt({
            time: savedSecs,
            formatted: formatTime(savedSecs),
          });
          // Auto hide resume banner after 8s
          setTimeout(() => setResumePrompt(null), 8000);
        }
      }
    } catch (e) {
      console.warn("Failed reading video progress", e);
    }
  };

  // -------------------------------------------------------------
  // TIME UPDATE: Save current timestamp & track completion
  // -------------------------------------------------------------
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const now = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(now);

    // Save to localStorage every 2 seconds
    if (Math.floor(now) % 2 === 0) {
      try {
        localStorage.setItem(progressStorageKey, now.toString());
      } catch (e) {
        // storage quota fallback
      }
    }

    // Auto mark completion if watched > 90%
    if (dur > 0 && now / dur > 0.9 && !currentLesson.isCompleted) {
      handleMarkCompleted(true, true);
    }
  };

  // Reset to 0:00
  const handleRestartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setResumePrompt(null);
      showToast("Restarted video from 00:00", "info");
    }
  };

  // Handle video ended
  const handleVideoEnded = () => {
    handleMarkCompleted(true, true);
    if (autoPlayNext && activeLessonIdx < units.length - 1) {
      showToast("Lesson completed! Autoplaying next lesson...", "success");
      setTimeout(() => {
        setActiveLessonIdx((prev) => prev + 1);
      }, 1500);
    }
  };

  // Toggle speed
  const cyclePlaybackSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
    showToast(`Speed set to ${nextSpeed}x`, "info");
  };

  // Mark Completed Toggle
  const handleMarkCompleted = (
    status = !currentLesson.isCompleted,
    silent = false,
  ) => {
    lmsService.updateUnit(currentLesson.id, { isCompleted: status });
    const updatedUnits = lmsService.getUnitsByCourse(currentCourse.id);
    setUnits(updatedUnits);
    if (!silent) {
      showToast(
        status ? "Lesson marked as completed!" : "Lesson marked as incomplete",
        status ? "success" : "info",
      );
    }
  };

  // Save Note with Timestamp
  const handleSaveNote = () => {
    if (!noteContent.trim()) {
      showToast("Please enter some note content first", "warning");
      return;
    }
    const timestampStr = formatTime(currentTime);
    lmsService.addNote({
      courseId: currentCourse.id,
      courseTitle: currentCourse.title,
      lessonTitle: currentLesson.title,
      timestamp: timestampStr,
      content: noteContent,
    });
    setUserNotes(lmsService.getNotes());
    setNoteContent("");
    showToast(`Note saved with timestamp [${timestampStr}]!`, "success");
  };

  // Insert current timestamp into note textarea
  const handleInsertTimestamp = () => {
    const stamp = `[${formatTime(currentTime)}] `;
    setNoteContent((prev) => stamp + prev);
    showToast(`Timestamp ${formatTime(currentTime)} attached to note!`, "info");
  };

  // Group units by moduleName / module
  const sections = useMemo(() => {
    const map = new Map();
    units.forEach((unit) => {
      if (unit.type === "quiz" || unit.type === "assignment") return;
      const mod = unit.moduleName || "General Lessons";
      if (!map.has(mod)) {
        map.set(mod, []);
      }
      map.get(mod).push(unit);
    });
    const result = Array.from(map.entries()).map(([name, items], idx) => {
      const completed = items.filter((u) => u.isCompleted).length;
      return {
        name,
        index: idx + 1,
        items,
        completedCount: completed,
        totalCount: items.length,
        isCompleted: completed === items.length && items.length > 0,
      };
    });

    // Dynamic combined Tests & Assignments module as last module
    const assessmentsModule = lmsService.getCourseAssessmentsModule(
      currentCourse.id,
    );
    if (
      assessmentsModule &&
      assessmentsModule.items &&
      assessmentsModule.items.length > 0
    ) {
      const completedAssessments = assessmentsModule.items.filter(
        (i) => i.isCompleted,
      ).length;
      result.push({
        name: assessmentsModule.name,
        index: result.length + 1,
        items: assessmentsModule.items,
        completedCount: completedAssessments,
        totalCount: assessmentsModule.items.length,
        isCompleted:
          completedAssessments === assessmentsModule.items.length &&
          assessmentsModule.items.length > 0,
        isAssessmentModule: true,
      });
    }

    return result;
  }, [units, currentCourse.id]);

  // Section accordion expand/collapse state
  const [expandedSections, setExpandedSections] = useState({});

  // Auto-expand the section containing current active lesson
  useEffect(() => {
    if (currentLesson?.moduleName) {
      setExpandedSections((prev) => ({
        ...prev,
        [currentLesson.moduleName]: true,
      }));
    }
  }, [currentLesson?.id, currentLesson?.moduleName]);

  // Expand all sections when search query is entered
  useEffect(() => {
    if (playlistSearch.trim()) {
      const openAll = {};
      sections.forEach((s) => {
        openAll[s.name] = true;
      });
      setExpandedSections(openAll);
    }
  }, [playlistSearch, sections]);

  const toggleSection = (secName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [secName]: !prev[secName],
    }));
  };

  const expandAllSections = () => {
    const all = {};
    sections.forEach((s) => (all[s.name] = true));
    setExpandedSections(all);
  };

  const collapseAllSections = () => {
    setExpandedSections({});
  };

  // Filtered sections and items by search
  const filteredSections = useMemo(() => {
    if (!playlistSearch.trim()) return sections;
    const q = playlistSearch.toLowerCase();
    return sections
      .map((sec) => {
        const matchesSection = sec.name.toLowerCase().includes(q);
        const matchingItems = sec.items.filter(
          (u) =>
            u.title.toLowerCase().includes(q) ||
            u.description?.toLowerCase().includes(q) ||
            matchesSection,
        );
        return {
          ...sec,
          items: matchingItems,
        };
      })
      .filter((sec) => sec.items.length > 0);
  }, [sections, playlistSearch]);

  // Overall course progress across all modules & assessment activities
  const allPlayerItems = useMemo(() => {
    return sections.flatMap((s) => s.items || []);
  }, [sections]);
  const completedCount = allPlayerItems.filter((u) => u.isCompleted).length;
  const progressPercent =
    allPlayerItems.length > 0
      ? Math.round((completedCount / allPlayerItems.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. STANDARDIZED STUDENT PAGE HERO BANNER                     */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        category="Interactive Video Lecture Room"
        badgeText="HD Video Streaming"
        title={currentLesson.title}
        description={`Enrolled in ${currentCourse.title}. Study with step-by-step video instructions, timestamp bookmarks, auto-resume, and downloadable resources.`}
        metrics={[
          {
            label: "Lesson",
            value: `${activeLessonIdx + 1} of ${units.length}`,
            color: "text-blue-600 dark:text-cyan-400",
          },
          {
            label: "Course Progress",
            value: `${progressPercent}%`,
            color: "text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Duration",
            value: currentLesson.duration || "20:00",
            color: "text-purple-600 dark:text-purple-400",
          },
          {
            label: "Speed",
            value: `${playbackSpeed}x`,
            color: "text-amber-600 dark:text-amber-400",
          },
        ]}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. TOP ACTION CONTROL BAR & COURSE SWITCHER                   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3 min-w-0">
          <button
            onClick={() => navigate(`/courses/${currentCourse.id}`)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Back to Course Details"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider block truncate">
              {currentLesson.moduleName || "Curriculum Track"}
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
              {currentLesson.title}
            </h2>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0 justify-end">
          {/* Previous Lesson */}
          <button
            disabled={activeLessonIdx <= 0}
            onClick={() => setActiveLessonIdx((prev) => Math.max(0, prev - 1))}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Previous Lesson"
          >
            <SkipBack size={17} />
          </button>

          {/* Next Lesson */}
          <button
            disabled={activeLessonIdx >= units.length - 1}
            onClick={() =>
              setActiveLessonIdx((prev) => Math.min(units.length - 1, prev + 1))
            }
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Next Lesson"
          >
            <SkipForward size={17} />
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={() => handleMarkCompleted()}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentLesson.isCompleted
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <CheckCircle2
              size={14}
              className={
                currentLesson.isCompleted
                  ? "text-emerald-600"
                  : "text-slate-400"
              }
            />
            <span>
              {currentLesson.isCompleted ? "Completed" : "Mark as Done"}
            </span>
          </button>

          {/* Speed Selector */}
          <button
            onClick={cyclePlaybackSpeed}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>

          {/* Theater Mode Toggle */}
          <button
            onClick={() => setTheaterMode(!theaterMode)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer hidden md:flex"
            title={theaterMode ? "Exit Theater Mode" : "Theater Mode"}
          >
            {theaterMode ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MAIN WORKSPACE (Video Player & Syllabus Playlist)          */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`grid gap-6 ${
          theaterMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
        }`}
      >
        {/* LEFT / CENTER COLUMN: Video Player & Tabs */}
        <div className={theaterMode ? "col-span-1" : "lg:col-span-2 space-y-4"}>
          {/* ------------------------------------------------------------- */}
          {/* WORLD-CLASS CUSTOM STREAMING VIDEO PLAYER                     */}
          {/* ------------------------------------------------------------- */}
          <PremiumVideoPlayer
            videoRef={videoRef}
            streamUrl={streamData.url}
            videoMime={streamData.mime}
            isLoading={streamData.isLoading}
            isLocked={streamData.isLocked}
            lockMessage={streamData.lockMessage}
            title={currentLesson.title}
            moduleName={currentLesson.moduleName || "Curriculum Track"}
            lessonNumber={activeLessonIdx + 1}
            totalLessons={units.length}
            poster={currentCourse.thumbnail}
            playbackSpeed={playbackSpeed}
            onSpeedChange={(spd) => {
              setPlaybackSpeed(spd);
              if (videoRef.current) {
                videoRef.current.playbackRate = spd;
              }
              showToast(`Speed set to ${spd}x`, "info");
            }}
            theaterMode={theaterMode}
            onToggleTheater={() => setTheaterMode(!theaterMode)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            resumePrompt={resumePrompt}
            onRestartVideo={handleRestartVideo}
            onDismissResume={() => setResumePrompt(null)}
            onPreviousLesson={
              activeLessonIdx > 0
                ? () => setActiveLessonIdx((prev) => Math.max(0, prev - 1))
                : null
            }
            onNextLesson={
              activeLessonIdx < units.length - 1
                ? () =>
                    setActiveLessonIdx((prev) =>
                      Math.min(units.length - 1, prev + 1),
                    )
                : null
            }
            hasPrevLesson={activeLessonIdx > 0}
            hasNextLesson={activeLessonIdx < units.length - 1}
            isCompleted={currentLesson.isCompleted}
            onToggleCompleted={handleMarkCompleted}
            onNavigateToFees={() => navigate("/profile?tab=attendance")}
            onBackToCourse={() => navigate(`/courses/${currentCourse.id}`)}
          />

          {/* LOWER ACTIONS STRIP */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300 font-mono font-medium">
                <Clock size={14} className="text-cyan-500" />
                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>

              {/* Modern iOS-Style Toggle for Autoplay Next Lesson */}
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <div
                  onClick={() => setAutoPlayNext(!autoPlayNext)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${
                    autoPlayNext
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 justify-end"
                      : "bg-slate-300 dark:bg-slate-700 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Autoplay Next Lesson
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setActiveTab("notes");
                  handleInsertTimestamp();
                }}
                className="px-3.5 py-1.5 rounded-xl font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200/60 dark:border-blue-800/60 transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
                title="Add Note at Current Timestamp"
              >
                <Bookmark
                  size={13}
                  className="text-blue-500 dark:text-cyan-400"
                />
                <span>Bookmark Note [{formatTime(currentTime)}]</span>
              </button>

              <button
                onClick={() => handleMarkCompleted()}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                  currentLesson.isCompleted
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                <CheckCircle2
                  size={14}
                  className={
                    currentLesson.isCompleted
                      ? "text-emerald-500"
                      : "text-slate-400"
                  }
                />
                <span>
                  {currentLesson.isCompleted ? "Completed" : "Mark as Done"}
                </span>
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* TABBED INTERACTIVE CONTENT PANEL                             */}
          {/* ------------------------------------------------------------- */}
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
            {/* Tab navigation */}
            <div className="border-b border-slate-100 dark:border-slate-800 flex space-x-6 pb-2 text-xs font-bold">
              {[
                { key: "overview", label: "Lesson Overview" },
                {
                  key: "notes",
                  label: `Personal Notes (${
                    userNotes.filter((n) => n.courseId === currentCourse.id)
                      .length
                  })`,
                },
                { key: "resources", label: "Resources & Cheat Sheet" },
                { key: "discussion", label: "Student Q&A & Forums" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-blue-600 text-blue-600 dark:text-cyan-400"
                      : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {currentLesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {currentLesson.moduleName} • Course: {currentCourse.title}
                  </p>
                </div>

                <p className="leading-relaxed text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  {currentLesson.description ||
                    "In this lecture we cover essential strategies and practical execution steps with step-by-step screen recording and instructor commentary."}
                </p>

                {/* Key Takeaways Card */}
                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles size={14} className="text-blue-600" />
                    <span>Learning Objectives Covered in this Lesson:</span>
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                    <li>Core technical foundations & best practices.</li>
                    <li>
                      Industry tool workflows and practical configuration.
                    </li>
                    <li>Avoiding common optimization mistakes & penalties.</li>
                    <li>
                      Actionable implementation checklist for live projects.
                    </li>
                  </ul>
                </div>

                {/* Forum Action Banner */}
                <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessagesSquare
                      size={16}
                      className="text-blue-600 dark:text-cyan-400"
                    />
                    <span className="font-semibold text-blue-900 dark:text-blue-300">
                      Have questions about this lesson?
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/forums")}
                    className="font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Open Community Forums</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Scratchpad Note for this Lesson
                    </label>
                    <button
                      type="button"
                      onClick={handleInsertTimestamp}
                      className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Bookmark size={12} />
                      <span>
                        Attach current time [{formatTime(currentTime)}]
                      </span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write key concepts, formulas, or reminders for this timestamp..."
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNote}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Save Note to Notebook</span>
                    </button>
                  </div>
                </div>

                {/* List of saved notes */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    Your Saved Notes (
                    {
                      userNotes.filter((n) => n.courseId === currentCourse.id)
                        .length
                    }
                    )
                  </h4>
                  {userNotes
                    .filter((n) => n.courseId === currentCourse.id)
                    .slice(0, 5)
                    .map((note) => (
                      <div
                        key={note.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-slate-400 text-[10px]">
                          <span className="font-bold text-blue-600 dark:text-cyan-400">
                            {note.lessonTitle || currentLesson.title}
                          </span>
                          <span>{note.createdAt || "Recently"}</span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                          {note.content}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 3: RESOURCES */}
            {activeTab === "resources" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText size={16} />
                    </div>
                    <div>
                      <span className="block">
                        {currentLesson.title}_CheatSheet.pdf
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        2.4 MB • PDF Reference Guide
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Downloading resource...", "info")}
                    className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                      <ExternalLink size={16} />
                    </div>
                    <div>
                      <span className="block">
                        Official Documentation & Tool Guidelines
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        Web Resource Link
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://developers.google.com/search/docs"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>View Docs</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 4: DISCUSSION */}
            {activeTab === "discussion" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Questions & Discussion for this Lesson
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Harsh Pareek (Faculty Lead)
                        </span>
                        <span>Pinned Answer</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        Remember to always verify the crawl budget directives in
                        robots.txt before deploying large e-commerce catalogs.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/forums")}
                    className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Join Discussion on Forums
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: COURSE SYLLABUS PLAYLIST WITH FOLDER & SECTION ACCORDIONS */}
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
          {/* ========================================================= */}
          {/* LEVEL 1: ACTUAL MASTER COURSE CARD & SELECTOR DROPDOWN   */}
          {/* ========================================================= */}
          <div className="relative" ref={courseDropdownRef}>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900 text-slate-900 dark:text-white shadow-xs border border-blue-200/80 dark:border-blue-600/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-500/25 dark:text-blue-200 border border-blue-200/90 dark:border-blue-400/40 shadow-2xs">
                  <GraduationCap
                    size={13}
                    className="text-blue-600 dark:text-blue-300"
                  />
                  <span>Enrolled Course</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-blue-300/80">
                  Click below to switch
                </span>
              </div>

              {/* Master Course Display & Switcher Trigger */}
              <button
                type="button"
                onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/15 border border-slate-200/80 dark:border-white/15 transition-all text-left cursor-pointer group shadow-2xs dark:shadow-inner"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {currentCourse.thumbnail ? (
                    <img
                      src={currentCourse.thumbnail}
                      alt={currentCourse.title}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/20 shrink-0 shadow-2xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shrink-0">
                      {currentCourse.title?.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                      {currentCourse.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-blue-200 font-medium truncate mt-0.5">
                      {currentCourse.category || "Certification"} •{" "}
                      {allPlayerItems.length} Lessons & Activities •{" "}
                      {sections.length} Modules
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 shrink-0 ml-2">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 hidden sm:inline">
                    Switch
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-blue-600 dark:text-blue-300 transition-transform duration-200 ${
                      isCourseDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Master Course Progress */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 dark:text-blue-200">
                  <span>Overall Course Progress</span>
                  <span className="text-blue-600 dark:text-cyan-300 tabular-nums">
                    {completedCount} / {allPlayerItems.length} Activities (
                    {progressPercent}
                    %)
                  </span>
                </div>
                <div className="w-full bg-slate-200/80 dark:bg-black/40 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ACTUAL COURSES DROPDOWN POPOVER */}
            {isCourseDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-[#0b1329] rounded-2xl shadow-2xl border-2 border-blue-500/50 p-2 space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2">
                <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={13} className="text-blue-600" />
                    <span>Select an Actual Course</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {courses.length} Courses
                  </span>
                </div>
                {courses.map((c) => {
                  const isSelected = c.id === currentCourse.id;
                  const cUnits = lmsService.getUnitsByCourse(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCourse(c)}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-950/60 border border-blue-500/50 text-blue-900 dark:text-blue-100 shadow-2xs"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        {c.thumbnail ? (
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {c.title?.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate">
                            {c.title}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {cUnits.length} video lessons • {c.category}
                          </p>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-600 text-white shrink-0 ml-1">
                          Current
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          Switch →
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* LEVEL 2: COURSE MODULES SECTION HEADER                    */}
          {/* ========================================================= */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderOpen
                  size={16}
                  className="text-blue-600 dark:text-indigo-400"
                />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                  Course Modules ({sections.length})
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-[11px]">
                <button
                  type="button"
                  onClick={expandAllSections}
                  className="font-bold text-blue-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Expand all
                </button>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <button
                  type="button"
                  onClick={collapseAllSections}
                  className="font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                >
                  Collapse all
                </button>
              </div>
            </div>

            {/* Playlist search */}
            <div className="relative pt-0.5">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search modules or lessons..."
                value={playlistSearch}
                onChange={(e) => setPlaylistSearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* LEVEL 2: MODULES ACCORDION LIST                           */}
          {/* ========================================================= */}
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredSections.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 space-y-1">
                <p className="font-semibold">No matching modules found</p>
                <p className="text-[11px]">Try adjusting your search query</p>
              </div>
            ) : (
              filteredSections.map((sec) => {
                const isExpanded = expandedSections[sec.name] !== false;
                const containsActive = sec.items.some(
                  (u) => u.id === currentLesson.id,
                );

                return (
                  <div
                    key={sec.name}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      containsActive
                        ? "border-blue-400 dark:border-indigo-600 bg-blue-50/20 dark:bg-indigo-950/20 shadow-xs"
                        : "border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0b1329]"
                    }`}
                  >
                    {/* MODULE ACCORDION HEADER */}
                    <button
                      type="button"
                      onClick={() => toggleSection(sec.name)}
                      className={`w-full p-3 sm:p-3.5 flex items-center justify-between transition-colors text-left cursor-pointer ${
                        sec.isCompleted
                          ? "bg-emerald-50/60 dark:bg-emerald-950/30 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/50"
                          : containsActive
                            ? "bg-blue-100/70 dark:bg-indigo-950/50 hover:bg-blue-100 dark:hover:bg-indigo-950/70"
                            : "bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0 pr-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            sec.isCompleted
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                              : containsActive
                                ? "bg-blue-600 text-white shadow-xs"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {sec.isCompleted ? (
                            <CheckCircle2 size={16} />
                          ) : isExpanded ? (
                            <FolderOpen size={16} />
                          ) : (
                            <Folder size={16} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-blue-100 dark:bg-indigo-950/80 text-blue-700 dark:text-indigo-300">
                              Module {sec.index}
                            </span>
                            {sec.isAssessmentModule && (
                              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                                Final Module
                              </span>
                            )}
                            {containsActive && (
                              <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-sm uppercase tracking-wide">
                                Active Lesson
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                            {sec.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 tabular-nums">
                          {sec.completedCount}/{sec.totalCount}
                        </span>
                        <ChevronDown
                          size={15}
                          className={`text-slate-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* ========================================================= */}
                    {/* LEVEL 3: INDENTED VIDEO LESSONS LIST                      */}
                    {/* ========================================================= */}
                    {isExpanded && (
                      <div className="p-2.5 space-y-1.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
                        <div className="ml-2 pl-3 border-l-2 border-blue-200 dark:border-indigo-900/60 space-y-1.5">
                          {sec.items.map((unit, uIdx) => {
                            const isAss = unit.type === "assignment";
                            const isQuiz =
                              unit.type === "quiz" ||
                              unit.title.toLowerCase().includes("quiz") ||
                              unit.title.toLowerCase().includes("test");
                            const isActive =
                              unit.id === currentLesson.id && !isAss && !isQuiz;
                            const savedProgress = localStorage.getItem(
                              `om_video_progress_${currentCourse.id}_${unit.id}`,
                            );
                            const savedSecs = savedProgress
                              ? parseFloat(savedProgress)
                              : 0;
                            const hasResume = savedSecs > 5;

                            return (
                              <div
                                key={unit.id}
                                onClick={() => {
                                  if (isQuiz) {
                                    navigate(
                                      `/take-quiz/${unit.quizId || unit.id}`,
                                    );
                                  } else if (isAss) {
                                    navigate(
                                      `/take-assignment/${unit.assignmentId || unit.id}`,
                                    );
                                  } else {
                                    const targetIdx = units.findIndex(
                                      (u) => u.id === unit.id,
                                    );
                                    if (targetIdx !== -1) {
                                      setActiveLessonIdx(targetIdx);
                                    }
                                  }
                                }}
                                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                                  isActive
                                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                                    : "bg-white dark:bg-[#0b1329] border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start space-x-2.5 min-w-0">
                                    <div
                                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                                        isActive
                                          ? "bg-white/20 text-white"
                                          : isQuiz
                                            ? "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300"
                                            : isAss
                                              ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                      }`}
                                    >
                                      {isActive ? (
                                        <Play
                                          size={11}
                                          className="fill-current translate-x-0.5"
                                        />
                                      ) : isQuiz ? (
                                        <HelpCircle size={13} />
                                      ) : isAss ? (
                                        <FileText size={13} />
                                      ) : (
                                        <span>
                                          {sec.index}.{uIdx + 1}
                                        </span>
                                      )}
                                    </div>

                                    <div className="min-w-0">
                                      <div className="flex items-center space-x-1.5">
                                        <h5
                                          className={`text-xs font-bold leading-snug truncate ${
                                            isActive
                                              ? "text-white"
                                              : "text-slate-800 dark:text-slate-200"
                                          }`}
                                        >
                                          {unit.title}
                                        </h5>
                                        {isQuiz && (
                                          <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 shrink-0">
                                            Test
                                          </span>
                                        )}
                                        {isAss && (
                                          <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
                                            Assignment
                                          </span>
                                        )}
                                      </div>
                                      <div
                                        className={`flex items-center space-x-1.5 mt-0.5 text-[10px] ${
                                          isActive
                                            ? "text-blue-100"
                                            : "text-slate-400"
                                        }`}
                                      >
                                        <span>{unit.duration}</span>
                                        {isQuiz && unit.totalQuestions && (
                                          <>
                                            <span>•</span>
                                            <span>
                                              {unit.totalQuestions} Questions
                                            </span>
                                          </>
                                        )}
                                        {hasResume &&
                                          !unit.isCompleted &&
                                          !isQuiz &&
                                          !isAss && (
                                            <>
                                              <span>•</span>
                                              <span
                                                className={
                                                  isActive
                                                    ? "text-cyan-200 font-semibold"
                                                    : "text-blue-500 font-semibold"
                                                }
                                              >
                                                Resume at{" "}
                                                {formatTime(savedSecs)}
                                              </span>
                                            </>
                                          )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="shrink-0 pt-0.5">
                                    {unit.isCompleted ? (
                                      <CheckCircle2
                                        size={16}
                                        className={
                                          isActive
                                            ? "text-white"
                                            : "text-emerald-500"
                                        }
                                      />
                                    ) : isQuiz ? (
                                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:underline">
                                        Start →
                                      </span>
                                    ) : isAss ? (
                                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline">
                                        Open →
                                      </span>
                                    ) : (
                                      <Play
                                        size={13}
                                        className={
                                          isActive
                                            ? "text-white fill-white animate-pulse"
                                            : "text-slate-300 dark:text-slate-600"
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayerPage;
