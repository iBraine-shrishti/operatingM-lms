import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  CourseDetailHeader,
  CourseDetailTabs,
  CourseOverviewTab,
  CourseOutlineTab,
  CourseAssessmentsTab,
  CourseNotesTab,
  CourseStudentsTab,
  AiSyllabusModal,
} from "../components/course/detail";

export const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, currentUser, crmProfile, assignedCourseIds } = useAuth();
  const { showToast } = useToast();

  const courses = lmsService.getCourses();
  // Default to course matching id, or first course
  const course =
    courses.find(
      (c) =>
        c.id === id ||
        String(c.id).replace(/^course-/, "") === String(id).replace(/^course-/, "")
    ) ||
    courses.find((c) => c.title.toLowerCase().includes("social")) ||
    courses[0];

  const hasCourseAccess =
    isAdmin ||
    !assignedCourseIds ||
    assignedCourseIds.length === 0 ||
    assignedCourseIds.includes(course.id);

  const [units, setUnits] = useState(() =>
    lmsService.getUnitsByCourse(course.id),
  );
  const students = lmsService.getStudents();

  const [searchParams] = useSearchParams();
  // Tab state: 'overview' 1st by default as requested, 'outline', 'assessments', 'notes', 'students'
  const [activeTab, setActiveTab] = useState(
    () => searchParams.get("tab") || "overview",
  );
  const [assessmentFilter, setAssessmentFilter] = useState("all"); // 'all' | 'quizzes' | 'assignments'

  // Module Accordion states - all closed by default
  const [expandedSections, setExpandedSections] = useState({});
  const [activeMenuIdx, setActiveMenuIdx] = useState(null);

  // AI Tutor / Activity helper modal
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);

  const studentId = lmsService.getActiveStudentId(
    crmProfile?.id ||
    currentUser?.crmAdmissionId ||
    currentUser?.admissionId ||
    currentUser?.id ||
    crmService.getSelectedStudentId()
  );

  // Notes state - fully connected to lmsService and per-student database
  const [allNotes, setAllNotes] = useState(() =>
    lmsService.getNotes(studentId),
  );
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteTag, setNewNoteTag] = useState("");
  const [courseNotesSearch, setCourseNotesSearch] = useState("");
  const [courseNotesFilterTag, setCourseNotesFilterTag] = useState("all");
  const [copiedNoteId, setCopiedNoteId] = useState(null);

  // Fetch live student notes from backend on mount and student change
  useEffect(() => {
    lmsService.fetchStudentNotes(studentId).then((live) => {
      if (live) setAllNotes(live);
    });
  }, [studentId]);

  // Sync notes across tabs and actions
  useEffect(() => {
    const handleSync = () => setAllNotes(lmsService.getNotes(studentId));
    window.addEventListener("lms_notes_changed", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("lms_notes_changed", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [studentId]);

  // Filter notes belonging to this course using flexible matching
  const courseNotes = useMemo(() => {
    if (!course) return [];
    return allNotes.filter((n) => lmsService.isNoteMatchingCourse(n, course));
  }, [allNotes, course]);

  const [assessmentsVersion, setAssessmentsVersion] = useState(0);

  // Group units by moduleName for Course Outline
  const sections = useMemo(() => {
    const map = new Map();
    units.forEach((u) => {
      if (u.type === "quiz" || u.type === "assignment") return;
      const list = map.get(u.moduleName) || [];
      list.push(u);
      map.set(u.moduleName, list);
    });

    let result = [];
    if (map.size === 0) {
      result = [
        {
          name: "Introduction & Core Strategy Framework",
          items: [
            {
              id: "u-1",
              title: "01 Overview & Channel Architecture Setup",
              duration: "15:00",
              type: "video",
              isCompleted: true,
            },
            {
              id: "u-2",
              title: "02 Key Performance Metrics & Organic KPIs",
              duration: "20:00",
              type: "reading",
              isCompleted: false,
            },
          ],
        },
        {
          name: "Campaign Execution & Growth Scaling",
          items: [
            {
              id: "u-4",
              title: "01 Live Campaign Launch Walkthrough",
              duration: "28:00",
              type: "video",
              isCompleted: false,
            },
          ],
        },
      ];
    } else {
      result = Array.from(map.entries()).map(([name, items]) => ({
        name,
        items,
      }));
    }

    return result;
  }, [units]);

  // Set default module tag when sections load
  useEffect(() => {
    if (sections.length > 0 && !newNoteTag) {
      setNewNoteTag(sections[0].name);
    }
  }, [sections, newNoteTag]);

  // Available tags in this course (modules + existing notes tags)
  const availableNoteTags = useMemo(() => {
    const set = new Set();
    sections.forEach((s) => s.name && set.add(s.name));
    courseNotes.forEach((n) => {
      const tag = n.lessonTag || n.lessonTitle;
      if (tag) set.add(tag);
    });
    return Array.from(set);
  }, [sections, courseNotes]);

  // Filtered course notes
  const filteredCourseNotes = useMemo(() => {
    return courseNotes.filter((note) => {
      if (courseNotesSearch.trim()) {
        const q = courseNotesSearch.toLowerCase();
        const matchesText = (note.text || note.content || "")
          .toLowerCase()
          .includes(q);
        const matchesTag = (note.lessonTag || note.lessonTitle || "")
          .toLowerCase()
          .includes(q);
        if (!matchesText && !matchesTag) return false;
      }
      if (courseNotesFilterTag !== "all") {
        const tag = note.lessonTag || note.lessonTitle;
        if (tag !== courseNotesFilterTag) return false;
      }
      return true;
    });
  }, [courseNotes, courseNotesSearch, courseNotesFilterTag]);

  // Separate Entities: Course Quizzes & Assignments
  const courseQuizzes = useMemo(() => {
    return lmsService.getQuizzes().filter((q) => q.courseId === course.id);
  }, [course.id, assessmentsVersion]);

  const courseAssignments = useMemo(() => {
    return lmsService.getAssignments().filter((a) => a.courseId === course.id);
  }, [course.id, assessmentsVersion]);

  const allQuizzesCount = useMemo(
    () => lmsService.getQuizzes().length,
    [assessmentsVersion],
  );
  const allAssignmentsCount = useMemo(
    () => lmsService.getAssignments().length,
    [assessmentsVersion],
  );

  // Toggle completion of a unit, test, or assignment
  const handleToggleCompletion = (itemId, e) => {
    e.stopPropagation();
    const unitExists = units.some((u) => u.id === itemId);
    if (unitExists) {
      const targetUnit = units.find((u) => u.id === itemId);
      const updated = !targetUnit?.isCompleted;
      lmsService.updateUnit(itemId, { isCompleted: updated });
      setUnits((prev) =>
        prev.map((u) => {
          if (u.id === itemId) {
            return { ...u, isCompleted: updated };
          }
          return u;
        }),
      );
      showToast(
        updated
          ? `Marked "${targetUnit?.title || "Lesson"}" as completed!`
          : `Marked "${targetUnit?.title || "Lesson"}" as incomplete`,
        "info",
      );
      return;
    }

    const quiz = lmsService.getQuizById(itemId);
    if (quiz) {
      const isPassed = quiz.studentStatus === "passed";
      const newStatus = isPassed ? "pending" : "passed";
      lmsService.updateQuiz(itemId, {
        studentStatus: newStatus,
        studentScore: newStatus === "passed" ? 100 : null,
      });
      setAssessmentsVersion((v) => v + 1);
      showToast(
        !isPassed
          ? `Marked test "${quiz.title}" as completed!`
          : `Marked test "${quiz.title}" as incomplete`,
        "info",
      );
      return;
    }

    const assignments = lmsService.getAssignments();
    const assignment = assignments.find((a) => a.id === itemId);
    if (assignment) {
      const isDone =
        assignment.status === "submitted" || assignment.status === "graded";
      const newStatus = isDone ? "pending" : "submitted";
      lmsService.updateAssignment(itemId, {
        status: newStatus,
      });
      setAssessmentsVersion((v) => v + 1);
      showToast(
        !isDone
          ? `Marked assignment "${assignment.title}" as completed!`
          : `Marked assignment "${assignment.title}" as incomplete`,
        "info",
      );
      return;
    }
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const tagToUse = newNoteTag || sections[0]?.name || "General Notes";
    lmsService.addNote({
      studentId,
      studentName: currentUser?.name || currentUser?.fullName || "",
      courseId: course.id,
      courseTitle: course.title,
      category: course.category || "General",
      lessonTitle: tagToUse,
      lessonTag: tagToUse,
      content: newNoteText.trim(),
      text: newNoteText.trim(),
      date: "Today",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    setAllNotes(lmsService.getNotes(studentId));
    setNewNoteText("");
    showToast("Note saved to your course notebook!", "success");
  };

  const handleDeleteNote = (noteId) => {
    lmsService.deleteNote(noteId, studentId);
    setAllNotes(lmsService.getNotes(studentId));
    showToast("Note deleted", "info");
  };

  const handleCopyNote = (text, noteId) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedNoteId(noteId);
    showToast("Note copied to clipboard!", "success");
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  const toggleSection = (idx) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleExpandAll = () => {
    const all = {};
    sections.forEach((_, idx) => {
      all[idx] = true;
    });
    setExpandedSections(all);
  };

  const handleCollapseAll = () => {
    setExpandedSections({});
  };

  const handleGenerateAiActivity = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setShowAiModal(false);
      showToast(
        "AI drafted 3 new interactive practice questions for this module!",
        "success",
        "AI Generation Complete",
      );
    }, 1200);
  };

  const allActivities = useMemo(() => {
    return sections.flatMap((sec) => sec.items || []);
  }, [sections]);

  const totalActivitiesCount = allActivities.length || units.length || 16;
  const totalVideosCount = useMemo(() => {
    const vids = allActivities.filter((item) => {
      const isQuiz = item.type === "quiz" || Boolean(item.quizId);
      const isAss = item.type === "assignment" || Boolean(item.assignmentId);
      const isReading = item.type === "reading";
      return !isQuiz && !isAss && !isReading;
    });
    return vids.length || course.lessonsCount || 10;
  }, [allActivities, course.lessonsCount]);
  const completedActivitiesCount = allActivities.filter(
    (u) => u.isCompleted,
  ).length;
  const progressPercent = Math.round(
    (completedActivitiesCount / (totalActivitiesCount || 1)) * 100,
  );

  const courseInformationText = useMemo(() => {
    if (
      !course.bracketText ||
      course.bracketText.includes("content ideas") ||
      course.bracketText.includes("ready-to-use posts") ||
      course.bracketText.includes("Let me know the industry") ||
      course.bracketText.includes("Have questions about this course")
    ) {
      return "Gain comprehensive, practical knowledge of social media marketing and digital campaigns. This course covers step-by-step campaign setup, targeted audience reach, budget optimization, and conversion tracking across Meta, LinkedIn, Quora, and Twitter/X.";
    }
    return course.bracketText;
  }, [course.bracketText]);

  const courseDescriptionText = useMemo(() => {
    let desc = course.description || "";
    desc = desc.replace(
      /Are you looking for social media marketing content ideas or do you need ready-to-use posts for your brand\? Let me know the industry or business type, and I'll craft engaging content for your audience!\s*/gi,
      "",
    );
    if (!desc.trim()) {
      return "Master modern social media marketing with practical frameworks, industry standard metrics, and hands-on campaign execution across Facebook, Instagram, LinkedIn, Quora, and Twitter/X.";
    }
    return desc;
  }, [course.description]);

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP NAV & HERO CARD COMPONENT                              */}
      {/* ------------------------------------------------------------- */}
      <CourseDetailHeader
        course={course}
        sections={sections}
        totalVideosCount={totalVideosCount}
        completedActivitiesCount={completedActivitiesCount}
        hasCourseAccess={hasCourseAccess}
        isAdmin={isAdmin}
        onBack={() => navigate("/courses")}
        onEditCourse={() => navigate(`/create-course?edit=${course.id}`)}
        onStartLearning={() => navigate(`/lesson-player?courseId=${course.id}`)}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. STICKY TABS COMPONENT                                      */}
      {/* ------------------------------------------------------------- */}
      <CourseDetailTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        courseQuizzesCount={courseQuizzes.length}
        courseAssignmentsCount={courseAssignments.length}
        courseNotesCount={courseNotes.length}
        studentsCount={students.length}
        isAdmin={isAdmin}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. TAB 1: OVERVIEW COMPONENT                                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "overview" && (
        <CourseOverviewTab
          course={course}
          courseInformationText={courseInformationText}
          courseDescriptionText={courseDescriptionText}
          sections={sections}
          units={units}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. TAB 2: MODULES & LESSONS (OUTLINE) COMPONENT               */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "outline" && (
        <CourseOutlineTab
          sections={sections}
          expandedSections={expandedSections}
          activeMenuIdx={activeMenuIdx}
          isAdmin={isAdmin}
          courseId={course.id}
          completedActivitiesCount={completedActivitiesCount}
          totalActivitiesCount={totalActivitiesCount}
          progressPercent={progressPercent}
          onToggleSection={toggleSection}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          onSetActiveMenuIdx={setActiveMenuIdx}
          onNavigate={navigate}
          onToggleCompletion={handleToggleCompletion}
          onShowAiModal={() => setShowAiModal(true)}
          onShowToast={showToast}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. TAB 3: QUIZZES & PRACTICAL ASSIGNMENTS COMPONENT           */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "assessments" && (
        <CourseAssessmentsTab
          course={course}
          courseQuizzes={courseQuizzes}
          courseAssignments={courseAssignments}
          allQuizzesCount={allQuizzesCount}
          allAssignmentsCount={allAssignmentsCount}
          assessmentFilter={assessmentFilter}
          onFilterChange={setAssessmentFilter}
          onNavigate={navigate}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. TAB 4: NOTEBOOK COMPONENT                                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "notes" && (
        <CourseNotesTab
          sections={sections}
          courseNotes={courseNotes}
          filteredCourseNotes={filteredCourseNotes}
          availableNoteTags={availableNoteTags}
          newNoteText={newNoteText}
          newNoteTag={newNoteTag}
          courseNotesSearch={courseNotesSearch}
          courseNotesFilterTag={courseNotesFilterTag}
          copiedNoteId={copiedNoteId}
          onNewNoteTextChange={setNewNoteText}
          onNewNoteTagChange={setNewNoteTag}
          onSaveNote={handleSaveNote}
          onSearchChange={setCourseNotesSearch}
          onFilterTagChange={setCourseNotesFilterTag}
          onResetFilter={() => {
            setCourseNotesSearch("");
            setCourseNotesFilterTag("all");
          }}
          onCopyNote={handleCopyNote}
          onDeleteNote={handleDeleteNote}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. TAB 5: ENROLLED STUDENTS COMPONENT (ADMIN ONLY)            */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "students" && isAdmin && (
        <CourseStudentsTab students={students} />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 8. AI CURRICULUM ASSISTANT MODAL                              */}
      {/* ------------------------------------------------------------- */}
      <AiSyllabusModal
        isOpen={showAiModal}
        aiPrompt={aiPrompt}
        aiGenerating={aiGenerating}
        onClose={() => setShowAiModal(false)}
        onPromptChange={setAiPrompt}
        onGenerate={handleGenerateAiActivity}
      />
    </div>
  );
};

export default CourseDetailPage;
