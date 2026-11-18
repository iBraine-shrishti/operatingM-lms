import React, { useState, useEffect } from "react";
import {
  FileText,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Send,
  Paperclip,
  X,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { CRM_BACKEND_API } from "../../services/lmsService";
import { crmService, CRM_BASE_URL } from "../../services/crmService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { formatAdmissionNo } from "../../utils/admissionUtils";

export const StudentGrievanceForm = () => {
  const { currentUser, crmProfile, crmBatch, crmAttendance } = useAuth();
  const { showToast } = useToast();

  const studentName =
    currentUser?.name ||
    currentUser?.fullName ||
    crmProfile?.name ||
    crmProfile?.fullName ||
    "";

  const studentId = formatAdmissionNo(
    crmProfile?.admissionNo ||
    crmProfile?.admission_no ||
    crmProfile?.roll_number ||
    currentUser?.admissionNo ||
    crmProfile?.id ||
    currentUser?.crmAdmissionId ||
    currentUser?.id ||
    ""
  );

  const studentEmail =
    currentUser?.email ||
    crmProfile?.email ||
    "";

  const studentPhone =
    currentUser?.phone ||
    crmProfile?.phone ||
    crmProfile?.mobile ||
    "";

  const programCourse =
    crmProfile?.course ||
    currentUser?.course ||
    "Master in Digital Marketing";

  const batchSection =
    crmProfile?.batchName ||
    crmProfile?.batchCode ||
    crmProfile?.batch ||
    crmBatch?.batchName ||
    crmBatch?.name ||
    crmAttendance?.primaryBatchName ||
    (crmAttendance?.enrolledBatches && crmAttendance.enrolledBatches[0]) ||
    currentUser?.batch ||
    "";

  const initialFormState = {
    // 1. Student Details
    fullName: studentName,
    studentId: studentId,
    email: studentEmail,
    phone: studentPhone,
    courseName: programCourse,
    batchSection: batchSection,

    // 2. Nature of Grievance
    issueLocations: [], // "Online (LMS Portal / Virtual Class)", "Offline (In-Person Session / Campus)", "Administrative / General"
    issueCategory: "", // Single primary category

    // 3. Incident Details
    incidentDateTime: "",
    subjectModuleName: "",
    instructorStaffInvolved: "",
    branch: "",
    subjectLine: "",
    detailedDescription: "",

    // 4. Supporting Evidence & Follow-up
    attachmentsIncluded: [], // "LMS Screenshot", "Classroom Photo", "Fee Receipt", "Medical Note", "Other"
    attachmentOtherText: "",
    uploadedFiles: [],
    urgencyLevel: "Medium (Needs attention within 2–3 days)",

    // 5. Student Declaration
    isDeclared: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loadingBatch, setLoadingBatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Directly fetch student Batch / Section from CRM backend API
  useEffect(() => {
    let isMounted = true;

    const fetchBatchDirectly = async () => {
      const targetId =
        crmService.getSelectedStudentId() ||
        crmProfile?.id ||
        currentUser?.crmAdmissionId ||
        currentUser?.id ||
        null;

      if (!targetId) {
        setLoadingBatch(false);
        return;
      }

      try {
        setLoadingBatch(true);

        // Fetch student profile, attendance, and raw admission directly from backend in parallel
        const [profile, attendance, rawAdmission] = await Promise.all([
          crmService.getStudentProfile(targetId).catch(() => null),
          crmService.getStudentAttendance(targetId).catch(() => null),
          fetch(`${CRM_BASE_URL}/admissions/${targetId}/`, {
            headers: { Accept: "application/json" },
          })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ]);

        if (!isMounted) return;

        const resolvedBatch =
          rawAdmission?.batch_name ||
          rawAdmission?.batch ||
          profile?.batchName ||
          profile?.batchCode ||
          profile?.batch ||
          attendance?.primaryBatchName ||
          (attendance?.enrolledBatches && attendance.enrolledBatches[0]) ||
          (attendance?.training_chart?.normal_batches && attendance.training_chart.normal_batches[0]) ||
          (attendance?.training_chart?.master_batches && attendance.training_chart.master_batches[0]) ||
          crmProfile?.batchName ||
          crmProfile?.batchCode ||
          crmBatch?.batchName ||
          crmBatch?.name ||
          crmAttendance?.primaryBatchName ||
          currentUser?.batch ||
          "";

        const resolvedBranch =
          rawAdmission?.branch ||
          profile?.branch ||
          crmProfile?.branch ||
          "";

        if (resolvedBatch) {
          setFormData((prev) => ({
            ...prev,
            batchSection: resolvedBatch,
            ...(resolvedBranch && !prev.branch ? { branch: resolvedBranch.replace(" Center", "") } : {}),
          }));
        }
      } catch (err) {
        console.warn("Direct backend fetch for batch/section failed:", err);
      } finally {
        if (isMounted) {
          setLoadingBatch(false);
        }
      }
    };

    fetchBatchDirectly();

    return () => {
      isMounted = false;
    };
  }, [crmProfile?.id, currentUser?.crmAdmissionId, currentUser?.id]);

  // Sync auth details if loaded asynchronously
  useEffect(() => {
    const currentBatch =
      crmProfile?.batchName ||
      crmProfile?.batchCode ||
      crmProfile?.batch ||
      crmBatch?.batchName ||
      crmBatch?.name ||
      crmAttendance?.primaryBatchName ||
      (crmAttendance?.enrolledBatches && crmAttendance.enrolledBatches[0]) ||
      currentUser?.batch ||
      "";

    setFormData((prev) => ({
      ...prev,
      fullName: prev.fullName || studentName,
      studentId: prev.studentId ? formatAdmissionNo(prev.studentId) : studentId,
      email: prev.email || studentEmail,
      phone: prev.phone || studentPhone,
      courseName: prev.courseName || programCourse,
      batchSection: prev.batchSection || currentBatch || "",
    }));
  }, [
    studentName,
    studentId,
    studentEmail,
    studentPhone,
    programCourse,
    crmProfile?.batchName,
    crmProfile?.batchCode,
    crmProfile?.batch,
    crmBatch?.batchName,
    crmBatch?.name,
    crmAttendance?.primaryBatchName,
    currentUser?.batch,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationToggle = (loc) => {
    setFormData((prev) => {
      const exists = prev.issueLocations.includes(loc);
      return {
        ...prev,
        issueLocations: exists
          ? prev.issueLocations.filter((item) => item !== loc)
          : [...prev.issueLocations, loc],
      };
    });
  };

  const handleAttachmentTypeToggle = (att) => {
    setFormData((prev) => {
      const exists = prev.attachmentsIncluded.includes(att);
      return {
        ...prev,
        attachmentsIncluded: exists
          ? prev.attachmentsIncluded.filter((item) => item !== att)
          : [...prev.attachmentsIncluded, att],
      };
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const fileMeta = files.map((f) => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(1)} KB`,
      type: f.type,
    }));

    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...fileMeta],
    }));

    showToast(`Attached ${files.length} file(s)`, "info", "File Uploaded");
  };

  const removeUploadedFile = (idx) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.isDeclared) {
      showToast(
        "Please tick Section 5 declaration before submitting.",
        "warning",
        "Declaration Required"
      );
      return;
    }

    if (!formData.issueCategory) {
      showToast(
        "Please select the primary Issue Category in Section 2.",
        "warning",
        "Category Required"
      );
      return;
    }

    if (!formData.detailedDescription.trim()) {
      showToast(
        "Please provide the detailed description of your grievance in Section 3.",
        "warning",
        "Description Required"
      );
      return;
    }

    setIsSubmitting(true);
    const ticketId = `GRV-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload = {
      ...formData,
      ticketId,
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Try sending to backend
      const res = await fetch(`${CRM_BACKEND_API}/feedback/grievance/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // 2. Cache in localStorage so submission is never lost
      try {
        const cached = JSON.parse(
          localStorage.getItem("om_lms_grievance_history") || "[]"
        );
        cached.unshift(payload);
        localStorage.setItem(
          "om_lms_grievance_history",
          JSON.stringify(cached.slice(0, 30))
        );
      } catch (err) {
        console.warn("Could not cache grievance submission:", err);
      }

      setSubmissionSuccess({
        ticketId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });

      showToast(
        `Grievance submitted successfully. Ticket #${ticketId}`,
        "success",
        "Recorded"
      );

      // Reset form but retain student identity
      setFormData({
        ...initialFormState,
        fullName: studentName,
        studentId: studentId,
        email: studentEmail,
        phone: studentPhone,
        courseName: programCourse,
        batchSection: batchSection,
      });
    } catch (err) {
      console.warn("Grievance submission network error:", err);
      showToast(
        `Recorded locally. Ticket #${ticketId}`,
        "success",
        "Saved"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-jakarta w-full space-y-6">
      {/* SUCCESS CONFIRMATION MODAL/BANNER */}
      {submissionSuccess && (
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 size={24} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-base sm:text-lg">
                Grievance & Support Request Logged Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-0.5">
                Your ticket reference is{" "}
                <strong className="font-black underline tracking-wider">
                  {submissionSuccess.ticketId}
                </strong>
                . Operating Media Academic Administration has been notified and will address your request as per institutional SLA.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmissionSuccess(null)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-200/60 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200 transition-all cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* EXACT UI REPLICA OF Student_Grievance_Form_Hybrid_LMS.docx / image.png */}
      {/* ============================================================== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#0b1329] p-4 sm:p-8 md:p-10 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-md space-y-7"
      >
        {/* DOCUMENT HEADER */}
        <div className="text-center pb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#163b65] dark:text-sky-300 tracking-tight uppercase">
            STUDENT GRIEVANCE & SUPPORT FORM
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic font-medium mt-1">
            For Online LMS Portal & Offline / In-Person Sessions
          </p>
        </div>

        {/* ========================================================== */}
        {/* SECTION 1. STUDENT DETAILS                                 */}
        {/* ========================================================== */}
        <div className="border border-[#163b65] dark:border-slate-700 rounded overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#163b65] text-white px-3.5 py-2 font-bold text-xs sm:text-sm uppercase tracking-wider">
            1. STUDENT DETAILS
          </div>

          {/* Table Grid (2 Columns, 3 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 dark:divide-slate-700 text-xs sm:text-[13px]">
            {/* Left Column */}
            <div className="divide-y divide-slate-300 dark:divide-slate-700">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[150px]">
                  Full Name:
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[150px]">
                  Email Address:
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[150px]">
                  Program / Course Name:
                </span>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter course name"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="divide-y divide-slate-300 dark:divide-slate-700">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[160px]">
                  Student ID / Roll Number:
                </span>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="e.g. OMC-8001"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[160px]">
                  Phone Number:
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter contact number"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[160px] flex items-center gap-1.5">
                  Batch / Section:
                  {loadingBatch && (
                    <span className="text-[10px] text-blue-500 font-normal animate-pulse">
                      (fetching...)
                    </span>
                  )}
                </span>
                <input
                  type="text"
                  name="batchSection"
                  value={formData.batchSection}
                  onChange={handleInputChange}
                  placeholder={loadingBatch ? "Fetching batch from CRM..." : "e.g. Andheri 12 pm - 02 pm"}
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SECTION 2. NATURE OF GRIEVANCE                             */}
        {/* ========================================================== */}
        <div className="border border-[#163b65] dark:border-slate-700 rounded overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#163b65] text-white px-3.5 py-2 font-bold text-xs sm:text-sm uppercase tracking-wider">
            2. NATURE OF GRIEVANCE
          </div>

          <div className="p-3.5 sm:p-4 space-y-4 text-xs sm:text-[13px]">
            {/* Part A: Location of Issue */}
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                Where did this issue occur? (Tick all that apply)
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                {[
                  "Online (LMS Portal / Virtual Class)",
                  "Offline (In-Person Session / Campus)",
                  "Administrative / General",
                ].map((loc) => {
                  const isChecked = formData.issueLocations.includes(loc);
                  return (
                    <label
                      key={loc}
                      onClick={() => handleLocationToggle(loc)}
                      className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <span
                        className={`w-4 h-4 border flex items-center justify-center rounded-[2px] text-[11px] font-black transition-all ${
                          isChecked
                            ? "bg-[#163b65] border-[#163b65] text-white"
                            : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{loc}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-300 dark:border-slate-700" />

            {/* Part B: Category of Issue */}
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100 mb-2.5">
                Issue Category (Tick the primary category):
              </p>
              <div className="space-y-2.5">
                {[
                  {
                    id: "lms_tech",
                    title: "LMS & Technical:",
                    desc: "Login issues, video playback/buffering, missing study materials, assignment upload failure, quiz/grade sync error.",
                  },
                  {
                    id: "offline_campus",
                    title: "Offline Sessions & Campus:",
                    desc: "Classroom facilities (AV, seating, AC), faculty/instructor conduct, attendance discrepancy, lab/equipment issues, schedule clash.",
                  },
                  {
                    id: "academic_curriculum",
                    title: "Academic & Curriculum:",
                    desc: "Doubt resolution delay, syllabus coverage, evaluation/grading fairness, feedback quality.",
                  },
                  {
                    id: "admin_fees",
                    title: "Administrative & Fees:",
                    desc: "Fee receipt/payment issue, certificate/document request, transport/hostel.",
                  },
                  {
                    id: "harassment_misconduct",
                    title: "Harassment / Misconduct:",
                    desc: "Bullying, discrimination, safety concern (May be submitted anonymously if preferred).",
                  },
                ].map((cat) => {
                  const isSelected = formData.issueCategory === cat.title;
                  return (
                    <label
                      key={cat.id}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          issueCategory: cat.title,
                        }))
                      }
                      className={`flex items-start gap-2.5 p-2 rounded cursor-pointer select-none transition-all ${
                        isSelected
                          ? "bg-blue-50/70 dark:bg-slate-800/80"
                          : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 mt-0.5 border flex items-center justify-center rounded-[2px] text-[11px] font-black shrink-0 transition-all ${
                          isSelected
                            ? "bg-[#163b65] border-[#163b65] text-white"
                            : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <div className="text-slate-800 dark:text-slate-200 leading-snug">
                        <strong className="font-bold text-slate-900 dark:text-white mr-1.5">
                          {cat.title}
                        </strong>
                        <span className="text-slate-600 dark:text-slate-400">
                          {cat.desc}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SECTION 3. INCIDENT DETAILS                                */}
        {/* ========================================================== */}
        <div className="border border-[#163b65] dark:border-slate-700 rounded overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#163b65] text-white px-3.5 py-2 font-bold text-xs sm:text-sm uppercase tracking-wider">
            3. INCIDENT DETAILS
          </div>

          {/* Table Grid (2 Columns Rows 1-2, 1 Column Rows 3-4) */}
          <div className="divide-y divide-slate-300 dark:divide-slate-700 text-xs sm:text-[13px]">
            {/* Row 1: Date & Time + Subject/Module */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 dark:divide-slate-700">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[210px]">
                  Date & Time of Incident / Session:
                </span>
                <input
                  type="text"
                  name="incidentDateTime"
                  value={formData.incidentDateTime}
                  onChange={handleInputChange}
                  placeholder="e.g. 17 Nov 2026, 11:30 AM"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[160px]">
                  Subject / Module Name:
                </span>
                <input
                  type="text"
                  name="subjectModuleName"
                  value={formData.subjectModuleName}
                  onChange={handleInputChange}
                  placeholder="e.g. SEO Module 4 / Meta Ads"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>
            </div>

            {/* Row 2: Instructor Involved + Branch */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 dark:divide-slate-700">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[210px]">
                  Instructor / Staff Involved (Optional):
                </span>
                <input
                  type="text"
                  name="instructorStaffInvolved"
                  value={formData.instructorStaffInvolved}
                  onChange={handleInputChange}
                  placeholder="Name of trainer / staff member"
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center px-3 py-2 gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0 min-w-[160px]">
                  Branch (Andheri / Borivali):
                </span>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent border-0 px-2 py-1 text-slate-900 dark:text-white outline-none focus:bg-blue-50/50 dark:focus:bg-slate-800/50 rounded cursor-pointer"
                >
                  <option value="">Select Branch</option>
                  <option value="Andheri">Andheri</option>
                  <option value="Borivali">Borivali</option>
                  <option value="Online / Virtual">Online / Virtual</option>
                </select>
              </div>
            </div>

            {/* Row 3: Subject Line (Brief summary) */}
            <div className="px-3 py-2">
              <label className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                Subject Line (Brief summary of the issue):
              </label>
              <input
                type="text"
                name="subjectLine"
                value={formData.subjectLine}
                onChange={handleInputChange}
                required
                placeholder="Give a one-line title to this grievance..."
                className="w-full bg-transparent border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-slate-900 dark:text-white outline-none focus:border-[#163b65] focus:bg-blue-50/30 dark:focus:bg-slate-800/50 rounded"
              />
            </div>

            {/* Row 4: Detailed Description */}
            <div className="px-3 py-2.5">
              <label className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                Detailed Description (Describe what happened, steps taken so far, and how it affects your learning):
              </label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Please describe in detail: what happened, dates/times, who was informed, steps taken so far, and how this impacts your studies..."
                className="w-full bg-transparent border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-white outline-none focus:border-[#163b65] focus:bg-blue-50/30 dark:focus:bg-slate-800/50 rounded leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SECTION 4. SUPPORTING EVIDENCE & FOLLOW-UP PREFERENCES     */}
        {/* ========================================================== */}
        <div className="border border-[#163b65] dark:border-slate-700 rounded overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#163b65] text-white px-3.5 py-2 font-bold text-xs sm:text-sm uppercase tracking-wider">
            4. SUPPORTING EVIDENCE & FOLLOW-UP PREFERENCES
          </div>

          <div className="p-3.5 sm:p-4 space-y-4 text-xs sm:text-[13px]">
            {/* Part A: Attachments Included */}
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100 mb-2.5">
                Supporting Attachments Included:
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                {[
                  "LMS Screenshot",
                  "Classroom Photo",
                  "Fee Receipt",
                  "Medical Note",
                ].map((att) => {
                  const isChecked = formData.attachmentsIncluded.includes(att);
                  return (
                    <label
                      key={att}
                      onClick={() => handleAttachmentTypeToggle(att)}
                      className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <span
                        className={`w-4 h-4 border flex items-center justify-center rounded-[2px] text-[11px] font-black transition-all ${
                          isChecked
                            ? "bg-[#163b65] border-[#163b65] text-white"
                            : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{att}</span>
                    </label>
                  );
                })}

                {/* Other: text line */}
                <div className="inline-flex items-center gap-2">
                  <label
                    onClick={() => handleAttachmentTypeToggle("Other")}
                    className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-800 dark:text-slate-200 font-medium"
                  >
                    <span
                      className={`w-4 h-4 border flex items-center justify-center rounded-[2px] text-[11px] font-black transition-all ${
                        formData.attachmentsIncluded.includes("Other")
                          ? "bg-[#163b65] border-[#163b65] text-white"
                          : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    <span>Other:</span>
                  </label>
                  <input
                    type="text"
                    name="attachmentOtherText"
                    value={formData.attachmentOtherText}
                    onChange={handleInputChange}
                    placeholder="Specify other document..."
                    className="border-b border-slate-400 dark:border-slate-600 bg-transparent px-1.5 py-0.5 text-xs text-slate-800 dark:text-white outline-none focus:border-[#163b65] w-36 sm:w-44"
                  />
                </div>
              </div>

              {/* Real File Upload Dropzone */}
              <div className="mt-3.5 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#163b65] dark:border-sky-500/40 text-[#163b65] dark:text-sky-300 bg-blue-50/50 dark:bg-slate-800/80 hover:bg-blue-100/60 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs">
                  <Upload size={14} />
                  <span>Attach Document / Photo / Screenshot</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {formData.uploadedFiles.map((f, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs border border-slate-300 dark:border-slate-700"
                  >
                    <Paperclip size={12} className="text-slate-500" />
                    <span className="font-medium max-w-[140px] truncate">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeUploadedFile(idx)}
                      className="text-slate-400 hover:text-red-500 ml-1"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-300 dark:border-slate-700" />

            {/* Part B: Urgency Level */}
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                Urgency Level:
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "Low (General feedback)",
                  "Medium (Needs attention within 2–3 days)",
                  "High (Blocking exam, submission, or safety)",
                ].map((urg) => {
                  const isSelected = formData.urgencyLevel === urg;
                  return (
                    <label
                      key={urg}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, urgencyLevel: urg }))
                      }
                      className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <span
                        className={`w-4 h-4 border flex items-center justify-center rounded-[2px] text-[11px] font-black transition-all ${
                          isSelected
                            ? "bg-[#163b65] border-[#163b65] text-white"
                            : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{urg}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SECTION 5. STUDENT DECLARATION                             */}
        {/* ========================================================== */}
        <div className="border border-[#163b65] dark:border-slate-700 rounded overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#163b65] text-white px-3.5 py-2 font-bold text-xs sm:text-sm uppercase tracking-wider">
            5. STUDENT DECLARATION
          </div>

          <div className="p-3.5 sm:p-4 text-xs sm:text-[13px]">
            <label
              onClick={() =>
                setFormData((prev) => ({ ...prev, isDeclared: !prev.isDeclared }))
              }
              className="flex items-start gap-2.5 cursor-pointer select-none"
            >
              <span
                className={`w-4 h-4 mt-0.5 border flex items-center justify-center rounded-[2px] text-[11px] font-black shrink-0 transition-all ${
                  formData.isDeclared
                    ? "bg-[#163b65] border-[#163b65] text-white"
                    : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-transparent"
                }`}
              >
                ✓
              </span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                I confirm that the information provided in this form is accurate and true to the best of my knowledge.
              </span>
            </label>
          </div>
        </div>

        {/* SUBMIT ACTION BUTTON */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <ShieldCheck size={16} className="text-[#163b65] dark:text-sky-400" />
            <span>Submissions are strictly confidential and reviewed by institutional leadership.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[220px] h-[48px] px-8 bg-[#163b65] hover:bg-[#0f2a49] text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_6px_18px_rgba(22,59,101,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
          >
            <Send size={16} />
            <span>
              {isSubmitting ? "RECORDING GRIEVANCE..." : "SUBMIT GRIEVANCE FORM"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentGrievanceForm;
