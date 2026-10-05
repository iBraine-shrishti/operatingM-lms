import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Mail,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Shield,
  Award,
  BookOpen,
  ExternalLink,
  Calendar,
  Phone,
  UserCheck,
  ChevronRight,
  X,
  FileText,
  Check,
  ArrowUpDown,
  RefreshCw,
  Sparkles,
  Building2,
  Send,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { lmsService } from "../../services/lmsService";

export const AdminCourseStudentsMatrix = ({
  courses = [],
  onNavigateCourse,
  onOpenCertificateViewer,
  initialCourseFilter = "all",
}) => {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialCourse =
    searchParams.get("course") || initialCourseFilter || "all";

  // State for students registry
  const [students, setStudents] = useState(() => lmsService.getStudents());
  const [selectedCourseFilter, setSelectedCourseFilter] =
    useState(initialCourse);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [feeStatusFilter, setFeeStatusFilter] = useState("all");

  // Modal states
  const [dossierStudent, setDossierStudent] = useState(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certStudent, setCertStudent] = useState(null);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderStudent, setReminderStudent] = useState(null);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStudent, setAttendanceStudent] = useState(null);

  // New Student Enrollment Form State
  const [enrollForm, setEnrollForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: courses[0]?.id || "course-8",
    batch: "Weekday Morning (WD-M1, 10:00 AM - 12:00 PM)",
    branch: "Andheri Center",
    feeTotal: 35000,
    feePaid: 15000,
  });

  // Calculate course breakdown statistics
  const courseStats = useMemo(() => {
    const stats = {};
    courses.forEach((c) => {
      const courseStudents = students.filter((s) => s.courseId === c.id);
      const totalFees = courseStudents.reduce(
        (acc, s) => acc + (s.feeTotal || 0),
        0,
      );
      const paidFees = courseStudents.reduce(
        (acc, s) => acc + (s.feePaid || 0),
        0,
      );
      const avgAttendance =
        courseStudents.length > 0
          ? Math.round(
              courseStudents.reduce(
                (acc, s) => acc + (s.attendancePercentage || 0),
                0,
              ) / courseStudents.length,
            )
          : 85;
      stats[c.id] = {
        studentCount: courseStudents.length,
        totalFees,
        paidFees,
        avgAttendance,
      };
    });
    return stats;
  }, [courses, students]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Course filter
      if (
        selectedCourseFilter !== "all" &&
        student.courseId !== selectedCourseFilter
      ) {
        return false;
      }
      // Branch filter
      if (branchFilter !== "all" && student.branch !== branchFilter) {
        return false;
      }
      // Fee status filter
      if (feeStatusFilter !== "all" && student.feeStatus !== feeStatusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = student.name?.toLowerCase().includes(q);
        const matchesEmail = student.email?.toLowerCase().includes(q);
        const matchesAdm = student.admissionNo?.toLowerCase().includes(q);
        const matchesPhone = student.phone?.toLowerCase().includes(q);
        const matchesCourse = student.courseName?.toLowerCase().includes(q);
        return (
          matchesName ||
          matchesEmail ||
          matchesAdm ||
          matchesPhone ||
          matchesCourse
        );
      }
      return true;
    });
  }, [
    students,
    selectedCourseFilter,
    branchFilter,
    feeStatusFilter,
    searchQuery,
  ]);

  // Selected Course details (if filtered by a specific course)
  const activeCourse = useMemo(() => {
    if (selectedCourseFilter === "all") return null;
    return courses.find((c) => c.id === selectedCourseFilter);
  }, [courses, selectedCourseFilter]);

  // Handle Mark Attendance Action
  const handleRecordAttendance = (student, isPresent) => {
    const updated = students.map((s) => {
      if (s.id === student.id) {
        const newTotal = (s.totalLectures || 28) + 1;
        const newAttended = isPresent
          ? (s.attendedLectures || 25) + 1
          : s.attendedLectures || 25;
        const newPct = Math.round((newAttended / newTotal) * 1000) / 10;
        return {
          ...s,
          totalLectures: newTotal,
          attendedLectures: newAttended,
          attendancePercentage: newPct,
        };
      }
      return s;
    });
    setStudents(updated);
    setIsAttendanceModalOpen(false);
    showToast(
      `Attendance recorded: ${student.name} marked ${isPresent ? "PRESENT ✓" : "ABSENT"} for today's session.`,
      isPresent ? "success" : "warning",
      "Attendance Updated",
    );
  };

  // Handle Enrollment Form Submission
  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (!enrollForm.name || !enrollForm.email) {
      showToast("Please provide student name and email", "error");
      return;
    }

    const assignedCourse =
      courses.find((c) => c.id === enrollForm.courseId) || courses[0];
    const total = parseFloat(enrollForm.feeTotal) || 35000;
    const paid = parseFloat(enrollForm.feePaid) || 0;
    const due = Math.max(0, total - paid);
    const feeStatus =
      due === 0 ? "Cleared" : paid > 0 ? "Partial Due" : "Overdue";
    const newAdmNo = `OMC-${String(Math.floor(1000 + Math.random() * 9000))}`;

    const newStudent = {
      id: `std-${Date.now()}`,
      admissionNo: newAdmNo,
      name: enrollForm.name,
      email: enrollForm.email,
      phone: enrollForm.phone || "+91 98000 00000",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      courseId: assignedCourse.id,
      courseName: assignedCourse.title,
      batch: enrollForm.batch,
      branch: enrollForm.branch,
      attendancePercentage: 100,
      totalLectures: 1,
      attendedLectures: 1,
      feeTotal: total,
      feePaid: paid,
      feeDue: due,
      feeStatus,
      overallProgress: 0,
      completedLessonsCount: 0,
      totalLessonsCount: assignedCourse.lessonsCount || 25,
      joinedDate: new Date().toISOString().split("T")[0],
      status: "active",
      isCrmSynced: true,
    };

    lmsService.addStudent(newStudent);
    setStudents(lmsService.getStudents());
    setIsEnrollModalOpen(false);
    setEnrollForm({
      name: "",
      email: "",
      phone: "",
      courseId: courses[0]?.id || "course-8",
      batch: "Weekday Morning (WD-M1, 10:00 AM - 12:00 PM)",
      branch: "Andheri Center",
      feeTotal: 35000,
      feePaid: 15000,
    });

    showToast(
      `Student ${newStudent.name} successfully enrolled into ${assignedCourse.title} (ID: ${newAdmNo})!`,
      "success",
      "Student Enrolled & Synced",
    );
  };

  // Export Roster as CSV
  const handleExportCSV = () => {
    const headers = [
      "Admission ID",
      "Name",
      "Email",
      "Phone",
      "Course",
      "Batch",
      "Branch",
      "Attendance %",
      "Total Fees",
      "Paid Fees",
      "Balance Due",
      "Fee Status",
      "Progress %",
      "Status",
    ];
    const rows = filteredStudents.map((s) => [
      s.admissionNo || "",
      `"${s.name || ""}"`,
      s.email || "",
      s.phone || "",
      `"${s.courseName || ""}"`,
      `"${s.batch || ""}"`,
      `"${s.branch || ""}"`,
      `${s.attendancePercentage || 0}%`,
      s.feeTotal || 0,
      s.feePaid || 0,
      s.feeDue || 0,
      s.feeStatus || "",
      `${s.overallProgress || 0}%`,
      s.status || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Operating_Media_Students_${selectedCourseFilter}_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(
      `Exported ${filteredStudents.length} student records to CSV successfully!`,
      "success",
      "Roster Exported",
    );
  };

  // Send Fee Reminder Handler
  const handleSendReminder = () => {
    if (!reminderStudent) return;
    showToast(
      `Payment reminder SMS & Email sent to ${reminderStudent.name} (${reminderStudent.phone}) for outstanding balance ₹${reminderStudent.feeDue?.toLocaleString("en-IN")}`,
      "info",
      "Fee Reminder Dispatched",
    );
    setIsReminderModalOpen(false);
  };

  // Issue Certificate Handler
  const handleIssueCert = () => {
    if (!certStudent) return;
    showToast(
      `Official Certificate issued for ${certStudent.name} in ${certStudent.courseName} (Credential ID: OM/2026/${certStudent.admissionNo?.replace("OMC-", "")})`,
      "success",
      "Certificate Generated",
    );
    setIsCertModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* SECTION HEADER & CRM ACTIONS BAR                              */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10.5px] font-black uppercase tracking-wider text-[#3b49df] bg-blue-50 px-2 py-0.5 border border-blue-200/80">
              OPERATING MEDIA CRM & LMS DIRECTORY
            </span>
            <span className="inline-flex items-center space-x-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Course Classification Active</span>
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-1">
            Student Enrollment Classification & Multi-Course Management
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Monitor attendance, tuition fees, batches, and academic progress
            classified by course.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsEnrollModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-[#3b49df] hover:bg-[#2f3cb8] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Plus size={14} />
            <span>Enroll Student</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer"
            title="Download CSV report of currently filtered students"
          >
            <Download size={13} />
            <span>Export Roster (CSV)</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COURSE CLASSIFICATION TABS / PILLS                            */}
      {/* ------------------------------------------------------------- */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Classify by Course Specialization
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Showing {filteredStudents.length} of {students.length} students
          </span>
        </div>

        {/* Responsive Horizontal Scrollable Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {/* "All Courses" Pill */}
          <button
            type="button"
            onClick={() => setSelectedCourseFilter("all")}
            className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center space-x-2 border ${
              selectedCourseFilter === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90"
            }`}
          >
            <BookOpen size={13} />
            <span>All Courses</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedCourseFilter === "all"
                  ? "bg-slate-800 text-slate-200"
                  : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              {students.length}
            </span>
          </button>

          {/* Individual Courses */}
          {courses.map((course) => {
            const isSelected = selectedCourseFilter === course.id;
            const count = courseStats[course.id]?.studentCount || 0;

            return (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedCourseFilter(course.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center space-x-2 border ${
                  isSelected
                    ? "bg-[#3b49df] text-white border-[#3b49df] shadow-xs"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90"
                }`}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-4 h-4 rounded object-cover shrink-0"
                />
                <span className="truncate max-w-[170px]">{course.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    isSelected
                      ? "bg-blue-700 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ACTIVE COURSE BACKEND INTELLIGENCE SPOTLIGHT                   */}
      {/* ------------------------------------------------------------- */}
      {activeCourse ? (
        <div className="bg-slate-50/70 border border-slate-200/90 rounded p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5 min-w-0">
            <img
              src={activeCourse.thumbnail}
              alt={activeCourse.title}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                  {activeCourse.category}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10.5px] font-bold text-slate-500">
                  Faculty:{" "}
                  <strong className="text-slate-700">
                    {activeCourse.author}
                  </strong>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {activeCourse.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {activeCourse.description}
              </p>
            </div>
          </div>

          {/* Quick Metrics for this Course */}
          <div className="flex items-center space-x-4 sm:space-x-6 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200/80">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Enrolled
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
                {courseStats[activeCourse.id]?.studentCount || 0} Students
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Avg Attendance
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-700 tabular-nums">
                {courseStats[activeCourse.id]?.avgAttendance || 85}%
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Duration
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
                {activeCourse.duration}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR                                          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, email, admission ID (OMC-0266)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Branch / Campus Filter */}
        <div>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option value="all">
              All Centers (Andheri / Borivali / Online)
            </option>
            <option value="Andheri Center">Andheri Center</option>
            <option value="Borivali Center">Borivali Center</option>
            <option value="Online / Remote">Online / Remote</option>
          </select>
        </div>

        {/* Fee Status Filter */}
        <div>
          <select
            value={feeStatusFilter}
            onChange={(e) => setFeeStatusFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option value="all">All Fee Statuses</option>
            <option value="Cleared">Cleared (Full Paid)</option>
            <option value="Partial Due">Partial Due</option>
            <option value="Overdue">Overdue Balance</option>
          </select>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CLASSIFIED STUDENTS DIRECTORY TABLE                           */}
      {/* ------------------------------------------------------------- */}
      <div className="overflow-x-auto rounded-xl border border-slate-200/90">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Student Profile</th>
              <th className="py-3 px-4">Classified Course & Batch</th>
              <th className="py-3 px-4">Attendance</th>
              <th className="py-3 px-4">Fees Billing</th>
              <th className="py-3 px-4">Learning Progress</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <Users size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-bold text-slate-600">
                    No students found matching your criteria
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try clearing your search query or selecting a different
                    course filter.
                  </p>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isPaidFull = student.feeStatus === "Cleared";
                const isOverdue = student.feeStatus === "Overdue";
                const attPct = student.attendancePercentage || 0;

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Student Profile */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative shrink-0">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                            }}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                          />
                          {student.isCrmSynced && (
                            <span
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"
                              title="CRM Live Profile Synced"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span
                              className="font-bold text-slate-900 text-xs sm:text-sm hover:text-[#3b49df] cursor-pointer"
                              onClick={() => setDossierStudent(student)}
                            >
                              {student.name}
                            </span>
                            <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {student.admissionNo}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px] block truncate">
                            {student.email} • {student.phone}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Classified Course & Batch */}
                    <td className="py-3.5 px-4 min-w-[180px]">
                      <span className="font-bold text-slate-900 block truncate">
                        {student.courseName}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {student.batch}
                      </span>
                      <span className="text-[10.5px] font-semibold text-slate-400 block">
                        📍 {student.branch}
                      </span>
                    </td>

                    {/* Attendance */}
                    <td className="py-3.5 px-4 min-w-[130px]">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${
                              attPct >= 85
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : attPct >= 75
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {attPct}% Attended
                          </span>
                          <span className="text-[10.5px] text-slate-400 tabular-nums">
                            {student.attendedLectures || 25}/
                            {student.totalLectures || 28}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              attPct >= 85
                                ? "bg-emerald-500"
                                : attPct >= 75
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                            }`}
                            style={{ width: `${Math.min(100, attPct)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Fees Billing */}
                    <td className="py-3.5 px-4 min-w-[140px]">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1.5">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${
                              isPaidFull
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : isOverdue
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {student.feeStatus}
                          </span>
                        </div>
                        <div className="text-[11px] font-bold text-slate-900 tabular-nums">
                          ₹{(student.feePaid || 0).toLocaleString("en-IN")} / ₹
                          {(student.feeTotal || 0).toLocaleString("en-IN")}
                        </div>
                        {student.feeDue > 0 ? (
                          <span className="text-[10px] text-rose-600 font-semibold block">
                            Bal Due: ₹{student.feeDue.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-semibold block">
                            Fully Cleared ✓
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Learning Progress */}
                    <td className="py-3.5 px-4 min-w-[130px]">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[10.5px] font-bold text-slate-700 tabular-nums">
                            {student.overallProgress}% Complete
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {student.completedLessonsCount || 0}/
                            {student.totalLessonsCount || 25}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#3b49df] rounded-full transition-all"
                            style={{
                              width: `${Math.min(100, student.overallProgress || 0)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => setDossierStudent(student)}
                          className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="View Full Student CRM Dossier"
                        >
                          Dossier
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAttendanceStudent(student);
                            setIsAttendanceModalOpen(true);
                          }}
                          className="p-1 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Log Lecture Attendance"
                        >
                          <UserCheck size={14} />
                        </button>

                        {student.feeDue > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setReminderStudent(student);
                              setIsReminderModalOpen(true);
                            }}
                            className="p-1 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            title="Send Fee Reminder Alert"
                          >
                            <Mail size={14} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setCertStudent(student);
                            setIsCertModalOpen(true);
                          }}
                          className="p-1 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                          title="Issue Verified Certificate"
                        >
                          <Award size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: STUDENT CRM DOSSIER QUICK VIEW                       */}
      {/* ------------------------------------------------------------- */}
      {dossierStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                  CRM Admission Dossier
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {dossierStudent.admissionNo}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDossierStudent(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Profile Card */}
              <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded border border-slate-200/80">
                <img
                  src={dossierStudent.avatar}
                  alt={dossierStudent.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                  }}
                  className="w-16 h-16 rounded object-cover border-2 border-white shadow-md shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {dossierStudent.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {dossierStudent.email} • {dossierStudent.phone}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[10.5px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      📍 {dossierStudent.branch}
                    </span>
                    <span className="text-[10.5px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      Enrolled: {dossierStudent.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-blue-50/40 border border-blue-200/80 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                    Classified Course
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 mt-1 block">
                    {dossierStudent.courseName}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Batch Schedule
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1 block truncate">
                    {dossierStudent.batch}
                  </span>
                </div>
              </div>

              {/* Attendance & Fees Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Attendance Card */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Attendance Standing
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      {dossierStudent.attendancePercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Total Lectures:{" "}
                      <strong>{dossierStudent.totalLectures || 28}</strong>
                    </span>
                    <span>
                      Attended:{" "}
                      <strong className="text-emerald-700">
                        {dossierStudent.attendedLectures || 25}
                      </strong>
                    </span>
                    <span>
                      Absent:{" "}
                      <strong className="text-rose-600">
                        {(dossierStudent.totalLectures || 28) -
                          (dossierStudent.attendedLectures || 25)}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Fees Card */}
                <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Fee Status
                    </span>
                    <span className="text-xs font-black text-slate-900">
                      {dossierStudent.feeStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Total:{" "}
                      <strong>
                        ₹
                        {(dossierStudent.feeTotal || 0).toLocaleString("en-IN")}
                      </strong>
                    </span>
                    <span>
                      Paid:{" "}
                      <strong className="text-emerald-700">
                        ₹{(dossierStudent.feePaid || 0).toLocaleString("en-IN")}
                      </strong>
                    </span>
                    <span>
                      Due:{" "}
                      <strong className="text-rose-600">
                        ₹{(dossierStudent.feeDue || 0).toLocaleString("en-IN")}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Operating Media CRM Student Profile
              </span>
              <button
                type="button"
                onClick={() => setDossierStudent(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: ENROLL NEW STUDENT MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  Enroll New Student
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assign course specialization, batch timing, and fee schedule.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEnrollModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={enrollForm.name}
                  onChange={(e) =>
                    setEnrollForm({ ...enrollForm, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={enrollForm.email}
                    onChange={(e) =>
                      setEnrollForm({ ...enrollForm, email: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={enrollForm.phone}
                    onChange={(e) =>
                      setEnrollForm({ ...enrollForm, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Course Specialization *
                </label>
                <select
                  value={enrollForm.courseId}
                  onChange={(e) =>
                    setEnrollForm({ ...enrollForm, courseId: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Campus Center
                  </label>
                  <select
                    value={enrollForm.branch}
                    onChange={(e) =>
                      setEnrollForm({ ...enrollForm, branch: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="Andheri Center">Andheri Center</option>
                    <option value="Borivali Center">Borivali Center</option>
                    <option value="Online / Remote">Online / Remote</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Batch Schedule
                  </label>
                  <select
                    value={enrollForm.batch}
                    onChange={(e) =>
                      setEnrollForm({ ...enrollForm, batch: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="Weekday Morning (WD-M1, 10:00 AM - 12:00 PM)">
                      Weekday Morning (10-12 PM)
                    </option>
                    <option value="Weekday Afternoon (WD-A1, 02:00 PM - 04:00 PM)">
                      Weekday Afternoon (2-4 PM)
                    </option>
                    <option value="Weekend Batch (WE-D1, 02:00 PM - 06:00 PM)">
                      Weekend Batch (2-6 PM)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Total Course Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={enrollForm.feeTotal}
                    onChange={(e) =>
                      setEnrollForm({ ...enrollForm, feeTotal: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Initial Paid Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={enrollForm.feePaid}
                    onChange={(e) =>
                      setEnrollForm({ ...enrollForm, feePaid: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3b49df] hover:bg-[#2f3cb8] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Complete Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: MARK ATTENDANCE MODAL                                */}
      {/* ------------------------------------------------------------- */}
      {isAttendanceModalOpen && attendanceStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Mark Lecture Attendance
              </h3>
              <button
                type="button"
                onClick={() => setIsAttendanceModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Record attendance for{" "}
              <strong className="text-slate-900">
                {attendanceStudent.name}
              </strong>{" "}
              ({attendanceStudent.admissionNo}) in session topic:{" "}
              <strong className="text-slate-800">
                {attendanceStudent.courseName}
              </strong>
              .
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleRecordAttendance(attendanceStudent, true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Check size={14} />
                <span>Mark Present</span>
              </button>
              <button
                type="button"
                onClick={() => handleRecordAttendance(attendanceStudent, false)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <X size={14} />
                <span>Mark Absent</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 4: SEND FEE REMINDER NOTIFICATION                       */}
      {/* ------------------------------------------------------------- */}
      {isReminderModalOpen && reminderStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Send Payment Reminder
              </h3>
              <button
                type="button"
                onClick={() => setIsReminderModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1 text-amber-900">
              <p>
                <strong>Student:</strong> {reminderStudent.name}
              </p>
              <p>
                <strong>Outstanding Balance:</strong> ₹
                {reminderStudent.feeDue?.toLocaleString("en-IN")}
              </p>
              <p>
                <strong>SMS & Email:</strong> {reminderStudent.phone} •{" "}
                {reminderStudent.email}
              </p>
            </div>

            <p className="text-xs text-slate-500">
              An automated payment link with invoice reference OMC-0266 will be
              dispatched via SMS & Email.
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsReminderModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendReminder}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
              >
                <Send size={13} />
                <span>Send Reminder Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 5: ISSUE VERIFIED CERTIFICATE                           */}
      {/* ------------------------------------------------------------- */}
      {isCertModalOpen && certStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Issue Verified Certificate
              </h3>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-xs space-y-1 text-purple-900">
              <p>
                <strong>Candidate:</strong> {certStudent.name}
              </p>
              <p>
                <strong>Course:</strong> {certStudent.courseName}
              </p>
              <p>
                <strong>Credential ID:</strong> OM/2026/
                {certStudent.admissionNo?.replace("OMC-", "") || "0266"}
              </p>
              <p>
                <strong>Grade:</strong> A+ Distinction (9.4 / 10)
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleIssueCert}
                className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
              >
                <Award size={13} />
                <span>Confirm & Issue</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
