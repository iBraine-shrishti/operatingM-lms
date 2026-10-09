import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  FolderArchive,
  Sparkles,
  CheckSquare,
  Paperclip,
  X,
  FileCheck2,
} from "lucide-react";
import { CourseBadge } from "../components/common/CourseBadge";
import { AssessmentStatusBadge } from "../components/common/AssessmentStatusBadge";
import { getDaysLeftText } from "../config/courseThemesConfig";

export const TakeAssignmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [assignments, setAssignments] = useState(() => lmsService.getAssignments());
  const assignment = useMemo(() => {
    if (id) {
      return assignments.find((a) => a.id === id) || assignments[0];
    }
    return assignments.find((a) => a.status === "pending") || assignments[0];
  }, [id, assignments]);

  // Submission Form State
  const [submissionLink, setSubmissionLink] = useState(assignment?.submissionLink || "");
  const [submissionNotes, setSubmissionNotes] = useState(assignment?.submissionNotes || "");
  const [fileName, setFileName] = useState(assignment?.submittedFileName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);

  // Deliverables self-checklist
  const [completedDeliverables, setCompletedDeliverables] = useState({
    0: true,
    1: false,
    2: false,
  });

  const isGraded = assignment?.status === "graded";
  const isSubmitted = assignment?.status === "submitted" && !isResubmitting;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!submissionLink.trim() && !fileName) {
      showToast(
        "Please provide a project link or attach a project file.",
        "warning",
        "Submission Required"
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      lmsService.submitAssignment(assignment.id, {
        submissionLink: submissionLink.trim(),
        submissionNotes: submissionNotes.trim(),
        submittedFileName: fileName || "assignment_final_deliverable.pdf",
      });

      setAssignments(lmsService.getAssignments());
      setIsSubmitting(false);
      setIsResubmitting(false);
      showToast(
        `Assignment "${assignment.title}" submitted successfully!`,
        "success",
        "Work Submitted"
      );
    }, 600);
  };

  const deliverables = [
    "Complete practical campaign / design file adhering to client brief",
    "Detailed methodology explanation and rationale included",
    "Public view-only permissions verified on project link or valid archive uploaded",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 animate-in fade-in duration-200">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: BACK BUTTON + COURSE PILL + STATUS BADGE          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link
            to="/my-assignments"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Back to All Assignments"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <CourseBadge courseId={assignment?.courseId} courseTitle={assignment?.courseTitle} size="sm" />
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-semibold">
                Due: {assignment?.dueDate} ({getDaysLeftText(assignment?.dueDate)})
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight mt-0.5">
              {assignment?.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <AssessmentStatusBadge status={assignment?.status} score={assignment?.score} />
          <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs">
            Max: {assignment?.maxScore || 100} pts
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2-COLUMN WORKSPACE: BRIEF ON LEFT & SUBMISSION ON RIGHT       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Assignment Details & Problem Brief */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Brief Card */}
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-cyan-400 tracking-wider block mb-1">
                Project Deliverable Brief
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {assignment?.title}
              </h2>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Instructions & Guidelines
              </h4>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                {assignment?.instructions}
              </div>
            </div>

            {/* Checklist Deliverables */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Required Deliverables Checklist
              </h4>
              <div className="space-y-2">
                {deliverables.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-start space-x-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 cursor-pointer hover:bg-blue-50/20 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!completedDeliverables[idx]}
                      onChange={() =>
                        setCompletedDeliverables((prev) => ({
                          ...prev,
                          [idx]: !prev[idx],
                        }))
                      }
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500/20"
                    />
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Starter Files & Reference Materials Mock */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Instructor Attachments & Starter Files
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate pr-2">
                    <FileText size={16} className="text-blue-500 shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      Assignment_Brief_Guide.pdf
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Downloading resource guide...", "info")}
                    className="p-1 rounded-lg text-slate-400 hover:text-blue-600 cursor-pointer"
                    title="Download Guide"
                  >
                    <Download size={14} />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate pr-2">
                    <FolderArchive size={16} className="text-purple-500 shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      Brand_Assets_Pack.zip
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Downloading assets bundle...", "info")}
                    className="p-1 rounded-lg text-slate-400 hover:text-purple-600 cursor-pointer"
                    title="Download Bundle"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Rubric Breakdown Card */}
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Grading Criteria & Rubric
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">
                    Technical Execution & Accuracy
                  </strong>
                  <span className="text-slate-500 text-[11px]">
                    Correct application of campaign tools, formulas, or UX patterns
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 shrink-0 ml-3">
                  40 pts
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">
                    Strategic Rationale & Methodology
                  </strong>
                  <span className="text-slate-500 text-[11px]">
                    Clarity of business hypotheses, KPI choice, and problem analysis
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 shrink-0 ml-3">
                  35 pts
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">
                    Presentation & Clean File Structure
                  </strong>
                  <span className="text-slate-500 text-[11px]">
                    Well-organized Figma components, clean spreadsheets, or readable code
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 shrink-0 ml-3">
                  25 pts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Submission Form & Evaluation Card */}
        <div className="lg:col-span-5 space-y-5">
          {/* If Graded: Show Instructor Evaluation Card */}
          {isGraded && (
            <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-emerald-200 dark:border-emerald-800/60 p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <Award size={20} />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">
                  Official Grade & Instructor Evaluation
                </h3>
              </div>

              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
                    Score Achieved:
                  </span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {assignment.score} / {assignment.maxScore || 100}
                  </span>
                </div>

                {assignment.feedback && (
                  <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60">
                    <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                      Instructor Feedback:
                    </span>
                    <p className="text-xs text-emerald-950 dark:text-emerald-200 italic leading-relaxed">
                      "{assignment.feedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submission Status or Submission Form Card */}
          <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {isSubmitted ? "Submission Details" : "Submit Your Assignment"}
                </h3>
                <p className="text-xs text-slate-500">
                  {isSubmitted ? "Work submitted and recorded" : "Upload deliverables before deadline"}
                </p>
              </div>
              {isSubmitted && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200">
                  Under Review
                </span>
              )}
            </div>

            {/* If Already Submitted and Not in Resubmit Mode */}
            {isSubmitted ? (
              <div className="space-y-4 text-xs">
                {assignment.submissionLink && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Submitted Project Link
                    </span>
                    <a
                      href={assignment.submissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 truncate"
                    >
                      <span className="truncate">{assignment.submissionLink}</span>
                      <ExternalLink size={12} className="shrink-0 ml-1" />
                    </a>
                  </div>
                )}

                {assignment.submittedFileName && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Attached Project Deliverable
                    </span>
                    <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold">
                      <Paperclip size={14} className="text-blue-500" />
                      <span>{assignment.submittedFileName}</span>
                    </div>
                  </div>
                )}

                {assignment.submissionNotes && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Student Comments
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {assignment.submissionNotes}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">
                    Submitted {assignment.submittedAt || "Recently"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsResubmitting(true)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Resubmit Work
                  </button>
                </div>
              </div>
            ) : (
              /* Active Submission Form */
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Project Link Input */}
                <div>
                  <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Project URL Link
                  </label>
                  <input
                    type="url"
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    placeholder="https://figma.com/... or https://drive.google.com/..."
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Share a public Google Drive, Figma file, GitHub repo, or staging site.
                  </span>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Or Attach File (Any Format up to 50MB)
                  </label>
                  <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-900/40 hover:bg-blue-50/20">
                    <Upload size={22} className="text-slate-400 mb-1.5" />
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">
                      {fileName ? fileName : "Click to select or drag and drop your deliverable file"}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      PDF, ZIP, DOCX, MP4, Figma, Code, PNG, etc.
                    </span>
                    <input
                      type="file"
                      accept="*/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                  {fileName && (
                    <div className="flex items-center justify-between mt-2 p-2 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl text-xs text-blue-900 dark:text-blue-300">
                      <span className="truncate pr-2 font-semibold">Attached: {fileName}</span>
                      <button
                        type="button"
                        onClick={() => setFileName("")}
                        className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Notes Textarea */}
                <div>
                  <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Student Notes / Assumptions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Provide context, credentials for staging, or extra observations for your instructor..."
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {isResubmitting && (
                    <button
                      type="button"
                      onClick={() => setIsResubmitting(false)}
                      className="text-xs font-semibold text-slate-500 hover:underline cursor-pointer"
                    >
                      Cancel Resubmission
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center space-x-2 active:scale-95 disabled:opacity-50"
                  >
                    <Upload size={14} />
                    <span>{isSubmitting ? "Submitting Work..." : "Confirm & Submit Work"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAssignmentPage;
