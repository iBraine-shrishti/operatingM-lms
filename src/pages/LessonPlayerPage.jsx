import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { crmService } from "../services/crmService";
import { useToast } from "../context/ToastContext";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { useAuth } from "../context/AuthContext";
import { formatTime } from "../utils/playerUtils";
import {
  PremiumVideoPlayer,
  LessonTopBar,
  LessonControlsStrip,
  LessonTabsContainer,
  LessonPlaylist,
} from "../components/player";

/**
 * LessonPlayerPage Component
 * Full-featured interactive video lecture player for students.
 * Component-based architecture orchestrating video streaming, curriculum playlists,
 * personal notes, downloadable resources, and assessment navigation.
 */
export const LessonPlayerPage = () => {
  const { currentUser, crmProfile } = useAuth();
  const studentId = lmsService.getActiveStudentId(
    crmProfile?.id ||
    currentUser?.crmAdmissionId ||
    currentUser?.admissionId ||
    currentUser?.id ||
    crmService.getSelectedStudentId()
  );
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const courses = useMemo(() => lmsService.getCourses(), []);
  const courseIdParam = searchParams.get("courseId");
  const unitIdParam = searchParams.get("unitId");

  // Determine current course with flexible ID matching and student course fallback
  const currentCourse = useMemo(() => {
    if (courseIdParam) {
      return (
        courses.find(
          (c) =>
            c.id === courseIdParam ||
            String(c.id).replace(/^course-/, "") ===
              String(courseIdParam).replace(/^course-/, "")
        ) || courses[0]
      );
    }
    if (crmProfile?.course) {
      const match = courses.find(
        (c) =>
          c.title.toLowerCase().includes(crmProfile.course.toLowerCase()) ||
          crmProfile.course.toLowerCase().includes(c.title.toLowerCase())
      );
      if (match) return match;
    }
    return courses.find((c) => c.id === "course-1") || courses[0];
  }, [courses, courseIdParam, crmProfile?.course]);

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

  // Keep URL in sync when active lesson changes
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
            lockMessage:
              "Access restricted. You do not have verified access to this course in Operating Media CRM.",
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
          lockMessage:
            "Access restricted. Unable to verify CRM course enrollment.",
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
  const [userNotes, setUserNotes] = useState(() => lmsService.getNotes(studentId));

  useEffect(() => {
    lmsService.fetchStudentNotes(studentId).then((live) => {
      if (live) setUserNotes(live);
    });
  }, [studentId]);

  useEffect(() => {
    const handleSync = () => setUserNotes(lmsService.getNotes(studentId));
    window.addEventListener("lms_notes_changed", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("lms_notes_changed", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [studentId]);
  const [playlistSearch, setPlaylistSearch] = useState("");



  // Storage key for video progress
  const progressStorageKey = `om_video_progress_${currentCourse.id}_${currentLesson?.id}`;

  // RESUME PLAYBACK FEATURE: Load saved timestamp when video mounts
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

  // TIME UPDATE: Save current timestamp & track completion
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
    if (Boolean(currentLesson.isCompleted) === Boolean(status)) return;
    const nowIso = new Date().toISOString();
    lmsService.updateUnit(currentLesson.id, {
      isCompleted: status,
      completedAt: status ? nowIso : null,
    });
    const updatedUnits = lmsService.getUnitsByCourse(currentCourse?.id);
    setUnits(updatedUnits);

    if (status) {
      const activeStudentId =
        studentId ||
        crmProfile?.id ||
        currentUser?.admissionId ||
        currentUser?.id ||
        "";
      lmsService.recordStudentActivity(activeStudentId, {
        id: `act-unit-${currentLesson.id}`,
        unitId: currentLesson.id,
        type: "completion",
        action: "completed curriculum lesson",
        target: `${currentLesson.title}${
          currentCourse?.title ? ` in ${currentCourse.title}` : ""
        }`,
        timestamp: nowIso,
      });

      const allCompleted =
        updatedUnits.length > 0 && updatedUnits.every((u) => u.isCompleted);
      if (allCompleted) {
        lmsService.recordStudentActivity(activeStudentId, {
          id: `act-course-${currentCourse?.id}-${Date.now()}`,
          type: "completion",
          action: "completed full curriculum for",
          target: currentCourse?.title || "Course",
          timestamp: nowIso,
        });
      }
    }

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
      studentId,
      studentName: currentUser?.name || currentUser?.fullName || "",
      courseId: currentCourse.id,
      courseTitle: currentCourse.title,
      lessonTitle: currentLesson.title,
      timestamp: timestampStr,
      content: noteContent,
    });
    setUserNotes(lmsService.getNotes(studentId));
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

    return result;
  }, [units, currentCourse.id]);

  // Section accordion expand/collapse state
  const [expandedSections, setExpandedSections] = useState({});

  // Initialize all sections as expanded by default, ensuring active lesson module is open
  useEffect(() => {
    if (sections.length > 0) {
      setExpandedSections((prev) => {
        if (Object.keys(prev).length > 0) {
          if (currentLesson?.moduleName && prev[currentLesson.moduleName] === undefined) {
            return { ...prev, [currentLesson.moduleName]: true };
          }
          return prev;
        }
        const initial = {};
        sections.forEach((s) => {
          initial[s.name] = true;
        });
        return initial;
      });
    }
  }, [sections, currentLesson?.moduleName]);

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
    setExpandedSections((prev) => {
      const isExpanded = prev[secName] !== false;
      return {
        ...prev,
        [secName]: !isExpanded,
      };
    });
  };

  const expandAllSections = () => {
    const all = {};
    sections.forEach((s) => {
      all[s.name] = true;
    });
    setExpandedSections(all);
  };

  const collapseAllSections = () => {
    const all = {};
    sections.forEach((s) => {
      all[s.name] = false;
    });
    setExpandedSections(all);
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
      {/* 1. STANDARDIZED STUDENT PAGE HERO BANNER */}
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

      {/* 2. TOP ACTION CONTROL BAR & COURSE SWITCHER */}
      <LessonTopBar
        currentCourse={currentCourse}
        currentLesson={currentLesson}
        activeLessonIdx={activeLessonIdx}
        totalLessons={units.length}
        playbackSpeed={playbackSpeed}
        theaterMode={theaterMode}
        onBackToCourse={() => navigate(`/courses/${currentCourse.id}`)}
        onPreviousLesson={() => setActiveLessonIdx((prev) => Math.max(0, prev - 1))}
        onNextLesson={() =>
          setActiveLessonIdx((prev) => Math.min(units.length - 1, prev + 1))
        }
        onToggleCompleted={() => handleMarkCompleted()}
        onCycleSpeed={cyclePlaybackSpeed}
        onToggleTheater={() => setTheaterMode(!theaterMode)}
      />

      {/* 3. MAIN WORKSPACE (Video Player & Syllabus Playlist) */}
      <div
        className={`grid gap-6 ${
          theaterMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
        }`}
      >
        {/* LEFT / CENTER COLUMN: Video Player & Tabs */}
        <div className={theaterMode ? "col-span-1" : "lg:col-span-2 space-y-4"}>
          {/* CUSTOM STREAMING VIDEO PLAYER */}
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
          <LessonControlsStrip
            currentTime={currentTime}
            duration={duration}
            autoPlayNext={autoPlayNext}
            onToggleAutoPlay={() => setAutoPlayNext(!autoPlayNext)}
            onBookmarkNote={() => {
              setActiveTab("notes");
              handleInsertTimestamp();
            }}
            isCompleted={currentLesson.isCompleted}
            onToggleCompleted={() => handleMarkCompleted()}
          />

          {/* TABBED INTERACTIVE CONTENT PANEL */}
          <LessonTabsContainer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userNotes={userNotes}
            currentCourse={currentCourse}
            currentLesson={currentLesson}
            noteContent={noteContent}
            setNoteContent={setNoteContent}
            currentTime={currentTime}
            onInsertTimestamp={handleInsertTimestamp}
            onSaveNote={handleSaveNote}
            onDownloadResource={() => showToast("Downloading resource...", "info")}
            onNavigateForums={() => navigate("/forums")}
          />
        </div>

        {/* RIGHT COLUMN: COURSE SYLLABUS PLAYLIST WITH FOLDER & SECTION ACCORDIONS */}
        <LessonPlaylist
          currentCourse={currentCourse}
          allPlayerItemsCount={allPlayerItems.length}
          sections={sections}
          filteredSections={filteredSections}
          completedCount={completedCount}
          progressPercent={progressPercent}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
          onExpandAll={expandAllSections}
          onCollapseAll={collapseAllSections}
          playlistSearch={playlistSearch}
          onSearchChange={setPlaylistSearch}
          currentLessonId={currentLesson.id}
          onSelectUnit={(unit) => {
            const targetIdx = units.findIndex((u) => u.id === unit.id);
            if (targetIdx !== -1) {
              setActiveLessonIdx(targetIdx);
            }
          }}
          onNavigateQuiz={(quizId) => navigate(`/take-quiz/${quizId}`)}
          onNavigateAssignment={(assignmentId) =>
            navigate(`/take-assignment/${assignmentId}`)
          }
        />
      </div>
    </div>
  );
};

export default LessonPlayerPage;
