import {
  INITIAL_COURSES,
  COURSE_THUMBNAILS,
  INITIAL_UNITS,
  INITIAL_QUIZZES,
  INITIAL_ASSIGNMENTS,
  INITIAL_STUDENTS,
  INITIAL_QUESTIONS,
  INITIAL_DISCUSSIONS,
  INITIAL_ACTIVITIES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_NOTES,
  INITIAL_REVIEWS,
} from "../data/mockData";
import { IMPORTED_LMS_QUIZZES } from "../data/importedLmsQuizzes";
import { crmService } from "./crmService";
// Helper for persistent local storage mock service
const STORAGE_PREFIX = "om_lms_v12_";
export const R2_STORAGE_BASE =
  "https://pub-e12f5dbd15e94f87bcde01ce90c0043e.r2.dev";

export const CRM_BACKEND_API =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_CRM_API_URL) ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1")
    ? "https://crm.dmsoi.org/api"
    : "https://operatingmedia.org/api");
const getStored = (key, initial) => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : initial;
  } catch {
    return initial;
  }
};
const setStored = (key, value) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (err) {
    console.error("Storage save error:", err);
  }
};
export const lmsService = {
  // Dynamic stream resolution from CRM backend / database
  fetchUnitStreamUrl: async (unitId, studentId = null) => {
    if (!unitId) return null;

    const endpoints = [CRM_BACKEND_API];

    for (const base of endpoints) {
      try {
        const query = studentId
          ? `?student_id=${encodeURIComponent(studentId)}`
          : "";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const resp = await fetch(
          `${base}/lms/units/${encodeURIComponent(unitId)}/stream/${query}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          },
        );
        clearTimeout(timeoutId);

        if (resp.status === 403) {
          const data = await resp.json().catch(() => ({}));
          return {
            success: false,
            locked: true,
            unitId,
            title: data.title || "Course Lecture",
            message:
              data.message ||
              "Access restricted. Video access is managed in Operating Media CRM.",
          };
        }

        if (resp.ok) {
          const data = await resp.json();
          if (data && data.videoUrl) {
            return {
              success: true,
              locked: false,
              videoUrl: data.videoUrl,
              videoMime:
                data.videoMime ||
                (data.videoUrl.endsWith(".mov")
                  ? "video/quicktime"
                  : "video/mp4"),
              title: data.title,
              moduleName: data.moduleName,
              duration: data.duration,
              unitId: data.unitId,
            };
          }
        }
      } catch (err) {
        // Ignore and try next endpoint
      }
    }

    // If student ID was passed, never grant unauthorized access on network errors
    if (studentId) {
      return {
        success: false,
        locked: true,
        unitId,
        title: "Course Lecture",
        message: "Access restricted. You do not have verified access to this course in Operating Media CRM.",
      };
    }

    // Resilient Fallback for anonymous public previews only
    const localUnits = lmsService.getUnits();
    const found = localUnits.find((u) => u.id === unitId);
    if (found && found.videoUrl) {
      return {
        success: true,
        locked: false,
        videoUrl: found.videoUrl,
        videoMime: found.videoUrl.endsWith(".mov")
          ? "video/quicktime"
          : "video/mp4",
        title: found.title,
        moduleName: found.moduleName,
        duration: found.duration,
        unitId: found.id,
      };
    }

    return {
      success: false,
      locked: true,
      error: "Unable to load video stream.",
    };
  },
  // Real course permissions fetched from CRM database
  fetchStudentCoursePermissions: async (studentId) => {
    if (!studentId) return [];
    const endpoints = [CRM_BACKEND_API];

    for (const base of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const resp = await fetch(`${base}/lms/students/${studentId}/courses/`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        clearTimeout(timeoutId);
        if (resp.ok) {
          const data = await resp.json();
          if (data && Array.isArray(data.courses)) {
            try {
              localStorage.setItem(
                `${STORAGE_PREFIX}perms_${studentId}`,
                JSON.stringify(data.courses),
              );
            } catch (e) {}
            return data.courses;
          }
        }
      } catch (err) {}
    }

    // Cached fallback
    try {
      const cached = localStorage.getItem(`${STORAGE_PREFIX}perms_${studentId}`);
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return [];
  },
  // Calculate real metrics directly from real video units and course assessments
  getRealCourseMetrics: (courseId) => {
    const units = lmsService.getUnitsByCourse(courseId);
    let totalSec = 0;
    let completedCount = 0;
    units.forEach((u) => {
      if (u.isCompleted) completedCount++;
      if (u.duration) {
        const p = u.duration.split(":").map(Number);
        if (p.length === 2 && !isNaN(p[0]) && !isNaN(p[1])) totalSec += p[0] * 60 + p[1];
        else if (p.length === 3 && !isNaN(p[0]) && !isNaN(p[1]) && !isNaN(p[2])) totalSec += p[0] * 3600 + p[1] * 60 + p[2];
      }
    });
    const totalLessons = units.length;
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const duration = h > 0 ? `${h}h ${m.toString().padStart(2, "0")}m` : `${m}m`;

    // Course progress is based on course curriculum lessons/units
    const totalActivities = totalLessons;
    const completedActivities = completedCount;
    const progress = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

    return {
      totalLessons,
      completedLessons: completedCount,
      totalActivities,
      completedActivities,
      duration,
      progress,
      status: completedActivities === totalActivities && totalActivities > 0 ? "completed" : "in-progress",
      isCompleted: completedActivities === totalActivities && totalActivities > 0,
    };
  },
  // Courses (Total 7 active courses with real durations calculated from real units)
  getCourses: () => {
    const stored = getStored("courses", INITIAL_COURSES);
    let modified = false;
    const mapped = stored
      .filter(
        (c) =>
          c.id !== "course-2" && !c.title.toLowerCase().includes("counseling"),
      )
      .map((course) => {
        let updatedCourse = { ...course };
        if (
          updatedCourse.id === "course-3" &&
          (updatedCourse.title === "Advanced Topics" ||
            updatedCourse.title.toLowerCase().includes("advanced topics"))
        ) {
          updatedCourse.title = "Growth Marketing & Specialized Channels";
          updatedCourse.category = "Growth & Specialized Channels";
          modified = true;
        }
        if (
          COURSE_THUMBNAILS &&
          COURSE_THUMBNAILS[updatedCourse.id] &&
          (!updatedCourse.thumbnail ||
            updatedCourse.thumbnail.includes("unsplash.com"))
        ) {
          updatedCourse.thumbnail = COURSE_THUMBNAILS[updatedCourse.id];
        }
        if (
          updatedCourse.bracketText &&
          (updatedCourse.bracketText.includes("content ideas") ||
            updatedCourse.bracketText.includes("ready-to-use posts") ||
            updatedCourse.bracketText.includes("Have questions about this course"))
        ) {
          updatedCourse.bracketText =
            "Gain comprehensive, practical knowledge of social media marketing and digital campaigns. This course covers step-by-step campaign setup, targeted audience reach, budget optimization, and conversion tracking across Meta, LinkedIn, Quora, and Twitter/X.";
          modified = true;
        }
        if (
          updatedCourse.description &&
          (updatedCourse.description.includes("content ideas") ||
            updatedCourse.description.includes("ready-to-use posts") ||
            updatedCourse.description.includes("Let me know the industry"))
        ) {
          updatedCourse.description =
            "Master modern social media marketing with practical frameworks, industry standard metrics, and hands-on campaign execution across Facebook, Instagram, LinkedIn, Quora, and Twitter/X.";
          modified = true;
        }

        // Calculate real duration and real lessons count from actual video units
        const courseUnits = (INITIAL_UNITS || []).filter((u) => u.courseId === updatedCourse.id);
        if (courseUnits && courseUnits.length > 0) {
          updatedCourse.lessonsCount = courseUnits.length;
          let totalSec = 0;
          courseUnits.forEach((u) => {
            if (u.duration) {
              const p = u.duration.split(":").map(Number);
              if (p.length === 2 && !isNaN(p[0]) && !isNaN(p[1])) totalSec += p[0] * 60 + p[1];
              else if (p.length === 3 && !isNaN(p[0]) && !isNaN(p[1]) && !isNaN(p[2])) totalSec += p[0] * 3600 + p[1] * 60 + p[2];
            }
          });
          const h = Math.floor(totalSec / 3600);
          const m = Math.floor((totalSec % 3600) / 60);
          updatedCourse.duration = h > 0 ? `${h}h ${m.toString().padStart(2, "0")}m` : `${m}m`;
        }

        return updatedCourse;
      });
    if (modified) {
      setStored("courses", mapped);
    }
    return mapped;
  },
  getCourseById: (id) => {
    return lmsService.getCourses().find((c) => c.id === id);
  },
  addCourse: (courseData) => {
    const courses = lmsService.getCourses();
    const newCourse = {
      ...courseData,
      id: `course-${Date.now()}`,
      studentsCount: 0,
      completedCount: 0,
      rating: 5.0,
      reviewsCount: 0,
    };
    const updated = [newCourse, ...courses];
    setStored("courses", updated);
    return newCourse;
  },
  updateCourse: (id, updates) => {
    const courses = lmsService.getCourses();
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    courses[index] = { ...courses[index], ...updates };
    setStored("courses", courses);
    return courses[index];
  },
  deleteCourse: (id) => {
    const courses = lmsService.getCourses();
    const filtered = courses.filter((c) => c.id !== id);
    setStored("courses", filtered);
    return true;
  },
  // Units
  getUnits: () => {
    const stored = getStored("units", INITIAL_UNITS);
    const initialMap = new Map(INITIAL_UNITS.map((iu) => [iu.id, iu]));

    // Merge stored units with any units in INITIAL_UNITS not yet in storage
    const existingIds = new Set((stored || []).map((u) => u.id));
    const merged = Array.isArray(stored) ? [...stored] : [...INITIAL_UNITS];
    INITIAL_UNITS.forEach((iu) => {
      if (!existingIds.has(iu.id)) {
        merged.push(iu);
      }
    });

    return merged
      .filter((u) => u.courseId !== "course-2")
      .map((u) => {
        let videoUrl = u.videoUrl;
        if (videoUrl) {
          if (videoUrl.includes("/LMS_COURSES-videos/")) {
            videoUrl = videoUrl.replace(
              "/LMS_COURSES-videos/",
              `${R2_STORAGE_BASE}/`,
            );
          } else if (videoUrl.includes("/LMS_COURSES-vidoes/")) {
            videoUrl = videoUrl.replace(
              "/LMS_COURSES-vidoes/",
              `${R2_STORAGE_BASE}/`,
            );
          } else if (videoUrl.startsWith("LMS_COURSES-videos/")) {
            videoUrl = videoUrl.replace(
              "LMS_COURSES-videos/",
              `${R2_STORAGE_BASE}/`,
            );
          } else if (videoUrl.startsWith("LMS_COURSES-vidoes/")) {
            videoUrl = videoUrl.replace(
              "LMS_COURSES-vidoes/",
              `${R2_STORAGE_BASE}/`,
            );
          }
        }
        return {
          ...u,
          videoUrl,
        };
      });
  },
  getUnitsByCourse: (courseId) => {
    return lmsService.getUnits().filter((u) => u.courseId === courseId);
  },
  addUnit: (unit) => {
    const units = lmsService.getUnits();
    const newUnit = { ...unit, id: `u-${Date.now()}` };
    const updated = [...units, newUnit];
    setStored("units", updated);
    return newUnit;
  },
  updateUnit: (id, updates) => {
    const units = lmsService.getUnits();
    const index = units.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    units[index] = { ...units[index], ...updates };
    setStored("units", units);
    return units[index];
  },
  deleteUnit: (id) => {
    const units = lmsService.getUnits();
    const filtered = units.filter((u) => u.id !== id);
    setStored("units", filtered);
    return true;
  },
  // Quizzes - real quizzes created in CRM and fetched from backend
  getQuizzes: () => {
    try {
      const v12 = JSON.parse(localStorage.getItem("om_lms_v12_quizzes") || "null");
      if (Array.isArray(v12) && v12.length > 0) return v12;
    } catch {}
    const stored = getStored("quizzes", []);
    return Array.isArray(stored) ? stored : [];
  },
  fetchStudentQuizzes: async (studentId) => {
    try {
      const baseApi = CRM_BACKEND_API || "https://crm.dmsoi.org/api";
      const targetId = studentId || crmService.getSelectedStudentId() || "";
      const res = await fetch(`${baseApi}/lms/student/quizzes/${targetId ? `?student_id=${targetId}` : ""}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.quizzes)) {
          let attemptsCache = {};
          try {
            const cacheKey = targetId ? `om_lms_quiz_attempts_cache_${targetId}` : "om_lms_quiz_attempts_cache";
            attemptsCache = JSON.parse(localStorage.getItem(cacheKey) || localStorage.getItem("om_lms_quiz_attempts_cache") || "{}");
          } catch {}

          const formatted = data.quizzes.map((q) => {
            const localAtt = attemptsCache[String(q.id)] || attemptsCache[String(q.numericId)];
            const status = (q.studentStatus && q.studentStatus !== "pending")
              ? q.studentStatus
              : (localAtt?.status || q.studentStatus || "pending");
            const score = (q.studentScore !== null && q.studentScore !== undefined)
              ? q.studentScore
              : (localAtt?.score ?? null);
            const completedDate = q.completedDate || localAtt?.completedDate || null;
            const timeSpent = q.timeSpent || localAtt?.timeSpent || null;
            const totalQuestions = q.totalQuestions || q.questionsCount || (Array.isArray(q.questions) ? q.questions.length : 0);

            return {
              ...q,
              studentStatus: status,
              studentScore: score,
              completedDate,
              timeSpent,
              totalQuestions,
              questionsCount: totalQuestions,
            };
          });
          setStored("quizzes", formatted);
          localStorage.setItem("om_lms_v12_quizzes", JSON.stringify(formatted));
          return formatted;
        }
      }
    } catch (err) {
      console.warn("Could not fetch backend quizzes:", err);
    }
    return lmsService.getQuizzes();
  },
  addQuiz: (quiz) => {
    const quizzes = lmsService.getQuizzes();
    const newQuiz = {
      ...quiz,
      id: `q-${Date.now()}`,
      attemptsCount: 0,
      averageScore: 0,
      studentStatus: "pending",
      studentScore: null,
      completedDate: null,
      timeSpent: null,
      deadline: "Available Anytime",
      status: "active",
      perQuestionTimerSeconds: quiz.perQuestionTimerSeconds || 60,
    };
    setStored("quizzes", [newQuiz, ...quizzes]);
    return newQuiz;
  },
  submitQuizAttempt: (quizId, score = 90, resultsDetail = null, studentId = null) => {
    const quizzes = lmsService.getQuizzes();
    const index = quizzes.findIndex(
      (q) => String(q.id) === String(quizId) || String(q.numericId) === String(quizId)
    );
    const passThreshold = index !== -1 ? (quizzes[index].passScorePercentage || 75) : 75;
    const isPassed = score >= passThreshold;
    const nowIso = new Date().toISOString();
    const completedDate = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeSpent =
      resultsDetail?.timeSpent ||
      `${Math.max(1, ((quizzes[index]?.durationMinutes || 20) - 5))} mins`;

    const cachedProfile = JSON.parse(localStorage.getItem("om_lms_crm_cached_profile") || "{}");
    const studentUser = JSON.parse(localStorage.getItem("om_lms_student_user") || "{}");
    const targetStudentId = studentId || studentUser.id || studentUser.student_id || cachedProfile.id || cachedProfile.crmAdmissionId || "";

    // Persist attempt in dedicated attempts cache so it survives any network fetches
    try {
      const attemptData = {
        status: isPassed ? "passed" : "failed",
        score,
        completedDate,
        completedAtIso: nowIso,
        timeSpent,
        isPassed,
        resultsDetail,
      };

      const attemptsCache = JSON.parse(localStorage.getItem("om_lms_quiz_attempts_cache") || "{}");
      attemptsCache[String(quizId)] = attemptData;
      if (index !== -1 && quizzes[index].numericId) {
        attemptsCache[String(quizzes[index].numericId)] = attemptData;
      }
      localStorage.setItem("om_lms_quiz_attempts_cache", JSON.stringify(attemptsCache));

      if (targetStudentId) {
        const studentCacheKey = `om_lms_quiz_attempts_cache_${targetStudentId}`;
        const studentCache = JSON.parse(localStorage.getItem(studentCacheKey) || "{}");
        studentCache[String(quizId)] = attemptData;
        if (index !== -1 && quizzes[index].numericId) {
          studentCache[String(quizzes[index].numericId)] = attemptData;
        }
        localStorage.setItem(studentCacheKey, JSON.stringify(studentCache));
      }
    } catch (e) {
      console.warn("Could not cache quiz attempt:", e);
    }

    // Automatically record student activity milestone
    try {
      const quizTitle = index !== -1 ? quizzes[index].title : "Assessment Quiz";
      lmsService.recordStudentActivity(targetStudentId, {
        id: `act-quiz-${quizId}-${Date.now()}`,
        type: "quiz",
        action: isPassed ? `passed examination with ${score}% on` : `completed assessment with ${score}% on`,
        target: quizTitle,
        score,
        timestamp: nowIso,
        details: resultsDetail,
      });
    } catch (e) {
      console.warn("Could not record quiz activity:", e);
    }

    if (index !== -1) {
      quizzes[index] = {
        ...quizzes[index],
        studentStatus: isPassed ? "passed" : "failed",
        studentScore: score,
        completedDate,
        timeSpent,
        attemptsCount: (quizzes[index].attemptsCount || 0) + 1,
        lastAttemptResults: resultsDetail || null,
      };
      setStored("quizzes", quizzes);
      return quizzes[index];
    }
    return undefined;
  },
  getQuizById: (quizId) => {
    const deletedIds = new Set(getStored("deleted_quiz_ids", []));
    if (deletedIds.has(quizId)) return null;

    const quizzes = lmsService.getQuizzes();
    return quizzes.find((q) => q.id === quizId) || null;
  },
  updateQuiz: (quizId, updatedData) => {
    const quizzes = lmsService.getQuizzes();
    const index = quizzes.findIndex((q) => q.id === quizId);
    if (index === -1) return undefined;
    quizzes[index] = {
      ...quizzes[index],
      ...updatedData,
      id: quizId,
    };
    setStored("quizzes", quizzes);
    return quizzes[index];
  },
  deleteQuiz: (quizId) => {
    // Track as deleted so seed data doesn't restore it on next reload
    const deletedIds = getStored("deleted_quiz_ids", []);
    if (!deletedIds.includes(quizId)) {
      deletedIds.push(quizId);
      setStored("deleted_quiz_ids", deletedIds);
    }

    const stored = getStored("quizzes", null);
    const currentList = stored ? [...stored] : [...IMPORTED_LMS_QUIZZES];
    const filtered = currentList.filter((q) => q.id !== quizId);
    setStored("quizzes", filtered);
    return true;
  },
  // Batch Assignments (from CRM backend)
  fetchStudentBatchAssignments: async (studentId) => {
    if (!studentId) return [];
    try {
      const endpoints = [CRM_BACKEND_API];

      for (const base of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          const res = await fetch(
            `${base}/lms/student/assignments/?student_id=${encodeURIComponent(studentId)}`,
            {
              signal: controller.signal,
              headers: { Accept: "application/json" },
            }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (data && data.success && Array.isArray(data.assignments)) {
              return data.assignments.map((a) => ({
                id: String(a.id),
                title: a.title,
                batchId: a.batchId,
                batchName: a.batchName || "Assigned Batch",
                courseId: "course-batch",
                courseTitle: a.batchName || "Batch Practical Assessment",
                dueDate: a.dueDate,
                maxScore: a.maxScore || 100,
                instructions: a.instructions,
                attachmentUrl: a.attachmentUrl,
                status: a.status || "pending",
                score: a.score,
                feedback: a.feedback || "",
                submittedAt: a.submittedAt,
                submissionLink: a.submission?.linkUrl || "",
                submissionNotes: a.submission?.notes || "",
                submittedFileName: a.submission?.fileName || "",
                submittedFileUrl: a.submission?.fileUrl || "",
                totalSubmissions: 1,
                pendingGrading: a.status === "submitted" ? 1 : 0,
              }));
            }
            return [];
          }
        } catch (e) {
          // try next endpoint
        }
      }
    } catch (err) {
      console.warn("Could not fetch batch assignments from backend:", err);
    }
    return [];
  },

  submitStudentBatchAssignment: async (assignmentId, studentId, { file, linkUrl = "", notes = "", assignmentTitle = "" }) => {
    const nowIso = new Date().toISOString();

    // Persist local submission cache for this student
    try {
      const subKey = studentId ? `om_lms_assignment_submissions_${studentId}` : "om_lms_assignment_submissions";
      const subs = JSON.parse(localStorage.getItem(subKey) || "{}");
      subs[String(assignmentId)] = {
        submittedAt: nowIso,
        submissionLink: linkUrl,
        submissionNotes: notes,
        fileName: file?.name || "assignment_project.pdf",
        status: "submitted",
      };
      localStorage.setItem(subKey, JSON.stringify(subs));
    } catch (e) {
      console.warn("Could not cache assignment submission:", e);
    }

    try {
      const formData = new FormData();
      formData.append("student_id", String(studentId));
      if (file && typeof file === "object") {
        formData.append("file", file);
      }
      formData.append("link_url", linkUrl || "");
      formData.append("notes", notes || "");

      const endpoints = [CRM_BACKEND_API];

      for (const base of endpoints) {
        try {
          const res = await fetch(`${base}/lms/assignments/${assignmentId}/submit/`, {
            method: "POST",
            body: formData,
          });
          if (res.ok) {
            const json = await res.json();
            if (json && json.success) {
              // Record activity milestone
              const localAssignments = lmsService.getAssignments();
              const found = localAssignments.find((a) => String(a.id) === String(assignmentId));
              const title = found?.title || "Practical Project Assignment";
              lmsService.recordStudentActivity(studentId, {
                id: `act-assign-${assignmentId}-${Date.now()}`,
                type: "assignment",
                action: "submitted practical assignment for",
                target: title,
                timestamp: nowIso,
              });
              return json;
            }
          }
        } catch (e) {
          // try next
        }
      }
    } catch (err) {
      console.error("Error submitting assignment to backend:", err);
    }

    // Local fallback
    const res = lmsService.submitAssignment(assignmentId, {
      submissionLink: linkUrl,
      submissionNotes: notes,
      submittedFileName: file?.name || "assignment_project.pdf",
    });

    const localAssignments = lmsService.getAssignments();
    const found = localAssignments.find((a) => String(a.id) === String(assignmentId));
    const title = found?.title || "Practical Project Assignment";
    lmsService.recordStudentActivity(studentId, {
      id: `act-assign-${assignmentId}-${Date.now()}`,
      type: "assignment",
      action: "submitted practical assignment for",
      target: title,
      timestamp: nowIso,
    });

    return res;
  },

  // Assignments
  getAssignments: () => {
    const stored = getStored("assignments", INITIAL_ASSIGNMENTS);
    const filtered = (stored || []).filter((a) => a.courseId !== "course-2");
    return (filtered.length > 0 ? filtered : INITIAL_ASSIGNMENTS).map((a) => {
      if (a.id?.startsWith("a-") && a.status !== "pending") {
        return {
          ...a,
          status: "pending",
          submittedAt: undefined,
          score: undefined,
          feedback: undefined,
        };
      }
      return {
        ...a,
        status: a.status || "pending",
      };
    });
  },
  submitAssignment: (id, submission = {}) => {
    const items = lmsService.getAssignments();
    const index = items.findIndex((a) => a.id === id);
    if (index === -1) return undefined;
    const nowIso = new Date().toISOString();
    items[index] = {
      ...items[index],
      status: "submitted",
      submittedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      submittedAtIso: nowIso,
      ...submission,
    };
    setStored("assignments", items);

    // Record activity milestone
    try {
      const cachedProfile = JSON.parse(localStorage.getItem("om_lms_crm_cached_profile") || "{}");
      const studentUser = JSON.parse(localStorage.getItem("om_lms_student_user") || "{}");
      const targetId = cachedProfile.id || studentUser.id || "";
      lmsService.recordStudentActivity(targetId, {
        id: `act-assign-${id}-${Date.now()}`,
        type: "assignment",
        action: "submitted practical assignment for",
        target: items[index].title || "Practical Assignment",
        timestamp: nowIso,
      });
    } catch (e) {
      console.warn("Could not record assignment activity:", e);
    }

    return items[index];
  },
  getAssignmentById: (id) => {
    const items = lmsService.getAssignments();
    return items.find((a) => a.id === id);
  },
  addAssignment: (assign) => {
    const items = lmsService.getAssignments();
    const newItem = {
      ...assign,
      id: `a-${Date.now()}`,
      totalSubmissions: 0,
      pendingGrading: 0,
      status: assign.status || "pending",
      attachments: assign.attachments || [],
      allowAnyFormat:
        assign.allowAnyFormat !== undefined ? assign.allowAnyFormat : true,
      allowedFormats: assign.allowedFormats || [
        "ANY",
        "PDF",
        "DOC",
        "DOCX",
        "PPT",
        "PPTX",
        "ZIP",
        "MP4",
        "FIGMA",
        "PNG",
        "XLSX",
      ],
      rubric: assign.rubric || [
        {
          id: 1,
          title: "Strategic Approach & Planning",
          maxPoints: Math.round((Number(assign.maxScore) || 100) * 0.3),
        },
        {
          id: 2,
          title: "Execution Quality & Practical Output",
          maxPoints: Math.round((Number(assign.maxScore) || 100) * 0.4),
        },
        {
          id: 3,
          title: "Analysis, Data & Documentation",
          maxPoints: Math.round((Number(assign.maxScore) || 100) * 0.3),
        },
      ],
    };
    setStored("assignments", [newItem, ...items]);
    return newItem;
  },
  updateAssignment: (id, updates) => {
    const items = lmsService.getAssignments();
    const index = items.findIndex((a) => a.id === id);
    if (index === -1) return undefined;
    items[index] = {
      ...items[index],
      ...updates,
      id,
    };
    setStored("assignments", items);
    return items[index];
  },
  deleteAssignment: (id) => {
    const items = lmsService.getAssignments();
    const filtered = items.filter((a) => a.id !== id);
    setStored("assignments", filtered);
    return true;
  },
  // Course Assessments Module (Dynamic combined Tests & Assignments module for curriculum)
  getCourseAssessmentsModule: (courseId) => {
    if (!courseId) return null;
    const quizzes = lmsService
      .getQuizzes()
      .filter((q) => q.courseId === courseId);
    const assignments = lmsService
      .getAssignments()
      .filter((a) => a.courseId === courseId);

    const hasQuizzes = quizzes.length > 0;
    const hasAssignments = assignments.length > 0;

    if (!hasQuizzes && !hasAssignments) {
      return null;
    }

    let moduleName = "Tests & Assignments";
    if (hasQuizzes && !hasAssignments) {
      moduleName = "Tests";
    } else if (!hasQuizzes && hasAssignments) {
      moduleName = "Assignments";
    }

    const quizItems = quizzes.map((q) => ({
      id: q.id,
      quizId: q.id,
      title: q.title,
      type: "quiz",
      moduleName,
      duration: `${q.durationMinutes || 20} mins`,
      totalQuestions: q.totalQuestions || q.questions?.length || 30,
      isCompleted: q.studentStatus === "passed",
      status: q.studentStatus || "pending",
      score: q.studentScore,
      link: `/take-quiz/${q.id}`,
      description:
        q.description ||
        `Assessment examination containing ${q.totalQuestions || q.questions?.length || 30} questions.`,
    }));

    const assignmentItems = assignments.map((a) => ({
      id: a.id,
      assignmentId: a.id,
      title: a.title,
      type: "assignment",
      moduleName,
      duration: a.dueDate ? `Due: ${a.dueDate}` : "Practical Project",
      dueDate: a.dueDate,
      isCompleted: a.status === "submitted" || a.status === "graded",
      status: a.status || "pending",
      score: a.score,
      link: `/take-assignment/${a.id}`,
      description: a.instructions || "Practical assignment submission.",
    }));

    return {
      name: moduleName,
      items: [...quizItems, ...assignmentItems],
      quizzesCount: quizzes.length,
      assignmentsCount: assignments.length,
      isAssessmentModule: true,
    };
  },
  // Students
  getStudents: () => {
    const stored = getStored("students", INITIAL_STUDENTS);
    if (!stored || stored.length === 0 || !stored[0].courseId) {
      setStored("students", INITIAL_STUDENTS);
      return INITIAL_STUDENTS;
    }
    return stored;
  },
  getStudentsByCourse: (courseId) => {
    const students = lmsService.getStudents();
    if (!courseId || courseId === "all") return students;
    return students.filter((s) => s.courseId === courseId);
  },
  updateStudent: (id, updates) => {
    const students = lmsService.getStudents();
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return undefined;
    students[index] = { ...students[index], ...updates };
    setStored("students", students);
    return students[index];
  },
  addStudent: (student) => {
    const students = lmsService.getStudents();
    const newStd = {
      ...student,
      id: `std-${Date.now()}`,
      joinedDate: new Date().toISOString().split("T")[0],
    };
    setStored("students", [newStd, ...students]);
    return newStd;
  },
  // Questions
  getQuestions: () => getStored("questions", INITIAL_QUESTIONS),
  addQuestion: (q) => {
    const questions = lmsService.getQuestions();
    const newQ = { ...q, id: `quest-${Date.now()}` };
    setStored("questions", [newQ, ...questions]);
    return newQ;
  },
  // Discussions
  getDiscussions: () => {
    const stored = getStored("discussions", null);
    if (!stored || stored.length < INITIAL_DISCUSSIONS.length) {
      setStored("discussions", INITIAL_DISCUSSIONS);
      return INITIAL_DISCUSSIONS;
    }

    // Backfill courseId, community, authorHandle, upvotes, and imageUrl if missing
    let modified = false;
    const normalized = stored.map((d) => {
      let item = { ...d };
      const initMatch = INITIAL_DISCUSSIONS.find((init) => init.id === item.id);

      if (!item.courseId) {
        modified = true;
        if (initMatch?.courseId) item.courseId = initMatch.courseId;
        else {
          const t = (item.courseTitle || "").toLowerCase();
          if (t.includes("seo")) item.courseId = "course-8";
          else if (t.includes("ads")) item.courseId = "course-6";
          else if (t.includes("social")) item.courseId = "course-1";
          else if (t.includes("analytics")) item.courseId = "course-5";
          else if (t.includes("wordpress")) item.courseId = "course-7";
          else if (t.includes("design")) item.courseId = "course-4";
          else item.courseId = "course-1";
        }
      }

      if (!item.community) {
        item.community = initMatch?.community || "general-doubts";
        modified = true;
      } else if (item.community.startsWith("r/")) {
        item.community = item.community.replace(/^r\//, "");
        modified = true;
      }
      if (!item.authorHandle) {
        item.authorHandle =
          initMatch?.authorHandle ||
          (item.authorName || "student").toLowerCase().replace(/\s+/g, "_");
        modified = true;
      } else if (item.authorHandle.startsWith("u/")) {
        item.authorHandle = item.authorHandle.replace(/^u\//, "");
        modified = true;
      }
      if (item.upvotes === undefined && item.score === undefined) {
        item.upvotes = initMatch?.upvotes || 12;
        modified = true;
      }
      if (!item.imageUrl && initMatch?.imageUrl) {
        item.imageUrl = initMatch.imageUrl;
        modified = true;
      }

      return item;
    });

    // Ensure newly added initial discussions are present
    const storedIds = new Set(normalized.map((d) => d.id));
    const missing = INITIAL_DISCUSSIONS.filter((d) => !storedIds.has(d.id));
    if (missing.length > 0) {
      const merged = [...normalized, ...missing];
      setStored("discussions", merged);
      return merged;
    }

    if (modified) {
      setStored("discussions", normalized);
    }
    return normalized;
  },
  addDiscussion: (disc) => {
    const items = lmsService.getDiscussions();
    const cleanComm = (disc.community || "general-doubts").replace(/^r\//, "");
    const cleanHandle = (disc.authorHandle || disc.authorName || "student")
      .replace(/^u\//, "")
      .toLowerCase()
      .replace(/\s+/g, "_");

    const newItem = {
      ...disc,
      id: `disc-${Date.now()}`,
      courseId: disc.courseId || "course-1",
      community: cleanComm,
      authorHandle: cleanHandle,
      upvotes: disc.upvotes || 1,
      repliesCount: 0,
      replies: [],
      createdAt: "Just now",
    };
    setStored("discussions", [newItem, ...items]);
    return newItem;
  },
  toggleDiscussionReaction: (discussionId, reactionType) => {
    const items = lmsService.getDiscussions();
    const index = items.findIndex((d) => d.id === discussionId);
    if (index === -1) return null;

    const currentScore = items[index].upvotes ?? items[index].score ?? 0;
    const currentReaction = items[index].userReaction;

    let newReaction = reactionType;
    let newScore = currentScore;

    if (currentReaction === reactionType) {
      // Toggle off
      newReaction = null;
      newScore = reactionType === "up" ? currentScore - 1 : currentScore + 1;
    } else if (currentReaction === "up" && reactionType === "down") {
      newScore = currentScore - 2;
    } else if (currentReaction === "down" && reactionType === "up") {
      newScore = currentScore + 2;
    } else {
      newScore = reactionType === "up" ? currentScore + 1 : currentScore - 1;
    }

    items[index].userReaction = newReaction;
    items[index].upvotes = newScore;
    items[index].score = newScore;
    setStored("discussions", items);
    return items[index];
  },
  addDiscussionReply: (discussionId, reply, parentReplyId = null) => {
    const items = lmsService.getDiscussions();
    const index = items.findIndex((d) => d.id === discussionId);
    if (index === -1) return undefined;
    const newReply = {
      ...reply,
      id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: "Just now",
      likesCount: 0,
      score: 0,
      replies: [],
    };

    if (!parentReplyId) {
      const currentReplies = items[index].replies || [];
      items[index].replies = [...currentReplies, newReply];
    } else {
      const insertIntoParent = (list) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === parentReplyId) {
            list[i].replies = [...(list[i].replies || []), newReply];
            return true;
          }
          if (list[i].replies && list[i].replies.length > 0) {
            const found = insertIntoParent(list[i].replies);
            if (found) return true;
          }
        }
        return false;
      };

      const currentReplies = items[index].replies || [];
      const inserted = insertIntoParent(currentReplies);
      if (!inserted) {
        items[index].replies = [...currentReplies, newReply];
      }
    }

    const countReplies = (list = []) => {
      let count = 0;
      for (const r of list) {
        count += 1;
        if (r.replies && r.replies.length > 0) {
          count += countReplies(r.replies);
        }
      }
      return count;
    };

    items[index].repliesCount = countReplies(items[index].replies);
    setStored("discussions", items);
    return newReply;
  },
  formatRelativeTime: (dateInput) => {
    if (!dateInput) return "Recently";
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return String(dateInput);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      if (diffMs < 0) return "Just now";

      const isDateOnly = typeof dateInput === "string" && !dateInput.includes(":") && !dateInput.includes("T");
      const isSameDay =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      if (isSameDay) {
        if (isDateOnly) return "Today";
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        if (diffMin < 1) return "Just now";
        if (diffMin < 60) return `${diffMin} min ago`;
        if (diffHour === 1) return "1 hour ago";
        if (diffHour < 24) return `${diffHour} hours ago`;
        return "Today";
      }

      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

      if (isYesterday) return "Yesterday";

      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);

      if (diffDay < 7) return `${diffDay} days ago`;
      if (diffDay < 30) {
        const weeks = Math.floor(diffDay / 7);
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      }
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "Recently";
    }
  },

  recordStudentActivity: (studentId, activity) => {
    if (!activity) return null;
    const targetId = studentId || crmService.getSelectedStudentId() || "default";
    const storageKey = `om_lms_student_activities_${targetId}`;
    let existing = [];
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) existing = JSON.parse(raw);
    } catch {}
    if (!Array.isArray(existing)) existing = [];

    const newActivity = {
      id: activity.id || `act-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      studentId: targetId,
      timestamp: activity.timestamp || new Date().toISOString(),
      timeAgo: activity.timeAgo || lmsService.formatRelativeTime(activity.timestamp),
      type: activity.type || "system",
      action: activity.action || "",
      target: activity.target || "",
      user: activity.user || null,
      score: activity.score,
      details: activity.details || null,
    };

    // Deduplicate by target and type before saving
    const filteredExisting = existing.filter((a) => {
      if (newActivity.id && a.id === newActivity.id) return false;
      if (newActivity.target && a.target === newActivity.target && a.type === newActivity.type) return false;
      return true;
    });

    const updated = [newActivity, ...filteredExisting].slice(0, 100);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("om_lms_activity_updated", { detail: newActivity }));
      }
    } catch (e) {
      console.warn("Could not save student activity:", e);
    }
    return newActivity;
  },

  getStudentActivities: ({
    studentId,
    currentUser,
    crmProfile,
    crmAttendance,
    crmBatch,
    courses = [],
    quizzes = [],
    assignments = [],
  } = {}) => {
    const targetId = studentId || crmProfile?.id || currentUser?.admissionId || currentUser?.id || crmService.getSelectedStudentId() || "";
    const studentName = currentUser?.name || crmProfile?.name || "Student";
    const studentAvatar = currentUser?.avatar || crmProfile?.photo || null;

    const activities = [];
    // Deduplication tracker by semantic event key
    const seenEventKeys = new Set();

    // 1. Explicitly recorded real activities in localStorage for this student
    try {
      const storageKey = `om_lms_student_activities_${targetId}`;
      const recorded = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(recorded)) {
        recorded.forEach((act) => {
          if (!act || !act.target) return;
          // Discard mock placeholders or generic titles
          if (act.target.includes("Practical Project Assignment") ||
              act.target.includes("Google Ads Campaign Setup & Quality Score Exam") ||
              act.target.includes("Live Client SEO Audit & Keyword Strategy") ||
              act.target.includes("PMax Strategy Blueprint Assignment") ||
              act.target.includes("Career Roadmap & Goal Setting Worksheet") ||
              act.target.includes("Google Analytics 4 Tracking Implementation")) {
            return;
          }

          let eventKey = act.id;
          if (act.type === "quiz") {
            eventKey = `quiz-${act.quizId || act.target}`;
          } else if (act.type === "assignment" || act.type === "grading") {
            eventKey = `assign-${act.assignmentId || act.target}`;
          } else if (act.type === "completion") {
            eventKey = `unit-${act.unitId || act.target}`;
          }

          if (!seenEventKeys.has(eventKey)) {
            seenEventKeys.add(eventKey);
            activities.push({
              ...act,
              user: act.user || {
                name: studentName,
                avatar: studentAvatar,
                role: "Student",
              },
              timeAgo: act.timestamp ? lmsService.formatRelativeTime(act.timestamp) : (act.timeAgo || "Recently"),
            });
          }
        });
      }
    } catch {}

    // 2. Real Quizzes Completed/Attempted
    let attemptsCache = {};
    try {
      const cacheKey = targetId ? `om_lms_quiz_attempts_cache_${targetId}` : "om_lms_quiz_attempts_cache";
      attemptsCache = JSON.parse(localStorage.getItem(cacheKey) || "{}");
    } catch {}

    const candidateQuizzes = Array.isArray(quizzes)
      ? quizzes.filter((q) => q.numericId || attemptsCache[String(q.id)] || attemptsCache[String(q.numericId)])
      : [];

    candidateQuizzes.forEach((q) => {
      const qKey = String(q.numericId || q.id);
      const attempt = attemptsCache[qKey] || (q.studentStatus && q.studentStatus !== "pending" ? {
        status: q.studentStatus,
        score: q.studentScore,
        completedDate: q.completedDate,
      } : null);

      if (attempt && (attempt.status === "passed" || attempt.status === "failed" || (attempt.score !== null && attempt.score !== undefined))) {
        const eventKey = `quiz-${q.title || qKey}`;
        if (!seenEventKeys.has(eventKey)) {
          seenEventKeys.add(eventKey);
          const isPassed = attempt.status === "passed" || (attempt.score >= (q.passScorePercentage || 75));
          const scoreStr = attempt.score !== null && attempt.score !== undefined ? `${attempt.score}%` : "Passed";
          const timeInput = attempt.completedAtIso || attempt.completedDate;
          const parsedTime = attempt.completedAtIso || (attempt.completedDate ? new Date(attempt.completedDate).toISOString() : new Date().toISOString());
          activities.push({
            id: `act-quiz-${qKey}`,
            quizId: qKey,
            studentId: targetId,
            timestamp: parsedTime,
            timeAgo: lmsService.formatRelativeTime(timeInput || parsedTime),
            type: "quiz",
            action: isPassed ? `passed examination with ${scoreStr} on` : `completed assessment with ${scoreStr} on`,
            target: q.title || "Assessment Quiz",
            score: attempt.score,
            user: {
              name: studentName,
              avatar: studentAvatar,
              role: "Student",
            },
          });
        }
      }
    });

    // 3. Real Assignment Submissions & Gradings
    let submissionsCache = {};
    try {
      const subKey = targetId ? `om_lms_assignment_submissions_${targetId}` : "om_lms_assignment_submissions";
      submissionsCache = JSON.parse(localStorage.getItem(subKey) || "{}");
    } catch {}

    const realBatchAssignments = Array.isArray(assignments)
      ? assignments.filter((a) => a.batchId || submissionsCache[String(a.id)])
      : [];

    realBatchAssignments.forEach((a) => {
      const aKey = String(a.id);
      const cachedSub = submissionsCache[aKey];
      const isRealSub = Boolean(cachedSub) || (a.batchId && (a.status === "submitted" || a.status === "graded" || a.status === "approved"));

      if (isRealSub) {
        const isGraded = a.status === "graded" || a.status === "approved" || Boolean(a.score) || Boolean(a.gradedAt);
        const eventKey = `assign-${a.title || aKey}`;
        if (!seenEventKeys.has(eventKey)) {
          seenEventKeys.add(eventKey);
          const subDate = a.gradedAt || cachedSub?.submittedAt || a.submittedAt || a.submittedAtIso;
          const parsedTime = subDate ? new Date(subDate).toISOString() : new Date().toISOString();

          let actionStr = "submitted practical assignment for";
          if (isGraded) {
            if (a.score !== null && a.score !== undefined) {
              actionStr = `received Grade ${a.score}% on`;
            } else if (a.status === "approved") {
              actionStr = a.feedback ? `received approved evaluation ("${a.feedback}") on` : "received evaluation & approved on";
            } else {
              actionStr = "received Grade / evaluation on";
            }
          }

          activities.push({
            id: `act-assign-${a.id}`,
            assignmentId: a.id,
            studentId: targetId,
            timestamp: parsedTime,
            timeAgo: lmsService.formatRelativeTime(subDate || parsedTime),
            type: isGraded ? "grading" : "assignment",
            action: actionStr,
            target: a.title || "Practical Assignment",
            score: a.score,
            feedback: a.feedback,
            user: {
              name: studentName,
              avatar: studentAvatar,
              role: "Student",
            },
          });
        }
      }
    });

    // 4. Completed Units / Curriculum Lessons
    const units = lmsService.getUnits();
    const courseTitleMap = {};
    (courses && courses.length > 0 ? courses : lmsService.getCourses()).forEach((c) => {
      courseTitleMap[c.id] = c.title;
    });

    units.forEach((u) => {
      if (u.isCompleted && u.completedAt) {
        const courseName = courseTitleMap[u.courseId] || "Course Curriculum";
        const fullTarget = `${u.title} in ${courseName}`;
        const eventKey = `unit-${fullTarget}`;
        if (!seenEventKeys.has(eventKey)) {
          seenEventKeys.add(eventKey);
          const parsedTime = new Date(u.completedAt).toISOString();
          activities.push({
            id: `act-unit-${u.id}`,
            unitId: u.id,
            studentId: targetId,
            timestamp: parsedTime,
            timeAgo: lmsService.formatRelativeTime(u.completedAt),
            type: "completion",
            action: "completed curriculum lesson",
            target: fullTarget,
            user: {
              name: studentName,
              avatar: studentAvatar,
              role: "Student",
            },
          });
        }
      }
    });

    // 5. Attended CRM Lectures (Real present sessions from CRM database)
    const isRealStudentAttendance =
      crmAttendance &&
      Array.isArray(crmAttendance.logs) &&
      crmAttendance.logs.length > 0 &&
      (crmAttendance.studentName !== "Sahil Hasolkar" || studentName.toLowerCase().includes("sahil")) &&
      (String(crmAttendance.studentId) === String(targetId) || crmAttendance.studentName === studentName);

    if (isRealStudentAttendance) {
      const batchName = crmBatch?.name || crmProfile?.batch || "Classroom Session";
      crmAttendance.logs.forEach((log, idx) => {
        if (log.status === "PRESENT") {
          const targetStr = `${log.topic || log.lecture_name || 'Class Session'} (${log.batch_name || batchName})`;
          const eventKey = `lecture-${log.date}-${targetStr}`;
          if (!seenEventKeys.has(eventKey)) {
            seenEventKeys.add(eventKey);
            const parsedTime = log.date ? new Date(log.date).toISOString() : new Date().toISOString();
            activities.push({
              id: `act-att-${log.id || log.lecture_id || log.date || idx}`,
              studentId: targetId,
              timestamp: parsedTime,
              timeAgo: lmsService.formatRelativeTime(log.date || parsedTime),
              type: "lecture",
              action: "attended live classroom session on",
              target: targetStr,
              user: {
                name: studentName,
                avatar: studentAvatar,
                role: "Student",
              },
            });
          }
        }
      });
    }

    // 6. Program Enrollment Milestone
    const isRealProfile =
      crmProfile &&
      (crmProfile.name !== "Sahil Hasolkar" || studentName.toLowerCase().includes("sahil")) &&
      (crmProfile.registrationDate || crmProfile.joiningDate);

    if (isRealProfile) {
      const enrollDate = crmProfile.registrationDate || crmProfile.joiningDate;
      const eventKey = `enroll-${targetId || 'student'}`;
      if (!seenEventKeys.has(eventKey)) {
        seenEventKeys.add(eventKey);
        const parsedTime = new Date(enrollDate).toISOString();
        activities.push({
          id: `act-enroll-${targetId || 'student'}`,
          studentId: targetId,
          timestamp: parsedTime,
          timeAgo: lmsService.formatRelativeTime(enrollDate),
          type: "enrollment",
          action: "enrolled in program",
          target: crmProfile.course || "Digital Marketing & AI Master Program",
          user: {
            name: studentName,
            avatar: studentAvatar,
            role: "Student",
          },
        });
      }
    }

    // Sort by timestamp newest first
    activities.sort((a, b) => {
      const tA = new Date(a.timestamp || 0).getTime();
      const tB = new Date(b.timestamp || 0).getTime();
      return tB - tA;
    });

    return activities;
  },

  // Activities
  getActivities: () => {
    const stored = getStored("activities", []);
    const clean = Array.isArray(stored)
      ? stored.filter(
          (a) =>
            !a.id?.startsWith("act-sahil-") &&
            !a.id?.startsWith("act-peer-") &&
            a.user?.name !== "Sahil Hasolkar",
        )
      : [];
    return clean;
  },
  // Achievements
  getAchievements: () => getStored("achievements", INITIAL_ACHIEVEMENTS),
  // Notes - Backed by MySQL Database Table & Per-Student Local Cache
  getActiveStudentId: (providedId = null) => {
    if (providedId) return String(providedId).replace("std-", "");
    if (typeof window !== "undefined") {
      try {
        const sel = localStorage.getItem("om_lms_selected_student_id");
        if (sel) return String(sel).replace("std-", "");
        const cached = localStorage.getItem("om_lms_crm_cached_profile");
        if (cached) {
          const p = JSON.parse(cached);
          const id = p.id || p.admissionNumber || p.admission_number || p.crmAdmissionId;
          if (id) return String(id).replace("std-", "");
        }
      } catch {}
    }
    return "375";
  },

  getNotes: (studentId = null) => {
    const sId = lmsService.getActiveStudentId(studentId);
    const key = `notes_${sId}`;
    let stored = getStored(key, null);

    if (stored === null) {
      stored = [];
      setStored(key, []);
    }

    // Exclude any residual mock notes
    stored = (stored || []).filter(
      (n) =>
        n &&
        !["note-1", "note-2", "note-3", "note-4", "note-5", "note-6"].includes(
          n.id,
        ),
    );

    return stored.map((n) => ({
      ...n,
      studentId: n.studentId || sId,
      lessonTag: n.lessonTag || n.lessonTitle || "General",
      lessonTitle: n.lessonTitle || n.lessonTag || "General Lesson",
      text: n.text || n.content || "",
      content: n.content || n.text || "",
      date: n.date || n.createdAt || "Recent",
      createdAt: n.createdAt || n.date || "Recent",
    }));
  },

  fetchStudentNotes: async (studentId = null, courseId = null) => {
    const sId = lmsService.getActiveStudentId(studentId);
    try {
      let url = `${CRM_BACKEND_API}/lms/notes/?student_id=${encodeURIComponent(sId)}`;
      if (courseId && courseId !== "all") {
        url += `&course_id=${encodeURIComponent(courseId)}`;
      }
      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.success && Array.isArray(data.notes)) {
          const normalized = data.notes.map((n) => ({
            ...n,
            studentId: n.studentId || sId,
            lessonTag: n.lessonTag || n.lessonTitle || "General",
            lessonTitle: n.lessonTitle || n.lessonTag || "General Lesson",
            text: n.text || n.content || "",
            content: n.content || n.text || "",
            date: n.date || n.createdAt || "Recent",
            createdAt: n.createdAt || n.date || "Recent",
          }));
          const key = `notes_${sId}`;
          setStored(key, normalized);
          if (typeof window !== "undefined") {
            try {
              window.dispatchEvent(new Event("lms_notes_changed"));
            } catch (e) {}
          }
          return normalized;
        }
      }
    } catch (err) {
      console.warn("fetchStudentNotes backend error:", err);
    }
    return lmsService.getNotes(sId);
  },

  addNote: (note) => {
    const sId = lmsService.getActiveStudentId(note.studentId || note.student_id);
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const localId = `local-${Date.now()}`;
    const newNote = {
      id: note.id || localId,
      studentId: sId,
      courseId: note.courseId || note.course_id || "",
      courseTitle: note.courseTitle || note.course_title || "",
      lessonTitle: note.lessonTitle || note.lessonTag || "General Lesson",
      lessonTag: note.lessonTag || note.lessonTitle || "General",
      category: note.category || "General",
      content: note.content || note.text || "",
      text: note.text || note.content || "",
      createdAt: note.createdAt || note.date || formattedDate,
      date: note.date || note.createdAt || "Today",
      ...note,
    };

    if (!newNote.content && newNote.text) newNote.content = newNote.text;
    if (!newNote.text && newNote.content) newNote.text = newNote.content;
    if (!newNote.lessonTitle && newNote.lessonTag) newNote.lessonTitle = newNote.lessonTag;
    if (!newNote.lessonTag && newNote.lessonTitle) newNote.lessonTag = newNote.lessonTitle;
    if (!newNote.createdAt && newNote.date) newNote.createdAt = newNote.date;
    if (!newNote.date && newNote.createdAt) newNote.date = newNote.createdAt;

    const currentNotes = lmsService.getNotes(sId);
    const updated = [newNote, ...currentNotes];
    setStored(`notes_${sId}`, updated);

    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(new Event("lms_notes_changed"));
      } catch (e) {}
    }

    // Persist to backend database asynchronously
    fetch(`${CRM_BACKEND_API}/lms/notes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: sId,
        student_name: note.studentName || note.student_name || "",
        course_id: newNote.courseId,
        course_title: newNote.courseTitle,
        lesson_title: newNote.lessonTitle,
        lesson_tag: newNote.lessonTag,
        category: newNote.category,
        content: newNote.content,
        timestamp: note.timestamp || "",
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.success && data.note) {
          const serverNote = {
            ...newNote,
            id: data.note.id,
            dbId: data.note.dbId,
          };
          const fresh = lmsService
            .getNotes(sId)
            .map((n) => (n.id === localId ? serverNote : n));
          setStored(`notes_${sId}`, fresh);
          if (typeof window !== "undefined") {
            try {
              window.dispatchEvent(new Event("lms_notes_changed"));
            } catch (e) {}
          }
        }
      })
      .catch((err) => {
        console.warn("Backend note save error:", err);
      });

    return newNote;
  },

  deleteNote: (id, studentId = null) => {
    const sId = lmsService.getActiveStudentId(studentId);
    const currentNotes = lmsService.getNotes(sId);
    const filtered = currentNotes.filter((n) => n.id !== id);
    setStored(`notes_${sId}`, filtered);

    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(new Event("lms_notes_changed"));
      } catch (e) {}
    }

    // Delete from backend database
    fetch(
      `${CRM_BACKEND_API}/lms/notes/${encodeURIComponent(id)}/?student_id=${encodeURIComponent(sId)}`,
      { method: "DELETE" },
    ).catch((err) => {
      console.warn("Backend note delete error:", err);
    });

    return filtered;
  },
  // Reviews  // Reviews
  getReviews: () => getStored("reviews", INITIAL_REVIEWS),
};
