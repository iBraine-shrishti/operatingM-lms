import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  CircleDot,
  ArrowUpDown,
  Clock,
  Award,
  Users,
  Layers,
  Shield,
  Sparkles,
  BookOpen,
  AlertCircle,
  Save,
  Eye,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  BarChart3,
  ListOrdered,
  SlidersHorizontal,
} from "lucide-react";
import { lmsService } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import { DEFAULT_QUIZ_QUESTIONS } from "../components/admin/QuizManagementDetailFlow";

// Modern Switch Toggle in Theme Blue
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

export const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const courses = lmsService.getCourses();
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  // Stepper State (4 Process Steps matching Create Course Flow)
  const [currentStep, setCurrentStep] = useState(1);

  // Existing quiz data if in edit mode
  const existingQuiz = useMemo(() => {
    if (!editId) return null;
    return lmsService.getQuizById(editId) || null;
  }, [editId]);

  // -------------------------------------------------------------
  // STEP 1 STATE: QUIZ DETAILS & SCOPE
  // -------------------------------------------------------------
  const [quizTitle, setQuizTitle] = useState("");
  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || "course-3");
  const [quizCategory, setQuizCategory] = useState("Digital Marketing");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizFormat, setQuizFormat] = useState("Standard Graded Assessment");
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [difficultyLevel, setDifficultyLevel] = useState("Intermediate");

  // -------------------------------------------------------------
  // STEP 2 STATE: EVALUATION RULES & SETTINGS
  // -------------------------------------------------------------
  const [passScorePercentage, setPassScorePercentage] = useState(80);
  const [retakesAllowed, setRetakesAllowed] = useState(1);
  const [autoEvaluateResults, setAutoEvaluateResults] = useState(true);
  const [randomizeQuestions, setRandomizeQuestions] = useState(false);
  const [showResultsImmediately, setShowResultsImmediately] = useState(true);
  const [showQuestionExplanation, setShowQuestionExplanation] = useState(true);
  const [allowInstantCheck, setAllowInstantCheck] = useState(false);
  const [timeLimitPerQuestion, setTimeLimitPerQuestion] = useState(0);
  const [postQuizMessage, setPostQuizMessage] = useState(
    "Congratulations on completing your assessment! Review your evaluation breakdown below.",
  );

  // -------------------------------------------------------------
  // STEP 3 STATE: QUESTION BUILDER
  // -------------------------------------------------------------
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  // New / Active Question Form State
  const [qType, setQType] = useState("multiplechoice"); // 'multiplechoice' | 'truefalse' | 'multicorrect' | 'shorttext'
  const [qTitle, setQTitle] = useState("");
  const [qStatement, setQStatement] = useState("");
  const [qMarks, setQMarks] = useState(1);
  const [qExplanation, setQExplanation] = useState("");
  const [qOptions, setQOptions] = useState([
    { id: "opt-1", text: "Option A", isCorrect: true },
    { id: "opt-2", text: "Option B", isCorrect: false },
    { id: "opt-3", text: "Option C", isCorrect: false },
    { id: "opt-4", text: "Option D", isCorrect: false },
  ]);
  const [qTrueFalseAnswer, setQTrueFalseAnswer] = useState("true");

  // -------------------------------------------------------------
  // STEP 4 STATE: ASSIGN, REVIEW & PUBLISH
  // -------------------------------------------------------------
  const [assignmentScope, setAssignmentScope] = useState("course-cohort"); // 'course-cohort' | 'selected-students' | 'open'
  const [selectedStudentList, setSelectedStudentList] = useState(["admin", "User User"]);
  const [publicationStatus, setPublicationStatus] = useState("active"); // 'active' | 'draft'

  // Pre-fill state when editing an existing quiz
  useEffect(() => {
    if (existingQuiz) {
      setQuizTitle(existingQuiz.title || "");
      setTargetCourseId(existingQuiz.courseId || courses[0]?.id || "course-3");
      setQuizCategory(existingQuiz.category || "Digital Marketing");
      setQuizDescription(existingQuiz.description || "");
      setDurationMinutes(existingQuiz.durationMinutes || 20);
      setPassScorePercentage(existingQuiz.passScorePercentage || 80);
      setPublicationStatus(existingQuiz.status || "active");

      // Load questions
      if (existingQuiz.questions && existingQuiz.questions.length > 0) {
        setQuestions(existingQuiz.questions);
      } else if (existingQuiz.id === "q-1" && DEFAULT_QUIZ_QUESTIONS) {
        setQuestions(DEFAULT_QUIZ_QUESTIONS);
      } else {
        // Generate sensible questions for editing
        setQuestions([
          {
            id: 1,
            title: "Assessment Question 1",
            options: [
              { id: "a", text: "Primary strategic objective", isCorrect: true },
              { id: "b", text: "Secondary consideration", isCorrect: false },
              { id: "c", text: "Irrelevant metric", isCorrect: false },
              { id: "d", text: "Deprecated practice", isCorrect: false },
            ],
            explanation: "Core module assessment rationale.",
            marks: 1,
          },
        ]);
      }
    } else {
      // Default initial questions for create mode
      setQuestions([
        {
          id: 1,
          title: "Foundational Knowledge Check",
          options: [
            { id: "a", text: "Primary core concept", isCorrect: true },
            { id: "b", text: "Incorrect alternative", isCorrect: false },
            { id: "c", text: "Unrelated option", isCorrect: false },
            { id: "d", text: "Secondary aspect", isCorrect: false },
          ],
          explanation: "Mastery of foundational concepts is required for advanced chapters.",
          marks: 1,
        },
      ]);
    }
  }, [existingQuiz]);

  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id === targetCourseId) || courses[0];
  }, [courses, targetCourseId]);

  // Total marks computed from questions
  const totalCalculatedMarks = useMemo(() => {
    if (questions.length === 0) return 20;
    return questions.reduce((sum, q) => sum + (Number(q.marks) || 1), 0);
  }, [questions]);

  // Stepper Process Definition (Matching Create Course Flow)
  const PROCESS_STEPS = [
    { num: 1, title: "QUIZ DETAILS", subtitle: "Scope & curriculum mapping" },
    { num: 2, title: "EVALUATION RULES", subtitle: "Pass criteria & timing" },
    { num: 3, title: "QUESTION BUILDER", subtitle: `Add & configure questions (${questions.length})` },
    { num: 4, title: "ASSIGN & PUBLISH", subtitle: "Target cohort & live status" },
  ];

  // -------------------------------------------------------------
  // QUESTION BUILDER HANDLERS
  // -------------------------------------------------------------
  const handleAddOption = () => {
    if (qOptions.length >= 6) {
      showToast("Maximum 6 options allowed per question", "warning");
      return;
    }
    const nextChar = String.fromCharCode(65 + qOptions.length);
    setQOptions([
      ...qOptions,
      { id: `opt-${Date.now()}`, text: `Option ${nextChar}`, isCorrect: false },
    ]);
  };

  const handleRemoveOption = (optId) => {
    if (qOptions.length <= 2) {
      showToast("Question must have at least 2 options", "warning");
      return;
    }
    setQOptions(qOptions.filter((o) => o.id !== optId));
  };

  const handleOptionTextChange = (optId, newText) => {
    setQOptions(
      qOptions.map((o) => (o.id === optId ? { ...o, text: newText } : o)),
    );
  };

  const handleSetCorrectOption = (optId) => {
    if (qType === "multicorrect") {
      setQOptions(
        qOptions.map((o) =>
          o.id === optId ? { ...o, isCorrect: !o.isCorrect } : o,
        ),
      );
    } else {
      setQOptions(
        qOptions.map((o) => ({ ...o, isCorrect: o.id === optId })),
      );
    }
  };

  const resetQuestionForm = () => {
    setEditingQuestionId(null);
    setQTitle("");
    setQStatement("");
    setQMarks(1);
    setQExplanation("");
    setQOptions([
      { id: "opt-1", text: "Option A", isCorrect: true },
      { id: "opt-2", text: "Option B", isCorrect: false },
      { id: "opt-3", text: "Option C", isCorrect: false },
      { id: "opt-4", text: "Option D", isCorrect: false },
    ]);
    setQTrueFalseAnswer("true");
    setQType("multiplechoice");
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!qStatement.trim()) {
      showToast("Please provide the question statement or prompt", "warning");
      return;
    }

    let finalOptions = [];
    if (qType === "truefalse") {
      finalOptions = [
        { id: "tf-1", text: "True", isCorrect: qTrueFalseAnswer === "true" },
        { id: "tf-2", text: "False", isCorrect: qTrueFalseAnswer === "false" },
      ];
    } else if (qType === "shorttext") {
      finalOptions = [
        { id: "st-1", text: "Short Descriptive Answer", isCorrect: true },
      ];
    } else {
      // Validate that at least one option is marked correct
      const hasCorrect = qOptions.some((o) => o.isCorrect);
      if (!hasCorrect) {
        showToast("Please mark at least one correct option", "warning");
        return;
      }
      finalOptions = qOptions;
    }

    const questionItem = {
      id: editingQuestionId || `qs-${Date.now()}`,
      title: qTitle.trim() || `Question ${questions.length + 1}`,
      statement: qStatement.trim(),
      type: qType,
      options: finalOptions,
      explanation: qExplanation.trim(),
      marks: Number(qMarks) || 1,
    };

    if (editingQuestionId) {
      setQuestions(
        questions.map((q) => (q.id === editingQuestionId ? questionItem : q)),
      );
      showToast(`Question "${questionItem.title}" updated`, "success");
    } else {
      setQuestions([...questions, questionItem]);
      showToast(`Question "${questionItem.title}" added to quiz`, "success");
    }
    resetQuestionForm();
  };

  const handleEditQuestion = (item) => {
    setEditingQuestionId(item.id);
    setQTitle(item.title || "");
    setQStatement(item.statement || item.title || "");
    setQMarks(item.marks || 1);
    setQExplanation(item.explanation || "");
    setQType(item.type || "multiplechoice");

    if (item.options && item.options.length > 0) {
      setQOptions(item.options);
      if (item.type === "truefalse") {
        const correctOpt = item.options.find((o) => o.isCorrect);
        setQTrueFalseAnswer(correctOpt?.text?.toLowerCase() === "false" ? "false" : "true");
      }
    }
  };

  const handleDeleteQuestion = (id) => {
    if (questions.length <= 1) {
      showToast("Quiz must have at least one question", "warning");
      return;
    }
    setQuestions(questions.filter((q) => q.id !== id));
    if (editingQuestionId === id) resetQuestionForm();
    showToast("Question deleted", "info");
  };

  const handleImportSampleQuestions = () => {
    if (DEFAULT_QUIZ_QUESTIONS && DEFAULT_QUIZ_QUESTIONS.length > 0) {
      setQuestions(DEFAULT_QUIZ_QUESTIONS);
      showToast(
        `Imported ${DEFAULT_QUIZ_QUESTIONS.length} assessment bank questions into this quiz!`,
        "success",
        "Questions Loaded",
      );
    }
  };

  // -------------------------------------------------------------
  // SAVE & PUBLISH HANDLERS
  // -------------------------------------------------------------
  const handleSaveDraft = () => {
    if (!quizTitle.trim()) {
      showToast("Please enter at least a quiz title to save draft", "warning");
      return;
    }

    const payload = {
      title: quizTitle.trim(),
      courseId: targetCourseId,
      courseTitle: selectedCourse?.title || "Digital Marketing",
      category: quizCategory,
      description: quizDescription.trim() || "Draft quiz assessment.",
      durationMinutes: Number(durationMinutes) || 20,
      totalQuestions: questions.length,
      totalMarks: totalCalculatedMarks,
      passScorePercentage: Number(passScorePercentage) || 80,
      retakesAllowed: Number(retakesAllowed) || 1,
      autoEvaluation: autoEvaluateResults,
      randomizeQuestions: randomizeQuestions,
      showResultsImmediately: showResultsImmediately,
      questions: questions,
      status: "draft",
    };

    if (isEditMode && editId) {
      lmsService.updateQuiz(editId, payload);
      showToast(`Quiz draft "${quizTitle}" updated!`, "info", "Draft Saved");
    } else {
      lmsService.addQuiz(payload);
      showToast(`Quiz draft "${quizTitle}" saved!`, "info", "Draft Saved");
    }
  };

  const handlePublish = (e) => {
    if (e) e.preventDefault();

    if (!quizTitle.trim()) {
      showToast("Please enter a quiz title in Step 1", "error");
      setCurrentStep(1);
      return;
    }

    if (questions.length === 0) {
      showToast("Please add at least one question in Step 3", "error");
      setCurrentStep(3);
      return;
    }

    const payload = {
      title: quizTitle.trim(),
      courseId: targetCourseId,
      courseTitle: selectedCourse?.title || "Digital Marketing",
      category: quizCategory,
      description:
        quizDescription.trim() ||
        "Comprehensive standardized examination assessing core modules and applied competency.",
      durationMinutes: Number(durationMinutes) || 20,
      totalQuestions: questions.length,
      totalMarks: totalCalculatedMarks,
      passScorePercentage: Number(passScorePercentage) || 80,
      retakesAllowed: Number(retakesAllowed) || 1,
      autoEvaluation: autoEvaluateResults,
      randomizeQuestions: randomizeQuestions,
      showResultsImmediately: showResultsImmediately,
      questions: questions,
      status: publicationStatus,
    };

    if (isEditMode && editId) {
      lmsService.updateQuiz(editId, payload);
      showToast(
        `Quiz "${quizTitle}" updated successfully! Redirecting...`,
        "success",
        "Quiz Updated",
      );
    } else {
      lmsService.addQuiz(payload);
      showToast(
        `Quiz "${quizTitle}" published successfully! Redirecting...`,
        "success",
        "Quiz Created",
      );
    }

    setTimeout(() => {
      navigate("/manage-quizzes");
    }, 900);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-14 animate-in fade-in duration-200">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: BACK BUTTON & DRAFT STATUS                        */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/manage-quizzes")}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors bg-white dark:bg-[#0b1329] px-3.5 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Manage Quizzes</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 bg-white dark:bg-[#0b1329] px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            Save Draft
          </button>
          <span className="text-xs font-bold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-200/80 dark:border-blue-800 tabular-nums">
            Process {currentStep} of 4
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4-STEP PROCESS STEPPER HEADER (Matching Create Course Flow)   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs relative">
        {/* Top Accent Indicator Progress Line */}
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
                    className={`text-[10px] font-extrabold uppercase tracking-wider hidden md:inline ${
                      isCurrent
                        ? "text-blue-600 dark:text-cyan-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    Step {s.num}
                  </span>
                </div>

                <h4
                  className={`text-xs md:text-sm font-black tracking-tight leading-snug ${
                    isCurrent
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {s.title}
                </h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 hidden md:block mt-0.5 leading-tight">
                  {s.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================= */}
      {/* STEP 1: QUIZ DETAILS & SCOPE                                  */}
      {/* ============================================================= */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEditMode ? "Edit Quiz Scope & Details" : "Create Quiz Scope & Details"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Establish the target curriculum course, examination title, instructions, and overall timing.
              </p>
            </div>

            <div className="space-y-5">
              {/* Quiz Title */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  Quiz Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="e.g. Digital Marketing Aptitude Quiz! or SEO Optimization Exam"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-medium"
                />
              </div>

              {/* Target Course & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Target Course Curriculum <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={targetCourseId}
                      onChange={(e) => setTargetCourseId(e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 cursor-pointer pr-10"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Assessment Discipline / Category
                  </label>
                  <input
                    type="text"
                    value={quizCategory}
                    onChange={(e) => setQuizCategory(e.target.value)}
                    placeholder="e.g. Digital Marketing, SEO Strategy, WordPress"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-medium"
                  />
                </div>
              </div>

              {/* Description & Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  Test Instructions & Overview
                </label>
                <textarea
                  rows={3}
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Explain what concepts this assessment evaluates and any rules students must observe."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 resize-none font-medium"
                />
              </div>

              {/* Duration & Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Total Duration (Minutes)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={300}
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <Clock
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Target Difficulty Level
                  </label>
                  <select
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="Beginner">Beginner Level</option>
                    <option value="Intermediate">Intermediate Practitioner</option>
                    <option value="Advanced">Advanced Masterclass</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Step 1 Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate("/manage-quizzes")}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (!quizTitle.trim()) {
                  showToast("Please enter a quiz title before proceeding", "warning");
                  return;
                }
                setCurrentStep(2);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs flex items-center space-x-2 cursor-pointer transition-all"
            >
              <span>Next: Evaluation Rules</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* STEP 2: EVALUATION RULES & EXAMINATION SETTINGS               */}
      {/* ============================================================= */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Grading Thresholds & Security Rules
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Configure auto-grading policies, retake limits, question randomization, and immediate score feedback.
              </p>
            </div>

            <div className="space-y-6">
              {/* Pass Score Percentage Slider */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                      Passing Score Cutoff Percentage
                    </label>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Minimum percentage score required for certificate credit & passing badge.
                    </span>
                  </div>
                  <span className="text-lg font-black text-blue-600 dark:text-cyan-400 tabular-nums">
                    {passScorePercentage}%
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min={40}
                    max={100}
                    step={5}
                    value={passScorePercentage}
                    onChange={(e) => setPassScorePercentage(Number(e.target.value))}
                    className="flex-1 accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                  <div className="w-20">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={passScorePercentage}
                      onChange={(e) => setPassScorePercentage(Number(e.target.value))}
                      className="w-full text-center py-1.5 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Retakes Allowed & Per-Question Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Extra Retakes Permitted
                  </label>
                  <select
                    value={retakesAllowed}
                    onChange={(e) => setRetakesAllowed(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600 cursor-pointer"
                  >
                    <option value={0}>0 (1 single attempt only)</option>
                    <option value={1}>1 Retake Allowed (2 attempts)</option>
                    <option value={2}>2 Retakes Allowed (3 attempts)</option>
                    <option value={3}>3 Retakes Allowed</option>
                    <option value={999}>Unlimited Retakes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Per-Question Time Limit (Seconds)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={600}
                    value={timeLimitPerQuestion}
                    onChange={(e) => setTimeLimitPerQuestion(Number(e.target.value))}
                    placeholder="0 = No per-question countdown"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Auto-Evaluate Results
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Instant computerized scoring upon submission.
                    </span>
                  </div>
                  <SwitchToggle
                    checked={autoEvaluateResults}
                    onChange={setAutoEvaluateResults}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Randomize Question Order
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Shuffle sequence per learner attempt.
                    </span>
                  </div>
                  <SwitchToggle
                    checked={randomizeQuestions}
                    onChange={setRandomizeQuestions}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Show Results Immediately
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Display final percentage score upon completion.
                    </span>
                  </div>
                  <SwitchToggle
                    checked={showResultsImmediately}
                    onChange={setShowResultsImmediately}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Show Answer Explanations
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Display learning rationale on evaluated review.
                    </span>
                  </div>
                  <SwitchToggle
                    checked={showQuestionExplanation}
                    onChange={setShowQuestionExplanation}
                  />
                </div>
              </div>

              {/* Post-Quiz Message */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  Post-Submission Completion Message
                </label>
                <input
                  type="text"
                  value={postQuizMessage}
                  onChange={(e) => setPostQuizMessage(e.target.value)}
                  placeholder="e.g. Great job! Review your score breakdown and progress."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Step 2 Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
            >
              Back: Quiz Details
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs flex items-center space-x-2 cursor-pointer transition-all"
            >
              <span>Next: Question Builder</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* STEP 3: QUESTION BUILDER (Interactive Questions Management)    */}
      {/* ============================================================= */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Question Summary & Bank Importer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0b1329] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <CheckSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Questions Configured: {questions.length} Qs
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total Marks: {totalCalculatedMarks} • Passing Cutoff: {passScorePercentage}%
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleImportSampleQuestions}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
                title="Import default 20 questions from Digital Marketing assessment bank"
              >
                <Sparkles size={14} className="text-blue-600 dark:text-cyan-400" />
                <span>Import Bank Questions (20)</span>
              </button>
            </div>
          </div>

          {/* Active Question Editor Form */}
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {editingQuestionId ? "Edit Question" : "Add New Question"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select question type, input statement, define answer options, and specify the correct choice.
                </p>
              </div>

              {editingQuestionId && (
                <button
                  type="button"
                  onClick={resetQuestionForm}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-5">
              {/* Question Type Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wider">
                  Question Format / Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "multiplechoice", label: "Multiple Choice", icon: CircleDot },
                    { id: "truefalse", label: "True / False", icon: Check },
                    { id: "multicorrect", label: "Multiple Correct", icon: CheckSquare },
                    { id: "shorttext", label: "Short Text", icon: FileText },
                  ].map((t) => {
                    const isSelected = qType === t.id;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setQType(t.id)}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs dark:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                            : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <Icon size={14} />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Marks */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Question Label / Tag
                  </label>
                  <input
                    type="text"
                    value={qTitle}
                    onChange={(e) => setQTitle(e.target.value)}
                    placeholder="e.g. SEO Crawling & Rendering Mechanics"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                    Marks / Points
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={qMarks}
                    onChange={(e) => setQMarks(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Question Statement */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  Question Statement / Prompt <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={qStatement}
                  onChange={(e) => setQStatement(e.target.value)}
                  placeholder="Enter the full question prompt clearly for students..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-600 resize-none font-medium"
                />
              </div>

              {/* Answer Options Builder */}
              {qType === "truefalse" ? (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Correct Binary Answer
                  </label>
                  <div className="flex items-center space-x-4">
                    <label
                      onClick={() => setQTrueFalseAnswer("true")}
                      className={`flex-1 p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition-colors ${
                        qTrueFalseAnswer === "true"
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300"
                          : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Check size={16} />
                      <span>True is Correct</span>
                    </label>

                    <label
                      onClick={() => setQTrueFalseAnswer("false")}
                      className={`flex-1 p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition-colors ${
                        qTrueFalseAnswer === "false"
                          ? "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300"
                          : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <X size={16} />
                      <span>False is Correct</span>
                    </label>
                  </div>
                </div>
              ) : qType === "shorttext" ? (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500">
                  Short descriptive answers will be reviewed manually or matched against standard keywords.
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Options & Correct Choice Selection
                    </label>
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add Option</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {qOptions.map((opt, idx) => (
                      <div
                        key={opt.id}
                        className={`flex items-center space-x-3 p-2.5 rounded-xl border transition-colors ${
                          opt.isCorrect
                            ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-500"
                            : "bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleSetCorrectOption(opt.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                            opt.isCorrect
                              ? "bg-blue-600 text-white shadow-xs"
                              : "border border-slate-300 dark:border-slate-600 text-transparent hover:border-blue-400"
                          }`}
                          title={opt.isCorrect ? "Correct Option" : "Click to mark as correct"}
                        >
                          <Check size={13} />
                        </button>

                        <input
                          type="text"
                          required
                          value={opt.text}
                          onChange={(e) => handleOptionTextChange(opt.id, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + idx)} text...`}
                          className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden font-medium"
                        />

                        {opt.isCorrect && (
                          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider bg-blue-100/60 dark:bg-blue-900/50 px-2 py-0.5 rounded-md shrink-0">
                            Correct Answer
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveOption(opt.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors"
                          title="Remove option"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Explanation Hint */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  Answer Explanation / Learning Rationale
                </label>
                <textarea
                  rows={2}
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Explain why the designated answer is correct to help learners improve..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-600 resize-none font-medium"
                />
              </div>

              {/* Save Question CTA */}
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer transition-all"
                >
                  <Plus size={15} />
                  <span>{editingQuestionId ? "Update Question" : "Add Question to Quiz"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Configured Questions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
              Questions in this Quiz ({questions.length})
            </h4>

            <div className="space-y-2.5">
              {questions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="bg-white dark:bg-[#0b1329] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">
                        Q{idx + 1}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-500 uppercase text-[11px]">
                        {q.type || "Multiple Choice"}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                        {q.marks || 1} {q.marks === 1 ? "Mark" : "Marks"}
                      </span>
                    </div>

                    <h5 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">
                      {q.statement || q.title}
                    </h5>

                    {q.options && (
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {q.options.length} options • Correct:{" "}
                        {q.options.find((o) => o.isCorrect)?.text || "Configured"}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleEditQuestion(q)}
                      className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit question"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete question"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3 Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
            >
              Back: Evaluation Rules
            </button>
            <button
              type="button"
              onClick={() => {
                if (questions.length === 0) {
                  showToast("Please add at least one question before proceeding", "warning");
                  return;
                }
                setCurrentStep(4);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs flex items-center space-x-2 cursor-pointer transition-all"
            >
              <span>Next: Assign & Publish</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* STEP 4: ASSIGN, REVIEW & PUBLISH                              */}
      {/* ============================================================= */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Audience Assignment & Final Publication
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Target this assessment to cohorts or specific students, review the test summary, and publish live.
              </p>
            </div>

            <div className="space-y-6">
              {/* Audience Scope Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wider">
                  Audience Scope & Access Policy
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "course-cohort",
                      title: "Enrolled Course Cohort",
                      desc: "All students registered in target course",
                      icon: Layers,
                    },
                    {
                      id: "selected-students",
                      title: "Selected Students",
                      desc: "Explicitly assigned learners",
                      icon: Users,
                    },
                    {
                      id: "open",
                      title: "Open LMS Access",
                      desc: "Available to any active enrolled student",
                      icon: BookOpen,
                    },
                  ].map((scope) => {
                    const isSelected = assignmentScope === scope.id;
                    const Icon = scope.icon;
                    return (
                      <div
                        key={scope.id}
                        onClick={() => setAssignmentScope(scope.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 shadow-xs"
                            : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1.5">
                          <Icon
                            size={16}
                            className={isSelected ? "text-blue-600 dark:text-cyan-400" : "text-slate-500"}
                          />
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                            {scope.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {scope.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Radio Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wider">
                  Publication Status
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <label
                    onClick={() => setPublicationStatus("active")}
                    className={`flex items-center space-x-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                      publicationStatus === "active"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold"
                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs">Active & Available</span>
                  </label>

                  <label
                    onClick={() => setPublicationStatus("draft")}
                    className={`flex items-center space-x-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                      publicationStatus === "draft"
                        ? "bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-900 dark:text-white font-bold"
                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <span className="text-xs">Draft (Hidden)</span>
                  </label>
                </div>
              </div>

              {/* Summary Preview Card */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Assessment Summary Overview
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">
                    Ready to Save
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Quiz Title</span>
                    <strong className="font-bold text-slate-900 dark:text-white">
                      {quizTitle || "Untitled Quiz"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Course Curriculum</span>
                    <strong className="font-bold text-slate-900 dark:text-white">
                      {selectedCourse?.title}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Duration / Marks</span>
                    <strong className="font-bold text-slate-900 dark:text-white">
                      {durationMinutes}m • {totalCalculatedMarks} Marks
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Passing Cutoff</span>
                    <strong className="font-bold text-blue-600 dark:text-cyan-400">
                      {passScorePercentage}% ({questions.length} Questions)
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
            >
              Back: Question Builder
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-5 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{isEditMode ? "Save Changes" : "Publish Quiz"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizPage;
