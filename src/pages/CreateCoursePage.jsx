import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Upload,
  Layers,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  X,
  Music,
  Film,
  FileText,
  Code,
  CheckSquare,
  CircleDot,
  ArrowUpDown,
  Grid2x2,
  SquareChevronDown,
  AlignLeft,
  BookOpen,
  FolderPlus,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Palette,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  FileUp,
  BarChart2,
} from "lucide-react";
import { lmsService } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import { QuizManagementDetailFlow } from "../components/admin/QuizManagementDetailFlow";
import { PublishSuccessModal } from "../components/common/PublishSuccessModal";
// Custom reusable toggle component matching the screenshot layout and theme
const SwitchToggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${checked ? "bg-amber-500" : "bg-slate-300"}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-6" : "translate-x-0"}`}
    />
  </button>
);
export const CreateCoursePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id: routeCourseId } = useParams();
  const editCourseId = searchParams.get("edit") || searchParams.get("id") || routeCourseId;
  const isEditing = Boolean(editCourseId);
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const modalFileInputRef = useRef(null);
  const mediaFileInputRef = useRef(null);
  // 4 Process Steps (excluding component step)
  const [currentStep, setCurrentStep] = useState(1);
  const [managingQuizModal, setManagingQuizModal] = useState(null);

  // Step 4 Publish Confirmation Modal State
  const [showPublishSuccessModal, setShowPublishSuccessModal] = useState(false);
  const [publishedCourseSummary, setPublishedCourseSummary] = useState(null);
  // -------------------------------------------------------------
  // STEP 1 STATE: CREATE COURSE (Start building a course)
  // -------------------------------------------------------------
  const [courseCategory, setCourseCategory] = useState("Digital Marketing");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseShortAbout, setCourseShortAbout] = useState("");
  const [courseThumbnail, setCourseThumbnail] = useState(
    "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&auto=format&fit=crop&q=80",
  );
  const [courseVideoUrl, setCourseVideoUrl] = useState("");
  const [courseDetailedDescription, setCourseDetailedDescription] =
    useState("");
  const [courseDuration, setCourseDuration] = useState("Unlimited Duration");
  const [maxSeats, setMaxSeats] = useState(9999);
  const [courseStartDate, setCourseStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [autoEvaluation, setAutoEvaluation] = useState(false);
  // Image Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState(courseThumbnail);
  // Image file upload processor
  const handleProcessImageFile = (file) => {
    if (!file.type.startsWith("image/")) {
      showToast(
        "Please select a valid image file (PNG, JPG, WEBP, SVG)",
        "error",
        "Invalid File",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      setCourseThumbnail(result);
      setCustomImageUrl(result);
      setIsImageModalOpen(false);
      showToast(
        "Course thumbnail uploaded successfully from your computer!",
        "success",
        "Thumbnail Uploaded",
      );
    };
    reader.onerror = () => {
      showToast("Failed to read image file. Please try again.", "error");
    };
    reader.readAsDataURL(file);
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessImageFile(file);
    }
    e.target.value = "";
  };
  // -------------------------------------------------------------
  // STEP 2 STATE: SETTINGS (Advance settings)
  // -------------------------------------------------------------
  const [prerequisiteCourse, setPrerequisiteCourse] = useState("");
  const [locksUnitQuiz, setLocksUnitQuiz] = useState(false);
  const [isOfflineCourse, setIsOfflineCourse] = useState(false);
  const [dripFeed, setDripFeed] = useState(false);
  const [courseCertificate, setCourseCertificate] = useState(true);
  const [courseBadge, setCourseBadge] = useState(true);
  const [courseRetakes, setCourseRetakes] = useState(0);
  const [courseInstructions, setCourseInstructions] = useState("");
  const [courseCompletionMessage, setCourseCompletionMessage] = useState("");
  // -------------------------------------------------------------
  // STEP 3 STATE: SET CURRICULUM (Builder & Screeshots Flow)
  // -------------------------------------------------------------
  const [curriculumMode, setCurriculumMode] = useState("build");
  const [modules, setModules] = useState([
    {
      id: "mod-1",
      name: "Module 1: Foundations & Core Concepts",
      description:
        "Foundations of marketing architecture and crawler operations",
      items: [
        {
          id: "u-1",
          title: "1.1 Industry Overview & Architecture",
          type: "unit",
          subType: "video",
          duration: "15:00",
        },
        {
          id: "u-2",
          title: "1.2 Core Setup & Best Practices",
          type: "unit",
          subType: "video",
          duration: "20:00",
        },
        {
          id: "q-1",
          title: "Assessment Quiz 1: SEO Mechanics",
          type: "quiz",
          subType: "simple",
          duration: "15:00",
          marks: 20,
        },
        {
          id: "a-1",
          title: "Practical Audit Assignment 1",
          type: "assignment",
          subType: "simple",
          duration: "7 Days",
          marks: 100,
        },
      ],
    },
  ]);
  // Active sub-screen in Step 3 Curriculum Builder
  const [curriculumView, setCurriculumView] = useState("overview");
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  // SECTION Form State
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionDesc, setNewSectionDesc] = useState("");
  // UNIT Form State (AFTER-ANY-UNIT-CLICKED.png)
  const [activeUnitType, setActiveUnitType] = useState("video");
  const [unitTitle, setUnitTitle] = useState("");
  const [unitTag, setUnitTag] = useState("Video Lesson");
  const [unitAbout, setUnitAbout] = useState("");
  const [unitDurationInput, setUnitDurationInput] =
    useState("Unlimited Duration");
  const [unitIsFree, setUnitIsFree] = useState(false);
  const [unitMediaUrl, setUnitMediaUrl] = useState("");
  const [unitDiscussionKeyword, setUnitDiscussionKeyword] = useState("");
  const [unitConnectedAssignment, setUnitConnectedAssignment] = useState("");
  const [unitConnectedAssignments, setUnitConnectedAssignments] = useState([
    "Social Media Strategy Plan",
  ]);
  const [showConnectAssignmentModal, setShowConnectAssignmentModal] =
    useState(false);
  const [customAssignmentInput, setCustomAssignmentInput] = useState("");
  // NEW: Unit Device Upload and Text Editor States
  const [unitMediaTab, setUnitMediaTab] = useState("device");
  const [unitUploadedFile, setUnitUploadedFile] = useState(null);
  const unitDeviceFileInputRef = useRef(null);
  // Text Unit Rich Editor States
  const [unitTextContent, setUnitTextContent] = useState(
    "<h2>Lesson Overview</h2><p>Write your lesson notes, detailed study material, and step-by-step instructions here...</p>",
  );
  const textEditorRef = useRef(null);
  const [editorFontFamily, setEditorFontFamily] = useState("Inter, sans-serif");
  const [editorFontSize, setEditorFontSize] = useState("3");
  const [editorHeading, setEditorHeading] = useState("p");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [hyperlinkUrl, setHyperlinkUrl] = useState("");
  // QUIZ Form State (QUIZ.png, any-quiz-type-clicked1 & 2.png, SCROM.png)
  const [activeQuizType, setActiveQuizType] = useState("simple");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizAbout, setQuizAbout] = useState("");
  const [quizConnectedCourse, setQuizConnectedCourse] =
    useState("Digital Marketing");
  const [quizDurationInput, setQuizDurationInput] = useState("5Minutes");
  const [questionDurationInput, setQuestionDurationInput] =
    useState("0Minutes");
  const [autoEvaluateResults, setAutoEvaluateResults] = useState(false);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [extraQuizRetakes, setExtraQuizRetakes] = useState(0);
  const [postQuizMessage, setPostQuizMessage] = useState("");
  const [showResultsAfterSubmission, setShowResultsAfterSubmission] =
    useState(false);
  const [addCheckAnswerSwitch, setAddCheckAnswerSwitch] = useState(false);
  const [randomizeQuizQuestions, setRandomizeQuizQuestions] = useState(false);
  const [minLiveUsers, setMinLiveUsers] = useState(1);
  const [quizStartDate, setQuizStartDate] = useState("");
  const [quizEndDate, setQuizEndDate] = useState("");
  const [quizPassingScore, setQuizPassingScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: "qs-1",
      title: "SEO Crawling Mechanics",
      type: "true/false",
      tag: "SEO Crawling",
      statement:
        "Googlebot can parse, render and execute client-side JavaScript content.",
      marks: 5,
      answerData: "1",
    },
  ]);
  // QUESTION Form State (create-qs.png)
  const [activeQuestionType, setActiveQuestionType] = useState("true/false");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionTag, setQuestionTag] = useState("Question tag");
  const [questionStatement, setQuestionStatement] = useState("");
  const [questionMarks, setQuestionMarks] = useState(5);
  const [questionAnswerHint, setQuestionAnswerHint] = useState("");
  const [questionAnswerExplanation, setQuestionAnswerExplanation] =
    useState("");
  const [tfAnswer, setTfAnswer] = useState("1");
  const [mcOptions, setMcOptions] = useState([
    { text: "Option A: Crawling", isCorrect: true },
    { text: "Option B: Indexing", isCorrect: false },
    { text: "Option C: Ranking", isCorrect: false },
    { text: "Option D: Rendering", isCorrect: false },
  ]);
  const [fillBlankAnswer, setFillBlankAnswer] = useState("");
  const [shortTextAnswer, setShortTextAnswer] = useState("");
  // ASSIGNMENT Form State (ASSIGNMENT.png & SIMPLE-ASSIGN.png)
  const [activeAssignmentType, setActiveAssignmentType] = useState("simple");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState(100);
  const [assignmentDuration, setAssignmentDuration] = useState("10Days");
  const [assignmentCourseKeyword, setAssignmentCourseKeyword] =
    useState("Digital Marketing");
  const [assignmentIncludeEvaluation, setAssignmentIncludeEvaluation] =
    useState(false);
  const [assignmentStatement, setAssignmentStatement] = useState("");
  const [assignmentStartDate, setAssignmentStartDate] = useState("");
  const [assignmentEndDate, setAssignmentEndDate] = useState("");
  // -------------------------------------------------------------
  // STEP 4 STATE: ACCESSIBILITY (Set Price for Course)
  // -------------------------------------------------------------
  const [isFreeCourse, setIsFreeCourse] = useState(false);
  const [coursePrice, setCoursePrice] = useState(0); // No price for now
  const [enablePartialFree, setEnablePartialFree] = useState(false);
  const [myCredPoints, setMyCredPoints] = useState("");
  const [myCredSubscription, setMyCredSubscription] = useState(false);
  const [applyForCourse, setApplyForCourse] = useState(false);
  const [enableGamification, setEnableGamification] = useState(true);

  // Preload course data if in edit mode
  useEffect(() => {
    if (editCourseId) {
      const existingCourse = lmsService.getCourseById(editCourseId);
      if (existingCourse) {
        setCourseTitle(existingCourse.title || "");
        setCourseCategory(existingCourse.category || "Digital Marketing");
        setCourseShortAbout(
          existingCourse.bracketText || existingCourse.description || ""
        );
        setCourseDetailedDescription(
          existingCourse.detailedDescription || existingCourse.description || ""
        );
        if (existingCourse.thumbnail) {
          setCourseThumbnail(existingCourse.thumbnail);
          setCustomImageUrl(existingCourse.thumbnail);
        }
        if (existingCourse.videoUrl) {
          setCourseVideoUrl(existingCourse.videoUrl);
        }
        if (existingCourse.duration) {
          setCourseDuration(existingCourse.duration);
        }
        if (existingCourse.maxSeats) {
          setMaxSeats(existingCourse.maxSeats);
        }
        if (existingCourse.startDate) {
          setCourseStartDate(existingCourse.startDate);
        }
        if (existingCourse.autoEvaluation !== undefined) {
          setAutoEvaluation(existingCourse.autoEvaluation);
        }
        if (existingCourse.prerequisiteCourse) {
          setPrerequisiteCourse(existingCourse.prerequisiteCourse);
        }
        if (existingCourse.certificate !== undefined) {
          setCourseCertificate(existingCourse.certificate);
        }
        if (existingCourse.badge !== undefined) {
          setCourseBadge(existingCourse.badge);
        }
        if (existingCourse.retakes !== undefined) {
          setCourseRetakes(existingCourse.retakes);
        }
        if (existingCourse.instructions) {
          setCourseInstructions(existingCourse.instructions);
        }
        if (existingCourse.completionMessage) {
          setCourseCompletionMessage(existingCourse.completionMessage);
        }
        if (existingCourse.price !== undefined) {
          setCoursePrice(existingCourse.price);
          setIsFreeCourse(existingCourse.price === 0);
        }

        // Hydrate curriculum modules
        if (existingCourse.modules && existingCourse.modules.length > 0) {
          setModules(existingCourse.modules);
        } else {
          // If no custom modules stored, check if units exist in lmsService for this course
          const existingUnits = lmsService.getUnitsByCourse(editCourseId);
          if (existingUnits && existingUnits.length > 0) {
            const moduleMap = {};
            existingUnits.forEach((u) => {
              const modName = u.moduleName || "Module 1: Foundations & Core Concepts";
              if (!moduleMap[modName]) {
                moduleMap[modName] = [];
              }
              moduleMap[modName].push({
                id: u.id,
                title: u.title,
                type: u.type || "unit",
                subType: u.subType || "video",
                duration: u.duration || "15:00",
                description: u.description || "",
                videoUrl: u.videoUrl || "",
              });
            });

            const hydratedModules = Object.keys(moduleMap).map((modName, idx) => ({
              id: `mod-${idx + 1}`,
              name: modName,
              description: `Curriculum units for ${modName}`,
              items: moduleMap[modName],
            }));

            if (hydratedModules.length > 0) {
              setModules(hydratedModules);
            }
          } else if (existingCourse.overview?.curriculumSummary) {
            const summaryModules = existingCourse.overview.curriculumSummary.map(
              (summaryItem, idx) => ({
                id: `mod-${idx + 1}`,
                name: `Module ${idx + 1}: ${summaryItem}`,
                description: `Curriculum and practical lessons for ${summaryItem}`,
                items: [
                  {
                    id: `u-${idx + 1}-1`,
                    title: `${summaryItem} - Core Lecture`,
                    type: "unit",
                    subType: "video",
                    duration: "25:00",
                  },
                  {
                    id: `q-${idx + 1}-1`,
                    title: `${summaryItem} Quiz Checkpoint`,
                    type: "quiz",
                    subType: "simple",
                    duration: "15:00",
                    marks: 20,
                  },
                ],
              })
            );
            setModules(summaryModules);
          }
        }
      }
    }
  }, [editCourseId]);
  // -------------------------------------------------------------
  // CURRICULUM HANDLERS
  // -------------------------------------------------------------
  const handleAddSection = () => {
    if (!newSectionName.trim()) {
      showToast("Please enter a section name", "warning");
      return;
    }
    const newSection = {
      id: `sec-${Date.now()}`,
      name: newSectionName.trim(),
      description: newSectionDesc.trim(),
      items: [],
    };
    setModules([...modules, newSection]);
    setSelectedSectionIdx(modules.length);
    setNewSectionName("");
    setNewSectionDesc("");
    setCurriculumView("overview");
    showToast(
      `Section "${newSection.name}" created!`,
      "success",
      "Section Added",
    );
  };
  const executeEditorCommand = (command, value = undefined) => {
    if (textEditorRef.current) {
      textEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (textEditorRef.current) {
      setUnitTextContent(textEditorRef.current.innerHTML);
    }
  };
  const handleApplyHeading = (tag) => {
    setEditorHeading(tag);
    executeEditorCommand("formatBlock", tag);
  };
  const handleApplyFontFamily = (font) => {
    setEditorFontFamily(font);
    executeEditorCommand("fontName", font);
  };
  const handleApplyFontSize = (size) => {
    setEditorFontSize(size);
    executeEditorCommand("fontSize", size);
  };
  const handleApplyLink = () => {
    if (hyperlinkUrl.trim()) {
      const url =
        hyperlinkUrl.startsWith("http://") ||
        hyperlinkUrl.startsWith("https://")
          ? hyperlinkUrl.trim()
          : `https://${hyperlinkUrl.trim()}`;
      executeEditorCommand("createLink", url);
      setHyperlinkUrl("");
      setShowLinkModal(false);
      showToast("Hyperlink applied to selection", "success");
    } else {
      showToast("Please enter a valid link URL", "warning");
    }
  };
  const handleRemoveLink = () => {
    executeEditorCommand("unlink");
    setShowLinkModal(false);
    showToast("Hyperlink removed", "info");
  };
  const handleDeviceFileUpload = (file) => {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr =
      file.size >= 1024 * 1024
        ? `${sizeInMb} MB`
        : `${Math.round(file.size / 1024)} KB`;
    setUnitUploadedFile({
      name: file.name,
      size: sizeStr,
      type: file.type || activeUnitType,
    });
    showToast(
      `File "${file.name}" (${sizeStr}) uploaded from device!`,
      "success",
      "File Ready",
    );
  };
  const handleSaveUnit = () => {
    if (!unitTitle.trim()) {
      showToast("Please enter a unit name", "warning");
      return;
    }
    const targetIdx =
      selectedSectionIdx >= 0 && selectedSectionIdx < modules.length
        ? selectedSectionIdx
        : 0;
    const updated = [...modules];
    updated[targetIdx].items.push({
      id: `u-${Date.now()}`,
      title: unitTitle.trim(),
      type: "unit",
      subType: activeUnitType,
      duration:
        unitDurationInput || (activeUnitType === "text" ? "10 Mins" : "15:00"),
      isFree: unitIsFree,
    });
    setModules(updated);
    setUnitTitle("");
    setUnitAbout("");
    setUnitMediaUrl("");
    setUnitUploadedFile(null);
    setUnitConnectedAssignments([]);
    setShowConnectAssignmentModal(false);
    setCurriculumView("overview");
    showToast(
      `Unit "${unitTitle.trim()}" added to ${modules[targetIdx].name}!`,
      "success",
      "Unit Added",
    );
  };
  const handleSaveQuestion = () => {
    if (!questionTitle.trim() || !questionStatement.trim()) {
      showToast(
        "Please enter question title and question statement",
        "warning",
      );
      return;
    }
    const newQ = {
      id: `qs-${Date.now()}`,
      title: questionTitle.trim(),
      type: activeQuestionType,
      tag: questionTag || "General",
      statement: questionStatement.trim(),
      marks: questionMarks || 5,
      answerHint: questionAnswerHint.trim(),
      answerExplanation: questionAnswerExplanation.trim(),
      answerData:
        activeQuestionType === "true/false"
          ? tfAnswer
          : fillBlankAnswer || "Option A",
    };
    setQuizQuestions([...quizQuestions, newQ]);
    setQuestionTitle("");
    setQuestionStatement("");
    setQuestionAnswerHint("");
    setQuestionAnswerExplanation("");
    setCurriculumView("quiz_form");
    showToast(
      `Question "${newQ.title}" added to quiz questions set!`,
      "success",
      "Question Created",
    );
  };
  const handleSaveQuiz = () => {
    if (!quizTitle.trim()) {
      showToast("Please enter a quiz title", "warning");
      return;
    }
    const targetIdx =
      selectedSectionIdx >= 0 && selectedSectionIdx < modules.length
        ? selectedSectionIdx
        : 0;
    const totalMarks = quizQuestions.reduce((acc, q) => acc + q.marks, 0);
    const updated = [...modules];
    updated[targetIdx].items.push({
      id: `q-${Date.now()}`,
      title: quizTitle.trim(),
      type: "quiz",
      subType: activeQuizType,
      duration: quizDurationInput || "15 mins",
      marks: totalMarks || 20,
    });
    setModules(updated);
    setQuizTitle("");
    setQuizAbout("");
    setCurriculumView("overview");
    showToast(
      `Quiz "${quizTitle.trim()}" added to ${modules[targetIdx].name}!`,
      "success",
      "Quiz Added",
    );
  };
  const handleSaveAssignment = () => {
    if (!assignmentName.trim()) {
      showToast("Please enter an assignment name", "warning");
      return;
    }
    const targetIdx =
      selectedSectionIdx >= 0 && selectedSectionIdx < modules.length
        ? selectedSectionIdx
        : 0;
    const updated = [...modules];
    const newAssignId = `a-${Date.now()}`;
    const newAssignTitle = assignmentName.trim();
    updated[targetIdx].items.push({
      id: newAssignId,
      title: newAssignTitle,
      type: "assignment",
      subType: activeAssignmentType,
      duration: assignmentDuration || "10 Days",
      marks: assignmentMarks || 20,
    });
    // Register in lmsService so it appears in Manage Assignments immediately
    lmsService.addAssignment({
      id: newAssignId,
      courseId: "course-3",
      courseTitle: courseName || "New Course",
      title: newAssignTitle,
      dueDate: assignmentEndDate || "2026-11-30",
      maxScore: Number(assignmentMarks) || 20,
      instructions:
        assignmentStatement.trim() ||
        "Submit complete practical project report in PDF.",
    });
    setModules(updated);
    setAssignmentName("");
    setAssignmentStatement("");
    setCurriculumView("overview");
    showToast(
      `Assignment "${newAssignTitle}" added to ${modules[targetIdx].name}!`,
      "success",
      "Assignment Added",
    );
  };
  const handleRemoveItem = (sectionIdx, itemId) => {
    const updated = [...modules];
    updated[sectionIdx].items = updated[sectionIdx].items.filter(
      (item) => item.id !== itemId,
    );
    setModules(updated);
    showToast("Item deleted from curriculum", "info");
  };
  const handleRemoveSection = (idx) => {
    if (modules.length <= 1) {
      showToast("At least one section must remain in curriculum", "warning");
      return;
    }
    const name = modules[idx]?.name || "Section";
    setModules(modules.filter((_, i) => i !== idx));
    if (selectedSectionIdx >= modules.length - 1) {
      setSelectedSectionIdx(0);
    }
    showToast(`Deleted ${name}`, "info");
  };
  // Draft Save Handler
  const handleSaveDraft = () => {
    if (!courseTitle.trim()) {
      showToast(
        "Please enter at least a course title in Step 1 to save draft",
        "warning",
      );
      return;
    }
    const totalLessons = modules.reduce((acc, m) => acc + m.items.length, 0);
    const draftPayload = {
      title: courseTitle,
      category: courseCategory,
      description:
        courseShortAbout || courseDetailedDescription || "Draft course",
      detailedDescription: courseDetailedDescription,
      status: "draft",
      thumbnail: courseThumbnail,
      author: "OPERATING MEDIA",
      price: isFreeCourse ? 0 : Number(coursePrice) || 0,
      duration: courseDuration,
      lessonsCount: totalLessons > 0 ? totalLessons : 1,
      modules: modules,
      videoUrl: courseVideoUrl,
      maxSeats,
      startDate: courseStartDate,
      autoEvaluation,
      prerequisiteCourse,
      certificate: courseCertificate,
      badge: courseBadge,
      retakes: courseRetakes,
      instructions: courseInstructions,
      completionMessage: courseCompletionMessage,
      updatedAt: "Just now",
    };

    if (editCourseId) {
      lmsService.updateCourse(editCourseId, draftPayload);
      showToast("Course draft changes updated successfully!", "info", "Draft Saved");
    } else {
      lmsService.addCourse(draftPayload);
      showToast("Course draft saved successfully!", "info", "Draft Saved");
    }
  };
  // Final Publish Handler
  const handlePublish = () => {
    if (!courseTitle.trim()) {
      showToast(
        `Please enter a course title in Step 1 (${isEditing ? "Edit Course" : "Create Course"})`,
        "error",
        "Title Required",
      );
      setCurrentStep(1);
      return;
    }
    const totalLessons = modules.reduce((acc, m) => acc + m.items.length, 0);
    const coursePayload = {
      title: courseTitle,
      category: courseCategory,
      description:
        courseShortAbout ||
        courseDetailedDescription ||
        "Complete certified training course.",
      detailedDescription: courseDetailedDescription,
      status: "published",
      thumbnail: courseThumbnail,
      author: "OPERATING MEDIA",
      price: isFreeCourse ? 0 : Number(coursePrice) || 0,
      duration: courseDuration,
      lessonsCount: totalLessons > 0 ? totalLessons : 12,
      modules: modules,
      videoUrl: courseVideoUrl,
      maxSeats,
      startDate: courseStartDate,
      autoEvaluation,
      prerequisiteCourse,
      certificate: courseCertificate,
      badge: courseBadge,
      retakes: courseRetakes,
      instructions: courseInstructions,
      completionMessage: courseCompletionMessage,
      updatedAt: "Just now",
    };

    if (editCourseId) {
      lmsService.updateCourse(editCourseId, coursePayload);
      showToast(
        `Course "${courseTitle}" updated successfully!`,
        "success",
        "Course Updated",
      );
    } else {
      lmsService.addCourse(coursePayload);
      showToast(
        "Course created and published successfully!",
        "success",
        "Course Published",
      );
    }

    setPublishedCourseSummary({
      title: courseTitle.trim(),
      category: courseCategory,
      metadata: [
        { label: "Category", value: courseCategory },
        { label: "Lessons", value: `${totalLessons > 0 ? totalLessons : 12}` },
        { label: "Price", value: isFreeCourse ? "Free" : `Rs. ${coursePrice}` },
        { label: "Duration", value: courseDuration },
      ],
    });
    setShowPublishSuccessModal(true);
  };

  const handleCreateAnotherCourse = () => {
    setShowPublishSuccessModal(false);
    if (isEditing) {
      navigate("/create-course");
    } else {
      setCourseTitle("");
      setCourseShortAbout("");
      setCourseDetailedDescription("");
      setCourseVideoUrl("");
      setCurrentStep(1);
    }
  };
  // Steps definition (4 process steps as requested, excluding component)
  const PROCESS_STEPS = [
    {
      num: 1,
      title: isEditing ? "EDIT COURSE" : "CREATE COURSE",
      subtitle: isEditing ? "Update course details" : "Start building a course",
    },
    { num: 2, title: "SETTINGS", subtitle: "Advance settings" },
    { num: 3, title: "SET CURRICULUM", subtitle: "Add Units and Quizzes" },
    { num: 4, title: "ACCESSIBILITY", subtitle: "Set Price for Course" },
  ];
  // Question Types for Question Builder (create-qs.png)
  const QUESTION_TYPES = [
    {
      id: "true/false",
      name: "true/false",
      renderIcon: (active) => (
        <div className="flex items-center space-x-0.5 font-semibold text-xs">
          <Check
            size={13}
            className={active ? "text-white" : "text-blue-500"}
          />
          <X size={13} className={active ? "text-white" : "text-rose-500"} />
        </div>
      ),
    },
    {
      id: "multiplechoce",
      name: "multiplechoce",
      renderIcon: (active) => (
        <CircleDot
          size={17}
          className={active ? "text-white" : "text-slate-700"}
        />
      ),
    },
    {
      id: "multiple corect",
      name: "multiple corect",
      renderIcon: (active) => (
        <CheckSquare
          size={17}
          className={active ? "text-white" : "text-slate-700"}
        />
      ),
    },
    {
      id: "sort ans",
      name: "sort ans",
      renderIcon: (active) => (
        <ArrowUpDown
          size={17}
          className={active ? "text-white" : "text-slate-700"}
        />
      ),
    },
    {
      id: "match ans",
      name: "match ans",
      renderIcon: (active) => (
        <Grid2x2
          size={17}
          className={active ? "text-white" : "text-slate-700"}
        />
      ),
    },
    {
      id: "fill in the blank",
      name: "fill in the blank",
      renderIcon: (active) => (
        <span
          className={`text-[9px] font-semibold tracking-tighter px-1 rounded-xs ${active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-800"}`}
        >
          FILL
        </span>
      ),
    },
    {
      id: "dropdown select",
      name: "dropdown select",
      renderIcon: (active) => (
        <SquareChevronDown
          size={17}
          className={active ? "text-white" : "text-slate-700"}
        />
      ),
    },
    {
      id: "small text",
      name: "small text",
      renderIcon: (active) => (
        <span
          className={`text-[9px] font-semibold tracking-wider px-1 rounded-xs ${active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-800"}`}
        >
          TEXT
        </span>
      ),
    },
    {
      id: "large text",
      name: "large text",
      renderIcon: (active) => (
        <AlignLeft
          size={17}
          className={active ? "text-white" : "text-slate-700"}
        />
      ),
    },
  ];
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate("/manage-courses")}
            className="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-[#0b1329] px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Courses</span>
          </button>
          {isEditing && (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Editing Course:</span>
                <span className="max-w-[200px] truncate underline font-semibold">
                  {courseTitle || editCourseId}
                </span>
              </span>
              <button
                type="button"
                onClick={() => navigate("/create-course")}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                title="Create a brand new course instead"
              >
                + Create New Course
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#0b1329] px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            {isEditing ? "Save Draft Changes" : "Save Draft"}
          </button>
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/60 dark:border-amber-800/60 tabular-nums">
            Process {currentStep} of 4
          </span>
        </div>
      </div>

      {/* 4-STEP PROCESS NAVIGATION HEADER (Follows screenshot flow & structure) */}
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs relative">
        {/* Top Accent Indicator Line */}
        <div className="hidden md:block absolute top-0 left-8 right-8 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
          {PROCESS_STEPS.map((s) => {
            const isCurrent = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <div
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`cursor-pointer rounded p-3 transition-all flex flex-col items-center md:items-start text-center md:text-left ${
                  isCurrent
                    ? "bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 md:bg-transparent md:border-none"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                {/* Dot Marker with Line Indicator */}
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-semibold transition-all ${
                      isCurrent
                        ? "bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950/80 shadow-xs"
                        : isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check size={10} /> : s.num}
                  </div>
                  {isCurrent && (
                    <span className="hidden md:inline-block w-8 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </div>

                {/* Step Title */}
                <span
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isCurrent
                      ? "text-amber-600 dark:text-amber-400"
                      : isCompleted
                        ? "text-slate-800 dark:text-slate-200"
                        : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {s.title}
                </span>

                {/* Step Subtitle */}
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                  {s.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* PROCESS 1: CREATE COURSE (Start building a course)        */}
      {/* ========================================================= */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <span>{isEditing ? "EDIT COURSE" : "CREATE COURSE"}</span>
              {isEditing && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Editing
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEditing
                ? `Update course profile, basic information, thumbnail, and duration for "${courseTitle || editCourseId}".`
                : "Start building your course profile, basic information, thumbnail, and duration."}
            </p>
          </div>

          {/* Top Section: Media Banner & Course Titles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Thumbnail & Video (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              {/* Hidden file input for native computer upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleProcessImageFile(file);
                }}
                className="relative aspect-4/3 rounded overflow-hidden bg-slate-100 dark:bg-slate-900/60 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-2 group transition-all"
              >
                {courseThumbnail ? (
                  <>
                    <img
                      src={courseThumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full max-w-[210px] bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Upload size={14} />
                        <span>Upload from Computer</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomImageUrl(courseThumbnail);
                          setIsImageModalOpen(true);
                        }}
                        className="w-full max-w-[210px] bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <ImageIcon size={14} />
                        <span>More Options / Presets</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="text-center space-y-2 cursor-pointer p-4"
                  >
                    <div className="w-16 h-16 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800/60">
                      <Upload size={28} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        Click to upload course banner
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        Supports PNG, JPG, WEBP from your computer
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Action Buttons under thumbnail */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold text-xs py-2.5 px-3 rounded-xl border border-amber-200/80 dark:border-amber-800/60 transition-colors flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
                >
                  <Upload size={14} />
                  <span>Upload Image from PC</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomImageUrl(courseThumbnail);
                    setIsImageModalOpen(true);
                  }}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs py-2.5 px-3.5 rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Presets
                </button>
              </div>

              {/* Add Course Video Input */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Add course video (Trailer / Preview URL)
                </label>
                <div className="relative">
                  <Video
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                  />
                  <input
                    type="text"
                    value={courseVideoUrl}
                    onChange={(e) => setCourseVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Right: Category, Title & Short About (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Course Category
                </label>
                <select
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-amber-500"
                >
                  <option value="Digital Marketing" className="dark:bg-[#0b1329] dark:text-white">Digital Marketing</option>
                  <option value="Web Development" className="dark:bg-[#0b1329] dark:text-white">Web Development</option>
                  <option value="Data & Analytics" className="dark:bg-[#0b1329] dark:text-white">Data & Analytics</option>
                  <option value="Paid Media" className="dark:bg-[#0b1329] dark:text-white">Paid Media</option>
                  <option value="Creative Designing" className="dark:bg-[#0b1329] dark:text-white">Creative Designing</option>
                  <option value="SEO Mastery" className="dark:bg-[#0b1329] dark:text-white">SEO Mastery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. Full Stack Digital Marketing Masterclass"
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm md:text-base font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  What is the course about
                </label>
                <textarea
                  rows={4}
                  value={courseShortAbout}
                  onChange={(e) => setCourseShortAbout(e.target.value)}
                  placeholder="Brief synopsis summarizing key learning outcomes..."
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Description of the Course
            </label>
            <textarea
              rows={4}
              value={courseDetailedDescription}
              onChange={(e) => setCourseDetailedDescription(e.target.value)}
              placeholder="Comprehensive syllabus overview, target audience requirements, and prerequisites..."
              className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          {/* Bottom 4 Cards Grid (matching screenshot 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Card 1: Course duration */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Course duration
              </span>
              <input
                type="text"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                placeholder="Unlimited Duration"
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* Card 2: Maximum Seats in Course */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Maximum Seats in Course
              </span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Maximum students that can join the Course
              </p>
              <input
                type="number"
                value={maxSeats}
                onChange={(e) => setMaxSeats(Number(e.target.value))}
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* Card 3: Course Start Date */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Course Start Date
              </span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Start date</p>
              <input
                type="date"
                value={courseStartDate}
                onChange={(e) => setCourseStartDate(e.target.value)}
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* Card 4: Automatic Evaluation Toggle */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Automatic Evaluation
                </span>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Course Evaluation Mode
                </p>
              </div>
              <SwitchToggle
                checked={autoEvaluation}
                onChange={setAutoEvaluation}
              />
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
            >
              {isEditing ? "Save Draft Changes" : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
            >
              <span>Continue to Settings</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PROCESS 2: SETTINGS (Advance settings)                     */}
      {/* ========================================================= */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              SETTINGS
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Advance settings: locks, prerequisites, drip feeds, badges, and
              certificates.
            </p>
          </div>

          {/* Grid of Settings Cards (matching screenshot 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Prerequisites */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Course Prerequisites
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Set prerequisite courses students must finish first
                </p>
              </div>
              <input
                type="text"
                value={prerequisiteCourse}
                onChange={(e) => setPrerequisiteCourse(e.target.value)}
                placeholder="Select or type Course..."
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* 2. Locks Unit Quiz */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Lock Units & Quizzes
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Previous unit must be completed
                </p>
              </div>
              <SwitchToggle
                checked={locksUnitQuiz}
                onChange={setLocksUnitQuiz}
              />
            </div>

            {/* 3. Offline Course */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Offline Course
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Enable in-classroom attendance
                </p>
              </div>
              <SwitchToggle
                checked={isOfflineCourse}
                onChange={setIsOfflineCourse}
              />
            </div>

            {/* 4. Drip Feed */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Drip Feed
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Release modules sequentially by date
                </p>
              </div>
              <SwitchToggle checked={dripFeed} onChange={setDripFeed} />
            </div>

            {/* 5. Course Certificate */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Course Certificate
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Issue certificate on completion
                </p>
              </div>
              <SwitchToggle
                checked={courseCertificate}
                onChange={setCourseCertificate}
              />
            </div>

            {/* 6. Course Badge */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Course Badge
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Award digital skill badge
                </p>
              </div>
              <SwitchToggle checked={courseBadge} onChange={setCourseBadge} />
            </div>

            {/* 7. Course Retakes */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Course Retakes
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Student Course Retakes Allowed
              </p>
              <input
                type="number"
                value={courseRetakes}
                onChange={(e) => setCourseRetakes(Number(e.target.value))}
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Instructions and Completion Message Textareas */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Course Instructions
              </label>
              <textarea
                rows={3}
                value={courseInstructions}
                onChange={(e) => setCourseInstructions(e.target.value)}
                placeholder="Add Course specific instructions for students..."
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Course Completion Message
              </label>
              <textarea
                rows={3}
                value={courseCompletionMessage}
                onChange={(e) => setCourseCompletionMessage(e.target.value)}
                placeholder="Completion Message shown after final exam/quiz..."
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Back & Next Navigation */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              ← Back to {isEditing ? "Edit Course" : "Create Course"}
            </button>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                {isEditing ? "Save Draft Changes" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Set Curriculum</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PROCESS 3: SET CURRICULUM (Add Units and Quizzes)          */}
      {/* ========================================================= */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              SET CURRICULUM
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Build your course syllabus: add sections, interactive unit
              lessons, test quizzes, and assignments.
            </p>
          </div>

          {/* Mode Selector (Upload Package vs Build Curriculum) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setCurriculumMode("upload")}
              className={`p-5 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                curriculumMode === "upload"
                  ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40"
              }`}
            >
              <Upload
                size={24}
                className={
                  curriculumMode === "upload"
                    ? "text-amber-500"
                    : "text-slate-400 dark:text-slate-500"
                }
              />
              <span className="text-sm font-black text-slate-900 dark:text-white">
                Upload Package
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                SCORM, xAPI or ZIP course archives
              </p>
            </button>

            <button
              type="button"
              onClick={() => setCurriculumMode("build")}
              className={`p-5 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                curriculumMode === "build"
                  ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40"
              }`}
            >
              <Layers
                size={24}
                className={
                  curriculumMode === "build"
                    ? "text-amber-500"
                    : "text-slate-400 dark:text-slate-500"
                }
              />
              <span className="text-sm font-black text-slate-900 dark:text-white">
                Build Curriculum
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Interactive module & units builder
              </p>
            </button>
          </div>

          {/* Package Upload View */}
          {curriculumMode === "upload" && (
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-8 text-center bg-slate-50 dark:bg-slate-900/50 space-y-3">
              <Upload size={36} className="mx-auto text-amber-500" />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Upload SCORM or ZIP Package
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
                Drag and drop your standard e-learning archive here, or browse
                your files.
              </p>
              <button
                type="button"
                onClick={() =>
                  showToast(
                    "SCORM package verified and ready for deployment!",
                    "success",
                    "Package Uploaded",
                  )
                }
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Browse Package File
              </button>
            </div>
          )}

          {/* Interactive Curriculum Builder View (Matching all screenshots) */}
          {curriculumMode === "build" && (
            <div className="space-y-6">
              {/* 4 Main Action Buttons matching BUILD-CURICULUM.png */}
              <div className="border-2 border-dashed border-slate-200/90 dark:border-slate-700 rounded-2xl p-4 bg-slate-50/60 dark:bg-slate-900/40">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setCurriculumView(
                        curriculumView === "add_section"
                          ? "overview"
                          : "add_section",
                      )
                    }
                    className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center space-x-1.5 ${
                      curriculumView === "add_section"
                        ? "bg-amber-600 text-white ring-2 ring-amber-300"
                        : "bg-amber-500 hover:bg-amber-600 text-white"
                    }`}
                  >
                    <Plus size={15} />
                    <span>Section</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurriculumView(
                        curriculumView === "unit_types" ||
                          curriculumView === "unit_form"
                          ? "overview"
                          : "unit_types",
                      )
                    }
                    className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center space-x-1.5 ${
                      curriculumView === "unit_types" ||
                      curriculumView === "unit_form"
                        ? "bg-amber-600 text-white ring-2 ring-amber-300"
                        : "bg-amber-500 hover:bg-amber-600 text-white"
                    }`}
                  >
                    <BookOpen size={15} />
                    <span>Unit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurriculumView(
                        curriculumView === "quiz_types" ||
                          curriculumView === "quiz_form" ||
                          curriculumView === "scorm_form" ||
                          curriculumView === "create_question"
                          ? "overview"
                          : "quiz_types",
                      )
                    }
                    className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center space-x-1.5 ${
                      curriculumView.includes("quiz") ||
                      curriculumView === "create_question" ||
                      curriculumView === "scorm_form"
                        ? "bg-amber-600 text-white ring-2 ring-amber-300"
                        : "bg-amber-500 hover:bg-amber-600 text-white"
                    }`}
                  >
                    <CheckSquare size={15} />
                    <span>Quiz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurriculumView(
                        curriculumView === "assignment_types" ||
                          curriculumView === "assignment_form"
                          ? "overview"
                          : "assignment_types",
                      )
                    }
                    className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center space-x-1.5 ${
                      curriculumView === "assignment_types" ||
                      curriculumView === "assignment_form"
                        ? "bg-amber-600 text-white ring-2 ring-amber-300"
                        : "bg-amber-500 hover:bg-amber-600 text-white"
                    }`}
                  >
                    <FolderPlus size={15} />
                    <span>Assignment</span>
                  </button>
                </div>
              </div>

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 1: ADD SECTION FORM                                       */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "add_section" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-4 animate-in fade-in zoom-in-98 duration-150 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                        Section Creator
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                        Add Course Section / Module
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Section Name *
                      </label>
                      <input
                        type="text"
                        autoFocus
                        value={newSectionName}
                        onChange={(e) => setNewSectionName(e.target.value)}
                        placeholder="e.g. Module 2: Keyword Strategy & On-Page SEO..."
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddSection();
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Section Description
                      </label>
                      <textarea
                        rows={2}
                        value={newSectionDesc}
                        onChange={(e) => setNewSectionDesc(e.target.value)}
                        placeholder="Brief summary of topics covered in this module..."
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Add Section
                    </button>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 2: UNIT TYPES SELECTOR (UNITS.png)                        */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "unit_types" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-5 animate-in fade-in duration-150 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                        Step 1: Choose Unit Format
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                        Select Unit Type
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* 6 Unit Cards matching UNITS.png */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                    {[
                      { id: "video", name: "Video", icon: Video },
                      { id: "audio", name: "Audio", icon: Music },
                      { id: "multimedia", name: "MultiMedia", icon: Film },
                      { id: "text", name: "Text", icon: FileText },
                      { id: "package", name: "Upload Package", icon: Upload },
                      { id: "elementor", name: "Elementor", icon: Code },
                    ].map((u) => {
                      const Icon = u.icon;
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setActiveUnitType(u.id);
                            setUnitTag(`${u.name} Unit`);
                            setUnitUploadedFile(null);
                            if (u.id === "text") {
                              setUnitDurationInput("10 Mins");
                            } else if (u.id === "video") {
                              setUnitDurationInput("15:00");
                            } else if (u.id === "audio") {
                              setUnitDurationInput("10:00");
                            }
                            setCurriculumView("unit_form");
                          }}
                          className="bg-white dark:bg-[#0b1329] hover:bg-amber-50/60 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 hover:border-amber-500 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2.5 transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                            <Icon size={22} />
                          </div>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-900 dark:group-hover:text-amber-300 tracking-wide">
                            {u.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 3: UNIT CREATION FORM (AFTER-ANY-UNIT-CLICKED.png)         */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "unit_form" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-5 animate-in fade-in duration-150 shadow-xs">
                  {/* Top Search & Section selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                        Title, type to search...
                      </span>
                      <input
                        type="text"
                        placeholder="Search existing lesson units or type below..."
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                      />
                    </div>

                    <div className="shrink-0 flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        Target Section:
                      </span>
                      <select
                        value={selectedSectionIdx}
                        onChange={(e) =>
                          setSelectedSectionIdx(Number(e.target.value))
                        }
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-400 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-hidden shadow-2xs cursor-pointer"
                      >
                        {modules.map((m, idx) => (
                          <option key={m.id} value={idx}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Unit Name (large heading input) */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      autoFocus
                      value={unitTitle}
                      onChange={(e) => setUnitTitle(e.target.value)}
                      placeholder="Unit Name"
                      className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-2xl md:text-3xl font-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 pb-2 focus:outline-hidden focus:border-amber-500"
                    />

                    {/* Unit Tag badge */}
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs">
                        {unitTag}
                      </span>
                    </div>
                  </div>

                  {/* If text unit: Rich Text Editor Formatter (NO upload box per request) */}
                  {activeUnitType === "text" ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Unit Lesson Content (Rich Text Editor)
                        </label>
                        <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200/80 dark:border-amber-800/80">
                          Interactive Text Editor
                        </span>
                      </div>

                      <div className="border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-[#0b1329] shadow-2xs overflow-hidden">
                        {/* Editor Toolbar with color, highlighter, align, bold, italic, hyperlink, font {style[4-5], size}, heading */}
                        <div className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 p-2.5 flex flex-wrap items-center gap-1.5">
                          {/* 1. Heading Selector */}
                          <select
                            value={editorHeading}
                            onChange={(e) => handleApplyHeading(e.target.value)}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-amber-500 shadow-2xs cursor-pointer"
                            title="Heading Style"
                          >
                            <option value="p">Normal Paragraph</option>
                            <option value="h1">Heading 1 (H1)</option>
                            <option value="h2">Heading 2 (H2)</option>
                            <option value="h3">Heading 3 (H3)</option>
                            <option value="h4">Heading 4 (H4)</option>
                          </select>

                          {/* 2. Font Style (Family) Selector [4-5 styles] */}
                          <select
                            value={editorFontFamily}
                            onChange={(e) =>
                              handleApplyFontFamily(e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-amber-500 shadow-2xs cursor-pointer"
                            title="Font Style"
                          >
                            <option value="Inter, sans-serif">
                              Sans (Inter)
                            </option>
                            <option value="Georgia, serif">
                              Serif (Georgia)
                            </option>
                            <option value="'Courier New', monospace">
                              Mono (Code)
                            </option>
                            <option value="'Merriweather', serif">
                              Editorial (Merriweather)
                            </option>
                            <option value="'Trebuchet MS', sans-serif">
                              Casual (Trebuchet)
                            </option>
                          </select>

                          {/* 3. Font Size Selector */}
                          <select
                            value={editorFontSize}
                            onChange={(e) =>
                              handleApplyFontSize(e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-hidden focus:border-amber-500 shadow-2xs cursor-pointer"
                            title="Font Size"
                          >
                            <option value="1">12px (Small)</option>
                            <option value="2">14px (Regular)</option>
                            <option value="3">16px (Normal)</option>
                            <option value="4">18px (Medium)</option>
                            <option value="5">24px (Large)</option>
                            <option value="6">32px (Huge)</option>
                          </select>

                          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

                          {/* 4. Bold */}
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("bold")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Bold (Ctrl+B)"
                          >
                            <Bold size={16} />
                          </button>

                          {/* 5. Italic */}
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("italic")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Italic (Ctrl+I)"
                          >
                            <Italic size={16} />
                          </button>

                          {/* 6. Underline */}
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("underline")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Underline (Ctrl+U)"
                          >
                            <Underline size={16} />
                          </button>

                          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

                          {/* 7. Text Color Picker */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setShowColorPicker(!showColorPicker);
                                setShowHighlightPicker(false);
                              }}
                              className={`p-1.5 rounded-lg transition-colors flex items-center space-x-1 ${showColorPicker ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300" : "hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
                              title="Text Color"
                            >
                              <Palette size={16} />
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-white shrink-0" />
                            </button>

                            {showColorPicker && (
                              <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100">
                                {[
                                  { label: "Dark", val: "#0f172a" },
                                  { label: "Amber", val: "#d97706" },
                                  { label: "Blue", val: "#2563eb" },
                                  { label: "Green", val: "#059669" },
                                  { label: "Red", val: "#dc2626" },
                                  { label: "Purple", val: "#7c3aed" },
                                ].map((c) => (
                                  <button
                                    key={c.val}
                                    type="button"
                                    onClick={() => {
                                      executeEditorCommand("foreColor", c.val);
                                      setShowColorPicker(false);
                                    }}
                                    className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform cursor-pointer"
                                    style={{ backgroundColor: c.val }}
                                    title={c.label}
                                  />
                                ))}
                                <input
                                  type="color"
                                  onChange={(e) => {
                                    executeEditorCommand(
                                      "foreColor",
                                      e.target.value,
                                    );
                                    setShowColorPicker(false);
                                  }}
                                  className="w-5 h-5 cursor-pointer rounded-full border-none p-0 bg-transparent"
                                  title="Custom color"
                                />
                              </div>
                            )}
                          </div>

                          {/* 8. Highlighter Color */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setShowHighlightPicker(!showHighlightPicker);
                                setShowColorPicker(false);
                              }}
                              className={`p-1.5 rounded-lg transition-colors flex items-center space-x-1 ${showHighlightPicker ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300" : "hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
                              title="Text Highlighter"
                            >
                              <Highlighter size={16} />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 border border-slate-300 shrink-0" />
                            </button>

                            {showHighlightPicker && (
                              <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100">
                                {[
                                  { label: "Yellow", val: "#fef08a" },
                                  { label: "Green", val: "#bbf7d0" },
                                  { label: "Blue", val: "#bfdbfe" },
                                  { label: "Pink", val: "#fbcfe8" },
                                  { label: "Purple", val: "#e9d5ff" },
                                  { label: "Clear", val: "transparent" },
                                ].map((h) => (
                                  <button
                                    key={h.val}
                                    type="button"
                                    onClick={() => {
                                      executeEditorCommand(
                                        "hiliteColor",
                                        h.val,
                                      );
                                      setShowHighlightPicker(false);
                                    }}
                                    className={`w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 hover:scale-110 transition-transform cursor-pointer ${h.val === "transparent" ? 'relative bg-white dark:bg-slate-700 after:content-["/"] after:text-[10px] after:text-rose-500 after:font-bold after:flex after:items-center after:justify-center' : ""}`}
                                    style={{ backgroundColor: h.val }}
                                    title={h.label}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

                          {/* 9. Alignment Buttons */}
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("justifyLeft")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Align Left"
                          >
                            <AlignLeft size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              executeEditorCommand("justifyCenter")
                            }
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Align Center"
                          >
                            <AlignCenter size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("justifyRight")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Align Right"
                          >
                            <AlignRight size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("justifyFull")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Justify"
                          >
                            <AlignJustify size={16} />
                          </button>

                          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

                          {/* 10. Hyperlink */}
                          <button
                            type="button"
                            onClick={() => setShowLinkModal(!showLinkModal)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${showLinkModal ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300" : "hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`}
                            title="Insert / Edit Hyperlink"
                          >
                            <LinkIcon size={16} />
                          </button>

                          {/* 11. Lists & Quotes */}
                          <button
                            type="button"
                            onClick={() =>
                              executeEditorCommand("insertUnorderedList")
                            }
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Bullet List"
                          >
                            <List size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              executeEditorCommand("insertOrderedList")
                            }
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Numbered List"
                          >
                            <ListOrdered size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              executeEditorCommand("formatBlock", "blockquote")
                            }
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Quote"
                          >
                            <Quote size={16} />
                          </button>

                          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

                          {/* 12. Undo & Redo */}
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("undo")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Undo"
                          >
                            <Undo size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => executeEditorCommand("redo")}
                            className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Redo"
                          >
                            <Redo size={15} />
                          </button>
                        </div>

                        {/* Inline Hyperlink Bar */}
                        {showLinkModal && (
                          <div className="bg-amber-50/80 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-800/80 p-2.5 flex items-center space-x-2 animate-in fade-in slide-in-from-top-1">
                            <LinkIcon
                              size={14}
                              className="text-amber-600 dark:text-amber-400 shrink-0"
                            />
                            <input
                              type="text"
                              value={hyperlinkUrl}
                              onChange={(e) => setHyperlinkUrl(e.target.value)}
                              placeholder="Type or paste URL (e.g. https://operatingmedia.com)..."
                              className="flex-1 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleApplyLink();
                              }}
                            />
                            <button
                              type="button"
                              onClick={handleApplyLink}
                              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              onClick={handleRemoveLink}
                              className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Remove Link
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowLinkModal(false)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg cursor-pointer"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        )}

                        {/* Editable Writing Area */}
                        <div
                          ref={textEditorRef}
                          contentEditable
                          suppressContentEditableWarning
                          onInput={(e) =>
                            setUnitTextContent(e.target.innerHTML)
                          }
                          dangerouslySetInnerHTML={{ __html: unitTextContent }}
                          className="min-h-[200px] max-h-[450px] overflow-y-auto p-4 text-slate-800 dark:text-slate-200 focus:outline-hidden leading-relaxed"
                          style={{ fontFamily: editorFontFamily }}
                        />

                        {/* Editor Bottom Bar */}
                        <div className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 px-3.5 py-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          <span>Rich Text Formatter Active</span>
                          <span>
                            {
                              unitTextContent
                                .replace(/<[^>]*>/g, "")
                                .trim()
                                .split(/\s+/)
                                .filter(Boolean).length
                            }{" "}
                            words
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Video / Audio / Multimedia / Package: Includes UPLOAD FROM DEVICE + URL LINK */
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 bg-white dark:bg-[#0b1329] space-y-4 shadow-2xs">
                      {/* Hidden File Input for Device Upload */}
                      <input
                        ref={unitDeviceFileInputRef}
                        type="file"
                        accept={
                          activeUnitType === "video"
                            ? "video/*,.mp4,.mov,.webm,.mkv,.avi"
                            : activeUnitType === "audio"
                              ? "audio/*,.mp3,.wav,.aac,.m4a,.ogg"
                              : activeUnitType === "package"
                                ? ".zip,.tar,.gz,.rar"
                                : "*/*"
                        }
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleDeviceFileUpload(file);
                        }}
                        className="hidden"
                      />

                      {/* Header Title with Unit Icon */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            {activeUnitType === "video" && <Video size={20} />}
                            {activeUnitType === "audio" && <Music size={20} />}
                            {activeUnitType === "multimedia" && (
                              <Film size={20} />
                            )}
                            {activeUnitType === "package" && (
                              <Upload size={20} />
                            )}
                            {activeUnitType === "elementor" && (
                              <Code size={20} />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              Unit{" "}
                              {activeUnitType.charAt(0).toUpperCase() +
                                activeUnitType.slice(1)}{" "}
                              Source
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Upload directly from your device or paste a web
                              URL
                            </p>
                          </div>
                        </div>

                        {/* Tab Switcher: Device vs URL */}
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
                          <button
                            type="button"
                            onClick={() => setUnitMediaTab("device")}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              unitMediaTab === "device"
                                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                          >
                            <FileUp size={13} />
                            <span>Upload from Device</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setUnitMediaTab("url")}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              unitMediaTab === "url"
                                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                          >
                            <LinkIcon size={13} />
                            <span>Web Link / URL</span>
                          </button>
                        </div>
                      </div>

                      {/* TAB 1: UPLOAD FROM DEVICE */}
                      {unitMediaTab === "device" && (
                        <div className="space-y-3">
                          {unitUploadedFile ? (
                            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                                  <Check size={18} />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                                      {unitUploadedFile.name}
                                    </h5>
                                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                                      {unitUploadedFile.size}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                                    Uploaded from device and ready to attach
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    unitDeviceFileInputRef.current?.click()
                                  }
                                  className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
                                >
                                  Change File
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setUnitUploadedFile(null)}
                                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                                  title="Remove"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                unitDeviceFileInputRef.current?.click()
                              }
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files?.[0];
                                if (file) handleDeviceFileUpload(file);
                              }}
                              className="border-2 border-dashed border-amber-300 dark:border-amber-700 hover:border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50/70 dark:hover:bg-amber-950/30 rounded-2xl p-6 text-center cursor-pointer transition-all group"
                            >
                              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                                <FileUp size={24} />
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                                Click to browse {activeUnitType} file or drag
                                and drop
                              </h5>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                Upload directly from your computer or device
                              </p>
                              <span className="inline-block mt-2 text-[10px] font-bold text-amber-800 dark:text-amber-400 bg-amber-100/90 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                                {activeUnitType === "video" &&
                                  "MP4, MOV, WEBM, MKV, AVI (Max 500MB)"}
                                {activeUnitType === "audio" &&
                                  "MP3, WAV, AAC, M4A, OGG (Max 100MB)"}
                                {activeUnitType === "package" &&
                                  "SCORM ZIP, TAR.GZ Package"}
                                {activeUnitType === "multimedia" &&
                                  "MP4, MP3, PDF, Media files"}
                                {activeUnitType === "elementor" &&
                                  "JSON, Template archive"}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* TAB 2: WEB LINK / EMBED URL */}
                      {unitMediaTab === "url" && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={unitMediaUrl}
                            onChange={(e) => setUnitMediaUrl(e.target.value)}
                            placeholder={`Paste ${activeUnitType} URL (YouTube, Vimeo, MP4, MP3, cloud storage)...`}
                            className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                          />
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Supports YouTube, Vimeo, MP4, MP3, embed links or
                            cloud video/audio files
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* What is the unit about */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      What is the unit about
                    </label>
                    <textarea
                      rows={2}
                      value={unitAbout}
                      onChange={(e) => setUnitAbout(e.target.value)}
                      placeholder="Summary of this unit..."
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                    />
                  </div>

                  {/* Unit duration row */}
                  <div className="bg-white dark:bg-[#0b1329] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Unit duration
                    </span>
                    <input
                      type="text"
                      value={unitDurationInput}
                      onChange={(e) => setUnitDurationInput(e.target.value)}
                      placeholder="Unlimited Duration"
                      className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-xs font-bold text-right text-slate-800 dark:text-white w-40 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  {/* Free Unit toggle */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Free Unit
                    </span>
                    <SwitchToggle
                      checked={unitIsFree}
                      onChange={setUnitIsFree}
                    />
                  </div>

                  {/* Unit Discussion */}
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Unit Discussion
                    </span>
                    <input
                      type="text"
                      value={unitDiscussionKeyword}
                      onChange={(e) => setUnitDiscussionKeyword(e.target.value)}
                      placeholder="Type a keyword"
                      className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-800 dark:text-white w-44 focus:outline-hidden shadow-2xs"
                    />
                  </div>

                  {/* Connect Assignments - with active [Add] button matching user request and screenshot */}
                  <div className="space-y-2 py-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Connect Assignments
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setShowConnectAssignmentModal((prev) => !prev)
                        }
                        className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3.5 py-1 rounded-lg shadow-2xs transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Add</span>
                        {unitConnectedAssignments.length > 0 && (
                          <span className="bg-white text-amber-700 text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1">
                            {unitConnectedAssignments.length}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Connected Assignment Badges */}
                    {unitConnectedAssignments.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {unitConnectedAssignments.map((asgn, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center space-x-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-xs px-2.5 py-1 rounded-lg font-semibold shadow-2xs"
                          >
                            <FileText
                              size={12}
                              className="text-amber-600 dark:text-amber-400 shrink-0"
                            />
                            <span className="truncate max-w-xs">{asgn}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setUnitConnectedAssignments((prev) =>
                                  prev.filter((_, i) => i !== idx),
                                );
                                showToast(
                                  `Removed "${asgn}" connection`,
                                  "info",
                                );
                              }}
                              className="text-amber-600 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 ml-1 font-bold text-xs cursor-pointer flex items-center"
                              title="Remove assignment"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Interactive Assignment Connector Panel */}
                    {showConnectAssignmentModal && (
                      <div className="p-3.5 bg-white dark:bg-[#0b1329] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Select or Add Assignment
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowConnectAssignmentModal(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        {/* Quick Pick list */}
                        <div className="space-y-1 max-h-36 overflow-y-auto">
                          {[
                            "Social Media Strategy Plan",
                            "Google Search Ads Campaign Setup",
                            "Technical SEO Audit & Schema Markup",
                            "Lead Generation Landing Page Copy",
                            "GA4 Conversion Tracking Implementation",
                          ].map((item) => {
                            const isConnected =
                              unitConnectedAssignments.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  if (isConnected) {
                                    setUnitConnectedAssignments((prev) =>
                                      prev.filter((x) => x !== item),
                                    );
                                    showToast(`Disconnected "${item}"`, "info");
                                  } else {
                                    setUnitConnectedAssignments((prev) => [
                                      ...prev,
                                      item,
                                    ]);
                                    showToast(
                                      `Connected "${item}" to unit`,
                                      "success",
                                      "Assignment Linked",
                                    );
                                  }
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                                  isConnected
                                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                <span className="truncate">{item}</span>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    isConnected
                                      ? "bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                  }`}
                                >
                                  {isConnected ? "Connected" : "+ Connect"}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom assignment input */}
                        <div className="flex items-center space-x-2 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                          <input
                            type="text"
                            value={customAssignmentInput}
                            onChange={(e) =>
                              setCustomAssignmentInput(e.target.value)
                            }
                            placeholder="Or type custom assignment title..."
                            className="flex-1 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                customAssignmentInput.trim()
                              ) {
                                e.preventDefault();
                                const val = customAssignmentInput.trim();
                                if (!unitConnectedAssignments.includes(val)) {
                                  setUnitConnectedAssignments((prev) => [
                                    ...prev,
                                    val,
                                  ]);
                                  showToast(
                                    `Connected "${val}" to unit`,
                                    "success",
                                    "Assignment Linked",
                                  );
                                }
                                setCustomAssignmentInput("");
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const val = customAssignmentInput.trim();
                              if (val) {
                                if (!unitConnectedAssignments.includes(val)) {
                                  setUnitConnectedAssignments((prev) => [
                                    ...prev,
                                    val,
                                  ]);
                                  showToast(
                                    `Connected "${val}" to unit`,
                                    "success",
                                    "Assignment Linked",
                                  );
                                }
                                setCustomAssignmentInput("");
                              }
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1 rounded-lg transition-colors shadow-2xs cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Attachments - display only, not action on this */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Attachments
                    </span>
                    <div className="w-12 h-6 bg-amber-500 rounded-md shadow-2xs cursor-default" />
                  </div>

                  {/* Practice Questions box matching AFTER-ANY-UNIT-CLICKED.png */}
                  <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-[#0b1329] space-y-2 shadow-2xs">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Practice Questions
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          showToast("Questions filter by tags opened", "info")
                        }
                        className="py-2.5 px-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-bold text-xs text-center border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 transition-colors shadow-2xs cursor-pointer"
                      >
                        Select Questions from Tags
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurriculumView("create_question");
                        }}
                        className="py-2.5 px-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-bold text-xs text-center border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 transition-colors shadow-2xs cursor-pointer"
                      >
                        Select/Create Questions
                      </button>
                    </div>
                  </div>

                  {/* Bottom Action buttons */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleSaveUnit}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Add Unit
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 4: QUIZ TYPES SELECTOR (QUIZ.png)                         */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "quiz_types" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-5 animate-in fade-in duration-150 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                        Step 1: Choose Quiz Format
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                        Select Quiz Type
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* 4 Quiz Cards matching QUIZ.png */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                    {[
                      { id: "simple", name: "Simple" },
                      { id: "dynamic", name: "Dynamic" },
                      { id: "live", name: "Live Contest" },
                      { id: "scorm", name: "Scorm" },
                    ].map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setActiveQuizType(q.id);
                          if (q.id === "scorm") {
                            setCurriculumView("scorm_form");
                          } else {
                            setCurriculumView("quiz_form");
                          }
                        }}
                        className="bg-white dark:bg-[#0b1329] hover:bg-amber-50/60 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 hover:border-amber-500 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
                      >
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-900 dark:group-hover:text-amber-300">
                          {q.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 5: SCORM QUIZ FORM (SCROM.png)                            */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "scorm_form" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-5 animate-in fade-in duration-150 shadow-xs">
                  {/* Top Search & Section selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                        Title, type to search...
                      </span>
                      <input
                        type="text"
                        placeholder="Search existing quizzes..."
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                      />
                    </div>
                    <div className="shrink-0 flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        Target Section:
                      </span>
                      <select
                        value={selectedSectionIdx}
                        onChange={(e) =>
                          setSelectedSectionIdx(Number(e.target.value))
                        }
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-400 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-hidden shadow-2xs cursor-pointer"
                      >
                        {modules.map((m, idx) => (
                          <option key={m.id} value={idx}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quiz Title */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      autoFocus
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      placeholder="Quiz Title"
                      className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-2xl md:text-3xl font-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 pb-2 focus:outline-hidden focus:border-amber-500"
                    />
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs">
                        Quiz type: Scorm
                      </span>
                    </div>
                  </div>

                  {/* Add Quiz Package */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Add Quiz Package
                    </span>
                    <div className="border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1329] p-6 rounded-2xl flex items-center justify-center shadow-2xs">
                      <button
                        type="button"
                        onClick={() =>
                          showToast(
                            "SCORM 1.2 Package selected and validated!",
                            "success",
                          )
                        }
                        className="bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-800 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-300 font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-2xs cursor-pointer"
                      >
                        SCORM 1.2 Package
                      </button>
                    </div>
                  </div>

                  {/* Quiz passing marks */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Quiz passing marks/score
                    </span>
                    <input
                      type="number"
                      value={quizPassingScore}
                      onChange={(e) =>
                        setQuizPassingScore(Number(e.target.value))
                      }
                      className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white w-32 focus:outline-hidden shadow-2xs"
                    />
                  </div>

                  {/* Connected Course */}
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Connected Course
                    </span>
                    <input
                      type="text"
                      value={quizConnectedCourse}
                      onChange={(e) => setQuizConnectedCourse(e.target.value)}
                      placeholder="Type a keyword"
                      className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white w-48 focus:outline-hidden shadow-2xs"
                    />
                  </div>

                  {/* Attachments in quiz - display only, not action on this */}
                  <div className="space-y-1.5 py-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Attachments
                    </span>
                    <div className="w-12 h-6 bg-amber-500 rounded-md shadow-2xs cursor-default" />
                  </div>

                  {/* Bottom Action buttons */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleSaveQuiz}
                      className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
                    >
                      Add Quiz
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 6: QUIZ FORM (any-quiz-type-clicked1 & 2.png)             */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "quiz_form" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-4 animate-in fade-in duration-150 shadow-xs">
                  {/* Top Search & Section selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                        Title, type to search...
                      </span>
                      <input
                        type="text"
                        placeholder="Search existing quizzes..."
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                      />
                    </div>
                    <div className="shrink-0 flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        Target Section:
                      </span>
                      <select
                        value={selectedSectionIdx}
                        onChange={(e) =>
                          setSelectedSectionIdx(Number(e.target.value))
                        }
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-400 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-hidden shadow-2xs cursor-pointer"
                      >
                        {modules.map((m, idx) => (
                          <option key={m.id} value={idx}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quiz Title */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      autoFocus
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      placeholder="Quiz Title"
                      className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-2xl md:text-3xl font-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 pb-2 focus:outline-hidden focus:border-amber-500"
                    />
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs uppercase">
                        Quiz type: {activeQuizType}
                      </span>
                    </div>
                  </div>

                  {/* What is the quiz about */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      What is the quiz about
                    </label>
                    <textarea
                      rows={2}
                      value={quizAbout}
                      onChange={(e) => setQuizAbout(e.target.value)}
                      placeholder="Description of quiz goals..."
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                    />
                  </div>

                  {/* Connected Course */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Connected Course
                    </span>
                    <input
                      type="text"
                      value={quizConnectedCourse}
                      onChange={(e) => setQuizConnectedCourse(e.target.value)}
                      placeholder="Type a keyword"
                      className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-800 dark:text-white w-48 focus:outline-hidden shadow-2xs"
                    />
                  </div>

                  {/* Quiz Duration & Question Duration rows */}
                  <div className="space-y-2">
                    <div className="bg-white dark:bg-[#0b1329] p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Quiz Duration
                      </span>
                      <input
                        type="text"
                        value={quizDurationInput}
                        onChange={(e) => setQuizDurationInput(e.target.value)}
                        placeholder="5Minutes"
                        className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-800 dark:text-white font-bold text-right w-36 focus:outline-hidden"
                      />
                    </div>
                    <div className="bg-white dark:bg-[#0b1329] p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Question Duration
                      </span>
                      <input
                        type="text"
                        value={questionDurationInput}
                        onChange={(e) =>
                          setQuestionDurationInput(e.target.value)
                        }
                        placeholder="0Minutes"
                        className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-800 dark:text-white font-bold text-right w-36 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Auto Evaluate Results toggle */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Auto Evaluate Results
                    </span>
                    <SwitchToggle
                      checked={autoEvaluateResults}
                      onChange={setAutoEvaluateResults}
                    />
                  </div>

                  {/* Number of questions per page & retakes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                    <div className="flex items-center justify-between bg-white dark:bg-[#0b1329] p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Questions per page
                      </span>
                      <input
                        type="number"
                        value={questionsPerPage}
                        onChange={(e) =>
                          setQuestionsPerPage(Number(e.target.value))
                        }
                        className="w-16 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 text-xs text-right text-slate-800 dark:text-white font-bold"
                      />
                    </div>
                    <div className="flex items-center justify-between bg-white dark:bg-[#0b1329] p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Extra Quiz Retakes
                      </span>
                      <input
                        type="number"
                        value={extraQuizRetakes}
                        onChange={(e) =>
                          setExtraQuizRetakes(Number(e.target.value))
                        }
                        className="w-16 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 text-xs text-right text-slate-800 dark:text-white font-bold"
                      />
                    </div>
                  </div>

                  {/* Post Quiz Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Post Quiz Message
                    </label>
                    <input
                      type="text"
                      value={postQuizMessage}
                      onChange={(e) => setPostQuizMessage(e.target.value)}
                      placeholder="Message displayed when student finishes quiz..."
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden shadow-2xs"
                    />
                  </div>

                  {/* Attachments in quiz - display only, not action on this */}
                  <div className="space-y-1.5 py-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Attachments
                    </span>
                    <div className="w-12 h-6 bg-amber-500 rounded-md shadow-2xs cursor-default" />
                  </div>

                  {/* Toggles cluster matching any-quiz-type-clicked1 & 2 */}
                  <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Show results after submission
                      </span>
                      <SwitchToggle
                        checked={showResultsAfterSubmission}
                        onChange={setShowResultsAfterSubmission}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Add Check Answer Switch
                      </span>
                      <SwitchToggle
                        checked={addCheckAnswerSwitch}
                        onChange={setAddCheckAnswerSwitch}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Randomize Quiz Questions
                      </span>
                      <SwitchToggle
                        checked={randomizeQuizQuestions}
                        onChange={setRandomizeQuizQuestions}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Minimum No. of Live User to start the Quiz
                      </span>
                      <input
                        type="number"
                        value={minLiveUsers}
                        onChange={(e) =>
                          setMinLiveUsers(Number(e.target.value))
                        }
                        className="w-16 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 text-xs text-right text-slate-800 dark:text-white font-bold shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Start Date, End Date, Passing Score */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 dark:border-slate-800 pt-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Start date
                      </label>
                      <input
                        type="date"
                        value={quizStartDate}
                        onChange={(e) => setQuizStartDate(e.target.value)}
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        End date
                      </label>
                      <input
                        type="date"
                        value={quizEndDate}
                        onChange={(e) => setQuizEndDate(e.target.value)}
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Passing score
                      </label>
                      <input
                        type="number"
                        value={quizPassingScore}
                        onChange={(e) =>
                          setQuizPassingScore(Number(e.target.value))
                        }
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Questions Section with Total Marks & Create Question Button */}
                  <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-[#0b1329] space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider block">
                          Questions
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Questions set
                        </span>
                      </div>
                      <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/80 dark:border-amber-800/80">
                        Total marks{" "}
                        {quizQuestions.reduce((acc, q) => acc + q.marks, 0)}
                      </span>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-1.5">
                      {quizQuestions.map((q, qIdx) => (
                        <div
                          key={q.id}
                          className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800"
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span className="w-5 h-5 rounded-md bg-amber-500 text-white font-bold flex items-center justify-center text-[10px]">
                              {qIdx + 1}
                            </span>
                            <span className="text-amber-700 dark:text-amber-400 font-bold uppercase text-[10px]">
                              {q.type}
                            </span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {q.title}
                            </span>
                          </div>
                          <span className="text-slate-500 dark:text-slate-400 font-bold shrink-0">
                            {q.marks} pts
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons matching any-quiz-type-clicked2.png */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          showToast("Search existing questions library", "info")
                        }
                        className="py-2.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-center transition-colors shadow-2xs cursor-pointer"
                      >
                        Search Question
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurriculumView("create_question")}
                        className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)] text-center transition-all cursor-pointer"
                      >
                        + Create Question
                      </button>
                    </div>
                  </div>

                  {/* Bottom Action buttons */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleSaveQuiz}
                      className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
                    >
                      Add Quiz
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setManagingQuizModal({
                          id: "q-1",
                          title:
                            quizTitle.trim() ||
                            "Digital Marketing Aptitude Quiz!",
                          completedDate: "February 25, 2025",
                          totalQuestions: quizQuestions.length || 20,
                          totalMarks:
                            quizQuestions.reduce((a, b) => a + b.marks, 0) ||
                            20,
                          durationMinutes: Number(quizDurationInput) || 11,
                          averageScore: 12.5,
                          highScore: 25,
                          lowScore: 0,
                          totalSubmissions: 2,
                        });
                      }}
                      className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all flex items-center space-x-1.5 cursor-pointer"
                      title="Manage Quiz Flow (Statistics, Activity, Submissions, View)"
                    >
                      <BarChart2 size={14} />
                      <span>Manage Quiz Flow</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 7: QUESTION BUILDER (create-qs.png)                       */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "create_question" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-5 animate-in fade-in duration-150 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                        Question Editor
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                        Questions set
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Total marks {questionMarks}
                    </span>
                  </div>

                  {/* 9 Question Type Icons with HOVER TOOLTIP matching user request */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Select Question Type (Hover to see name):
                    </label>
                    <div className="flex flex-wrap items-center gap-2 p-2.5 bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      {QUESTION_TYPES.map((qt) => {
                        const isActive = activeQuestionType === qt.id;
                        return (
                          <div key={qt.id} className="relative group">
                            <button
                              type="button"
                              onClick={() => setActiveQuestionType(qt.id)}
                              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                                isActive
                                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                                  : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                              }`}
                            >
                              {qt.renderIcon(isActive)}
                            </button>

                            {/* HOVER TOOLTIP with the EXACT NAME requested */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg border border-slate-800 dark:border-slate-700">
                              {qt.name}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question Title */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      autoFocus
                      value={questionTitle}
                      onChange={(e) => setQuestionTitle(e.target.value)}
                      placeholder="Question Title"
                      className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-2xl font-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 pb-2 focus:outline-hidden focus:border-amber-500"
                    />

                    {/* Question tag */}
                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="text"
                        value={questionTag}
                        onChange={(e) => setQuestionTag(e.target.value)}
                        placeholder="Question tag"
                        className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 w-36 focus:outline-hidden shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Write the question statement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Write the question statement
                    </label>
                    <textarea
                      rows={3}
                      value={questionStatement}
                      onChange={(e) => setQuestionStatement(e.target.value)}
                      placeholder="Enter the full question prompt or problem statement..."
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                    />
                  </div>

                  {/* DYNAMIC ANSWER CONFIGURATION BY QUESTION TYPE */}
                  <div className="bg-white dark:bg-[#0b1329] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
                    <label className="block text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                      Correct Answer Configuration ({activeQuestionType})
                    </label>

                    {/* 1. true/false (matching create-qs.png) */}
                    {activeQuestionType === "true/false" && (
                      <div className="space-y-2">
                        <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">
                          Enter (1 = True, 0 = False)
                        </span>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => setTfAnswer("1")}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                              tfAnswer === "1"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                          >
                            1 = True
                          </button>
                          <button
                            type="button"
                            onClick={() => setTfAnswer("0")}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                              tfAnswer === "0"
                                ? "bg-rose-600 text-white shadow-xs"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                          >
                            0 = False
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2. multiplechoce */}
                    {activeQuestionType === "multiplechoce" && (
                      <div className="space-y-2">
                        <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">
                          Select the single correct radio option:
                        </span>
                        {mcOptions.map((opt, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="mc_correct"
                              checked={opt.isCorrect}
                              onChange={() => {
                                setMcOptions(
                                  mcOptions.map((o, i) => ({
                                    ...o,
                                    isCorrect: i === idx,
                                  })),
                                );
                              }}
                              className="w-4 h-4 text-amber-500"
                            />
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const val = e.target.value;
                                setMcOptions(
                                  mcOptions.map((o, i) =>
                                    i === idx ? { ...o, text: val } : o,
                                  ),
                                );
                              }}
                              className="flex-1 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. multiple corect */}
                    {activeQuestionType === "multiple corect" && (
                      <div className="space-y-2">
                        <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">
                          Check all options that are correct:
                        </span>
                        {mcOptions.map((opt, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={opt.isCorrect}
                              onChange={() => {
                                setMcOptions(
                                  mcOptions.map((o, i) =>
                                    i === idx
                                      ? { ...o, isCorrect: !o.isCorrect }
                                      : o,
                                  ),
                                );
                              }}
                              className="w-4 h-4 text-amber-500 rounded"
                            />
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const val = e.target.value;
                                setMcOptions(
                                  mcOptions.map((o, i) =>
                                    i === idx ? { ...o, text: val } : o,
                                  ),
                                );
                              }}
                              className="flex-1 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 4. fill in the blank */}
                    {activeQuestionType === "fill in the blank" && (
                      <div className="space-y-1">
                        <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">
                          Expected Blank Word/Phrase
                        </span>
                        <input
                          type="text"
                          value={fillBlankAnswer}
                          onChange={(e) => setFillBlankAnswer(e.target.value)}
                          placeholder="e.g. Googlebot"
                          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                        />
                      </div>
                    )}

                    {/* 5. small text or dropdown select or other */}
                    {(activeQuestionType === "small text" ||
                      activeQuestionType === "dropdown select" ||
                      activeQuestionType === "sort ans" ||
                      activeQuestionType === "match ans" ||
                      activeQuestionType === "large text") && (
                      <div className="space-y-1">
                        <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">
                          Answer Keys / Options (comma separated)
                        </span>
                        <input
                          type="text"
                          value={shortTextAnswer}
                          onChange={(e) => setShortTextAnswer(e.target.value)}
                          placeholder="Option 1, Option 2, Option 3..."
                          className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Answer Hint */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Answer Hint
                    </label>
                    <input
                      type="text"
                      value={questionAnswerHint}
                      onChange={(e) => setQuestionAnswerHint(e.target.value)}
                      placeholder="Optional hint for students when taking quiz..."
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                    />
                  </div>

                  {/* Explain the correct answer */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Explain the correct answer
                    </label>
                    <textarea
                      rows={2}
                      value={questionAnswerExplanation}
                      onChange={(e) =>
                        setQuestionAnswerExplanation(e.target.value)
                      }
                      placeholder="Detailed explanation shown during answer review..."
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                    />
                  </div>

                  {/* Bottom Action buttons matching create-qs.png */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleSaveQuestion}
                      className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
                    >
                      Create Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("quiz_form")}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 8: ASSIGNMENT TYPES SELECTOR (ASSIGNMENT.png)             */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "assignment_types" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-5 animate-in fade-in duration-150 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                        Step 1: Choose Assignment Format
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                        Select Assignment Type
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* 2 Assignment Cards matching ASSIGNMENT.png */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    {[
                      { id: "simple", name: "Simple", icon: FileText },
                      { id: "upload", name: "Upload", icon: Upload },
                    ].map((a) => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => {
                            setActiveAssignmentType(a.id);
                            setCurriculumView("assignment_form");
                          }}
                          className="bg-white dark:bg-[#0b1329] hover:bg-amber-50/60 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 hover:border-amber-500 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors">
                            <Icon size={22} />
                          </div>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-900 dark:group-hover:text-amber-300">
                            {a.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* SUB-VIEW 9: ASSIGNMENT FORM (SIMPLE-ASSIGN.png)                    */}
              {/* ------------------------------------------------------------------ */}
              {curriculumView === "assignment_form" && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-4 animate-in fade-in duration-150 shadow-xs">
                  {/* Top Search & Section selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                        Title, type to search...
                      </span>
                      <input
                        type="text"
                        placeholder="Search existing assignments..."
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                      />
                    </div>
                    <div className="shrink-0 flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        Target Section:
                      </span>
                      <select
                        value={selectedSectionIdx}
                        onChange={(e) =>
                          setSelectedSectionIdx(Number(e.target.value))
                        }
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-400 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-hidden shadow-2xs cursor-pointer"
                      >
                        {modules.map((m, idx) => (
                          <option key={m.id} value={idx}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Assignment Name */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      autoFocus
                      value={assignmentName}
                      onChange={(e) => setAssignmentName(e.target.value)}
                      placeholder="Assignment Name"
                      className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-2xl md:text-3xl font-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 pb-2 focus:outline-hidden focus:border-amber-500"
                    />
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs uppercase">
                        Assignment type: {activeAssignmentType}
                      </span>
                    </div>
                  </div>

                  {/* Assignment Marks & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-[#0b1329] p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
                      <div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Assignment Marks
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          Set Maximum Score
                        </span>
                      </div>
                      <input
                        type="number"
                        value={assignmentMarks}
                        onChange={(e) =>
                          setAssignmentMarks(Number(e.target.value))
                        }
                        className="w-20 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-right text-slate-800 dark:text-white font-bold"
                      />
                    </div>
                    <div className="bg-white dark:bg-[#0b1329] p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Assignment Duration
                      </span>
                      <input
                        type="text"
                        value={assignmentDuration}
                        onChange={(e) => setAssignmentDuration(e.target.value)}
                        placeholder="10Days"
                        className="w-28 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-right text-slate-800 dark:text-white font-bold"
                      />
                    </div>
                  </div>

                  {/* Include in Course & Evaluation */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Include in Course
                      </span>
                      <input
                        type="text"
                        value={assignmentCourseKeyword}
                        onChange={(e) =>
                          setAssignmentCourseKeyword(e.target.value)
                        }
                        placeholder="Type a keyword"
                        className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-800 dark:text-white w-48 shadow-2xs"
                      />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Include in Evaluation
                      </span>
                      <SwitchToggle
                        checked={assignmentIncludeEvaluation}
                        onChange={setAssignmentIncludeEvaluation}
                      />
                    </div>
                  </div>

                  {/* Assignment statement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Assignment statement
                    </label>
                    <textarea
                      rows={3}
                      value={assignmentStatement}
                      onChange={(e) => setAssignmentStatement(e.target.value)}
                      placeholder="Enter assignment brief and student guidelines..."
                      className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                    />
                  </div>

                  {/* Start & End Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Start date
                      </label>
                      <input
                        type="date"
                        value={assignmentStartDate}
                        onChange={(e) => setAssignmentStartDate(e.target.value)}
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        End date
                      </label>
                      <input
                        type="date"
                        value={assignmentEndDate}
                        onChange={(e) => setAssignmentEndDate(e.target.value)}
                        className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Bottom Action buttons */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleSaveAssignment}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Add Assignment
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurriculumView("overview")}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* CURRICULUM SYLLABUS OVERVIEW TREE (All Modules, Units, Quizzes)    */}
              {/* ------------------------------------------------------------------ */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
                    Course Syllabus Structure ({modules.length}{" "}
                    {modules.length === 1 ? "Section" : "Sections"})
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Total items:{" "}
                    {modules.reduce((acc, m) => acc + m.items.length, 0)}
                  </span>
                </div>

                {modules.map((mod, modIdx) => (
                  <div
                    key={mod.id}
                    className="border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/70 dark:bg-slate-900/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-semibold text-xs">
                          {modIdx + 1}
                        </span>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">
                            {mod.name}
                          </h5>
                          {mod.description && (
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              {mod.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSectionIdx(modIdx);
                            setCurriculumView("unit_types");
                          }}
                          className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Unit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSectionIdx(modIdx);
                            setCurriculumView("quiz_types");
                          }}
                          className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Quiz</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSectionIdx(modIdx);
                            setCurriculumView("assignment_types");
                          }}
                          className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus size={12} />
                          <span>Task</span>
                        </button>
                        {modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(modIdx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                            title="Delete Section"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Section Child Items */}
                    <div className="space-y-1.5 pl-2 sm:pl-8">
                      {mod.items.length === 0 ? (
                        <p className="text-xs text-slate-400 dark:text-slate-500 italic py-1">
                          No lessons or quizzes yet. Click buttons above to add.
                        </p>
                      ) : (
                        mod.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 uppercase ${
                                  item.type === "quiz"
                                    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                                    : item.type === "assignment"
                                      ? "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300"
                                      : "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300"
                                }`}
                              >
                                {item.type}{" "}
                                {item.subType ? `• ${item.subType}` : ""}
                              </span>
                              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 shrink-0">
                              {item.duration && (
                                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                                  {item.duration}
                                </span>
                              )}
                              {item.marks && (
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                  {item.marks} pts
                                </span>
                              )}
                              {item.type === "quiz" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setManagingQuizModal({
                                      id: item.id || "q-1",
                                      title:
                                        item.title ||
                                        "Digital Marketing Aptitude Quiz!",
                                      completedDate: "February 25, 2025",
                                      totalQuestions: 20,
                                      totalMarks: item.marks || 20,
                                      durationMinutes: 11,
                                      averageScore: 12.5,
                                      highScore: 25,
                                      lowScore: 0,
                                      totalSubmissions: 2,
                                    })
                                  }
                                  className="text-[11px] font-black text-slate-950 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-2xs dark:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center space-x-1"
                                  title="Open Quiz Management Flow (Stats, Activity, Submissions, View)"
                                >
                                  <BarChart2 size={12} />
                                  <span>Manage Quiz</span>
                                </button>
                              )}
                              {item.type === "assignment" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/manage-assignments?title=${encodeURIComponent(item.title)}`,
                                    )
                                  }
                                  className="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 transition-colors cursor-pointer"
                                  title="Open Assignment Management Hub"
                                >
                                  Manage Assignment
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveItem(modIdx, item.id)
                                }
                                className="text-slate-300 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer"
                                title="Remove Item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back & Next Navigation matching BUILD-CURICULUM.png */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-amber-500/20 cursor-pointer"
            >
              ← Back to Settings
            </button>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                {isEditing ? "Save Draft Changes" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
              >
                <span>Move to Accessibility</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PROCESS 4: ACCESSIBILITY (Set Price for Course)           */}
      {/* ========================================================= */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              ACCESSIBILITY
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set Price for Course, accessibility permissions, gamification, and
              enrollments.
            </p>
          </div>

          {/* Grid of Accessibility Cards (matching screenshot 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Free Course */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Free Course
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Anyone can access this course
                </p>
              </div>
              <SwitchToggle checked={isFreeCourse} onChange={setIsFreeCourse} />
            </div>

            {/* 2. Product / Course Price (No price for now per user instruction & screenshot 4) */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-h-[90px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Product
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                  No Price
                </span>
              </div>
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Course Price
                </span>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">No price for now</p>
              </div>
            </div>

            {/* 3. Enable Partial Free Course */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="pr-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Enable Partial Free Course
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Allows users to start the course for free, but can only see
                  allowed items for free.
                </p>
              </div>
              <SwitchToggle
                checked={enablePartialFree}
                onChange={setEnablePartialFree}
              />
            </div>

            {/* 4. MyCred Points */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                MyCred Points
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Point cost to unlock course
              </p>
              <input
                type="text"
                value={myCredPoints}
                onChange={(e) => setMyCredPoints(e.target.value)}
                placeholder="e.g. 500"
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* 5. MyCred Subscription */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  MyCred Subscription
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Available in membership plan
                </p>
              </div>
              <SwitchToggle
                checked={myCredSubscription}
                onChange={setMyCredSubscription}
              />
            </div>

            {/* 6. Apply for Course */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="pr-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Apply for Course
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Invite Student applications for Course
                </p>
              </div>
              <SwitchToggle
                checked={applyForCourse}
                onChange={setApplyForCourse}
              />
            </div>

            {/* 7. Enable Gamification */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Enable Gamification
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Allow Student to earn points and XP
                </p>
              </div>
              <SwitchToggle
                checked={enableGamification}
                onChange={setEnableGamification}
              />
            </div>
          </div>

          {/* Bottom Action Bar (matching screenshot 4 buttons) */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <span>← Back to Curriculum</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium text-xs px-4 py-2.5 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                {isEditing ? "Save Draft Changes" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                <span>{isEditing ? "Update & Save Course" : "Publish Course"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Thumbnail Modal (Supports local computer file upload, URL, and presets) */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Change Course Thumbnail
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload your own image from computer or enter a URL
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {/* Hidden file input for modal */}
              <input
                ref={modalFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Local File Upload Dropzone */}
              <div
                onClick={() => modalFileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleProcessImageFile(file);
                }}
                className="border-2 border-dashed border-amber-300 dark:border-amber-700 hover:border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50/80 dark:hover:bg-amber-950/30 rounded-2xl p-5 text-center cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                  <Upload size={22} />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Upload Image File from Your Computer
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Click to browse files or drag and drop image here
                </p>
                <span className="inline-block mt-2 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                  PNG, JPG, JPEG, WEBP, SVG
                </span>
              </div>

              {/* Divider */}
              <div className="relative flex py-0.5 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="shrink mx-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Or enter image URL
                </span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Preview if customImageUrl exists */}
              {customImageUrl && (
                <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <img
                    src={customImageUrl}
                    alt="Preview"
                    className="w-14 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                      Preview
                    </span>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                      {customImageUrl}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  Or select from presets:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "Digital Marketing",
                      url: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&auto=format&fit=crop&q=80",
                    },
                    {
                      label: "Web Development",
                      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
                    },
                    {
                      label: "Data & Analytics",
                      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
                    },
                    {
                      label: "Creative Design",
                      url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80",
                    },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCustomImageUrl(preset.url)}
                      className={`p-2 rounded-xl border text-left flex items-center space-x-2 transition-all cursor-pointer ${
                        customImageUrl === preset.url
                          ? "border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 ring-2 ring-amber-200 dark:ring-amber-800/60"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-900/50"
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-10 h-8 rounded-lg object-cover shrink-0"
                      />
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (customImageUrl.trim()) {
                    setCourseThumbnail(customImageUrl.trim());
                    setIsImageModalOpen(false);
                    showToast(
                      "Course thumbnail updated successfully!",
                      "success",
                    );
                  } else {
                    showToast(
                      "Please upload an image file or specify a valid URL",
                      "warning",
                    );
                  }
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Apply Thumbnail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ MANAGEMENT FLOW MODAL (5 Screenshots Flow) */}
      {managingQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-5xl my-auto max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl">
            <button
              onClick={() => setManagingQuizModal(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-slate-800/90 hover:bg-slate-700 text-white rounded-full transition-colors cursor-pointer shadow-lg"
              title="Close Quiz Management"
            >
              <X size={18} />
            </button>
            <QuizManagementDetailFlow
              quiz={managingQuizModal}
              onBack={() => setManagingQuizModal(null)}
            />
          </div>
        </div>
      )}

      {/* Step 4 Publish Confirmation Popup */}
      <PublishSuccessModal
        isOpen={showPublishSuccessModal}
        onClose={() => {
          setShowPublishSuccessModal(false);
          navigate("/manage-courses");
        }}
        type="Course"
        isEdit={isEditing}
        itemTitle={publishedCourseSummary?.title || courseTitle}
        courseTitle=""
        metadata={publishedCourseSummary?.metadata || []}
        onCreateNew={handleCreateAnotherCourse}
        onGoToPage={() => navigate("/manage-courses")}
        pageName="Manage Courses"
      />
    </div>
  );
};
export default CreateCoursePage;
