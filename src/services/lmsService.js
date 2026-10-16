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

    const endpoints = [
      CRM_BACKEND_API,
      CRM_BACKEND_API.includes("operatingmedia.org")
        ? "https://crm.dmsoi.org/api"
        : "https://operatingmedia.org/api",
    ].filter((val, idx, self) => self.indexOf(val) === idx);

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
    const endpoints = [
      CRM_BACKEND_API,
      CRM_BACKEND_API.includes("operatingmedia.org")
        ? "https://crm.dmsoi.org/api"
        : "https://operatingmedia.org/api",
    ].filter((val, idx, self) => self.indexOf(val) === idx);

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

    // Include course assessments (quizzes and assignments) so progress is 100% unified
    const assess = lmsService.getCourseAssessmentsModule(courseId);
    const assessItems = assess?.items || [];
    const completedAssess = assessItems.filter((i) => i.isCompleted).length;

    const totalActivities = totalLessons + assessItems.length;
    const completedActivities = completedCount + completedAssess;
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
  // Quizzes
  getQuizzes: () => {
    const stored = getStored("quizzes", null);
    let list = stored ? [...stored] : [...IMPORTED_LMS_QUIZZES];

    // Explicitly filter out any old sample / dummy quizzes
    const SAMPLE_QUIZ_IDS = new Set([
      "q-1",
      "q-2",
      "q-3",
      "q-4",
      "q-5",
      "q-6",
      "q-7",
      "q-8",
    ]);
    const SAMPLE_QUIZ_TITLES = new Set([
      "Digital Marketing Aptitude Quiz!",
      "SEO Fundamentals & Keyword Strategy Assessment",
      "WordPress Core Architecture & Elementor Layout Test",
      "GA4 Event Tracking & Funnel Analysis Quiz",
      "Google Ads Search & Bidding Strategies Quiz",
      "Social Media Growth Tactics & Viral Algorithms Quiz",
      "Graphic Design Principles & Typography Assessment",
      "Advanced Digital Marketing Strategy Comprehensive Exam",
    ]);

    const deletedIds = new Set(getStored("deleted_quiz_ids", []));

    list = list.filter(
      (q) =>
        !SAMPLE_QUIZ_IDS.has(q.id) &&
        !SAMPLE_QUIZ_TITLES.has(q.title) &&
        !deletedIds.has(q.id),
    );

    // Ensure given quizzes from d:\operating-media\lms-quiz are present only if NOT deleted by user
    IMPORTED_LMS_QUIZZES.forEach((imported) => {
      if (deletedIds.has(imported.id)) return; // Never resurrect user-deleted quiz

      const existingIdx = list.findIndex((q) => q.id === imported.id);
      if (existingIdx === -1) {
        list.push(imported);
      } else {
        list[existingIdx].courseId = imported.courseId;
        list[existingIdx].courseTitle = imported.courseTitle;
        list[existingIdx].category = imported.category;
        if (
          !list[existingIdx].questions ||
          list[existingIdx].questions.length === 0
        ) {
          list[existingIdx].questions = imported.questions;
        }
        if (
          !list[existingIdx].perQuestionTimerSeconds ||
          list[existingIdx].perQuestionTimerSeconds === 45
        ) {
          list[existingIdx].perQuestionTimerSeconds = 60;
        }
      }
    });

    list = list.filter(
      (q) => q.courseId !== "course-2" && !deletedIds.has(q.id),
    );
    setStored("quizzes", list);
    return list;
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
  submitQuizAttempt: (quizId, score = 90, resultsDetail = null) => {
    const quizzes = lmsService.getQuizzes();
    const index = quizzes.findIndex((q) => q.id === quizId);
    if (index === -1) return undefined;
    const isPassed = score >= (quizzes[index].passScorePercentage || 75);
    quizzes[index] = {
      ...quizzes[index],
      studentStatus: isPassed ? "passed" : "failed",
      studentScore: score,
      completedDate: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      timeSpent:
        resultsDetail?.timeSpent ||
        `${Math.max(5, (quizzes[index].durationMinutes || 20) - 5)} mins`,
      attemptsCount: (quizzes[index].attemptsCount || 0) + 1,
      lastAttemptResults: resultsDetail || null,
    };
    setStored("quizzes", quizzes);
    return quizzes[index];
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
      const endpoints = [
        CRM_BACKEND_API,
        CRM_BACKEND_API.includes("operatingmedia.org")
          ? "https://crm.dmsoi.org/api"
          : "https://operatingmedia.org/api",
      ].filter((val, idx, self) => self.indexOf(val) === idx);

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

  submitStudentBatchAssignment: async (assignmentId, studentId, { file, linkUrl = "", notes = "" }) => {
    try {
      const formData = new FormData();
      formData.append("student_id", String(studentId));
      if (file && typeof file === "object") {
        formData.append("file", file);
      }
      formData.append("link_url", linkUrl || "");
      formData.append("notes", notes || "");

      const endpoints = [
        CRM_BACKEND_API,
        CRM_BACKEND_API.includes("operatingmedia.org")
          ? "https://crm.dmsoi.org/api"
          : "https://operatingmedia.org/api",
      ].filter((val, idx, self) => self.indexOf(val) === idx);

      for (const base of endpoints) {
        try {
          const res = await fetch(`${base}/lms/assignments/${assignmentId}/submit/`, {
            method: "POST",
            body: formData,
          });
          if (res.ok) {
            const json = await res.json();
            if (json && json.success) {
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
    return lmsService.submitAssignment(assignmentId, {
      submissionLink: linkUrl,
      submissionNotes: notes,
      submittedFileName: file?.name || "assignment_project.pdf",
    });
  },

  // Assignments
  getAssignments: () => {
    const stored = getStored("assignments", INITIAL_ASSIGNMENTS);
    const filtered = (stored || []).filter((a) => a.courseId !== "course-2");
    if (!filtered || filtered.length < 18 || !filtered.some((a) => a.status)) {
      setStored("assignments", INITIAL_ASSIGNMENTS);
      return INITIAL_ASSIGNMENTS;
    }
    return filtered.map((a) => ({
      ...a,
      status: a.status || "pending",
    }));
  },
  submitAssignment: (id, submission = {}) => {
    const items = lmsService.getAssignments();
    const index = items.findIndex((a) => a.id === id);
    if (index === -1) return undefined;
    items[index] = {
      ...items[index],
      status: "submitted",
      submittedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      ...submission,
    };
    setStored("assignments", items);
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
  // Activities
  getActivities: () => {
    const stored = getStored("activities", null);
    const hasSahil =
      stored &&
      stored.some(
        (a) =>
          a.studentId === "std-375" ||
          a.id?.startsWith("act-sahil-") ||
          a.user?.name === "Sahil Hasolkar",
      );
    const hasOldFaculty =
      stored &&
      stored.some(
        (a) =>
          a.user?.name === "Harsh Pareek" ||
          a.user?.name === "Vikram Malhotra" ||
          a.user?.name === "Hiteshpuri Goswami",
      );
    if (
      !stored ||
      !hasSahil ||
      hasOldFaculty ||
      stored.length < INITIAL_ACTIVITIES.length
    ) {
      setStored("activities", INITIAL_ACTIVITIES);
      return INITIAL_ACTIVITIES;
    }
    return stored;
  },
  // Achievements
  getAchievements: () => getStored("achievements", INITIAL_ACHIEVEMENTS),
  // Notes
  getNotes: () => {
    const stored = getStored("notes", INITIAL_NOTES);
    if (!stored || stored.length < INITIAL_NOTES.length) {
      setStored("notes", INITIAL_NOTES);
      return INITIAL_NOTES;
    }
    return stored;
  },
  addNote: (note) => {
    const notes = lmsService.getNotes();
    const newNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setStored("notes", [newNote, ...notes]);
    return newNote;
  },
  deleteNote: (id) => {
    const notes = lmsService.getNotes();
    const filtered = notes.filter((n) => n.id !== id);
    setStored("notes", filtered);
    return filtered;
  },
  // Reviews
  getReviews: () => getStored("reviews", INITIAL_REVIEWS),
};
