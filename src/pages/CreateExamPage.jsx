import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Check,
  X,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  Sliders,
  Award,
  Layers,
  Lock,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Info,
  BookOpen,
  Monitor,
  Flame,
  FileText,
  BadgeAlert,
  Send,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  DEFAULT_EXAM_CONFIG,
  DEFAULT_EXAM_SECTIONS,
  DEFAULT_EXAM_QUESTIONS,
  getActiveExamConfig,
  saveActiveExamConfig,
  resetActiveExamConfig,
} from "../data/examDefaultData";

export const CreateExamPage = () => {
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useAuth();
  const { showToast } = useToast();

  // Active configuration state initialized from saved localStorage or default
  const [config, setConfig] = useState(() => getActiveExamConfig());
  const [activeTab, setActiveTab] = useState("details"); // 'details' | 'scoring' | 'proctoring' | 'domains' | 'questions' | 'simulator'
  const [isDirty, setIsDirty] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Question bank filters
  const [questionSearch, setQuestionSearch] = useState("");
  const [selectedDomainFilter, setSelectedDomainFilter] = useState("all");
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState("all");

  // Question editing modal state
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Domain editing modal state
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState(null);

  // Simulator state inside admin preview
  const [simStage, setSimStage] = useState("BRIEFING"); // 'BRIEFING' | 'LIVE_EXAM' | 'SCORECARD'
  const [simActiveIndex, setSimActiveIndex] = useState(0);
  const [simAnswers, setSimAnswers] = useState({});
  const [simReviews, setSimReviews] = useState({});
  const [simPledgeAccepted, setSimPledgeAccepted] = useState(false);
  const [simStrikes, setSimStrikes] = useState(0);

  const fileInputRef = useRef(null);

  // Update top-level config helper
  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);
  };

  // Calculated Metrics
  const totalQuestions = config.questions.length;
  const maxPossibleScore = Number((totalQuestions * (Number(config.positiveMarks) || 2.0)).toFixed(2));
  const minPassingScore = Number(((maxPossibleScore * (Number(config.passPercentage) || 80.0)) / 100).toFixed(2));
  const passQuestionsNeeded = Math.ceil((totalQuestions * (Number(config.passPercentage) || 80.0)) / 100);

  // Filtered Questions for Question Bank Tab
  const filteredQuestions = useMemo(() => {
    return config.questions.filter((q) => {
      const matchesSearch =
        !questionSearch ||
        q.text.toLowerCase().includes(questionSearch.toLowerCase()) ||
        q.explanation?.toLowerCase().includes(questionSearch.toLowerCase()) ||
        q.options.some((o) => o.text.toLowerCase().includes(questionSearch.toLowerCase()));

      const matchesDomain =
        selectedDomainFilter === "all" || q.sectionId === selectedDomainFilter;

      const matchesDifficulty =
        selectedDifficultyFilter === "all" || q.difficulty === selectedDifficultyFilter;

      return matchesSearch && matchesDomain && matchesDifficulty;
    });
  }, [config.questions, questionSearch, selectedDomainFilter, selectedDifficultyFilter]);

  // Questions count per section
  const sectionCounts = useMemo(() => {
    const counts = {};
    config.sections.forEach((s) => {
      counts[s.id] = config.questions.filter((q) => q.sectionId === s.id).length;
    });
    return counts;
  }, [config.sections, config.questions]);

  // Save changes to active exam
  const handleSaveAndPublish = () => {
    const success = saveActiveExamConfig(config);
    if (success) {
      setIsDirty(false);
      setLastSavedTime(new Date().toLocaleTimeString());
      showToast(
        "Exam blueprint successfully published to live student terminal!",
        "success"
      );
    } else {
      showToast("Failed to save exam blueprint.", "error");
    }
  };

  // Reset to default factory blueprint
  const handleResetToDefault = () => {
    if (
      window.confirm(
        "Are you sure you want to restore the official factory 60-Question Examination blueprint? Any unsaved edits will be replaced."
      )
    ) {
      resetActiveExamConfig();
      setConfig(DEFAULT_EXAM_CONFIG);
      setIsDirty(false);
      setLastSavedTime(null);
      showToast(
        "Restored factory 60-question technical examination blueprint.",
        "info"
      );
    }
  };

  // Export JSON configuration file
  const handleExportJSON = () => {
    try {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(config, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `exam-blueprint-${config.examCode || "omc-exam"}-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Exam blueprint exported as JSON.", "success");
    } catch {
      showToast("Error exporting blueprint.", "error");
    }
  };

  // Import JSON configuration file
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.questions || !Array.isArray(parsed.questions)) {
          throw new Error("Invalid format: missing questions array.");
        }
        setConfig({
          ...DEFAULT_EXAM_CONFIG,
          ...parsed,
          questions: parsed.questions,
          sections: parsed.sections || DEFAULT_EXAM_SECTIONS,
        });
        setIsDirty(true);
        showToast(
          `Imported exam with ${parsed.questions.length} questions successfully!`,
          "success"
        );
      } catch (err) {
        showToast(`Import failed: ${err.message}`, "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Question Management Handlers
  const handleOpenAddQuestion = () => {
    const defaultSection = config.sections[0] || {
      id: "sec-1",
      name: "Domain 1: Advanced Technical SEO",
    };
    setEditingQuestion({
      id: Date.now(),
      sectionId: defaultSection.id,
      sectionName: defaultSection.name,
      difficulty: "HIGH",
      marks: Number(config.positiveMarks) || 2.0,
      penalty: Number(config.negativePenalty) || 0.67,
      text: "",
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      correctAnswer: "A",
      explanation: "",
    });
    setQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (question) => {
    setEditingQuestion(JSON.parse(JSON.stringify(question)));
    setQuestionModalOpen(true);
  };

  const handleDuplicateQuestion = (question) => {
    const newQ = {
      ...JSON.parse(JSON.stringify(question)),
      id: Date.now(),
      text: `${question.text} (Copy)`,
    };
    setConfig((prev) => ({
      ...prev,
      questions: [...prev.questions, newQ],
    }));
    setIsDirty(true);
    showToast("Question duplicated successfully.", "success");
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setConfig((prev) => ({
        ...prev,
        questions: prev.questions.filter((q) => q.id !== questionId),
      }));
      setIsDirty(true);
      showToast("Question removed from blueprint.", "info");
    }
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion.text.trim()) {
      showToast("Please enter the question stem text.", "error");
      return;
    }
    const hasEmptyOption = editingQuestion.options.some((o) => !o.text.trim());
    if (hasEmptyOption) {
      showToast("All 4 multiple-choice options (A-D) must have text.", "error");
      return;
    }

    // Resolve sectionName based on sectionId
    const matchedSection = config.sections.find(
      (s) => s.id === editingQuestion.sectionId
    );
    const cleanedQ = {
      ...editingQuestion,
      sectionName: matchedSection ? matchedSection.name : editingQuestion.sectionName,
      marks: Number(editingQuestion.marks) || 2.0,
      penalty: Number(editingQuestion.penalty) || 0.67,
    };

    setConfig((prev) => {
      const exists = prev.questions.some((q) => q.id === cleanedQ.id);
      if (exists) {
        return {
          ...prev,
          questions: prev.questions.map((q) => (q.id === cleanedQ.id ? cleanedQ : q)),
        };
      } else {
        return {
          ...prev,
          questions: [...prev.questions, cleanedQ],
        };
      }
    });

    setIsDirty(true);
    setQuestionModalOpen(false);
    setEditingQuestion(null);
    showToast("Question saved to blueprint.", "success");
  };

  // Domain Management Handlers
  const handleOpenAddDomain = () => {
    setEditingDomain({
      id: `sec-${config.sections.length + 1}`,
      name: `Domain ${config.sections.length + 1}: `,
      count: 15,
    });
    setDomainModalOpen(true);
  };

  const handleOpenEditDomain = (domain) => {
    setEditingDomain({ ...domain });
    setDomainModalOpen(true);
  };

  const handleSaveDomain = () => {
    if (!editingDomain.name.trim()) {
      showToast("Please enter a domain title.", "error");
      return;
    }
    setConfig((prev) => {
      const exists = prev.sections.some((s) => s.id === editingDomain.id);
      if (exists) {
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s.id === editingDomain.id ? editingDomain : s
          ),
        };
      } else {
        return {
          ...prev,
          sections: [...prev.sections, editingDomain],
        };
      }
    });
    setIsDirty(true);
    setDomainModalOpen(false);
    setEditingDomain(null);
    showToast("Domain updated.", "success");
  };

  const handleDeleteDomain = (domainId) => {
    const attachedQuestions = config.questions.filter(
      (q) => q.sectionId === domainId
    ).length;
    if (attachedQuestions > 0) {
      if (
        !window.confirm(
          `This domain contains ${attachedQuestions} questions. Deleting it will also remove those questions. Proceed?`
        )
      ) {
        return;
      }
    }
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== domainId),
      questions: prev.questions.filter((q) => q.sectionId !== domainId),
    }));
    setIsDirty(true);
    showToast("Domain deleted.", "info");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070c18] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150 pb-16">
      {/* ==================================================================== */}
      {/* ADMIN HEADER & CONTROL BAR                                           */}
      {/* ==================================================================== */}
      <header className="bg-white dark:bg-[#0d1527] border-b border-slate-200 dark:border-slate-800/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Title & Authority Badges */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/30 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
                <Sliders size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Examination Architect & Controller
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60">
                    Live Engine v2.4
                  </span>
                  {isDirty && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 animate-pulse">
                      Unsaved Edits
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Design, proctor, and calibrate certification exams for Operating Media students.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {/* Hidden File Input for JSON import */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportJSON}
                accept=".json"
                className="hidden"
              />

              <button
                type="button"
                onClick={handleResetToDefault}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Reset to Factory 60-Q Blueprint"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">Reset Factory</span>
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Export Blueprint JSON"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Import Blueprint JSON"
              >
                <Upload size={13} />
                <span className="hidden sm:inline">Import</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/exam")}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/40 hover:bg-blue-100 dark:hover:bg-cyan-900/50 border border-blue-200 dark:border-cyan-800/60 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Launch Live Student Exam Terminal"
              >
                <ExternalLink size={13} />
                <span>Open /exam</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAndPublish}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Save size={13} />
                <span>Publish to Student Terminal</span>
              </button>
            </div>
          </div>

          {/* Quick Realtime KPI Metric Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Questions</span>
              <span className="font-black text-sm text-slate-900 dark:text-white">{totalQuestions} Items</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
              <span className="font-black text-sm text-blue-600 dark:text-cyan-400">{config.durationMinutes} Minutes</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Scoring Metric</span>
              <span className="font-black text-sm text-slate-900 dark:text-white">+{Number(config.positiveMarks).toFixed(2)} / -{Number(config.negativePenalty).toFixed(2)}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Max Score</span>
              <span className="font-black text-sm text-slate-900 dark:text-white">{maxPossibleScore} Marks</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Passing Cutoff</span>
              <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">{config.passPercentage}% ({minPassingScore} M)</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Lockdown Strikes</span>
              <span className="font-black text-sm text-rose-600 dark:text-rose-400">{config.maxStrikes} Strikes Max</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-1 border-t border-slate-100 dark:border-slate-800/80 custom-scrollbar">
          {[
            { id: "details", label: "1. Exam Identity & Scheduling", icon: FileText },
            { id: "scoring", label: "2. Scoring & Negative Marking", icon: Award },
            { id: "proctoring", label: "3. Proctoring & Anti-Cheat Rules", icon: ShieldAlert },
            { id: "domains", label: "4. Domain Blueprint", icon: Layers },
            { id: "questions", label: `5. Question Matrix (${totalQuestions})`, icon: HelpCircle },
            { id: "simulator", label: "6. Student Terminal Simulator", icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:border-cyan-400 dark:text-cyan-400 bg-blue-50/50 dark:bg-cyan-950/20"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WORKSPACE                                               */}
      {/* ==================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 w-full flex-1">
        {/* ================================================================== */}
        {/* TAB 1: EXAM IDENTITY & SCHEDULING                                  */}
        {/* ================================================================== */}
        {activeTab === "details" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#0e1629] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-blue-600 dark:text-cyan-400" size={18} />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Examination Identity & Administrative Metadata
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Configure official certification credentials visible on the candidate briefing card, admit card slip, and completion diploma.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Examination Title
                  </label>
                  <input
                    type="text"
                    value={config.title}
                    onChange={(e) => handleConfigChange("title", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    placeholder="Diploma in Advanced Digital Marketing..."
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Displays on the student examination top banner and admit card.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Subtitle / Authority Endorsement
                  </label>
                  <input
                    type="text"
                    value={config.subtitle}
                    onChange={(e) => handleConfigChange("subtitle", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    placeholder="Official Certification Examination • Government / Industry Accredited"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Institutional accreditation subtitle.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Target Program / Syllabus Scope
                  </label>
                  <input
                    type="text"
                    value={config.targetCourse}
                    onChange={(e) => handleConfigChange("targetCourse", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    placeholder="Google Ads, Advanced Technical SEO, GA4 Measurement, ORM & Funnels"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Core subjects evaluated within this exam battery.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Examination Hall Ticket Prefix / Roll Number
                  </label>
                  <input
                    type="text"
                    value={config.examCode}
                    onChange={(e) => handleConfigChange("examCode", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    placeholder="OMC-2026-EXAM-0266"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Identifies candidate seat allocations and proctored terminal logs.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Proctored Center Node
                  </label>
                  <input
                    type="text"
                    value={config.centerNode}
                    onChange={(e) => handleConfigChange("centerNode", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    placeholder="Borivali Campus • Proctored Node B-12"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Designated physical campus center or virtual secure node.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Exam Duration (Minutes)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="10"
                      max="180"
                      step="5"
                      value={config.durationMinutes}
                      onChange={(e) =>
                        handleConfigChange("durationMinutes", Math.max(5, parseInt(e.target.value) || 45))
                      }
                      className="w-32 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-1.5">
                      {[30, 45, 60, 90].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => handleConfigChange("durationMinutes", mins)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                            config.durationMinutes === mins
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Strict countdown timer enforced. Auto-submits on expiration.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Failure Retake Cooldown Period (Days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={config.cooldownDays}
                    onChange={(e) =>
                      handleConfigChange("cooldownDays", Math.max(0, parseInt(e.target.value) || 90))
                    }
                    className="w-32 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Standard institutional cooldown is 90 days before student can re-attempt.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: SCORING & NEGATIVE MARKING RUBRIC                           */}
        {/* ================================================================== */}
        {activeTab === "scoring" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#0e1629] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-amber-500" size={18} />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Evaluation Rubric & Penalty Calibration
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Define the negative marking penalties that disincentivize blind guessing and maintain institutional integrity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                    Positive Marks per Correct Answer
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">+</span>
                    <input
                      type="number"
                      step="0.25"
                      min="0.5"
                      max="10"
                      value={config.positiveMarks}
                      onChange={(e) =>
                        handleConfigChange("positiveMarks", parseFloat(e.target.value) || 2.0)
                      }
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-black text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2 block">
                    Default: +2.00 marks per verified correct response.
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                    Negative Penalty per Incorrect Answer
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-black text-rose-600 dark:text-rose-400">-</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                      value={config.negativePenalty}
                      onChange={(e) =>
                        handleConfigChange("negativePenalty", parseFloat(e.target.value) || 0.67)
                      }
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-black text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {[0, 0.25, 0.33, 0.5, 0.67, 1.0].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleConfigChange("negativePenalty", val)}
                        className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                          Number(config.negativePenalty) === val
                            ? "bg-rose-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                        }`}
                      >
                        -{val}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2 block">
                    Operating Media standard is -0.67 marks (1/3 deduction).
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                    Passing Cutoff Threshold (%)
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      step="1"
                      min="40"
                      max="95"
                      value={config.passPercentage}
                      onChange={(e) =>
                        handleConfigChange("passPercentage", parseFloat(e.target.value) || 80.0)
                      }
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-black text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-lg font-black text-slate-500">%</span>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {[60, 70, 75, 80, 85].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleConfigChange("passPercentage", val)}
                        className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                          Number(config.passPercentage) === val
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2 block">
                    Operating Media Diploma requires strict 80.0% threshold.
                  </span>
                </div>
              </div>

              {/* Live Rubric Mathematical Simulation Card */}
              <div className="mt-6 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40">
                <div className="flex items-center gap-2 font-bold text-xs text-blue-900 dark:text-blue-300 mb-2">
                  <Sparkles size={14} className="text-blue-600 dark:text-cyan-400" />
                  <span>Real-Time Scoring Calculation Blueprint</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Total Questions:</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{totalQuestions} Questions</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Maximum Obtainable Score:</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{maxPossibleScore} Marks ({totalQuestions} × {config.positiveMarks})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Passing Cutoff Requirement:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{minPassingScore} Marks ({config.passPercentage}%)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Zero-Penalty Net Correct:</span>
                    <strong className="text-blue-600 dark:text-cyan-400 text-sm">~{passQuestionsNeeded} of {totalQuestions} Correct</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: PROCTORING & ANTI-CHEAT RULES                               */}
        {/* ================================================================== */}
        {activeTab === "proctoring" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#0e1629] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="text-rose-500" size={18} />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Institutional Proctoring & Lockdown Parameters
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Enforce security lockdown policies to protect certification legitimacy during browser testing.
              </p>

              <div className="space-y-5">
                <div className="flex items-start justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="pr-4">
                    <div className="flex items-center gap-2">
                      <Monitor size={16} className="text-blue-600 dark:text-cyan-400" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                        Mandatory Fullscreen Browser Lockdown
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Forces the candidate terminal into full-screen lockdown upon initiating the exam. Exiting full-screen registers an automatic security breach.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={config.fullscreenRequired}
                      onChange={(e) => handleConfigChange("fullscreenRequired", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="pr-4">
                    <div className="flex items-center gap-2">
                      <BadgeAlert size={16} className="text-amber-500" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                        Tab-Switch & Window Blur Detection
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Monitors <code className="text-[11px] font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">visibilitychange</code> and <code className="text-[11px] font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">blur</code> events. Triggers warning popups with strike accumulation.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={config.tabSwitchDetection}
                      onChange={(e) => handleConfigChange("tabSwitchDetection", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame size={16} className="text-rose-600 dark:text-rose-400" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                        Expulsion Strikes Threshold
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      Disqualify at {config.maxStrikes} Strikes
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Number of detected blur or tab-switching violations before candidate is immediately disqualified, locked out, and auto-submitted with 0 marks.
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((strike) => (
                      <button
                        key={strike}
                        type="button"
                        onClick={() => handleConfigChange("maxStrikes", strike)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          config.maxStrikes === strike
                            ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {strike} {strike === 1 ? "Strike" : "Strikes"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                    Candidate Honor Code Pledge Statement
                  </label>
                  <textarea
                    rows={3}
                    value={config.honorPledge}
                    onChange={(e) => handleConfigChange("honorPledge", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    placeholder="Candidate honor pledge..."
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Candidate must review and explicitly tick this statement on the briefing screen before unlocking the examination terminal.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: DOMAINS & SECTIONS BLUEPRINT                                */}
        {/* ================================================================== */}
        {activeTab === "domains" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#0e1629] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="text-blue-600 dark:text-cyan-400" size={18} />
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Curricular Domains & Section Allocations
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Manage the specialized competencies evaluated in this examination and monitor question quota fulfillment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddDomain}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add New Domain</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {config.sections.map((sec, index) => {
                  const actualCount = sectionCounts[sec.id] || 0;
                  const targetCount = sec.count || 15;
                  const percent = Math.min(100, Math.round((actualCount / targetCount) * 100));

                  return (
                    <div
                      key={sec.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-cyan-300 font-bold">
                            {sec.id}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEditDomain(sec)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-white dark:hover:bg-slate-800 cursor-pointer"
                              title="Edit Domain"
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteDomain(sec.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white dark:hover:bg-slate-800 cursor-pointer"
                              title="Delete Domain"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                          {sec.name}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                          <span>Question Quota:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {actualCount} / {targetCount} Configured ({percent}%)
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              percent >= 100
                                ? "bg-emerald-500"
                                : percent >= 50
                                ? "bg-blue-600 dark:bg-cyan-500"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDomainFilter(sec.id);
                            setActiveTab("questions");
                          }}
                          className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Manage {actualCount} Questions</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 5: QUESTION MATRIX & BANK BUILDER                              */}
        {/* ================================================================== */}
        {activeTab === "questions" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-[#0e1629] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex-1 relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  placeholder="Search questions by scenario, keywords, or explanations..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                {questionSearch && (
                  <button
                    onClick={() => setQuestionSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={selectedDomainFilter}
                  onChange={(e) => setSelectedDomainFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Domains ({totalQuestions})</option>
                  {config.sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({sectionCounts[s.id] || 0})
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDifficultyFilter}
                  onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Difficulties</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="EASY">Easy</option>
                </select>

                <button
                  type="button"
                  onClick={handleOpenAddQuestion}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus size={14} />
                  <span>Add Question</span>
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <span>
                  Showing <strong>{filteredQuestions.length}</strong> of{" "}
                  <strong>{totalQuestions}</strong> questions
                </span>
                <span className="text-[11px]">
                  Standard Marks: +{config.positiveMarks} / -{config.negativePenalty}
                </span>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="bg-white dark:bg-[#0e1629] p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                  <HelpCircle className="mx-auto text-slate-400 mb-2" size={32} />
                  <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                    No questions matched your query
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Try adjusting your search criteria or add a new question to this domain.
                  </p>
                </div>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const difficultyColor =
                    q.difficulty === "CRITICAL"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300/50"
                      : q.difficulty === "HIGH"
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300/50"
                      : q.difficulty === "MEDIUM"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300/50"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300/50";

                  return (
                    <div
                      key={q.id}
                      className="bg-white dark:bg-[#0e1629] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      {/* Question Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            {q.sectionName || q.sectionId}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${difficultyColor}`}
                          >
                            {q.difficulty}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            +{q.marks || config.positiveMarks} / -{q.penalty || config.negativePenalty}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleDuplicateQuestion(q)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Duplicate Question"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditQuestion(q)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Edit Question"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Delete Question"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Question Stem Text */}
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed mb-4">
                        {q.text}
                      </p>

                      {/* Options Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt) => {
                          const isCorrect = q.correctAnswer === opt.id;
                          return (
                            <div
                              key={opt.id}
                              className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                                isCorrect
                                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200 font-semibold"
                                  : "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[11px] shrink-0 ${
                                  isCorrect
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                {opt.id}
                              </span>
                              <span className="flex-1 leading-snug">{opt.text}</span>
                              {isCorrect && (
                                <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {q.explanation && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 dark:text-slate-200">
                              Technical Explanation:{" "}
                            </strong>
                            <span>{q.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 6: STUDENT TERMINAL SIMULATOR                                 */}
        {/* ================================================================== */}
        {activeTab === "simulator" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Simulator Control Header */}
            <div className="bg-white dark:bg-[#0e1629] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Eye className="text-blue-600 dark:text-cyan-400" size={18} />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Live Student Terminal Emulator
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Experience how your configured examination renders in the student's browser.
                </p>
              </div>

              {/* Stage Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                {[
                  { id: "BRIEFING", label: "Briefing & Admit Card" },
                  { id: "LIVE_EXAM", label: "Live Terminal Runner" },
                  { id: "SCORECARD", label: "Post-Exam Scorecard" },
                ].map((stg) => (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setSimStage(stg.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      simStage === stg.id
                        ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Embedded Simulator Stage Container */}
            <div className="bg-[#f8fafc] dark:bg-[#070b14] rounded-2xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-md">
              {/* Simulator Top Nav Bar */}
              <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                    OM
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {config.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      Terminal: {config.centerNode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold">
                    PROCTORED SECURE
                  </span>
                </div>
              </div>

              {/* SIM STAGE 1: BRIEFING */}
              {simStage === "BRIEFING" && (
                <div className="p-6 max-w-3xl mx-auto space-y-6">
                  {/* Candidate Admit Slip */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Candidate Examination Admit Slip
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">Candidate:</span>
                        <strong className="text-slate-900 dark:text-white">
                          {currentUser?.name || "Candidate Student"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Roll / Hall Ticket:</span>
                        <strong className="text-slate-900 dark:text-white font-mono">
                          {config.examCode}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Allocated Node:</span>
                        <strong className="text-slate-900 dark:text-white">
                          {config.centerNode}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Duration:</span>
                        <strong className="text-blue-600 dark:text-cyan-400">
                          {config.durationMinutes} Minutes
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Scoring Scheme Card */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Official Institutional Evaluation Scheme
                    </h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                        <span className="text-xl font-black text-emerald-600">
                          +{Number(config.positiveMarks).toFixed(2)}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-1">Per Correct</span>
                      </div>
                      <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                        <span className="text-xl font-black text-rose-600">
                          -{Number(config.negativePenalty).toFixed(2)}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-1">Per Incorrect</span>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                        <span className="text-xl font-black text-blue-600">
                          {config.passPercentage}%
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-1">Passing Mark</span>
                      </div>
                    </div>
                  </div>

                  {/* Honor Code Checkbox */}
                  <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={simPledgeAccepted}
                        onChange={(e) => setSimPledgeAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-blue-600"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {config.honorPledge}
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSimStage("LIVE_EXAM")}
                    className="w-full py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer transition-all"
                  >
                    Simulate Starting Examination
                  </button>
                </div>
              )}

              {/* SIM STAGE 2: LIVE RUNNER */}
              {simStage === "LIVE_EXAM" && (
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Runner Status Bar */}
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-blue-600" />
                      <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                        {config.durationMinutes}:00 Remaining
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Strikes:</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-rose-600 font-black text-xs font-mono">
                        {simStrikes} / {config.maxStrikes}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setSimStrikes((prev) => Math.min(config.maxStrikes, prev + 1))
                        }
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer"
                        title="Simulate Tab Switch Blur Violation"
                      >
                        + Trigger Strike
                      </button>
                    </div>
                  </div>

                  {/* Question and Option Runner */}
                  {config.questions.length > 0 ? (
                    (() => {
                      const currQ = config.questions[simActiveIndex] || config.questions[0];
                      const selectedOpt = simAnswers[currQ.id];

                      return (
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase">
                              Question {simActiveIndex + 1} of {config.questions.length}
                            </span>
                            <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">
                              +{currQ.marks || config.positiveMarks} / -{currQ.penalty || config.negativePenalty}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                            {currQ.text}
                          </h3>

                          <div className="space-y-2">
                            {currQ.options.map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  setSimAnswers((prev) => ({
                                    ...prev,
                                    [currQ.id]: opt.id,
                                  }))
                                }
                                className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-medium text-left flex items-start gap-3 cursor-pointer transition-all ${
                                  selectedOpt === opt.id
                                    ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-900 dark:text-cyan-200 font-bold"
                                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span
                                  className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                                    selectedOpt === opt.id
                                      ? "bg-blue-600 text-white"
                                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                  }`}
                                >
                                  {opt.id}
                                </span>
                                <span className="flex-1 mt-0.5">{opt.text}</span>
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                            <button
                              type="button"
                              disabled={simActiveIndex === 0}
                              onClick={() => setSimActiveIndex((prev) => Math.max(0, prev - 1))}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              onClick={() => setSimStage("SCORECARD")}
                              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                            >
                              Submit & View Scorecard
                            </button>
                            <button
                              type="button"
                              disabled={simActiveIndex === config.questions.length - 1}
                              onClick={() =>
                                setSimActiveIndex((prev) =>
                                  Math.min(config.questions.length - 1, prev + 1)
                                )
                              }
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 cursor-pointer"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No questions configured in this blueprint.
                    </div>
                  )}
                </div>
              )}

              {/* SIM STAGE 3: SCORECARD */}
              {simStage === "SCORECARD" && (
                <div className="p-6 max-w-2xl mx-auto space-y-5 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Award size={36} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      Official Certification Scorecard
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Candidate verified against the {config.passPercentage}% benchmark.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-400 block uppercase">Final Score</span>
                      <strong className="text-xl font-black text-slate-900 dark:text-white">
                        {minPassingScore} / {maxPossibleScore}
                      </strong>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-400 block uppercase">Percentage</span>
                      <strong className="text-xl font-black text-emerald-600">
                        {config.passPercentage}%
                      </strong>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-400 block uppercase">Outcome</span>
                      <strong className="text-xl font-black text-emerald-600">PASSED</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSimStage("BRIEFING")}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 cursor-pointer"
                  >
                    Reset Simulation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* QUESTION EDIT / ADD MODAL                                            */}
      {/* ==================================================================== */}
      {questionModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0e1629] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle size={18} className="text-blue-600 dark:text-cyan-400" />
                <span>
                  {config.questions.some((q) => q.id === editingQuestion.id)
                    ? "Edit Examination Question"
                    : "Add New Examination Question"}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setQuestionModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Domain / Section
                  </label>
                  <select
                    value={editingQuestion.sectionId}
                    onChange={(e) => {
                      const sec = config.sections.find((s) => s.id === e.target.value);
                      setEditingQuestion((prev) => ({
                        ...prev,
                        sectionId: e.target.value,
                        sectionName: sec ? sec.name : prev.sectionName,
                      }));
                    }}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-900 dark:text-white"
                  >
                    {config.sections.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty Tier
                  </label>
                  <select
                    value={editingQuestion.difficulty}
                    onChange={(e) =>
                      setEditingQuestion((prev) => ({
                        ...prev,
                        difficulty: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-900 dark:text-white"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="EASY">EASY</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Marks / Penalty
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.25"
                      value={editingQuestion.marks}
                      onChange={(e) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          marks: parseFloat(e.target.value) || 2.0,
                        }))
                      }
                      className="w-1/2 px-2.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                      placeholder="+2.0"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={editingQuestion.penalty}
                      onChange={(e) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          penalty: parseFloat(e.target.value) || 0.67,
                        }))
                      }
                      className="w-1/2 px-2.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                      placeholder="-0.67"
                    />
                  </div>
                </div>
              </div>

              {/* Question Stem Textarea */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Question Text / Technical Scenario
                </label>
                <textarea
                  rows={3}
                  value={editingQuestion.text}
                  onChange={(e) =>
                    setEditingQuestion((prev) => ({ ...prev, text: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the realistic technical scenario or problem statement..."
                />
              </div>

              {/* 4 Options Matrix */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Multiple Choice Options (Select radio for correct answer)
                </label>
                <div className="space-y-2">
                  {editingQuestion.options.map((opt, oIdx) => {
                    const isChecked = editingQuestion.correctAnswer === opt.id;
                    return (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-2 p-2 rounded-xl border ${
                          isChecked
                            ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-400"
                            : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="correctOption"
                          checked={isChecked}
                          onChange={() =>
                            setEditingQuestion((prev) => ({
                              ...prev,
                              correctAnswer: opt.id,
                            }))
                          }
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="w-5 font-mono font-bold text-slate-600 dark:text-slate-300">
                          {opt.id}:
                        </span>
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) => {
                            const newOpts = [...editingQuestion.options];
                            newOpts[oIdx] = { ...opt, text: e.target.value };
                            setEditingQuestion((prev) => ({
                              ...prev,
                              options: newOpts,
                            }));
                          }}
                          placeholder={`Option ${opt.id} explanation/choice...`}
                          className="flex-1 bg-transparent border-0 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Explanation */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Official Technical Rationale / Post-Exam Explanation
                </label>
                <textarea
                  rows={2}
                  value={editingQuestion.explanation}
                  onChange={(e) =>
                    setEditingQuestion((prev) => ({
                      ...prev,
                      explanation: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain why the selected option is definitively correct according to industry standards..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setQuestionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuestion}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                Save Question to Blueprint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* DOMAIN EDIT / ADD MODAL                                              */}
      {/* ==================================================================== */}
      {domainModalOpen && editingDomain && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0e1629] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Configure Curricular Domain
              </h3>
              <button
                type="button"
                onClick={() => setDomainModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Domain ID
                </label>
                <input
                  type="text"
                  value={editingDomain.id}
                  disabled={config.sections.some((s) => s.id === editingDomain.id)}
                  onChange={(e) =>
                    setEditingDomain((prev) => ({ ...prev, id: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white disabled:opacity-50"
                  placeholder="sec-5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Domain Title & Competency Area
                </label>
                <input
                  type="text"
                  value={editingDomain.name}
                  onChange={(e) =>
                    setEditingDomain((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  placeholder="Domain 5: Programmatic Media..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Question Quota
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingDomain.count}
                  onChange={(e) =>
                    setEditingDomain((prev) => ({
                      ...prev,
                      count: parseInt(e.target.value) || 15,
                    }))
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDomainModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDomain}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
              >
                Save Domain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExamPage;
