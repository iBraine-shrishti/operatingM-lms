import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import { useToast } from "../context/ToastContext";
import { crmService } from "../services/crmService";
import {
  ArrowLeft,
  Award,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Paperclip,
  X,
  Lock,
} from "lucide-react";
import { CourseBadge } from "../components/common/CourseBadge";
import { AssessmentStatusBadge } from "../components/common/AssessmentStatusBadge";
import { getDaysLeftText } from "../config/courseThemesConfig";

export const TakeAssignmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const studentId = crmService.getSelectedStudentId();

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      setIsLoading(true);
      try {
        if (!studentId) {
          setAssignments([]);
          return;
        }
        const data = await lmsService.fetchStudentBatchAssignments(studentId);
        setAssignments(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("Could not load batch assignments:", e);
        setAssignments([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadAssignments();
  }, [studentId]);

  const assignment = useMemo(() => {
    if (assignments.length === 0) return null;
    if (id) {
      return assignments.find((a) => a.id === id) || null;
    }
    return assignments.find((a) => a.status === "pending") || assignments[0] || null;
  }, [id, assignments]);

  // Submission Form State
  const [submissionLink, setSubmissionLink] = useState(assignment?.submissionLink || "");
  const [submissionNotes, setSubmissionNotes] = useState(assignment?.submissionNotes || "");
  const [fileName, setFileName] = useState(assignment?.submittedFileName || "");
  const [fileObj, setFileObj] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);


  const isApproved = assignment?.status === "approved" || assignment?.status === "graded";
  const isNotApproved = assignment?.status === "not_approved";
  const isSubmitted = assignment?.status === "submitted" || isApproved || isNotApproved;
  const isFormActive = !isApproved && (!isSubmitted || isResubmitting || isNotApproved);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submissionLink.trim() && !fileName && !fileObj) {
      showToast(
        "Please provide a project link or attach a project file.",
        "warning",
        "Submission Required"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await lmsService.submitStudentBatchAssignment(assignment.id, studentId, {
        file: fileObj,
        linkUrl: submissionLink.trim(),
        notes: submissionNotes.trim(),
      });

      const updated = await lmsService.fetchStudentBatchAssignments(studentId);
      if (updated && updated.length > 0) {
        setAssignments(updated);
      }
      setIsSubmitting(false);
      setIsResubmitting(false);
      showToast(
        `Assignment "${assignment.title}" submitted successfully!`,
        "success",
        "Work Submitted"
      );
    } catch (err) {
      setIsSubmitting(false);
      showToast("Submission failed. Please try again.", "error", "Error");
    }
  };


  if (isLoading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading assignment details...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">No Assignment Found</h2>
        <p className="text-sm text-slate-500">This assignment might not be assigned to your batch or is inactive.</p>
        <Link
          to="/my-assignments"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Assignments</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: BACK BUTTON + COURSE PILL + STATUS BADGE          */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              {assignment?.batchName ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  <span>{assignment.batchName}</span>
                </span>
              ) : (
                <CourseBadge courseId={assignment?.courseId} courseTitle={assignment?.courseTitle} size="sm" />
              )}
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
          <AssessmentStatusBadge status={assignment?.status} />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2-COLUMN WORKSPACE: BRIEF ON LEFT & SUBMISSION ON RIGHT       */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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

            {/* Starter Files & Reference Materials */}
            {assignment?.attachmentUrl ? (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Paperclip size={13} className="text-blue-500" />
                  <span>Instructor Reference Material & Brief</span>
                </h4>
                <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5 truncate pr-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      {assignment.attachmentUrl.includes(".xls") || assignment.attachmentUrl.includes(".csv") ? (
                        <FileText size={16} className="text-emerald-600" />
                      ) : (
                        <FileText size={16} />
                      )}
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-slate-900 dark:text-white truncate block">
                        {assignment.attachmentName || (assignment.attachmentUrl.includes("/brief-files/") ? assignment.attachmentUrl.split("/").pop() : "Assignment_Brief_Reference.pdf")}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {assignment.attachmentUrl.startsWith("http") && !assignment.attachmentUrl.includes("/api/") ? "External Reference Resource" : "Downloadable reference document"}
                      </span>
                    </div>
                  </div>
                  {assignment.attachmentUrl.startsWith("http") && !assignment.attachmentUrl.includes("/api/") ? (
                    <a
                      href={assignment.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs"
                    >
                      <span>Open Link</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <a
                      href={assignment.attachmentUrl.startsWith("http") ? assignment.attachmentUrl : `https://operatingmedia.org${assignment.attachmentUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs"
                    >
                      <span>Download</span>
                      <Download size={12} />
                    </a>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          </div>

        {/* Right Column: Submission Form & Evaluation Card */}
        <div className="lg:col-span-5 space-y-5">
          {/* If Approved: Show Official Approval Card */}
          {isApproved && (
            <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-emerald-200 dark:border-emerald-800/60 p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={20} />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">
                  Official Faculty Evaluation
                </h3>
              </div>

              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
                    Status:
                  </span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Approved</span>
                  </span>
                </div>

                {assignment.feedback && (
                  <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60">
                    <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                      Faculty Feedback:
                    </span>
                    <p className="text-xs text-emerald-950 dark:text-emerald-200 italic leading-relaxed">
                      "{assignment.feedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* If Not Approved: Show Revision Required Card */}
          {isNotApproved && (
            <div className="bg-white dark:bg-[#0b1329] rounded-3xl border border-rose-200 dark:border-rose-800/60 p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
                <AlertCircle size={20} />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">
                  Faculty Evaluation: Not Approved
                </h3>
              </div>

              <div className="bg-rose-50/70 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200/80 dark:border-rose-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-rose-900 dark:text-rose-300 font-semibold">
                    Status:
                  </span>
                  <span className="text-base font-black text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertCircle size={16} />
                    <span>Not Approved</span>
                  </span>
                </div>

                {assignment.feedback && (
                  <div className="pt-2 border-t border-rose-200/60 dark:border-rose-800/60">
                    <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300 block mb-1">
                      Faculty Feedback & Instructions:
                    </span>
                    <p className="text-xs text-rose-950 dark:text-rose-200 italic leading-relaxed">
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
                  {isApproved
                    ? "Approved Deliverables"
                    : isNotApproved
                    ? "Resubmit Assignment"
                    : isSubmitted
                    ? "Submission Details"
                    : "Submit Your Assignment"}
                </h3>
                <p className="text-xs text-slate-500">
                  {isApproved
                    ? "Evaluated and approved by instructor • Submission finalized"
                    : isNotApproved
                    ? "Assignment not approved • Please review feedback and resubmit"
                    : isSubmitted
                    ? "Work submitted and recorded • Under review"
                    : "Upload deliverables before deadline"}
                </p>
              </div>
              {isApproved ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Approved</span>
                </span>
              ) : isNotApproved ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>Not Approved</span>
                </span>
              ) : isSubmitted ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200">
                  Under Review
                </span>
              ) : null}
            </div>

            {/* If Already Submitted / Graded and Not in Resubmit Mode */}
            {!isFormActive ? (
              <div className="space-y-4 text-xs">
                {/* Notice if Approved */}
                {isApproved && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start space-x-2.5 text-emerald-900 dark:text-emerald-200">
                    <Lock size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-bold block text-xs">Submission Approved</span>
                      <p className="text-[11px] text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
                        This assignment has been evaluated and <strong>Approved</strong> by your instructor. Work is finalized.
                      </p>
                    </div>
                  </div>
                )}

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

                {(assignment.submittedFileName || fileName) && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Attached Project Deliverable
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold truncate">
                        <Paperclip size={14} className="text-blue-500 shrink-0" />
                        <span className="truncate">{assignment.submittedFileName || fileName}</span>
                      </div>
                      {assignment.submittedFileUrl && (
                        <a
                          href={
                            assignment.submittedFileUrl.startsWith("http")
                              ? assignment.submittedFileUrl
                              : `https://operatingmedia.org${assignment.submittedFileUrl}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs"
                        >
                          <Download size={12} />
                          <span>Download</span>
                        </a>
                      )}
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
                  {!isApproved ? (
                    <button
                      type="button"
                      onClick={() => setIsResubmitting(true)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer transition-colors"
                    >
                      Resubmit Work
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      <CheckCircle2 size={13} />
                      <span>Evaluation Finalized</span>
                    </div>
                  )}
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
                          setFileObj(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                  {fileName && (
                    <div className="flex items-center justify-between mt-2 p-2 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl text-xs text-blue-900 dark:text-blue-300">
                      <span className="truncate pr-2 font-semibold">Attached: {fileName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFileName("");
                          setFileObj(null);
                        }}
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
