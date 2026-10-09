import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  FileText,
  CheckSquare,
  Clock,
  Award,
  Users,
  Layers,
  Sparkles,
  BookOpen,
  AlertCircle,
  Save,
  Eye,
  ChevronDown,
  ChevronRight,
  Upload,
  FileUp,
  Download,
  FolderCheck,
  Link as LinkIcon,
  Film,
  Music,
  Code,
  Image as ImageIcon,
  Archive,
  FileSpreadsheet,
  Calendar,
  SlidersHorizontal,
  HelpCircle,
  CheckCheck,
  Info,
  ShieldAlert,
} from "lucide-react";
import { lmsService } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import { PublishSuccessModal } from "../components/common/PublishSuccessModal";

// Modern Switch Toggle
const SwitchToggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
      checked ? "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]" : "bg-slate-300 dark:bg-slate-700"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

// Helper to determine file icon and category based on filename/extension
const getFileIconAndType = (fileName = "") => {
  const ext = fileName.split(".").pop().toLowerCase();
  if (["pdf"].includes(ext)) {
    return { icon: FileText, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/40", label: "PDF Document" };
  }
  if (["doc", "docx", "odt", "rtf", "txt"].includes(ext)) {
    return { icon: FileText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40", label: "Word Document" };
  }
  if (["xls", "xlsx", "csv", "tsv"].includes(ext)) {
    return { icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40", label: "Spreadsheet Data" };
  }
  if (["ppt", "pptx", "key"].includes(ext)) {
    return { icon: FileText, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40", label: "Presentation Deck" };
  }
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) {
    return { icon: Archive, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40", label: "Archive Bundle" };
  }
  if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext)) {
    return { icon: Film, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40", label: "Video Media" };
  }
  if (["mp3", "wav", "m4a", "ogg"].includes(ext)) {
    return { icon: Music, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/40", label: "Audio Media" };
  }
  if (["png", "jpg", "jpeg", "webp", "svg", "gif", "psd", "ai", "fig"].includes(ext)) {
    return { icon: ImageIcon, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/40", label: "Image / Design" };
  }
  if (["js", "jsx", "ts", "tsx", "py", "html", "css", "json", "sql", "ipynb"].includes(ext)) {
    return { icon: Code, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/40", label: "Code File" };
  }
  return { icon: FileText, color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-800", label: "Custom File" };
};

// Format bytes into readable string
const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "1.2 MB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const CreateAssignmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id: routeAssignmentId } = useParams();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const editId = searchParams.get("edit") || searchParams.get("id") || routeAssignmentId;
  const isEditMode = Boolean(editId);

  const courses = useMemo(() => lmsService.getCourses(), []);
  const allStudents = useMemo(() => lmsService.getStudents(), []);

  // 4 Process Stepper matching Create Course / Create Quiz Flow
  const [currentStep, setCurrentStep] = useState(1);

  // Step 4 Publish Confirmation Modal State
  const [showPublishSuccessModal, setShowPublishSuccessModal] = useState(false);
  const [publishedAssignmentSummary, setPublishedAssignmentSummary] = useState(null);

  // -------------------------------------------------------------
  // STEP 1 STATE: ASSIGNMENT SCOPE & PROBLEM BRIEF
  // -------------------------------------------------------------
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || "course-3");
  const [assignmentCategory, setAssignmentCategory] = useState("Digital Marketing");
  const [associatedModule, setAssociatedModule] = useState("Capstone Practical Project");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("2026-11-15");
  const [submissionType, setSubmissionType] = useState("both"); // 'file' | 'link' | 'both'
  const [shortStatement, setShortStatement] = useState("");
  const [detailedInstructions, setDetailedInstructions] = useState("");

  // -------------------------------------------------------------
  // STEP 2 STATE: EVALUATION RULES & RUBRIC
  // -------------------------------------------------------------
  const [maxScore, setMaxScore] = useState(100);
  const [passingScore, setPassingScore] = useState(50);
  const [assignmentDuration, setAssignmentDuration] = useState("7 Days");
  const [allowResubmission, setAllowResubmission] = useState(true);
  const [maxResubmissions, setMaxResubmissions] = useState(3);
  const [acceptLateSubmission, setAcceptLateSubmission] = useState(true);
  const [latePenaltyPercentage, setLatePenaltyPercentage] = useState(10);
  const [evaluationMode, setEvaluationMode] = useState("rubric"); // 'manual' | 'rubric'

  // Interactive Rubric Items
  const [rubricItems, setRubricItems] = useState([
    { id: 1, title: "Strategic Research & Competitor Analysis", maxPoints: 30, description: "Depth of audit, audience persona profiling, and industry benchmarks." },
    { id: 2, title: "Practical Implementation & Execution Quality", maxPoints: 40, description: "Correct setup, tool integration, accurate schemas, and deliverables." },
    { id: 3, title: "Data Reporting, Presentation & Documentation", maxPoints: 30, description: "Clarity of spreadsheet / deck, KPIs breakdown, and actionable insights." },
  ]);
  const [newRubricTitle, setNewRubricTitle] = useState("");
  const [newRubricPoints, setNewRubricPoints] = useState(20);
  const [newRubricDesc, setNewRubricDesc] = useState("");

  // -------------------------------------------------------------
  // STEP 3 STATE: ATTACHMENTS & ANY-FORMAT UPLOADER
  // -------------------------------------------------------------
  const [uploadedMaterials, setUploadedMaterials] = useState([
    {
      id: "mat-1",
      name: "Operating-Media-Assignment-Guidelines.pdf",
      size: 2450000,
      type: "application/pdf",
      uploadedAt: "Uploaded today",
      isPreset: true,
    },
    {
      id: "mat-2",
      name: "Campaign-Audit-Template.xlsx",
      size: 1120000,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      uploadedAt: "Uploaded today",
      isPreset: true,
    },
  ]);

  // Student submission permissions
  const [allowAnyFormat, setAllowAnyFormat] = useState(true);
  const [allowedExtensions, setAllowedExtensions] = useState([
    "PDF", "DOC", "DOCX", "PPT", "PPTX", "XLS", "XLSX", "ZIP", "RAR", "MP4", "PNG", "JPG", "FIG", "TXT", "CSV"
  ]);
  const [customExtensionInput, setCustomExtensionInput] = useState("");
  const [maxFileSizeMB, setMaxFileSizeMB] = useState(100);
  const [maxFilesCount, setMaxFilesCount] = useState(5);
  const [allowExternalLinks, setAllowExternalLinks] = useState(true);

  // -------------------------------------------------------------
  // STEP 4 STATE: TARGET COHORT & PUBLICATION
  // -------------------------------------------------------------
  const [assigneeTarget, setAssigneeTarget] = useState("allCourseStudents"); // 'allCourseStudents' | 'specificStudents'
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [publicationStatus, setPublicationStatus] = useState("published"); // 'published' | 'draft' | 'scheduled'
  const [sendInAppNotification, setSendInAppNotification] = useState(true);
  const [sendEmailAlert, setSendEmailAlert] = useState(true);

  // Hydrate data if in edit mode
  useEffect(() => {
    if (editId) {
      const existing = lmsService.getAssignmentById(editId);
      if (existing) {
        setAssignmentTitle(existing.title || "");
        if (existing.courseId) setTargetCourseId(existing.courseId);
        if (existing.category) setAssignmentCategory(existing.category);
        if (existing.moduleName) setAssociatedModule(existing.moduleName);
        if (existing.startDate) setStartDate(existing.startDate);
        if (existing.dueDate) setDueDate(existing.dueDate);
        if (existing.duration) setAssignmentDuration(existing.duration);
        if (existing.submissionType) setSubmissionType(existing.submissionType);
        if (existing.statement) setShortStatement(existing.statement);
        if (existing.instructions) setDetailedInstructions(existing.instructions);
        if (existing.maxScore) setMaxScore(Number(existing.maxScore));
        if (existing.passScore) setPassingScore(Number(existing.passScore));
        if (existing.allowResubmission !== undefined) setAllowResubmission(existing.allowResubmission);
        if (existing.acceptLateSubmission !== undefined) setAcceptLateSubmission(existing.acceptLateSubmission);
        if (existing.evaluationMode) setEvaluationMode(existing.evaluationMode);
        if (existing.allowAnyFormat !== undefined) setAllowAnyFormat(existing.allowAnyFormat);
        if (existing.maxFileSizeMB) setMaxFileSizeMB(existing.maxFileSizeMB);
        if (existing.maxFilesCount) setMaxFilesCount(existing.maxFilesCount);
        if (existing.status) setPublicationStatus(existing.status);

        if (existing.rubric && Array.isArray(existing.rubric) && existing.rubric.length > 0) {
          setRubricItems(existing.rubric);
        }

        if (existing.attachments && Array.isArray(existing.attachments) && existing.attachments.length > 0) {
          setUploadedMaterials(existing.attachments);
        }

        if (existing.assignedStudents && Array.isArray(existing.assignedStudents)) {
          setSelectedStudentIds(existing.assignedStudents);
          setAssigneeTarget(existing.assignedStudents.length > 0 ? "specificStudents" : "allCourseStudents");
        }
      }
    }
  }, [editId]);

  // Selected Course Object
  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id === targetCourseId) || courses[0];
  }, [courses, targetCourseId]);

  // Filter students for specific student assignment
  const filteredStudents = useMemo(() => {
    return allStudents.filter((s) => {
      if (targetCourseId && s.courseId && s.courseId !== targetCourseId) return false;
      if (!studentSearchQuery.trim()) return true;
      const q = studentSearchQuery.toLowerCase();
      return (
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.id?.toLowerCase().includes(q)
      );
    });
  }, [allStudents, targetCourseId, studentSearchQuery]);

  // Total rubric points calculator
  const totalRubricPoints = useMemo(() => {
    return rubricItems.reduce((sum, item) => sum + (Number(item.maxPoints) || 0), 0);
  }, [rubricItems]);

  // Stepper Process definition
  const PROCESS_STEPS = [
    {
      num: 1,
      title: isEditMode ? "EDIT ASSIGNMENT" : "ASSIGNMENT DETAILS",
      subtitle: isEditMode ? "Update scope & brief" : "Scope, course & problem brief",
    },
    { num: 2, title: "EVALUATION RULES", subtitle: "Marks, rubric & deadlines" },
    { num: 3, title: "ATTACHMENTS & FORMATS", subtitle: `Any format uploads (${uploadedMaterials.length})` },
    { num: 4, title: "ASSIGN & PUBLISH", subtitle: "Target cohort & live status" },
  ];

  // -------------------------------------------------------------
  // HANDLERS FOR FILE UPLOAD (ANY FORMAT SUPPORT)
  // -------------------------------------------------------------
  const handleFilesSelected = (files) => {
    if (!files || files.length === 0) return;
    const newItems = Array.from(files).map((file) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      uploadedAt: "Just now",
      isCustom: true,
    }));

    setUploadedMaterials((prev) => [...prev, ...newItems]);
    showToast(
      `Successfully attached ${newItems.length} file(s) with any format to assignment!`,
      "success",
      "Files Uploaded"
    );
  };

  const handleFileInputChange = (e) => {
    handleFilesSelected(e.target.files);
    e.target.value = "";
  };

  const handleRemoveMaterial = (id, name) => {
    setUploadedMaterials((prev) => prev.filter((m) => m.id !== id));
    showToast(`Removed "${name}" from assignment materials`, "info");
  };

  const handleAddCustomExtension = () => {
    if (!customExtensionInput.trim()) return;
    const cleanExt = customExtensionInput.trim().replace(/^\./, "").toUpperCase();
    if (!allowedExtensions.includes(cleanExt)) {
      setAllowedExtensions((prev) => [...prev, cleanExt]);
      showToast(`Added .${cleanExt.toLowerCase()} to accepted extensions`, "info");
    }
    setCustomExtensionInput("");
  };

  const handleRemoveExtension = (ext) => {
    setAllowedExtensions((prev) => prev.filter((e) => e !== ext));
  };

  // -------------------------------------------------------------
  // HANDLERS FOR RUBRIC BUILDER
  // -------------------------------------------------------------
  const handleAddRubricItem = (e) => {
    e.preventDefault();
    if (!newRubricTitle.trim()) {
      showToast("Please enter a rubric criterion title", "warning");
      return;
    }
    const newItem = {
      id: Date.now(),
      title: newRubricTitle.trim(),
      maxPoints: Number(newRubricPoints) || 10,
      description: newRubricDesc.trim() || "Criterion evaluation benchmarks.",
    };
    setRubricItems((prev) => [...prev, newItem]);
    setNewRubricTitle("");
    setNewRubricPoints(20);
    setNewRubricDesc("");
    showToast(`Added criterion: ${newItem.title} (${newItem.maxPoints} pts)`, "success");
  };

  const handleRemoveRubricItem = (id) => {
    if (rubricItems.length <= 1) {
      showToast("Assignment should have at least 1 evaluation criterion", "warning");
      return;
    }
    setRubricItems((prev) => prev.filter((r) => r.id !== id));
  };

  // -------------------------------------------------------------
  // HANDLERS FOR SAVE & PUBLISH
  // -------------------------------------------------------------
  const handleSaveDraft = () => {
    if (!assignmentTitle.trim()) {
      showToast("Please enter at least an assignment title to save draft", "warning");
      return;
    }

    const payload = {
      title: assignmentTitle.trim(),
      courseId: targetCourseId,
      courseTitle: selectedCourse?.title || "Digital Marketing",
      category: assignmentCategory,
      moduleName: associatedModule,
      startDate,
      dueDate,
      duration: assignmentDuration,
      submissionType,
      statement: shortStatement.trim() || detailedInstructions.trim() || "Draft assignment",
      instructions: detailedInstructions.trim() || "Complete practical assignment tasks as specified.",
      maxScore: Number(maxScore) || 100,
      passScore: Number(passingScore) || 50,
      allowResubmission,
      maxResubmissions: Number(maxResubmissions) || 3,
      acceptLateSubmission,
      latePenaltyPercentage: Number(latePenaltyPercentage) || 0,
      evaluationMode,
      rubric: rubricItems,
      attachments: uploadedMaterials,
      allowAnyFormat,
      allowedFormats: allowAnyFormat ? ["ANY FORMAT"] : allowedExtensions,
      maxFileSizeMB: Number(maxFileSizeMB) || 100,
      maxFilesCount: Number(maxFilesCount) || 5,
      allowExternalLinks,
      assignedStudents: assigneeTarget === "allCourseStudents" ? [] : selectedStudentIds,
      status: "pending",
      updatedAt: "Just now",
    };

    if (isEditMode) {
      lmsService.updateAssignment(editId, payload);
      showToast("Assignment draft changes saved successfully!", "info", "Draft Saved");
    } else {
      lmsService.addAssignment(payload);
      showToast("Assignment draft saved successfully!", "info", "Draft Saved");
    }
  };

  const handlePublishAssignment = () => {
    if (!assignmentTitle.trim()) {
      showToast("Please provide an assignment title in Step 1", "error", "Title Required");
      setCurrentStep(1);
      return;
    }

    const payload = {
      title: assignmentTitle.trim(),
      courseId: targetCourseId,
      courseTitle: selectedCourse?.title || "Digital Marketing",
      category: assignmentCategory,
      moduleName: associatedModule,
      startDate,
      dueDate,
      duration: assignmentDuration,
      submissionType,
      statement: shortStatement.trim() || detailedInstructions.trim() || "Live practical capstone assignment.",
      instructions: detailedInstructions.trim() || "Submit complete practical capstone deliverable.",
      maxScore: Number(maxScore) || 100,
      passScore: Number(passingScore) || 50,
      allowResubmission,
      maxResubmissions: Number(maxResubmissions) || 3,
      acceptLateSubmission,
      latePenaltyPercentage: Number(latePenaltyPercentage) || 0,
      evaluationMode,
      rubric: rubricItems,
      attachments: uploadedMaterials,
      allowAnyFormat,
      allowedFormats: allowAnyFormat ? ["ANY FORMAT"] : allowedExtensions,
      maxFileSizeMB: Number(maxFileSizeMB) || 100,
      maxFilesCount: Number(maxFilesCount) || 5,
      allowExternalLinks,
      assignedStudents: assigneeTarget === "allCourseStudents" ? [] : selectedStudentIds,
      status: publicationStatus === "draft" ? "pending" : "active",
      updatedAt: "Just now",
    };

    if (isEditMode) {
      lmsService.updateAssignment(editId, payload);
      showToast(
        `Assignment "${assignmentTitle}" updated and saved successfully!`,
        "success",
        "Assignment Updated"
      );
    } else {
      const created = lmsService.addAssignment(payload);
      showToast(
        `Assignment "${created.title}" published for ${selectedCourse.title}!`,
        "success",
        "Assignment Published"
      );
    }

    setPublishedAssignmentSummary({
      title: assignmentTitle.trim(),
      courseTitle: selectedCourse?.title || "Digital Marketing",
      metadata: [
        { label: "Due Date", value: dueDate },
        { label: "Max Score", value: `${maxScore} pts` },
        { label: "Pass Benchmark", value: `${passingScore} pts` },
        { label: "Module", value: associatedModule },
      ],
    });
    setShowPublishSuccessModal(true);
  };

  const handleCreateAnotherAssignment = () => {
    setShowPublishSuccessModal(false);
    if (isEditMode) {
      navigate("/create-assignment");
    } else {
      setAssignmentTitle("");
      setShortStatement("");
      setDetailedInstructions("");
      setUploadedMaterials([]);
      setCurrentStep(1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-in fade-in duration-200">
      {/* ------------------------------------------------------------- */}
      {/* TOP BAR HEADER                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate("/manage-assignments")}
            className="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-[#0b1329] px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Assignments</span>
          </button>
          {isEditMode && (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Editing:</span>
                <span className="max-w-[200px] truncate underline font-semibold">
                  {assignmentTitle || editId}
                </span>
              </span>
              <button
                type="button"
                onClick={() => navigate("/create-assignment")}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                title="Create a brand new assignment"
              >
                + Create New
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
            {isEditMode ? "Save Draft Changes" : "Save Draft"}
          </button>
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/60 dark:border-amber-800/60 tabular-nums">
            Process {currentStep} of 4
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4-STEP PROCESS STEPPER HEADER (Matching Create Course Flow)   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs relative">
        {/* Accent Progress Line */}
        <div className="hidden md:block absolute top-0 left-8 right-8 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
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
                className={`cursor-pointer rounded-2xl p-3 transition-all flex flex-col items-center md:items-start text-center md:text-left ${
                  isCurrent
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 md:bg-transparent md:border-none"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                {/* Marker with Number or Check */}
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                          ? "bg-blue-600 text-white shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check size={14} /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isCurrent
                        ? "text-blue-600 dark:text-blue-400"
                        : isCompleted
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    Step {s.num}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1">
                    {s.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================= */}
      {/* STEP 1: ASSIGNMENT DETAILS & PROBLEM BRIEF                    */}
      {/* ============================================================= */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <span>{isEditMode ? "EDIT ASSIGNMENT" : "CREATE ASSIGNMENT"}</span>
              {isEditMode && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Editing
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEditMode
                ? `Update assignment scope, mapped course, problem briefing, and submission deadlines for "${assignmentTitle || editId}".`
                : "Map practical assignment to course tracks, define task scope, submission deadlines, and briefing."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Assignment Title *</span>
                <span className="text-[10px] text-slate-400 font-normal">Clear, practical project title</span>
              </label>
              <input
                type="text"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                placeholder="e.g. Social Media Ad Campaign Design System (Figma File)"
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Target Course */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Associated Course *</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{courses.length} Active Tracks</span>
              </label>
              <select
                value={targetCourseId}
                onChange={(e) => {
                  setTargetCourseId(e.target.value);
                  const c = courses.find((x) => x.id === e.target.value);
                  if (c?.category) setAssignmentCategory(c.category);
                }}
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} ({course.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Category / Specialization */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Specialization / Domain
              </label>
              <input
                type="text"
                value={assignmentCategory}
                onChange={(e) => setAssignmentCategory(e.target.value)}
                placeholder="e.g. Social Media, SEO, Design & Media, Google Ads"
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-hidden"
              />
            </div>

            {/* Associated Module */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Module / Curriculum Checkpoint
              </label>
              <input
                type="text"
                value={associatedModule}
                onChange={(e) => setAssociatedModule(e.target.value)}
                placeholder="e.g. Module 3: Client Pitch & Campaign Planning"
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-hidden"
              />
            </div>

            {/* Submission Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Submission Delivery Mode
              </label>
              <select
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-hidden"
              >
                <option value="both">File Upload + External Link (Figma/Drive/GitHub)</option>
                <option value="file">File Upload Only (Any Format Accepted)</option>
                <option value="link">External Link Only (Public URL / Repository)</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Calendar size={13} className="text-blue-500" />
                <span>Assignment Start Date</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-semibold focus:outline-hidden"
              />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Calendar size={13} className="text-rose-500" />
                <span>Final Submission Due Date *</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-semibold focus:outline-hidden"
              />
            </div>

            {/* Short Problem Statement */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Short Summary / Problem Statement</span>
                <span className="text-[10px] text-slate-400">Displayed on student card & listings</span>
              </label>
              <input
                type="text"
                value={shortStatement}
                onChange={(e) => setShortStatement(e.target.value)}
                placeholder="e.g. Provide public Figma link with component library, color styles, typography tokens, and 6 ad variations."
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-normal focus:outline-hidden"
              />
            </div>

            {/* Detailed Instructions */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Detailed Assignment Instructions & Deliverables *</span>
                <span className="text-[10px] text-slate-400">Full instructions shown in View Brief</span>
              </label>
              <textarea
                rows={6}
                value={detailedInstructions}
                onChange={(e) => setDetailedInstructions(e.target.value)}
                placeholder="Describe project requirements in detail:&#10;1. Context & Objective&#10;2. Specific deliverables (Spreadsheet, Deck, Code, PDF report)&#10;3. Data sources, guidelines & edge cases&#10;4. Submission naming conventions"
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-slate-900 dark:text-white font-normal leading-relaxed focus:outline-hidden"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
            >
              {isEditMode ? "Save Draft Changes" : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-500/20 flex items-center space-x-2 cursor-pointer"
            >
              <span>Continue to Evaluation Rules</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* STEP 2: EVALUATION RULES & RUBRIC BUILDER                     */}
      {/* ============================================================= */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <span>EVALUATION RULES & RUBRIC</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Max Score: {maxScore} pts
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure marks allocation, passing benchmark, duration allowances, resubmission policy, and structured grading criteria.
            </p>
          </div>

          {/* Quick Metrics Config Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Total Max Marks *
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={maxScore}
                  onChange={(e) => setMaxScore(Number(e.target.value) || 100)}
                  className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-base font-extrabold text-slate-900 dark:text-white focus:outline-hidden"
                />
                <span className="text-xs font-bold text-slate-400">Pts</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Passing Grade Benchmark
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max={maxScore}
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value) || 40)}
                  className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-base font-extrabold text-slate-900 dark:text-white focus:outline-hidden"
                />
                <span className="text-xs font-bold text-slate-400">Pts</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Duration Allowance
              </label>
              <select
                value={assignmentDuration}
                onChange={(e) => setAssignmentDuration(e.target.value)}
                className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden"
              >
                <option value="3 Days">3 Days</option>
                <option value="5 Days">5 Days</option>
                <option value="7 Days">7 Days (1 Week)</option>
                <option value="10 Days">10 Days</option>
                <option value="14 Days">14 Days (2 Weeks)</option>
                <option value="30 Days">30 Days (Capstone)</option>
                <option value="Unlimited Duration">Unlimited Duration</option>
              </select>
            </div>
          </div>

          {/* Policy Toggles */}
          <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Submission & Evaluation Policies
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800">
                <div className="space-y-0.5 pr-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Allow Student Re-submission
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Students can submit revisions based on review remarks
                  </p>
                </div>
                <SwitchToggle checked={allowResubmission} onChange={setAllowResubmission} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800">
                <div className="space-y-0.5 pr-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Accept Late Submissions
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Permit submissions after the due date with optional penalty
                  </p>
                </div>
                <SwitchToggle checked={acceptLateSubmission} onChange={setAcceptLateSubmission} />
              </div>
            </div>

            {allowResubmission && (
              <div className="flex items-center space-x-3 pt-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Maximum Re-submissions:
                </span>
                <select
                  value={maxResubmissions}
                  onChange={(e) => setMaxResubmissions(Number(e.target.value))}
                  className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value={1}>1 Re-submission</option>
                  <option value={2}>2 Re-submissions</option>
                  <option value={3}>3 Re-submissions</option>
                  <option value={5}>5 Re-submissions</option>
                  <option value={999}>Unlimited Re-submissions</option>
                </select>
              </div>
            )}
          </div>

          {/* Interactive Rubric Criteria Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Award size={16} className="text-amber-500" />
                  <span>Evaluation Rubric Criteria</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Define points per criteria so instructors and students have standardized transparent grading.
                </p>
              </div>

              <div className="text-right">
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                  totalRubricPoints === maxScore
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200"
                    : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200"
                }`}>
                  {totalRubricPoints} / {maxScore} pts allocated
                </span>
              </div>
            </div>

            {/* Rubric Items List */}
            <div className="space-y-2.5">
              {rubricItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-start space-x-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 tabular-nums">
                      {item.maxPoints} pts
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRubricItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Remove Criterion"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Criterion Box */}
            <form
              onSubmit={handleAddRubricItem}
              className="bg-white dark:bg-[#0f172a] border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Plus size={14} className="text-blue-500" />
                <span>Add Custom Rubric Criterion</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    value={newRubricTitle}
                    onChange={(e) => setNewRubricTitle(e.target.value)}
                    placeholder="Criterion title (e.g. Technical SEO Audit Architecture)"
                    className="w-full bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="number"
                    min="1"
                    max={maxScore}
                    value={newRubricPoints}
                    onChange={(e) => setNewRubricPoints(Number(e.target.value))}
                    placeholder="Points"
                    className="w-full bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              ← Back to Scope
            </button>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                {isEditMode ? "Save Draft Changes" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-500/20 flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Attachments</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* STEP 3: ATTACHMENTS & ANY-FORMAT UPLOADER                    */}
      {/* ============================================================= */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <span>ATTACHMENTS & ANY-FORMAT UPLOAD</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Any Format Supported
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload assignment briefs, templates, worksheets, and presentation decks. Configure student submission file formats and size allowances.
            </p>
          </div>

          {/* Teacher Upload Drag-and-Drop Zone (ANY FORMAT ACCEPTED) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Upload size={16} className="text-blue-500" />
                  <span>Teacher Assignment Materials & Resources</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Attach reference files, sample reports, and templates in ANY format.
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {uploadedMaterials.length} file(s) attached
              </span>
            </div>

            {/* Hidden file input supporting ANY format */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Drag & Drop Card */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFilesSelected(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-300 dark:border-blue-900/60 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-8 text-center bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/70 dark:hover:bg-blue-950/30 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs group-hover:scale-105 transition-transform">
                <FileUp size={28} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Drag and drop files here, or <span className="text-blue-600 dark:text-blue-400 underline">browse computer</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Upload with <span className="font-bold text-slate-700 dark:text-slate-300">ANY format</span>: PDF, Word, Excel, PowerPoint, ZIP, MP4, Figma, Images, Code, etc.
                </p>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <Sparkles size={12} className="text-amber-500" />
                <span>No extension limits • Up to 500MB per file</span>
              </div>
            </div>

            {/* Uploaded Materials List */}
            {uploadedMaterials.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Attached Reference Files ({uploadedMaterials.length})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {uploadedMaterials.map((mat) => {
                    const meta = getFileIconAndType(mat.name);
                    const FileIcon = meta.icon;

                    return (
                      <div
                        key={mat.id}
                        className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className={`w-10 h-10 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center shrink-0`}>
                            <FileIcon size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={mat.name}>
                              {mat.name}
                            </p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              {formatFileSize(mat.size)} • {meta.label}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              showToast(`Simulated download for "${mat.name}"`, "info");
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Download/Preview"
                          >
                            <Download size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterial(mat.id, mat.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Remove file"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Student Submission Settings */}
          <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Student Submission Format Rules
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Control what file types and size limits students are permitted to submit.
                </p>
              </div>

              {/* Any format toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Accept ANY Format
                </span>
                <SwitchToggle checked={allowAnyFormat} onChange={setAllowAnyFormat} />
              </div>
            </div>

            {/* If any format is enabled notice */}
            {allowAnyFormat ? (
              <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3.5 flex items-center space-x-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <div className="text-xs text-emerald-900 dark:text-emerald-300 font-medium">
                  <span className="font-bold">Unrestricted Format Mode Active:</span> Students can upload submissions in any digital format (PDF, DOCX, ZIP, MP4, PNG, FIG, XLSX, IPYNB, etc.) with automatic safety validation.
                </div>
              </div>
            ) : (
              /* Granular format tags */
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {allowedExtensions.map((ext) => (
                    <span
                      key={ext}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      <span>.{ext.toLowerCase()}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExtension(ext)}
                        className="hover:text-rose-500 cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add custom extension */}
                <div className="flex items-center space-x-2 max-w-sm">
                  <input
                    type="text"
                    value={customExtensionInput}
                    onChange={(e) => setCustomExtensionInput(e.target.value)}
                    placeholder="Add extension (e.g. FIG, PSD, MP4)"
                    className="flex-1 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white font-medium focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomExtension}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}

            {/* Size & Limits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Max File Size Limit
                </label>
                <select
                  value={maxFileSizeMB}
                  onChange={(e) => setMaxFileSizeMB(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
                >
                  <option value={25}>25 MB</option>
                  <option value={50}>50 MB</option>
                  <option value={100}>100 MB (Standard)</option>
                  <option value={250}>250 MB (Media/ZIP)</option>
                  <option value={500}>500 MB (Large Projects)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Max File Count Per Student
                </label>
                <select
                  value={maxFilesCount}
                  onChange={(e) => setMaxFilesCount(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
                >
                  <option value={1}>1 File</option>
                  <option value={3}>Up to 3 Files</option>
                  <option value={5}>Up to 5 Files</option>
                  <option value={10}>Up to 10 Files</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    External URLs
                  </span>
                  <SwitchToggle checked={allowExternalLinks} onChange={setAllowExternalLinks} />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              ← Back to Evaluation
            </button>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                {isEditMode ? "Save Draft Changes" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-500/20 flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Assign & Publish</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* STEP 4: ASSIGN COHORT & PUBLISH                               */}
      {/* ============================================================= */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <span>ASSIGN COHORT & PUBLISH</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Course: {selectedCourse?.title}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select student audience scope, configure alert notifications, review complete assignment profile, and publish.
            </p>
          </div>

          {/* Audience Targeting Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Users size={16} className="text-blue-500" />
              <span>Target Student Audience Scope</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setAssigneeTarget("allCourseStudents")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                  assigneeTarget === "allCourseStudents"
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-xs"
                    : "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                    assigneeTarget === "allCourseStudents"
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-400"
                  }`}
                >
                  {assigneeTarget === "allCourseStudents" && <Check size={12} />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    All Enrolled Course Students (Recommended)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Assignment is assigned to all current and upcoming enrolled learners in {selectedCourse?.title}.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setAssigneeTarget("specificStudents")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                  assigneeTarget === "specificStudents"
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-xs"
                    : "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                    assigneeTarget === "specificStudents"
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-400"
                  }`}
                >
                  {assigneeTarget === "specificStudents" && <Check size={12} />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Specific Individual Students
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Hand-pick specific students for customized makeup assignments or remediation.
                  </p>
                </div>
              </div>
            </div>

            {/* If specific students chosen, render multi-select list */}
            {assigneeTarget === "specificStudents" && (
              <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Select Students ({selectedStudentIds.length} selected)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedStudentIds.length === filteredStudents.length) {
                        setSelectedStudentIds([]);
                      } else {
                        setSelectedStudentIds(filteredStudents.map((s) => s.id));
                      }
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    {selectedStudentIds.length === filteredStudents.length ? "Deselect All" : "Select All Available"}
                  </button>
                </div>

                <input
                  type="text"
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  placeholder="Search students by name or email..."
                  className="w-full bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-hidden"
                />

                <div className="max-h-48 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudentIds.includes(student.id);
                    return (
                      <div
                        key={student.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedStudentIds((prev) => prev.filter((id) => id !== student.id));
                          } else {
                            setSelectedStudentIds((prev) => [...prev, student.id]);
                          }
                        }}
                        className={`p-2 rounded-xl flex items-center justify-between border cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700"
                            : "bg-white dark:bg-[#0b1329] border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={student.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                            alt={student.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                              {student.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {student.email || student.id}
                            </p>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 dark:border-slate-600"
                        }`}>
                          {isSelected && <Check size={11} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Publication Status & Notification Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Publication Status
              </label>
              <select
                value={publicationStatus}
                onChange={(e) => setPublicationStatus(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-bold focus:outline-hidden"
              >
                <option value="published">Published & Live (Active for Students)</option>
                <option value="draft">Save as Draft (Instructor Preview Only)</option>
                <option value="scheduled">Scheduled Release (Goes Live on Start Date)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Student Notification Broadcast
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Send In-App Notification
                  </span>
                  <SwitchToggle checked={sendInAppNotification} onChange={setSendInAppNotification} />
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Send Email Announcement
                  </span>
                  <SwitchToggle checked={sendEmailAlert} onChange={setSendEmailAlert} />
                </div>
              </div>
            </div>
          </div>

          {/* Complete Summary Card */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Assignment Configuration Summary
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Course</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {selectedCourse?.title}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Max Points</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 block">
                  {maxScore} pts ({rubricItems.length} criteria)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Due Date</span>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {dueDate}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Attachments</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                  {uploadedMaterials.length} Files • Any format
                </span>
              </div>
            </div>
          </div>

          {/* Navigation & Final Submission */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              ← Back to Attachments
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                {isEditMode ? "Save Draft Changes" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={handlePublishAssignment}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center space-x-2 cursor-pointer active:scale-95"
              >
                <CheckCircle2 size={16} />
                <span>{isEditMode ? "Update & Save Assignment" : "Publish Assignment"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 Publish Confirmation Popup */}
      <PublishSuccessModal
        isOpen={showPublishSuccessModal}
        onClose={() => {
          setShowPublishSuccessModal(false);
          navigate("/manage-assignments");
        }}
        type="Assignment"
        isEdit={isEditMode}
        itemTitle={publishedAssignmentSummary?.title || assignmentTitle}
        courseTitle={publishedAssignmentSummary?.courseTitle || selectedCourse?.title}
        metadata={publishedAssignmentSummary?.metadata || []}
        onCreateNew={handleCreateAnotherAssignment}
        onGoToPage={() => navigate("/manage-assignments")}
        pageName="Manage Assignments"
      />
    </div>
  );
};

export default CreateAssignmentPage;
