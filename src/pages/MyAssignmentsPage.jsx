import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { lmsService } from "../services/lmsService";
import {
  Upload,
  Calendar,
  X,
  Eye,
  Award,
  ChevronRight,
  BookCheck,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { STUDENT_HEADERS_CONFIG } from "../config/studentHeadersConfig";
import { AssessmentFilterBar } from "../components/common/AssessmentFilterBar";
import { CourseBadge } from "../components/common/CourseBadge";
import { AssessmentStatusBadge } from "../components/common/AssessmentStatusBadge";
import { AssessmentEmptyState } from "../components/common/AssessmentEmptyState";
import { AssessmentCard } from "../components/student/AssessmentCard";
import { getDaysLeftText } from "../config/courseThemesConfig";
import {
  ASSIGNMENT_SORT_OPTIONS,
  ASSIGNMENT_CATEGORIES,
  getAssignmentStatusOptions,
  calculateAssignmentMetrics,
  filterAndSortAssignments,
} from "../data/assessmentDataConfig";

export const MyAssignmentsPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [assignments, setAssignments] = useState(() =>
    lmsService.getAssignments(),
  );
  const courses = lmsService.getCourses();

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("dueDateAsc");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'

  // Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissionLink, setSubmissionLink] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [feedbackModalAssignment, setFeedbackModalAssignment] = useState(null);

  // Auto-open target assignment if specified in query string (?id=...)
  useEffect(() => {
    const targetId = searchParams.get("id");
    if (targetId && assignments.length > 0) {
      const match = assignments.find((a) => a.id === targetId);
      if (match) {
        setActiveAssignment(match);
        setIsSubmitModalOpen(true);
      }
    }
  }, [searchParams, assignments]);

  // Derived filter & status options mapped from data file
  const statusOptions = useMemo(
    () => getAssignmentStatusOptions(assignments),
    [assignments],
  );

  const metrics = useMemo(
    () => calculateAssignmentMetrics(assignments),
    [assignments],
  );

  // Filtered & Sorted Assignments mapped through centralized engine
  const filteredAssignments = useMemo(() => {
    return filterAndSortAssignments(
      assignments,
      {
        searchQuery,
        selectedCourse,
        selectedCategory,
        selectedStatus,
        sortBy,
      },
      courses,
    );
  }, [
    assignments,
    searchQuery,
    selectedCourse,
    selectedCategory,
    selectedStatus,
    sortBy,
    courses,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCourse !== "all" ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "dueDateAsc";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("dueDateAsc");
  };

  const openSubmitModal = (assignment = null) => {
    const target =
      assignment ||
      assignments.find((a) => a.status === "pending") ||
      assignments[0];
    if (target?.id) {
      navigate(`/take-assignment/${target.id}`);
    } else {
      navigate("/take-assignment");
    }
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!activeAssignment) return;

    if (!submissionLink.trim() && !fileName) {
      showToast(
        "Please provide a project link or select a file to submit.",
        "warning",
        "Submission Required",
      );
      return;
    }

    lmsService.submitAssignment(activeAssignment.id, {
      submissionLink: submissionLink.trim(),
      submissionNotes: submissionNotes.trim(),
      submittedFileName: fileName || "assignment_project_final.pdf",
    });

    setAssignments(lmsService.getAssignments());
    setIsSubmitModalOpen(false);
    showToast(
      `Assignment "${activeAssignment.title}" submitted successfully!`,
      "success",
      "Work Submitted",
    );
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH STUDENTPAGEHEADER           */}
      {/* ------------------------------------------------------------- */}
      <StudentPageHeader
        {...STUDENT_HEADERS_CONFIG.myAssignments}
        metrics={metrics}
        action={
          <button
            onClick={() => openSubmitModal()}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm 2xl:text-base font-bold px-5 py-3 2xl:px-6 2xl:py-3.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <Upload size={16} className="2xl:w-4.5 2xl:h-4.5" />
            <span>Submit Assignment</span>
          </button>
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* REUSABLE ASSESSMENT FILTER BAR                                */}
      {/* ------------------------------------------------------------- */}
      <AssessmentFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search assignments by title, course, or instructions..."
        courses={courses}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
        categories={ASSIGNMENT_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOptions={ASSIGNMENT_SORT_OPTIONS}
        sortBy={sortBy}
        onSortChange={setSortBy}
        statusOptions={statusOptions}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalShowing={filteredAssignments.length}
        totalCount={assignments.length}
        itemLabel="tasks"
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleClearFilters}
      />

      {/* ------------------------------------------------------------- */}
      {/* CONTENT LISTING: TABLE VIEW OR CARD GRID VIEW                 */}
      {/* ------------------------------------------------------------- */}
      {filteredAssignments.length === 0 ? (
        <AssessmentEmptyState
          icon={BookCheck}
          title="No assignments matched your search criteria"
          description={
            hasActiveFilters
              ? "Try adjusting your search terms or clearing course and specialization filters to view more tasks."
              : "No assignments are currently assigned for your enrolled courses."
          }
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleClearFilters}
          actionLabel="+ Submit Work"
          onAction={() => openSubmitModal()}
        />
      ) : viewMode === "grid" ? (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredAssignments.map((a) => (
            <AssessmentCard
              key={a.id}
              type="assignment"
              data={a}
              onAction={(item) => navigate(`/take-assignment/${item.id}`)}
              onSecondaryAction={(item) => navigate(`/take-assignment/${item.id}`)}
            />
          ))}
        </div>
      ) : (
        /* HIGH-DENSITY TABLE VIEW */
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/30">
                  <th className="py-4 px-6 w-14 text-center">#</th>
                  <th className="py-4 px-6 min-w-[280px]">Assignment</th>
                  <th className="py-4 px-6 min-w-[170px]">Course</th>
                  <th className="py-4 px-6 min-w-[150px]">Due Date</th>
                  <th className="py-4 px-6 min-w-[110px]">Max Points</th>
                  <th className="py-4 px-6 min-w-[130px]">Submissions</th>
                  <th className="py-4 px-6 min-w-[140px]">Status</th>
                  <th className="py-4 px-6 min-w-[110px]">Score</th>
                  <th className="py-4 px-6 min-w-[140px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
                {filteredAssignments.map((a, index) => {
                  const isGraded = a.status === "graded";

                  return (
                    <tr
                      key={a.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors group"
                    >
                      {/* # Index */}
                      <td className="py-5 px-6 text-sm font-bold text-slate-400 dark:text-slate-500 text-center whitespace-nowrap">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* Assignment Title & Brief */}
                      <td className="py-5 px-6 max-w-md">
                        <div
                          onClick={() => navigate(`/take-assignment/${a.id}`)}
                          className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          {a.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-1 leading-relaxed">
                          {a.instructions}
                        </div>
                      </td>

                      {/* Course Pill */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <CourseBadge
                          courseId={a.courseId}
                          courseTitle={a.courseTitle}
                          size="md"
                        />
                      </td>

                      {/* Due Date */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar
                            size={14}
                            className="text-slate-400 dark:text-slate-500 shrink-0"
                          />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {a.dueDate}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 pl-5 font-medium">
                          {getDaysLeftText(a.dueDate)}
                        </div>
                      </td>

                      {/* Max Points */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {a.maxScore || 100} pts
                        </span>
                      </td>

                      {/* Submissions */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {a.totalSubmissions || 45} submissions
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <AssessmentStatusBadge status={a.status} />
                      </td>

                      {/* Score */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        {isGraded ? (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/90 dark:border-emerald-800/60">
                            {a.score} / 100
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold pl-2">
                            -
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/take-assignment/${a.id}`)}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs group-hover:border-blue-300 dark:group-hover:border-blue-700"
                        >
                          <Eye size={13} />
                          <span>{isGraded ? "Feedback" : "Submit Work"}</span>
                          <ChevronRight size={13} className="text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBMISSION MODAL                                              */}
      {/* ------------------------------------------------------------- */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#2563eb] dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Upload size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Submit Assignment
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Upload your completed project or provide link.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmitAssignment}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Select Assignment *
                </label>
                <select
                  value={activeAssignment?.id || ""}
                  onChange={(e) => {
                    const found = assignments.find(
                      (a) => a.id === e.target.value,
                    );
                    if (found) setActiveAssignment(found);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] dark:focus:border-blue-500"
                >
                  {assignments.map((a) => (
                    <option key={a.id} value={a.id}>
                      [{a.courseTitle}] {a.title}
                    </option>
                  ))}
                </select>
              </div>

              {activeAssignment && (
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-[11px] block">
                    Requirements:
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {activeAssignment.instructions}
                  </p>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Project Link (Google Drive, Figma, GitHub, Staging URL)
                </label>
                <input
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://drive.google.com/... or https://figma.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Or Attach File (Any format: PDF, ZIP, DOCX, Media, Figma, Code
                  - Max 50MB)
                </label>
                <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-[#2563eb] dark:hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/40 hover:bg-blue-50/20 dark:hover:bg-blue-950/30">
                  <Upload
                    size={20}
                    className="text-slate-400 dark:text-slate-500 mb-1.5"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
                    {fileName
                      ? fileName
                      : "Click to select or drag and drop your file here"}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Supports ANY format (PDF, DOCX, ZIP, MP4, PNG, Figma, code,
                    etc. up to 50MB)
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
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Student Notes / Methodology Comments (Optional)
                </label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Summarize key assumptions, password credentials for staging, or extra observations..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] dark:focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition-all cursor-pointer flex items-center space-x-1.5 active:scale-95"
                >
                  <Upload size={14} />
                  <span>Confirm Submission</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW FEEDBACK MODAL                                           */}
      {/* ------------------------------------------------------------- */}
      {feedbackModalAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-[#0b1329] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Assignment Evaluation
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {feedbackModalAssignment.courseTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFeedbackModalAssignment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {feedbackModalAssignment.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {feedbackModalAssignment.instructions}
                </p>
              </div>

              <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300">
                    Final Grade:
                  </span>
                  <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                    {feedbackModalAssignment.score} / 100
                  </span>
                </div>
                <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px] block mb-1">
                    Official Instructor Notes:
                  </span>
                  <p className="text-emerald-950 dark:text-emerald-200 text-xs italic leading-relaxed">
                    "{feedbackModalAssignment.feedback}"
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setFeedbackModalAssignment(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignmentsPage;
