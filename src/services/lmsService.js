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
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:8000/api"
    : typeof window !== "undefined" &&
        (window.location.hostname.includes("operatingmedia.org") ||
          window.location.hostname.includes("operatingmedia.com"))
      ? "https://operatingmedia.org/api"
      : "https://crm.dmsoi.org/api");
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
      "http://localhost:8000/api",
      "https://crm.dmsoi.org/api",
      "https://operatingmedia.org/api",
    ].filter((val, idx, self) => self.indexOf(val) === idx);

    for (const base of endpoints) {
      try {
        const query = studentId
          ? `?student_id=${encodeURIComponent(studentId)}`
          : "";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
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
        // Ignore and try next endpoint or fallback
      }
    }

    // Resilient Fallback: If backend is unreachable or offline, resolve using local units
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
      locked: false,
      error: "Unable to load video stream.",
    };
  },
  // Courses (Total 7 active courses)
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
        if (!list[existingIdx].perQuestionTimerSeconds) {
          list[existingIdx].perQuestionTimerSeconds = 45;
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
      perQuestionTimerSeconds: quiz.perQuestionTimerSeconds || 45,
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

    // Backfill courseId if any discussion lacks it
    let modified = false;
    const normalized = stored.map((d) => {
      if (!d.courseId) {
        modified = true;
        const match = INITIAL_DISCUSSIONS.find((init) => init.id === d.id);
        if (match?.courseId) return { ...d, courseId: match.courseId };
        const t = (d.courseTitle || "").toLowerCase();
        if (t.includes("seo")) return { ...d, courseId: "course-8" };
        if (t.includes("ads")) return { ...d, courseId: "course-6" };
        if (t.includes("social")) return { ...d, courseId: "course-1" };
        if (t.includes("analytics")) return { ...d, courseId: "course-5" };
        if (t.includes("wordpress")) return { ...d, courseId: "course-7" };
        if (t.includes("design")) return { ...d, courseId: "course-4" };
        if (
          t.includes("advanced") ||
          t.includes("growth") ||
          t.includes("specialized")
        )
          return { ...d, courseId: "course-3" };
      }
      return d;
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
    const newItem = {
      ...disc,
      id: `disc-${Date.now()}`,
      courseId: disc.courseId || "course-1",
      repliesCount: 0,
      replies: [],
      createdAt: "Just now",
    };
    setStored("discussions", [newItem, ...items]);
    return newItem;
  },
  addDiscussionReply: (discussionId, reply, parentReplyId = null) => {
    const items = lmsService.getDiscussions();
    const index = items.findIndex((d) => d.id === discussionId);
    if (index === -1) return undefined;
    const newReply = {
      ...reply,
      id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: "Just now",
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
